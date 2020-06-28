<template>
  <v-app>
    <v-container fluid class="pt-0">
      <v-layout row>
        <v-flex md12>
          <app-bar></app-bar>
          <app-nav-drawer></app-nav-drawer>
        </v-flex>
      </v-layout>
      <v-layout row>
        <v-flex md12>
          <v-content>
            <router-view></router-view>
          </v-content>
        </v-flex>
      </v-layout>
    </v-container>
    <app-snack-bar></app-snack-bar>
  </v-app>
</template>

<script>
  import AppBar from "./components/defaults/AppBar.vue";
  import NavDrawer from "./components/defaults/NavDrawer.vue";
  const SnackBar = () => import("./components/defaults/SnackBar.vue");

  export default {
    components: {
      appBar: AppBar,
      appNavDrawer: NavDrawer,
      appSnackBar: SnackBar
    }
  };
</script>
