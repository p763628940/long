import Vue from 'vue'
import Vuex from 'vuex'

import actions from './actions.js'
import mutations from './mutations.js'
import openApi from './modules/openApi'
import user from './modules/user'
import setting from './modules/setting'
import userExtra from './modules/userExtra'
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex)
export default new Vuex.Store({
    plugins: [createPersistedState({
        paths:['user','setting']
    })],
    modules:{
        mutations,
        openApi,
        user,
        setting,
        userExtra
    },
    actions
})
