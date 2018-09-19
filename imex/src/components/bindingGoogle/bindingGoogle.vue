<template>
	<div id="bindingGoogle">
		<!--头部-->
		<my-header :text="headerText"></my-header>

		<!--谷歌验证内容-->
		<div class="bindingGoogle_content">
			<!--绑定谷歌-->
			<div class="bindingGoogle_content_title">{{$t("userCenter.Authenticatorpreloss")}}</div>
			<!--二维码-->
			<div class="code_img">
				<img :src="getGoogle.ewmImg" />
				<p class="code">
					<span class="code_ma" id="ipt2">{{getGoogle.secretkey}}</span>
					<span class="copy" id="copy" :data-clipboard-text="getGoogle.secretkey" @click="copy()">{{$t("capital.Copy")}}</span>
				</p>
			</div>
			<!--二维码-->
			<div class="erweima_code">
				<span>
					{{$t("userCenter.Saverisk")}}
				</span>
			</div>
			<div class="submit">
				<button @click="popupVisible=true">{{$t("login.Next")}}</button>
			</div>
		</div>

		<mt-popup v-model="popupVisible" position="right">
			<div class="header_box">
				<div class="register_header">
					<p class="back" @click="popupVisible=false">
						<i class="iconfont icon-zuojiantou"></i>
					</p>
					<p class="register_type">
						{{headerText}}
					</p>
				</div>
			</div>
			<!--谷歌验证码-->
			<div class="google_code">
				<span>{{$t("login.GoogleVerificationCode")}}</span>
			</div>
			<div class="security-code-wrap">
				<label for="code">
			      <ul class="security-code-container">
			        <li class="field-wrap" v-for="(item, index) in number" :key="index"  :class="{'active':index==getGoogle.code.length-1}">
			          <i class="char-field">{{getGoogle.code[index] || placeholder}}</i>
			        </li>
			      </ul>
   				 </label>
				<input ref="input" class="input-code" @keyup="handleInput($event)" v-model="getGoogle.code" id="code" name="code" type="tel" :maxlength="number" autocorrect="off" autocomplete="off" autocapitalize="off">
			</div>
		</mt-popup>

	</div>
</template>
<style type="text/css">
	.mint-popup {
		width: 100%;
		height: 100%;
		background: #141738;
		overflow-y: auto;
	}
</style>
<script>
	import header from "../public/backHeader"
	export default {
		data() {
			return {
				headerText: this.$t("login.GoogleVerification"),
				popupVisible: false,
				number: 6,
				placeholder: "-",
				value: "",
				getGoogle: { /*获取谷歌二维码和和密钥*/
					ewmImg: "",
					secretkey: "",
					code: "" /*用户输入的谷歌验证码*/
				},
				userList:{}  /*用户信息*/
			}
		},
		components: {
			"my-header": header
		},
		methods: {
			hideKeyboard() {
				let _this = this;
				// 输入完成隐藏键盘
				document.activeElement.blur() // ios隐藏键盘
				this.$refs.input.blur() // android隐藏键盘
				/*输入验证码完成开始请求接口*/
				this.$ajax.post(this.httpUrl.bindGoogleSecret, {
					secret: _this.getGoogle.secretkey,
					code: _this.getGoogle.code
				}, {
					headers: {
						"Authorization": "Bearer " + _this.token
					}
				}).then(function(res) {
					if(res.data.status.code == 200) {
						_this.userList.google_status = 2; /*状态变化*/
						if(_this.userList.google_status == 2) {
							_this.$message({
								showClose: true,
								message: _this.$t("userCenter.Phonemodifiedsuccess"),
								type: 'success',
								duration: 2000
							});
						} else {
							_this.$message({
								showClose: true,
								message: _this.$t("userCenter.Emailbindingsuccess"),
								type: 'success',
								duration: 2000
							});
						}
					} else {
						_this.$message({
							showClose: true,
							message: _this.$t("login.Confirmationerror"),
							type: 'error',
							duration: 2000
						});
					}
				}, function(err) {
					console.log(err)
				})
			},
			handleSubmit() {
				this.$emit('input', this.getGoogle.code)
			},
			handleInput(e) {
				this.$refs.input.value = this.getGoogle.code
				if(this.getGoogle.code.length >= this.number) {
					this.hideKeyboard()
				}
				this.handleSubmit()
			},
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
						message:  _this.$t("shouye.Phonedoesnotsup"),
						type: 'error'
					});
					// 释放内存
					clipboard.destroy()
				})
			},
		},
		mounted() {
			let _this = this;
			///获取生成谷歌密钥
			this.$ajax.post(this.httpUrl.createSecret, {}, {
				headers: {
					"Authorization": "Bearer " + _this.token
				}
			}).then(function(res) {
				_this.getGoogle.ewmImg = res.data.data.qrcode;
				_this.getGoogle.secretkey = res.data.data.secret;
			}, function(err) {
				console.log(err)
			})
			///获取用户信息
			this.$ajax.get(this.httpUrl.userInfo, {
				headers: {
					"Authorization": "Bearer " + _this.token
				}
			}).then(function(res) {
				/*判断用户的是否输入身份证*/
				if(res.data.status.code == 200) {
					_this.userList = res.data.data;
				}
			}, function(err) {
				console.log(err)
			})
		}
	}
