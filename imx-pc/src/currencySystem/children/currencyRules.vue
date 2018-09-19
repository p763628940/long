<template>
  <div id="currencyRules">
    <!--IMX平台上币规则的内容部分-->
    <div class="currencyContainer" :class="{'white-text':getColor==1}">
      <div class="currencyTitle" :class="{'white-active-bg':getColor==1}">
        <p class="text">IMX平台上币规则</p>
      </div>
      <!--IMX平台上币规则内容部分-->
      <div class="currency_information" :class="{'font_color':getColor==1}">
        <!--提示内容部分-->
        <div class="content">
          <ul class="instructions">
            <li class="content_title">
              <p class="bigTitle">上线币种说明及申请</p>
              <p class="smallTitle">为了保护投资者的利益，IMX交易所会对申请上线的新型数字资产进行评估，待评估的Coin/Token需要满足如下条件，包含但不限于</p>
              <div class="innerContent">
                <p>• 有实际技术支撑或有实际应用的项目</p>
                <p>• 项目无政策风险并且达到专业和合规要求</p>
                <p>• 强有力的团队或社区维护</p>
                <p>• 能真实及时披露项目信息包含项目白皮书，定期发展及进度报告</p>
                <p>• 交易平台关于上线币种交易的其他要求</p>
              </div>
            </li>
            <li class="content_title">
              <p class="bigTitle">下线币种说明</p>
              <p class="smallTitle">为保护投资者利益，IMX交易所保留项目下线或继续支持项目在平台上交易的权利，项目方如果触发如下条件，我们会公告通知交易下线，包含但不限于：</p>
              <div class="innerContent">
                <p>• 项目团队解散或项目运营团队主动要求下线</p>
                <p>• 项目方面临重大法律问题</p>
                <p>• 严重的技术或安全问题没有及时得到解决</p>
                <p>• 在连续30个交易日，每日交易额小于10万美金</p>
                <p>• 连续5个交易日出现零成交</p>
                <p>• 信息披露出现重大偏差</p>
                <p>• 突然出现分叉</p>
                <p>• 不满足继续交易的其他事项</p>
              </div>
            </li>
            <li class="content_title">
              <p class="bigTitle">IMX交易所会对决定下线的项目提前5天发出下线公告，用户有30天的期限从钱包中移出资产。</p>
            </li>
          </ul>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
  export default {
    data() {
      return {
        // getColor: window.localStorage.getItem("setColor"),
      }
    }
  }
</script>

<style lang="scss">

  .font_color{
    color: #000 !important;
    background-color: #fff !important;
    border: 1px solid #ddd !important;
  }
  .white-active-bg {
    color: #fff !important;
    background: #312e67 !important;
  }
  .white-text {
    .currency-title {
      border-bottom: 1px solid #ddd !important;
    }
    .currency-information {
      color: #000 !important;
      border: 1px solid #ddd !important;
    }
  }
  #currencyRules{
    width: 100%;
    min-height:100%;
    padding-bottom:100px;
  }
  .currencyContainer {
    width:1200px;
    margin:0 auto;
    font-size: 14px;
    color:#9b9fbf;
    .currencyTitle {
      width: 100%;
      color:#c8cce4;
      background: #17172c;
      height:60px;
      line-height: 60px;
      border-radius: 4px;
      font-size:20px;
      margin-top:56px;
      margin-bottom:36px;
      padding-left:24px;
      box-sizing: border-box;
    }
    /*币种信息*/
    .currency_information {
      width: 100%;
      font-size: 15px;
      color: #fff;
      background: #16182c;
      .content{
        box-sizing: border-box;
        padding-left:34px;
        padding-bottom:30px;
      }
    }
  }
.textIndex{
  margin-left:28px;
  box-sizing: border-box;
  line-height: 20px;
}
.instructions{
  box-sizing: border-box;
  padding-top:35px;
  .content_title{
    margin-bottom:35px;
    .bigTitle{
      font-size:17px;
      padding-bottom:26px;
      color:#afb2c8;
    }
    .smallTitle{
      font-size:15px;
      padding-bottom:8px;
      color:#afb2c8;
    }
  }
  .innerContent{
    font-size:14px;
    line-height:32px;
    color:#8184a1;
  }
}
</style>
