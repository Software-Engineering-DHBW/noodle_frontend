import Vue from 'vue';
import VueMq from 'vue-mq';

Vue.use(VueMq, {
  breakpoints: {
    mobile: 700,
    desktop: Infinity,
  },
});

export default VueMq;
