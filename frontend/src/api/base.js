import axios from 'axios';

const APIUrl = 'http://localhost:8000';
const productsPath = `${APIUrl}/main/bikes/`;
const productPath = `${APIUrl}/main/bike_details/`;
const cartPath = `${APIUrl}/cart/items/`;
const cartUpdatePath = `${APIUrl}/cart/update/`;

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

const getCart = () => axios({
  url: cartPath,
});

const postCartProduct = ({ productId, quantity }) => axios({
  method: 'POST',
  url: `${cartUpdatePath + productId}/`,
  data: { quantity },
}).catch((error) => {
  console.log(error);
});

const putCartProduct = ({ productId, quantity }) => axios({
  method: 'PUT',
  url: `${cartUpdatePath + productId}/`,
  data: { quantity },
}).catch((error) => {
  console.log(error);
});

const deleteCartProduct = (productId) => axios({
  method: 'DELETE',
  url: `${cartUpdatePath + productId}/`,
}).catch((error) => {
  console.log(error);
});

export {
  getProducts, getProductDetails, getCart, postCartProduct,
  putCartProduct, deleteCartProduct, APIUrl,
};
