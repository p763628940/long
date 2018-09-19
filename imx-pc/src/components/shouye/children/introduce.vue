<template>
  <div class="container">
    <div class="imgWrapper">
      <div class="top-container">
        <div class="top">
          <div class="introtittle">{{$t("introduce.Introductionrules")}}</div>
          <p class="small_title">{{$t("introduce.Transmining")}}</p>
          <div class="list-item">
            <ul class="rule clearfix">
              <li class="rule-item">
                <span class="cirle">1</span>
                <span>{{$t("introduce.FeesFullreturned")}}</span>
              </li>
              <li class="rule-item">
                <span class="cirle">2</span>
                <span>{{$t("introduce.PlatformRepurchase")}}</span>
              </li>
            </ul>
            <p class="testRun m-t-20">{{$t("introduce.Trialrun")}}<span
              class="commonTitle">{{$t("introduce.Julyfive")}}</span>{{$t("introduce.Shocklaunch")}}</p>
          </div>
        </div>
      </div>
      <table class="Amountdistribution">
        <thead class="mechanism">
        <tr>
          <th colspan="4">{{$t("introduce.Mechanismamount")}}</th>
        </tr>
        </thead>
        <tbody class="releaseAmount">
        <tr>
          <td class="releaseAmountItem">第{{ruleList.periods_num}}期({{ruleList.days}}天)</td>
          <td class="releaseAmountItem">{{$t("introduce.Currentphase")}}
            <p>{{ruleList.all_num}}</p>
          </td>
          <td class="releaseAmountItem">{{$t("introduce.Perdaycurrentphase")}}
            <p>{{ruleList.every_day}}</p>
          </td>
          <td class="releaseAmountItem">
          		{{$t("introduce.Cappedrepurchase")}}
          </td>
        </tr>
        </tbody>
      </table>
      <div class="middle">
        <div class="miningTransaction">
          <div class="trade">
            <i class="iconfont icon-jiaoyi icon-jiaoyi_ver"></i>
            <div class="transactionTitlte">{{$t("introduce.Transfeemining")}}</div>
          </div>
          <div class="transactionTitltItem">
            <div class="transactionItem">
              <div class="borderLiner-left"></div>
              <div class="borderLiner-right"></div>
              <div class="transactionItemDiv">
                <img src="../../../assets/Bitmap01.png" alt="" width="88%" class="center">
                <div class="textLocation textPostion1">
                  {{$t("introduce.Feesreturn")}}
                </div>
              </div>
              <div class="pwrapper">
                <div class="containerIcon">
                  <div style="display:inline-block">
                    <i class="iconfont icon-shouxufei middleIcon disapear"></i>
                  </div>
                  <div class="hwrapper">
                    <h1 class="commonTitle m-t-b-25 commBlock">{{$t("introduce.Dailylimitedamount")}}</h1>
                  </div>
                </div>
                <div class="containerP">
                  <p class="commonP">{{$t("introduce.Transactionfeesusers")}}</p>
                  <p class="commonP">{{$t("introduce.ReturnIMXequaling")}}</p>
                  <p class="commonP">{{$t("introduce.Calculateonceperhour")}}</p>
                  <p class="commonP">{{$t("introduce.Calculatebytheaverage")}}</p>
                </div>
              </div>
            </div>

           <div class="transactionItem">
              <div class="borderLiner-left"></div>
              <div class="borderLiner-right"></div>
              <div class="transactionItemDiv">
                <img src="../../../assets/Bitmap03.png" alt="" width="49%" class="center">
                <div class="textLocation textPosition3">IMX</div>
              </div>
              <div>
                <i class="iconfont icon-wakuangshezhi middleIcon"></i>
                <h1 class="commonTitle m-t-b-25 commBlock">{{$t("introduce.Dailyquantitative")}}</h1>
              </div>
              <div class="Dailyquantitative">
                {{$t("introduce.TotalamountiMX")}}
              </div>
            </div>
          </div>
        </div>
        <div class="repTransactionContainner">
          <div class="repurchaseTransaction">
            <i class="iconfont icon-huigou001 fontSize iconLocation"></i>
            <div class="transactionTitlte">{{$t("introduce.Miningrepurchase")}}</div>
            <ul class="miningRepo clearfix">
              <li class="miningRepoItem">
                <div class="borderLiner-left"></div>
                <div class="borderLiner-right"></div>
                <div class="miningRepoItemDiv">
                  <img src="../../../assets/Bitmap04.png" alt="" width="94%" class="center">
                  <div class="textLocation textPosition4">{{$t("introduce.Repurchase")}}</div>
                </div>
                <h1 class="commonTitle">{{$t("introduce.RepurchaseiMXtransaction")}}</h1>
              </li>

            </ul>
          </div>
        </div>
        <div class="cycleTimeContainer">
          <div class="cycleTime">
           <div>
             <i class="iconfont icon-riqi iconLocation icon_riqi_size"></i>
             <div class="transactionTitlte">{{$t("introduce.Timeperiod")}}</div>
           </div>
            <div class="cycle">
              <div class="cycleItem">
                <div class="borderLiner-left"></div>
                <div class="borderLiner-right"></div>
                <div class="margin_Top">
                  <img src="../../../assets/iconIcon1.png" alt="">
                  <p class="commonTitle">
                    {{$t("introduce.Firstday")}}
                  </p>
                  <p class="commonP">
                    {{$t("introduce.Feesstatistics")}}
                  </p>
                </div>
              </div>
              <div class="cycleItem">
                <div class="borderLiner-left"></div>
                <div class="borderLiner-right"></div>
                <img src="../../../assets/iconHuigou001.png" alt="">
                <p class="commonTitle">
                  {{$t("introduce.Secondday")}}
                </p>
                <p class="commonP">
                  {{$t("introduce.DynamicrepurchaseIMX")}}
                </p>
              </div>

            </div>
          </div>
        </div>
      </div>
      <div class="bottom">
        <p class="commonP">
          <b>{{$t("introduce.Activityrules")}}</b>
        </p>
        <ul class="commonP">
          <li><b>{{$t("introduce.TransFeeMining")}}</b></li>
          <li>{{$t("introduce.Feereturnmechanism")}}</li>
          <li>{{$t("introduce.Dailyquantitativemining")}}</li>
          <li><b>{{$t("introduce.MiningRepurchase")}}:</b></li>
          <li>{{$t("introduce.MiningRepurchase1")}}</li>
          <li>{{$t("introduce.MiningRepurchase3")}}</li>
          <li><b>{{$t("introduce.Timeperiod")}}:</b></li>
          <li>{{$t("introduce.Timeperiod1")}}</li>
          <li>{{$t("introduce.Timeperiod2")}}</li>
          <li>
            <span class="red">{{$t("introduce.Specialinstructions")}}</span>
          </li>
          <li>
            <span>{{$t("introduce.Specialinstructions1")}}</span>
          </li>
          <li>
            <span class="red">{{$t("introduce.Miningrew")}}</span>
          </li>
         <li>
            <span>{{$t("introduce.Specialinstructions2")}}</span>
         </li>
          <li>
            <span>{{$t("introduce.Specialinstructions3")}}</span>
          </li>
          <li>
            <span>{{$t("introduce.Specialinstructions4")}}</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from "axios"
  import {httpUrl} from "../../http_url/http_url.js";

  export default {
    name: "introduce",
    data() {
      return {
        ruleList: {}
      }
    },
    mounted() {
      let _this = this;
      axios.get(httpUrl.rule).then(function (res) {
        _this.ruleList = res.data.data;
      }, function (err) {
        console.log(err)
      })
    }
  }
