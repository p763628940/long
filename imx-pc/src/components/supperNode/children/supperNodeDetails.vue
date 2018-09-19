<template>
  <div id="superNodeInfoWrapper">
    <div class="superNodeContent">
      <!--超级节点介绍-->
      <div class="superNodeTitle">
        <span class="textColor">投票上币></span><span>超级节点介绍</span>
      </div>
      <!--超级节点成员-->
      <div class="superNodeMembers itemMarginTop">
        <p class="titleSize">超级节点成员</p>
        <div class="nodeItem" v-for="(nodeItem,index) in userExtraList1">
          <div class="itemLeft"><img :src="nodeItem.head_url" alt="" class="imgSize"></div>
          <div class="itemRight">
            <p class="nodeName">{{nodeItem.name}}</p>
            <p class="nodeIntro textIntro">{{nodeItem.intro}}</p>
            <p class="showAndhide">
              <span class="handeStyle">
                <span class="distance" @click="onflod(index)">展开</span>
                <span class="up" @click="onflod"><i class="iconfont icon-xiala"></i></span>
              </span>
             <span class="handeStyle">
                <span class="distance" @click="flod(index)">收起</span>
                <span class="icon1p" @click="flod(index)"><i class="iconfont icon-top"></i></span>
             </span>
            </p>
          </div>
        </div>
      </div>
      <!--它支持的项目-->
      <div class="suportProj superNodeMembers itemMarginTop">
        <p class="titleSize">TA支持的项目</p>
        <ul class="suportList">
          <div class="swiper-container" id="suprotItems">
            <div class="swiper-wrapper">
              <div class="swiper-slide" v-for="item in suportIteams">
                <div class="swiperSupport">
                  <div v-for="project in item">
                    <img src="../../../assets/suportImg.png"/>
                    <p class="suportName">{{project.itemName}}</p>
                  </div>
                </div>
              </div>
            </div>
            <!--前进后退按钮-->
            <div class="swiper-button-prev swiper-button-white"></div>
            <div class="swiper-button-next swiper-button-white"></div>
          </div>
        </ul>
      </div>
      <!--TA做过的点评收起效果-->
      <div class="comments superNodeMembers itemMarginTop">
        <p class="titleSize">TA做过的点评</p>
        <div class="nodeItem itemStyle" v-for="item in commentLists">
          <div class="itemLeft imgMargin"><img src="../../../assets/suportImg.png" alt=""></div>
          <div class="itemRight">
            <div class="coinInfo">
              <p><span class="coinName">{{item.coinName}}</span><span class="shortName">{{item.shortName}}</span></p>
              <p>{{item.time}}</p>
            </div>
            <p class="nodeIntro">{{item.nodeIntro}}</p>
          </div>
        </div>
      </div>
      <!--分页-->
      <div class="pageCount" v-if="commentLists.length>1">
        <el-pagination layout="prev, pager, next" background :page-size="pageNum" :total="10">
        </el-pagination>
      </div>
    </div>
    <!--页脚-->
    <my-footer></my-footer>
  </div>
</template>

