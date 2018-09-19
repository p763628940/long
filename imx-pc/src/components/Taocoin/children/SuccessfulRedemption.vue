<template>
	<div id="SuccessfulRedemption">
		<div class="SuccessContent">
			<div class="oleft">
				<p class="border">
					<i class="iconfont icon-duihao"></i>
				</p>
			</div>
			<div class="oright">
				<p class="success">
					<span>{{$t("taocoin.ExchangeSuccess")}}</span>
				</p>
				<div class="prompt">
          {{$t("taocoin.AssetManagement")}}
					<p>
						{{$t("taocoin.MoreCoinExchange")}}“<router-link tag="span" class="blue" to="/index/Taocoin">{{$t("list.Taocoin")}}</router-link>”
					</p>

				</div>
			</div>
		</div>
	</div>
</template>


<style lang="scss" scoped>
#SuccessfulRedemption{
	width: 100%;
	min-height: 100%;
	background: #0c1331;
	padding-top: 2px;
}
.SuccessContent{
	margin: 40px auto;
	width: 1200px;
	height: 200px;
	background: #fff;
	border-radius: 4px;
	display: flex;
	align-items: center;
	padding: 20px;
	box-sizing: border-box;
	.oleft{
		width: 90px;
		height: 90px;
		border: 2px solid #dddce1;
		border-radius: 50%;
		text-align: center;
		line-height: 90px;
		margin:0 20px;
		.iconfont{
			font-size: 60px;
			background: linear-gradient(to right, #0ec665, #6fff98);
	        -webkit-background-clip: text;
	        color: transparent;
		}
	}
	.oright{
		height: 65%;
		.success{
			font-size: 18px;
			color: #1d1f52;
			line-height: 50px;
		}
		.prompt{
			color: #83889b;
			font-size: 14px;
			.blue{
				color: #214bc3;
				cursor: pointer;
			}
			p{
				line-height: 38px;
			}
		}
	}
}



</style>
