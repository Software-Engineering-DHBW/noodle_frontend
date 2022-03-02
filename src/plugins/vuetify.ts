import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';
import de from 'vuetify/src/locale/de';

Vue.use(Vuetify);

export default new Vuetify({
  lang: {
    locales: { de },
    current: 'de',
  },
  theme: {
    options: { customProperties: true },
    themes: {
      light: {
        primary: '#f6da63',
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
