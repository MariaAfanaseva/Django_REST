<template>
 <div class="contacts_block" >
   <form @submit.prevent="login">
     <h1>Sign in</h1>
     <div class="error" v-if="authStatus==='error'">
       <p v-for="(error, index) in errors" :key="index">{{ error }}</p>
     </div>
     <input class="contacts_input" required v-model="email" type="email" placeholder="Email"/>
     <br>
     <input class="contacts_input" required v-model="password"
            type="password" placeholder="Password"/>
     <br>
     <button class="contacts_button" type="submit">Login</button>
   </form>
 </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'Login',

  data() {
    return {
      email: '',
      password: '',
    };
  },

  computed: {
    ...mapGetters(['authStatus', 'errors']),
  },

  methods: {
    ...mapActions(['userLogin']),

    login() {
      const { email, password } = this;
      this.userLogin({ email, password }).then(() => {
        if (this.authStatus === 'success') {
          this.$router.push('/basket');
        }
      });
    },
  },
};
</script>

<style scoped>

</style>
