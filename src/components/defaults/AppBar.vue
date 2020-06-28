<template>
  <v-app-bar color="#314559" dense dark>
    <v-app-bar-nav-icon @click="toggleDrawer"></v-app-bar-nav-icon>
    <v-toolbar-title>{{getAppTitle}}</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-chip pill color="#34495E">
      Funds:
      <v-icon size="20">mdi-currency-usd</v-icon>
      {{ getFund }}
    </v-chip>
    <v-tooltip bottom>
      <template v-slot:activator="{ on }">
        <v-btn icon v-on="on" @click="endDay">
          <v-icon>mdi-exit-to-app</v-icon>
        </v-btn>
      </template>
      <span>End day</span>
    </v-tooltip>
    <v-menu left nudge-bottom="55">
      <template v-slot:activator="{ on }">
        <v-btn icon v-on="on">
          <v-icon>mdi-dots-vertical</v-icon>
        </v-btn>
      </template>
      <v-list>
        <v-list-item @click="saveId">
          <v-list-item-title>Save data</v-list-item-title>
        </v-list-item>
        <v-list-item @click="loadSaved">
          <v-list-item-title>Load data</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </v-app-bar>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  methods: {
    ...mapActions("drawer", ["toggleDrawer"]),
    ...mapActions("stocks", ["endDay", "saveId", "loadSaved"])
  },
  computed: {
    ...mapGetters("stocks", ["getFund"]),
    getAppTitle() {
      const route = this.$route.name;
      switch (route) {
        case "Home":
          return "Stock trader";
        case "Stocks":
          return "Stocks";
        default:
          return "Portfolio";
      }
    }
  }
};
</script>

<style scoped>
.v-chip {
  font-size: 1.07em;
}
</style>