<template>
	<div id="airdropDetails">
		<!--蒙版-->
		<div class="men_ban" v-if="isQimg"></div>
		<div class="shareIt" v-if="isQimg">
			<div class="title">
				<span>{{$t("airdrop.ShareCandy")}}</span>
				<i class="iconfont icon-cuowu" @click="isQimg=false"></i>
			</div>
			<div class="oImg">
				<img :src="addQrImg" />
				<p class="oUrl">{{yaoUrl}}</p>
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
		<div class="airdropDetailsContent">
			<div class="title">
				<span>{{$t("airdrop.AirdropDetails")}}</span>
				<span class="gray" v-if="status==1">{{$t("airdrop.Airdropped")}}</span>
			</div>
			<div class="oContent">
				<div class="Currency">
					<div class="oleft">
						<p class="oImg">
							<img :src="oImgUrl" />
						</p>
					</div>
					<div class="oright">
						<ul>
							<li>
								<div class="leftTile">
									<p class="CurName">
										<span class="Abbreviation">{{Details.currency.pageIdentifier}}</span>
										<span class="FullName">{{Details.currency.fullName}}</span>
									</p>
									<p class="Time">
										<span class="gray">{{$t("airdrop.AirdropDate")}}：</span>
										<span class="gray">{{Time}}</span>
									</p>
								</div>
								<p class="rightTile" v-if="Details.publishVolume!=0">
									{{$t("airdrop.TotalAirdrop")}}：<span class="num">{{Details.publishVolume}}</span>{{Details.currency.pageIdentifier}}
								</p>
								<p class="rightTile" v-if="Details.publishVolume==0">
									{{$t("airdrop.TotalAirdrop")}}：{{$t("airdrop.Noceiling")}}
								</p>
							</li>
							<li class="typeCurrency">
								<div class="leftTile">
                  <div>
                    <span class="registered">{{$t("airdrop.ReceiveConditions")}}:</span>
                    <span class="registeredContent">{{Details.note}}</span>
                  </div>
								</div>
								<div class="rightTile">
									<button @click.stop="shareIt(Details.eid)">{{$t("airdrop.ShareCandy")}}</button>
								</div>
							</li>
						</ul>
					</div>
				</div>
				<!--项目介绍-->
				<div class="ProjectIntroduction">
					<div class="IntroductionTitle">
						<span class="text">{{$t("airdrop.ProjectIntroduction")}}</span>
						<p>
							<span @click="open(Details.currency.officiaWebsite)">{{$t("airdrop.GoToWebsite")}}</span>
							<span @click="open(Details.currency.whitePaper)">{{$t("airdrop.ViewWhitePaper")}}</span>
						</p>
					</div>
					<div class="IntroductionContent">
						{{oContent}}
					</div>
					<div class="IntroductionBottom">
						<a @click="toCur">{{$t("airdrop.KnowMore")}}></a>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import axios from "axios";
	import { httpUrl } from "../../http_url/http_url";
	import { mapGetters,mapActions,mapState,mapMutations } from 'vuex'
	export default {
		data() {
			return {
				eid: this.$route.params.id,
				Details: {
					currency: {
						logoUrl: ""
					},
					drop_at: ""
				},
				/*详情内容部分*/
				Time: "",
				/*时间*/
				currency_apply: {}, //语言
				addQrImg: "",
				isQimg: false,
				oImgUrl: "", //图片路径
				oContent: "", //内容部分
				status: "", //状态
			}
		},
		computed: {
			...mapState('user',['lang']),
		},
		methods: {
			toCur() {
				let routeData = this.$router.resolve({
					name: "bzzl",
					params:{id:this.Details.currency.id}
				});
				window.open(routeData.href, '_blank');
			},
			tabColor(index) { //切换
				$(".shareItWrapper li").eq(index).addClass("active_color").siblings("li").removeClass("active_color");
			},
			open(oUrl) {
				window.open(oUrl)
			},
			shareIt(eid) {
				let _this = this;
				if(this.token == null && this.token == undefined) {
					this.$router.push({
						name: "login"
					})
					return false;
				} else {
					let imgPath;
					if(location.host.indexOf("imx.com") != -1) {
						imgPath = "https://m.imx.com/#/InvitationCandy/" + this.invite_code + "/" + eid;
					} else {
						imgPath = "http://m.tanghs.com/#/InvitationCandy/" + this.invite_code + "/" + eid;
					}
					//空投日志
          axios.post(httpUrl.uploadDropLog, {
            type: 2,
            currency_eid: eid,
            invite_code: this.invite_code
          }).then(function(res) {
            return true;
          })
					_this.yaoUrl = imgPath;
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
		},
		mounted() {
			let _this = this;
			var clipboard = new Clipboard(".copy");
			clipboard.on("success", function(e) {
				_this.$message({
					message: _this.$t("airdrop.CopyLinkSuccess"),
					type: 'success',
					duration: 2000
				});
			})
			clipboard.on("error", function(e) {
				console.log("复制失败")
			})
			if(this.lang == "zh-CN") {
				axios.get(httpUrl.airDropCurrency, {
					params: {
						eid: this.eid
					}
				}).then(function(res) {
					_this.Details = res.data.data;
					_this.status = res.data.data.status;
					_this.oImgUrl = res.data.data.currency.logoUrl;
					_this.oContent = res.data.data.currency.summary;
					_this.Time = _this.formatTime(res.data.data.drop_at);
					_this.currency_apply = res.data.data.currency_apply;
				}, function(err) {
					console.log(err)
				})
			} else {
				axios.get(httpUrl.airDropCurrency, {
					params: {
						eid: this.eid,
						lang: "en"
					}
				}).then(function(res) {
					_this.Details = res.data.data;
					_this.status = res.data.data.status;
					_this.oImgUrl = res.data.data.currency.logoUrl;
					_this.oContent = res.data.data.currency.summary;
					_this.Time = _this.formatTime(res.data.data.drop_at);
					_this.currency_apply = res.data.data.currency_apply;
				}, function(err) {
					console.log(err)
				})
			}

		}
	}
</script>

<style lang="scss" scoped>
	/*空投详情*/

	#airdropDetails {
		width: 100%;
		min-height: 100%;
		background: #0c1331;
		padding: 10px 0;
	}
	/*空投详情内容*/

	.airdropDetailsContent {
		max-width: 1200px;
		margin: 0 auto;
		background: #fff;
		border-radius: 4px;
		margin-top: 60px;
		overflow: hidden;
		.title {
			width: 100%;
			height: 70px;
			display: flex;
			justify-content: space-between;
			align-items: center;
			box-sizing: border-box;
			padding: 0 30px;
			box-shadow: 2px 2px 8px #e8e8e8;
			color: #505980;
			font-size: 16px;
		}
		.oContent {
			box-sizing: border-box;
			padding: 40px 30px;
			.Currency {
				display: flex;
				justify-content: space-between;
				padding-bottom: 25px;
				border-bottom: 1px solid #d8d8d8;
				.oleft {
					width: 80px;
					box-sizing: border-box;
					text-align: center;
					.oImg {
						img {
							width: 50px;
							height: 50px;
						}
					}
				}
				.oright {
					flex: 1;
					ul {
						width: 100%;
						li {
							width: 100%;
							display: flex;
							justify-content: space-between;
							.leftTile {
								width: 72%;
								.CurName {
									.Abbreviation {
										font-size: 20px;
										color: #000;
									}
									.FullName {
										color: #999baa;
										font-size: 13px;
										margin-left: 8px;
									}
									margin: 10px 0 15px 0;
								}
								.Time {
									height: 40px;
									line-height: 30px;
									font-size: 15px;
									color: #989bac;
								}
								.registered {
									font-size: 15px;
									color: #616582;
								}
								.registeredContent {
									font-size: 15px;
									color: #616582;
									line-height: 20px;
								}
							}
							.rightTile {
								color: #989bac;
								font-size: 15px;
								.num {
									font-size: 20px;
									color: #ff7f00;
									margin-right: 8px;
								}
								button {
									width: 160px;
									height: 43px;
									background: #26cbc5;
									color: #fff;
									border-radius: 4px;
									font-size: 15px;
									outline: none;
									margin-top: -20px;
								}
							}
						}
					}
				}
			}
		}
	}
	/*项目介绍*/
	.ProjectIntroduction {
		width: 100%;
		padding-top: 20px;
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
			line-height: 30px;
			text-align: right;
			a {
				font-size: 13px;
				color: #26cbc5;
				cursor: pointer;
			}
		}
	}

	.men_ban {
		position: fixed;
		left: 0;
		top: 0;
		z-index: 66;
		width: 100%;
		height: 100%;
		background: rgba(0, 0, 0, 0.5);
	}
	/*选择部分*/

	.active_color {
		.iconfont {
			color: #5fc8c4 !important;
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
		z-index: 88;
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
</style>
