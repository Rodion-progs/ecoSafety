import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
Vue.use(Vuex);

const API = "https://host1.medsafe.tech:40443/api";

export default new Vuex.Store({
  state: {
    isLogin: false,
    login: null,
    files: [],
    fingerprint: "",
    err: null,
  },
  mutations: {
    setLogin(state, payload) {
      state.login = payload;
    },
    setIsLogin(state, payload) {
      state.isLogin = payload;
    },
    setFiles(state, payload) {
      state.files = payload;
    },
    setFingerprint(state, payload) {
      state.fingerprint = payload;
    },
    setError(state, payload) {
      state.err = payload;
    },
  },
  actions: {
    // eslint-disable-next-line
    sendUser({ getters, dispatch, commit }, data) {
      const IMEI = getters.getFingerprint;
      const json = JSON.stringify({
        ...data,
        IMEI,
        Name_app: "connect",
      });
      axios.get(`${API}/client_login?json=${json}`)
        .then(({data}) => {
          if (data[0].id_login === 0) throw new Error(data[0].err_text);
          const login = data[0].id_login
          const json = JSON.stringify({
            id_login: login,
            id_people: login,
            TK: data[0].TK,
            IMEI,
            Name_app: "connect",
            Name_event: "list_load",

          });
          dispatch("getFiles", json);
          commit("setLogin", login);
          commit("setIsLogin", true);
        })
        .catch(e => {
          console.log(e)
          commit("setError", e);
          setTimeout(() => commit("setError", null), 5000)
        });
    },
    getFiles({ commit }, json) {
      axios.get(`${API}/test?json=${json}`).then(({data}) => {
        commit("setFiles", data.body)

      }).catch(e => console.log(e));
    }
  },
  getters: {
    getIsLogin: (state) => state.isLogin,
    getLogin: (state) => state.login,
    getFiles: (state) => state.files,
    getFingerprint: (state) => state.fingerprint,
    getError: (state) => state.err,
  },
});
