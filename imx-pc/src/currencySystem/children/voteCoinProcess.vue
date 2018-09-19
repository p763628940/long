<template>
  <div id="processWrapper">
    <div class="bgWrapper">
      <!--投票上币流程头部-->
      <ul class="heard">
        <div class="flowTitle">
          <p class="bigTitle">投票上币流程</p>
          <p class="instructions">IMX交易所在打造社区社区自治的去中心化交易平台，通过101个超级节点和用户投票决策的方式实现投票上币，项目方无需交纳保证金和高额的上币费，为优质区块链项目免费提供上币服务。</p>
          <div class="ButtonWrapper">
            <router-link to="/index/currencySystem"><button class="applyButton">立即申请</button></router-link>

          </div>
        </div>
      </ul>
      <div class="flowCart">
      <!--投票上币流程内容部分-->
      <div class="processWarpper">
        <div class="processContent">
          <!--流程图左边-->
          <div class="leftWrapper">
            <div class="oleft oleft1">
              <div class="oleftContent">
                <div class="process1">
                  <img src="../../assets/fillApplication.png" alt="" class="img1">
                </div>
                <div class="oleftText">
                  <p class="textTitle">填写申请表</p>
                  <p class="textContent">填写项目申请表,准备《智能合约代码审计报告》《法律意见书》等资料 ，</p>
                  <router-link to="/index/currencyRules" class="view">详情请查看 《IMX投票上币申请》</router-link>
                </div>
              </div>
              <div class=" serialNum">
                <div class="circle">1<div class="dashed1"></div></div>
              </div>
            </div>
            <div class="oleft oleft2">
              <div class="oleftContent">
                <div class="process1">
                  <img src="../../assets/nodeVote.png" alt="" class="img3">
                </div>
                <div class="oleftText">
                  <p class="textTitle">超级节点投票</p>
                  <p class="textContent">超级节点投票此项目表示推荐该项目上交易对
                    。超级节点投票的结果，按照票数从高到低进入用户投票列表。
                    超级节点获取全票支持的项目可直接上线交易对</p>
                </div>
              </div>
              <div class="serialNum">
                <div class="circle">3<div class="dashed3"></div></div>
              </div>
            </div>
            <div class="oleft oleft3">
              <div class="oleftContent">
                <div class="process1">
                  <img src="../../assets/voteResult.png" alt="" class="img5">
                </div>
                <div class="oleftText">
                  <p class="textTitle">投票结果</p>
                  <p class="textContent">每期投票结束后，胜出项目及不参加下期投票的落选项目，会下架投票，本期落选项目若继续参加下期投票，用户可手动选择退票，且项目方下期初始票数依据用户手动退票情况重新计算。</p>
                </div>
              </div>
              <div class="serialNum">
                <div class="circle circle5">5 <div class="dashed5"></div></div>
              </div>
            </div>
          </div>
          <!--流程图右边-->
          <div class="rightWrapper">
            <div class="paddingDiv"></div>
            <div class="oright oright1" >
              <div class="serialNum">
                <div class="circle">2 <div class="dashed2"></div></div>
              </div>
              <div class="orightContent">
                <div class="process2">
                  <img src="../../assets/review.png" alt="" class="img2">
                </div>
                <div class="orightText">
                  <p class="textTitle">项目审核</p>
                  <p class="textContent">对项目方的资质及政策风险、商业模式及市场规模、代币生态建设及分配、核心团队和投资机构、社群及市场运营情况等方面进行审核。</p>
                </div>
              </div>
            </div>
            <div class="oright oright2" >
              <div class="serialNum">
                <div class="circle circle4">4<div class="dashed4"></div></div>
              </div>
              <div class="orightContent">
                <div class="process2">
                  <img src="../../assets/usersVote.png" alt="" class="img4">
                </div>
                <div class="orightText">
                  <p class="textTitle">用户投票</p>
                  <p class="textContent">普通用户投票，已认证用户持币量每增加1千票可多获得一票。
                    未认证用户持有IMX币每增加2千票可多获得一票。</p>
                </div>
              </div>
            </div>
            <div class="oright oright1" >
              <div class="serialNum">
                <div class="circle circle6">6</div>
              </div>
              <div class="orightContent">
                <div class="process2">
                  <img src="../../assets/scheduling.png" alt="" class="img6">
                </div>
                <div class="orightText">
                  <p class="textTitle">上币排期</p>
                  <p class="textContent">每期选择1个项目上线：获得3个及以上超级节点支持且得票数前1名者胜出；如得票数相同，则专业投资人支持数较高的项目胜出。</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!--分润模式-->
      <div class="pattern">
        <p class="patternTitle">分润模式</p>
        <div class="circleWrapper">
          <div class="smallCircle">
            <img src="../../assets/point.png" alt="">
          </div>
        </div>
        <p class="patternContent">项目发行方需需提供token总量的百分之一</p>
      </div>
      <!--分润模式内容-->
      <div class="fenRunModle">
        <div class="tokenTotal"></div>
        <div class="tokenText">token总量1%分配模式</div>
        <!--饼图部分-->
        <div class="pieWrap">
          <div class="pieMinddle">
            <div class="pieLeft">
              <p class="paddingTop">超级节点（投中者）30%</p>
              <p>系统用户（投中这）40%</p>
            </div>
            <img src="../../assets/distribution.png" alt="">
            <div class="pieRight">
              <p>安全审核公司10</p>
              <p class="paddingBot">项目推荐人20%</p>
            </div>
          </div>
        </div>
      </div>
      <!--IMX平台优势-->
      <div class="pattern">
        <p class="patternTitle">IMX平台优势</p>
        <div class="circleWrapper">
          <div class="smallCircle"><img src="../../assets/point.png" alt=""></div>
        </div>
      </div>
      <!--IMX平台优势-->
      <div class="advantageWrapper">
        <ul class="advantage">
          <li class="advItem">
            <div class="advImg">
              <img src="../../assets/freeMoney.png" alt="">
            </div>
            <div class="advText">
              <p class="advTitle">免费上币</p>
              <p class="advP">0门槛、免费上币，实现优质项目和交易平台双赢的良好生态体系</p>
            </div>
          </li>
          <li class="advItem">
            <div class="advImg">
              <img src="../../assets/Community.png" alt="">
            </div>
            <div class="advText">
              <p class="advTitle">社区自治</p>
              <p class="advP">全球分布式101个超级节点+10000个超级用户+普通用户实现社区平等自治</p>
            </div>
          </li>
          <li class="advItem">
            <div class="advImg">
              <img src="../../assets/integration.png" alt="">
            </div>
            <div class="advText">
              <p class="advTitle">钱包交易一体化</p>
              <p class="advP">实现钱包存储、糖果空投、淘币、交易等一体化的服务体系</p>
            </div>
          </li>
          <li class="advItem">
            <div class="advImg">
              <img src="../../assets/MultiSystem.png" alt="">
            </div>
            <div class="advText">
              <p class="advTitle">多层架构系统</p>
              <p class="advP">通过多层次架构系统，保证每一环节的技术安全，确保交易资金安全流转。</p>
            </div>
          </li>
        </ul>
      </div>
    </div>
    </div>
    <!--页脚-->
    <my-footer></my-footer>
  </div>
