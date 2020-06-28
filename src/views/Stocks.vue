<template>
  <v-container fluid>
    <v-layout row wrap class="pt-6">
      <v-flex md6 class="pa-6">
        <app-stock-card :stockParams="stockParams(GOOGLE)"></app-stock-card>
      </v-flex>
      <v-flex md6 class="pa-6">
        <app-stock-card :stockParams="stockParams(MONGO)" ></app-stock-card>
      </v-flex>
      <v-flex md6 class="pa-6">
        <app-stock-card :stockParams="stockParams(AMAZON)"></app-stock-card>
      </v-flex>
      <v-flex md6 class="pa-6">
        <app-stock-card :stockParams="stockParams(TESLA)"></app-stock-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  import {mapActions, mapGetters} from 'vuex'
  import StockCard from "../components/service/StockCard.vue";
  import Constants from '../store/modules/commons/constants/appConstants'

  const {GOOGLE, MONGO, AMAZON, TESLA} = Constants;
  export default {
    data: () => ({
      GOOGLE,
      MONGO,
      AMAZON,
      TESLA
    }),
    computed: {
      ...mapGetters('stocks', [
        'getGoogleStock',
        'getMongoStock',
        'getAmazonStock',
        'getTeslaStock'
      ])
    },
    components: {
      appStockCard: StockCard,
    },
    methods: {
      ...mapActions('stocks', [
        'buySellStock'
      ]),
      stockParams(stockName) {
        switch (stockName) {
          case this.GOOGLE:
            return {
              stockValue: this.getGoogleStock,
              stockName: this.GOOGLE,
              buySellStock: this.buySellStock
            };
          case this.MONGO:
            return {
              stockValue: this.getMongoStock,
              stockName: this.MONGO,
              buySellStock: this.buySellStock
            };
          case this.AMAZON:
            return {
              stockValue: this.getAmazonStock,
              stockName: this.AMAZON,
              buySellStock: this.buySellStock
            };
          case this.TESLA:
            return {
              stockValue: this.getTeslaStock,
              stockName: this.TESLA,
              buySellStock: this.buySellStock
            };
        }
      }
    }
  }
</script>

<style scoped>
</style>
