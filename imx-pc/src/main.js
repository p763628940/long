// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import axios from "axios";
import Swiper from 'swiper';
import 'swiper/dist/css/swiper.min.css';
import {mapGetters, mapActions, mapState, mapMutations} from 'vuex'
import {httpUrl} from "./components/http_url/http_url";
import Vuex from 'vuex';
import "babel-polyfill";
import stores from './store/store.js';
import 'animate.css';
import api from './api'
import './style/main.scss'

import en from './language/en';
import zh_CN from './language/zh';
import ko from './language/kr';

Vue.use(ElementUI);
Vue.use(Vuex);
// axios.interceptors.request.use(function (config) {
//   if(router.currentRoute.name != 'bbjy'){//币币交易不显示进度条
//     stores.dispatch('showloader')
//   }
//   return config
// }, function (err) {
//   return Promise.reject(err)
// });
// axios.interceptors.response.use(function (response) {
//   stores.dispatch('hideloader')
//   return response
// }, function (error) {
//   if (!error.response || error.response.status === 408 || error.code === 'ECONNABORTED') {
//     console.log('网络断开了')
//   }
//   stores.dispatch('hideloader')
//   return Promise.reject(error);
// });
router.beforeEach((to, from, next) => {
  if (to.name == 'register' && stores.state.user.token) {
    axios.get(httpUrl.coin_matching).then(function (res) {
      let matchcoin_id = res.data.data[0].matchcoins[0].matchcoin_id;
      next({
        name: "bbjy",
        params: {
          id: matchcoin_id
        }
      });
    }, function (err) {
      next('/');
    })
  } else {
    next();
  }
  // ...
})
//接口返回失败的状态码
axios.get(httpUrl.lang).then(function (res) {
  Vue.prototype.errorLang = res.data.cn
})
//判断当前页面有无ID
const userQuest = async function () {

  let uri = window.location.search.substring(1);
  let params = new URLSearchParams(uri);
  if (params.has('t') && params.has('s')) {
    let res = await stores.dispatch('user/oauth', {token: params.get('t'), source: params.get('s')});
    if (Number(res.data.status.code) != 200) {
      console.error(res.data.status);
    } else {
      // window.localStorage.setItem("token", res.data.access_token); //获取用户信息用的token
      // window.localStorage.setItem("loginSuccess",true);//判断是否登录成功
      return window.history.pushState('', 'title', '/' + window.location.hash);
      // window.localStorage.setItem("curTime", curTime); ///存一个时间用于判断
    }

  }
}
userQuest();

//定义全局过滤器
Vue.filter("myCurrency", function (val, num) {
  val = Number(val);
  return val.toFixed(num);
})

///路由跳转返回顶部
// 跳转后返回顶部
router.afterEach((to, from, next) => {
  window.scrollTo(0, 0);
})
let localhostDev = !stores.getters['setting/isDev'];

////定义全局变量
Vue.prototype.wsIp = localhostDev ? "wss://socket.imx.com" : "ws://39.104.94.182:1888"; ///socket公用IP地址
var wsIp = localhostDev ? "wss://socket.imx.com" : "ws://39.104.94.182:1888";
Vue.prototype.ws = new WebSocket(wsIp);

Vue.prototype.api = api;//api接口入口

const global_mix = {
  computed: {
    // 使用对象展开运算符将 getter 混入 computed 对象中
    ...mapState('user', [
      'token',
      'userInfo'
      // ...
    ]),
    ...mapState('user', {
      getColor: state => state.color,
    }),
  },
}
Vue.mixin(global_mix);    /*混入式*/
/*判断用户是否使用手机浏览器访问开始*/
// 判断是否是手机端浏览器
console.log(stores.getters['setting/checkUrl']());
/*判断用户是否使用手机浏览器访问结束*/

//定义全局方法
Vue.prototype.callback = function () {
  ///判断用户登录后有没有进行操作
  //		var newTime = new Date().getTime(); ////获取当前时间的秒数
  //当前时间 - 存的时间<60分钟   &&当前时间 - 存的时间 > 10分钟
  //		if(newTime - window.localStorage.getItem("curTime") < 1000 * 60 * 60 && newTime - window.localStorage.getItem("curTime") > 1000 * 60 * 10) {
  //			axios.post(httpUrl.upDatatoken, {
  //				"client_id": httpUrl.client_id,
  //				"client_secret": httpUrl.client_secret,
  //				"refresh_token": window.localStorage.getItem("refresh_token"),
  //				"grant_type": "refresh_token"
  //			}).then(function(res) {
  //				window.localStorage.setItem("curTime", newTime);
  //				Vue.prototype.refresh_token = res.data.refresh_token;
  //				Vue.prototype.token = res.data.access_token;
  //				Vue.prototype.curTime = newTime;
  //			}, function(err) {
  //				console.log(err)
  //			})
  //		}
}
//心跳重连

