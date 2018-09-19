<template>
	<div id="List" :class="{'List_white':getColor==1}">
		<!--完整榜单头部-->
		<div class="invitationCode_title">
			<img src="../../../assets/inviteIMX.png" v-if="lang=='zh-CN'" />
			<img src="../../../assets/inviteIMXen.png" v-if="lang!='zh-CN'" />
		</div> 
		<!--荣誉榜-->
		<div class="invitationCode_content" :class="{'invitationCode_content_white':getColor==1}">
			<!--荣誉-->
			<div class="honor">
				<div class="honor_title">
					<span>{{newDate}}{{$t("invitation.Topinviters")}}</span>
					<p class="time">
						<el-date-picker v-model="selectTime" type="month" :picker-options="pickerOptions" value-format="yyyy-MM" :placeholder="$t('repurchasede.Choosetime')" @change="select">
						</el-date-picker>
					</p>
				</div>
				<ul class="honor_wrapper">
					<li v-for="(item,key) in List">
						<p class="icon">
							<img src="../../../assets/gold.png" v-if="key==0" />
							<img src="../../../assets/silver.png" v-if="key==1" />
							<img src="../../../assets/copper.png" v-if="key==2" />
							<span v-if="key>2">{{key+1}}</span>
						</p>
						<p class="user">
							{{item.user_id}}
						</p>
						<p class="Rebate">
							<span>{{item.balance | number(8)}}    IMX</span>
						</p>
					</li>
					<div class="noData" v-show="List.length==0">{{$t("shouye.Counting")}}</div>
				</ul>
			</div>

		</div>
		<!--底部-->
		<div class="home_bottom"  :class="{'home_bottom_white':getColor==1}">
			<div class="bottom_left">
				<img src="../../../assets/logoIMXwhite.png" v-if="getColor!=1"/>
        <img src="../../../assets/logoIMX.png" v-if="getColor==1"/>
				<p class="imxText">{{$t("home.Exchange")}}</p>
				<p class="CustomerService">
					<span class="text">{{$t("home.Customer")}}：</span>
					<span>service@imx.com</span>
				</p>
			</div>
			<div class="bottom_right">
				<ul>
					<img src="../../../assets/ios.png" />
					<p>
						<i class="iconfont icon-ios"></i> {{$t("home.iPhoneBusinessEdition")}}
					</p>
				</ul>
				<ul>
					<img src="../../../assets/Andrews.png" />
					<p>
						<i class="iconfont icon-anzhuo"></i> Android
					</p>
				</ul>
			</div>
		</div>
		<!--垫底-->
		<div class="home_bottom_bottom" :class="{'home_bottom_bottom_white':getColor==1}">&copy;2018 imx.com</div>

	</div>
</template>

<script>
	import axios from "axios";
	import { httpUrl } from "../../http_url/http_url";
	import { mapGetters,mapActions,mapState,mapMutations } from 'vuex'
	export default {
		data() {
			return {
				selectTime: "",
				List: [], /*列表*/
				 pickerOptions: {		/*禁止使用2018年7月份*/
		          disabledDate(time) {
		          	 let curDate = (new Date("2018/07/01")).getTime();
		            return time.getTime() < curDate;
		          }
		        },
		        newDate:new Date().getFullYear()+"-"+ Number(new Date().getMonth()+1),  /*当前时间*/
			}
		},
		computed: {
			...mapState('user',['lang']),
		},
		filters: {
			//小数点过滤器 不四舍五入
			number(value, num) {
				var toFixedNum = Number(value).toFixed(num + 1);
				var realVal = toFixedNum.substring(0, toFixedNum.lastIndexOf('.') + num + 1);
				return realVal;
			}
		},
		methods: {
			select() {     /*选择时间*/
				let _this = this;
				this.newDate = this.selectTime;
				axios.get(httpUrl.list,{
					params:{"month":this.selectTime}
				}).then(function(res) {
					_this.List = res.data.data;
				}, function(err) {
					console.log(err)
				})
			}
		},
		mounted() {
			let _this = this;
			//邀请返利榜单
			axios.get(httpUrl.list).then(function(res) {
				_this.List = res.data.data;
			}, function(err) {
				console.log(err)
			})
		}
	}
</script>
<style lang="scss">
	.el-input--prefix .el-input__inner {
		text-align: center;
		font-size: 16px;
	}
</style>
<style lang="scss" scoped>
  /*标准版切换颜色改变**/
  .home_bottom_white {
    background: #fff !important;
    .bottom_left {
      color: #000000 !important;
    }
    .bottom_right {
      ul {
        color: #000 !important;
      }
    }
  }
  /*标准版切换底部颜色改变**/
  .home_bottom_bottom_white{
    color:#000 !important;
    background:#fff !important;
    border:1px solid #ddd !important;
  }
  /*标准版切换honor颜色改变**/
  .invitationCode_content_white {
    background: #fff !important;
    .honor {
      background: #fff !important;
      .honor_wrapper {
        li {
          border-bottom: 1px solid #2b2f54 !important;
        }
      }
    }
  }
  .List_white{
    color:#000 !important;
  }
	#List {
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
	.invitationCode_content {
		width: 90%;
		margin: 0 auto;
		background: #16172c;
		.honor {
			width: 100%;
			background: #16172c;
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
					line-height: 40px;
					font-size: 16px;
					text-align: center;
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
						box-sizing: border-box;
						span {
							margin-left: 10px;
						}
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
			}
		}
	}
	/*首页底部*/

	.home_bottom {
		width: 100%;
		height: 200px;
		display: flex;
		justify-content: space-between;
		box-sizing: border-box;
		align-items: center;
		padding: 0 80px;
		background: #121528;
		.bottom_left {
			color: #fff;
			img {
				width: 230px;
				height: 35px;
			}
			p {
				font-size: 15px;
				margin-top: 15px;
			}
		}
		.bottom_right {
			display: flex;
			ul {
				min-width: 150px;
				text-align: center;
				color: #fff;
				img {
					width: 100px;
					height: 100px;
					background: #fff;
				}
				p {
					font-size: 15px;
					line-height: 50px;
				}
			}
		}
	}

	.home_bottom_bottom {
		height: 40px;
		line-height: 40px;
		font-size: 15px;
		text-align: center;
		color: #fff;
		background: #121528;
		border-top: 1px solid #1f2138;
	}
</style>
