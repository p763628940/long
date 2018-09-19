<template>
  <div id="exchange">
    <my-header :text="headerText"></my-header>
    <!--loading-->
    <my-Loading v-if="isLoading"></my-Loading>
    <!--兑换成功-->
    <div class="SuccessfulRedemption" v-if="SuccessfulRedemption">
      <i class="iconfont icon-chenggong1"></i>
      {{$t("shouye.success")}}
    </div>
    <!--兑换失败-->
    <div class="Redemption" v-if="Redemption">
      <i class="iconfont icon-shibai"></i>
      {{$t("shouye.failed")}}
    </div>
    <!--付款数量-->
    <div class="PaymentAmount">
      <div class="children" v-if="FotoEos">
        <img src="../../../assets/FO.png" class="PayFo" alt="">
        <span>{{$t("capital.foAmount")}}</span>
      </div>
      <div class="children" v-if="!FotoEos">
        <img src="../../../assets/EOS.png" class="PayEos" alt="">
        <span>{{$t("capital.eosAmount")}}</span>
      </div>
    </div>
    <!--余额-->
    <div class="Balance">
      <span v-if="!FotoEos">{{$t("list.Available_balance")}}:{{BalanceEos | number(4)}}EOS</span>
      <span v-if="FotoEos">{{$t("list.Available_balance")}}:{{BalanceFo | number(4)}}FO</span>
    </div>
    <li class="addBorder">
      <input type="number" width="80%" @input="clearNoNum($event,4)" v-model.number="ExchangeAmount"
             :placeholder="$t('shouye.enterQuantity')"
             class="inputbox" maxlength="14"/>
      <div class="triangle">
        <i class="iconfont icon-jia2" @click="addNum(displayNum)"></i>
        <i class="iconfont icon-iconjian" @click="reduce(displayNum)"></i>
      </div>
    </li>
    <!--箭头-->
    <div class="arrow">
      <img src="../../../assets/jiantou.png" alt="">
    </div>
    <!--预计到账-->
    <div class="Arrival">
      <img src="../../../assets/EOS.png" v-if="FotoEos" class="PayEos" alt="">
      <img src="../../../assets/FO.png" v-if="!FotoEos" class="PayFo" alt="">
      <span v-if="FotoEos">{{$t("shouye.eosExpected")}}</span>
      <span v-if="!FotoEos">{{$t("shouye.foExpected")}}</span>
      ({{$t("capital.actual")}})
    </div>
    <ul class="ArrivalNum">
      <li class="ArrivalNum">
        {{Num | number(4)}}
        <span v-if="FotoEos"> EOS</span>
        <span v-if="!FotoEos"> FO</span>
      </li>
      <!--余额-->
      <div class="Balance">
        <span v-if="FotoEos">{{$t("list.Available_balance")}}:{{BalanceEos | number(4)}}EOS</span>
        <span v-if="!FotoEos">{{$t("list.Available_balance")}}:{{BalanceFo | number(4)}}FO</span>
      </div>
      <li class="proportion">
        <span class="Compared">EOS:FO</span>
        <span class="rate">{{$t("capital.exchangeRate")}}  1:{{proportion}}</span>
      </li>
    </ul>
    <!--确认兑换-->
    <div class="ConfirmExchange">
      <button @click="ConfirmExchange">{{$t("shouye.confirmExchange")}}</button>
    </div>
    <!--图表-->
    <div class="trend">
      <div class="title">{{$t("shouye.trendChart")}} ( 1EOS ≈ {{proportion}}FO )</div>
      <div id="myChart" :style="{width: '100%', height: '200px'}"></div>
      <div class="bottom">{{$t("shouye.DateIsFrom")}}</div>
    </div>
    <!--FO简介-->
    <div class="Introduction">
      <div class="title">{{$t("FoIntroduction.title")}}</div>
      <div class="content">
        <p>{{$t("FoIntroduction.content1")}}</p>
        <p>{{$t("FoIntroduction.content2")}}</p>
        <p>{{$t("FoIntroduction.content3")}}</p>
        <p>{{$t("FoIntroduction.Officialwebsite")}}</p>
      </div>
    </div>

  </div>
</template>

