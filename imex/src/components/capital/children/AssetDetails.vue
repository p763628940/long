<template>
  <div id="AssetDetails">
    <my-header :text="titleText"></my-header>
    <!--资产详情内容部分-->
    <div class="AssetDetailsTitle">
      <span class="curName">{{AssetDetails.currency}}</span>
      <p class="clickTransaction" v-if="isTransaction">
        <span @click="toChart(AssetDetails)"
              v-if="matchcoins.length!=0 || AssetDetails.naught_on==1&&AssetDetails.is_drop==1 || AssetDetails.naught_on==1&&AssetDetails.isTrad==1 ||AssetDetails.is_drop==1&&AssetDetails.isTrad==1"
              class="span"
        >
                  {{$t("WalletManagement.Exchange")}}
          <span class="icon">
          <i class="iconfont icon-shuangjiantou"></i>
        </span>
                </span>
        <router-link v-if="AssetDetails.naught_on==1&&AssetDetails.is_drop==0&&AssetDetails.matchcoins.length==0"
                     tag="span"
                     to="/Taocoin"
                     class="span"
        > {{$t("WalletManagement.Taocoin")}}
          <span class="icon">
          <i class="iconfont icon-shuangjiantou"></i>
        </span>
        </router-link>
        <router-link v-if="AssetDetails.is_drop>=1&&AssetDetails.naught_on==0&&AssetDetails.matchcoins.length==0"
                     tag="span"
                     :to="{name:'airdropDetails',params:{id:AssetDetails.currency_eid}}"
                     class="span"
        >{{$t("WalletManagement.Airdrop")}}
          <span class="icon">
          <i class="iconfont icon-shuangjiantou"></i>
        </span>
        </router-link>

      </p>
    </div>
    <!--可用-冻结--折合-->
    <div class="Available">
      <ul class="AvailableWrapper">
        <li class="AvailableItem">
          <p class="text">{{$t("WalletManagement.Available")}}</p>
          <p class="number">{{AssetDetails.balance| number(AssetDetails.displayNum)}}</p>
        </li>
        <li class="freeze">
          <p class="text">{{$t("WalletManagement.Freeze")}}</p>
          <p class="number">{{AssetDetails.lock_balance| number(AssetDetails.displayNum)}}</p>
        </li>
        <li class="Equivalent">
          <p class="text">{{$t("WalletManagement.Estimated")}}(CNY)</p>
          <p class="number">{{AssetDetails.cny_blance | number(2)}}</p>
        </li>
      </ul>
    </div>
    <!--财务记录-->
    <div class="FinancialRecord">
      <div class="FinancialRecordTitle">
        <span class="text">{{$t("WalletManagement.FinancialHistory")}}</span>
        <p class="select" @click="isAll=true">
          <span>
            {{ChoiceOfcurrency[ActiveIndex].value}}
            <i class="iconfont icon-xiala"></i>
          </span>
        </p>
      </div>
    </div>
    <!--记录列表部分-->
    <div class="FinancialRecordList">
      <ul class="FinancialRecordWrapper">
        <li class="FinancialRecordItem" v-for="item in Currency_record">
          <p class="type">
            <span v-if="item.type==1">{{$t("capital.Deposit")}}</span>
            <span v-if="item.type==-1">{{$t("capital.Withdraw")}}</span>
            <span v-if="item.type==-2">{{$t("list.Sell_BTC")}}</span>
            <span v-if="item.type==2">{{$t("list.Buy_BTC")}}</span>
            <span v-if="item.type==3">{{$t("capital.Otheramount")}}</span>
            <span v-if="item.type==4">{{$t("airdrop.Airdrop")}}</span>
            <span v-if="item.type==6">{{$t("taocoin.ExchangeC")}}</span>
            <span v-if="item.type==-6">{{$t("taocoin.ExchangeR")}}</span>
          </p>
          <dl>
            <dd>
              <p class="text">{{$t("WalletManagement.Amount")}}</p>
              <p class="number">{{item.balance | number(item.get_currency.displayNum)}}</p>
            </dd>
            <dd>
              <p class="text">{{$t("WalletManagement.State")}}</p>
              <p class="number">
                <span v-show="item.status==0">
							{{$t("capital.Processing")}}
							</span>
                <span v-show="item.status==1">{{$t("capital.Success")}}</span>
                <span v-show="item.status==-1">{{$t("capital.Unapprove")}}</span>
              </p>
            </dd>
            <dd>
              <p class="text">{{$t("WalletManagement.Time")}}</p>
              <p class="number">{{formatTime(item.created_at)}}</p>
            </dd>
          </dl>
        </li>
      </ul>
      <!--分页开始-->
      <div class="pageCount" v-show="recordTotal>10">
        <el-pagination small layout="prev, pager, next" :page-size="pageCount" :total="recordTotal"
                       @current-change="page">
        </el-pagination>
      </div>
      <!--暂无记录-->
      <div class="noData" v-if="recordTotal==0">
        <span>{{$t("list.noData")}}</span>
      </div>
    </div>
    <!--充币---收款---转账---提币--->
    <div class="oHeight"></div>
    <div class="typeList">
      <ul class="typeWrapper">
        <router-link :to="{name:'ChongBi',params:{curId:currencyID}}" tag="li" class="typeItem">
          <p class="icon">
            <i class="iconfont icon-chongbi"></i>
          </p>
          <p class="text">{{$t("WalletManagement.Chongbi")}}</p>
        </router-link>
        <li class="typeItem" v-if="currencyID==16||currencyID==73" @click="toExchange()">
          <p class="icon">
            <i class="iconfont icon-duihuan1"></i>
          </p>
          <p class="text">{{$t("taocoin.Exchange")}}
          <span v-if="currencyID==73">EOS</span>
            <span v-if="currencyID==16">FO</span>
          </p>
        </li>
        <li class="typeItem gray" v-if="currencyID!=16&&currencyID!=73">
          <p class="icon">
            <i class="iconfont icon-shoukuan"></i>
          </p>
          <p class="text">{{$t("WalletManagement.Receive")}}</p>
        </li>
        <li class="typeItem gray" v-if="currencyID!=16&&currencyID!=73">
          <p class="icon">
            <i class="iconfont icon-zhuanzhang-"></i>
          </p>
          <p class="text">{{$t("WalletManagement.Transfer")}}</p>
        </li>
        <router-link :to="{name:'tiBi',params:{curId:currencyID},query:{curName:curName}}" tag="li" class="typeItem">
          <p class="icon">
            <i class="iconfont icon-tibi"></i>
          </p>
          <p class="text">{{$t("WalletManagement.tibi")}}</p>
        </router-link>
      </ul>
    </div>
    <!--全部--充币--收款---转账---提币---->
    <div class="men_ban" v-if="isAll" @click="isAll=false"></div>
    <div class="ChoiceOfcurrency" v-if="isAll">
      <ul class="ChoiceOfcurrencyWrapper">
        <li class="ChoiceOfcurrencyItem" v-for="(item,key) in ChoiceOfcurrency" :key="key"
            :class="{'active':key==ActiveIndex}" @click="checkType(item,key)">
          <span>{{item.value}}</span>
        </li>
        <div class="bottom">
          <button @click="isAll=false">{{$t("taocoin.Confirm")}}</button>
        </div>
      </ul>
    </div>
  </div>
