<template>
	<div id="inviteFriends">
		<!--推广邀请好友图片-->
		<div class="inviteFriends_header">
			<img src="../../../assets/noLoginBg.jpg" v-if="lang=='zh-CN'" /> 
			<img src="../../../assets/bannerEN.jpg" v-if="lang!='zh-CN'" />  	
			<router-link tag="p" to="/index/login" class="buttonLogin">{{$t("inviteFriends.Logcashback")}}</router-link>
		</div>
		<!--imx返利特权-->
		<div class="Rebate">			
			<div class="Rebate_content">
				<ul class="content">
					<p class="title">{{$t("inviteFriends.Activityrules")}}</p>
					<li>{{$t("inviteFriends.ActivityrulesO")}}</li>		
				</ul>
			</div>
		</div>

	</div>
</template>

<script>
import { mapGetters,mapActions,mapState,mapMutations } from 'vuex'
	export default {
		name:"invite",
		data(){
			return{
			}
		},
		computed: {
			...mapState('user',['lang']),
		},
	}
</script>

<style lang="scss">
	#inviteFriends {
		color: #fff;
	}
	/*推广好友图片*/

	.inviteFriends_header {
		width: 100%;
		max-height: 570px;
		position: relative;
		.buttonLogin {
			position: absolute;
			left: 50%;
			bottom: 25%;
			margin-left: -115px;
			width: 235px;
			height: 60px;
			background: #837ddf;
			color: #fff;
			text-align: center;
			line-height: 60px;
			font-size: 20px;
			border-radius: 4px;
			cursor: pointer;
		}
		img {
			width: 100%;
			height: 100%;
		}
	}
	/*返利盒子*/

	.Rebate {
		width: 90%;
		margin: 35px auto;
		.Rebate_title {
			width: 100%;
			height: 260px;
			background: #16172c;
			.title {
				width: 100%;
				text-align: center;
				line-height: 75px;
				font-size: 22px;
			}
			.Rebate_wrapper {
				width: 100%;
				height: 180px;
				display: flex;
				.Rebate_item {
					flex: 1;
					text-align: center;
					img {
						width: 120px;
						height: 120px;
					}
					.text {
						font-size: 13px;
						line-height: 60px;
					}
				}
			}
		}
		.Rebate_content {
			width: 100%;
			box-sizing: border-box;
			padding: 0 30px 20px 30px;
			background: #16172c;
			margin-top: 35px;
			.title{
				line-height: 70px;
				font-size: 18px;
			}
			li{
				line-height: 30px;
				color: #9799b0;
			}
		}
	}
</style>
