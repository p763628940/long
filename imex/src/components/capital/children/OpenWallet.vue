<template>
    <div id="OpenWallet">
      <my-header :text="headerText"></my-header>
     <!-- 切换邮箱验证,显示手机的信息-->
      <div class="container" v-if="noBdMobile">
        <div class="changeEmail">
          <div class="emailContent">
            <p class="changeTitle" @click="tabEmail(0)">{{$t("WalletManagement.SwitchMail")}}</p>
          </div>
          <p>{{$t("WalletManagement.FirstUseWallet")}}</p>
        </div>
        <div class="poneInfo">
          <input type="text" :placeholder="$t('userCenter.Pleasetn')" maxlength="11" v-model="mobileNum" class="poneNum">
          <p class="codeCont">
            <input type="text" :placeholder="$t('WalletManagement.EnterVerCode')" v-model="mobileCode" maxlength="6" class="VerificationCode">
            <span class="textColor" v-if="!CountdownStarts" @click="getCode('mobile')">{{getCodeText}}</span>
            <span class="container" v-if="CountdownStarts">{{Countdown}}{{$t("WalletManagement.AfterSeconds")}}</span>
          </p>
        </div>
        <!--手机错误提示-->
        <div v-if="true" class="error">{{errorText}}</div>
        <div class="OpenWallet">
          <button class="OpenWalletButton" @click="OpenNow('mobile')">{{$t("WalletManagement.OpenWallet")}}</button>
        </div>
      </div>
      <!---切换手机验证，显示邮箱的信息-->
      <div class="container" v-if="noBdEmail">
        <div class="changeEmail">
          <div class="emailContent">
            <p class="changeTitle" @click="tabMobile(0)">{{$t("WalletManagement.SwitchPhoneVer")}}</p>
          </div>
          <p>{{$t("WalletManagement.FirstUseWallet")}}</p>
        </div>
        <div class="poneInfo">
          <input type="text" :placeholder="$t('WalletManagement.EnterEmail')" v-model="emailNum" class="poneNum">
          <p class="codeCont">
            <input type="text" :placeholder="$t('WalletManagement.EnterVerCode')" v-model="emailCode" maxlength="6"  class="VerificationCode">
            <span class="textColor" v-if="!CountdownStarts" @click="getCode('email')">{{getCodeText}}</span>
            <span class="container" v-if="CountdownStarts">{{Countdown}}{{$t("WalletManagement.AfterSeconds")}}</span>
          </p>
        </div>
        <!--邮箱错误提示-->
        <div v-if="true" class="error">{{errorText}}</div>
        <div class="OpenWallet">
          <button class="OpenWalletButton" @click="OpenNow('email')">{{$t("WalletManagement.OpenWallet")}}</button>
        </div>
      </div>
      <!--已有手机验证-->
      <div class="container" v-if="yesBdMobile">
        <div class="changeEmail">
          <div class="emailContent">
            <p class="changeTitle" @click="tabEmail(1)">{{$t("WalletManagement.SwitchMail")}}</p>
          </div>
          <p>{{$t("WalletManagement.FirstUseWallet")}}</p>
        </div>
        <div class="poneInfo">
          <p class="poneNum">{{userInfo.mobile}}</p>
          <p class="codeCont">
            <input type="text" :placeholder="$t('WalletManagement.EnterVerCode')" v-model="mobileCode" maxlength="6"  class="VerificationCode">
            <span class="textColor" v-if="!CountdownStarts" @click="getBdCode('mobile')">{{getCodeText}}</span>
            <span class="container" v-if="CountdownStarts">{{Countdown}}{{$t("WalletManagement.AfterSeconds")}}</span>
          </p>
        </div>
        <!--手机错误提示-->
        <div v-if="true" class="error">{{errorText}}</div>
        <div class="OpenWallet">
          <button class="OpenWalletButton" @click="OpenBdNow('mobile')">{{$t("WalletManagement.OpenWallet")}}</button>
        </div>
      </div>
      <!--已有邮箱验证-->
      <div class="container" v-if="yesBdEmail">
        <div class="changeEmail">
          <div class="emailContent">
            <p class="changeTitle" @click="tabMobile(1)">{{$t("WalletManagement.SwitchPhoneVer")}}</p>
          </div>
          <p>{{$t("WalletManagement.FirstUseWallet")}}</p>
        </div>
        <div class="poneInfo">
          <p class="poneNum">{{userInfo.email}}</p>
          <p class="codeCont">
            <input type="text" :placeholder="$t('WalletManagement.EnterVerCode')" v-model="emailCode" maxlength="6"  class="VerificationCode">
            <span class="textColor" v-if="!CountdownStarts" @click="getBdCode('email')">{{getCodeText}}</span>
            <span class="container" v-if="CountdownStarts">{{Countdown}}{{$t("WalletManagement.AfterSeconds")}}</span>
          </p>
        </div>
        <!--手机错误提示-->
        <div v-if="true" class="error">{{errorText}}</div>
        <div class="OpenWallet">
          <button class="OpenWalletButton" @click="OpenBdNow('email')">{{$t("WalletManagement.OpenWallet")}}</button>
        </div>
      </div>
      <!--底部提示-->
      <div class="footerInfo">{{$t("WalletManagement.HaveQuestions")}}</div>
    </div>
