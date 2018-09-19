<template>
	<div id="index">
		<div v-show="loadingIsShow">
			<my-loading></my-loading>
		</div>
		<router-view :sjIsShow="isShowRed"></router-view>
		<div class="oHeight" v-if="this.$route.name!='register'"></div>
		<!--不强制用户版本升级-->
		<div class="meng_ban" v-show="upgradeIsShow"></div>
		<div id="SetUp" v-show="upgradeIsShow">
			<div class="Setup_header">
				<span>{{$t("userCenter.Versionupdate")}}</span>
			</div>
			<div class="Setup_content">
				{{userTiContent}}
			</div>
			<div class="bottom">
				<p @click="cancel">{{$t("capital.Cancel")}}</p>
				<p @click="topVersion">{{$t("userCenter.Update")}}</p>
			</div>
		</div>
		<!--强制用户版本升级-->
		<div class="meng_ban" v-show="forceIsShow"></div>
		<div id="SetUp" v-show="forceIsShow">
			<div class="Setup_header">
				<span>{{$t("userCenter.Versionupdate")}}</span>
			</div>
			<div class="Setup_content">
				{{userTiContent}}
			</div>
			<div class="bottom">
				<p @click="topVersion">{{$t("userCenter.Update")}}</p>
			</div>
		</div>
		<!--底部导航-->
		<footer id="footer_bottom" v-if="this.$route.name!='register'">
			<ul>
				<router-link tag="li" to="/index/shouye">
					<i class="iconfont icon-shouye-1"></i>
					<p>{{$t("list.Home_page")}}</p>
				</router-link>
				<router-link tag="li" :to="{name:'bbjy',params:{id:matchcoin_id}}">
					<i class="iconfont icon-bibi-1"></i>
					<p>{{$t("list.Currency_exchange")}}</p>
				</router-link>
				<router-link tag="li" to="/index/fbjy">
					<i class="iconfont icon-dianduidian-1"></i>
					<p>{{$t("list.Currency_trading")}}</p>
				</router-link>
				<router-link tag="li" to="/index/newWallet">
					<i class="iconfont icon-qianbao1"></i>
					<p>{{$t("shouye.Wallet")}}</p>
				</router-link>
				<router-link tag="li" to="/index/userCenter">
					<i class="icon_red" v-show="isShowRed"></i>
					<i class="iconfont icon-wode-1"></i>
					<p>{{$t("list.Personal_Center")}}</p>
				</router-link>
			</ul>
		</footer>
	</div>
