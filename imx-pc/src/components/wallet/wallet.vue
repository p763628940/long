<template>
	<div class="wallet">
		<!--头部-->
		<div class="wallet_header">
			<div class="wallet_header_text">
				<p class="title">
          {{$t("SupperWallet.SuperWalletCreate")}}
				</p>
				<p class="text">
          {{$t("SupperWallet.SupportWalletManagement")}}
				</p>
			</div>
		</div>
		<!--空投内容部分-->
		<div class="wallet_content">
			<div class="walletItem">
				<div class="Introduction">
					<p class="Bold">{{$t("SupperWallet.MultiCoin")}}</p>
					<p class="border"></p>
					<p class="prompt">{{$t("SupperWallet.MultiCoinTra")}}</p>
					<p class="button">
						<button class="green1" @click="toCapital">{{$t("WalletManagement.openWallet")}}</button>
						<!--<span>{{$t("SupperWallet.OpenTime")}}</span>-->
					</p>
      		</div>
				<div class="oImg">
					<img src="../../assets/candy.png" />
				</div>
			</div>
			<div class="walletItem">
				<div class="oImg">
					<img src="../../assets/wallet.png" />
				</div>
				<div class="Introduction">
					<p class="Bold">{{$t("SupperWallet.FreeAirdropCandy")}}</p>
					<p class="border"></p>
					<p class="prompt">{{$t("SupperWallet.AssetsOwne")}}</p>
					<p class="button">
						<router-link tag="button" to="/index/Airdrop" class="green1">{{$t("SupperWallet.OpenBox")}}</router-link>
					</p>
				</div>
			</div>
			<div class="walletItem">
				<div class="Introduction">
					<p class="Bold"> {{$t("SupperWallet.NextBitcoin")}}</p>
					<p class="border"></p>
					<p class="prompt">{{$t("SupperWallet.RealizeFreeExc")}}</p>
					<p class="button">
						<!--<button>{{$t("SupperWallet.StayTunedFor")}}</button>-->
						<!--<span>{{$t("SupperWallet.OpenTime")}}</span>-->
            <router-link tag="button" to="/index/Taocoin" class="green1">{{$t("taocoin.TOTaocoin")}}</router-link>
					</p>
				</div>
				<div class="oImg">
					<img src="../../assets/drop.png" />
				</div>
			</div>
			<div class="walletItem">
				<div class="oImg">
					<img src="../../assets/security.png" />
				</div>
				<div class="Introduction">
					<p class="Bold">{{$t("SupperWallet.TechnicalSupport")}}</p>
					<p class="border"></p>
					<p class="prompt">{{$t("SupperWallet.AssetsSafer")}}</p>
				</div>
			</div>
		</div>
		<myfooter></myfooter>
	</div>
</template>
<script>
import Homefooter from "../public/Homefooter"
export default{
	components:{
		"myfooter":Homefooter
	},
  methods:{
    toCapital(){ /*跳转详情页面*/
      if(this.token==null&&this.token==undefined){
        this.$router.push({
          name:"login"
        })
        return false;
      }else{
        this.$router.push({name:"Trading_account"});
      }
    }
  },
  mounted(){

  }
}

</script>

<style lang="scss" scoped>
.wallet{
	width: 100%;
	min-height: 100%;
	background: #1c1c40;
}
.wallet_header{
	width: 100%;
	height: 420px;
	background-image: url(../../assets/wallet@header.png);
	background-repeat: no-repeat;
	background-size: 100% 100%;
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
	align-items: center;
	.wallet_header_text{
		p{
			text-align: center;
		}
		.title{
			font-size: 40px;
			color: #11143d;
		}
		.text{
			line-height: 60px;
			font-size: 15px;
		}
	}
}
.wallet_content{
	width: 1200px;
	background: #fff;
	border-radius: 4px;
	margin: 0 auto;
	margin-top: -50px;
	margin-bottom: 50px;
	padding: 50px 0;
	.walletItem{
		width: 100%;
		height: 300px;
		display: flex;
		align-items: center;
		justify-content: space-between;
		box-sizing: border-box;
		padding: 0 50px;
		.Introduction{
			.Bold{
				font-size: 30px;
			}
			.border{
				width: 40px;
				height: 6px;
				background: #35aafa;
				border-radius: 10px;
				margin: 20px 0;
			}
			.prompt{
				font-size: 17px;
				color: #1e2046;
			}
			.button{
				line-height: 90px;
				button{
					width: 100px;
					height: 40px;
					background: #c7c8c8;
					color: #fff;
					font-size: 14px;
					border-radius: 30px;
					outline: none;
				}
				.green1{
					color: #fff;
					background: #25cbc5;
				}
				span{
					font-size: 13px;
					color: #b6b6b6;
					margin-left: 15px;
				}
			}
		}
		.oImg{
			width: 370px;
			height: 300px;
			img{
				width: 100%;
				height: 100%;
			}
		}
	}
}

</style>
