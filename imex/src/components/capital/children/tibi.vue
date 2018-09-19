<template>
  <div id="tibi">
    <div v-show="loadingIsShow">
      <loading></loading>
    </div>
    <!--充币头部-->
    <my-header :text="header_title"></my-header>
    <!--内容部分-->
    <div class="box_content">
      <ul class="shuru">
        <li>
          <p>{{$t("capital.Available")}}</p>
          <p>
            <span>{{available | number(currentCurrency.displayNum)}}</span>
            <span>{{currencyName}}</span>
          </p>
        </li>
        <li>
          <p>{{$t("capital.Limited")}}</p>
          <p>
            <span>{{moneyList.limit_max_count | number(moneyList.displayNum)}}</span>
            <span>{{currencyName}}</span>
          </p>
        </li>
        <li>
          <p>{{$t("capital.Withdrawaddress")}}</p>
          <input type="text" v-model="toAddress" :placeholder="$t('capital.Enterlongpress')"/>
        </li>
        <li v-if="this.currentCurrency.isLabel==1">
          <p>{{$t("capital.Addresslabel")}}</p>
          <input type="text" v-model="Addresslabel"/>
        </li>
        <li class="cause" v-show="currentCurrency.isLabel==1">
          <span>({{$t("capital.Fillingcarefully")}})</span>
          <!--填写错误可能导致财产损失，请仔细核对-->
          <span class="What">{{$t("capital.whatisit")}}</span>
          <!-- 这是什么？-->
          <p>{{$t("capital.Ifyouareaskedtofillinadditionalinformation")}}</p>
          <!--如果您被要求填写附加信息，请在此次填写，反正不需要填写-->
        </li>
        <li>
          <p>{{$t("otc.Quantity")}}</p>
          <input type="number" v-model="balance" :placeholder="$t('capital.Enteramount')"/>
        </li>
        <li>
          <p>{{$t("capital.Fees")}}</p>
          <input type="number" :disabled="currentCurrency.propFixed==1" :placeholder="$t('capital.Enterfees')"
                 v-model="propCostNum"/>
          <span>{{currencyName}}</span>
        </li>
        <li>
          <p>{{$t("capital.Arrivalamount")}}</p>
          <p>
            <span v-show="product!=''">{{product}}</span>
            <span v-show="product==''">0.00</span>
            <span>{{currencyName}}</span>
          </p>
        </li>
      </ul>
      <div class="submit">
        <button @click="tibi" :disabled="!toAddress||!balance">{{$t("capital.Withdraw")}}</button>
      </div>
      <!--展示内容-->
      <!--右侧提示部分-->
      <div class="tibi_content_tishi">
        <ul class="wenxin-tishi">
          <li>• {{$t("capital.Mnimumamount")}}: {{moneyList.limit_min_count |
            number(moneyList.displayNum)}}{{$route.query.curName}}。
          </li>
          <li>• {{$t("capital.Priceanquan")}}</li>
          <li>• {{$t("capital.Querenanquan")}}</li>
          <li>• {{$t("capital.tbTime")}}</li>
        </ul>
      </div>
    </div>
    <!--安全验证开始-->
    <div class="men_ban" v-show="jifenIsShow"></div>
    <div class="jifen" v-show="jifenIsShow">
      <div class="jifen_header">
        <span>{{$t("capital.Securityverification")}}</span>
        <i class="iconfont icon-cuowu" @click="cancel"></i>
      </div>
      <!--内容部分-->
      <div class="jifen_content">
        <!--手机-->
        <div class="phone" v-show="userList.mobile_status==2">
          <p class="name black">{{userList.mobile}}</p>
          <p class="input">
            <input type="text" v-model="phoneCode" :placeholder="$t('login.EnterCellphoneverificationcode')"/>
            <span class="white" v-show="phoneIsShow" @click="getPhoneCode()">{{$t("login.GetCode")}}</span>
            <span v-show="!phoneIsShow">{{phoneTime}}{{$t("login.secresend")}}</span>
          </p>
          <p class="error">
            <span v-show="phoneCodeError">{{phoneCodeErrorText}}</span>
          </p>
        </div>
        <div class="phone" v-show="userList.email_status==2">
          <p class="title name black">{{userList.email}}</p>
          <p class="input">
            <input type="text" v-model="emailCode" :placeholder="$t('login.PleaseCode')"/>
            <span class="white" v-show="emailIsShow" @click="getEmailCode()">{{$t("login.GetCode")}}</span>
            <span v-show="!emailIsShow">{{emailTime}}{{$t("login.secresend")}}</span>
          </p>
          <p class="error">
            <span v-show="emailCodeError">{{emailCodeErrorText}}</span>
          </p>
        </div>
        <div class="phone">
          <p class="input1" v-show="userList.google_status==2">
            <input type="text" v-model="googleCode" :placeholder="$t('login.EnterGoogleVerifiCode')"/>
          </p>
          <p class="error">
            <span v-show="googleCodeError">{{googleCodeErrorText}}</span>
          </p>
        </div>
      </div>
      <!--确认按钮-->
      <div class="confirm">
        <p @click="cancel">{{$t("userCenter.Cancel")}}</p>
        <p @click="confirm()">{{$t("userCenter.determine")}}</p>
      </div>
    </div>
    <!--安全验证结束-->

  </div>
