export default ({
  state: {
    product: {},
  },

  mutations: {
    SET_PRODUCT(state, data) {
      state.product = data;
    },
  },

  actions: {
    loadProductDetails({ commit, dispatch }, id) {
      commit('SET_LOADING_STATUS', true);
      return dispatch('getProductDetails', id).then((data) => {
        commit('SET_PRODUCT', data);
        commit('SET_LOADING_STATUS', false);
      });
    },
  },

  getters: {
    product(state) {
      return state.product;
    },
  },
});
