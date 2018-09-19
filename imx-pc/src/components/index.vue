<template>
	<div>
		<!--头部导航-->
		<div id="hb-header" :class="{'header-active':$route.path == '/index/login' || $route.path == '/index/register' || $route.path == '/index/forget'}" v-show="$route.path!='/index/Help'">
			<!--图片logo-->
			<router-link to="/" tag="div" class="hb-logo">
				<img :src="logUrl" />
			</router-link>
			<!--导航链接跳转-->
			<ul class="hb-header-left">
				<li>
					<router-link to="/index/Home">{{$t('list.home_page')}}</router-link>
				</li>
				<li>
					<router-link :to="{name:'bbjy',params:{id:matchcoin_id}}">{{$t('list.Currency_exchange')}}</router-link>
				</li>
				<li>
					<router-link to="/index/otc">{{$t('list.Currency_trading')}}</router-link>
				</li>
				<!--<li>
					<router-link to="/index/Help" target="_blank">{{$t('list.Novice_guidance')}}</router-link>
				</li>-->
				<!--<li>
					<router-link to="/index/Airdrop">{{$t("airdrop.Airdrop")}}</router-link>
				</li> -->
				<li class="wallet">
					<p :class="{'wallet1':navigationIsShow}" @click="$router.push({name:'wallet'})">{{$t("SupperWallet.SuperWallet")}}</p>
					<div class="navigation" v-show="navigationIsShow">
						<ul>
              <li @click="toCapital">{{$t("SupperWallet.WalletManagement")}}</li>
							<router-link tag="li" to="/index/Airdrop">{{$t("SupperWallet.CandyBox")}}</router-link>
							<router-link to="/index/Taocoin" tag="li">
								{{$t('list.Taocoin')}}
							</router-link>
							<router-link to="/index/vote" tag="li">
								{{$t("SupperWallet.Votingonsensus")}}
							</router-link>
						</ul>
					</div>
				</li>
				<!--<li>
					<router-link to="/index/Airdrop">{{$t("airdrop.Airdrop")}}</router-link>
				</li>
				<li>
					<router-link to="/index/wallet">超级钱包</router-link>
				</li>-->
				 <!--<li>
					<router-link to="/index/Taocoin">{{$t('list.Taocoin')}}</router-link>
				</li>
				<li>
					<router-link to="/index/vote">投票共识</router-link>
				</li>  -->
			</ul>
			<!--右侧内容-->
			<div class="hb-header-right">
				<!--登录注册-->
				<div class="login" v-show="!userInfo">
					<router-link to="/index/login">{{$t('list.Sign_in')}}</router-link>
					<span></span>
					<router-link to="/index/register">{{$t('list.register')}}</router-link>
				</div>
				<!--用户信息-->
				<div class="userInfo" v-if="userInfo">
					<p class="username" :class="{'userActive':userListShow}">{{userInfo.name}}<span class="iconfont icon-icon3" :class="{'rotate':userListShow}"></span></p>
					<!--个人中心列表-->
					<ul class="userlist" :class="{'qhbg-active':getColor==1}">
						<li>
							<router-link to="/index/userCenter">{{$t('list.Personal_Center')}}</router-link>
						</li>
						<li>
							<router-link to="/index/capital">{{$t('SupperWallet.WalletManagement')}}</router-link>
						</li>
						<li>
							<router-link to="/index/InvitationCode">{{$t('list.My_Invitation_Code')}}</router-link>
						</li>
						<li>
							<router-link to="/index/api_admin">{{$t('list.api_Administration')}}</router-link>
						</li>
						<li>
							<router-link to="/index/userCenter">{{$t('list.Account_setting')}}</router-link>
						</li>

						<li @click="signOut()">
							<a href="javascript:;">{{$t('list.Exit_account')}}</a>
						</li>
					</ul>
				</div>
				<!--切换背景start-->
				<div class="bg" @mouseover="colorShow = 1" @mouseleave="colorShow = 0">
					<div class="qh-bg">
						<span v-if="getColor!=0&&getColor!=1">{{$t('list.Switching_background')}}</span>
						<span v-if="getColor== 0">{{$t('list.Advanced')}}</span>
						<span v-if="getColor==1">{{$t('list.Basic')}}</span>
					</div>
					<ul class="qhbj-list" v-if="colorShow" :class="{'qhbg-active':getColor==1}">
						<li @click="activeColor(0)">{{$t('list.Advanced')}}</li>
						<li @click="activeColor(1)">{{$t('list.Basic')}}</li>
						<!--<li v-for="(item,index) in Colorlist" @click="activeColor(index)">
						{{item.name}}
					</li>-->
					</ul>
				</div>
				<!--切换背景end-->
				<!--切换语言start-->
				<div class="yy">
					<div class="yy-box">
						<div class="qh-yy">
							<span v-html="language[lang]"></span>
						</div>
					</div>
					<!--定位语言选择-->
					<ul class="yu-yan" :class="{'qhbg-active':getColor==1}">
						<li v-for="(value,key) in language" @click="changeLang(key)">{{value}}</li>
					</ul>
				</div>
				<!--切换语言end-->
			</div>
			<!--资产-->
			<!--<div class="zhi-chang" v-show="zichan&&$route.path == '/index/bbjy'">
				<p v-show="!UserIsShow">
					{{$t('list.Asset_conversion')}}:
					<span>
						<i class="iconfont icon-xinghao"></i>
						<i class="iconfont icon-xinghao"></i>
						<i class="iconfont icon-xinghao"></i>
						<i class="iconfont icon-xinghao"></i>
					</span>
					<span>≈
						<i class="iconfont icon-xinghao"></i>
						<i class="iconfont icon-xinghao"></i>
						<i class="iconfont icon-xinghao"></i>
						<i class="iconfont icon-xinghao"></i>
					</span>
				</p>
			</div>-->

		</div>

		<!--视图层-->
		<router-view @userSignIn="userSignIn" :bgColor="getColor"></router-view>

	</div>
