<template>
	<div id="airdrop">
		<!--	头部内容-->
		<div class="fixed_header">
			<div class="userCenter_Height">
				<i class="iconfont icon-zuojiantou" @click="$router.go(-1)"></i>
				<p>{{$t("airdrop.IMXCandyBox")}}</p>
				<router-link to="/activityRules" tag="span" class="icon">
					{{$t("airdrop.ActivityRules")}}
				</router-link>
			</div>
		</div>
		<div class="oHeight"></div>
		<!--糖果盒子内容-->
		<div class="airdropBox">
			<img src="../../assets/airdropTitEn.jpg" v-if="lang == 'zh'" class="InvitationTitleEn" />
			<img src="../../assets/airdropTitZh.jpg" v-if="lang != 'zh'" class="InvitationTitleZh" />
			<div class="titleText">
				<span>“</span> {{$t("airdrop.ExchangeToSupport")}}
				<span>”</span>
			</div>
		</div>
		<!--空投信息-->
		<div class="AirdropInformation">
			<span class="oleft">{{$t("airdrop.DropInformation")}}</span>
			<p class="oright">
				<input type="text" v-model="searText" maxlength="14" @keyup="noDate" :placeholder="$t('airdrop.ClickOnSearch')" />
				<i class="iconfont icon-sousuo1" @click="search"></i>
			</p>
		</div>
		<!--空投列表-->
		<div class="airdropList">
			<ul class="airdropList_warpper">
				<li class="airdropList_item" v-for="item in airdropList" @click="toAirdropDetails(item.eid)">
					<div class="title">
						<p class="logo">
							<img :src="item.currency.logoUrl" />
							<span class="CurName">{{item.currency.pageIdentifier}}</span>
							<span class="fullName">{{item.currency.fullName}}</span>
						</p>
						<p class="time">
							<span v-if="item.status!=1">{{formatTime(item.drop_at).split(" ")[0]}}</span>
							<span v-if="item.status==1">{{$t("airdrop.Airdropped")}}</span>
						</p>
					</div>
					<div class="content">
						<ul class="oleft">
							<li class="condition">
								{{$t("airdrop.ReceiveConditions")}}：{{item.note}}
							</li>
							<li class="balane" v-if="item.publishVolume!=0">
								{{$t("airdrop.TotalAirdrop")}}：{{item.publishVolume}}{{item.currency.pageIdentifier}}
							</li>
							<li class="balane" v-if="item.publishVolume==0">
								{{$t("airdrop.TotalAirdrop")}}：{{$t("airdrop.Noceiling")}}
							</li>
						</ul>
						<div class="button">
							<button @click.stop="shareIt(item.eid,item.currency.pageIdentifier)">{{$t("airdrop.ShareCandy")}}</button>
						</div>
					</div>
				</li>
				<div class="noData" v-if="myOrderTotal==0">{{$t("list.noData")}}</div>
			</ul>
			<!--分页开始-->
			<div class="pageCount" v-show="myOrderTotal>10">
				<el-pagination small layout="prev, pager, next" :page-size="myOrderPage" :total="myOrderTotal" @current-change="pageCount">
				</el-pagination>
			</div>
		</div>
		<!--分享微信好友  分享微信朋友圈-->
		<div class="men_ban" v-if="IsShareIt" @click="IsShareIt=false"></div>
		<div class="shareIt" v-if="IsShareIt">
			<div class="box">
				<p @click="shareWeixinMessage(0)">
					<img src="../../assets/WeChatFriends.png" class="WeChatFriends" />
				</p>
				<p @click="shareWeixinMessage(1)">
					<img src="../../assets/CircleOffriends.png" class="CircleOffriends" />
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
import { mapGetters,mapActions,mapState,mapMutations } from 'vuex'
	export default {
		data() {
			return {
				airdropList: [],
				/*空投列表*/
				myOrderPage: 0,
				/*每页显示条数*/
				myOrderTotal: 0,
				/*总条数*/
				/*邀请码*/
				searText: "",
				/*搜索内容*/
				IsShareIt: false,
				/*判断是否分享*/
				currency_id: "",
				eid: "",
				inviteCopy: "", //复制链接
				shares: null, //分享
				sharewx: null, //分享
				curName: "",
			}
		},
		computed:{
				  ...mapState('user', {
						'invite_code': state => state.userID,
				  }),
				  ...mapState('user',['lang']),

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
			toAirdropDetails(eid) {
				this.$router.push({
					name: "airdropDetails",
					params: {
						id: eid,
						inviteCode: this.invite_code
					}
				})
			},
			pageCount(val) { /*分页*/
				let _this = this;
				this.$ajax.get(this.httpUrl.airDropCurrency, {
					params: {
						page: val
					}
				}).then(function(res) {
					_this.airdropList = res.data.data.data;
					_this.myOrderPage = res.data.data.per_page;
					_this.myOrderTotal = res.data.data.total;
				}, function(err) {
					console.log(err)
				})
			},
			noDate() { /*判断用户是否请空*/
				let _this = this;
				this.searText = this.searText.replace(/[^a-zA-Z]/g, '');
				if(this.searText.length == 0) {
					this.$ajax.get(this.httpUrl.airDropCurrency).then(function(res) {
						_this.airdropList = res.data.data.data;
						_this.myOrderPage = res.data.data.per_page;
						_this.myOrderTotal = res.data.data.total;
					}, function(err) {
						console.log(err)
					})
				}
			},
			search() { /*搜索*/
				if(this.searText == "") {
					return false;
				}
				let _this = this;
				if(this.lang == "zh") {
					this.$ajax.get(this.httpUrl.airDropCurrency, {
						params: {
							name: this.searText,
							lang: "zh"
						}
					}).then(function(res) {
						_this.airdropList = res.data.data.data;
						_this.myOrderPage = res.data.data.per_page;
						_this.myOrderTotal = res.data.data.total;
					}, function(err) {
						console.log(err)
					})
				} else {
					this.$ajax.get(this.httpUrl.airDropCurrency, {
						params: {
							name: this.searText,
							lang: "en"
						}
					}).then(function(res) {
						_this.airdropList = res.data.data.data;
						_this.myOrderPage = res.data.data.per_page;
						_this.myOrderTotal = res.data.data.total;
					}, function(err) {
						console.log(err)
					})
				}
			},
			shareIt(eid, curName) {
				let _this = this;
				if(this.token == null && this.token == undefined) {
					this.$router.push({
						name: "login"
					})
					return false;
				} else {
					let imgPath;
					if(location.host.indexOf("tanghs.com") != -1 || location.host.indexOf("localhost") != -1) {
						imgPath = "http://m.tanghs.com/#/InvitationCandy/" + this.invite_code + "/" + eid;
					} else {
						imgPath = "https://m.imx.com/#/InvitationCandy/" + this.invite_code + "/" + eid;
					}
          //空投日志添加
          this.$ajax.post(this.httpUrl.uploadDropLog, {
            type: 2,
            currency_eid: eid,
            invite_code: this.invite_code
          }).then(function(res) {
            return true;
          })
					this.inviteCopy = imgPath;
					this.IsShareIt = true;
					this.curName = curName;
				}
			},
			shareWeixinMessage(type) { //分享微信朋友圈
				let _this = this;
				let FriendisCircle;
				if(type == 0) { //分享朋友
					FriendisCircle = "WXSceneSession";
				} else { //分享朋友圈
					FriendisCircle = "WXSceneTimeline";
				}
				_this.sharewx.send({
					content: _this.$t("airdrop.IMXExchange")+ _this.curName + _this.$t("airdrop.candiesfor"),
					pictures: "https://imxpro.oss-cn-beijing.aliyuncs.com/static/APP.png",
					thumbs: "https://imxpro.oss-cn-beijing.aliyuncs.com/static/APP.png",
          type:"web",
					href: _this.inviteCopy, //分享路径
					extra: {
						scene: FriendisCircle ////分享微信好友 或者 朋友圈
					}
				}, function() {
					_this.IsShareIt = false;
					alert("分享成功");
				}, function(e) {
					return true;
				});
			}
		},
		mounted() {
			/*空投列表*/
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
				/*请求列表*/
				this.$ajax.get(this.httpUrl.airDropCurrency, {
					params: {
						lang: 'zh'
					}
				}).then(function(res) {
					_this.airdropList = res.data.data.data;
					_this.myOrderPage = res.data.data.per_page;
					_this.myOrderTotal = res.data.data.total;
				}, function(err) {
					console.log(err);
				})
			} else {
				/*请求列表*/
				this.$ajax.get(this.httpUrl.airDropCurrency, {
					params: {
						lang: 'en'
					}
				}).then(function(res) {
					_this.airdropList = res.data.data.data;
					_this.myOrderPage = res.data.data.per_page;
					_this.myOrderTotal = res.data.data.total;
				}, function(err) {
					console.log(err)
				})
			}


		}
	}
