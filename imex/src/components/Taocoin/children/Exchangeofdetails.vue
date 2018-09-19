<template>
  <div class="detailWrapper">
    <div id="Exchangeofdetails">
      <my-header :text="headerText"></my-header>
    </div>
    <!--确认支付信息-->
    <div class="men_ban" v-if="isExchange"></div>
    <div class="conformDialog" v-if="isExchange">
      <div class="title">
        <p>{{$t("taocoin.Confirminfo")}}</p>
      </div>
      <div class="content">
        <div class="contentItem">{{$t("taocoin.NeedPay")}} <span class="textRed">{{selectStocks.c_num/selectStocks.m_num*ExchangeAmount | number(selectStocks.currency.displayNum)}}</span>
          {{selectStocks.currency.pageIdentifier}}
        </div>
        <div class="contentItem"><input type="password" v-model="Fundpassword"/></div>
        <div class="contentItem textRed">{{$t("taocoin.EnterFunds")}}</div>
      </div>
      <div class="bottom1">
        <div class="conformWrapper">
          <div class="colse" @click="isExchange=false;Fundpassword=''">{{$t("taocoin.Close")}}</div>
          <div class="conform" @click="ConfirmExchange">{{$t("taocoin.Confirm")}}</div>
        </div>
      </div>
    </div>
    <div class="detailWrapperTitle">{{$t("taocoin.InvestCoin")}}</div>
    <!--跳转链接-->
    <div class="Nesting" v-if="iframeIsShow">
      <div class="NestingTitle">
        <i class="iconfont icon-cuowu" @click="iframeIsShow=false"></i>
      </div>
      <iframe :src="iframeSrc" id="iframe"></iframe>
    </div>
    <!--账户资金不足弹框-->
    <div class="men_ban" v-if="isAssetsNoDate"></div>
    <div class="conformDialog1" v-if="isAssetsNoDate">
      <div class="title">
        <p>{{$t("taocoin.AssetsInsufficient")}}</p>
      </div>
      <div class="content">
        <div class="contentItem">{{$t("taocoin.AccountLeft")}} <span
          class="textRed">{{CurrencyBalance | number(8)}}</span>{{selectStocks.currency.pageIdentifier}}，{{$t("taocoin.CannotExchange")}}
        </div>
      </div>
      <div class="Close2" v-if="isAssetsNoDate" @click="isAssetsNoDate=false">
        <i class="iconfont icon-quxiao1"></i>
      </div>
    </div>
    <!--兑换内容部分-->
    <div class="ExchangeWrapper">
      <div class="ExchangeContent">
        <div class="title">
          <p class="oCurrency1">
            <img :src="mainDetails.logoUrl" alt="">
            <span class="briefIntroduction">{{mainDetails.pageIdentifier}}</span>
            <span class="xie">/</span>
            <span class="FullName">{{mainDetails.fullName}}</span>
          </p>
          <p class="textColor">{{CurrencyList.order_people_count}}{{$t("taocoin.XXexchange")}}</p>
        </div>
        <ul class="ExchangeDetail">
          <li class="detailItem" v-if="CurrencyList.is_auth || CurrencyList.is_mobile">
            <p>
              <span>{{$t("taocoin.ExchangeLimit")}}：</span>
              <span class="spanPadding" v-if="CurrencyList.is_auth==1"> <i class="iconfont icon-renzheng iconColor"></i><span>{{$t("taocoin.AdvancedCertification")}}</span></span>
              <span v-if="CurrencyList.is_mobile==1"> <i class="iconfont icon-icon_bangdingshouji iconColor"></i><span>{{$t("taocoin.BindPhoneNum")}}</span></span>
            </p>
          </li>
          <li class="detailItem">
            <p>{{$t("taocoin.CanExchange")}}：</p>
            <div class="cionExchnage">
              <div class="dl" v-for="item in CurrencyList.stocks" @click="selectSot(item)">
                <div class="dt">
                  <img :src="item.currency.logoUrl"/>
                </div>
              </div>
            </div>
          </li>
          <li class="detailItem">
            <p>{{$t("taocoin.ExchangeNum")}}:</p>
          </li>
          <li class="detailItem addBorder">
            <input type="text" width="80%" @input="clearNoNum($event,mainDetails.displayNum)"
                   :placeholder="CurrencyList.lower | number(mainDetails.displayNum)" v-model.number="ExchangeAmount"
                   class="inputbox" maxlength="14"/>
            <div class="triangle">
              <i class="iconfont icon-jia2" @click="addNum(mainDetails.displayNum)"></i>
              <i class="iconfont icon-iconjian" @click="reduce(mainDetails.displayNum)"></i>
            </div>
          </li>
          <li class="detailItem">
            <p class="textHeight">{{$t("taocoin.Stocks")}}：{{CurrencyList.dec_balance |
              number(mainDetails.displayNum)}}{{mainDetails.pageIdentifier}}</p>
          </li>
          <li class="detailItem floatRight">
            <p class="exchangeP">
              {{$t("taocoin.ExchangePrice")}}：<span class="priceColor">{{selectStocks.c_num/selectStocks.m_num | number(selectStocks.currency.displayNum)}}</span>
              {{selectStocks.currency.pageIdentifier}}
            </p>
          </li>
        </ul>
      </div>
    </div>
    <!--项目介绍部分-->
    <div class="intruduce">
      <div class="intruduceText">
        <p class="psize">{{$t("airdrop.ProjectIntroduction")}}</p>
        <p>
          <span class="gotoweb textColor" @click="toOpen(mainDetails.officiaWebsite)">{{$t("taocoin.GoOfficialWebsite")}}</span>
          <span class="textColor" @click="toOpen(mainDetails.whitePaper)">{{$t("taocoin.ViewWhitePaper")}}</span>
        </p>
      </div>
      <div class="intruduceContent">
        <p>{{mainDetails.summary}}</p>
      </div>
    </div>
    <div class="bottom">
      <p>{{$t("taocoin.NeedPay")}}：
        <span class="priceColor">{{selectStocks.c_num/selectStocks.m_num*ExchangeAmount | number(selectStocks.currency.displayNum)}}</span>
        {{selectStocks.currency.pageIdentifier}}
      </p>
      <button class="buttonStyle" @click="RedeemNow">{{$t("taocoin.ExchangeImmediate")}}</button>
    </div>
    <!--未进行高级认证，无法兑换-->
    <div class="men_ban" v-if="isIdentity"></div>
    <div class="certification" v-if="isIdentity">
      <div class="content">{{$t("taocoin.NotVerExchange")}}</div>
      <div class="buttons">
        <div class="button1">{{$t("vote.LetmeThink")}}</div>
        <div class="borderRight"></div>
        <div class="button1">
          <router-link to="/senior" tag="span">{{$t("vote.Verify")}}</router-link>
        </div>
      </div>
      <div class="close">
        <i class="iconfont icon-quxiao1"></i>
      </div>
    </div>
    <!--未绑定手机号，无法兑换-->
    <div class="men_ban" v-if="isBandingMobile"></div>
    <div class="certification" v-if="isBandingMobile">
      <div class="content">{{$t("taocoin.NotBindExchange")}}</div>
      <div class="buttons">
        <div class="button1" @click="isBandingMobile=false">{{$t("vote.LetmeThink")}}</div>
        <div class="borderRight"></div>
        <div class="button1">
          <router-link to="/SecurityCenter" tag="span">{{$t("vote.Verify")}}</router-link>
        </div>
      </div>
      <div class="close">
        <i class="iconfont icon-quxiao1" @click="isBandingMobile=false"></i>
      </div>
    </div>
  </div>
