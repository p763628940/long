<template>
<div id="voteCoinByMe">
  <div class="voteBg">
    <div class="voteWrapper">
      <!--投票上币由我做主-->
      <div class="voteHeader">
        <div class="bigTitle">投票上币 由你做主</div>
        <div class="explain">
          <p>IMX将于6月18日起正式启动第一期投票上币，经过IMX审核团队的严格审核，第一期参与投票上币的入选项目有X个，我们</p>
          <p>将根据投票结果选择X个项目作为首批投票上线的项目，每一期投票先有超级节点进行投票，超级节点投票结束后，会筛选出X个项目，发起第二轮用户投票，每个超</p>
          <p>级节点和用户有且仅有一票，选择后无法取消或更改。</p>
        </div>
        <div class="buttonList">
          <button class="buttonStyle">投票上币规则</button>
          <button class="buttonStyle">超级节点介绍</button>
          <button class="buttonStyle">上币申请</button>
        </div>
      </div>
      <!--投票进度-->
      <div class="voteProcess">
        <div class="supperNodeVote">
          <div class="time">
            <div class="dowebok">
              <p class="baseP">距结束</p>
              <div class="days">
                <!--三角箭头-->
                <div class="triangleLeft triangleLeft1"></div>
                <div class="triangleRight triangleRight1"></div>
              </div>
              <div class="timeSize">天</div>
              <div class="hours">
                <!--三角箭头-->
                <div class="triangleLeft triangleLeft1"></div>
                <div class="triangleRight triangleRigh2"></div>
              </div>
              <div class="timeSize">时</div>
              <div class="minutes">
                <!--三角箭头-->
                <div class="triangleLeft triangleLeft1"></div>
                <div class="triangleRight triangleRigh2"></div>
              </div>
              <div class="timeSize">分</div>
              <div class="seconds">
                <!--三角箭头-->
                <div class="triangleLeft triangleLeft1"></div>
                <div class="triangleRight triangleRigh2"></div>
              </div>
              <div class="timeSize">秒</div>
            </div>
          </div>
          <div class="voteProcessImg">
          </div>
        </div>
       <!-- <div class="userVote">

        </div>
        <div class="voteResult">

        </div>-->
      </div>
      <!--项目列表-->
      <div class="projectWrapper">
        <div class="projectTitle"><p><span class="bigTitle">项目类表</span><span>  (排名不分先后，按照币种简称首字母进行排序)</span></p><p class="inputStyle"><input type="text" placeholder="搜素币种"><i class="iconfont icon-search iconColor"></i></p></div>
        <div class="projectLists">
          <div class="itemsWrapper"   v-for="item in projectLists">
            <div class="projectItem">
              <div class="fillBorder">
                <div class="oleft">
                  <div class="imageWrapper"><img src="../../assets/coinImg1.png" alt=""></div>
                  <div class="coinInfo">
                    <p class="coinName">
                      <span>
                        {{item.coinName}}
                      </span>
                      <span>
                        {{item.coinShortName}}
                      </span>
                      <span class="textP">{{item.incentiveTotal}}:</span><span class="textSize">{{item.incentiveNum}}</span><span>{{item.coinName}}</span>
                    </p>
                    <p>{{item.projectIntro}}<span class="viewStyle">{{item.viewDetai}}</span></p>
                  </div>
                </div>
                <div class="oright">
                  <button class="voteImediate">立即投票</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</template>
<script>
  import "../../js/jquery.flipTimer.js"
  import $ from "jquery"
    export default {
       data(){
         return{
           projectLists:[
             {
               coinImg:'',
               coinName:'ORT',
               coinShortName:'oheawuerh',
               incentiveTotal:'投票激励总额',
               incentiveNum:'30000',
               projectIntro:'融合了公有链，联盟链，跨链和打通数据流与项目介绍',
               viewDetai:'查看项目详情>>'
             },{
               coinImg:'',
               coinName:'ORT',
               coinShortName:'oheawuerh',
               incentiveTotal:'投票激励总额',
               incentiveNum:'30000',
               projectIntro:'融合了公有链，联盟链，跨链和打通数据流与项目介绍',
               viewDetai:'查看项目详情>>'
             },{
               coinImg:'',
               coinName:'ORT',
               coinShortName:'oheawuerh',
               incentiveTotal:'投票激励总额',
               incentiveNum:'30000',
               projectIntro:'融合了公有链，联盟链，跨链和打通数据流与项目介绍',
               viewDetai:'查看项目详情>>'
             }
           ],
          }
       },
      mounted(){
        $(function(){
          var d =new Date();
          var myDate = d.getFullYear() + '/' + (d.getMonth() + 1) + '/' + (d.getDate()+1) + ' 00:00:00';
          console.log("data:");
          console.log(myDate);

          $('.dowebok').flipTimer({
            direction: 'down',
            date: myDate
          });
        });
      }
    }
