<template>
    <div id="app" class="container">
        <div v-show="loadingState" class="loader_wrapper">
            <div class="loader"></div>
        </div>
        <div class="top">
            <div class="header">
                <router-link to="/">
                    <img class="logo" src="./assets/foto/logo.jpg" alt="Logo BikeStore">
                </router-link>
                    <ul class="menu">
                        <li class="menu_list">
                            <router-link class="menu_link" to="/">Home</router-link>
                        </li>
                        <li class="menu_list">
                            <router-link class="menu_link" to="/catalog">Catalog</router-link>
                        </li>
                        <li class="menu_list">
                            <router-link class="menu_link" to="/contacts">Contacts</router-link>
                        </li>
                        <Cart/>
                    </ul>
                </div>
            <router-view/>
        </div>
        <div class="footer">
            <p class="footer_text">&copy;&nbsp;All rights reserved</p>
        </div>
    </div>
</template>

<script>
import Cart from '@/components/Cart.vue';
import { mapGetters } from 'vuex';

export default {
  components: {
    Cart,
  },

  computed: {
    ...mapGetters(['loadingState']),
  },

};
</script>
