<template>
	<div id="inviteNoLogin">
		 <my-header :text="titleText"></my-header>
		 <!--邀请返佣头部-->
		 <div class="inviteNoLogin_header">
		 	<div class="balane">
		 		<img src="../../../assets/letter.png" />
		 		<ul class="balane_right">
		 			<li>{{$t("RevenueRecord.InviteFriends")}}</li> 
		 			<li>{{$t("RevenueRecord.receiveImx")}}</li> 
		 		</ul>	
		 	</div>  
		 	<div class="Tologin">
		 		<router-link tag="button" to="/login">{{$t("inviteFriends.Logcashback")}}</router-link>
		 	</div>
		 </div>

	</div>
</template>

<script>
/*引入头部*/
	import header from "../../public/backHeader"
	export default{
		data(){
			return{
				titleText:this.$t("userCenter.Invitationprogram")
			}
		},
		mounted(){

		},
		components: { /*注册组件*/
			"my-header": header,
		},
	}
</script>

<style lang="scss" scoped>
#inviteNoLogin{
	color: #fff;
	background: #191d38;
	width: 100%;
	min-height: 100%;
}
/*邀请头部*/
.inviteNoLogin_header{
	width: 100%;
	height: 1.8rem;
	box-sizing: border-box;
	padding: 0 .1rem;
	background: url(https://imxpro.oss-cn-beijing.aliyuncs.com/blockchain.png) no-repeat;
	background-size: 100% 100%;
	.balane{
		width: 100%;
		height: 1.1rem;
		display: flex;
		align-items: center;
		img{
			width: 1rem;
			height: 1rem;
		}
		ul{
			flex: .95;
		}
		li{
			text-align: right;
			line-height: .2rem;
		}
	}
	.Tologin{
		height: .6rem;
		display: flex;
		justify-content: center;
		align-items: center;
		button{
			width: 1.25rem;
			height: .4rem;
			background: #119ca0;
			color: #fff;
			font-size: .15rem;
			border: none;
			border-radius: 4px;
		}
	}
}
/*邀请特权*/
.privilege{
	width: 100%;
	height: .6rem;
	text-align: center;
	line-height: .6rem;
	font-size: .15rem;
}
/*交易手续费用*/
.Fees{
	width: 90%;
	margin: 0 auto;
	display: flex;
	flex-wrap: wrap;
	justify-content: space-between;
	.wrapper{
		width: 100%;
		display: flex;
		align-items: center;
		flex-direction: column;
		background: #1d2345;
		margin: .15rem 0;
		.icon{
			width: .5rem;
			height: .5rem;
			text-align: center;
			line-height: .5rem;
			border: 1px solid #49d7f4;
			box-sizing: border-box;
			border-radius: 50%;
			.iconfont{
				font-size: .37rem;
				color: #49d7f4;
			}
		}
		.text{
			line-height: .5rem;
		}
	}
	.item:nth-of-type(1){
		margin-right: .1rem;
	}
	.item{
		flex: .49;
		box-sizing: border-box;
		padding: 0 .1rem;
		display: flex;
		flex-direction: column;
		align-items: center;
		background: #1d2345;
		padding-bottom: .16rem;
		border-radius: 4px;
		.icon{
			width: .5rem;
			height: .5rem;
			border: 1px solid #49d7f4;
			box-sizing: border-box;
			border-radius: 50%;
			text-align: center;
			line-height: .5rem;
			margin-bottom: .1rem;
			margin-top: .2rem;
			.iconfont{
				font-size: .37rem;
				color: #49d7f4;
			}
			.icon-iconfont{
				display: inline-block;
				margin-top: .022rem;
			}
		}
	}
}



</style>
