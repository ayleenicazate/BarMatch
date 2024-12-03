import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'myapp',
  webDir: 'www',
  plugins: {
    CapacitorSQLite: {
      enableDebug: false,
      androidIsEncryption: false,
      iosIsEncryption: false
    }
  }
};

export default config;
