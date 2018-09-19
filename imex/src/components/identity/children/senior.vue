<template>
  <div id="advCertify">
    <!--头部标题部分-->
    <div class="header_box">
      <div class="register_header">
        <div class="left" @click="$router.push('/index/userCenter')">
           <i class="iconfont icon-zuojiantou"></i>
           <span>{{$t("userCenter.IdentifyCer")}}</span>
        </div>
       <p class="right" v-if="userInfo.country_id==1&&!SuccessfulCertification&&!underReview&&Certification">
         <span v-if="whetherArtificial" @click="SwitchCertification('vadio')">{{$t("userCenter.VideoSwitch")}}</span>
         <span v-if="!whetherArtificial" @click="SwitchCertification('Artificial')">{{$t("userCenter.SwitchManual")}}</span>
       </p>
      </div>
    </div>
    <!--<div class="oHeight"></div>-->
    <!--认证部分-->
    <div class="Certification" v-if="Certification">
    <!--人工认证-->
    <div class="box" v-if="whetherArtificial">
         <div class="advCerContent realName" v-if="Secondstep">
          <div class="oleft">
            <p class="realNameTitle">{{$t("userCenter.AdvancedCertification")}}</p>
            <p class="smallTitle">{{$t("userCenter.CompleteReal")}}</p>
            <p class="smallTitle">{{$t("userCenter.CompletedAdvanced")}}</p>
            <p class="smallTitle">{{$t("userCenter.GetMoreBenefits")}}</p>
          </div>
           <div style="width:100%;height:0.4rem"></div>
        </div>
       <div class="chainAdv" v-if="Secondstep">
         <!--国内高级名认证内容-->
         <div class="advCerInfowrap">
           <ul class="advCerInfo">
             <li class="advCerInfoItem">
               <p class="item1">
                 <span class="advCerLabel">{{$t("userCenter.Country")}}：</span>
                 <span class="labelVaule">（{{userInfoName}}）</span>
               </p>
               <p class="modify" @click="backVerified">
                 <i class="iconfont icon-xiugai"></i>
                 <span>{{$t("userCenter.Modify")}}</span>
               </p>
             </li>
             <li class="advCerInfoItem">
               <p>
                 <span class="advCerLabel">{{$t("userCenter.Names")}}：</span>
                 <span class="labelVaule">{{userInfo.trueName}}</span>
               </p>
             </li>
             <li class="advCerInfoItem">
               <p>
                 <span class="advCerLabel">{{$t("userCenter.IDnumber")}}：</span>
                 <span class="labelVaule">{{userInfo.idCard}}</span>
               </p>
             </li>
           </ul>
         </div>
         <!--照片要求及以下部分-->
         <div class="mainContent">
           <!--照片要求部分-->
           <div class="photoRequire">
             <p class="photoTitle">{{$t("userCenter.PhotoRequire")}}</p>
             <p class="requireCont">{{$t("userCenter.Rquirements1")}}</p>
           </div>
           <!--上传部分-->
           <div class="uploadPhoto">
             <div class="frontWrap" @change="changePositive($event)">
               <div class="front">
                 <div class="imgWrap">
                   <img  class="imgSize" src="../../../assets/pass.png" v-if="userInfo.country_id!=1" alt="">
                   <img  class="imgSize" src="../../../assets/idCardFront.png" v-if="userInfo.country_id==1" alt="">
                   <img  class="imgSize1" :src="PositiveImg" v-if="PositiveImgIsShow" alt="">
                   <img src="../../../assets/upload.png" class="addImg" alt="">
                 </div>
               </div>
               <p class="uploadText">
                 {{$t("userCenter.UploadCarfront")}}
               </p>
               <input type="file" accept="image/png,image/gif,image/jpg,image/jpeg">
             </div>
             <div class="frontWrap" @change="changeNegative($event)">
               <div class="front">
                 <div class="imgWrap">
                   <img  class="imgSize" src="../../../assets/idCardBack.png" alt="">
                   <img  class="imgSize1" :src="NegativeImg" v-if="NegativeImgIsShow" alt="">
                   <img src="../../../assets/upload.png" class="addImg" alt="">
                 </div>
               </div>
               <p class="uploadText">
                 {{$t("userCenter.UploadCardEmblem")}}
               </p>
               <input type="file" accept="image/png,image/gif,image/jpg,image/jpeg">
             </div>
             <div class="frontWrap" @change="changeHandheldImg($event)">
               <div class="front">
                 <div class="imgWrap">
                   <img  class="imgSize" src="../../../assets/shouchi.png" alt="">
                   <img  class="imgSize1" :src="HandheldImg" v-if="HandheldImgIsShow" alt="">
                   <img src="../../../assets/upload.png" class="addImg" alt="">
                 </div>
               </div>
               <p class="uploadText">
                 {{$t("userCenter.UploadHandheld")}}
               </p>
               <input type="file" accept="image/png,image/gif,image/jpg,image/jpeg">
             </div>
           </div>
           <!--上传说明-->
           <div class="uploadIntro">
             <p>
               <img class="tanMark" src="../../../assets/tanhao.png" alt="">
             </p>
             <div>
               <p>{{$t("userCenter.ReloadNote1")}}</p>
               <p>{{$t("userCenter.ReloadNote2")}}</p>
             </div>
           </div>
           <!--确认无误提交审核按钮-->
           <div class="buttonWrap">
             <button class="examine" @click="SubmitReview">{{$t("userCenter.Submitverify")}}</button>
           </div>
           <!--审核不通过说明-->
           <div class="examineWrap">
             <div class="auditFailed">{{$t("userCenter.FailReview")}}：</div>
             <div class="failedContent">
               <p class="failedItem">
                 <span class="dianhao">●</span>
                 <span>{{$t("userCenter.errors1")}}</span>
               </p>
               <p class="failedItem">
                 <span class="dianhao">●</span>
                 <span>{{$t("userCenter.errors2")}}</span>
               </p>
               <p class="failedItem">
                 <span class="dianhao">●</span>
                 <span>{{$t("userCenter.errors3")}}</span>
               </p>
               <p class="failedItem">
                 <span class="dianhao">●</span>
                 <span>{{$t("userCenter.errors4")}}</span>
               </p>
               <p class="failedItem">
                 <span class="dianhao">●</span>
                 <span>{{$t("userCenter.errors5")}}</span>
               </p>
             </div>
           </div>
         </div>
       </div>
    </div>
    <!--视频认证-->
    <div class="vadio" v-if="!whetherArtificial&&!underReview">
      <iframe :src="ERcode" class="iframe"></iframe>
    </div>
    </div>
    <!--认证信息已提交-->
      <div class="infoSubmitWrap" v-if="underReview">
        <p class="infoSubmit">
          <img src="../../../assets/waitAuthen.png" class="waitImg" alt="">
          <span class="tip1">{{$t("userCenter.CerInfoSubmitted")}}</span>
        </p>
        <p class="submitTip">{{$t("userCenter.BePatient")}}</p>
      </div>
      <!--认证失败-->
      <div class="authenFailed infoSubmitWrap" v-if="Authenticationfailed">
        <p class="infoSubmit">
          <img src="../../../assets/error.png" class="waitImg" alt="">
          <span class="tip1">{{$t("userCenter.AuthenticationFailed")}}</span>
        </p>
        <p class="submitTip">{{$t("userCenter.FailureReason")}}:{{ReasonforFailure}}</p>
        <p class="failedReason">{{$t("userCenter.ReadjustImg")}}</p>
        <p class="buttonWrap"><button class="buttonStyle" @click="Recertification">{{$t("userCenter.ReAuthenticate")}}</button></p>
      </div>
      <!--认证成功-->
      <div class="authenOkWrap" v-if="SuccessfulCertification">
        <div class="authenOk">
          <p class="authenOkTip">
            <img src="../../../assets/success.png" class="waitImg" alt="">
            <span class="tip1 tipColor">{{$t("userCenter.VerifiedSuccessfully")}}</span>
          </p>
          <p class="submitTip">{{$t("userCenter.HaveBeenVerified")}}</p>
        </div>
        <div class="authenOkInfo">
          <div class="advCerInfowrap">
            <ul class="advCerInfo">
              <li class="advCerInfoItem">
                <img src="../../../assets/IMXlogoW.png" class="logoSize" alt="">
              </li>
              <li class="advCerInfoItem">
                <p class="item1">
                  <span class="advCerLabel">{{$t("userCenter.Country")}}：</span>
                  <span class="labelVaule">（{{userInfoName}}）</span>
                </p>
              </li>
              <li class="advCerInfoItem">
                <p>
                  <span class="advCerLabel">{{$t("userCenter.Names")}}：</span>
                  <span class="labelVaule">{{userInfo.trueName}}</span>
                </p>
              </li>
              <li class="advCerInfoItem">
                <p>
                  <span class="advCerLabel">{{$t("userCenter.IDnumber")}}：</span>
                  <span class="labelVaule">{{userInfo.idCard}}</span>
                </p>
              </li>
            </ul>
          </div>
        </div>
      </div>

  </div>
