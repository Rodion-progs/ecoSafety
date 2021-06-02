<template>
  <v-card class="login">
    <v-form @submit.prevent="submit" class="login__form">
      <v-text-field v-model="login" counter label="Имя" required></v-text-field>
      <v-text-field
        v-model="password"
        label="Пароль"
        counter
        required
      ></v-text-field>
      <v-btn class="mr-4" type="submit" :disabled="!login && !password"> Отправить </v-btn>
      <v-btn @click="clear"> Очистить </v-btn>
    </v-form>
  </v-card>
</template>
<script>
import { mapActions } from "vuex";
export default {
  name: "LoginForm",
  data: () => ({
    login: "",
    password: "",
  }),
  methods: {
    ...mapActions(["sendUser"]),
    submit() {
      const data = {
        login: this.login,
        password: this.password,
      };
      this.sendUser(data);
    },
    clear() {
      this.login = "";
      this.password = "";
    },
  },
};
</script>
<style>
.login {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}
.login__form {
  max-width: 300px;
  width: 90%;
}
</style>
