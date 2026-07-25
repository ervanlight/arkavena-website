import { features } from '@/config/features';

type EventName = 
  | 'page_view' 
  | 'select_service' 
  | 'start_assessment' 
  | 'submit_assessment' 
  | 'whatsapp_click' 
  | 'cta_click';

export const analytics = {
  trackEvent: (eventName: EventName, eventParams?: Record<string, any>) => {
    if (features.DEMO_MODE) {
      console.log(`[Analytics Demo] Event: ${eventName}`, eventParams);
    }

    if (typeof window !== 'undefined') {
      // GTM dataLayer push
      (window as any).dataLayer = (window as any).dataLayer || [];
      (window as any).dataLayer.push({
        event: eventName,
        ...eventParams,
      });

      // GA4 direct gtag push
      if ((window as any).gtag) {
        (window as any).gtag('event', eventName, eventParams);
      }
    }
  },
  
  trackConsent: (granted: boolean) => {
    if (features.DEMO_MODE) {
      console.log(`[Analytics Demo] Consent Granted: ${granted}`);
    }
  }
};
