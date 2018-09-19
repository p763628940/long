<template>
	<div id="rate">
		<!--费率-->
		<div class="rate_content">
			<div class="rate_content_left" :class="{'rate_content_left_white':getColor==1}">
				<li>
					<i class="iconfont icon-tixianfeishuai"></i> {{$t("Rates.Rates")}}
				</li>
				<router-link to="/index/rate/transaction" tag="li">{{$t("Rates.TransactionFees")}}</router-link>
				<!--<router-link to="/index/rate/transactionvip" tag="li">VIP费率折扣</router-link>--> 
			</div>
			<div class="rate_content_right">
				<router-view></router-view>
			</div> 
			<div style="clear: both;"></div> 
		</div>

	</div>
</template>

<script>
	export default {
		data() {
			return {
					
			}
		}
	}
</script>

<style lang="scss">
	/*白色版本开始*/
	.rate_content_left_white{
		border: 2px solid #eee !important;
		color: #000 !important;
		li:nth-of-type(1){
			background: #fff !important;
			color: #000 !important;
		}
		.router-link-active{
			background: #f5f5f5 !important;
		}
	}
	
	
	/*白色版本结束*/
	/*费率*/
	.rate_content {
		width: 80%;
		/*height: 50px;*/
		/*border: 1px solid red;*/
		margin: 25px auto;
		.rate_content_left {
			width: 180px;
			float: left;
			text-align: center;
			float: left;
			font-size: 15px;
			color: #fff;
			box-sizing: border-box;
			padding: 10px 10px;
			border-radius: 4px;
			background:#16182c;
			li {
				width: 100%;
				height: 50px;
				line-height: 50px;
				cursor: pointer;
			}
			li:nth-last-child(1) {
				border-bottom: none;
			}
			.router-link-active{
				background: #2e3157;
			}
		}
		.rate_content_right {
			width: 82%;
			height: 30px;
			float: right;
		}
	}
</style>