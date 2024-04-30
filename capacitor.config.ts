import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'A5_Sum_ChaconE2',
  webDir: 'www',
  plugins: {
    LocalNotifications: {
      smallIcon: "ic_stat_icon_config_sample", // Icono de la app solo para Android
      iconColor: "#488AFF", // Color de Icono
      sound: "beep.wav", // Sonido de la notificacion solo para Android
    },
  },
};

export default config;