</template>

<script>
  import header from "../../public/backHeader.vue";
  import {Message} from 'element-ui';
  import $ from "jquery";
  import loading from "../../public/loading"

  export default {
    data() {
      return {
        popupVisible: false,
        currencyName: this.$route.query.curName,
        currencyID: this.$route.params.curId,
        /*当前币的ID*/
        moneyList: {},
        /*获取提币的信息--可用--限额--提升额度*/
        header_title: this.$t("WalletManagement.Withdraw") +  this.$route.query.curName,
        /*币种列表*/
        currentCurrency: {},
        /*当前币种信息*/
        available: "",
        /*可用*/
        jifenIsShow: false,
        /*安全验证提示弹框*/
        emailCodeError: false,
        emailCodeErrorText: this.$t("login.Confirmationerror"),
        /*短信验证码错误*/
        phoneCodeError: false,
        phoneCodeErrorText: this.$t("login.Confirmationerror"),
        /*手机验证码错误*/
        googleCodeError: false,
        googleCodeErrorText: this.$t("login.Confirmationerror"),
        /*谷歌验证码错误*/
        phoneTime: 0,
        /*手机倒计时*/
        emailTime: 0,
        /*邮箱倒计时*/
        phoneIsShow: true,
        /*手机验证码显示隐藏*/
        emailIsShow: true,
        /*邮箱验证吗显示隐藏*/
        phoneCode: "",
        /*手机验证码*/
        emailCode: "",
        /*邮箱验证码*/
        googleCode: "",
        /*谷歌验证码*/
        userList: {},
        /*用户信息*/
        toAddress: "",
        /*提币地址*/
        balance: "",
        /*提币数量*/
        loadingIsShow: false,
        /*loading是否显示隐藏*/
        Addresslabel: "",
        /*地址标签*/
      }
    },
    components: {
      "my-header": header,
      "loading": loading
    },
    filters: {
      //小数点过滤器 不四舍五入
      number(value, num) {
        var toFixedNum = Number(value).toFixed(num + 1);
        var realVal = toFixedNum.substring(0, toFixedNum.lastIndexOf('.') + num + 1);
        return realVal;
      }
    },
    computed: {
      // 计算属性的  计算手续费与数量的值
      product: function () {
        var num = parseFloat(this.balance) - parseFloat(this.propCostNum);
        if (num <= 0) {
          return "";
        } else if (isNaN(parseInt(num))) {
          return "";
        } else {
          return num.toFixed(this.moneyList.displayNum);
        }
      },
      propCostNum() {
        if (isNaN(this.moneyList.fee)) {
          this.moneyList.fee = 0.00;
          return this.moneyList.fee;
        } else {
          this.moneyList.fee = Number(this.moneyList.fee).toFixed(this.moneyList.displayNum);
          return this.moneyList.fee;
        }
      },
    },
    mounted() {
      let _this = this;
      /*获取币种列表*/
      this.$ajax.get(this.httpUrl.currencyWallet, {
        headers: {
          "Authorization": "Bearer " + _this.token
        }
      }).then(res=>{
        let arr = res.data.data;
        for (let i=0;i<arr.length;i++){
          if(this.currencyID == arr[i].id){
            this.currentCurrency = arr[i];
          }
        }
      },err=>{
        console.log(err)
      })
      /*获取用户信息*/
      this.$ajax.get(this.httpUrl.userInfo, {
        headers: {
          "Authorization": "Bearer " + _this.token
        }
      }).then(function (res) {
        _this.userList = res.data.data;
      }, function (err) {
        console.log(err)
      })
      /*获取用户指定币种的余额*/
      _this.$ajax.get(_this.httpUrl.currencyBalance, {
        headers: {
          "Authorization": "Bearer " + _this.token
        },
        params: {
          currency_id: _this.currencyID
        }
      }).then(function (res) {
        if (res.data.data.length == 0) {
          _this.available = 0.0000;
          _this.moneyList["fee"] = 0.0000;
          _this.moneyList["limit_max_count"] = 0.0000;
          _this.moneyList["limit_min_count"] = 0.0000;
          _this.moneyList["min_deposit_count"] = 0.0000;
          _this.moneyList["displayNum"] = 5;
        } else {
          _this.available = res.data.data.balance;
          /*获取到的可用余额*/
          _this.moneyList = res.data.data.currency;
        }
      }, function (err) {
        console.log(err)
      })
    },
    methods: {
      tibi() { /*提币*/
        let reg = /^[A-Za-z0-9]{12}$/;
        let _this = this;
        if (_this.balance == 0) {
          return false;
        }
        if(this.currencyName=='EOS'&&!reg.test(this.toAddress) || this.currencyName=='FO'&&!reg.test(this.toAddress)){
          _this.$message({
            message: _this.$t("capital.Currencyaddresserror"),
            type: 'error'
          });
          return false;
        }
        if (!/^\+?[1-9][0-9]*$/.test(this.balance) && this.currencyID == 11) {
          _this.$message({
            message: _this.$t("capital.Donotsupport"),
            type: 'error'
          });
          return false;
        }
        if (_this.available == 0) {
          _this.$message({
            message: _this.$t("list.Available_balance") + "0",
            type: 'error'
          });
          return false;
        }
        if (this.balance > parseFloat(this.moneyList.limit_max_count)) {
          _this.$message({
            message: _this.$t("capital.Tafmcnetl"),
            type: 'error'
          });
          return false;
        }
        if (this.balance < parseFloat(this.moneyList.limit_min_count)) {
          _this.$message({
            message: _this.$t("capital.Taotcsnbltmaom"),
            type: 'error'
          });
          return false;
        }
        _this.jifenIsShow = true;
        /*弹框显示出来*/
      },
      getPhoneCode() { /*获取手机验证码子*/
        let _this = this;
        this.$ajax.post(this.httpUrl.Money_code, {
          type: 7,
          receiver_type: 0
        }, {
          headers: {
            "Authorization": "Bearer " + _this.token
          }
        }).then(function (res) {
          if (res.data.status.code == 200) {
            _this.phoneTime = 60;
            _this.phoneIsShow = false;
            clearInterval(getTime);
            /*先清除倒计时*/
            var getTime = setInterval(() => {
              _this.phoneTime--;
              if (_this.phoneTime <= 0) {
                _this.phoneIsShow = true;
              }
            }, 1000)
          }
          if (res.data.status.code == -200) {
            _this.$message({
              message: res.data.status.message,
              type: 'error'
            });
          }
        }, function (err) {
          console.log(err)
        })

      },
      getEmailCode() { /*获取邮箱验证码子*/
        let _this = this;
        this.loadingIsShow = true;
        this.$ajax.post(this.httpUrl.Money_code, {
          type: 7,
          receiver_type: 1
        }, {
          headers: {
            "Authorization": "Bearer " + _this.token
          }
        }).then(function (res) {
          if (res.data.status.code == 200) {
            _this.emailTime = 60;
            _this.emailIsShow = false;
            clearInterval(getTime);
            /*先清除倒计时*/
            var getTime = setInterval(() => {
              _this.emailTime--;
              if (_this.emailTime <= 0) {
                _this.emailIsShow = true;
              }
            }, 1000)
          }
          _this.loadingIsShow = false;
        }, function (err) {
          console.log(err)
        })

      },
      cancel() { /*取消*/
        let _this = this;
        this.jifenIsShow = false;
        _this.phoneCode = "";
        _this.emailCode = "";
        _this.googleCode = "";
        _this.emailIsShow = true;
        /*取消邮箱倒计时*/
        _this.emailTime = 0;
        /*倒计时清0*/
        _this.phoneIsShow = true;
        /*取消手机倒计时*/
        _this.phoneTime = 0;
        /*倒计时清0*/
      },
      confirm() { /*确认按钮*/
        let _this = this;
        if (_this.phoneCode == "" && _this.userList.mobile_status == 2) {
          _this.phoneCodeErrorText = _this.$t("login.EnterCellphoneverificationcode");
          _this.phoneCodeError = true;
          setTimeout(function () {
            _this.phoneCodeError = false;
            _this.phoneCodeErrorText = _this.$t("login.Confirmationerror")
          }, 1000)
          return false;
        }
        if (_this.emailCode == "" && _this.userList.email_status == 2) {
          _this.emailCodeErrorText = _this.$t("login.EnterCellphoneverificationcode");
          _this.emailCodeError = true;
          setTimeout(function () {
            _this.emailCodeError = false;
            _this.emailCodeErrorText = _this.$t("login.Confirmationerror")
          }, 1000)
          return false;
        }
        if (_this.googleCode == "" && _this.userList.google_status == 2) {
          _this.googleCodeErrorText = _this.$t("login.EnterCellphoneverificationcode");
          _this.googleCodeError = true;
          setTimeout(function () {
            _this.googleCodeError = false;
            _this.googleCodeErrorText = _this.$t("login.Confirmationerror")
          }, 1000)
          return false;
        }
        var obj = {
          currency_id: _this.currencyID,
          address: _this.toAddress,
          amount: _this.balance,
          google_code: _this.googleCode,
          mobile_code: _this.phoneCode,
          email_code: _this.emailCode,
          tag: ""
        }
        if (this.currentCurrency.isLabel == 1) {
          obj.tag = this.Addresslabel;
        }
        this.$ajax.post(this.httpUrl.sendForm, obj, {
          headers: {
            "Authorization": "Bearer " + _this.token
          }
        }).then(function (res) {
          if (res.data.status.code == 200) { /*添加地址成功跳转地址列表*/
            _this.$message({
              message: _this.$t("bbjy.Successful"),
              type: 'success'
            });
            _this.$router.push({name:"AssetDetails",params:{curId:_this.currencyID}});
            _this.jifenIsShow = false;
          }
          if (res.data.status.message == "mobile_error") {
            _this.phoneCodeError = true;
            setTimeout(function () {
              _this.phoneCodeError = false;
            }, 1000)
          }
          if (res.data.status.message == "Email_error") {
            _this.emailCodeError = true;
            setTimeout(function () {
              _this.emailCodeError = false;
            }, 1000)
          }
          if (res.data.status.message == "google_error") {
            _this.googleCodeError = true;
            setTimeout(function () {
              _this.googleCodeError = false;
            }, 1000)
          }
          if (res.data.status.code == -200) {
            _this.$message({
              message: res.data.status.message,
              type: 'error'
            });
          }
        }, function (err) {
          console.log(err)
        })
      },
    }
  }
