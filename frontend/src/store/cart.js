import {
  getCart, putCartProduct, postCartProduct, deleteCartProduct,
} from '../api/base';

export default ({
  state: {
    cart: [],
  },

  mutations: {
    SET_CART(state, data) {
      state.cart = data;
    },

    CHANGE_COUNT(state, { product, quantity }) {
      const basketProduct = state.cart.find(
        (item) => item.product_id === product.product_id,
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
        .then((data) => {
          commit('SET_CART', data);
          commit('SET_LOADING_STATUS', false);
        });
    },

    changeCartProduct({ commit }, { quantity, product }) {
      putCartProduct(quantity, product)
        .then((data) => {
          if (data.result === 1) {
            commit('CHANGE_COUNT', { product, quantity });
          } else {
            console.log("Product doesn't change on server!");
          }
        });
    },

    createCartProduct({ commit }, product) {
      const newProduct = { ...product, quantity: 1 };
      postCartProduct(newProduct)
        .then((data) => {
          if (data.result === 1) {
            commit('ADD_PRODUCT', newProduct);
          } else {
            console.log("Product doesn't add on server!");
          }
        });
    },

    addCartProduct({ state, dispatch }, product) {
      const cartProduct = state.cart.find(
        (item) => item.product_id === product.product_id,
      );
      const quantity = 1;
      if (cartProduct) {
        dispatch('changeCartProduct', { quantity, product });
      } else {
        dispatch('createCartProduct', product);
      }
    },

    removeCartProduct({ dispatch, commit }, product) {
      const quantity = -1;
      if (product.quantity > 1) {
        dispatch('changeCartProduct', { quantity, product });
      } else {
        deleteCartProduct(product)
          .then((data) => {
            if (data.result === 1) {
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
