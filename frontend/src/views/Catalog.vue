<template>
    <div class="content">
        <h1 class="title">Catalog</h1>
        <div class="search_form">
            <input placeholder="Search" type="text" class="search_field" v-model="searchLine">
            <button class="btn_search" type="submit" @click="filter(searchLine)">
                <i class="fa fa-search search"></i>
            </button>
        </div>
        <div class="catalog_products_container">
            <div class="catalog_product" v-for="product of filtered" :key="product.id">
                <router-link class="catalog_product_link" :to="`/product/${product.id}`">
                    <img class="catalog_product_img"
                    :src="require(`@/assets/foto/${product.image}`)"
                    :alt="product.name">{{ product.name }}
                </router-link>
            </div>
        </div>
    </div>
</template>

<script>

import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'Catalog',

  data() {
    return {
      searchLine: '',
    };
  },

  computed: {
    ...mapGetters(['filtered']),
  },

  methods: {
    ...mapActions(['loadCatalog', 'filter']),
  },

  created() {
    this.loadCatalog();
  },
};

</script>
