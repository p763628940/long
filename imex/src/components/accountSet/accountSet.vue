<template>
	<div id="accountSet">
		<!--账户设置头部-->
		<div class="header_box">
			<div class="register_header">
				<p class="back" @click="$router.push('/index/userCenter')">
					<i class="iconfont icon-zuojiantou"></i>
				</p>
				<p class="register_type">
          {{$t("list.Account_setting")}}
				</p>
			</div>
		</div>
		<div class="oHeight"></div>
		<div class="box">
			<!--绑定微信-->
			<div tag="div" @click="bindingWeChat" class="bandingBankCard">
				<p class="text">
          {{$t("userCenter.BindWeChatC")}}
				</p>
				<p class="icon">
					<span v-show="userList.wxpay_status==0">{{$t("userCenter.Unbounded")}}</span>
					<span v-show="userList.wxpay_status!=0">{{$t("userCenter.Binding")}}</span>
					<i class="iconfont icon-iconfontjiantou5"></i>
				</p>
			</div>
			<!--绑定支付宝-->
			<div tag="div" @click="bindingAlipay" class="bandingBankCard">
				<p class="text">
          {{$t("userCenter.Binding")}} {{$t("userCenter.Alipay")}}
				</p>
				<p class="icon">
					<span v-show="userList.alipy_status==0">{{$t("userCenter.Unbounded")}}</span>
					<span v-show="userList.alipy_status!=0">{{$t("userCenter.Binding")}}</span>
					<i class="iconfont icon-iconfontjiantou5"></i>
				</p>
			</div>
			<!--绑定银行卡-->
			<div tag="div" @click="bankCard" class="bandingBankCard">
				<p class="text">
          {{$t("userCenter.BindCard")}}
				</p>
				<p class="icon">
					<span v-show="userList.bank_status==0">{{$t("userCenter.Unbounded")}}</span>
					<span v-show="userList.bank_status!=0">{{$t("userCenter.Binding")}}</span>
					<i class="iconfont icon-iconfontjiantou5"></i>
				</p>
			</div>
		</div>

		<!--判断用户有无绑定身份证-->
		<div class="men_ban" v-show="isInden"></div>
		<div class="isbdShow" v-show="isInden">
			<!--提取积分-->
			<div class="isbdShow_header">
				<span>{{$t("userCenter.importanthint")}}</span>
				<i class="iconfont icon-cuowu" @click="isInden=false"></i>
			</div>
			<!--内容-->
			<div class="isbdShow_content">
				{{$t("userCenter.SecurityYourFunds")}}
			</div>
			<!--确认取消按钮-->
			<div class="confimCancel">
				<p @click="isInden=false">{{$t("capital.Cancel")}}</p>
				<router-link to="/realname" tag="p">{{$t("capital.Confirm")}}</router-link>
			</div>
		</div>
		<!--判断有误绑定资金密码-->
		<div class="men_ban" v-show="isPass"></div>
		<div class="isbdShow" v-show="isPass">
			<!--提取积分-->
			<div class="isbdShow_header">
				<span>{{$t("userCenter.importanthint")}}</span>
				<i class="iconfont icon-cuowu" @click="isPass=false"></i>
			</div>
			<!--内容-->
			<div class="isbdShow_content">
        {{$t("userCenter.Fundssecurity")}}
			</div>
			<!--确认取消按钮-->
			<div class="confimCancel">
				<p @click="isPass=false">{{$t("capital.Cancel")}}</p>
				<router-link to="/CapitalCipher" tag="p">{{$t("capital.Confirm")}}</router-link>
			</div>
		</div>
	</div>
</template>

