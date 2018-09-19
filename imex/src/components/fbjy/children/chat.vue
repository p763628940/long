<template>
	<div id="chat">
		<!--聊天头部-->
		<my-header :text="header"></my-header>
		<!--loading效果-->
		<div v-show="loadingIsShow">
			<my-loading></my-loading>
		</div>
		<!--聊天的图片-->
		<div class="oImg_men" v-show="imgIsShow"></div>
		<div class="oImg_content" v-show="imgIsShow">
			<div class="img">
				<p class="delete">
					<i class="iconfont icon-cuowu" @click="imgIsShow=false"></i>
				</p>
				<img :src="imgSrc" />
				<p class="download" @click="updown">
					<i class="iconfont icon-xiazai"></i>
				</p>
			</div>
		</div>

		<!--聊天头部-->
		<div class="chat_header">
			<div class="oleft">
				<span class="currency">{{$t("list.buy")}}{{pageIdentifier}}</span>
			</div>
			<div class="content">
				<p class="money">{{$t("bbjy.Amount")}}</p>
				<p class="Num">
					<span class="text">{{OrderList.price}}</span>
					<span>{{legal.code}}</span> 
				</p>
			</div>
			<div class="oright">
				<span class="orange" v-show="OrderList.status==0">{{$t("fbjy.WaitingPayment")}}</span>
				<span class="orange" v-show="OrderList.status==-1">{{$t("fbjy.Canceled")}}</span>
				<span class="orange" v-show="OrderList.status==1">{{$t("fbjy.HavePaid")}}</span>
				<span class="success" v-show="OrderList.status==3">{{$t("fbjy.Completed")}}</span>
			</div>
		</div>
		<!--聊天内容-->
		<div class="chat_content" id="scrollBox" ref="scrollBox">
			<div class="loading" v-if="loadingData">
				<img src="../../../assets/loading.gif" />
			</div>
			<ul id="move" @touchstart="start($event)" @touchmove="move($event)" @touchend="end($event)">
				<dl v-for="item in ChatRecord" class="BoxContent" :class="{'messageOleft':item.type!=2&&item.sendUid!=userId,'messageOright':item.type!=2&&item.sendUid==userId}">
					<!--系统信息-->
					<div class="system" v-if="item.type==2&&item.toUid==userId">
						<dl class="text">
							<dd>{{$t("fbjy.SystemRemindsYou")}}:{{item.content}}</dd>
							<dt class="time">{{formatTime(item.created_at).split(" ")[1]}}</dt>
						</dl>
					</div>
					<!--时间-->
					<div class="time" v-show="item.type!=2&&item.sendUid!=userId || item.type!=2&&item.sendUid==userId">
						<span>{{formatTime(item.created_at).split(" ")[1]}}</span>
					</div>
					<!--左侧消息-->
					<dd class="touxiang" v-show="item.type!=2&&item.sendUid!=userId">
						<i class="iconfont icon-icontouxiang"></i>
					</dd>
					<li class="oleft" v-show="item.type!=2&&item.sendUid!=userId">
						<img :src="item.content" v-show="item.content.indexOf('http')!=-1" @click="imgShow(item.content)" />
						<p class="text" v-if="item.content.indexOf('http')==-1">
							{{item.content}}
						</p>
					</li>
					<!--右侧消息-->
					<li class="oright" v-show="item.type!=2&&item.sendUid==userId">
						<img :src="item.content" v-show="item.content.indexOf('http')!=-1" @click="imgShow(item.content)" />
						<p class="text" v-if="item.content.indexOf('http')==-1">
							{{item.content}}
						</p>
					</li>
					<dd class="touxiang" v-show="item.type!=2&&item.sendUid==userId">
						<i class="iconfont icon-icontouxiang"></i>
					</dd>
				</dl>
			</ul>
		</div>

		<!--发送消息-->
		<div class="chat_bottom">
			<input type="text" v-model="content" class="oText" />
			<div class="oImg1" v-show="locdingIsShow">
				<img src="../../../assets/loading2.gif" />
			</div>
			<div class="oImg" v-show="!locdingIsShow">
				<i class="iconfont icon-tupian"></i>
				<input type="file" accept="image/png,image/gif,image/jpg,image/jpeg" @change="sendImg($event)" />
			</div>
			<div class="SendOut">
				<img src="../../../assets/loading3.gif" v-show="locdingText" />
				<button v-show="!locdingText" @click="sendText">{{$t("fbjy.Send")}}</button>
			</div>
		</div>
	</div>
