'use client';

import * as React from 'react';
import { Button } from '../ui/button';
import { getConsent, isAnalyticsConfigured, setConsent } from '@/lib/analytics/consent';

export function CookieConsent() {
  const [show, setShow] = React.useState(false);

  React.useEffect(() => {
    if (isAnalyticsConfigured() && getConsent() === 'unset') {
      setShow(true);
    }
  }, []);

  const handleAccept = () => {
    setConsent(true);
    setShow(false);
  };

  const handleDecline = () => {
    setConsent(false);
    setShow(false);
  };

  if (!show) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 sm:p-6 md:max-w-md">
      <div className="bg-[#0E1B26] text-white p-6 rounded-lg shadow-2xl border border-[#1C2D38] animate-in slide-in-from-bottom-5">
        <h4 className="font-[family-name:var(--font-space-grotesk)] font-semibold mb-2">Penggunaan Cookie</h4>
        <p className="text-sm text-[#E8DED0] mb-6">
          Kami menggunakan cookie untuk meningkatkan pengalaman Anda dan menganalisis trafik situs.
          Dengan melanjutkan, Anda menyetujui penggunaan cookie kami.
        </p>
        <div className="flex flex-col sm:flex-row gap-3">
          <Button variant="primary" size="sm" onClick={handleAccept} className="w-full sm:w-auto">
            Terima
          </Button>
          <Button variant="secondary" size="sm" onClick={handleDecline} className="w-full sm:w-auto border-[#1C2D38] hover:bg-[#1C2D38] text-white">
            Tolak
          </Button>
        </div>
      </div>
    </div>
  );
}
