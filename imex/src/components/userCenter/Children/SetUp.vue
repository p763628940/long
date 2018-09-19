<template>
	<div id="SetUp">
		<!--设置头部-->
		<my-header :text="headerText"></my-header>
		<!--选择语言类型等-->
		<div class="SetUp_content">
			<ul>
				<li @click="tabLangIsShow=true">
					<span class="text">{{$t("userCenter.Language")}}</span>
					<p class="right">
						<span>{{langName}}</span>
					</p>
				</li>
				<li @click="tabbg(0)">
					<span class="text">{{$t("userCenter.Theme")}}</span>
					<p class="right">
						<span>{{$t("list.Advanced")}}</span>
					</p>
				</li>
			</ul>
		</div>
		<!--确认提交-->
		<div class="submit" v-show="isLogin">
			<button @click="SignOutQue=true">{{$t("list.Exit_account")}}</button>
		</div>
		<!--退出登录弹出框-->
		<div class="men_ban" v-show="SignOutQue"></div>
		<div class="Sign_out_alert" v-show="SignOutQue">
			<div class="box_tuiChu">
				<div class="Sign_out_alert_header">
					<span>{{$t("list.Exit_account")}}</span>
					<i class="iconfont icon-cuowu" @click="SignOutQue=false"></i>
				</div>
				<div class="Sign_out_alert_content">
          {{$t("userCenter.Suresignout")}}
				</div>
			</div>
			<div class="button">
				<p @click="SignOutQue=false">{{$t("userCenter.Thinkagain")}}</p>
				<p @click="signOut()">{{$t("capital.Confirm")}}</p>
			</div>
		</div>
		<!--切换语言开始-->
		<mt-popup v-model="tabLangIsShow" position="right">
			<div class="tabHeader">
				<i class="iconfont icon-zuojiantou" @click="tabLangIsShow=false"></i>
				<span class="tabHeaderText">{{$t("userCenter.Languagetype")}}</span>
			</div>
			<!--选择语言类型-->
			<ul class="langTypeList">
				<li v-for="(item,key) in langList" class="langItem" @click="tablang(item,key)">
					<span>{{item.text}}</span>
					<i class="iconfont icon-duihao" v-show="item.isShow"></i>
				</li>
			</ul>
		</mt-popup>
		<!--切换语言结束-->

	</div>
</template>

<script>
	import header from "../../public/backHeader";
	import { mapGetters,mapActions,mapState,mapMutations } from 'vuex'
	export default {
		data() {
			return {
				num: 0,
				langIndex:0,
				fankuiIsShow: false,
				/*反馈内容*/
				tabLangIsShow:false,
				/*切换语言显示隐藏*/
				SignOutQue: false,
				/*退出登录弹框*/
				langList: [{
						name: 'zh',
						text: "中文简体",
						isShow: false
					},
					{
						name: 'en',
						text: "English",
						isShow: false
					},
					{
						name: 'ko',
						text: "한국어",
						isShow: false
					},
				],
				isLogin:false      /*判断用户是否登录*/
			}
		},
		computed: {
		  ...mapGetters([
			"bgColor",
		  ]),
		  langName(){
			  return this.langList[this.langIndex].text;
		  },
      headerText(){
		    return this.$t("userCenter.Setting");
      },
			...mapGetters([
				"bgColor",
			]),
			...mapState('user',['lang'])
		},
		components: {
			"my-header": header
		},
		mounted() {
			/*判断拿到的值*/
			var lang = this.lang;
			/*if(window.localStorage.getItem("lang") == null){
		        lang="zh";
		        this.langList[0].isShow=true;
		     }*/
			//this.lang = this.langList[0].text;
			for(let i = 0; i < this.langList.length;i++) {
					if(this.langList[i].name == lang){
						// this.lang = this.langList[i].text;
						 this.langList[i].isShow = true;
						 this.langIndex = i;
						 break;
					}
			}
			/*判读用户是否登录*/
			if(this.token!=null && this.token!=undefined){
				this.isLogin = true;
			}

		},
		methods: {
			...mapMutations('user',['setLang','logout']),
			tablang(item,index) {
				 for (let i=0;i<this.langList.length;i++) {
						this.langList[i].isShow = false;
				 }
				  this.langList[index].isShow = true;
				  this.langIndex = index;
				//   this.lang = this.langList[index].text;
				  this.setLang(this.langList[index].name);
				  this.tabLangIsShow = false;
				  this.$i18n.locale = this.langList[index].name;
			},
			tabbg(index){		/*切换背景颜色*/
				this.$store.commit('tabbgcolor',index);
			},
			signOut(){
				this.logout();
				this.$store.commit("signOut")
			}
		}
	}
