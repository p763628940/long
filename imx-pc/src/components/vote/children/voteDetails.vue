
<template>
	<div id="voteDetails">
		<!--蒙版-->
		<div class="men_ban" v-if="isQimg"></div>
		<div class="shareIt" v-if="isQimg">
			<div class="title">
				<span>{{$t("vote.ShareToCanvass")}}</span>
				<i class="iconfont icon-cuowu" @click="isQimg=false"></i>
			</div>
			<div class="oImg">
				<img :src="addQrImg" />
				<p class="oUrl">{{oUrl}}</p>
				<ul class="shareItWrapper">
					<li class="active_color" @click="tabColor(0)">
						<i class="iconfont icon-weixin1"></i>
					</li>
					<li @click="tabColor(1)">
						<i class="iconfont icon-weibo"></i>
					</li>
					<li @click="tabColor(2)">
						<i class="iconfont icon-qq"></i>
					</li>
					<li class="copy" data-clipboard-action="copy" data-clipboard-target=".oUrl">
						<i class="iconfont icon-lianjie "></i>
					</li>
				</ul>
			</div>
		</div>
		<!--蒙版-->
		<div class="men_ban" v-if="isIdentity"></div>
		<!--判断是否进行高级认证-->
		<div class="voteBox" v-if="isIdentity">
			<div class="title">
				<i class="iconfont icon-cuowu" @click="isIdentity=false"></i>
			</div>
			<div class="content">
        {{$t("vote.CannotVote")}}
			</div>
			<div class="bottom">
				<button class="cancel" @click="isIdentity=false">{{$t("vote.LetmeThink")}}</button>
				<button class="confirm" @click="toIdentity">{{$t("vote.Verify")}}</button>
			</div>
		</div>
		<!--判断是否要进行投票-->
		<div class="men_ban" v-if="WhetherToVote"></div>
		<div class="voteBox1" v-if="WhetherToVote">
			<div class="title">
				<i class="iconfont icon-cuowu" @click="WhetherToVote=false;isThumbsUp=false;isStepOn=false;"></i>
			</div>
			<div class="content">
				<p>
          {{$t("vote.OnlyOneVote")}}
				</p>
				<ul>
					<li @click="ThumbsUp" :class="{'Thumbs-up':isThumbsUp,'animated flip':isThumbsUp}">
						<i class="iconfont icon-zan"></i>
					</li>
					<li @click="StepOn" :class="{'Step-on':isStepOn}">
						<i class="iconfont icon-cai"></i>
					</li>
				</ul>
			</div>
			<div class="bottom">
				<button class="cancel" @click="WhetherToVote=false;isThumbsUp=false;isStepOn=false;">{{$t("vote.LetmeThink")}}</button>
				<button class="confirm" @click="ConfirmVote">{{$t("vote.Confirm")}}</button>
			</div>
		</div>

		<div class="voteDetailsContent">
			<div class="voteDetailsTitle">
				<span>{{$t("vote.VoteDetails")}}</span>
			</div>
			<div class="voteDetailsBox">
				<div class="oLeft">
					<img :src="voteDetails.logoUrl" />
				</div>
				<div class="box">
					<div class="oContent">
						<div class="currencyName">
							<span class="curName">{{voteDetails.pageIdentifier}}</span>
							<span class="fullName">{{voteDetails.fullName}}</span>
						</div>
						<div class="currencyIntroduction">
							<span class="code">{{$t("vote.ContractAddr")}}：{{voteDetails.contract}}</span>
							<span class="copy" data-clipboard-action="copy" data-clipboard-target=".code">
								<i class="iconfont icon-fuzhi1"></i>
							</span>
						</div>
						<div class="Proportion" v-if="voteDetails.consensus_vote_count+voteDetails.consensus_pass_count>300">{{$t("vote.SupportRate")}}：
							<span v-if="voteDetails.consensus_pass_count!=0 || voteDetails.consensus_vote_count!=0">{{voteDetails.consensus_pass_count/ (voteDetails.consensus_vote_count+voteDetails.consensus_pass_count)*100 | number(2)}}%</span>
							<span v-if="voteDetails.consensus_pass_count==0 && voteDetails.consensus_vote_count==0">0%</span>
						</div>
					</div>
					<div class="oRight" :class="{'Liked':voteDetails.consensus_records&&voteDetails.consensus_records.length>0&&voteDetails.consensus_records[0].result==1,'Hassteppedon':voteDetails.consensus_records&&voteDetails.consensus_records.length>0&&voteDetails.consensus_records[0].result==0}">
						<div class="EndorsedisDisagree Thumbsup">
							<!--已赞类名-->
							<p class="icon">
								<i class="iconfont icon-zan"></i>
							</p>
							<p class="num">{{voteDetails.consensus_pass_count}}</p>
							<p>
								<button class="voteButton" @click="VoteNow(voteDetails)">
									<span v-if="!voteDetails.consensus_records || voteDetails.consensus_records.length==0">{{$t("vote.ImmediatVote")}}</span>
												<span v-if="voteDetails.consensus_records&&voteDetails.consensus_records.length>0&&voteDetails.consensus_records[0].result==1">{{$t("vote.Liked")}}</span>
												<span v-if="voteDetails.consensus_records&&voteDetails.consensus_records.length>0&&voteDetails.consensus_records[0].result==0">{{$t("vote.Booed")}}</span>
								</button>
							</p>
						</div>
						<div class="EndorsedisDisagree Stepon">
							<p class="icon">
								<i class="iconfont icon-cai"></i>
							</p>
							<p class="num">{{voteDetails.consensus_vote_count}}</p>
							<p>
								<button class="pullButton" @click.stop="pullButton(voteDetails)">{{$t("vote.CanvassForHim")}}</button>
							</p>
						</div>
					</div>
				</div>
			</div>
			<!--项目介绍-->
			<div class="ProjectIntroduction">
				<div class="IntroductionTitle">
					<span class="text">{{$t("airdrop.ProjectIntroduction")}}</span>
					<p>
						<span @click="open(voteDetails.officiaWebsite)">{{$t("airdrop.GoToWebsite")}}</span>
						<span @click="open(voteDetails.whitePaper)">{{$t("airdrop.ViewWhitePaper")}}</span>
					</p>
				</div>
				<div class="IntroductionContent">
					{{voteDetails.summary}}
				</div>
				<div class="IntroductionBottom">
					<a @click="toCur(voteDetails.id)">{{$t("airdrop.KnowMore")}}></a>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import axios from "axios";
	import { httpUrl } from "../../http_url/http_url"
	import { mapGetters,mapActions,mapState,mapMutations } from 'vuex'
	export default {
		data() {
			return {
				isIdentity: false, //判读有无高级认证
				WhetherToVote: false, //显示投票盒子
				isThumbsUp: false, //赞
				isStepOn: false, //踩
				isQimg: false, //分享二维码
				addQrImg: "http://img5.imgtn.bdimg.com/it/u=812586171,724963760&fm=27&gp=0.jpg", //图片地址
				voteDetails: {}, //详情
				result: "", //踩或赞
				oUrl:"",  //复制链接
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
		computed: {
			...mapState('user',['lang']),
			...mapState('user',{invite_code:state=>state.user.userID}),
		},
		mounted() {
			let _this = this;
			var clipboard = new Clipboard(".copy");
			clipboard.on("success", function(e) {
				_this.$message({
					message:_this.$t("capital.Successfullycopied"),
					type: 'success',
					duration: 2000
				});
			})
			clipboard.on("error", function(e) {
				console.log("复制失败")
			})
			//获取详情
			this.openSend();
			if(this.token == undefined && this.token == null) {
				return false;
			} else {
				//用户信息
				axios.get(httpUrl.userInfo, {
					headers: {
						"Authorization": "Bearer " + this.token
					}
				}).then(function(res) {
					_this.userList = res.data.data;
				}, function(err) {
					console.log(err)
				})
			}
		},
		methods: {
			pullButton(item) {
				let _this = this;
				if(this.token == null && this.token == undefined) {
					this.$router.push({
						name: "login"
					})
					return false;
				} else {
					let imgPath;
					if(location.host.indexOf("imx.com") != -1) {
						imgPath = "https://m.imx.com/#/MoneyCanvassing/" + this.invite_code + "/" + item.eid;
					} else {
						imgPath = "http://m.tanghs.com/#/MoneyCanvassing/" + this.invite_code + "/" + item.eid;
					}
          //空投日志添加
          axios.post(httpUrl.uploadDropLog, {
            type: 4,
            currency_eid: item.eid,
            invite_code: this.invite_code
          }).then(function(res) {
            return true;
          })
					this.oUrl = imgPath;
					axios.get(httpUrl.Qrcode, {
						headers: {
							"Authorization": "Bearer " + this.token
						},
						params: {
							text: imgPath
						}
					}).then(function(res) {
						_this.addQrImg = res.data.data;
						_this.isQimg = true;
					}, function(err) {
						console.log(err)
					})
				}
			},
			tabColor(index) { //切换
				$(".shareItWrapper li").eq(index).addClass("active_color").siblings("li").removeClass("active_color");
			},
			openSend() { //获取详情
				let _this = this;
				/*共识列表*/
				if(this.token == null && this.token == undefined) {
					if(this.lang == "zh-CN") {
						axios.get(httpUrl.consensus, {
							params: {
								lang: "zh",
								eid: this.$route.params.id
							}
						}).then(function(res) {
							_this.voteDetails = res.data.data;
						}, function(err) {
							console.log(err)
						})
					} else {
						axios.get(httpUrl.consensus, {
							params: {
								lang: "en",
								eid: this.$route.params.id
							}
						}).then(function(res) {
							_this.voteDetails = res.data.data;
						}, function(err) {
							console.log(err)
						})
					}
				} else {
					if(this.lang == "zh-CN") {
						axios.get(httpUrl.consensus, {
							params: {
								lang: "zh",
								eid: this.$route.params.id
							},
							headers: {
								"Authorization": "Bearer " + this.token
							}
						}).then(function(res) {
							_this.voteDetails = res.data.data;
						}, function(err) {
							console.log(err)
						})
					} else {
						axios.get(httpUrl.consensus, {
							params: {
								lang: "en",
								eid: this.$route.params.id
							},
							headers: {
								"Authorization": "Bearer " + this.token
							}
						}).then(function(res) {
							_this.voteDetails = res.data.data;
						}, function(err) {
							console.log(err)
						})
					}
				}
			},
			toIdentity() { //跳转高级认证
				this.$router.push({
					name: "identity",
					params: {
						type: "normal"
					}
				})
			},
			ConfirmVote() {
				let _this = this;
				if(this.result == "") {
					_this.$message({
						message: _this.$t("vote.BooOrLike"),
						type: 'warning',
						duration: 2000
					});
					return false;
				}
				axios.post(httpUrl.consensus, {
					currency_eid: this.voteDetails.eid,
					result: this.result
				}, {
					headers: {
						"Authorization": "Bearer " + this.token
					}
				}).then(function(res) {
					if(res.data.status.code == 200) { //投票成功
						_this.$message({
							message:  _this.$t("vote.VoteSucces"),
							type: 'success',
							duration: 2000
						});
						_this.WhetherToVote = false;
						_this.isThumbsUp = false;
						_this.isStepOn = false;
						//刷新列表接口
						_this.openSend();
					}
					if(res.data.status.code == -1) {
						_this.$message({
							message: _this.$t("vote.Voted"),
							type: 'warning',
							duration: 2000
						});
					}
				})
			},
			ThumbsUp() { //赞
				this.isThumbsUp = !this.isThumbsUp;
				this.result = "1";
				this.isStepOn = false; //关闭赞
			},
			StepOn() { //踩
				this.isStepOn = !this.isStepOn;
				this.result = '0';
				this.isThumbsUp = false; //关闭踩
			},
			VoteNow(item) {
				if(this.token == null && this.token == undefined) {
					this.$router.push({
						name: "login"
					})
					return false;
				} else {
					if(this.userList.auth_grade != 1) { //判断有无高级认证
						this.isIdentity = true;
						return false;
					}
					if(item.consensus_records && item.consensus_records.length > 0) {
						return;
					}
					this.WhetherToVote = true; //点击投票
					this.currency_eid = item.eid; //选中eid
				}
			},
			open(oUrl) {
				window.open(oUrl)
			},
			toCur(id) { //了解更多
				let routeData = this.$router.resolve({
					name: "bzzl",
					params: {
						id: id
					}
				});
				window.open(routeData.href, '_blank');
			}
		}
	}
</script>

<style lang="scss" scoped>
	$font_color:#999da9;
	$color_green:#26cbc5;
	$bgColor:#26cbc5;
	#voteDetails {
		width: 100%;
		min-height: 100%;
		background: #0c1330;
		padding: 10px 0;
	}

	.Thumbs-up {
		background: #60c7c4 !important;
		.iconfont {
			color: #fff;
		}
	}

	.Step-on {
		background: #3d4a76 !important;
		.iconfont {
			color: #fff;
		}
	}

	button {
		outline: none;
	}

	.voteDetailsContent {
		width: 1200px;
		margin: 60px auto;
		background: #fff;
		border-radius: 4px;
		overflow: hidden;
		.voteDetailsTitle {
			width: 100%;
			height: 70px;
			line-height: 70px;
			box-shadow: 2px 2px 8px #e8e8e8;
			box-sizing: border-box;
			padding: 0 30px;
			color: #505980;
			font-size: 16px;
		}
		.voteDetailsBox {
			width: 100%;
			box-sizing: border-box;
			padding: 10px 30px;
			display: flex;
			.oLeft {
				border-bottom: 1px solid #d8d8d8;
				img {
					margin-top: 25px;
          margin-right: 28px;
          width: 58px;
          height: 58px;
				}
			}
			.box {
				flex: 1;
				display: flex;
				padding: 10px 0;
				padding-bottom: 25px;
				border-bottom: 1px solid #d8d8d8;
				.oContent {
          width: 750px;
					.currencyName {
						margin: 18px 0;
						.curName {
							font-size: 20px;
							color: #000;
						}
						.fullName {
							font-size: 14px;
							color: #c2cade;
              margin-left: 12px;
						}
					}
					.Proportion {
						height: 35px;
						line-height: 55px;
						color: #26cbc5;
						font-size: 16px;
					}
					.currencyIntroduction {
						color: #9a9db5;
						font-size: 14px;
						line-height: 25px;
						height: 45px;
						font-size: 14px;
						color: #626683;
						word-break: break-all;
						display: -webkit-box;
						-webkit-line-clamp: 2;
						-webkit-box-orient: vertical;
						overflow: hidden;
						font-size: 15px;
						.copy {
							.iconfont {
								cursor: pointer;
								margin-left: 20px;
								font-size: 20px;
								color: #a3adb6;
							}
						}
					}
				}
				/*已赞样式*/
				.Liked {
					.Thumbsup {
						.iconfont,
						.num {
							color: #26cbc5 !important;
          }
						button {
							background: #dedcdd !important;
							color: #fff;
						}
					}
					.Stepon {
						.iconfont,
						.num {
							color: #dedcdd !important;
						}
					}
				}
				/*已踩样式*/
				.Hassteppedon {
					.Thumbsup {
						.iconfont,
						.num {
							color: #dedcdd !important;
						}
						button {
							background: #dedcdd;
							color: #fff;
						}
					}
					.Stepon {
						.iconfont,
						.num {
							color: #3d4a74 !important;
						}
					}
				}
				.oRight {
					width:320px;
					display: flex;
					align-items: center;
					.EndorsedisDisagree:nth-last-child(1) {
						margin: 0;
					}
					.EndorsedisDisagree {
						width:160px;
						text-align: center;
						margin: 0 20px;
						.icon {
							margin-top: 20px;
							.iconfont {
								font-size: 35px;
                color: #c3c6d1;
							}
						}
						.num {
							font-size: 15px;
							line-height: 25px;
							margin: 8px 0 15px 0;
							color: #989ca8;
						}
						p {
							button {
								width: 140px;
								height: 48px;
								font-size: 15px;
								border-radius: 4px;
							}
							.Stepon {
								background: #dedcdd;
								color: #fff;
							}
							.voteButton {
								background: $color_green;
								color: #fff;
							}
							.pullButton {
								border: 1px solid $color_green;
								color: $color_green;
							}
						}
					}
				}
			}
		}
	}

	.ProjectIntroduction {
		width: 100%;
		box-sizing: border-box;
		padding: 0 50px;
		.IntroductionTitle {
			width: 100%;
			height: 45px;
			display: flex;
			align-items: center;
			justify-content: space-between;
			.text {
				font-size: 16px;
				color: #505980;
			}
			p {
				span {
					color: #26cbc5;
					font-size: 14px;
					margin-left: 25px;
					cursor: pointer;
				}
			}
		}
		.IntroductionContent {
			color: #989898;
			font-size: 14px;
			line-height: 28px;
		}
		.IntroductionBottom {
			line-height: 50px;
			text-align: right;
			a {
				font-size: 13px;
				color: #26cbc5;
				cursor: pointer;
			}
		}
	}
	/*蒙版*/

	.men_ban {
		width: 100%;
		height: 100%;
		position: fixed;
		left: 0;
		top: 0;
		z-index: 99;
		background: rgba(0, 0, 0, 0.5);
	}
	/*投票内容*/

	.voteBox {
		width: 400px;
		height: 200px;
		background: #fff;
		position: fixed;
		left: 50%;
		top: 50%;
		margin-left: -200px;
		margin-top: -100px;
		z-index: 666;
		border-radius: 4px;
		.title {
			box-sizing: border-box;
			padding: 0 10px;
			line-height: 40px;
			text-align: right;
			.iconfont {
				font-size: 15px;
				font-weight: bold;
				cursor: pointer;
			}
		}
		.content {
			text-align: center;
			line-height: 100px;
			font-size: 15px;
			border-bottom: 1px solid #d8d8d8;
		}
		.bottom {
			height: 60px;
			display: flex;
			align-items: center;
			justify-content: center;
			.cancel {
				width: 120px;
				height: 35px;
				border: 1px solid $color_green;
				color: $color_green;
				border-radius: 4px;
			}
			.confirm {
				width: 120px;
				height: 35px;
				background: $color_green;
				border-radius: 4px;
				color: #fff;
				margin-left: 10px;
			}
		}
	}

	.zan {
		background: #60c7c6 !important;
		.iconfont {
			color: #fff;
		}
	}

	.cai {
		background: #3d4a77;
		.iconfont {
			color: #fff;
		}
	}

	.voteBox1 {
		width: 400px;
		height: 250px;
		background: #fff;
		position: fixed;
		left: 50%;
		top: 50%;
		margin-left: -200px;
		margin-top: -125px;
		z-index: 666;
		border-radius: 4px;
		.title {
			box-sizing: border-box;
			padding: 0 10px;
			line-height: 40px;
			text-align: right;
			.iconfont {
				font-size: 15px;
				font-weight: bold;
				cursor: pointer;
			}
		}
		.content {
			height: 150px;
			display: flex;
			flex-direction: column;
			align-items: center;
			p {
				line-height: 30px;
				font-size: 16px;
				color: #2f2f51;
			}
			ul {
				height: 120px;
				display: flex;
				align-items: center;
				li {
					width: 60px;
					height: 60px;
					text-align: center;
					cursor: pointer;
					line-height: 60px;
					background: #f6f6f6;
					border-radius: 50%;
					margin: 0 10px;
					.iconfont {
						font-size: 30px;
					}
				}
			}
		}
		.bottom {
			height: 60px;
			display: flex;
			align-items: center;
			justify-content: center;
			border-top: 1px solid #d8d8d8;
			.cancel {
				width: 120px;
				height: 35px;
				border: 1px solid $color_green;
				color: $color_green;
				border-radius: 4px;
			}
			.confirm {
				width: 120px;
				height: 35px;
				background: $color_green;
				border-radius: 4px;
				color: #fff;
				margin-left: 10px;
			}
		}
	}
	/*分享*/

	.shareIt {
		width: 400px;
		height: 250px;
		background: #fff;
		border-radius: 4px;
		margin-top: -125px;
		margin-left: -200px;
		position: fixed;
		left: 50%;
		top: 50%;
		z-index: 100;
		box-sizing: border-box;
		padding: 0 20px;
		.title {
			width: 100%;
			height: 50px;
			display: flex;
			justify-content: space-between;
			align-items: center;
			span {
				color: #1f1c53;
				font-size: 16px;
			}
			border-bottom:1px solid #d8d8d8;
			.iconfont {
				cursor: pointer;
			}
		}
		.oImg {
			width: 100%;
			display: flex;
			flex-direction: column;
			align-items: center;
			img {
				width: 120px;
				height: 120px;
				margin-top: 15px;
			}
			.oUrl {
				opacity: 0;
			}
			ul {
				display: flex;
				align-items: center;
				li {
					width: 35px;
					height: 35px;
					margin-right: 16px;
					color: #747a7a;
					cursor: pointer;
					.iconfont {
						font-size: 35px;
					}
					.icon-qq {
						display: inline-block;
						margin-top: -2px;
					}
					.icon-lianjie {
						display: inline-block;
						font-size: 38px;
						margin-top: -2px;
					}
				}
				li:nth-last-child(1) {
					margin: 0;
				}
			}
		}
	}

	.active_color {
		.iconfont {
			color: #5fc8c4 !important;
		}
	}

	.textIndex {
		margin-left: 20px;
	}
</style>
