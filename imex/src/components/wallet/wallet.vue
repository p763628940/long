<template>
	<div id="wallet">
		<div class="walletTop">
			<div class="walletTopContent">
				<p class="title">{{$t("SupperWallet.IMXSuperWallet")}}</p>
				<p class="title">{{$t("SupperWallet.CreateNew")}}</p>
				<p class="text">{{$t("SupperWallet.SupportWalletManagement")}}</p>
			</div>
		</div>
		<!--模块-->
		<div class="WalletModule">
			<ul>
				<router-link to="/airdrop" tag="li">
					<p class="icon">
						<i class="iconfont icon-hezi"></i>
					</p>
					<p class="text">{{$t("SupperWallet.CandyBox")}}</p>
				</router-link>
        <router-link tag="li" to="/Taocoin">
          <p class="icon">
            <i class="iconfont icon-qianbi"></i>
          </p>
          <p class="text">{{$t("SupperWallet.TaoCion")}}</p>
        </router-link>
				<router-link tag="li" to="/vote">
					<p class="icon">
						<i class="iconfont icon-toupiao"></i>
					</p>
					<p class="text">{{$t("SupperWallet.Votingonsensus")}}</p>
				</router-link>
				<li @click="toCapital">
					<p class="icon">
						<i class="iconfont icon-qianbao"></i>
					</p>
					<p class="text">{{$t("SupperWallet.WalletManagement")}}</p>
				</li>
			</ul>
		</div>
		<!--线的渐变-->
		<div class="borderBottom">
			<span class="triangle">
			    <span></span>
			</span>
		</div>
		<!--内容部分-->
		<div class="walletContent">
			<div class="walletItem">
				<p class="Bold">{{$t("SupperWallet.MultiCoin")}}</p>
				<p class="border"></p>
				<p class="prompt">{{$t("SupperWallet.MultiCoinTra")}}</p>
				<p class="button">
					<button class="green1" @click="toCapital">{{$t("WalletManagement.OpenWallet")}}</button>
				</p>
				<div class="oImg">
					<img src="../../assets/candy.png" />
				</div>
			</div>
			<div class="walletItem">
				<p class="Bold">{{$t("SupperWallet.FreeAirdropCandy")}}</p>
				<p class="border"></p>
				<p class="prompt">{{$t("SupperWallet.AssetsOwne")}}</p>
				<p class="button">
					<router-link tag="button" to="/airdrop" class="green1">{{$t("SupperWallet.OpenBox")}}</router-link>
				</p>
				<div class="oImg">
					<img src="../../assets/wallet.png" />
				</div>
			</div>
			<div class="walletItem">
				<p class="Bold">{{$t("SupperWallet.NextBitcoin")}}</p>
				<p class="border"></p>
				<p class="prompt">{{$t("SupperWallet.RealizeFreeExc")}}</p>
				<p class="button">
          <router-link tag="button" to="/Taocoin" class="green1">{{$t("WalletManagement.Taocoin")}}</router-link>
				</p>
				<div class="oImg">
					<img src="../../assets/drop.png" />
				</div>
			</div>
			<div class="walletItem">
				<p class="Bold">{{$t("SupperWallet.TechnicalSupport")}}</p>
				<p class="border"></p>
				<p class="prompt">{{$t("SupperWallet.AssetsSafer")}}</p>
				<div class="oImg">
					<img src="../../assets/security.png" />
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
        userList:{}, /*获取用户信心*/
			}
		},
    methods:{
      toCapital(){ /*跳转详情页面*/
        if(this.token==null&&this.token==undefined){
          this.$router.push({
            name:"login"
          })
          return false;
        }else if(this.userList.wallet_on!=1){
          this.$router.push({name:"OpenWallet"});
        }else{
          this.$router.push({name:"capital"});
        }
      }
    },
		mounted(){
      if(this.token!=null&&this.token!=undefined){
        this.$ajax.get(this.httpUrl.userInfo, {
          headers: {
            "Authorization": "Bearer " + this.token
          }
        }).then(res=>{
          this.userList = res.data.data;
        },err=>{
          console.log(err)
        })
      }

    }
	}
