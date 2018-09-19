<template>
	<div id="airdropDetails">
		<my-header :text="headerText"></my-header>
		<!--详情头部-->
		<div class="detailsTitle">
			<div class="header">
				<p class="oleft">
					<img :src="currency.logoUrl" />
					<span class="curName">
							{{currency.pageIdentifier}}
					</span>
					<span class="fullName">{{currency.fullName}}</span>
				</p>
				<p v-if="type==1">
					{{$t("airdrop.Airdropped")}}
				</p>
			</div>
			<div class="content">
				<ul>
					<p class="balane">
						{{$t("airdrop.DropTime")}}：{{Time}}
					</p>
					<li class="balane" v-if="Details.publishVolume!=0">{{$t("airdrop.TotalAirdrop")}}：<span class="Num">{{Details.publishVolume}}</span>{{currency.pageIdentifier}}</li>
					<li class="condition">{{$t("airdrop.ReceiveConditions")}}：{{Details.note}}</li>
					<li class="balane" v-if="Details.publishVolume==0">
						{{$t("airdrop.TotalAirdrop")}}：{{$t("airdrop.Noceiling")}}
					</li>
				</ul>
				<div class="button">
					<button @click="shareIt()">{{$t("airdrop.ShareCandy")}}</button>
				</div>
			</div>
		</div>
		<!--项目介绍-->
		<div class="ProjectIntroduction">
			<div class="title">
				<span class="text">{{$t("airdrop.ProjectIntroduction")}}</span>
				<p class="open">
					<span @click="open(currency.officiaWebsite)">{{$t("airdrop.GoToWebsite")}}</span>
					<span @click="open(currency.whitePaper)">{{$t("airdrop.ViewWhitePaper")}}</span>
				</p>
			</div>
			<div class="content">
				{{currency.summary}}
			</div>
		</div>
		<!--跳转链接-->
		<div class="Nesting" v-if="iframeIsShow">
			<div class="NestingTitle">
				<i class="iconfont icon-cuowu" @click="iframeIsShow=false"></i>
			</div>
			<iframe :src="iframeSrc" id="iframe"></iframe>
		</div>
		<!--分享朋友-->
		<div class="men_ban" v-if="IsShareIt" @click="IsShareIt=false"></div>
		<div class="shareIt" v-if="IsShareIt">
			<div class="box">
				<p @click="shareWeixinMessage(0)">
					<img src="../../../assets/WeChatFriends.png" class="WeChatFriends" />
				</p>
				<p @click="shareWeixinMessage(1)">
					<img src="../../../assets/CircleOffriends.png" class="CircleOffriends" />
				</p>
				<span id="copy" :data-clipboard-text="inviteCopy" @click="copy">
					<i class="iconfont icon-link"></i>
				</span>
			</div>
			<div class="CancelSharing" @click="IsShareIt=false">
				{{$t("airdrop.CancelShare")}}
			</div>
		</div>
	</div>
</template>

<script>
	import header from "../../public/backHeader.vue"
	import { mapGetters,mapActions,mapState,mapMutations } from 'vuex'
	export default {
		data() {
			return {
				headerText: this.$t("airdrop.AirdropDetails"),
				Details: {},
				currency: {},
				Time: "",
				eid: this.$route.params.id,
				invite_code: this.$route.params.inviteCode, //邀请码
				iframeSrc: "",
				/*路径*/
				iframeIsShow: false,
				/*是否嵌套网页*/
				IsShareIt: false,
				/*是否分享*/
				currency_apply: {},
				type: "",
				inviteCopy: "",
				shares:"",
				sharewx:"",
			}
		},
		computed:{
			...mapState('user',['lang']),
		},
		components: { /*头部*/
			"my-header": header
		},
		methods: {
			shareWeixinMessage(type) { //分享微信朋友圈
				let _this = this;
				let FriendisCircle;
				if(type == 0) { //分享朋友
					FriendisCircle = "WXSceneSession";
				} else { //分享朋友圈
					FriendisCircle = "WXSceneTimeline";
				}
				_this.sharewx.send({
					content: _this.$t("airdrop.IMXExchange")+_this.currency.pageIdentifier+_this.$t("airdrop.candiesfor"),
					pictures: "https://imxpro.oss-cn-beijing.aliyuncs.com/static/APP.png",
					thumbs: "https://imxpro.oss-cn-beijing.aliyuncs.com/static/APP.png",
          type:"web",
					href: _this.inviteCopy, //分享路径
					extra: {
						scene: FriendisCircle ////分享微信好友  	或者     朋友圈
					}
				}, function() {
					_this.IsShareIt = false;
					alert("分享成功");
				}, function(e) {
					return false;
				});
			},
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
			open(url) {
				this.iframeSrc = url;
				this.iframeIsShow = true;
			},
			shareIt() {
				let _this = this;
				if(this.token == null && this.token == undefined) {
					this.$router.push({
						name: "login"
					})
					return false;
				} else {
					let imgPath;
					if(location.host.indexOf("tanghs.com") != -1 || location.host.indexOf("localhost") != -1) {
						imgPath = "http://m.tanghs.com/#/InvitationCandy/" + this.invite_code + "/" + this.eid;
					} else {
						imgPath = "https://m.imx.com/#/InvitationCandy/" + this.invite_code + "/" + this.eid;
					}
          //空投日志添加
          this.$ajax.post(this.httpUrl.uploadDropLog, {
            type: 2,
            currency_eid: this.eid,
            invite_code: this.invite_code
          }).then(function(res) {
            return true;
          })
					this.inviteCopy = imgPath;
					this.IsShareIt = true;
				}
			}
		},
		mounted() {
			let _this = this;
			if(window.plus) {
				plus.share.getServices(function(s) {
					_this.shares = s;
					for(var i in s) {
						if('weixin' == s[i].id) {
							_this.sharewx = s[i];
						}
					}
				}, function(e) {
					alert("获取分享服务列表失败");
				});
			}
			if(this.lang == "zh") {
				this.$ajax.get(this.httpUrl.airDropCurrency, {
					params: {
						eid: this.eid,
						lang: "zh"
					}
				}).then(function(res) {
					_this.Details = res.data.data;
					_this.currency = res.data.data.currency;
					_this.type = res.data.data.status;
					_this.Time = _this.formatTime(res.data.data.drop_at);
					_this.currency_apply = res.data.data.currency_apply;
				}, function(err) {
					console.log(err)
				})
			} else {
				this.$ajax.get(this.httpUrl.airDropCurrency, {
					params: {
						eid: this.eid,
						lang: "en"
					}
				}).then(function(res) {
					_this.Details = res.data.data;
					_this.type = res.data.data.status;
					_this.currency = res.data.data.currency;
					_this.Time = _this.formatTime(res.data.data.drop_at).split(" ")[0];
					_this.currency_apply = res.data.data.currency_apply;
				}, function(err) {
					console.log(err)
				})
			}

		}
	}