<script>
  import footer from "../../public/Homefooter"
  import $ from "jquery"
  import {mapGetters, mapActions, mapState, mapMutations} from 'vuex'
  import userExtra from "../../../store/modules/userExtra";
  export default {
    data() {
      return {
        commentLists: [
          {
            coinImg: '../../assets/gold.png"',
            coinName: 'ETH',
            shortName: '以太坊',
            time: '2018-02-18',
            nodeIntro: '比特大陆于2013年底成立，致力于提供高性能的超级计算芯片、硬件和软件产品。旗下主要有两条业务线：加密货币和人工智能，目前蚂蚁矿机已占据全球比特币矿机85%+的市场份额，第一代人工智能计算芯片也已经测试成功。之后还将发布人工智能硬件产品。 公司总部位于北京，在中国其他地区及美国、以色列、荷兰等国家均设有研发中心。员工70%以上从事研发工作，50%以上拥有硕博学历，骨干来自北大、清华、中科院等知名院校以及美国等国家'
          }, {
            coinName: 'BTC',
            shortName: '比特币',
            time: '2018-02-19',
            nodeIntro: '比特币于2013年底成立，致力于提供高性能的超级计算芯片、硬件和软件产品。旗下主要有两条业务线：加密货币和人工智能，目前蚂蚁矿机已占据全球比特币矿机85%+的市场份额，第一代人工智能计算芯片也已经测试成功。之后还将发布人工智能硬件产品。 公司总部位于北京，在中国其他地区及美国、以色列、荷兰等国家均设有研发中心。员工70%以上从事研发工作，50%以上拥有硕博学历，骨干来自北大、清华、中科院等知名院校以及美国等国家'
          }],
        suportIteams: [
          [
            {
          itemImg: '',
          itemName: 'IMX'
          },
          {
            itemImg: '',
            itemName: 'IMX'
          },
          {
            itemImg: '',
            itemName: 'IMX'
          },
          {
            itemImg: '',
            itemName: 'IMX'
          },
          {
            itemImg: '',
            itemName: 'IMX'
          },
          {
            itemImg: '',
            itemName: 'IMX'
          },
          {
            itemImg: '',
            itemName: 'IMX'
          }, {
            itemImg: '',
            itemName: 'IMX'
          },
          {
            itemImg: '',
            itemName: 'IMX'
          },
          {
            itemImg: '',
            itemName: 'IMX'
          },
          {
            itemImg: '',
            itemName: 'IMX'
          },
          {
            itemImg: '',
            itemName: 'IMX'
          }
          ],
          [
            {
              itemImg: '',
              itemName: 'IMX'
            },
            {
              itemImg: '',
              itemName: 'IMX'
            },
            {
              itemImg: '',
              itemName: 'IMX'
            }
          ]
        ],
        pageNum: 0, //每页条数
        textAll:[],//展开全文

      }
    },
    updated() {
      $('.textIntro').xdlines({
        max: 6
      });
    },
     mounted() {
      var _this = this;
      (function ($) {
        $.fn.xdlines = function (options) {
          var opts = $.extend({}, $.fn.xdlines.defaults, options);
          var $this = $(this);
          for (var k = 0; k < $this.length; k++) {
            var $obj = $this.eq(k);
            $obj.css({
              wordWrap: 'break-word'
            })
            var str = $obj.text();
            str = str.replace(/(^\s*)|(\s*$)/g, "");
            _this.textAll.push(str);
            var l = str.length;
            var txt = '';
            var lineHeight; //单行高度
            var linesNum = opts.max; //需要的行数
            for (var i in str) {
              txt += str[i];
              $obj.text(txt);
              var nowh = parseInt($obj.css('height')); //当前高度
              if (i == 0) {
                lineHeight = nowh * linesNum;
              }

              console.log("text:");
              console.log(_this.textAll);
              if (nowh > lineHeight) {
                var txt = txt.substring(0, txt.length - 3) + "...";
                $obj.text(txt);
                break;
              }
            }
          }
        };
        $.fn.xdlines.defaults = {
          max: 1
        }
      })(jQuery)
      setTimeout(function () {
        var newSwiper = new Swiper('#suprotItems', {
          loop: true,
          autoplay: 5000,
          effect: 'fade',
          fade: {crossFade: true,},
          prevButton: '.swiper-button-prev',
          nextButton: '.swiper-button-next',
        });
      }, 100)
      this.pageNum = 5;
      if (this.token == null && this.token == undefined) {
        this.$router.push({
          name: "login"
        })
      } else {
        this.setToken(this.token);
        this.getUserExtra();
      }
    },
    components: {
      "my-footer": footer
    },
    computed:{
      ...mapState('userExtra',['userExtraList']),
      ...mapState({
        userExtraList1: state => state.userExtra.userExtraList,
      })
    },
    methods:{
      ...mapActions('userExtra', ['getUserExtra']),
      ...mapMutations('userExtra', ['setToken']),
      onflod(index){
        console.log("展开：:");
        console.log("index:" + index);
        console.log("textIntro:");
        console.log($(".textIntro").eq(index).text());
        $(".textIntro").eq(index).html(this.textAll[index]);
        console.log(this.textAll[index]);
      },
      flod(index){
        (function ($) {
          $.fn.xdlines = function (options) {
            var opts = $.extend({}, $.fn.xdlines.defaults, options);
            var $this = $(this);
            for (var k = 0; k < $this.length; k++) {
              var $obj = $this.eq(index);
              $obj.css({
                wordWrap: 'break-word'
              })
              var str = $obj.text();
              str = str.replace(/(^\s*)|(\s*$)/g, "");
              var l = str.length;
              var txt = '';
              var lineHeight; //单行高度
              var linesNum = opts.max; //需要的行数
              for (var i in str) {
                txt += str[i];
                $obj.text(txt);
                var nowh = parseInt($obj.css('height')); //当前高度
                if (i == 0) {
                  lineHeight = nowh * linesNum;
                }
                if (nowh > lineHeight) {
                  var txt = txt.substring(0, txt.length - 3) + "...";
                  $obj.text(txt);
                  break;
                }
              }
            }
          };
          $.fn.xdlines.defaults = {
            max: 1
          }
        })(jQuery)
        $('.textIntro').xdlines({
          max: 6
        });

      }
    }
  }
