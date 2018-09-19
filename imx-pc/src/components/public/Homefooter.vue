<template>
	<div id="Homefooter">
    <!--底部导航-->
    <div class="BottomNavigation">
      <div class="MyExchange">
        <div class="oImg">
          <img src="../../assets/logoIMXwhite.png" alt="">
        </div>
        <div class="myText" :class="{'imxEnText':lang!='zh-CN'}">{{$t("shouye.MyExchange")}}</div>
      </div>
      <div class="oService">
        <ul class="serviceItem">
          <li class="title">{{$t("shouye.Service")}}</li>
          <li>
            <router-link target="_blank" to="/index/notice">{{$t("shouye.IMXAnnouncement")}}</router-link>
          </li>
          <li>
            <router-link target="_blank" to="/index/Help">{{$t("shouye.Guide")}}</router-link>
          </li>
          <li>
            <a target="_blank" href="https://github.com/imxapi/API_DOCS/wiki">OpenApi</a>
          </li>
        </ul>
        <ul class="serviceItem">
          <li class="title">{{$t("shouye.ClauseDescription")}}</li>
          <li><router-link target="_blank" to="/Agreement">{{$t("shouye.TermsOfUser")}}</router-link></li>
          <li><router-link target="_blank" to="/Privacy">{{$t("shouye.PrivacyPolicy")}}</router-link></li>
          <li><router-link target="_blank" to="/TradingRules">{{$t("shouye.TransactionRegulation")}}</router-link></li>
          <li><router-link target="_blank" to="/index/rate">{{$t("Rates.Rates")}}</router-link></li>
        </ul>
        <ul class="serviceItem">
          <li class="title">{{$t("shouye.About")}}</li>
          <li><a>{{$t("shouye.AboutUs")}}</a></li>
          <li><a class="cur" @click="toApplicationcurrency">{{$t("shouye.ApplyToList")}}</a></li>
          <li><router-link target="_blank" :to="{name:'details',params:{id:46}}">{{$t("shouye.OtcApplication")}}</router-link></li>
        </ul>
        <ul>
          <li class="title">{{$t("shouye.ContactUs")}}</li>
          <li class="iconList OneList">
            <dl>
              <dd>
                <a href="https://twitter.com/IMXGlobal" target="_blank">
                  <i class="iconfont icon-tuite"></i>
                </a>
              </dd>
              <dd>
                <a href="https://www.youtube.com/channel/UC7eOIiLJnoFYD7l6Vawe4Lw?view_as=subscriber" target="_blank">
                  <i class="iconfont icon-youtube"></i>
                </a>
              </dd>
              <dd>
                <a href="https://www.instagram.com/imxglobal/" target="_blank">
                  <i class="iconfont icon-ins"></i>
                </a>
              </dd>

              <dd>
                <a href="https://medium.com/@IMXGlobal" target="_blank">
                  <i class="iconfont icon-medium"></i>
                </a>
              </dd>
            </dl>
          </li>
          <li class="iconList">
            <dl>
              <dd class="Wechat">
                <i class="iconfont icon-appxiugaiicon36"></i>
                <img src="../../assets/Wechat.jpeg" />
              </dd>
              <dd>
                <a href="https://www.weibo.com/u/6605425638" target="_blank">
                <i class="iconfont icon-Shape"></i>
                </a>
              </dd>
              <dd class="Wechat">
                <i class="iconfont icon-BiYong"></i>
                <img src="../../assets/telegraphEn.png" v-show="!isZH" alt="">
                <img src="../../assets/telegraphZh.png" v-show="isZH" alt="">
              </dd>
              <dd>
                <a href="https://www.reddit.com/user/IMXGlobal" target="_blank">
                  <i class="iconfont icon-reddit"></i>
                </a>
              </dd>

            </dl>
          </li>
          <!--<li>{{$t('shouye.ApplyToList')}}: key@imx.com</li>-->
          <li>{{$t('shouye.ServiceEmail')}}: service@imx.com</li>
          <li>{{$t('shouye.BusinessCooperation')}}: airdrop@imx.com</li>
        </ul>
      </div>
    </div>
    <!--垫底-->
		<div class="home_bottom_bottom">&copy;2018 imx.com</div>
	</div>
</template>

<script>
import { mapGetters,mapActions,mapState,mapMutations } from 'vuex'
export default{
	name:"homefooter",
  data(){
	  return{
      lange:'',
      imxTextClass:'',
      isZH:false
    }
  },
	methods:{
    toApplicationcurrency(){
      if(!this.token){this.$router.push({name:"login"});return};
      let routeData = this.$router.resolve({
        path:"/index/Applicationcurrency"
      });
      window.open(routeData.href, '_blank');
    },
		open(url){
			window.open(url);
		}
	},
	computed: {
		...mapState('user',['lang']),
	},
  watch:{
	  lang:{
      handler: function(val, oldVal) {
        if (val == 'zh-CN') {
          this.isZH = true;
        } else {
          this.isZH = false;
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  @media only screen and (max-width:1250px){
    .oService{
      ul{
        margin-left: 50px !important;
      }
    }
  }
  /*导航部分*/
  .BottomNavigation{
    width: 100%;
    height: 310px;
    background: #0b0c1b;
    .MyExchange{
      float: left;
      margin-left: 4%;
      margin-top: 50px;
      .oImg{
        width: 230px;
        height: 32px;
        img{
          width: 100%;
          height: 100%;
        }
      }
      .myText{
        color: #fff;
        line-height: 30px;
        letter-spacing: 40px;
      }
      .imxEnText{
        letter-spacing: 0;
      }
    }
    .oService{
      float: right;
      margin-right: 4%;
      .serviceItem{
        li:hover a{
          color: #7276bb;
        }
        .cur{
          cursor: pointer;
        }
      }
      ul{
        float: left;
        margin-left: 80px;
        margin-top: 50px;
        .title{
          color: #fff;
        }
        .OneList{
          margin-top: 8px;
        }
        .iconList{
          margin-bottom: 10px;
          .Wechat{
            position: relative;
            .iconfont:hover+img{
              display: block !important;
            }
            img{
              width: 100px;
              height: 100px;
              position: absolute;
              left: -25px;
              top: 30px;
              display: none;
            }
          }
        }
        li{
          height: 30px;
          line-height: 14px;
          font-size: 14px;
          color: #585b8a;
          a{
            color: #585b8a;
          }
          dl{
            dd:hover .iconfont{
              color: #7276bb;
            }
            dd{
              float: left;
              .iconfont{
                display: inline-block;
                font-size: 25px;
                margin-right: 18px;
                cursor: pointer;
              }
              .icon-tian7_facebook{
                font-size: 27px;
              }
              .icon-BiYong{
                font-size: 30px;
              }
              .icon-Shape{
                font-size: 26px;
                margin-left: -2px;
              }
              .icon-reddit{
                font-size: 28px;
                margin-left: 2px;
              }
              .icon-appxiugaiicon36{
                font-size: 30px;
                margin-left: -2px;
              }
              .icon-ins{
                font-size: 30px;
              }
              .icon-medium,.icon-youtube{
                font-size: 27px;
              }
              .icon-ins{
                font-size: 31px;
              }
            }
          }
        }
      }
    }
  }


	/*首页底部*/

	.home_bottom_bottom {
		height: 40px;
		line-height: 40px;
		font-size: 15px;
		text-align: center;
		color: #fff;
		background: #0b0c1b;
		border-top: 1px solid #1f2138;
	}
</style>