</template>

<script>
  import header from "../../public/backHeader"

  export default {
    name: "AssetDetails",
    data() {
      return {
        titleText: this.$t("WalletManagement.AssetsDetails"),
        isAll: false, /*是否选择类型*/
        currencyID: this.$route.params.curId,
        ChoiceOfcurrency: [
          {
            type: 0,
            value: this.$t("WalletManagement.All")
          },
          {
            type: 1,
            value: this.$t("capital.Deposit")
          },
          {
            type: -1,
            value: this.$t("capital.Withdraw")
          },
          {
            type: -2,
            value: this.$t("list.Sell_BTC")
          },
          {
            type: 2,
            value: this.$t("list.Buy_BTC")
          },
          {
            type: 6,
            value: this.$t("taocoin.ExchangeC")
          },
          {
            type: -6,
            value: this.$t("taocoin.ExchangeR")
          },
          {
            type: 4,
            value: this.$t("airdrop.Airdrop")   //空投
          },

        ],
        /*类型列表*/
        ActiveIndex: 0, /*选中类型*/
        AssetDetails: {}, /*当前选中对象*/
        matchcoins: [], /*币种*/
        Currency_record: [], /*历史记录*/
        recordTotal: 0, /*总条数*/
        pageCount: 0, /*分页条数*/
        type: 0, /*选择类型*/
        curName: "", /*币种id*/
        isTransaction: true, /*判断是否没有交易*/
      }
    },
    components: {
      "my-header": header
    },
    mounted() { /*获取财务记录*/
      /*获取单独资产信息*/
      let AssetDetails = window.localStorage.getItem("AssetDetails");
      this.AssetDetails = JSON.parse(AssetDetails);
      if (this.AssetDetails.naught_on == 0 && this.AssetDetails.is_drop == 0 && this.AssetDetails.isMain == 0 && this.AssetDetails.isTrad == 0) {
        this.isTransaction = false;
      }
      this.curName = JSON.parse(AssetDetails).currency;
      this.matchcoins = JSON.parse(AssetDetails).matchcoins || [];
      /*获取历史记录*/
      this.$ajax.get(this.httpUrl.recharge, {
        headers: {
          "Authorization": "Bearer " + this.token
        },
        params: {
          currency_id: this.currencyID
        }
      }).then(res => {
        this.Currency_record = res.data.data.data;
        this.pageCount = res.data.data.per_page;
        this.recordTotal = res.data.data.total;
      }, err => {
        console.log(err)
      })
    },
    filters: {
      //小数点过滤器 不四舍五入
      number(value, num) {
        var toFixedNum = Number(value).toFixed(num + 1);
        var realVal = toFixedNum.substring(0, toFixedNum.toString().length - 1);
        return realVal;
      }
    },
    methods: {
      toExchange(){ /*兑换类型*/
        this.$router.push({name:"Exchange",params:{toType:this.currencyID==73?'FotoEos':'EostoFo'}});
      },
      checkType(item, index) {
        let obj;
        /*判断是否选择全部*/
        if (index == 0) {
          obj = {
            currency_id: this.currencyID,
          }
        } else {
          obj = {
            currency_id: this.currencyID,
            type: item.type
          }
        }
        this.ActiveIndex = index;
        this.type = item.type;
        /*选中对应类型*/
        /*获取历史记录*/
        this.$ajax.get(this.httpUrl.recharge, {
          headers: {
            "Authorization": "Bearer " + this.token
          },
          params: obj
        }).then(res => {
          this.Currency_record = res.data.data.data;
          this.pageCount = res.data.data.per_page;
          this.recordTotal = res.data.data.total;
        }, err => {
          console.log(err)
        })
      },
      toChart(item) { /*跳转币币页面*/
        this.$router.push("/index/bbjy/macthid" + item.matchcoins[0].id)
      },
      page(val) {
        /*获取历史记录*/
        let obj;
        if (this.type == 0) { /*判断是否有选择类型*/
          obj = {
            currency_id: this.currencyID,
            page: val
          }
        } else {
          obj = {
            currency_id: this.currencyID,
            page: val,
            type: this.type
          }
        }

        this.$ajax.get(this.httpUrl.recharge, {
          headers: {
            "Authorization": "Bearer " + this.token
          },
          params: obj
        }).then(res => {
          this.Currency_record = res.data.data.data;
          this.pageCount = res.data.data.per_page;
          this.recordTotal = res.data.data.total;
        }, err => {
          console.log(err)
        })
      }
    }
  }
