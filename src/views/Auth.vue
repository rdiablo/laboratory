<template>
  <v-container
    class="fill-height justify-center"
    :class="{ 'align-start': $vuetify.breakpoint.xsOnly }"
    fluid
  >
    <login
      :loading="loading"
      :disabled="disabled"
    >
      <router-view @next="onNext" />
    </login>
  </v-container>
</template>

<script>
import Login from '../components/login/Login'
export default {
  components: { Login },
  data: () => ({
    loading: false,
    disabled: false,
    reload: ''
  }),
  methods: {
    onNext (conn) {
      if(conn.type == 'email'){
        this.loading = true
        this.disabled = true
        setTimeout(() => {
          this.loading = false
          this.disabled = false
          console.log(this.$route.params.path)
          this.reload = this.$route.params.path
          this.$router.push({ name: 'password'})
        }, 1000)
      }
      if(conn.type == 'pass'){
        
        this.loading = true
        this.disabled = true
        setTimeout(() => {
          // this.$store.state.online = true
          // this.$router.push({ name: 'home' })
          document.cookie = 'online' + "=" +true; 
          localStorage.setItem("online", "true");
          // this.$cookies.set('online',true)
          this.$store.commit('updateLineState', true)
          
          this.loading = false
          this.disabled = false
          if (this.reload) {
            this.$router.replace({
              path: this.reload
            });
          } else {
            this.$router.push({ name: 'home' })
          }
        }, 1000)
      }
    },
  }
}
</script>

<style lang="scss">
  .letter-spacing-0 {
    letter-spacing: 0 !important;
  }
  .text-decoration-none {
    text-decoration: none !important;
  }
</style>