</script>
<style lang="scss">
  #tibi {
    .mint-popup {
      width: 100%;
      height: 100%;
      background: #141738;
      overflow-y: auto;
    }
  }

  .el-message {
    /*width: 2.5rem;*/
    min-width: 2.5rem;
  }

  .el-message--success {
    background-color: #fff;
    border-color: #e1f3d8;
    border-top: 2px solid #22d9b8;
  }

  .el-message .el-icon-success {
    font-size: .15rem;
    color: #22d9b8;
  }

  .el-message--success .el-message__content {
    color: #000;
  }
</style>
<style lang="scss" scoped>
  $back_color: #141738;
  $submit_color: #373959;
  /*登录线条*/

  $submit_borderColor: 1px solid #9fa0af;
  /*按钮边框颜色*/

  $header_bg: #141738;
  $border_bottom: 1px solid #1b1d3e;
  .cause {
    position: relative;
    span {
      color: #f56c6c;
    }
    .What {
      color: #ababe4;
      cursor: pointer;
    }
    .What:hover + p {
      display: block;
    }
    p {
      position: absolute;
      right: 0px;
      top: -43px;
      z-index: 10;
      box-sizing: border-box;
      padding: 5px;
      text-align: left;
      background: #2c377c;
      border-radius: 4px;
      color: #fff;
      display: none;
    }
  }

  #tibi {
    width: 100%;
    min-height: 100%;
    background: #141738;
    color: #fff;
    .box_content {
      width: 100%;
      height: 82%;
      background: $back_color;
      margin-top: .1rem;
    }
  }

  .tab_currency {
    /*切换币种*/
    width: 100%;
    height: .36rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    box-sizing: border-box;
    padding: 0 .15rem;
    background: $back_color;
    border-top: 0.01rem solid #111627;
  }

  /*币种列表选项*/

  .currencyList {
    width: 100%;
    li {
      width: 100%;
      height: .37rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-bottom: $border_bottom;
      color: #fff;
      box-sizing: border-box;
      padding: 0 .1rem;
      .iconfont {
        display: none;
      }
    }
    li:nth-of-type(1) {
      .iconfont {
        display: block;
      }
    }
  }

  /*币种选择头部*/

  .register_header {
    width: 100%;
    height: .5rem;
    line-height: .5rem;
    position: relative;
    color: #fff;
    background: rgb(20, 23, 56);
    border-bottom: .1rem solid #121528;
    .back {
      margin-left: .15rem;
    }
    .register_type {
      position: absolute;
      top: 0;
      left: 20%;
      width: 60%;
      text-align: center;
      font-size: .15rem;
      font-weight: 600;
    }
  }

  /*输入的内容*/

  .shuru {
    width: 100%;
    li {
      width: 100%;
      height: .4rem;
      display: flex;
      align-items: center;
      border-bottom: $border_bottom;
      display: flex;
      justify-content: space-between;
      box-sizing: border-box;
      padding: 0 .1rem;
      input {
        width: 80%;
        height: 80%;
        border: none;
        background: none;
        outline: none;
        text-align: right;
      }
      input:-ms-input-placeholder {
        color: #696fc3;
      }
      input::-webkit-input-placeholder {
        color: #696FC3;
      }
    }
  }

  /*提交*/

  .submit {
    width: 2.7rem;
    height: .38rem;
    margin: .2rem auto;
    button {
      width: 100%;
      height: .38rem;
      border: $submit_borderColor;
      background: $submit_color;
      color: #fff;
      outline: none;
    }
  }

  /*提币提示内容*/

  .tibi_content_tishi {
    width: 100%;
    box-sizing: border-box;
    padding: 0 .1rem;
    ul {
      width: 100%;
      li {
        width: 100%;
        color: #9191c2;
        line-height: .2rem;
      }
    }
  }

  /*蒙版*/

  .men_ban {
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.6);
    position: fixed;
    left: 0;
    top: 0;
    z-index: 80;
  }

  /*安全验证*/

  .jifen {
    position: fixed;
    top: 20%;
    left: 5%;
    width: 90%;
    background: #32355E;
    color: #fff;
    z-index: 100;
    .jifen_header {
      width: 100%;
      height: .4rem;
      line-height: .4rem;
      display: flex;
      justify-content: space-between;
      box-sizing: border-box;
      padding: 0 .1rem;
      .iconfont {
        font-size: .14rem;
      }
      border-bottom: 1px solid #232555;
    }
    /*确认按钮*/
    .confirm {
      width: 100%;
      height: .4rem;
      line-height: .4rem;
      display: flex;
      border-top: 1px solid #232555;
      p {
        width: 50%;
        text-align: center;
      }
      p:nth-of-type(1) {
        border-right: 1px solid #232555;
      }
    }
    /*积分内容*/
    .jifen_content {
      width: 100%;
      box-sizing: border-box;
      padding: 0 .1rem;
      .title {
        margin-top: .05rem !important;
      }
      .black {
        width: 100%;
        height: .35rem;
        line-height: .35rem;
        background: #262746;
        box-sizing: border-box;
        padding-left: .1rem;
        border-radius: .02rem;
        margin-top: .15rem;
      }
      .input {
        width: 100%;
        height: .3rem;
        line-height: .3rem;
        border: 1px solid #51569a;
        border-radius: .02rem;
        display: flex;
        box-sizing: border-box;
        justify-content: space-between;
        background: #262746;
        margin-top: .15rem;
        input {
          width: 65%;
          margin-left: .05rem;
          border: none;
          background: none;
          outline: none;
          color: #fff;
        }
        input {
          border-right: 1px solid #51569a;
        }
        span {
          display: inline-block;
          width: 35%;
          box-sizing: border-box;
          text-align: center;
        }
        .white {
          color: #878de4;
        }
      }
      .input1 {
        width: 100%;
        height: .3rem;
        line-height: .3rem;
        border: 1px solid #51569a;
        border-radius: .02rem;
        background: #262746;
        input {
          width: 90%;
          margin-left: .05rem;
          border: none;
          background: none;
          outline: none;
          color: #fff;
        }
        input::-webkit-input-placeholder {
          color: #fff;
          font-size: .12rem;
        }
      }
      .error {
        width: 100%;
        height: .2rem;
        line-height: .2rem;
        color: #BB2B21;
      }
      .input input::-webkit-input-placeholder {
        color: #fff;
        font-size: .12rem;
      }
      .userName {
        width: 100%;
        padding-bottom: .1rem;
        border-bottom: 1px solid #232555;
      }
    }
  }
</style>