</script>
<style lang="scss">
  #AssetDetails {
    .el-pager li {
      /*分页的背景颜色*/
      background: none;
      color: #fff;
    }
    .el-pagination .btn-next,
    .el-pagination .btn-prev {
      background: none;
      color: #fff;
    }

    .el-pager li.active,
    .el-pagination button:hover {
      color: #a4acff;
    }

    .el-pagination button:disabled {
      color: #fff;
      background: none;
    }
  }

</style>
<style lang="scss" scoped>
  $bgColor: #141738;
  /*头部*/
  .AssetDetailsTitle {
    width: 100%;
    height: .4rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-sizing: border-box;
    padding-left: .15rem;
    background: $bgColor;
    .curName {
      font-size: .16rem;
      color: #7387e7;
    }
    .span {
      display: flex;
      align-items: center;
      padding: .06rem .08rem;
      border: 1px solid #43468f;
      color: #7387e7;
      border-right: none;
      border-top-left-radius: .04rem;
      border-bottom-left-radius: .04rem;
      .iconfont {
        font-size: .12rem;
        margin-left: .02rem;
      }
    }
  }

  /*可用 冻结 折合*/
  .Available {
    width: 100%;
    box-sizing: border-box;
    padding: .1rem .15rem .05rem .15rem;
    background: $bgColor;
    .AvailableWrapper {
      width: 100%;
      display: flex;
      justify-content: space-between;
      li {
        flex: 1;
        text-align: left;
        .text {
          color: #5f628c;
        }
        .number {
          color: #d3d3d6;
          height: .3rem;
          line-height: .3rem;
        }
      }
      .freeze {
        text-align: center;
      }
      .Equivalent {
        text-align: right;
      }
    }
  }

  /*财务记录*/
  .FinancialRecord {
    width: 100%;
    background: $bgColor;
    margin-top: .1rem;
    .FinancialRecordTitle {
      width: 100%;
      height: .5rem;
      display: flex;
      justify-content: space-between;
      box-sizing: border-box;
      align-items: center;
      padding: 0 .15rem;
      .text {
        font-size: .15rem;
        color: #fff;
      }
      .select {
        color: #7387e7;
        font-size: .13rem;
        .iconfont {
          font-size: .1rem;
        }
      }
    }
  }

  /*财务记录列表*/
  .FinancialRecordList {
    width: 100%;
    box-sizing: border-box;
    padding-left: .15rem;
    background: $bgColor;
    .FinancialRecordItem {
      box-sizing: border-box;
      border-bottom: .01rem solid #1f2257;
      padding: .1rem 0;
      padding-right: .15rem;
      .type {
        color: #fff;
        font-size: .14rem;
      }
      dl {
        display: flex;
        dd {
          flex: 1;
          .text {
            height: .3rem;
            line-height: .4rem;
            color: #5f628c;
          }
          .number {
            color: #d3d3d6;
            height: .3rem;
            line-height: .3rem;
          }
        }
        dd:nth-of-type(2) {
          text-align: center;
        }
        dd:nth-of-type(3) {
          text-align: right;
          .number {
            padding-top: .05rem;
            line-height: inherit;
          }
        }
      }
    }
  }

  /*底部按钮部分*/
  .typeList {
    width: 100%;
    height: .8rem;
    background: $bgColor;
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 55;
    .typeWrapper {
      width: 100%;
      height: .8rem;
      display: flex;
      justify-content: space-around;
      box-sizing: border-box;
      align-items: center;
      padding: 0 .1rem;
      .typeItem {
        flex: 1;
        text-align: center;
        .icon {
          width: .4rem;
          height: .4rem;
          background: #252553;
          border: 1px solid #3d3e86;
          border-radius: .02rem;
          text-align: center;
          line-height: .4rem;
          color: #fff;
          margin: 0 auto;
          margin-top: .05rem;
          .iconfont {
            font-size: .2rem;
          }
          .icon-shoukuan {
            font-size: .24rem;
          }
          .icon-zhuanzhang- {
            font-size: .25rem;
          }
        }
        .text {
          height: .25rem;
          line-height: .25rem;
          color: #fff;
        }
      }
      .gray {
        .icon {
          .iconfont {
            color: #7c80a3;
          }
        }
        .text {
          color: #7c80a3;
        }
      }
    }
  }

  .oHeight {
    width: 100%;
    height: .8rem;
  }

  /*蒙版*/
  .men_ban {
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    position: fixed;
    left: 0;
    top: 0;
    z-index: 68;
  }

  /*选择列表*/
  .ChoiceOfcurrency {
    width: 100%;
    .ChoiceOfcurrencyWrapper {
      width: 100%;
      background: #111336;
      position: fixed;
      left: 0;
      bottom: 0;
      z-index: 70;
      .ChoiceOfcurrencyItem {
        width: 100%;
        height: .4rem;
        line-height: .4rem;
        text-align: center;
        color: #6f73aa;
        border-bottom: .01rem solid #1f2354;
      }
      .active {
        color: #7386e7;
      }
    }
    .bottom {
      width: 88%;
      height: .4rem;
      margin: .2rem auto;
      button {
        width: 100%;
        height: .4rem;
        background: #25274e;
        color: #fff;
        border: none;
        border-radius: .04rem;
      }
    }
  }

  .pageCount {
    width: 100%;
    height: .4rem;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  /*暂无记录*/
  .noData {
    width: 100%;
    height: .4rem;
    line-height: .4rem;
    color: #fff;
    text-align: center;
  }
</style>