</template>

<script>
  import footer from "../../components/public/Homefooter"
  export default {
    data(){
      return{

      }
    },
    components:{
      "my-footer":footer
    }
  }
</script>

<style lang="scss" scoped>
  #processWrapper{
    width:100%;
    min-height:100%;
    background-color:#0e1122;
    font-size:15px;
    color:#fff;
    box-sizing: border-box;
    .bgWrapper{
      background: url(../../assets/topBg.png) no-repeat;
    }
    .heard{
      display:flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      width:100%;
      .flowTitle{
        width:51%;
        text-align: center;
        padding-top:93px;
        box-sizing: border-box;
        font-size:38px;
        .bigTitle{
          font-size:30px;
          padding-bottom: 30px;
          box-sizing: border-box;
        }
        .instructions{
          font-size:13.5px;
          line-height: 40px;
          box-sizing: border-box;
          padding-bottom:44px;
        }
        .ButtonWrapper{
          width:100%;
          color:#fff;
          box-sizing: border-box;
          .applyButton{
            width:200px;
            background: #26cbc5;
            color:#fff;
            padding:16px 0px;
            font-size: 18px;
            border-radius: 3px;
            margin-bottom:70px;
          }
        }
      }
    }
    .flowCart{
      width:1200px;
      height:100%;
      margin:0 auto;
      box-sizing: border-box;
      .processWarpper{
        width:100%;
        margin:80px 0px;
        .processContent{
          display:flex;
          width:100%;
          marrgin:0 auto;
          box-sizing: border-box;
          .leftWrapper{
            flex:1;
            width:50%;
            box-sizing: border-box;
            display:flex;
            flex-direction: column;
            align-items: center;
            .oleft{
              box-sizing:border-box;
              display: flex;
              flex:0 0 1;
              .oleftContent{
                box-sizing: border-box;
                width:58%;
                .process1{
                  box-sizing: border-box;
                  .img1{
                    width:192px;
                  }
                  .img3{
                    width:272px;
                    margin-top:40px;
                  }
                  .img5{
                    margin-top: 100px;
                    width: 272px;
                  }
                }
                .oleftText{
                  width:100%;
                  box-sizing:border-box;
                  .textTitle{
                    box-sizing:border-box;
                    font-size: 18px;
                    line-height:24px;
                    margin-bottom: 15px;
                    margin-top:45px;
                  }
                  .textContent{
                    box-sizing:border-box;
                    font-size:12px;
                    line-height: 30px;
                    color:#586f99;
                  }
                  .view{
                    box-sizing:border-box;
                    font-size:12px;
                    color:#27c2be;
                    margin-top: 10px;
                  }
                }
              }
              .serialNum{
                width:38%;
                display: flex;
                justify-content: center;
                align-items: center;
                .circle{
                  text-align: center;
                  width: 50px;
                  height: 50px;
                  border-radius: 25px;
                  background-color: #fff;
                  color:#1d70fe;
                  line-height: 50px;
                  position:relative;
                  font-size:16px;
                  font-weight: bold;
                  margin-top: -30px;
                  .dashed1{
                    width:0px;
                    border:2px dashed #fff;
                    position:absolute;
                    height: 371px;
                    transform: rotate(-48deg);
                    top: -12px;
                    left: 176px;
                  }
                  .dashed3{
                    width:0px;
                    border:2px dashed #fff;
                    position:absolute;
                    height: 465px;
                    transform: rotate(-34deg);
                    top: 8px;
                    left: 160px;
                  }
                  .dashed5{
                    width:0px;
                    border:2px dashed #fff;
                    position:absolute;
                    height: 470px;
                    transform: rotate(-34deg);
                    top: 9px;
                    left: 158px;
                  }
                }
                .circle5{
                  margin-top:120px;
                }
              }
            }
          }
          .rightWrapper{
            flex:1;
            width:50%;
            box-sizing: border-box;
            display:flex;
            flex-direction: column;
            align-items: center;
            .paddingDiv{
              height:277px;
            }
            .oright{
              box-sizing:border-box;
              flex:0 0 1;
              display: flex;
              justify-content: flex-end;
              .orightContent{
                box-sizing: border-box;
                width:58%;
                .process2{
                  box-sizing: border-box;
                  display: flex;
                  justify-content: flex-end;
                  .img2{
                    width: 275px;
                  }
                  .img4{
                    width:267px;
                    margin-top: 148px;
                  }
                  .img6{
                    width:280px;
                    margin-top:168px;
                  }
                }
                .orightText{
                  box-sizing:border-box;
                  margin-left:72px;
                  .textTitle{
                    box-sizing:border-box;
                    font-size: 18px;
                    line-height:24px;
                    margin-bottom: 15px;
                    margin-top:47px;
                  }
                  .textContent{
                    box-sizing:border-box;
                    font-size:12px;
                    line-height: 30px;
                    color:#586f99;
                  }
                  .view{
                    box-sizing:border-box;
                    font-size:16px;
                    color:#27c2be;
                    margin-top: 10px;
                  }
                }
              }
              .serialNum{
                width:38%;
                display: flex;
                justify-content: center;
                align-items: center;
                .circle{
                  text-align: center;
                  width: 50px;
                  height: 50px;
                  border-radius: 25px;
                  background-color: #fff;
                  color:#1d70fe;
                  line-height: 50px;
                  position:relative;
                  margin-top: -60px;
                  font-size:16px;
                  font-weight: bold;
                  .dashed2{
                    width:0px;
                    height:100px;
                    border:2px dashed #fff;
                    position: absolute;
                    transform: rotate(54deg);
                    position: absolute;
                    height: 293px;
                    top: -24px;
                    left: -122px
                  }
                  .dashed4{
                    width:0px;
                    border:2px dashed #fff;
                    position: absolute;
                    transform: rotate(51deg);
                    position: absolute;
                    height: 300px;
                    top: -19px;
                    left: -117px;
                  }
                }
                .circle4{
                  margin-top: 50px;
                }
                .circle6{
                  margin-top:40px;
                }
              }
            }
          }
        }
      }
      .pattern{
        display: flex;
        flex-direction: column;
        align-items: center;
        .circleWrapper{
          display: flex;
          justify-content: center;
          align-items: center;
          margin-right: 5px;
          padding-top:22px;
          padding-bottom:28px;
          position:relative;
          .smallCircle{

          }
        }
        .patternTitle{
          font-size:24px;
        }
        .patternContent{
          font-size:17px;
        }
      }
      .fenRunModle{
        margin:100px 0px;
        width:100%;
        position: relative;
        .tokenTotal{
          width:90px;
          height:85px;
          background: #0475f7;
          border-radius: 4px;
        }
        .tokenText{
          font-size:18px;
          position: absolute;
          top:35px;
          left:35px;
        }
        .pieWrap{
          width:100%;
          display: flex;
          justify-content: center;
          align-items: center;
          margin-left:30px;
          .pieMinddle{
            position:relative;
            img{
              width:453px;
            }
            .pieLeft{
              position:absolute;
              left:-46%;
              top:27%;
              .paddingTop{
                margin-bottom:70px;
              }
            }
            .pieRight{
              right:-30%;
              top:2%;
              position:absolute;
              .paddingBot{
                margin-top:63px;
              }
            }
          }
        }
      }
      .advantageWrapper{
        width:100%;
        margin: 0 auto;
        .advantage{
          display:flex;
          justify-content: center;
          align-items: center;
          text-align: center;
          padding-top:115px;
          padding-bottom: 136px;
          .advItem{
            flex:1;
            .advImg{
              vertical-align: middle;
              img{
                width:90px;
              }
            }
            .advText{
              display: flex;
              flex-direction: column;
              align-items: center;
              padding-top:40px;
              .advP{
                font-size:14px;
                width:130px;
                color:#536895;
                line-height: 20px;
              }
              .advTitle{
                font-size:14px;
                line-height: 40px;
              }
            }
          }
        }
      }
    }
  }
</style>
