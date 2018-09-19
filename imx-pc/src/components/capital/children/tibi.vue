<template>
	<div id="tibi">
		<!--提示-->
		<div class="currencySuccess" v-show="currencySuccess">
			<p>
				<i class="iconfont icon-duihao2"></i>
			</p>
			<p>
				{{$t("capital.Successfultransaction")}}
			</p>
		</div>
		<div class="currencyError" v-show="currencyError">
			<p>
				<i class="iconfont icon-gantanhao"></i>
			</p>
			<p>
				{{currencyErrorText}}
			</p>
		</div>
		<!--提升额度-->
		<div class="PromoteQuota" v-show="isPromoteQuota" :class="{'PromoteQuota_white':getColor==1}">
			<div class="PromoteQuota-content">
				<!--提示额度-->
				<div class="PromoteQuota-content-title">
					<span>{{$t("capital.Raisetheamount")}}</span>
					<!--提升额度-->
					<i class="iconfont icon-cuowu" @click="isPromoteQuota=false"></i>
				</div>
				<!--请您完成如下操作-->
				<div class="operation">
					{{$t("capital.Pleasecompletethefollowingoperationfirst")}}:
					<!--请您先完成如下操作-->
				</div>
				<!--至少开启2项双重身份验证-->
				<ul class="double">
					<li>
						<span>
							<i class="iconfont icon-gantanhao"></i>
							{{$t("capital.Atleastdoubleidentitiesareopened")}}</span>
						<!--至少开启2项双重身份验证-->
						<router-link to="/index/userCenter/Accountsecurity">{{$t("capital.Openatonce ")}}</router-link>
						<!--立即开启-->
					</li>
					<li>
						<span>
							<i class="iconfont icon-gantanhao"></i>
							{{$t("capital.identityauthentication")}}</span>
						<!--身份认证-->
						<router-link to="/index/userCenter/identity"> {{$t("capital.Immediateauthentication")}}</router-link>
						<!--立即认证-->
					</li>
				</ul>
			</div>
		</div>
		<!--提币-->
		<div class="tibi_title">
			<p class="tibi_title_text">{{$t("capital.Withdraw")}}</p>
		</div>
		<!--提币内容-->
		<div class="tibi_content" :class="{'tibi_content_white':getColor==1}">
			<!--左侧表单部分-->
			<div class="tibi_content_left">
				<div class="tiShi" :class="{'tishi_white':getColor==1}" v-show="addressError"> {{$t("capital.Currencyaddresserror")}}</div>
				<!--提币地址错误-->
				<div class="select">
					<span class="select_title">{{$t("otc.Currency")}}</span>
					<div class="select_bz">
						<el-select v-model="value" :placeholder="$t('userCenter.Pleasechoose')" @change="change(value)">
							<el-option v-for="item in coin_matching" :key="item.id" :label="item.pageIdentifier" :value="item.id">
							</el-option>
						</el-select>
					</div>
				</div>
				<div style="clear: both;"></div>
				<!--可用限额-->
				<div class="available">
					<span id="availableNum">{{$t("capital.Available")}}:{{available | number(currentCurrency.displayNum)}}</span>
					<span>{{$t("capital.Limited")}}:{{moneyList.limit_max_count | number(moneyList.displayNum)}}</span>
					<!--<span v-if="RaiseTheAmount" class="ts-ed" @click="isPromoteQuota=true">提升额度</span>-->
				</div>
				<!--提币地址-->
				<div class="tibi-address">
					<span class="tibi-address-text">
					{{$t("capital.Withdrawaddress")}}
					</span>

					<div class="tibi-address-str usestr">
						<input type="text" :class="[typeok?'erb':'']" v-model="recharge.toAddress" @keyup="noTe($event)" @input="noTe($event)" @focus="addressListIsShow =true" @blur="blur" />
            <div class="err" v-if="!typeok&&value==73">{{$t('capital. Currencyaddresserror')}}</div>
            <div class="err" v-if="!typeok&&value==16">{{$t('capital. Currencyaddresserror')}}</div>
					</div>
					<ul class="addressList" v-show="addressListIsShow&&addressList.length>0">
						<li v-for="item in addressList" @click="recharge.toAddress=item.address">
							<!--备注-->
							<p class="remarks">{{item.remarks}}</p>
							<!--历史地址   -->
							<p class="address">
								{{item.address}}
							</p>
						</li>
					</ul>
				</div>
				<!--地址标签-->
				<div class="tibi-ArrivalAddresslabel usema" v-show="currentCurrency.isLabel==1">
					<span class="tibi-address-text">{{$t("capital.Addresslabel")}}      <!--地址标签-->
					</span>
					<div class="tibi-address-str">
						<input type="text" v-model="Addresslabel" />
					</div>
				</div>
				<div class="cause" v-show="currentCurrency.isLabel==1">
					<span>({{$t("capital.Fillingcarefully")}})</span>
					<!--填写错误可能导致财产损失，请仔细核对-->
					<span class="What">{{$t("capital.whatisit")}}</span>
					<!-- 这是什么？-->
					<p>{{$t("capital.Ifyouareaskedtofillinadditionalinformation")}}</p>
					<!--如果您被要求填写附加信息，请在此次填写，反正不需要填写-->
				</div>
				<!--数量-->
				<div class="tibi-Num">
					<span class="tibi-address-text">
					     {{$t("list.Number")}}
					</span>
					<div class="tibi-address-str">
						<input type="text" v-model="recharge.balance" @keyup="Numjudge($event)" />
						<span class="bz">{{currentCurrency.pageIdentifier}}</span>
					</div>
					<div class="tishi" v-show="NumjudgeIsShow">{{NumjudgeIsShowText}}</div>
				</div>
				<!--手续费-->
				<div class="tibi-procedures">
					<span class="tibi-address-text">
					    {{$t("list.Service_Charge")}}
					</span>
					<div class="tibi-address-str">
						<input type="text" :disabled="currentCurrency.propFixed==1" v-model="propCostNum" />
						<span class="bz">{{currentCurrency.pageIdentifier}}</span>
					</div>
				</div>
				<!--范围-->
				<div class="available" v-show="false">
					<span>范围:{{currentCurrency.propCost | number(currentCurrency.displayNum)}}-{{currentCurrency.propMaxCost | number(currentCurrency.displayNum)}}</span>
				</div>
				<!--到账数量-->
				<div class="tibi-Arrival">
					<span class="tibi-address-text">
					    {{$t("capital.Arrival")}}
					</span>
					<div class="tibi-address-str">
						<input type="text" v-model="product" disabled />
						<span class="bz">{{currentCurrency.pageIdentifier}}</span >
					</div>
				</div>
					<div class="FreeOfCharge">{{$t('capital.FreeOfCharge')}}</div>
						<!--提币按钮-->
						<div class="tibi_btn">
							<el-button @click="clickCurrency" type="primary" :disabled="!recharge.toAddress||!recharge.balance||!typeok">{{$t('capital.Withdraw')}}</el-button>
						</div>
					</div>
					<!--右侧提示部分-->
					<div class="tibi_content_right">
						<ul class="wenxin-tishi">
							<li>  {{$t("capital.Tips")}}</li>
							<li>• {{$t('capital.Mnimumamount')}}： {{moneyList.limit_min_count | number(moneyList.displayNum)}}{{currentCurrency.pageIdentifier}}。</li>
							<li>• {{$t("capital. Priceanquan")}}</li>
							<li>• {{$t("capital.Querenanquan")}}</li>
							<li>• {{$t("capital.tbTime")}}</li>
						</ul>
					</div>
					<div style="clear: both;"></div>

			</div>
			<!--提币记录-->
			<div class="Charge_record1" :class="{'Charge_record1_white':getColor==1}">
				<div class="Charge_record_title">
					<span>{{$t("capital.WithdrawHistory")}}</span>
          <div class="ref" @click="ref">
            <div class="ref_icon iconfont icon-shuaxin" id="ref_icon"></div>
            <div class="text">{{$t("Record.refresh")}}</div>
          </div>
						</div>
						<!--记录数据-->
						<ul class="Charge_record_content">
							<li>{{$t("capital.Withdrawaddress")}}</li>
							<li>{{$t("list.Number")}}</li>
							<li>{{$t("capital.UpdateTime")}}</li>
							<li class="tibi_title_type">{{$t("capital.Status1")}}</li>
						</ul>
						<ul class="Charge_record_content_list" v-for="item in Currency_record">
							<li>{{item.address}}</li>
							<li>{{item.balance | number(item.get_currency.displayNum)}}</li>
							<li>{{formatTime(item.created_at)}}</li>
							<li class="tibi_content_type">
								<span v-show="item.status==-1">{{$t("capital.Unapprove")}}</span>
								<span v-show="item.status==0">{{$t("capital.Processing")}}</span>
								<span v-show="item.status==1">{{$t("capital.Successfultransaction")}}</span>
							</li>
						</ul>
						<div class="pageCount" v-show="Currency_record.length>0">
							<div class="button">
								<el-pagination layout="prev, pager, next" background :page-size="topage" @current-change="pageChange" :total="total">
								</el-pagination>
							</div>
						</div>
						<!--暂无记录-->
						<div class="No_record" v-show="Currency_record.length==0" :class="{'No_record_white':getColor==1}">
							<p>{{$t("capital.NoWithdrawRecord")}}</p>
						</div>
					</div>
					<!--提币验证-->
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
									<!--安全验证-->
									<i class="iconfont icon-cuowu" @click="alertIsShow=false"></i>
								</div>
								<!--手机号验证-->
								<el-form>
									<div class="phone" v-if="userList.mobile_status==2">
										<dd class="isShowphone">
											<p class="title">{{$t("capital.thephonenumber")}}</p>
											<div class="text">{{userList.mobile}}</div>
										</dd>
										<div class="phone-ma">{{$t("capital.SMSverification")}}</div>
										<!--短信验证码-->
										<div class="oInput">
											<el-form-item id="you-yan">
												<el-input :rules="{
							      required: true, message:$t('capital.Theverifyingcodecannotbeempty'), trigger: 'blur'
							   }" v-model="phone_code" @keyup.native="phone_code=phone_code.replace(/\D/gi,'')"></el-input>
												<el-button id="getYan" :disabled="!sendAuthCode" @click="getPhoneYan()">
													<span v-show="sendAuthCode" class="auth_text auth_text_blue">{{$t("login.GetCode")}}</span>
													<span v-show="!sendAuthCode" class="auth_text"> <span class="auth_text_blue">{{auth_time}}</span>{{$t("login.secresend")}}</span>
												</el-button>
											</el-form-item>
											<p class="tishi-red" v-show="phoneNokong">{{phoneText}}</p>
										</div>
									</div>
									<!--邮箱验证码-->
									<div class="email" v-if="userList.email_status==2">
										<dd class="isShowphone">
											<p class="title"> {{$t("capital.Email")}}</p>
											<div class="text">{{userList.email}}</div>
										</dd>

										<div class="phone-ma">{{$t("login. Mailboxverificationcode")}}</div>
										<!--邮箱验证码-->
										<div class="oInput">
											<el-form-item id="you-yan" :rules="{
						      required: true, message:$t('capital.Theverifyingcodecannotbeempty'), trigger: 'blur'
						     }">
												<el-input v-model="email_code" @keyup.native="email_code=email_code.replace(/\D/gi,'')"></el-input>
												<el-button id="getYan" :disabled="!sendAuthCodeEmail" @click="getEmailYan()">
													<span v-show="sendAuthCodeEmail" class="auth_text auth_text_blue">{{$t("login.GetCode")}} </span>
													<!-- 获取验证码-->
													<span v-show="!sendAuthCodeEmail" class="auth_text"> <span class="auth_text_blue">{{email_time}}</span>{{$t("login.secresend")}}</span>
													<!-- 秒重新发送-->
												</el-button>
											</el-form-item>
											<p class="tishi-red" v-show="emailNokong">{{emailText}}</p>
										</div>
									</div>
									<!--谷歌验证码-->
									<div class="google" v-if="userList.google_status==2">
										<div class="phone-ma">{{$t("userCenter.GoogleVerifier")}} </div>
										<!--谷歌验证码-->
										<div class="oInput">
											<el-input :rules="{
							      required: true, message:$t('capital.Domainnamecannotbeempty'), trigger: 'blur'
							 }" v-model="google_code" @keyup.native="google_code=google_code.replace(/\D/gi,'')"></el-input>
											<p class="tishi-red" v-show="googleNokong">{{googleText}}</p>
										</div>
									</div>
								</el-form>
							</div>
							<!--确认  取消-->
							<div class="confirm_cancel">
								<dd @click="alertIsShow=false">{{$t("capital.Cancel")}}</dd>
								<!--取消-->
								<dd @click="confirmAnquan()">{{$t("capital.Confirm")}}</dd>
								<!--确认-->
							</div>
						</div>
					</div>

				</div>
