<template>
  <div id="Authentication">
    <!--实名信息提交成功-->
    <div class="men_ban" v-if="whetherIdentityID"></div>
    <!--提交成功内容-->
    <div class="SuccessfulAuthentication" v-if="whetherIdentityID">
      <p class="title">{{$t("userCenter.SubmittedSuccess")}}</p>
      <ul class="content">
        <li>{{$t("userCenter.Submitted1")}}</li>
        <li>{{$t("userCenter.Submitted2")}}</li>
        <li>{{$t("userCenter.Submitted3")}}</li>
      </ul>
      <div class="bottom">
        <button @click="Recertification">{{$t("userCenter.StartAdvCert")}}</button>
      </div>
    </div>
    <!--头部身份认证-->
    <div class="Authentication_title">
      <span class="text">{{$t("userCenter.Authentication")}}</span>
    </div>
    <!--实名认证+高级认证-->
    <div class="VerifiedAdvancedCertification">
      <!--第一步+第二步-->
      <div class="step">
        <ul>
          <li class="first__step">
            <div class="step__head" :class="{'is-success':userInfo.idCard}">
              <p class="step__icon">
                <i class="iconfont icon-user-fill"></i>
              </p>
              <p class="step__line"></p>
            </div>
            <p class="step__main" :class="{'is-success':userInfo.idCard}">
              <span class="step__title">{{$t("userCenter.Verified")}}</span>
              <span class="step__modify" v-if="userInfo.idCard&&!underReview&&userInfo.auth_grade==0&&!Authenticationfailed" @click="backVerified">({{$t("userCenter.Modify")}} <i class="iconfont icon-xiugai"></i>)</span>
            </p>
          </li>
          <li class="Second__step">
            <div class="step__head" :class="{'is-success':userInfo.auth_grade!=0 || underReviewStatus}">
              <p class="step__icon">
                <i class="iconfont icon-shenfen"></i>
              </p>
              <p class="step__line"></p>
            </div>
            <p class="step__main" :class="{'is-success':userInfo.auth_grade!=0 || underReviewStatus}">
              <span class="step__title">{{$t("userCenter.AdvancedCertification")}}</span>
            </p>
          </li>
          <li class="carry__out">
            <div class="step__head" :class="{'is-success':SuccessfulCertification}">
              <p class="step__icon">
                <i class="iconfont icon-29"></i>
              </p>
            </div>
            <p class="step__main" :class="{'is-success':SuccessfulCertification}">
              <span class="step__title">{{$t("userCenter.VerifiedSuccessfully")}}</span>
            </p>
          </li>
        </ul>

      </div>
      <!--实名认证-->
      <div class="Verified" v-if="firstStep">
        <el-form ref="form" :model="ruleForm" :rules="rules">
          <el-form-item prop="CountryOfCitizenship">
            <p class="title">
              {{$t("userCenter.Country")}}
            </p>
            <el-select v-model="ruleForm.CountryOfCitizenship" :placeholder="$t('userCenter.Country')" @change="selectCountryList" :disabled="userInfo.mobile_status==2">
              <el-option v-for="(country,key) in countryList" :label="country.name" :value="country.id"
                         :key="key"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item prop="userName">
            <p class="title">
              {{$t("login.Names")}}
            </p>
            <el-input v-model="ruleForm.userName"></el-input>
          </el-form-item>
          <el-form-item prop="IdentityID">
            <p class="title">
              {{$t("userCenter.IDnumber")}}
            </p>
            <el-input v-model="ruleForm.IdentityID"></el-input>
          </el-form-item>
          <el-button type="primary" class="margin" @click="submitForm('form')">{{$t("login.Submit1")}}</el-button>
          </el-form-item>
        </el-form>
      </div>
      <!--高级认证-->
      <div class="Advanced" v-if="Secondstep">
        <!--实名认证内容部分-->
        <div class="VerifiedContent">
          <ul>
            <li>
              <p class="Head">{{$t("userCenter.Country")}}：</p>
              <p class="TableContent">
                <span class="country">{{userInfo.countryInfo[0].name}}</span>
                <span class="tabVideo" v-if="whetherArtificial&&isTab" @click="SwitchCertification('vadio')">
                  {{$t("userCenter.VideoSwitch")}}
                </span>
                <span class="tabVideo" v-if="!whetherArtificial&&isTab" @click="SwitchCertification('Artificial')">
                  {{$t("userCenter.SwitchManual")}}
                </span>
              </p>
            </li>
            <li>
              <p class="Head">{{$t("login.Names")}}：</p>
              <p class="TableContent">{{userInfo.trueName}}</p>
            </li>
            <li>
              <p class="Head">{{$t("userCenter.IDnumber")}}：</p>
              <p class="TableContent">{{userInfo.idCard}}</p>
            </li>
          </ul>
        </div>
        <!--人工认证部分-->
        <div class="Artificial" v-if="whetherArtificial">
          <div class="ArtificialContent">
            <p class="ArtificialTitTex">
              {{$t("userCenter.PhotoRequire")}}：
            </p>
            <div class="ArtificialConTex">
              <p class="material">
                {{$t("userCenter.Rquirements1")}}
              </p>
              <!--材料内容-->
              <div class="MaterialContent">
                <dl class="MaterialWrapper">
                  <dt class="MaterialItem" v-if="userInfo.country_id!=1">
                    <div class="addIcon">
                      <i class="iconfont icon-jia1 PassportIcon"></i>
                      <p class="PassportCover">{{$t("userCenter.PasswordFront")}}</p>
                    </div>
                    <img :src="positiveImg" v-if="positive" class="passportImg1" alt="">
                    <img src="../../../assets/passport.png" class="passportImg" alt="">
                    <input type="file" @change="changePositive($event)"
                           accept="image/png,image/gif,image/jpg,image/jpeg"/>
                  </dt>
                  <dt class="MaterialItem" v-if="userInfo.country_id==1">
                    <div class="addIcon">
                      <i class="iconfont icon-jia1"></i>
                      <p>{{$t("userCenter.Reverse")}}</p>
                    </div>
                    <img :src="positiveImg" v-if="positive" class="fileImg" alt="">
                    <img src="../../../assets/BackOfIDCard.png" class="bgImg" alt="">
                    <input type="file" @change="changePositive($event)"
                           accept="image/png,image/gif,image/jpg,image/jpeg"/>
                  </dt>
                  <dt class="MaterialItem">
                    <div class="addIcon">
                      <i class="iconfont icon-jia1"></i>
                      <p>{{$t("userCenter.Frontal")}}</p>
                    </div>
                    <img :src="NegativeImg" v-if="Negative" class="fileImg" alt="">
                    <img src="../../../assets/IDCardFront.png" class="bgImg" alt="">
                    <input type="file" @change="changeNegative($event)"
                           accept="image/png,image/gif,image/jpg,image/jpeg"/>
                  </dt>
                  <dt class="MaterialItem">
                    <div class="addIcon">
                      <i class="iconfont icon-jia1"></i>
                      <p>{{$t("userCenter.signature")}}</p>
                    </div>
                    <img :src="HandheldImg" v-if="Handheld" class="fileImg" alt="">
                    <img src="../../../assets/HandheldDocuments.png" class="bgImg" alt="">
                    <input type="file" @change="changeHandheldImg($event)"
                           accept="image/png,image/gif,image/jpg,image/jpeg"/>
                  </dt>
                </dl>
              </div>
              <!--注-->
              <div class="Comment">{{$t("userCenter.ReloadNote")}}</div>
              <!--确认无误，提交审核-->
              <div class="Submit">
                <button @click="SubmitReview">{{$t("userCenter.Submitverify")}}</button>
              </div>
              <!--审核-->
              <div class="Review">
                <ul>
                  <li>{{$t("userCenter.FailReview")}}：</li>
                  <li>{{$t("userCenter.errors1")}}</li>
                  <li>{{$t("userCenter.errors2")}}</li>
                  <li>{{$t("userCenter.errors3")}}</li>
                  <li>{{$t("userCenter.errors4")}}</li>
                  <li>{{$t("userCenter.errors5")}}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <!--视频认证部分-->
        <div class="Video" v-if="!whetherArtificial">
          <p class="VideoTitle">
            <span>{{$t("userCenter.FaceRecognition")}}:</span>
          </p>
          <p class="Face">
            {{$t("userCenter.UsePhoneAuthen")}}
          </p>
          <div class="ERcode">
            <img :src="ERcode" alt="">
            <div class="refresh" @click="getFaceToken">
              <i class="iconfont icon-shuaxin" :class="{'rotate':isRefresh}"></i>
              <span> {{$t("Record.refresh")}}</span>
            </div>
          </div>
          <p class="Face">
            {{$t("userCenter.ExpireAfter")}}
          </p>
        </div>
      </div>
      <div class="Advanced">
        <!--审核中-->
        <div class="underReview" v-if="underReview">
          <p class="underReviewTitle">
            <i class="iconfont icon-shijian"></i>
            <span>{{$t("userCenter.CerInfoSubmitted")}}</span>
          </p>
          <p class="ReviewContent">
            {{$t("userCenter.BePatient")}}
          </p>
          <!--审核-->
          <div class="Review">
            <ul>
              <li>{{$t("userCenter.FailReview")}}：</li>
              <li>{{$t("userCenter.errors1")}}</li>
              <li>{{$t("userCenter.errors2")}}</li>
              <li>{{$t("userCenter.errors3")}}</li>
              <li>{{$t("userCenter.errors4")}}</li>
              <li>{{$t("userCenter.errors5")}}</li>
            </ul>
          </div>
        </div>
        <!--认证失败-->
        <div class="Authenticationfailed" v-if="Authenticationfailed">
          <div class="AuthenticationfailedTitle">
            <i class="iconfont icon-cuowu1"></i>
            <span>{{$t("userCenter.AuthenticationFailed")}}</span>
          </div>
          <div class="ReasonForFailure">
            {{$t("userCenter.FailureReason")}}：{{ReasonforFailure}}
          </div>
          <div class="ReasonForFailure">{{$t("userCenter.ReadjustImg")}}</div>
          <div class="Recertification">
            <button @click="Recertification">{{$t("userCenter.ReAuthenticate")}}</button>
          </div>
          <div class="Review">
            <ul>
              <li>{{$t("userCenter.FailReview")}}：</li>
              <li>{{$t("userCenter.errors1")}}</li>
              <li>{{$t("userCenter.errors2")}}</li>
              <li>{{$t("userCenter.errors3")}}</li>
              <li>{{$t("userCenter.errors4")}}</li>
              <li>{{$t("userCenter.errors5")}}</li>
            </ul>
          </div>
        </div>
        <!--认证成功-->
        <div class="SuccessfulCertification" v-if="SuccessfulCertification">
        <div class="SuccessfulCertificationTitle">
          <i class="iconfont icon-duihao2"></i>
          <span>{{$t("userCenter.HaveBeenVerified")}}</span>
        </div>
        <ul class="SuccessfulCertificationContent">
          <li>
            <p class="Head">{{$t("userCenter.Country")}}：</p>
            <p class="tabContent">{{userInfo.countryInfo[0].name}}</p>
          </li>
          <li>
            <p class="Head">{{$t("login.Names")}}：</p>
            <p class="tabContent">{{userInfo.trueName}}</p>
          </li>
          <li>
            <p class="Head">{{$t("userCenter.IDnumber")}}：</p>
            <p class="tabContent">{{userInfo.idCard}}</p>
          </li>
        </ul>
      </div>
      </div>

    </div>


  </div>
