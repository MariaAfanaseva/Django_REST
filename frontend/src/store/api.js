export default ({
  state: {
    products_path: 'http://localhost:8000/api/products',
    product_path: 'http://localhost:8000/api/product/',
    cart_path: 'http://localhost:8000/api/cart/',
  },
  actions: {
    getProducts({ state }) {
      return fetch(state.products_path)
        .then((result) => result.json())
        .catch((error) => {
          console.log(error);
        });
    },

    getProductDetails({ state }, id) {
      return fetch(state.product_path + id)
        .then((result) => result.json())
        .catch((error) => {
          console.log(error);
        });
    },

    getCart({ state }) {
      return fetch(state.cart_path)
        .then((result) => result.json())
        .catch((error) => {
          console.log(error);
        });
    },

    postCartProduct({ state }, { newProduct }) {
      return fetch(
        state.cart_path,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newProduct),
        },
      )
        .then((result) => result.json())
        .catch((error) => {
          console.log(error);
        });
    },

    putCartProduct({ state }, { quantity, product }) {
      return fetch(`${state.cart_path + product.id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ quantity }),
        })
        .then((result) => result.json())
        .catch((error) => {
          console.log(error);
        });
    },

    deleteCartProduct({ state }, { product }) {
      return fetch(`${state.cart_path + product.id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((result) => result.json())
        .catch((error) => {
          console.log(`Bad request! ${error.name}`);
        });
    },
  },
});
