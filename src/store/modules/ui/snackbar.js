const namespaced = true;

const state = {
  show: false,
  message: '',
  color: ''
};

const getters = {
  getShow: state => {
    return state.show;
  },
  getMessage: state => {
    return state.message;
  },
  getColor: state => {
    return state.color;
  }
};

const mutations = {
  muAlert: (state, payload) => {
    state.show = true;
    state.message = payload.msg;
    state.color = payload.color;
  },
  muClose: (state, payload) => {
    state.show = payload;
  }
};

const actions = {
  alert: ({commit}, payload) => {
    commit('muAlert', payload);
  },
  close: ({commit}, payload) => {
    commit('muClose', payload);
  }
};

export default {
  namespaced,
  state,
  getters,
  mutations,
  actions
}