<template>
	<div id="identity">
		<!--账户设置头部-->
		<div class="header_box">
			<div class="register_header">
				<p class="back" @click="$router.push('/index/userCenter')">
					<i class="iconfont icon-zuojiantou"></i>
				</p>
				<p class="register_type">
          {{$t("userCenter.Authentication")}}
				</p>
			</div>
		</div>
		<div class="oHeight"></div>
		<div class="box">

			<!--绑定银行卡-->
			<div class="bandingBankCard" @click="toRealname">
				<p class="text">
					{{$t("userCenter.Verified")}}
				</p>
				<p class="icon">
					<span v-show="userList.trueName == ''">{{$t("userCenter.Notcertified")}}</span>
					<span v-show="userList.trueName != ''">{{$t("userCenter.verified")}}</span>
					<i class="iconfont icon-iconfontjiantou5" v-show="userList.auth_grade==0"></i>
				</p>
			</div>
			<!--<div class="bandingBankCard" v-if="!isShow">
			<p class="text">
				实名认证
			</p>
			<p class="icon">
				<span>已认证</span>
			</p>
		</div>	-->
			<div class="bandingBankCard" @click="toSenior">
				<p class="text">
					{{$t("userCenter.AdvancedCertification")}}
				</p>
				<p class="icon">
					<span v-show="userList.auth_grade==0">{{weiRen}}</span>
					<span v-show="userList.auth_grade>0">{{$t("userCenter.verified")}}</span>
					<i class="iconfont icon-iconfontjiantou5" v-show="userList.auth_grade==0"></i>
				</p>
			</div>

		</div>
	</div>
</template>

<script>
	import header from "../public/header"
	import axios from "axios"
	import { httpUrl } from "../http_url/http_url"
	export default {
		data() {
			return {
				header: this.$t("userCenter.Authentication"),
				userList: [],
				weiRen:this.$t("userCenter.Notcertified"),
				isShen:false
			}
		},
		components: {
			"my-header": header
		},
		methods: {
			toRealname() {
				/*实名认证*/
				if(this.userList.idCard != '' && this.userList.auth_grade > 0) {
					return false;
				} else {
					this.$router.push({
						name: "realname"
					});
				}
			},
			toSenior() {
				/*高级认证*/
				if(this.userList.idCard == '') {
					this.$message({
						message: this.$t("userCenter.AuthenticationFirst"),
						type: 'warning'
					});
					return false;
				}
				if(this.isShen==true){
					return false;
				}
				if(this.userList.idCard != '' && this.userList.auth_grade > 0) {
					return false;
				} else {
					this.$router.push({
						name: "senior"
					})
				}
			}
		},
		mounted() {
			let _this = this;
			if(_this.token == null || _this.token == undefined) {
				return false;
			}
			/*获取登录的用户信息*/
			axios.get(httpUrl.userInfo, {
				headers: {
					"Authorization": "Bearer " + _this.token
				}
			}).then(function(res) {
				_this.userList = res.data.data;
				if(res.data.data.auth_grade == 0) {
					/*高级认证*/
					axios.get(httpUrl.seniorInfo, {
						headers: {
							"Authorization": "Bearer " + _this.token
						}
					}).then(function(res) {
						if(res.data.data.status == 0) {
							_this.weiRen = res.data.data.reason_id;
							_this.isShen = true;
						}
					}, function(err) {
						console.log(err)
					})
				}
			}, function(err) {
				console.log(err)
			})
		}
	}
</script>

<style lang="scss" scoped>
	$border_bottom: 1px solid #1b1d3e;
	$header_bg:#141738;
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
		.icon {
			display: flex;
			align-items: center;
			.iconfont {
				margin-left: .05rem;
			}
		}
	}

	#identity {
		width: 100%;
		height: 100%;
	}
	/*撑开高度*/

	.oHeight {
		width: 100%;
		height: .5rem;
	}
	/*头部固定*/

	.header_box {
		width: 100%;
		height: 8.5%;
		position: fixed;
		top: 0;
		left: 0;
		z-index: 1000;
		background: $header_bg;
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

	.box {
		height: 89.5%;
		background: $header_bg;
		margin-top: .05rem;
	}
</style>
