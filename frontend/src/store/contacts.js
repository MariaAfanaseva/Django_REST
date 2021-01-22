import {
  sendContactData,
} from '../api/base';

export default ({
  state: {
    isSent: false,
    messageId: '',
    contactFormErrors: [],
  },

  mutations: {
    SET_SUCCESS(state, data) {
      state.isSent = true;
      state.messageId = data.messageId;
    },

    SET_ERRORS(state, err) {
      state.contactFormErrors = err;
    },
  },

  actions: {
    sendContactForm({ commit }, form) {
      return sendContactData(form)
        .then((resp) => {
          commit('SET_SUCCESS', resp.data);
        })
        .catch((err) => {
          commit('SET_ERRORS', err.response.data);
        });
    },
  },

  getters: {
    isSent(state) {
      return state.isSent;
    },

    contactFormErrors(state) {
      return state.contactFormErrors;
    },

    messageId(state) {
      return state.messageId;
    },
  },
});