</script>

<style lang="scss" scoped>
	$header_bg:#111336;
	#airdropDetails {
		color: #fff;
	}

	.detailsTitle {
		width: 100%;
		box-sizing: border-box;
		padding: 0 .1rem;
		background: $header_bg;
		margin-top: .1rem;
		.header {
			width: 100%;
			height: .4rem;
			display: flex;
			align-items: center;
			justify-content: space-between;
			border-bottom: 1px solid rgba(59, 66, 134, 0.3);
			.oleft {
				display: flex;
				align-items: flex-end;
				img {
					width: .25rem;
					height: .25rem;
				}
				.curName {
					font-size: .16rem;
					margin: 0 .05rem;
				}
				.xie {
					margin: 0 .04rem .02rem;
				}
				.fullName {
					margin-left: .02rem;
					margin-bottom: .02rem;
				}
			}
			.time {
				line-height: .2rem;
				color: #6f74a6;
			}
		}
		.content {
			box-sizing: border-box;
			padding: .1rem 0;
			.condition {
				line-height: .2rem;
				margin-top: .05rem;
			}
			.balane {
				line-height: .3rem;
				color: #6f74a6;
				.Num {
					color: #26cbc5;
					font-size: .15rem;
					margin-right: .03rem;
				}
			}
			.button {
				line-height: .5rem;
				text-align: right;
				button {
					width: .8rem;
					height: .3rem;
					text-align: center;
					line-height: .28rem;
					background: #25cbc5;
					color: #fff;
					border: none;
					border-radius: .04rem;
				}
			}
		}
	}

	.ProjectIntroduction {
		width: 100%;
		background: $header_bg;
		box-sizing: border-box;
		margin-top: .1rem;
		padding: 0 .1rem;
		.title {
			width: 100%;
			height: .4rem;
			display: flex;
			align-items: center;
			justify-content: space-between;
			border-bottom: 1px solid rgba(59, 66, 134, 0.3);
			.text {
				color: #e1e6f9;
			}
			.open {
				span {
					color: #26cbc5;
					margin-left: .05rem;
				}
			}
		}
		.content {
			padding-top: .1rem;
			padding-bottom: .1rem;
			line-height: .2rem;
			color: #babed9;
		}
	}

	.Nesting {
		width: 100%;
		height: 100%;
		background: #0c0934;
		position: fixed;
		left: 0;
		top: 0;
		z-index: 99;
		.NestingTitle {
			width: 100%;
			height: .5rem;
			line-height: .5rem;
			text-align: right;
			box-sizing: border-box;
			padding-right: .1rem;
		}
		#iframe {
			width: 100%;
			height: 90%;
			box-sizing: border-box;
		}
	}

	.men_ban {
		width: 100%;
		height: 100%;
		background: rgba(0, 0, 0, 0.5);
		position: fixed;
		left: 0;
		top: 0;
		z-index: 99;
	}
	.shareIt {
		width: 100%;
		height: 1.4rem;
		background: #0c0934;
		position: fixed;
		left: 0;
		bottom: 0;
		z-index: 999;
		.box {
			width: 100%;
			height: .95rem;
			display: flex;
			align-items: center;
			justify-content: center;
			p {
				width: .55rem;
				height: .55rem;
				box-sizing: border-box;
				border-radius: 50%;
				display: flex;
				align-items: center;
				justify-content: center;
				background: #18134a;
				margin-right: .1rem;
				img {
					width: 80%;
					height: 80%;
				}
				.CircleOffriends {
					margin-left: .02rem;
					margin-bottom: .01rem;
				}
			}
			#copy {
				display: inline-block;
				width: .55rem;
				height: .55rem;
				border-radius: 50%;
				text-align: center;
				line-height: .55rem;
				background: #18134a;
			}
			.iconfont {
				color: #25cbc5;
				font-size: .3rem;
			}
		}
		.CancelSharing {
			width: 100%;
			height: .4rem;
			border-top: 1px solid #261f65;
			text-align: center;
			line-height: .42rem;
			font-size: .13rem;
			color: #fff;
		}
	}
</style>
