export const features = {
  FREE_MODE: true, // Everything works without paid services
  DEMO_MODE: process.env.NEXT_PUBLIC_DEMO_MODE === 'true',
  ENABLE_AI: false,
  ENABLE_EMAIL_NOTIFICATIONS: false,
  ENABLE_VIDEO_UPLOAD: false,
  ENABLE_SUPABASE: process.env.NEXT_PUBLIC_ENABLE_SUPABASE === 'true',
};
