<template>
 <div class="contacts_block" >
   <form @submit.prevent="login">
     <h1>Sign in</h1>
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
import { mapActions } from 'vuex';

export default {
  name: 'Login',

  data() {
    return {
      email: '',
      password: '',
    };
  },

  methods: {
    ...mapActions(['userLogin']),

    login() {
      const { email, password } = this;
      this.userLogin({ email, password }).then(() => {
        this.$router.push('/basket');
      });
    },
  },
};
</script>

<style scoped>

</style>
