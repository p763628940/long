<template>
  <div id="releaseDetailsBox">
    <div id="releaseDetails">
      <my-header :text="headerText"></my-header>
    </div>
    <div>
      <!--兑换情况-->
      <div class="releaseDetaislwrapper">
        <div class="leftAndRight">
          <ul class="releaseDetaisheader">
            <li class="Exchange textPadding">
              <p>{{$t("taocoin.AmountPeople")}}</p>
              <p class="textSize">{{CurrencyList.order_people_count}}</p>
            </li>
            <div class="borderRight"></div>
            <li class="Exchange textPadding">
              <p>{{$t("taocoin.ExchangedNumber")}}</p>
              <p class="textSize">{{CurrencyList.success_num}}</p>
            </li>
            <div class="borderRight"></div>
            <li class="Exchange textPadding">
              <p>{{$t("taocoin.Exchanged")}}({{mainDetails.pageIdentifier}})</p>
              <p class="textSize">{{CurrencyList.balance-CurrencyList.dec_balance | number(mainDetails.displayNum)}}</p>
            </li>
          </ul>
        </div>
      </div>
      <!--SC云储备-->
      <div class="Taobao_item">
        <div class="title">
          <p class="oCurrency1">
            <img :src="mainDetails.logoUrl" alt="">
            <span><span class="currencyName">{{mainDetails.pageIdentifier}}</span> / <span class="Abbreviation">{{mainDetails.fullName}}</span></span>
          </p>
          <p class="inHand">
            <span v-if="CurrencyList.status == 1">{{$t("taocoin.ExComplete")}}</span>
            <span v-if="CurrencyList.status == 0">{{$t("taocoin.Exchanging")}}</span>
            <span v-if="CurrencyList.status == -1">{{$t("taocoin.AlreadyRemoved")}}</span>
          </p>
        </div>
        <ul class="content">
          <li class="exchange">
            <p class="text">
            <span>{{$t("taocoin.StartAmount")}}:
              {{CurrencyList.lower | number(mainDetails.displayNum)}}{{mainDetails.pageIdentifier}}
            </span>
            </p>
          </li>
          <li class="exchange">
            <p class="text">
             <span>{{$t("taocoin.Stocks")}}:
               {{CurrencyList.dec_balance | number(mainDetails.displayNum)}}{{mainDetails.pageIdentifier}}
              </span>
            </p>
          </li>
          <li class="exchange">
            <p class="text">
             <span>{{$t("taocoin.FrozenAssets")}}:
               {{CurrencyList.revoke_balance | number(mainDetails.displayNum)}}{{mainDetails.pageIdentifier}}
              </span>
            </p>
          </li>
          <li class="exchange" v-if="CurrencyList.is_auth==1 || CurrencyList.is_mobile==1">
            <p class="text">
             <span>{{$t("taocoin.ExchangeLimit")}}:
               <span v-if="CurrencyList.is_auth==1"> <i class="iconfont icon-renzheng iconColor"></i>{{$t("taocoin.AdvancedCertification")}} </span>
              <span v-if="CurrencyList.is_mobile==1"><i class="iconfont icon-icon_bangdingshouji iconColor"></i>{{$t("taocoin.BindPhoneNum")}}</span>
             </span>
            </p>
          </li>
        </ul>
      </div>
      <!--兑价-->
      <div class="ExchangeListwrapper">
        <div class="ExchangeList">
          <ul class="content coinImg">
            <li class="exchange">
              <dl class="text">
                <span>{{$t("taocoin.ExchangePrice")}}:</span>
                <dt>
                  <ol v-for="(item,key) in stocksList">
                    <span class="num">{{item.c_num/item.m_num|number(item.currency.displayNum)}}</span>
                    {{item.currency.pageIdentifier}}
                  </ol>
                </dt>
              </dl>
            </li>
          </ul>
        </div>
      </div>
      <!--编号-->
      <div class="Taobao_item">
        <ul class="content" v-for="(item,key) in childOrderList" :key="key">
          <li class="exchange">
            <p class="text">
            <span class="numbercolor">{{$t("taocoin.DNumber")}}:
               {{item.order_num}}
            </span>
            </p>
          </li>
          <li class="exchange">
            <p class="text">
             <span>{{$t("taocoin.ExchangeC")}}:
               {{item.count | number(item.main.displayNum)}}{{item.main.pageIdentifier}}
              </span>
            </p>
          </li>
          <li class="exchange">
            <p class="text">
             <span>{{$t("taocoin.ExchangeR")}}:
               {{item.total | number(item.currency.displayNum)}}{{item.currency.pageIdentifier}}
              </span>
            </p>
          </li>
          <li class="exchange">
            <p class="text">
             <span>{{$t("taocoin.BuyerAccount")}}:
                  {{item.other.name}}
             </span>
            </p>
          </li>
          <li class="exchange">
            <p class="text">
             <span>{{$t("taocoin.DealTime")}}:
              {{formatTime(item.created_at)}}
             </span>
            </p>
          </li>
        </ul>
        <!--分页开始-->
        <div class="pageCount" v-if="myOrderTotal>10">
          <el-pagination small layout="prev, pager, next" :page-size="myOrderPage" @current-change="pagemyOrderChange" :total="myOrderTotal">
          </el-pagination>
        </div>
      </div>
    </div>
    <div class="noData" v-if="myOrderTotal==0">
      <div class="displayNoData">
        <div>{{$t("list.noData")}}</div>
      </div>
    </div>
  </div>