</template>

<script>
	import header from "../../public/backHeader"
	import loading from "../../public/loading"
	import { Toast, MessageBox } from 'mint-ui';
	import { mapGetters,mapActions,mapState,mapMutations } from 'vuex'
	import $ from "jquery";
	export default {
		data() {
			return {
				header: "",
				/*用户id*/
				OrderId: this.$route.params.id,
				/*订单id*/
				toUserIds: "",
				/*对方id*/
				OrderList: {},
				/*整个信息*/
				pageIdentifier: "",
				/*交易币种名称*/
				content: "",
				/*输入内容*/
				ChatRecord: [],
				/*聊天记录*/
				ChatTotal: 0,
				/*聊天记录总条数*/
				CountPage: 1,
				/*当前页数*/
				imgSrc: "",
				/*图片地址*/
				imgIsShow: false,
				/*图片的显示隐藏*/
				Disable: false,
				/*判断用户是否刷新到最后一页*/
				startY: 0,
				/*初始化Y轴开始位置*/
				endY: 0,
				/*初始化Y轴结束位置*/
				loadingData: false,
				/*加载数据*/
				locdingIsShow: false,
				/*用户发送图片出现loading效果*/
				locdingText: false,
				/*用户发送文字出现的locding效果*/
				loadingIsShow: false, /*loading效果*/
				legal:"",//人民币
			}
		},
		computed:{
			...mapState('user',{'userId':state=>state.userID}),
			...mapState('user', [
				'orderID'
			]),
		},
		components: {
			"my-header": header,
			"my-loading": loading
		},
		methods: {
			...mapMutations('user',['setData']),
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
			updown() { /*下载图片*/
				let _this = this;
				if(window.location.host) { /*判断用户是否在浏览器中打开*/
					window.open(_this.imgSrc)
					return false;
				} else {
					//创建下载任务
					_this.loadingIsShow = true;
					_this.imgIsShowClick(_this.code_img);
				}
			},
			/*开始滑动屏幕*/
			start(e) {
				var touch = event.targetTouches[0];
				this.startY = touch.pageY; /*滑动起点的坐标----取开始一点的坐标为开始的终点坐标*/
			},
			/*按住滑动事件*/
			move(e) {
				let _this = this;
				let touch = e.targetTouches[0];
				this.endY = touch.pageY; /*用户Y滑动的距离  ----取最后一点的坐标为最终的终点坐标*/
			},
			/*手指离开事件判断用户手指在屏幕滑动的距离*/
			/*获取历史记录*/
			end(e) {
				let _this = this;
				let distanceY = this.endY - this.startY;
				//获取移动端设备的屏幕宽度
				var clientHeight = document.documentElement.clientHeight;
				//判断是否滑动了，而不是屏幕上单击了
				if(this.startY != Math.abs(distanceY)) {
					//在滑动的距离超过屏幕高度的20%时，做某种操作
					if(Math.abs(distanceY) > clientHeight * 0.2 && _this.scroll.scrollTop == 0) {
						if(this.Disable) {
							_this.$message({
								showClose: true,
								message: _this.$t("fbjy.NoMoreRecords"),
								type: 'success',
								duration: 2000
							});
							return false;
						}
						this.loadingData = true;
						/*获取原来数据*/
						this.CountPage++;
						this.$ajax.get(this.httpUrl.getltjlUrl, {
							headers: {
								'Authorization': 'Bearer ' + _this.token
							},
							params: {
								"blaceId": _this.OrderId,
								"page": _this.CountPage
							}
						}).then(function(res) {
							_this.loadingData = false;
							let arr = res.data.data.data; /*历史记录*/
							for(let i = 0; i < arr.length; i++) { /*插在数组的前头*/
								_this.ChatRecord.unshift(arr[i])
							}
							if(_this.CountPage >= res.data.data.last_page) {
								_this.Disable = true;
							}
						}, function(err) {
							console.log(err)
						})
					}
				}
			},
			/*显示图片*/
			imgShow(src) {
				this.imgSrc = src;
				this.imgIsShow = true;
			},
			/*发送文本*/
			sendText() {
				let _this = this;
				if(this.content == "") {
					_this.$message({
						message: _this.$t("fbjy.ContentNotEmp"),
						type: 'warning',
						duration: 2000
					});
					return false;
				}
				this.locdingText = true; /*发送文本显示loading效果*/
				setTimeout(function() {
					_this.locdingText = false;
				}, 1500)
				/*发送文本消息*/
				this.$ajax.post(this.httpUrl.postltxxUrl, {
					toUserIds: _this.toUserIds,
					/*对方ID*/
					orderId: _this.OrderId,
					/*订单ID*/
					msgType: 0,
					content: _this.content
				}, {
					headers: {
						'Authorization': 'Bearer ' + _this.token
					}
				}).then(function(res) {
					/*添加消息*/
					_this.ChatRecord.push(res.data.data);
					_this.$nextTick(() => {
						_this.scroll.scrollTop = _this.scroll.scrollHeight;
						_this.content = "";
					})
					_this.locdingText = false;
				}).catch(function(err) {
					console.log("发送图片信息 err", err)
				})
			},
			/*发送图片 */
			sendImg(e) {
				let _this = this;
				var file = e.target.files[0];
				/*判断用户是否上传的为图片*/
				if((!/image\/\w+/.test(file.type))) {
					this.ltInfo = _this.$t("userCenter.UploadedIsNotPhoto");
					this.isltInfo = true;
					setTimeout(() => {
						this.isltInfo = false;
					}, 1000)
					return false;
				}
				//判断用户上传的图片大小
				if(file.size > 2 * 1024 * 1024) {
					_this.$message({
						title: _this.$t("fbjy.Warning"),
						message: _this.$t("fbjy.UploadedPhoLargeselect"),
						type: 'warning',
						duration: 2000
					});
					return false;
				}
				this.locdingIsShow = true;
				setTimeout(function() {
					_this.locdingIsShow = false;
				}, 2000)
				var param = new FormData(); //创建form对象
				param.append('picture', file); //通过append向form对象添加数据
				param.append('toUserIds', this.toUserIds);
				param.append('orderId', this.OrderId);
				param.append('msgType', 1);
				this.$ajax.post(this.httpUrl.postltxxUrl, param, {
					headers: {
						'Authorization': 'Bearer ' + _this.token
					}
				}).then(function(res) {
					_this.locdingIsShow = false;
					/*添加图片*/
					_this.ChatRecord.push(res.data.data);
					/*默认回到底部开始*/
					_this.$nextTick(() => {
						_this.scroll.scrollTop = _this.scroll.scrollHeight;
					})

					/*默认回到底部结束*/
				}).catch(function(err) {
					console.log("发送图片信息 err", err)
				})
			}
		},
		mounted() {
			let _this = this;
			/*获取滚动的box*/
			this.scroll = document.querySelector("#scrollBox");
			/*获取订单详情*/
			this.$ajax.get(this.httpUrl.getddxqUrl, {
				headers: {
					'Authorization': 'Bearer ' + _this.token
				},
				params: {
					"blaceId": _this.OrderId
				}
			}).then(function(res) {
				_this.legal = res.data.data.legal;
				_this.OrderList = res.data.data;
				_this.pageIdentifier = res.data.data.currency.pageIdentifier; /*当前币种*/
				// 获取并判断聊天发送方用户通信标识以及对方用户id
				if(_this.userId == res.data.data.user_id) {
					_this.toUserIds = res.data.data.pur_user;
					_this.header = res.data.data.merchant.name;
				} else {
					_this.toUserIds = res.data.data.user_id;
					_this.header = res.data.data.user.name;
				}
			}, function(err) {
				console.log(err)
			})
			/*默认获取聊天记录*/
			this.$ajax.get(this.httpUrl.getltjlUrl, {
				headers: {
					'Authorization': 'Bearer ' + _this.token
				},
				params: {
					"blaceId": _this.OrderId,
					"page": 1
				}
			}).then(function(res) {
				if(res.data.status.code == 200) { //ChatRecord
					var arr = res.data.data.data;
					/*获取聊天记录*/
					for(let i = 0; i < arr.length; i++) {
						_this.ChatRecord.unshift(arr[i])
					}
				}
				/*默认回到底部开始*/
				_this.$nextTick(() => {
					_this.scroll.scrollTop = _this.scroll.scrollHeight;
					_this.content = "";
				})
				/*默认回到底部结束*/
			}).catch(function(err) {
				console.log("默认拉取聊天记录 err", err)
			})
			/************************************************获取推送过来的消息**********start*************************************************/

			_this.ws.onmessage = function(e) {
				var arr = JSON.parse(e.data);
				if(arr.type == "ping") { ////判断type
					_this.ws.send('{"pong":' + Date.now() + '}');
				} else if(arr.type == "otc") {
					// msgType用于消息分类处理，用户可以在发送消息时设置自定义的msgType，在收到消息时判断msgType，"reqUnReadMsgCount"、"testMsg"、"tokenExpired"为apush预定义的msgType，请不要使用。
					if(window.plus) {
						if(_this.OrderId != arr.content.orderId) {
							// window.localStorage.setItem("OrderId", arr.content.orderId);
							_this.setData({'orderID':arr.content.orderId});
							let otext;
							if(arr.content.type != 1) { /*文字*/
								otext = arr.content.content;
							} else {
								otext = _this.$t("bbjy.Systemmessage")
							}
							plus.push.createMessage(otext, '', {
								title: "otc" + _this.$t("bbjy.Haveneworder")
							});
							plus.push.addEventListener("click", function(msg) {
								// 分析msg.payload处理业务逻辑
								/*获取订单详情*/
								_this.$ajax.get(_this.httpUrl.getddxqUrl, {
									headers: {
										'Authorization': 'Bearer ' + _this.token
									},
									params: {
										"blaceId": _this.orderID//window.localStorage.getItem("OrderId")
									}
								}).then(function(res) {
									if(res.data.data.pur_user == _this.userId) { /*判断下单用户id与登录用户id*/
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
					if(_this.OrderId != arr.content.orderId) {
						return false;
					} else {
						/*推送过来的数据*/
						_this.ChatRecord.push(arr.content);
						/*回到底部*/
						_this.$nextTick(() => {
							_this.scroll.scrollTop = _this.scroll.scrollHeight;
						})
					}
				}
			}
			/************************************************获取推送过来的消息**********end***************************************************/

		}
	}
</script>

<style lang="scss" scoped>
	$orange:#ff4800;
	/*待付款橙色*/

	$success:#02c27c;
	/*已完成颜色*/
	/*未完成颜色*/

	.orange {
		color: $orange;
	}
	/*已完成颜色*/

	.success {
		color: $success;
	}

	#chat {
		width: 100%;
		height: 100%;
		color: #fff;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}
	/*聊天头部内容*/

	.chat_header {
		width: 100%;
		height: .5rem;
		display: flex;
		line-height: .5rem;
		background: #141738;
		justify-content: space-between;
		padding-bottom: .05rem;
		div {
			text-align: center;
		}
		.content {
			text-align: left;
			.money,
			.Num {
				line-height: .25rem;
				.text {
					font-size: .16rem;
				}
			}
			.money {
				color: #6178b1;
			}
		}
		.oleft {
			box-sizing: border-box;
			padding-left: .1rem;
		}
		.oright {
			text-align: right;
			box-sizing: border-box;
			padding-right: .1rem;
		}
	}
	/*聊天内容*/

	.chat_content {
		flex: 1;
		background: #171933;
		/*overflow-x: hidden;*/
		overflow: auto;
		box-sizing: border-box;
		padding: 0 .1rem;
		.loading {
			text-align: center;
		}
		ul {
			width: 100%;
			position: relative;
			.system {
				width: 100%;
				display: flex;
				justify-content: center;
				padding: .1rem 0;
				.text {
					background: #464593;
					color: #fff;
					box-sizing: border-box;
					padding: 6px 10px;
					word-break: break-all;
					border-radius: 4px;
					line-height: 1.8;
					.time {
						text-align: right;
					}
				}
			}
			/*左侧内容*/
			.messageOleft {
				width: 100%;
				display: flex;
				flex-wrap: wrap;
				padding: .1rem 0;
				.time {
					width: 100%;
					text-align: center;
					margin: 0 0 .05rem 0;
				}
				.touxiang {
					width: .45rem;
					height: .45rem;
					text-align: center;
					line-height: .45rem;
					background: #fff;
					.iconfont {
						font-size: .25rem;
						color: #2f2e67;
					}
					margin-right:.1rem;
				}
			}
			/*右侧内容*/
			.messageOright {
				width: 100%;
				display: flex;
				flex-wrap: wrap;
				justify-content: flex-end;
				padding: .1rem 0;
				.time {
					width: 100%;
					text-align: center;
					margin: 0 0 .05rem 0;
				}
				.touxiang {
					width: .45rem;
					height: .45rem;
					text-align: center;
					line-height: .45rem;
					background: #fff;
					.iconfont {
						font-size: .25rem;
						color: #2f2e67;
					}
					margin-left:.1rem;
				}
			}
			.oleft,
			.oright {
				display: inline-block;
				position: relative;
				padding: 0 10px;
				max-width: calc(100% - .85rem);
				min-height: .2rem;
				line-height: 1.8;
				font-size: .12rem;
				padding: 6px 10px;
				text-align: left;
				word-break: break-all;
				background-color: #fff;
				color: #000;
				display: flex;
				border-radius: 4px;
				box-shadow: 0px 1px 7px -5px #000;
				align-items: center;
				.text {
					word-wrap: break-word;
					word-break: break-all;
				}
				img {
					width: 90%;
					display: block;
					margin: 0 auto;
				}
			}
			.oleft:before {
				content: " ";
				position: absolute;
				top: 9px;
				right: 100%;
				border: 6px solid transparent;
				border-right-color: #fff;
			}
			.oright:before {
				content: " ";
				position: absolute;
				top: 9px;
				left: 100%;
				border: 6px solid transparent;
				border-left-color: #fff;
			}
		}
	}
	/*聊天内容底部*/

	.chat_bottom {
		width: 100%;
		height: .45rem;
		background: #fff;
		display: flex;
		box-sizing: border-box;
		align-items: center;
		padding: 0 .05rem;
		.oText {
			width: 65%;
			height: 60%;
			border: none;
			border-bottom: .01rem solid #adacc3;
			color: #000;
		}
		.oImg1 {
			width: 18%;
			display: flex;
			justify-content: center;
			align-items: center;
		}
		.oImg {
			width: 18%;
			position: relative;
			input {
				width: 95%;
				height: .45rem;
				opacity: 0;
			}
			.iconfont {
				color: #000;
				position: absolute;
				left: 20%;
				top: 20%;
				width: .25rem;
				height: .25rem;
				font-size: .25rem;
				color: #2f2e67;
			}
		}
		.SendOut {
			width: 18%;
			height: 100%;
			line-height: .45rem;
			display: flex;
			align-items: center;
			justify-content: center;
			button {
				width: .48rem;
				height: .27rem;
				border: none;
				background: #2f2e67;
				text-align: center;
				line-height: .2rem;
			}
		}
	}
	/*蒙版*/

	.oImg_men {
		width: 100%;
		height: 100%;
		background: rgba(0, 0, 0, 0.8);
		position: fixed;
		left: 0;
		top: 0;
		z-index: 888;
	}

	.oImg_content {
		width: 100%;
		height: 100%;
		position: fixed;
		left: 0;
		top: 0;
		z-index: 889;
		.img {
			width: 100%;
			height: 100%;
			box-sizing: border-box;
			display: flex;
			align-items: center;
			justify-content: center;
			position: relative;
			img {
				max-width: 98%;
				max-height: 98%;
			}
			.download {
				position: absolute;
				right: .1rem;
				bottom: .1rem;
				width: .4rem;
				height: .4rem;
				background: rgba(255, 255, 255, 0.5);
				color: #000;
				border-radius: 50%;
				text-align: center;
				line-height: .4rem;
				.iconfont {
					font-size: .23rem;
				}
			}
			.delete {
				position: absolute;
				right: .1rem;
				top: .1rem;
				width: .4rem;
				height: .4rem;
				background: #000;
				color: #fff;
				border-radius: 50%;
				text-align: center;
				line-height: .4rem;
				.iconfont {
					font-size: .2rem;
				}
			}
		}
	}
</style>
