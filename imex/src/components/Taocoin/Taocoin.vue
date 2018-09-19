<template>
	<div id="Taocoin">
		<my-header :text="TaocoinTitle"></my-header>
		<!--币种列表-->
		<!--币种选择列表-->
		<mt-popup v-model="popupVisible" position="right">
			<div class="header_box">
				<div class="register_header">
					<p class="back" @click="popupVisible=false">
						<i class="iconfont icon-zuojiantou"></i>
					</p>
					<p class="register_type">
						{{$t("bbjy.Coin")}}
					</p>
				</div>
			</div>
			<!--列表-->
			<ul class="currencyList">
				<li v-for="(item,index) in currencyList" class="cardItem" @click="tabCurrency(index,item)">
					<span>{{item.pageIdentifier}}</span>
					<i class="iconfont icon-duihao"></i>
				</li>
			</ul>
		</mt-popup>
		<!--币种选择列表-->
		<mt-popup v-model="popupVisible1" position="right">
			<div class="header_box">
				<div class="register_header">
					<p class="back" @click="popupVisible1=false">
						<i class="iconfont icon-zuojiantou"></i>
					</p>
					<p class="register_type">
						{{$t("bbjy.Coin")}}
					</p>
				</div>
			</div>
			<!--列表-->
			<ul class="currencyList">
				<li v-for="(item,index) in currencyList" class="cardItem cardItem1" @click="tabCurrency1(index,item)">
					<span>{{item.pageIdentifier}}</span>
					<i class="iconfont icon-duihao"></i>
				</li>
			</ul>
		</mt-popup>
		<!--风险提示-->
		<div class="riskWarning">
			<div class="oLeft">
				<i class="iconfont icon-gonggao"></i>
			</div>
			<div class="oright">
				{{$t("taocoin.RiskReminder")}}:{{$t("taocoin.InvestCoin")}}
			</div>
		</div>
		<!--淘币-->
		<div class="TaocoinTabTitle">
			<ul class="tabTao">
				<li class="active" @click="tabTao(0)">
					<span>{{$t("taocoin.ExchangeMarket")}}</span>
				</li>
				<li @click="tabTao(1)">
					<span>{{$t("taocoin.Published")}}</span>
				</li>
				<li @click="tabTao(2)">
					<span>{{$t("taocoin.MExchangedCoin")}}</span>
				</li>
			</ul>
			<div class="search">
				<i class="iconfont icon-sousuo1" @click="searchISshow=true"></i>
			</div>
		</div>
		<!--搜索-->
		<div class="searchBox" v-if="searchISshow">
			<div class="currency" @click="popupVisible=true">
				<p>{{currencyName1}}</p>
				<i class="iconfont icon-xiala"></i>
			</div>
			<span class="icon">
				<i class="iconfont icon-duihuan-"></i>
			</span>
			<div class="currency" @click="popupVisible1=true">
				<p>{{currencyName2}}</p>
				<i class="iconfont icon-xiala"></i>
			</div>
			<div class="search" @click="search">
				<button>{{$t("list.search")}}</button>
			</div>
		</div>
		<!--切换内容-->
    <!--兑币市场-->
		<div class="TaocoinContent taocoin" style="display: block;">
			<ul class="Taobao_item" v-for="(item,key) in market" @click="Exchangeofdetails(item.id)">
				<div class="title">
					<p class="oCurrency1">
						<img :src="item.main.logoUrl"/>
						<span class="curName">{{item.main.pageIdentifier}} </span>
						<span>{{item.main.zhName}}</span>
					</p>
					<p class="icon">
						<i class="iconfont icon-iconfontjiantou5"></i>
					</p>
				</div>
        <ul class="content">
          <li class="exchange">
            <p class="text">{{$t("taocoin.ExchangePrice")}}:
              <span class="num">
                {{item.initNum.c_num/item.initNum.m_num | number(item.initNum.currency.displayNum)}}
              </span>
              {{item.initNum.currency.pageIdentifier}}</p>
            <dl>
              <dt v-for="(oimg,index) in item.stocks" @click.stop="tabCur(key,index)">
                <img :src="oimg.currency.logoUrl" />
              </dt>
            </dl>
          </li>
          <li class="inStock">
            <span>
              {{$t("taocoin.Stocks")}}: {{item.revoke_balance | number(3)}} {{item.main.pageIdentifier}}
            </span>
            <p class="people">
              {{item.order_people_count}}{{$t("taocoin.XXexchange")}}
            </p>
          </li>

        </ul>
			</ul>
      <!--分页开始-->
      <div class="pageCount" v-show="TaocointTotal>10">
        <el-pagination small layout="prev, pager, next" :page-size="TaocoinPageCount" :total="TaocointTotal" @current-change="taocoinPage">
        </el-pagination>
      </div>
      <!--搜索不到淘币市场暂无数据显示-->
      <div class="newNoData" v-if="TaocointTotal==0">
        <div class="displayNoData">
          <img src="../../assets/NotContentFund.png" alt="" class="imgSize">
          <div><span>{{$t("taocoin.NotFoundCoin")}}</span></div>
        </div>
      </div>
		</div>
		<!--我发布的-->
		<div class="TaocoinContent taocoin">
      <div class="taocoinItem" v-for="(item,index) in incoinList">
      <ul class="Taobao_item">
          <div class="title">
            <p class="oCurrency1">
              <img :src="item.main.logoUrl" />
              <span class="curName">{{item.main.pageIdentifier}}</span>
            </p>
            <p class="state">
              <span v-if="item.status == 1">{{$t("taocoin.ExComplete")}}</span>
              <span v-if="item.status == 0">{{$t("taocoin.Exchanged")}}</span>
              <span v-if="item.status == -1">{{$t("taocoin.AlreadyRemoved")}}</span>
            </p>
          </div>
          <ul class="content">
            <li class="exchange">
              <p class="text">
                {{$t("taocoin.ExchangePrice")}}:
                <span class="num">
                  {{item.stocks[0].c_num/item.stocks[0].m_num | number(item.stocks[0].currency.displayNum)}}
                </span>{{item.stocks[0].currency.pageIdentifier}}
              </p>
            </li>
            <li class="inStock">
              <p class="text">
                {{$t("taocoin.ExchangeC")}}:{{item.balance - item.dec_balance | number(item.main.displayNum)}}{{item.main.pageIdentifier}}
              </p>
            </li>
            <li class="inStock">
              <p class="text">
                {{$t("taocoin.PublishDate")}}: {{formatTime(item.created_at)}}
              </p>
            </li>
          </ul>
        </ul>
        <!--刷新下架查看按钮-->
        <div class="buttonLists">
          <button :disabled="!item.is_brush || item.status == 1" :class="{'buttonStyle2':!item.is_brush || item.status == 1}"  @click="refresh(item.id);item.is_brush=0" class="buttonStyle buttonStyle1">{{$t("taocoin.Refresh")}}</button>
          <button :disabled="item.status == -1 || item.status == 1" :class="{'buttonStyle2':item.status == -1 || item.status == 1}" @click="Obtained(item.id,index)" class="buttonStyle buttonStyle1">{{$t("taocoin.Remove")}}</button>
          <button class="buttonStyle buttonStyle1" @click="toDetails(item.id)">{{$t("taocoin.View")}}</button>
        </div>
      </div>
      <!--分页开始-->
      <div class="pageCount" v-show="incoinTotal>10">
        <el-pagination small layout="prev, pager, next" :page-size="incoinPage" :total="incoinTotal" @current-change="pageIncoinChange">
        </el-pagination>
      </div>
      <!--我发布的无数据显示-->
      <div class="newNoData" v-if="incoinTotal==0">
        <div class="displayNoData">
          <img src="../../assets/NotLoggedIn.png" alt="" class="imgSize">
          <div>
            <span>{{$t("taocoin.GoBrowser")}}</span>
          </div>
        </div>
      </div>
    </div>
		<!--我淘的币-->
		<div class="TaocoinContent">
      <ul class="Taobao_item" v-for="item in myOrderList">
        <div class="title">
          <p class="oCurrency">
            <span class="blue" v-if="item.type==1">
								{{item.main.pageIdentifier}}
							</span>
            <span class="blue" v-if="item.type==0">
								{{item.currency.pageIdentifier}}
							</span>
            <span class="number">{{$t("taocoin.DNumber")}}:{{item.order_num}}</span>
          </p>
        </div>
        <ul class="content">
          <li class="exchange">
            <p class="text">
              {{$t("taocoin.ExchangePrice")}}:
              <span class="num">{{item.price | number(item.main.displayNum)}}</span> {{item.currency.pageIdentifier}}
            </p>
          </li>
          <li class="inStock">
            <p class="text">
              {{$t("taocoin.ExchangeC")}}:
              <span v-if="item.type==0">
								{{item.count | number(item.main.displayNum)}}
							</span>
              <span v-if="item.type==1">
								{{item.total | number(item.main.displayNum)}}
							</span>
              <span v-if="item.type==0">
								{{item.main.pageIdentifier}}
							</span>
              <span v-if="item.type==1">
								{{item.currency.pageIdentifier}}
							</span>
            </p>
            <p class="textLeft">
              {{$t("taocoin.ExchangeR")}}:
              <span v-if="item.type==1">
								{{item.count | number(item.main.displayNum)}}
							</span>
              <span v-if="item.type==0">
								{{item.total | number(item.main.displayNum)}}
							</span>
              <span v-if="item.type==1">
								{{item.main.pageIdentifier}}
							</span>
              <span v-if="item.type==0">
								{{item.currency.pageIdentifier}}
							</span>
            </p>
          </li>
          <li class="inStock">
            <p class="text">
              {{$t("taocoin.PublishDate")}}: {{formatTime(item.created_at)}}
            </p>
          </li>
        </ul>
      </ul>
      <!--分页开始-->
      <div class="pageCount" v-show="myOrderTotal>10">
        <el-pagination small layout="prev, pager, next" :page-size="myOrderPage" :total="myOrderTotal" @current-change="pagemyOrderChange">
        </el-pagination>
      </div>
      <!--我淘的币无数据显示-->
      <div class="newNoData" v-if="myOrderTotal==0">
        <div class="displayNoData">
          <img src="../../assets/Taocoin.png"  alt="" class="imgSize">
          <div>
            <span>{{$t("taocoin.NotStarted")}}</span>
            <span class="textcolor" @click="tabTao(0)">{{$t("taocoin.TOTaocoin")}}</span>
          </div>
        </div>
      </div>
    </div>

    <!--是否下架弹框-->
    <div class="men_ban" v-if="isObtained"></div>
    <div class="conformDialog" v-if="isObtained">
      <div class="title">
        <p>{{$t("taocoin.RemoveItOrNot")}}</p>
      </div>
      <div class="content">
        <div class="contentItem">{{$t("taocoin.FrozenTokens")}}</div>
      </div>
      <div class="bottom">
        <div class="conformWrapper">
          <div class="colse" @click="isObtained=false">{{$t("taocoin.Close")}}</div>
          <div class="conform" @click="confirmObtained">{{$t("taocoin.Confirm")}}</div>
        </div>
      </div>
      <div class="Close1" v-if="isObtained" @click="isObtained=false">
        <i class="iconfont icon-quxiao1"></i>
      </div>
    </div>

    <!--判读商品是否下架-->
    <!--  <div class="men_ban" v-if="false"></div>
      <div class="conformDialog1" v-if="false">
      <div class="title">
        <p>是否下架</p>
      </div>
      <div class="content">
        <div class="contentItem">下架后用户无法搜到此需求</div>
        <div class="contentItem">且被冻结的token会立即释放</div>
      </div>
      <div class="bottom">
        <div class="conformWrapper">
          <div class="colse">关闭</div>
          <div class="conform">确认</div>
        </div>
      </div>
      <div class="Close2" v-if="false">
        <i class="iconfont icon-quxiao1"></i>
      </div>
    </div>-->

    <!--联系卖家-->
    <div class="men_ban" v-if="false"></div>
    <div class="conformDialog1" v-if="false">
      <div class="title">
        <p>{{$t("taocoin.ContactSller")}}</p>
      </div>
      <div class="content">
        <div class="contentItem">{{$t("taocoin.SellerPhone")}} <span class="textRed">152 3537 8373</span></div>
      </div>
      <div class="bottom">
        <div class="conformWrapper">
          <div class="colse">{{$t("taocoin.Close")}}</div>
          <div class="conform">{{$t("taocoin.Confirm")}}</div>
        </div>
      </div>
      <div class="Close2" v-if="false">
        <i class="iconfont icon-quxiao1"></i>
      </div>
    </div>
	</div>
