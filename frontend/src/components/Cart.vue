<template>
  <div class="basket">
    <div class="basket_icon" @click="isVisible = !isVisible">
      <i class="fa fa-shopping-cart btn_basket"></i>
      <p class="basket_text" v-if="cart.length">({{ totalQuantity }})</p>
    </div>
    <div v-show="isVisible" class="basket_products">
        <p v-if="!cart.length">No products!</p>
        <div class="basket_item" v-for="product in cart" :key="product.id">
            <h3>{{ product.name }}</h3>
            <img v-if="product.image" class='basket_product_image'
              :src="require(`../assets/foto/${product.image}`)"
              :alt="product.name">
            <img v-else class='basket_product_image'
              :src="require(`../assets/foto/${defaultImg}`)"
              :alt="product.name">
            <p class='basket_price'>Price: {{ product.price * product.quantity }} &euro;</p>
            <p class='basket_count'>Count: {{ product.quantity }}</p>
        </div>
        <div class="cart_btn_block">
            <router-link to='/basket' class="cart_btn">Cart</router-link>
        </div>
    </div>
    </div>
</template>

<script>

import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'Cart',

  data() {
    return {
      isVisible: false,
      defaultImg: 'default-image.jpg',
    };
  },

  computed: {
    ...mapGetters(['cart', 'totalQuantity']),
  },

  methods: {
    ...mapActions(['loadCart', 'removeCartProduct']),
  },

  created() {
    this.loadCart();
  },

};
</script>
