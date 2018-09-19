<template>
	<div id="invitationCode" :class="{'invitationCode_white':getColor==1}">
		<!--邀请好友头部-->
		<div class="invitationCode_title">
			<img src="../../assets/inviteIMX.jpg" v-if="lang=='zh-CN'" />
			<img src="../../assets/inviteIMXen.jpg" v-if="lang!='zh-CN'" />
		</div>
		<!--邀请榜单-->
		<div class="InvitationList">
			<!--荣誉-->
			<div class="honor">
				<div class="honor_title">
					<span>{{newDate.getFullYear()}}{{$t("invitation.year")}}0{{newDate.getMonth()+1}}{{$t("invitation.month")}}{{$t("invitation.Topinviters")}}</span>
					<router-link to="/index/InvitationList" class="Completelist">{{$t("invitation.Viewlist")}}</router-link>
				</div>
				<ul class="honor_wrapper">
					<li v-for="(item,key) in List">
						<p class="icon">
							<img src="../../assets/gold.png" v-if="key==0" />
							<img src="../../assets/silver.png" v-if="key==1"  />
							<img src="../../assets/copper.png" v-if="key==2"  />
						</p>
						<p class="user">
							{{item.user_id}}
						</p>
						<p class="Rebate">
							<span>{{item.balance | number(8)}} IMX</span>
						</p>
					</li>
					<dd class="noData" v-if="List.length==0">{{$t("shouye.Counting")}}</dd>
				</ul>
			</div>
			<!--分享方式-->
			<div class="Sharingmethod">
				<div class="Sharingmethod_title">
					<span>{{$t("invitation.Invitationway")}}</span>
				</div>
				<div class="Sharingmethod_content">
					<!--复制成功-->
					<div class="copySuccess" v-show="copySuccess">
						<i class="iconfont icon-duihao2"></i> {{$t("capital.Successfullycopied")}}
					</div>
					<!--邀请码-->
					<div class="Invitationcode">
						<span class="code">{{invite.invite_code}}</span>
						<span class="button copy" data-clipboard-action="copy" data-clipboard-target=".code">{{$t("invitation.Copyinvcode")}}</span>
					</div>
					<!--邀请链接-->
					<div class="InvitationUrl">
						<span class="url">{{invite.invite_url}}</span>
						<span class="button copy" data-clipboard-action="copy" data-clipboard-target=".url">{{$t("invitation.Copylinkshare")}}</span>
					</div>
					<!--分享二维码-->
					<div class="InvitationButton">
						<button>{{$t("invitation.ShareQRcode")}}</button>
						<img class="InvitationButtonImg" :src="invite.invite_qr" />
					</div>
				</div>
			</div>

			<!--邀请人数-->
			<div class="Numberofpeople">
				<div class="Number">
					<p class="title">{{$t("invitation.Invitepnum")}}</p>
					<p class="allNum">
						<span>{{$t("invitation.Inviteptotal")}}</span>
						<span class="shu">{{invite.invitation_count}}</span>
					</p>
				</div>
				<div class="Rebate">
					<p class="title">{{$t("invitation.Cashback1")}}</p>
					<p class="Num">
						<span>IMX</span>
						<span class="currency">{{invite.maid_count | number(8)}}</span>
					</p>
				</div>
			</div>
			<!--邀请记录-->
			<div class="Invitationrecord">
				<div class="tabRecord">
					<span class="RecordTitle" @click="RecordisShow=true" :class="{'active':RecordisShow}">{{$t("invitation.Invitehistory")}}</span>
					<span class="RecordTitle" @click="RecordisShow=false" :class="{'active':!RecordisShow}">{{$t("invitation.Cashbackhistory")}}</span>
				</div>
				<!--邀请记录-->
				<div class="RecordList" v-show="RecordisShow">
					<ul class="RecordList_title">
						<li>{{$t("invitation.Inviteeaccount")}}</li>
						<li>{{$t("invitation.Time")}}</li>
						<li>{{$t("invitation.Status")}}</li>
					</ul>
					<ul class="RecordList_title" v-for="item in invitationRecordList">
						<li>{{item.name}}</li>
						<li>{{formatTime(item.created_at)}}</li>
						<li>
							<span v-if="item.type==0">{{$t("invitation.Expired")}}</span>
							<span v-if="item.type==1">{{$t("invitation.Valid")}}</span>
						</li>
					</ul>
					<div class="pageCount" v-show="invitationRecordList.length>0">
						<div class="button">
							<el-pagination layout="prev, pager, next" background @current-change="pageChange" :total="invitationTotal">
							</el-pagination>
						</div>
					</div>
				</div>
				<!--返佣记录-->
				<div class="RecordList" v-show="!RecordisShow">
					<ul class="RecordList_title">
						<li>{{$t("invitation.Inviteeaccount")}}</li>
						<li>{{$t("invitation.Time")}}</li>
						<li>{{$t("invitation.cashback")}}</li>
					</ul>
					<ul class="RecordList_title" v-for="item in maidRecordList">
						<li>{{item.source_uid}} </li>
						<li>{{formatTime(item.updated_at)}} </li>
						<li>{{item.balance | number(8)}}</li>
					</ul>
					<div class="pageCount" v-show="maidRecordList.length>0">
						<div class="button">
							<el-pagination layout="prev, pager, next" background @current-change="pageChangeMaid" :total="maidTotal">
							</el-pagination>
						</div>
					</div>
				</div>
			</div>

			<!--活动细则-->
				<div class="Rebate_content">
					<ul class="content">
						<p class="title">{{$t("inviteFriends.Activityrules")}}</p>
						<li>{{$t("inviteFriends.ActivityrulesO")}}</li>
						<li>{{$t("inviteFriends.ActivityrulesonetTe")}}</li>
					</ul>
				</div>
		</div>

	</div>
