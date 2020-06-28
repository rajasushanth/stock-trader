<template>
  <v-scroll-y-reverse-transition>
    <v-card class="mx-auto" max-width="400" light v-show="show">
      <v-card-title>
        {{stockParams.stockName}}
        <v-spacer></v-spacer>
        <v-icon size="21" dark>mdi-currency-usd</v-icon>
        {{stockParams.stockValue}}
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
          @blur="$v.stockUnit.$touch()"
        ></v-text-field>
      </v-flex>
      <v-col md align="right" class="pt-1 pb-4 pr-4">
        <v-spacer></v-spacer>
        <v-btn elevation="2" class="pa-1" color="primary" dark @click="buy">Buy</v-btn>
      </v-col>
    </v-card>
  </v-scroll-y-reverse-transition>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import Validators from "../../validation/validators";
import { validationMixin } from "vuelidate";
import { integer, minValue, required } from "vuelidate/lib/validators";

export default {
  mixins: [validationMixin],
  data: () => ({
    stockUnit: null,
    show: false
  }),
  validations: {
    stockUnit: { required, integer, minValue: minValue(1) }
  },
  props: ["stockParams"],
  mounted() {
    this.show = true;
  },
  computed: {
    ...mapGetters("stocks", ["getTransaction"]),
    stockUnitErrors() {
      return Validators.validateStockField(this.$v.stockUnit);
    }
  },
  methods: {
    ...mapActions("snackbar", ["alert"]),
    buy() {
      this.$v.$touch();
      if (this.stockUnitErrors.length == 0) {
        const stockParams = {
          stockName: this.stockParams.stockName,
          stockUnit: this.stockUnit,
          operation: "buy"
        };
        this.stockParams.buySellStock(stockParams);
        if (this.getTransaction.status) {
          const msg =
            "Successfully purchased " +
            this.stockUnit +
            " unit(s) of " +
            this.stockParams.stockName;
          this.alert({ msg, color: "green" });
        }
      }
    }
  }
};
</script>

<style scoped>
.v-card__title {
  background-color: #537597;
  color: white;
  height: 57px;
}
</style>