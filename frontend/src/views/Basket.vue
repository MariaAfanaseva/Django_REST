<template>
    <div class="cart_detail_block">
        <h1 class="title">Schop cart</h1>
        <div>
            <p v-if="!cart.length" class="cart_info">No products!</p>
            <div v-for="product in cart" :key="product.id" class="cart_detail_item">
                <div>
                    <img v-if="product.image" class="cart_detail_img"
                    :src="require(`../assets/foto/${product.image}`)"
                    :alt="product.product_name">
                    <img v-else
                    :src="require(`../assets/foto/${defaultImg}`)"
                    :alt="product.product_name">
                </div>
                <div class="cart_detail_text">
                    <h3>{{ product.product_name }}</h3>
                    <p>Price: {{ product.price * product.quantity }} &euro;</p>
                    <p>Count: {{ product.quantity }}</p>
                </div>
                <div>
                    <a class="del_btn" @click="removeCartProduct(product)">X</a>
               </div>
            </div>
            <div v-if="cart.length" class="cart_buy_block">
                <div class="cart_total">
                    <p>Total quantity: {{ totalQuantity }}</p>
                    <p>Total price: {{ totalPrice }} &euro;</p>
                </div>
                <button class="cart_buy_btn">Buy</button>
            </div>
        </div>
    </div>
</template>

<script>

import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'Basket',

  data() {
    return {
      defaultImg: 'default-image.jpg',
    };
  },

  computed: {
    ...mapGetters(['cart', 'totalQuantity', 'totalPrice', 'isAuthenticated']),
  },

  methods: {
    ...mapActions(['loadCart', 'removeCartProduct']),
  },
};

</script>