</script>

<style lang="scss" scoped>
	$submit_color:#373959;
	/*登录线条*/

	$submit_borderColor:1px solid #9fa0af;
	/*按钮边框颜色*/
	$header_bg:#141738;
	$border_bottom: 1px solid #1b1d3e;
	.active {
		border-bottom: 2px solid #868dff !important;
	}

	#bindingGoogle {
		width: 100%;
		height: 100%;
		color: #fff;
	}
	/*绑定谷歌的内容*/

	.bindingGoogle_content {
		width: 100%;
		min-height: 89%;
		background: #141738;
		margin-top: .1rem;
		/*头部内容*/
		.bindingGoogle_content_title {
			width: 100%;
			height: .5rem;
			line-height: .3rem;
			text-align: center;
		}
		/*二维码部分*/
		.code_img {
			width: 100%;
			display: flex;
			flex-direction: column;
			align-items: center;
			margin-top: .25rem;
			img {
				display: block;
				width: 1.1rem;
				height: 1.1rem;
			}
			.code {
				margin-top: .3rem;
				.copy {
					color: #7d86fb;
				}
			}
		}
		/*保存二维码*/
		.erweima_code {
			width: 100%;
			box-sizing: border-box;
			color: #383c74;
			margin-top: 1rem;
			display: flex;
			justify-content: center;
			span {
				width: 2.7rem;
				display: inline-block;
			}
		}
	}

	.submit {
		width: 2.7rem;
		height: .38rem;
		margin: .4rem auto;
		button {
			width: 100%;
			height: .38rem;
			border: $submit_borderColor;
			background: $submit_color;
			color: #fff;
			outline: none;
		}
	}
	/*******输入谷歌验证码样式********/

	.security-code-wrap {
		overflow: hidden;
	}

	.security-code-container {
		margin: 0;
		padding: 0;
		display: flex;
		justify-content: center;
		justify-content: space-around;
		.field-wrap {
			list-style: none;
			display: block;
			width: .40rem;
			height: 40px;
			line-height: 40px;
			font-size: 16px;
			margin: 2px;
			text-align: center;
			color: #fff;
			.char-field {
				font-style: normal;
			}
			border-bottom:0.02rem solid #4d53ab;
		}
	}

	.input-code {
		position: absolute;
		left: -9999px;
		top: -99999px;
		width: 0;
		height: 0;
		opacity: 0;
		overflow: visible;
		z-index: -1;
	}
	/*谷歌头部*/

	.register_header {
		width: 100%;
		height: .5rem;
		line-height: .5rem;
		position: relative;
		color: #fff;
		background: rgb(20, 23, 56);
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
	/*谷歌验证码*/

	.google_code {
		width: 100%;
		height: .5rem;
		line-height: .5rem;
		box-sizing: border-box;
		padding-left: .1rem;
		font-size: .14rem;
	}
</style>
