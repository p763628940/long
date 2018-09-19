<template>
  <div id="realName">
    <div class="header_box">
      <div class="register_header">
        <p class="back" @click="$router.push('/index/userCenter')">
          <i class="iconfont icon-zuojiantou"></i>
          <span>{{$t("userCenter.IdentifyCer")}}</span>
        </p>
      </div>
    </div>
    <!--<div class="oHeight"></div>-->
    <!--国内实名认证-->
    <div class="realName">
      <div class="oleft">
        <p class="realNameTitle">{{$t("userCenter.IdentifyCer")}}</p>
        <p class="smallTitle">{{$t("userCenter.MakeSureRealName")}}</p>
      </div>
    </div>
    <!--国内实名认证内容-->
    <div class="cidentifyBox">
      <ul class="cidentifyContent">
        <li class="itemContent itemPosition">
          <span class="itemLabel">{{$t("userCenter.Country")}}</span>
          <p class="tab_Country_title" @click="selectCountry">
            <span>{{countryName}}</span>
            <img src="../../../assets/sanjiao.png" class="sanjiaoSize" :class="{'iconRote':CountryIsShow}"/>
          </p>
        </li>
        <li class="itemContent">
          <span class="itemLabel">{{$t("login.Names")}}</span>
          <input type="text" :placeholder="$t('userCenter.EnterRealName')" v-model="userName">
        </li>
        <li class="itemContent">
          <span class="itemLabel">{{$t("userCenter.IDnumber")}}</span>
          <input type="text" :placeholder="$t('userCenter.EnterIDCardNum')" v-model="IdentityID">
        </li>
      </ul>
    </div>
    <!--选择国籍-->
    <mt-popup v-model="choseCountries" position="right">
      <div class="tabHeader">
        <div class="search">
          <p>
            <i class="iconfont icon-sousuo1"></i>
            <input type="text" class="pleaseChoose" v-model="searchText" @input="searchCountry(searchText)"
                   :placeholder="$t('userCenter.ChooseCountryRegion')">
          </p>
          <p @click="choseCountries=false">{{$t("userCenter.Cancel")}}</p>
        </div>
      </div>
      <!--选国家-->
      <ul class="countriesList">
        <li v-for="(item,key) in countryList" :key="key" class="countryItem" @click="activeCountry(item)"
            v-if="item.isIf">
          <span>{{item.name}}</span>
          <span>{{item.mobile_prefix}}</span>
        </li>
      </ul>
    </mt-popup>
    <!--错误提示信息-->
    <div class="errorTips">{{errorTip}}</div>
    <!--<div class="foreignCert" v-if="isBroadRealName">请填写政府颁发的有效身份证件，包括国际护照或国家身份证件建议填写国际护照</div>-->
    <!--提交按钮-->
    <div class="buttonWrap">
      <button class="buttonStyle" @click="submitInfo()">{{$t("login.Submit1")}}</button>
    </div>
    <!--实名信息成功弹框-->
    <div class="men_ban" v-if="isShowAdv"></div>
    <div class="dialogue" v-if="isShowAdv">
      <div class="successTitle">{{$t("userCenter.SubmittedSuccess")}}</div>
      <div class="successContent">
        <div class="successItem">
          <span class="dianhao">●</span>
          <span class="realInfo">{{$t("userCenter.Submitted1")}}</span>
        </div>
        <div class="successItem">
          <span class="dianhao">●</span>
          <span class="realInfo">{{$t("userCenter.Submitted2")}}</span>
        </div>
        <div class="successItem">
          <span class="dianhao">●</span>
          <span class="realInfo">{{$t("userCenter.Submitted3")}}</span>
        </div>
      </div>
      <div class="advButton" @click="openAdvance(isBroadRealName)">{{$t("userCenter.StartAdvCert")}}</div>
    </div>
  </div>
</template>