</template>

<script>
  import header from "../../public/backHeader";
  import axios from "axios";
  import {httpUrl} from "../../http_url/http_url";
  import {mapState} from "vuex";
  export default {
        name: "OpenWallet",
      data(){
          return {
            headerText:this.$t("WalletManagement.OpenWallet"),
            //userInfo:{},        /*用户信息*/
            isMobile:false,     /*判断用户是否绑定手机号码*/
            noBdMobile:false,  /*未绑定手机号*/
            yesBdMobile:false, /*已绑定手机号*/
            yesBdEmail:false, /*已绑定邮箱地址*/
            noBdEmail:false, /*未绑定邮箱地址*/
            getCodeText:this.$t("WalletManagement.GetVerCode"), /*获取验证码*/
            CountdownStarts:false,  /*是否开始倒计时*/
            Countdown:0,   /*倒计时*/
            mobileNum:"",  /*手机号码*/
            emailNum:"",   /*邮箱号码*/
            mobileCode:"", /*手机验证码*/
            emailCode:"",  /*邮箱验证码*/
            errorText:"",  /*错误提示*/
          }
      },
      components:{
          "my-header":header
      },
    computed:{
      ...mapState('user',['userInfo'])
    },
      methods:{
        errPrompt(text){
          this.errorText = text;
          setTimeout(()=>{
            this.errorText = "";
          },1500)
        },
        OpenNow(TypesOf) { /*未绑定立即开启*/
          var _this = this;
          if (TypesOf == "email") {
            if (this.emailNum.length == 0) {
              this.errPrompt(_this.$t("WalletManagement.EnterEmail"));
              return false;
            }
            if (this.emailCode.length == 0) {
              this.errPrompt(_this.$t("WalletManagement.EnterVerCode"));
              return false;
            }
            if (this.emailCode.length < 4) {
              this.errPrompt(_this.$t("WalletManagement.VerCodeIncludes"));
              return false;
            }
            axios.post(httpUrl.walletOn, {
              code: this.emailCode,
              email: this.emailNum,
              type: 0
            }, {
              headers: {"Authorization": "Bearer " + this.token}
            }).then(res => {
              if (res.data.status.code == 200) {
                this.$router.push({name:"capital"});
              }
            }, err => {
              console.log(err)
            })
          } else {
            if (this.mobileNum.length == 0) {
              this.errPrompt(_this.$t("WalletManagement.EnterPhoneNumber"));
              return false;
            }
            if (this.mobileCode.length == 0) {
              this.errPrompt(_this.$t("WalletManagement.EnterVerCode"));
              return false;
            }

            if (this.mobileCode.length < 4) {
              this.errPrompt(_this.$t("WalletManagement.VerCodeIncludes"));
              return false;
            }
            axios.post(httpUrl.walletOn, {
              code: this.mobileCode,
              mobile: this.mobileNum,
              type: 1
            }, {
              headers: {"Authorization": "Bearer " + this.token}
            }).then(res => {
              if (res.data.status.code == 200) {
                this.$router.push({name:"capital"});
              }
            }, err => {
              console.log(err)
            })
          }
        },
        OpenBdNow(TypesOf) { /*已绑定*/
          if (TypesOf == "email") {
            if (this.emailCode.length == 0) return;
            axios.post(httpUrl.walletOn, {
              code: this.emailCode,
              type: 0
            }, {
              headers: {"Authorization": "Bearer " + this.token}
            }).then(res => {
              if (res.data.status.code == 200) {
                this.$router.push({name:"capital"});
              }
            }, err => {
              console.log(err)
            })
          } else {
            if (this.mobileCode.length == 0) return;
            axios.post(httpUrl.walletOn, {
              code: this.mobileCode,
              type: 1
            }, {
              headers: {"Authorization": "Bearer " + this.token}
            }).then(res => {
              if (res.data.status.code == 200) {
                this.$router.push({name:"capital"});
              }
            }, err => {
              console.log(err)
            })
          }
        },
        getCode(typeOf){  /*未绑定（获取验证码）*/
          var _this = this;
          if(typeOf=='email'){
            if(this.emailNum.length==0){
              this.errPrompt(_this.$t("WalletManagement.EnterEmail"));
              return;
            }
            axios.post(httpUrl.sendOpenWallet, {
              email: this.emailNum,
              type: 0
            }, {
              headers: {"Authorization": "Bearer " + this.token}
            }).then(res => {
              if (res.data.status.code == 200) {
                this.Countdown = 60;
                this.CountdownStarts = true;
                let time = setInterval(()=>{
                  this.Countdown--;
                  if(this.Countdown<=0){
                    clearInterval(time);
                    this.CountdownStarts = false;
                    this.getCodeText = _this.$t("WalletManagement.Resend");
                  }
                },1000)
              }
            }, err => {
              console.log(err)
            })

          }else{
            if(this.mobileNum.length==0){
              this.errPrompt(_this.$t("WalletManagement.EnterPhoneNumber"));
              return;
            }
            axios.post(httpUrl.sendOpenWallet, {
              mobile: this.mobileNum,
              type: 1
            }, {
              headers: {"Authorization": "Bearer " + this.token}
            }).then(res => {
              if (res.data.status.code == 200) {
                this.Countdown = 60;
                this.CountdownStarts = true;
                let time = setInterval(()=>{
                  this.Countdown--;
                  if(this.Countdown<=0){
                    clearInterval(time);
                    this.CountdownStarts = false;
                    this.getCodeText =_this.$t("WalletManagement.Resend");
                  }
                },1000)
              }
            }, err => {
              console.log(err)
            })
          }

        },
        getBdCode(typeOf){ /*已绑定（获取验证码）*/
          var _this = this;
          if(typeOf=='email'){
            axios.post(httpUrl.sendOpenWallet, {
              type: 0
            }, {
              headers: {"Authorization": "Bearer " + this.token}
            }).then(res => {
              if (res.data.status.code == 200) {
                this.Countdown = 60;
                this.CountdownStarts = true;
                let time = setInterval(()=>{
                  this.Countdown--;
                  if(this.Countdown<=0){
                    clearInterval(time);
                    this.CountdownStarts = false;
                    this.getCodeText = _this.$t("WalletManagement.Resend");
                  }
                },1000)
              }
            }, err => {
              console.log(err)
            })
          }else{
            axios.post(httpUrl.sendOpenWallet, {
              type: 1
            }, {
              headers: {"Authorization": "Bearer " + this.token}
            }).then(res => {
              if (res.data.status.code == 200) {
                this.Countdown = 60;
                this.CountdownStarts = true;
                let time = setInterval(()=>{
                  this.Countdown--;
                  if(this.Countdown<=0){
                    clearInterval(time);
                    this.CountdownStarts = false;
                    this.getCodeText = _this.$t("WalletManagement.Resend");
                  }
                },1000);
              }
            }, err => {
              console.log(err)
            })
          }

        },
        tabEmail(type){ /*切换邮箱  这里的type是指手机状态*/
          if(this.userInfo.email_status==0&&type==0){ //未绑定手机号码切换未绑定邮箱
             this.noBdEmail = true;
             this.noBdMobile = false;
          }
          if(this.userInfo.email_status==0&&type==1){ //已绑定手机号码切换未绑定邮箱
            this.noBdEmail = true;
            this.yesBdMobile = false;
          }
          if(this.userInfo.email_status!=0&&type==1){ //已绑定手机号码切换已绑定邮箱
            this.yesBdEmail = true;
            this.yesBdMobile = false;
          }
          if(this.userInfo.email_status!=0&&type==0){ //未绑定手机号码切换已绑定邮箱
            this.yesBdEmail = true;
            this.noBdMobile = false;
          }
          this.CountdownStarts = false;  /*停止倒计时*/
          this.getCodeText = this.$t("WalletManagement.GetVerCode"); /*恢复默认值*/
          this.Countdown = 0;  /*归零*/
          this.mobileNum="";  /*手机号码*/
          this.mobileCode=""; /*手机验证码*/

        },
        tabMobile(type){ /*切换手机号 这里的type是指邮箱状态*/
          if(this.userInfo.mobile_status==0&&type==0){ //未绑定邮箱切换未绑定手机号码
            this.noBdMobile = true;
            this.noBdEmail = false;
          }
          if(this.userInfo.mobile_status==0&&type==1){ //已绑定邮箱切换未绑定手机号码
            this.noBdMobile = true;
            this.yesBdEmail = false;
          }
          if(this.userInfo.mobile_status!=0&&type==0){ //未绑定邮箱切换已绑定手机号码
            this.yesBdMobile = true;
            this.noBdEmail = false;
          }
          if(this.userInfo.mobile_status!=0&&type==1){ //已绑定邮箱切换已绑定手机号码
            this.yesBdMobile = true;
            this.yesBdEmail = false;
          }
          this.CountdownStarts = false;  /*停止倒计时*/
          this.getCodeText = this.$t("WalletManagement.GetVerCode"); /*恢复默认值*/
          this.Countdown = 0;  /*归零*/
          this.emailNum="";  /*手机号码*/
          this.emailCode=""; /*手机验证码*/
        }
      },
      mounted(){
          console.log(this.userInfo);
        /*获取用户信息*/
        // this.$ajax.get(this.httpUrl.userInfo, {
        //   headers: {
        //     "Authorization": "Bearer " + this.token
        //   }
        // }).then(res=>{
        //     this.userInfo = res.data.data;
            if(this.userInfo.mobile_status!=0){ /*判断用户是否绑定手机号*/
              this.yesBdMobile = true;
            }else{
              this.noBdMobile = true;
            }
        // },err=>{
        //   console.log(err);
        // })

      }
    }
