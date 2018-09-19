<template>
	<div id="Home">
    <!--iframs-->
    <div class="iframe" v-if="iframeIsShow">
      <div class="title">
        <p @click="iframeIsShow=false;">
          <i class="iconfont icon-back-copy"></i>
          <span>{{$t('shouye.ReturnTo')}}</span>
        </p>
      </div>
      <iframe :src="iframeUrl" class="iframeBox"></iframe>
    </div>
		<!--banner  start-->
		<div class="bannerBox">
			<div class="bannerSwiper">
				<swiper class="swiper" :options="swiperOption1" ref="mySwiper1">
          <swiper-slide v-for="(item,key) in bannerList" :key="key">
            <img :src="item.img"  @click="toLink(item)" alt="">
          </swiper-slide>
				</swiper>
			</div>
		</div>
		<!--公告部分-->
		<div class="gong_gao">
			<swiper :options="swiperOption" ref="mySwiper">
				<swiper-slide v-for="(item,index) in NoticeList" :key="index">
					<p class="title" @click="toNotice(item)">
						{{item.title}}
					</p>
					<div class="content">
						{{item.subtitle}}
					</div>
				</swiper-slide>
				<div class="swiper-button-prev swiper-button-white" slot="button-prev"></div>
				<div class="swiper-button-next swiper-button-white" slot="button-next"></div>
			</swiper>
		</div>
		<!--banner end-->
		<!--我的资产部分-->
		<div class="my-Assets mian_bg" v-show="token!=null||token!=undefined">
			<!--我的资产-->
			<section>
				<span class="title_my">{{$t("list.Net_asset_conversion")}}</span>
				<i class="iconfont icon-yanjing" v-show="AssetsIsShow" @click="Hiddenassets"></i>
				<i class="iconfont icon-biyanjing" v-show="!AssetsIsShow" @click="showAsstes"></i>
			</section>
			<!--资产显示-->
			<section v-show="AssetsIsShow">
				<span class="greenColor">{{CurBalance | number(8)}}BTC ≈ {{RBalance | number(2)}} CNY</span>
			</section>
			<div class="prohibitAssets" v-show="!AssetsIsShow">
				<i class="iconfont icon-xinghao"></i>
				<i class="iconfont icon-xinghao"></i>
				<i class="iconfont icon-xinghao"></i>
				<i class="iconfont icon-xinghao"></i> BTC &nbsp;≈&nbsp;
				<i class="iconfont icon-xinghao"></i>
				<i class="iconfont icon-xinghao"></i>
				<i class="iconfont icon-xinghao"></i>
				<i class="iconfont icon-xinghao"></i> CNY
			</div>
		</div>
		<!--IMX创新区-->
		<div class="selectList" v-if="imxCoins.length">
			<div class="tab_currency">
			<ul class="tab_title">
			<li class="" style="width:20%">IMX
					<span></span>
				</li>
			</ul>
			</div>
			<div class="ContentList" v-for="(items,key) in imxCoins" v-show="imxCoins && imxCoins.length">
				<ul class="ContentList_item" v-for="item in items.matchcoins" @click="toLine(item.matchcoin_id,item.id)">
					<li>
						<p class="top">{{item.pageIdentifier}}/{{items.pageIdentifier}}</p>
						<p class="bottom">{{$t("list.The_amount_of_24H")}}
							<span v-show="item.hour24!=null">{{item.hour24 | number(2)}}</span>
							<span v-show="item.hour24==null">0.00</span>
						</p>
					</li>
					<li>
						<p class="top">
							<span v-show="item.price!=null">{{item.price}}</span>
							<span v-show="item.price==null">0.00</span>
						</p>
						<p class="bottom">
							￥<span v-show="item.cny!=null">{{item.cny}}</span><span v-show="item.cny==null">0.00</span>
						</p>
					</li>
					<li>
						<button :class="{'green':item.updown>0}" v-if="item.updown>0">+{{item.updown | number(2)}}%</button>
						<button :class="{'red':item.updown<0}" v-if="item.updown<0">{{item.updown | number(2)}}%</button>
						<button :class="{'blue':item.updown==0}" v-if="item.updown==0">+{{item.updown | number(2)}}%</button>
					</li>
				</ul>
			</div>
			</div>
		<!--选择币种部分-->
		<div class="tab_currency">
			<ul class="tab_title">
				<li @click="SelfSelection()" :class="{'active_color':tabIndex==-1}">
					{{$t("list.Optional")}}
					<span></span>
				</li>
				<li v-for="(item,key) in otherCoins" class="title" :class="{'active_color':tabIndex==key}" @click="tabCurrency(item.id,key)">
					{{item.pageIdentifier}}
					<span></span>
				</li>
			</ul>
			<p class="search" @click="popupVisible=true">
				<i class="iconfont icon-sousuo1"></i>
			</p>
		</div>
		<!--选项卡内容-->
		<div class="selectList">
			<!--自选内容-->
			<div class="ziXuan_content" v-show="tabIndex == -1">
				<div class="add" v-show="OptionalList.length==0">
					<p class="border" @click="popupVisible=true">
						<i class="iconfont icon-jia1"></i> {{$t("capital.Add")}} {{$t("list.Optional")}}
					</p>
				</div>
				<ul class="ContentList_item" v-for="item in OptionalList" @click="toLine(item.matchcoin_id,item.yes_id)">
					<li>
						<p class="top">{{item.matchname}}</p>
						<p class="bottom">{{$t("list.The_amount_of_24H")}}
							<span v-show="item.hour24!=null">{{item.hour24 | number(2)}}</span>
							<span v-show="item.hour24==null">0.00</span>
						</p>
					</li>
					<li>
						<p class="top">
							<span v-show="item.price!=null">{{item.price}}</span>
							<span v-show="item.price==null">0.00</span>
						</p>
						<p class="bottom">
							￥<span v-show="item.cny!=null">{{item.cny}}</span><span v-show="item.cny==null">0.00</span>
						</p>
					</li>
					<li>
						<button :class="{'green':item.updown>0}" v-if="item.updown>0">+{{item.updown | number(2)}}%</button>
						<button :class="{'red':item.updown<0}" v-if="item.updown<0">{{item.updown | number(2)}}%</button>
						<button :class="{'blue':item.updown==0}" v-if="item.updown==0">+{{item.updown | number(2)}}%</button>
					</li>
				</ul>
			</div>
			<div class="ContentList" v-for="(items,key) in otherCoins" v-show="tabIndex==key">
				<ul class="ContentList_item" v-for="item in items.matchcoins" @click="toLine(item.matchcoin_id,item.id)">
					<li>
						<p class="top">{{item.pageIdentifier}}/{{items.pageIdentifier}}</p>
						<p class="bottom">{{$t("list.The_amount_of_24H")}}
							<span v-show="item.hour24!=null">{{item.hour24 | number(2)}}</span>
							<span v-show="item.hour24==null">0.00</span>
						</p>
					</li>
					<li>
						<p class="top">
							<span v-show="item.price!=null">{{item.price}}</span>
							<span v-show="item.price==null">0.00</span>
						</p>
						<p class="bottom">
							￥<span v-show="item.cny!=null">{{item.cny}}</span><span v-show="item.cny==null">0.00</span>
						</p>
					</li>
					<li>
						<button :class="{'green':item.updown>0}" v-if="item.updown>0">+{{item.updown | number(2)}}%</button>
						<button :class="{'red':item.updown<0}" v-if="item.updown<0">{{item.updown | number(2)}}%</button>
						<button :class="{'blue':item.updown==0}" v-if="item.updown==0">+{{item.updown | number(2)}}%</button>
					</li>
				</ul>
			</div>
		</div>

		<!--自选列表内容部分-->
		<mt-popup v-model="popupVisible" position="right">
			<!--头部的搜索框-->
			<div class="oHeader_search">
				<i class="iconfont icon-sousuo1"></i>
				<input type="text" v-model="searchVal" @input="searchBi()" :placeholder="$t('list.Searchcurrency')" />
				<span @click="popupVisible=false">{{$t("userCenter.Cancel")}}</span>
			</div>
			<!--搜索的币种内容-->
			<div class="currency_content">
				<ul>
					<li v-for="(item,index) in CoinPairlist" v-show="item.isIF">
						<span>{{item.name}}</span>
						<i class="iconfont icon-xingxing" @click.stop="isClone(item,$event,index)" :class="{'icon-xingxingman':itemslocalstorge.indexOf(item.mac_id)!=-1}"></i>
					</li>
				</ul>
				<!--提示暂无数据-->
				<div v-show="isWu" class="zan_wu">{{$t("list.noData")}}</div>
			</div>
		</mt-popup>

	</div>
