<template>
	<div id="bankCard">
		<div class="header_box">
			<div class="register_header">
				<p class="back" @click="$router.go(-1)">
					<i class="iconfont icon-zuojiantou"></i>
				</p>
				<p class="register_type">
					{{$t("login.Bindbankcard")}}
				</p>
			</div>
		</div>
		<!--姓名 --开户银行---开户支行----银行卡号-->
		<ul class="userList">
			<li>
				<span class="name">{{$t("login.Names")}}</span>
				<input type="text" v-model="userList.trueName" :disabled="userList.trueName!=''" />
			</li>
			<li @click="popupVisible=true">
				<span class="name">{{$t("userCenter.BankName")}}</span>
				<div>
					<span>{{bank}}</span>
					<i class="iconfont icon-iconfontjiantou5"></i>
				</div>
			</li>
			<li>
				<span class="name">{{$t("userCenter.BankBranch")}}</span>
				<input type="text" v-model="addCard.bankAddress" :placeholder="$t('userCenter.EnterBankBranch')" />
			</li>
			<li>
				<span class="name">{{$t("userCenter.BankCardNo")}}</span>
				<input type="text" v-model="addCard.bankNumber" :placeholder="$t('login.Enterbankcardnu')" />
			</li>
			<li>
				<span class="name">{{$t("userCenter.ConfirmBank")}}</span>
				<input type="text" v-model="addCard.bankNumber_confirmation" :placeholder="$t('userCenter.ConfirmBank')" />
			</li>
			<li>
				<span class="name">{{$t("userCenter.Fundpassword")}}</span>
				<input type="password" v-model="addCard.payPasswd" :placeholder="$t('userCenter.EnterFundpassword')" />
			</li>
		</ul>
		<div class="noKong">
			<span>{{tiShi}}</span>
		</div>
		<!--保存按钮-->
		<div class="submit">
			<button @click="submitForm">{{$t("login.Save")}}</button>
		</div>
		<!--弹出选择银行卡-->
		<mt-popup v-model="popupVisible" position="right">
			<div class="cardHeader">
				<i class="iconfont icon-zuojiantou" @click="popupVisible=false"></i>
				<span class="text">{{$t("userCenter.Choosebankcard")}}</span>
			</div>
			<!--列表部分-->
			<ul class="cardList">
				<li class="cardItem" v-for="(item,index) in bankList" @click="selectbankID(index,item)">
					<span>{{item.bankName}}</span>
					<i class="iconfont icon-duihao" ref="iconDui"></i>
				</li>
			</ul>
		</mt-popup>
		<!--判断用户有无绑定银行卡-->
		<div class="men_ban" v-show="isCard"></div>
		<div class="isbdShow" v-show="isCard">
			<!--提取积分-->
			<div class="isbdShow_header">
				<span>{{$t("login.Bindbankcard")}}</span>
				<i class="iconfont icon-cuowu" @click="isCard=false"></i>
			</div>
			<!--内容-->
			<div class="isbdShow_content">
				{{$t("userCenter.Bingzijinpas")}}
			</div>
			<!--确认取消按钮-->
			<div class="confimCancel">
				<p @click="isCard=false">{{$t("userCenter.Cancel")}}</p>
				<router-link to="/CapitalCipher" tag="p">{{$t("userCenter.determine")}}</router-link>
			</div>
		</div>
	</div>
</template>

