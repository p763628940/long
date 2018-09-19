// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import MintUI from 'mint-ui' /*移动框架*/
import 'mint-ui/lib/style.css'
import axios from 'axios';
import { httpUrl } from "@/components/http_url/http_url"
import VueAwesomeSwiper from 'vue-awesome-swiper' ///swiper轮播
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import animate from 'animate.css';
import Clipboard from 'vue-clipboard2'
import Vuex from 'vuex';
import store from "./store/index"
import i18nFactory from './language/index'
import api from './api'
import { mapGetters,mapActions,mapState,mapMutations } from 'vuex'
import echarts from 'echarts';
import './style/main.scss';
// 跳转后返回顶部
router.afterEach((to, from, next) => {
  window.scrollTo(0, 0);
})
// 引入echarts

Vue.prototype.$echarts = echarts;
Vue.use(Vuex)
Vue.prototype.Clipboard = Clipboard;
Vue.use(ElementUI);
Vue.prototype.$ajax = axios; /*请求插件*/
Vue.prototype.httpUrl = httpUrl; /*请求接口*/
Vue.prototype.api = api;//api接口入口
Vue.use(MintUI)
Vue.use(VueAwesomeSwiper) ///轮播
/* eslint-disable no-new */
//引入jquery
import $ from "jquery";
/*用户信息*/
/*判断用户是否使用手机浏览器访问开始*/
// 判断是否是手机端浏览器

/*判断用户是否使用手机浏览器访问结束*/
/*全局需要的配置*/
let localhostDev;
// if(location.host.indexOf("imx.com") != -1) {
//   localhostDev = true;
// } else if(location.host.indexOf("localhost") != -1) {
  localhostDev = false;
// } else if(location.host.indexOf("tanghs") != -1) {
//   localhostDev = false;
// } else {
//   localhostDev = true;
// }
// console.log('localhostDev2',localhostDev,getBrowser().pc=="pc" && localhostDev);
console.log(store.getters['setting/checkUrl']());
// if(getBrowser().pc=="pc" && localhostDev){
// 	let ourl2 =  oUrl.replace(oUrl,"https://imx.com/");
// 	location.href = ourl2;
// }
//判断当前页面有无ID
const userQuest = async function (){
	let uri = window.location.search.substring(1);
	let params = new URLSearchParams(uri);
	// console.log('params.has',params.has('t'),store);
	if(params.has('t') && params.has('s')){
		let res = await store.dispatch('user/oauth',{token:params.get('t'),source:params.get('s')});
		if(Number(res.data.status.code) != 200) {
			console.error(res.data.status);
			// this.$message.error({
			// 	message: res.data.status.message,
			// 	type: "error"
			// });
		}else{
			// let curTime = new Date().getTime();
			// window.localStorage.setItem("token", res.data.data.access_token); //获取用户信息用的token
			// window.localStorage.setItem("refresh_token", res.data.data.refresh_token); ///获取刷新token的token
			// window.localStorage.setItem("loginSuccess",true);//判断是否登录成功
			// window.localStorage.setItem("curTime", curTime); ///存一个时间用于判断
			// Vue.prototype.token = res.data.data.access_token;
			// Vue.prototype.refresh_token = res.data.data.refresh_token;
			// Vue.prototype.curTime = curTime;
			return window.history.pushState('','title','/'+window.location.hash);//删除url中的参数
		}

	}
}
userQuest();

////定义全局变量


Vue.prototype.wsIp = localhostDev ? "wss://socket.imx.com" : "ws://39.104.94.182:1888"; ///socket公用IP地址
var ws = localhostDev ? "wss://socket.imx.com" : "ws://39.104.94.182:1888";
var newWs = new WebSocket(ws); ///定义全局
Vue.prototype.ws = newWs;

const global_mix = {
	computed: {
	  // 使用对象展开运算符将 getter 混入 computed 对象中
	  ...mapState('user', [
		'token',
		'userInfo',
		// ...
	  ]),
	  ...mapState('user', {
		getColor: state => state.color,
	  }),
	},
  }
  Vue.mixin(global_mix);