</template>
<script>
	import loading from "@/components/public/loading"
	import { Toast, MessageBox } from 'mint-ui'
	import { mapGetters,mapActions,mapState,mapMutations } from 'vuex'
	export default {
		data() {
			return {
				matchcoin_id: "",
				/*默认选择为第一个币对*/
				isShowRed: false,
				/*显示或者隐藏红点*/
        version: "",
				/*当前版本号码*/
				newVersion: "",
				/*新的版本号码*/
				userTiContent: "",
				/*版本升级内容*/
				upgradeIsShow: false,
				/*判断是否需要升级*/
				forceIsShow: false,
				/*判断是否要强制更新*/
				versionAddress: "",
				/*升级的地址*/
				getCancel: window.localStorage.getItem("cancel"),
				/*用户点击取消升级按钮判断*/
				loadingIsShow: false /*loading效果*/
			}
		},
		components: {
			"my-loading": loading /*loading效果*/
		},
		watch: { /*实现页面监听路由*/
			$route() {
				if(this.$route.name == "bbjy") {
					this.matchcoin_id = this.$route.params.id;
				}
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
		computed:{
			//...mapState('setting',['version']),
			...mapGetters('setting',['urlPrefix'])

		},
		methods: {
			...mapMutations('setting',['setData']),
			cancel() { /*取消*/
				this.upgradeIsShow = false;
				window.localStorage.setItem("cancel", 0);
			},
			topVersion() { /*升级APP*/
				let _this = this;
				var u = navigator.userAgent;
				if(u.indexOf('iPhone') > -1) { //苹果手机
					window.open("itms-services://?action=download-manifest&url=https://www.imx.com/manifest.plist");
					return false;
				}
				_this.loadingIsShow = true; /*显示loading*/
				/*下载本地的包*/
				var dtask = plus.downloader.createDownload(_this.versionAddress, {
					method: "GET"
				}, function(d, status) {
					if(status == 200) { //下载成功
						_this.loadingIsShow = false;
						Toast(_this.$t("userCenter.Downloadsuccee"));
						plus.runtime.install(d.filename, {
							method: "GET"
						}, function() {
							Toast(_this.$t("userCenter.Updatesuccess"));
							setTimeout(function() {
								plus.runtime.quit();
							}, 1000)
						}, function(err) {
							Toast(err.message);
						});
					} else {
						_this.loadingIsShow = false;
						//下载失败,需删除本地临时文件,否则下次进来时会检查到图片已存在
						Toast(_this.$t("userCenter.Downloadfailed"));
						/*下载失败的状态码*/
						//dtask.abort();//文档描述:取消下载,删除临时文件;(但经测试临时文件没有删除,故使用delFile()方法删除);
					}
				}); //启动下载任务
				dtask.start();
			}
		},
		mounted() {
			let _this = this;
			if(_this.$route.name == "bbjy" && _this.$route.params.id != undefined) {
				_this.matchcoin_id = _this.$route.params.id;
				return false;
			} else {
				_this.loadingIsShow = true;
				////获取币对ID
				this.$ajax.get(this.httpUrl.coin_matching,{
			params: {
				symbol: this.urlPrefix,
				...(this.userInfo ? { code: this.userInfo.user_id } : {}),
			}
		}).then(function(res) {
					_this.loadingIsShow = false;
					if(_this.matchcoin_id == "" || _this.matchcoin_id == undefined || _this.matchcoin_id == null) {
						_this.matchcoin_id = res.data.data[0].matchcoins[0].matchcoin_id;
					}
				}, function(err) {
					_this.loadingIsShow = false;
					console.log(err)
				})
			}

			/*判断用户是否在网页上浏览*/
			if(window.location.host) {
				return false;
			} else {
				//获取版本号
				if(window.plus) {
					plus.runtime.getProperty(plus.runtime.appid, function(wgtinfo) {
						 _this.version = wgtinfo.version;
						//_this.setData({'version':wgtinfo.version})
						// window.localStorage.setItem("version", wgtinfo.version); /*将当前版本存起来*/
					});
					/*获取最新版本*/
					/********************升级app开始**************************/
					//1.获取浏览器信息
					var browser = {　　
						versions: function() {　　
							var u = navigator.userAgent,
								app = navigator.appVersion;　　
							return { //移动终端浏览器版本信息
								trident: u.indexOf('Trident') > -1, //IE内核
								　　presto: u.indexOf('Presto') > -1, //opera内核
								　　webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
								　　gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核
								　　mobile: !!u.match(/AppleWebKit.*Mobile.*/)　　 || !!u.match(/AppleWebKit/), //是否为移动终端
								　　ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
								　　android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或者uc浏览器
								　　iPhone: u.indexOf('iPhone') > -1 || u.indexOf('Mac') > -1, //是否为iPhone或者QQHD浏览器
								　　iPad: u.indexOf('iPad') > -1, //是否iPad
								　　webApp: u.indexOf('Safari') == -1,
								　　 //是否web应该程序，没有头部与底部
								　　google: u.indexOf('Chrome') > -1　　
							};　　
						}(),
						language: (navigator.browserLanguage || navigator.language).toLowerCase()　　
					}
					if(browser.versions.ios) { //为IOS
						if(window.location.host) {
							return false;
						}
						this.$ajax.get(this.httpUrl.getVserion, {
							params: {
								type: 0
							}
						}).then(function(res) {
							_this.userTiContent = res.data.data.content;
							_this.versionAddress = res.data.data.down_url;
							/*将新版本存起来*/
							_this.newVersion = res.data.data.version_code;
							/*显示小红点*/
							if(_this.newVersion != _this.version) {
								_this.isShowRed = true; /*显示小红点*/
							}
							let newver = _this.newVersion.split(".");
							let ver = _this.version.split(".");
							if(parseFloat(_this.newVersion.replace(".", "")) < parseFloat(_this.version.replace(".", ""))) { //判断旧版本是否小于新版本
								_this.newVersion = _this.version;
								return false;
							} else if(res.data.data.version_code == _this.version) { /*判断用户使用是否为当前最新版本*/
								return false;
							} else {
								/*遍历版本号码*/
								for(var i = 0; i < newver.length; i++) {
									if(ver[i] != newver[i]) { /*判断版本号是否相同*/
										if(i == 0 || i == 1) { /*强制更新*/
											_this.forceIsShow = true; /*判断是否要强制更新*/
											return false;
										} else if(i != 0 && Number(_this.getCancel) != 0 || i != 1 && Number(_this.getCancel) != 0) {
											_this.upgradeIsShow = true /*判断是否需要升级*/
										}
									}
								}
							}
						}, function(err) {
							console.log(err)
						})
					} else if(browser.versions.android) { //为Android
						/*获取用户浏览器信息userAgent */
						if(window.location.host) {
							return false;
						}
						this.$ajax.get(this.httpUrl.getVserion, {
							params: {
								type: 1
							}
						}).then(function(res) {
							_this.userTiContent = res.data.data.content;
							_this.versionAddress = res.data.data.down_url;
							/*将新版本存起来*/
							_this.newVersion = res.data.data.version_code;
							/*显示小红点*/
							if(_this.newVersion != _this.version) {
								_this.isShowRed = true; /*显示小红点*/
							}
							let newver = _this.newVersion.split(".");
							let ver = _this.version.split(".");
							if(parseFloat(_this.newVersion.replace(".", "")) < parseFloat(_this.version.replace(".", ""))) { //判断旧版本是否小于新版本
								_this.newVersion = _this.version;
								return false;
							} else if(res.data.data.version_code == _this.version) { /*判断用户使用是否为当前最新版本*/
								return false;
							} else {
								/*遍历版本号码*/
								for(var i = 0; i < newver.length; i++) {
									if(ver[i] != newver[i]) { /*判断版本号是否相同*/
										if(i == 0 || i == 1) { /*强制更新*/
											_this.forceIsShow = true /*判断是否要强制更新*/
											return false;
										} else if(i != 0 && _this.getCancel != 0 || i != 1 && _this.getCancel != 0) {
											_this.upgradeIsShow = true /*判断是否需要升级 */
										}
									}
								}
							}
						}, function(err) {
							console.log(err)
						})
					}
					/********************升级app结束***********************/
				}

			}

		}
	}
</script>

<style lang="scss" scoped>
	$bottom_background:#161a32;
	/*底部导航的背景颜色*/

	$iconfont_color:#6a83c1;
	/*字体图标颜色*/

	$active_color:#0096f0;
	/*底部导航*/

	#footer_bottom {
		width: 100%;
		height: .49rem;
		position: fixed;
		bottom: 0;
		left: 0;
		z-index: 60;
		background: $bottom_background;
		ul {
			width: 100%;
			height: .49rem;
			display: flex;
			li {
				flex: 1;
				height: .49rem;
				display: flex;
		        flex-direction: column;
		        align-items: center;
				color: $iconfont_color;
				box-sizing: border-box;
				padding-top: .03rem;
				position: relative;
				.iconfont {
					width: .19rem;
					height: .19rem;
					font-size: .19rem;
					margin: 0.02rem 0 0 0;
					color: #6a85c8;
				}
				p{
					margin-top: .05rem;
				}
				.icon_red {
					width: .05rem;
					height: .05rem;
					background: red;
					border-radius: 50%;
					position: absolute;
					right: 25%;
					top: 10%;
				}
			}
			li:nth-last-child(1) {
				flex: 1.1;
			}
			.router-link-active {
				color: $active_color;
				.iconfont {
					color: $active_color;
				}
			}
		}
	}

	.oHeight {
		height: .49rem;
	}

	#index {
		width: 100%;
		height: 100%;
	}
	/*蒙版*/

	.meng_ban {
		width: 100%;
		height: 100%;
		background: rgba(0, 0, 0, 0.5);
		position: fixed;
		left: 0;
		top: 0;
		z-index: 999;
	}
	/*蒙版内容*/

	#SetUp {
		width: 90%;
		background: #323560;
		color: #fff;
		position: fixed;
		left: 5%;
		top: 25%;
		z-index: 9999;
		/*升级的头部*/
		.Setup_header {
			width: 100%;
			height: .35rem;
			display: flex;
			justify-content: space-between;
			box-sizing: border-box;
			align-items: center;
			padding: 0 .1rem;
			border-bottom: 0.01rem solid #1F2353;
		}
		/*升级的内容部分*/
		.Setup_content {
			width: 100%;
			min-height: .4rem;
			line-height: 1.5;
			box-sizing: border-box;
			padding: .1rem .1rem;
		}
		/*立即升级按钮*/
		.bottom {
			width: 100%;
			height: .35rem;
			display: flex;
			line-height: .35rem;
			justify-content: center;
			border-top: 0.01rem solid #1f2353;
			p {
				flex: 1;
				text-align: center;
				box-sizing: border-box;
			}
			p:nth-of-type(1) {
				border-right: 1px solid #1F2351;
			}
		}
	}
</style>