</template>

<script>
	import header from "../public/backHeader"
	import $ from "jquery"
  import axios from "axios";
	import {httpUrl} from "../http_url/http_url";
  import {mapState} from "vuex";
  export default {
		data() {
			return {
				TaocoinTitle: this.$t("taocoin.Taocoin"),
				searchISshow:false, //搜索显示
				popupVisible: false, //币种列表选择
				popupVisible1: false, //币种列表选择
				currencyList: [], //在线币种列表
				currencyID1: "", //选择币种id
				currencyID2: "", //选择币种id
				currencyName1: this.$t("taocoin.Pleasechoose"), //选择币种名称
				currencyName2: this.$t("taocoin.Pleasechoose"), //选择币种名称
				market:[],					//	淘币列表
				TaocoinPageCount:0,  //淘币每页条数
				TaocointTotal:0, 			//总条数
        incoinList: [],
        /*淘币中列表*/
        incoinPage: 0,
        /*显示条数*/
        incoinTotal: 0,
        /*总条数*/
        myOrderList: [],
        /*我淘的币*/
        myOrderPage: 0,
        /*每页显示条数*/
        myOrderTotal: 0,
        isObtained:false,  //判断是否下架
        NotFoundCoin:false, //未搜索到此币种
			}
		},
		components: {
			"my-header": header
		},
    computed:{
      ...mapState('user',['lang'])
    },
		mounted() {
			let _this = this;
			/*获取在线币种列表*/
			this.getCurrency();
			/*获取淘币列表*/
			this.getTaocoinList();
      if(this.token==null || this.token==undefined){
			  return false;
      }else{
        /*淘币中*/
        axios.get(httpUrl.incoin, {
          headers: {
            "Authorization": "Bearer " + this.token
          }
        }).then(function(res) {
          _this.incoinList = res.data.data.data; /*淘币中列表*/
          _this.incoinPage = res.data.data.per_page; /*显示条数*/
          _this.incoinTotal = res.data.data.total; /*总条数*/
        }, function(err) {
          console.log(err)
        })
        /*我淘的币*/
        axios.get(httpUrl.myOrder, {
          headers: {
            "Authorization": "Bearer " + this.token
          }
        }).then(function(res) {
          _this.myOrderList = res.data.data.data; /*我的淘币列表*/
          _this.myOrderPage = res.data.data.per_page; /*显示条数*/
          _this.myOrderTotal = res.data.data.total; /*总条数*/
        }, function(err) {
          console.log(err)
        })
      }
		},
    filters: {
      //小数点过滤器 不四舍五入
      number(value, num) {
        var toFixedNum = Number(value).toFixed(num + 1);
        var realVal = toFixedNum.substring(0, toFixedNum.lastIndexOf('.') + num + 1);
        return realVal;
      }
    },
		methods: {
		  getCurrency(){  //获取在线币种列表
		    let _this = this;
        this.$ajax.get(this.httpUrl.currencyNaught).then(function(res) {
          _this.currencyList = res.data.data;
          _this.currencyList.push({pageIdentifier:'全部',id:99})
        }, function(err) {
          console.log(err)
        })
      },
      getTaocoinList(){
		    let _this = this;
        this.$ajax.get(this.httpUrl.goods,{
          params:{lang:this.lang}
        }).then(function(res) {
          _this.market = res.data.data.data;
          _this.TaocoinPageCount = res.data.data.per_page;
          _this.TaocointTotal = res.data.data.total;
          if(_this.market.length == 0) {
            return false;
          }
          for(let i = 0; i < _this.market.length; i++) {
            _this.market[i].initNum = _this.market[i].stocks[0];
          }
        }, function(err) {
          console.log(err)
        })
      },
      confirmObtained() { //立即下架
        let _this = this;
        axios.post(httpUrl.lower, {
          goods_id: this.ObtainedID
        }, {
          headers: {
            "Authorization": "Bearer " + this.token
          }
        }).then(function(res) {
          if(res.data.status.code == 200) {
            _this.isObtained = false;
            _this.incoinList[_this.ObtainedIndex].status = -1; //下架按钮灰掉
            _this.incoinList[_this.ObtainedIndex].is_brush = 0; //刷新按钮灰掉
            _this.$message({
              message: _this.$t("taocoin.RemovedSuccessfully"),
              type: 'success',
              duration: 1500
            });

          }
        }, function(err) {
          console.log(err)
        })
      },
      Exchangeofdetails(id){
        this.$router.push({
          name:"Exchangeofdetails",
          params:{id:id}
        })
      },
      refresh(id) { /*刷新排名*/
        let _this = this;
        axios.post(httpUrl.brush, {
          goods_id: id
        }, {
          headers: {
            "Authorization": "Bearer " + this.token
          }
        }).then(function(res) {
            if(res.data.status.code == 200) {
              _this.$message({
                message: _this.$t("taocoin.RefreshSuccessfully"),
                type: 'success',
                duration: 1500
              });
            }
          },
          function(err) {
            console.log(err)
          })
      },
      Obtained(id, index) {  //下架
        this.ObtainedID = id;
        this.isObtained = true;
        this.ObtainedIndex = index;
      },
      taocoinPage(val){ /*淘币分页*/
        let _this = this;
        axios.get(httpUrl.goods, {
          params: {
            page: val,
            lang:this.lang
          }
        }).then(function(res) {
          _this.market = res.data.data.data;
          _this.TaocoinPageCount = res.data.data.per_page;
          _this.TaocointTotal = res.data.data.total;
          for(let i = 0; i < _this.market.length; i++) {
            _this.market[i].initNum = _this.market[i].stocks[0];
          }
          $('body,html').animate({scrollTop:0},1000);
        }, function(err) {
          console.log(err)
        })
      },
      pageIncoinChange(val) { /*淘币中列表分页*/
        let _this = this;
        axios.get(httpUrl.incoin, {
          headers: {
            "Authorization": "Bearer " + this.token
          },
          params: {
            page: val
          }
        }).then(function(res) {
          _this.incoinList = res.data.data.data; /*淘币中列表*/
          _this.incoinPage = res.data.data.per_page; /*显示条数*/
          _this.incoinTotal = res.data.data.total; /*总条数*/
          $('body,html').animate({scrollTop:0},1000);
        }, function(err) {
          console.log(err)
        })
      },
      pagemyOrderChange(val) { /*我淘的币分页*/
        let _this = this;
        axios.get(httpUrl.myOrder, {
          headers: {
            "Authorization": "Bearer " + this.token
          },
          params: {
            page: val
          }
        }).then(function(res) {
          _this.myOrderList = res.data.data.data; /*淘币中列表*/
          _this.myOrderPage = res.data.data.per_page; /*显示条数*/
          _this.myOrderTotal = res.data.data.total; /*总条数*/
          $('body,html').animate({scrollTop:0},1000);
        }, function(err) {
          console.log(err)
        })
      },
      tabCur(key, index) { /*淘币 --- 信息 ---- 币种切换*/
        this.market[key].initNum = this.market[key].stocks[index];
        this.market.splice(key, 1, this.market[key]);
      },
			tabTao(index) { //切换
        if(this.token==null&&this.token==undefined&&index>0){
          this.$router.push({name:"login"});
          return false;
        }
        if(index>=1){
          this.searchISshow = false;
        }
				$(".TaocoinContent").eq(index).show().siblings(".TaocoinContent").hide();
				$(".tabTao li").eq(index).addClass("active").siblings("li").removeClass("active");
			},
			tabCurrency(i, data) { /*切换币种*/
				let _this = this;
        if(data.id==99){
          this.getTaocoinList();
        }
				$(".icon-duihao").eq(i).show().parent(".cardItem").siblings(".cardItem").find(".icon-duihao").hide();
				_this.currencyName1 = data.pageIdentifier;
				_this.currencyID1 = data.id;
				_this.popupVisible = false;
			},
			tabCurrency1(i, data) {
				let _this = this;
				$(".cardItem1 .icon-duihao").eq(i).show().parent(".cardItem").siblings(".cardItem").find(".icon-duihao").hide();
				if(data.id==99){
          this.getTaocoinList();
        }
				_this.currencyName2 = data.pageIdentifier;
				_this.currencyID2 = data.id;
				_this.popupVisible1 = false;
			},
      toDetails(id) { /*淘币详情*/
        this.$router.push({
          name: 'releaseDetails',
          params: {
            id: id
          }
        });
      },
			search() { /*搜索*/
				let _this = this;
				if(this.currencyID2==""&&this.currencyID1==""){
          _this.$message({
            message: _this.$t("taocoin.Pleasechoose"),
            type: 'warning'
          });
				  return false;
        }
				if(this.currencyID2 == this.currencyID1){
          _this.$message({
            message: _this.$t("taocoin.coinMust"),
            type: 'warning'
          });
				  return false;
        }
				this.$ajax.get(this.httpUrl.goods, {
					params: {
						m_id: this.currencyID1,
						c_id: this.currencyID2,
            lang:this.lang
					}
				}).then(function(res) {
					_this.market = res.data.data.data;
					_this.TaocoinPageCount = res.data.data.per_page;
					_this.TaocointTotal = res.data.data.total;
					if(_this.market.length == 0) {
					  _this.NotFoundCoin = true;
						return false;
					}
					for(let i = 0; i < _this.market.length; i++) {
						_this.market[i].initNum = _this.market[i].stocks[0];
					}
				}, function(err) {
					console.log(err)
				})
			}
		}
	}
