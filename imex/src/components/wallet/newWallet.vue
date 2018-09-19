<template>
  <div id="newWallet">
    <!--头部-->
    <div class="suuperWallet">
      {{$t("shouye.IMXSuperWallet")}}
    </div>
    <!--钱包 系列-->
    <div class="WalletList" v-if="token==null&&token==undefined">
      <ul class="WalletWrapper">
        <li class="WalletItem" v-for="(item,index) in walletList" @click="$router.push({name:'login'})">
          <p class="title">{{item.title}}</p>
          <div class="content">
            <span class="blue">{{$t("shouye.logIn")}}</span> {{$t("shouye.viewAssets")}}
          </div>
          <p class="bottom">
            <span :class="{'yellow':index==0}">{{item.bottomText}}</span>
            <img src="../../assets/toLogin.png" alt="">
          </p>
        </li>
      </ul>
    </div>
    <!--获取钱包列表-->
    <div class="WalletLoginList" v-if="token!=null&&token!=undefined">
      <ul class="WalletLoginWrapper">
        <li class="WalletLoginItem" v-for="(activity,index) in myWalletList" @click="toMyWallet(index)">
          <p class="title">
            <span v-if="activity.pageIdentifier!='BTC'">{{activity.pageIdentifier}} {{$t("WalletManagement.Wallet")}}</span>
            <span v-if="activity.pageIdentifier=='BTC'">{{$t("WalletManagement.MainstreamCoinWallet")}}</span>
          </p>
          <div class="content">
            <p class="num">
              <span class="blue">{{activity.btc_blance}}</span>
              BTC
            </p>
            <p class="balane">≈ {{activity.cny_balance}} <span>CNY</span></p>
          </div>
          <div class="bottom">
            <p>
              <span v-show="activity.pageIdentifier=='EOS'" class="yellow">{{$t("shouye.supportExchange")}}</span>
              <span v-show="activity.pageIdentifier=='ETH'">{{$t("shouye.manageETH")}}</span>
            </p>
            <img src="../../assets/toLogin.png" alt="">
          </div>
        </li>
      </ul>
    </div>
    <!--IMX应用专区-->
    <div class="ApplicationArea">
      <div class="title">{{$t("shouye.IMXServiceZone")}}</div>
      <div class="ApplicationAreaBox">
        <ul class="ApplicationAreaWrapper">
          <router-link to="/airdrop" tag="li">
            <img src="../../assets/tangguo.png" alt="">
            <p>{{$t("SupperWallet.CandyBox")}}</p>
          </router-link>
          <router-link tag="li" to="/Taocoin">
            <img src="../../assets/taobi.png" alt="">
            <p>{{$t("SupperWallet.TaoCion")}}</p>
          </router-link>
          <router-link tag="li" to="/vote">
            <img src="../../assets/toupiao.png" alt="">
            <p>{{$t("vote.TaocoinVote")}}</p>
          </router-link>
        </ul>
      </div>
    </div>

  </div>
</template>