</template>

<script>
  import header from "../../public/backHeader"
  import axios from "axios"
  import {httpUrl} from "../../http_url/http_url";
  import {mapState} from "vuex";
  export default {
    name: "Exchangeofdetails",
    data() {
      return {
        headerText: this.$t("taocoin.TaocoinDetails"),
        ExchangeAmount: "",
        /*兑换量*/
        isExchange: false,
        /*用户输入资金密码*/
        isAssets: false,
        /*用户资产为空*/
        isAssetsNoDate: false,
        /*用户资产为空*/
        isMobile: false,
        /*联系卖家*/
        isHasBeenRemoved: false,
        /*判断是否已经下架*/
        isNoStockAvailable: false,
        /*判读是否有库存*/
        currenCyId: this.$route.params.id,
        /*兑换币的详情*/
        mainDetails: {},
        /*主币内容*/
        CurrencyList: [],
        /*所有内容*/
        stocksList: [],
        /*对币列表*/
        selectStocks: {
          id: "",
          currency: {
            displayNum: 4,
            fullName: "",
            id: "",
            logoUrl: "",
            officiaWebsite: "",
            pageIdentifier: "",
            summary: "",
            whitePaper: "",
            zhName: ""
          }
        },
        /*选中兑换量*/
        CurrencyBalance: "",
        /*指定币种余额*/
        errText: "",
        /*错误提示*/
        Fundpassword: "",
        /*资金密码*/
        userList: {}, /*用户信息*/
        goods_id: "",  //兑换要传的goods_id
        isIdentity: false, //是否高级认证
        isBandingMobile: false, //是否手机验证
        iframeIsShow: false,   //跳转官网
        iframeSrc: "",         //官网地址
      }
    },
    components: {
      "my-header": header
    },
    filters: {
      //小数点过滤器 不四舍五入
      number(value, num) {
        var toFixedNum = Number(value).toFixed(num + 1);
        var realVal = toFixedNum.substring(0, toFixedNum.lastIndexOf('.') + num + 1);
        return realVal;
      }
    },
    computed:{
      ...mapState('user',["lang"])
    },
    mounted() {
      let _this = this;
      /*获取币种信息*/
      this.getInfo();
      if (this.token == null && this.token == undefined) {
        return false;
      }
      /*获取用户信息*/
      axios.get(httpUrl.userInfo, {
        headers: {"Authorization": "Bearer " + this.token}
      }).then(function (res) {
        _this.userList = res.data.data;
      }, function (err) {
        console.log(err)
      })
    },
    methods: {
      getInfo(){/*获取币种信息*/
        let _this = this;
        axios.get(httpUrl.info, {
          params: {
            goods_id: this.currenCyId,
            lang:this.lang
          }
        }).then(function (res) {
          _this.CurrencyList = res.data.data;
          _this.mainDetails = res.data.data.main;
          _this.stocksList = res.data.data.stocks;
          _this.selectStocks = res.data.data.stocks[0];
          _this.goods_id = res.data.data.id;
          if (_this.token == null && _this.token == undefined) {
            return false;
          }
          /*获取指定币种余额*/
          axios.get(httpUrl.currencyBalance, {
            headers: {
              "Authorization": "Bearer " + _this.token
            },
            params: {
              currency_id: _this.selectStocks.currency.id
            }
          }).then(function (res) {
            if (res.data.data.length == 0) {
              _this.CurrencyBalance = "0.00"
              return false;
            }
            ;
            _this.CurrencyBalance = res.data.data.balance;
          }, function (err) {
            console.log(err)
          })
        }, function (err) {
          console.log(err)
        })
      },
      selectSot(item) {
        let _this = this;
        this.selectStocks = item;
        if (this.token == null && this.token == undefined) {
          return false;
        }
        /*获取指定币种余额*/
        axios.get(httpUrl.currencyBalance, {
          headers: {
            "Authorization": "Bearer " + _this.token
          },
          params: {
            currency_id: item.currency.id
          }
        }).then(function (res) {
          if (res.data.data.length == 0) {
            _this.CurrencyBalance = "0.00";
            return false;
          }
          ;
          _this.CurrencyBalance = res.data.data.balance;
        }, function (err) {
          console.log(err)
        })
      },
      Mobile() {
        if (this.token == null && this.token == undefined) {
          return false;
        }
        this.isMobile = true;
      },
      toOpen(oUrl) {  /*打开新窗口*/
        this.iframeSrc = oUrl;
        this.iframeIsShow = true;
      },
      toIdentity() { //跳转高级认证
        this.$router.push({
          name: "identity",
          params: {
            type: "normal"
          }
        })
      },
      toBadingMobile() {
        this.$router.push({
          name: "Accountsecurity",
          params: {
            bangdin: "no"
          }
        })
      },
      RedeemNow() { /*立即兑换*/
        let _this = this;
        if (this.token == null && this.token == undefined) {
          this.$router.push({name: "login"})
          return false;
        }
        if (this.ExchangeAmount == "") {
          this.$message({
            message: _this.$t("taocoin.ExAmountNotEmp"),
            type: 'warning'
          });
          return false;
        }
        if (this.CurrencyList.status != 0) {
          this.$message({
            message: this.$t("fbjy.ProductRemoved"),
            type: 'warning'
          });
          return false;
        }
        if (Number(this.ExchangeAmount) > Number(this.CurrencyList.balance)) {
          this.$message({
            message: _this.$t("taocoin.AmountNotGreater"),
            type: 'warning'
          });
          this.ExchangeAmount = this.CurrencyList.balance;
          return false;
        }
        if (Number(this.ExchangeAmount) > Number(this.CurrencyList.dec_balance)) {
          this.$message({
            message: _this.$t("taocoin.AmountNotGreater"),
            type: 'warning'
          });
          this.ExchangeAmount = this.CurrencyList.dec_balance;
          return false;
        }
        if (Number(this.ExchangeAmount) < Number(this.CurrencyList.lower)) {
          this.$message({
            message: _this.$t("taocoin.AmountNotSeller"),
            type: 'warning'
          });
          return false;
        }
        if (this.userList.auth_grade == 0 && this.CurrencyList.is_auth == 1) {
          this.isIdentity = true;
          return false;
        }
        if (this.userList.mobile_status == 0 && this.CurrencyList.is_mobile == 1) {
          this.isBandingMobile = true;
          return false;
        }
        if (this.ExchangeAmount == "" || this.ExchangeAmount == 0) {
          this.$message({
            message: _this.$t("taocoin.PleaseFillAmount"),
            type: 'warning'
          });
          return false;
        }
        if (this.selectStocks.c_num / this.selectStocks.m_num * this.ExchangeAmount > this.CurrencyBalance) { /*判断用户余额是否足够*/
          this.isAssetsNoDate = true;
          return false;
        }
        this.isExchange = true;
      },
      ConfirmExchange() { /*输入资金密码，确认兑换*/
        let _this = this;
        if (this.Fundpassword == "") {
          this.$message({
            message: _this.$t("login.PleasePassword"),
            type: 'warning'
          });
          return false;
        }
        if (this.Fundpassword.length < 8) {
          this.$message({
            message: _this.$t("taocoin.EnterCorrectPassword"),
            type: 'warning'
          });
          return false;
        }
        axios.post(httpUrl.place, {
          stocks_id: this.selectStocks.id,
          balance: this.ExchangeAmount,
          payPasswd: this.Fundpassword,
          goods_id: this.goods_id,
        }, {
          headers: {
            "Authorization": "Bearer " + _this.token
          }
        }).then(function (res) {
          if (res.data.status.code == 200) {
            _this.Fundpassword == "";
            _this.isExchange = false;
            _this.$message({
              message: _this.$t("taocoin.ExchangeSuccess"),
              type: 'success'
            });
            _this.getInfo();
          }
        }, function (err) {
          console.log(err)
        })

      },
      clearNoNum(eve, num) {
        const regexp = /(?:\.0*|(\.\d+?)0+)$/;
        var toFixedNum = Number(this.ExchangeAmount).toFixed(num + 1);
        this.ExchangeAmount = toFixedNum.substring(0, toFixedNum.toString().length - 1);
        this.ExchangeAmount = this.ExchangeAmount.replace(regexp, '$1');
        if (this.ExchangeAmount == "" || eve.target.value == "") {
          this.ExchangeAmount = "";
        }
        if (isNaN(this.ExchangeAmount)) {
          this.ExchangeAmount = "";
        }
        eve.target.value = eve.target.value.replace(/[^\d.]/g, ""); //清除"数字"和"."以外的字符
        eve.target.value = eve.target.value.replace(/^\./g, ""); //验证第一个字符是数字而不是
        eve.target.value = eve.target.value.replace(/\.{2,}/g, "."); //只保留第一个. 清除多余的
        eve.target.value = eve.target.value.replace(".", "$#$").replace(/\./g, "").replace("$#$", ".");
        if(Number(this.ExchangeAmount)>Number(this.CurrencyList.dec_balance)){ /*输入大于库存量就等于库存量*/
          this.$message({
            message: this.$t("taocoin.AmountNotGreater"),
            type: 'warning'
          });
          this.ExchangeAmount = this.CurrencyList.dec_balance;
        }
      },
      ///增加
      addNum(num) {
        //判断是否大于库存
        if (Number(this.ExchangeAmount) == Number(this.CurrencyList.dec_balance)) {
          return false;
        }
        var str = "1" + Array(num).join("0") + "0";
        var addNumber = Number(str);
        var NewNum = "";
        for (let i = 0; i < num - 1; i++) {
          NewNum += "0"
        }
        var pre = "0." + NewNum + "1";
        if (this.ExchangeAmount == 0 || this.ExchangeAmount == "") {
          this.ExchangeAmount = pre;
          return false;
        }
        ///将获取到的值加
        var Num = Math.round(this.ExchangeAmount * addNumber);
        Num++;
        this.ExchangeAmount = (Num / addNumber).toFixed(num);
        var xsd = this.ExchangeAmount.toString().split(".");
        if (xsd.length > 1) {
          if (xsd[1].length < num) {
            this.ExchangeAmount = this.ExchangeAmount.toString() + "0";
          }
        }
        if(Number(this.ExchangeAmount)>Number(this.CurrencyList.dec_balance)){ /*输入大于库存量就等于库存量*/
          this.$message({
            message: this.$t("taocoin.AmountNotGreater"),
            type: 'warning'
          });
          this.ExchangeAmount = this.CurrencyList.dec_balance;
        }
      }, ///减少   限价   卖出价格
      reduce(num) {
        let _this = this;
        if (this.ExchangeAmount == 0 || this.ExchangeAmount == "") {
          this.ExchangeAmount = 0.00;
          return false;
        }
        var str = "1" + Array(num).join("0") + "0";
        var remNumber = Number(str);
        var Num = Math.round(this.ExchangeAmount * remNumber);
        Num--;
        this.ExchangeAmount = (Num / remNumber).toFixed(num);
        var xsd = this.ExchangeAmount.toString().split(".");
        if (xsd.length > 1) {
          if (xsd[1].length < num) {
            this.ExchangeAmount = this.ExchangeAmount.toString() + "0";
          }
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .detailWrapper {
    .detailWrapperTitle {
      width: 100%;
      color: #fff;
      display: flex;
      text-align: center;
      align-items: center;
      line-height: 0.2rem;
      font-size: .1rem;
      -webkit-box-sizing: border-box;
      -moz-box-sizing: border-box;
      box-sizing: border-box;
      padding: .1rem .1rem;
      background-color: #101336;
    }
    .ExchangeWrapper {
      width: 100%;
      color: #676b9b;
      background-color: #16183f;
      border-top: 1px solid #282d64;
      border-bottom: 1px solid #282d64;
      .ExchangeContent {
        padding-left: .15rem;
        padding-right: .15rem;
        .title {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          -webkit-box-sizing: border-box;
          -moz-box-sizing: border-box;
          box-sizing: border-box;
          padding: .15rem 0;
          .oCurrency1 {
            display: flex;
            align-items: center;
            color: #e1e8fb;
            img {
              width: .3rem;
              height: .3rem;
              margin-right: .05rem;
            }
            .xie {
              margin: 0 .05rem;
            }
          }
          .textColor {
            color: #24cbc4;
          }
        }
        .ExchangeDetail {
          line-height: 0.24rem;
          .addBorder {
            border: 1px solid #2c326e;
            border-radius: 3px;
            padding-top: 0.05rem;
            padding-bottom: 0.05rem;
            :-moz-placeholder { /* Mozilla Firefox 4 to 18 */
              color: #2f337a;
            }

            ::-moz-placeholder { /* Mozilla Firefox 19+ */
              color: #2f337a;
            }

            input:-ms-input-placeholder {
              color: #2f337a;
            }

            input::-webkit-input-placeholder {
              color: #2f337a;
            }
            .inputbox {
              width: 80%;
              height: .35rem;
              padding-left: 0.05rem;
              background: none;
              outline: none;
              border: none;
              border-radius: 3px;
              width: 100%;
              color: #fff;
            }
            .triangle {
              width: 20%;
              display: flex;
              .iconfont{
                margin-right: .1rem;
                color: #fff;
              }
              /*.icon-jia2 {*/
                /*position: absolute;*/
                /*right: .4rem;*/
                /*top: .18rem;*/
                /*font-size: .15rem;*/
                /*color: #fff;*/
              /*}*/
              /*.icon-iconjian {*/
                /*position: absolute;*/
                /*right: .1rem;*/
                /*top: .18rem;*/
                /*font-size: .15rem;*/
                /*color: #fff;*/
              /*}*/
            }
          }
          .floatRight {
            display: flex;
            flex-direction: row-reverse;
          }
          .detailItem {
            display: flex;
            height: .3rem;
            justify-items: center;
            align-items: center;
            .textHeight {
              line-height: 0.3rem;
            }
            p {
              .spanPadding {
                padding-right: 0.08rem;
              }
              span {
                .iconColor {
                  color: #22cbc6;
                  padding-right: 0.05rem;
                  font-size: .15rem;
                }
              }
            }
            .cionExchnage {
              width: 49%;
              display: flex;
              .dl {
                display: flex;
                justify-content: center;
                align-items: center;
                width: 30%;
                border-radius: 5px;
                .dt {
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  img {
                    width: 50%;
                  }
                }
              }
            }
            .exchangeP {
              line-height: 0.3rem;
            }
            p {
              .priceColor {
                color: #ff7e00;
                font-size: 0.16rem;
              }
            }
          }
        }
      }
    }
    .intruduce {
      width: 100%;
      color: #babddc;
      .intruduceText {
        display: flex;
        height: 0.5rem;
        justify-content: space-between;
        align-items: center;
        padding-left: .15rem;
        padding-right: .15rem;
        border-bottom: 1px solid #2c326e;
        p {
          .gotoweb {
            padding-right: 0.15rem;
          }
          .textColor {
            color: #24cbc4;
          }
        }
        .psize {
          font-size: 0.16rem;
          color: #e2e7fa;
        }
      }
      .intruduceContent {
        padding: 0.15rem .15rem 0.8rem 0.15rem;
        line-height: .2rem;
      }
    }
    .bottom {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;
      position: fixed;
      left: 0px;
      bottom: 0px;
      padding-left: .15rem;
      -webkit-box-sizing: border-box;
      -moz-box-sizing: border-box;
      box-sizing: border-box;
      height: .5rem;
      background-color: #171940;
      p {
        color: #6e74a8;
        .priceColor {
          color: #ff7e00;
          font-size: 0.16rem;
        }
      }
      .buttonStyle {
        padding: 0px;
        width: 40%;
        height: 100%;
        background-color: #26cbc5;
        border: none;
        color: #fff;
        font-size: 0.14rem;
      }
    }
  }

  .Nesting {
    width: 100%;
    height: 100%;
    background: #0c0934;
    position: fixed;
    left: 0;
    top: 0;
    z-index: 99;
    .NestingTitle {
      width: 100%;
      height: .5rem;
      line-height: .5rem;
      text-align: right;
      box-sizing: border-box;
      padding-right: .1rem;
      color: #fff;
    }
    #iframe {
      width: 100%;
      height: 90%;
      box-sizing: border-box;
    }
  }

  /*弹框样式*/
  .men_ban {
    width: 100%;
    height: 100%;
    position: fixed;
    left: 0;
    top: 0;
    z-index: 666;
    background: rgba(0, 0, 0, 0.6);
  }

  .conformDialog1 {
    @extend .conformDialog;
    height: 1.8rem;
    .content {
      height: .9rem;
    }
  }

  .conformDialog {
    width: 2.4rem;
    min-height: 2rem;
    background-color: #fff;
    border-radius: 3px;
    position: fixed;
    left: 50%;
    top: 50%;
    box-sizing: border-box;
    margin-left: -1.2rem;
    margin-top: -1.4rem;
    padding: 0 .1rem;
    z-index: 999;
    .title {
      height: 0.45rem;
      font-size: 0.12rem;
      text-align: center;
      box-sizing: border-box;
      padding: .1rem 0;
      color: #1d1e51;
      border-bottom: .01rem solid #eee;
      font-size: .14rem;
      p {
        line-height: .2rem;
      }
    }
    .content {
      width: 100%;
      min-height: 1.2rem;
      line-height: .2rem;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      box-sizing: border-box;
      border-bottom: .01rem solid #eee;
      .contentItem {
        width: 100%;
        text-align: center;
      }
      input {
        width: 80%;
        height: 0.25rem;
        background: none;
        outline: none;
        border: 1px solid #ccc;
        margin-top: 0.1rem;
        margin-bottom: 0.1rem;
        box-sizing: border-box;
        padding-left: .05rem;
      }
      .textRed {
        color: #ff7e00;
        font-size: 0.13rem;
      }
    }
    .bottom1 {
      box-sizing: border-box;
      height: 0.4rem;
      width: 100%;
      .conformWrapper {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        aligin-items: center;
        height: 0.3rem;
        color: #25cbc5;
        margin-top: 0.08rem;
        .colse {
          border-right: 1px solid #ccc;
        }
        div {
          line-height: 0.3rem;
          box-sizing: border-box;
          width: 100%;
          height: 100%;
          flex: 1;
          font-size: .14rem;
          text-align: center;
        }
      }
    }
  }

  .Close {
    position: fixed;
    left: 50%;
    top: 50%;
    z-index: 999;
    margin-left: -.13rem;
    margin-top: .5rem;
    .iconfont {
      color: #fff;
      font-size: .25rem;
    }
  }

  .Close2 {
    @extend .Close;
    margin-top: .9rem;
  }

  .certification {
    width: 2.4rem;
    background-color: #fff;
    border-radius: 3px;
    position: fixed;
    left: 50%;
    top: 50%;
    box-sizing: border-box;
    margin-left: -1.2rem;
    margin-top: -1.4rem;
    z-index: 999;
    .content {
      width: 100%;
      text-align: center;
      padding: 0.2rem 0;
      color: #1e1d54;
      border-bottom: .01rem solid #eee;
    }
    .buttons {
      display: flex;
      justify-content: center;
      align-items: center;
      color: #25cbc5;
      .button1 {
        flex: 1;
        text-align: center;
        padding: 0.15rem 0;
        cursor: pointer;
      }
    }
    .close {
      position: fixed;
      left: 50%;
      top: 50%;
      z-index: 999;
      margin-left: -.13rem;
      margin-top: .2rem;
      .iconfont {
        color: #fff;
        font-size: .25rem;
      }
    }
  }

  .borderRight {
    width: 0rem;
    float: right;
    height: 0.15rem;
    border-right: 0.01rem solid #e1e1e7;
  }
</style>