</script>
<style lang="scss">
	#Taocoin {
    background: #111627;
		.mint-popup {
			width: 100%;
			height: 100%;
			background: #141738;
			overflow-y: auto;
		}
    .el-pager li {
      /*分页的背景颜色*/
      background: none !important;
      color: #fff;
    }
    .el-pagination .btn-next,
    .el-pagination .btn-prev {
      background: none !important;
      color: #fff;
    }
    .el-pager li.active,
    .el-pagination button:hover {
      color: #26cbc5;
    }
    .el-pagination button:disabled {
      color: #fff;
      background: none;
    }
	}
</style>
<style lang="scss" scoped>
	$header_bg:#141738;
	$border_bottom: 1px solid #1b1d3e;
	/*头部提示*/

	.riskWarning {
		width: 100%;
		box-sizing: border-box;
		padding: .01rem .08rem;
		padding-bottom: .1rem;
		display: flex;
		font-size: .12rem;
		background: #141738;
		.oLeft {
			width: 10%;
			text-align: right;
			.iconfont {
				color: red;
				font-size: .12rem;
				margin-right: .05rem;
			}
		}
		.oright {
			width: 90%;
			line-height: .15rem;
			color: #fff;
		}
	}
	/*淘币列表*/

	.TaocoinTabTitle {
		width: 100%;
		height: .6rem;
		display: flex;
		align-items: center;
		justify-content: space-between;
		background: #101336;
		margin-top: .1rem;
		box-sizing: border-box;
		padding: 0 .15rem;
		.tabTao {
			display: flex;
			align-items: center;
			color: #4e66a2;
			.active {
				span {
					color: #4ad7f5;
					border-bottom: .015rem solid #4ad7f5;
				}
			}
			li {
				margin-right: .2rem;
				span {
					padding-bottom: .05rem;
				}
			}
		}
		.search {
			color: #fff;
			.iconfont {
				font-size: .18rem;
			}
		}
	}
	/*淘币切换内容*/

	.TaocoinContent {
		display: none;
	}
	/*搜索内容*/

	.searchBox {
		width: 100%;
		height: .6rem;
		display: flex;
		align-items: center;
		background: #17193f;
		.icon {
			.iconfont {
				font-size: .4rem;
				color: #26cbc5;
			}
		}
		.currency {
			width: .85rem;
			height: .3rem;
			display: flex;
			align-items: center;
			margin: 0 .1rem;
			background: #fff;
			p {
				width: 70%;
				line-height: .3rem;
				border: none;
				text-align: center;
				font-size: .13rem;
			}
			.iconfont {
				font-size: .1rem;
				margin: 0 .05rem;
				color: #515151;
			}
		}
		.search {
			button {
				width: .65rem;
				height: .3rem;
				background: #26cbc5;
				border: none;
				border-radius: .04rem;
				color: #fff;
				margin: 0 .1rem;
			}
		}
	}
	/*币种选择头部*/

	.register_header {
		width: 100%;
		height: .5rem;
		line-height: .5rem;
		position: relative;
		color: #fff;
		background: rgb(20, 23, 56);
		border-bottom: .1rem solid #121528;
		.back {
			margin-left: .15rem;
		}
		.register_type {
			position: absolute;
			top: 0;
			left: 20%;
			width: 60%;
			text-align: center;
			font-size: .15rem;
			font-weight: 600;
		}
	}

	.currencyList {
		width: 100%;
		li {
			width: 100%;
			height: .37rem;
			display: flex;
			align-items: center;
			justify-content: space-between;
			border-bottom: $border_bottom;
			color: #fff;
			box-sizing: border-box;
			padding: 0 .1rem;
			.iconfont {
				display: none;
			}
		}
		li:nth-of-type(1) {
			.iconfont {
				display: block;
			}
		}
	}

	/*币种列表*/
	.Taobao_item{
		width: 100%;
		box-sizing: border-box;
		margin-top: .05rem;
		padding-left: .15rem;
    background:#101336;
		.title{
			display: flex;
			align-items: center;
			justify-content: space-between;
			border-bottom:0.01rem solid #3b4286;
      -webkit-box-sizing: border-box;
      -moz-box-sizing: border-box;
      box-sizing: border-box;
      padding: .08rem 0;
      .oCurrency1{
        display: flex;
        align-items: center;
        color: #e1e8fb;
        img{
          width: .3rem;
          height: .3rem;
          margin-right: .05rem;
        }
        .curName{
          margin-left: .05rem;
          margin-right: .1rem;
        }
      }
			.oCurrency{
        width: 100%;
				display: flex;
				align-items: center;
        justify-content: space-between;
				color: #e1e8fb;
        box-sizing: border-box;
        padding-right: .1rem;
				img{
					width: .3rem;
					height: .3rem;
          margin-right: .05rem;
				}
				.curName{
          margin: 0 .03rem;
				}
			}
      .icon{
        .iconfont{
          color: #fff;
          margin-right: .1rem;
        }
      }
      .state{
        color:#EBAD63;
        margin-right:.07rem;
      }
      .number{
        color: #6b6f9f;
        margin-left: 0.85rem;
      }
		}
    .content{
      width: 100%;
      .exchange{
        width: 100%;
        height: .4rem;
        display: flex;
        align-item:center;
        justify-content: space-between;
        .text{
          line-height: .4rem;
          color: #6b6f9f;
          .num{
            font-size: .15rem;
            color: #ff7d00;
          }
        }
        dl{
          display: flex;
          align-items:center;
          dt{
            width: .2rem;
            height: .2rem;
            margin-right: .08rem;
            img{
              width: 100%;
              height: 100%;
            }
          }
        }
      }
      .inStock{
        width: 100%;
        display: flex;
        color: #6b6f9f;
        box-sizing: border-box;
        padding-bottom: .12rem;
        .textLeft{
          margin-left: .1rem;
        }
        .people{
          margin-left:0.08rem;
        }
      }
    }
  }
  .buttonLists{
    display: flex;
    justify-content: space-around;
    aligin-items:center;
    padding:0.1rem;
    background-color:#171940;
    .buttonStyle{
      width:30%;
      line-height:0.25rem;
      color: #fff;
      border-radius: 2px;
      border:none;
    }
    .buttonStyle1{
      width:26%;
      line-height:0.25rem;
      background: #25cbc5;
      color: #fff;
      border-radius: 2px;
      border:none;
    }
    .buttonStyle2{
      background: #232651;
    }
  }
  /*弹框样式*/
  .men_ban {
    width: 100%;
    height: 100%;
    position: fixed;
    left: 0;
    top: 0;
    z-index: 666;
    background: rgba(0, 0, 0, 0.6);
  }

  .conformDialog{
    width:2.4rem;
    height:2.2rem;
    background-color:#fff;
    border-radius:3px;
    position:fixed;
    left: 50%;
    top: 50%;
    box-sizing: border-box;
    margin-left: -1.2rem;
    margin-top: -1.4rem;
    padding: 0 .1rem;
    z-index: 999;
    .title{
      height:0.45rem;
      font-size:0.12rem;
      text-align: center;
      box-sizing: border-box;
      padding: .1rem 0;
      color: #1d1e51;
      border-bottom: .01rem solid #eee;
      font-size: .14rem;
      p {
        line-height: .2rem;
      }
    }
    .content{
      width: 100%;
      height: 1.3rem;
      line-height: .2rem;
      display:flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      box-sizing: border-box;
      border-bottom: .01rem solid #eee;
      .contentItem{
        width:100%;
        text-align: center;
      }
      input{
        width:80%;
        height:0.25rem;
        background:none;
        outline:none;
        border:1px solid #ccc;
        margin-top:0.1rem;
        margin-bottom:0.1rem;
      }
      .textRed{
        color:#ff7e00;
        font-size:0.15rem;
      }
    }
    .bottom {
      box-sizing: border-box;
      height: 0.45rem;
      width: 100%;
      .conformWrapper{
        display:flex;
        justify-content: center;
        aligin-items:center;
        height: 0.3rem;
        color: #25cbc5;
        margin-top:0.08rem;
        .colse{
          border-right:1px solid #ccc;
        }
        div{
          line-height: 0.3rem;
          box-sizing:border-box;
          width:100%;
          height:100%;
          flex:1;
          font-size: .14rem;
          text-align: center;
        }
      }
    }
  }
  .Close {
    position: fixed;
    left: 50%;
    top: 50%;
    z-index: 999;
    margin-left: -.13rem;
    margin-top: .5rem;
    .iconfont {
      color: #fff;
      font-size: .25rem;
    }
  }
  .conformDialog1{
    @extend .conformDialog;
    height:1.8rem;
    .content{
      height: .9rem;
    }
  }
  .Close1 {
    @extend .Close;
    margin-top: 1rem;
  }
  .Close2 {
    @extend .Close;
    margin-top: .5rem;
  }
  .pageCount {
     width: 100%;
     height: .6rem;
     display: flex;
     justify-content: center;
     align-items: center;
     background: #111627;
   }
  .disabled {
    background: #c9c9c9 !important;
  }
  .newNoData{
    display:flex;
    justify-content: center;
    align-items: center;
    text-align:center;
    width:100%;
    color: #7e83ac;
    font-size:0.12rem;
    margin-top: .2rem;
    .displayNoData{
      padding:0.08rem 0rem;
      .imgSize{
        width:1.6rem;
      }
      div{
        .textcolor {
          color: #26cbc5;
          cursor: pointer;
        }
      }
    }
  }
</style>