</template>

<script>
  import axios from "axios"
  import { httpUrl } from "../../http_url/http_url"
  import header from "../../public/header"
  import $ from "jquery"
  import {mapState,mapMutations} from "vuex";
  export default {
    data() {
      return {
      /*切换视频认证是否显示国外为true,国内为false*/
        videoScreen:false,
        userInfoName:"", /*用户国籍*/
        idcard_front: "",
        idcard_back: "",
        idcard_holt: "",
        PositiveImg: "",
        PositiveImgIsShow: false,
        NegativeImg: "",
        NegativeImgIsShow: false,
        HandheldImg: "",
        HandheldImgIsShow: false,
        Secondstep: false, /*第二步提交高级认证*/
        underReview: false, /*第二步（正在审核）*/
        Authenticationfailed: false, /*第三步（认证失败）*/
        SuccessfulCertification:false, /*认证成功*/
        ReasonforFailure:"", /*失败原因*/
        whetherArtificial:true, /*默认显示人工认证*/
        ERcode: "", /*高级认证二维码*/
        Certification:true, /*认证部分*/
      }
    },
    methods: {
      ...mapMutations('user',["setUserInfo"]),
      getFaceToken(){ /*获取高级认证视频认证二维码*/
        if (this.userInfo.idCard && this.userInfo.auth_grade != 0) {return};
          axios.get(httpUrl.getFaceToken,{
          headers:{"Authorization":"Bearer "+this.token}
        }).then(res=>{
          this.ERcode = res.data.data.url;
        },err=>{
          console.log(err);
        })
      },
      SwitchCertification(type) { /*切换认证*/
        if (type == 'vadio') { /*切换视频认证*/
          this.whetherArtificial = false;
          this.getFaceToken();
        } else {  /*切换人工认证*/
          this.whetherArtificial = true;
          this.Secondstep = true;
          this.Reset();
          /*重置人工内容*/
        }
      },
      Reset() { /*重置人工内容*/
        this.idcard_front = "";
        this.idcard_back = "";
        this.idcard_holt = "";
        this.positive = false;
        this.Negative = false;
        this.Handheld = false;
      },
      backVerified() { /*实名认证*/
        this.$router.push("/realname"); /*返回实名认证*/
      },
      changePositive(e) { /*上传正面图片*/
        var file = e.target.files[0];
        this.idcard_front = e.target.files[0];
        var windowURL = window.URL;
        var dataURL = windowURL.createObjectURL(file);
        this.PositiveImg = dataURL;
        this.PositiveImgIsShow = true;
      },
      changeNegative(e) { /*上传反面图片*/
        var file = e.target.files[0];
        this.idcard_back = e.target.files[0];
        var windowURL = window.URL;
        var dataURL = windowURL.createObjectURL(file);
        this.NegativeImg = dataURL;
        this.NegativeImgIsShow = true;
      },
      changeHandheldImg(e) { /*上传手持图片*/
        var file = e.target.files[0];
        this.idcard_holt = e.target.files[0];
        var windowURL = window.URL;
        var dataURL = windowURL.createObjectURL(file);
        this.HandheldImg = dataURL;
        this.HandheldImgIsShow = true;
      },
      Recertification() { /*高级认证+重新认证*/
        this.Authenticationfailed = false; /*失败原因消失*/
        this.Certification = true; /*认证部分显示*/
        if (this.userInfo.idCard && this.userInfo.auth_grade == 0 && this.userInfo.country_id == 1) {
          this.whetherArtificial = false;
          this.getFaceToken(); /*获取二维码*/
        } else{
          this.whetherArtificial = true;
          this.Secondstep = true;
        }
      },
      async SubmitReview() { /*提交审核*/
        let _this = this;
        if(_this.idcard_front == "" || _this.idcard_back == "" || _this.idcard_holt == "") {
          _this.$message({
            message:_this.$t("bbjy.Pleaseuploadfullinfo"),
            type: 'error'
          });
          return false;
        }
        this.loadingIsShow = true;
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
          return JSON.stringify(new Date()).split('T')[0].replace(/-|"/g,'')+firstPart + secondPart;
        }
        const uploadFile = async function (file){
          let param = new FormData(); //创建 form对象
          let fileName = file + generateUID()
          param.append("OSSAccessKeyId",config.data.data.accessKeyId);
          param.append("policy",config.data.data.policy);
          param.append("signature",config.data.data.signature);
          param.append("key",fileName);
          param.append('file', _this[file]); //通过append向form对象添加数据
          // await Promise.resolve('');
          let res  = await axios.post(config.data.data.url, param, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          })
          return fileName;
        };
        let uploadRes = await ['idcard_front','idcard_back','idcard_holt'].reduce(async function (pre,cur){
          let p = await pre;
          const path = await uploadFile(cur);
          p[cur] = config.data.data.url+'/'+path;
          // console.log(cur,path,pre);
          return pre;
        }, Promise.resolve({}));
        let res  = await axios.post(httpUrl.uploadCardPath, uploadRes, {
          headers: {
            "Authorization": "Bearer " + _this.token,
          }
        })
        if(res.data.status.code == 200) {
          this.Secondstep = false;
          this.underReview = true;
        }

      },
    },
    mounted() { /*获取用户信息*/
      this.userInfoName = this.userInfo.countryInfo[0].name; /*国籍*/
      if(this.userInfo.auth_grade==0){ /*没有高级认证*/
        this.Secondstep = true;
      }
      if (this.userInfo.idCard && this.userInfo.auth_grade != 0) { /*已实名已高级*/
        this.SuccessfulCertification = true;
      }
      if (this.userInfo.idCard && this.userInfo.auth_grade == 0 && this.userInfo.country_id == 1) {/*国内用户默认显示视频认证*/
        this.whetherArtificial = false;
        this.getFaceToken();
      }
      /*获取信息*/
      this.$ajax.get(this.httpUrl.seniorInfo,{
        headers:{"Authorization": "Bearer " + this.token}
      }).then(res=>{
        if(res.data.data.length!=0){
          if(res.data.data.status!=0&&res.data.data.status!=1){ /*其他原因，没有通过*/
            this.ReasonforFailure = res.data.data.reason_id; /*失败原因*/
            this.Authenticationfailed = true;
            this.SuccessfulCertification = false;
            this.Certification = false;
          }
          if(res.data.data.status==0){ /*正在审核中*/
            this.Secondstep = false;
            this.underReview = true;
          }
        }
      },err=>{
        console.log(err);
      })
      /*获取用户信息*/
      this.$ajax.get(this.httpUrl.userInfo,{
        headers:{"Authorization": "Bearer " + this.token}
      }).then(res=>{
        let userInfo = res.data.data;
        this.setUserInfo({userInfo});
      },err=>{
        console.log(err);
      })
    }
  }
