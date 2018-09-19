<template>
	<div id="airdrop">
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
		<!--空投内容-->
		<div class="airdropContent">
			<!--糖果头部-->
			<div class="airdropTitle">
				<img src="../../assets/airdropTitEn.jpg" v-if="lang!='zh-CN'" class="oEnglish" />
				<img src="../../assets/airdropTitZh.jpg" v-if="lang=='zh-CN'" class="oChinese" />
				<p>
					{{$t("airdrop.TheWorld")}},{{$t("airdrop.Viewdetails")}}
					<span @click="toDetails">
						{{$t("airdrop.IMXPlatform")}}
					</span> {{$t("airdrop.announcement")}}
				</p>
				<!--申请新币种空投-->
				<div class="button">
					<button @click="toApplicationcurrency">
						{{$t("airdrop.Applyfor")}}
					</button>
				</div>
			</div>
			<!--糖果盒子介绍-->
			<div class="Introduction">
				<!--头部-->
				<div class="title">
					<p class="time">{{$t("airdrop.AirdropDate")}}（{{Year}}）</p>
					<div class="search">
						<input type="text" v-model="searText" maxlength="14" @keyup="noDate" @keyup.enter="search" :placeholder="$t('airdrop.ClickSearchOrEnter')" />
						<i class="iconfont icon-search" @click="search"></i>
					</div>
				</div>
				<!--内容部分-->
				<div class="airdropWrapper">
					<div class="airdropitems" v-for="item in airdropList">
						<!--时间部分-->
						<div class="time">
							<div class="content" :class="{'yesR':item.status==1}">
								<div class="border">
									<p><span></span></p>
								</div>
								<div class="text" v-if="item.status!=1">{{formatTime(item.drop_at).split(" ")[0].slice(5,11)}}</div>
								<div class="text" v-if="item.status==1">{{$t("airdrop.Airdropped")}}</div>
							</div>
						</div>
						<!--币种-->
						<div class="Currency" @click="toDiails(item.eid)">
							<div class="oImg">
								<img :src="item.currency.logoUrl" />
							</div>
							<div class="CurrencyIntroduction">
								<div class="IntroductionTitle">
									<p class="oleft">
										<span class="curName">{{item.currency.pageIdentifier}}</span>
										<span class="FullName">{{item.currency.fullName}}</span>
									</p>
									<p class="oright" v-if="item.publishVolume!=0">
										{{$t("airdrop.TotalAirdrop")}}：<span class="Num">{{item.publishVolume}}</span>{{item.currency.pageIdentifier}}
									</p>
									<p class="oright" v-if="item.publishVolume==0">
										{{$t("airdrop.TotalAirdrop")}}：{{$t("airdrop.Noceiling")}}
									</p>
								</div>
								<div class="IntroductionContent" v-html="item.currency.summary">
								</div>
								<div class="ReceivingCondition">
									<div class="oleft">{{$t("airdrop.ReceiveConditions")}}：{{item.note}}</div>
									<div class="button">
										<button @click.stop="shareIt(item.eid)">{{$t("airdrop.ShareCandy")}}</button>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div class="noData" v-if="myOrderTotal==0">{{$t("list.noData")}}</div>
				</div>
			</div>
			<div class="pageCount1" v-show="myOrderTotal>10">
				<el-pagination layout="prev, pager, next" background :page-size="myOrderPage" @current-change="pagemyOrderChange" :total="myOrderTotal">
				</el-pagination>
			</div>
			<!--空投规则-->
			<div class="ruleWrapper">
				<p class="ruleTitle">
					<span>{{$t("airdrop.IMCandyRules")}}</span>
				</p>
				<ul>
					<li>1、{{$t("airdrop.AirdropParties")}}</li>
					<li>2、{{$t("airdrop.IMXUsers")}}</li>
					<li>3、{{$t("airdrop.Eachairdrop")}}</li>
					<li>4、{{$t("airdrop.Tokenwill")}}
					</li>
					<li>5、{{$t("airdrop.Inviteyour")}}
					</li>
					<li>6、{{$t("airdrop.AirdropCandy")}}
					</li>
					<li class="textIndex">{{$t("airdrop.OrdinaryCandy")}}
					</li>
					<li class="textIndex">{{$t("airdrop.Highgrade")}}
					</li>
					<li>7、{{$t("airdrop.Candieswill")}}
					</li>
					<li>{{$t("airdrop.UniqueRight")}}
					</li>
				</ul>
			</div>
		</div>

	</div>
