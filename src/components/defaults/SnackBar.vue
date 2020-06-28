<template>
  <v-snackbar v-model="snackbar" :timeout="timeout" bottom right class="pr-4 pb-4" :color="getColor">
    {{ getMessage }}
    <v-btn color="white" icon text @click="close(false)">
      <v-icon dense>mdi-close-circle </v-icon>
    </v-btn>
  </v-snackbar>
</template>

<script>
  import {mapActions, mapGetters} from 'vuex'

  export default {
    data: () => ({
      timeout: 2500
    }),
    computed: {
      ...mapGetters('snackbar', [
        'getShow',
        'getMessage',
        'getColor'
      ]),
      snackbar: {
        set(value) {
          this.close(value);
        },
        get() {
          return this.getShow;
        }
      }
    },
    methods: {
      ...mapActions('snackbar', [
        'close'
      ])
    }
  }
</script>

<style scoped>

</style>