if(!store.state.user.userInfo) {
} else {
	newWs.onopen = function() {
		///获取用户信息
		// axios.get(httpUrl.userInfo, {
		// 	headers: {
		// 		"Authorization": "Bearer " + store.state.user.token
		// 	}
		// }).then(function(res) {
			newWs.send('{"bind_id":"' + store.state.user.userInfo.user_id + '"}');
		// }, function(err) {
		// 	console.log(err)
		// })
	}
}

// store.commit('user/setLang','zh');
const i18n = i18nFactory(store.state.user.lang)


/////全局图片下载
let _this = this;
/////全局配置时区问题
Vue.prototype.formatTime = function(t) {
	//t传入的时间参数,utc传入的时区参数
	if(!t) return;
	//获取本地时间
	var d = new Date();
	//获得本地时区 (单位是小时)
	var timezone = d.getTimezoneOffset() / 60;
	t = t.replace(/-/g, "/"); //兼容苹果电脑
	//格式化传入时间
	var time = new Date(t);

	//转换传入时间为本地时间              设置小时  ----- ( 传入时间的小时数 - 本地时区转化成的小时数  )
	time.setHours(time.getHours() - (timezone));

	//输出时间
	var yy = time.getFullYear(); ///获取年
	var MM = time.getMonth() + 1; ///获取月
	MM = MM < 10 ? '0' + MM : MM; ///字符串拼接月个位数补0
	var dd = time.getDate(); ///获取日
	dd = dd < 10 ? '0' + dd : dd; ///字符串拼接日个位数补0
	var hh = time.getHours(); ///获取小时
	hh = hh < 10 ? '0' + hh : hh; ///字符串拼接小时个位数补0
	var mm = time.getMinutes(); ///获取分钟
	mm = mm < 10 ? '0' + mm : mm; ///字符串拼接分钟个位数补0
	var ss = time.getSeconds(); ///获取秒
	ss = ss < 10 ? '0' + ss : ss; ///字符串拼接秒个位数补0
	var date = yy + '-' + MM + '-' + dd + ' ' + hh + ':' + mm + ':' + ss;
	return date;
}
////全局传递时间参数时区问题
Vue.prototype.formAdd = function(t) {
	//t传入的时间参数,utc传入的时区参数
	if(!t) return;
	//获取本地时间
	var d = new Date();
	//获得本地时区
	var timezone = d.getTimezoneOffset() / 60;
	t = t.replace(/-/g, "/"); //兼容苹果浏览器

	//格式化传入时间
	var time = new Date(t);

	//转换传入时间为本地时间              设置小时  ----- ( 传入时间的小时数 + 本地时区转化成的小时数  )
	time.setHours(time.getHours() + (timezone));

	//输出时间
	var yy = time.getFullYear(); ///获取年
	var MM = time.getMonth() + 1; ///获取月
	MM = MM < 10 ? '0' + MM : MM; ///字符串拼接月个位数补0
	var dd = time.getDate(); ///获取日
	dd = dd < 10 ? '0' + dd : dd; ///字符串拼接日个位数补0
	var hh = time.getHours(); ///获取小时
	hh = hh < 10 ? '0' + hh : hh; ///字符串拼接小时个位数补0
	var mm = time.getMinutes(); ///获取分钟
	mm = mm < 10 ? '0' + mm : mm; ///字符串拼接分钟个位数补0
	var ss = time.getSeconds(); ///获取秒
	ss = ss < 10 ? '0' + ss : ss; ///字符串拼接秒个位数补0
	var date = yy + '-' + MM + '-' + dd + ' ' + hh + ":00:00";
	return date;
}
///路由跳转返回顶部
router.beforeEach((to, from, next) => {
	if (['forget','register'].indexOf(to.name)>-1 && store.state.user.token) {
		next('/index/shouye');
	} else {
	  next();
	}
	// ...
  })


new Vue({
	el: '#app',
	store,
	router,
	i18n,
	components: {
		App
	},
	template: '<App/>'
})
