import Vue from 'vue';
import { loginRequest, logoutRequest, registerRequest } from '../api/auth_api';

export default ({
  state: {
    token: localStorage.getItem('user-token') || '',
    status: '',
  },

  getters: {
    isAuthenticated: (state) => !!state.token,
    authStatus: (state) => state.status,
  },

  mutations: {
    AUTH_REQUEST(state) {
      state.status = 'loading';
    },

    AUTH_SUCCESS(state, token) {
      localStorage.setItem('user-token', token);
      state.status = 'success';
      state.token = token;
      Vue.prototype.$http.defaults.headers.common.Authorization = `Token ${token}`;
    },

    AUTH_ERROR(state) {
      state.status = 'error';
    },

    DELETE_TOKEN(state) {
      localStorage.removeItem('user-token');
      state.token = '';
      delete Vue.prototype.$http.defaults.headers.common.Authorization;
    },
  },

  actions: {
    userLogin({ commit, dispatch }, user) {
      commit('AUTH_REQUEST');
      return loginRequest(user)
        .then((result) => {
          const { token } = result.data;
          commit('AUTH_SUCCESS', token);
          dispatch('loadCart');
        })
        .catch((err) => {
          console.log(err);
          commit('DELETE_TOKEN');
          commit('AUTH_ERROR', err);
        });
    },

    userLogout({ commit, state }) {
      logoutRequest(state.token)
        .then(() => {
          commit('DELETE_TOKEN');
        })
        .catch((err) => {
          console.log(err);
        });
    },

    userRegister({ commit, dispatch }, user) {
      commit('AUTH_REQUEST');
      return registerRequest(user)
        .then((result) => {
          const { token } = result.data;
          commit('AUTH_SUCCESS', token);
          dispatch('loadCart');
        })
        .catch((err) => {
          commit('DELETE_TOKEN');
          commit('AUTH_ERROR', err);
        });
    },
  },
});