</template>

<script>
	//引入语言翻译部分
	import axios from "axios";
	import Vue from "vue";
	import VueI18n from 'vue-i18n';
	import $ from "jquery";
	import { mapGetters,mapActions,mapState,mapMutations } from 'vuex'
	/////引入请求接口
	import { httpUrl } from "./http_url/http_url.js";
	export default {
		data() {
			return {
				userListShow: false,
				// path: httpUrl.userInfo, ///获取用户信息接口 currency_id
				zichan: false, ///资产部分
				userShow: true, /////登录注册显示隐藏
				// userInfo: null, ///获取用户信息
				show: false, ///显示隐藏---语言
				colorShow: false, ///切换背景颜色
				sellbuyList: [], ///卖列表
				// jieColor: "#181928",
				// token: window.localStorage.getItem("token"), ////获取传过来的token值
				// curTime: window.localStorage.getItem("curTime"), ////获取用户登录时间
				language: {
					"zh-CN": "中文简体",
					"en": "English",
					"ko": "한국어",
				},
				Colorlist: [{
						"name": this.$t("list.Advanced"),
						"color": "#EAEFF3"
					},
					{
						"name": this.$t("list.Basic"),
						"color": "#181928"
					}
				],
				//items: store.fetch(), ///本地存储选择语言内容
				userColor: null, ///本地存储颜色名称
				// getColor: window.localStorage.getItem("setColor"), ///获取颜色值
				UserIsShow: true, //显示用户资产
				CurBalance: 0, ///人民币余额
				matchcoin_id: "", ///币对ID
				getPath: this.$router.history.current.params.id,
				/*获取路由定义的id*/
				//				RMBBalance: 0, ///资产折合比特币的剩余余额
				//				userError: 0 ////判断用户登录是否冲突
				selectedLang: "",
				/*选择的语言*/
				navigationIsShow: false //二级导航
			}
		},
		computed: {
			...mapState('user',['userInfo','userId','token','username','curTime','lang']),
			...mapState('setting',['logUrl']),
			...mapGetters('setting',['urlPrefix']),
		},
		methods: {
			...mapActions('user',['info']),
			...mapActions('setting',['fetchLogUrl']),
			...mapMutations('user',[
				'logout','setLang','setColor' // 将 `this.logout()` 映射为 `this.$store.commit('logout')`
			]),
      toCapital(){ /*跳转详情页面*/
        if(this.token==null&&this.token==undefined){
          this.$router.push({
            name:"login"
          })
          return false;
        }else{
          this.$router.push({name:"Trading_account"});
        }
      },
			////接受自组件事件
			userSignIn(show) {
				if(show == undefined) {
					this.zichan = false;
					this.userShow = true;
				} else {
					this.userShow = show;
					this.zichan = !show;
				}
			},
			//实现语言的切换
			changeLang(lang) {
				this.$i18n.locale = lang;
				Vue.config.lang = lang;
				// window.localStorage.setItem("lang", lang);
				this.setLang(lang);
				// window.location.reload()
			},
			///实现背景颜色的切换
			activeColor(index) {
				// window.localStorage.setItem("setColor", index); /*切换样式改变*/
				this.userColor = this.Colorlist[index].name;
				this.setColor(index);
				// window.location.reload();
			},
			signOut() { /////退出账户
				this.logout();
				this.$router.push({
					name: "bbjy",
					params: {
						id: this.matchcoin_id
					}
				}); ///跳转到币币交易页面
				// window.location.reload();
			}
		},
		filters: {
			//小数点过滤器 不四舍五入
			number(value, num) {
				var toFixedNum = Number(value).toFixed(num + 1);
				var realVal = toFixedNum.substring(0, toFixedNum.toString().length - 1);
				return realVal;
			}
		},
		created() {
			let _this = this;
			this.fetchLogUrl(this.urlPrefix);
			if(_this.$route.name == "bbjy") {
				_this.matchcoin_id = _this.$route.params.id;
			} else {
				////获取币对ID
				axios.get(httpUrl.coin_matching).then(function(res) {
					_this.matchcoin_id = res.data.data[0].matchcoins[0].matchcoin_id;
				}, function(err) {
					console.log(err)
				})
			}
		},
		watch: { /*实现页面监听路由*/
			$route() {
				if(this.$route.name == "bbjy") {
					this.matchcoin_id = this.$route.params.id;
				}
        if(this.$route.name=="wallet"||this.$route.name=="Airdrop"||this.$route.name=="vote"||this.$route.name=="Taocoin"){
          this.navigationIsShow = true;
          $(".wallet a").addClass("router-link-active");
        }else{
          this.navigationIsShow = false;
        }
        if(this.$route.name=="Airdrop"){
          $(".wallet a").addClass("router-link-active");
        }
				if(this.$route.name == "Exchangeofdetails") {
					document.querySelector("#bw8-chatWrap").style.display = "none";
				} else {
					// document.querySelector("#bw8-chatWrap").style.display = "block";
					$("#bw8-chatWrap").css('display','block');
				}
			}
		},
		async mounted() {
			var _this = this;
      if(this.$route.name=="wallet"||this.$route.name=="Airdrop"||this.$route.name=="vote"||this.$route.name=="Taocoin"){
        this.navigationIsShow = true;
        $(".wallet a").addClass("router-link-active");
      }else{
        this.navigationIsShow = false;
      }
			//判读用户的token值是否失效
			///登录成功执行
			//			if(_this.token != null || _this.token != undefined) {
			//				///判断
			//				var time = setInterval(function() {
			//					var newDate = new Date().getTime(); ///获取当前时间
			//					if(newDate - _this.curTime > 1000 * 60 * 60 * 144) {
			//						clearInterval(time)
			//						window.localStorage.removeItem("token");
			//						_this.$router.push({
			//							name: "bbjy",
			//							params: {
			//								id: _this.matchcoin_id
			//							}
			//						}); ///跳转到币币交易页面
			//						window.location.reload(); ///删除完刷新页面
			//					}
			//				}, 1000)
			//			}

			if(_this.token != null && _this.token != undefined) {
				///判断
				var time = setInterval(function() {
					var newDate = new Date().getTime(); ///获取当前时间
					if(newDate - _this.curTime > 1000 * 60 * 60 * 144) {
						clearInterval(time)
						_this.$router.push({
							name: "bbjy",
							params: {
								id: _this.matchcoin_id
							}
						}); ///跳转到币币交易页面
						// window.location.reload(); ///删除完刷新页面
					}
				}, 1000)
			}
			/////执行调用的信息
			this.userSignIn();
			$("body").click(function(event) {
				_this.userListShow = false;
			})
			////获取用户信息
			////获取token值     	GET请求
			///1.判断
			//console.log(this.token)
			///////获取净资产折合
			//			axios.interceptors.response.use(function (config) {
			//	        // Do something before request is sent
			//		        console.log('接收响应')
			//		        return config
			//		      }, function (error) {
			//		        // Do something with request error
			//		        console.log('响应出错')
			//		        return Promise.reject(error)
			//		      })
			//		      })

			if(!this.token) {
				this.zichan = false; ////资产隐藏
				this.userShow = true; ////登录注册显示
			} else {
				this.userShow = false; //登录注册隐藏
				this.zichan = true; //资产显示
				let res = await this.info();
				// _this.userInfo = res.data.data.name;
				///获取资产折合
				//				axios.get(httpUrl.finances, {
				//					headers: {
				//						"Authorization": "Bearer " + Vue.prototype.token
				//					}
				//				}).then(function(res) {
				//					let arr = res.data.data;
				//					for(let i = 0; i < arr.length; i++) {
				//						_this.CurBalance += parseFloat(arr[i].btc_blance);
				//						_this.RMBBalance += parseFloat(arr[i].cny_blance);
				//					}
				//				}, function(err) {
				//					console.log(err)
				//				})
				//
			}

		}
	}
