import { getProducts } from '../api/base';

export default ({
  state: {
    products: [],
    filtered: [],
    loading: false,
  },

  mutations: {
    SET_PRODUCTS(state, data) {
      state.products = data;
    },

    SET_FILTERED(state, data) {
      state.filtered = data;
    },

    SET_LOADING_STATUS(state, status) {
      state.loading = status;
    },
  },

  actions: {
    loadCatalog({ commit }) {
      commit('SET_LOADING_STATUS', true);
      return getProducts()
        .then((data) => {
          commit('SET_PRODUCTS', data);
          commit('SET_FILTERED', data);
          commit('SET_LOADING_STATUS', false);
        });
    },

    filter({ state, commit }, searchLine) {
      const regExp = new RegExp(searchLine, 'i');
      commit('SET_FILTERED', state.products.filter((product) => regExp.test(product.name)));
    },
  },

  getters: {
    products(state) {
      return state.products;
    },

    filtered(state) {
      return state.filtered;
    },

    loadingState({ loading }) {
      return loading;
    },
  },
});
