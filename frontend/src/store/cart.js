import {
  getCart, postCartProduct, deleteCartProduct, putCartProduct,
} from '../api/base';

export default ({
  state: {
    cart: [],
  },

  mutations: {
    SET_CART(state, data) {
      state.cart = data;
    },

    CHANGE_COUNT(state, { productId, quantity }) {
      const basketProduct = state.cart.find(
        (item) => item.id === productId,
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
    loadCart({ commit }) {
      commit('SET_LOADING_STATUS', true);
      return getCart()
        .then((resp) => {
          commit('SET_CART', resp.data);
          commit('SET_LOADING_STATUS', false);
        })
        .catch((error) => {
          console.log(error);
          commit('DELETE_TOKEN');
        });
    },

    changeCartProduct({ commit }, data) {
      putCartProduct(data)
        .then((result) => {
          if (result.status === 200) {
            commit('CHANGE_COUNT', data);
          } else {
            console.log("Product doesn't change on server!");
          }
        });
    },

    addCartProduct({ state, commit }, product) {
      const cartProduct = state.cart.find(
        (item) => item.id === product.id,
      );
      const quantity = 1;
      const productId = product.id;

      if (cartProduct) {
        this.dispatch('changeCartProduct', { productId, quantity });
      } else {
        postCartProduct({ productId, quantity })
          .then((data) => {
            if (data.status === 201) {
              commit('ADD_PRODUCT', { ...product, quantity });
            } else {
              console.log("Product doesn't add on server!");
            }
          });
      }
    },

    removeCartProduct({ dispatch, commit }, product) {
      const quantity = -1;
      if (product.quantity > 1) {
        dispatch('changeCartProduct', { productId: product.id, quantity });
      } else {
        deleteCartProduct(product.id)
          .then((result) => {
            if (result.status === 200) {
              commit('DELETE_PRODUCT', product);
            } else {
              console.log("Product doesn't delete on server!");
            }
          });
      }
    },
  },

  getters: {
    cart(state) {
      return state.cart;
    },

    totalQuantity(state) {
      return state.cart.reduce(
        (sum, product) => {
          sum += product.quantity;
          return sum;
        }, 0,
      );
    },

    totalPrice(state) {
      return state.cart.reduce(
        (sum, product) => {
          sum += product.price * product.quantity;
          return sum;
        }, 0,
      );
    },
  },
});