</script>
<style>
@import "../../style/flipTimer.css";
</style>
<style lang="scss" scoped>
#voteCoinByMe{
  background: #0F1225;
  width:100%;
  min-height:100%;
  color:#fff;
  padding-bottom:110px;
  box-sizing: border-box;
  .voteBg{
    width:100%;
    height:100%;
    background: url(../../assets/voteBanner.png) no-repeat;
    background-size:100% 100%;
    .voteWrapper{
      width:1200px;
      margin:0 auto;
      .voteHeader{
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;
        padding-top:110px;
        padding-bottom:70px;
        .bigTitle{
          font-size:40px;
        }
        .explain{
          font-size:16px;
          line-height: 38px;
          padding-top:35px;
          padding-bottom:64px;
        }
        .buttonList{
          display: flex;
          justify-content: center;
          align-items: center;
          .buttonStyle{
            font-size:16px;
            padding: 16px 36px;
            background: #16b7bc;
            border-radius: 3px;
            margin-right:40px;
            color:#fff;
          }
        }
      }
      .voteProcess,.userVote,.voteResult{
        .supperNodeVote{
          width:100%;
          background: linear-gradient(#2c3053,#121429);
          box-shadow:0px 5px 6px #010105;
          .voteTitle{
            font-size:18px;
            color:#06eaee;
            line-height:48px;
          }
          .time{
            display: flex;
            justify-content: space-around;
            padding:30px 116px;
            .dowebok{
              display:flex;
              .triangleLeft{
                width: 0;
                height: 0;
                border-top: 6px solid transparent;
                border-bottom: 6px solid transparent;
                border-left: 6px solid #abb1b5;
              }
              .triangleLeft1{
                top: 45px;
                position: absolute;
                z-index: 999;
                left: 3px;
              }
              .triangleRight{
                width: 0;
                height: 0;
                border-top: 6px solid transparent;
                border-bottom: 6px solid transparent;
                border-right: 6px solid #abb1b5;
              }
              .triangleRight1{
                position: absolute;
                top: 45px;
                z-index: 999;
                right: 3px;
              }
              .triangleRigh2{
                position: absolute;
                top: 45px;
                z-index: 999;
                right: 3px;
              }
              .baseP{
                font-size:16px;
                padding-top:30px;
                padding-right:15px;
              }
              .timeSize{
                font-size:16px;
                padding:30px 15px 0px 15px;
              }
            }
            .viewVote{
              color:#0ddbe3;
              margin-top: 30px;
            }
            .timeCard{
              width:64px;
              height:64px;
              background: #101a23;
              box-shadow: 2px 2px 4px #101a23;
            }
          }
          .voteProcessImg{
            display: flex;
            justify-content: center;
            align-items: center;
            font-size:14px;
            padding:0px 116px;
            .supperNode{
              display: flex;
              flex-direction: column;
              align-items: center;
              padding-bottom:30px;
            }
            .dashed1{
              width:295px;
              height:1px;
              border-bottom:1px solid red;
            }
          }
        }
      }
      .projectWrapper{
        background: #04071a;
        margin-top:20px;
        box-sizing: border-box;
        .projectTitle{
          background: #12172d;
          padding-left:50px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-right:44px;
          height:80px;
          .bigTitle{
            font-size:20px;
          }
          input{
            background: none;
            border:none;
            outline: none;
          }
          input::placeholder{
            color:#9399be;
          }
          .inputStyle{
            display: flex;
            justify-content: space-around;
            align-items: center;
            width: 224px;
            height:40px;
            background: none;
            outline: none;
            border: 1px solid #5d5f78;
            border-radius: 3px;
            box-sizing: border-box;
            padding-left:20px;
            .iconColor{
              color:#5d5f78;
            }
          }
        }
        .projectLists{
          .itemsWrapper{
            .projectItem{
              padding:50px 50px 0px 50px;
              font-size:14px;
              .fillBorder{
                display: flex;
                justify-content: space-between;
                align-items: center;
                border-bottom:1px solid #1e2553;
                padding-bottom:50px;
                .oleft{
                  display: flex;
                  .imageWrapper{
                    margin-right:37px;
                  }
                  .coinInfo{
                    .coinName{
                      margin-bottom:40px;
                      .textP{
                        margin-left: 20px;
                      }
                      .textSize{
                        font-size: 20px;
                        padding:0px 10px;
                      }
                    }
                    p{
                      .viewStyle{
                        margin-left:20px;
                        color:#16b7bc;
                      }
                    }
                  }
                }
                .oright{
                  .voteImediate{
                    background: #5fc8c4;
                    width:100px;
                    color:#fff;
                    padding:10px 20px;
                    border-radius: 2px;
                  }
                }
              }

            }
          }
        }
      }
    }
  }
}
</style>
