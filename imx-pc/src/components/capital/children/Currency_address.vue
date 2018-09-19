<template>
	<div id="currency_address">
		<!--资金头部-->
		<div class="currency_address_title">
			<p class="currency_address_title_text">
        			{{$t("capital.Withdraw")}}
			</p>
		</div>
		<!--提币地址内容部分-->
		<div class="currency_address_content" :class="{'currency_address_content_white':getColor==1}">
			<!--币种-->
			<div class="select">
				<span class="select_title"> {{$t("capital.Currency")}}</span>
				<div class="select_bz">
					<el-select v-model="value" :placeholder="$t('userCenter.Pleasechoose')" @change="change(value)">
						<el-option v-for="item in coin_matching" :key="item.pageIdentifier" :label="item.pageIdentifier" :value="item.id">
						</el-option>
					</el-select>
				</div>
			</div>
			<div style="clear: both;"></div>
			<!--提币地址-->
			<div class="tibi-address">
				<span class="tibi-address-text">
				{{$t("capital.Withdrawaddress")}}
				</span>
				<div class="tibi-address-str">
					<input type="text" v-model="addressCreateList.address" @keyup="noTe($event)" @input="noTe($event)" />
				</div>
				<div class="tishi" v-show="tishiIsShow">{{tishiText}}</div>
			</div>
			<!--备注-->
			<div class="tibi-beizhu">
				<span class="tibi-address-text">
								{{$t("capital.Remarks")}}
				</span>
				<div class="tibi-address-str">
					<input type="text" v-model="addressCreateList.Remarks" @keyup="noTe1($event)" @input="noTe1($event)" @blur="noTe1($event)" />
				</div>
			</div>
			<!--添加-->
			<div class="add">
				<el-button type="primary" @click="addClick()" :disabled="!addressCreateList.Remarks||!addressCreateList.address">{{$t("capital.Add")}}</el-button>
			</div>
		</div>

		<!--提币记录-->
		<div class="Charge_record" :class="{'Charge_record_white':getColor==1}">
			<p class="Charge_record_title">
				<span>{{$t("capital.addresslists")}}</span>
			</p>
			<!--记录数据<-->
			<ul class="Charge_record_content">
				<li>{{$t("capital.Currency")}}</li>
				<li>{{$t("capital.Withdrawaddress")}}</li>
				<li>{{$t("capital.Remarks")}}</li>
				<li>{{$t("capital.Operating")}}</li>
			</ul>
			<!--数据展示-->
			<ul class="Charge_record_content list" v-for="(item,index) in addressList">
				<li>{{item.get_currency.pageIdentifier}} </li>
				<li>{{item.address}}</li>
				<li>{{item.remarks}}</li>
				<li>
					<span @click="remove(item.id,index)">{{$t("capital.Deleted")}}</span>
				</li>
			</ul>
			<!--分页-->
			<div class="pageCount" v-show="addressList.length!=0">
				<div class="button">
					<el-pagination layout="prev, pager, next" background :page-size="topage" @current-change="pageChange" :total="total">
					</el-pagination>
				</div>
			</div>

			<!--暂无记录-->
			<div class="No_record" v-show="addressList==0" :class="{'No_record_white':getColor==1}">
				<p>{{$t("capital.NoWithdrawRecord")}}</p>
			</div>
		</div>
		<!--安全验证-----弹框内容-->
		<div class="CurrencyAddress_alert" v-show="alertIsShow">
			<!--蒙版内容-->
			<div class="CurrencyAddress_alert_menban"></div>
			<div class="CurrencyAddress_alert_content" :class="{'CurrencyAddress_alert_content_white':getColor==1}">
				<!--安全验证上部分-->
				<div class="CurrencyAddress_alert_content_top">
					<!--头部安全验证-->
					<div class="CurrencyAddress_alert_content_top_title">
						<span>{{$t("capital.Securityverification")}}</span>
						<i class="iconfont icon-cuowu" @click="alertIsShow=false"></i>
						<!--验证码错误-->
						<div class="code_error" :class="{'tishi_white':getColor==1}" v-show="codeError">
							{{codeErrorText}}
						</div>
					</div>
					<!--手机号验证-->
					<el-form>
						<div class="phone" v-if="userList.mobile!=undefined&&userList.mobile.check==true">
							<dd class="isShowphone">
								<p class="title">{{$t("capital.thephonenumber")}}</p>
								<div class="text">{{userList.mobile.title}}</div>
							</dd>
							<div class="phone-ma">	{{$t("login.SMSverificationcode")}}</div>
							<div class="oInput">
								<el-form-item id="you-yan">
									<el-input :rules="{
							      required: true,  message:$t('capital.Theverifyingcodecannotbeempty'), trigger: 'blur'
							    }" v-model="phone_code" @keyup.native="phone_code=phone_code.replace(/\D/gi,'')"></el-input>
									<el-button id="getYan" @click="getPhoneYan" :disabled="!sendAuthCode">
										<span v-show="sendAuthCode" class="auth_text auth_text_blue">{{$t("login.GetCode")}}</span>
										<span v-show="!sendAuthCode" class="auth_text"> <span class="auth_text_blue">{{auth_time}}</span> {{$t("login.secresend")}}</span>
									</el-button>
								</el-form-item>
								<p class="tishi-red" v-show="phoneNokong">{{phoneNoText}}</p>
							</div>
						</div>
						<!--邮箱验证码-->
						<div class="email" v-if="userList.email!=undefined&&userList.email.check==true">
							<dd class="isShowphone">
								<p class="title">{{$t("capital. Email")}}</p>
								<div class="text">{{userList.email.title}}</div>
							</dd>

							<div class="phone-ma"> {{$t("capital.Mailboxverificationcode ")}}</div>
							<div class="oInput">
								<el-form-item id="you-yan" :rules="{
						      required: true,  message:$t('capital.Theverifyingcodecannotbeempty'), trigger: 'blur'
						    }">
									<el-input v-model="email_code" @keyup.native="email_code=email_code.replace(/\D/gi,'')"></el-input>
									<el-button id="getYan" @click="getEmailYan" :disabled="!sendAuthCodeEmail">
										<span v-show="sendAuthCodeEmail" class="auth_text auth_text_blue">{{$t("capital.NoWithdrawRecord")}} {{$t("login. GetCode")}}</span>
										<span v-show="!sendAuthCodeEmail" class="auth_text"> <span class="auth_text_blue">{{email_time}}</span>{{$t("login.secresend")}}</span>
									</el-button>
								</el-form-item>
								<p class="tishi-red" v-show="emailNokong">{{emailNoText}}</p>
							</div>
						</div>
						<!--谷歌验证码-->
						<div class="google" v-if="userList.google.check==true">
							<div class="phone-ma"> {{$t("userCenter.GoogleVerifier")}}</div>
							<div class="oInput">
								<el-input :rules="{
							      required: true, message:$t('capital.Domainnamecannotbeempty'), trigger: 'blur'
							 }" v-model="google_code" @keyup.native="google_code=google_code.replace(/\D/gi,'')"></el-input>
								<p class="tishi-red" v-show="googleNokong">{{googleNoText}}</p>
							</div>
						</div>
					</el-form>
				</div>
				<!--确认  取消-->
				<div class="confirm_cancel_box">
					<p @click="quxiao()">{{$t("capital.Cancel")}}</p>
					<p @click="subTow()">{{$t("capital.Confirm")}}</p>
				</div>
			</div>
		</div>

	</div>
