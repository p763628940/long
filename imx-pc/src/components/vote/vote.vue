
<template>
	<div id="vote">
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
						<i class="iconfont icon-cai1-copy"></i>
					</li>
				</ul>
			</div>
			<div class="bottom">
				<button class="cancel" @click="WhetherToVote=false;isThumbsUp=false;isStepOn=false;">{{$t("vote.LetmeThink")}}</button>
				<button class="confirm" @click="ConfirmVote">{{$t("vote.Confirm")}}</button>
			</div>
		</div>
		<div class="voteContent">
			<div class="header">
				<img src="../../assets/BeTheMaster.png" v-if="lang == 'zh-CN'" />
        <img src="../../assets/WEB_voteBannerEN.png" v-if="lang != 'zh-CN'" alt="" class="oImg">
				<ul class="list">
					{{$t("vote.LaunchVoting")}}
				</ul>
				<div class="Amoy">
					<button @click="toExchange">{{$t("vote.ApplyTaocoin")}}</button>
				</div>
			</div>
			<div class="voteList">
				<div class="title">
					<div class="text">
						{{$t("vote.TaocoinProList")}}
					</div>
					<div class="search">
						<input type="text" v-model="searText" maxlength="14" @keyup="noDate"   @keyup.enter="search"  :placeholder="$t('airdrop.ClickSearchOrEnter')" />
						<i class="iconfont icon-search"  @click="search"></i>
					</div>
				</div>
				<div class="voteList_wrapper">
					<ul class="wrapper">
						<li class="item" @click="toDetails(item.eid)" v-for="item in voteList">
							<div class="oLeft">
								<img :src="item.logoUrl" />
							</div>
							<div class="box">
								<div class="oContent">
									<div class="currencyName">
										<span class="curName">{{item.pageIdentifier}}</span>
										<span class="fullName">{{item.fullName}}</span>
									</div>
									<div class="currencyIntroduction">
										{{item.summary}}
									</div>
									<div class="Proportion" v-if="item.consensus_vote_count+item.consensus_pass_count>300">{{$t("vote.SupportRate")}}：
										<span v-if="item.consensus_pass_count!=0 || item.consensus_vote_count!=0">{{item.consensus_pass_count/ (item.consensus_vote_count+item.consensus_pass_count)*100 | number(2)}}%</span>
										<span v-if="item.consensus_pass_count==0 && item.consensus_vote_count==0">0%</span>
									</div>
								</div>
								<div class="oRight" :class="{'Liked':item.consensus_records&&item.consensus_records.length>0&&item.consensus_records[0].result==1,'Hassteppedon':item.consensus_records&&item.consensus_records.length>0&&item.consensus_records[0].result==0}">
									<div class="EndorsedisDisagree Thumbsup">
										<!--已赞类名-->
										<p class="icon">
											<i class="iconfont icon-zan"></i>
										</p>
										<p class="num">{{item.consensus_pass_count}}</p>
										<p>
											<button class="voteButton" @click.stop="VoteNow(item)">
												<span v-if="!item.consensus_records || item.consensus_records.length==0">{{$t("vote.ImmediatVote")}}</span>
												<span v-if="item.consensus_records&&item.consensus_records.length>0&&item.consensus_records[0].result==1">{{$t("vote.Liked")}}</span>
												<span v-if="item.consensus_records&&item.consensus_records.length>0&&item.consensus_records[0].result==0">{{$t("vote.Booed")}}</span>
											</button>
										</p>
									</div>
									<div class="EndorsedisDisagree Stepon">
										<p class="icon">
											<i class="iconfont  icon-cai1-copy"></i>
										</p>
										<p class="num">{{item.consensus_vote_count }}</p>
										<p>
											<button class="pullButton" @click.stop="pullButton(item)">{{$t("vote.CanvassForHim")}}</button>
										</p>
									</div>
								</div>
							</div>
						</li>
					</ul>
					<div class="noData" v-if="voteTotal==0">{{$t("list.noData")}}</div>
				</div>
			</div>
			<!--分页-->
			<div class="votePageCount" v-if="voteTotal>10">
				<el-pagination layout="prev, pager, next" background :page-size="votePageNum" @current-change="votePage" :total="voteTotal">
				</el-pagination>
			</div>
			<!--规则-->
			<!--空投规则-->
			<div class="ruleWrapper">
				<p class="ruleTitle">
					<span>{{$t("vote.TaocoinVotingRules")}}</span>
				</p>
				<ul>
					<li>1、{{$t("vote.TVRules1")}}</li>
					<li>2、{{$t("vote.TVRules2")}}</li>
					<li>3、{{$t("vote.TVRules3")}}</li>
					<li>4、{{$t("vote.TVRules4")}}
					</li>
          <li>5、{{$t("vote.TVRules5")}}
          </li>
          <li>{{$t("vote.DetailedFollows")}}
          </li>
          <li>{{$t("vote.Detailed1")}}
          </li>
          <li>{{$t("vote.Detailed2")}}
          </li>
          <li>{{$t("vote.Detailed3")}}
          </li>
          <li>{{$t("vote.Detailed4")}}
          </li>
          <li>{{$t("vote.Detailed5")}}
          </li>
          <li>{{$t("vote.Detailed6")}}
          </li>
          <li>{{$t("vote.Detaile7")}}
          </li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script>
	import axios from "axios";
	import { httpUrl } from "../http_url/http_url"
  import $ from "jquery"
	import { mapGetters,mapActions,mapState,mapMutations } from 'vuex'
	export default {
		data() {
			return {
				searText: "", //搜索内容
				isIdentity: false, //判断是否高级认证
				userList: {}, //用户信息
				WhetherToVote: false, //是否投票
				isStepOn: false, //是否点击踩
				isThumbsUp: false, //是否点击赞
				isQimg: false, //二维码弹框是否显示
				addQrImg: "http://img5.imgtn.bdimg.com/it/u=812586171,724963760&fm=27&gp=0.jpg", //图片地址
				voteList: [], //列表部分
				voteTotal: 0, //总条数
				votePageNum: 0, //每页条数
				result: "", //踩  赞  取决，
				currency_eid: "", //选中币id
				oUrl:"", //链接地址
        		pageCount:1,//默认第一页
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
			...mapState('user',['lang','userID'])
		},
    mounted() {
      let _this = this;
      this.invite_code = this.userID;
      var clipboard = new Clipboard(".copy");
      clipboard.on("success", function(e) {
        _this.$message({
          message: _this.$t("capital.Successfullycopied"),
          type: 'success',
          duration: 2000
        });
      })
      clipboard.on("error", function(e) {
        console.log("复制失败")
      })
      /*请求地址*/
      this.openSend();
      /*用户xs信息*/
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
			noDate() { //暂无记录
				let _this = this;
				this.searText = this.searText.replace(/[^a-zA-Z]/g, '');
				if(this.searText.length == 0) {
					this.openSend()
				}
			},
			search() { /*搜索*/
				if(this.searText == "") {
					return false;
				}
				let _this = this;
				/*共识列表*/
				if(this.token == null && this.token == undefined) {
					if(this.lang == "zh-CN") {
						axios.get(httpUrl.consensus, {
							params: {
								lang: "zh",
								name:this.searText
							}
						}).then(function(res) {
							_this.voteList = res.data.data.data;
							_this.voteTotal = res.data.data.total;
							_this.votePageNum = res.data.data.per_page;
						}, function(err) {
							console.log(err)
						})
					} else {
						axios.get(httpUrl.consensus, {
							params: {
								lang: "en",
								name:this.searText
							}
						}).then(function(res) {
							_this.voteList = res.data.data.data;
							_this.voteTotal = res.data.data.total;
							_this.votePageNum = res.data.data.per_page;
						}, function(err) {
							console.log(err)
						})
					}
				} else {
					if(this.lang == "zh-CN") {
						axios.get(httpUrl.consensus, {
							params: {
								lang: "zh",
								name:this.searText
							},
							headers: {
								"Authorization": "Bearer " + this.token
							}
						}).then(function(res) {
							_this.voteList = res.data.data.data;
							_this.voteTotal = res.data.data.total;
							_this.votePageNum = res.data.data.per_page;
						}, function(err) {
							console.log(err)
						})
					} else {
						axios.get(httpUrl.consensus, {
							params: {
								lang: "en",
								name:this.searText
							},
							headers: {
								"Authorization": "Bearer " + this.token
							}
						}).then(function(res) {
							_this.voteList = res.data.data.data;
							_this.voteTotal = res.data.data.total;
							_this.votePageNum = res.data.data.per_page;
						}, function(err) {
							console.log(err)
						})
					}
				}
			},
			toExchange(){  //上淘币
				if(this.token == null && this.token == undefined) {
					this.$router.push({
						name: "login"
					})
					return false;
				}
				const {
					href
				} = this.$router.resolve({
					path: "/index/Applicationcurrency"
				});
				window.open(href, '_blank');
			},
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
			openSend() {   //获取列表
				let _this = this;
				/*共识列表*/
				if(this.token == null && this.token == undefined) {
					if(this.lang == "zh-CN") {
						axios.get(httpUrl.consensus, {
							params: {
								lang: "zh",
                page: this.pageCount
							}
						}).then(function(res) {
							_this.voteList = res.data.data.data;
							_this.voteTotal = res.data.data.total;
							_this.votePageNum = res.data.data.per_page;
						}, function(err) {
							console.log(err)
						})
					} else {
						axios.get(httpUrl.consensus, {
							params: {
								lang: "en",
                page: this.pageCount
							}
						}).then(function(res) {
							_this.voteList = res.data.data.data;
							_this.voteTotal = res.data.data.total;
							_this.votePageNum = res.data.data.per_page;
						}, function(err) {
							console.log(err)
						})
					}
				} else {
					if(this.lang == "zh-CN") {
						axios.get(httpUrl.consensus, {
							params: {
								lang: "zh",
                page: this.pageCount
							},
							headers: {
								"Authorization": "Bearer " + this.token
							}
						}).then(function(res) {
							_this.voteList = res.data.data.data;
							_this.voteTotal = res.data.data.total;
							_this.votePageNum = res.data.data.per_page;
						}, function(err) {
							console.log(err)
						})
					} else {
						axios.get(httpUrl.consensus, {
							params: {
								lang: "en",
                page: this.pageCount
							},
							headers: {
								"Authorization": "Bearer " + this.token
							}
						}).then(function(res) {
							_this.voteList = res.data.data.data;
							_this.voteTotal = res.data.data.total;
							_this.votePageNum = res.data.data.per_page;
						}, function(err) {
							console.log(err)
						})
					}
				}
			},
			tabColor(index) { //切换
				$(".shareItWrapper li").eq(index).addClass("active_color").siblings("li").removeClass("active_color");
			},
			toDetails(id) { //跳转详情页面
				const {
					href
				} = this.$router.resolve({
					name: "voteDetails",
					params: {
						id: id
					}
				});
				window.open(href, '_blank');
			},
			ThumbsUp() {
				this.isThumbsUp = !this.isThumbsUp;
				this.result = "1"; //赞
				this.isStepOn = false; //关闭赞
			},
			StepOn() {
				this.isStepOn = !this.isStepOn;
				this.result = "0"; //踩
				this.isThumbsUp = false; //关闭踩
			},
			open(oUrl) {
				window.open(oUrl)
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
					currency_eid: this.currency_eid,
					result: this.result
				}, {
					headers: {
						"Authorization": "Bearer " + this.token
					}
				}).then(function(res) {
					if(res.data.status.code == 200) { //投票成功
						_this.$message({
							message: _this.$t("vote.VoteSucces"),
							type: 'success',
							duration: 2000
						});
						_this.WhetherToVote = false;
						_this.isThumbsUp = false;
						_this.isStepOn = false;
						//刷新列表接口
						_this.openSend();
					}
				})
			},
			VoteNow(item) {
				if(this.token == null && this.token == undefined) {
					this.$router.push({
						name: "login"
					})
					return false;
				} else {
					if(item.consensus_records && item.consensus_records.length > 0) {
						return;
					}
          if(this.userList.auth_grade != 1) { //判断有无高级认证
            this.isIdentity = true;
            return false;
          }
					this.WhetherToVote = true; //点击投票
					this.currency_eid = item.eid; //选中eid
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
			votePage(val) { //分页
				let _this = this;
				this.pageCount = val;
				/*共识列表*/
				if(this.token == null && this.token == undefined) {
					if(this.lang == "zh-CN") {
						axios.get(httpUrl.consensus, {
							params: {
								lang: "zh",
								page: val
							}
						}).then(function(res) {
							_this.voteList = res.data.data.data;
							_this.voteTotal = res.data.data.total;
							_this.votePageNum = res.data.data.per_page;
              $('body,html').animate({scrollTop:0},1000);
            }, function(err) {
							console.log(err)
						})
					} else {
						axios.get(httpUrl.consensus, {
							params: {
								lang: "en",
								page: val
							}
						}).then(function(res) {
							_this.voteList = res.data.data.data;
							_this.voteTotal = res.data.data.total;
							_this.votePageNum = res.data.data.per_page;
              $('body,html').animate({scrollTop:0},1000);
						}, function(err) {
							console.log(err)
						})
					}
				} else {
					if(this.lang == "zh-CN") {
						axios.get(httpUrl.consensus, {
							params: {
								lang: "zh",
								page: val
							},
							headers: {
								"Authorization": "Bearer " + this.token
							}
						}).then(function(res) {
							_this.voteList = res.data.data.data;
							_this.voteTotal = res.data.data.total;
							_this.votePageNum = res.data.data.per_page;
              $('body,html').animate({scrollTop:0},1000);
							}, function(err) {
							console.log(err)
						})
					} else {
						axios.get(httpUrl.consensus, {
							params: {
								lang: "en",
								page: val
							},
							headers: {
								"Authorization": "Bearer " + this.token
							}
						}).then(function(res) {
							_this.voteList = res.data.data.data;
							_this.voteTotal = res.data.data.total;
							_this.votePageNum = res.data.data.per_page;
              $('body,html').animate({scrollTop:0},1000);
						}, function(err) {
							console.log(err)
						})
					}
				}

			}
		}
	}
</script>
<style lang="scss">
	#vote {
		.votePageCount {
			.el-pagination.is-background .el-pager li.active {
				background-color: #26cbc5 !important;
				border-color: #26cbc5 !important;
			}
		}
	}
