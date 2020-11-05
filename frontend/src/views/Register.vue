<template>
  <div class="contacts_block" >
   <form @submit.prevent="register">
     <h1>Create account</h1>
     <input class="contacts_input" required v-model="firstName"
            type="text" placeholder="Firs name"/>
     <br>
     <input class="contacts_input" required v-model="lastName"
            type="text" placeholder="Last name"/>
     <br>
     <input class="contacts_input" required v-model="email"
            type="email" placeholder="Email"/>
     <br>
     <input class="contacts_input" required v-model="password"
            type="password" placeholder="Password"/>
     <br>
     <input class="contacts_input" required v-model="passwordConfirm"
            type="password" placeholder="Confirm password"/>
     <br>
     <button class="contacts_button" type="submit">Registration</button>
   </form>
 </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'Register',

  data() {
    return {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      passwordConfirm: '',
    };
  },

  methods: {
    ...mapActions(['userRegister']),

    register() {
      const {
        firstName, lastName, email, password, passwordConfirm,
      } = this;
      this.userRegister({
        first_name: firstName,
        last_name: lastName,
        email,
        password,
        password_confirm: passwordConfirm,
      }).then(() => {
        this.$router.push('/');
      });
    },
  },
};
</script>