<script>
	import header from "../public/header"
	import { httpUrl } from "../http_url/http_url.js";
	import axios from "axios";
	export default {
		data() {
			return {
				accountSetHeader: this.$t("list.Account_setting"),
				userList: [],
				/*获取用户信息*/
				isInden: false, /*判断用户是否实名认证*/
				isPass:false    /*判断有无绑定资金密码*/
			}
		},
		components: {
			"my-header": header
		},
		mounted() {
			let _this = this;
			if(_this.token == null || _this.token == undefined) {
				return false;
			}
			///获取用户信息
			axios.get(httpUrl.userInfo, {
				headers: {
					"Authorization": "Bearer " + _this.token
				}
			}).then(function(res) {
				_this.userList = res.data.data;
			}, function(err) {
				console.log(err)
			})
		},
		methods: {
			bankCard() {
				if(this.userList.pay_password_status==false) {  /*绑定资金密码*/
					this.isPass = true;
				}
				if(this.userList.idCard==""){  /*绑定身份*/
					this.isInden = true;
				}
				if(this.userList.pay_password_status && this.userList.idCard != "") { /*判断是否绑定资金密码*/
					this.$router.push("/bankCard")
				}

			},
			bindingWeChat() { /*绑定微信*/
				if(this.userList.pay_password_status==false) {  /*绑定资金密码*/
					this.isPass = true;
				}
				if(this.userList.idCard==""){  /*绑定身份*/
					this.isInden = true;
				}
				if(this.userList.pay_password_status && this.userList.idCard != "") { /*判断是否绑定资金密码*/
					this.$router.push({
						name: "bindingWeChat"
					})
				}

			},
			bindingAlipay() { /*绑定支付宝*/
				if(this.userList.pay_password_status==false) {  /*绑定资金密码*/
					this.isPass = true;
				}
				if(this.userList.idCard==""){  /*绑定身份*/
					this.isInden = true;
				}
				if(this.userList.pay_password_status && this.userList.idCard != "") { /*判断是否绑定资金密码*/
					this.$router.push({
						name: "bindingAlipay"
					})
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	$border_bottom: 1px solid #1b1d3e;
	#accountSet {
		width: 100%;
		height: 100%;
	}
	/*绑定银行卡*/

	.bandingBankCard {
		width: 100%;
		height: .4rem;
		line-height: .4rem;
		color: #fff;
		display: flex;
		justify-content: space-between;
		box-sizing: border-box;
		padding: 0 .1rem;
		border-bottom: $border_bottom;
		border-top: $border_bottom;
		background: #141738;
	}

	$header_bg:#141738;
	/*撑开高度*/

	.oHeight {
		width: 100%;
		height: .5rem;
	}
	/*提醒用户登录*/

	.oText {
		height: .3rem;
		line-height: .3rem;
		text-align: center;
		color: #fff;
	}
	/*头部固定*/

	.header_box {
		width: 100%;
		height: .45rem;
		position: fixed;
		top: 0;
		left: 0;
		z-index: 1000;
		background: #141738;
	}

	.register_header {
		width: 100%;
		height: .5rem;
		line-height: .5rem;
		position: relative;
		color: #fff;
		.back {
			margin-left: .15rem;
		}
		.register_type {
			position: absolute;
			top: 0;
			left: 35%;
			width: 30%;
			text-align: center;
			font-size: .15rem;
			font-weight: 600;
		}
	}
	/*box背景*/

	.box {
		width: 100%;
		height: 90.5%;
		background: $header_bg;
	}
	/*蒙版*/

	.men_ban {
		width: 100%;
		height: 100%;
		position: fixed;
		left: 0;
		top: 0;
		background: rgba(0, 0, 0, 0.6);
		z-index: 66;
	}
	/*判断用户是否绑定身份信息*/

	.isbdShow {
		position: fixed;
		left: 10%;
		top: 20%;
		width: 80%;
		background: #32355E;
		color: #fff;
		z-index: 999;
		.isbdShow_header {
			width: 100%;
			height: .4rem;
			line-height: .4rem;
			display: flex;
			justify-content: space-between;
			box-sizing: border-box;
			padding: 0 .1rem;
			.iconfont {
				font-size: .14rem;
			}
			border-bottom:1px solid #232555;
		}
		.isbdShow_content {
			width: 100%;
			line-height: .2rem;
			text-align: center;
			margin: .2rem 0;
			box-sizing: border-box;
			padding: 0 .25rem;
		}
		/*确认  取消*/
		.confimCancel {
			width: 100%;
			height: .4rem;
			line-height: .4rem;
			display: flex;
			border-top: 1px solid #232555;
			p {
				width: 50%;
				text-align: center;
				color: #fff;
			}
			p:nth-of-type(1) {
				color: #939BEE;
				border-right: 1px solid #232555;
			}
		}
	}
</style>
