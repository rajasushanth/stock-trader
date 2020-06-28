<template>
  <v-navigation-drawer v-model="drawer" absolute temporary>
    <v-list nav dense>
      <v-list-item-group active-class="deep-orange--text text--accent-4">
        <v-card color="#3A3939" dark height="40">
          <v-list-item to="/" active-class="white--text text--accent-1">
            <v-list-item-icon>
              <v-icon>mdi-home</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>Stock trader</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-card>
        <v-divider></v-divider>
        <v-list-item to="/portfolio">
          <v-list-item-icon>
            <v-icon>mdi-account-circle</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Portfolio</v-list-item-title>
        </v-list-item>
        <v-list-item to="/stocks">
          <v-list-item-icon>
            <v-icon>mdi-currency-usd</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Stocks</v-list-item-title>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters("drawer", ["getDrawer"]),
    drawer: {
      set(drawer) {
        this.$store.dispatch("drawer/toggleDrawer", drawer);
        return drawer;
      },
      get() {
        return this.getDrawer;
      }
    }
  }
};
</script>

<style scoped>
</style>