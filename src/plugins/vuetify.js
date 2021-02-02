import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';

Vue.use(Vuetify);

const opts = {
    icons: {
      iconfont: 'mdi', // 'mdi' || 'mdiSvg' || 'md' || 'fa' || 'fa4'
    },
    breakpoint: {
      thresholds: {
        xs: false,
        sm: false,
        md: false,
        lg: false,
      },
      scrollBarWidth: 24
    }
  }
  
  export default new Vuetify(opts)