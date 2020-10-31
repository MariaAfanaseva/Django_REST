<template>
    <div class="product_block">
        <h1 class="title">{{ product.name }}</h1>
            <div class="product_container">
                <div>
                    <img class="product_detail_img"
                        :src="require(`@/assets/foto/${product.image}`)"
                        :alt="product.name"
                    >
                </div>
                    <div class="product_short">
                        <p class="product_short_description">
                            {{ product.description }}
                        </p>
                        <p class="product_price">
                            Price: {{ product.price }} &euro;
                        </p>
                        <button class="product_button_buy"
                            @click="addCartProduct(product)">Add to cart
                        </button>
                    </div>
            </div>
    </div>
</template>

<script>

import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'Product',

  computed: {
    ...mapGetters(['product']),
  },

  methods: {
    ...mapActions(['loadProductDetails', 'addCartProduct']),
  },

  created() {
    this.loadProductDetails(this.$route.params.id);
  },
};
</script>
