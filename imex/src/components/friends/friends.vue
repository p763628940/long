<template>
	<div class="friends">
		<!--邀请好友头部-->
		<div class="friends_header">
			<p class="back" @click="$router.go(-1)">
				<i class="iconfont icon-zuojiantou"></i>
			</p>
			<p class="yao_qing">
				<span>{{$t("userCenter.Invitationprogram")}}</span>
			</p>
			<p>
				<router-link tag="span" to="/Rule">{{$t("introduce.Therules")}}</router-link>
			</p>
		</div>
		<!--邀请返佣-->
		<div class="friends_main">
			<div class="balane">
				<router-link to="/Invitationdetails" tag="div" class="balane_header">
					<dl class="left">
						<p class="title">{{$t("capital.Profit")}}</p>
						<p class="content">{{$t("RevenueRecord.InviteFriends")}}</p>
						<p>{{$t("RevenueRecord.receiveImx")}}</p>	
					</dl>
					<dl class="right">
						<i class="iconfont icon-iconfontjiantou5"></i>
					</dl>
				</router-link>
				<div class="balane_bottom">
					<p class="left">
						<i class="iconfont icon-web-icon-"></i> {{$t("InvitationCode.Inviteamount")}}
						<span class="blue">{{invite.invitation_count}}</span>
					</p>
					<p class="right">
						<i class="iconfont  icon-rest-income"></i> {{$t("capital.Profit")}}
						<span class="blue">{{invite.maid_count | number(8)}}</span>
						<span class="currency">IMX</span>
					</p>
				</div>
			</div>
			<div class="RankingList">
				<div class="silver medal" v-if="List.length>=2">
					<img src="../../assets/02.png" />
					<p class="userNumber">{{List[1].user_id}}</p>
					<p class="currencyNum">{{List[1].balance | number(8)}}<span class="currency">IMX</span></p>
				</div>
				<div class="gold medal" v-if="List.length>=1">
					<img src="../../assets/01.png" />
					<p class="userNumber">{{List[0].user_id}}</p>
					<p class="currencyNum">{{List[0].balance | number(8)}}<span class="currency">IMX</span></p>
				</div>
				<div class="bronze medal" v-if="List.length>=3">
					<img src="../../assets/03.png" />
					<p class="userNumber">{{List[2].user_id}}</p>
					<p class="currencyNum">{{List[2].balance | number(8)}}<span class="currency">IMX</span></p>
				</div>
			</div>
			<!--查看完整榜单-->
			<div class="AllList">
				<router-link to="/AllList" tag="span">{{$t("invitation.Viewlist")}}</router-link>
			</div>
		</div>
		<!--邀请码复制-->
		<ul class="yq_code_wrapper">
			<div class="copySuccess" v-show="copySuccess">
				<i class="iconfont icon-chenggong"></i>{{$t("InvitationCode.Replicatingsuccess")}}
			</div>
			<li class="yq_code_item1">
				<span class="left">{{$t("InvitationCode.Invitationcode")}}</span>
				<p class="yao_code" id="ipt1">{{invite.invite_code}}</p>
				<span class="copy" id="copy" :data-clipboard-text="invite.invite_code" @click="copy">{{$t("shouye.Longpresscopy")}}</span>
			</li>
			<li class="yq_code_item">
				<span class="left">{{$t("InvitationCode.Invitelink")}}</span>
				<!--<p class="yao_code" id="ipt2">{{assetInfo.invite_url}}</p>-->
			</li>
			<li class="yq_code">
				<dd id="ipt2">{{invite.invite_url}}</dd>
				<span class="copy" id="copy1" :data-clipboard-text="invite.invite_url" @click="copy1">{{$t("shouye.Longpresscopy")}}</span>
			</li>
			<li class="yq_code_item" @click="codeImgIsShow = !codeImgIsShow">
				<span class="left">
					{{$t("invitation.ShareQRcode")}}
				</span>
				<span class="oRight">
					<i class="iconfont icon-iconfontjiantou5"></i>
				</span>
			</li>
		</ul>
		<!--按钮-->
		<!--<div class="submit">
			<button @click="jifen" disabled="true">提取积分</button>
		</div>-->
		<!--提取积分信息-->
		<!--<p class="information">
			每一笔新获得积分，都进入锁定状态，每笔每天以总量的10/1解锁。 显示邀请码，可以通过点击按钮，直接复制邀请码，粘贴结果为邀请码字符串；
		</p>-->
		<!--图片邀请二维码-->
		<div class="men_ban" v-show="codeImgIsShow" @click="codeImgIsShow=false"></div>
		<div class="code_img" v-show="codeImgIsShow">
			<img :src="invite.invite_qr" />
		</div>

	</div>
</template>

