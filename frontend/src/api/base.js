const APIUrl = 'http://localhost:8000';
const productsPath = `${APIUrl}/main/bikes/`;
const productPath = `${APIUrl}/main/bike_details/`;
const cartPath = `${APIUrl}/cart/items/`;

const getProducts = () => fetch(productsPath)
  .then((result) => result.json())
  .catch((error) => {
    console.log(error);
  });

const getProductDetails = (id) => fetch(productPath + id)
  .then((result) => result.json())
  .catch((error) => {
    console.log(error);
  });

const getCart = () => fetch(cartPath)
  .then((result) => result.json())
  .catch((error) => {
    console.log(error);
  });

const postCartProduct = (newProduct) => fetch(
  cartPath,
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

const putCartProduct = (quantity, product) => fetch(`${cartPath + product.id}`,
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

const deleteCartProduct = (product) => fetch(`${cartPath + product.id}`, {
  method: 'DELETE',
  headers: {
    'Content-Type': 'application/json',
  },
})
  .then((result) => result.json())
  .catch((error) => {
    console.log(`Bad request! ${error.name}`);
  });

export {
  getProducts, getProductDetails, getCart, postCartProduct,
  putCartProduct, deleteCartProduct,
};
