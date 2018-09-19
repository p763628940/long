<template>
	<div id="Repurchasedetails">
		<!--回购详情头部-->
		<div class="Repurchasedetails_header">
			<div class="content">
				<p class="title">{{$t("repurchasede.Publicdetails")}}</p>
				<p class="text">{{$t("repurchasede.Userscheck")}}</p>
			</div>
		</div>
		<!--锁仓地址和区块链查询-->
		<div class="addressAndList">
			<div class="Lockingaddress">
				<div class="oleft">
					<span class="address">{{$t("repurchasede.lockedaddress")}}</span>
					<span class="addressUrl">0x93780cbA4E4af3C98F8b2155b990F83b926BFd09</span>
				</div>
				<button class="Inquire" @click="openInquire">{{$t("repurchasede.Blockchainexp")}}
				</button>
			</div>
			<!--回购记录-->
			<div class="Reporecord">
				<div class="Reporecord_title">
					<span>{{$t("repurchasede.Repurchasehistory")}}</span>
					<!--<p class="time">
						<el-date-picker
					      v-model="selectTime"
					      type="month"
					      placeholder="选择月份"
					      @change="select"
					      >
					    </el-date-picker>
					</p>-->
				</div>
				<!--内容部分-->
				<div class="Reporecord_content">
					<ul class="Reporecord_wrapper">
						<li class="Reporecord_header">
							<p class="time">{{$t("repurchasede.Repurchasetime")}}</p>
							<p class="recording">{{$t("repurchasede.RepurchasedIMXnum")}}</p>
						</li>
						<li class="Reporecord_header" v-for="item in repoRecordList">
							<p class="time">{{formatTime(item.dateTime).split(" ")[0]}}</p>
							<p class="recording">{{item.buy_count | number(8)}}</p>
						</li>
					</ul>
				</div>
			</div>
		</div>

	</div>
</template>

<script>
	import axios from "axios"
	import { httpUrl } from "../../http_url/http_url.js";
export default{
	data(){
		return{
			selectTime:"",   /*选择时间*/
			repoRecordList:[]    /*回购记录*/
		}
	},
	methods:{
		openInquire(){
			window.open("https://etherscan.io/address/0x93780cbA4E4af3C98F8b2155b990F83b926BFd09")
		}
	},filters: {
			//小数点过滤器 不四舍五入
			number(value, num) {
				var toFixedNum = Number(value).toFixed(num +1);
				var realVal =toFixedNum.substring(0,toFixedNum.lastIndexOf('.')+num +1);
				return realVal;
			}
		},

	mounted(){
		let _this = this;
		axios.get(httpUrl.repoRecord).then(function(res){
			_this.repoRecordList = res.data.data;
		},function(err){
			console.log(err)
		})
	}
}
</script>
<style lang="scss">
	.el-input--prefix .el-input__inner{
		text-align: center;
		font-size: 16px;
	}
</style>
<style lang="scss" scoped>
#Repurchasedetails{
	width: 100%;
	background: #121b4e;
	color: #fff;
}
.Repurchasedetails_header{
	width: 100%;
	height: 320px;
	background: url(../../../assets/RepurchaseBg.png) no-repeat;
	background-size: 100% 100%;
	display: flex;
	justify-content: center;
	.content{
		width: 80%;
		text-align: center;
		.title{
			font-size: 40px;
			line-height: 100px;
			margin-top: 50px;
		}
		.text{
			font-size: 16px;
			line-height: 30px;
		}
	}
}
.addressAndList{
	width: 85%;
	margin: 0 auto;
	.Lockingaddress{
		width: 100%;
		height: 120px;
		background: #6c74c7;
		display: flex;
		align-items: center;
		justify-content: space-between;
		border-radius: 4px;
		box-sizing: border-box;
		/*padding: 0 20px;*/
		.address{
			flex: .15;
			font-size: 20px;
			text-align: center;
			margin-left: 30px;
			margin-right: 24px;
		}
		.addressUrl{
			flex: .7;
			font-size: 15px;
		}
		.Inquire{
			width: 150px;
			height: 50px;
			border-color:#4049a4;
			background: #4049A4;
			border-radius: 4px;
			border-radius: 4px;
			font-size: 18px;
			color: #fff;
			margin-right: 20px;
			outline: none;
			span{
				color: #fff;
			}
		}
	}
}
.Reporecord{
	width: 100%;
	margin: 0 auto;
	margin-top: 70px;
	box-sizing: border-box;
	padding-bottom: 50px;
	.Reporecord_title{
		width: 100%;
		height: 70px;
		display: flex;
		justify-content: space-between;
		align-items: center;
		background: #6c74c7;
		box-sizing: border-box;
		padding: 0 20px;
		font-size: 20px;
	}
	.Reporecord_content{
		.Reporecord_wrapper{
			width: 100%;
			box-sizing: border-box;
			border: 2px solid #4b558a;
			border-top: none;
			li{
				width: 100%;
				height: 55px;
				line-height: 55px;
				display: flex;
				justify-content: space-between;
				box-sizing: border-box;
				padding: 0 20px;
				font-size: 14px;
			}
			li:nth-of-type(even){
				background: #293066;
			}
		}
	}
}


</style>