</template>

<script>
	import axios from "axios"
	import { httpUrl } from "../http_url/http_url"
	import $ from "jquery"
	import { mapGetters,mapActions,mapState,mapMutations } from 'vuex'
	export default {
		data() {
			return {
				RecordisShow: true,
				/*显示隐藏邀请   默认显示邀请记录*/
				yaoCode: "56cy76",
				yaoUrl: "https://www.imx.com?woe=12322",
				copySuccess: false,
				/*复制成功*/
				invite: {},
				/*邀请内容*/
				invitationRecordList: [],
				/*邀请记录*/
				invitationTotal: 0,
				/*邀请总条数*/
				maidRecordList: [],
				/*返佣记录*/
				maidTotal: 0, /*返佣记录总条数*/
				List:[] ,        /*邀请荣誉榜单*/
				newDate:new Date()   /*当前时间*/
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
		},
		methods: {
			pageChange(val) { /*邀请记录*/
				let _this = this;
				axios.get(httpUrl.invitationRecord, {
					headers: {
						"Authorization": "Bearer " + _this.token
					},
					params: {
						page: val
					}
				}).then(function(res) {
					_this.invitationRecordList = res.data.data.data;
				}, function(err) {
					console.log(err)
				})
			},
			pageChangeMaid(val) { /*返佣记录*/
				let _this = this;
				axios.get(httpUrl.maidRecord, {
					headers: {
						"Authorization": "Bearer " + _this.token
					},
					params: {
						page: val
					}
				}).then(function(res) {
					_this.maidRecordList = res.data.data.data;
				}, function(err) {
					console.log(err)
				})
			}
		},
		mounted() {
			/*复制和粘贴*/	
			let _this = this;
			var clipboard = new Clipboard(".copy");
			clipboard.on("success", function(e) {
				_this.copySuccess = true;
				setTimeout(function() {
					_this.copySuccess = false;
				}, 1500)
			})
			clipboard.on("error", function(e) {
				console.log("复制失败")
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
			/*邀请记录*/
			axios.get(httpUrl.invitationRecord, {
				headers: {
					"Authorization": "Bearer " + _this.token
				}
			}).then(function(res) {
				_this.invitationRecordList = res.data.data.data;
				_this.invitationTotal = res.data.data.total;
			}, function(err) {
				console.log(err)
			})

			/*返佣记录*/
			axios.get(httpUrl.maidRecord, {
				headers: {
					"Authorization": "Bearer " + _this.token
				}
			}).then(function(res) {
				_this.maidRecordList = res.data.data.data;
				_this.maidTotal = res.data.data.total;
			}, function(err) {
				console.log(err)
			})

			//邀请返利榜单
			axios.get(httpUrl.list).then(function(res) {
				_this.List = res.data.data.slice(0,3);
			}, function(err) {
				console.log(err)
			})


		}
	}
</script>
<style lang="scss">
	/*分页样式*/

	.el-pagination.is-background .el-pager li.active {
		background: #9F99F2 !important;
	}
</style>

<style lang="scss" scoped>
	/*白色版本开始*/

	.invitationCode_white {
		.honor,
		.Sharingmethod,
		.Numberofpeople,
		.Invitationrecord,
		.Rebate_content {
			background: #fff !important;
			color: #000 !important;
			.honor_wrapper li {
				border-bottom: 1px solid #ddd !important;
			}
		}
		.Rebate_content li {
			color: #000 !important;
		}
	}
	/*白色版本结束*/

	$black_bgcolor:#16172c;
	#invitationCode {
		color: #fff;
	}

	.invitationCode_title {
		width: 100%;
		max-height: 570px;
		img {
			width: 100%;
			height: 100%;
		}
	}
	/*邀请榜单*/

	.InvitationList {
		width: 90%;
		margin: 0 auto;
		.honor {
			width: 100%;
			background: $black_bgcolor;
			margin: 20px 0;
			.honor_title {
				height: 60px;
				line-height: 60px;
				display: flex;
				justify-content: space-between;
				box-sizing: border-box;
				padding: 0 20px;
				font-size: 14px;
				.Completelist {
					color: #665dd2;
					cursor: pointer;
				}
			}
			.honor_wrapper {
				width: 100%;
				.noData{
					width: 100%;
					height:50px;
					text-align: center;
					line-height: 50px;
					font-size: 16px;
				}
				li {
					width: 100%;
					height: 60px;
					box-sizing: border-box;
					padding: 0 20px;
					display: flex;
					align-items: center;
					border-bottom: 1px solid #2b2f54;
					p {
						flex: 1;
						font-size: 14px;
					}
					.icon {
						img {
							width: 30px;
							height: 32px;
						}
					}
					.user {
						text-align: center;
					}
					.Rebate {
						text-align: right;
					}
				}
				li:nth-last-child(1) {
					border-bottom: none;
				}
			}
		}
	}
	/*我的邀请方式*/

	.Sharingmethod {
		width: 100%;
		height: 160px;
		background: $black_bgcolor;
		box-sizing: border-box;
		padding: 0 20px;
		.Sharingmethod_title {
			line-height: 60px;
			font-size: 15px;
		}
		.Sharingmethod_content {
			height: 80px;
			display: flex;
			align-items: center;
			position: relative;
			.copySuccess {
				display: flex;
				align-items: center;
				padding: 10px 10px;
				position: absolute;
				left: 30%;
				top: 10%;
				background: #414182;
				box-shadow: 2px 2px 5px #000;
				.iconfont {
					color: #4b9b5e;
					margin-right: 10px;
				}
			}
			div {
				margin-right: 20px;
			}
			.Invitationcode {
				width: 250px;
				height: 40px;
				display: flex;
				align-items: center;
				box-sizing: border-box;
				padding: 5px 0;
				border: 1px solid #464a7a;
				border-radius: 4px;
				span {
					flex: .5;
					display: inline-block;
					height: 40px;
					line-height: 40px;
					text-align: center;
				}
				.code {
					flex: .5;
					border-right: 1px solid #464a7a;
				}
				.button {
					color: #7066eb;
					cursor: pointer;
				}
			}
			.InvitationUrl {
				width: 500px;
				height: 40px;
				display: flex;
				align-items: center;
				border: 1px solid #464a7a;
				border-radius: 4px;
				span {
					display: inline-block;
					height: 40px;
					line-height: 40px;
					text-align: center;
				}
				.url {
					flex: .7;
					white-space: nowrap;
					text-overflow: ellipsis;
					overflow: hidden;
					border-right: 1px solid #464a7a;
				}
				.button {
					flex: .3;
					color: #7066eb;
					cursor: pointer;
				}
			}
			.InvitationButton:hover .InvitationButtonImg {
				display: block;
			}
			.InvitationButton {
				width: 230px;
				height: 40px;
				position: relative;
				button {
					width: 100%;
					height: 100%;
					border-color: #837ddf;
					background: #837ddf;
					border-radius: 4px;
					text-align: center;
					color: #fff;
					line-height: 40px;
					outline: none;
				}
				img {
					width: 200px;
					height: 200px;
					display: none;
					position: absolute;
					left: 15px;
					top: 45px;
					z-index: 999;
				}
			}
		}
	}

	.Numberofpeople {
		width: 100%;
		height: 120px;
		display: flex;
		background: $black_bgcolor;
		margin: 20px 0;
		box-sizing: border-box;
		padding: 10px 20px;
		.Number {
			width: 250px;
			height: 100%;
			display: flex;
			flex-direction: column;
			justify-content: center;
			border-right: 2px solid #424673;
			.title {
				font-size: 16px;
			}
			p {
				height: 30px;
				line-height: 30px;
			}
			.allNum {
				.shu {
					font-size: 20px;
					margin-left: 20px;
				}
			}
		}
		.Rebate {
			box-sizing: border-box;
			display: flex;
			flex-direction: column;
			justify-content: center;
			padding-left: 40px;
			p {
				height: 30px;
				line-height: 30px;
			}
			.title {
				font-size: 16px;
			}
			.currency {
				font-size: 20px;
				margin-left: 30px;
			}
		}
	}
	/*邀请记录*/

	.Invitationrecord {
		width: 100%;
		background: $black_bgcolor;
		box-sizing: border-box;
		padding: 20px 20px;
		.tabRecord {
			height: 45px;
			line-height: 45px;
			.RecordTitle {
				height: 35px;
				font-size: 16px;
				padding-bottom: 5px;
				margin-right: 60px;
				cursor: pointer;
				padding-bottom: 10px;
			}
		}
		.RecordList {
			.RecordList_title {
				width: 100%;
				height: 50px;
				line-height: 50px;
				display: flex;
				justify-content: space-between;
				li {
					flex: 1;
				}
				li:nth-of-type(1) {
					text-align: left;
				}
				li:nth-of-type(2) {
					text-align: center;
				}
				li:nth-of-type(3) {
					text-align: right;
				}
			}
		}
	}
	/*选中状态*/

	.active {
		color: #7066eb;
		border-bottom: 2px solid #7066eb;
	}
	/*活动细则*/

	.Rebate_content {
		width: 100%;
		box-sizing: border-box;
		margin: 20px 0;
		padding: 0 30px 20px 30px;
		background: #16172c;
		margin-top: 35px;
		.title {
			line-height: 70px;
			font-size: 18px;
		}
		li {
			line-height: 30px;
			color: #9799b0;
		}
	}
	/*分页信息*/

	.pageCount {
		width: 100%;
		height: 60px;
		.button {
			float: right;
			margin-top: 15px;
			span {
				display: inline-block;
				width: 20px;
				height: 20px;
				font-size: 14px;
				line-height: 20px;
				text-align: center;
				cursor: pointer;
			}
			i {
				font-size: 14px;
				cursor: pointer;
			}
		}
	}
</style>