</script>

<style lang="scss" scoped>
#OpenWallet{
  background:#111336;
  height:100%;
  .container{
    color:#666a9a;
    .changeEmail{
      padding:0 0.16rem;
      .emailContent{
        display:flex;
        align-items: center;
        width:100%;
        .changeTitle{
          font-size:0.17rem;
          color:#7587e0;
          margin-right:0.08rem;
        }
        .iconColor{
          margin-top:0.04rem;
          color:#7587e0;
          font-size:0.1rem;
        }
      }
      p{
        padding:0.12rem 0rem;
      }
    }
    .poneInfo{
      padding:0 0.16rem;
      background:#16183f;
      border-top:0.01rem solid #282e64;
      border-bottom:0.01rem solid #282e64;
      input{
        width:100%;
        background:none;
        outline:none;
        border:0px;
        display: block;
        line-height: 0.36rem;
        font-size:0.13rem;
        color: #fff;
      }
      input::-webkit-input-placeholder{
        color:#585c89;
      }
      input::-moz-placeholder{   /* Mozilla Firefox 19+ */
        color:#585c89;
      }
      input:-moz-placeholder{    /* Mozilla Firefox 4 to 18 */
        color:#585c89;
      }
      input:-ms-input-placeholder{  /* Internet Explorer 10-11 */
        color:#585c89;
      }
      .poneNum{
        height: .4rem;
        line-height: .4rem;
        border-bottom:1px solid #2e3053;
        font-size: .14rem;
      }
      .codeCont{
        display: flex;
        justify-content: space-between;
        align-items: center;
        .VerificationCode{
          width:55%;
        }
        .textColor{
          font-size:0.13rem;
          color:#25cbc5;
        }
      }
    }
    .OpenWallet{
      padding:0 0.16rem;
      .OpenWalletButton{
        margin: .1rem 0;
        padding: 0;
        border: 1px solid transparent;  //自定义边框
        outline: none;
        background-color: #25cbc5;
        color:#fff;
        width:100%;
        text-align: center;
        border-radius: 0.02rem;
        font-size:0.15rem;
        line-height:0.4rem;
      }
    }
    .error{
      padding-left:0.16rem;
      color:#e94144;
      height: .4rem;
      line-height: .4rem;
    }
  }
}
.footerInfo{
  width:100%;
  text-align: center;
  line-height:0.48rem;
  color: #666a9a;
}
</style>