</template>

<script>
  import axios from "axios";
  import {httpUrl} from "../../http_url/http_url";
  import {mapGetters, mapActions, mapState, mapMutations} from 'vuex';

  export default {
    name: "Authentication",
    data() {
      var IdentityID = (rule, value, callback) => {
        if (value === '') {
          callback(new Error(this.$t("userCenter.EnterIDCardNum")));
        } else if (!/^[0-9a-zA-Z]*$/g.test(value)) {
          callback(new Error(this.$t("userCenter.EnterCorrectIDCard")));
        } else {
          callback();
        }
      }
      var userName = (rule, value, callback) => {
        if (value === '') {
          callback(new Error(this.$t("userCenter.EnterName")));
        } else if (!/^[A-Za-z\u4e00-\u9fa5]+$/gi.test(value)) {
          callback(new Error(this.$t("userCenter.EnterCorrectFormat")));
        } else {
          callback();
        }
      }
      return {
        ruleForm: {
          userName: '', /*用户姓名*/
          CountryOfCitizenship: "", /*国籍*/
          IdentityID: "", /*身份ID*/
        },
        rules: {
          CountryOfCitizenship: [
            {required: true, message: this.$t("userCenter.ChooseCountry"), trigger: 'change'}
          ],
          userName: [
            {
              validator: userName,
              trigger: 'blur'
            }
          ],
          IdentityID: [{
            validator: IdentityID,
            trigger: 'blur'
          }]
        },
        whetherArtificial: true, /*人工认证*/
        isTab: true, /*是否显示切换*/
        whetherIdentityID: false, /*是否通过实名认证*/
        countryList: [], /*国家列表*/
        country:"", /*国籍*/
        firstStep: true, /*第一步*/
        Secondstep: false, /*第二步*/
        underReview: false, /*第二步（正在审核）*/
        underReviewStatus:false,/*高级上传状态*/
        Authenticationfailed: false, /*第三步（认证失败）*/
        SuccessfulCertification: false, /*第三步（认证成功）*/
        positive: false, /*正面*/
        positiveImg: "", /*正面照片*/
        Negative: false, /*反面*/
        NegativeImg: "", /*反面照片*/
        Handheld: false, /*手持身份证*/
        HandheldImg: "", /*手持身份证照片*/
        idcard_front: "",
        /*正面*/
        idcard_back: "",
        /*反面*/
        idcard_holt: "",
        /*手持*/
        ERcode: "", /*高级认证二维码*/
        isRefresh: false, /*是否刷新*/
        auth_grade:"", /*高级认证状态*/
        ReasonforFailure:"", /*失败原因*/
      }
    },
    methods: {
      ...mapMutations('user', ['setUserInfo']),
      selectCountryList(){ /*切换国籍*/
        this.countryList.forEach( (value, index, array)=>{
          if(value.id == this.ruleForm.CountryOfCitizenship){
            this.country = value;
          }
        })
      },
      Recertification() { /*高级认证+重新认证*/
        this.whetherIdentityID = false; /*弹框消失*/
        this.Authenticationfailed = false; /*失败原因消失*/
        if (this.userInfo.idCard && this.userInfo.auth_grade == 0 && this.userInfo.country_id == 1) {
          this.firstStep = false;
          /*第一步*/
          this.Secondstep = true;
          /*第二步*/
          this.getFaceToken(); /*获取二维码*/
          this.whetherArtificial = false;
          /*默认显示视频认证*/
        } else if(this.userInfo.idCard && this.userInfo.auth_grade == 0){
          this.firstStep = false;
          /*第一步*/
          this.Secondstep = true;
          /*第二步*/
          this.isTab = false;
          /*不显示切换视频认证*/
          this.whetherArtificial = true;
          /*只显示人工认证*/
        }
      },
      getFaceToken(){ /*获取高级认证视频认证二维码*/
        this.isRefresh = true;
        axios.get(httpUrl.getFaceToken,{
          headers:{"Authorization":"Bearer "+this.token}
        }).then(res=>{
          this.ERcode = res.data.data.qr;
          this.isRefresh = false;
        },err=>{
          console.log(err);
        })
      },
      SwitchCertification(type) { /*切换认证*/
        if (type == 'vadio') { /*切换视频认证*/
          this.whetherArtificial = false;
          this.getFaceToken(); /*重新获取二维码*/
        } else {  /*切换人工认证*/
          this.whetherArtificial = true;
          this.Reset();
          /*重置人工内容*/
        }
      },
      submitForm(formName) { /*提交身份认证*/
        this.$refs[formName].validate((valid) => {
          if (valid) {
            axios.post(httpUrl.setIdcard, {
              idCard: this.ruleForm.IdentityID,
              trueName: this.ruleForm.userName,
              country_id: this.ruleForm.CountryOfCitizenship
            }, {
              headers: {
                "Authorization": "Bearer " + this.token
              }
            }).then(res => {
              if (res.data.status.code == 200) {
                this.userInfo.country_id = this.ruleForm.CountryOfCitizenship;
                this.userInfo.trueName = this.ruleForm.userName;
                this.userInfo.idCard = this.ruleForm.IdentityID;
                this.userInfo.countryInfo = [this.country];
                let userInfo = this.userInfo;
                this.setUserInfo({userInfo});
                this.whetherIdentityID = true;
              }
              ;
            }, err => {
              console.log(err);
            })
          } else {
            return false;
          }
        });
      },
      backVerified() { /*实名认证*/
        this.firstStep = true;
        /*第一步*/
        this.Secondstep = false;
        /*第二步*/
        this.Reset();
      },
      Reset() { /*重置人工内容*/
        this.idcard_front = "";
        this.idcard_back = "";
        this.idcard_holt = "";
        this.positive = false;
        this.Negative = false;
        this.Handheld = false;
      },
      changePositive(e) { /*上传正面图片*/
        var file = e.target.files[0];
        this.idcard_front = e.target.files[0];
        var windowURL = window.URL;
        var dataURL = windowURL.createObjectURL(file);
        this.positiveImg = dataURL;
        this.positive = true;
      },
      changeNegative(e) { /*上传反面图片*/
        var file = e.target.files[0];
        this.idcard_back = e.target.files[0];
        var windowURL = window.URL;
        var dataURL = windowURL.createObjectURL(file);
        this.NegativeImg = dataURL;
        this.Negative = true;
      },
      changeHandheldImg(e) { /*上传手持图片*/
        var file = e.target.files[0];
        this.idcard_holt = e.target.files[0];
        var windowURL = window.URL;
        var dataURL = windowURL.createObjectURL(file);
        this.HandheldImg = dataURL;
        this.Handheld = true;
      },
      async SubmitReview() { /*提交高级认证审核*/
        let _this = this;
        if (_this.idcard_front == "" || _this.idcard_back == "" || _this.idcard_holt == "") {
          _this.$message.error({
            message:_this.$t("userCenter.UploadFullInfo"),
            type: "warning"
          });
          return false;
        }

        let config = await axios.get(httpUrl.uploadSet, {
          headers: {
            "Authorization": "Bearer " + _this.token
          }
        });

        function generateUID() {
          // I generate the UID from two parts here
          // to ensure the random number provide enough bits.
          var firstPart = (Math.random() * 46656) | 0;
          var secondPart = (Math.random() * 46656) | 0;
          firstPart = ("000" + firstPart.toString(36)).slice(-3);
          secondPart = ("000" + secondPart.toString(36)).slice(-3);
          return JSON.stringify(new Date()).split('T')[0].replace(/-|"/g, '') + firstPart + secondPart;
        }

        const uploadFile = async function (file) {
          let param = new FormData(); //创建 form对象
          let fileName = file + generateUID()
          param.append("OSSAccessKeyId", config.data.data.accessKeyId);
          param.append("policy", config.data.data.policy);
          param.append("signature", config.data.data.signature);
          param.append("key", fileName);
          param.append('file', _this[file]); //通过append向form对象添加数据
          // console.log(fileName);
          // await Promise.resolve('');
          let res = await axios.post(config.data.data.url, param, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          })
          return fileName;
        };
        let uploadRes = await ['idcard_front', 'idcard_back', 'idcard_holt'].reduce(async function (pre, cur) {
          let p = await pre;
          const path = await uploadFile(cur);
          p[cur] = config.data.data.url + '/' + path;
          // console.log(cur,path,pre);
          return pre;
        }, Promise.resolve({}));
        let res = await axios.post(httpUrl.uploadCardPath, uploadRes, {
          headers: {
            "Authorization": "Bearer " + _this.token,
          }
        })
        if (res.data.status.code == 200) {
          this.Secondstep = false;
          /*第二步*/
          this.underReview = true;
          this.underReviewStatus = true; /*已经高级状态*/
          /*审核中*/
        }
      },
      getCountry(){
        axios.get(httpUrl.country,{
          params:{lang:this.lang=='zh-CN'?'zh':'en'}
        }).then(res => {
          this.countryList = res.data.data;
          this.ruleForm.CountryOfCitizenship = this.userInfo.country_id;
          this.ruleForm.userName = this.userInfo.trueName;
          this.ruleForm.IdentityID = this.userInfo.idCard;
          this.country=this.userInfo.countryInfo[0];
        }, function (error) {
          console.log(error)
        });
      }
    },
    computed:{
      ...mapState('user',["lang"])
    },
    watch:{
      lang:{
        handler: function(val, oldVal) {
          axios.get(httpUrl.country,{
            params:{lang:val=='zh-CN'?'zh':'en'}
          }).then(res => {
            this.countryList = res.data.data;
          }, function (error) {
            console.log(error)
          });
        }
      }
    },
    mounted() {
      //获取国家列表
      this.getCountry();
      /*未实名未高级*/
      if (!this.userInfo.idCard && this.userInfo.auth_grade == 0) {
        this.firstStep = true;
        /*第一步*/
        this.Secondstep = false;
        /*第二步*/
      }
      /*已实名未高级*/
      this.Recertification();
      /*已实名已高级*/
      if (this.userInfo.idCard && this.userInfo.auth_grade != 0) {
        this.firstStep = false;
        /*第一步*/
        this.Secondstep = false;
        /*第二步*/
        this.SuccessfulCertification = true;
        /*认证成功*/
      }
      /*获取信息*/
      axios.get(httpUrl.seniorInfo,{
        headers:{"Authorization": "Bearer " + this.token}
      }).then(res=>{
        if(res.data.data.length!=0){
          this.underReviewStatus = true; /*提交高级信息*/
          if(res.data.data.status!=0&&res.data.data.status!=1){ /*其他原因，没有通过*/
            this.firstStep = false;
            /*第一步*/
            this.Secondstep = false;
            /*第二步*/
            this.ReasonforFailure = res.data.data.reason_id; /*失败原因*/
            this.Authenticationfailed = true;
          }
          if(res.data.data.status==0){ /*正在审核中*/
            this.firstStep = false;
            /*第一步*/
            this.Secondstep = false;
            /*第二步*/
            this.underReview = true;
          }
        }
      },err=>{
        console.log(err);
      })
    }
  }