<script>
  import axios from "axios"
  import {httpUrl} from "../../http_url/http_url"
  import header from "../../public/header"
  import $ from "jquery"
  import {mapState,mapMutations} from "vuex";

  export default {
    data() {
      return {
        countryList: [],//国籍列表
        /*获取国家列表*/
        CountryIsShow: false,
        /*错误提示*/
        errorTip: '',
        /*后台获取身份证号*/
        cardValue: '1234',
        /*提交成功提示显示不显示*/
        isShowAdv: false,
        /*国内外实名认证显示标识*/
        isBroadRealName: false,
        /*选择国籍*/
        choseCountries: false,
        CountryOfCitizenship: "", /*选择国家ID*/
        userName: "", /*用户名称*/
        IdentityID: "", /*用户身份证号*/
        country: "", /*选择国家*/
        countryName: "", /*国家名称*/
        searchText: "", /*搜索内容*/
      }
    },
    methods: {
      ...mapMutations('user',["setUserInfo"]),
      selectCountry(){ /*选择国籍*/
        if(this.userInfo.mobile_status==2)return;
        this.choseCountries = true;
      },
      searchCountry(val) {
        for (let i = 0; i < this.countryList.length; i++) {
          if (this.countryList[i].name.indexOf(val) == -1) {
            this.countryList[i].isIf = false;
          } else {
            this.countryList[i].isIf = true;
          }
        }
      },
      submitInfo() {
        if (this.userName == "") {
          this.errorTip = this.$t("userCenter.NameNotEmp");
          setTimeout(() => {
            this.errorTip = "";
          }, 1500);
          return false;
        }else if(!/^[A-Za-z\u4e00-\u9fa5]+$/gi.test(this.userName)){
          this.errorTip = this.$t("userCenter.EnterCorrectFormat");
          setTimeout(() => {
            this.errorTip = "";
          }, 1500);
          return false;
        }else if (this.IdentityID == "") {
          this.errorTip = this.$t("userCenter.IDCardNotEmp");
          setTimeout(() => {
            this.errorTip = "";
          }, 1500);
          return false;
        }else if(!/^[0-9a-zA-Z]*$/g.test(this.IdentityID)){
          this.errorTip = this.$t("userCenter.EnterCorrectIDCard");
          setTimeout(() => {
            this.errorTip = "";
          }, 1500);
          return false;
        }else{
          this.$ajax.post(this.httpUrl.setIdcard, {
            idCard: this.IdentityID,
            trueName: this.userName,
            country_id: this.CountryOfCitizenship
          }, {
            headers: {
              "Authorization": "Bearer " + this.token
            }
          }).then(res => {
            if (res.data.status.code == 200) {
              this.userInfo.country_id = this.CountryOfCitizenship;
              this.userInfo.trueName = this.userName;
              this.userInfo.idCard = this.IdentityID;
              this.userInfo.countryInfo = [this.country];
              let userInfo = this.userInfo;
              this.setUserInfo({userInfo});
              this.isShowAdv = true;
            }
            ;
          }, err => {
            console.log(err);
          })
        }
      },
      openAdvance(isBroadRealName) {
        this.$router.push({
          name: 'senior',
          params: {broad: isBroadRealName}
        })
      },
      activeCountry(item) { /*选择国籍*/
        this.countryName = item.name;
        this.CountryOfCitizenship = item.id;
        this.choseCountries = false;
        this.country = item;
      }
    },
    computed: {
      ...mapState('user', ['lang'])
    },
    mounted() {
      var _this = this;
      /*获取国家列表*/
      this.$ajax.get(this.httpUrl.country, {
        params: {lang: this.lang}
      }).then(res => {
        this.countryList = res.data.data;
        for (let i = 0; i < this.countryList.length; i++) {
          this.countryList[i].isIf = true;
        }
        this.CountryOfCitizenship = this.userInfo.country_id;
        this.userName = this.userInfo.trueName;
        this.IdentityID = this.userInfo.idCard;
        this.country = this.userInfo.countryInfo[0];
        this.countryName = this.userInfo.countryInfo[0].name;
      }, function (err) {
        console.log(err)
      })

    }
  }
</script>
<style lang="scss">
  #realName .mint-popup {
    background: #141738;
  }

  #realName .mint-popup-right {
    width: 100%;
    height: 100%;
    background: #141738;
    overflow-y: auto;
  }

  #realName {
    .el-form-item__label {
      width: 0.75rem;
      text-align: left;
      color: #F1F2FA;
      font-size: 0.14rem;
      padding: 0rem;
      margin-bottom: 0.1rem;
      border-right: 0.01rem solid #6F74A6;
      display: flex;
      align-items: center;
    }
    .el-input {
      background: none;
    }
    .el-input__inner {
      background-color: #111627;
      border: none;
      color: #F1F2FA;
    }
    .el-form-item {
      display: flex;
      margin-top: 0.1rem;
      margin-bottom: 0.2rem;
      border-bottom: 0.01rem solid #6F74A6;
      height: 0.4rem;
    }
    .el-input__inner::placeholder {
      color: #6F74A6;
      font-size: 0.12rem;
    }
  }