</template>

<script>
  import header from "../../public/backHeader";
  import axios from "axios";
  import {httpUrl} from "../../http_url/http_url";
  export default {
    name: "releaseDetails",
    data(){
      return{
        headerText:this.$t("taocoin.TaocoinDetails"),
        isExpand: false,
        /*用户点击展开*/
        currenCyId: this.$route.params.id,
        /*兑币id*/
        mainDetails: {},
        /*主币内容*/
        CurrencyList: [],
        /*所有内容*/
        stocksList: [],
        /*对币列表*/
        myOrderPage: 0,
        /*每页显示条数*/
        myOrderTotal: 0,
        /*总条数*/
        childOrderList: [],
        /*列表内容*/
      }
    },
    filters: {
      //小数点过滤器 不四舍五入
      number(value, num) {
        var toFixedNum = Number(value).toFixed(num + 1);
        var realVal = toFixedNum.substring(0, toFixedNum.lastIndexOf('.') + num + 1);
        return realVal;
      }
    },
    methods: {
      pagemyOrderChange(val) {
        let _this = this;
        axios.get(httpUrl.childOrder, {
          headers: {
            "Authorization": "Bearer " + this.token
          },
          params: {
            goods_id: this.currenCyId,
            page: val
          }
        }).then(function(res) {
          _this.childOrderList = res.data.data.data;
          _this.myOrderPage = res.data.data.per_page;
          _this.myOrderTotal = res.data.data.total;
        }, function(err) {
          console.log(err)
        })
      }
    },
    mounted() {
      let _this = this;
      /*获取兑币详情内容*/
      axios.get(httpUrl.info, {
        headers: {
          "Authorization": "Bearer " + this.token
        },
        params: {
          goods_id: this.currenCyId
        }
      }).then(function(res) {
        _this.CurrencyList = res.data.data;
        _this.mainDetails = res.data.data.main;
        _this.stocksList = res.data.data.stocks;
      }, function(err) {
        console.log(err)
      })
      /*获取兑换列表*/
      axios.get(httpUrl.childOrder, {
        headers: {
          "Authorization": "Bearer " + this.token
        },
        params: {
          goods_id: this.currenCyId
        }
      }).then(function(res) {
        _this.childOrderList = res.data.data.data;
        _this.myOrderPage = res.data.data.per_page;
        _this.myOrderTotal = res.data.data.total;
      }, function(err) {
        console.log(err)
      })
    },
    components:{
      "my-header":header
    }
  }
</script>
<style lang="scss">
  #releaseDetailsBox {
    background: #111627;
    .el-pager li {
      /*分页的背景颜色*/
      background: none !important;
      color: #fff;
    }
    .el-pagination .btn-next,
    .el-pagination .btn-prev {
      background: none !important;
      color: #fff;
    }
    .el-pager li.active,
    .el-pagination button:hover {
      color: #26cbc5;
    }
    .el-pagination button:disabled {
      color: #fff;
      background: none;
    }
  }
