<template>
  <v-container fluid class="pt-5 pl-5">
    <v-flex md6>
      <v-slide-x-reverse-transition>
        <v-card max-width="600" v-show="show">
          <v-card-title>Trade or view your Portfolio</v-card-title>
          <v-card-text class="pt-6">Click on 'End Day' to begin a new Day with updated stock values</v-card-text>
          <v-card-text>You can Save & Load your data for a day</v-card-text>
          <v-card-text>
            <v-chip pill color="teal lighten-4">Your Funds: ${{getFund}}</v-chip>
          </v-card-text>
        </v-card>
      </v-slide-x-reverse-transition>
    </v-flex>
  </v-container>
</template>

<script>
  import {mapGetters} from 'vuex'

  export default {
    data: () => ({
      show: false
    }),
    computed: {
      ...mapGetters('stocks', [
        'getFund'
      ])
    },
    mounted() {
      this.show = true;
    }
  }
</script>

<style scoped>
  .v-card__title {
    background-color: #537597;
    color: white;
    height: 55px;
  }
</style>