</script>

<style lang="scss">
	#airdrop {
		.el-pager li {
			/*分页的背景颜色*/
			background: none;
			color: #fff;
		}
		.el-pagination .btn-next,
		.el-pagination .btn-prev {
			background: none;
			color: #fff;
		}
		.el-pager li.active,
		.el-pagination button:hover {
			color: #26cbc5;
		}
		.el-pagination button:disabled {
			color: #fff;
			background: none;
		}
	}
</style>

<style lang="scss" scoped>
	$header_bg:#111336;
	/*盒子头部*/

	#airdrop {
		width: 100%;
		min-height: 100%;
		background: #121528;
	}

	.fixed_header {
		width: 100%;
		height: .45rem;
		position: fixed;
		left: 0;
		top: 0;
		z-index: 100;
	}

	.oHeight {
		height: .45rem;
	}

	.userCenter_Height {
		width: 100%;
		height: .45rem;
		line-height: .45rem;
		display: flex;
		justify-content: space-between;
		align-items: center;
		position: relative;
		box-sizing: border-box;
		.iconfont {
			height: .45rem;
			line-height: .45rem;
			position: absolute;
			left: 0;
			margin-left: .1rem;
			color: #fff;
			font-size: .14rem;
			position: absolute;
			left: 0;
			z-index: 66;
		}
		p {
			width: 100%;
			height: 100%;
			position: absolute;
			text-align: center;
			line-height: .45rem;
			font-size: .15rem;
			font-weight: 500;
			color: #fff;
		}
		.icon {
			line-height: .45rem;
			z-index: 66;
			color: #24bfbb;
			font-size: .13rem;
			margin-right: .1rem;
			position: absolute;
			right: 0;
			z-index: 66;
		}
		background:$header_bg;
	}
	/*糖果盒子内容*/

	.airdropBox {
		width: 100%;
		height: 1.5rem;
		background: url(https://imxpro.oss-cn-beijing.aliyuncs.com/static/airdropBgImgApp.png) no-repeat;
		background-size: 100% 100%;
		text-align: center;
		.InvitationTitleZn {
			width: 80%;
			height: .3rem;
			margin-top: .4rem;
			margin-bottom: .1rem;
		}
		.InvitationTitleEn {
			width: 55%;
			height: .3rem;
			margin-top: .4rem;
			margin-bottom: .1rem;
		}
		.InvitationTitleZh {
			width: 85%;
			height: .3rem;
			margin-top: .4rem;
			margin-bottom: .1rem;
		}
		.titleText {
			width: 100%;
			line-height: .25rem;
			text-align: center;
			color: #fff;
			span {
				color: #13f2f7;
			}
		}
	}
	/*空投信息头部*/

	.AirdropInformation {
		width: 100%;
		height: .5rem;
		background: $header_bg;
		display: flex;
		align-items: center;
		justify-content: space-between;
		box-sizing: border-box;
		padding: 0 .1rem;
		margin: .1rem 0;
		.oleft {
			font-size: .14rem;
			color: #fff;
		}
		.oright {
			width: 1.4rem;
			height: .25rem;
			display: flex;
			align-items: center;
			border: 1px solid #5d49c7;
			border-radius: .04rem;
			input {
				width: 80%;
				height: 80%;
				border: none;
				background: none;
				margin-left: .03rem;
				color: #fff;
			}
			input::-webkit-input-placeholder {
				color: #E0E0E0;
			}
			.iconfont {
				margin-left: .03rem;
				color: #fff;
			}
		}
	}
	/*空投列表*/

	.airdropList {
		width: 100%;
		.airdropList_warpper {
			width: 100%;
			.airdropList_item:nth-of-type(1) {
				margin: 0;
			}
			.airdropList_item {
				background: $header_bg;
				box-sizing: border-box;
				padding: .08rem .1rem;
				margin-top: .1rem;
				.title {
					width: 100%;
					display: flex;
					justify-content: space-between;
					align-items: center;
					padding-bottom: .05rem;
					border-bottom: 1px solid rgba(59, 66, 134, 0.3);
					.logo {
						display: flex;
						align-items: center;
						color: #fff;
						font-size: .13rem;
						margin: .05rem 0;
						img {
							width: .3rem;
							height: .3rem;
							margin-right: .1rem;
						}
						.CurName {
							margin-right: .02rem;
						}
						.fullName {
							font-size: .12rem;
							margin-left: .02rem;
						}
					}
					.time {
						font-size: .13rem;
						color: #6f74a6;
					}
				}
				.content {
					align-items: center;
					padding-top: .1rem;
					padding-bottom: .05rem;
					.oleft {
						color: #fff;
						.condition {
							line-height: .2rem;
							margin-top: .05rem;
						}
						.time {
							line-height: .2rem;
							color: #6f74a6;
						}
						.balane {
							line-height: .3rem;
							color: #6f74a6;
						}
					}
					.button {
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
		}
	}

	.pageCount {
		width: 100%;
		height: .6rem;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.noData {
		width: 100%;
		height: .3rem;
		text-align: center;
		line-height: .3rem;
		color: #fff;
		background: #111336;
	}

	.men_ban {
		width: 100%;
		height: 100%;
		background: rgba(0, 0, 0, 0.5);
		position: fixed;
		left: 0;
		top: 0;
		z-index: 666;
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
