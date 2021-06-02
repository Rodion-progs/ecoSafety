<template>
  <v-card tile class="overflow-hidden">
    <v-app-bar color="deep-purple accent-4" dense dark>
      <v-app-bar-nav-icon></v-app-bar-nav-icon>

      <v-toolbar-title>EcoSafety</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-menu offset-y v-if="getLogin">
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon v-bind="attrs" v-on="on">
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </template>

        <v-list>
          <v-list-item>
            <v-list-item-title>Ваш логин: {{ getLogin }}</v-list-item-title>
          </v-list-item>
          <v-list-item>
            <v-list-item-title @click="logout">Выход</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>
  </v-card>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
export default {
  name: "AppHeader",
  computed: {
    ...mapGetters(["getLogin"]),
  },
  methods: {
    ...mapMutations(["setIsLogin", "setFiles", "setLogin"]),
    logout() {
      this.setFiles([]);
      this.setIsLogin(false);
      this.setLogin(null);
    },
  },
};
</script>
