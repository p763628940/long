<template>
	<div id="zijing">
		<div id="zijing-content">
			<!--左侧选项部分-->
			<div class="zhijing-left" :class="{'zhijing_left_white':getColor==1}">
				<ul>
					<li>
						<i class="iconfont icon-yonghu"></i> {{$t("SupperWallet.WalletManagement")}}
					</li>
					<router-link to="/index/capital/Trading_account" tag="li">{{$t("WalletManagement.MyWallets")}}</router-link>
					<router-link to="/index/capital/Red_Coins" tag="li">{{$t("capital.Deposit")}}</router-link>
					<router-link to="/index/capital/tibi" tag="li">{{$t("capital.Withdraw")}}</router-link>
					<router-link to="/index/capital/money_Record" tag="li">{{$t("capital.Fundrecords")}}</router-link>
					<router-link to="/index/capital/Currency_address" tag="li">{{$t("capital.Withdrawaddress")}}</router-link>
				</ul>
			</div>
			<!--右侧内容部分-->
			<div class="zhijing-right">
				<router-view></router-view>
			</div>
			<div style="clear: both;" class="oClear"></div>
		</div>
    <my-footer></my-footer>
	</div>
</template>

<script>
  import mybottom from "../public/Homefooter"
export default{
	name:"capital",
  components: {
    "my-footer": mybottom
  },
}
</script>

<style lang="scss">
	/*白色版本开始*/
	/*左侧选项部分*/

	.zhijing_left_white {
		background: #f7f6fc !important;
		li {
			color: #333 !important;
		}
		.router-link-active {
			color: #7773f4 !important;
			background: #eceef6 !important;
		}
	}
	/*白色版本结束*/
	/*媒体查询*/

	@media only screen and (max-width: 1400px) {
		#zijing-content {
			width: 90% !important;
		}
	}
	@media only screen and (max-width: 1250px) {
		#zijing-content {
			width: 95% !important;
		}
	}
	/*资金管理部分*/

	#zijing {
		width: 100%;
		#zijing-content {
			width: 85%;
			margin: 0 auto;
			margin-top: 20px;
			/*左侧选项列表*/
			.zhijing-left {
				width: 200px;
				text-align: center;
				float: left;
				font-size: 15px;
				color: #fff;
				border-radius: 4px;
				background: #16182c;
				box-sizing: border-box;
				padding: 10px 10px;
				.router-link-active {
          color: #13f2fa;
					background: #22244b;
				}
				li {
					width: 100%;
					height: 50px;
					line-height: 50px;
					cursor: pointer;
				}
				li:nth-of-type(1) {
					text-align: left;
					box-sizing: border-box;
          display: flex;
          align-items: center;
          justify-content: center;
          .iconfont{
            margin-right: 5px;
          }
				}
				li:nth-last-child(1) {
					border: none;
				}
			}
			/*右侧内容部分*/
			.zhijing-right {
				width: 82%;
				/* border: 1px solid red; */
				float: right;
			}
		}
	}
  .oClear{
    width: 100%;
    height: 50px;
  }
</style>