</script>

<style lang="scss">
	/*后补css*/
	/*1.登录注册router-active*/

	.login {
		.router-link-active {
			color: #19d6e1 !important;
		}
	}
	/*选中用户列表颜色*/

	.userActive {
		color: #bbb5ff;
	}
	/*2.跳转登录或者注册需要改变的头部样式*/

	.header-active {
		background: #0b091f !important;
	}

	.rotate {
		top: 0 !important;
		transform: rotate(-70deg);
		-ms-transform: rotate(-70deg);
		/* IE 9 */
		-moz-transform: rotate(-70deg);
		/* Firefox */
		-webkit-transform: rotate(180deg);
		/* Safari 和 Chrome */
		-o-transform: rotate(-70deg);
		/* Opera */
	}
	/*标准版本颜色配置*/
	/*1.颜色切换*/

	.qhbg-active {
		border: 1px solid #ddd !important;
		background-color: #fff !important;
		li {
			color: #000 !important;
			border-bottom: 1px solid #ddd !important;
			a {
				color: #000 !important;
			}
		}
		li:hover {
			background-color: #f5f5f5 !important;
		}
	}
	/*语言定位*/

	.yy {
		width: 100px;
		margin-left: 10px;
		float: left;
		position: relative;
		.yy-box {
			width: 100px;
			height: 70px;
		}
	}

	.yy:hover .qh-yy {
		border: 1px solid #787ef2 !important;
		color: #787ef2;
	}

	.yy:hover .yu-yan {
		display: block;
	}
	/*语言选择部分*/

	.yu-yan {
		width: 100px;
		position: absolute;
		z-index: 100;
		right: 5px;
		top: 53px;
		display: none;
		background-color: #383962;
		border: 1px solid #303257;
		border-radius: 2px;
		li:nth-last-child(1) {
			border: none;
			border-bottom-left-radius: 4px;
			border-bottom-right-radius: 4px;
		}
		li:nth-of-type(1) {
			border-top-left-radius: 4px;
			border-top-right-radius: 4px;
		}
		li {
			width: 100%;
			height: 32px;
			text-align: center;
			line-height: 30px;
			font-size: 14px;
			color: #fff;
			border-bottom: 1px solid #303257;
			cursor: pointer;
		}
		li:hover {
			background-color: #303256;
		}
	}
	/*头部信息*/

	#hb-header {
		min-width: 1200px;
		height: 60px;
		background-color: rgba(11, 12, 27, 0.8);
		color: #c8cde3;
		position: relative;
		.navigation {
			position: absolute;
			top: 60px;
			left: 0;
			width: 100%;
			height: 50px;
			background: rgba(36,41,79, 0.6);
			z-index: 55;
			ul {
				display: flex;
				height: 50px;
				align-items: center;
				margin-left: 30%;
				li {
					cursor: pointer;
					color: #b8bcd7;
					margin: 0 30px;
					font-size: 15px;
				}
			}
		}
		/*头部logo*/
		.hb-logo {
			width: 185px;
			height: 25px;
			text-align: center;
			line-height: 55px;
			font-size: 25px;
			cursor: pointer;
			float: left;
			margin: 0 30px;
			margin-top: 19px;
			img {
				width: 100%;
				height: 100%;
			}
		}
		/*左侧导航部分*/
		.hb-header-left {
			float: left;
			li {
				float: left;
				line-height: 60px;
				margin-right: 53px;
				font-size: 15px;
				a {
					color: #c8cde3;
				}
			}
			.router-link-active {
				color: #19d6e1;
			}
			.wallet>p {
				width: 100%;
				height: 100%;
        cursor: pointer;
				display: inline-block;
				position: relative;
			}
      .wallet1{
        color: #19d6e1;
      }
			.wallet1:before {
				display: block;
				content: '';
				border-width: 8px 8px 8px 8px;
				border-style: solid;
				border-color: transparent transparent #12f3f7 transparent;
				/* 定位 */
				position: absolute;
				left: 41%;
				bottom: 0;
			}
		}
		/*资产部分*/
		.zhi-chang {
			/*width: 300px;*/
			height: 60px;
			line-height: 60px;
			float: right;
			font-size: 14px;
			margin-right: 20px;
			.yan {
				font-size: 22px;
				color: #fff;
				float: left;
				margin-right: 14px;
				cursor: pointer;
			}
			p {
				float: left;
				.iconfont {
					font-size: 12px;
				}
			}
		}
		/*右侧导航部分*/
		.hb-header-right {
			height: 60px;
			margin-right: 15px;
			float: right;
			font-size: 15px;
			/*登录注册*/
			.login {
				float: left;
				line-height: 60px;
				a {
					color: #c8cde3;
					/*margin-left: 7px;*/
				}
				a:hover {
					color: #19d6e1;
				}
				span {
					display: inline-block;
					height: 10px;
					border-right: 1px solid #c8cde3;
					margin: 0 5px;
				}
			}
			/*3.用户信息*/
			.userInfo:hover .userlist {
				display: block;
			}
			.userInfo:hover {
				color: #787ef2;
			}
			.userInfo:hover .username .iconfont {
				top: 0 !important;
				transform: rotate(-70deg);
				-ms-transform: rotate(-70deg);
				/* IE 9 */
				-moz-transform: rotate(-70deg);
				/* Firefox */
				-webkit-transform: rotate(180deg);
				/* Safari 和 Chrome */
				-o-transform: rotate(-70deg);
				/* Opera */
			}
			.userInfo {
				float: left;
				position: relative;
				.username {
					/*width: 115px;*/
					height: 60px;
					cursor: pointer;
					line-height: 60px;
					position: relative;
					.iconfont {
						font-size: 12px;
						margin-left: 5px;
						position: absolute;
						top: 2px;
						transition: .3s all;
					}
				}
				.userlist {
					display: none;
					width: 190px;
					background: #383962;
					border-radius: 2px;
					border: 1px solid #303257;
					position: absolute;
					top: 50px;
					left: 2px;
					z-index: 333;
					transition: .3s all;
					li {
						width: 100%;
						height: 37px;
						line-height: 37px;
						color: #fff;
						font-size: 14px;
						border-bottom: 1px solid #303257;
						box-sizing: border-box;
						padding-left: 23px;
						a {
							display: inline-block;
							width: 100%;
							height: 100%;
							color: #fff;
						}
					}
					li:hover {
						background-color: #303256;
					}
					li:nth-last-child(1) {
						border-bottom: none;
					}
				}
			}
			/*背景颜色*/
			.bg {
				width: 85px;
				/*height: 150px;*/
				float: left;
				margin-left: 50px;
				text-align: center;
				position: relative;
			}
			.bg:hover .qh-bg {
				color: #787ef2;
			}
			.qhbj-list {
				width: 100px;
				position: absolute;
				left: 0px;
				top: 50px;
				z-index: 999;
				background-color: #383962;
				border-radius: 2px;
				border: 1px solid #303257;
				li {
					width: 100px;
					height: 35px;
					color: #fff;
					text-align: center;
					line-height: 35px;
					border-bottom: 1px solid #303257;
					cursor: pointer;
				}
				li:nth-of-type(1) {
					border-top-left-radius: 4px;
					border-top-right-radius: 4px;
				}
				li:nth-last-child(1) {
					border-bottom: none;
					border-bottom-left-radius: 4px;
					border-bottom-right-radius: 4px;
				}
				li:hover {
					background-color: #303256;
				}
			}
			/*.qhbj-list::after {
				content: "";
				width: 0;
				height: 0;
				position: absolute;
				top: -5px;
				left: 30px;
				border-right: 6px solid transparent;
				border-bottom: 6px solid #383962;
				border-left: 6px solid transparent;
			}*/
			/*切换背景*/
			.qh-bg {
				line-height: 60px;
				cursor: pointer;
			}
			/*切换语言*/
			.qh-yy {
				width: 82px;
				height: 23px;
				font-size: 12px;
				float: left;
				margin: 18px 0 0 8px;
				text-align: center;
				line-height: 23px;
				border: 1px solid #fff;
				border-radius: 2px;
				cursor: pointer;
			}
		}
	}
</style>