<script>
	import axios from "axios"
	import { httpUrl } from "../http_url/http_url"
	import header from "../public/header"
	import $ from "jquery"
	export default {
		data() {
			return {
				bankCardHeader: this.$t("login.Bindbankcard"),
				isCard: false,
				/*绑定资金密码*/
				popupVisible: false,
				/*显示隐藏*/
				bankList: [],
				/*银行列表*/
				userName: "",
				/*姓名*/
				userList: {},
				/*获取用户信息列表*/
				bank: "",
				/*银行信息*/
				addCard: {
					bankId: "",
					/*开户行id*/
					bankAddress: "",
					/*开户支行*/
					bankNumber: "",
					/*银行卡号*/
					bankNumber_confirmation: "",
					/*重复银行卡号*/
					payPasswd: "" /*支付密码*/
				},
				tiShi: ""
			}
		},
		components: {
			"my-header": header
		},
		methods: {
			selectbankID(i, item) { /*列表部分*/
				this.bank = item.bankName;
				$(".icon-duihao").eq(i).show().parent(".cardItem").siblings(".cardItem").find(".icon-duihao").hide();
				this.addCard.bankId = item.id;
				this.popupVisible = false;
			},
			submitForm() { /*提交 */
				var _this = this;
				/*判断是否绑定资金密码*/
				if(_this.userList.pay_password_status == false) {
					_this.isCard = true;
					return false;
				}
				if(_this.addCard.bankId == "") {
					_this.tiShi = _this.$t("userCenter.SelectbankAccount")
					setTimeout(function() {
						_this.tiShi = ""
					}, 1000)
					return false;
				}
				if(_this.addCard.bankAddress == "") {
					_this.tiShi = _this.$t("userCenter.EnterBankBranch")
					setTimeout(function() {
						_this.tiShi = ""
					}, 1000)
					return false;
				}
				if(_this.addCard.bankNumber == "") {
					_this.tiShi =  _this.$t("login.Enterbankcardnu")
					setTimeout(function() {
						_this.tiShi = ""
					}, 1000)
					return false;
				}
				if(_this.addCard.bankNumber_confirmation == "") {
					_this.tiShi =  _this.$t("userCenter.ConfirmBank")
					setTimeout(function() {
						_this.tiShi = ""
					}, 1000)
					return false;
				}
				if(_this.addCard.payPasswd == "") {
					_this.tiShi =  _this.$t("otc.Pleasepassword")
					setTimeout(function() {
						_this.tiShi = ""
					}, 1000)
					return false;
				}
				if(_this.addCard.bankNumber != _this.addCard.bankNumber_confirmation) {
					_this.tiShi = _this.$t("login.BankCarddiffer")
					setTimeout(function() {
						_this.tiShi = ""
					}, 1000)
					return false;
				}
				/*提交请求*/
				axios.post(httpUrl.addCard, {
					bankId: _this.addCard.bankId,
					bankAddress: _this.addCard.bankAddress,
					bankNumber: _this.addCard.bankNumber,
					bankNumber_confirmation: _this.addCard.bankNumber_confirmation,
					payPasswd: _this.addCard.payPasswd
				}, {
					headers: {
						"Authorization": "Bearer " + _this.token
					}
				}).then(function(res) {
					if(res.data.status.code == 200) { /*判断是否绑定成功*/
						if(_this.userList.idCard == "") {
							_this.$message({
								showClose: true,
								message: _this.$t("userCenter.Emailbindingsuccess"),
								type: 'success',
								duration: 2000
							});
							_this.$router.push({
								name:"accountSet"
							})
						} else {
							_this.$message({
								showClose: true,
								message: _this.$t("userCenter.Phonemodifiedsuccess"),
								type: 'success',
								duration: 2000
							});
							_this.$router.push({
								name:"accountSet"
							})
						}
					}
					if(res.data.status.code == 104) {
						_this.tiShi = _this.$t("userCenter.FundsPasswordError")
						setTimeout(function() {
							_this.tiShi = ""
						}, 1000)
						return false;
					}
				}, function(err) {
					console.log(err)
				})

			}
		},
		mounted() {
			let _this = this;
			if(_this.token == null || _this.token == undefined) {
				return false;
			}
			/*取银行列表*/
			axios.get(httpUrl.bankList, {
				headers: {
					"Authorization": "Bearer " + _this.token
				}
			}).then(function(res) {
				_this.bankList = res.data.data;
				for(let i = 0; i < _this.bankList.length; i++) {
					_this.bankList[i].isShow = false
				}
			}, function(err) {
				console.log(err)
			})
			/*获取用户信息*/
			axios.get(httpUrl.userInfo, {
				headers: {
					"Authorization": "Bearer " + _this.token
				}
			}).then(function(res) {
				_this.userList = res.data.data;
			}, function(err) {
				console.log(err)
			})
		}
	}
</script>

<style lang="scss">
	$submit_color:#373959;
	/*登录线条*/

	$submit_borderColor:1px solid #9fa0af;
	/*按钮边框颜色*/

	$border_bottom: 1px solid #1b1d3e;
	/*列表边框颜色*/

	$placeholder:#6f77e0;
	/*文本提示颜色*/

	$slideRight:#171932;
	/*弹框样式*/

	#bankCard {
		.content {
			width: 100%;
			height: 100%;
			background: #fff;
		}
		.mint-popup-right {
			width: 100%;
			height: 100%;
			background: $slideRight;
		}
	}
	/*选择银行头部*/

	.cardHeader {
		width: 100%;
		height: .5rem;
		line-height: .5rem;
		position: relative;
		color: #fff;
		.iconfont {
			margin-left: .1rem;
		}
		.text {
			width: 41%;
			text-align: center;
			position: absolute;
			left: 35%;
			font-size: .15rem;
			font-weight: bold;
		}
		border-bottom:.1rem solid #121528;
	}
	/*选择银行列表*/

	.cardList {
		width: 100%;
		li {
			width: 100%;
			height: .4rem;
			line-height: .4rem;
			color: #fff;
			display: flex;
			justify-content: space-between;
			box-sizing: border-box;
			padding: 0 .1rem;
			border-bottom: $border_bottom;
			.iconfont {
				display: none;
			}
		}
	}
	/*用户列表*/

	.userList {
		width: 100%;
		background: #141738;
		li {
			width: 100%;
			height: .4rem;
			line-height: .4rem;
			color: #fff;
			display: flex;
			justify-content: space-between;
			box-sizing: border-box;
			padding: 0 .1rem;
			border-bottom: $border_bottom;
			input {
				width:52%;
				border: none;
				background: none;
				outline: none;
				color: #fff;
			}
			input::-webkit-input-placeholder {
				color: $placeholder;
				text-align: right;
			}
		}
	}
	/*登录按钮*/

	.submit {
		width: 2.7rem;
		height: .38rem;
		margin: .5rem auto;
		button {
			width: 100%;
			height: .38rem;
			border: $submit_borderColor;
			background: $submit_color;
			color: #fff;
			outline: none;
		}
	}
	/*不能未空的样式*/

	.noKong {
		width: 100%;
		height: .4rem;
		line-height: .4rem;
		text-align: center;
		color: #BE2719;
	}
	/*蒙版*/

	.men_ban {
		width: 100%;
		height: 100%;
		background: rgba(0, 0, 0, 0.5);
		position: fixed;
		left: 0;
		top: 0;
	}
	/*判断有误绑定资金密码*/

	.isbdShow {
		position: fixed;
		left: 10%;
		top: 20%;
		width: 80%;
		background: #32355E;
		color: #fff;
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
			padding: 0 .1rem;
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
	/*头部固定*/

	.register_header {
		width: 100%;
		height: .5rem;
		line-height: .5rem;
		position: relative;
		color: #fff;
		background: #141738;
		.back {
			margin-left: .15rem;
		}
		.register_type {
			position: absolute;
			top: 0;
			left: 20%;
			width: 60%;
			text-align: center;
			font-size: .15rem;
			font-weight: 600;
		}
	}
</style>