</template>
<script>
	import axios from "axios";
	import { mapGetters,mapActions,mapState,mapMutations } from 'vuex'
	import { httpUrl } from "../http_url/http_url";
	import $ from "jquery";
	export default {
		data() {
			return {
				myOrderPage: 0,
				/*一页显示条数*/
				myOrderTotal: 0,
				/*总条数*/
				airdropList: [],
				/*空投列表*/
				Year: new Date().getFullYear(),
				searText: "",
				isQimg: false,
				addQrImg: "",
				invite_code: "",
				/*邀请码*/
				yaoUrl: "",
				/*邀请码链接*/
				First: "",
				/*公告第一条*/
			}
		},
    updated() {
      $('.IntroductionContent').xdlines({
        max: 2
      });
    },
		computed: {
			...mapState('user',['lang']),
	},
	watch:{
		lang:function (val){
			this.refreshLang();
		}

	},
		mounted() {
      (function($) {
        $.fn.xdlines = function(options) {
          var opts = $.extend({}, $.fn.xdlines.defaults, options);
          var $this = $(this);
          for(var k = 0; k < $this.length; k++) {
            var $obj = $this.eq(k);
            $obj.css({
              wordWrap: 'break-word'
            })
            var str = $obj.text();
            str = str.replace(/(^\s*)|(\s*$)/g, "");
            var l = str.length;
            var txt = '';
            var lineHeight; //单行高度
            var linesNum = opts.max; //需要的行数
            for(var i in str) {
              txt += str[i];
              $obj.text(txt);
              var nowh = parseInt($obj.css('height')); //当前高度
              if(i == 0) {
                lineHeight = nowh * linesNum;
              }
              if(nowh > lineHeight) {
                var txt = txt.substring(0, txt.length - 3) + "...";
                $obj.text(txt);
                break;
              }
            }
          }
        };
        $.fn.xdlines.defaults = {
          max: 1
        }
      })(jQuery)
			let _this = this;
			this.refreshLang();
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

			/*判断用户是否登录*/
			if(this.token == null && this.token == undefined) {
				return false;
			} else {
				axios.get(httpUrl.personalInfo, {
					headers: {
						"Authorization": "Bearer " + this.token
					}
				}).then(function(res) {
					_this.invite_code = res.data.data.invite_code;
				}, function(err) {
					console.log(err)
				})
			}

		},
		methods: {
			refreshLang(){
				let _this= this;
							if(this.lang == "zh-CN") {
				/*空投列表*/
				axios.get(httpUrl.airDropCurrency).then(function(res) {
					_this.airdropList = res.data.data.data;
					_this.myOrderPage = res.data.data.per_page;
					_this.myOrderTotal = res.data.data.total;
				}, function(err) {
					console.log(err)
				})
			} else {
				/*空投列表*/
				axios.get(httpUrl.airDropCurrency, {
					params: {
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
			toDetails() {
				let routeData = this.$router.resolve({
					name: "details",
					params: {
						id: 44
					}
				});
				window.open(routeData.href, '_blank');
			},
			tabColor(index) { //切换
				$(".shareItWrapper li").eq(index).addClass("active_color").siblings("li").removeClass("active_color");
			},
			toApplicationcurrency() {
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
			noDate() {
				let _this = this;
				this.searText = this.searText.replace(/[^a-zA-Z]/g, '');
				if(this.searText.length == 0) {
					axios.get(httpUrl.airDropCurrency).then(function(res) {
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
				axios.get(httpUrl.airDropCurrency, {
					params: {
						name: this.searText
					}
				}).then(function(res) {
					_this.airdropList = res.data.data.data;
					_this.myOrderPage = res.data.data.per_page;
					_this.myOrderTotal = res.data.data.total;
				}, function(err) {
					console.log(err)
				})
			},
			toDiails(eid) {
				const {
					href
				} = this.$router.resolve({
					name: "AirdropDetails",
					params: {
						id: eid
					}
				});
				window.open(href, '_blank');
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
          //空投日志添加
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
			pagemyOrderChange(val) {
				let _this = this;
				axios.get(httpUrl.airDropCurrency, {
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
			}
		}
	}
</script>
<style lang="scss">
	#airdrop {
		.pageCount1 {
			.el-pagination.is-background .el-pager li.active {
				background-color: #26cbc5 !important;
				border-color: #26cbc5;
			}
		}
	}
</style>
<style lang="scss" scoped>
	$font_color:#999da9;
	$color_green:#26cbc5;
	#airdrop {
		width: 100%;
		min-height: 100%;
		background-color: #0c1331;
		background-image: url(../../assets/airdropBgImg.png);
		background-repeat: no-repeat;
		background-size: 100% 900px;
		padding: 10px 0;
	}
	/*已空投*/

	.yesR {
		.border {
			p {
				background: #eee !important;
				span {
					background: #d0d0d8 !important;
				}
			}
		}
		.text {
			color: #d0d0d8 !important;
		}
	}
	/*空投内容*/

	.airdropContent {
		width: 1200px;
		margin: 0 auto;
	}
	/*糖果盒子头部*/

	.airdropTitle {
		width: 100%;
		text-align: center;
		margin-top: 100px;
		.oEnglish {
			width: 320px;
			height: 55px;
		}
		.oChinese {
			width: 500px;
			height: 55px;
		}
		img {
			margin-bottom: 20px;
		}
		p {
			line-height: 30px;
			color: #fff;
			font-size: 14px;
			span {
				cursor: pointer;
				color: #25cbc5;
			}
		}
		.button {
			button {
				padding: 0 20px;
				height: 45px;
				background: #26cbc5;
				border-radius: 4px;
				color: #fff;
				font-size: 16px;
				margin: 20px 0 10px 0;
				outline: none;
			}
		}
	}
	/*空投内容部分*/

	.Introduction {
		width: 100%;
		margin-top: 40px;
		background: #fff;
		border-radius: 4px;
		color: $font_color;
		overflow: hidden;
		.title {
			width: 100%;
			height: 70px;
			display: flex;
			justify-content: space-between;
			align-items: center;
			box-sizing: border-box;
			padding: 0 20px;
			box-shadow: 2px 2px 8px #e8e8e8;
			.time {
				color: $color_green;
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
	}
	/*申请列表内容部分*/

	.airdropWrapper {
		width: 100%;
		padding-top: 30px;
		.airdropitems:nth-of-type(1) {
			.Currency {
				padding: 10px 0 20px 0;
			}
		}
		.airdropitems:nth-last-of-type(1) {
			.Currency {
				border: none;
			}
		}
		.airdropitems {
			width: 100%;
			box-sizing: border-box;
			padding: 0 40px;
			display: flex;
			.time {
				width: 50px;
				border-left: 1px dashed #e4e4e6;
				position: relative;
				.content {
					width: 50px;
					height: 55px;
					position: absolute;
					top: 50%;
					left: -25px;
					margin-top: -27px;
					display: flex;
					flex-direction: column;
					align-items: center;
					justify-content: center;
					.border {
						p {
							width: 18px;
							height: 18px;
							background: #99e8e3;
							border-radius: 50%;
							position: relative;
							span {
								position: absolute;
								left: 50%;
								top: 50%;
								width: 10px;
								height: 10px;
								margin-top: -5px;
								margin-left: -5px;
								border-radius: 50%;
								background: #25cbc7;
							}
						}
					}
					.text {
						font-size: 14px;
						line-height: 20px;
						color: $color_green;
					}
				}
			}
			.Currency {
				flex: 1;
				display: flex;
				padding: 20px 0 20px 0;
				border-bottom: 1px solid #d8d8d8;
				cursor: pointer;
				.oImg {
					width: 90px;
					text-align: center;
					img {
						width: 58px;
						height: 58px;
					}
				}
				.CurrencyIntroduction {
					flex: 1;
					display: flex;
					flex-direction: column;
					.IntroductionTitle {
						width: 100%;
						height: 60px;
						line-height: 55px;
						display: flex;
						justify-content: space-between;
						.flowhide {
							height: 40px;
							line-height: 40px;
							overflow: hidden;
							text-overflow: ellipsis;
							display: -webkit-box;
							-webkit-line-clamp: 2;
							line-clamp: 2;
							-webkit-box-orient: vertical;
							word-break: break-all;
						}
						.oleft {
							.curName {
								font-size: 23px;
								color: #000;
							}
							.FullName {
								font-size: 13px;
								margin-left: 8px;
							}
						}
						.oright {
							font-size: 14px;
							.Num {
								font-size: 18px;
								color: #fd7d00;
								margin: 0 5px;
							}
						}
					}
					.IntroductionContent {
						width: 75%;
						height: 40px;
						line-height: 20px;
						font-size: 14px;
						color: #626683;
						word-break: break-all;
						display: -webkit-box;
						-webkit-line-clamp: 2;
						-webkit-box-orient: vertical;
						overflow: hidden;
						font-size: 13px;
					}
					.ReceivingCondition {
						width: 100%;
						height: 45px;
						display: flex;
						align-items: center;
						justify-content: space-between;
						margin-top: 10px;
						.oleft {
							width: 800px;
							line-height: 20px;
							font-size: 14px;
							color: #626683;
							/* word-break: break-all;
              text-overflow: ellipsis;
              display: -webkit-box; !** 对象作为伸缩盒子模型显示 **!
              -webkit-box-orient: vertical; !** 设置或检索伸缩盒对象的子元素的排列方式 **!
              -webkit-line-clamp: 2; !** 显示的行数 **!
              overflow: hidden;*/
						}
						.button {
							button {
								width: 160px;
								height: 40px;
								outline: none;
								background: $color_green;
								color: #fff;
								border-radius: 4px;
								font-size: 14px;
							}
						}
					}
				}
			}
		}
	}
	/*分页列表*/

	.pageCount1 {
		width: 100%;
		height: 80px;
		display: flex;
		align-items: center;
		justify-content: flex-end;
	}
	/*暂无数据*/

	.noData {
		width: 100%;
		height: 50px;
		text-align: center;
		line-height: 50px;
		font-size: 16px;
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

	.textIndex {
		margin-left: 20px;
	}
</style>