<script>
  import axios from "axios";
  import {httpUrl} from "../../http_url/http_url";
  import header from "../../public/backHeader";
  import loading from "../../public/loading";
  import { mapGetters, mapActions, mapState, mapMutations } from 'vuex';
  export default {
    name: "exchange",
    data() {
      return {
        exchangeType: this.$route.params.toType,
        proportion: 0, /*兑换比例*/
        headerText:this.$route.params.toType == 'FotoEos'? this.$t("capital.foExcEos"):this.$t("capital.eosExcFo"),
        FotoEos:this.$route.params.toType == 'FotoEos'?true:false,
        currencyFo:73,
        currencyEos:16,
        BalanceEos:0,  /*获取指定币种的余额*/
        BalanceFo:0,/*兑币的余额*/
        ExchangeAmount:"", /*兑换数量*/
        displayNum:this.$route.params.toType == 'FotoEos'?1:4, /*默认一位切换*/
        SuccessfulRedemption:false, /*兑换成功*/
        Redemption:false, /*兑换失败*/
        isLoading: false, /*显示请求*/
        price:[], /*价格*/
        time:[],  /*时间*/
      }
    },
    computed:{
      Num(){
        if(this.FotoEos){
          return this.ExchangeAmount / this.proportion;
        }else{
          return this.ExchangeAmount * this.proportion;
        }
      },
      ...mapState("user",["userID"])
    },
    filters: {
      //小数点过滤器 不四舍五入
      number(value, num) {
        var toFixedNum = Number(value).toFixed(num + 1);
        var realVal = toFixedNum.substring(0, toFixedNum.lastIndexOf('.') + num + 1);
        return realVal;
      }
    },
    components:{
      "my-header":header,
      "my-Loading": loading,
    },
    methods: {
      async getProportion() {
       let res = await axios.get(httpUrl.currencyConvertPrice, {
          params: {method:'eosToFo', amount: 1}
        })
        this.proportion = res.data.data;
      },
      drawLine() {
        let _this = this;
        // 基于准备好的dom，初始化echarts实例   白色版本: macarons 黑色版本:dark
        let myChart = this.$echarts.init(document.getElementById('myChart'), "dark");

        // 绘制图表
        myChart.setOption({
          tooltip: {
            trigger: 'axis',
            formatter: function (params, ticket, callback) {
              var htmlStr = '';
              for (var i = 0; i < params.length; i++) {
                var param = params[i];
                var xName = param.name;//x轴的名称
                var seriesName = _this.$t("shouye.foExchange");//图例名称
                var value = param.value;//y轴值
                var color = param.color;//图例颜色
                if (i === 0) {
                  htmlStr += xName + '<br/>';//x轴的名称
                }
                htmlStr += '<div>';
                //为了保证和原来的效果一样，这里自己实现了一个点的效果
                htmlStr += '<span style="margin-right:5px;display:inline-block;width:10px;height:10px;border-radius:5px;background-color:' + color + ';"></span>';

                //圆点后面显示的文本
                htmlStr += seriesName + '：' + value;

                htmlStr += '</div>';
              }
              return htmlStr;
            },
            axisPointer: {
              type: 'cross',
              label: {
                backgroundColor: '#6a7985'
              }
            }
          },
          color: "#719685",
          // backgroundColor:"rgba(0,0,0,0.6)",
          grid: {
            top:"15%",
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          xAxis: [
            {
              type: 'category',
              boundaryGap: false,
              data: _this.time
            }
          ],
          yAxis: [
            {
              type: 'value',
              max: function(value) {
                return value.max + 5;
              },
              min: function(value) {
                return value.min - 5;
              }
            }
          ],
          series: [
            {
              type: 'line',
              stack: _this.$t("shouye.amount"),
              areaStyle: {normal: {}},
              data: _this.price
            }
          ]
        });
      },
      ConfirmExchange(){ /*确认兑换*/
        if(this.token==undefined&&this.token==null){
          this.$router.push({name:"login"});
          return;
        }
        if(this.ExchangeAmount=="" || this.ExchangeAmount==0){
          this.$message({
            message: this.$t("shouye.enterQuantity"),
            type: 'warning'
          });
          return;
        }
        if(this.FotoEos&&this.ExchangeAmount<1){
          this.$message({
            message: this.$t("shouye.AmountCan"),
            type: 'warning'
          });
          return;
        }
        if(Number(this.ExchangeAmount)>Number(this.BalanceEos)&&!this.FotoEos){
          this.$message({
            message: this.$t("shouye.insufBalance"),
            type: 'warning'
          });
          return;
        }
        if(Number(this.ExchangeAmount)>Number(this.BalanceFo)&&this.FotoEos){
          this.$message({
            message: this.$t("shouye.insufBalance"),
            type: 'warning'
          });
          return;
        }
        this.$ajax.post(this.httpUrl.currencyConvert,{
          method:this.FotoEos?'foToEos':'eosToFo',
          amount:this.ExchangeAmount
        },{
          headers:{"Authorization":"Bearer "+this.token}
        }).then(res=>{
          if(res.data.status.code==200){
            this.getCurrencyBalance(16); /*获取币种eos余额*/
            this.getCurrencyBalance(73); /*获取币种fo余额*/
            this.SuccessfulRedemption  = true;
            setTimeout(()=>{
              this.SuccessfulRedemption = false;
            },1500)
            this.ExchangeAmount = "";
          }else{
            this.Redemption  = true;
            setTimeout(()=>{
              this.Redemption = false;
            },1500)
          }
        },err=>{
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
        // if(Number(this.ExchangeAmount)>Number(this.CurrencyList.dec_balance)){ /*输入大于库存量就等于库存量*/
        //   this.$message({
        //     message: this.$t("taocoin.AmountNotGreater"),
        //     type: 'warning'
        //   });
        //   this.ExchangeAmount = this.CurrencyList.dec_balance;
        // }
      },
      ///增加
      addNum(num) {
        let Num = this.ExchangeAmount - 0;
        if(this.FotoEos){
          Num+=100;
        }else{
          Num+=1;
        }
        this.ExchangeAmount = Num;
        if(Number(this.ExchangeAmount)>Number(this.BalanceEos)&&!this.FotoEos){
          this.$message({
            message: this.$t("shouye.insufBalance"),
            type: 'warning'
          });
          this.ExchangeAmount = this.BalanceEos;
        }
        if(Number(this.ExchangeAmount)>Number(this.BalanceFo)&&this.FotoEos){
          this.$message({
            message: this.$t("shouye.insufBalance"),
            type: 'warning'
          });
          this.ExchangeAmount = this.BalanceFo;
        }
      }, ///减少   限价   卖出价格
      reduce(num) {
        let Num = this.ExchangeAmount - 0;
        if(this.FotoEos){
          Num-=100;
        }else{
          Num-=1;
        }
        this.ExchangeAmount = Num;
        if(Number(this.ExchangeAmount)<0){ /*输入大于库存量就等于库存量*/
          this.ExchangeAmount = 0;
        }
      },
      getCurrencyBalance(id){
        /*获取fo指定币种余额*/
        this.$ajax.get(this.httpUrl.currencyBalance,{
          params:{currency_id:id},
          headers:{"Authorization":"Bearer "+this.token}
        }).then(res=>{
          if(id==16){
            this.BalanceEos = res.data.data.balance;
          }
          if(id==73){
            this.BalanceFo = res.data.data.balance;
          }
        },err=>{
          console.log(err)
        })

      }
    },
    mounted() {
      let timezone = jstz.determine();
      this.getProportion();  /*获取兑换比例*/
      this.getCurrencyBalance(16); /*获取币种eos余额*/
      this.getCurrencyBalance(73); /*获取币种fo余额*/
      //兑换日志添加
      this.$ajax.post(this.httpUrl.uploadDropLog, {
        type: 7,
        invite_code: this.userID
      }).then(function(res) {
        return true;
      })
      /*获取k线链接*/
      this.$ajax.get(this.httpUrl.currencyConvertKLine,{
        params:{timezone:timezone.name()}
      }).then(res=>{
        this.price = res.data.data.p.reverse();
        this.time = res.data.data.t.reverse();
        this.drawLine();/*初始化图表*/
      },err=>{
        console.log(err);
      })
      /*请求显示loading*/
      this.$ajax.interceptors.request.use(config => {
        this.isLoading = true;
        return config
      }, function (err) {
        return Promise.reject(err)
      });
      this.$ajax.interceptors.response.use(response => {
        this.isLoading = false;
        return response
      }, error => {
        this.isLoading = false;
        return Promise.reject(error);
      });
    }
  }
</script>

<style lang="scss" scoped>
  /*付款数量*/
  .PaymentAmount {
    width: 100%;
    height: .4rem;
    background: #1C1E3D 100%;
    margin-top: .1rem;
    .children {
      height: .4rem;
      display: flex;
      align-items: center;
      color: #F1F2FA;
      .PayFo {
        width: .45rem;
        height: .28rem;
        margin-left: .15rem;
        margin-right: .05rem;
      }
      .PayEos {
        width: .35rem;
        height: .35rem;
        margin-left: .15rem;
        margin-right: .05rem;
      }
    }
  }

  /*余额*/
  .Balance {
    text-align: right;
    color: #6F74A6;
    box-sizing: border-box;
    padding-right: .1rem;
    line-height: .3rem;
  }
  .addBorder {
    width: 90%;
    margin: 0 auto;
    display: flex;
    height: .3rem;
    justify-items: center;
    align-items: center;
    border: 1px solid #2c326e;
    background: #1c1e3d;
    border-radius: 3px;
    padding-top: 0.05rem;
    padding-bottom: 0.05rem;
    :-moz-placeholder { /* Mozilla Firefox 4 to 18 */
      color: #6F74A6;
    }

    ::-moz-placeholder { /* Mozilla Firefox 19+ */
      color: #6F74A6;
    }

    input:-ms-input-placeholder {
      color: #6F74A6;
    }

    input::-webkit-input-placeholder {
      color: #6F74A6;
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
      .iconfont {
        margin-right: .1rem;
        color: #6F74A6;
      }
    }
  }

  /*箭头*/
  .arrow {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    img {
      display: block;
      width: .25rem;
      height: .33rem;
      margin: .25rem 0 .1rem 0;
    }
  }
  /*预计到账*/
  .Arrival {
    width: 100%;
    height: .6rem;
    display: flex;
    align-items: center;
    box-sizing: border-box;
    color: #F1F2FA;
    .PayFo {
      width: .45rem;
      height: .28rem;
      margin-left: .15rem;
      margin-right: .05rem;
    }
    .PayEos {
      width: .35rem;
      height: .35rem;
      margin-left: .15rem;
      margin-right: .05rem;
    }
    span {
      font-size: .14rem;
      margin-right: .04rem;
    }
  }

  .ArrivalNum {
    width: 90%;
    margin: 0 auto;
    li {
      width: 100%;
      height: .3rem;
      line-height: .3rem;
    }
    .ArrivalNum {
      color: #fff;
      font-size: .14rem;
      border-bottom: .01rem solid #6F74A6;
    }
    .proportion {
      color: #FF7E00;
      font-size: .13rem;
      span {
        margin-right: .1rem;
      }
    }
  }

  .ConfirmExchange {
    width: 90%;
    height: .4rem;
    margin: .1rem auto;
    margin-top: .3rem;
    margin-bottom: .2rem;
    button {
      width: 100%;
      height: 100%;
      text-align: center;
      line-height: .4rem;
      background: #25CBC5;
      color: #fff;
      border: none;
      border-radius: .04rem;
    }
  }
  .SuccessfulRedemption{
    color: #00C3B6;
  }
  .Redemption{
    color:#EF4E52;
  }
  .SuccessfulRedemption,.Redemption{
    width: 90%;
    height: .5rem;
    line-height: .5rem;
    background:rgba(0,0,0,0.9);
    border: .01rem solid #2c326e;
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    left: 5%;
    top: 50%;
    margin-top: -.25rem;
    z-index: 66;
  }
  /*fo兑换走势图*/
  .trend {
    width: 100%;
    box-sizing: border-box;
    padding: 0 .15rem;
    overflow: auto;
    background: #171933;
    .title{
      line-height: .35rem;
      font-size: .14rem;
      color: #fff;
    }
    .bottom{
      height: .4rem;
      line-height: .4rem;
      color: #fff;
    }
    #myChart{
      div{
        width: 100% !important;
      }
    }
  }
  .Introduction{
    box-sizing: border-box;
    padding: 0 .15rem;
    color: #fff;
    .title{
      line-height: .3rem;
      margin-top: .1rem;
    }
    p{
      line-height: .2rem;
      margin-bottom: .1rem;
    }
  }
</style>
