<template>
	<div class="Help">
		<!--帮助中心-->
		<div class="details_content">
			<div class="details_title" :class="{'notice_title_white':getColor == 1}">
				<p>{{$t("list.Help_center")}}</p>
			</div>
			<div class="uaerContent" :class="{'uaerContent_wrapper':getColor == 1}">
				<!--重要提示-->
				<p class="title">
					{{$t("public.NotPassAdvanced")}}
				</p>
        {{$t("public.EmailContent")}}<br />
        {{$t("public.InvitationCode")}}<br />
        {{$t("public.BindEmailPhone")}}<br />
        {{$t("public.BothSidesOfCard")}}<br />
				{{$t("public.HoldingCard")}}<br />
				{{$t("public.StatementFollows")}}<br />
				{{$t("public.FullyClear")}}<br />
				{{$t("public.ValidNotModified")}} <br />
				{{$t("public.HoldAndHandwrittennt")}}
			</div>
		</div>
	</div>
</template>

<script>
</script>

<style lang="scss">
		/*白色版本*/
	.notice_title_white{
		border-bottom: 2px solid #312e67 !important;
		p {
			background: #312e67 !important;
		}
	}
	.uaerContent_wrapper{
		background: #fff !important;
		border: 2px solid #eee !important;
		color: #666 !important;
		p{
			color: #333 !important;
		}
	}
		/*高级帮助头部*/
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
	/*用户中心*/
	.uaerContent{
		width: 100%;
		border: 2px solid #515774;
		margin-top: 40px;
		line-height: 30px;
		box-sizing: border-box;
		padding: 10px 20px;
		color: #fff;
		.title{
			font-size: 16px;
			line-height: 40px;
		}
	}







</style>
