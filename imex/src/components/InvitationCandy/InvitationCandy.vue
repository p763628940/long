<template>
	<div id="InvitationCandy">
		<!--头部logo-->
		<img src="../../assets/airdropTitEn.jpg" class="InvitationTitle" />
		<!--头部内容部分-->
		<div class="titleText">
			<span>“</span> {{$t('airdrop.GotInIMX')}} {{currency.pageIdentifier}} {{$t('airdrop.ComeAndJoin')}}
			<span>”</span> 
		</div>
		<div class="Currency">
			<li>
				<p class="oleft">
					<img :src="currency.logoUrl" />
					<span class="curName">{{currency.pageIdentifier}}</span>
					<span class="fullname">{{currency.fullName}}</span>
				</p>
			</li>
			<li>
				<p class="oright">
					{{$t("airdrop.DropTime")}}：{{Time}}
					<span v-if="status==1">{{$t("airdrop.Airdropped")}}</span>
				</p>
			</li>
			<li>
				<p class="text" v-if="Details.publishVolume!=0">{{$t("airdrop.TotalAirdrop")}}：<span class="num">{{Details.publishVolume}}</span>{{currency.pageIdentifier}}</p>
				<p class="text" v-if="Details.publishVolume==0">{{$t("airdrop.TotalAirdrop")}}：{{$t("airdrop.Noceiling")}}</p>
			</li>
			<li class="condition">
				<p>{{$t("airdrop.ReceiveConditions")}}：</p>
				<p class="conditionText">
					{{Details.note}}
				</p>
			</li>
		</div>
		<!--线的渐变-->
		<div class="border"></div>
		<!--项目介绍-->
		<div class="ProjectIntroduction">
			<div class="title">
				<p class="oleft">
					<span>{{$t("airdrop.ProjectIntroduction")}}</span>
				</p> 
				<p class="oright">
					<span @click="open(currency.officiaWebsite)">{{$t("airdrop.GoToWebsite")}}</span>
					<span @click="open(currency.whitePaper)">{{$t("airdrop.ViewWhitePaper")}}</span>
				</p>
			</div>
			<div class="content">
				{{currency.summary}}
			</div>
			<div class="bottom">
				<button class="View" :class="{'View_project':isLogin}" @click="toAirdrop">{{$t('airdrop.ViewOtherProjects')}}</button>
				<button class="Receive" v-if="ReceiveIsShow" @click="toRegister">{{$t('airdrop.RegisterToReceive')}}</button>
			</div>
		</div>
		<div class="oHeight"></div>
		<div class="ReceivingCondition" v-if="isLogin">
			{{$t("airdrop.ConditionsMet")}}{{Time1}}{{$t("airdrop.IssueCandy")}}
			<router-link to="/index/userCenter" class="assets">{{$t("airdrop.AssetAanagement")}}</router-link> {{$t("airdrop.InTheView")}}
		</div>
		<div class="Fixedbottom" v-if="DownIsShow">  	
			<div class="logo">
				<img src="../../../static/img/APP2.png" />
				<div class="text">
					<p>{{$t('airdrop.GetMoreCandy')}}</p> 
					<p>{{$t('airdrop.DownloadIMXAPP')}}</p>
				</div>
			</div>
			<div class="down">
				<button @click="open('https://www.imx.com/down.html')">{{$t('airdrop.Download')}}</button>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				InvitationCode: this.$route.params.InvitationCode,
				/*邀请码*/
				CandyId: this.$route.params.CandyId,
				/*糖果id*/
				Details: {},
				/*糖果详情*/
				currency: {},
				Time: "",
				/*时间*/
				Time1:"",
				DownIsShow: true,
				/*下载*/
				ReceiveIsShow: true,
				/*注册领取*/
				isLogin: false,
				/*判读是否登录*/   
				status: "", //判读状态
			}
		},
		mounted() {
			let _this = this;	
			/*判断用户是否登录*/
			if(this.InvitationCode == "001002") { 
				this.DownIsShow = false;
				this.ReceiveIsShow = false;
				this.isLogin = true;
				//空投日志添加   领取
				this.$ajax.post(this.httpUrl.uploadDropLog, {
					type: 3,
					currency_eid: this.CandyId,
					invite_code: window.localStorage.getItem("InvitationCode")
				}).then(function(res) {
					return true;
				})
				window.localStorage.removeItem("isCandy"); /*删除判断*/  
			} else {
				window.localStorage.setItem("InvitationCode",this.InvitationCode)
				//空投日志添加
				this.$ajax.post(this.httpUrl.uploadDropLog, {
					type: 1,
					currency_eid: this.CandyId,
					invite_code: this.InvitationCode
				}).then(function(res) {
					return true;
				})
			}
			/*获取糖果详情部分*/
			this.$ajax.get(this.httpUrl.airDropCurrency, {
				params: {
					eid: this.CandyId
				} 
			}).then(function(res) {
				_this.Details = res.data.data;
				_this.status = res.data.data.status;
				_this.currency = res.data.data.currency;
				_this.Time = _this.formatTime(res.data.data.drop_at);
				_this.Time1 = _this.formatTime(res.data.data.drop_at).split(" ")[0];
			}, function(err) {
				console.log(err)
			})
		},
		methods: {
			open(url) {
				window.open(url);
			},
			toRegister() {
				window.localStorage.setItem("isCandy", true); /*跳转跳如h5页面*/
				this.$router.push({
					name: "register",
					query: {
						invite_code: this.InvitationCode,
						CandyId: this.CandyId
					}
				})
			},
			toHome() {
				this.$router.push({
					name: "home"
				})
			},
			toAirdrop() {
				this.$router.push({
					name: "airdrop"
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	#InvitationCandy {
		width: 100%; 
		min-height: 100%; 
		background: url(https://imxpro.oss-cn-beijing.aliyuncs.com/invitationCandyBg.png) no-repeat;
		background-size: 100% 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	/*头部logo图片*/
	
	.InvitationTitle {
		width: 55%;
		height: .3rem;
		margin-top: .4rem;
		margin-bottom: .1rem;
	}
	
	.titleText {
		width: 94%;
		line-height: .25rem;
		text-align: center;
		color: #fff;
		span {
			color: #13f2f7;
		}
	}
	
	.Currency {
		width: 90%;
		margin-top: .2rem;
		li:nth-of-type(1) {
			height: .35rem;
		}
		.condition {
			width: 100%;
			height: auto;
			display: block;
			.conditionText{
				margin-top: .08rem;
				line-height: .2rem;
			}
		}
		li {
			width: 100%;
			height: .32rem;
			display: flex;
			align-items: center;
			justify-content: space-between;
			color: #e6e3f6;
			.oleft {
				display: flex;
				align-items: center;
				justify-content: space-between;
				img {
					width: .3rem;
					height: .3rem;
					margin-right: .05rem;
				}
				.curName {
					font-size: .16rem;
					color: #fff;
					margin-right: .05rem;
				}
				.fullname{
					margin-top: .02rem;
				}
			}
			.text {
				.num {
					font-size: .15rem;
					color: #13f2f7;
					margin: 0 .03rem;
				}
			}
		}
	}
	
	.border {
		width: 80%;
		height: .01rem;
		margin: .15rem auto;
		background: -webkit-gradient(linear, 0 0, 100% 0, from(rgba(0, 0, 0, 0.1)), color-stop(0.14, #53479d), color-stop(0.29, #6b5dbc), color-stop(0.43, #7d6fd1), color-stop(0.57, #897ae1), color-stop(0.71, #7769ca), color-stop(0.86, #6a5cbb), to(rgba(0, 0, 0, 0.1)));
		background: -webkit-linear-gradient(to left, rgba(0, 0, 0, 0.1), #53479d, #6b5dbc, #7d6fd1, #897ae1, #7769ca, #6a5cbb, rgba(0, 0, 0, 0.1));
		background: -moz-linear-gradient(to left, rgba(0, 0, 0, 0.1), #53479d, #6b5dbc, #7d6fd1, #897ae1, #7769ca, #6a5cbb, rgba(0, 0, 0, 0.1));
		background: -o-linear-gradient(to left, rgba(0, 0, 0, 0.1), #53479d, #6b5dbc, #7d6fd1, #897ae1, #7769ca, #6a5cbb, rgba(0, 0, 0, 0.1));
		background: linear-gradient(to left, rgba(0, 0, 0, 0.1), #53479d, #6b5dbc, #7d6fd1, #897ae1, #7769ca, #6a5cbb, rgba(0, 0, 0, 0.1));
	}
	
	.ProjectIntroduction {
		width: 90%;
		.title {
			width: 100%;
			height: .3rem;
			display: flex;
			justify-content: space-between;
			align-items: center;
			color: #13f2f7;
			.oright {
				span {
					margin-right: .05rem;
				}
				span:nth-last-of-type(1) {
					margin: 0;
				}
			}
		}
		.content {
			color: #e6e3f6;
			line-height: .15rem;
		}
		.bottom {
			width: 100%;
			display: flex;
			justify-content: center;
			margin-top: .2rem;
			.View {
				width: 45%;
				height: .4rem;
				background: none;
				border: 1px solid #26cbc5;
				border-radius: .04rem;
				color: #26cbc5;
				margin-right: .25rem;
			}
			.View_project {
				width: 60%;
				height: .45rem;
				border-radius: 2px;
				background: #26cbc5;
				margin: 0;
				color: #fff;
			}
			.Receive {
				width: 45%;
				height: .4rem;
				background: #26cbc5;
				border: none;
				border-radius: .04rem;
				color: #fff;
			}
		}
	}
	
	.oHeight {
		width: 100%;
		height: .8rem;
	}
	
	.ReceivingCondition {
		width: 100%;
		background: #0c0934;
		position: fixed;
		bottom: 0;
		left: 0;
		z-index: 666;
		color: #fff;
		box-sizing: border-box;
		padding: .1rem .08rem;
		line-height: .2rem;
		.assets {
			color: #5fc8c4;
		}
	}
	
	.Fixedbottom {
		width: 100%;
		height: .6rem;
		background: #0c0934;
		position: fixed;
		bottom: 0;
		left: 0;
		z-index: 666;
		display: flex;
		justify-content: space-between;
		align-items: center;
		box-sizing: border-box;
		padding: 0 .1rem;
		.logo {
			display: flex;
			align-items: center;
			img {
				width: .5rem;
				height: .5rem;
			}
			.text {
				color: #fff;
				margin-left: .05rem;
				p {
					line-height: .18rem;
				}
			}
		}
		.down {
			button {
				width: 100px;
				height: .35rem;
				border: 1px solid #26cbc5;
				background: #1e175a;
				color: #fff;
				border-radius: .04rem;
			}
		}
	}
	/*头部*/
	
	.header {
		position: fixed;
		right: .06rem;
		top: .06rem;
		span {
			display: inline-block;
			width: .3rem;
			height: .3rem;
			text-align: center;
			line-height: .3rem;
			background: rgba(0, 0, 0, 0.5);
			color: #fff;
			border-radius: 50%;
		}
	}
</style>