<template>
  <div id="details">
    <!--交易规则的内容部分-->
    <div class="currency-container-right" :class="{'white-text':getColor==1}">
      <div class="currency-title" :class="{'white-active-bg':getColor==1}">
        <p class="text">{{$t("taocoin.TaoExchange")}}</p>
      </div>
      <!--交易规则内容-->
      <div class="currency_information" :class="{'font_color':getColor==1}">
        <!--提示内容部分-->
        <div class="content">
          <ul>
            <br>
            <li class="content_title">{{$t("taocoin.TaocoinIntro1")}}</li>
            <li class="textIndex">{{$t("taocoin.TaocoinIntroNote1")}}</li>
            <li class="content_title">{{$t("taocoin.TaocoinIntro2")}}</li>
            <li class="textIndex">{{$t("taocoin.TaocoinIntroNote2")}}</li>
            <li class="content_title">{{$t("taocoin.TaocoinIntro3")}}</li>
            <li class="textIndex">{{$t("taocoin.TaocoinIntroNote3")}}</li>
            <li class="content_title">{{$t("taocoin.TaocoinIntro4")}}</li>
            <li class="textIndex">{{$t("taocoin.TaocoinIntroNote4")}}</li>
            <li class="content_title">{{$t("taocoin.TaocoinIntro5")}}</li>
            <li class="textIndex">{{$t("taocoin.TaocoinIntroNote5")}}</li>
            <li class="content_title">{{$t("taocoin.TaocoinIntro6")}}</li>
            <li class="textIndex">{{$t("taocoin.TaocoinIntroNote6")}}</li>
            <li class="content_title">{{$t("taocoin.TaocoinIntro7")}}</li>
            <li class="textIndex textBottom">{{$t("taocoin.TaocoinIntroNote7")}}</li>
            <br>
          </ul>

        </div>

      </div>

    </div>

  </div>
</template>

<script>
  export default {
    data() {
      return {
        // getColor: window.localStorage.getItem("setColor"),
      }
    }
  }
</script>

<style lang="scss">

  .font_color{
    color: #000 !important;
    background-color: #fff !important;
    border: 1px solid #ddd !important;
  }
  .white-active-bg {
    color: #fff !important;
    background: #312e67 !important;
  }
  .white-text {
    .currency-title {
      border-bottom: 1px solid #ddd !important;
    }
    .currency-information {
      color: #000 !important;
      border: 1px solid #ddd !important;
    }
  }
  .currency-container-right {
    width:60%;
    margin:0 auto;
    .currency-title {
      width: 100%;
      height: 41px;
      .text {
        width: 165px;
        height: 41px;
        font-size: 14px;
        text-align: center;
        line-height: 41px;
        background-color: #363765;
        color: #fff;
      }
    }
    /*币种信息*/
    .currency_information {
      width: 100%;
      font-size: 15px;
      color: #fff;
      background: #16182c;
      .content{
        padding:0px 10px;
      }
    }
  }
.textIndex{
  margin-left:28px;
  box-sizing: border-box;
  line-height: 20px;
}
.content_title{
  font-size:16px;
  font-weight:bold;
  margin:20px auto;
}
.textBottom{
  margin-bottom:20px;
}
</style>