<script>
	import axios from "axios"
	import { httpUrl } from "../http_url/http_url"
	export default {
		data() {
			return {
				codeImgIsShow: false,
				/*绑定二维码*/
				isCard: false,
				/*绑定身份证*/
				emailCodeError: false,
				/*短信验证码错误*/
				phoneCodeError: false,
				/*手机验证码错误*/
				googleCodeError: false,
				/*谷歌验证码错误*/
				userList: [],
				/*获取用户信息*/
				jifenIsShow: false,
				/*提取积分*/
				assetInfo: {},
				/*邀请好友个人资产*/
				arr: [
					[this.$t("userCenter.Ordinary"), 'VIP'],
					[this.$t("userCenter.Senior"), this.$t("userCenter.Partner")],
					[this.$t("userCenter.Honorable"),this.$t("userCenter.Director")]
				],
				/*角色*/
				juese: "",
				/*选择角色*/
				phoneTime: 0,
				/*手机倒计时*/
				emailTime: 0,
				/*邮箱倒计时*/
				phoneIsShow: true,
				/*手机验证码显示隐藏*/
				emailIsShow: true,
				/*邮箱验证吗显示隐藏*/
				phoneCode: "",
				/*手机验证码*/
				emailCode: "",
				/*邮箱验证码*/
				googleCode: "",
				/*谷歌验证码*/
				copySuccess: false,
				/*复制成功*/
				invite: {},
				/*邀请内容*/
				List: [] /*邀请榜单*/
			}
		},
		filters: {
			//小数点过滤器 不四舍五入
			number(value, num) {
				var toFixedNum = Number(value).toFixed(num + 1);
				var realVal = toFixedNum.substring(0, toFixedNum.lastIndexOf('.') + num + 1);
				return realVal;
			}
		},
		mounted() {
			var _this = this;
			/*判断用户是登录*/
			if(_this.token == null || _this.token == undefined) {
				return false;
			}
			/*获取用户绑定什么接口*/
			axios.get(httpUrl.userInfo, {
				headers: {
					"Authorization": "Bearer " + _this.token
				}
			}).then(function(res) {
				_this.userList = res.data.data;
			}, function(err) {
				console.log(err)
			})
			/*我的邀请方式*/
			axios.get(httpUrl.personalInfo, {
				headers: {
					"Authorization": "Bearer " + _this.token
				}
			}).then(function(res) {
				_this.invite = res.data.data;
			}, function(err) {
				console.log(err)
			})
			//邀请返利榜单
			axios.get(httpUrl.list).then(function(res) {
				_this.List = res.data.data;
			}, function(err) {
				console.log(err)
			})

		},
		filters: {
			//小数点过滤器 不四舍五入
			number(value, num) {
				var toFixedNum = Number(value).toFixed(num + 1);
				var realVal = toFixedNum.substring(0, toFixedNum.lastIndexOf('.') + num + 1);
				return realVal;
			}
		},
		methods: {
			copy() { /*复制粘贴*/
				let _this = this;
				var clipboard = new Clipboard('#copy');
				clipboard.on('success', e => {
					_this.$message({
						message: _this.$t("capital.Successfullycopied"),
						type: 'success'
					});
					// 释放内存
					clipboard.destroy()
				})
				clipboard.on('error', e => {
					_this.$message({
						message: _this.$t("shouye.Phonedoesnotsup"),
						type: 'error'
					});
					// 释放内存
					clipboard.destroy()
				})
			},
			copy1() { /*复制粘贴*/
				let _this = this;
				var clipboard = new Clipboard('#copy1');
				clipboard.on('success', e => {
					_this.$message({
						message: _this.$t("capital.Successfullycopied"),
						type: 'success'
					});
					// 释放内存
					clipboard.destroy()
				})
				clipboard.on('error', e => {
					_this.$message({
						message: _this.$t("shouye.Phonedoesnotsup"),
						type: 'error'
					});
					// 释放内存
					clipboard.destroy()
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	$alet_border:1px solid #121528;
	$blue:#6a72d5;
	$submit_color:#373959;
	/*登录线条*/

	$submit_borderColor:1px solid #9fa0af;
	/*蓝色*/
	/*提取积分要用弹框*/
	/*邀请好友头部*/

	.friends {
		width: 100%;
		min-height: 100%;
		color: #fff;
		background: #191d38;
	}

	.friends_header {
		width: 100%;
		height: .5rem;
		position: relative;
		display: flex;
		justify-content: space-between;
		line-height: .5rem;
		box-sizing: border-box;
		border-bottom: $alet_border;
		padding: 0 .1rem;
		color: #fff;
		.yao_qing {
			width: 60%;
			text-align: center;
			position: absolute;
			left: 20%;
			font-size: .16rem;
			font-weight: bold;
		}
		.shouyi {
			font-size: .14rem;
		}
	}
	/*邀请码主要*/

	.friends_main {
		width: 100%;
		height: 2.7rem;
		background: url(https://imxpro.oss-cn-beijing.aliyuncs.com/BG.png) no-repeat;
		background-size: 100% 100%;
		box-sizing: border-box;
		padding: .1rem .1rem;
		.balane {
			width: 100%;
			min-height: 1.1rem;
			box-sizing: border-box;
			background: rgba(38, 45, 90, 0.5);
			padding: 0 .05rem;
			.balane_header {
				width: 100%;
				min-height: .7rem;
				display: flex;
				justify-content: space-between;
				align-items: center;
				border-bottom: 1px solid rgba(0, 0, 0, 0.3);
				.title {
					font-size: .16rem;
					line-height: .25rem;
				}
				.content {
					line-height: .25rem;
					span {
						font-size: .14rem;
						margin: 0 .03rem;
					}
				}
			}
			.balane_bottom {
				width: 100%;
				min-height: .4rem;
				display: flex;
				align-items: center;
				justify-content: space-between;
				p {
					display: flex;
					align-items: center;
					.iconfont {
						font-size: .25rem;
					}
					.icon-web-icon- {
						font-size: .3rem;
					}
					.blue {
						color: #49d7f4;
						font-size: .14rem;
						margin: 0 .1rem;
					}
					.currency {
						color: #6a72d5;
					}
				}
			}
		}
		.AllList {
			width: 100%;
			height: .5rem;
			line-height: .5rem;
			text-align: center;
			color: #6a72d5;
		}
		.RankingList {
			display: flex;
			justify-content: center;
			margin-top: .15rem;
			.medal {
				width: .9rem;
				height: 1rem;
				margin-right: .03rem;
				background-size: 100% 100%;
				text-align: center;
				img {
					width: .3rem;
					height: .3rem;
					margin-top: .15rem;
				}
				.userNumber {
					white-space: nowrap;
					text-overflow: ellipsis;
					overflow: hidden;
					line-height: .25rem;
				}
				.currencyNum {
					white-space: nowrap;
					text-overflow: ellipsis;
					overflow: hidden;
					span {
						color: #6a72d5;
					}
				}
			}
			.silver,
			.bronze {
				margin-top: .2rem;
			}
			.silver {
				background: url(../../assets/02bg.png) no-repeat;
			}
			.gold {
				background: rgba(209, 170, 44, .25);
			}
			.bronze {
				background: url(../../assets/03bg.png) no-repeat;
			}
		}
	}
	/*邀请码*/

	.yq_code_wrapper {
		width: 100%;
		margin-top: .3rem;
		position: relative;
		.copySuccess {
			position: absolute;
			left: 35%;
			top: 10%;
			width: 30%;
			display: flex;
			justify-content: center;
			align-items: center;
			line-height: .3rem;
			color: #fff;
			background: #32355F;
			.iconfont {
				color: #3CB034;
				margin-right: .05rem;
			}
		}
		.yq_code {
			width: 100%;
			box-sizing: border-box;
			padding: 0 .1rem;
			font-size: .1rem;
			color: #cacfff;
			display: flex;
			border-bottom: 1px solid #1a1d3f;
			background: #1e2142;
			dd {
				margin: .1rem 0;
			}
			span {
				text-align: right;
				color: $blue;
				margin-bottom: .1rem;
				font-size: .12rem;
			}
			flex-direction: column;
		}
		.yq_code_item1 {
			@extend .yq_code_item;
			#ipt1 {
				width: 50%;
			}
		}
		/*列表内容*/
		.yq_code_item {
			width: 100%;
			height: .4rem;
			display: flex;
			justify-content: space-between;
			align-items: center;
			box-sizing: border-box;
			padding: 0 .1rem 0 .13rem;
			border-bottom: 1px solid #1a1d3f;
			background: #1e2142;
			p {
				width: 68%;
				height: 90%;
				line-height: .35rem;
				border: none;
				background: none;
				outline: none;
				color: #cacfff;
			}
			.left {
				color: #fff;
			}
			.copy {
				color: $blue;
				font-size: .12rem;
			}
			.iconfont {
				color: #fff;
			}
			.yao_code {
				margin-left: .12rem;
				overflow: hidden;
			}
		}
	}
	/*提交按钮*/

	.information {
		width: 2.7rem;
		line-height: .2rem;
		margin: .5rem auto;
		color: #898fd6;
	}
	/*蒙版*/

	.men_ban {
		width: 100%;
		height: 100%;
		background: rgba(0, 0, 0, 0.6);
		position: fixed;
		left: 0;
		top: 0;
	}
	/*图片*/

	.code_img {
		width: 1.6rem;
		height: 1.6rem;
		position: fixed;
		top: 25%;
		left: 25%;
		img {
			width: 100%;
			height: 100%;
		}
	}
</style>