</template>

<script>
	import axios from "axios";
	import {mapActions,mapState} from 'vuex';
	import { httpUrl } from "../../http_url/http_url";
	export default {
		data() {
			return {
				coin_matching: [],
				/*获取币对用到的*/
				value: "",
				/*获取当前币的id*/
				// userList: ,
				/*获取用户信息*/
				/*获取用户信息*/
				phone_code: "", ///获取手机验证码
				email_code: "", ///获取邮箱验证码
				google_code: "", //谷歌验证码
				sendAuthCode: true, ///是否禁用手机获取验证码
				sendAuthCodeEmail: true, //是否禁用邮箱获取验证码
				auth_time: 0, //获取手机验证码倒计时
				email_time: 0, //获取邮箱验证码倒计时
				emailNokong: false,
				emailNoText: this.$t("capital.Theverifyingcodecannotbeempty"),
				/*提示*/
				phoneNokong: false,
				phoneNoText: this.$t("capital.Theverifyingcodecannotbeempty"),
				/*提示*/
				googleNokong: false,
				googleNoText: this.$t("capital.Theverifyingcodecannotbeempty"),
				/*提示*/
				alertIsShow: false,
				/*弹框显示*/
				addressList: [],
				/*获取历史地址*/
				addressCreateList: {
					/*地址添加*/
					address: "",
					Remarks: ""
				},
				topage: 10,
				/*显示10条*/
				total: 0,
				/*总条数*/
				tishiText: "",
				/*提示内容部分*/
				tishiIsShow: false,
				/*提示内容部分的显示隐藏*/
				codeErrorText: this.$t("userCenter.Verification"),
				/*验证码错误提示文本*/
				codeError: false,
				/*验证码错误*/
				CurrentPage: 1 /*当前页*/
			}
		},
		computed:{
			...mapState('user',{
				userList:state=>state.findPswdList
			}),
		},
		methods: {
			...mapActions('user',['backpassword']),
			async quxiao() { /*取消*/
			  await this.api.invitation(token).invitedList({page})
				this.alertIsShow = false;
				this.phone_code = "";
				this.email_code = "";
				this.google_code = "";
			},
			noTe(eve) {
				this.addressCreateList.address = eve.target.value.replace(/[^\w\.\/]/ig, '');
			},
			noTe1(eve) {
				this.addressCreateList.Remarks = eve.target.value.replace(/[^\a-\z\A-\Z0-9\u4E00-\u9FA5]/g, '');
			},
			remove(id, index) {
				var _this = this;
				_this.callback(); /*刷新token判断*/
				axios.post(httpUrl.addressDel, {
					"addressId": id
				}, {
					headers: {
						"Authorization": "Bearer " + _this.token
					}
				}).then(function(res) {
					if(res.data.status.code == 200) {
						_this.total--;
						_this.addressList.splice(index, 1);
						_this.$notify({
				          title: _this.$t("capital.DeleteSuccess"),
				          type: 'success',
				          duration:1500
				       });
						/*获取当前页数*/
						_this.CurrentPage = Math.ceil(_this.total / 10);
						axios.get(httpUrl.addressList, {
							params: {
								"page": _this.CurrentPage,
								"currency_id": _this.value
							},
							headers: {
								"Authorization": "Bearer " + _this.token
							}
						}).then(function(res) {
							_this.addressList = res.data.data.data;
							_this.total = res.data.data.total;
						}, function(err) {
							console.log(err)
						})

					}

				}, function(err) {
					console.log(err)
				})
			},
			/*切换币种*/
			change(id) {
				var _this = this;
				_this.callback(); /*刷新token判断*/
				/*获取提币地址*/
				axios.get(httpUrl.addressList, {
					params: {
						currency_id: id
					},
					headers: {
						"Authorization": "Bearer " + _this.token
					}
				}).then(function(res) {
					_this.addressList = res.data.data.data;
					/*总条目数*/
					_this.total = res.data.data.total;
				}, function(err) {
					console.log(err)
				})
			},
			///分业
			pageChange(val) {
				var _this = this;
				_this.CurrentPage = val;
				_this.callback(); /*刷新token判断*/
				axios.get(httpUrl.addressList, {
					params: {
						"page": val,
						"currency_id": _this.value
					},
					headers: {
						"Authorization": "Bearer " + _this.token
					}
				}).then(function(res) {
					_this.addressList = res.data.data.data;
				}, function(err) {
					console.log(err)
				})
			},
			///获取手机验证码
			getPhoneYan() {
				var _this = this;
				if(this.sendAuthCode==""){
					return false;
				}
				_this.callback(); /*刷新token判断*/
				axios.post(httpUrl.Money_code, {
					type: 5,
					receiver_type: 0
				}, {
					headers: {
						"Authorization": "Bearer " + _this.token
					}
				}).then(function(res) {
					if(res.data.data.status == -200) {
						alert(_this.$t("capital.FrequentOperation"))
					} else {
						///获取成功
						_this.sendAuthCode = false;
						_this.auth_time = 60;
						var auth_timetimer = setInterval(() => {
							_this.auth_time--;
							if(_this.auth_time <= 0) {
								_this.sendAuthCode = true;
								clearInterval(auth_timetimer);
							}
						}, 1000);
					}
				})
			},
			////获取邮箱验证码
			getEmailYan() {
				var _this = this;
				if(this.sendAuthCodeEmail==""){
					return false;
				}
				_this.callback(); /*刷新token判断*/
				axios.post(httpUrl.Money_code, {
						type: 5,
						receiver_type: 1
					}, {
						headers: {
							"Authorization": "Bearer " + _this.token
						}
					})
					.then(function(res) {
						console.log(res)
						if(res.data.data.status == -200) {
							alert(_this.$t("capital.FrequentOperation"))
						} else {
							///获取成功
							_this.sendAuthCodeEmail = false;
							_this.email_time = 60;
							var auth_timetimer = setInterval(() => {
								_this.email_time--;
								if(_this.email_time <= 0) {
									_this.sendAuthCodeEmail = true;
									clearInterval(auth_timetimer);
								}
							}, 1000)
						}
					})

			},
			addClick() {
				var _this = this;
				_this.callback(); /*刷新token判断*/
				axios.post(httpUrl.checkAddress, {
					currency_id: _this.value,
					address: _this.addressCreateList.address,
				}, {
					headers: {
						"Authorization": "Bearer " + _this.token
					}
				}).then(function(res) {
					if(res.data.status.code == 101) {
						_this.tishiText = _this.$t("capital.AddressOccupied");
						_this.tishiIsShow = true;
						setTimeout(function() {
							_this.tishiIsShow = false;
						}, 1000)
						return false;
					} else {
						//显示弹框
						_this.alertIsShow = true;
					}
				}, function(err) {
					console.log(err)
				})

			},
			subTow() {
				////通过验证码来确定用户身份
				var _this = this;
				_this.callback(); /*刷新token判断*/
				///判断用户是否输入完整信息
				if(_this.userList.mobile != undefined && _this.phone_code == "") {
					_this.phoneNokong = true;
					setTimeout(function() {
						_this.phoneNokong = false;
					}, 1000)
					return false;
				} else if(_this.userList.email != undefined && _this.email_code == "") {
					_this.emailNokong = true;
					setTimeout(function() {
						_this.emailNokong = false;
					}, 1000)
					return false;
				} else if(_this.userList.google.check == true && _this.google_code == "") {
					_this.googleNokong = true;
					setTimeout(function() {
						_this.googleNokong = false;
					}, 1000)
					return false;
				}
				//判断有没有
				if(_this.userList.google.check == false) {
					_this.google_code = "111111";
				}
				if(_this.userList.email == undefined || _this.userList.email.check == false) {
					_this.email_code = "111111";
				}
				if(_this.userList.mobile == undefined && _this.userList.mobile.check == false) {
					_this.phone_code = "111111";
				}
				axios.post(httpUrl.addressCreate, {
					currency_id: _this.value,
					remarks: _this.addressCreateList.Remarks,
					address: _this.addressCreateList.address,
					mobile_code: _this.phone_code,
					google_code: _this.google_code,
					email_code: _this.email_code
				}, {
					headers: {
						"Authorization": "Bearer " + _this.token
					}
				}).then(function(res) {
					if(res.data.status.code == 200) {
						_this.alertIsShow = false; //弹框消失
						/*获取提币地址*/
						axios.get(httpUrl.addressList, {
							params: {
								currency_id: _this.value
							},
							headers: {
								"Authorization": "Bearer " + _this.token
							}
						}).then(function(res) {
							_this.addressList = res.data.data.data;
							/*总条目数*/
							_this.total = res.data.data.total;
						}, function(err) {
							console.log(err)
						})
					}
					if(res.data.status.message == "mobile_error"){
						_this.phoneCodeError = true;
						setTimeout(function(){
							_this.phoneCodeError = false;
						},1000)
					}
					if(res.data.status.message == "Email_error"){
						_this.emailCodeError = true;
						setTimeout(function(){
							_this.emailCodeError = false;
						},1000)
					}
					if(res.data.status.message == "google_error"){
						_this.googleCodeError = true;
						setTimeout(function(){
							_this.googleCodeError = false;
						},1000)
					}
				}, function(err) {
					console.log(err)
				})

			}
		},
		mounted() {
			var _this = this;
			/*获取币种*/
			axios.get(httpUrl.currencyList, {
				headers: {
					"Authorization": "Bearer " + _this.token
				}
			}).then(function(res) {
				_this.coin_matching = res.data.data;
				_this.value = _this.coin_matching[0].id;
				/*获取提币地址*/
				axios.get(httpUrl.addressList, {
					params: {
						currency_id: _this.value
					},
					headers: {
						"Authorization": "Bearer " + _this.token
					}
				}).then(function(res) {
					_this.addressList = res.data.data.data;
					/*总条目数*/
					_this.total = res.data.data.total;
				}, function(err) {
					console.log(err)
				})
			}, function(err) {
				console.log(err)
			})
			/*获取用户信息*/
			this.backpassword({username: _this.getUser});
			// axios.post(httpUrl.backpassword, {
			// 	username: _this.getUser
			// }).then(function(res) {
			// 	_this.userList = res.data.data;
			// }, function(err) {
			// 	console.log(err)
			// })

		}
	}
