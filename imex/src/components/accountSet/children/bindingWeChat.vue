<template>
	<div>
		<div v-show="loadingIsShow">
			<loading></loading>
		</div>
		<!--绑定微信-->
		<my-header :text="headerTile"></my-header>
		<!--绑定微信内容-->
		<ul class="userList">
			<li>
				<span class="name">{{$t("login.Names")}}</span>
				<input type="text" v-model="infoOfUser.trueName" />
			</li>
			<li>
				<span class="name">{{$t("userCenter.WechatAccount")}}</span>
				<input type="text" v-model="userList.WeChatNum" :placeholder="$t('userCenter.EnterWeChataccount')" />
			</li>
			<li>
				<span class="name">{{$t("otc.FundPassword")}}</span>
				<input type="password" v-model="userList.CapitalCipher" :placeholder="$t('otc.Pleasepassword')" />
			</li>
		</ul>
		<!--上传二维码-->
		<div class="upload">
			<div class="Receipt-code">
				<div class="Uploading_files">
					<div class="Uploading_files_left">
						<p v-show="SelectWeChatImg">
							<i class="iconfont icon-shangchuan1"></i>
							<span>{{$t("userCenter.Choosecode")}}.jpg.png.jpeg</span>
						</p>
						<p v-show="!SelectWeChatImg">
							<i class="iconfont icon-tupian"></i>
							<span>{{SelectWeChatText}}</span>
						</p>
					</div>
					<input type="file" @change="getFile($event)" accept="image/png,image/gif,image/jpg,image/jpeg" class="WeChat-file" />
					<span class="alert-tishi" v-show="WeChatTishiShow">{{WeChatImgTishi}}</span>
				</div>
				<div style="clear: both;"></div>
			</div>
		</div>
		<!--保存按钮-->
		<div class="submit">
			<button @click="bindingWeChat">{{$t("login.Save")}}</button>
		</div>
	</div>
</template>

<script>
	import header from "../../public/backHeader"
	import loading from "../../public/loading"
	export default {
		data() {
			return {
				headerTile: this.$t("login.BindWeChat"),
				/*switch显示或者隐藏*/
				SelectWeChatImg: true,
				/*显示/隐藏二维码*/
				SelectWeChatText: "",
				/*用户上传的二维码文件名称*/
				WeChatImgTishi: "",
				/*用户上传不是图片提示错误    用户上传文件大于2M提示错误   */
				WeChatTishiShow: false,
				WeChatfile: "",
				/*上传的文件*/
				userList: {
					WeChatNum: "",
					CapitalCipher: "",
				},
				infoOfUser: {
					trueName: ""
				},
				/*获取用户信息*/
				loadingIsShow: false /*loading效果*/
			}
		},
		mounted() {
			let _this = this;
			/*请求*/
			// http request 拦截器
			this.$ajax.interceptors.request.use(
				config => {
					_this.loadingIsShow = true;
					return config;
				},
				err => {
					_this.loadingIsShow = false;
					return Promise.reject(err);
			});
			this.$ajax.interceptors.response.use(
				response => {
					_this.loadingIsShow = false;
					return response;
				},
				error => {
					_this.loadingIsShow = false;
				});
			/*获取用户信息*/
			this.$ajax.get(this.httpUrl.infoOfUser, {
				headers: {
					"Authorization": "Bearer " + _this.token
				}
			}).then(function(res) {
				_this.infoOfUser = res.data.data;
			}, function(err) {
				console.log(err)
			})
		},
		methods: {
			getFile(e) { /*上传文件*/
				var file = e.target.files[0];
				this.WeChatfile = e.target.files[0];
				/*判断用户是否上传的为图片*/
				if((!/image\/\w+/.test(file.type))) {
					this.WeChatImgTishi = this.$t("userCenter.UploadedIsNotPhoto");
					this.WeChatTishiShow = true;
					setTimeout(() => {
						this.WeChatTishiShow = false;
					}, 1000)
					return false;
				}
				//判断用户上传的图片大小
				if(file.size > 2 * 1024 * 1024) {
					alert(this.$t("userCenter.Uploadedphotoslarger"));
					return false;
				}
				//提示用户上传文件
				if(file.name != "") {
					this.SelectWeChatImg = false;
					this.SelectWeChatText = file.name;
				}
			},
			bindingWeChat() { /*绑定微信*/
				let _this = this;

				if(_this.userList.WeChatNum == "") {
					this.WeChatImgTishi = _this.$t("userCenter.EnterWeChataccount");
					this.WeChatTishiShow = true;
					setTimeout(() => {
						this.WeChatTishiShow = false;
					}, 1000)
					return false;
				}
				if(_this.userList.CapitalCipher == "") {
					this.WeChatImgTishi = _this.$t("userCenter.EnterFundpassword");
					this.WeChatTishiShow = true;
					setTimeout(() => {
						this.WeChatTishiShow = false;
					}, 1000)
					return false;
				}
				if(_this.WeChatfile == "") {
					this.WeChatImgTishi = _this.$t("userCenter.Uploadphotos");
					this.WeChatTishiShow = true;
					setTimeout(() => {
						this.WeChatTishiShow = false;
					}, 1000)
					return false;
				}
				if(_this.userList.CapitalCipher.length < 8 || _this.userList.CapitalCipher.length > 16 || !(/^[0-9a-zA-Z]+$/.test(_this.userList.CapitalCipher))) {
					_this.WeChatTishiShow = true;
					_this.WeChatImgTishi = _this.$t("userCenter.EnterCorrectFunds")
					setTimeout(function() {
						_this.WeChatTishiShow = false;
					}, 1000)
					return false;
				}

				var param = new FormData(); //创建form对象
				param.append('picture', _this.WeChatfile); //通过append向form对象添加数据
				param.append('bankNumber', _this.userList.WeChatNum);
				param.append('type', 1);
				param.append('payPasswd', _this.userList.CapitalCipher);
				this.$ajax.post(this.httpUrl.addReceip, param, {
					headers: {
						"Authorization": "Bearer " + _this.token,
						'Content-Type': 'multipart/form-data'
					}
				}).then(function(res) {
					_this.loadingIsShow = false;
					if(res.data.status.code == 200) {
						if(_this.infoOfUser.wxpay_status == 1) {
							_this.$message({
								showClose: true,
								message: _this.$t("userCenter.Phonemodifiedsuccess"),
								type: 'success',
								duration: 2000
							});
						}
						if(_this.infoOfUser.wxpay_status == 0) {
							_this.$message({
								showClose: true,
								message: _this.$t("userCenter.Emailbindingsuccess"),
								type: 'success',
								duration: 2000
							});
						}
						_this.userList.WeChatNum = "";
						_this.userList.CapitalCipher = "";
						_this.WeChatfile = "";
						_this.SelectWeChatText = "";
						_this.SelectWeChatImg = false;
						_this.$router.push({
							name:"accountSet"
						})
					}
					if(res.data.status.code == 103) {
						_this.WeChatTishiShow = true;
						_this.WeChatImgTishi = _this.$t("userCenter.FundsPasswordError")
						setTimeout(function() {
							_this.WeChatTishiShow = false;
						}, 1000)
					}

				}, function(err) {
					console.log(err)
				})
			}
		},
		components: {
			"my-header": header,
			"loading": loading
		}
	}
