export default ({
  state: {
    product: {},
    path: 'http://localhost:8000/api/product/',
  },

  mutations: {
    SET_PRODUCT(state, data) {
      state.product = data;
    },
  },

  actions: {
    getProduct({ commit, state }, id) {
      commit('SET_LOADING_STATUS', true);
      return fetch(state.path + id)
        .then((result) => result.json())
        .catch((error) => {
          console.log(error);
        }).then((data) => {
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
