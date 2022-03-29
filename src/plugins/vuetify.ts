import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';
import de from 'vuetify/src/locale/de';

Vue.use(Vuetify);

export default new Vuetify({
  lang: {
    locales: { de },
    current: 'de',
  },
  breakpoint: {
    thresholds: {
      xs: 700,
      sm: 700,
      md: 700,
      lg: 700,
      // xl breakpoint for bigger devices,
    },
  },
  theme: {
    options: { customProperties: true },
    themes: {
      light: {
        primary: '#deaf29',
        secondary: '#ffffff',
        accent: '#82B1FF',
        info: '#2196F3',
        success: '#4CAF50',
        warning: '#FFC107',
        error: '#FF5252',
      },
      dark: {
        primary: '#f6da63',
        secondary: '#ffffff',
        accent: '#82B1FF',
        info: '#2196F3',
        success: '#4CAF50',
        warning: '#FFC107',
        error: '#FF5252',
      },
    },
  },
});