/////判断低版本ie浏览器
var theUA = window.navigator.userAgent.toLowerCase();
if ((theUA.match(/msie\s\d+/) && theUA.match(/msie\s\d+/)[0]) || (theUA.match(/trident\s?\d+/) && theUA.match(/trident\s?\d+/)[0])) {
  var ieVersion = theUA.match(/msie\s\d+/)[0].match(/\d+/)[0] || theUA.match(/trident\s?\d+/)[0];
  if (ieVersion <= 9) {
    document.write("<div style='position: fixed; top: 0; left: 0; right: 0; bottom: 0; z-index: 100; width: 100%; height: 100%; padding-top: 200px;  background-color: #fff'><P  style='font-size: 50px; text-align: center'>请使用高版本IE浏览器或者谷歌浏览器！<br><span style='font-size:30px;'>ie浏览器推荐下载地址：<a style='color: #343434; text-decoration: underline' href= 'http://rj.baidu.com/soft/detail/14917.html?ald' > http: //rj.baidu.com/soft/detail/14917.html?ald</a></span><br><span style='font-size: 30px;'>谷歌浏览器推荐下载地址:<a  style='color: #343434;text - decoration: underline ' href='http: //rj.baidu.com/soft/detail/14744.html?ald'>http://rj.baidu.com/soft/detail/14744.html?ald</a></span></P></div>")
  }
}


/////全局配置时区问题
Vue.prototype.formatTime = function (t) {
  //t传入的时间参数,utc传入的时区参数
  if (!t) return;
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
  var yy = time.getFullYear();     ///获取年
  var MM = time.getMonth() + 1;    ///获取月
  MM = MM < 10 ? '0' + MM : MM;    ///字符串拼接月个位数补0
  var dd = time.getDate();         ///获取日
  dd = dd < 10 ? '0' + dd : dd;	 ///字符串拼接日个位数补0
  var hh = time.getHours();		 ///获取小时
  hh = hh < 10 ? '0' + hh : hh;	 ///字符串拼接小时个位数补0
  var mm = time.getMinutes();		 ///获取分钟
  mm = mm < 10 ? '0' + mm : mm;	 ///字符串拼接分钟个位数补0
  var ss = time.getSeconds();		 ///获取秒
  ss = ss < 10 ? '0' + ss : ss;	 ///字符串拼接秒个位数补0
  var date = yy + '-' + MM + '-' + dd + ' ' + hh + ':' + mm + ':' + ss;
  return date;
}
////全局传递时间参数时区问题
Vue.prototype.formAdd = function (t) {
  //t传入的时间参数,utc传入的时区参数
  if (!t) return;
  //获取本地时间
  var d = new Date();
  //获得本地时区
  var timezone = d.getTimezoneOffset() / 60;
  t = t.replace(/-/g, "/");  //兼容苹果浏览器

  //格式化传入时间
  var time = new Date(t);

  //转换传入时间为本地时间              设置小时  ----- ( 传入时间的小时数 + 本地时区转化成的小时数  )
  time.setHours(time.getHours() + (timezone));

  //输出时间
  var yy = time.getFullYear();     ///获取年
  var MM = time.getMonth() + 1;    ///获取月
  MM = MM < 10 ? '0' + MM : MM;    ///字符串拼接月个位数补0
  var dd = time.getDate();         ///获取日
  dd = dd < 10 ? '0' + dd : dd;	 ///字符串拼接日个位数补0
  var hh = time.getHours();		 ///获取小时
  hh = hh < 10 ? '0' + hh : hh;	 ///字符串拼接小时个位数补0
  var mm = time.getMinutes();		 ///获取分钟
  mm = mm < 10 ? '0' + mm : mm;	 ///字符串拼接分钟个位数补0
  var ss = time.getSeconds();		 ///获取秒
  ss = ss < 10 ? '0' + ss : ss;	 ///字符串拼接秒个位数补0
  var date = yy + '-' + MM + '-' + dd + ' ' + hh + ":00:00";
  return date;
}


///国际语言切换
import VueI18n from 'vue-i18n';

Vue.use(VueI18n);
Vue.config.lang = getUrlParam('lang') || stores.state.user.lang || 'en'
/*默认语言*/
const i18n = new VueI18n({
  locale: Vue.config.lang,
  messages: {
    en: en,
    'zh-CN': zh_CN,
    ko: ko,
  }
})

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  data() {
    return {
      // getColor:window.localStorage.getItem("setColor")
    }
  },
  // watch:{
  // 	getColor(newData,Data){
  // 		console.log(newData)
  // 	}
  // },
  router,
  store: stores,
  i18n,
  components: {
    App
  },
  template: '<App/>'
})
function getUrlParam(param) {
  //正则匹配
  var reg = new RegExp('[&?]' + param + '=([^\\&]*)', 'i')
  //截取当前url中“?”后面的字符串，
  var hrefStr = window.location.search
  //函数编码的 URI 进行解码
  hrefStr = decodeURIComponent(decodeURIComponent(hrefStr))
  //匹配正则
  var value = reg.exec(hrefStr)
  return value ? value[1] : ''
}