</script>
<style lang="scss">
  #realName .mint-popup { background: #141738; }#realName .mint-popup-right { width: 100%; height: 100%; background: #141738; overflow-y: auto; }
  .waitImg{
    width:0.22rem;
    padding-right:0.05rem;
  }
  .tip1{
    font-size:0.16rem;
    color:#B7B9FF;
  }
  .tipColor{
    color:#00C3B6;
  }
  .submitTip{
    font-size:0.12rem;
    line-height: 0.16rem;
    padding-top:0.15rem;
  }
  .advCerInfowrap{
    width:100%;
    background: linear-gradient(to left ,#282B54,#171933);
    padding:0.17rem 0rem;
    .advCerInfo{
      padding:0rem 0.3rem;
      .advCerLabel{
        color:#7587E0;
        font-weight: bold;
      }
      .labelVaule{
        color:#fff;
      }
      .advCerInfoItem{
        display: flex;
        justify-content: space-between;
        align-items: center;
        line-height:0.28rem;
        .modify{
          color:#25CBC5;
          .modifyImg{
            width:25%;
          }
        }
        .logoSize{
          width:50%;
          padding:0.15rem 0;
        }
      }
    }
  }
</style>
<style lang="scss" scoped>
  $submit_color:#373959;
  /*登录线条*/

  $submit_borderColor:1px solid #9fa0af;
  /*按钮边框颜色*/

  $border_bottom: 1px solid #6F74A6;
  /*列表边框颜色*/

  $placeholder:#6F74A6;
  /*文本提示颜色*/

  $slideRight:#171932;
  /*弹框样式*/

  $header_bg:#141738;
  /*整体的盒子*/

  $dialogue_bg:#1C1E3D;
  /*弹框背景色*/
  #advCertify {
    width: 100%;
    height: 100%;
    color:#fff;
    .header_box{
      width: 100%;
      position:fixed;
      top:0;
      left:0;
      z-index: 999;
      font-size:0.16rem;
      .register_header{
        width: 100%;
        box-sizing: border-box;
        display:flex;
        justify-content: space-between;
        align-items: center;
        color:#fff;
        height:.5rem;
        background: #171933;
        font-size:0.15rem;
        padding:0rem 0.1rem;
        .left{
          display: flex;
        }
        .right{
          color:#25CBC5;
          font-size:0.12rem;
        }
      }
    }
    .oHeight{
      height: .5rem;
    }
    /*国内高级认证*/

      .advCerContent{
        width:100%;
        height:40%;
        color:#fff;
        dispaly:flex;
        justify-content: center;
        align-items: center;
        background: url("http://imxpro.oss-cn-beijing.aliyuncs.com/static/advbanner.png") no-repeat;
        background-size: 100% 108%;
        .oleft{
          color:#6F74A6;
          font-size:0.12rem;
          padding-left:0.3rem;
          padding-top:0.65rem;
          .realNameTitle{
            font-size:0.21rem;
            font-weight: bold;
            color:#7587E0;
            padding-top:0.15rem;
            padding-bottom:0.1rem;
          }
          .smallTitle{
            width:40%;
            line-height: 0.16rem;
            font-size:0.1rem;
          }
        }
      }
      .chainAdv{
        .mainContent{
          padding:0rem 0.3rem;
          .photoRequire{
            padding:0.1rem 0rem;
            .photoTitle{
              color:#7587E0;
              font-size:0.14rem;
              padding-bottom:0.1rem;
              font-weight: bold;
            }
            .requireCont{
              line-height: 0.24rem;
            }
          }
          .uploadPhoto{
            .uploadText{
              margin-top:0.15rem;
              text-align: center;
            }
            .frontWrap{
              height:1.68rem;
              border: 0.01rem dashed #6F74A6;
              border-radius: 0.02rem;
              margin-bottom:0.15rem;
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: center;
              position: relative;
              input {
                position: absolute;
                left: 0;
                top: 0;
                z-index: 999;
                width: 100%;
                height: 100%;
                display: inline-block;
                opacity: 0;
              }
              .front{
                position:relative;
                width:65%;
                margin-top: .1rem;
               .imgWrap{
                  display: flex;
                  justify-content: center;
                  align-items: center;
                }
                .imgSize{
                  width:100%;
                  height: 1rem;
                }
                .imgSize1{
                  position: absolute;
                  width: 100%;
                  height:1.2rem;
                  z-index: 66;
                }
                .passImg{
                  width:80%;
                }
                .addImg{
                  width:20%;
                  position:absolute;
                  left:50%;
                  top:50%;
                  transform: translate(-50%,-50%);
                }
              }
            }
          }
          .uploadIntro{
            display: flex;
            align-items: center;
            margin-bottom:0.3rem;
            .tanMark{
              width:0.23rem;
              padding-right:0.1rem;
            }
            div{
              p{
                line-height: .18rem;
              }
            }
          }
          button{
            margin: 0;
            padding: 0;
            border: none;
            outline: none
          }
          .buttonWrap{
            margin:0.2rem auto;
            .examine{
              width:100%;
              background:#25CBC5;
              border-radius: 0.02rem;
              color:#fff;
              font-size: 0.14rem;
              padding-top:0.1rem;
              padding-bottom:0.1rem;
            }
          }
          .examineWrap{
            margin-bottom:0.43rem;
            .auditFailed{
              font-size:0.13rem;
              color:#7587E0;
              margin-bottom:0.1rem;
              font-weight:bold;
            }
            .failedContent{
              line-height:0.21rem;
              color:#6F74A6;
              .failedItem{
                display: flex;
                .dianhao{
                  padding-right:0.1rem;
                }
              }
            }
          }
        }
      }
      .infoSubmitWrap{
        width:100%;
        min-height:100%;
        padding:0 0.3rem;
        box-sizing: border-box;
        display: flex;
        flex-direction:column ;
        justify-content: center;
        align-items: center;
        text-align: center;
        color:#F1F2FA;
        .infoSubmit{
          text-align: center;
          display: flex;
          align-items: center;
        }
        .failedReason{
          font-size:0.1rem;
          padding-top:0.3rem;
          line-height: 0.18rem;
        }
      }
      .authenFailed{
        padding:0 0.16rem;
        .buttonWrap{
          width:100%;
          button{
            margin: 0;
            padding: 0;
            border: 1px solid transparent;  //自定义边框
            outline: none
          }
          .buttonStyle{
            width:100%;
            background:#25CBC5;
            font-size:0.14rem;
            padding:0.1rem 0rem;
            font-weight:bold;
            margin-top:0.3rem;
          }
        }
      }
      .authenOkWrap{
        margin-top:0.5rem;
        text-align: center;
        .authenOk{
          padding:0.2rem 0rem;
          .authenOkTip{
            display: flex;
            justify-content: center;
            align-items: center;
          }
        }
        .authenOkInfo{
          width:100%;
          background: linear-gradient(to left ,#282B54,#171933);
        }
      }
  }
  /*视频认证*/
  .vadio{
    width: 100%;
    height: 100%;
    position: fixed;
    left: 0;
    top: .5rem;
    .iframe{
      width: 100%;
      height: 100%;
    }
  }

</style>