</style>
<style lang="scss" scoped>
  $submit_color: #373959;
  /*登录线条*/

  $submit_borderColor: 1px solid #9fa0af;
  /*按钮边框颜色*/

  $border_bottom: 1px solid #6F74A6;
  /*列表边框颜色*/

  $placeholder: #6F74A6;
  /*文本提示颜色*/

  $slideRight: #171932;
  /*弹框样式*/

  $header_bg: #141738;
  /*整体的盒子*/

  $dialogue_bg: #1C1E3D;
  .oHeight{
    height: .5rem;
  }
  /*弹框背景色*/
  #realName {
    width: 100%;
    height: 100%;
    .header_box {
      width: 100%;
      position: fixed;
      top: 0;
      left: 0;
      z-index: 55;
      font-size: 0.16rem;
      .register_header {
        width: 100%;
        box-sizing: border-box;
        padding-left: .1rem;
        display: flex;
        align-items: center;
        color: #fff;
        height: 0.5rem;
        background: #171933;
        font-size: 0.15rem;
      }
    }
    /*用户列表*/
    .realName {
      width: 100%;
      height: 35%;
      color: #fff;
      dispaly: flex;
      justify-content: center;
      align-items: center;
      background: url("http://imxpro.oss-cn-beijing.aliyuncs.com/static/advbanner.png") no-repeat;
      background-size: 100% 108%;
      .oleft {
        color: #6F74A6;
        font-size: 0.12rem;
        padding-left: 0.3rem;
        .realNameTitle {
          font-size: 0.19rem;
          font-weight: bold;
          color: #7587E0;
          padding-top: 0.75rem;
        }
        .smallTitle {
          font-size: 0.1rem;
          line-height: 0.25rem;
          width:41%;
        }
      }
    }
    .tabHeader {
      font-size: 0.13rem;
      width: 100%;
      padding: 0.15rem;
      box-sizing: border-box;
      background: #121528;
      border-bottom: 0.01rem solid #101118;
      .search {
        display: flex;
        justify-content: space-between;
        align-items: center;
        color: #6f74a6;
        font-weight: bold;
        .pleaseChoose {
          padding-left: 0.05rem;
        }
      }
    }
    .countriesList {
      font-size: 0.13rem;
      width: 100%;
      padding: 0rem 0.2rem;
      box-sizing: border-box;
      background: #121528;
      min-height: 100%;
      .countryItem {
        display: flex;
        justify-content: space-between;
        align-items: center;
        color: #fff;
        padding: 0.15rem 0;
      }
    }
    .cidentifyBox {
      padding: 0 0.3rem;
      color: #F1F2FA;
      .cidentifyContent {
        .itemContent {
          padding: 0.14rem 0rem;
          border-bottom: 0.01rem solid #6F74A6;
          font-size: 0.14rem;
          display: flex;
          input {
            padding-left: .05rem;
            color: #fff;
          }
          .itemLabel {
            display: flex;
            align-items: center;
            width: 0.8rem;
            border-right: 0.01rem solid #6F74A6;
          }
          .tab_Country_title {
            width: 78%;
            height: .2rem;
            line-height: .2rem;
            display: flex;
            justify-content: space-between;
            align-items: center;
            color: #fff;
            position: relative;
            box-sizing: border-box;
            .sanjiaoSize {
              width: 0.08rem;
            }
            span {
              font-size: .13rem;
              margin-right: .02rem;
              padding-left: .05rem;
            }
            /*选择国家的按钮变化*/
            .iconRote {
              transform: rotate(90deg);
              top: 0rem !important;
              transition: .3s all;
            }
            .iconColor {
              color: #6F74A6;
            }
          }
          /*下拉框*/
          .tab_Country_list {
            width: 72%;
            position: absolute;
            top: .4rem;
            left: .75rem;
            border-radius: .02rem;
            z-index: 656;
            background: #2f395c;
            li {
              padding: 0 .2rem;
              height: .3rem;
              text-align: center;
              line-height: .3rem;
              color: #fff;
              border-bottom: 0.01rem solid #10162b;
            }
            li:hover {
              background: #4c577d;
            }
          }
        }
        .itemPosition {
          position: relative;
        }
      }
    }
    .foreignCert {
      padding: 0rem 0.3rem 0.15rem;
      color: #6F74A6;
      text-align: center;
      font-size: 0.1rem;
      line-height: 0.15rem;
    }
    .buttonWrap {
      padding: 0 0.3rem;
      button {
        margin: 0;
        padding: 0;
        border: 1px solid transparent; //自定义边框
        outline: none
      }
      .buttonStyle {
        width: 100%;
        background: #25CBC5;
        border-radius: 0.04rem;
        color: #fff;
        font-size: 0.14rem;
        padding-top: 0.1rem;
        padding-bottom: 0.1rem;
        font-weight: bold;
      }
    }
    .errorTips {
      width: 100%;
      height: 0.4rem;
      color: red;
      text-align: center;
      line-height: 0.4rem;
    }
    input {
      width: 79%;
      border: none;
      background: none;
      outline: none;
      color: #fff;
      box-sizing: border-box;
    }
    input::placeholder {
      color: $placeholder;
      font-size: 0.125rem;
    }
    .men_ban {
      position: fixed;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.5);
      z-index: 65;
    }
    .dialogue {
      width: 100%;
      background: $dialogue_bg;
      position: fixed;
      left: 0rem;
      bottom: 0rem;
      z-index: 66;
      padding: 0.12rem;
      box-sizing: border-box;
      font-size: 0.14rem;
      color: #b7bace;
      .successTitle {
        text-align: center;
        font-size: 0.16rem;
        color: #7587E0;
      }
      .successItem {
        display: flex;
        line-height: 0.2rem;
        margin-top: 0.15rem;
        font-size: 0.12rem;
        .realInfo {
          padding-left: 0.1rem;
        }
      }
      .advButton {
        width: 100%;
        background: #25CBC5;
        border-radius: 0.04rem;
        color: #fff;
        font-size: 0.14rem;
        padding-top: 0.1rem;
        padding-bottom: 0.1rem;
        text-align: center;
        margin-top: 0.35rem;
      }
    }
  }

</style>