</style>
<style lang="scss" scoped>
.releaseDetaislwrapper{
  color:#6f74a6;
  .leftAndRight{
    width:100%;
    .releaseDetaisheader{
      width:100%;
      display:flex;
      justify-content: center;
      align-items: center;
      background-color:#111336;
      box-sizing:border-box;
      padding-top:0.05rem;
      padding-bottom:0.05rem;
      .Exchange{
        width:30%;
        text-align:center;
        padding-top:0.05rem;
        padding-bottom:0.05rem;
        .textSize{
          font-size:.14rem;
          color:#fff;
        }
      }
      .textPadding{
        padding-top:0.08rem;
        padding-bottom:0.08rem;
      }
    }
  }
}
.Taobao_item{
  width: 100%;
  box-sizing: border-box;
  margin-top: .1rem;
  padding-left: .15rem;
  padding-right:.15rem;
  background:#101336;
  .title{
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom:0.01rem solid #3b4286;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    padding: .08rem 0;
    .inHand{
      color:#fcb767;
    }
    .oCurrency1{
      display: flex;
      align-items: center;
      color: #e1e8fb;
      img{
        width: .3rem;
        height: .3rem;
        margin-right: .05rem;
      }
    }
  }
  .coinImg{
    display:flex;
    justify-content: center;
    aligin-items:center;
    background-color:#171940;
  }
  .content{
    width: 100%;
    padding-top:0.05rem;
    padding-bottom:0.05rem;
    .exchange{
      width: 100%;
      display: flex;
      align-item:center;
      justify-content: space-between;
      .text{
        display:flex;
        justify-content: center;
        align-items: center;
        line-height: .25rem;
        color: #6b6f9f;
        span{
          .iconColor{
            color:#22cbc6;
            padding-right:0.05rem;
            font-size:12px;
          }
        }

        .num{
          font-size: .15rem;
          color: #ff7d00;
        }
        .numbercolor{
          color:#fcb767;
        }
      }
      .cionExchnage{
        width:49%;
        display:flex;
        .activeColor{
          background-color:#232651;
        }
        .activedColor{
          background-color:#32366f;
        }
        .dl{
          display: flex;
          justify-content: center;
          align-items:center;
          width:30%;
          border-radius: 5px;
          margin-left:0.08rem;
          .dt{
            display:flex;
            justify-content: center;
            text-align: center;
            align-items:center;
            img{
              width: 50%;
            }
          }
        }
      }
    }
  }
}
.ExchangeListwrapper{
  padding-left:0.15rem;
  padding-right:0.15rem;
  background-color:#171940;
  .ExchangeList{
    .coinImg{
      display:flex;
      justify-content: center;
      aligin-items:center;
      background-color:#171940;
    }
    .content{
      width: 100%;
      padding-top:0.05rem;
      padding-bottom:0.05rem;
      .exchange{
        width: 100%;
        display: flex;
        align-item:center;
        justify-content: space-between;
        .text{
          display:flex;
          justify-content: center;
          align-items: center;
          line-height: .25rem;
          color: #6b6f9f;
          .num{
            font-size: .15rem;
            color: #ff7e00;
          }
          dt{
            margin-left: .1rem;
          }
          .numbercolor{
            color:#d0975b;
          }
        }
        .cionExchnage{
          width:49%;
          display:flex;
          .activeColor{
            background-color:#232651;
          }
          .activedColor{
            background-color:#32366f;
          }
          .dl{
            display: flex;
            justify-content: center;
            align-items:center;
            width:30%;
            border-radius: 5px;
            margin-left:0.08rem;
            .dt{
              display:flex;
              justify-content: center;
              text-align: center;
              align-items:center;
              img{
                width: 50%;
              }
            }
          }
        }
      }
    }
  }
}
.borderRight{
    float: right;
    height: 65%;
    border:0.5px solid #1f2354;
  }
.noPading{
  padding-left:0px;
  padding-right:0px
}
.pageCount {
  width: 100%;
  height: .6rem;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #111627;
}
.noData{
  display:flex;
  justify-content: center;
  align-items: center;
  text-align:center;
  width:100%;
  padding:0.3rem 0;
  color: #9A9A9A;
  .displayNoData{
    padding:0.08rem 0rem;
    div{
     color: #7e83ac;;
    }
  }
}
</style>
