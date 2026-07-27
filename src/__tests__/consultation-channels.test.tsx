import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { ConsultationChannels } from "@/components/content/blocks/ConsultationChannels";
import { siteConfig } from "@/config/site";

describe("ConsultationChannels", () => {
  it("menampilkan notice jujur ketika tidak ada channel yang dikonfigurasi (kondisi nyata saat ini)", () => {
    expect(siteConfig.whatsApp).toBe("");
    expect(siteConfig.phone).toBe("");
    expect(siteConfig.businessEmail).toBe("");

    render(<ConsultationChannels whatsappMessage="Halo" />);

    expect(
      screen.getByText(/jalur kontak langsung belum tersedia/i)
    ).toBeInTheDocument();
    expect(screen.queryByRole("link")).not.toBeInTheDocument();
  });

  it("tidak pernah merender teks placeholder kosong seperti 'WhatsApp: -'", () => {
    render(<ConsultationChannels whatsappMessage="Halo" />);
    expect(screen.queryByText(/whatsapp:\s*-/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/belum tersedia:\s*0+/i)).not.toBeInTheDocument();
  });
});
