<template>
	<div id="identity">
		<div v-show="loadingIsShow">
			<loading></loading>
		</div>
		<!--先实名认证-->
		<div class="RealName" v-show="RealNameIsShow">
			<i class="iconfont icon-gantanhao"></i> {{$t("userCenter.Pleaserealname")}}
		</div>
		<!--实名认证-->
		<div class="real-name" :class="{'real_name_white':getColor==1}">
			<div class="real-name-title">
				<p>
					{{$t('userCenter.Authentication')}} > {{$t("userCenter.Verified")}}
				</p>
			</div>
			<ul class="real-name-box">
				<li class="title">
					<p class="text">{{$t("userCenter.Verified")}}</p>
					<p class="isReal">
						<span v-show="userList.idCard == ''">{{$t("userCenter.Notcertified")}}</span>
						<span v-show="userList.idCard != ''">
							{{userList.trueName}},
							{{userList.idCard}}
						</span>
					</p>
					<p class="isXiu" @click="CountryShow=!CountryShow" v-if="userList.auth_grade==0">
						<span v-show="userList.idCard == ''">{{$t("userCenter.Certified")}}</span>
						<span v-show="userList.idCard != ''">{{$t("userCenter.Modify")}}</span>
					</p>
					<p class="isXiu" v-if="userList.auth_grade==1&&userList.idCard != ''">
						<span>{{$t("userCenter.verified")}}</span>
					</p>
				</li>
				<!--内容部分-->
				<div class="real-name-content" v-show="CountryShow">
					<el-form ref="form">
						<p class="real-name-content-title">{{$t("login.Country")}}</p>
						<div class="input-item-country">
							<el-select v-model="selectCountry" placeholder="China">
							<el-option v-for="(item,index) in countryList" :key="item.name" :label="item.name" :value="item.id">
								<span>{{ item.name }}</span>
							</el-option>
						</el-select>
						</div>
						<p class="real-name-content-title">{{$t("login.Names")}}</p>
						<div class="input-item">
							<p class="hezi" :class="{'width':userList.idCard != ''}">
								<el-input v-if="userList.idCard == ''" v-model="trueName"></el-input>
								<el-input v-if="userList.idCard != ''" :disabled="isCard" v-model="trueName"></el-input>
							</p>
							<span v-show="userList.idCard != ''" @click="isCard=false">{{$t("userCenter.Modify")}}</span>
						</div>
						<p class="real-name-content-title">{{$t("userCenter.IDnumbersupport")}}</p>
						<div class="input-item">
							<p class="hezi" :class="{'width':userList.idCard != ''}">
								<el-input v-if="userList.idCard != ''" :disabled="isCard1" v-model="myidCard" @blur="NoiDenCode($event)" maxlength="18"></el-input>
								<el-input v-if="userList.idCard == ''" v-model="myidCard" @blur="NoiDenCode($event)" maxlength="18"></el-input>
							</p>
							<span v-show="userList.idCard != ''" @click="isCard1=false" @keyup.native="OnlyEC($event)" @blur="NoiDenCode($event)">{{$t("userCenter.Modify")}}</span>
						</div>
						<div class="indenTishi">{{ideErrorText}}</div>
						<!--确认按钮-->
						<div class="confirmRealName">
							<el-button type="primary" :disabled="!myidCard || !trueName" @click="confirmID()" v-show="userList.idCard == ''">{{$t("otc.Confirm")}}</el-button>
							<el-button type="primary" :disabled="!myidCard || !trueName" @click="confirmID1()" v-show="userList.idCard != ''">{{$t("otc.Confirm")}}</el-button>
						</div>
					</el-form>
				</div>
			</ul>
		</div>
		<!--高级认证-->
		<div class="senior" :class="{'senior_white':getColor == 1}">
			<div class="real-name-title">
				<p>
					{{$t("userCenter.Authentication")}} > {{$t("userCenter.AdvancedCertification")}}
				</p>
			</div>
			<!--高级认证内容部分-->
			<ul class="senior-box">
				<li class="title">
					<p class="text">{{$t("userCenter.AdvancedCertification")}}</p>
					<p class="isReal">
						<span v-show="userList.auth_grade==0">{{weiRen}}</span>
						<span v-show="userList.auth_grade==1">{{$t("userCenter.verified")}}</span>
					</p>
					<p class="isXiu" v-if="userList.auth_grade==0 && isShen">
						<span @click="Authentication(1)" v-show="!qrError">{{$t("userCenter.Certified")}}</span>
						<span @click="Authentication(0)" v-show="qrError">{{$t("userCenter.Refresh")}}</span>
					</p>
					<div class="isXiu" v-if="userList.auth_grade==1">
						<span>{{$t("userCenter.verified")}}</span>
					</div>
				</li>
				<!---->
				<div class="senior-box-content" v-show="qrError">
					<!--二维码-->
					<div class="title_senior" :class="{'BindingIDcard_white':getColor==1}">
						<span class="zheng">{{$t("userCenter.Document")}}</span>
						<p class="cai">{{$t("userCenter.supports")}}</p>
					</div>
					<p class="BindingIDcardRequrse" v-if="TiText!=''">{{TiText}}</p>
					<!--身份证正面照-->
					<div class="BindingIDcard" :class="{'BindingIDcard_white':getColor==1}">
						<p>{{$t("userCenter.Frontal")}}</p>
						<div class="oImg">
							<img :src="PositiveImg" />
							<span class="click" v-if="PositivetextIsShow">{{$t("userCenter.photo")}}</span>
							<input type="file" @change="changePositive($event)" accept="image/png,image/gif,image/jpg,image/jpeg" />
						</div>
					</div>
					<!--身份证反面照-->
					<div class="BindingIDcard" :class="{'BindingIDcard_white':getColor==1}">
						<p>{{$t("userCenter.Reverse")}}</p>
						<div class="oImg">
							<img :src="NegativeImg" />
							<span class="click" v-if="NegativeIsShow">{{$t("userCenter.photo")}}</span>
							<input type="file" @change="changeNegative($event)" accept="image/png,image/gif,image/jpg,image/jpeg" />
						</div>
					</div>
					<!--手持身份证和签名照片-->
					<div class="BindingIDcardImg" :class="{'BindingIDcard_white':getColor==1}">
						<p>{{$t("userCenter.signature")}}</p>
						<div class="oImg">
							<img :src="HandheldImg" v-if="getColor!=1" />
							<img :src="HandheldImgWhite" v-if="getColor==1" />
							<span class="click" v-if="HandheldShow">{{$t("userCenter.photo")}}</span>
							<input type="file" @change="changeHandheldImg($event)" accept="image/png,image/gif,image/jpg,image/jpeg" />
						</div>
					</div>
					<!--需要备注-->
					<div class="BindingTishi" :class="{'BindingIDcard_white':getColor==1}">
						<ul class="content">
							<li>
								<p><i class="iconfont icon-gantanhao"></i> {{$t("userCenter.frontal")}}
								</p>
								<p>{{$t("userCenter.handwritten")}}</p>
							</li>
							<button class="addIdentity" @click="SubmitReview">{{$t("userCenter.Submitverify")}}</button>
						</ul>
					</div>

				</div>
			</ul>
		</div>
		<!--蒙版部分-->
		<div class="force" v-show="isShowUser">
			<div class="force-content">
				<div class="force-text">
					<!--实名认证头部-->
					<div class="force-title">
						<span>{{$t("userCenter.importanthint")}}</span>
						<i class="iconfont icon-cuowu" @click="isShowUser=false"></i>
					</div>
					<!--告诉-->
					<div class="force-box">
						{{$t("userCenter.Fundspassword")}}
						<span class="renz" @click="clickGo">{{$t("userCenter.Nowtobind")}}</span>
					</div>
					<!--确认按钮和取消按钮-->
					<div class="confirm-cancel">
						<p @click="isShowUser=false">{{$t("userCenter.Cancel")}}</p>
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
	import loading from "../../public/loading" /*loading效果*/
	import axios from "axios";
	import {mapState} from "vuex";
	export default {
		data() {
			return {
				isCard: false,
				isCard1: true,
				img: "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://api.megvii.com/faceid/lite/do?token=f49e963b85c50ca979041931c2049c08",
				/*表单禁用*/
				qr_img: "http://img.zcool.cn/community/01280157e1e2f80000012e7e81b798.gif",
				/*图片路径*/
				userList: {},
				/*获取用户信息*/
				myidCard: "",
				/*身份证*/
				trueName: "",
				/*真实姓名*/
				CountryShow: false,
				/*显示隐藏身份信息部分*/
				alertError: false,
        /*判断用户是否输入错误*/
				nationality: "",
				qrError: false,
				/*显示隐藏二维码*/
				menShow: false,
				/*蒙版显示或隐藏*/
				ideErrorText: "",
				/*身份证输入错误*/
				RealNameIsShow: false,
				isShowUser: false,
				/*判断用户是否绑定资金密码*/
				weiRen: this.$t("userCenter.Notcertified"),
				loadingIsShow: false,
				/*loading效果*/
				PositiveImg: "https://s3.ap-southeast-1.amazonaws.com/s3.imex/images/2180c2b051c8597dce17554152c02b75.png",
				/*正面上传图片*/
				PositivetextIsShow: true,
				/*默认显示上传*/
				NegativeIsShow: true,
				/*默认显示上传*/
				HandheldShow: true,
				/*默认显示上传*/
				NegativeImg: "https://s3.ap-southeast-1.amazonaws.com/s3.imex/images/115af80d2328997f472f20f2e3a1c5ef.png",
				/*反面上传图片*/
				HandheldImg: "https://s3.ap-southeast-1.amazonaws.com/s3.imex/	images/8f6e9c37632cc2ba32cc53f23c0a5c09.png",
				/*手持身份证黑版本*/
				HandheldImgWhite: "https://s3.ap-southeast-1.amazonaws.com/s3.imex/images/bde1d04fb6d5dcdfe70b0e16a21b8f5a.jpg ",
				/*手持身份证白色版本*/
				idcard_front: "",
				/*正面*/
				idcard_back: "",
				/*反面*/
				idcard_holt: "",
				/*手持*/
				TiText: "",
				/*提示填写*/
				isShen: true ,/*判断是否在审核中*/
				countryList:[] ,   /*国家列表*/
				selectCountry:""   /*选中国家id*/
			}
		},
		components: {
			"loading": loading
		},
		watch: { /*实现页面监听路由*/
			$route() {
				console.log(this.$route)
			}
		},
    computed:{
      ...mapState('user',["lang"])
    },
		mounted() {
			var _this = this;
			//获取国家列表
			axios.get(httpUrl.country,{
			  params:{lang:this.lang=="zh-CN"?'zh':'en'}
      }).then(function(res) {
				_this.countryList = res.data.data;
			}, function(error) {
				console.log(error)
			})

			//请求拦截器
			axios.interceptors.request.use(config => {
				_this.loadingIsShow = true;
				return config
			}, error => {
				_this.loadingIsShow = false;
				_this.$message.error({
					message: _this.$t("userCenter.ResponseTimeAgain"),
					type: "warning"
				});
				return Promise.reject(error)
			})
			// 响应拦截器
			axios.interceptors.response.use((response) => {
				if(response.data.status != undefined) {
					if(Number(response.data.status.code) !== 200) {
						_this.loadingIsShow = false;
					}
				}
				if(response.status == 200) {
					_this.loadingIsShow = false;
				}
				return response;
			}, (error) => {
				if(error.response) {
					_this.loadingIsShow = false;
				}
				return Promise.reject(error)
			})
			/*获取用户信息*/
			axios.get(httpUrl.userInfo, {
				headers: {
					"Authorization": "Bearer " + this.token
				}
			}).then(function(res) {
				_this.userList = res.data.data;
				_this.selectCountry = res.data.data.country_id;
				if(_this.userList.idCard != '') {
					_this.trueName = _this.userList.trueName;
					_this.myidCard = _this.userList.idCard;
					if(_this.userList.idCard != '') {
						_this.CountryShow = false;
					}
				}
				/*判断高级认证是否通过*/
				if(res.data.data.auth_grade == 0) {
					/*高级认证*/
					axios.get(httpUrl.seniorInfo, {
						headers: {
							"Authorization": "Bearer " + _this.token
						}
					}).then(function(res) {
						if(res.data.data.status == 0) {
							_this.weiRen = res.data.data.reason_id;
							_this.isShen = false;
						}
					}, function(err) {
						console.log(err)
					})
				} else {
					_this.weiRen = _this.$t("userCenter.Notcertified");
				}
			}, function(err) {
				console.log(err)
			})
			/*判断用户是否是跳转过来的打开实名认证*/
			if(this.$route.params.type == "Jump") {
				this.CountryShow = true;
			}

		},
		methods: {
			async SubmitReview() { /*提交审核*/
				let _this = this;
				if(_this.idcard_front == "" || _this.idcard_back == "" || _this.idcard_holt == "") {
					_this.TiText = _this.$t("userCenter.UploadFullInfo");
					setTimeout(function() {
						_this.TiText = "";
					}, 1000)
					return false;
				}

				let config = await axios.get(httpUrl.uploadSet, {
					headers: {
						"Authorization": "Bearer " + _this.token
					}
				});
				function generateUID() {
					// I generate the UID from two parts here
					// to ensure the random number provide enough bits.
					var firstPart = (Math.random() * 46656) | 0;
					var secondPart = (Math.random() * 46656) | 0;
					firstPart = ("000" + firstPart.toString(36)).slice(-3);
					secondPart = ("000" + secondPart.toString(36)).slice(-3);
					return JSON.stringify(new Date()).split('T')[0].replace(/-|"/g,'')+firstPart + secondPart;
				}
				const uploadFile = async function (file){
					let param = new FormData(); //创建 form对象
					let fileName = file + generateUID()
					param.append("OSSAccessKeyId",config.data.data.accessKeyId);
					param.append("policy",config.data.data.policy);
					param.append("signature",config.data.data.signature);
					param.append("key",fileName);
					param.append('file', _this[file]); //通过append向form对象添加数据
					// console.log(fileName);
					// await Promise.resolve('');
					let res  = await axios.post(config.data.data.url, param, {
						headers: {
							'Content-Type': 'multipart/form-data'
						}
					})
					return fileName;
				};
				let uploadRes = await ['idcard_front','idcard_back','idcard_holt'].reduce(async function (pre,cur){
					let p = await pre;
					const path = await uploadFile(cur);
					p[cur] = config.data.data.url+'/'+path;
					// console.log(cur,path,pre);
					return pre;
				}, Promise.resolve({}));
				let res  = await axios.post(httpUrl.uploadCardPath, uploadRes, {
					headers: {
						"Authorization": "Bearer " + _this.token,
					}
				})
				//.then(function(res) {
					if(res.data.status.code == 200) {
						// window.location.reload();
						this.qrError = false;
						this.isShen = false;
					}
				// },// function(err) {
				// 	//console.log(err)
				// })
			},
			changePositive(e) { /*上传正面图片*/
				var file = e.target.files[0];
				this.idcard_front = e.target.files[0];
				var windowURL = window.URL;
				var dataURL = windowURL.createObjectURL(file);
				this.PositiveImg = dataURL;
				this.PositivetextIsShow = false;
			},
			changeNegative(e) { /*上传反面图片*/
				var file = e.target.files[0];
				this.idcard_back = e.target.files[0];
				var windowURL = window.URL;
				var dataURL = windowURL.createObjectURL(file);
				console.log("反面图片",dataURL)
				this.NegativeImg = dataURL;
				this.NegativeIsShow = false;
			},
			changeHandheldImg(e) { /*上传手持图片*/
				var file = e.target.files[0];
				this.idcard_holt = e.target.files[0];
				var windowURL = window.URL;
				var dataURL = windowURL.createObjectURL(file);
				if(this.getColor&&this.getColor==1) {
					this.HandheldImgWhite = dataURL;
				} else {
					this.HandheldImg = dataURL;
				}
				this.HandheldShow = false;
			},
			clickGo() { /*路由跳转绑定资金密码*/
				this.$router.push({
					name: "Accountsecurity",
					params: {
						bangdin: "yes"
					}
				})
			},
			NoiDenCode(eve) { /*请输入正确的身份证号码*/
				if(eve.target.value == "") {
					this.ideErrorText = _this.$t("userCenter.EnterIDCardNum");
					setTimeout(() => {
						this.ideErrorText = "";
					}, 1500)
					return false;
				}
			},
			Authentication(index) {
				var _this = this;
				if(_this.userList.idCard == "") {
					this.$message({
						showClose: true,
						message: _this.$t("userCenter.Pleaserealname"),
						type: 'warning',
						duration: 2000
					});
					this.CountryShow = true;
					return false;
				}
				if(index == 0) {
					this.qrError = false;
				} else {
					this.qrError = true;
				}
				_this.callback(); /*刷新token判断*/
				/*高级认证*/
				axios.get(httpUrl.seniorInfo, {
					headers: {
						"Authorization": "Bearer " + _this.token
					}
				}).then(function(res) {
					if(res.data.data.status) {
						_this.weiRen = res.data.data.reason_id;
					}
					if(res.data.data.status == 0) {
						_this.qrError = false;
					}

				}, function(err) {
					console.log(err)
				})
			},
			confirmID() { /*绑定或者修改身份信息*/
				var _this = this;
				_this.callback(); /*刷新token判断*/
				axios.post(httpUrl.setIdcard, {
					idCard: _this.myidCard,
					trueName: _this.trueName,
					country_id:_this.selectCountry
				}, {
					headers: {
						"Authorization": "Bearer " + _this.token
					}
				}).then(function(res) {
						if(res.data.status.code == 200) {
							let str = _this.myidCard;
							let strEnd = str.substr(str.length - 4); /*截取后4位*/
							let strStart = str.substr(0, 4); /*截取前4位*/
							_this.userList.idCard = strStart + "********" + strEnd;
							_this.userList.trueName = _this.trueName; /*输入用户名*/
							_this.CountryShow = false;
							_this.myidCard = ""; /*清空内容*/
							_this.trueName = ""; /*清空内容*/
							_this.$message({
								showClose: true,
								message: _this.$t("userCenter.RealNameSuccess"),
								type: 'success',
								duration: 1500
							});
							if(_this.userList.pay_password_status == false) { /*判断有无绑定资金密码*/
								setTimeout(function() {
									_this.isShowUser = true;
								}, 1500)
							}
						}
					},
					function(err) {
						console.log(err)
					})

			},
			/*修改*/
			confirmID1() {
				var _this = this;
				_this.callback(); /*刷新token判断*/
				if(_this.isCard1) {
					return false;
				}
				if(this.myidCard.indexOf("**") != -1) {
					_this.$message({
						showClose: true,
						message: _this.$t("userCenter.FillRorrectID"),
						type: 'error',
						duration: 1500
					});
					return false;
				}
				axios.post(httpUrl.setIdcard, {
					idCard: _this.myidCard,
					trueName: _this.trueName,
					country_id:_this.selectCountry
				}, {
					headers: {
						"Authorization": "Bearer " + _this.token
					}
				}).then(function(res) {
					if(res.data.status.code == 200) {
						this.qrError = false;
					}
				}, function(err) {
					console.log(err)
				})

			}
		}

	}
</script>

<style lang="scss">
	.el-message--warning {
		background-color: #fff;
		border-top: 2px solid #f96a0e;
	}

	.el-message {
		min-width: 280px;
		padding: 25px 15px 25px 20px;
	}

	.el-message .el-icon-warning {
		font-size: 15px;
		color: #f96a0e;
	}

	.el-message--warning .el-message__content {
		color: #000;
	}

	.el-message--success {
		background-color: #fff;
		border-color: #e1f3d8;
		border-top: 2px solid #22d9b8;
	}

	.el-message .el-icon-success {
		font-size: 15px;
		color: #22d9b8;
	}

	.el-message--success .el-message__content {
		color: #000;
	}
</style>

<style lang="scss">
	.el-message--warning {
		background: #fff;
	}

	.BindingIDcard_white {
		p,
		span {
			color: #5a5b82;
		}
		.click {
			color: #fff;
		}
		.content {
			li {
				color: #6d6e8b !important;
			}
		}
		.zheng,
		.cai {
			color: #6d6e8b;
		}
	}

	#identity {
		position: relative;
		.RealName {
			position: absolute;
			left: 30%;
			top: 30%;
			width: 200px;
			height: 90px;
			line-height: 90px;
			text-align: center;
			background: #fff;
			border-top: 5px solid #e6a23c;
			color: #000;
			font-size: 15px;
			.iconfont {
				font-size: 18px;
				color: #e6a23c;
			}
		}
	}
	/*白色版本开始*/

	.real_name_white {
		/*市民认证*/
		.real-name-box {
			background: #fff;
			border: 1px solid #eee;
			.isReal,
			.isXiu {
				color: #666;
			}
		}
		/*表单部分*/
		.el-input__inner {
			background: #fff !important;
			color: #000 !important;
		}
		.input-item span {
			color: #000;
			background: #fff !important;
		}
		.real-name-content-title {
			color: #666;
		}
	}

	.senior_white {
		.title {
			background: #fff !important;
		}
		.isReal,
		.isXiu {
			color: #666;
		}
		.senior-box {
			border: 1px solid #eee;
			background: #fff !important;
		}
		.senior-box-content {
			li {
				color: #666 !important;
			}
		}
	}
	/*白色版本结束*/
	/*后加  身份证输入错误*/

	.indenTishi {
		width: 100%;
		height: 30px;
		line-height: 30px;
		color: #f56c6c;
	}
	/*高亮背景颜色*/

	$bg_color:#383962;
	$gao_liang:#9696c7;
	$border_bottom:1px solid #2e3157;
	$border_2px: 2px solid #33304e;
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
	/*宽度变化*/

	.width {
		width: 85% !important;
	}

	#identity {
		color: #fff;
		.el-button+.el-button {
			margin-left: 0;
		}
		/*按钮大小*/
		.el-button--primary {
			width: 100% !important;
			height: 40px !important;
			margin-top: 30px;
			background-color: #6666fa !important;
			border: 1px solid #6666fa !important;
		}
		.el-button--info {
			width: 100% !important;
			height: 40px !important;
			margin-top: 30px;
		}
		/*报错位置*/
		.el-form-item__error {
			width: 120px !important;
			height: 50px;
			text-align: center !important;
			left: 65% !important;
		}
		/*改变element-ui的变化*/
		.el-form-item__content {
			margin: 0 !important;
		}
		.el-select {
			width: 100% !important;
		}
		.el-input__inner {
			width: 100% !important;
			height: 45px !important;
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
	/*实名认证*/

	.real-name {
		width: 100%;
		.real-name-title {
			width: 100%;
			p {
				display: inline-block;
				height: 45px;
				text-align: center;
				line-height: 45px;
				font-size: 15px;
				color: #fff;
				background: #272867;
				padding: 0 10px;
			}
		}
	}
	/*高级验证*/

	.senior {
		@extend .real-name;
		position: relative;
		margin-top: 150px;
		.men {
			width: 100%;
			height: 90%;
			position: absolute;
			top: 10%;
			background: rgba(0, 0, 0, 0.5);
			z-index: 100;
		}
	}
	/*实名认证头部*/

	.real-name-box {
		width: 100%;
		border-top: none;
		background: #16182c;
		/*头部内容*/
		.title {
			width: 100%;
			height: 50px;
			display: flex;
			box-sizing: border-box;
			align-items: center;
			justify-content: space-between;
			line-height: 50px;
			padding: 0 10px;
			/*p {
				float: left;
			}*/
			.text {
				/*width: 75px;
				text-align: center;*/
				color: #9696c7;
				font-size: 15px;
			}
			.isReal {
				/*width: 600px;
				text-align: center;*/
				font-size: 15px;
				/*margin-left: 100px;*/
			}
			.isXiu {
				/*float: right;
				margin-right: 46px;*/
				cursor: pointer;
			}
		}
		/*实名认证内容*/
		.real-name-content {
			width: 375px;
			position: relative;
			padding-bottom: 20px;
			margin: 0 auto;
			.alert-error {
				padding: 0 10px;
				height: 40px;
				line-height: 40px;
				background: rgba(0, 0, 0, 0.5);
				position: absolute;
				left: 28%;
				top: 100px;
				z-index: 1000;
				color: #f56c6c;
			}
			.real-name-content-title {
				width: 100%;
				height: 50px;
				line-height: 50px;
			}
			.input-item {
				width: 100%;
				height: 50px;
				.hezi {
					width: 100%;
					/*width: 90%;*/
					float: left;
				}
				span {
					width: 15%;
					height: 45px;
					box-sizing: border-box;
					display: inline-block;
					text-align: center;
					line-height: 45px;
					border: 1px solid #2c3983;
					border-left: none;
					border-top-right-radius: 4px;
					border-bottom-right-radius: 4px;
					background: #101034;
					cursor: pointer;
				}
			}
			.confirmRealName {
				margin-bottom: 20px;
				.el-button--primary {
					margin-top: 0 !important;
				}
			}
		}
	}
	/*高级验证*/

	.senior-box {
		@extend .real-name-box;
		box-sizing: border-box;
		padding-left: 20px;
		.senior-box-content {
			width: 100%;
			padding: 0 10px;
			padding-bottom: 10px;
			position: relative;
			.BindingIDcardRequrse {
				position: absolute;
				padding: 10px 20px;
				background: #272867;
				position: absolute;
				left: 40%;
				top: 45%;
			}
			.title_senior {
				width: 100%;
				box-sizing: border-box;
				padding-bottom: 15px;
				span {
					display: inline-block;
					line-height: 30px;
					font-size: 14px;
				}
				p {
					line-height: 30px;
				}
			}
			.BindingIDcard {
				display: flex;
				margin-top: 30px;
				margin-bottom: 20px;
				p {
					width: 15%;
					line-height: 30px;
					font-size: 14px;
				}
				.oImg {
					width: 200px;
					height: 120px;
					position: relative;
					cursor: pointer;
					.click {
						width: 95px;
						height: 30px;
						border-radius: 10px;
						background: rgba(0, 0, 0, 0.5);
						text-align: center;
						line-height: 30px;
						position: absolute;
						left: 50px;
						top: 40px;
					}
					img {
						width: 200px;
						height: 120px;
					}
					input {
						position: absolute;
						left: 0;
						top: 0;
						z-index: 999;
						width: 100%;
						height: 100%;
						display: inline-block;
						opacity: 0;
					}
				}
			}
			.BindingIDcardImg {
				@extend .BindingIDcard;
				.oImg {
					height: 200px;
					img {
						width: 200px;
						height: 200px;
					}
					.click {
						position: absolute;
						left: 45px;
						top: 155px;
						background: rgba(255, 255, 255, 0.5);
					}
				}
			}
		}
	}
	/*弹出框*/

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
	/*提示内容*/

	.BindingTishi {
		width: 100%;
		.content {
			margin-left: 160px;
			li {
				line-height: 20px;
				font-size: 12px;
				.iconfont {
					color: #d32a0d;
				}
			}
			.addIdentity {
				width: 190px;
				height: 50px;
				background: #837ddf;
				color: #fff;
				font-size: 15px;
				border-radius: 4px;
				margin: 20px 0;
				outline: none;
			}
		}
	}
</style>
