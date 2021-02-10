<template>
  <component
    :is="component"
    v-bind="$attrs"
  >
    <slot />
  </component>
</template>

<script>
import LoginDesktop from './LoginDesktop'
import LoginMobile from './LoginMobile'
export default {
  computed: {
    component () {
      return (this.$vuetify.breakpoint.xsOnly) ? LoginMobile : LoginDesktop
    }
  }
}
</script>