</script>
<style lang="scss">
	#SetUp {
		.mint-popup {
			width: 100%;
			height: 100%;
			background: #141738;
			overflow-y: auto;
		}
	}
</style>
<style lang="scss" scoped>
	$submit_color:#373959;
	/*登录线条*/

	$submit_borderColor:1px solid #9fa0af;
	$tishi_bg:#171a3b;
	$right_text:#898fd6;
	/*右侧颜色值*/

	$bg:#171932;
	/*背景颜色*/

	$listBorder:1px solid #1a1d3e;
	$backBgColor:#262746;
	/*退出登录*/

	$border_button:1px solid #3f437b;
	/*按钮边框*/

	$alert_border:1px solid #2b2e5b;
	$alert_inputBorder:1px solid #474a85;
	$alert_inputbg:#262746;
	#SetUp {
		color: #fff;
	}

	.SetUp_content {
		width: 100%;
		ul {
			width: 100%;
			background: #141738;
			li {
				width: 100%;
				height: .4rem;
				line-height: .4rem;
				border-bottom: 0.01rem solid #1b1d40;
				display: flex;
				align-items: center;
				justify-content: space-between;
				box-sizing: border-box;
				padding: 0 .1rem;
				p {
					span {
						color: #6a72d5;
					}
				}
			}
		}
	}
	/*提交*/

	.submit {
		width: 2.7rem;
		height: .38rem;
		margin: .4rem auto;
		button {
			width: 100%;
			height: .38rem;
			border: $submit_borderColor;
			background: $submit_color;
			color: #fff;
			outline: none;
		}
	}
	/*蒙版*/

	.men_ban {
		width: 100%;
		height: 100%;
		position: fixed;
		left: 0;
		top: 0;
		z-index: 55;
		background: rgba(0, 0, 0, 0.5);
	}
	/*退出登录弹出框*/

	.Sign_out_alert {
		width: 90%;
		background: $tishi_bg;
		position: fixed;
		left: 5%;
		top: 30%;
		z-index: 66;
		.box_tuiChu {
			width: 100%;
			box-sizing: border-box;
			padding: 0 .15rem;
			.Sign_out_alert_header {
				width: 100%;
				height: .4rem;
				line-height: .4rem;
				display: flex;
				justify-content: space-between;
				color: #fff;
				font-size: .14rem;
				border-bottom: $alert_border;
			}
			.Sign_out_alert_content {
				width: 100%;
				height: .6rem;
				line-height: .6rem;
				text-align: center;
				color: #fff;
				font-size: .14rem;
			}
		}
		.button {
			width: 100%;
			height: .4rem;
			line-height: .4rem;
			border-top: $alert_border;
			display: flex;
			p {
				width: 50%;
				text-align: center;
				color: #fff;
				box-sizing: border-box;
			}
			p:nth-of-type(1) {
				border-right: $alert_border;
			}
		}
	}
	/*切换头部*/

	.tabHeader {
		width: 100%;
		height: .5rem;
		line-height: .5rem;
		box-sizing: border-box;
		padding-left: .1rem;
		position: relative;
		.tabHeaderText {
			position: absolute;
			left: 10%;
			width: 80%;
			text-align: center;
			font-size: .15rem;
			font-weight: 600;
		}
	}
	/*选择语言类型*/

	.langTypeList {
		width: 100%;
		.langItem {
			width: 100%;
			height: .35rem;
			box-sizing: border-box;
			padding: 0 .15rem;
			display: flex;
			align-items: center;
			justify-content: space-between;
			border-bottom: 0.01rem solid #1b1d40;
		}
	}
</style>