</script>
<style lang="scss">
  #Authentication {
    /*改变element-ui的变化*/
    .margin {
      margin-top: 20px;
    }
    /*取消按钮*/
    .marginl {
      margin-right: 50px;
      background: #17172b;
    }
    .el-form-item__error {
      color: #e23a2d;
      font-size: 12px;
      line-height: 1;
      padding-top: 4px;
      position: absolute;
      left: 0px;
      top: 90px;
      width: 300px;
    }
    /*datepacike长度*/
    .el-date-pickeri {
      width: 100%;
    }
    /*发行价格图标样式*/

    .el-input-group__prepend {
      background: #101034;
      color: #fff;
      border-color: #2c3983;
    }
    .el-form-item {
      height: 90px;
      margin-bottom: 15px;
      .title {
        color: #7575AA;
      }
    }
    .el-select {
      width: 100%;
    }
    .el-form-item__content {
      margin: 0 !important;
    }
    .el-form-item__label:before {
      color: #e23a2d;
    }
    .el-form-item__label {
      width: 100% !important;
      display: block;
      color: #bdc1e4;
      text-align: left;
    }
    .el-textarea__inner {
      height: 90px;
      border: 1px solid #2c3983;
      background: #101034;
      color: #fff;
    }
    .el-form-item__error {
      color: #e23a2d;
    }
    .select .el-select {
      width: 100%;
    }
    .el-input__inner {
      width: 100%;
      height: 45px !important;
      color: #fff;
      border: 1px solid #6D6DA8;
      background: #23233D;
    }
    /*按钮大小*/
    .el-button--primary {
      width: 100%;
      height: 45px !important;
      background-color: #25CBC5 !important;
      border-color: #25CBC5;
    }
    .el-input__inner::-webkit-input-placeholder {
      color: #A8A8E6;
    }
    .IntroductiontoEnglish,
    .Chineseintroduction {
      height: 135px;
    }
    .el-checkbox__label {
      width: 100%;
      color: #fff;
    }
    .is-checked .el-checkbox__inner {
      background: #949bf8;
      border: 1px solid #949bf8;
      white-space: initial;
    }
    .isTrue .el-checkbox {
      display: flex;
      align-items: center;
      white-space: initial;
    }
    .el-checkbox__input.is-checked + .el-checkbox__label {
      color: #949bf8;
    }
  }
