<template>
  <div>
    <div class="text-center w-100">
      <h1 class="text-h5 mb-2">
        {{ $vuetify.lang.t('$vuetify.auth.sign-in-password.title') }}
      </h1>
      <v-chip
        class="mb-10"
        outlined
        link
        @click="$router.push({ name: 'signin' })"
      >
        <v-avatar left>
          <v-icon color="secondary">
            mdi-account-circle
          </v-icon>
        </v-avatar>
        {{ this.$store.state.identifier }}
        <v-avatar right>
          <v-icon color="secondary">
            mdi-chevron-down
          </v-icon>
        </v-avatar>
      </v-chip>

      <v-form ref="form" :disabled="disable">
        <v-text-field
          class="mb-10"
          :append-icon="show ? 'mdi-eye-off-outline' : 'mdi-eye-outline'"
          :label="$vuetify.lang.t('$vuetify.auth.sign-in-password.enter-password')"
          v-model.lazy="password"
          name="password"
          :rules="passwordRules"
          :type="show ? 'input' : 'password'"
          hide-details="auto"
          outlined
          @click:append="show = !show"
        />
      </v-form>

      <div class="d-flex justify-space-between">
        <v-btn
          class="text-none letter-spacing-0 font-weight-bold"
          style="margin-left: -16px;"
          color="primary"
          text
          @click="wip"
        >
          {{ $vuetify.lang.t('$vuetify.auth.sign-in-password.forgot-password') }}
        </v-btn>
        <v-btn
          class="text-none"
          style="min-width: 88px;"
          color="primary"
          depressed
          @click="passwords()"
        >
          {{ $vuetify.lang.t('$vuetify.auth.sign-in-password.next') }}
        </v-btn>
      </div>
    </div>
  </div>
</template>

<script>
import { wip } from '@/helpers.js'
import gql from 'graphql-tag'
export default {
  data: () => ({
    disable: false,
    show: false,
    password: '',
    passwordRules: [],
    token: ''
  }),
  created: function () {
    let jid = localStorage.getItem('JWT_ID')
    let jtoken = localStorage.getItem('JWT_TOKEN')
    let online = localStorage.getItem('online')
    if(jtoken && online){
      this.disable = true
      this.password = '******'
      this.$apollo.query({
        query: gql`query ($id: ID!, $token: String!) {
          cektoken(
            id: $id,
            token: $token
          )
        }`,
        variables: {
          id: jid,
          token: jtoken
        },
      }).then((data) => {
        this.disable = false
      console.log(JSON.stringify(data))
        this.$store.commit('updateIdentifier', data.data.cektoken)
        
        
        // setTimeout(()=>{
        //     this.$emit('next', {type:'pass'})
        //   },5000
        // )
        
        this.$emit('next', {type:'pass'})
      }).catch((errors) => {
        console.log(JSON.stringify(errors))
        this.disable = false
        // Error
        // console.log(errors.graphQLErrors[0].message)
        this.passwordRules = [errors.graphQLErrors[0].message]
        this.$refs['form'].validate('passwordRules')
        this.password = ''
        // console.error(errors)
      })
    }
  },
  computed: {
    rules () {
      const passwordRules = []
      return passwordRules
    }
  },
  methods: {
    wip,
    async getToken(ids,passwords) {
      // 调用 graphql 变更
      await this.$apollo.mutate({
        // 查询语句
        mutation: gql`mutation ($id: ID!, $password: String!) {
          login(id: $id, password: $password)
        }`,
        // 参数
        variables: {
          id: ids,
          password: passwords
        },
      }).then((data) => {
        // Result
        // console.log(data.data.login)
        this.$store.dispatch('retrieveToken', data.data.login)
        this.$emit('next', {type:'pass', pass: this.password})
        // this.$emit('next', {type:'pass', pass: this.password})
      }).catch((errors) => {
        // Error
        console.error(errors)
      })
    },
    passwords() {
      // console.log(this.$store.state.uid)
      // console.log(this.password)
      let localid = this.$store.state.uid || localStorage.getItem("JWT_ID")
      this.getToken(localid, this.password)
      // console.log(comlog)
      
    }
  }
}
</script>