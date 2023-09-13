import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.scripters.whoru',
  appName: 'milkyway',
  webDir: 'www',
  server: {
  //  url: 'http://192.168.0.5:8100',
    cleartext: true
  }
};

export default config;
