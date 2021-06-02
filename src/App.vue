<template>
  <v-app>
    <app-header />
    <v-main v-if="isloaded && getFingerprint">
      <login-form v-if="!getIsLogin" />
      <files-list v-else />
      <v-alert
        class="alert"
        v-if="getError"
        border="bottom"
        color="pink darken-1"
        transition="scale-transition"
        dark
      >
        {{ getError }}
      </v-alert>
    </v-main>
  </v-app>
</template>

<script>
import AppHeader from "@/components/AppHeader";
import LoginForm from "@/components/LoginForm";
import FilesList from "@/components/FilesList";
import FingerprintJS from "@fingerprintjs/fingerprintjs";
import { mapGetters, mapMutations } from "vuex";
export default {
  name: "App",
  components: {
    AppHeader,
    LoginForm,
    FilesList,
  },
  computed: {
    ...mapGetters(["getIsLogin", "getFingerprint", "getError"]),
  },
  data() {
    return {
      isloaded: false,
    };
  },
  created() {
    this.fingerprint();
  },
  mounted() {
    this.isloaded = true;
  },
  methods: {
    ...mapMutations(["setFingerprint"]),
    fingerprint() {
      // Initialize an agent at application startup.
      const fpPromise = FingerprintJS.load();
      // Get the visitor identifier when you need it.
      fpPromise
        .then((fp) => fp.get())
        .then((result) => {
          this.setFingerprint(result.visitorId);
        });
    },
  },
};
</script>
<style>
.v-alert.alert {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  z-index: 1000;
  margin-bottom: 0;
}
</style>
