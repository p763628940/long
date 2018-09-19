<template>
    <div id="CommonProblem">
      <my-header :text="headerText"></my-header>
      <div class="exchange" v-show="index==0">
        <img src="../../../assets/FO.png" class="fo" alt="">
        <img src="../../../assets/RightArrow.png" class="RightArrow" alt="">
        <img src="../../../assets/EX.png" class="ex" alt="">
      </div>
      <div class="exchange" v-show="index==1">
        <img src="../../../assets/EX.png" class="ex" alt="">
        <img src="../../../assets/RightArrow.png" class="RightArrow" alt="">
        <img src="../../../assets/FO.png" class="fo" alt="">
      </div>
      <div class="exchange" v-show="index==2">
        <img src="../../../assets/EOS.png" class="ex" alt="">
        <img src="../../../assets/RightArrow.png" class="RightArrow" alt="">
        <img src="../../../assets/FO.png" class="fo"  alt="">
      </div>
      <div class="exchange" v-show="index==3">
        <img src="../../../assets/FO.png" class="fo" alt="">
        <img src="../../../assets/RightArrow.png" class="RightArrow" alt="">
        <img src="../../../assets/EOS.png" class="ex" alt="">
      </div>
      <!--内容-->
      <ul class="CommonProblemContent">
        <li v-for="item in selectList">{{item}}</li>
      </ul>
    </div>
</template>

<script>
  import header from "../../public/backHeader"
    export default {
        name: "CommonProblem",
        data(){
          return{
            index:this.$route.params.index,
            commonProblemList:[this.$t("shouye.depositFOAssets"),this.$t("shouye.withdrawFOAssets"),this.$t("shouye.foExchangeEos"),this.$t("shouye.eosExchangeFo")],
            headerText:"",
            commonProblemContent:[
              [this.$t("shouye.depositFOAssets1"),this.$t("shouye.depositFOAssets2"),this.$t("shouye.depositFOAssets3"),this.$t("shouye.depositFOAssets4"),this.$t("shouye.depositFOAssets5")],
              [this.$t("shouye.withdrawFOAssets1"),this.$t("shouye.withdrawFOAssets2"),this.$t("shouye.withdrawFOAssets3"),this.$t("shouye.withdrawFOAssets4"),this.$t("shouye.withdrawFOAssets5")],
              [this.$t("shouye.foExchangeEos1"),this.$t("shouye.foExchangeEos2"),this.$t("shouye.foExchangeEos3"),this.$t("shouye.foExchangeEos4"),this.$t("shouye.foExchangeEos5")],
              [this.$t("shouye.eosExchangeFo1"),this.$t("shouye.eosExchangeFo2"),this.$t("shouye.eosExchangeFo3"),this.$t("shouye.eosExchangeFo4"),this.$t("shouye.eosExchangeFo5")]
            ],
            selectList:[],
          }
        },
      components:{
        "my-header":header
      },
      mounted(){
        this.headerText = this.commonProblemList[this.$route.params.index]; /*头部简介*/
        this.selectList = this.commonProblemContent[this.$route.params.index]; /*内容简介*/

      }
    }
</script>

<style lang="scss" scoped>
.exchange{
  width: 100%;
  height: .6rem;
  box-sizing: border-box;
  padding-left:.15rem;
  display: flex;
  align-items: center;
  .fo{
    width: .5rem;
    height: .32rem;
  }
  .RightArrow{
    width: .4rem;
    height: .2rem;
    margin: 0 .1rem;
  }
  .ex{
    width: .4rem;
    height: .4rem;
  }
}
  .CommonProblemContent{
    box-sizing: border-box;
    padding-left: .15rem;
    margin-top: .1rem;
    li{
      line-height: .25rem;
      color: #6f74a6;
    }
  }
</style>
