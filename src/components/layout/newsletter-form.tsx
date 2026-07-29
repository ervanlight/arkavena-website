"use client";

import { Input } from "../ui/input";
import { Button } from "../ui/button";

/**
 * The only interactive piece of the footer — split out so Footer itself can
 * be a server component (audit finding Q8: the whole footer was shipped as
 * client JS to every page just for this one form).
 */
export function NewsletterForm() {
  return (
    <form className="flex flex-col gap-2" onSubmit={(e) => e.preventDefault()}>
      <Input
        type="email"
        placeholder="Masukkan alamat email"
        className="bg-white/5 border-white/10 text-white placeholder:text-[#3F4954] h-10"
      />
      <Button className="w-full">Berlangganan</Button>
    </form>
  );
}