</style>
<style lang="scss" scoped>
	$font_color:#999da9;
	$color_green:#26cbc5;
	$bgColor:#26cbc5;
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

	#vote {
		width: 100%;
		min-height: 100%;
		background-image: url(../../assets/voteBg.png);
		background-repeat: no-repeat;
		background-size: 1920px 344px;
		background-position-x: 50%;
		background-color: #0c1330;
		padding: 10px 0;
		.voteContent {
			width: 1200px;
			margin: 40px auto;
		}
		button {
			outline: none;
		}
	}
	/*头部内容*/

	.header {
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		color: #fff;
    margin-top: 50px;
		img {
			width: 340px;
		}
    .oImg{
      width: 450px;
      height: 40px;
      margin-top: 20px;
    }
		.list {
			width: 60%;
			line-height: 25px;
			margin: 30px auto;
			font-size: 14px;
			text-align: center;
		}
		.Amoy {
			button {
				width: 200px;
				height: 45px;
				background: $bgColor;
				color: #fff;
				border-radius: 4px;
				font-size: 14px;
			}
		}
	}
	/*列表部分*/

	.voteList {
		background: #fff;
		overflow: hidden;
		margin-top: 66px;
		border-radius: 4px;
		padding-bottom: 10px;
		.title {
			width: 100%;
			height: 70px;
			display: flex;
			justify-content: space-between;
			align-items: center;
			box-sizing: border-box;
			padding: 0 20px;
			box-shadow: 2px 2px 8px #e8e8e8;
			.text {
				font-size: 15px;
			}
			.search {
				width: 200px;
				height: 30px;
				border: 1px solid #d1d3df;
				border-radius: 4px;
				display: flex;
				align-items: center;
				input {
					width: 88%;
					height: 80%;
					outline: none;
					box-sizing: border-box;
					padding-left: 5px;
					border: none;
				}
				.iconfont {
					cursor: pointer;
				}
			}
		}
		.voteList_wrapper {
			width: 100%;
			.wrapper {
				width: 100%;
				.item {
					width: 100%;
					cursor: pointer;
					box-sizing: border-box;
					padding: 10px 30px;
					display: flex;
					.oLeft {
						text-align: right;
						img {
							width: 58px;
							height: 58px;
							margin-top: 27px;
              margin-right: 24px;
						}
					}
					.box {
						flex: 1;
						display: flex;
						padding: 10px 0;
						padding-bottom: 25px;
						border-bottom: 1px solid #eaeaea;
						.oContent {
              width: 750px;
							.currencyName {
								margin: 20px 0;
								.curName {
									font-size: 24px;
									color: #33406d;
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
                width: 750px;
								color: #989ca8;
								font-size: 14px;
								line-height: 25px;
								height: 45px;
								color: #626683;
								word-break: break-all;
								display: -webkit-box;
								-webkit-line-clamp: 2;
								-webkit-box-orient: vertical;
								overflow: hidden;
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
                  cursor: auto;
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
									background: #dedcdd !important;
									color: #fff;
                  cursor: auto;
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
              width: 320px;
							display: flex;
							align-items: center;
							.EndorsedisDisagree:nth-last-child(1) {
								margin: 0;
							}
							.EndorsedisDisagree {
                width: 160px;
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
									color: #c2c5d3;
								}
								p {
									button {
										width: 140px;
										height: 48px;
										font-size: 16px;
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
		}
	}

	.votePageCount {
		display: flex;
		align-items: center;
		justify-content: flex-end;
		height: 80px;
	}
	/*空投规则*/

	.ruleWrapper {
		width: 100%;
		margin-top: 20px;
		.ruleTitle {
			font-size: 15px;
			color: #d2d3e5;
		}
		ul {
			padding-top: 10px;
			li {
				line-height: 30px;
				color: #9599b2;
				font-size: 13px;
				p {
					margin-left: 18px;
				}
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
	.noData {
		width: 100%;
		height: 50px;
		text-align: center;
		line-height: 50px;
		font-size: 16px;
	}
	.textIndex {
		margin-left: 20px;
	}
</style>
