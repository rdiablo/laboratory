<template>
  <v-app class="overflow-hidden" v-bind:class="[online ? activeClass : 'aoffline']">
    <video v-if="!online" class="sleep-video" playsinline autoplay muted loop>
      <source :src="require('./assets/video.mp4')" type="video/mp4">
    </video>
    
    
    <v-app-bar v-if="online" dense dark app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-app-bar-title class="text-uppercase" v-text="title"></v-app-bar-title>
      <v-spacer></v-spacer>
      <v-divider vertical inset></v-divider>
      <v-btn small icon>
        <v-icon small>mdi-cog-outline</v-icon>
      </v-btn>
      <v-btn small icon>
        <v-icon small>mdi-magnify</v-icon>
      </v-btn>
    </v-app-bar>
    <v-card>
      <v-navigation-drawer v-if="online" v-model="drawer" app>
        <v-list-item link>
          <v-list-item-content>
            <v-list-item-title class="title">
              Peter.Dai
            </v-list-item-title>
            <v-list-item-subtitle>实验室业务管理员</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-divider></v-divider>
        <v-list>
          <v-list-item v-for="(item, i) in items" :key="i" :to="item.to" @click.stop="title === item.title" router exact>
            <v-list-item-icon>
              <v-icon v-text="item.icon"></v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title v-text="item.title"/>
            </v-list-item-content>
          </v-list-item>
          <v-divider></v-divider>
        </v-list>
      </v-navigation-drawer>
    </v-card>
    <v-main>
      <v-container fluid style="height:100%;overflow:auto">
        <router-view></router-view>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  data: () => ({
    activeClass: 'aonline',
    errorClass: 'aoffline',
    drawer: false,
    group: null,
    items: [
      {
        icon: "mdi-home-outline",
        title: "主页",
        to: "/home"
      },
      {
        icon: "mdi-transfer",
        title: "工作流",
        to: "/flow"
      },
      {
        icon: "mdi-view-week-outline",
        title: "看板",
        to: "/kanban"
      },
      {
        icon: "mdi-card-bulleted-settings-outline",
        title: "任务",
        to: "/task"
      },
      {
        icon: "mdi-finance",
        title: "财务",
        to: "/finance"
      },
      {
        icon: "mdi-table-arrow-up",
        title: "数据上传",
        to: "/upload"
      }
    ],
    miniVariant: false,
    Drawer: false,
    title: "Virchow",
    // admins: [
    //   ['Management'],
    //   ['Settings'],
    // ],
    // cruds: [
    //   ['工作量统计表'],
    //   ['财务统计表'],
    // ],
  }),
  watch: {
    group () {
      this.drawer = false
    },
  },
  computed: {
    online: {
      get () {
        return this.$store.state.online
      }
    }
  },
  methods: {
   
  },
  created :function(){
    // const mtm = window.matchMedia('(prefers-color-scheme: dark)')
    // const that = this
    // if (mtm.matches) {
    //   that.$vuetify.theme.dark = true
    // } else {
    //   that.$vuetify.theme.dark = false
    // }
    // mtm.addListener(function(e){
    //   if (e.matches) {
    //     that.$vuetify.theme.dark = true
    //   } else {
    //     that.$vuetify.theme.dark = false
    //   }
    // })
  
  }
}
</script>

<style>
  .sleep-video {
    -webkit-filter: blur(20px) saturate(500%) contrast(60%);
    filter: blur(20px) saturate(500%) contrast(60%);
    opacity: .4;
    left: 0;
    top: 0;
    height: 125%;
    width: 125%;
    position: fixed;
    top:-25%;
    vertical-align: middle;
    z-index: 0;
    object-fit: cover;
  }
  .aonline {
    background:none !important;
    background-color: #ffffff !important;
  }
  .aoffline {
    /* background-color: rgb(25, 22, 53) !important; */
    background: -webkit-linear-gradient(#6176d4,#354db9,#1f1a69,#100d38,#000000) !important;
    background: linear-gradient(#6176d4,#354db9,#1f1a69,#100d38,#000000) !important;
    
  }
  .overflow-hidden {
    overflow:auto !important;
  }
  body,html {
    overflow:hidden !important;
    height: 100%;
  }
@media screen and (min-width: 1264px) {
  .container {
    max-width: none !important;
  }
}
</style>