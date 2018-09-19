<template>
	<div id="Taocoin">
		<!--是否下架-->
		<div class="men_ban" v-if="isObtained"></div>
		<div class="isObtained" v-if="isObtained">
			<div class="title">
				<i class="iconfont icon-cuowu" @click="isObtained=false"></i>
			</div>
			<div class="contnet">
				<span class="blue">
					{{$t("taocoin.RemoveItOrNot")}}
				</span>
				<p class="gray">
          {{$t("taocoin.FrozenTokens")}}
				</p>
			</div>
			<div class="bottom">
				<button class="close" @click="isObtained=false">{{$t("taocoin.Cancel")}}</button>
				<button class="confirmObtained" @click="confirmObtained">{{$t("taocoin.RemoveImde")}}</button>
			</div>
		</div>
    <!--淘币提示-->
    <div class="men_ban" v-if="isTips"></div>
    <div class="Tips" v-if="isTips">
      <p class="title">{{$t("ApiManage.Hint")}}</p>
      <div class="content">{{$t("taocoin.PopoutTips")}}</div>
      <div class="rule">	<el-checkbox v-model="AgreeRule"> {{$t("taocoin.HaveKnown")}}</el-checkbox>
        <span class="quetocolor">《
								<router-link target="_blank" to="/TaocoinExchangeRules" class="linkcolor">{{$t("taocoin.ExchangeRules")}}</router-link>
								》</span></div>
      <div class="bottom">
        <button @click="ConfirmTips">{{$t("taocoin.Confirm")}}</button>
      </div>
    </div>
		<!--Taocoin	 content-->
		<div class="TaocoinContent">
			<!--淘币头部-->
			<div class="TaocoinTitle">
				<p class="risk">
					<span class="prompt">{{$t("taocoin.RiskReminder")}}：</span>
					<span class="text">{{$t("taocoin.InvestCoin")}}</span>
				</p>
				<div class="Currencyexchange">
					<img src="../../assets/people.png" class="people" />
					<img src="../../assets/people1.png" class="people1" />
					<img src="../../assets/slog.png" class="exchange" v-if="lang=='zh-CN'" />
          <img src="../../assets/TaocoinEN.png" class="exchangeEN" v-if="lang!='zh-CN'" alt="">
					<button class="clickTaocoin" @click="toCurrency">{{$t("taocoin.PublishTaocoin")}}</button>
				</div>
			</div>
			<!--淘币 分类    +   淘币  +  淘币中  +  淘币中-->
			<div class="TaocoinType">
				<p class="tab">
					<span class="active_border" @click="tabType(0)">{{$t("taocoin.ExchangeMarket")}}</span>
					<span @click="tabType(1)">{{$t("taocoin.Published")}}</span>
					<span @click="tabType(2)">{{$t("taocoin.MExchangedCoin")}}</span>
				</p>
				<div class="search">
					<div class="oelft">
						<el-select v-model="currency1" :placeholder="$t('taocoin.Pleashecoose')">
							<el-option v-for="item in currencyList" :key="item.pageIdentifier" :label="item.pageIdentifier" :disabled="currency2==item.id" :value="item.id">
								<span>{{ item.pageIdentifier }}</span>
							</el-option>
						</el-select>
					</div>
					<p class="icon">
						<i class="iconfont icon-duihuan-"></i>
					</p>
					<div class="oright">
						<el-select v-model="currency2" :placeholder="$t('taocoin.Pleashecoose')">
							<el-option v-for="item in currencyList" :key="item.pageIdentifier" :disabled="currency1==item.id" :label="item.pageIdentifier" :value="item.id">
								<span>{{ item.pageIdentifier }}</span>
							</el-option>
						</el-select>
					</div>
					<p class="submitSearch">
						<button class="button" @click="search">{{$t("taocoin.Search")}}</button>
					</p>
				</div>
			</div>
			<!--切换内容部分-->
			<!--1.兑币市场-->
			<div class="Taobaocontent taocoin" v-if="TaocoinIsShow">
				<div class="Taobao_item" v-for="(item,key) in market" @click="Exchangeofdetails(item.id,item)">
					<!--头部-->
					<div class="Taocoin_title">
						<div class="oleft">
							<img :src="item.main.logoUrl"/>
							<span class="Currency">
								{{item.main.pageIdentifier}}
                <span class="zh-fullName">
                  {{item.main.name}}
                </span>
							</span>
						</div>
						<div class="oright">
							{{item.order_people_count}}{{$t("taocoin.XXexchange")}}
						</div>
					</div>
					<!--切换兑价-->
					<div class="SwitchPrice">
						<!--选中兑换价格-->
						<div class="oleft">
							<span class="text">{{$t("taocoin.ExchangePrice")}}:</span>
							<p class="selectCurrency">
								<span class="Num">{{item.initNum.c_num/item.initNum.m_num | number(4)}}</span>
								<img :src="item.initNum.currency.logoUrl" />
								<span class="name">{{item.initNum.currency.pageIdentifier}}</span>
							</p>
						</div>
						<ul class="CurrencyList" v-if="item.stocks.length>1">
							<li v-for="(oimg,index) in item.stocks" @click.stop="tabCurrency(key,index)">
								<img :src="oimg.currency.logoUrl" />
							</li>
						</ul>
					</div>
					<!--币的介绍-->
					<div class="Currencyintroduction">
						{{item.main.summary}}
					</div>
					<!--数量-->
					<div class="Number">
						<span class="text">{{$t("taocoin.StartAmount")}}：</span>
						<p class="Num">
							<span class="low">{{item.lower | number(item.main.displayNum)}}</span> -
							<span class="high">{{item.balance | number(item.main.displayNum)}}</span>
							<span class="currencyName">{{item.main.pageIdentifier}}</span>
						</p>
					</div>
				</div>
				<!--淘币分页-->
				<div class="pageCount" v-if="TaocointTotal>6">
					<div class="button">
						<el-pagination layout="prev, pager, next" background :page-size="TaocoinPageCount" @current-change="pageTaocoinChange" :total="TaocointTotal">
						</el-pagination>
					</div>
				</div>
				<!--4.搜索不到显示-->
				<div class="noData" v-if="TaocointTotal==0">
					<div>
						<img src="../../assets/NotContentFund.png" alt="" class="distancetb imgSize">
						<div class="textsize">
							{{$t("taocoin.NotFoundCoin")}}
						</div>
					</div>
				</div>
			</div>
			<!--2.我发布的-->
			<div class="Taobaocontent" v-if="TaocoinZhongIsShow">
				<div class="IntheCoins">
					<ul class="item title">
						<li>{{$t("taocoin.ExchangeCoin")}}</li>
						<li>{{$t("taocoin.ExchangePrice")}}</li>
						<li>{{$t("taocoin.ExchangeC")}}</li>
						<li>{{$t("taocoin.PublishDate")}}</li>
						<li>{{$t("taocoin.Status")}}</li>
						<li>{{$t("taocoin.Action")}}</li>
					</ul>
					<ul class="item" v-for="(item,index) in incoinList">
						<li>
							<p class="oImg">
								<img :src="item.main.logoUrl" />
							</p>
							<span class="blue">{{item.main.pageIdentifier}}</span>
						</li>
						<li>{{item.stocks[0].c_num/item.stocks[0].m_num | number(item.stocks[0].currency.displayNum)}}{{item.stocks[0].currency.pageIdentifier}}</li>
						<li>{{item.balance - item.dec_balance | number(item.main.displayNum)}}{{item.main.pageIdentifier}}</li>
						<li>{{formatTime(item.created_at)}}</li>
						<li>
							<span v-if="item.status == 1">{{$t("taocoin.ExComplete")}}</span>
							<span v-if="item.status == 0">{{$t("taocoin.Exchanging")}}</span>
							<span v-if="item.status == -1">{{$t("taocoin.AlreadyRemoved")}}</span>
						</li>
						<li>
							<button :disabled="!item.is_brush || item.status == 1" :class="{'disabled':!item.is_brush || item.status == 1}" @click="refresh(item.id);item.is_brush=0">{{$t("taocoin.Refresh")}}</button>
							<button :disabled="item.status == -1 || item.status == 1" :class="{'disabled':item.status == -1 || item.status == 1}" @click="Obtained(item.id,index)">{{$t("taocoin.Remove")}}</button>
							<button @click="toDetails(item.id)">{{$t("taocoin.View")}}</button>
						</li>
					</ul>
					<!--暂无数据 淘币中-->
					<div class="noData" v-if="incoinTotal==0&&token!=null&&token!=undefined">
						<div>
							<img src="../../assets/NoContentFound.png" alt="" class="distancetb imgSize">
							<div class="textsize">
								<span>{{$t("taocoin.TPublish")}}</span>
								<router-link to="/index/Exchange" target="_blank" class="textcolor">{{$t("taocoin.TopublishCoin")}}</router-link>
							</div>
						</div>
					</div>
					<!--未登录-->
					<div class="noData" v-if="token==null&&token==undefined">
						<div>
							<img src="../../assets/NotLoggedIn.png" alt="" class="distancetb imgSize">
							<div class="textsize">
								<span>{{$t("taocoin.NotLogged")}}</span>
								<router-link to="/index/login" tag="span" class="textcolor">{{$t("taocoin.ToLogin")}}</router-link>
							</div>
						</div>
					</div>
				</div>
				<div class="pageCount" v-if="incoinTotal>10">
					<div class="button">
						<el-pagination layout="prev, pager, next" background :page-size="incoinPage" @current-change="pageIncoinChange" :total="incoinTotal">
						</el-pagination>
					</div>
				</div>

			</div>

			<!--3.我淘的币-->
			<div class="Taobaocontent" v-if="MyTaocoin">
				<div class="MyIntheCoins">
					<ul class="item title">
						<li>
							<span>{{$t("taocoin.ExchangeNumber")}}</span>
						</li>
						<li>{{$t("taocoin.ExchangeCoin")}}</li>
						<li>{{$t("taocoin.ExchangePrice")}}</li>
						<li>{{$t("taocoin.ExchangeR")}}</li>
						<li>{{$t("taocoin.ExchangeC")}}</li>
						<li>{{$t("taocoin.SellerAccount")}}</li>
						<li>{{$t("taocoin.DealTime")}}</li>
					</ul>
					<ul class="item" v-for="item in myOrderList">
						<li>
							<span>{{item.order_num}}</span>
						</li>
						<li>
							<span class="blue" v-if="item.type==1">
								{{item.main.pageIdentifier}}
							</span>
							<span class="blue" v-if="item.type==0">
								{{item.currency.pageIdentifier}}
							</span>
						</li>
						<li>{{item.price | number(item.main.displayNum)}}{{item.currency.pageIdentifier}}</li>
						<li>
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
						</li>
						<li>
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
						</li>
            <li>{{item.other.name}}</li>
						<li>{{formatTime(item.created_at)}}</li>
					</ul>
					<!--暂无数据-->
					<div class="noData" v-if="myOrderTotal==0&&token!=null&&token!=undefined">
						<div>
							<img src="../../assets/Taocoin.png" alt="" class="distancetb imgSize">
							<div class="textsize">
								<span>{{$t("taocoin.NotStarted")}}</span>
								<span class="textcolor" @click="tabType(0)">
									{{$t("taocoin.TOTaocoin")}}
								</span>
							</div>
						</div>
					</div>
					<!--未登录-->
					<div class="noData" v-if="token==null&&token==undefined">
						<div>
							<img src="../../assets/NotLoggedIn.png" alt="" class="distancetb imgSize">
							<div class="textsize">
								<span>{{$t("taocoin.NotLogged")}}</span>
								<router-link tag="span" class="textcolor" to="/index/login">
									{{$t("taocoin.ToLogin")}}
								</router-link>
							</div>
						</div>
					</div>
				</div>
				<div class="pageCount" v-if="myOrderTotal>10">
					<div class="button">
						<el-pagination layout="prev, pager, next" background :page-size="myOrderPage" @current-change="pagemyOrderChange" :total="myOrderTotal">
						</el-pagination>
					</div>
				</div>

			</div>

		</div>
	</div>