</style>
<style lang="scss" scoped>
  $green: #25CBC5;
  /*身份认证头部*/
  .Authentication_title {
    width: 100%;
    height: 50px;
    line-height: 50px;
    box-shadow: 0 7px 10px rgba(0, 0, 0, 0.8);
    background: #17172c;
    color: #fff;
    font-size: 16px;
    .text {
      margin-left: 15px;
    }
  }

  /*实名认证+高级认证部分*/
  .VerifiedAdvancedCertification {
    width: 100%;
    margin-top: 5px;
    box-sizing: border-box;
    background: #17172c;
    padding: 15px 15px;
    padding-bottom: 30px;
  }
  /*第一步+第二步+完成*/
  .step {
    margin-left: 20px;
    margin-top: 20px;
    ul{
      width: 100%;
      display: flex;
    }
    .first__step{
      width: 320px;
      .step__head{
        width: 100%;
        height: 56px;
        position: relative;
        .step__icon{
          width: 56px;
          height: 56px;
          text-align: center;
          line-height: 56px;
          position: relative;
          background: #E1E1E1;
          border-radius: 50%;
          z-index: 1;
          .iconfont{
            font-size: 30px;
            color: #76768B;
          }
        }
        .step__line{
          position: absolute;
          top: 27px;
          left: 0;
          width: 100%;
          height: 2px;
          background: #E1E1E1;
        }
      }
      .step__main{
        margin-top: 10px;
        line-height: 20px;
        font-size: 13px;
        .step__title{
          color: #B4B4B4;
          margin-left: 4px;
        }
        .step__modify{
          color: #25CBC5;
          cursor: pointer;
        }
      }
      .is-success{
        .step__icon{
          background: #25CBC5;
          .iconfont{
            color: #fff;
          }
        }
        .step__line{
          background: #25CBC5;
        }
        .step__title{
          color: #25CBC5;
        }
      }
    }
    .Second__step,.carry__out{
      @extend .first__step;
    }

  }
  /*实名认证部分*/
  .Verified {
    width: 448px;
    margin-left: 20px;
    margin-top: 20px;
  }

  /*实名信息提交成功*/
  .men_ban {
    position: fixed;
    left: 0;
    top: 0;
    z-index: 666;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
  }

  .SuccessfulAuthentication {
    width: 400px;
    background: #fff;
    position: fixed;
    left: 50%;
    top: 50%;
    margin-left: -200px;
    margin-top: -125px;
    z-index: 999;
    border-radius: 4px;
    .title {
      width: 100%;
      height: 50px;
      text-align: center;
      line-height: 50px;
      color: #1E1D54;
      font-size: 16px;
    }
    .content {
      font-size: 13x;
      box-sizing: border-box;
      padding: 5px 20px;
      color: #84889B;
      li {
        line-height: 20px;
        margin-bottom: 10px;
      }
    }
    .bottom {
      width: 100%;
      height: 80px;
      display: flex;
      justify-content: center;
      align-items: center;
      border-top: 1px solid #D8D8D8;
      button {
        outline: none;
        padding: 15px 50px;
        background: #60C8C4;
        color: #fff;
        border-radius: 4px;
      }
    }
  }

  /*实名认证*/
  .Advanced {
    margin-left: 20px;
    margin-top: 20px;
    .backVerified { /*修改实名认证*/
      color: $green;
      font-size: 13px;
      height: 20px;
      line-height: 20px;
      cursor: pointer;
    }
    .VerifiedContent {
      width: 750px;
      margin-top: 15px;
      ul {
        width: 100%;
        li {
          width: 100%;
          height: 40px;
          display: flex;
          align-items: center;
          font-size: 14px;
          .Head {
            width: 110px;
            color: #7575AA;
          }
          .TableContent {
            width: 590px;
            color: #fff;
            display: flex;
            justify-content: space-between;
            .tabVideo {
              color: $green;
              font-size: 14px;
              cursor: pointer;
            }
          }
        }
      }
    }
    .Artificial {
      .ArtificialContent {
        width: 100%;
        display: flex;
        font-size: 14px;
        .ArtificialTitTex {
          width: 110px;
          height: 30px;
          line-height: 30px;
          color: #7575AA;
        }
        .ArtificialConTex {
          color: #fff;
          .material {
            height: 40px;
            line-height: 30px;
          }
        }
      }
    }
  }

  /*材料部分*/
  .MaterialContent {
    width: 100%;
    margin-top: 30px;
    margin-bottom: 20px;
    .MaterialWrapper {
      width: 630px;
      display: flex;
      justify-content: space-between;
      .MaterialItem {
        width: 190px;
        height: 190px;
        cursor: pointer;
        border: 1px dashed #6F74A6;
        border-radius: 4px;
        position: relative;
        input {
          position: absolute;
          left: 0;
          top: 0;
          width: 100%;
          height: 100%;
          outline: none;
          opacity: 0;
          z-index: 666;
        }
        .bgImg {
          position: absolute;
          left: 20px;
          top: 30px;
          width: 150px;
          height: 100px;
        }
        .fileImg {
          @extend .bgImg;
          z-index: 66;
        }
        .passportImg {
          @extend .bgImg;
          width: 130px;
          height: 135px;
          top: 20px;
          left: 30px;
        }
        .passportImg1 {
          @extend .passportImg;
          z-index: 66;
        }
        .addIcon {
          position: absolute;
          left: 0;
          top: 0;
          width: 100%;
          height: 100%;
          text-align: center;
          .iconfont {
            color: #616793;
            font-size: 30px;
            display: inline-block;
            margin-top: 65px;
          }
          p {
            text-align: center;
            color: #6F74A6;
            margin-top: 60px;
          }
          .PassportIcon {
            margin-top: 70px;
          }
          .PassportCover {
            margin-top: 65px;
          }
        }
      }
    }
  }

  /*注*/
  .Comment {
    line-height: 35px;
    color: #fff;
  }

  /*确认无误，提交审核*/
  .Submit {
    width: 100%;
    height: 100px;
    button {
      width: 210px;
      height: 45px;
      background: $green;
      color: #fff;
      border-radius: 4px;
      margin-top: 20px;
      font-size: 14px;
      outline: none;
    }
  }

  /*审核*/
  .Review {
    width: 100%;
    li {
      line-height: 30px;
      color: #7575AA;
      font-size: 12px;
    }
  }

  /*视频认证*/
  .Video {
    width: 100%;
    .VideoTitle {
      width: 100%;
      color: #fff;
      font-size: 15px;
      line-height: 40px;
      margin-top: 10px;
    }
    .Face {
      line-height: 25px;
      font-size: 13px;
      color: #9090C8;
    }
    .ERcode {
      width: 100%;
      display: flex;
      align-items: flex-end;
      margin: 20px 0;
      img {
        width: 150px;
        height: 150px;
        border: 1px solid #fff;
      }
      .refresh {
        width: 74px;
        color: $green;
        position: relative;
        text-align: right;
        cursor: pointer;
        margin-bottom: 2px;
        .iconfont {
          position: absolute;
          left: 16px;
          top: -2px;
        }
        .rotate {
          top: -2px !important;
          -webkit-transform: rotate(360deg);
          animation: rotation 1s linear infinite;
          -moz-animation: rotation 1s linear infinite;
          -webkit-animation: rotation 1s linear infinite;
          -o-animation: rotation 1s linear infinite;
        }
      }
    }
  }

  @-webkit-keyframes rotation {
    from {
      -webkit-transform: rotate(0deg);
    }
    to {
      -webkit-transform: rotate(360deg);
    }
  }

  .underReview {
    width: 100%;
    .underReviewTitle {
      width: 100%;
      height: 50px;
      line-height: 50px;
      font-size: 16px;
      display: flex;
      align-items: center;
      margin-top: 20px;
      .iconfont {
        color: #B7B9FF;
        font-size: 20px;
        margin-right: 10px;
      }
      color: #fff;
    }
    .ReviewContent {
      color: #fff;
      line-height: 50px;
      font-size: 14px;
      margin-bottom: 10px;
    }
  }

  /*认证失败*/
  .Authenticationfailed {
    width: 100%;
    .AuthenticationfailedTitle {
      width: 100%;
      height: 50px;
      line-height: 50px;
      font-size: 16px;
      display: flex;
      align-items: center;
      margin-top: 20px;
      .iconfont {
        color: #EF4E52;
        font-size: 20px;
        margin-right: 10px;
      }
      color: #fff;
    }
    .ReasonForFailure {
      color: #fff;
      line-height: 50px;
      font-size: 14px;
      margin-bottom: 10px;
    }
    .Recertification {
      margin-bottom: 20px;
      button {
        width: 192px;
        height: 45px;
        background: $green;
        color: #fff;
        border-radius: 4px;
        outline: none;
        font-size: 14px;
      }
    }
  }

  /*审核成功*/
  .SuccessfulCertification {
    margin-bottom: 20px;
    .SuccessfulCertificationTitle {
      width: 100%;
      height: 50px;
      line-height: 50px;
      font-size: 16px;
      display: flex;
      align-items: center;
      margin-top: 20px;
      .iconfont {
        color: $green;
        font-size: 20px;
        margin-right: 10px;
      }
      color: #fff;
    }
    .SuccessfulCertificationContent {
      width: 448px;
      li {
        width: 100%;
        height: 40px;
        display: flex;
        align-items: center;
        font-size: 14px;
        .Head {
          width: 110px;
          color: #7575AA;
        }
        .tabContent {
          width: 340px;
          color: #fff;
          display: flex;
          justify-content: space-between;
        }
      }
    }
  }
</style>