<script>
  export default {
    name: "newWallet",
    data() {
      return {
        walletList: [{
          title: this.$t("WalletManagement.eosWallet"),
          bottomText: this.$t("shouye.supportExchange")
        }, {
          title: this.$t("WalletManagement.MainstreamCoinWallet"),
          bottomText: ""
        }, {
          title: this.$t("WalletManagement.ethWallet"),
          bottomText: this.$t("shouye.manageETH")
        }], /*钱包数组*/
        myWalletList: [], /*我的钱包*/
      }
    },
    mounted(){
      if(this.token==undefined&&this.token==null){
        return;
      }
      this.getMyMoney();
    },
    methods:{
      toMyWallet(index){
        this.$router.push({name:"capital",params:{index:index}});
      },
      getMyMoney() {
        /*获取我的钱包*/
        this.$ajax.get(this.httpUrl.financeAssets, {
          headers: {'Authorization': "Bearer " + this.token}
        }).then(res => {
          this.myWalletList = res.data.data;
        }, err => {
          console.log(err)
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  #newWallet {
    color: #fff;
  }

  .suuperWallet {
    width: 100%;
    height: .45rem;
    line-height: .45rem;
    text-align: center;
    font-size: .15rem;
    font-weight: 500;
  }
  /*已登录的列表*/
  .WalletLoginList{
    width: 100%;
    box-sizing: border-box;
    padding: 0 .1rem;
    .WalletLoginWrapper{
      width: 100%;
      .WalletLoginItem{
        width: 100%;
        height: 1.1rem;
        border-radius: .05rem;
        box-sizing: border-box;
        padding: 0 .1rem;
        background: -webkit-gradient(linear, 100% 100%, 0 0, from(#2E3159), color-stop(0.5, #1B1D3A), to(#171933));
        background: -webkit-linear-gradient(to right bottom, #2E3159, #1B1D3A, #171933);
        background: -moz-linear-gradient(to right bottom, #2E3159, #1B1D3A, #171933);
        background: -o-linear-gradient(to right bottom, #2E3159, #1B1D3A, #171933);
        background: linear-gradient(to right bottom, #2E3159, #1B1D3A, #171933);
        margin-bottom: .1rem;
        .title{
          font-size: .14rem;
          height: .4rem;
          line-height: .4rem;
        }
        .content{
          height: .4rem;
          p{
            line-height: .2rem;
            .blue{
              font-size: .18rem;
              color: #25CBC5;
            }
          }
        }
        .bottom{
          width: 100%;
          height: .3rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          color: #6F74A6;
          img{
            width: .25rem;
            height: .12rem;
          }
        }
      }
    }
  }
  .yellow{
    color: #FFFD26;
  }

  /*未登录的列表*/
  .WalletList {
    width: 100%;
    box-sizing: border-box;
    padding: 0 .1rem;
    .WalletWrapper {
      width: 100%;
      .WalletItem{
        width: 100%;
        height: 1rem;
        border-radius: .05rem;
        box-sizing: border-box;
        padding: 0 .1rem;
        background: -webkit-gradient(linear, 100% 100%, 0 0, from(#2E3159), color-stop(0.5, #1B1D3A), to(#171933));
        background: -webkit-linear-gradient(to right bottom, #2E3159, #1B1D3A, #171933);
        background: -moz-linear-gradient(to right bottom, #2E3159, #1B1D3A, #171933);
        background: -o-linear-gradient(to right bottom, #2E3159, #1B1D3A, #171933);
        background: linear-gradient(to right bottom, #2E3159, #1B1D3A, #171933);
        margin-bottom: .1rem;
        .title{
          height: .5rem;
          line-height: .5rem;
          font-size: .14rem;
        }
        .content{
          .blue{
            color: #25CBC5;
          }
        }
        .bottom{
          width: 100%;
          height: .4rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          color: #6F74A6;
          img{
            width: .25rem;
            height: .12rem;
          }
        }
      }
    }
  }
  .ApplicationArea{
    width: 100%;
    box-sizing: border-box;
    padding: 0 .1rem;
    .title{
      width: 100%;
      height: .4rem;
      line-height: .4rem;
      background: #1C1E3D;
      box-sizing: border-box;
      padding-left:.1rem;
      font-size: .14rem;
    }
    .ApplicationAreaBox{
      width: 100%;
      .ApplicationAreaWrapper{
        width: 100%;
        display: flex;
        background: -webkit-gradient(linear, 0 100%, 0 0, from(#2E3159), color-stop(0.5, #1B1D3A), to(#171933));
        background: -webkit-linear-gradient(#2E3159, #1B1D3A, #171933);
        background: -moz-linear-gradient(#2E3159, #1B1D3A, #171933);
        background: -o-linear-gradient(#2E3159, #1B1D3A, #171933);
        background: linear-gradient(#2E3159, #1B1D3A, #171933);
        li:nth-last-child(1){
          border: none;
        }
        li{
          flex: 1;
          height: .9rem;
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          border-right: .01rem solid #070A21;
          img{
            width: .4rem;
            height:.4rem;
          }
          p{
            line-height: .3rem;
            font-size: .14rem;
          }
        }
      }
    }
  }


</style>