</template>

<script>
	import $ from "jquery"
	import axios from "axios";
	import { httpUrl } from "../http_url/http_url"
	import {mapState} from 'vuex';
	export default {
		data() {
			return {
				currency1: "",
				/*选择兑出币*/
				currency2: "",
				/*选择兑入币*/
				currencyList: [],
				/*在线币种列表*/
				market: [],
				/*淘币列表*/
				TaocoinIsShow: true,
				/*淘币内容*/
				TaocointTotal: 0,
				/*淘币列表总条数*/
				TaocoinPageCount: 0,
				/*每页显示条数*/
				TaocoinZhongIsShow: false,
				/*淘币中内容*/
				MyTaocoin: false,
				/*我淘的币*/
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
				/*显示总条数*/
				ObtainedID: "",
				/*下架id*/
				isObtained: false,
				/*是否下架*/
				ObtainedIndex: null, //下标
        AgreeRule:false, // 同意兑换规则
        isTips:false,    //规则的显示
			}
		},
		computed : {
			...mapState('user',['lang']),
		},
    watch:{
      lang:function (val){
        this.refreshLang();
      }
    },
		mounted() {
			let _this = this;
      /*获取淘币列表*/
      this.refreshLang();
			//判断用户是否同意交换规则
			if(!window.localStorage.getItem("isTips")){
			  this.isTips = true;
      }
			/*获取在线币种列表*/
			axios.get(httpUrl.currencyNaught).then(function(res) {
				_this.currencyList = res.data.data;
				_this.currencyList.push({'pageIdentifier':"全部","id":66});
			}, function(err) {
				console.log(err)
			})

			if(this.token == null && this.token == undefined) {
				return false;
			}
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
      ConfirmTips(){  //确认兑换
        if(this.AgreeRule==false){
          return;
        }else{
          this.isTips = false;
          window.localStorage.setItem("isTips",true)
        }
      },
      refreshLang(){
        let _this= this;
        if(this.lang == "zh-CN") {
          /*获取淘币列表*/
          axios.get(httpUrl.goods,{
            params:{lang:'zh'}
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
        }else{
          /*获取淘币列表*/
          axios.get(httpUrl.goods,{
            params:{lang:'en'}
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
        }
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
			Obtained(id, index) {
				this.ObtainedID = id;
				this.isObtained = true;
				this.ObtainedIndex = index;
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
              /*淘币市场*/
              axios.get(httpUrl.goods).then(function(res) {
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
						}
					},
					function(err) {
						console.log(err)
					})
			},
			toDetails(id) { /*淘币详情*/
				let routeData = this.$router.resolve({
					name: 'TaocoinDetails',
					params: {
						id: id
					}
				});
				window.open(routeData.href, '_blank');
			},
			Exchangeofdetails(TaocoinId,item) { /*淘币卡片列表*/
			  if(item.status!=0){
          this.$message({
            message: this.$t("fbjy.ProductRemoved"),
            type: 'warning'
          });
          return false;
        }
				let routeData = this.$router.resolve({
					name: 'Exchangeofdetails',
					params: {
						id: TaocoinId
					}
				});
				window.open(routeData.href, '_blank');
			},
			pageTaocoinChange(val) { /*淘币列表分页*/
				let _this = this;
				axios.get(httpUrl.goods, {
					params: {
						page: val
					}
				}).then(function(res) {
					_this.market = res.data.data.data;
					_this.TaocoinPageCount = res.data.data.per_page;
					_this.TaocointTotal = res.data.data.total;
					for(let i = 0; i < _this.market.length; i++) {
						_this.market[i].initNum = _this.market[i].stocks[0];
					}
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
				}, function(err) {
					console.log(err)
				})
			},
			tabType(index) { /*类型的切换*/
				$(".TaocoinType .tab span").eq(index).addClass("active_border").siblings("span").removeClass("active_border");
				var index = Number(index);
				if(index == 0) {
					this.TaocoinIsShow = true;
					this.TaocoinZhongIsShow = false;
					this.MyTaocoin = false;
				} else if(index == 1) {
					this.TaocoinIsShow = false;
					this.TaocoinZhongIsShow = true;
					this.MyTaocoin = false;
				} else {
					this.TaocoinIsShow = false;
					this.TaocoinZhongIsShow = false;
					this.MyTaocoin = true;
				}
			},
			tabCurrency(key, index) { /*淘币 --- 信息 ---- 币种切换*/
				this.market[key].initNum = this.market[key].stocks[index];
				this.market.splice(key, 1, this.market[key]);
			},
			toCurrency() { /*淘币----信息---页面跳转*/
				if(this.token == null && this.token == undefined) {
					this.$router.push({
						name: "login"
					})
				} else {
					let routeData = this.$router.resolve({
						name: "exchange"
					});
					window.open(routeData.href, '_blank');
				}
			},
			search() { /*搜索*/
				let _this = this;
				if(this.currency1==66 || this.currency2==66){
          /*获取淘币列表*/
          axios.get(httpUrl.goods).then(function(res) {
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
				  return false;
        }
				axios.get(httpUrl.goods, {
					params: {
						m_id: this.currency1,
						c_id: this.currency2
					}
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
			}
		}
	}
</script>
<style lang="scss">
	#Taocoin {
		/*改变element-ui的变化*/
		.el-form-item__content {
			margin: 0 !important;
		}
		.el-select {
			width: 100% !important;
		}
		.el-input__inner {
			width: 100% !important;
			height: 30px !important;
			line-height: 30px;
			color: #fff;
			border: 1px solid #2c3983;
			background: #101034;
		}
		.el-input__inner::-webkit-input-placeholder {
			color: #fff;
		}
		.el-form-item {
			margin-bottom: 0 !important;
		}
		/*分页样式*/
    .el-checkbox {
      font-weight: 400;
      color: #a0a0a0;
    }
		.el-pagination.is-background .el-pager li.active {
      border-color: #26cbc5 !important;
			background: #26cbc5 !important;
		}
    .el-checkbox__input.is-checked+.el-checkbox__label {
      color: #26CBC5 !important;
    }
    .el-checkbox__input.is-checked .el-checkbox__inner,
    .el-checkbox__input.is-indeterminate .el-checkbox__inner {
      background-color: #26CBC5 !important;
      border-color: #26CBC5 !important;
    }
    .el-checkbox__inner:hover {
      border-color: #26CBC5 !important;
    }
    .el-checkbox__input.is-checked+.el-checkbox__label {
      color: #26CBC5 !important;
    }
	}
</style>
<style lang="scss" scoped="scoped">
	#Taocoin {
		width: 100%;
		min-height: 100%;
		color: #fff;
		background-color: #0c1330;
		background-image: url(../../assets/taoBgColor.png);
		background-repeat: no-repeat;
		padding-top: 1px;
	}

	.disabled {
		background: #c9c9c9 !important;
	}
	/*淘币内容部分*/

	.TaocoinContent {
		max-width: 1200px;
		box-sizing: border-box;
		margin: 0 auto;
		.TaocoinTitle {
			width: 100%;
      margin-top: 100px;
			.risk {
				width: 100%;
				text-align: right;
				font-size: 13px;
				margin-top: 40px;
				.prompt {
					color: #f18d15;
				}
			}
		}
		.Currencyexchange {
			width: 100%;
			height: 70px;
			line-height: 70px;
			background: linear-gradient(to bottom, rgba(26, 42, 130, 0.2), rgba(26, 42, 130, 0.3), rgba(26, 42, 130, 0.4), rgba(26, 42, 130, 0.5), rgba(26, 42, 130, 0.8));
			margin-top: 30px;
			.people {
				margin-top: -65px;
				margin-left: 10px;
				margin-right: 10px;
			}
			.people1 {
				margin-top: -52px;
			}
			.exchange {
				width: 250px;
				height: 30px;
				margin-left: 35px;
				margin-top: 18px;
			}
      .exchangeEN{
        width: 235px;
        height: 45px;
        margin-left: 35px;
        margin-top: 14px;
      }
			.clickTaocoin {
				width: 100px;
				height: 33px;
				border-color: #f86718;
				background: #f86718;
				float: right;
				color: #fff;
				border-radius: 4px;
				font-size: 15px;
				margin-top: 18px;
        margin-right: 20px;
				outline: none;
			}
		}
	}
	/*选中状态*/

	.active_border {
		color: #fff !important;
		border-bottom: 2px solid #fff !important;
	}
	/*淘币分类*/

	.TaocoinType {
		width: 100%;
		height: 100px;
		display: flex;
		align-items: center;
		justify-content: space-between;
		font-size: 14px;
		.tab {
			span {
				margin-right: 10px;
				cursor: pointer;
				color: #9b9cee;
				padding: 5px 5px;
				margin-right: 30px;
			}
		}
		.search {
			display: flex;
			align-items: center;
			.icon {
				width: 50px;
				height: 50px;
				text-align: center;
				line-height: 50px;
				padding-top: 5px;
				.iconfont {
					font-size: 50px;
					color: #26cbc5;
				}
			}
			.oelft,
			.oright {
				width: 90px;
			}
			.submitSearch {
				margin-left: 25px;
				button {
					width: 75px;
					height: 30px;
					border-color: #26cbc5;
					background: #26cbc5;
					border-radius: 4px;
					font-size: 15px;
					color: #fff;
					outline: none;
				}
			}
		}
	}
	/*淘币内容部分*/

	.taocoin {
		width: 100%;
		display: flex;
		flex-wrap: wrap;
		.Taobao_item:nth-child(3n) {
			margin-right: 0;
		}
		.Taobao_item {
			width: 32%;
			height: 185px;
			cursor: pointer;
			background: #fff;
			border-radius: 4px;
			margin-right: 24px;
			margin-bottom: 24px;
			color: #000;
			.Taocoin_title {
				width: 100%;
				height: 40px;
				display: flex;
				align-items: center;
				box-sizing: border-box;
				padding: 0 10px;
				background: linear-gradient(to bottom, rgba(166, 170, 192, 0.1), rgba(166, 170, 192, 0.2), rgba(166, 170, 192, 0.3), rgba(166, 170, 192, 0.4), rgba(166, 170, 192, 0.5), rgba(166, 170, 192, 0.7), rgba(166, 170, 192, 0.8));
				justify-content: space-between;
				.oleft {
					display: flex;
					align-items: center;
					img {
						width: 25px;
						height: 25px;
						margin-right: 5px;
					}
					.Currency {
						font-size: 13px;
            .zh-fullName{
              font-size: 14px;
              color: #646c90;
              margin-left:2px;
            }
					}
				}
				.oright {
					color: #4956a1;
				}
			}
			/*选切换内容部分*/
			.SwitchPrice {
				width: 100%;
				height: 70px;
				display: flex;
				align-items: center;
				justify-content: space-between;
				box-sizing: border-box;
				padding: 0 10px;
				img {
					width: 20px;
					height: 20px;
				}
				.text {
					color: #4956a1;
				}
				.oleft {
					display: flex;
					align-items: center;
				}
				/*选中币信息*/
				.selectCurrency {
					height: 20px;
					line-height: 20px;
					display: flex;
					align-items: center;
					margin-left: 5px;
					.Num {
            display: inline-block;
            max-width: 150px;
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
						font-size: 26px;
						color: #ff7e00;
						margin-right: 5px;
					}
					img {
						margin: 0 5px;
						margin-bottom: 2px;
					}
				}
				/*币种列表*/
				.CurrencyList {
					display: flex;
					li {
						cursor: pointer;
						margin-right: 10px;
					}
					li:nth-last-child(1) {
						margin: 0;
					}
				}
			}
			/*币信息介绍*/
			.Currencyintroduction {
				width: 95%;
				height: 30px;
				white-space: nowrap;
				text-overflow: ellipsis;
				overflow: hidden;
				line-height: 23px;
				box-sizing: border-box;
				margin: 0 auto;
				font-size: 13px;
				border-bottom: 2px solid #d1d4df;
				color: #4956a1;
			}
			/*数量介绍*/
			.Number {
				width: 100%;
				height: 45px;
				display: flex;
				align-items: center;
				box-sizing: border-box;
				padding: 0 10px;
				.text {
					color: #4956a1;
				}
				.low,
				.high {
					font-size: 15px;
				}
			}
		}
	}
	/*淘币中*/

	.IntheCoins {
		width: 100%;
		background: #fff;
		color: #000;
		border-radius: 4px;
		padding: 3px 0;
		.title {
			li:nth-of-type(1) {
				display: flex;
				justify-content: center;
			}
			li {
				color: #9A9A9A;
			}
		}
		.item:nth-of-type(even) {
			background: #edeef5;
		}
		.item {
			width: 100%;
			height: 55px;
			line-height: 55px;
			display: flex;
			font-size: 14px;
			align-items: center;
			color: #323234;
			li {
				flex: 1;
				text-align: center;
			}
			li:nth-of-type(1) {
				display: flex;
				align-items: center;
				.oImg {
					width: 43%;
					display: flex;
					align-items: center;
					justify-content: flex-end;
					img {
						width: 30px;
						height: 30px;
						margin-right: 10px;
					}
				}
				.blue {
					width: 50%;
					display: inline-block;
					color: #3736c0;
					text-align: left;
				}
			}
			li:nth-of-type(4) {
				flex: 1.5;
			}
			li:nth-last-child(1) {
				flex: 2;
				display: flex;
				align-items: center;
				justify-content: center;
				button {
					width: 70px;
					height: 28px;
					border-radius: 5px;
					background: #26cbc5;
					color: #fff;
					font-size: 13px;
					margin-right: 10px;
					outline: none;
				}
			}
		}
	}
	/*分页*/

	.pageCount {
		width: 100%;
		height: 60px;
		display: flex;
		align-items: center;
		justify-content: flex-end;
	}
	/*暂无数据*/

	.noData {
		width: 100%;
		height: 270px;
		background: #fff;
		display: flex;
		justify-content: center;
		align-items: center;
		line-height: 50px;
		text-align: center;
		font-size: 16px;
		color: #9A9A9A;
	}
	/*我淘的币*/

	.MyIntheCoins {
		width: 100%;
		background: #fff;
		padding: 3px 0;
		border-radius: 4px;
		.title {
			li {
				color: #9A9A9A;
			}
		}
		.item:nth-of-type(even) {
			background: #edeef5;
		}
		.item {
			height: 55px;
			line-height: 55px;
			display: flex;
			align-items: center;
			color: #323234;
			li {
				flex: 1;
				text-align: center;
				font-size: 14px;
			}
			li:nth-of-type(1) {
				text-align: left;
				box-sizing: border-box;
				span {
					margin-left: 30px;
				}
			}
		}
	}
	/*蒙版*/

	.men_ban {
		width: 100%;
		height: 100%;
		background: rgba(0, 0, 0, 0.5);
		position: fixed;
		left: 0;
		top: 0;
		z-index: 66;
	}
	/*是否确认下架 */

	.isObtained {
		width: 400px;
		height: 200px;
		background: #fff;
		position: fixed;
		left: 50%;
		top: 50%;
		margin-left: -200px;
		margin-top: -100px;
		z-index: 99;
    border-radius: 4px;
		.title {
			width: 100%;
			height: 50px;
			line-height: 50px;
			box-sizing: border-box;
			padding: 0 20px;
			text-align: right;
			.iconfont {
				font-size: 16px;
				color: #000;
        cursor: pointer;
			}
		}
		.contnet {
			text-align: center;
			padding-bottom: 30px;
			border-bottom: 1px solid #dddddd;
			.blue {
				font-size: 15px;
				color: #353377;
			}
			.gray {
        min-height: 35px;
        padding: 0px 10px;
        margin-top:14px;
				text-align: center;
				color: #b2b5c5;
				font-size: 13px;
				line-height: 25px;
			}
		}
		.bottom {
			width: 100%;
			height: 50px;
			display: flex;
			justify-content: flex-end;
			align-items: center;
			.close {
				width: 60px;
				text-align: center;
				color: #49436f;
				font-size: 13px;
				outline: none;
			}
			.confirmObtained {
				width: 90px;
				height: 33px;
				border-radius: 4px;
				color: #fff;
				background: #26cbc5;
				margin-right: 10px;
				outline: none;
			}
		}
	}

	.textcolor {
		color: #26cbc5;
		cursor: pointer;
	}

	.textsize {
		font-size: 14px;
    color:#c7c7c7;
	}

	.distancetb {
		margin: 15px auto;
	}
  .Tips{
    width: 400px;
    background: #fff;
    position: fixed;
    left: 50%;
    top: 50%;
    margin-left: -200px;
    margin-top: -100px;
    z-index: 99;
    border-radius: 4px;
    .title{
      height: 40px;
      line-height: 40px;
      color: #000;
      box-sizing: border-box;
      padding: 0 20px;
      font-size: 15px;
    }
    .content{
      color: #a0a0a0;
      line-height: 22px;
      box-sizing: border-box;
      padding: 0 20px;
      font-size: 13px;
    }
    .rule{
      line-height: 40px;
      box-sizing: border-box;
      padding: 0 20px;
    }
    .bottom{
      width: 100%;
      height: 50px;
      display: flex;
      justify-content: flex-end;
      align-items: center;
      border-top: 1px solid #eee;
      button{
        width: 120px;
        height: 35px;
        border-radius: 4px;
        border-color: #26cbc5;
        background: #26cbc5;
        color: #fff;
        margin-right: 10px;
        outline: none;
      }
    }
    .quetocolor {
      color: #26CBC5;
      font-size: 14px;
      a{
        color: #26CBC5;
      }
    }
  }
  .imgSize{
    width:128px;
  }
</style>
