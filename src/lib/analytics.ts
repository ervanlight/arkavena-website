import { features } from '@/config/features';

type EventName = 'page_view' | 'select_service' | 'start_assessment' | 'submit_assessment' | 'contact_whatsapp';

export const analytics = {
  trackEvent: (eventName: EventName, eventParams?: Record<string, any>) => {
    if (features.DEMO_MODE) {
      console.log(`[Analytics Demo] Event: ${eventName}`, eventParams);
      return;
    }
    
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', eventName, eventParams);
    }
  },
  
  trackConsent: (granted: boolean) => {
    if (features.DEMO_MODE) {
      console.log(`[Analytics Demo] Consent Granted: ${granted}`);
      return;
    }
  }
};
