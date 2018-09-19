import userExtra from '../../api/group/userExtra'
const state = {
  userExtraList:[]
}
// getters
const getters = {}

// actions
const actions = {
  async getUserExtra({ commit, state,rootState }) {
    console.log("rootState:");
   let token=(rootState.user.token);
    let res = await userExtra(token).userExtraGet();
    commit('setUserExtra', res.data.data);
  },
}
// mutations
const mutations = {
  setUserExtra(state, userExtraList) {
    state.userExtraList = userExtraList;
  }
}
export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
