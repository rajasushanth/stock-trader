const namespaced = true;

const state = {
  drawer: false
};

const getters = {
  getDrawer: state => {
    return state.drawer;
  }
};

const mutations = {
  setDrawerTrue: (state, payload) => {
    state.drawer = payload;
  }
};

const actions = {
  toggleDrawer: ({commit}, payload) => {
    commit('setDrawerTrue', payload);
  }
};

export default {
  namespaced,
  state,
  getters,
  mutations,
  actions
}