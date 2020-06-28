<template>
  <v-container fluid>
    <v-layout row class="pa-6" v-if="filterStockHolding.length > 0">
      <v-flex v-for="sh in filterStockHolding" v-bind:key="sh.stockName" md6 class="pa-6">
        <app-portfolio-card :stockHolding="sh"></app-portfolio-card>
      </v-flex>
    </v-layout>
    <v-layout row class="pa-6" v-else>
      <v-flex md4 offset-md-4 sm4 offset-sm-4>
        <app-portfolio-no-content></app-portfolio-no-content>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  import {mapGetters} from 'vuex'
  const PortfolioCard = () => import("../components/service/PortfolioCard.vue");
  const PortfolioNoContent= () => import("../components/service/PortfolioNoContent.vue");

  export default {
    computed: {
      ...mapGetters('stocks', [
        'getStockHolding'
      ]),
      filterStockHolding() {
        return this.getStockHolding.filter(({qty}) => qty > 0);
      }
    },
    components: {
      appPortfolioCard: PortfolioCard,
      appPortfolioNoContent: PortfolioNoContent
    }
  }
</script>

<style scoped>

</style>