import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.ad4d7a9d21eb419ca223f68b5ffaa836',
  appName: 'healthwave-bangalore',
  webDir: 'dist',
  server: {
    url: 'https://ad4d7a9d-21eb-419c-a223-f68b5ffaa836.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: '#ffffff',
      androidScaleType: 'CENTER_CROP',
      splashFullScreen: true,
      splashImmersive: true
    }
  }
};

export default config;