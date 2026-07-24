'use client';
import { useState, useEffect } from 'react';
import { MessageCircle } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export function AssessmentLoadingFallback() {
  const [showWA, setShowWA] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowWA(true);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="h-64 flex flex-col items-center justify-center text-[#5B6570]">
      <p className="mb-4">Loading form...</p>
      {showWA && (
         <Link href="https://wa.me/6281112345678" target="_blank">
           <Button className="bg-[#E2A63C] text-[#14171B] hover:bg-[#c9922f] flex items-center gap-2">
             <MessageCircle className="w-4 h-4" /> Hubungi via WhatsApp
           </Button>
         </Link>
      )}
    </div>
  );
}
