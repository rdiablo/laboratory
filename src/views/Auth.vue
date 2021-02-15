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
    disabled: false
  }),
  methods: {
    onNext (conn) {
      if(conn.type == 'email'){
        this.loading = true
        this.disabled = true
        setTimeout(() => {
          this.loading = false
          this.disabled = false
          this.$router.push({ name: 'password' })
        }, 1000)
      }
      if(conn.type == 'pass' && conn.pass == "abc"){
        
        this.loading = true
        this.disabled = true
        setTimeout(() => {
          this.loading = false
          this.disabled = false
          this.$router.push({ name: 'home' })
          this.$store.commit('updatePassword', conn.pass)
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