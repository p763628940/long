<template>
	<div id="userCenter" >
		<!--左侧选项部分-->
		<div class="userContainer">
			<div class="user-container-left" >
				<!--个人中心-->
				<ul class="userYan" :class="{'userCenter_white':getColor==1}">
					<li>
						<i class="iconfont icon-yonghu"></i> {{$t("userCenter.PersonalCenter")}}
					</li>
					<router-link :to="{name:'Accountsecurity',params:{bangdin:noMoney}}" tag="li">
						{{$t("userCenter.AccountSecurity")}}
					</router-link>
          <!-- :to="{name:'identity',params:{type:type}}" -->
					<router-link to="/index/userCenter/Authentication"  tag="li">
						{{$t("userCenter.Authentication")}}
					</router-link>
				</ul>
				<!--交易设置-->
				<ul class="set-jy" :class="{'userCenter_white':getColor==1}">
					<li>
						<i class="iconfont icon-msnui-protect"></i> {{$t("userCenter.TransactionSettings")}}
					</li>
					<router-link to="/index/userCenter/zhanghu" tag="li">
						{{$t("userCenter.accountsecurity")}}
					</router-link>
				</ul>

			</div>
			<!--右侧路由切换内容部分-->
			<div class="user-container-right">
				<router-view></router-view>
			</div>
		</div>
		<!--蒙版部分isShowUser-->
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
						{{$t("userCenter.NotCompleted")}}<span class="renz" @click="clickGo">{{$t("userCenter.Nowgoto")}}</span>
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
	import axios from "axios";
	import { httpUrl } from "../http_url/http_url"; ///引入路径

	export default {
		data() {
			return {
				isShowUser:false,
				type:"",
				noMoney:"no"
			}
		},
		created(){
			if(this.$route.params.type=="Jump"){
				this.type = "Jump"
			}else{
				this.type = "normal"
			}
		},
		mounted() {
			var _this = this;
			/*获取用户信息*/
//			axios.get(httpUrl.userInfo, {
//				headers: {
//					"Authorization": "Bearer " + _this.token
//				}
//			}).then(function(res) {
//				/*判断用户的是否输入身份证*/
//				if(res.data.data.idCard == ""){
//					_this.isShowUser = true;
//				}
//			}, function(err) {
//				console.log(err)
//			})
		},

		methods:{
			clickGo(){
				this.isShowUser = false;
				this.$router.push("/index/userCenter/identity");
			}
		}
	}
</script>

<style scoped lang="scss">
	/*白色版本部分*/
	.userCenter_white{
		color: #000 !important;
		background: #fff !important;
		border: 1px solid #ddd !important;
		.router-link-exact-active{
			background: #eee !important;
		}
		li{
			border-bottom: 1px solid #eee !important;
		}
	}
	.force_white{
		.force-text{
			background: #fff !important;
			.force-title{
				color: #333 !important;
				border-bottom: 1px solid #ddd !important;
			}
			.force-box{
				color: #333 !important;
				border-bottom: 1px solid #ddd !important;
			}
			.confirm-cancel{
				color: #333 !important;
				p:nth-of-type(1){
					border-right: 1px solid #ddd !important;
				}
			}
		}
	}
		/*边框内容*/
	.border_nei {
		width: 100%;
		height: 100%;
		box-sizing: border-box;
		border: 3px solid #0b0b15;
	}
	/*判断是否在小频*/
	@media only screen and (max-width:1450px) {
		.userContainer {
			width: 90% !important;
		}
	}

	@media only screen and (max-width:1280px) {
		.userContainer {
			width: 95% !important;
		}
	}
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
			.force-text{
				width: 475px;
				height: 255px;
				position: absolute;
				left: 35%;
				top: 20%;
				color: #fff;
				background: #22223f;
				/*头部内容*/
				.force-title{
					width: 100%;
					height: 55px;
					line-height: 55px;
					border-bottom: 1px solid #4e4a76;
					span{
						float: left;
						margin-left: 20px;
						font-size: 16px;
					}
					.iconfont{
						float: right;
						margin-right: 20px;
						cursor: pointer;
					}
				}
				/*实名认证中间内容*/
				.force-box{
					width: 100%;
					height: 145px;
					text-align: center;
					line-height: 145px;
					font-size: 16px;
					border-bottom: 1px solid #4e4a76;
					.renz{
						color: #7478e9;
						cursor: pointer;
					}
				}
				/*确认按钮和取消按钮部分*/
				.confirm-cancel{
					width: 100%;
					height: 52px;
					line-height: 52px;
					font-size: 16px;
					p{
						width: 50%;
						text-align: center;
						float: left;
						box-sizing: border-box;
						cursor: pointer;
					}
					p:nth-of-type(1){
						border-right: 1px solid #4e4a76;
					}
				}
			}
		}
	}

	.userContainer {
		width: 80%;
		/*border: 1px solid red;*/
		margin: 22px auto;
		.user-container-left {
			width: 200px;
			float: left;
			.router-link-active {
				background: #2e3157;
			}
			/*左侧内容部分*/
			.userYan {
				width: 100%;
				text-align: center;
				font-size: 15px;
				color: #fff;
				border-radius: 4px;
				background:#16182c;
				box-sizing: border-box;
				padding: 10px 10px;
				li:nth-of-type(1) {
					text-align: left;
					box-sizing: border-box;
					text-align: center;
				}
				.iconfont{
					margin-right: 8px;
				}
			}
			li {
				width: 100%;
				height: 50px;
				line-height: 50px;
				cursor: pointer;
			}
			.set-jy {
				@extend .userYan;
				margin-top: 30px;
				.iconfont{
					font-size: 18px;
				}
			}
		}
		.user-container-right {
			width: 82%;
			/*border: 1px solid red;*/
			float: right;
		}
	}
	/*清除浮动*/

	.userContainer:after {
		display: block;
		clear: both;
		content: "";
		visibility: hidden;
		height: 0
	}

	.userContainer {
		zoom: 1
	}

	/*修改内容*/
	/*内部边框*/
	.border_nei {
		width: 100%;
		height: 100%;
		box-sizing: border-box;
		border: 3px solid #0b0b15;
	}

</style>
