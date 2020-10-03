export default ({
  state: {
    cart: [],
    path: 'http://localhost:8000/api/cart/',
  },

  mutations: {
    SET_CART(state, data) {
      state.cart = data;
    },

    CHANGE_COUNT(state, { product, quantity }) {
      const basketProduct = state.cart.find(
        (item) => item.id === product.id,
      );
      basketProduct.quantity += quantity;
    },

    DELETE_PRODUCT(state, product) {
      state.cart.splice(state.cart.indexOf(product), 1);
    },

    ADD_PRODUCT(state, product) {
      state.cart.push(product);
    },
  },

  actions: {
    getCart({ commit, state }) {
      commit('SET_LOADING_STATUS', true);
      return fetch(state.path)
        .then((result) => result.json())
        .catch((error) => {
          console.log(error);
        }).then((data) => {
          commit('SET_CART', data);
          commit('SET_LOADING_STATUS', false);
        });
    },

    postProduct({ commit }, { url, newProduct }) {
      return fetch(
        url,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newProduct),
        },
      ).then((result) => result.json())
        .catch((error) => {
          console.log(error);
        })
        .then((data) => {
          if (data.result === 1) {
            commit('ADD_PRODUCT', newProduct);
          } else {
            console.log("Product doesn't add on server!");
          }
        });
    },

    addProduct({ state, dispatch }, product) {
      const cartProduct = state.cart.find(
        (item) => item.id === product.id,
      );
      if (cartProduct) {
        dispatch(
          'putProduct',
          {
            url: `${state.path + product.id}`,
            quantity: 1,
            product,
          },
        );
      } else {
        const newProduct = { ...product, quantity: 1 };
        dispatch(
          'postProduct',
          {
            url: state.path,
            newProduct,
          },
        );
      }
    },

    putProduct({ commit }, { url, quantity, product }) {
      return fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ quantity }),
      })
        .then((result) => result.json())
        .catch((error) => {
          console.log(error);
        })
        .then((data) => {
          if (data.result === 1) {
            commit('CHANGE_COUNT', { product, quantity });
          } else {
            console.log("Product doesn't delete on server!");
          }
        });
    },

    deleteProduct({ commit }, { url, product }) {
      return fetch(url, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      }).then((result) => result.json())
        .catch((error) => {
          console.log(`Bad request! ${error.name}`);
        })
        .then((data) => {
          if (data.result === 1) {
            commit('DELETE_PRODUCT', product);
          } else {
            console.log("Product doesn't delete on server!");
          }
        });
    },

    deleteBasketProduct({ state, dispatch }, product) {
      if (product.quantity > 1) {
        dispatch(
          'putProduct',
          {
            url: `${state.path + product.id}`,
            quantity: -1,
            product,
          },
        );
      } else {
        dispatch(
          'deleteProduct',
          {
            url: `${state.path + product.id}`,
            product,
          },
        );
      }
    },
  },

  getters: {
    cart(state) {
      return state.cart;
    },
  },
});
