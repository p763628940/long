<template>
  <div id="whatSupperNode">
    <!--什么是超级节点banner-->
    <div class="supperNodeBanner">
      <div class="head">
        <div class="supperTitle">什么是超级节点</div>
        <p class="rules">IMX将于6月18日起正式启动第一期投票上币，经过IMX审核团队的严格审核，第一期参与投票上币的入选项目有X个，</p>
        <p class="rules">我们将根据投票结果选择X个项目作为首批投票上线的项目，每一期投票先有超级节点进行投票，超级节点投票结束后，会筛选出X个项目，发起第二轮用户投票，</p>
        <p class="rules">每个超级节点和用户有且仅有一票，选择后无法取消或更改</p>
        <div class="ButtonWrapper">
          <button class="applyButton">
            申请成为超级节点
          </button>
        </div>
      </div>
    </div>
    <!--超级节点成员列表-->
    <div class="supperLists">
      <div class="supperNodeTitle">超级节点成员</div>
      <div class="supperNodeWrappper">
        <ul class="superNodeContent">
          <li class="nodeItem" v-for="item in userExtraList1">
            <div class="itemLeft" @click="userDetail(item.uid)"><img :src="item.head_url" alt="" class="imgSize"></div>
            <div class="itemRight">
              <p class="nodeName">{{item.name}}</p>
              <p class="nodeIntro">{{item.intro}}</p>
              <p class="viewDetail">
                <span>></span>
                <span @click="userDetail(item.uid)" style="cursor:pointer">查看详情</span>
              </p>
            </div>
          </li>
        </ul>
        <!--申请成为超级节点按钮-->
        <div class="ButtonWrapper">
          <button class="applyButton">申请成为超级节点</button>
        </div>
      </div>
    </div>
    <!--页脚-->
    <my-footer></my-footer>
  </div>
</template>

<script src="./main.js">

</script>
<style lang="scss">
  /*申请成为超级节点按钮公共样式*/
  .ButtonWrapper {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
<style lang="scss" scoped>
  #whatSupperNode {
    width: 100%;
    min-height: 100%;
    background-color: #0e1122;
    color: #e2e3ec;
    .supperNodeBanner {
      width: 100%;
      height: 500px;
      background-image: url(../../assets/supperBanner.png);
      background-size: 100% 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      .head {
        height: 55%;
        display: flex;
        text-align: center;
        flex-direction: column;
        align-items: center;
        box-sizing: border-box;
        .supperTitle {
          font-size: 36px;
          padding-bottom: 30px;
        }
        .rules {
          font-size: 16px;
          line-height: 40px;
        }
        /*申请成为超级节点按钮*/
        .applyButton {
          width: 200px;
          padding-top: 16px;
          padding-bottom: 16px;
          background-color: #26cbc5;
          border-radius: 2px;
          font-size: 16px;
          color: #fff;
          margin-top: 40px;
        }
      }
    }
    .supperLists {
      width: 1200px;
      margin: 0 auto;
      .supperNodeTitle {
        font-size: 17px;
        height: 52px;
        line-height: 52px;
        padding-left: 50px;
        background: #12162e;
        border-top-left-radius: 4px;
        border-top-right-radius: 4px;
        box-shadow: -2px 8px 8px #030303;
      }
      .supperNodeWrappper {
        width: 100%;
        height: 100%;
        background: #040719;
        .superNodeContent {
          width: 100%;
          box-sizing: border-box;
          padding: 0px 50px 0px 50px;
          .nodeItem {
            width: 100%;
            display: flex;
            box-sizing: border-box;
            border-bottom: 1px solid #1e2553;
            padding-bottom: 36px;
            padding-top: 50px;
            .itemLeft {
              flex: 0 0 98px;
              img {
                width:63px;
                height:48px;
              }
            }
            .itemRight {
              flex: 1;
              .nodeName {
                font-size: 15px;
                font-weight: bold;
                padding-bottom: 20px;
              }
              .nodeIntro {
                line-height: 30px;
                font-size: 13px;
              }
              .viewDetail {
                display: flex;
                color: #15abb1;
                padding-top: 20px;
                font-size: 14px;
                flex-direction: row-reverse;
              }
            }
          }
        }
        /*申请成为超级节点按钮*/
        .applyButton {
          width: 200px;
          padding-top: 16px;
          padding-bottom: 16px;
          background-color: #26cbc5;
          border-radius: 2px;
          font-size: 16px;
          color: #fff;
          margin: 70px 0px;
        }
      }
    }
  }
</style>