</script>

<style lang="scss" scoped>
	$submit_color:#373959;
	/*登录线条*/

	$submit_borderColor:1px solid #9fa0af;
	/*按钮边框颜色*/

	$border_bottom: 1px solid #1b1d3e;
	/*列表边框颜色*/

	$placeholder:#6f77e0;
	/*文本提示颜色*/

	$slideRight:#171932;
	/*弹框样式*/

	$header_background:#141738;
	/*用户列表*/

	.submit {
		width: 2.7rem;
		height: .38rem;
		margin: .5rem auto;
		button {
			width: 100%;
			height: .38rem;
			border: $submit_borderColor;
			background: $submit_color;
			color: #fff;
			outline: none;
		}
	}

	.userList {
		width: 100%;
		background: #141738;
		li {
			width: 100%;
			height: .4rem;
			line-height: .4rem;
			color: #fff;
			display: flex;
			justify-content: space-between;
			box-sizing: border-box;
			padding: 0 .1rem;
			border-bottom: $border_bottom;
			input {
				width: 67%;
				border: none;
				background: none;
				outline: none;
				color: #fff;
			}
			input::-webkit-input-placeholder {
				color: $placeholder;
				text-align: right;
			}
		}
	}
	/*上传微信二维码*/

	.upload {
		width: 100%;
		height: 1.8rem;
		background: $header_background;
		margin-top: .1rem;
		box-sizing: border-box;
		padding-top: .2rem;
	}
	/*二维码样式*/
	/*收款二维码*/

	.Receipt-code {
		display: flex;
		justify-content: center;
		/*右侧内容*/
		.Uploading_files {
			position: relative;
			width: 288px;
			height: 100px;
			float: left;
			cursor: pointer;
			.WeChat-file {
				position: absolute;
				left: 0;
				top: 0;
				width: 100%;
				height: 100%;
				opacity: 0;
			}
		}
		.Uploading_files_left {
			width: 100%;
			height: 100%;
			text-align: center;
			line-height: 40px;
			color: #fff;
			.iconfont {
				display: block;
				width: 100%;
				font-size: .2rem;
				height: 0.3rem;
			}
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
</style>
