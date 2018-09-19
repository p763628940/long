<template>
	<div id="ProductFeedback">
		<!--产品反馈-->
		<my-header :text="headerText"></my-header>
		<!--反馈内容-->
		<div class="content">
			<p class="title">
				<span>{{$t("userCenter.Correctway")}}</span>
			</p>
			<ul class="text">
				<p>{{$t("userCenter.Problemdescription")}}</p>
				<li>{{$t("userCenter.Recordmobilephone")}}</li>
				<li>{{$t("userCenter.Steps")}}</li>
				<li>{{$t("userCenter.Bugdisplaysresults")}}</li>
			</ul>
		</div>
		<!--我要反馈-->
		<div class="submit">
			<button @click="fankuiIsShow=true">{{$t("userCenter.Itofeedback")}}</button>
		</div>
		<!--反馈内容-->
		<mt-popup v-model="fankuiIsShow" position="right">
			<div class="header_box">
				<div class="register_header">
					<p class="back" @click="fankuiIsShow=false">
						<i class="iconfont icon-zuojiantou"></i>
					</p>
					<p class="register_type">
            {{$t("userCenter.Productfeedback")}}
					</p>
				</div>
			</div>
			<!--产品反馈内容部分-->
			<div class="problem">
				<p class="title">
					<span>{{$t("userCenter.Problemdescription")}}</span>
				</p>
				<p class="main_content">
					<textarea :placeholder="$t('userCenter.Describespecific')" v-model="textContent"></textarea>
				</p>
				<dl class="img">
					<dd v-show="!isText">
						<i class="iconfont icon-tupian"></i>
					</dd>
					<dd v-show="isText" class="imgName">
						<span>{{imgText}}</span>
					</dd>
					<input type="file" @change="getFile($event)" accept="image/png,image/gif,image/jpg,image/jpeg" class="WeChat-file" />
				</dl>
			</div>
			<!--确认提交-->
			<div class="submit">
				<button @click="addBug">{{$t("capital.Confirm")}} {{$t("login.Submit1")}}</button>
			</div>
		</mt-popup>
	</div>
</template>

<script>
	import header from "../../public/backHeader"
	export default {
		data() {
			return {
				headerText:  this.$t("userCenter.Productfeedback"),
				fankuiIsShow: false,
				/*反馈内容*/
				textContent: "",
				/*输入内容*/
				isText: false,
				/*显示图片内容*/
				imgText: "",
				/*图片路径*/
				fileImg: "" /*上传的图片*/
			}
		},
		methods: {
			getFile(e) { /*添加*/
				var file = e.target.files[0];
				this.fileImg = e.target.files[0];
				this.imgText = file.name;
				if(file.name != "") {
					this.isText = true;
					this.imgText = file.name;
				}
			},
			addBug() { /*提交bug*/
				let _this = this;
				if(this.textContent.length < 5) {
					_this.$message({
						showClose: true,
						message: _this.$t("userCenter.Bugcontent"),
						type: 'error',
						duration: 2000
					});
					return false;
				}
				var param = new FormData(); //创建form对象
				param.append('content', _this.textContent); //通过append向form对象添加数据
				if(_this.fileImg != "") {
					param.append('photo', _this.fileImg)
				}
				this.$ajax.post(this.httpUrl.addFeedback, param, {
					headers: {
						"Authorization": "Bearer " + _this.token,
						'Content-Type': 'multipart/form-data'
					}
				}).then(function(res) {
					if(res.data.status.code == 200) {
						_this.fankuiIsShow = false;
						_this.$message({
							message: _this.$t("userCenter.Dearusers"),
							type: 'success',
							duration: 2000
						});
						_this.textContent="";
						_this.fileImg = "";
						_this.isText = false;
						_this.imgText = "";
					}
				}, function(err) {
					console.log(err)
				})
			}
		},
		components: {
			"my-header": header
		}
	}
</script>
<style lang="scss">
	#ProductFeedback {
		.mint-popup {
			width: 100%;
			height: 100%;
			background: #141738;
			overflow-y: auto;
		}
		.mint-popup-right {
			width: 100%;
			height: 100%;
			background: #141738;
		}
		.el-message {
			/*width: 2.5rem;*/
			min-width: 2.5rem;
		}
		.el-message--success {
			background-color: #fff;
			border-color: #e1f3d8;
			border-top: 2px solid #22d9b8;
		}
		.el-message .el-icon-success {
			font-size: .15rem;
			color: #22d9b8;
		}
		.el-message--success .el-message__content {
			color: #000;
		}
	}
</style>
<style lang="scss" scoped>
	#ProductFeedback {
		color: #fff;
	}

	$bg_color:#141738;
	/*边框线*/

	$border_bottom:0.01rem solid #1b1d40;
	$submit_color:#373959;
	/*登录线条*/

	$submit_borderColor:1px solid #9fa0af;
	/*按钮边框颜色*/

	$header_bg:#141738;
	.content {
		width: 100%;
		height: 2.1rem;
		background: $bg_color;
		margin-top: .1rem;
		.title {
			width: 100%;
			height: .4rem;
			line-height: .4rem;
			box-sizing: border-box;
			padding-left: .1rem;
			font-size: .13rem;
			border-bottom: $border_bottom;
		}
		.text {
			width: 100%;
			box-sizing: border-box;
			padding-left: .1rem;
			p {
				line-height: .2rem;
				margin-bottom: .1rem;
			}
			li {
				line-height: .2rem;
			}
		}
	}
	/*提交*/

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
	/*币种选择头部*/

	.register_header {
		width: 100%;
		height: .5rem;
		line-height: .5rem;
		position: relative;
		color: #fff;
		background: rgb(20, 23, 56);
		border-bottom: .1rem solid #121528;
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
	/*产品反馈内容*/

	.problem {
		width: 100%;
		background: $bg_color;
		.title {
			width: 100%;
			height: .32rem;
			line-height: .32rem;
			border-bottom: $border_bottom;
			box-sizing: border-box;
			padding-left: .12rem;
			font-size: .14rem;
		}
		.main_content {
			width: 100%;
			textarea {
				width: 95%;
				height: .9rem;
				box-sizing: border-box;
				color: #fff;
				background: none;
				display: block;
				margin: .1rem auto;
			}
			textarea::-webkit-input-placeholder {
				color: #fff;
			}
		}
		/*上传图片*/
		.img {
			width: 100%;
			height: .6rem;
			position: relative;
			input {
				opacity: 0;
				width: 50%;
				height: .6rem;
				margin-left: .1rem;
			}
			dd {
				position: absolute;
				left: .1rem;
				top: 0;
				width: .6rem;
				height: .6rem;
				border: 1px dashed #fff;
				text-align: center;
				line-height: .6rem;
			}
			.imgName {
				white-space: nowrap;
				text-overflow: ellipsis;
				overflow: hidden;
			}
		}
	}
</style>
