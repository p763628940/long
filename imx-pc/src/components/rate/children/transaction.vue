<template>
	<div id="transaction" >			
		<!--交易手续费-->
		<div class="transaction_title">
			<p>
				{{$t("Rates.TransactionFees")}}	 													
			</p>
		</div>
		<!--交易手续费内容-->
		<div class="transaction_content" :class="{'transaction_content_white':getColor == 1}">
			<table class="transaction_content_title" :class="{'transaction_color':getColor==1}">
				<tr>
					<td>{{$t("Rates.Pairs")}}</td>
					<td>{{$t("Rates.Maker")}}</td>
					<td>{{$t("Rates.Taker")}}</td>
				</tr>
				<tr v-for="item in rateList" class="rateList">
					<td>{{item.currency.pageIdentifier}}/{{item.currency_main.pageIdentifier}}</td>
					<td>{{item.lodging_fee*100}}%</td>
					<td>{{item.lodging_fee*100}}%</td>
				</tr>
			</table>
	
		</div>

	</div>
</template>

<script>
	import axios from "axios";
	import { httpUrl } from "../../http_url/http_url";
	export default {
		data() {
			return {
				rateList: [] ///获取费率用的列表
			}
		},
		mounted() {
			let _this = this;
			axios.get(httpUrl.transactionRate).then(function(res) {
				_this.rateList = res.data.data;
			}, function(err) {
				console.log(err)
			})
		}
	}
</script>

<style lang="scss">
	/*白色背景版本开始*/
	.transaction_content_white{
		border: 1px solid #ddd !important;
		background: #fff !important;
	}
	.transaction_color{
		td{ 
			color: #000 !important;
		}
	}
	
	
	
	
	
	
	/*白色背景版本结束*/
	#transaction {
		color: #fff;
	}
	/*头部*/
	
	.transaction_title {
		width: 100%;
		height: 45px;
		line-height: 45px;
		p {
			display: inline-block;
			padding: 0 35px;				
			height: 45px;
			background: #272867;
			text-align: center;
			line-height: 45px;
			font-size: 14px;
		}
	}
	/*内容*/
	
	.transaction_content {
		width: 100%;
		background: #16182c;
		.transaction_content_title {
			width: 100%;
			tr {
				width: 100%;
				height: 50px;
				line-height: 50px;
			}
			/*数据展示内容*/
			.rateList {
				td {
					color: #fff;
				}
				td:nth-of-type(3) {
					padding-right: 27px;
				}
			}
			td {  								
				color: #8680ac;		
			}
			td:nth-of-type(1) {
				text-align: left;
				box-sizing: border-box;
				padding-left: 20px;
			}
			td:nth-of-type(2) {
				text-align: center;
			}
			td:nth-of-type(3) {
				text-align: right;
				box-sizing: border-box;
				padding-right: 20px;
			}
		}
	}
</style>