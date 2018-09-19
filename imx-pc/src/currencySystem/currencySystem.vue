<template>
  <div id="currencySystem">
    <div class="applyCurrency">
      <div class="applyTitle">IMX上币申请</div>
      <!--上币申请需填写信息-->
      <div class="applayWrapper">
        <div class="applayContent">
          <div class="fillInfo">IMX平台上币需按要求填写以下信息</div>
          <div class="infoContent">
            <div class="oleft">
              <img src="../assets/infomation.png" alt="">
            </div>
            <!--右边须填写信息部分-->
            <div class="oright">
              <div class="verticalBar">
                <div class="HollowCircle"></div>
                <div class="VertLine"></div>
                <div class="solidCircle"></div>
                <div class="VertLine"></div>
                <div class="HollowCircle"></div>
                <div class="VertLine"></div>
                <div class="solidCircle"></div>
              </div>
              <div class="infoType">
                <div class="googleType">
                  <p class="type1">谷歌表单资料</p>
                  <p>https://goo.gl/forms/jwjm8SClOYEuC8hr1</p>
                  <p>
                    <el-checkbox v-model="isShow1">我已完成谷歌表单填写</el-checkbox>
                  </p>
                </div>
                <div class="imxType">
                  <p class="type1">IMX上币项目基本资料</p>
                  <p @click="goto" class="amgoto"> https:info.imx.com</p>
                  <p>
                    <el-checkbox v-model="isShow2">我已完成IMX项目基本资料表单填写</el-checkbox>
                  </p>
                </div>
                <div>
                </div>
              </div>
            </div>
          </div>
          <!--底部-->
          <div class="bottom">
            <div class="bottomIntro">
              <div class="bottomContent">
                <p><span class="redColor">*</span>完成所有资料上传后请勾选以上选项。并且点击“确认”按钮完成上币申请</p>
                <p>
                  <el-checkbox v-model="isShow3">我已阅读并同意</el-checkbox>
                  <router-link target="_blank" to="/index/currencyRules" class="textColor"><span>《</span>IMX平台上币规则<span>》</span>
                  </router-link>
                </p>
              </div>
            </div>
            <!--确认按钮-->
            <div class="buttonWrap">
              <button :class="{buttonBasci:1,confirmDis:!isActive,confirmActive:isActive}"@click="conform()">确认</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!--弹框部分-->
    <div class="men_ban" v-if="isShow"></div>
    <div class="conformDialog" v-if="isShow">
      <div class="confirmTop">
        <div class="title">
            <p> 申请成功！</p>
        </div>
        <div class="content">
          <div class="contentItem">
            <p>10-20个工作日会对提交的资料进行审核，</p>
            <p>审核期间会通过您填写的联系方式进行沟通确认！</p>
          </div>
        </div>
      </div>
      <div class="confirm">
        <div class="conformWrapper">
          <router-link to="/index/voteCoinProcess" class="conform">确认</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data(){
      return {
        isShow:false,//确认弹框是否现实
        isShow1:false,
        isShow2:false,
        isShow3:false,
      }
    },
    computed:{
      isActive(){
        return this.isShow1&&this.isShow2&&this.isShow3
      }

    },
    methods:{
      //链接到上币申请填写
      goto(){
        this.$router.push({
          path: "/index/Applicationcurrencymore"
        });
      },

      conform(){
        if(this.isActive){
          this.isShow = true;
        }
      }

    },
  }
</script>
<style lang="scss">
  #currencySystem {
    .el-checkbox__inner {
      background: none;
    }
    .el-checkbox {
      color: #afb4d2;
    }
    .el-checkbox__input.is-checked + .el-checkbox__label {
      color: #26cbc5;
    }
    .el-checkbox__input.is-checked .el-checkbox__inner, .el-checkbox__input.is-indeterminate .el-checkbox__inner {
      background-color: #26cbc5;
      border-color: #26cbc5;
    }
  }