</script>

<style lang="scss">
	/*白色版本开始*/

	.currency_address_content_white {
		background: #fff !important;
		color: #000 !important;
		border: 2px solid #ddd !important;
		border-top: none !important;
		.el-input__inner {
			background: #fff !important;
			color: #000 !important;
		}
		.tibi-address-str {
			input {
				background: #fff !important;
				color: #000 !important;
			}
		}
	}

	.tishi_white {
		background: #fff !important;
		box-shadow: 2px 2px 5px #666 !important;
		color: #000 !important;
	}

	.CurrencyAddress_alert_content_white {
		background: #fff !important;
		color: #000 !important;
		.CurrencyAddress_alert_content_top_title {
			color: #000 !important;
			border-bottom: 1px solid #eee !important;
		}
		.isShowphone {
			.text {
				background: #eee !important;
				color: #000 !important;
			}
		}
		.title,
		.phone-ma {
			color: #000 !important;
		}
		.el-input__inner {
			background: #fff !important;
			color: #000 !important;
			/*border: 1px solid #ddd !important;*/
		}
		.el-button--default {
			color: #000 !important;
			/*border-left: 1px solid #ddd !important;*/
		}
		.confirm_cancel_box {
			border-top: 1px solid #ddd !important;
			p:nth-of-type(1) {
				border-right: 1px solid #ddd !important;
			}
		}
	}
	/*提币记录*/

	.Charge_record_white {
		background: #fff !important;
		.list {
			li {
				color: #000 !important;
			}
		}
	}

	.No_record_white {
		color: #000 !important;
	}
	/*白色版本结束*/
	.border_nei{
		width: 100%;
		height: 100%;
		box-sizing: border-box;
		border: 3px solid #0b0b15;
	}
	/*整体大box*/

	#currency_address {
		color: #fff;
		/*分页样式*/
		.el-pagination.is-background .el-pager li.active {
			background: #9F99F2;
		}
		.el-button--primary {
			width: 107px;
			background: #6666fa;
			border-color: #6666fa;
		}
		.el-select {
			width: 100% !important;
			.el-input {
				width: 100% !important;
			}
		}
		.el-input {
			width: 100% !important;
			float: left;
		}
		.el-input__inner {
			width: 100% !important;
			height: 40px !important;
			color: #fff;
			border: 1px solid #2c3983;
			background: #101034;
		}
		.el-button {
			color: #fff;
		}
		.el-form-item {
			margin-bottom: 0px;
		}
	}
	/*提币地址的头部*/

	.currency_address_title {
		width: 100%;
		height: 45px;
		line-height: 45px;
		.currency_address_title_text {
			display: inline-block;
			padding:  0 35px;
			text-align: center;
			font-size: 15px;
			background: #272867;
		}
	}
	/*验证码*/

	#you-yan {
		position: relative;
		#getYan,
		#getma {
			height: 30px;
			line-height: 5px;
			position: absolute;
			right: 0;
			top: 6px;
			background: none;
			border: none;
			border-left: 1px solid #4e5b85;
			border-radius: 0;
		}
	}
	/*地址列表*/
	/*充币记录*/

	.Charge_record {
		width: 100%;
		margin-top: 20px;
		background: #16182c;
		box-sizing: border-box;
		padding: 0 10px;
		.Charge_record_title {
			width: 100%;
			height: 40px;
			line-height: 40px;
			border-bottom: 1px solid #2e3157;
			span {
				display: inline-block;
				height: 40px;
				font-size: 14px;
				color: #9791e8;
				box-sizing: border-box;
				border-bottom: 2px solid #9791e8;
			}
		}
		/*记录的数据*/
		.Charge_record_content {
			width: 95%;
			margin-left: 2%;
			height: 40px;
			li {
				width: 23%;
				height: 40px;
				float: left;
				color: #7a74c3;
				line-height: 40px;
				text-align: center;
			}
			li:nth-of-type(1) {
				width: 25%;
				text-align: left;
			}
			li:nth-of-type(3) {
				width: 28%;
			}
			li:nth-last-child(1) {
				text-align: right;
			}
		}
		.Charge_record_content+.list {
			li {
				color: #fff;
				span {
					color: #7a74c3;
					cursor: pointer;
				}
			}
		}
		.pageCount {
			text-align: right;
		}
		/*暂无记录*/
		.No_record {
			width: 100%;
			height: 40px;
			line-height: 40px;
			text-align: center;
			color: #fff;
			font-size: 14px;
		}
	}
	/*提币地址内容*/

	.currency_address_content {
		width: 100%;
		box-sizing: border-box;
		background: #16182c;
		/*选择内容*/
		.select {
			width: 40%;
			height: 80px;
			display: flex;
			align-items: center;
			line-height: 80px;
			.select_title {
				flex: .3;
				display: inline-block;
				font-size: 15px;
				text-align: center;
			}
			.select_bz {
				flex: .8;
				height: 80px;
			}
		}
		/*提币备注*/
		.tibi-beizhu {
			@extend .tibi-address;
			margin-top: 10px;
		}
		/*提币地址*/
		.tibi-address {
			width: 40%;
			height: 60px;
			line-height: 60px;
			display: flex;
			position: relative;
			.tibi-address-text {
				flex: .3;
				display: inline-block;
				height: 60px;
				line-height: 60px;
				font-size: 15px;
				text-align: center;
			}
			.tibi-address-str {
				flex: .8;
				height: 40px;
				float: left;
				input {
					width: 100%;
					height: 100%;
					background: #101034;
					border-radius: 4px;
					border: 1px solid #2c3983;
					box-sizing: border-box;
					padding-left: 10px;
					color: #fff;
					outline: none;
				}
			}
			.tishi {
				position: absolute;
				left: 340px;
				top: 35px;
				color: #f56c6c;
			}
		}
		/*添加*/
		.add {
			width: 40%;
			text-align: right;
			button {
				margin: 20px 0;
			}
		}
	}
	/*提示*/

	.tishi-red {
		width: 100%;
		height: 15px;
		line-height: 25px;
		color: #f56c6c;
	}
	/*安全验证弹框内容*/

	.CurrencyAddress_alert {
		width: 100%;
		height: 100%;
		position: fixed;
		left: 0;
		top: 0;
		/*蒙版*/
		.CurrencyAddress_alert_menban {
			width: 100%;
			height: 100%;
			background: rgba(0, 0, 0, 0.6);
			z-index: 88;
		}
		/*按钮*/
		/*确认取消*/
		.confirm_cancel_box {
			width: 100%;
			height: 56px;
			line-height: 56px;
			border-top: 1px solid #454167;
			margin-top: 30px;
			p {
				width: 50%;
				height: 56px;
				box-sizing: border-box;
				float: left;
				text-align: center;
				cursor: pointer;
				font-size: 15px;
			}
			p:nth-of-type(1) {
				border-right: 1px solid #454167;
			}
		}
		/*内容*/
		.CurrencyAddress_alert_content {
			width: 450px;
			background: #222140;
			position: fixed;
			left: 40%;
			top: 10%;
			z-index: 999;
			/*内容的上半部分*/
			.CurrencyAddress_alert_content_top {
				width: 100%;
				box-sizing: border-box;
				padding: 0 20px;
				/*安全验证内容*/
				.CurrencyAddress_alert_content_top_title {
					width: 100%;
					height: 58px;
					line-height: 58px;
					border-bottom: 1px solid #454167;
					position: relative;
					.code_error {
						position: absolute;
						left: 20%;
						top: 100%;
						z-index: 1000;
						width: 60%;
						text-align: center;
						background: #414182;
						box-shadow: 2px 2px 5px #000;
						font-size: 15px;
					}
					span {
						float: left;
						font-size: 16px;
					}
					.iconfont {
						float: right;
						cursor: pointer;
					}
				}
				.oInput {
					width: 100%;
					height: 40px;
				}
				.phone {
					width: 100%;
					.isShowphone {
						/*手机验证那块*/
						width: 100%;
						/*margin-top: 50px;*/
						.title {
							width: 100%;
							height: 35px;
							line-height: 35px;
							color: #fff;
						}
						.text {
							width: 100%;
							height: 40px;
							line-height: 40px;
							box-sizing: border-box;
							padding-left: 10px;
							background: #101034;
							border-radius: 5px;
							font-size: 16px;
							color: #fff;
						}
					}
					.phone-ma {
						width: 100%;
						height: 35px;
						line-height: 35px;
						color: #fff;
						margin-top: 10px;
					}
				}
				.email {
					@extend .phone;
					.isShowphone {
						margin-top: 20px !important;
					}
				}
				.google {
					@extend .phone;
				}
			}
		}
	}
</style>
