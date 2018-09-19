import Vue from "vue";
import Vuex from "vuex";
import router from "../router/index"
import openApi from './modules/openApi'
import user from './modules/user'
import setting from "./modules/setting"
import createPersistedState from "vuex-persistedstate";
Vue.use(Vuex);
let localStorage = window.localStorage;
var state = {
	bgColor: ""
};
const mutations = { /*处理状态（数据）变化*/
	tabbgcolor(state, n) {
		state.bgColor = n;
		localStorage.setItem("bgColor", n);
	},
	initbgColor(state) {
		if(localStorage.getItem("bgColor") == null) {
			localStorage.setItem("bgColor", "0");
			state.bgColor = "0";
		} else {
			state.bgColor = localStorage.getItem("bgColor");
		}
	},
	signOut() {
		window.localStorage.removeItem("token");
		window.localStorage.removeItem("refresh_token");
		window.localStorage.removeItem("userID");
		window.localStorage.removeItem("username");
		window.localStorage.removeItem("OrderId");
		router.push('/'); ///跳转到首页

		// window.location.reload();
	},
};
/*处理你要干什么，异步请求，判断，流程控制*/
const actions = {
	tabbgcolor: ({ /*切换背景颜色*/
		commit
	}, data) => {
		commit('tabbgcolor', data);
	},
	signOut: ({ /*退出*/
		commit
	}) => {
		commit("signOut")
	}
}
const getters = { /*state中的数据*/
	bgColor(state) {
		return state.bgColor
	}
}

//需要导出store对象
export default new Vuex.Store({
	plugins: [createPersistedState({
        paths:['user','setting']
    })],
	actions,
	mutations,
	state,
	getters,
	modules:{
        openApi,
        setting,
        user
    },
});
