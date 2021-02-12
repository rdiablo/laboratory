<template>
  <div>
    <v-card
      class="auth-card elevation-9"
      :class="{ signup: $route.name === 'signup' }"
      style=""
      outlined
      :disabled="disabled"
    >
      <v-progress-linear
        v-if="loading"
        indeterminate
        absolute
      />
      <div class="pa-10">
        <slot />
      </div>
    </v-card>

    <login-footer />
  </div>
</template>

<script>
import LoginFooter from './LoginFooter'
export default {
  components: {
    LoginFooter
  },
  props: {
    loading: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="scss">
  .auth-card {
    width: 450px;
    min-height: 500px;
    overflow: hidden;
    // background: -webkit-linear-gradient(#fff,#fff,#c5d8ff,#3b89ff) !important;
    // background: linear-gradient(#fff,#fff,#c5d8ff,#3b89ff) !important;
  }
  .auth-card.signup {
    width: 750px;
  }
</style>