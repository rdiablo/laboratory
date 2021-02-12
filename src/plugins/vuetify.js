import Vue from 'vue'
import Vuetify from 'vuetify/lib/framework'
import en from '../locale/en'

Vue.use(Vuetify)

Vue.component('signin', {
  methods: {
    changeLocale () {
      this.$vuetify.lang.current = 'en'
    }
  }
})

const opts = {
  lang: {
    locales: { en },
    current: 'en'
  },
  theme: {
    themes: {
      light: {
        primary: '#172A88', // #E53935 #172A88
        accent: '#ffffff',
        secondary: '#dddddd'
      }
    }
  },
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