</template>

<script>
	import axios from "axios";
	import { httpUrl } from "../../http_url/http_url";
	import $ from "jquery"
	export default {
		data() {
			return {
        typeok:true,
        // 地址状态
				isPromoteQuota: false,
				/*显示隐藏提升额度*/
				value: "",
				/*默认选项*/
				coin_matching: [],
				/*获取币种*/
				userList: {},
				/*获取用户信息*/
				/*提币传参*/
				recharge: {
					toAddress: "",
					/*地址*/
					balance: "",
					/*金额*/
					coin: "" /*手续费*/
				},
				total: 0,
				/*总条数*/
				topage: 10,
				/*显示条数*/
				/*获取当前币种的信息*/
				currentCurrency: {},
				/*可用余额*/
				available: "",
				/*提币记录*/
				Currency_record: [],
				currencySuccess: false,
				/*订单交易成功显示*/
				addressList: [],
				/*获取提币历史*/
				addressListIsShow: false,
				NumjudgeIsShow: false,
				/*显示输入数量不能超出限额*/
				NumjudgeIsShowText: "",
				/*提示内容*/
				addressError: false,
				/*提示地址错误*/
				moneyList: {},
				/*获取提币的信息--可用--限额--提升额度*/
				currencyErrorText: "",
				/*操作频繁返回错误*/
				currencyError: false,
				alertIsShow: false,
				/*弹框内容*/
				phone_code: "", ///获取手机验证码
				email_code: "", ///获取邮箱验证码
				google_code: "", //谷歌验证码
				/*获取用户信息*/
				sendAuthCode: true, ///是否禁用手机获取验证码
				sendAuthCodeEmail: true, //是否禁用邮箱获取验证码
				auth_time: 0, //获取手机验证码倒计时
				email_time: 0, //获取邮箱验证码倒计时
				emailNokong: false,
				/*提示*/
				phoneNokong: false,
				/*提示*/
				googleNokong: false,
				/*提示*/
				createIsShow: false,
				googleText: this.$t("capital.Theverifyingcodecannotbeempty"),
				/*谷歌提示内容*/
				phoneText: this.$t("capital.Theverifyingcodecannotbeempty"),
				/*手机提示内容*/
				emailText: this.$t("capital.Theverifyingcodecannotbeempty"),
				Addresslabel: "" /*地址标签*/
			}
		},
		computed: {
			// 计算属性的  计算手续费与数量的值
			product: function() {
				var num = parseFloat(this.recharge.balance) - parseFloat(this.propCostNum);
				if(num <= 0) {
					return "";
				} else if(isNaN(parseInt(num))) {
					return "";
				} else {
					return num.toFixed(this.moneyList.displayNum);
				}
			},
			propCostNum() {
				if(isNaN(this.moneyList.fee)) {
					this.moneyList.fee = 0.00;
					return this.moneyList.fee;
				} else {
					this.moneyList.fee = Number(this.moneyList.fee).toFixed(this.moneyList.displayNum);
					return this.moneyList.fee;
				}
			},
			RaiseTheAmount() { /*提升额度*/
				var num = 0; /*初始化0*/
				if(this.userList.email_status == 2) {
					num += 1;
				} else if(this.userList.google_status == 2) {
					num += 1;
				} else if(this.userList.pay_password_status == true) {
					num += 1;
				}
				if(num >= 2) {
					return false;
				}
				if(num < 2) {
					return true;
				}
			},
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
			var _this = this;
			/*获取在用币种列表*/
			axios.get(httpUrl.currencyWallet, {
				headers: {
					"Authorization": "Bearer " + _this.token
				}
			}).then(function(res) {
				_this.coin_matching = res.data.data;
				/*跳转默认显示*/
				if(_this.$route.params.key == undefined) {
					_this.value = _this.coin_matching[0].id; /*默认选项*/
					_this.currentCurrency = _this.coin_matching[0]; /*当前币种信息*/
				} else {
					_this.value = _this.$route.params.key;
					for(let i = 0; i < _this.coin_matching.length; i++) {
						if(_this.coin_matching[i].id == _this.$route.params.key) {
							_this.currentCurrency = _this.coin_matching[i]; /*当前币种信息*/
						}
					}
				}
				/*获取用户指定币种的余额*/
				axios.get(httpUrl.currencyBalance, {
					headers: {
						"Authorization": "Bearer " + _this.token
					},
					params: {
						currency_id: _this.value
					}
				}).then(function(res) {
					if(res.data.data.length == 0) {
						_this.available = 0.0000;
						_this.moneyList["fee"] = 0.0000;
						_this.moneyList["limit_max_count"] = 0.0000;
						_this.moneyList["limit_min_count"] = 0.0000;
						_this.moneyList["min_deposit_count"] = 0.0000;
						_this.moneyList["displayNum"] = 5;
					} else {
						_this.available = res.data.data.balance; /*获取到的可用余额*/
						_this.moneyList = res.data.data.currency; /*获取指定余额信息*/
					}
					if(res.data.status.code == -200) {
						_this.$message({
							message: res.data.status.message,
							type: 'error'
						});
					}
				}, function(err) {
					console.log(err)
				})
				/*获取交易记录*/
				axios.get(httpUrl.recharge, {
					headers: {
						"Authorization": "Bearer " + _this.token
					},
					params: {
						currency_id: _this.value,
						type: -1
					}
				}).then(function(res) {
					_this.Currency_record = res.data.data.data;
					_this.total = res.data.data.total;
					if(res.data.status.code == -200) {
						_this.$message({
							message: res.data.status.message,
							type: 'error'
						});
					}
				}, function(err) {
					console.log(err)
				})

				/*地址列表提示内容*/
				axios.get(httpUrl.addressList, {
					params: {
						currency_id: _this.value
					},
					headers: {
						"Authorization": "Bearer " + _this.token
					}
				}).then(function(res) {
					_this.addressList = res.data.data.data;
				}, function(err) {
					console.log(err)
				})

			}, function(err) {
				console.log(err)
			})
			/*获取用户信息*/
			axios.get(httpUrl.userInfo, {
				headers: {
					"Authorization": "Bearer " + _this.token
				}
			}).then(function(res) {
				_this.userList = res.data.data;
			}, function(err) {
				console.log(err)
			})

		},
		methods: {
		  ref(){
        let _this =this;
        /*刷新交易记录*/
        axios.get(httpUrl.recharge, {
          headers: {
            "Authorization": "Bearer " + _this.token
          },
          params: {
            currency_id: _this.value,
            type: -1
          }
        }).then(function(res) {
          _this.Currency_record = res.data.data.data;
          _this.total = res.data.data.total;
        }, function(err) {
          console.log(err)
        })

      },
			noTe(eve) { /*正则验证*/
				this.recharge.toAddress = eve.target.value.replace(/[^\w\.\/]/ig, '');
			},
			Numjudge(eve) { /*判断数量是否超过限额*/
				if(this.value == 11) {
					eve.target.value = eve.target.value.replace(/[^\d.]/g, ""); //清除"数字"和"."以外的字符
					eve.target.value = eve.target.value.replace(/\D/g, '').replace(/^0+(?=\d)/, ''); //清除"数字"和"."以外的字符
				} else {
					//得到第一个字符是否为负号
					eve.target.value = eve.target.value.replace(/[^\d.]/g, ""); //清除"数字"和"."以外的字符
					eve.target.value = eve.target.value.replace(/^\./g, ""); //验证第一个字符是数字而不是
					eve.target.value = eve.target.value.replace(/\.{2,}/g, "."); //只保留第一个. 清除多余的
					eve.target.value = eve.target.value.replace(".", "$#$").replace(/\./g, "").replace("$#$", ".");
					if(this.recharge.balance > parseFloat(this.moneyList.limit_max_count)) { /*判断如果大于*/
						this.NumjudgeIsShowText = this.$t("capital. Tafmcnetl"); //提币数量不能超出限额"
						this.NumjudgeIsShow = true;
						setTimeout(() => {
							this.NumjudgeIsShow = false;
							this.NumjudgeIsShowText = "";
						}, 1000)
						return false;
					}
					if(this.recharge.balance > parseFloat(this.available)) {
						this.NumjudgeIsShowText = this.$t("capital.Taomcnetb"); //提币数量不能超出可用余额"
						this.NumjudgeIsShow = true;
						setTimeout(() => {
							this.NumjudgeIsShow = false;
							this.NumjudgeIsShowText = "";
						}, 1000)
						return false;
					}
					if(this.recharge.balance < parseFloat(this.moneyList.limit_min_count)) {
						this.NumjudgeIsShowText = this.$t("capital.Taotcsnbltmaom"); //"提币数量不能低于最小提币数量"
						this.NumjudgeIsShow = true;
						setTimeout(() => {
							this.NumjudgeIsShow = false;
							this.NumjudgeIsShowText = "";
						}, 1000)
						return false;
					}
				}

			},
//验证 地址
      testval(){
        let reg=/^[A-Za-z0-9]{12}$/;
        if(this.value==73||this.value==16){
          if(reg.test(this.recharge.toAddress)) {
            this. typeok =true;
          }else {
            this. typeok =false;
          }
        }
      },
			blur() { /*延迟执行*/
				var _this = this;
       this.testval();
				setTimeout(function() {
					_this.addressListIsShow = false;
				}, 200)
			},
			confirmAnquan() { /*安全验证确认*/
				let _this = this;
				if(_this.phone_code == "" && _this.userList.mobile_status == 2) {
					_this.phoneNokong = true;
					setTimeout(function() {
						_this.phoneNokong = false;
					}, 1000)
					return false;
				}
				if(_this.email_code == "" && _this.userList.email_status == 2) {
					_this.emailNokong = true;
					setTimeout(function() {
						_this.emailNokong = false;
					}, 1000)
					return false;
				}
				if(_this.google_code == "" && _this.userList.google_status == 2) {
					_this.googleNokong = true;
					setTimeout(function() {
						_this.googleNokong = false;
					}, 1000)
					return false;
				}
				let obj = {
					currency_id: _this.value,
					address: _this.recharge.toAddress,
					amount: _this.recharge.balance,
					google_code: _this.google_code,
					mobile_code: _this.phone_code,
					email_code: _this.email_code
				};
				if(this.currentCurrency.isLabel == 1) {
					obj.tag = this.Addresslabel;
				}
				/*点击提币*/
				axios.post(httpUrl.sendForm, obj, {
					headers: {
						"Authorization": "Bearer " + _this.token
					}
				}).then(function(res) {
					if(res.data.status.code == 200) {
						_this.alertIsShow = false; /*弹框消失*/
						_this.phone_code = "";
						_this.email_code = "";
						_this.google_code = "";
						_this.recharge.balance = "";
						_this.recharge.toAddress = "";
						_this.currencySuccess = true;
						setTimeout(function() {
							_this.currencySuccess = false;
						}, 1000)
						/*获取用户指定币种的余额*/
						axios.get(httpUrl.currencyBalance, {
							headers: {
								"Authorization": "Bearer " + _this.token
							},
							params: {
								currency_id: _this.value
							}
						}).then(function(res) {
							_this.available = res.data.data.balance; /*获取到的可用余额*/
							_this.moneyList = res.data.data.currency; /*获取指定余额信息*/
							if(isNaN(_this.available)) {
								_this.available = 0
							}
						}, function(err) {
							console.log(err)
						})
						/*刷新交易记录*/
						axios.get(httpUrl.recharge, {
							headers: {
								"Authorization": "Bearer " + _this.token
							},
							params: {
								currency_id: _this.value,
								type: -1
							}
						}).then(function(res) {
							_this.Currency_record = res.data.data.data;
							_this.total = res.data.data.total;
						}, function(err) {
							console.log(err)
						})
					}
					if(res.data.status.message == "mobile_error") {
						_this.phoneText = _this.$t("capital.Svce"); //"短信验证码错误"
						_this.phoneNokong = true;
						setTimeout(function() {
							_this.phoneNokong = false;
						}, 1000)
					}
					if(res.data.status.message == "email_error") {
						_this.emailText = _this.$t("capital.Mvce"); //"邮箱验证码错误"
						_this.emailNokong = true;
						setTimeout(function() {
							_this.emailNokong = false;
						}, 1000)
					}
					if(res.data.status.message == "google_error") {
						_this.googleText = _this.$t("capital.Gvce"); //"谷歌验证码错误"
						_this.googleNokong = true;
						setTimeout(function() {
							_this.googleNokong = false;
						}, 1000)
					}
					if(res.data.status.code == -200) {
						_this.alertIsShow = false; /*弹框消失*/
						_this.phone_code = "";
						_this.email_code = "";
						_this.google_code = "";
						_this.recharge.balance = "";
						_this.recharge.toAddress = "";
						_this.currencyErrorText = _this.$t("otc.Actionfailure");
						_this.currencyError = true;
						setTimeout(function() {
							_this.currencyError = false;
						}, 1000)
					}
				}, function(err) {
					console.log(err)
				})
			},
			///获取手机验证码
			getPhoneYan() {
				var _this = this;
				if(this.sendAuthCode == "") {
					return false;
				}

				axios.post(httpUrl.Money_code, {
						type: 7,
						receiver_type: 0
					}, {
						headers: {
							"Authorization": "Bearer " + _this.token
						}
					})
					.then(function(res) {
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
				if(this.sendAuthCodeEmail == "") {
					return false;
				}
				axios.post(httpUrl.Money_code, {
						type: 7,
						receiver_type: 1
					}, {
						headers: {
							"Authorization": "Bearer " + _this.token
						}
					})
					.then(function(res) {

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
			clickCurrency() {
				var _this = this;
				_this.callback(); /*刷新token判断*/

        this.testval();
				if(_this.recharge.balance == 0) {
					return false;
				}
				if( _this.typeok==false){
				  return false
        }
				if(_this.available == 0) {
					$("#availableNum").css({
						"color": "#f56c6c"
					})
					setTimeout(function() {
						$("#availableNum").css({
							"color": "#ababe4"
						})
					}, 1500)
					return false;
				}
				if(this.recharge.balance > parseFloat(this.moneyList.limit_max_count)) { /*判断如果大于*/
					this.NumjudgeIsShowText = _this.$t("capital.Tafmcnetl")
					this.NumjudgeIsShow = true;
					this.recharge.balance = "";
					setTimeout(() => {
						this.NumjudgeIsShow = false;
						this.NumjudgeIsShowText = "";
					}, 1000)
					return false;
				}
				if(this.recharge.balance < parseFloat(this.moneyList.limit_min_count)) {
					this.NumjudgeIsShowText = _this.$t("capital.Taotcsnbltmaom")
					this.NumjudgeIsShow = true;
					this.recharge.balance = "";
					setTimeout(() => {
						this.NumjudgeIsShow = false;
						this.NumjudgeIsShowText = "";
					}, 1000)
					return false;
				}
				_this.alertIsShow = true; /*弹框显示出来*/

        setTimeout(function () {
          _this.ref();
        },5000)

        setTimeout(function () {
          /*刷新交易记录*/
          axios.get(httpUrl.recharge, {
            headers: {
              "Authorization": "Bearer " + _this.token
            },
            params: {
              currency_id: _this.value,
              type: -1
            }
          }).then(function(res) {
            _this.Currency_record = res.data.data.data;
            _this.total = res.data.data.total;
          }, function(err) {
            console.log(err)
          })
        },5000)

			},
			pageChange(val) {
				var _this = this;
				_this.callback(); /*刷新token判断*/
				axios.get(httpUrl.recharge, {
					params: {
						"page": val,
						currency_id: _this.value,
						type: -1
					},
					headers: {
						"Authorization": "Bearer " + _this.token
					}
				}).then(function(res) {
					_this.Currency_record = res.data.data.data;
				}, function(err) {
					console.log(err)
				})
			},
			change(id) {
				var _this = this;
				_this.callback(); /*刷新token判断*/
				for(let i = 0; i < _this.coin_matching.length; i++) {
					if(_this.coin_matching[i].id == id) {
						_this.currentCurrency = _this.coin_matching[i];
					}
				}
				/*获取用户指定币种的余额*/
				axios.get(httpUrl.currencyBalance, {
					headers: {
						"Authorization": "Bearer " + _this.token
					},
					params: {
						currency_id: id
					}
				}).then(function(res) {
					if(res.data.data.length == 0) {
						_this.available = "0.0000";
						_this.currentCurrency.displayNum = 5;
						_this.moneyList["fee"] = "0.0000";
						_this.moneyList["limit_max_count"] = "0.0000";
						_this.moneyList["limit_min_count"] = "0.0000";
						_this.moneyList["min_deposit_count"] = "0.0000";
						_this.moneyList["displayNum"] = 5;
					} else {
						_this.available = res.data.data.balance; /*获取到的可用余额*/
						_this.moneyList = res.data.data.currency; /*获取指定余额信息*/
					}

				}, function(err) {
					console.log(err)
				})
				/*获取交易记录*/
				axios.get(httpUrl.recharge, {
					headers: {
						"Authorization": "Bearer " + _this.token
					},
					params: {
						currency_id: id,
						type: -1
					}
				}).then(function(res) {
					_this.Currency_record = res.data.data.data;
					_this.total = res.data.data.total;
				}, function(err) {
					console.log(err)
				})
				/*获取历史地址列表*/
				axios.get(httpUrl.addressList, {
					params: {
						currency_id: _this.value
					},
					headers: {
						"Authorization": "Bearer " + _this.token
					}
				}).then(function(res) {
					_this.addressList = res.data.data.data;
				}, function(err) {
					console.log(err)
				})
			}
		}
	}
</script>

<style scoped>
 .erb{
   border: 1px solid red;
 }
  .ref{
    display: flex;
    flex-direction: row;
    width: 80px;
    color: #16b7bc;
    font-size: 14px;
    cursor: pointer;
  }
  .ref_icon{
    color: #16b7bc;
    font-size: 17px;
    height: 20px;
    line-height: 20px;
    margin-top: 11px;
    margin-right: 3px;
  }

</style>

<style lang="scss">
	/*白色版本开始*/

	.tibi_content_white {
		background: #fff !important;
		color: #000 !important;
		border: 2px solid #ddd !important;
		border-top: none !important;
		.el-input__inner {
			background: #fff !important;
			color: #000 !important;
		}
		.tibi-address-str {
      position: relative;


			input {
				background: #fff !important;
				color: #000 !important;
			}
		}
		/*提币地址*/
		.addressList {
			background: #fff !important;
			border: 1px solid #ddd;
			li {
				border-bottom: 1px solid #ddd !important;
				.Remarks {
					color: #333 !important;
				}
				.address {
					color: #666 !important;
				}
			}
			li:hover {
				background: #eee !important;
			}
		}
	}
	/*提示白版样式*/
.usema{
  margin-top: 10px;
}
	.tishi_white {
		background: #fff !important;
		box-shadow: 2px 2px 5px #666 !important;
		color: #000 !important;
	}

	.PromoteQuota_white {
		.PromoteQuota-content {
			background: #fff !important;
			color: #000 !important;
			.PromoteQuota-content-title {
				border-bottom: 1px solid #ddd !important;
			}
		}
	}
	/*弹框内容白色版本*/

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
		.auth_text{
			color: #000 !important;
		}
		.el-button--default {
			color: #000 !important;
			/*border-left: 1px solid #ddd !important;*/
		}
		.confirm_cancel {
			border-top: 1px solid #ddd !important;
			dd:nth-of-type(1) {
				border-right: 1px solid #ddd !important;
			}
		}
	}

	.No_record_white {
		color: #000 !important;
	}

	.Charge_record1_white {
		background: #fff !important;
		.Charge_record_content {
			li:nth-of-type(1) {
				box-sizing: border-box;
				padding-left: 10px !important;
			}
		}
		.Charge_record_title {
			border-bottom: 1px solid #eee !important;
		}
		.Charge_record_content_list {
			li {
				color: #000 !important;
			}
			li:nth-of-type(1) {
				box-sizing: border-box;
				padding-left: 10px !important;
			}
		}
	}
	/*白色版本结束*/
	/*验证错误提示*/

	.tishi-red {
		width: 100%;
		height: 15px;
		line-height: 25px;
		color: #f56c6c;
	}
	/*安全验证弹框部分*/

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
		.confirm_cancel {
			width: 100%;
			height: 56px;
			line-height: 56px;
			border-top: 1px solid #454167;
			margin-top: 30px;
			dd {
				width: 50%;
				height: 56px;
				box-sizing: border-box;
				float: left;
				text-align: center;
				cursor: pointer;
				font-size: 15px;
			}
			dd:nth-of-type(1) {
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
					height: 50px;
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
						margin-top: 10px !important;
					}
				}
				.google {
					@extend .phone;
				}
			}
		}
	}
	/*弹框内容结束*/
	/*媒体查询*/

	@media only screen and (max-width: 1280px) {
		.tibi_content_right {
			margin-left: 50px !important;
		}
	}

	@media only screen and (max-width: 1233px) {
		.Charge_record_content_list .type {
			padding-right: 0px !important;
		}
	}
	/*边框内部*/

	.border_nei {
		width: 100%;
		height: 100%;
		box-sizing: border-box;
		border: 3px solid #0b0b15;
	}
	/*提升额度*/

	.PromoteQuota {
		width: 100%;
		height: 100%;
		position: fixed;
		top: 0;
		left: 0;
		z-index: 100;
		background: rgba(0, 0, 0, 0.5);
		.PromoteQuota-content {
			width: 450px;
			height: 280px;
			background: #222140;
			box-sizing: border-box;
			position: fixed;
			left: 38%;
			top: 30%;
			padding: 0 10px;
			/*头部*/
			.PromoteQuota-content-title {
				width: 100%;
				height: 55px;
				line-height: 55px;
				border-bottom: 1px solid #454167;
				span {
					float: left;
					font-size: 16px;
				}
				.iconfont {
					float: right;
					cursor: pointer;
				}
			}
			/*请您先完成如下操作*/
			.operation {
				width: 100%;
				height: 40px;
				color: #7a74c3;
				line-height: 40px;
			}
			/*双重身份验证*/
			.double {
				width: 100%;
				height: 50px;
				line-height: 50px;
				margin-top: 20px;
				li {
					.iconfont {
						font-size: 14px;
						color: #ae4e54;
						float: left;
						margin-right: 10px;
					}
					a {
						float: right;
						color: #7a74c3;
						margin-right: 15px;
					}
				}
			}
		}
	}
	/*提币*/

	#tibi {
		width: 100%;
		position: relative;
		color: #fff;
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
		.el-form-item {
			margin-bottom: 0;
		}
		.el-button {
			color: #fff;
		}
		.currencySuccess {
			position: absolute;
			left: 35%;
			top: 20%;
			width: 300px;
			height: 115px;
			background: #fff;
			color: #000;
			text-align: center;
			border-top: 5px solid #22d9b8;
			z-index: 99;
			p:nth-of-type(1) {
				margin-top: 40px;
				margin-bottom: 10px;
				.iconfont {
					color: #22d9b8;
					font-size: 20px;
				}
			}
		}
		.currencyError {
			@extend .currencySuccess;
			border-top: 5px solid #EB5A3C;
			p:nth-of-type(1) {
				.iconfont {
					color: #EB5A3C;
					font-size: 20px;
				}
			}
		}
		/*分页样式*/
		.el-pagination.is-background .el-pager li.active {
			background: #9F99F2;
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
		/*提示成功*/
	}
	/*提币头部*/

	.tibi_title {
		width: 100%;
		height: 45px;
		line-height: 45px;
		.tibi_title_text {
			display: inline-block;
			padding: 0 35px;
			text-align: center;
			font-size: 15px;
			background: #272867;
		}
	}
	/*提币记录*/

	.Charge_record1 {
		width: 100%;
		margin-top: 20px;
		background: #16182c;
		.Charge_record_title {
			width: 100%;
			height: 40px;
			line-height: 40px;
			box-sizing: border-box;
			padding-left: 10px;
			border-bottom: 1px solid #2c3983;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      font-size: 16px;
			span {
				display: inline-block;
				height: 40px;
				font-size: 14px;
				color: #9791e8;
				box-sizing: border-box;
				border-bottom: 2px solid #9791e8;
			}
		}
		/*分页*/
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
		/*记录的数据*/
		.Charge_record_content,
		.Charge_record_content_list {
			width: 100%;
			height: 40px;
			box-sizing: border-box;
			padding-left: 10px;
			li {
				width: 23%;
				height: 40px;
				float: left;
				color: #7a74c3;
				line-height: 40px;
				text-align: center;
			}
			li:nth-of-type(1) {
				width: 30%;
				text-align: left;
			}
			.tibi_title_type {
				padding-right: 10px;
			}
			.tibi_content_type {
				padding-right: 20px;
			}
			li:nth-last-of-type(1) {
				text-align: right;
				box-sizing: border-box;
			}
		}
		.Charge_record_content_list {
			li {
				color: #fff;
			}
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
	/*提币内容*/

	.tibi_content {
		width: 100%;
		box-sizing: border-box;
		background: #16182c;
		border-top: none;
		/*左侧表单部分*/
		.tibi_content_left {
			width: 450px;
			position: relative;
			float: left;
			.tiShi {
				position: absolute;
				left: 50%;
				top: 20%;
				width: 100px;
				height: 35px;
				line-height: 35px;
				text-align: center;
				z-index: 1000;
				color: #fff;
				font-size: 14px;
				background: #414182;
				box-shadow: 2px 2px 5px #000;
			}
		}
		/*右侧温馨提示部分*/
		.tibi_content_right {
			float: left;
			margin-left: 100px;
			.wenxin-tishi {
				width: 350px;
				margin-top: 100px;
				color: #9191c2;
				li:nth-of-type(1) {
					height: 20px;
					box-sizing: border-box;
					padding-left: 10px;
				}
				li {
					width: 100%;
					line-height: 20px;
					margin-top: 5px;
				}
			}
		}
		/*选择内容*/
		.select {
			width: 100%;
			height: 80px;
			line-height: 80px;
			display: flex;
			.select_title {
				flex: .2;
				text-align: center;
				display: inline-block;
				font-size: 15px;
			}
			.select_bz {
				flex: .8;
				height: 80px;
			}
		}

		/*提币地址*/
		.tibi-address {
			width: 100%;
			display: flex;
			height: 60px;
			position: relative;
			line-height: 60px;
			.tibi-address-text {
				flex: .2;
				text-align: center;
				display: inline-block;
				height: 60px;
				line-height: 60px;
				font-size: 15px;
			}
      .usestr{
        position: relative;
        .err{
          color: #f56c6c;
          top: 60px;
          line-height: 10px;
          font-size: 10px;
          position: absolute;
        }
      }
			.tibi-address-str {
				flex: .8;
				height: 40px;
				float: left;


				input {
					width: 360px;
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
			/*提示内容部分*/
			.addressList {
				width: 358px;
				height: 300px;
				overflow-y: auto;
				position: absolute;
				left: 95px;
				top: 60px;
				z-index: 999;
				background: #3a3e79;
				li {
					width: 100%;
					height: 70px;
					cursor: pointer;
					border-bottom: 1px solid #2e3263;
					p {
						width: 100%;
						height: 35px;
						overflow: hidden;
						white-space: normal;
						text-overflow: ellipsis;
						line-height: 35px;
						font-size: 14px;
						box-sizing: border-box;
						padding-left: 10px;
					}
				}
				li:hover {
					background: #34376f;
					color: #9f9dfa;
				}
				li:nth-last-child(1) {
					border-bottom: none;
				}
			}
		}
    .tibi-ArrivalAddresslabel{
      @extend .tibi-address;
      .tibi-address-text{
        min-width: 100px;
      }
      .tibi-address-str{
        input{
          width: 100%;
        }
      }
    }
		/*可用限额*/
		.available {
			width: 100%;
			text-align: right;
			color: #ababe4;
			span {
				margin-left: 10px;
			}
			.ts-ed {
				cursor: pointer;
			}
		}
		.cause {
			@extend .available;
			position: relative;
			span {
				color: #f56c6c;
			}
			.What {
				color: #ababe4;
				cursor: pointer;
			}
			.What:hover+p {
				display: block;
			}
			p {
				position: absolute;
				right: -50px;
				top: -60px;
				z-index: 10;
				width: 200px;
				height: 50px;
				line-height: 20px;
				box-sizing: border-box;
				padding-top: 5px;
				padding-left: 5px;
				text-align: left;
				background: #2c377c;
				border-radius: 4px;
				color: #fff;
				display: none;
			}
		}
		/*提币数量*/
		.tibi-Num {
			@extend .tibi-address;
			position: relative;
			margin-top: 10px;
			.tibi-address-str {
				position: relative;

				.bz {
					position: absolute;
					right: 10px;
					top: 2px;
				}
			}
			.tishi {
				/*提示内容*/
				position: absolute;
				top: 33px;
				right: 0px;
				color: #f56c6c;
			}
		}
		/*提币手续费*/
		.tibi-procedures {
			@extend .tibi-Num;
		}
		/*到账数量*/
		.tibi-Arrival {
			@extend .tibi-Num;
		}

		.FreeOfCharge{
			width: 100%;
			line-height: 20px;
			padding-left: 90px;
			color: #f56c6c;
		}
		/*提币按钮*/
		.tibi_btn {
			width: 100%;
			text-align: right;
			margin-bottom: 20px;
			button {
				width: 110px;
				height: 40px;
				background: #6666fa;
				border-color: #6666fa;
				color: #fff;
				border-radius: 4px;
				font-size: 15px;
				margin-top: 20px;
			}
		}
	}
</style>
