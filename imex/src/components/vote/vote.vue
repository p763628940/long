<template>
	<div id="vote">
		<!--进行高级认证-->
		<div class="men_ban" v-if="isIdentity"></div>
		<div class="Identity" v-if="isIdentity">
			<div class="content">
        {{$t("vote.CanNotdAvancedVote")}}
			</div>
			<router-link to="/senior" tag="div" class="button">{{$t("vote.AdvancedCer")}}</router-link>
		</div>
		<div class="Close" v-if="isIdentity" @click="isIdentity=false">
			<i class="iconfont icon-quxiao1"></i>
		</div>
		<!--投票-->
		<div class="men_ban" v-if="isVote"></div>
		<div class="vote" v-if="isVote">
			<div class="title">
				<p>{{$t("vote.ImmediatVote")}}</p>
				<p>{{$t("vote.OnlyOneVote")}}</p>
			</div>
			<div class="content">
				<div class="zan" @click="ThumbsUp">
					<p class="icon" :class="{'animated bounceIn':isThumbsUp,'Fabulous':isThumbsUp}">
						<i class="iconfont icon-zan3"></i>
					</p>
					<p class="zanText">{{$t("vote.Like")}}</p>
				</div>
				<div class="cai" @click="StepOn">
					<p class="icon" :class="{'stepon':isStepOn}">
						<i class="iconfont icon-cai1-copy"></i>
					</p>
					<p class="caiText">{{$t("vote.Boo")}}</p>
				</div>
			</div>
			<div class="bottom" @click="ConfirmVote">
				{{$t("vote.ConfirmVote")}}
			</div>
		</div>
		<div class="Close1" v-if="isVote" @click="isVote=false;isThumbsUp=false;isStepOn=false;result='';">
			<i class="iconfont icon-quxiao1"></i>
		</div>
		<!--	头部内容-->
		<div class="fixed_header">
			<div class="userCenter_Height">
				<router-link tag="i" to="/index/newWallet" class="iconfont icon-zuojiantou" ></router-link>
				<p>{{$t("vote.TaocoinVote")}}</p>
				<router-link tag="span" to="/voteRules" class="icon">
          {{$t("vote.VotingRules")}}
				</router-link>
			</div>
		</div>
		<div class="oHeight"></div>
		<div class="Banner">
			<img src="../../assets/TaocoinBanner.png" v-if="$i18n.locale == 'zh'" />
			<img src="../../assets/voteBannerEN.png" v-if="$i18n.locale != 'zh'" />
		</div>
		<!--空投信息-->
		<div class="AirdropInformation">
			<span class="oleft">{{$t("vote.ProjectList")}}</span>
			<p class="oright">
				<input type="text" v-model="searText" maxlength="14" @keyup="noDate" :placeholder="$t('airdrop.ClickOnSearch')" />
				<i class="iconfont icon-sousuo1" @click="search"></i>
			</p>
		</div>
		<!--列表详情部分-->
		<ul class="ListDetails">
			<div class="DetailItem" v-for="item in voteList" @click="toDetails(item.eid)">
				<div class="DetailItem_title">
					<div class="oleft">
						<img :src="item.logoUrl" />
						<span class="curName">{{item.pageIdentifier}}</span>
						<span class="fullName">{{item.fullName}}</span>
					</div>
					<div class="oright" v-if="item.consensus_vote_count+item.consensus_pass_count>300">
						<span>{{$t("vote.SupportRate")}}:</span>
						<span class="num">
							<span v-if="item.consensus_pass_count!=0 || item.consensus_vote_count!=0">{{item.consensus_pass_count/ (item.consensus_vote_count+item.consensus_pass_count)*100 | number(2)}}%</span>
							<span v-if="item.consensus_pass_count==0 && item.consensus_vote_count==0">0%</span>
						</span>
					</div>
				</div>
				<div class="DetailItem_content">
					{{item.summary}}
				</div>
				<div class="DetailItem_bottom" :class="{'Havebeenpraised':item.consensus_records&&item.consensus_records.length>0&&item.consensus_records[0].result==1,'Havesteppedon':item.consensus_records&&item.consensus_records.length>0&&item.consensus_records[0].result==0}">
					<ul>
						<li class="zan">
							<i class="iconfont icon-zan3"></i>
							<span>{{item.consensus_pass_count}}</span>
						</li>
						<li class="cai">
							<i class="iconfont icon-cai1-copy"></i>
							<span>{{item.consensus_vote_count}}</span>
						</li>
					</ul>
					<div class="oRight">
						<button class="zan" @click.stop="VoteNow(item)">
							<span v-if="!item.consensus_records || item.consensus_records.length==0">{{$t("vote.ImmediatVote")}}</span>
							<span v-if="item.consensus_records&&item.consensus_records.length>0&&item.consensus_records[0].result==1">{{$t("vote.Liked")}}</span>
							<span v-if="item.consensus_records&&item.consensus_records.length>0&&item.consensus_records[0].result==0">{{$t("vote.Booed")}}</span>
						</button>
						<button class="pull" @click.stop="shareIt(item.eid,item.pageIdentifier)">{{$t("vote.CanvassForHim")}}</button>
					</div>
				</div>
			</div>
			<!--分页开始-->
			<div class="pageCount" v-show="voteTotal>10">
				<el-pagination small layout="prev, pager, next" :page-size="votePageNum" :total="voteTotal" @current-change="votePage">
				</el-pagination>
			</div>
			<!--暂无记录-->
			<div class="noData" v-if="voteTotal==0">{{$t("list.noData")}}</div>
		</ul>

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
	import axios from "axios";
	import { httpUrl } from "../http_url/http_url";
	import $ from "jquery";
	import { mapGetters,mapActions,mapState,mapMutations } from 'vuex'
	export default {
		data() {
			return {
				searText: "", //搜索内容
				voteList: [], //共识列表
				voteTotal: 0, //分页总条数
				votePageNum: 0, //每页数量
				userList: {}, //用户信息
				isIdentity: false, //是否高级认证
				isThumbsUp: false, //是否点赞
				isStepOn: false, //是否点踩
				result: "", //赞或踩
				isVote: false, //是否
				curName: "", //币种名称
				IsShareIt: false, //分享微信  朋友圈
				inviteCopy: "", //复制链接
				shares: null, //分享
				sharewx: null, //分享
				inviteCopy: "", //分享链接
        pageCount:1,  //分页的页数
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
		computed:{
			...mapState('user',{'invite_code':state=>state.userID}),
			...mapState('user',['lang']),
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
			//调用列表
			this.openSend();
			/*用户信息*/
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
			shareIt(eid, curName) { //分享
				let _this = this;
				if(this.token == null && this.token == undefined) {
					this.$router.push({
						name: "login"
					})
					return false;
				} else {
					let imgPath;
					if(location.host.indexOf("tanghs.com") != -1 || location.host.indexOf("localhost") != -1) {
						imgPath = "http://m.tanghs.com/#/MoneyCanvassing/" + this.invite_code + "/" + eid;
					} else {
						imgPath = "https://m.imx.com/#/MoneyCanvassing/" + this.invite_code + "/" + eid;
					}
          //空投日志添加
          this.$ajax.post(this.httpUrl.uploadDropLog, {
            type: 4,
            currency_eid: eid,
            invite_code: this.invite_code
          }).then(function(res) {
            return true;
          })
					this.inviteCopy = imgPath; //分享链接
					this.IsShareIt = true;
					this.curName = curName; //选中币种
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
					content:_this.$t("vote.InImx") + _this.curName + _this.$t("vote.ComeAndReceive"),
					pictures: "https://imxpro.oss-cn-beijing.aliyuncs.com/static/APP.png",
					thumbs: "https://imxpro.oss-cn-beijing.aliyuncs.com/static/APP.png",
          type:"web",
					href: _this.inviteCopy, //分享路径
					extra: {
						scene: FriendisCircle ////分享微信好友  	或者     朋友圈
					}
				}, function() {
					_this.IsShareIt = false;
					alert(_this.$t("vote.ShareSuccessfully"));
				}, function(e) {
					return true;
				});
			},
      ThumbsUp() { //点赞
        this.isThumbsUp = !this.isThumbsUp;
        if(this.isThumbsUp){
          this.result = "1"; //赞
        }else{
          this.result = ""; //赞
        }
        this.isStepOn = false; //关闭赞
      },
      StepOn() { //点踩
        this.isStepOn = !this.isStepOn;
        if(this.isStepOn){
          this.result = "0"; //踩
        }else{
          this.result = "";
        }
        this.isThumbsUp = false; //关闭踩
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
						_this.isVote = false;
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
			toDetails(eid) { //跳转
				this.$router.push({
					name: "voteDetails",
					params: {
						eid: eid
					}
				})
			},
			VoteNow(item) { //立即投票按钮
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
					if(item.consensus_records && item.consensus_records.length > 0) { //已投票，不能进行点击
						return;
					}
					this.isVote = true; //点击投票
					this.currency_eid = item.eid; //选中eid
					this.curName = item.pageIdentifier; //选中币种名称
				}
			},
			noDate() { /*判断是否有无数据*/
				this.openSend();
			},
			search() { /*搜索*/
				if(this.searText == "") {
					return false;
				}
				let _this = this;
				/*共识列表*/
				if(this.token == null && this.token == undefined) {
					if(this.lang == "zh") {
						axios.get(httpUrl.consensus, {
							params: {
								lang: "zh",
								name: this.searText
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
								name: this.searText
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
					if(this.lang == "zh") {
						axios.get(httpUrl.consensus, {
							params: {
								lang: "zh",
								name: this.searText
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
								name: this.searText
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
			openSend() { //获取列表
				let _this = this;
				/*共识列表*/
				if(this.token == null && this.token == undefined) {
					if(this.lang == "zh") {
						axios.get(httpUrl.consensus, {
							params: {
								lang: "zh",
                page: this.pageCount
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
                page: this.pageCount
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
					if(this.lang == "zh") {
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
              $('body,html').animate({scrollTop:0},1000);
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
              $('body,html').animate({scrollTop:0},1000);
						}, function(err) {
							console.log(err)
						})
					}
				}
			},
			votePage(val) { //分页
				let _this = this;
				this.pageCount = val;
				/*共识列表*/
				if(this.token == null && this.token == undefined) {
					if(this.lang == "zh") {
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
					if(this.lang == "zh") {
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
    background: #111627;
		.el-pager li {
			/*分页的背景颜色*/
			background: none !important;
			color: #fff;
		}
		.el-pagination .btn-next,
		.el-pagination .btn-prev {
			background: none !important;
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
<style lang="scss" scoped="scoped">
	$header_bg:#111336;
	$green:#25cbc5;
	.fixed_header {
		width: 100%;
		height: .45rem;
		position: fixed;
		left: 0;
		top: 0;
		z-index: 100;
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
			color: #6f74a6;
			font-size: .13rem;
			margin-right: .1rem;
			position: absolute;
			right: 0;
			z-index: 66;
		}
		background:$header_bg;
	}

	.oHeight {
		height: .45rem;
	}

	.Banner {
		width: 100%;
		height: .8rem;
		img {
			width: 100%;
			height: 100%;
		}
	}
	/*空投信息头部*/

	.AirdropInformation {
		width: 100%;
		height: .5rem;
		background: #171940;
		display: flex;
		align-items: center;
		justify-content: space-between;
		box-sizing: border-box;
		padding: 0 .1rem;
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
	/*列表部分*/

	.ListDetails {
		.DetailItem {
			width: 100%;
			box-sizing: border-box;
			background: #111336;
			.DetailItem_title {
				width: 95%;
				display: flex;
        margin: 0 auto;
				justify-content: space-between;
				align-items: center;
				border-bottom: .01rem solid #282e64;
				padding: .1rem 0;
				.oleft {
					color: #fff;
					display: flex;
					align-items: center;
					img {
						width: .25rem;
						height: .25rem;
						margin-right: .05rem;
					}
					.curName {
						font-size: .13rem;
						margin: 0 .03rem;
					}
				}
				.oright {
					color: $green;
					.num {
						font-size: .14rem;
					}
				}
			}
			.DetailItem_content {
				width: 95%;
				height: .27rem;
        margin: 0 auto;
				color: #6f74a6;
				overflow: hidden;
				text-overflow: ellipsis;
				display: -webkit-box;
				-webkit-line-clamp: 2;
				-webkit-box-orient: vertical;
				padding: .1rem 0;
				line-height: .18rem;
			}
			/*已赞*/
			.Havebeenpraised {
				ul {
					.zan {
						color: #25cbc5;
					}
				}
				.oRight {
					.zan {
						background: #242652 !important;
						color: #6f74a6 !important;
					}
				}
			}
			/*已踩*/
			.Havesteppedon {
				ul {
					.cai {
						color: #a41a0f !important;
					}
				}
				.oRight {
					.zan {
						background: #242652 !important;
						color: #6f74a6 !important;
					}
				}
			}
			.DetailItem_bottom {
				width: 100%;
				height: .5rem;
				display: flex;
				align-items: center;
				justify-content: space-between;
				background: #171940;
				margin-top: .1rem;
        box-sizing: border-box;
        padding: 0 .1rem;
				ul {
					display: flex;
          align-items: center;
					li {
						color: #6f74a6;
						margin-right: .1rem;
            display: flex;
            align-items: center;
            .iconfont{
              margin-right: .05rem;
            }
					}

				}
				.oRight {
					button {
						width: .8rem;
						height: .28rem;
						border: none;
						border-radius: .04rem;
					}
					.zan {
						background: #25cbc5;
						color: #fff;
					}
					.pull {
						border: .01rem solid #25cbc5;
						background: none;
						color: #25cbc5;
					}
				}
			}
		}
	}

	.men_ban {
		width: 100%;
		height: 100%;
		position: fixed;
		left: 0;
		top: 0;
		z-index: 666;
		background: rgba(0, 0, 0, 0.6);
	}

	.Identity {
		width: 2.2rem;
		height: 1.2rem;
		border-radius: .04rem;
		box-sizing: border-box;
		padding: 0 .1rem;
		background: #fff;
		position: fixed;
		left: 50%;
		top: 50%;
		margin-top: -1rem;
		margin-left: -1.1rem;
		z-index: 888;
		.content {
			width: 100%;
			height: .8rem;
			display: flex;
			align-items: center;
			text-align: center;
			border-bottom: .01rem solid #eee;
		}
		.button {
			width: 100%;
			height: .4rem;
			text-align: center;
			font-size: .14rem;
			line-height: .4rem;
			color: #25cbc5;
		}
	}

	.Close {
		position: fixed;
		left: 50%;
		top: 50%;
		z-index: 999;
		margin-left: -.13rem;
		margin-top: .5rem;
		.iconfont {
			color: #fff;
			font-size: .25rem;
		}
	}

	.Close1 {
		@extend .Close;
		margin-top: 1rem;
	}
	/*投票*/

	.vote {
		width: 2.2rem;
		height: 2.2rem;
		background: #fff;
		position: fixed;
		left: 50%;
		top: 50%;
		margin-left: -1.1rem;
		margin-top: -1.4rem;
		z-index: 999;
		box-sizing: border-box;
		padding: 0 .1rem;
		.title {
			text-align: center;
			box-sizing: border-box;
			padding: .1rem 0;
			color: #1d1e51;
			border-bottom: .01rem solid #eee;
			p {
				line-height: .2rem;
			}
		}
		.content {
			width: 100%;
			height: 1.2rem;
			display: flex;
			justify-content: center;
			border-bottom: .01rem solid #eee;
			div {
				text-align: center;
				margin: .2rem 0;
				.icon {
					width: .6rem;
					height: .6rem;
					background: #d7d7d7;
					border-radius: 50%;
					text-align: center;
					line-height: .6rem;
					margin: 0 .1rem;
					margin-bottom: .05rem;
					.iconfont {
						font-size: .35rem;
						color: #fff;
					}
				}
				.Fabulous {
					background: #25cbc5;
				}
				.stepon {
					background: #8d2d2d;
				}
				.zanText {
					color: #25cbc5;
				}
				.caiText {
					color: #8d2d2d;
				}
			}
		}
		.bottom {
			width: 100%;
			height: .38rem;
			text-align: center;
			font-size: .14rem;
			line-height: .38rem;
			color: #25cbc5;
		}
	}

	.pageCount {
		width: 100%;
		height: .6rem;
		display: flex;
		justify-content: center;
		align-items: center;
    background: #111627;
  }

	.noData {
		width: 100%;
		height: .3rem;
		text-align: center;
		line-height: .3rem;
		color: #fff;
		background: #111336;
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
