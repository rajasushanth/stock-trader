<template>
  <v-slide-y-reverse-transition>
    <v-card class="justify-center" max-width="400" min-height="150" v-show="show">
      <v-card-title class="justify-center pt-11">No stocks to display</v-card-title>
      <v-card-subtitle class="text-center">Purchase stocks to view your portfolio</v-card-subtitle>
    </v-card>
  </v-slide-y-reverse-transition>
</template>

<script>
  export default {
    data: () => ({
      show: false
    }),
    mounted() {
      this.show = true;
    }
  }
</script>

<style scoped>

</style>