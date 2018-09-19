<template>
	<div id="app">
		<router-view/>
		<div class="isTui" v-show="isTui">
			<p>{{$t("userCenter.ClickingExit")}}</p>
		</div>
    <!--提示断网情况-->
    <div class="BrokenNetwork" v-show="isNetwork">
      <img src="./assets/wifi@3x.png" alt="">
      <p class="noNetwork">{{$t("noNetWork.Network")}}</p>
      <p class="blue" @click="reaold">{{$t("noNetWork.Reload")}}</p>
    </div>
  </div>
</template>

<script>
	import loading from "@/components/public/loading"; /*loading效果*/
	import store from "@/store.js"; /*store插件*/
	// import VueI18n from 'vue-i18n';
	import { mapGetters,mapActions,mapState,mapMutations } from 'vuex'
	export default {
		name: 'App',
		data() {
			return { /*提示用户退出应用*/
				isTui: false,
        isNetwork:false,  /*判断是否断网*/
			}
		},
		methods: {
			...mapMutations('user',['setData','logout']),
			initData() {
				this.$store.commit('initbgColor');
			},
      reaold(){
        window.location.reload();
      }
		},
		computed: {
		...mapState('user', [
			'userID',
			'orderID'
	  ]),
			...mapGetters([
			"bgColor"
		])
		},
    watch: { /*实现页面监听路由*/
      $route() {
        // if(this.$route.name=="forget" || this.$route.name=="register"){  //记录在注册和重置密码页面登录
        //   window.localStorage.setItem("isRegister",true);
        // }
        // if(this.$route.name!="forget" && this.$route.name!="register" && this.$route.name!="login"){ //删除在注册页面
        //   window.localStorage.removeItem("isRegister");
        // }
        // if(window.localStorage.getItem("loginSuccess")){
        //   window.location.reload();
        //   window.localStorage.removeItem("loginSuccess");
        // }
      }
    },
		mounted() {
			let _this = this;
			/*清楚默认事件*/
      document.querySelector("#app").addEventListener("touchmove",function (event) {
        event.stopPropagation();
      })
      /*判断 用户是否升级*/
      /*判断背景颜色的色值  ---先设置颜色值*/
      document.body.style.background = "#111627";
      /*初始化语言*/
			/*初始化背景*/
			_this.initData();
			/*页面监听用户是否点击手机的后退按钮*/
        document.addEventListener('plusready', function() {
				// H5 plus事件处理
				// 设置系统状态栏背景为红色
				plus.navigator.setStatusBarBackground('#121528');
				plus.navigator.setStatusBarStyle('light')
				/*手机监听后台运行开始*/
				document.addEventListener("pause", function() {
					/**************接受实时推送的消息*****start************/
					_this.ws.onmessage = function(e) {
						var arr = JSON.parse(e.data);
						if(arr.type == "ping") { ////判断type
							_this.ws.send('{"pong":' + Date.now() + '}');
						} else if(arr.type == "otc") {
							if(arr.content != null || arr.content != undefined) {
								// window.localStorage.setItem("OrderId", arr.content.orderId);
								_this.setData({'orderID':arr.content.orderId});
								let otext;
								if(arr.content.type != 1) { /*文字*/
									otext = arr.content.content;
								} else {
									otext = "系统消息"
								}
								plus.push.createMessage(otext, '', {
									title: "otc 你有一笔新订单"
								});
								plus.push.addEventListener("click", function(msg) {
									// 分析msg.payload处理业务逻辑
									if(!_this.userID) {
										_this.$router.push({
											name: "fbdd"
										})
										return false;
									}
									/*获取订单详情*/
									_this.$ajax.get(_this.httpUrl.getddxqUrl, {
										headers: {
											'Authorization': 'Bearer ' + _this.token
										},
										params: {
											"blaceId": _this.orderID//window.localStorage.getItem("OrderId")
										}
									}).then(function(res) {
										if(res.data.data.pur_user == _this.userID) { /*判断下单用户id与登录用户id*/
											/*卖家*/
											if(res.data.data.type == 1) { //买
												_this.$router.push({
													name: "sellddxq"
												})
											} else {
												_this.$router.push({
													name: "buyddxq"
												})
											}
										} else {
											/*买家*/
											if(res.data.data.type == 1) { //买
												_this.$router.push({
													name: "buyddxq"
												})
											} else {
												_this.$router.push({
													name: "sellddxq"
												})
											}
										}
									}, function(err) {
										console.log(err)
									})

								}, false);

							}
						}
					}
					/**************接受实时推送的消息*****end************/

				}, false);
				/*手机端监听后台运行的结束*/

				/*退出应用程序*/
				var webview = plus.webview.currentWebview();
				plus.key.addEventListener('backbutton', function() {
					webview.canBack(function(e) {
						if(e.canBack && _this.$route.name != "home" && _this.$route.name != "bbjy" && _this.$route.name != "otc" && _this.$route.name != "userCenter") {
							webview.back();
						} else {
							//首页返回键处理
							//处理逻辑：1秒内，连续两次按返回键，则退出应用；
							var first = null;
							plus.key.addEventListener('backbutton', function() {
								//首次按键，提示‘再按一次退出应用’
								if(!first) {
									first = new Date().getTime(); /*存入用户*/
									_this.isTui = true; /*显示提示*/
									setTimeout(function() {
										_this.isTui = false;
										first = null;
									}, 1000);
								} else {
									/*退出应用*/
									if(new Date().getTime() - first < 1500) {
										var u = navigator.userAgent,
											app = navigator.appVersion;
										var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; //g
										var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
										/*判断用户使用的手机类型*/
										if(isIOS) {
											plus.runtime.quit();
											window.localStorage.removeItem("token");
											window.localStorage.removeItem("refresh_token");
											window.localStorage.removeItem("userID");
											window.localStorage.removeItem("username");
											window.localStorage.removeItem("OrderId");
											_this.$router.push('/'); ///跳转到首页
											_this.logout();
											// window.location.reload();
										}
										if(isAndroid) {
											plus.runtime.quit();
											plus.android.runtimeMainActivity().moveTaskToBack(false);
											window.localStorage.removeItem("token");
											window.localStorage.removeItem("refresh_token");
											window.localStorage.removeItem("userID");
											window.localStorage.removeItem("username");
											window.localStorage.removeItem("OrderId");
											_this.$router.push('/'); ///跳转到首页
											_this.logout();
											// window.location.reload();
										}
									}

								}
							}, false);
						}
					})
				});
			});
			/*监听用户是否点击用户的后退按钮*/
			// 响应拦截器
			this.$ajax.interceptors.response.use((response) => {
				if(response.data.status != undefined) {
					if(Number(response.data.status.code) == -200) {
						_this.$message.error({
							message: response.data.status.message,
							type: "error"
						});

					}
					if(Number(response.data.status.code) != 200) {
						_this.$message.error({
							message: response.data.status.message,
							type: "error"
						});
					}
				}
				if(response.status == 200) {
					_this.loadingIsShow = false;
				}
				return response;
			}, (error) => {
        if (!error.response || error.response.status === 408 || error.code === 'ECONNABORTED') {
          _this.isNetwork = true;
        }else{
          this.isNetwork = false;
        }
				if(error.response) {
					_this.loadingIsShow = false;
					switch(error.response.status) {
						case 401:
							// // 这里写清除token的代码
							window.localStorage.removeItem("token");
							window.localStorage.removeItem("refresh_token");
							window.localStorage.removeItem("curTime");
							window.localStorage.removeItem("vuex");
							_this.logout();
														axios.get(httpUrl.coin_matching).then(function(res) {
							if(_this.$router.name!="bbjy"){

                _this.$router.push({ /*跳转到币币页面*/
										name: "bbjy",
										params: {
											id: res.data.data[0].matchcoins[0].matchcoin_id
										}
									});
								}

							});
							// window.location.reload();
							break;
						case 504:
							_this.loadingIsShow = false;
							_this.$message.error({
								message: '响应时间过长',
								type: "error"
							});
							break;
						case 500:
							_this.loadingIsShow = false;
							_this.$message.error({
								message: '服务器错误',
								type: "error"
							});
							break;
					}
				}
				return Promise.reject(error)
			})
		}
	}
</script>

<style lang="scss" scoped>
	#app {
		width: 100%;
		height: 100%;
    background: #111627;
    padding-bottom: env(safe-area-inset-bottom);
    overflow-y: auto;
  }
	/*提示用户再次点击退出应用*/
	.isTui {
		width: 60%;
		height: .5rem;
		background: #202350;
		color: #fff;
		position: fixed;
		left: 25%;
		top: 35%;
		z-index: 8889;
		text-align: center;
		line-height: .5rem;
	}
	/*保存成功*/

	.Preservation_success {
		width: 60%;
		text-align: center;
		height: .4rem;
		line-height: .4rem;
		background: #4b5090;
		color: #ffff;
		position: fixed;
		bottom: 20%;
		left: 20%;
		z-index: 9999;
		font-size: .15rem;
	}
  /*断网提示*/
  .BrokenNetwork{
    width: 100%;
    height: 100%;
    background: #181a31;
    position: fixed;
    left: 0;
    top: 0;
    z-index: 999;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    img{
      width: .4rem;
      height: .35rem;
    }
    p{
      font-size: .14rem;
      margin-top: .2rem;
    }
    .noNetwork{
      color: #686b94;
    }
    .blue{
      color: #65c3c2;
    }
  }
</style>
