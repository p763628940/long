<template>
	<div id="Account_security">
		<!--显示绑定微信成功提示内容   绑定银行卡成功提示内容   绑定支付宝成功提示内容bindingSuccessShow-->
		<div class="binding-success" :class="{'binding_success_white':getColor==1}" v-show="bindingSuccessShow">
			<i class="iconfont icon-duihao2"></i> {{bindingSuccess}}
		</div>
		<!--loading效果-->
		<div class="loading" v-show="binding">
			<loading></loading>
		</div>
		<!--账户安全设置-->
		<div class="mb" v-show="BoundFundsIsShow"></div>
		<div class="Bound_funds" v-show="BoundFundsIsShow" :class="{'Bound_funds_white':getColor==1}">
			<!--头部内容-->
			<div class="Bound_funds_title">
				<div class="text">
					<span>{{$t("userCenter.importanthint")}}</span>
					<i class="iconfont icon-cuowu" @click="BoundFundsIsShow=false"></i>
				</div> 
			</div>
			<!--内容部分-->
			<div class="Bound_funds_content">
				{{$t("userCenter.Fundspassword")}}
				<span @click="BoundFunds()">{{$t("userCenter.Gotosettings")}}</span>
			</div>
			<div style="clear: both;"></div>
			<!--内容底部-->
			<div class="Bound_funds_bottom">
				<p @click="BoundFundsIsShow=false">{{$t("userCenter.Cancel")}}</p>
				<p @click="BoundFunds()">{{$t("userCenter.determine")}}</p>
			</div>
		</div>
		<div class="account">
			<p>{{$t("userCenter.accountsecurity")}}</p>
		</div>
		<!--账户安全设置-->
		<!--绑定银行卡内容-->

		<ul class="Bank-box" :class="{'Bank_box_white':getColor==1}">
				<li class="Bank-box-title">
					<p class="Bank-box-title-left">
						<i class="iconfont icon-iconfontjikediancanicon20" :class="{'yhk-white':getColor==1}"></i> {{$t("userCenter.BankTransfer")}}
					</p>
					<p class="Bank-title"><span class="name">{{transaction.userInfo}}</span>{{bankNumber1}}</p>
					<p class="Bank-box-title-right" @click="BankTransferIsShow">
						<span v-show="userList.bank_status==0">{{$t("userCenter.Binding")}}</span>
						<span v-show="userList.bank_status==1 || userList.bank_status== -1">{{$t("userCenter.Modify")}}</span>
					</p>
					<p class="Bank-box-title-right1" v-show="userList.bank_status==1 || userList.bank_status== -1">
						<el-switch v-model="value3" :active-text="$t('userCenter.display')" :inactive-text="$t('userCenter.hide')" @change="bindingShow(value3,DisplayID1)">
						</el-switch>
					</p>
				</li>
				<div style="clear: both;"></div>
				<!--银行卡内容-->
				<div class="Bank-box-content" v-show="BankTransfer">
					<!--提示内容部分-->
					<div class="Bank-box-xinxi" v-show="BankTextShow">{{hint_content}}</div>
					<el-form :model="numberValidateForm" ref="numberValidateForm" label-width="100px" class="demo-ruleForm">
						<!--银行卡号-->
						<el-form-item prop="name">
							<span class="Bank-box-title-text">{{$t("userCenter.Names")}}</span>
							<el-input type="name" v-model="userList.trueName" :disabled="true" auto-complete="off"></el-input>
						</el-form-item>
						<!--开户行-->
						<div class="kai-hu">
							<span class="Bank-box-title-text">{{$t("userCenter.BankName")}}</span>
							<div class="select">
								<el-select v-model="value" :placeholder="$t('userCenter.Pleasechoose')">
									<el-option v-for="item in options" :key="item.id" :label="item.bankName" :value="item.id">
									</el-option>
								</el-select>
							</div>
						</div>
						<!--开户支行-->
						<el-form-item prop="Branch" :rules="[
				      { required: true, message:$t('userCenter.EnterBankBranch')}
				    ]">
							<span class="Bank-box-title-text">{{$t("userCenter.BankBranch")}}</span>
							<el-input type="Branch" v-model="numberValidateForm.Branch"  auto-complete="off"></el-input>
						</el-form-item> 
						<!--银行卡号码-->
						<el-form-item prop="Bankcardnumber" :rules="[
				      { required: true, message:$t('userCenter.Enterbankcardnu')}
				    ]">
							<span class="Bank-box-title-text">{{$t("userCenter.BankCardNo")}}</span>
							<el-input type="Bankcardnumber" v-model="numberValidateForm.Bankcardnumber" @keyup.native="Num($event)" maxlength="19" auto-complete="off"></el-input>
						</el-form-item>
						<!--确认卡号-->
						<el-form-item prop="confirmCard" :rules="[
				      { required: true, message: $t('userCenter.ConfirmBank')}
				    ]" class="confirmCard">
							<span class="Bank-box-title-text">{{$t("userCenter.ConfirmBank")}}</span>
							<el-input type="confirmCard" v-model="numberValidateForm.confirmCard" maxlength="19" @keyup.native="Num1($event)" auto-complete="off"></el-input>
							<span class="tishi" v-show="IsconfirmCard">{{IsconfirmCardText}}</span>
						</el-form-item>
						<!--资金密码-->
						<el-form-item prop="password" :rules="[
				      { required: true, message:$t('otc.Pleasepassword')}
				    ]">
							<span class="Bank-box-title-text">{{$t("otc.FundPassword")}}</span>
							<el-input type="password" v-model="numberValidateForm.password" @keyup.native="numberValidateForm.password=numberValidateForm.password.replace(/\ /gi,'')" auto-complete="off"></el-input>
						</el-form-item>
						<!--资金密码-->
						<div class="zijin_pass" v-show="zijinPassError" :class="{'tishi_white':getColor==1}">
							{{zijinPassErrorText}}
						</div>
						<!--提交按钮-->
						<el-form-item class="ti-jiao">
							<el-button @click="resetForm('numberValidateForm')">{{$t("userCenter.Cancel")}}</el-button>
							<el-button type="primary" @click="submitForm('numberValidateForm')">{{$t("login.Submit1")}}</el-button>
						</el-form-item>
					</el-form>
				</div>
		</ul>
		<!--微信-->
		<ul class="WeChat-box" :class="{'WeChat_box_white':getColor==1}">
				<li class="Bank-box-title">
					<p class="Bank-box-title-left">
						<i class="iconfont icon-weixin" :class="{'wx-white':getColor==1}"></i> {{$t("userCenter.WechatPayment")}}
					</p>
					<p class="Bank-title"><span class="name">{{transaction.userInfo}}</span>{{bankNumber2}}</p>
					<p class="Bank-box-title-right" @click="BindingIsWeChat">
						<span v-show="userList.wxpay_status==0">{{$t("userCenter.Binding")}}</span>
						<span v-show="userList.wxpay_status==1 || userList.wxpay_status== -1">{{$t("userCenter.Modify")}}</span>
					</p>
					<p class="Bank-box-title-right1" v-show="userList.wxpay_status==1 || userList.wxpay_status== -1">
						<el-switch v-model="value4" :active-text="$t('userCenter.display')" :inactive-text="$t('userCenter.hide')" @change="bindingShow(value4,DisplayID2)">
						</el-switch>
					</p>
				</li>
				<div style="clear: both;"></div>
				<!--微信内容BindingWeChat-->
				<div class="Bank-box-content" v-show="BindingWeChat">
					<el-form :model="WeChatList" ref="WeChatList" label-width="100px" class="demo-ruleForm">
						<!--收款人姓名-->
						<el-form-item prop="name">
							<span class="Bank-box-title-text">{{$t("userCenter.PayeeName")}}</span>
							<el-input type="name" v-model="userList.trueName" :disabled="true" auto-complete="off"></el-input>
						</el-form-item>
						<!--微信支付-->
						<el-form-item prop="Account" :rules="[
				      { required: true, message:$t('userCenter.EnterWeChataccount')}
				    ]">
							<span class="Bank-box-title-text">{{$t("userCenter.WechatAccount")}}</span>
							<el-input type="Account" v-model="WeChatList.Account" auto-complete="off"></el-input>
						</el-form-item>
						<!--资金密码-->
						<el-form-item prop="password" :rules="[
				      { required: true, message:$t('otc.Pleasepassword')}
				    ]">
							<span class="Bank-box-title-text">{{$t("otc.FundPassword")}}</span>
							<el-input type="password" v-model="WeChatList.password" auto-complete="off"></el-input>
						</el-form-item>
						<!--收款码-->
						<div class="Receipt-code">
							<span class="Bank-box-title-text">{{$t("userCenter.Collectioncode")}}</span>
							<div class="Uploading_files">
								<div class="Uploading_files_left">
									<p v-show="SelectWeChatImg">
										<i class="iconfont icon-shangchuan"></i>
										<span>{{$t("userCenter.Pleaseselect")}}.jpg.png.jpeg</span>
									</p>
									<p v-show="!SelectWeChatImg">
										<i class="iconfont icon-tupian"></i>
										<span>{{SelectWeChatText}}</span>
									</p>
								</div>
								<input type="file" @change="getFile($event)" accept="image/png,image/gif,image/jpg,image/jpeg" class="WeChat-file" />
								<span class="alert-tishi" v-show="WeChatTishiShow" :class="{'tishi_white':getColor==1}">{{WeChatImgTishi}}</span>
							</div>
							<div style="clear: both;"></div>
						</div>
						<!--提交按钮-->
						<el-form-item class="ti-jiao">
							<el-button @click="resetFormWeChat('WeChatList')">{{$t("userCenter.Cancel")}}</el-button>
							<el-button type="primary" @click="submitFormWeChat('WeChatList')">{{$t("login.Submit1")}}</el-button>
						</el-form-item>

					</el-form>
				</div>
		</ul>
		<!--支付宝-->
		<ul class="Alipay-box" :class="{'Alipay_box_white':getColor==1}">
				<li class="Bank-box-title">
					<p class="Bank-box-title-left">
						<i class="iconfont icon-zhifubao" :class="{'zfb-white':getColor==1}"></i>{{$t("userCenter.Alipay")}}&nbsp;&nbsp;&nbsp;
					</p>
					<p class="Bank-title"><span class="name">{{transaction.userInfo}}</span>{{bankNumber3}}</p>
					<p class="Bank-box-title-right" @click="BindingIsAlipay">
						<span v-show="userList.alipy_status==0">{{$t("userCenter.Binding")}}</span>
						<span v-show="userList.alipy_status==1 || userList.alipy_status== -1">{{$t("userCenter.Modify")}}</span>
					</p>
					<p class="Bank-box-title-right1" v-show="userList.alipy_status==1 || userList.alipy_status== -1">
						<el-switch v-model="value5" :active-text="$t('userCenter.display')" :inactive-text="$t('userCenter.hide')" @change="bindingShow(value5,DisplayID3)">
						</el-switch>
					</p>
				</li>
				<div style="clear: both;"></div>
				<!--支付宝内容BindingAlipay-->
				<div class="Bank-box-content" v-show="BindingAlipay">
					<el-form :model="AlipayList" ref="AlipayList" label-width="100px" class="demo-ruleForm">
						<!--收款人姓名-->
						<el-form-item prop="name">
							<span class="Bank-box-title-text">{{$t("userCenter.PayeeName")}}</span>
							<el-input type="name" v-model="userList.trueName" :disabled="true" auto-complete="off"></el-input>
						</el-form-item>
						<!--微信支付-->
						<el-form-item prop="Account" :rules="[
				      { required: true, message: $t('userCenter.EAlipayaccount')}
				    ]">
							<span class="Bank-box-title-text">{{$t("userCenter.Alipayaccount")}}</span>
							<el-input type="Account" v-model="AlipayList.Account" auto-complete="off"></el-input>
						</el-form-item>
						<!--资金密码-->
						<el-form-item prop="password" :rules="[
				      { required: true, message:$t('otc.Pleasepassword')}
				    ]">
							<span class="Bank-box-title-text">{{$t("otc.FundPassword")}}</span>
							<el-input type="password" v-model="AlipayList.password" auto-complete="off"></el-input>
						</el-form-item>
						<!--收款码-->
						<div class="Receipt-code">
							<span class="Bank-box-title-text">{{$t("userCenter.Collectioncode")}}</span>
							<div class="Uploading_files">
								<div class="Uploading_files_left">
									<p v-show="SelectAlipayImg">
										<i class="iconfont icon-shangchuan"></i>
										<span>{{$t("userCenter.Pleaseselect")}}.jpg.png.jpeg</span>
									</p>
									<p v-show="!SelectAlipayImg">
										<i class="iconfont icon-tupian"></i>
										<span>{{SelectAlipayText}}</span>
									</p>
								</div>
								<input type="file" @change="getFile1($event)" class="WeChat-file" accept="image/png,image/gif,image/jpg,image/jpeg" />
								<span class="alert-tishi" v-show="AlipayTishiShow">{{AlipayImgTishi}}</span>
							</div>
							<div style="clear: both;"></div>
						</div>
						<!--提交按钮-->
						<el-form-item class="ti-jiao">
							<el-button @click="resetFormAlipay('AlipayList')">{{$t("userCenter.Cancel")}}</el-button>
							<el-button type="primary" @click="submitFormAlipay('AlipayList')">{{$t("login.Submit1")}}</el-button>
						</el-form-item>
					</el-form>
				</div>
		</ul>
		<!--蒙版部分-->
		<div class="force" v-show="isShowUser" :class="{'force_white':getColor==1}">
			<div class="force-content">
				<div class="force-text">
					<!--实名认证头部-->
					<div class="force-title">
						<span>{{$t("userCenter.Verified")}}</span>
						<i class="iconfont icon-cuowu" @click="$router.go(-1)"></i>
					</div>
					<!--告诉-->
					<div class="force-box">
						{{$t("userCenter.Foryourfinancial")}}<span class="renz" @click="clickGo">{{$t("userCenter.Nowgoto")}}</span>
					</div>
					<!--确认按钮和取消按钮-->
					<div class="confirm-cancel">
						<p @click="$router.go(-1)">{{$t("userCenter.Cancel")}}</p>
						<p @click="clickGo">{{$t("userCenter.determine")}}</p>
						<!--<router-link to="/index/userCenter/identity"  tag="p"></router-link>-->
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import { httpUrl } from "../../http_url/http_url";
	import { Message } from 'element-ui'; /*消息提示*/
	import axios from "axios";
	import loading from "../../public/loading" /*loading效果*/
	export default {
		data() {
			return {
				BoundFundsIsShow: false,
				/*设置资金密码弹框*/
				isShowUser: false,
				/*提示用户绑定身份证*/
				bindingSuccess: "",
				/*绑定  银行卡  微信  支付宝*/
				bindingSuccessShow: false,
				/*显示绑定成功*/
				userImg: "img",
				userList: {},
				zijinPassError: false,
				/*资金密码显示错误*/
				zijinPassErrorText: "",
				/*资金密码错误*/
				/*用户列表*/
				bankNumber1: "",
				/*银行卡号*/
				DisplayID1: "",
				/*对应ID*/
				bankNumber2: "",
				/*微信号*/
				DisplayID2: "",
				/*对应ID*/
				bankNumber3: "",
				/*支付号码*/
				DisplayID3: "",
				/*对应ID*/
				transaction: {},
				/*获取交易方式列表*/
				hint_content: "",
				/*提示内容部分*/
				IsconfirmCard: false,
				IsconfirmCardText: this.$t("userCenter.CardNumberDiffers"),
				/*判断俩次输入银行卡是否一致*/
				numberValidateForm: {
					/*银行转账*/
					name: '',
					/*姓名*/
					Branch: '',
					/*开户支行*/
					Bankcardnumber: '',
					/*银行卡号*/
					confirmCard: '',
					/*确认银行卡号*/
					password: "",
					/*资金密码*/
				},
				/*下拉列表*/
				options: [],
				value: '',
				/*选中的开户行ID值*/
				BankTextShow: false,
				/*提示内容*/
				BankTransfer: false,
				/*隐藏绑定银行内容*/
				value3: false,
				/*switch显示或者隐藏*/
				WeChatList: {
					/*微信支付内容*/
					Account: "",
					/*账号*/
					password: "",
					/*密码*/
					file: ""
				},
				AlipayList: {
					/*支付宝支付内容*/
					Account: "",
					/*账号*/
					password: "",
					/*密码*/
					file: ""
				},
				BindingWeChat: false,
				BindingAlipay: false,
				/*绑定微信*/
				value4: false,
				value5: false,
				/*switch显示或者隐藏*/
				SelectWeChatImg: true,
				SelectAlipayImg: true,
				/*显示/隐藏二维码*/
				SelectWeChatText: "",
				SelectAlipayText: "",
				/*用户上传的二维码文件名称*/
				WeChatImgTishi: "",
				AlipayImgTishi: "",
				/*用户上传不是图片提示错误    用户上传文件大于2M提示错误   */
				WeChatTishiShow: false,
				AlipayTishiShow: false,
				/*提示的显示隐藏*/
				Alifile: "",
				/*支付宝*/
				WeChatfile: "",
				/*微信*/
				binding: false /*绑定*/
			}
		},
		components: {
			"loading": loading
		},
		mounted() {
			///获取开户行
			var _this = this;
			axios.get(httpUrl.bankList, {
				headers: {
					"Authorization": "Bearer " + _this.token
				}
			}).then(function(res) {
				_this.options = res.data.data;
				if(res.data.status.code == -200) {
					_this.$message({
						message: res.data.status.message,
						type: 'error'
					});
				}
			}, function(err) {
				console.log(err)
			})
			/*获取用户信息*/
			axios.get(httpUrl.userInfo, {
				headers: {
					"Authorization": "Bearer " + this.token
				}
			}).then(function(res) {

				/*判断用户的是否输入身份证*/
				//				if(res.data.data.idCard == "") {
				//					_this.isShowUser = true;
				//					return false;
				//				}
				//				//判断用户是否绑定资金密码
				//				if(res.data.data.pay_password_status==false){
				//					_this.BoundFundsIsShow = true;
				//					return false;
				//				}
				_this.userList = res.data.data;
				if(_this.userList.bank_status == 1) {
					_this.value3 = true;
				}
				if(_this.userList.wxpay_status == 1) {
					_this.value4 = true;
				}
				if(_this.userList.alipy_status == 1) {
					_this.value5 = true;
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
			/*获取交易方式      银行卡    微信   支付宝*/
			axios.get(httpUrl.getReceipList, {
				headers: {
					"Authorization": "Bearer " + _this.token
				},
				params: {
					"type": 0
				}
			}).then(function(res) {
				_this.transaction = res.data.data;
				///遍历交易方式
				for(let i = 0; i < _this.transaction.list.length; i++) {
					if(_this.transaction.list[i].bankType == 0) { /*银行卡*/
						_this.bankNumber1 = _this.transaction.list[i].bankNumber;
						_this.DisplayID1 = _this.transaction.list[i].id;
					} else if(_this.transaction.list[i].bankType == 1) { /*微信*/
						_this.bankNumber2 = _this.transaction.list[i].bankNumber;
						_this.DisplayID2 = _this.transaction.list[i].id;
					} else if(_this.transaction.list[i].bankType == 2) { /*支付宝*/
						_this.bankNumber3 = _this.transaction.list[i].bankNumber;
						_this.DisplayID3 = _this.transaction.list[i].id;
					}
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

		},
		methods: {
			BankTransferIsShow() { /*绑定银行卡判断有无绑定资金密码*/
				let _this = this;
				if(_this.userList.pay_password_status == false) {
					_this.BoundFundsIsShow = true;
					return false;
				} else {
					this.BankTransfer = !this.BankTransfer;
				}
			},
			BindingIsWeChat() {
				let _this = this;
				if(_this.userList.pay_password_status == false) {
					_this.BoundFundsIsShow = true;
					return false;
				} else {
					this.BindingWeChat = !this.BindingWeChat;
				}
			},
			BindingIsAlipay() {
				let _this = this;
				if(_this.userList.pay_password_status == false) {
					_this.BoundFundsIsShow = true;
					return false;
				} else {
					this.BindingAlipay = !this.BindingAlipay
				}
			},
//			chinese(eve) { /*只允许输入中文*/
//				this.numberValidateForm.Branch = eve.target.value.replace(/[^\u4E00-\u9FA5]/g, '');
//			},
			Num(eve) { /*只允许输入数字*/
				this.numberValidateForm.Bankcardnumber = eve.target.value.replace(/\D/gi, "");
			},
			Num1(eve) { /*只允许输入数字*/
				this.numberValidateForm.confirmCard = eve.target.value.replace(/\D/gi, "");
			},
			BoundFunds() { /*设置资金密码*/
				this.BoundFundsIsShow = false;
				this.$router.push({
					name: "Accountsecurity",
					params: {
						bangdin: "yes"
					}
				})
			},
			clickGo() { /*绑定身份证*/
				this.isShowUser = false;
				this.$router.push({
					name: "identity",
					params: {
						type: "Jump"
					}
				});
			},
			getFile1(e) {
				/*支付宝添加*/
				var file = e.target.files[0];
				this.Alifile = e.target.files[0];
				/*判断用户是否上传的为图片*/
				if((!/image\/\w+/.test(file.type))) {
					this.AlipayImgTishi = _this.$t("ApplicationCoin.UploadedIsNotPhoto");
					this.AlipayTishiShow = true;
					setTimeout(() => {
						this.AlipayTishiShow = false;
					}, 1000)
					return false;
				}
				//判断用户上传的图片大小
				if(file.size > 2 * 1024 * 1024) {
					alert(_this.$t("userCenter.UploadedPhoLargeselect"));
					return false;
				}
				//提示用户上传文件
				if(file.name != "") {
					this.SelectAlipayImg = false;
					this.SelectAlipayText = file.name;
				}
			},
			getFile(e) {
				var file = e.target.files[0];
				this.WeChatfile = e.target.files[0];
				/*判断用户是否上传的为图片*/
				if((!/image\/\w+/.test(file.type))) {
					this.WeChatImgTishi = _this.$t("ApplicationCoin.UploadedIsNotPhoto");
					this.WeChatTishiShow = true;
					setTimeout(() => {
						this.WeChatTishiShow = false;
					}, 1000)
					return false;
				}
				//判断用户上传的图片大小
				if(file.size > 2 * 1024 * 1024) {
					alert(_this.$t("userCenter.UploadedPhoLarge5select"));
					return false;
				}
				//提示用户上传文件
				if(file.name != "") {
					this.SelectWeChatImg = false;
					this.SelectWeChatText = file.name;
				}

			},
			/*使其他用户可以看到显示绑定银行卡*/
			bindingShow(val, id) {
				var _this = this;
				_this.callback(); /*刷新token判断*/
				axios.post(httpUrl.paymentSwitch, {
					paymentId: id
				}, {
					headers: {
						"Authorization": "Bearer " + _this.token
					}
				}).then(function(res) {
					return true;
				}, function(err) {
					console.log(err)
				})
			},

			/*绑定支付宝*/
			submitFormAlipay(formName) {
				var _this = this;
				_this.callback(); /*刷新token判断*/
				var param = new FormData(); //创建 form对象
				param.append('picture', _this.Alifile); //通过append向form对象添加数据
				param.append('bankNumber', _this.AlipayList.Account);
				param.append('type', 2);
				param.append('payPasswd', _this.AlipayList.password);
				//console.log(param.get('file')); //FormData私有类对象，访问不到，可以通过get判断值是否传进去
				_this.AlipayList.file = param;
				this.$refs[formName].validate((valid) => {
					if(_this.Alifile == "") {
						this.AlipayImgTishi = _this.$t("userCenter.Uploadphotos");
						this.AlipayTishiShow = true;
						setTimeout(() => {
							this.AlipayTishiShow = false;
						}, 1000)
						return false;
					}
					if(_this.AlipayList.password == "") {
						return false;
					}
					if(_this.AlipayList.password.length < 8 || _this.AlipayList.password.length > 16 || !(/^[0-9a-zA-Z]+$/.test(_this.AlipayList.password))) {
						_this.AlipayTishiShow = true;
						_this.AlipayImgTishi =  _this.$t("userCenter.EnterCorrectFunds")
						setTimeout(() => {
							_this.AlipayTishiShow = false;
						}, 1000)
						return false;
					}
					_this.binding = true;
					if(valid) {
						axios.post(httpUrl.addReceip, _this.AlipayList.file, {
							headers: {
								"Authorization": "Bearer " + _this.token,
								'Content-Type': 'multipart/form-data'
							}
						}).then(function(res) {
							if(res.data.status.code == 200) {
								_this.binding = false; /*隐藏loading*/
								_this.BindingAlipay = false; /*收回去*/
								_this.userList.alipy_status = 1; /*显示修改*/
								_this.value5 = true; /*默认显示*/
								/////弹出提示消息
								if(_this.userList.alipy_status == 0) {
									_this.$message({
										showClose: true,
										message: _this.$t("userCenter.Emailbindingsuccess"),
										type: 'success',
										duration: 2000
									});
								} else {
									_this.$message({
										showClose: true,
										message: _this.$t("userCenter.Phonemodifiedsuccess"),
										type: 'success',
										duration: 2000
									});
								}
								/*邦绑定成功*/
								_this.bankNumber3 = _this.AlipayList.Account;
								_this.$refs[formName].resetFields();
								_this.SelectAlipayImg = true; /*隐藏选中的图图片路径*/
							}
							if(res.data.status.code == 103) {
								_this.binding = false; /*隐藏loading*/
								_this.AlipayTishiShow = true;
								_this.AlipayImgTishi = _this.$t("userCenter.FundsPasswordWrong")
								setTimeout(() => {
									_this.AlipayTishiShow = false;
								}, 1000)
							}
							if(res.data.status.code == -200) {
								_this.binding = false; /*隐藏loading*/
								_this.$message({
									message: res.data.status.message,
									type: 'error'
								});
							}
						}, function(err) {
							console.log(err)
						})

					} else {
						console.log('error submit!!');
						return false;
					}
				})
			},
			/*取消绑定支付宝*/
			resetFormAlipay(formName) {
				this.$refs[formName].resetFields();
				this.BindingAlipay = false;
			},
			/*绑定微信*/
			submitFormWeChat(formName) {
				var _this = this;
				_this.callback(); /*刷新token判断*/
				var param = new FormData(); //创建form对象
				param.append('picture', _this.WeChatfile); //通过append向form对象添加数据
				param.append('bankNumber', _this.WeChatList.Account);
				param.append('type', 1);
				param.append('payPasswd', _this.WeChatList.password);
				//console.log(param.get('file')); //FormData私有类对象，访问不到，可以通过get判断值是否传进去
				this.WeChatList.file = param;
				this.$refs[formName].validate((valid) => {
					//console.log(_this.WeChatList.file=="")
					if(_this.WeChatfile == "") {
						this.WeChatImgTishi = _this.$t("userCenter.Uploadphotos");
						this.WeChatTishiShow = true;
						setTimeout(() => {
							this.WeChatTishiShow = false;
						}, 1000)
						return false;
					}
					if(_this.WeChatList.password.length < 8 || _this.WeChatList.password.length > 16 || !(/^[0-9a-zA-Z]+$/.test(_this.WeChatList.password))) {
						_this.WeChatTishiShow = true;
						_this.WeChatImgTishi = _this.$t("userCenter.EnterCorrectFunds")
						setTimeout(function() {
							_this.WeChatTishiShow = false;
						}, 1000)
						return false;
					}
					_this.binding = true; /*隐藏*/
					if(valid) {
						axios.post(httpUrl.addReceip, _this.WeChatList.file, {
							headers: {
								"Authorization": "Bearer " + _this.token,
								'Content-Type': 'multipart/form-data'
							}
						}).then(function(res) {
							if(res.data.status.code == 200) {
								_this.binding = false; /*隐藏loading*/
								_this.BindingWeChat = false; /*收回去*/
								_this.userList.wxpay_status = 1; /*显示修改*/
								_this.value4 = true; /*默认显示*/
								if(_this.userList.wxpay_status == 0) { /*修改*/
									_this.$message({
										showClose: true,
										message: _this.$t("userCenter.Emailbindingsuccess"),
										type: 'success',
										duration: 2000
									});
								} else {
									_this.$message({
										showClose: true,
										message:  _this.$t("userCenter.Phonemodifiedsuccess"),
										type: 'success',
										duration: 2000
									});
								}
								/*邦绑定成功*/
								_this.bankNumber2 = _this.WeChatList.Account;
								_this.$refs[formName].resetFields();
								_this.SelectWeChatImg = true; /*隐藏图片路径*/
							}
							if(res.data.status.code == 103) {
								_this.binding = false; /*隐藏loading*/
								_this.WeChatTishiShow = true;
								_this.WeChatImgTishi =  _this.$t("userCenter.FundsPasswordError")
								setTimeout(function() {
									_this.WeChatTishiShow = false;
								}, 1000)
							}
							if(res.data.status.code == -200) {
								_this.$message({
									message: res.data.status.message,
									type: 'error'
								});
								_this.binding = false; /*隐藏loading*/
							}
						}, function(err) {
							console.log(err)
						})

					} else {
						console.log('error submit!!');
						return false;
					}
				})
			},
			resetFormWeChat(formName) {
				this.$refs[formName].resetFields();
				this.BindingWeChat = false;
			},
			/*提交银行卡体按钮*/
			submitForm(formName) {
				var _this = this;
				_this.callback(); /*刷新token判断*/

				if(_this.userList.idCard == "") { /*判断用户是否绑定身份证*/
					_this.isShowUser = true;
					return false;
				}

				if(_this.numberValidateForm.Branch == "") {
					_this.hint_content = _this.$t("userCenter.SelectBankBranch");
					_this.BankTextShow = true;
					setTimeout(function(res) {
						_this.BankTextShow = false;
					}, 1000)
					return false;
				}
				/*判断用户有没有选择开户行*/
				if(_this.value == "") {
					_this.hint_content = _this.$t("userCenter.SelectbankAccount");
					_this.BankTextShow = true;
					setTimeout(function(res) {
						_this.BankTextShow = false;
					}, 1000)
					return false;
				}
				if(_this.numberValidateForm.Bankcardnumber == "") {
					_this.hint_content = _this.$t("login.Enterbankcardnu");
					_this.BankTextShow = true;
					setTimeout(function(res) {
						_this.BankTextShow = false;
					}, 1000)
					return false;
				}

				if(_this.numberValidateForm.confirmCard == "") {
					_this.hint_content =  _this.$t("userCenter.ConfirmBank");
					_this.BankTextShow = true;
					setTimeout(function(res) {
						_this.BankTextShow = false;
					}, 1000)
					return false;
				}
				if(_this.numberValidateForm.password == "") {
					_this.hint_content =  _this.$t("userCenter.FillFundsPassword");
					_this.BankTextShow = true;
					setTimeout(function(res) {
						_this.BankTextShow = false;
					}, 1000)
					return false;
				}
				if(_this.numberValidateForm.password.length < 8 || _this.numberValidateForm.password.length > 16) {
					_this.zijinPassErrorText = _this.$t("userCenter.FundsPasswordError");
					_this.zijinPassError = true;
					setTimeout(function() {
						_this.zijinPassError = false;
					}, 1000)
					return false;
				}
				if(!(/^[0-9a-zA-Z]+$/.test(_this.numberValidateForm.password))) {
					_this.zijinPassErrorText = _this.$t("userCenter.FundsPasswordError");
					_this.zijinPassError = true;
					setTimeout(function() {
						_this.zijinPassError = false;
					}, 1000)
					return false;
				}
				if(_this.numberValidateForm.Bankcardnumber != _this.numberValidateForm.confirmCard) {
					_this.IsconfirmCard = true;
					setTimeout(function() {
						_this.IsconfirmCard = false;
					}, 1000)
					return false;
				}
				/*提交请求*/
				axios.post(httpUrl.addCard, {
					bankId: _this.value,
					bankAddress: _this.numberValidateForm.Branch,
					bankNumber: _this.numberValidateForm.Bankcardnumber,
					bankNumber_confirmation: _this.numberValidateForm.confirmCard,
					payPasswd: _this.numberValidateForm.password
				}, {
					headers: {
						"Authorization": "Bearer " + _this.token
					}
				}).then(function(res) {
					if(res.data.status.code == 200) { /*判断是否绑定成功*/
						_this.userList.bank_status = 1; /*显示修改*/
						_this.BankTransfer = false; /*内容收回去*/
						_this.value3 = true; /*默认显示*/
						if(_this.userList.bank_status == 1) {
							_this.$message({
								showClose: true,
								message:  _this.$t("userCenter.Phonemodifiedsuccess"),
								type: 'success',
								duration: 2000
							});
						} else {
							_this.$message({
								showClose: true,
								message:  _this.$t("userCenter.Emailbindingsuccess"),
								type: 'success',
								duration: 2000
							});
						}
						/*绑定成功 进行请求 */
						_this.bankNumber1 = _this.numberValidateForm.Bankcardnumber;
						_this.$refs[formName].resetFields();
					}
					if(res.data.status.code == 104) {
						_this.zijinPassErrorText =  _this.$t("userCenter.FundsPasswordError");
						_this.zijinPassError = true;
						setTimeout(function() {
							_this.zijinPassError = false;
						}, 1000)
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

			},
			/*取消按钮*/
			resetForm(formName) {
				this.$refs[formName].resetFields(); /*清空内容*/
				this.BankTransfer = false; /*内容收回去*/
			}
		}
	}
</script>
<style lang="scss">
	/*白色版本开始*/
	/*微信颜色*/

	.wx-white {
		color: #54ad22 !important;
	}
	/*支付宝颜色*/

	.zfb-white {
		color: #00a2ec !important;
	}
	/*银行卡颜色*/

	.yhk-white {
		color: #25225f !important;
	}
	/*内容*/

	.binding_success_white {
		background: #fff !important;
		box-shadow: 2px 2px 5px #666 !important;
		color: #000 !important;
	}
	/*蒙版内容*/

	.force_white {
		.force-text {
			background: #fff !important;
			.force-title {
				color: #333 !important;
				border-bottom: 1px solid #eee !important;
			}
			.force-box {
				color: #333 !important;
				border-bottom: 1px solid #eee !important;
			}
			.confirm-cancel {
				color: #000;
				p:nth-of-type(1) {
					border-right: 1px solid #eee !important;
				}
			}
		}
	}
	/*提示白版样式*/

	.tishi_white {
		background: #fff !important;
		box-shadow: 2px 2px 5px #666 !important;
		color: #000 !important;
	}
	/*银行卡绑定内容*/

	.Bank_box_white,
	.WeChat_box_white,
	.Alipay_box_white {
		background: #fff;
		border-left: 2px solid #ddd !important;
		border-right: 2px solid #ddd !important;
		border-bottom: 1px solid #eee !important;
		/*绑定银行卡头部*/
		.Bank-box-title {
			.Bank-box-title-left {
				color: #333;
			}
			.Bank-title {
				color: #666;
			}
			.Bank-box-title-right {
				color: #666;
				.el-switch__label--left,
				.el-switch__label--right {
					color: #333 !important;
				}
				.el-switch__label--left.is-active,
				.el-switch__label--right.is-active {
					color: #409EFF !important;
				}
			}
		}
		.demo-ruleForm {
			color: #333;
			.el-input__inner {
				background: #fff !important;
				color: #333 !important;
			}
		}
	}
	/*白色版本结束*/
	/*高亮背景颜色*/
	/*判断用户是否输入了身份证*/

	.force {
		width: 100%;
		height: 100%;
		position: fixed;
		left: 0;
		top: 0;
		background-color: rgba(0, 0, 0, 0.5);
		.force-content {
			width: 100%;
			height: 100%;
			position: relative;
			.force-text {
				width: 475px;
				height: 255px;
				position: absolute;
				left: 35%;
				top: 20%;
				color: #fff;
				background: #22223f;
				/*头部内容*/
				.force-title {
					width: 100%;
					height: 55px;
					line-height: 55px;
					border-bottom: 1px solid #4e4a76;
					span {
						float: left;
						margin-left: 20px;
						font-size: 16px;
					}
					.iconfont {
						float: right;
						margin-right: 20px;
						cursor: pointer;
					}
				}
				/*实名认证中间内容*/
				.force-box {
					width: 100%;
					height: 145px;
					text-align: center;
					line-height: 145px;
					font-size: 16px;
					border-bottom: 1px solid #4e4a76;
					.renz {
						color: #7478e9;
						cursor: pointer;
					}
				}
				/*确认按钮和取消按钮部分*/
				.confirm-cancel {
					width: 100%;
					height: 52px;
					line-height: 52px;
					font-size: 16px;
					p {
						width: 50%;
						text-align: center;
						float: left;
						box-sizing: border-box;
						cursor: pointer;
					}
					p:nth-of-type(1) {
						border-right: 1px solid #4e4a76;
					}
				}
			}
		}
	}

	$bg_color:#383962;
	$gao_liang:#9696c7;
	$border_bottom:1px solid #2e3157;
	/*判断银行卡号是否输入一致*/

	.confirmCard {
		position: relative;
		.tishi {
			position: absolute;
			left: 60%;
			top: 35px;
			font-size: 12px;
			color: #f56c6c;
		}
	}
	/*大盒子*/

	#Account_security {
		color: #fff;
		position: relative;
		.binding-success {
			width: 200px;
			height: 50px;
			text-align: center;
			line-height: 50px;
			background: #414182;
			box-shadow: 2px 2px 5px #000;
			color: #fff;
			position: absolute;
			.iconfont {
				color: #4b9b5e;
			}
			left: 40%;
			top: 30%;
			font-size: 14px;
		}
		.mb {
			width: 100%;
			height: 100%;
			position: fixed;
			left: 0;
			top: 0;
			background: rgba(0, 0, 0, 0.5);
			z-index: 666;
		}
		/*白版的账户安全设置*/
		.Bound_funds_white {
			background: #fff !important;
			color: #000 !important;
			.Bound_funds_title {
				.text {
					border-bottom: 1px solid #ddd !important;
				}
			}
			.Bound_funds_bottom {
				border-top: 1px solid #ddd !important;
				p:nth-of-type(1) {
					border-right: 1px solid #ddd !important;
				}
			}
		}
		/*账户安全设置*/
		.Bound_funds {
			width: 400px;
			position: absolute;
			left: 30%;
			top: 40%;
			font-size: 15px;
			z-index: 10000;
			background: #22223f;
			/*头部*/
			.Bound_funds_title {
				width: 100%;
				box-sizing: border-box;
				padding: 0px 15px;
				.text {
					height: 50px;
					line-height: 50px;
					border-bottom: 1px solid #4e4a76;
					span {
						float: left;
					}
					.iconfont {
						float: right;
						cursor: pointer;
					}
				}
			}
			.Bound_funds_content {
				width: 100%;
				height: 120px;
				line-height: 25px;
				box-sizing: border-box;
				padding: 20px 10px 0 20px;
				span {
					float: right;
					margin-right: 20px;
					color: #7478e9;
					cursor: pointer;
				}
			}
			.Bound_funds_bottom {
				width: 100%;
				height: 52px;
				line-height: 52px;
				border-top: 1px solid #4e4a76;
				font-size: 16px;
				p {
					width: 50%;
					text-align: center;
					float: left;
					box-sizing: border-box;
					cursor: pointer;
				}
				p:nth-of-type(1) {
					border-right: 1px solid #4e4a76;
				}
			}
		}
		/*上传文件按钮样式*/
		input[type="hidden" i],
		input[type="image" i],
		input[type="file" i] {
			width: 100% !important;
			height: 100% !important;
		}
		input[type="file" i] {
			line-height: 50px !important;
			text-align: center !important;
			background: red !important;
		}
		/*swicth显示或隐藏*/
		.el-switch__label--left,
		.el-switch__label--right {
			color: #fff;
		}
		.el-switch__label--right.is-active,
		.el-switch__label--left.is-active {
			color: #409EFF;
		}
		/*行的高度*/
		.el-form-item {
			width: 100%;
			height: 70px;
		}
		/*按钮大小*/
		.el-button--primary {
			width: 15% !important;
			height: 40px !important;
			text-align: center !important;
			background-color: #6666fa !important;
			border: 1px solid #6666fa !important;
		}
		.el-button{
			width: 72px;
			height: 40px;
			padding: 0 !important;
		}
		.el-button--info {
			width: 100% !important;
			height: 40px !important;
			margin-top: 30px;
		}
		/*报错位置*/
		.el-form-item__error {
			width: 133px !important;
			height: 50px;
			text-align: center !important;
			left: 60% !important;
		}
		/*改变element-ui的变化*/
		.el-form-item__content {
			margin: 0 !important;
		}
		.el-select {
			width: 100% !important;
			.el-input {
				width: 100% !important;
			}
			.el-input__suffix {
				right: 85px;
			}
		}
		.el-input {
			width: 60% !important;
			float: left;
		}
		.el-input__inner {
			width: 80% !important;
			height: 40px !important;
			color: #fff;
			border: 1px solid #2c3983;
			background: #101034;
		}
		.el-form-item {
			margin-bottom: 0 !important;
		}
		.auth_text_blue {
			color: #fff !important;
		}
	}
	/*绑定银行卡内容*/

	.Bank-box-content {
		width: 600px;
		position: relative;
		/*报错*/
		.zijin_pass {
			position: absolute;
			left: 50%;
			bottom: 20%;
			height: 30px;
			line-height: 30px;
			box-sizing: border-box;
			padding: 0 10px;
			text-align: center;
			background: #414182;
			box-shadow: 2px 2px 5px #000;
		}
		/*收款二维码*/
		.Receipt-code {
			/*右侧内容*/
			.Uploading_files {
				position: relative;
				width: 288px;
				height: 100px;
				float: left;
				border: 1px dashed #2c3983;
				cursor: pointer;
				.WeChat-file {
					width: 100% !important;
					height: 100% !important;
					position: absolute;
					left: 0;
					top: 0;
					background: red;
					opacity: 0;
					cursor: pointer;
				}
			}
			.Uploading_files_left {
				width: 100%;
				height: 100%;
				text-align: center;
				line-height: 100px;
				/*文件上传*/
			}
			/*提示错误*/
			.alert-tishi {
				color: #fff;
				padding: 0 15px;
				height: 30px;
				line-height: 30px;
				position: absolute;
				left: 35%;
				top: 25%;
				z-index: 999;
				background: #414182;
				box-shadow: 2px 2px 5px #000;
			}
		}
		/*提示部分*/
		.Bank-box-xinxi {
			position: absolute;
			left: 50%;
			top: 20%;
			width: 150px;
			height: 50px;
			z-index: 996;
			color: #f56c6c;
			text-align: center;
			line-height: 50px;
			background: rgba(0, 0, 0, 0.5);
		}
		.Bank-box-title-text {
			display: inline-block;
			width: 128px;
			height: 40px;
			font-size: 14px;
			line-height: 40px;
			text-align: center;
			float: left;
			margin: 0 70px 0 20px;
		}
		/*开户行部分select选项*/
		.kai-hu {
			width: 100%;
			height: 65px;
			.select {
				width: 60%;
				height: 50px;
				float: left;
				.el-input {
					width: 100% !important;
				}
			}
		}
		/*按钮*/
		.ti-jiao {
			width: 100%;
			text-align: right;
			box-sizing: border-box;
			padding-right: 120px;
			margin-top: 30px;
		}
	}
	/*绑定银行卡*/

	.Bank-box {
		width: 100%;
		border-bottom: $border_bottom;
		background: #16182c;
		/*绑定银行卡头部*/
		.Bank-box-title {
			width: 100%;
			height: 50px;
			line-height: 50px;
			display: flex;
			justify-content: space-between;
			.Bank-box-title-left {
				min-width: 240px;
				box-sizing: border-box;
				padding-left: 10px;
				font-size: 14px;
				display: flex;
				align-items: center;
				.iconfont {
					font-size: 25px;
					margin-right: 10px;
				}
			}
			.Bank-title {
				min-width: 450px;
				font-size: 14px;
				.name {
					margin-right: 20px;
				}
			}
			.Bank-box-title-right {
				min-width: 50px;
				font-size: 14px;
				cursor: pointer;
			}
			.Bank-box-title-right1{
				min-width: 200px;
				text-align: right;
				box-sizing: border-box;
				padding-right: 15px;
			}
		}
	}
	/*绑定微信*/

	.WeChat-box {
		@extend .Bank-box;
		.Bank-box-title-text {
			margin-left: 35px;
		}
	}
	/*绑定支付宝*/

	.Alipay-box {
		@extend .Bank-box;
		border-bottom:none;
		.Alipay-box-content {
			width: 100%;
			height: 100px;
			border: 1px solid red;
		}
	}
	/*账户安全设置*/

	.account {
		width: 100%;
		p {
			display: inline-block;
			height: 45px;
			text-align: center;
			line-height: 50px;
			background: #272867;
			font-size: 15px;
			padding: 0 15px;
		}
	}
</style>
