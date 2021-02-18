<template>
  <div>
    <div class="text-center">
      <h1 class="headline mb-2">
        {{ $vuetify.lang.t('$vuetify.auth.sign-in.title') }}
      </h1>
      <span class="d-inline-block mb-8">{{ $vuetify.lang.t('$vuetify.auth.sign-in.subtitle') }}</span>
    </div>

    <v-form @submit.prevent="next">
      <v-text-field
        ref="input"
        v-model="identifier"
        class="mb-2"
        autocomplete="off"
        placeholder=" "
        :label="$vuetify.lang.t('$vuetify.auth.sign-in.label')"
        name="login"
        type="text"
        hide-details="auto"
        outlined
        :disabled="disabled"
        :error-messages="error"
      />
      <a
        href="#"
        class="d-inline-block text-body-2 text-decoration-none font-weight-bold mb-8"
        @click="wip"
      >{{ $vuetify.lang.t('$vuetify.auth.sign-in.forgot-email') }}</a>
    </v-form>

    <div class="text-body-2 text--secondary mb-8">
      {{ $vuetify.lang.t('$vuetify.auth.sign-in.private') }}
      <a
        href="#"
        class="d-inline-block text-none text-decoration-none font-weight-bold"
      >{{ $vuetify.lang.t('$vuetify.auth.sign-in.learn-more') }}</a>
    </div>
    <div class="d-flex justify-space-between">
      <v-btn
        class="text-none letter-spacing-0"
        style="margin-left: -16px;"
        color="primary"
        text
        @click="$router.push({ name: 'signup' })"
      >
        {{ $vuetify.lang.t('$vuetify.auth.sign-in.create-account') }}
      </v-btn>
      <v-btn
        class="text-none"
        style="min-width: 88px;"
        color="primary"
        depressed
        @click="next"
      >
        {{ $vuetify.lang.t('$vuetify.auth.sign-in.next') }}
      </v-btn>
    </div>
  </div>
</template>

<script>
import { wip } from '@/helpers.js'
import gql from 'graphql-tag'
export default {
  data: () => ({
    error: null,
    disabled: false,
    // username: this.$store.state.username,
    userid: ''
  }),
  apollo: {
    
  },
  computed: {
    // username: {
    //   get () {
    //     return this.$store.state.username
    //   },
    //   set (value) {
    //     this.$store.commit('retrieveUsername', value)
    //   }
    // },
    identifier: {
      get () {
        return this.$store.state.identifier
      },
      set (value) {
        this.$store.commit('updateIdentifier', value)
      }
    }
  },
  created: function () {
    let juser = localStorage.getItem('JWT_USER')
    this.$store.commit('updateIdentifier', juser)
  },
  // created: function () {
  //   let jid = localStorage.getItem('JWT_ID')
  //   let jtoken = localStorage.getItem('JWT_TOKEN')
  //   if(jtoken){
  //     this.$apollo.query({
  //       query: gql`query ($id: ID!, $token: String!) {
  //         cektoken(
  //           id: $id,
  //           token: $token
  //         )
  //       }`,
  //       variables: {
  //         id: jid,
  //         token: jtoken
  //       },
  //     }).then((data) => {
  //       // console.log("登陆成功" + JSON.stringify(data))
  //       // console.log(data.data.cektoken)
  //       this.$store.commit('updateIdentifier', data.data.cektoken)
  //       this.$emit('next', {type:'email', adds: this.identifier})
  //       setTimeout(()=>{
  //           this.$router.push({ name: 'home' })
  //         },5000
  //       )
        
  //       // this.$emit('next', {type:'email', adds: this.identifier})
  //     }).catch((errors) => {
  //       // Error
  //       console.error(errors)
  //     })
  //   }
  // },
  methods: {
    async getID(conn) {
      // 调用 graphql 变更
      this.$apollo.query({
        // 查询语句
        query: gql`query ($username:String!) {
          getUserID(username: $username)
        }`,
        // 参数
        variables: {
          username: conn,
        },
      }).then((data) => {
      // Result
      // return data.getUserID
      // return data.data.getUserID
        
        this.userid = data.data.getUserID
        localStorage.setItem('JWT_ID', this.userid)
        localStorage.setItem('JWT_USER', conn)
        this.$store.commit('retrieveId', data.data.getUserID)
        this.$emit('next', {type:'email', adds: this.identifier})
      }).catch((error) => {
        // Error
        console.error(error)
      })
     
    },
    next () {
      if (!this.validEmail(this.identifier)) {
        this.error = 'Enter an valid email address'
        this.$refs.input.focus()
        return
      }
      this.error = null
      // this.apollo.userid
      // this.$emit('next', {type:'email', adds: this.identifier})
      // this.$router.push({ name: 'password' })
      if(localStorage.getItem('JWT_TOKEN')) {
        this.$emit('next', {type:'email', adds: this.identifier})
      } else {
        this.$store.commit('retrieveId', this.getID(this.identifier))
      }

      
      // this.$emit('next', {type:'email', adds: this.identifier})
    },
    validEmail (email) {
      var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      return re.test(email)
    },
    wip
  }
}
</script>