</script>

<style lang="scss" scoped>
	#wallet {
		width: 100%;
		min-height: 100%;
		background: #fff;
		padding-bottom: .1rem;
	}

	.header {
		width: 100%;
		height: .5rem;
		line-height: .5rem;
		position: relative;
		.iconfont {
			display: inline-block;
			font-size: .15rem;
			margin-left: .1rem;
			margin-top: .01rem;
		}
		span {
			width: 80%;
			font-size: 15px;
			font-weight: 600;
			position: absolute;
			left: 10%;
			text-align: center;
		}
	}

	.walletTop {
		width: 100%;
		height: 2rem;
		background: url(https://imxpro.oss-cn-beijing.aliyuncs.com/static/appWallet.png) no-repeat;
		background-size: 100% 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		.walletTopContent {
			width: 85%;
			text-align: center;
			.title {
				font-size: .16rem;
				font-weight: 500;
				line-height: .3rem;
			}
			.text {
				line-height: .2rem;
			}
		}
	}

	.walletContent {
		box-sizing: border-box;
		padding: 0 .05rem;
		.walletItem {
			width: 100%;
			text-align: center;
			margin-bottom: .6rem;
			.Bold {
				font-size: .15rem;
				line-height: .3rem;
				margin-top: .3rem;
			}
			.button{
				height: .4rem;
				display: flex;
				justify-content: center;
				align-items: center;
				button{
					width: .9rem;
					height: .3rem;
					background: #c7c8c8;
					color: #fff;
					border-radius: .2rem;
					border: none;
				}
				.green1{
					color: #fff;
					background: #25cbc5;
				}
				span{
					color: #b6b6b6;
					margin-left: .1rem;
				}
			}
			.border {
				width: .3rem;
				height: .05rem;
				margin: .1rem auto;
				border-radius: .04rem;
				background: #36abfb;
			}
			.prompt {
				width: 90%;
				line-height: .2rem;
				margin: 0 auto;
			}
			.oImg {
				width: 90%;
				height: 2.3rem;
				margin: .15rem auto;
				img {
					width: 100%;
					height: 100%;
				}
			}
		}
	}
	/*模块*/

	.WalletModule {
		width: 100%;
		height: 1rem;
		box-sizing: border-box;
		padding: 0 .1rem;
		ul {
			height: 100%;
			display: flex;
			align-items: center;
			li {
				flex: 1;
				text-align: center;
				display: flex;
				flex-direction: column;
				align-items: center;
				.icon {
					width: .5rem;
					height: .5rem;
					text-align: center;
					margin-top: .18rem;
					line-height: .5rem;
					background: #50b2fd;
					color: #fff;
					border-radius: 50%;
					.iconfont {
						font-size: .28rem;
					}
				}
				.text {
					line-height: .3rem;
				}
			}
      .gray{
        .icon {
          background: #c7c8c8;
        }
      }
		}
	}

	.borderBottom {
		width: 90%;
		height: .01rem;
		margin: .2rem auto;
		text-align: center;
		background: linear-gradient(to right, rgba(80, 178, 253, 0), rgba(80, 178, 253, 0.3), rgba(80, 178, 253, 0.5), rgba(80, 178, 253, 0.3), rgba(80, 178, 253, 0.0));
		position: relative;
		.triangle:before {
			box-sizing: content-box;
			width: 0px;
			height: 0px;
			position: absolute;
			top: -15px;
			right: 48.3%;
			padding: 0;
			border-bottom: 8px solid #FFFFFF;
			border-top: 8px solid transparent;
			border-left: 8px solid transparent;
			border-right: 8px solid transparent;
			display: block;
			content: '';
			z-index: 12;
		}
		.triangle:after {
			box-sizing: content-box;
			width: 0px;
			height: 0px;
			position: absolute;
			top: -17px;
			right: 48%;
			padding: 0;
			border-bottom: 9px solid rgb(80, 178, 253);
			border-top: 9px solid transparent;
			border-left: 9px solid transparent;
			border-right: 9px solid transparent;
			display: block;
			content: '';
			z-index: 10
		}
	}
</style>
