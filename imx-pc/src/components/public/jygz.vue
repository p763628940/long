<template>
	<div id="details">
		<!--交易规则的内容部分-->
		<div class="details_content">
			<div class="details_title" :class="{'notice_title_white':getColor == 1}">
				<p>{{$t("fbjy.TransactionRegulations")}}</p>
			</div>
			<!--交易规则内容-->
			<div class="uaerContent" :class="{'uaerContent_wrapper':getColor == 1}">
				<!--须知提示-->
				<div class="important">
					<p>
						{{$t("public.BuyerNotice")}}
					</p>
				</div>
				<!--提示内容部分-->
				<div class="ti_shi">
					{{$t("public.BuyerNotes1")}}<br />{{$t("public.BuyerNotes2")}}
					<br />{{$t("public.BuyerNotes3")}}
					<br />{{$t("public.BuyerNotes4")}}
					<br />{{$t("public.BuyerNotes5")}}
					<br />{{$t("public.BuyerNotes6")}}
					<br />{{$t("public.BuyerNotes7")}}
					<br />{{$t("public.BuyerNotes8")}}
					<br />{{$t("public.BuyerNotes9")}}
					<br />{{$t("public.BuyerNotes10")}}
					<br />{{$t("public.BuyerNeed1")}}<br> {{$t("public.BuyerNeed2")}}<br>{{$t("public.BuyerNeed3")}}<br> {{$t("public.BuyerNeedNote")}}
					<br /> {{$t("public.RemittanceLogo")}}
					<br> {{$t("public.NotFillKeywords")}}
					<br>

					<p>{{$t("public.SellerNotes")}}</p>
					{{$t("public.SellerNotes1")}}<br> {{$t("public.SellerNotes2")}}
					<br>{{$t("public.SellerNotes3")}}
					<br> {{$t("public.CancelSellerCert")}}
					<br>{{$t("public.SellerNotes4")}}
					<br>{{$t("public.SellerNotes5")}}
					<br>{{$t("public.SellerNotes6")}}
					<br>{{$t("public.SellerNeed1")}}<br>{{$t("public.SellerNeed2")}}<br>{{$t("public.SellerNeed3")}}<br>{{$t("public.SellerNeedNote")}}
					<br>

					<p>{{$t("public.MakerUserNote")}}</p>
          {{$t("public.MakerUserNote1")}}<br>{{$t("public.MakerUserNote2")}}
					<br>{{$t("public.MakerUserNote3")}}
					<br>{{$t("public.MakerUserNote4")}}
					<br> {{$t("public.MakerUserNote5")}}<br>{{$t("public.MakerUserNote6")}}
					<br>{{$t("public.MakerUserNote7")}}
					<br>

					<p>{{$t("public.TakerUserNote")}}</p>
          {{$t("public.TakerUserNote1")}}<br>{{$t("public.TakerUserNote2")}}<br>

				</div>

			</div>

		</div>

	</div>
</template>

<script>
	export default {
		data() {
			return {
                //   getColor: window.localStorage.getItem("setColor"),
			}
		}
	}
</script>

<style lang="scss">
	/*白色版本开始*/

	.notice_title_white {
		border-bottom: 2px solid #312e67 !important;
		p {
			background: #312e67 !important;
		}
	}

	.uaerContent_wrapper {
		background: #fff !important;
		border: 2px solid #eee !important;
		color: #666 !important;
		p {
			color: #333 !important;
		}
	}
	/*白色版本结束*/
	/*交易规则主要内容部分*/

	.uaerContent {
		width: 100%;
		border: 2px solid #515774;
		margin-top: 40px;
		line-height: 30px;
		box-sizing: border-box;
		padding: 0 20px;
		/*须知提示*/
		.important {
			font-size: 16px;
			line-height: 40px;
		}
		/*提示内容*/
		.ti_shi {
			width: 100%;
			font-size: 13px;
			p {
				font-size: 16px;
				margin: 40px 0 10px 0;
			}
		}
	}

	#details {
		color: #fff;
	}
	/*规则头部*/

	.details_content {
		width: 70%;
		margin: 20px auto;
	}
	/*内容头部*/

	.details_title {
		width: 100%;
		height: 45px;
		width: 100%;
		border-bottom: 2px solid #515774;
		border-left: 2px solid #515774;
		p {
			width: 150px;
			height: 45px;
			text-align: center;
			font-size: 16px;
			line-height: 45px;
			color: #fff;
			background: #383962;
		}
	}
</style>
