<template>
	<div id="InvitationCandy">
		<div class="box">
			<!--头部logo-->
			<img src="../../assets/Pulltheticket.png" class="InvitationTitle" />
			<!--头部内容部分-->
			<div class="titleText">
				<span>“</span> 我在imx期待{{consensusList.pageIdentifier}}项目淘币拉票快来跟我一起帮忙投票吧
				<span>”</span>
			</div>
			<div class="Currency">
				<li>
					<p class="oleft">
						<img src="../../assets/01.png" />
						<span class="curName">{{consensusList.pageIdentifier}}</span>
						<span class="fullname">{{consensusList.fullName}}</span>
					</p>
				</li>
				<li>
					<p class="oright">
						支持率：
						<span class="green">
						<span v-if="consensusList.consensus_pass_count!=0 || consensusList.consensus_vote_count!=0">{{consensusList.consensus_pass_count/ (consensusList.consensus_vote_count+consensusList.consensus_pass_count)*100 | number(2)}}%</span>
						<span v-if="consensusList.consensus_pass_count==0 && consensusList.consensus_vote_count==0">0%</span>
						</span>
					</p>
				</li>
				<li class="address">
					<p class="text">
						合约地址：
					</p>
          <p class="addressText">
            {{consensusList.contract}}
          </p>
					<p class="copy">
						<span class="copy" id="copy" :data-clipboard-text="consensusList.contract" @click="copy">
						<i class="iconfont icon-fuzhi1"></i>
					</span>
					</p>
				</li>
				<li class="condition">
					<span class="zan">
					<i class="iconfont icon-zan3"></i>
					{{consensusList.consensus_pass_count}}
				</span>
					<span class="cai">
					<i class="iconfont icon-cai"></i>
					{{consensusList.consensus_vote_count}}
				</span>
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
						<span @click="open(consensusList.officiaWebsite)">{{$t("airdrop.GoToWebsite")}}</span>
						<span @click="open(consensusList.whitePaper)">{{$t("airdrop.ViewWhitePaper")}}</span>
					</p>
				</div>
				<div class="content">
					{{consensusList.summary}}
				</div>
				<div class="bottom">
					<button class="View" @click="toAirdrop">{{$t('airdrop.ViewOtherProjects')}}</button>
					<button class="Receive" @click="toRegister">帮忙投票</button>
				</div>
			</div>
			<div class="oHeight"></div>
			<div class="Fixedbottom">
				<div class="logo">
					<img src="../../../static/img/APP2.png" />
					<div class="text">
            <p>{{$t('airdrop.Knowmore')}}</p>
            <p>{{$t('airdrop.DownloadIMXAPP')}}</p>
					</div>
				</div>
				<div class="down">
					<button @click="open('https://www.imx.com/down.html')">{{$t('airdrop.Download')}}</button>
				</div>
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
				currEid: this.$route.params.currEid,
				consensusList: [], //详情
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
			let _this = this;
			this.$ajax.get(this.httpUrl.consensus, {
				params: {
					eid: this.currEid
				}
			}).then(function(res) {
				_this.consensusList = res.data.data;
			}, function(err) {
				console.log(err)
			})
			//空投日志添加
			this.$ajax.post(this.httpUrl.uploadDropLog, {
				type: 5,
				currency_eid: this.currEid,
				invite_code: this.InvitationCode
			}).then(function(res) {
				return true;
			})
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
			open(url) {
				window.open(url);
			},
			toRegister() {
				window.localStorage.setItem("isConsensus", true);
				this.$router.push({
					name: "register",
					query: {
						invite_code: this.InvitationCode,
						currEid: this.$route.params.currEid
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
					name: "vote"
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	#InvitationCandy {
		width: 100%;
		height: 100%;
		overflow: auto;
		.box {
			width: 100%;
			min-height: 100%;
			background: url(https://imxpro.oss-cn-beijing.aliyuncs.com/consensusBgImg.png) no-repeat;
			background-size: 100% 100%;
			display: flex;
			flex-direction: column;
			align-items: center;
		}
	}
	/*头部logo图片*/

	.InvitationTitle {
		width: 60%;
		height: .3rem;
		margin-top: .4rem;
		margin-bottom: .1rem;
	}

	.titleText {
		width: 99%;
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
			line-height: .5rem;
			display: block;
			font-size: .15rem;
			.zan {
				color: #25cbc5;
				margin-right: .1rem;
				.iconfont {
					margin-right: .05rem;
				}
			}
			.cai {
				color: #a5a5a5;
			}
		}
    .address{
      display: block;
      height: auto;
      .text{
        width: 100%;
        white-space:normal;
        line-height: .2rem;
      }
      .copy{
        text-align: right;
        height: .2rem;
        line-height: .2rem;
      }
      .addressText{
        width: 90%;
        word-break:break-all;
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
				.fullname {
					margin-top: .02rem;
				}
			}
			.oright {
				.green {
					font-size: .14rem;
					color: #26cbc5;
				}
			}
			.text {
				line-height: .16rem;
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
		margin: .12rem auto;
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

	.oHeight {
		height: 1rem;
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