</script>
<style lang="scss">
  /*此页面公用样式*/
  .itemMarginTop {
    margin-top: 36px;
  }

  .titleSize {
    font-size: 17px;
    line-height: 52px;
    padding-left: 50px;
    background: #12162e;
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
    box-shadow: -2px 8px 8px #030303;
  }

  /*ui样式*/
  .pageCount {
    .el-pagination.is-background .el-pager li.active {
      background-color: #26cbc5 !important;
      border-color: #26cbc5 !important;
    }
  }
</style>
<style lang="scss" scoped>
  #superNodeInfoWrapper {
    width: 100%;
    min-height: 100%;
    background: -webkit-linear-gradient(#1e2749, #0e1122); /* Safari 5.1 - 6.0 */
    background: -o-linear-gradient(#1e2749, #0e1122); /* Opera 11.1 - 12.0 */
    background: -moz-linear-gradient(#1e2749, #0e1122); /* Firefox 3.6 - 15 */
    background: linear-gradient(#1e2749, #0e1122); /*标准写法*/
    .superNodeContent {
      width: 1200px;
      margin: 0 auto;
      color: #e2e3ec;
      padding-top: 55px;
      padding-bottom: 70px;
      .superNodeTitle {
        background: #12162e;
        font-size: 18px;
        box-sizing: border-box;
        padding-left: 56px;
        height: 60px;
        line-height: 60px;
        border-radius: 4px;
        .textColor {
          color: #16b7bc;
        }
      }
      /*超级节点成员部分样式*/
      .superNodeMembers {
        width: 100%;
        .nodeItem {
          box-sizing: border-box;
          padding: 42px;
          background: #040719;
          display: flex;
          .itemLeft {
            flex: 0 0 100px;
            .imgSize {
              width:63px;
              height:48px;
            }
          }
          .imgMargin {
            margin-right: 40px;
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
            .showAndhide {
              color: #15abb1;
              padding-top: 20px;
              font-size: 14px;
              display: flex;
              justify-content: flex-end;
              .handeStyle{
                cursor: pointer;
              }
              .distance {
                padding-right: 10px;
              }
              .up {
                padding-right: 15px;
              }
            }
            .coinInfo {
              display: flex;
              justify-content: space-between;
              align-items: center;
              margin-bottom: 20px;
              .coinName {
                font-size: 15px;
                font-weight: bold;
                padding-bottom: 20px;
              }
              .shortName {
                font-size: 12px;
                margin-left: 20px;
              }
            }
          }
        }
        .itemStyle {
          padding: 50px 50px 50px 80px;
        }
      }
      .pageCount {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        height: 80px;
      }
      /*TA支持的项目*/
      .suportProj {
        .suportList {
          padding-top: 50px;
          padding-bottom: 50px;
          box-sizing: border-box;
          background: #040719;
          display: flex;
          padding-left: 51px;
          padding-right: 51px;
          .swiper-container {
            box-sizing: border-box;
            padding: 0 52px;
            .swiper-wrapper {
              box-sizing: border-box;
            }
          }
          #suprotItems {
            width: 100%;
            box-sizing: border-box;
            .swiper-slide {
              width: 100%;
              height: 100%;
              cursor: pointer;
              box-sizing: border-box;
              .swiperSupport {
                box-sizing: border-box;
                display: flex;
                flex-wrap: wrap;
                align-items: center;
                div {
                  margin: 23px 36px;
                  .suportName {
                    text-align: center;
                    margin-top: 20px;
                  }
                }
              }
            }
          }
          /*前进后退按钮样式*/
          .swiper-button-white {
            width: 17px;
            height: 30px;
            background-size: 100%;
          }
        }
      }
    }
  }
</style>
