<template>
	<div id="ddxq">
		<my-header :text="ddxqHeader"></my-header>
		<!--loading效果-->
		<div v-show="loadingIsShow">
			<my-loading></my-loading>
		</div>
		<!--点击拨打电话-->
		<div class="men_back" v-show="phoneBoxIsShow"></div>
		<div class="DialingBox" v-show="phoneBoxIsShow">
			<div class="title">
				<i class="iconfont icon-cuowu" @click="phoneBoxIsShow=false"></i>
			</div>
			<!--内容部分-->
			<div class="content">
				<p class="shouji">
					{{$t("fbjy.UsePhoneNum")}}<span class="white">{{userPhone}}</span>{{$t("fbjy.Dial")}}
				</p>
				<p class="phone">
					<span>{{merchantPhone}}</span>
				</p>
				<p class="blue">{{$t("fbjy.PrivacyProtection")}}</p>
			</div>
			<!--取消--呼叫-->
			<div class="bottom">
				<p @click="phoneBoxIsShow=false">{{$t("userCenter.Cancel")}}</p>
				<p>
					<a :href="phoneAdd">{{$t("fbjy.Call")}}</a>
				</p>
			</div>
		</div>

		<!--二维码显示开始-->
		<div class="code_img" v-show="codeImgIsShow">
			<div class="box">
				<span class="cuowu">
					<i class="iconfont icon-cuowu" @click="codeImgIsShow=false"></i>
				</span>
				<img :src="code_img" />
				<span class="updown" @click="updown">
					<i class="iconfont icon-xiazai"></i>
				</span>
			</div>
		</div>
		<!--二维码显示结束-->
		<!--申述开始-->
		<mt-popup v-model="shenshu" position="right">
			<!--申述头部-->
			<div class="header_box">
				<div class="register_header">
					<p class="back" @click="shenshu=false">
						<i class="iconfont icon-zuojiantou"></i>
					</p>
					<p class="register_type">
            {{$t("fbjy.Appeal")}}
					</p>
				</div>
			</div>
			<!--申述类型-->
			<div class="shenshu_type">
				<div class="text">
          {{$t("fbjy.AppealType")}}:
				</div>
				<div class="list">
					<ul>
						<li v-for="(item,index) in shenshuType" @click="selectType(item.id,index)">{{item.title}}</li>
					</ul>
				</div>
			</div>
			<!--申诉理由-->
			<div class="Reason">
				<div class="title">
					<span>{{$t("fbjy.AppealReason")}}:</span>
				</div>
				<div class="textarea">
					<textarea v-model="sStext" :placeholder="$t('fbjy.EnterAppealReason')"></textarea>
				</div>
			</div>
			<!--申诉 提示-->
			<div class="tishi">
				{{$t("fbjy.ApplicationSpecial")}}
			</div>
			<!--确认提交-->
			<div class="submit">
				<button v-show="Millisecond>0">{{$t("fbjy.PleaseWait")}}    {{shensuTime}} {{$t("fbjy.BeforeAppealing")}}</button>
				<button @click="confirmSs" v-show="Millisecond<=0">{{$t("fbjy.ConfirmSubmit")}}</button>
			</div>
			<!--提示用户申诉时间-->
			<div class="Daotime">
        {{$t("fbjy.AfterCancelAppeal")}}
			</div>
		</mt-popup>
		<!--申述结束-->

		<!--取消交易弹框开始-->
		<div class="men_back" v-show="cancelOrderAlertIsShow"></div>
		<div class="cancelOrderAlert" v-show="cancelOrderAlertIsShow">
			<div class="cancelOrderAlert_title">
				<span>{{$t("fbjy.CancelTransaction")}}</span>
				<i class="iconfont icon-cuowu" @click="cancelOrderAlertIsShow=false"></i>
			</div>
			<div class="cancelOrderAlert_content">
				<p class="text">
          {{$t("fbjy.NotCancelOrder")}}
				</p>
				<p class="cehckbox">
					<el-checkbox v-model="checked"></el-checkbox>
          {{$t("fbjy.NotPaid")}}
				</p>
			</div>
			<!--按钮-->
			<div class="button">
				<p class="cancel" @click="cancelOrderAlertIsShow=false">{{$t("fbjy.ThinkAgain")}}</p>
				<p class="confirmCancel" :class="{'backNone':checked}" :disabled="checked==true" @click="confirmCancel">{{$t("capital.Confirm")}}</p>
			</div>
		</div>
		<!--取消交易弹框结束-->

		<!--确认支付开始-->
		<div class="men_back" v-show="confirmOrderAlertIsShow"></div>
		<div class="cancelOrderAlert" v-show="confirmOrderAlertIsShow">
			<div class="cancelOrderAlert_title">
				<span>{{$t("fbjy.Confirmzhifu")}}</span>
				<i class="iconfont icon-cuowu" @click="confirmOrderAlertIsShow=false"></i>
			</div>
			<div class="cancelOrderAlert_content">
				<p class="text">
					{{$t("fbjy.ConfirmPaidFrozen")}}
				</p>
			</div>
			<!--按钮-->
			<div class="button">
				<p class="cancel" @click="confirmOrderAlertIsShow=false">{{$t("capital.Cancel")}}</p>
				<p @click="confirmPayment">{{$t("otc.Confirm")}}</p>
			</div>
		</div>

		<!--确认支付结束-->

		<!--近30日成交-->
		<div class="successNum">
			<!--成交-->
			<ul class="success">
				<li>
					<p class="num">{{merchant.tradeMonth_num}}</p>
					<p class="blue">{{$t("fbjy.TransactionsRecen")}}</p>
				</li>
				<li>
					<p class="num">{{merchant.appealMonthTimes}}</p>
					<p class="blue">{{$t("fbjy.AppealsRecent")}}</p>
				</li>
				<li>
					<p class="num">{{merchant.appealMonthWinTimes}}</p>
					<p class="blue">{{$t("fbjy.WinningAppeals")}}</p>
				</li>
			</ul>
			<!--交易金额 ---交易价格 --交易数量---->
			<div class="TransactionPrice">
				<dl>
					<dd>
						<p class="oleft">
							<span class="blue">{{$t("fbjy.TransactionNum")}}</span>
							<span class="jiaoyinum">{{OrderList.price}}</span>
							<span>{{legal.code}}</span>
						</p>
						<p class="oright">
							<span class="time" v-show="OrderList.status==0">{{SellCountDown}}</span>
						</p>
					</dd>
					<dd>
						<p class="oleft">
							<span class="blue">{{$t("otc.TradingPrice")}}</span>
							<span class="num">{{OrderList.success_price}}</span>
							<span>{{legal.code}}/{{pageIdentifier}}</span>
						</p>
						<p class="oright">
							<span class="orange" v-show="OrderList.status==0">{{$t("fbjy.WaitingPayment")}}</span>
							<span class="orange" v-show="OrderList.status==-1">{{$t("fbjy.Canceled")}}</span>
							<span class="orange" v-show="OrderList.status==1">{{$t("fbjy.WaitForRelease")}}</span>
							<span class="green" v-show="OrderList.status==3">{{$t("fbjy.Completed")}}</span>
						</p>
					</dd>
					<dd>
						<p class="oleft">
							<span class="blue">{{$t("otc.Amount1")}}</span>
							<span class="num">{{OrderList.balance | number(displayNum)}}</span>
							<span>{{pageIdentifier}}</span>
						</p>
						<p class="oright">

						</p>
					</dd>
					<dd>
						<p class="oleft">
							<span class="blue">{{$t("fbjy.orderID")}}</span>
							<span class="num">{{OrderList.orderId}}</span>
						</p>
					</dd>
				</dl>
			</div>
		</div>
		<!--支付宝--银行卡-----微信------>
		<div class="iSbinding" v-show="OrderList.status!=-1&&OrderList.status!=3">
			<ul class="content" v-for="item in OrderList.bankInfo">
				<li class="icon">
					<p>
						<i class="iconfont icon-iconfontjikediancanicon20" v-show="item.bankType==0"></i>
						<i class="iconfont icon-logo-wechat" v-show="item.bankType==1"></i>
						<i class="iconfont icon-zhifubao" v-show="item.bankType==2"></i>
					</p>
				</li>
				<li class="name">
					<p class="userName">{{item.bankName}}</p>
				</li>
				<li class="Number">
					<p class="num">{{item.bankNumber}}</p>
					<p class="address" v-show="item.bankType==0">{{item.bankAddress}}</p>
				</li>
				<li class="er_code">
					<p v-show="item.bankType==0" id="copy" :data-clipboard-text="item.bankNumber" @click="copy()">
						<i class="iconfont icon-fuzhi"></i>
					</p>
					<p v-show="item.bankType!=0" @click="showImg(item.qrCode)">
						<i class="iconfont icon-erweima"></i>
					</p>
				</li>
			</ul>
		</div>
		<!--交易提醒-->
		<div class="jiaoyi_ti" v-show="OrderList.status!=-1&&OrderList.status!=3">
			<!--备注付款参考号:-->
			<div class="Remarks">
				<p class="oText">{{$t("fbjy.NotePayment")}}</p>
				<span class="num">{{OrderList.reference_num}}</span>
			</div>
			<!--交易提醒头部-->
			<div class="jiaoyi_title">
				<span class="text">{{$t("fbjy.TransactionReminder")}}:</span>
			</div>
			<!--交易提醒内容-->
			<div class="jiaoyi_content">
				<ul>
					<li>{{$t("fbjy.Tips1")}}</li>
					<li>{{$t("fbjy.Tips2")}}</li>
					<li>{{$t("fbjy.Tips3")}}</li>
				</ul>
			</div>
		</div>
		<!--待付款底部显示内容-->
		<div class="oHeight" v-show="OrderList.status==0"></div>
		<div class="oBottom" v-show="OrderList.status==0">
			<div class="Prompt">
        {{$t("fbjy.SureToClick")}}
			</div>
			<div class="button">
				<p class="icon" @click="toChat">
					<i class="icon_red" v-show="redIsShow"></i>
					<i class="iconfont icon-liaotian"></i>
				</p>
				<dd class="an" @click="cancelOrderAlertIsShow=true">{{$t("otc.CancelOrder")}}</dd>
				<dd class="gao" @click="confirmOrderAlertIsShow=true">{{$t("fbjy.HavePaid")}}</dd>
			</div>
		</div>
		<!--取消交易底部显示内容-->
		<div class="contact" v-show="OrderList.status==-1 || OrderList.status==3" @click="toChat">
			<div class="contact_content">
				<i class="icon_red" v-show="redIsShow"></i>
				<i class="iconfont icon-liaotian"></i>
				<p>{{$t("fbjy.ContactParty")}}</p>
			</div>
		</div>
		<!--待放行底部显示内容-->
		<div class="ReleaseHeight" v-show="OrderList.status==1 || OrderList.status==-2"></div>
		<div class="Release" v-show="OrderList.status==1 || OrderList.status==-2">
			<dl class="icon" @click="toChat">
				<i class="icon_red" v-show="redIsShow"></i>
				<i class="iconfont icon-liaotian"></i>
				<p>{{$t("fbjy.ContactParty")}}</p>
			</dl>
			<dl class="icon" @click="phoneBoxIsShow=true">
				<i class="iconfont icon-dianhua"></i>
				<p>{{$t("fbjy.DailPhoneNum")}}</p>
			</dl>
			<ul>
				<li @click="cancelOrderAlertIsShow=true" v-show="!isShen">{{$t("fbjy.CancelTransaction")}}</li>
				<li class="shenshu" v-show="!isShen" @click="shenshu=true">{{$t("fbjy.Appeal")}}</li>
				<li class="shenshu" v-show="isShen">
					<p v-show="shensuIsShow">{{$t("fbjy.OnAppeal")}}</p>
					<p v-show="!shensuIsShow" @click="CancelComplaint">{{$t("fbjy.CancelAppeal")}}</p>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
	import header from "../../public/backHeader"
	import loading from "../../public/loading"
	import { mapGetters,mapActions,mapState,mapMutations } from 'vuex'
	import { Toast, MessageBox } from 'mint-ui';
	import $ from "jquery"
	export default {
		data() {
			return {
				ddxqHeader: "",
				// orderID: window.localStorage.getItem("orderID"),
				/*获取订单id*/
				SellOrderList: {},
				/*卖家的订单*/
				OrderList: {},
				/*整个信息*/
				displayNum: 0,
				/*保留小数位数*/
				pageIdentifier: "",
				/*币种名称*/
				merchant: {},
				/*卖家的信息*/
				SellCountDown: "",
				/*卖的倒计时*/
				cancelIsShow: true,
				/*取消*/
				checked: false,
				/*选中单选框*/
				cancelOrderAlertIsShow: false,
				/*取消交易框*/
				confirmOrderAlertIsShow: false,
				/*确认交易框*/
				code_img: "",
				/*传递的二维码图片*/
				codeImgIsShow: false,
				/*图片显示隐藏*/
				shenshu: false,
				/*申述大盒子*/
				shenshuType: [],
				/*申诉数组*/
				typeId: "",
				/*选中申诉类型ID*/
				sStext: "",
				/*申诉话语*/
				shensuTime: "",
				/*申诉倒计时*/
				Millisecond: 0,
				/*申述倒计时毫秒数判断显示或隐藏提交按钮*/
				phoneBoxIsShow: false,
				/*电话*/
				userPhone: "",
				/*用户的手机号*/
				merchantPhone: "",
				/*对方的手机号码*/
				phoneAdd: "tel:",
				/*安卓呼叫*/
				isShen: false,
				/*判断是否申诉*/
				redIsShow: false,
				/*是否显示小红点*/
				loadingIsShow: false,
				/*loading效果*/
				shensuIsShow: false,
				/*判断该用户是否申述*/
				pur_user: "", /*商户id*/
				legal:"",  //人民币
			}
		},
		components: {
			"my-header": header,
			"my-loading": loading
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
	  ...mapState('user', [
		'userID',
		'orderID'
		// ...
	  ]),
		},
		methods: {
			...mapMutations('user',['setData']),
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
			CancelComplaint() { /*取消申诉*/
				let _this = this;
				this.$ajax.post(this.httpUrl.postqxssUrl, {
					blaceId: this.orderID
				}, {
					headers: {
						'Authorization': 'Bearer ' + _this.token
					}
				}).then(function(res) {
					if(res.data.status.code == 200) { /*状态*/
						_this.isShen = false; /*显示申诉*/

						_this.$message({
							message: _this.$t("fbjy.CancelAppealSuccessfully"),
							type: 'success',
							duration: 1500
						});
						_this.OrderList.status = res.data.data.status; /*状态*/
						/*申诉倒计时开始*/
						var aTime = res.data.data.do_time.replace(/-/g, "/");
						var nowTime = new Date(aTime).getTime();
						var endTime = new Date(aTime).getTime() + 1000 * 60 * 10;
						//				   申诉倒计时
						var timer1 = setInterval(function() {
							var t = endTime - nowTime;
							_this.Millisecond = t;
							if(t > 0) {
								var min = Math.floor((t / 60000) % 60)
								var sec = Math.floor((t / 1000) % 60)
								min = min < 10 ? "0" + min : min
								sec = sec < 10 ? "0" + sec : sec
								var format = `${min}:${sec}`
								_this.shensuTime = format
							} else {
								clearInterval(timer1)
							}
							nowTime += 1000;
						}, 1000)
						/*申诉倒计时结束*/

					}
				}, function(err) {
					console.log(err)
				})
			},
			toChat() { /*跳转聊天页面*/
				this.$router.push({
					name: "chat",
					params: {
						id: this.orderID
					}
				})
			},
			imgIsShowClick(imgSrc) {
				let _this = this;
				//创建下载任务
				var dtask = plus.downloader.createDownload(imgSrc, {
					method: "GET"
				}, function(d, status) {
					if(status == 200) { //下载成功
						_this.loadingIsShow = false;
						plus.gallery.save(d.filename, function() { //保存到相册方法
							Toast(_this.$t("fbjy.DownloadSuccessful"));
						}, function() {
							Toast(_this.$t("userCenter.Downloadfailed"));
						});
					} else {
						_this.loadingIsShow = false;
						//下载失败,需删除本地临时文件,否则下次进来时会检查到图片已存在
						Toast(_this.$t("userCenter.Downloadfailed"));
						/*下载失败的状态码*/
						//dtask.abort();//文档描述:取消下载,删除临时文件;(但经测试临时文件没有删除,故使用delFile()方法删除);
					}
				}); //启动下载任务
				dtask.start();
			},
			updown() {
				let _this = this;
				if(window.location.host) { /*判断用户是否在浏览器中打开*/
					window.open(_this.code_img)
					return false;
				} else {
					//创建下载任务
					_this.loadingIsShow = true;
					//创建下载任务
					_this.imgIsShowClick(_this.code_img);
				}
			},
			confirmSs() { /*确认申述*/
				let _this = this;
				if(this.typeId == "") {
					this.$message({
						message: this.$t("fbjy.ChooseAppealType"),
						type: 'warning',
						duration: 1500
					});
					return false;
				}
				if(this.sStext == "") {
					this.$message({
						message: _this.$t("fbjy.EnterAppealReason"),
						type: 'warning',
						duration: 1500
					});
					return false;
				}
				this.$ajax.post(this.httpUrl.qrssUrl, {
					blaceId: this.orderID,
					appealId: this.typeId,
					details: this.sStext
				}, {
					headers: {
						'Authorization': 'Bearer ' + _this.token
					}
				}).then(function(res) {
					if(res.data.status.code == 200) {
						_this.$message({
							message: _this.$t("fbjy.AppealSuccess"),
							type: 'success',
							duration: 1500
						});
						if(_this.userID == res.data.data.user_id) { /*是申诉用户*/
							_this.shensuIsShow = false; /*取消申诉*/
						}
						_this.shenshu = false; /*申述弹框回去*/
						_this.isShen = true; /*显示取消申诉*/
					}
				}, function(err) {
					console.log(err)
				})
			},
			selectType(typeId, index) { /*选中申述类型*/
				this.typeId = typeId; /*选中的申诉类型ID*/
				$(".shenshu_type .list li").eq(index).addClass("type_active").siblings("li").removeClass("type_active");
			},
			showImg(imgSrc) { /*显示二维码图片*/
				this.code_img = imgSrc;
				this.codeImgIsShow = true;
			},
			confirmCancel() { /*取消订单*/
				let _this = this;
				if(this.checked == false) {
					return false;
				}
				this.$ajax.post(this.httpUrl.qxddUrl, {
					blace_id: this.orderID
				}, {
					headers: {
						'Authorization': 'Bearer ' + _this.token
					},
				}).then(function(res) {
					if(res.data.status.code == 200) {
						_this.OrderList.status = -1; /*显示取消*/
						_this.cancelIsShow = false; /*确认取消*/
						_this.cancelOrderAlertIsShow = false; /*取消交易框关闭*/
					}
				}, function(err) {
					console.log(err)
				})

			},
			confirmPayment() { /*我已付款*/
				let _this = this;
				let openUrl;
				if(this.pur_user == this.userID) { /*商户确认付款*/
					openUrl = this.httpUrl.shfkqrUrl
				} else { /*游客确认付款*/
					openUrl = this.httpUrl.ykfkqrUrl
				}
				this.$ajax.post(openUrl, {
					blace_id: this.orderID
				}, {
					headers: {
						'Authorization': 'Bearer ' + _this.token
					}
				}).then(function(res) {
					if(res.data.status.code == 200) {
						_this.OrderList.status = 1; /*确认支付待放行*/
						_this.confirmOrderAlertIsShow = false; /*取消交易框关闭*/
						/*申诉倒计时开始*/
						if(res.data.data.do_time != undefined) {
							var aTime = res.data.data.do_time.replace(/-/g, "/");
							var nowTime = new Date(aTime).getTime();
							var endTime = new Date(aTime).getTime() + 1000 * 60 * 10;
							//				   申诉倒计时
							var timer1 = setInterval(function() {
								var t = endTime - nowTime;
								_this.Millisecond = t;
								if(t > 0) {
									var min = Math.floor((t / 60000) % 60)
									var sec = Math.floor((t / 1000) % 60)
									min = min < 10 ? "0" + min : min
									sec = sec < 10 ? "0" + sec : sec
									var format = `${min}:${sec}`
									_this.shensuTime = format
								} else {
									clearInterval(timer1)
								}
								nowTime += 1000;
							}, 1000)
							/*申诉倒计时结束*/
						}
					}
				}, function(err) {
					console.log(err)
				})
			}

		},
		mounted() {
			let _this = this;
			/*获取订单信息*/
			this.$ajax.get(this.httpUrl.getddxqUrl, {
				headers: {
					'Authorization': 'Bearer ' + _this.token
				},
				params: {
					"blaceId": _this.orderID
				}
			}).then(function(res) {
				_this.legal = res.data.data.legal;
				/*判断用户是否是否在申诉中*/
				if(res.data.data.appeal != null || res.data.data.appeal != undefined) {
					if(_this.userID != res.data.data.appeal.user_id) { /*不是申诉用户*/
						_this.shensuIsShow = true; /*不能取消申诉*/
					}
				} else {
					_this.shensuIsShow = true; /*不能取消申诉*/
				}
				_this.OrderList = res.data.data; /*整个信息*/
				_this.merchant = _this.OrderList.merchant; /*卖家信息*/
				_this.displayNum = res.data.data.currency.displayNum; /*保留小数位数*/
				_this.pageIdentifier = res.data.data.currency.pageIdentifier; /*当前币种*/
				_this.SellOrderList = res.data.data.merchant; /*卖家的信息*/
				_this.pur_user = res.data.data.pur_user; /*下单id*/
				_this.ddxqHeader = "向   " + res.data.data.merchant.trueName +  _this.$t("list.Buy_BTC") + _this.OrderList.currency.pageIdentifier; /*订单详情头部*/
				// 获取并判断聊天发送方用户通信标识以及对方用户id
				if(_this.userID == res.data.data.user_id) {
					_this.ddxqHeader = "向   " + res.data.data.merchant.trueName + _this.$t("list.Buy_BTC") + _this.OrderList.currency.pageIdentifier; /*订单详情头部*/
				} else {
					_this.ddxqHeader = "向   " + res.data.data.user.trueName + _this.$t("list.Buy_BTC") + _this.OrderList.currency.pageIdentifier; /*订单详情头部*/
				}
				if(res.data.data.buyer) { /*判读是否为广告主*/
					//				联系卖家电话
					_this.merchantPhone = res.data.data.user.mobile;
					_this.phoneAdd = _this.phoneAdd + res.data.data.user.mobile;
					//用户手机
					_this.userPhone = res.data.data.merchant.mobile;
				} else {
					_this.merchantPhone = res.data.data.merchant.mobile
					_this.phoneAdd = _this.phoneAdd + res.data.data.merchant.mobile;
					//用户手机
					_this.userPhone = res.data.data.user.mobile;
				}
				if(res.data.data.status == -1) { /*订单取消*/
					_this.cancelIsShow = false;
					return false;
				} else {
					/////////////////待付款倒计时开始//////////////////
					var aTime = res.data.data.nowTime.replace(/-/g, "/");
					var bTime = res.data.data.expire_time.replace(/-/g, "/");
					var nowTime = new Date(aTime).getTime();
					var endTime = new Date(bTime).getTime();
					var timer = setInterval(function() {
						var t = endTime - nowTime;
						if(t > 0) {
							var min = Math.floor((t / 60000) % 60)
							var sec = Math.floor((t / 1000) % 60)
							min = min < 10 ? "0" + min : min
							sec = sec < 10 ? "0" + sec : sec
							var format = `${min}分${sec}秒`
							_this.SellCountDown = format
						} else {
							clearInterval(timer);
							if(res.data.data.status == 0 || res.data.data.status == -1) {
								_this.cancelIsShow = false; /*倒计时结束显示取消*/
								_this.OrderList.status = -1;
							}
						}
						nowTime += 1000;
					}, 1000)
					////////////////待付款倒计时结束/////////////////////
				}

				if(res.data.data.status == 1) {
					/*申诉倒计时开始*/
					var aTime = res.data.data.nowTime.replace(/-/g, "/");
					var bTime = res.data.data.do_time.replace(/-/g, "/");
					var nowTime = new Date(aTime).getTime();
					var endTime = new Date(bTime).getTime() + 1000 * 60 * 10;
					//				   申诉倒计时
					var timer1 = setInterval(function() {
						var t = endTime - nowTime;
						_this.Millisecond = t;
						if(t > 0) {
							var min = Math.floor((t / 60000) % 60)
							var sec = Math.floor((t / 1000) % 60)
							min = min < 10 ? "0" + min : min
							sec = sec < 10 ? "0" + sec : sec
							var format = `${min}:${sec}`
							_this.shensuTime = format
						} else {
							clearInterval(timer1)
						}
						nowTime += 1000;
					}, 1000)
					/*申诉倒计时结束*/
				}
				/*申诉中*/
				if(res.data.data.status == -2) {
					_this.isShen = true;
				}
			}, function(err) {
				console.log(err)
			})
			/*获取申述原因*/
			this.$ajax.get(this.httpUrl.getssyyUrl, {
				headers: {
					'Authorization': 'Bearer ' + _this.token
				}
			}).then(function(res) {
				_this.shenshuType = res.data.data;
			}, function(err) {
				console.log(err)
			})

			_this.ws.onmessage = function(e) {
				var arr = JSON.parse(e.data);
				if(arr.type == "ping") { ////判断type
					_this.ws.send('{"pong":' + Date.now() + '}');
				} else if(arr.type == "otc") {
					// msgType用于消息分类处理，用户可以在发送消息时设置自定义的msgType，在收到消息时判断msgType，"reqUnReadMsgCount"、"testMsg"、"tokenExpired"为apush预定义的msgType，请不要使用。
					if(_this.orderID != arr.content.orderId) {
						return false;
					}
					/*手机广告提示开始*/
					if(window.plus) {
						if(_this.orderID != arr.content.orderId) {
							// window.localStorage.setItem("orderID", arr.content.orderId);
							_this.setData({'orderID':arr.content.orderId});
							let otext;
							if(arr.content.type != 1) { /*文字*/
								otext = arr.content.content;
							} else {
								otext = _this.$t("bbjy.Systemmessage")
							}
							plus.push.createMessage(otext, '', {
								title:"otc " + _this.$t("bbjy.Haveneworder")
							});
							plus.push.addEventListener("click", function(msg) {
								// 分析msg.payload处理业务逻辑]
								/*获取订单详情*/
								_this.$ajax.get(_this.httpUrl.getddxqUrl, {
									headers: {
										'Authorization': 'Bearer ' + _this.token
									},
									params: {
										"blaceId": _this.orderID//window.localStorage.getItem("orderID")
									}
								}).then(function(res) {
									if(res.data.data.pur_user == this.userInfo.user_id) { /*判断下单用户id与登录用户id*/
										/*卖家*/
										if(res.data.data.type == 1) { //买
											_this.$router.push({
												name: "sellddxq"
											})
										} else {
											_this.$router.push({
												name: "buyddxq"
											})
										}
									} else {
										/*买家*/
										if(res.data.data.type == 1) { //买
											_this.$router.push({
												name: "buyddxq"
											})
										} else {
											_this.$router.push({
												name: "sellddxq"
											})
										}
									}
								}, function(err) {
									console.log(err)
								})

							}, false);
						}
					}
					/*手机广告提示结束*/
					/*判断用户是否推送消息*/
					if(arr.content != null || arr.content != undefined) {
						_this.redIsShow = true
					} else {
						_this.redIsShow = false;
					}
					if(arr.content.other != undefined) {
						if(arr.content.other.status != undefined) {
							let OrderType = arr.content.other.status; /*订单状态*/
							//获取推送过来的申诉时间
							if(arr.content.other.do_time != undefined) {
								var aTime = arr.content.other.do_time.replace(/-/g, "/");
								var t = new Date(aTime)
								/*申诉倒计时*/
								//let nowTimeSs = _this.ddxq.nowTime;  /*当前时间*/
								var nowTime = t.getTime();
								var endTime = t.getTime() + 1000 * 60 * 10;
								//				   申诉倒计时
								var timer1 = setInterval(function() {
									var tim = endTime - nowTime;
									_this.Millisecond = tim;
									if(tim > 0) {
										var min = Math.floor((tim / 60000) % 60)
										var sec = Math.floor((tim / 1000) % 60)
										min = min < 10 ? "0" + min : min
										sec = sec < 10 ? "0" + sec : sec
										var format = `${min}:${sec}`
										_this.shensuTime = format
									} else {
										clearInterval(timer1)
									}
									nowTime += 1000;
								}, 1000)
							}
							////////////////判断订单状态//////////////////
							if(OrderType == -2) { //订单申诉中
								_this.isShensu = true;
							} else if(OrderType == -1) { //订单已关闭取消
								_this.OrderList.status = -1
							} else if(OrderType == 1) { //确认付款,待放行
								_this.OrderList.status = -1;
							} else if(OrderType == 2) { //该笔交易被锁定
								_this.OrderList.status = -1
							} else if(OrderType == 3) { //订单已完成
								_this.OrderList.status = 3
							} else if(OrderType == 0) {
								/////////////////待付款倒计时////////////////////
								var timer = setInterval(function() {
									var nowTime = new Date(_this.ddxq.nowTime * 1000);
									var endTime = new Date(_this.ddxq.expiretime * 1000);
									var t = endTime.getTime() - nowTime.getTime();
									if(t > 0) {
										var min = Math.floor((t / 60000) % 60)
										var sec = Math.floor((t / 1000) % 60)
										min = min < 10 ? "0" + min : min
										sec = sec < 10 ? "0" + sec : sec
										var format = `${min}分${sec}秒`
										_this.SellCountDown = format
									} else { /*倒计时结束*/
										clearInterval(timer)
										_this.OrderList.status = -1;
									}
									_this.ddxq.nowTime++;
								}, 1000)
							}
						}
					}
				}
			}

		}
	}