</style>
<style lang="scss" scoped>
  
  $bgColor: #040719;
  #currencySystem {
    width: 100%;
    .amgoto{
      cursor: pointer;
    }
    .applyCurrency {
      width: 1200px;
      margin: 0 auto;
      padding-bottom: 140px;
      color: #afb4d2;
      .applyTitle {
        background: $bgColor;
        color: #fff;
        font-size: 20px;
        padding: 20px 35px;
        margin-top: 54px;
        margin-bottom: 35px;
        border-radius: 4px;
      }
      .applayWrapper {
        width: 100%;
        background: $bgColor;
        border-radius: 4px;
        .applayContent {
          width: 100%;
          box-sizing: border-box;
          padding: 30px 80px 0 30px;
          .fillInfo {
            font-size: 16px;
            margin-bottom: 75px;
          }
          .infoContent {
            display: flex;
            .oleft {
              padding-left: 140px;
              padding-right: 140px;
              box-sizing: border-box;
            }
            .oright {
              display: flex;
              margin-left: 30px;
              .verticalBar {
                padding-top: 10px;
                width: 10px;
                display: flex;
                flex-direction: column;
                align-items: center;
                .HollowCircle {
                  width: 8px;
                  height: 8px;
                  border: 2px solid #26cbc5;
                  border-radius: 50%;
                }
                .VertLine {
                  width: 0px;
                  height: 80px;
                  border: 0.5px solid #fff;
                }
                .solidCircle {
                  width: 6px;
                  height: 6px;
                  border-radius: 3px;
                  background: #fff;
                }
              }
              .infoType {
                margin-left: 12px;
                .googleType {
                  margin-bottom: 60px;
                  .type1 {
                    color: #fff;
                    font-size: 16px;
                  }
                  p {
                    line-height: 40px;
                  }
                }
                .imxType {
                  .type1 {
                    color: #fff;
                    font-size: 16px;
                  }
                  p {
                    line-height: 40px;
                  }
                }
              }
            }
          }
          .bottom {
            color: #afb4d2;
            padding: 70px 0px;
            .bottomIntro {
              .redColor {
                color: #cc182e;
              }
              .textColor {
                color: #16b7bc;
              }
              .bottomContent {
                font-size: 14px;
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 17px;
              }
            }
            .buttonWrap {
              display: flex;
              justify-content: flex-end;
              align-items: center;
              .buttonBasci {
                font-size: 16px;
                width: 160px;
                padding: 12px 0px;
                border-radius: 3px;
                color: #fff;
              }
              .confirmDis {
                background: #a9a9a9;
              }
              .confirmActive {
                background: #16b7bc;
              }
            }
          }
        }
      }
    }
    /*上币申请弹框*/
    .men_ban {
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.5);
      position: fixed;
      left: 0;
      top: 0;
      z-index: 66;
    }
    .conformDialog{
      width:560px;
      height:320px;
      box-sizing: border-box;
      border-radius: 4px;
      background: #fff;
      margin-left: -280px;
      margin-top: -115px;
      position: fixed;
      left: 50%;
      top: 50%;
      z-index: 99;
      .confirmTop{
        height:215px;
        border-bottom:1px solid #d8d8d8;
        box-sizing: border-box;
        .title{
          font-size:18px;
          text-align: center;
          color:#1e1d54;
          padding-top:54px;
        }
        .content{
          box-sizing: border-box;
          padding:30px;
          display: flex;
          justify-content: center;
          align-items: center;
          font-size:16px;
          line-height:40px;
          color:#aaadb9;
          .contentItem{
            text-align: center;
          }
        }
      }
      .confirm{
        height:105px;
        box-sizing: border-box;
        display: flex;
        justify-content: center;
        align-items: center;
        .conformWrapper{
          box-sizing: border-box;
          width:200px;
          display: flex;
          justify-content: center;
          align-items: center;
          a{
            display: block;
            width:200px;
          }
          .conform{
            color:#fff;
            text-align: center;
            box-sizing: border-box;
            width:200px;
            background: #16b7bc;
            font-size:16px;
            padding:15px 0px;
            border-radius: 3px;
          }
        }
      }
    }
  }
</style>
