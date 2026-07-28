import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { ConsultationChannels } from "@/components/content/blocks/ConsultationChannels";
import { siteConfig } from "@/config/site";
import { temporaryFallbackEmail } from "@/config/temporary-contact";

describe("ConsultationChannels", () => {
  it("kondisi nyata saat ini: WhatsApp/telepon/email bisnis kosong, temporaryFallbackEmail terisi", () => {
    expect(siteConfig.whatsApp).toBe("");
    expect(siteConfig.phone).toBe("");
    expect(siteConfig.businessEmail).toBe("");
    expect(temporaryFallbackEmail).toBe("admin@arkavena.com");
  });

  it("jatuh ke email sementara ketika tidak ada channel resmi, dan menandainya jelas sebagai sementara", () => {
    render(<ConsultationChannels whatsappMessage="Halo" />);

    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", "mailto:admin@arkavena.com");
    expect(screen.getByText("Email (sementara)")).toBeInTheDocument();
    expect(
      screen.getByText(/kontak whatsapp resmi belum tersedia/i)
    ).toBeInTheDocument();
    // Never claims to be the honest "belum tersedia" dead-end while a
    // temporary channel is actually being rendered.
    expect(
      screen.queryByText(/jalur kontak langsung belum tersedia/i)
    ).not.toBeInTheDocument();
  });

  it("tidak pernah merender teks placeholder kosong seperti 'WhatsApp: -'", () => {
    render(<ConsultationChannels whatsappMessage="Halo" />);
    expect(screen.queryByText(/whatsapp:\s*-/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/belum tersedia:\s*0+/i)).not.toBeInTheDocument();
  });

  it("email sementara tidak pernah menggantikan WhatsApp asli ketika nomor resmi tersedia", async () => {
    vi.resetModules();
    vi.doMock("@/config/site", async () => {
      const actual = await vi.importActual<typeof import("@/config/site")>(
        "@/config/site"
      );
      return {
        ...actual,
        siteConfig: { ...actual.siteConfig, whatsApp: "081234567890" },
      };
    });

    const { ConsultationChannels: ConsultationChannelsWithWa } = await import(
      "@/components/content/blocks/ConsultationChannels"
    );
    render(<ConsultationChannelsWithWa whatsappMessage="Halo" />);

    expect(screen.getByText("WhatsApp")).toBeInTheDocument();
    expect(screen.queryByText("Email (sementara)")).not.toBeInTheDocument();

    vi.doUnmock("@/config/site");
    vi.resetModules();
  });

  it("falls back to the honest notice when even the temporary email is unset", async () => {
    vi.resetModules();
    vi.doMock("@/config/temporary-contact", () => ({
      temporaryFallbackEmail: null,
    }));

    const { ConsultationChannels: ConsultationChannelsNoFallback } =
      await import("@/components/content/blocks/ConsultationChannels");
    render(<ConsultationChannelsNoFallback whatsappMessage="Halo" />);

    expect(
      screen.getByText(/jalur kontak langsung belum tersedia/i)
    ).toBeInTheDocument();
    expect(screen.queryByRole("link")).not.toBeInTheDocument();

    vi.doUnmock("@/config/temporary-contact");
    vi.resetModules();
  });
});
