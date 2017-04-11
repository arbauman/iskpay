import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    roles: [{ name: '', basePoints: '' }],
    pilots: [{ name: '', roles: [], points: 0 }],
    totalISK: '',
    roleOn: true,
    aboutOn: false,
    totalOn: false,
    outputText: ''
  },
  mutations: {
    removeRole(state, index) {
      state.roles.splice(index, 1);
    },
    addRole(state) {
      state.roles.push({
        name: '',
        basePoints: ''
      });
    },
    updateRole(state, value) {
      /* eslint-disable no-param-reassign */
      state.roles = value;
    }
  }
});