</template>

<script>
	import header from "../public/header"
	import store from "../../store.js"; //引入
	import { swiper, swiperSlide } from 'vue-awesome-swiper' //swiper
	import { mapGetters,mapActions,mapState,mapMutations } from 'vuex'
	require('swiper/dist/css/swiper.css') //注意这里
	export default {
		data() {
			return {
				tabIndex:0,
				title: this.$t("list.Home_page"),
				AssetsIsShow: true,
				/*显示或者隐藏资产*/
				matchcoins: [],
				/*币种列表*/
				popupVisible: false,
				/*弹出选择框*/
				CoinPairlist: [],
				/*币对列表主币+对币*/
				searchVal: "",
				/*搜索名称*/
				isWu: false,
				itemslocalstorge: store.fetch(), ///本地存储未登录状态	   --- 收藏列表
				getIcon: store.get(), ////收藏按钮
				OptionalList: [], ///收藏币种数组
				swiperOption: { //以下配置不懂的，可以去swiper官网看api，链接http://www.swiper.com.cn/api/
					loop: true,
					navigation: {
						disabledClass: 'my-button-disabled', //前进后退按钮不可用时的类名。
						nextEl: '.swiper-button-next', //前进按钮的css选择器或HTML元素。
						prevEl: '.swiper-button-prev', //后退按钮的css选择器或HTML元素
					},
        },
				swiperOption1: {
					loop: true, //循环
					//设置自动播放速度
					autoplay: {
						disableOnInteraction: false,
						delay: 5000
					},
				},
				NoticeList: [],
				/*公告列表*/
				CurBalance: 0,
				/*btc余额*/
				RBalance: 0,
				/*人民币的余额*/
        bannerList:[],/*轮播图*/
        iframeIsShow:false, /*iframe是否显示*/
        iframeUrl:"", /*跳转链接*/
			}
		},
		computed:{
			...mapState('user',['lang']),
			...mapGetters('setting',['urlPrefix']),
			imxCoins(){
				return this.matchcoins.filter((item)=>item.pageIdentifier == 'IMX');

			},
			otherCoins(){
				return this.matchcoins.filter((item)=>item.pageIdentifier != 'IMX');
			}

		},
		components: { /*注册组件*/
			"my-header": header,
			swiper,
			swiperSlide
		},
		watch: { //监听
			itemslocalstorge: { ///收藏的数组
				handler: function(val, oldVal) {
					store.save(val)
				},
				deep: true
			},
			getIcon: { ////收藏的字体图标
				handler: function(val, oldVal) {
					store.set(val)
				},
				deep: true
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
		mounted() {
		  /*获取banner*/
      this.$ajax.get(this.httpUrl.banner,{
        params:{lang:this.lang}
      }).then(res=>{
        this.bannerList = res.data.data.app;
      },err=>{
        console.log(err);
      })
			/*判断用户是否隐藏资产*/
			if(window.localStorage.getItem("Assets") != null && window.localStorage.getItem("Assets") == 0) {
				this.AssetsIsShow = false;
			} else {
				this.AssetsIsShow = true;
			}
			let _this = this;
      /*请求所有的币对*/
			this.$ajax.get(this.httpUrl.coin_matching,{
			params: {
				symbol: this.urlPrefix,
				...(this.userInfo ? { code: this.userInfo.user_id } : {}),
			}
		}).then(function(res) {
				_this.matchcoins = res.data.data;
				/*将默认的主币id和对币id存起来*/
				if(window.localStorage.getItem("main_id") == null) { /*判断主币id是否存在*/
					window.localStorage.setItem("main_id", res.data.data[0].id)
				}
				if(window.localStorage.getItem("yes_id") == null) { /*判断是否存在对币的ID*/
					window.localStorage.setItem("yes_id", res.data.data[0].matchcoins[0].id)
				}
				for(let i = 0; i < _this.matchcoins.length; i++) {
					for(let j = 0; j < _this.matchcoins[i].matchcoins.length; j++) {
						_this.CoinPairlist.push({
							"name": _this.matchcoins[i].matchcoins[j].pageIdentifier + "/" + _this.matchcoins[i].pageIdentifier,
							"mac_id": _this.matchcoins[i].matchcoins[j].matchcoin_id,
							"isIF": false
						})
					}
				}
				var aa = [];
				for(let k = 0; k < _this.matchcoins.length; k++) {
					for(let n = 0; n < _this.matchcoins[k].matchcoins.length; n++) {
						if(_this.itemslocalstorge.indexOf(_this.matchcoins[k].matchcoins[n].matchcoin_id) != -1) {
							if(aa.indexOf(_this.matchcoins[k].matchcoins[n].matchcoin_id) == -1) {
								_this.OptionalList.push({
									'isIf': true,
									'matchcoin_id': _this.matchcoins[k].matchcoins[n].matchcoin_id,
									'matchname': _this.matchcoins[k].matchcoins[n].pageIdentifier + "/" + _this.matchcoins[k].pageIdentifier,
									'price': _this.matchcoins[k].matchcoins[n].price,
									'updown': _this.matchcoins[k].matchcoins[n].updown,
									'hour24': _this.matchcoins[k].matchcoins[n].hour24,
									'high': _this.matchcoins[k].matchcoins[n].high,
									'low': _this.matchcoins[k].matchcoins[n].low,
									'cny': _this.matchcoins[k].matchcoins[n].cny,
									'main_id': _this.matchcoins[k].id,
									/*主币id*/
									"yes_id": _this.matchcoins[k].matchcoins[n].id /*对币id*/
								})
								aa.push(_this.matchcoins[k].matchcoins[n].matchcoin_id)
							}
						}
					}
				}
			}, function(err) {
				console.log(err)
			})

			/*获取重要公告内容*/
			if(this.lang != 'zh') {
				this.$ajax.get(this.httpUrl.newsImportant, {
					params: {
						lang: "en"
					}
				}).then(function(res) {
					_this.NoticeList = res.data.data;
				}, function(err) {
					console.log(err)
				})
			} else {
				this.$ajax.get(this.httpUrl.newsImportant, {
					params: {
						lang: "zh"
					}
				}).then(function(res) {
					_this.NoticeList = res.data.data;
				}, function(err) {
					console.log(err)
				})
			}

			if(this.token != null || this.token != undefined) {
				////获取资产信息的内容
				_this.$ajax.get(_this.httpUrl.finances, {
					headers: {
						"Authorization": "Bearer " + _this.token
					}
				}).then(function(res) {
					_this.assetsList = res.data.data; /*资产管理*/
					let btcBla = 0; ///BTC剩余值
					let rmbBla = 0; ///人民币剩余值
					for(let i = 0; i < _this.assetsList.length; i++) {
						btcBla += parseFloat(_this.assetsList[i].btc_blance);
						rmbBla += parseFloat(_this.assetsList[i].cny_blance);
					}
					_this.CurBalance = btcBla; ///btc值变化
					_this.RBalance = rmbBla; ///人民币值变化
				}, function(err) {
					console.log(err)
				})
				this.info();
				/*获取用户信息*/
				// if(!_this.userInfo.user_id) {
				// 	this.$ajax.get(this.httpUrl.userInfo, {
				// 		headers: {
				// 			"Authorization": "Bearer " + _this.token
				// 		}
				// 	}).then(function(res) {
				// 		window.localStorage.setItem("userID", res.data.data.user_id);
				// 	}, function(err) {
				// 		console.log(err)
				// 	})
				// }

			}
			/*获取累积折合列表*/

			/******实时推送数码开始******/
			// var ws = new WebSocket(_this.wsIp); ///定义全局
			var ws = this.ws;
			ws.onopen = function() {
				ws.send('{"mid":12}'); /*切换币对id*/
			}
			ws.onmessage = function(e) {
				var arr = JSON.parse(e.data);
				if(arr.type == "ping") { ////判断type
					ws.send('{"pong":' + Date.now() + '}');
				} else if(arr.type == "refresh") {
					/*刷新资产管理*/
					_this.$ajax.get(_this.httpUrl.finances, {
						headers: {
							"Authorization": "Bearer " + _this.token
						}
					}).then(function(res) {
						_this.assetsList = res.data.data;
						let btcBla = 0; ///BTC剩余值
						let rmbBla = 0; ///人民币剩余值
						for(let i = 0; i < _this.assetsList.length; i++) {
							btcBla += parseFloat(_this.assetsList[i].btc_blance);
							rmbBla += parseFloat(_this.assetsList[i].cny_blance);
						}
						_this.CurBalance = btcBla; ///btc值变化
						_this.RBalance = rmbBla; ///人民币值变化
					}, function(err) {
						console.log(err)
					})
				} else if(arr.type == "socket") {
					for(let i = 0; i < arr.message.length; i++) {
						if(arr.message[i].type == "matchcoins") { //实时推送列表
							let arrList = arr.message[i].message;
							for(let n = 0; n < arrList.length; n++) {
								for(let i = 0; i < _this.matchcoins.length; i++) { /*拿到页面需要的值*/
									for(let j = 0; j < _this.matchcoins[i].matchcoins.length; j++) {
										if(_this.matchcoins[i].matchcoins[j].matchcoin_id == arrList[n].id) {
											_this.matchcoins[i].matchcoins[j].price = arrList[n].price;
											_this.matchcoins[i].matchcoins[j].updown = arrList[n].updown;
											_this.matchcoins[i].matchcoins[j].hour24 = arrList[n].hour24;
											_this.matchcoins[i].matchcoins[j].high = arrList[n].high;
											_this.matchcoins[i].matchcoins[j].low = arrList[n].low;
											_this.matchcoins[i].matchcoins[j].cny = arrList[n].cny;
										}
									}
								}
							}
							///遍历收藏里面的币种区
							for(let i = 0; i < arrList.length; i++) { ///遍历实时推送的数据
								for(let j = 0; j < _this.OptionalList.length; j++) {
									if(_this.OptionalList[j].matchcoin_id == arrList[i].id) {
										_this.OptionalList[j].price = arrList[i].price;
										_this.OptionalList[j].updown = arrList[i].updown;
										_this.OptionalList[j].hour24 = arrList[i].hour24;
										_this.OptionalList[j].high = arrList[i].high;
										_this.OptionalList[j].low = arrList[i].low;
										_this.OptionalList[j].cny = arrList[i].cny;
									}
								}
							}

						}
					}
				}
			}

			/*******实时推送数据结束**********/

		},

		methods: {
      toLink(item){
        switch(item.type)
        {
          case 0:               /*外链*/
            this.iframeUrl = item.url;
            this.iframeIsShow = true;
            break;
          case 1:               /*公告*/
            this.$router.push({name: 'gongGao',params:{id:item.param}});
            break;
          case 2:               /*展示*/
            if(item.param){
              this.$router.push({path:item.param});
            }else{
              return;
            }
            break;
          default:
            return;
        };
      },
			...mapActions('user',['info']),
			toAirdrop() {
				this.$router.push({
					name: "airdrop"
				})
			},
			toNotice(item) { /*跳转公告详情页面*/
				if(item.app_link == "") {
					this.$router.push({
						name: "gongGao",
						params: {
							id: item.id
						}
					});
				} else {
					/*判断用户是否登录*/
					if(item.app_link == "inviteNoLogin") {
						if(this.token == null || this.token == undefined) {
							this.$router.push({
								name: "inviteNoLogin"
							});
						} else {
							this.$router.push({
								name: "friends"
							})
						}
					} else {
						this.$router.push({
							name: item.app_link
						})
					}
				}

			},
			toYao() { /*跳转到邀请页面*/
				if(this.token == null || this.token == undefined) {
					this.$router.push({
						name: "inviteNoLogin"
					});
				} else {
					this.$router.push({
						name: "friends"
					})
				}
			},
			toWa() { /*交易规则介绍*/
				this.$router.push({
					name: "TradingRules"
				});
			},
			showAsstes() { /*显示资产*/
				this.AssetsIsShow = true;
				window.localStorage.setItem("Assets", 1);
			},
			Hiddenassets() { /*隐藏资产*/
				this.AssetsIsShow = false;
				window.localStorage.setItem("Assets", 0);
			},
			toLine(macthId, yes_id) { /*跳转k线图*/
				window.localStorage.setItem("yes_id", yes_id);
				this.$router.push({
					name: "Kline",
					params: {
						id: macthId
					}
				})
			},
			tabCurrency(id, index) { /*币种切换*/
				this.tabIndex = index;
				// $(".tab_title .title").eq(index).addClass("active_color").siblings("li").removeClass("active_color");
				// $(".selectList .ContentList").eq(index).show().siblings(".ContentList").hide();
			},
			SelfSelection() { /*自选切换*/
				this.tabIndex = -1;
				// $(".SelfSelection").addClass("active_color").siblings(".title").removeClass("active_color");
				// $(".selectList .ContentList").hide();
			},
			searchBi() { /*搜索币种*/
				let _this = this;
				let Low = _this.searchVal.toUpperCase(); /*转化成大写英文*/
				let one_num = 0;
				for(let i = 0; i < _this.CoinPairlist.length; i++) {
					if(_this.CoinPairlist[i].name.indexOf(Low) == -1) {
						_this.CoinPairlist[i].isIF = false;
					} else {
						_this.CoinPairlist[i].isIF = true;
						one_num++;
					}
				}
				if(one_num == 0) { //判断是否有无数据
					_this.isWu = true;
				} else {
					_this.isWu = false;
				}
			},
			isClone(data, e, index) { /*收藏*/
				let _this = this;
				if(e.target.className == "iconfont icon-xingxing") {
					e.target.className = "iconfont icon-xingxingman";
					_this.itemslocalstorge.push(
						data.mac_id
					); ///将ID存起来
					var kk1 = [];
					/////////将收藏的币种进行判断是否在或者收藏区
					for(let i = 0; i < _this.matchcoins.length; i++) {
						for(let j = 0; j < _this.matchcoins[i].matchcoins.length; j++) {
							if(data.mac_id == _this.matchcoins[i].matchcoins[j].matchcoin_id) {
								_this.OptionalList.push({
									'isIf': true,
									'matchcoin_id': _this.matchcoins[i].matchcoins[j].matchcoin_id,
									'matchname': _this.matchcoins[i].matchcoins[j].pageIdentifier + "/" + _this.matchcoins[i].pageIdentifier,
									"price": _this.matchcoins[i].matchcoins[j].price,
									"updown": _this.matchcoins[i].matchcoins[j].updown,
									"hour24": _this.matchcoins[i].matchcoins[j].hour24,
									"high": _this.matchcoins[i].matchcoins[j].high,
									"low": _this.matchcoins[i].matchcoins[j].low,
									"cny": _this.matchcoins[i].matchcoins[j].cny
								})
								kk1.push(_this.matchcoins[i].matchcoins[j].matchcoin_id)
							}
						}
					}
				} else { //取消收藏
					for(let i = 0; i < _this.itemslocalstorge.length; i++) { // 将数据删除
						if(_this.itemslocalstorge[i] == data.mac_id) {
							_this.itemslocalstorge.splice(i, 1);
							i--;
						}
					}
					///遍历收藏区的
					for(let k = 0; k < _this.OptionalList.length; k++) {
						if(_this.OptionalList[k].matchcoin_id == data.mac_id) {
							_this.OptionalList.splice(k, 1);
							k--;
						}
					}
					////先删除后改变类名
					e.target.className = "iconfont icon-xingxing"; ////先删除后改变类名
				}
			}
		}
	}
</script>
<style lang="scss">
	#Home {
		.mint-popup {
			width: 100%;
			height: 100%;
			background: #141738;
			overflow-y: auto;
		}
	}
</style>
<style lang="scss">
	/*币币交易公用的色值*/

	$color_bg:#141738;
	/*一块一块内容的背景颜色*/

	$buy_color:#02c289;
	/*买入*/

	$sell_color:#ea6954;
	/*卖出*/

	$blue_color:#5e7dc0;
	/*蓝色*/

	$button_color:#5f7cc0;
	/*按钮的颜色*/

	$xian_color:#6d87c7;
	/*限价字体*/

	$alert_bg:#191c42;
	/*弹出框的背景颜色*/

	$alet_border:1px solid #303678;
	/*弹出框的边框*/

	$alert_hover:#3f4494;
	/*鼠标滑过的颜色*/

	$fontColor_price:#474f95;
	/*价格标题颜色*/

	$price_content_color:#b9c0ff;
	/*价格内容颜色*/

	$xian_color:#5f7bc0;
	/*限价字体颜色*/

	$color_zise:#4a5b8b;
	$title_color:#485099;
	/*当前委托  时间  价格   数量*/
	/*右下角大小*/

	$input_border:1px solid #344063;
	/*输入框颜色*/

	$input_activeBorder:1px solid #a199f4;
	$input_bgColor:#121528;
	/*自选的字体*/

	$color_moren:#5f7bc0;
	.greenColor {
		color: #02c289;
	}
	/*主要模块的背景颜色*/

	.mian_bg {
		background: $color_bg;
	}
	/*选中的字体颜色*/

	.active_color {
		color: #49d7f4 !important;
		span {
			display: block !important;
		}
	}
	/*公告部分*/

	.gong_gao {
		width: 100%;
		box-sizing: border-box;
		color: #fff;
		display: flex;
		align-items: center;
		background: #121528;
		z-index: 999;
		.iconfont {
			margin-right: .1rem;
			z-index: 66;
		}
		.swiper-container {
			width: 100%;
			height: .8rem;
			.swiper-button-prev,
			.swiper-button-next {
				background-size: 10px 44px;
				border: none;
				outline: none;
			}
			.swiper-button-prev {
				left: 0;
				background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg'%20viewBox%3D'0%200%2027%2044'%3E%3Cpath%20d%3D'M0%2C22L22%2C0l2.1%2C2.1L4.2%2C22l19.9%2C19.9L22%2C44L0%2C22L0%2C22L0%2C22z'%20fill%3D'%235f7bc0'%2F%3E%3C%2Fsvg%3E");
			}
			.swiper-button-next {
				right: 0;
				background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg'%20viewBox%3D'0%200%2027%2044'%3E%3Cpath%20d%3D'M27%2C22L27%2C22L5%2C44l-2.1-2.1L22.8%2C22L2.9%2C2.1L5%2C0L27%2C22L27%2C22z'%20fill%3D'%235f7bc0'%2F%3E%3C%2Fsvg%3E");
			}
			.swiper-slide {
				width: 100%;
				.title {
					width: 85%;
					margin: 0 auto;
					height: .36rem;
					text-align: center;
					line-height: .36rem;
					color: #fff;
					font-size: .14rem;
					white-space: nowrap;
					text-overflow: ellipsis;
					overflow: hidden;
				}
				.content {
					width: 80%;
					height: .4rem;
					text-align: center;
					line-height: .2rem;
					margin: 0 auto;
					color: #5f7bc0;
					overflow: hidden;
				}
			}
		}
	}
	/*搜索币种的头部*/

	.oHeader_search {
		width: 100%;
		height: .4rem;
		position: relative;
		background: $color_bg;
		box-shadow: 1px 1px 5px #000;
		display: flex;
		align-items: center;
		justify-content: space-between;
		box-sizing: border-box;
		padding: 0 .1rem;
		color: #5f7bc0;
		.iconfont {
			font-size: .16rem;
		}
		input {
			width: 80%;
			height: 80%;
			border: none;
			background: none;
			font-size: .13rem;
		}
		input::-webkit-input-placeholder {
			color: #5f7bc0;
		}
		input::-moz-placeholder {
			/* Mozilla Firefox 19+ */
			color: #5f7bc0;
		}
		input:-moz-placeholder {
			/* Mozilla Firefox 4 to 18 */
			color: #5f7bc0;
		}
		input:-ms-input-placeholder {
			/* Internet Explorer 10-11 */
			color: #5f7bc0;
		}
	}
	/*币对列表*/

	.currency_content {
		width: 100%;
		height: 95%;
		overflow-y: auto;
		overflow-x: hidden;
		ul {
			width: 100%;
			li {
				width: 100%;
				height: .4rem;
				display: flex;
				justify-content: space-between;
				box-sizing: border-box;
				align-items: center;
				padding: 0 .1rem;
				color: #5f7bc0;
			}
		}
		.zan_wu {
			width: 100%;
			height: .5rem;
			line-height: .5rem;
			text-align: center;
			color: #fff;
		}
	}
	/*我的资产部分*/

	.my-Assets {
		width: 100%;
		height: .6rem;
		color: #fff;
		box-sizing: border-box;
		padding: .03rem .15rem;
		margin-bottom: .1rem;
		/*内容区域*/
		section {
			width: 100%;
			height: .3rem;
			display: flex;
			justify-content: space-between;
			align-items: center;
			.title_my {
				font-size: .15rem;
				font-weight: 400;
			}
		}
		/*隐藏余额*/
		.prohibitAssets {
			width: 100%;
			box-sizing: border-box;
			display: flex;
			height: .24rem;
			align-items: center;
			.iconfont {
				font-size: .12rem;
				transform: scale(0.7);
			}
		}
	}
	/*今日累积折合*/

	.CumulativeFolding {
		width: 100%;
		height: 1.3rem;
		box-sizing: border-box;
		padding: .05rem 0 0 0;
		background: #111336;
		.CumulativeFolding_All {
			margin: .02rem .05rem;
			text-align: center;
			height: .6rem;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			border: 1px solid rgba(73, 215, 244, 0.36);
			box-sizing: border-box;
			.text {
				color: #fff;
				height: .25rem;
				line-height: .25rem;
			}
			.number {
				height: .3rem;
				line-height: .3rem;
				color: #49d7f4;
				font-size: .13rem;
			}
		}
		ul {
			height: .6rem;
			display: flex;
			justify-content: space-between;
			box-sizing: border-box;
			align-items: center;
			padding: 0 .05rem;
			li {
				flex: 1;
				height: .6rem;
				margin: 0 .01rem;
				box-sizing: border-box;
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: center;
				border: 1px solid rgba(73, 215, 244, 0.36);
			}
			.CumulativeFolding_item {
				text-align: center;
				.text {
					color: #fff;
					height: .25rem;
					line-height: .25rem;
					white-space: normal;
					text-overflow: ellipsis;
					overflow: hidden;
				}
				.number {
					height: .3rem;
					line-height: .3rem;
					color: #49d7f4;
					font-size: .13rem;
				}
			}
		}
	}
	/*选择币种*/

	.tab_currency {
		width: 100%;
		height: .35rem;
		display: flex;
		align-items: center;
		box-sizing: border-box;
		background: #111336;
		.search {
			width: .5rem;
			height: .4rem;
			color: #fff;
			text-align: center;
			line-height: .4rem;
			.iconfont {
				width: .5rem;
				height: .5rem;
			}
		}
		ul {
			width: 90%;
			height: .35rem;
			line-height: .35rem;
			display: flex;
			align-items: center;
			li {
				width: 20%;
				color: $color_moren;
				position: relative;
				text-align: center;
				span {
					position: absolute;
					bottom: 0;
					left: 40%;
					width: 20%;
					border: 1px solid #49d7f4;
					display: none;
				}
			}
		}
	}
	/*选项内容部分*/

	.selectList {
		width: 100%;
		box-sizing: border-box;
		background: $color_bg;
		margin-bottom: .1rem;
		.ziXuan_content {
			/*自选内容部分*/
			.add {
				width: 100%;
				height: .5rem;
				line-height: .5rem;
				display: flex;
				justify-content: center;
				color: #fff;
				.border {
					width: 1rem;
					height: .3rem;
					line-height: .3rem;
					display: flex;
					justify-content: center;
					align-items: center;
					border: 0.01rem solid #1f2554;
					.iconfont {
						font-size: .15rem;
						margin-right: .02rem;
					}
				}
			}
		}
		.ContentList_item {
			/*内容部分*/
			width: 100%;
			height: .56rem;
			display: flex;
			box-sizing: border-box;
			padding: 0 0.15rem;
			border-bottom: .01rem solid #1f2554;
			li {
				width: 33.3%;
				display: flex;
				flex-direction: column;
				justify-content: center;
				text-align: center;
				.top {
					color: #fff;
				}
				.bottom {
					color: #6875d8;
					margin-top: .035rem;
				}
				button {
					width: .7rem;
					height: .3rem;
					border-radius: .02rem;
					border: none;
					background: none;
					outline: none;
					color: #fff;
				}
				.red {
					background: $sell_color;
				}
				.green {
					background: $buy_color;
				}
				.blue {
					background: $blue_color;
				}
			}
			li:nth-of-type(1) {
				text-align: left;
			}
			li:nth-last-of-type(1) {
				text-align: right;
				align-items: flex-end;
			}
		}
	}

	.home_bottom {
		height: 30px;
	}
	/*轮播图*/

	.bannerBox {
		width: 100%;
		height: 1.6rem;
		position: relative;
		.bannerSwiper {
			.swiper-container {
				width: 100%;
				height: 1.6rem;
				overflow: hidden;
				.swiper-wrapper {
					width: 100%;
					height: 1.6rem;
					.swiper-slide {
						width: 100%;
						height: 1.6rem;
						img {
							width: 100%;
							height: 100%;
						}
					}
				}
			}
		}
	}
  /*iframe*/
  .iframe{
    width: 100%;
    height: 100%;
    position: fixed;
    left: 0;
    top: 0;
    z-index: 888;
    background: #161a32;
    .title{
      width: 100%;
      height: .35rem;
      line-height: .35rem;
      color: #fff;
      .iconfont{
        color: #fff;
        margin-left: .15rem;
      }
    }
    .iframeBox{
      position: relative;
      top: .2rem;
      width: 100%;
      height: 100%;
      z-index: 889;
    }
  }
</style>