</script>
<style lang="scss">
	.el-checkbox__input.is-focus .el-checkbox__inner {
		border-color: #949bf8;
	}

	.el-checkbox__input.is-checked .el-checkbox__inner {
		background: #949bf8;
		border: 1px solid #949bf8;
	}

	#ddxq {
		.mint-popup-right,
		.mint-popup-left {
			width: 100%;
			height: 100%;
			background: #121528;
			.currency_box {
				width: 100%;
				height: 80%;
				overflow-y: auto;
			}
		}
		.mint-datetime-cancel,
		.mint-datetime-confirm {
			color: #5a63dd;
		}
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
			color: #a4acff;
		}
		.el-pagination button:disabled {
			color: #fff;
			background: none;
		}
	}
</style>

<style lang="scss" scoped>
	$bg_color:#141738;
	/*背景块的元素*/

	$blue_color:#454fad;
	/*蓝色字体颜色*/

	$jiaoyi_color:#6982c0;
	/*交易价格交易数量字体颜色*/

	$orange:#ff4800;
	/*待付款橙色*/

	$success:#02c27c;
	/*已完成颜色*/

	$border_color:#1f2354;
	/*边框线*/

	$canNum_color:#1f2351;
	/*付款参考号背景颜色*/

	$canNum_borderColor:#5a61df;
	/*付款参考号边框线*/

	$cancel_color:#222762;
	/*取消订单未选中*/

	$cancel_active:#454fad;
	/*取消订单选中*/

	$cancel_border:#9ea7ff;
	/*取消订单边框线*/

	$red_color:#e2040b;
	/*红色的字体颜色*/

	$alert_bg:#323560;
	/*弹框背景*/

	$alert_border:#202253;
	/*弹框边框线*/

	#ddxq {
		color: #fff;
	}
	/*图片部分*/

	.code_img {
		width: 100%;
		height: 100%;
		position: fixed;
		left: 0;
		top: 0;
		z-index: 999;
		.box {
			width: 100%;
			height: 100%;
			position: relative;
			display: flex;
			justify-content: center;
			align-items: center;
			background: #323560;
			.cuowu {
				position: absolute;
				width: .25rem;
				height: .25rem;
				text-align: center;
				line-height: .25rem;
				border-radius: 50%;
				top: .15rem;
				right: .1rem;
			}
			.updown {
				/*下载*/
				position: absolute;
				width: .3rem;
				height: .3rem;
				text-align: center;
				line-height: .3rem;
				background: rgba(0, 0, 0, 0.5);
				border-radius: 50%;
				bottom: .15rem;
				right: .1rem;
			}
			img {
				width: 90%;
			}
		}
	}
	/*底部内容取消订单我已付款*/

	.oBottom {
		width: 100%;
		background: $canNum_color;
		position: fixed;
		bottom: 0;
		left: 0;
		z-index: 66;
		.Prompt {
			width: 100%;
			box-sizing: border-box;
			padding: 0.05rem .1rem;
			color: $red_color;
			position: relative;
		}
		.Prompt::after {
			content: "";
			position: absolute;
			bottom: -0.1rem;
			right: 0.55rem;
			height: 0px;
			width: 0px;
			z-index: 66;
			border-right: 10px solid transparent;
			border-left: 10px solid transparent;
			border-top: 10px solid #1f2351;
		}
		.button {
			width: 100%;
			height: .39rem;
			display: flex;
			border-top: 0.01rem solid $cancel_border;
			.icon {
				width: 15%;
				height: .38rem;
				text-align: center;
				line-height: .38rem;
				position: relative;
				.icon_red {
					width: .05rem;
					height: .05rem;
					background: red;
					border-radius: 50%;
					position: absolute;
					left: 75%;
					top: 10%;
				}
				.iconfont {
					font-size: .22rem;
				}
				border-right:0.01rem solid $cancel_border;
			}
			dd {
				width: 42.5%;
				height: .39rem;
				text-align: center;
				line-height: .39rem;
			}
			.gao {
				background: $cancel_active;
			}
			.an {
				background: $cancel_color;
			}
		}
	}

	.oHeight {
		height: .76rem;
	}
	/*交易提醒*/

	.jiaoyi_ti {
		width: 100%;
		background: $bg_color;
		/*参考号*/
		.Remarks {
			width: 95%;
			margin: .1rem auto;
			border: 1px solid $canNum_borderColor;
			border-radius: 0.02rem;
			background: $canNum_color;
			display: flex;
			justify-content: space-between;
			box-sizing: border-box;
			padding: 0.05rem .05rem;
		}
		.jiaoyi_title {
			width: 100%;
			box-sizing: border-box;
			padding-left: .1rem;
			height: .2rem;
			line-height: .2rem;
			margin-top: .1rem;
		}
		.jiaoyi_content {
			width: 100%;
			ul {
				width: 100%;
				box-sizing: border-box;
				padding: 0 .1rem;
				li {
					line-height: .2rem;
					margin-top: .05rem;
				}
			}
		}
	}
	/*绑定的银行卡*/

	.iSbinding {
		width: 100%;
		.content {
			width: 100%;
			height: .5rem;
			display: flex;
			align-items: center;
			justify-content: space-between;
			background: $bg_color;
			border-bottom: 1px solid $border_color;
			.icon {
				width: .6rem;
				height: .5rem;
				text-align: center;
				line-height: .5rem;
				.iconfont {
					font-size: .32rem;
				}
				.icon-zhifubao {
					font-size: .28rem;
				}
			}
			.name {
				flex: 0.5;
				height: .5rem;
				display: flex;
				flex-direction: column;
				justify-content: center;
				.userName {
					margin-bottom: .02rem;
				}
			}
			.Number {
				flex: 1;
				height: .5rem;
				display: flex;
				flex-direction: column;
				justify-content: center;
			}
			.er_code {
				width: 10%;
				text-align: right;
				margin-right: .1rem;
			}
		}
	}
	/*近30日成交*/

	.successNum {
		width: 100%;
		height: 1.85rem;
		background: $bg_color;
		margin: .1rem 0;
		/*成交内容*/
		.success {
			width: 100%;
			height: .55rem;
			display: flex;
			justify-content: space-between;
			align-items: center;
			li {
				width: 33.3%;
				height: .55rem;
				text-align: center;
				p {
					width: 100%;
					height: .275rem;
					line-height: .255rem;
				}
				.num {
					font-size: .14rem;
				}
				.blue {
					color: $blue_color;
				}
			}
			li:nth-of-type(1) {
				flex: 0.8;
			}
			li:nth-of-type(2) {
				flex: 1.3;
			}
			li:nth-last-of-type(1) {
				flex: 0.8;
			}
			border-bottom:1px solid $border_color;
		}
		/*交易金额--交易价格---价格数量----*/
		.TransactionPrice {
			width: 100%;
			height: 1.3rem;
			dl {
				width: 100%;
				height: 1.3rem;
				dd {
					width: 100%;
					height: .3rem;
					display: flex;
					justify-content: space-between;
					align-items: center;
					box-sizing: border-box;
					padding: 0 .12rem;
					.oleft {
						.blue {
							color: $jiaoyi_color;
							margin-right: .05rem;
						}
						.jiaoyinum {
							font-size: .15rem;
						}
					}
					.oright {
						.dinBlue {
							color: $blue_color;
						}
						.orange {
							color: $orange;
						}
					}
				}
			}
		}
	}
	/*已完成*/

	.green {
		color: $success;
	}
	/*联系对方*/

	.contact {
		width: 100%;
		height: .48rem;
		background: #222761;
		position: fixed;
		bottom: 0;
		left: 0;
		.iconfont {
			font-size: .18rem;
		}
		.contact_content {
			width: 100%;
			height: 100%;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			position: relative;
			.icon_red {
				width: .07rem;
				height: .07rem;
				background: red;
				border-radius: 50%;
				position: absolute;
				left: 55%;
				top: 0.1rem;
			}
		}
	}
	/*蒙版*/

	.men_back {
		width: 100%;
		height: 100%;
		background: rgba(0, 0, 0, 0.5);
		position: fixed;
		left: 0;
		top: 0;
		z-index: 666;
	}
	/*取消交易弹框*/

	.cancelOrderAlert {
		width: 90%;
		position: fixed;
		left: 5%;
		top: 18%;
		z-index: 667;
		background: $alert_bg;
		border-radius: 0.02rem;
		.cancelOrderAlert_title {
			width: 90%;
			height: .35rem;
			display: flex;
			align-items: center;
			justify-content: space-between;
			border-bottom: 1px solid $alert_border;
			margin: 0 auto;
			.iconfont {
				font-size: .15rem;
			}
		}
		.cancelOrderAlert_content {
			width: 90%;
			margin: .2rem auto;
			.text {
				line-height: .2rem;
			}
			.cehckbox {
				margin-top: .2rem;
			}
		}
		.button {
			width: 100%;
			height: .35rem;
			line-height: .35rem;
			display: flex;
			border-top: 1px solid $alert_border;
			p {
				width: 50%;
				box-sizing: border-box;
				text-align: center;
			}
			.cancel {
				border-right: 1px solid $alert_border;
			}
			.confirmCancel {
				background: #262746;
			}
		}
	}

	.backNone {
		background: none !important;
	}
	/*待放行的内容*/

	.Release {
		width: 100%;
		height: .45rem;
		display: flex;
		position: fixed;
		bottom: 0;
		left: 0;
		z-index: 66;
		background: $canNum_color;
		.icon {
			position: relative;
			.icon_red {
				width: .05rem;
				height: .05rem;
				background: red;
				border-radius: 50%;
				position: absolute;
				left: 70%;
				top: 15%;
			}
		}
		dl {
			width: 20%;
			height: .45rem;
			text-align: center;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			.iconfont {
				font-size: .17rem;
			}
		}
		dl {
			border-right: .01rem solid $alert_bg;
		}
		ul {
			width: 60%;
			display: flex;
			li {
				flex: 1;
				line-height: .45rem;
				text-align: center;
				font-size: .15rem;
			}
			.shenshu {
				background: #4b5090;
				p {
					width: 100%;
					height: 100%;
				}
			}
		}
	}
	/*申述弹框*/
	/*申诉头部*/

	.register_header {
		width: 100%;
		height: .5rem;
		line-height: .5rem;
		position: relative;
		color: #fff;
		background: $bg_color;
		.back {
			margin-left: .15rem;
		}
		.register_type {
			position: absolute;
			top: 0;
			left: 20%;
			width: 60%;
			text-align: center;
			font-size: .15rem;
			font-weight: 600;
		}
	}

	$type_border:#aab0ff;
	$type_color:#9098ff;
	$active_color:#171933;
	.type_active {
		color: $active_color !important;
		background: $type_border !important;
	}
	/*申诉类型*/

	.shenshu_type {
		width: 100%;
		height: .75rem;
		background: $bg_color;
		margin: .1rem 0;
		box-sizing: border-box;
		padding: 0 .1rem;
		display: flex;
		.text {
			width: 20%;
		}
		.list {
			width: 80%;
			ul {
				width: 100%;
				display: flex;
				flex-wrap: wrap;
				li {
					padding: 0 .05rem;
					line-height: .22rem;
					border: 0.01rem dashed $type_border;
					margin-right: .08rem;
					margin-bottom: .1rem;
					border-radius: .02rem;
					color: $type_color;
				}
			}
		}
	}

	.ReleaseHeight {
		height: .5rem;
	}
	/*申诉理由*/

	.Reason {
		width: 100%;
		background: $bg_color;
		.title {
			width: 100%;
			height: .35rem;
			box-sizing: border-box;
			padding-left: .1rem;
			line-height: .35rem;
			border-bottom: 0.01rem solid #1f2354;
		}
		.textarea {
			height: 1.18rem;
			textarea {
				width: 100%;
				height: 100%;
				background: none;
				border: none;
				box-sizing: border-box;
				padding: .1rem .1rem;
			}
			textarea::-webkit-input-placeholder {
				color: #9098ff;
			}
		}
	}
	/*提示*/

	.tishi {
		width: 100%;
		box-sizing: border-box;
		padding: 0 .1rem;
		line-height: .2rem;
		color: #8c94fc;
		margin: .1rem 0;
	}

	$submit_color:#373959;
	/*登录线条*/

	$submit_borderColor:1px solid #9fa0af;
	/*按钮边框颜色*/
	/*提交*/

	.submit {
		width: 2.7rem;
		height: .38rem;
		margin: .2rem auto;
		button {
			width: 100%;
			height: .38rem;
			border: $submit_borderColor;
			background: $submit_color;
			color: #fff;
			outline: none;
			border-radius: .02rem;
		}
	}

	.Daotime {
		width: 2.7rem;
		height: .38rem;
		margin: 0 auto;
		text-align: center;
		color: #9098ff;
	}
	/*拨打电话*/

	.DialingBox {
		width: 90%;
		position: fixed;
		top: 20%;
		left: 5%;
		background: $alert_bg;
		z-index: 666;
		.title {
			width: 100%;
			height: .4rem;
			line-height: .4rem;
			display: flex;
			justify-content: flex-end;
			box-sizing: border-box;
			padding-right: .1rem;
			border-bottom: 1px solid $alert_border;
		}
		.content {
			width: 100%;
			text-align: center;
			.shouji {
				color: #9097ef;
				margin: .1rem 0;
				.white {
					color: #fff;
					margin: 0 .05rem;
				}
			}
			.phone {
				font-size: .15rem;
				margin: .1rem 0;
			}
			.blue {
				color: #9097ef;
				margin: .15rem 0;
			}
		}
		.bottom {
			width: 100%;
			height: .4rem;
			display: flex;
			border-top: 1px solid $alert_border;
			p {
				width: 50%;
				line-height: .4rem;
				text-align: center;
				box-sizing: border-box;
				a {
					color: #fff;
					outline: none;
				}
			}
			p:nth-of-type(1) {
				border-right: 1px solid $alert_border;
			}
		}
	}
</style>
