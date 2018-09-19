import coins from '../../api/group/coins'
/*储存用户本地配置*/
// initial state
const state = {
  logUrl: "",
  isHidden: false,/*判断用户是否有选中隐藏小额币种*/
  sskl: null, //获取申诉口令
  version: '',//mobile 用  版本
  creativityWarning: 0

}

// getters
const getters = {
  checkUrl: (state, getters) => () => {
    let oUrl = window.location.href;
    let browser = getters.getBrowser;
    let isDev = getters.isDev;
    let domain = isDev ? 'tanghs.com' : 'imx.com';
    let ourl1;
    let mUrl = 'm.' + domain;
    if (browser.pc == "mobile" && !oUrl.includes(mUrl)) {
      let isWWW = oUrl.includes('www');
      if (isWWW) {
        ourl1 = oUrl.replace('www.' + domain, mUrl);
      } else {
        ourl1 = oUrl.replace('.' + domain, "-" + mUrl);
      }
      location.href = ourl1;
    } else if (browser.pc == "pc" && oUrl.includes(mUrl)) {
      let isMinus = oUrl.includes('-m');
      if(isMinus){
        ourl1 = oUrl.replace('-' + mUrl, "." + domain);
      }else{
        ourl1 = oUrl.replace(mUrl, domain);
      }
      location.href = ourl1;
    }
    console.log('checkUrl', browser.pc, oUrl, oUrl.includes(mUrl), ourl1);
    return ourl1
  },
  urlPrefix() {
    // return 'FO';
    let urlSplits = window.location.host.split(/\.|-/g);
    let prefix = urlSplits[0];
    return prefix;
  },
  isDev: () => !location.host.includes("imx.com")
  ,
  getBrowser(state, getters) {
    var ua = navigator.userAgent.toLowerCase();
    var btypeInfo = (ua.match(/firefox|chrome|safari|opera/g) || "other")[0];
    if ((ua.match(/msie|trident/g) || [])[0]) {
      btypeInfo = "msie";
    }
    var pc = "";
    var prefix = "";
    var plat = "";
    //如果没有触摸事件 判定为PC
    var isTocuh = ("ontouchstart" in window) || (ua.indexOf("touch") !== -1) || (ua.indexOf("mobile") !== -1);
    if (isTocuh) {
      if (ua.indexOf("ipad") !== -1) {
        pc = "pad";
      } else if (ua.indexOf("mobile") !== -1) {
        pc = "mobile";
      } else if (ua.indexOf("android") !== -1) {
        pc = "androidPad";
      } else {
        pc = "pc";
      }
    } else {
      pc = "pc";
    }
    switch (btypeInfo) {
      case "chrome":
      case "safari":
      case "mobile":
        prefix = "webkit";
        break;
      case "msie":
        prefix = "ms";
        break;
      case "firefox":
        prefix = "Moz";
        break;
      case "opera":
        prefix = "O";
        break;
      default:
        prefix = "webkit";
        break
    }
    plat = (ua.indexOf("android") > 0) ? "android" : navigator.platform.toLowerCase();
    return {
      version: (ua.match(/[\s\S]+(?:rv|it|ra|ie)[\/: ]([\d.]+)/) || [])[1],     //版本
      plat: plat,                   //系统  
      type: btypeInfo,              //浏览器
      pc: pc,
      prefix: prefix,                //前缀
      isMobile: (pc == "pc") ? false : true              //是否是移动端
    };
  }
}

// actions
const actions = {
  async fetchLogUrl({ commit, state }, prefix) {
    let res = await coins().currencyHeaderLogo({ prefix });
    console.log(prefix, res.data.data, res.data.status.code);
    if (res.data.status.code == 200) {
      commit('setData', { logUrl: res.data.data })
    }
    // console.log(res,res.data);
  }
}

// mutations
const mutations = {
  setData(state, data) {
    Object.assign(state, data)
  },
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
