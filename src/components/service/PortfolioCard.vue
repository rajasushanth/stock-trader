<template>
  <v-scroll-y-reverse-transition>
    <v-card class="mx-auto" max-width="400" light v-show="show">
      <v-card-title>
        {{stockHolding.stockName}}
        <v-spacer></v-spacer>
        Qty({{stockHolding.qty}})
        <v-spacer></v-spacer>
        <v-icon size="21" dark>mdi-currency-usd</v-icon>
        {{ getStock(stockHolding.stockName) }}
      </v-card-title>
      <v-divider class="mx-auto"></v-divider>
      <v-flex md12 class="pt-2 pb-1 pl-4 pr-4">
        <v-text-field
          label="Stocks"
          type="number"
          v-model="stockUnit"
          :error-messages="stockUnitErrors"
          @change="$v.stockUnit.$touch()"
          @input="$v.stockUnit.$touch()"
          @blur="$v.stockUnit.$touch()"></v-text-field>
      </v-flex>
      <v-col md align="right" class="pt-1 pb-4 pr-4">
        <v-spacer></v-spacer>
        <v-btn elevation="2" class="pa-1" color="primary" dark @click="sell">
          Sell
        </v-btn>
      </v-col>
    </v-card>
  </v-scroll-y-reverse-transition>
</template>

<script>
  import Constants from '../../store/modules/commons/constants/appConstants'
  import {mapActions, mapGetters} from 'vuex';
  import Validators from '../../validation/validators'
  import {validationMixin} from 'vuelidate'
  import {integer, minValue, required} from 'vuelidate/lib/validators'

  const {GOOGLE, MONGO, AMAZON, TESLA} = Constants;

  export default {
    mixins: [validationMixin],
    data: () => ({
      stockUnit: '',
      show: false
    }),
    validations: {
      stockUnit: {required, integer, minValue: minValue(1)}
    },
    props: ['stockHolding'],
    mounted() {
      this.show = true;
    },
    computed: {
      ...mapGetters('stocks', [
        'getGoogleStock',
        'getMongoStock',
        'getAmazonStock',
        'getTeslaStock',
        'getTransaction'
      ]),
      stockUnitErrors() {
        return Validators.validateStockField(this.$v.stockUnit);
      }
    },
    methods: {
      getStock(name) {
        switch (name) {
          case GOOGLE:
            return this.getGoogleStock;
          case MONGO:
            return this.getMongoStock;
          case AMAZON:
            return this.getAmazonStock;
          case TESLA:
            return this.getTeslaStock;
        }
      },
      ...mapActions('stocks', [
        'buySellStock'
      ]),
      ...mapActions('snackbar', [
        'alert'
      ]),
      sell() {
        this.$v.$touch();
        if (this.stockUnitErrors.length == 0) {
          const stockParams = {
            stockName: this.stockHolding.stockName,
            stockUnit: this.stockUnit,
            operation: 'sell'
          }
          this.buySellStock(stockParams);
          if (this.getTransaction.status) {
            const msg = 'Successfully sold ' + this.stockUnit + ' unit(s) of ' + this.stockHolding.stockName;
            this.alert({msg, color: 'green'});
          }
        }
      }
    }
  }
</script>

<style scoped>
  .v-card__title {
    background-color: #607D8B;
    color: white;
    height: 57px;
  }
</style>