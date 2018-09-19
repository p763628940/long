import openApi from '../../api/group/openApi'

// initial state
const state = {
    apiList: [],
    last_page: 1,
    per_page: 15,
    page: 1,//当前页数
    httpCode: 0,
    /*创建成功显示内容*/
    createItem: {},
    /*编辑显示内容*/
    editItem: {},

}

// getters
const getters = {
}

// actions
const actions = {
    async getApiList({ commit, state,rootState }, val) {
      console.log("token1:");
      console.log(rootState.user.token);
        commit('setPage', val);
        let res = await openApi(rootState.user.token).openApi({page:val});
        commit('setApiList', res.data.data);
    },
    async removeApiItem({ commit, state ,rootState}, { eid, index = -1 }) {
        let res = await openApi(rootState.user.token).openApiDelete({eid});
        if (res.data.status.code == 200) {
            index == -1 ? index = state.indexOf(state.apiList.filter(item => item.eid == eid)[0]) : index;
            commit('removeApiByIndex', index);
        }
    },
    async createApi({ commit, state ,rootState}, { note, ips, pwd }) {
        /*发起请求*/
        let res = await openApi(rootState.user.token).openApiPost({
            note,
            ips,
            pwd,
        })
        commit('setCreateCode', res.data.status.code)
        if (res.data.status.code == 200) {
            commit('setCreateRes', res.data.data)
        }

    },
    async editApiItem({ commit, state ,rootState}, { eid, note, ips }) {
        /*发起请求*/
        let res = await openApi(rootState.user.token).openApiPatch({
            note,
            ips,
            eid,
        })
        commit('setCreateCode', res.data.status.code)
        if (res.data.status.code == 200) {
            commit('setEditeRes', { note, ips })
        }
    },
}

// mutations
const mutations = {
    setApiList(state, { data, last_page, per_page }) {
        state.apiList = data
        state.last_page = last_page;
        state.per_page = per_page;
    },
    setPage(state, page) {
        state.page = page;
    },
    removeApiByIndex(state, index) {
        state.apiList.splice(index, 1)
    },
    setCreateRes(state, createObj) {
        state.createItem = createObj;
    },
    setEditItem(state, obj) {
        state.editItem = obj;
    },
    setEditeRes(state, { note, ips }) {
        state.editItem.note = note;
        state.editItem.ips = ips;
    },
    setCreateCode(state, code) {
        state.httpCode = code;
    }

}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