</script>

<style lang="scss" scoped>
  .hwrapper{
    display:inline-block;
    width:86%
  }
  .pwrapper{
    margin-left:10%;

  }
  .containerP{
    width:90%;
  }
  .containerIcon{
    width:70%;
    margin-left:10%;
  }
  .disapear{
    display:inline-block;
    margin-top: -170%;
  }
  .percentage {
    position: absolute;
    font-size: 12px;
    color: #fff;
  }
  .percentage1{
    top: 46%;
    left:70%;
  }
  .percentage2{
    top:23%;
    left:70%;
  }
  .percentage3{
    top: 3%;
    left:63%;
  }
  .percentage4{
    top: 80%;
    left:7%;
  }
  .textLocation {
    width: 45px;
    position: absolute;
    font-size: 12px;
    line-height: 20px;
  }
  .textPostion1{
    top:50%;
    left:50%;
    transform:translate(-50%,-50%);
  }
  .textPosition2{
    top:50%;
    left:50%;
    transform:translate(-50%,-50%);
  }
  .textPosition3{
    top:50%;
    left:50%;
    transform:translate(-50%,-50%);font-size: 18px;
  }
  .textPosition4{
    top:54%;
    left:42%;
    color:#fff
  }
  .textPosition5{
   top:50%;
    left:49%;
    transform:translate(-50%,-50%);
  }
  .iconLocation {
    display: inline-block;
  }

  .fontSize {
    font-size: 30px;
    vertical-align: middle;
  }
  .icon_riqi_size{
    font-size:25px;
    vertical-align: middle
  }
  .icon_icon1_size{
    font-size:44px;
  }
  .icon_huigou001_size{
    font-size:50px;
  }
  .icon_iconfont_size{
    font-size:44px;
  }
  .fontColor {
    color: #15e3ed
  }
  .textPsize{
    font-size:14px;
  }
  .textPtsize{
    font-size:12px;
  }
  .middleIcon {
    font-size: 20px;
    color: #58A8BE;
    diaplay: inline-block;
    vertical-align: middle;
  }

  .commBlock {
    display: inline-block;
  }

  .m-t-20 {
    margin-top: 20px;
  }

  .borderLiner-left {
    float: left;
    height: 100%;
    width: 1px;
    background: -webkit-linear-gradient(rgba(21,227,226, 0), rgba(21,227,226, 0.3), rgba(21,227,226, 0.5), rgba(21,227,226, 0.3), rgba(21,227,226, 0.0));
    /* Safari 5.1 - 6.0 */
    background: -o-linear-gradient(rgba(21,227,226, 0), rgba(21,227,226, 0.3), rgba(21,227,226, 0.5), rgba(21,227,226, 0.3), rgba(21,227,226, 0.0));
    /* Opera 11.1 - 12.0 */
    background: -moz-linear-gradient(rgba(21,227,226, 0), rgba(21,227,226, 0.3), rgba(21,227,226, 0.5), rgba(21,227,226, 0.3), rgba(21,227,226, 0.0));
    /* Firefox 3.6 - 15 */
    background: linear-gradient(rgba(21,227,226, 0), rgba(21,227,226, 0.3), rgba(21,227,226, 0.5), rgba(21,227,226, 0.3), rgba(21,227,226, 0.0));
    /* 标准的语法（必须放在最后）*/
  }

  .borderLiner-right {
    float: right;
    height: 100%;
    width: 1px;
    background: -webkit-linear-gradient(rgba(21,227,226, 0), rgba(21,227,226, 0.3), rgba(21,227,226, 0.5), rgba(21,227,226, 0.3), rgba(21,227,226, 0.0));
    /* Safari 5.1 - 6.0 */
    background: -o-linear-gradient(rgba(21,227,226, 0), rgba(21,227,226, 0.3), rgba(21,227,226, 0.5), rgba(21,227,226, 0.3), rgba(21,227,226, 0.0));
    /* Opera 11.1 - 12.0 */
    background: -moz-linear-gradient(rgba(21,227,226, 0), rgba(21,227,226, 0.3), rgba(21,227,226, 0.5), rgba(21,227,226, 0.3), rgba(21,227,226, 0.0));
    /* Firefox 3.6 - 15 */
    background: linear-gradient(rgba(21,227,226, 0), rgba(21,227,226, 0.3), rgba(21,227,226, 0.5), rgba(21,227,226, 0.3), rgba(21,227,226, 0.0));
    /* 标准的语法（必须放在最后） */
  }

  .commonP {
    line-height: 30px;
    font-size: 14px;
    color: #fff;
    .red {
      color: red;
    }
  }

  .m-t-b-25 {
    margin-top: 25px;
    margin-bottom: 25px;
  }

  .transactionTitlte {
    display: inline-block;
    text-align: center;
    font-size: 16px;
    margin: 30px 0;
  }

  .commonTitle {
    margin: 10px 0px;
    color: rgb(21, 227, 237);
    line-height:18px;
    font-size: 14px;
    font-weight: normal;
  }
  /*图片居中使用*/
  .center{
    margin:0 auto;
  }
  .icon-jiaoyi_ver{
    font-size:26px;
    vertical-align: middle;
  }
  .container {
    width: 100%;
    background-color: #15113B;
    font-size: 14px;
    .imgWrapper {
      background: url(../../../assets/IMXwebbg.png) no-repeat;
      background-size: 100% 75%;
      .top-container {
        width: 100%;
        margin-bottom: 20px;
        padding-top: 30px;
        .top {
          text-align: center;
          color: #fff;
          .introtittle {
            padding: 20px 0;
            font-size: 35px;
          }
          .small_title {
            padding-bottom: 20px;
            font-size: 16px;
          }
          .list-item {
            .clearfix:after {
              content: "";
              display: block;
              height: 0;
              clear: both;
              visibility: hidden;
            }
            .clearfix {
              zoom: 1;
            }
            .rule {
              width: 41%;
              text-align: center;
              display: flex;
              justify-content: center;
              margin: 0 auto;
              margin-bottom: 20px;
              .rule-item {
                width: 30%;
                float: left;
                .cirle {
                  margin-right: 10px;
                  display: inline-block;
                  width: 20px;
                  height: 20px;
                  line-height: 20px;
                  background-color: rgb(101, 196, 215);
                  border-radius: 50%;
                  -moz-border-radius: 50%;
                  -webkit-border-radius: 50%;
                }
              }
            }
          }
        }
      }
      .Amountdistribution {
        margin: auto;
        width: 56%;
        font-size: 12px;
        inline-height:12px;
        color: #fff;
        .mechanism > tr {
          border: 1px solid rgb(59, 108, 146);
          background: rgba(45, 79, 125, 0.5);
          text-align: center;
          padding: 15px 0px;
          height: 50px;
          line-height: 50px;
          th {
            font-size: 18px;
          }
        }
        .releaseAmount {
          .releaseAmountItem {
            border: 1px solid rgb(59, 108, 146);
            text-align: center;
            height: 65px;
            p {
              margin-top: 10px;
              color: #15e3ed;
              font-size: 18px;
            }
          }
        }
      }
      .middle {

        font-size: 18px;
        color: #fff;
        .miningTransaction {
          margin: 0 auto;
          width: 65%;
          .trade {
            text-align: center;
            vertical-align: middle;
            margin: auto;
          }
          .transactionTitltItem {
            width: 98%;
            margin: 0 auto;
            display: flex;
            justify-content: center;
            flex-wrap: wrap;
            .transactionItem {
              width: 32.5%;
              text-align: center;
              margin:0 50px;
              p {
                line-height: 28px;
                font-size: 14px;
              }
              .transactionItemDiv {
                width: 85%;
                height: 46%;
                margin: 0 auto;
                vertical-align: bottom;
                margin-bottom: 5%;
                display: flex;
                align-items: center;
                position: relative;
              }
              .Dailyquantitative {
                width: 90%;
                margin: 0 auto;
                text-align: center;
                line-height: 30px;
                font-size: 14px;
                color: #fff;
              }
            }
          }
        }
      }
      .repTransactionContainner {
        text-align: center;
        .repurchaseTransaction {
          width: 65%;
          margin:auto;
          .miningRepo {
            width: 98%;
            display: flex;
            justify-content: space-between;
            margin-top: 20px;
            margin-bottom: 20px;
            margin-left: auto;
            margin-right: auto;
            .miningRepoItem {
              padding: 0 6px;
              flex: 1;
              .miningRepoItemDiv {
                width: 42%;
                height: 60%;
                margin: 0 auto;
                display: flex;
                align-items: center;
                position: relative;
                margin-bottom:4%;
              }
              p {
                line-height: 22px;
                font-size: 12px;
              }
            }
          }
        }
      }
      .cycleTimeContainer {
        width: 65%;
        margin: 0 auto;
        text-align: center;
        font-size: 18px;
        .cycleTime {
          margin-bottom: 40px;
          .cycle {
            display: flex;
            justify-content: space-between;
            .cycleItem {
              padding: 0 6px;
              flex: 1;
            }
          }
        }
      }
      .bottom {
        margin: auto;
        width: 54%;
        padding-bottom: 40px;
        ul {
          li {
            font-size: 12px;
            font-weight: normal;
          }
        }
      }
    }
  }
</style>
