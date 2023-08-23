import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'milkyway',
  webDir: 'www',
  server: {
  //  url: 'http://192.168.0.5:8100',
    cleartext: true
  }
};

export default config;
