import Vue from 'vue';
import Vuex from 'vuex';
import catalog from './catalog';
import cart from './cart';
import product from './product';
import auth from './auth';
import contacts from './contacts';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    catalog,
    cart,
    product,
    auth,
    contacts,
  },
});
