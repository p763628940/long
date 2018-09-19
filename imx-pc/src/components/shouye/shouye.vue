<template>
	<div id="home" :class="{'home_white':getColor==1}">
		<!--头部类型-->
		<div class="HomeHeader">
			<div class="swiper-container" id="swiper">
				<div class="swiper-wrapper">
          <div class="swiper-slide" v-for="(item,key) in bannerList" :key="key" @click="openNewWindow(item)">
            <img :src="item.img">
          </div>
					<!--<div class="swiper-slide">-->
						<!--<img src="../../assets/banner01.png" v-if="lang=='zh-CN'" />-->
						<!--<img src="../../assets/bannerEn01.png" v-if="lang!='zh-CN'" />-->
					<!--</div>-->
          <!--<div class="swiper-slide">-->
            <!--<router-link to="/index/Taocoin">-->
              <!--<img src="../../assets/TaoCoinBannerZh.png" v-if="lang=='zh-CN'" />-->
              <!--<img src="../../assets/TaoCoinBannerEn.png" v-if="lang!='zh-CN'" />-->
            <!--</router-link>-->
          <!--</div>-->
					<!--<div class="swiper-slide">-->
            <!--<router-link :to="{name:'details',params:{id:46}}">-->
						<!--<img src="../../assets/bannerotczh.png" v-if="lang=='zh-CN'" />-->
						<!--<img src="../../assets/bannerotcen.png" v-if="lang!='zh-CN'" />-->
            <!--</router-link>-->
					<!--</div>-->
					<!--<div class="swiper-slide">-->
						<!--<router-link  to="/index/wallet">-->
						<!--<img src="../../assets/banner03.png" v-if="lang=='zh-CN'" />-->
						<!--<img src="../../assets/bannerEn03.png" v-if="lang!='zh-CN'" />-->
						<!--</router-link>-->
					<!--</div>-->
        </div>
				<div class="swiper-pagination"></div>
			</div>
		</div>
		<!--公告内容部分-->
		<div class="announcement" :class="{'announcement_white':getColor==1}">
			<div class="box">
				<div class="announcement_title">
					<router-link target="_blank" to="/index/notice">{{$t("Announcement.Announcement")}}</router-link>
				</div>
				<ul class="noticeList">
					<li v-for="(item,key) in noticeList" @click="noticeClick(item,item.id)">
						<p class="top">
							{{item.title}}
						</p>
						<div class="content">
							{{item.subtitle}}
						</div>
						<p class="border" v-if="key!=noticeList.length-1"></p>
					</li>
				</ul>

			</div>
		</div>

<template v-for="(arrayName,topIndex) in [imxCoins,otherCoins]">
		<!--币种类型-->
		<div class="currencyType" :class="{'currencyType_white':getColor==1}" v-if="arrayName.length">
			<div class="bi-zhong" :class="{'bi-zhong-white':getColor==1}">
				<!--币种的title-->
				<ul class="bz-title">
					<li v-for="(item,key) in arrayName" @click="tabSwitch(key,item.id,topIndex)" class="currency-list" :class="{'sy-bz-active':key==tabIndex[topIndex]&&getColor!=1,'sy-bz-active-white':key==tabIndex[topIndex]&&getColor==1}">
						<img :src="topIndex==0?'https://imxpro.oss-cn-beijing.aliyuncs.com/static/imx_logo.jpg':CurrenImgList[key]" />
						<span class="text">{{item.pageIdentifier}}</span>
					</li>
					<li class="zi-xuan" @click="tabZx()" :class="{'sy-bz-active':-1==tabIndex[topIndex]&&getColor!=1,'sy-bz-active-white':-1==tabIndex[topIndex]&&getColor==1}" v-if='arrayName == otherCoins'>
						<i class="iconfont icon-xingxingman"></i>
						<span>
						{{$t("list.Optional")}}
						</span>
					</li>
					<!--搜索框-->
					<div class="search" :class="{'search_white':getColor==1}">
						<i class="iconfont icon-search"></i>
						<input type="text" v-model="searchVal" @input="searchBz(searchVal)" />
					</div>
				</ul>
				<!--交易对  最新价  涨幅   最高价  最低价   24H量-->
				<div class="information1" v-for="(items,key) in arrayName" v-show="key==tabIndex[topIndex]">
					<div class="wrapper">
						<ul class="title_box">
							<li class="jiaoyidui">
								<span>{{$t("list.Transaction_pair")}}</span>
							</li>
							<li class="new_price">{{$t("list.LastPrice")}}</li>
							<li class="updown">{{$t("list.Rose")}}</li>
							<li class="high">{{$t("list.high")}}</li>
							<li class="low">{{$t("list.low")}}</li>
							<li class="hour">
								<p>
									{{$t("list.The_amount_of_24H")}}
								</p>
							</li>
						</ul>
					</div>
					<!--主币区内容-->
					<div class="wrapper">
						<ul class="title mian_area" v-for="(item,index) in items.main" @click="tabCurrency(item.matchcoin_id,item.id)" v-show="item.isIf">
							<li class="jiaoyidui2" v-if="token==null || token == undefined">
								<i class="iconfont icon-xingxing" @click.stop="isClone(item,$event,index)" :class="{'icon-xingxingman':itemslocalstorge.indexOf(item.matchcoin_id)!=-1}"></i>
								<span>{{item.pageIdentifier}}
								<span class="zhuBiColor" :class="{'currency_whtie_color':getColor==1}">
									/  {{items.pageIdentifier}}
								</span>
								</span>
							</li>
							<li class="jiaoyidui2" v-if="token!=null || token != undefined">
								<i class="iconfont icon-xingxing" @click.stop="isClone(item,$event,index)" :class="{'icon-xingxingman':getIcon.indexOf(item.matchcoin_id) != -1}"></i>
								<span>{{item.pageIdentifier}}
								<span class="zhuBiColor" :class="{'currency_whtie_color':getColor==1}">
									/  {{items.pageIdentifier}}
								</span>
								</span>
							</li>
							<li class="new_price">
								<span class="text">{{item.price}}</span>
								<span v-show="item.price==null">0</span>
								<span class="zhuBiColor" v-show="item.price!=null" :class="{'currency_whtie_color':getColor==1}"> ≈￥{{item.cny}}</span>
								<span class="zhuBiColor" v-show="item.price==null" :class="{'currency_whtie_color':getColor==1}"> ≈￥0</span>
							</li>
							<li class="updown">
								<span :class="{'red':item.updown<0,'green':item.updown>0}">{{item.updown}}%</span>
							</li>
							<li class="high">
								<span class="text">{{item.high}}</span>
								<span v-show="item.high==null">0</span>
								<span v-show="item.high!=null" class="zhuBiColor" :class="{'currency_whtie_color':getColor==1}"> ≈￥{{item.high/item.price*item.cny | number(item.decimals)}}</span>
								<span v-show="item.high==null" class="zhuBiColor" :class="{'currency_whtie_color':getColor==1}"> ≈￥0</span>
							</li>
							<li class="low">
								<span class="text">{{item.low}}</span>
								<span v-show="item.low==null">0</span>
								<span v-show="item.low!=null" class="zhuBiColor" :class="{'currency_whtie_color':getColor==1}"> ≈￥{{item.low/item.price*item.cny | number(item.decimals)}}</span>
								<span v-show="item.low==null" class="zhuBiColor" :class="{'currency_whtie_color':getColor==1}"> ≈￥0</span>
							</li>
							<li class="hour">
								<p>{{item.hour24 | number(4)}}</p>
							</li>
						</ul>
					</div>
					<!--创新区-->
					<!--<div class="main-title" v-show="items.innovation.length!=0">
					<span>创新区</span>
				</div>-->
					<!--创新区内容-->
					<div class="wrapper">
						<ul class="title new_area" v-for="(item,index) in items.innovation" @click="tabCurrency(item.matchcoin_id,item.id)" v-show="item.isIf">
							<li class="jiaoyidui2" v-if="token==null || token == undefined">
								<i class="iconfont icon-xingxing" @click.stop="isClone(item,$event,index)" :class="{'icon-xingxingman':itemslocalstorge.indexOf(item.matchcoin_id)!=-1}"></i>
								<span>{{item.pageIdentifier}}
								<span class="zhuBiColor" :class="{'currency_whtie_color':getColor==1}">
									/   {{items.pageIdentifier}}
								</span>
								</span>
							</li>
							<li class="jiaoyidui2" v-if="token!=null || token != undefined">
								<i class="iconfont icon-xingxing" @click.stop="isClone(item,$event,index)" :class="{'icon-xingxingman':getIcon.indexOf(item.matchcoin_id) != -1}"></i>
								<span>{{item.pageIdentifier}}<span class="zhuBiColor" :class="{'currency_whtie_color':getColor==1}">
									/    {{items.pageIdentifier}}
								</span> </span>
							</li>
							<li class="new_price">
								<span class="text">{{item.price}}</span>
								<span v-show="item.price==null">0</span>
								<span class="zhuBiColor" v-show="item.price!=null" :class="{'currency_whtie_color':getColor==1}"> ≈￥{{item.cny}}</span>
								<span class="zhuBiColor" v-show="item.price==null" :class="{'currency_whtie_color':getColor==1}"> ≈￥0</span>
							</li>
							<li class="updown">
								<span :class="{'red':item.updown<0,'green':item.updown>0}">{{item.updown}}%</span>
							</li>
							<li class="high">
								<span class="text">{{item.high}}</span>
								<span v-show="item.high==null">0</span>
								<span v-show="item.high!=null" class="zhuBiColor" :class="{'currency_whtie_color':getColor==1}"> ≈￥{{item.high/item.price*item.cny | number(item.decimals)}}</span>
								<span v-show="item.high==null" class="zhuBiColor" :class="{'currency_whtie_color':getColor==1}"> ≈￥0</span>
							</li>
							<li class="low">
								<span class="text">{{item.low}}</span>
								<span v-show="item.low==null">0</span>
								<span v-show="item.low!=null" class="zhuBiColor" :class="{'currency_whtie_color':getColor==1}"> ≈￥{{item.low/item.price*item.cny | number(item.decimals)}}</span>
								<span v-show="item.low==null" class="zhuBiColor" :class="{'currency_whtie_color':getColor==1}"> ≈￥0</span>
							</li>
							<li class="hour">
								<p>
									{{item.hour24 | number(4)}}
								</p>
							</li>
						</ul>
					</div>
					<div class="noKong" :class="{'white_color':getColor==1}" v-show="items.num==0">{{$t("list.noData")}}</div>
				</div>
				<!--自选部分-->
				<div class="information1 zi-xuan-content" v-show="tabIndex[topIndex]==-1 && topIndex==1">
					<div class="wrapper">
						<ul class="title_box">
							<li class="jiaoyidui">
								<span>{{$t("list.Transaction_pair")}}</span>
							</li>
							<li class="new_price">{{$t("list.LastPrice")}}</li>
							<li class="updown">{{$t("list.Rose")}}</li>
							<li class="high">{{$t("list.high")}}</li>
							<li class="low">{{$t("list.low")}}</li>
							<li class="hour">
								<p>
									{{$t("list.The_amount_of_24H")}}
								</p>
							</li>
						</ul>
					</div>
					<!--主币区-->
					<!--<div class="main-title" v-show="OptionalList.main.length>0">
						<span>主区</span>
					</div>-->
					<!--主币区内容-->
					<div class="wrapper">
						<ul class="title mian_area" v-for="(item,index) in OptionalList.main" @click="tabCurrency(item.matchcoin_id,item.id)" v-show="item.isIf">
							<li class="jiaoyidui2" v-if="token==null || token == undefined">
								<i class="iconfont icon-xingxingman" @click.stop="notZhu(item,$event,index)"></i>
								<span>{{item.matchname}}</span>
							</li>
							<li class="jiaoyidui2" v-if="token!=null || token != undefined">
								<i class="iconfont icon-xingxingman" @click.stop="removeZhu(item,$event,index)"></i>
								<span>{{item.matchname}}</span>
							</li>
							<li class="new_price">
								<span class="text">{{item.price}}</span>
								<span v-show="item.price==null">0</span>
								<span class="zhuBiColor" v-show="item.price!=null" :class="{'currency_whtie_color':getColor==1}"> ≈￥{{item.cny}}</span>
								<span class="zhuBiColor" v-show="item.price==null" :class="{'currency_whtie_color':getColor==1}"> ≈￥0</span>
							</li>
							<li class="updown">
								<span :class="{'red':item.updown<0,'green':item.updown>0}">{{item.updown}}%</span>
							</li>
							<li class="high">
								<span class="text">{{item.high}}</span>
								<span v-show="item.high==null">0</span>
								<span v-show="item.high!=null" class="zhuBiColor" :class="{'currency_whtie_color':getColor==1}"> ≈￥{{ item.high/item.price*item.cny | number(item.decimals)}}</span>
								<span v-show="item.high==null" class="zhuBiColor" :class="{'currency_whtie_color':getColor==1}"> ≈￥0</span>
							</li>
							<li class="low">
								<span class="text">{{item.low}}</span>
								<span v-show="item.low==null">0</span>
								<span v-show="item.low!=null" class="zhuBiColor" :class="{'currency_whtie_color':getColor==1}"> ≈￥{{item.low/item.price*item.cny | number(item.decimals)}}</span>
								<span v-show="item.low==null" class="zhuBiColor" :class="{'currency_whtie_color':getColor==1}"> ≈￥0</span>
							</li>
							<li class="hour">
								<p>
									{{item.hour24 | number(4)}}
								</p>
							</li>
						</ul>
					</div>
					<!--创新区-->
					<!--<div class="main-title" v-show="OptionalList.innovation.length>0">
					<span>创新区</span>
				</div>-->
					<!--主币区内容-->
					<div class="wrapper">
						<ul class="title new_area" v-for="(item,index) in OptionalList.innovation" @click="tabCurrency(item.matchcoin_id,item.id)" v-show="item.isIf">
							<li class="jiaoyidui2" v-if="token==null || token == undefined">
								<i class="iconfont icon-xingxingman" @click.stop="notNew(item,$event,index)"></i>
								<span>{{item.matchname}}</span>
							</li>
							<li class="jiaoyidui2" v-if="token!=null||token!= undefined">
								<i class="iconfont icon-xingxingman" @click.stop="removeNew(item,$event,index)"></i>
								<span>{{item.matchname}}</span>
							</li>
							<li class="new_price">
								<span class="text">{{item.price}}</span>
								<span v-show="item.price==null">0</span>
								<span class="zhuBiColor" v-show="item.price!=null" :class="{'currency_whtie_color':getColor==1}"> ≈￥{{item.cny}}</span>
								<span class="zhuBiColor" v-show="item.price==null" :class="{'currency_whtie_color':getColor==1}"> ≈￥0</span>
							</li>
							<li class="updown">
								<span :class="{'red':item.updown<0,'green':item.updown>0}">{{item.updown}}%</span>
							</li>
							<li class="high">
								<span class="text">{{item.high}}</span>
								<span v-show="item.high==null">0</span>
								<span v-show="item.high!=null" class="zhuBiColor" :class="{'currency_whtie_color':getColor==1}"> ≈￥{{item.high/item.price*item.cny | number(item.decimals)}}</span>
								<span v-show="item.high==null" class="zhuBiColor" :class="{'currency_whtie_color':getColor==1}"> ≈￥0</span>
							</li>
							<li class="low">
								<span class="text">{{item.low}}</span>
								<span v-show="item.low==null">0</span>
								<span v-show="item.low!=null" class="zhuBiColor" :class="{'currency_whtie_color':getColor==1}"> ≈￥{{item.low/item.price*item.cny | number(item.decimals)}}</span>
								<span v-show="item.low==null" class="zhuBiColor" :class="{'currency_whtie_color':getColor==1}"> ≈￥0</span>
							</li>
							<li class="hour">
								<p>
									{{item.hour24 | number(4)}}
								</p>
							</li>
						</ul>
					</div>
					<div class="noKong" :class="{'white_color':getColor==1}" v-show="isEmpoet">{{$t("list.noData")}}</div>
				</div>
			</div>
		</div>
		</template>
		<!--App下载-->
		<div class="downLoad">
			<div class="box">
				<img src="../../assets/ios.png" />
				<ul>
					<li>
						<i class="iconfont icon-ios"></i> <span>{{$t("home.iPhoneBusinessEdition")}}</span>
					</li>
					<li>
						<i class="iconfont icon-anzhuo"></i><span>Android</span>
					</li>
				</ul>
			</div>
		</div>
		<mybottom></mybottom>
	</div>
</template>
<script>
	import store from "../../store.js";
	import { httpUrl } from "../http_url/http_url.js";
	import { mapGetters,mapActions,mapState,mapMutations } from 'vuex'
	import axios from "axios";
	import $ from "jquery";
	import mybottom from "../public/Homefooter";
	export default {
		data() {
			return {
				tabIndex:[0,0],
				// getColor: window.localStorage.getItem("setColor"),
				coin_matching: [],
				OptionalList: {
					main: [], ///主区一个数组
					innovation: [] ///创新区一个数组
				},
				getIcon: store.get(), ////收藏按钮
				itemslocalstorge: store.fetch(), ///本地存储未登录状态
				noticeList: [], ////重要广告列表
				searchVal: "", ///搜索的Value值
				isEmpoet: false, //控制
				CurrenImgList: ["../../../static/img/USDT.png", "../../../static/img/BTC.png", "../../../static/img/ETH.png"], //图片路径
				matchcoin_id: 0,
				/*获取默认的币对ID*/
        bannerList:[], /*list文件*/
			}
		},
		components: {
			"mybottom": mybottom
		},
		computed: {
			...mapState('user',['lang','userID']),
			...mapGetters('setting',['urlPrefix']),
			imxCoins(){
				return this.coin_matching.filter((item)=>item.pageIdentifier == 'IMX');
			},
			otherCoins(){
				return this.coin_matching.filter((item)=>item.pageIdentifier != 'IMX');
			}
		},
		watch: { //监听
			itemslocalstorge: {
				handler: function(val, oldVal) {
					store.save(val)
				},
				deep: true
			},
			getIcon: {
				handler: function(val, oldVal) {
					store.set(val)
				},
				deep: true
			},
      lang:{
        handler: function(val, oldVal) {
          /*获取banner*/
          axios.get(httpUrl.banner,{
            params:{lang:val=="zh-CN"?'zh':'en'}
          }).then(res=>{
            this.bannerList = res.data.data.pc;
          },err=>{
            console.log(err);
          })
        },
        deep: true
      }
		},
		mounted() {
			var _this = this;
			/*获取banner*/
      axios.get(httpUrl.banner,{
        params:{lang:this.lang=="zh-CN"?'zh':'en'}
      }).then(res=>{
        this.bannerList = res.data.data.pc;
      },err=>{
        console.log(err);
      })
			setTimeout(function() {
				var newSwiper = new Swiper('#swiper', {
					loop: true,
					autoplay: 5000,
					effect: 'fade',
					pagination: '.swiper-pagination',
					paginationClickable: true,
        });
			}, 100)
			/*获取广告列表 中英文切换*/
			if(this.lang != "zh-CN") {
				axios.get(httpUrl.newsImportant, {
					params: {
						lang: "en"
					}
				}).then(function(res) {
					_this.noticeList = res.data.data.slice(0, 3);
				}, function(err) {
					console.log(err)
				})
			} else {
				axios.get(httpUrl.newsImportant, {
					params: {
						lang: "zh"
					}
				}).then(function(res) {
					_this.noticeList = res.data.data.slice(0, 3);
				}, function(err) {
					console.log(err)
				})
			}

		},
		created() {
			var _this = this;
			/////获取所有币对
			axios.get(httpUrl.coin_matching,{
			params: {
				symbol: this.urlPrefix,
				...(this.userID ? { code: this.userID } : {}),
			}
		}).then(function(res) {
				_this.coin_matching = res.data.data;
				// _this.matchcoin_id = res.data.data[0].matchcoins[0].matchcoin_id;
				///获取数据成功判断用户是否登录
				if(_this.token == null && _this.token == undefined) {
					////未登录     将币种的类型进行分区
					for(let i = 0; i < _this.coin_matching.length; i++) {
						for(let item in _this.coin_matching[i]) {
							_this.coin_matching[i]['main'] = new Array();
							_this.coin_matching[i]['innovation'] = new Array();
							for(let j = 0; j < _this.coin_matching[i].matchcoins.length; j++) {
								_this.matchcoin_id  = _this.matchcoin_id|| _this.coin_matching[i].matchcoins[j].matchcoin_id
								if(_this.coin_matching[i].matchcoins[j].isMain == 0) { ///判断是否在主区
									_this.coin_matching[i].matchcoins[j].isIf = true;
									_this.coin_matching[i]['innovation'].push(_this.coin_matching[i].matchcoins[j])
								} else {
									_this.coin_matching[i].matchcoins[j].isIf = true;
									_this.coin_matching[i]['main'].push(_this.coin_matching[i].matchcoins[j])
								}
							}
						}
					}
					/*判断收藏部分start*/
					//未登录判断收藏
					//1.获取ID本地存储的值
					//2.遍历币对列表     遍历本地存储的数组
					//3.匹配ID是否存在
					var aa = []; ///判断主区
					// for(let i = 0; i < _this.itemslocalstorge.length; i++) {
						for(let j = 0; j < _this.coin_matching.length; j++) {
							// for(let item in _this.coin_matching[j]) { ///遍历大币种对
								for(let n = 0; n < _this.coin_matching[j].main.length; n++) { ///遍历主币
								console.log(_this.itemslocalstorge,_this.coin_matching[j].main[n].matchcoin_id);
									if(_this.itemslocalstorge.indexOf(_this.coin_matching[j].main[n].matchcoin_id) != -1) {
										///判断id是否存在，否则会出现push好多值
										if(_this.OptionalList.main.length == 0 || aa.indexOf(_this.coin_matching[j].main[n].matchcoin_id) == -1) {
											_this.OptionalList.main.push({
												'isIf': true,
												'matchcoin_id': _this.coin_matching[j].main[n].matchcoin_id,
												'matchname': _this.coin_matching[j].main[n].pageIdentifier + "/" + _this.coin_matching[j].pageIdentifier,
												"price": _this.coin_matching[j].main[n].price,
												"cny": _this.coin_matching[j].main[n].cny,
												"updown": _this.coin_matching[j].main[n].updown,
												"hour24": _this.coin_matching[j].main[n].hour24,
												"high": _this.coin_matching[j].main[n].high,
												"low": _this.coin_matching[j].main[n].low,
												"decimals": _this.coin_matching[j].main[n].decimals
											})
											aa.push(_this.coin_matching[j].main[n].matchcoin_id);
										}
									}
								}
							// }
						}
					// }
					var bb = []; ///判断创新区
					// for(let i = 0; i < _this.itemslocalstorge.length; i++) {
						for(let j = 0; j < _this.coin_matching.length; j++) {
							// for(let item in _this.coin_matching[j]) { ///遍历大币种对
								for(let n = 0; n < _this.coin_matching[j].innovation.length; n++) { ///遍历主币
									if(_this.itemslocalstorge.indexOf(_this.coin_matching[j].innovation[n].matchcoin_id) != -1) {
										///判断id是否存在，否则会出现push好多值
										if(_this.OptionalList.innovation.length == 0 || bb.indexOf(_this.coin_matching[j].innovation[n].matchcoin_id) == -1) {
											_this.OptionalList.innovation.push({
												'isIf': true,
												'matchcoin_id': _this.coin_matching[j].innovation[n].matchcoin_id,
												'matchname': _this.coin_matching[j].innovation[n].pageIdentifier + "/" + _this.coin_matching[j].pageIdentifier,
												"cny": _this.coin_matching[j].innovation[n].cny,
												"price": _this.coin_matching[j].innovation[n].price,
												"updown": _this.coin_matching[j].innovation[n].updown,
												"hour24": _this.coin_matching[j].innovation[n].hour24,
												"high": _this.coin_matching[j].innovation[n].high,
												"low": _this.coin_matching[j].innovation[n].low,
												"decimals": _this.coin_matching[j].innovation[n].decimals
											})
											bb.push(_this.coin_matching[j].innovation[n].matchcoin_id);
										}
									}
								}
							// }
						}
					// }

				} else { //////用户登录成功
					for(let i = 0; i < _this.coin_matching.length; i++) {
						for(let item in _this.coin_matching[i]) {
							_this.coin_matching[i]['main'] = new Array();
							_this.coin_matching[i]['innovation'] = new Array();
							for(let j = 0; j < _this.coin_matching[i].matchcoins.length; j++) {
								if(_this.coin_matching[i].matchcoins[j].isMain == 0) { ///判断是否在主区
									_this.coin_matching[i].matchcoins[j].isIf = true;
									_this.coin_matching[i]['innovation'].push(_this.coin_matching[i].matchcoins[j])
								} else {
									_this.coin_matching[i].matchcoins[j].isIf = true;
									_this.coin_matching[i]['main'].push(_this.coin_matching[i].matchcoins[j])
								}
							}
						}
					}
					/////获取用户收藏的列表  币种的id
					axios.get(httpUrl.my_follow, {
						headers: {
							"Authorization": "Bearer " + _this.token
						}
					}).then(function(res) {
						/////判断是否收藏主区
						if(res.data.data.main == undefined) {
							_this.OptionalList.main = []
						} else {
							_this.OptionalList.main = res.data.data.main;
							//////////收藏主区币种成功
							for(let i = 0; i < _this.OptionalList.main.length; i++) { ///遍历获取到的数据
								for(let j = 0; j < _this.coin_matching.length; j++) { //遍历本地获取的币种数据
									for(let item in _this.coin_matching[j]) { ///遍历大币种对
										for(let n = 0; n < _this.coin_matching[j].main.length; n++) { ///遍历主币
											if(_this.OptionalList.main[i].matchcoin_id == _this.coin_matching[j].main[n].matchcoin_id) { ///判断币对id是否相同
												_this.OptionalList.main[i].cny = _this.coin_matching[j].main[n].cny; //显示隐藏
												_this.OptionalList.main[i].isIf = _this.coin_matching[j].main[n].isIf; //显示隐藏
												_this.OptionalList.main[i].price = _this.coin_matching[j].main[n].price; //价格
												_this.OptionalList.main[i].updown = _this.coin_matching[j].main[n].updown; //涨幅
												_this.OptionalList.main[i].hour24 = _this.coin_matching[j].main[n].hour24; //24h成交量
												_this.OptionalList.main[i].id = _this.coin_matching[j].main[n].id; //id
												_this.OptionalList.main[i].high = _this.coin_matching[j].main[n].high; //最高价
												_this.OptionalList.main[i].low = _this.coin_matching[j].main[n].low; //最低价
												_this.OptionalList.main[i].decimals = _this.coin_matching[j].main[n].decimals; //最低价
											}
										}
									}
								}
							}
						}
						/////判断是否收藏创新区
						if(res.data.data.innovation == undefined) {
							_this.OptionalList.innovation = []
						} else {
							_this.OptionalList.innovation = res.data.data.innovation;
							//////////收藏主区币种成功
							for(let i = 0; i < _this.OptionalList.innovation.length; i++) { ///遍历获取到的数据
								for(let j = 0; j < _this.coin_matching.length; j++) { //遍历本地获取的币种数据
									for(let item in _this.coin_matching[j]) { ///遍历大币种对
										for(let n = 0; n < _this.coin_matching[j].innovation.length; n++) { ///遍历主币
											if(_this.OptionalList.innovation[i].matchcoin_id == _this.coin_matching[j].innovation[n].matchcoin_id) { ///判断币对id是否相同
												_this.OptionalList.innovation[i].cny = _this.coin_matching[j].innovation[n].cny; //转换人民币
												_this.OptionalList.innovation[i].isIf = _this.coin_matching[j].innovation[n].isIf; //显示隐藏
												_this.OptionalList.innovation[i].price = _this.coin_matching[j].innovation[n].price; //价格
												_this.OptionalList.innovation[i].updown = _this.coin_matching[j].innovation[n].updown; //涨幅
												_this.OptionalList.innovation[i].hour24 = _this.coin_matching[j].innovation[n].hour24; //24h成交量
												_this.OptionalList.innovation[i].high = _this.coin_matching[j].innovation[n].high; //最高价格
												_this.OptionalList.innovation[i].low = _this.coin_matching[j].innovation[n].low; //最低价格
												_this.OptionalList.innovation[i].id = _this.coin_matching[j].innovation[n].id; //id
												_this.OptionalList.innovation[i].decimals = _this.coin_matching[j].innovation[n].decimals; //id
											}
										}
									}
								}
							}

						}
					}, function(error) {
						console.log(error)
					})

				}

			}, function(err) {
				console.log(err)
			})
			/**************************实时推送***********************/
			// var ws = new WebSocket(_this.wsIp); ///定义全局
			var ws = this.ws;
			const wsOpenHandle = function() {
				ws.send('{"mid":12}'); /*切换币对id*/
			}
				//传递币对ID开始//
			if(ws.readyState === ws.OPEN){
				wsOpenHandle();
			}else{
				ws.onopen = wsOpenHandle;
			}
			ws.onmessage = function(e) {
				var arr = JSON.parse(e.data);
				if(arr.type == "ping") { ////判断type
					ws.send('{"pong":' + Date.now() + '}');
				} else if(arr.type == "socket") {
					for(let i = 0; i < arr.message.length; i++) {
						if(arr.message[i].type == "matchcoins") { ///实时推送列表
							let arrList = arr.message[i].message;
							for(let i = 0; i < arrList.length; i++) { ///遍历实时更新的币种数据
								for(let j = 0; j < _this.coin_matching.length; j++) { //遍历本地获取的币种数据
									for(let item in _this.coin_matching[j]) { ///遍历大币种对
										for(let n = 0; n < _this.coin_matching[j].main.length; n++) { ///遍历主币
											if(arrList[i].id == _this.coin_matching[j].main[n].matchcoin_id) { ///判断币对id是否相同
												_this.coin_matching[j].main[n].cny = arrList[i].cny;
												_this.coin_matching[j].main[n].price = arrList[i].price;
												_this.coin_matching[j].main[n].updown = arrList[i].updown;
												_this.coin_matching[j].main[n].hour24 = arrList[i].hour24;
												_this.coin_matching[j].main[n].low = arrList[i].low;
												_this.coin_matching[j].main[n].high = arrList[i].high;
											}
										}
									}
								}
							}

							for(let i = 0; i < arrList.length; i++) { ///遍历实时更新的币种数据
								for(let j = 0; j < _this.coin_matching.length; j++) { //遍历本地获取的币种数据
									for(let item in _this.coin_matching[j]) { ///遍历大币种对
										for(let n = 0; n < _this.coin_matching[j].innovation.length; n++) { ///遍历主币
											if(arrList[i].id == _this.coin_matching[j].innovation[n].matchcoin_id) { ///判断币对id是否相同
												_this.coin_matching[j].innovation[n].cny = arrList[i].cny;
												_this.coin_matching[j].innovation[n].price = arrList[i].price;
												_this.coin_matching[j].innovation[n].updown = arrList[i].updown;
												_this.coin_matching[j].innovation[n].hour24 = arrList[i].hour24;
												_this.coin_matching[j].innovation[n].low = arrList[i].low;
												_this.coin_matching[j].innovation[n].high = arrList[i].high;
											}
										}
									}
								}
							}
							///遍历收藏里面的币种区
							for(let i = 0; i < arrList.length; i++) { ///遍历实时推送的数据
								for(let j = 0; j < _this.OptionalList.main.length; j++) {
									if(_this.OptionalList.main[j].matchcoin_id == arrList[i].id) {
										_this.OptionalList.main[j].price = arrList[i].price;
										_this.OptionalList.main[j].updown = arrList[i].updown;
										_this.OptionalList.main[j].low = arrList[i].low;
										_this.OptionalList.main[j].high = arrList[i].high;
										_this.OptionalList.main[j].cny = arrList[i].cny;
										_this.OptionalList.main[j].hour24 = arrList[i].hour24;
									}
								}
							}
							for(let i = 0; i < arrList.length; i++) { ///遍历实时推送的数据
								for(let j = 0; j < _this.OptionalList.innovation.length; j++) {
									if(_this.OptionalList.innovation[j].matchcoin_id == arrList[i].id) {
										_this.OptionalList.innovation[j].price = arrList[i].price;
										_this.OptionalList.innovation[j].updown = arrList[i].updown;
										_this.OptionalList.innovation[j].cny = arrList[i].cny;
										_this.OptionalList.innovation[j].high = arrList[i].high;
										_this.OptionalList.innovation[j].low = arrList[i].low;
										_this.OptionalList.innovation[j].hour24 = arrList[i].hour24;
									}
								}
							}
						}

					}
				}

				//////获取实时推送数据

			};

		},
		filters: {
			//小数点过滤器 不四舍五入
			number(value, num) {
				value = isNaN(value)?0:value;
				var toFixedNum = Number(value).toFixed(num + 1);
				var realVal = toFixedNum.substring(0, toFixedNum.lastIndexOf('.') + num + 1);
				return realVal;
			}
		},
		methods: {
      openNewWindow(item){
        switch(item.type)
        {
          case 0:               /*外链*/
            window.open(item.url);
            break;
          case 1:               /*公告*/
            let routeData = this.$router.resolve({name: 'details',params:{id:item.param}});
            window.open(routeData.href, '_blank');
            break;
          case 2:               /*展示*/
            if(item.param){
              let routeDataNew = this.$router.resolve({path:item.param});
              window.open(routeDataNew.href, '_blank');
            }else{
              return;
            }
            break;
          default:
            return;
        }
        console.log(item);
      },
			toTransactionTransaction() { /*跳转交易介绍*/
				this.$router.push({
					name: "toTransactionTransaction"
				})
			},
			tabCurrency(matid, curid) {
				this.$router.push({
					name: "bbjy",
					params: {
						id: matid
					}
				}); ///跳转到币币交易页面
				// window.localStorage.setItem("currency_id", curid); /*币ID*/
			},
			////搜索
			searchBz(val) {
				var _this = this;
				var to_Up = val.toUpperCase();
				_this.searchVal = _this.searchVal.toUpperCase();
				let num = 0;
				for(let i = 0; i < _this.coin_matching.length; i++) {
					num = 0;
					for(let j = 0; j < _this.coin_matching[i].matchcoins.length; j++) {
						if(_this.coin_matching[i].matchcoins[j].pageIdentifier.indexOf(_this.searchVal) != -1) {
							num++;
						}
					}
					_this.coin_matching[i]["num"] = num;
				}
				///判断俩个币种是否都为
				////判断币种
				for(let i = 0; i < _this.coin_matching.length; i++) {
					for(let item in _this.coin_matching[i]) {
						for(let k = 0; k < _this.coin_matching[i].main.length; k++) {
							//判断是否存在
							if(_this.coin_matching[i].main[k].pageIdentifier.indexOf(_this.searchVal) == -1) {
								_this.coin_matching[i].main[k].isIf = false;
							} else {
								_this.coin_matching[i].main[k].isIf = true;
							}
						}
					}
				}
				for(let i = 0; i < _this.coin_matching.length; i++) {
					for(let item in _this.coin_matching[i]) {
						for(let k = 0; k < _this.coin_matching[i].innovation.length; k++) {
							//判断是否存在
							if(_this.coin_matching[i].innovation[k].pageIdentifier.indexOf(_this.searchVal) == -1) {
								_this.coin_matching[i].innovation[k].isIf = false;
							} else {
								_this.coin_matching[i].innovation[k].isIf = true;
							}
						}
					}
				}
				///收藏币种
				var one_num = 0;
				for(let i = 0; i < _this.OptionalList.main.length; i++) {
					//判断是否存在
					if(_this.OptionalList.main[i].matchname.indexOf(_this.searchVal) == -1) {
						_this.OptionalList.main[i].isIf = false;
					} else {
						_this.OptionalList.main[i].isIf = true;
						one_num++;
					}
				}
				for(let i = 0; i < _this.OptionalList.innovation.length; i++) {
					//判断是否存在
					if(_this.OptionalList.innovation[i].matchname.indexOf(_this.searchVal) == -1) {
						_this.OptionalList.innovation[i].isIf = false;
					} else {
						_this.OptionalList.innovation[i].isIf = true;
						one_num++;
					}
				}
				if(one_num == 0) {
					this.isEmpoet = true;
				} else {
					this.isEmpoet = false;
				}
			},
			/*点击广告部分*/
			noticeClick(item, id) {
				if(item.pc_link == "") {
					let routeData = this.$router.resolve({name: 'details', params: {id: id}});
					window.open(routeData.href, '_blank');
				} else {
					if(item.pc_link == "inviteFriends") {
						if(this.token == null && this.token == undefined) {
							let routeData1 = this.$router.resolve({name: 'inviteFriends'});
					        window.open(routeData1.href, '_blank');
						} else {
							let routeData2 = this.$router.resolve({name: 'InvitationCode'});
              window.open(routeData2.href, '_blank');
						}
					} else {
						let routeData3 = this.$router.resolve({name: item.pc_link});
					    window.open(routeData3.href, '_blank');
					}
				}
			},
			/*切换币种*/
			tabSwitch(index, id,topIndex) {
				/*头部切换*/
				this.tabIndex.splice(topIndex, 1, index)
				// if(this.getColor != 1) {
				// 	$(".currency-list").eq(index).addClass("sy-bz-active").siblings("li").removeClass("sy-bz-active");
				// 	/*自选删除样式*/
				// 	$(".zi-xuan").removeClass("sy-bz-active");
				// } else {
				// 	$(".currency-list").eq(index).addClass("sy-bz-active-white").siblings("li").removeClass("sy-bz-active-white");
				// 	/*自选删除样式*/
				// 	$(".zi-xuan").removeClass("sy-bz-active-white");
				// }
				/*内容切换*/
				// $(".information1").eq(index).show().siblings(".information1").hide();

			},
			/*点击自选内容*/
			tabZx() {
				// this.tabIndex[1] = -1;
				this.tabIndex.splice(1, 1, -1)
				// if(this.getColor != 1) {
				// 	$(".zi-xuan").addClass("sy-bz-active").siblings("li").removeClass("sy-bz-active");
				// } else {
				// 	$(".zi-xuan").addClass("sy-bz-active-white").siblings("li").removeClass("sy-bz-active-white");
				// }
				// $(".zi-xuan-content").show().siblings(".information1").hide();
				//判断收藏区列表是否为空
				if(this.OptionalList.main.length == 0 && this.OptionalList.innovation.length == 0) {
					this.isEmpoet = true;
				} else {
					this.isEmpoet = false;
				}
			},
			/*收藏*/
			isClone(data, e, index) {
				var _this = this;
				//判断用户是否登录
				if(this.token == null && this.token == undefined) { ///未登录执行
					if(e.target.className == "iconfont icon-xingxing") {
						e.target.className = "iconfont icon-xingxingman";
						_this.itemslocalstorge.push(
							data.matchcoin_id
						); ///将ID存起来
						var kk1 = [];
						///////将收藏的币种进行判断是否在主币区或者收藏区
						for(let j = 0; j < _this.coin_matching.length; j++) { //遍历本地获取的币种数据
							for(let item in _this.coin_matching[j]) { ///遍历大币种对
								for(let n = 0; n < _this.coin_matching[j].innovation.length; n++) { ///遍历主币
									if(data.matchcoin_id == _this.coin_matching[j].innovation[n].matchcoin_id) { ///判断币对id是否相同
										if(_this.OptionalList.innovation.length == 0 || kk1.indexOf(_this.coin_matching[j].innovation[n].matchcoin_id) == -1) {
											_this.OptionalList.innovation.push({
												'isIf': true,
												"cny":_this.coin_matching[j].innovation[n].cny,
												'matchcoin_id': _this.coin_matching[j].innovation[n].matchcoin_id,
												'matchname': _this.coin_matching[j].innovation[n].pageIdentifier + "/" + _this.coin_matching[j].pageIdentifier,
												"price": _this.coin_matching[j].innovation[n].price,
												"updown": _this.coin_matching[j].innovation[n].updown,
												"hour24": _this.coin_matching[j].innovation[n].hour24,
												"high": _this.coin_matching[j].innovation[n].high,
												"low": _this.coin_matching[j].innovation[n].low,
												"decimals": _this.coin_matching[j].innovation[n].decimals
											})
											kk1.push(_this.coin_matching[j].innovation[n].matchcoin_id)
										}
									}
								}
							}
						}
						//////判断是否在收藏区
						var kk2 = [];
						for(let j = 0; j < _this.coin_matching.length; j++) { //遍历本地获取的币种数据
							for(let item in _this.coin_matching[j]) { ///遍历大币种对
								for(let n = 0; n < _this.coin_matching[j].main.length; n++) { ///遍历主币
									if(data.matchcoin_id == _this.coin_matching[j].main[n].matchcoin_id) { ///判断币对id是否相同
										///判断是否存在里面
										if(_this.OptionalList.main.length == 0 || kk2.indexOf(_this.coin_matching[j].main[n].matchcoin_id) == -1) {
											_this.OptionalList.main.push({
												'isIf': true,
												"cny":_this.coin_matching[j].main[n].cny,
												'matchcoin_id': _this.coin_matching[j].main[n].matchcoin_id,
												'matchname': _this.coin_matching[j].main[n].pageIdentifier + "/" + _this.coin_matching[j].pageIdentifier,
												"price": _this.coin_matching[j].main[n].price,
												"updown": _this.coin_matching[j].main[n].updown,
												"hour24": _this.coin_matching[j].main[n].hour24,
												"high": _this.coin_matching[j].main[n].high,
												"low": _this.coin_matching[j].main[n].low,
												"decimals": _this.coin_matching[j].main[n].decimals
											})
											kk2.push(_this.coin_matching[j].main[n].matchcoin_id)
										}
									}
								}
							}
						}
					} else { ///取消收藏
						for(let i = 0; i < _this.itemslocalstorge.length; i++) { // 将数据删除
							if(_this.itemslocalstorge[i] == data.matchcoin_id) {
								_this.itemslocalstorge.splice(i, 1);
								i--;
							}
						}
						///遍历收藏主币区
						for(let k = 0; k < _this.OptionalList.main.length; k++) {
							if(_this.OptionalList.main[k].matchcoin_id == data.matchcoin_id) {
								_this.OptionalList.main.splice(k, 1);
								k--;
							}
						}
						///遍历收藏创新区
						for(let n = 0; n < _this.OptionalList.innovation.length; n++) {
							if(_this.OptionalList.innovation[n].matchcoin_id == data.matchcoin_id) {
								_this.OptionalList.innovation.splice(n, 1);
								n--;
							}
						}
						e.target.className = "iconfont icon-xingxing"; ////先删除后改变类名
						//判断收藏区列表是否为空
						if(this.OptionalList.main.length == 0 && this.OptionalList.innovation.length == 0) {
							this.isEmpoet = true;
						} else {
							this.isEmpoet = false;
						}
					}
				} else {
					////////登录成功收藏
					///调用判断是否刷新token
					_this.callback();
					if(e.target.className == "iconfont icon-xingxing") {
						e.target.className = "iconfont icon-xingxingman";
						/***********收藏先操作dom再请求***********/
						_this.getIcon.push( ///将ID存起来
							data.matchcoin_id
						)
						var kong1 = [];
						///////将收藏的币种进行判断是否在主币区或者收藏区
						for(let j = 0; j < _this.coin_matching.length; j++) { //遍历本地获取的币种数据
							for(let item in _this.coin_matching[j]) { ///遍历大币种对
								for(let n = 0; n < _this.coin_matching[j].innovation.length; n++) { ///遍历主币
									if(data.matchcoin_id == _this.coin_matching[j].innovation[n].matchcoin_id) { ///判断币对id是否相同
										if(_this.OptionalList.innovation.length == 0 || kong1.indexOf(_this.coin_matching[j].innovation[n].matchcoin_id) == -1) {
											_this.OptionalList.innovation.push({
												'isIf': true,
												'matchcoin_id': _this.coin_matching[j].innovation[n].matchcoin_id,
												'matchname': _this.coin_matching[j].innovation[n].pageIdentifier + "/" + _this.coin_matching[j].pageIdentifier,
												"price": _this.coin_matching[j].innovation[n].price,
												"updown": _this.coin_matching[j].innovation[n].updown,
												"hour24": _this.coin_matching[j].innovation[n].hour24,
												"high": _this.coin_matching[j].innovation[n].high,
												"low": _this.coin_matching[j].innovation[n].low,
												"decimals": _this.coin_matching[j].innovation[n].decimals,
												"cny": _this.coin_matching[j].innovation[n].cny
											})
											kong1.push(_this.coin_matching[j].innovation[n].matchcoin_id)
										}
									}
								}
							}
						}

						//////判断是否在收藏区
						var kong = [];
						for(let j = 0; j < _this.coin_matching.length; j++) { //遍历本地获取的币种数据
							for(let item in _this.coin_matching[j]) { ///遍历大币种对
								for(let n = 0; n < _this.coin_matching[j].main.length; n++) { ///遍历主币
									if(data.matchcoin_id == _this.coin_matching[j].main[n].matchcoin_id) { ///判断币对id是否相同
										///判断是否存在里面
										if(_this.OptionalList.main.length == 0 || kong.indexOf(_this.coin_matching[j].main[n].matchcoin_id) == -1) {
											_this.OptionalList.main.push({
												'isIf': true,
												'matchcoin_id': _this.coin_matching[j].main[n].matchcoin_id,
												'matchname': _this.coin_matching[j].main[n].pageIdentifier + "/" + _this.coin_matching[j].pageIdentifier,
												"price": _this.coin_matching[j].main[n].price,
												"updown": _this.coin_matching[j].main[n].updown,
												"hour24": _this.coin_matching[j].main[n].hour24,
												"high": _this.coin_matching[j].main[n].high,
												"low": _this.coin_matching[j].main[n].low,
												"decimals": _this.coin_matching[j].main[n].decimals,
												"cny": _this.coin_matching[j].main[n].cny
											})
											kong.push(_this.coin_matching[j].main[n].matchcoin_id)
										}
									}
								}
							}
						}
						axios.post(httpUrl.follow_matchcoin, {
							matchcoin_id: data.matchcoin_id
						}, {
							headers: {
								"Authorization": "Bearer " + _this.token
							}
						}).then(function(res) {
							if(res.data.data == true) { ///成功
								return true;
							}
						}, function(error) {
							console.log(error)
						})
					} else {
						////取消收藏
						///遍历收藏主币区
						///遍历收藏列表
						for(let i = 0; i < _this.getIcon.length; i++) { ///取消收藏        将存储数据删除
							if(_this.getIcon[i] == data.matchcoin_id) {
								_this.getIcon.splice(i, 1);
								i--;
							}
						}
						for(let k = 0; k < _this.OptionalList.main.length; k++) {
							if(_this.OptionalList.main[k].matchcoin_id == data.matchcoin_id) {
								_this.OptionalList.main.splice(k, 1);
								k--;
							}
						}
						///遍历收藏创新区
						for(let n = 0; n < _this.OptionalList.innovation.length; n++) {
							if(_this.OptionalList.innovation[n].matchcoin_id == data.matchcoin_id) {
								_this.OptionalList.innovation.splice(n, 1);
								n--;
							}
						}
						/////////登录成功取消收藏
						axios.post(httpUrl.follow_matchcoin, {
							matchcoin_id: data.matchcoin_id
						}, {
							headers: {
								"Authorization": "Bearer " + _this.token
							}
						}).then(function(res) {
							if(res.data.data == false) {
								return true;
								//								console.log("取消成功")
							}
						}, function(error) {
							console.log(error)
						})
						e.target.className = "iconfont icon-xingxing";
						//判断收藏区列表是否为空
						if(_this.OptionalList.main.length == 0 && _this.OptionalList.innovation.length == 0) {
							_this.isEmpoet = true;
						} else {
							_this.isEmpoet = false;
						}
					}
				}
			},
			////取消主区收藏(未登录状态)
			notZhu(item, $event, index) {
				var _this = this;
				_this.OptionalList.main.splice(index, 1); ///取消就将它自己移除
				for(let i = 0; i < _this.itemslocalstorge.length; i++) { ///删除选中的id
					if(_this.itemslocalstorge[i] == item.matchcoin_id) {
						_this.itemslocalstorge.splice(i, 1);
						i--;
					}
				}
				//判断收藏区列表是否为空
				if(_this.OptionalList.main.length == 0 && _this.OptionalList.innovation.length == 0) {
					_this.isEmpoet = true;
				} else {
					_this.isEmpoet = false;
				}
			},
			////取消创新区收藏(未登录状态)
			notNew(item, $event, index) {
				var _this = this;
				_this.OptionalList.innovation.splice(index, 1); ///取消就将它自己移除
				for(let i = 0; i < _this.itemslocalstorge.length; i++) { ///删除选中的id
					if(_this.itemslocalstorge[i] == item.matchcoin_id) {
						_this.itemslocalstorge.splice(i, 1);
						i--;
					}
				}
				//判断收藏区列表是否为空
				if(_this.OptionalList.main.length == 0 && _this.OptionalList.innovation.length == 0) {
					_this.isEmpoet = true;
				} else {
					_this.isEmpoet = false;
				}
			},
			////取消主区收藏(登录状态)
			removeZhu(item, $event, index) {
				var _this = this;
				///调用判断是否刷新token
				_this.callback();
				////登录成功得请求接口
				_this.OptionalList.main.splice(index, 1); ///取消就将它自己移除
				axios.post(httpUrl.follow_matchcoin, {
					matchcoin_id: item.matchcoin_id
				}, {
					headers: {
						"Authorization": "Bearer " + _this.token
					}
				}).then(function(res) {
					if(res.data.data == false) {
						for(let i = 0; i < _this.getIcon.length; i++) { ///删除选中的id
							if(_this.getIcon[i] == item.matchcoin_id) {
								_this.getIcon.splice(i, 1);
								i--;
							}
						}
					}
					//判断收藏区列表是否为空
					if(_this.OptionalList.main.length == 0 && _this.OptionalList.innovation.length == 0) {
						_this.isEmpoet = true;
					} else {
						_this.isEmpoet = false;
					}
				}, function(error) {
					console.log(error)
				})
			},
			///取消创新区收藏(登录状态)
			removeNew(item, $event, index) {
				var _this = this;
				///调用判断是否刷新token
				_this.callback();
				////登录成功得请求接口
				_this.OptionalList.innovation.splice(index, 1); ///取消就将它自己移除
				axios.post(httpUrl.follow_matchcoin, {
					matchcoin_id: item.matchcoin_id
				}, {
					headers: {
						"Authorization": "Bearer " + _this.token
					}
				}).then(function(res) {
					if(res.data.data == false) {
						for(let i = 0; i < _this.getIcon.length; i++) { ///删除选中的id
							if(_this.getIcon[i] == item.matchcoin_id) {
								_this.getIcon.splice(i, 1);
								i--;
							}
						}
					}
					//判断收藏区列表是否为空
					if(_this.OptionalList.main.length == 0 && _this.OptionalList.innovation.length == 0) {
						_this.isEmpoet = true;
					} else {
						_this.isEmpoet = false;
					}
				}, function(error) {
					console.log(error)
				})

			}

		}

	}
</script>

<style lang="scss">
	.home_white {
		background: #EAEFF3 !important;
	}

	#home {
		background: #232345;
		/*首页底部内容*/
		.bottom_img {
			width: 100%;
			min-height: 145px;
			img {
				width: 100%;
				min-height: 145px;
			}
		}
		.swiper-container-horizontal>.swiper-pagination-bullets {
			bottom: 35px;
		}
		.swiper-pagination-bullet {
			width: 30px;
			height: 5px;
			border-radius: 2px;
			background: #7c7ebb;
			opacity: 1;
		}
		.swiper-pagination-bullet-active {
			background: #fff;
		}
		/*切换白色版本*/
		.currency_whtie_color {
			color: #8d89a2 !important;
		}
		/*白色搜索框*/
		.search_white {
			border: 1px solid #ddd;
			.iconfont {
				color: #000 !important;
			}
			input {
				color: #000 !important;
			}
		}
		.white_color {
			background: #fff !important;
			color: #333 !important;
		}
		/*1.左侧公告部分*/
		.gong-gao-white {
			color: #000 !important;
			background: #fff !important;
			border: 1px solid #c8c8c8 !important;
			.gg-title {
				border-bottom: 1px solid #ddd !important;
			}
			.tong-zhi li {
				border-bottom: 1px solid #ddd !important;
			}
			.tong-zhi li:nth-last-child(1) {
				border-bottom: none !important;
			}
		}
		.currencyType_white {
			background: #eceef6 !important;
			/*background: -webkit-linear-gradient(top,#eceef6 0,#e3e3e3 100%) !important ;*/
			/*background: -moz-linear-gradient(top,#eceef6 0,#e3e3e3 100%) !important;*/
			/*background: -o-linear-gradient(top,#eceef6 0,#e3e3e3 100%) !important;*/
			/*background: linear-gradient(to bottom,#eceef6 0,#e3e3e3 100%) !important;*/
		}
		/*2.右侧币对部分*/
		.bi-zhong-white {
			.bz-title {
				li {
					border-color: #d1d2dd !important;
					color: #151834 !important;
				}
			}
			.information1 {
				border: none !important;
				.wrapper {
					.title_box {
						background: #e7e8f5 !important;
						li {
							color: #5a5c7e !important;
						}
						.jiaoyidui {
							span {
								color: #5a5c7e !important;
							}
						}
						.hour {
							p {
								color: #5a5c7e !important;
							}
						}
					}
				}
				.wrapper .title {
					background: #f7f6fc !important;
					border-bottom: 1px solid #f0f3f3 !important;
					li {
						span,
						i,
						p {
							color: #000 !important;
						}
						.zhuBiColor {
							color: #8d89a2 !important;
						}
					}
				}
				.wrapper .title:hover {
					background: #fff !important;
				}
				ul {
					border: none !important;
				}
				.wrapper:nth-last-of-type(1) {
					li:nth-last-of-type(1) {
						li {
							border-bottom: none !important;
						}
					}
				}
			}
			.main-title {
				background: #e6e6e6 !important;
				color: #000 !important;
			}
		}
		/*切换白色版本结束*/
		/*媒体查询*/
		@media only screen and (max-width: 1400px) {
			.information1 {
				ul li:nth-last-child(2) {
					flex: 0.7 !important;
				}
				ul li:nth-last-child(1) {
					flex: 0.5 !important;
				}
				ul li:nth-of-type(3) {
					flex: 0.5 !important;
				}
			}
		}
		/*币种切换头部*/
		@media only screen and (max-width: 1250px) {
			.bz-title {
				.currency-list {
					width: 140px !important;
				}
			}
			.information1 {
				ul li:nth-of-type(3),
				ul li:nth-last-child(1) {
					flex: 0.4 !important;
				}
			}
		}
		$border:#515774;
		$color:#bbb5ff;
		$active_border:#bbb5ff;
		$red:#d32f47;
		$green:#4b9b5e;
		/*红色*/
		.red {
			color: $red !important;
		}
		/*绿色*/
		.green {
			color: $green !important;
		}
		/*内部边框*/
		.border_nei {
			width: 100%;
			height: 100%;
			box-sizing: border-box;
			border: 3px solid #0b0b15;
		}
		/*选中状态*/
		.sy-bz-active {
			background: #2a2b6b;
		}
		.sy-bz-active-white {
			background: #e7e8f5;
			color: #151834;
		}
		/*不能为空*/
		.noKong {
			width: 100%;
			height: 50px;
			line-height: 50px;
			text-align: center;
			color: #fff;
		}
		/*自选内容部分*/
		/*币种切换部分*/
		.bi-zhong {
			margin: 0 50px;
			border-radius: 2px;
			/*内部颜色值*/
			/*币种头部*/
			.bz-title {
				width: 100%;
				height: 42px;
				.zi-xuan {
					.iconfont {
						font-size: 16px;
						margin-right: 9px;
					}
				}
				.currency-list {
					cursor: pointer;
				}
				li {
					width: 175px;
					height: 40px;
					cursor: pointer !important;
					line-height: 40px;
					margin-right: 10px;
					position: relative;
					text-align: center;
					border: 1px solid #505c87;
					border-bottom: none;
					border-top-left-radius: 4px;
					border-top-right-radius: 4px;
					float: left;
					color: #d7dbed;
					display: flex;
					align-items: center;
					justify-content: center;
					span {
						display: inline-block;
						height: 40px;
						font-size: 15px;
					}
					img {
						width: 23px;
						height: 23px;
						margin-right: 9px;
					}
				}
				p {
					float: left;
					line-height: 37px;
				}
				.search {
					float: right;
					width: 150px;
					height: 30px;
					background: #fff;
					margin-top: 5px;
					display: flex;
					align-items: center;
					box-sizing: border-box;
					border: 1px solid #575284;
					background: none;
					border-radius: 2px;
					.iconfont {
						margin: 0 7px 0 5px;
						color: #fff;
					}
					input {
						width: 70%;
						height: 95%;
						border: none;
						background: none;
						outline: none;
						color: #fff;
					}
				}
			}
			/*币种内容部分*/
			.information1 {
				width: 100%;
				background: #161938;
				border: 1px solid #505c87;
				/*主区*/
				.main-title {
					width: 100%;
					height: 40px;
					line-height: 40px;
					color: #fff;
					box-sizing: border-box;
					padding-left: 20px;
					background: #27274b;
					span {
						display: inline-block;
						height: 18px;
						line-height: 18px;
						font-size: 15px;
						border-left: 2px solid #7672b5;
						padding-left: 5px;
					}
				}
				.title:hover {
					background: #12122e !important;
					cursor: pointer;
				}
				.title {
					li {
						height: 50px;
						line-height: 50px;
						font-size: 13px;
						color: #fff;
						box-sizing: border-box;
					}
				}
				.title_box {
					background: #2a2b6b;
					border-bottom: none;
					li {
						font-size: 13px;
						color: #fff;
					}
					.jiaoyidui {
						span {
							color: #fff;
						}
					}
					li:nth-last-of-type(1) {
						p {
							color: #fff;
						}
					}
				}
				.jiaoyidui2 {
					.iconfont {
						font-size: 12px;
						margin-left: 31px;
						margin-right: 24px;
						opacity: 0.92;
					}
				}
				.new_area:nth-last-child(1) {
					border: none;
				}
				ul {
					width: 100%;
					height: 53px;
					line-height: 40px;
					border-bottom: 1px solid #505c87;
					display: flex;
					align-items: center;
					justify-content: space-between;
					box-sizing: border-box;
					padding: 0 30px 0 10px;
					li {
						flex: 1;
						text-align: left;
						font-size: 13px;
						color: #d7dbed;
						.ZsColor {
							color: #827eb2;
						}
						.redColor {
							color: $red;
						}
						.zhuBiColor {
							color: #6c6799;
							font-weight: bold;
						}
						span {
							color: #d7dbed;
						}
					}
					li:nth-of-type(2),
					li:nth-of-type(4) {
						flex: 0.9;
					}
					li:nth-of-type(3) {
						flex: 0.5;
					}
					li:nth-of-type(5) {
						flex: 1;
					}
					li:nth-of-type(1) {
						line-height: 40px;
						.iconfont {
							cursor: pointer;
						}
					}
					li:nth-last-of-type(1) {
						flex: 0.7;
						text-align: right;
						p {
							color: #d7dbed;
						}
					}
					.low {
						box-sizing: border-box;
						/*padding-left:80px !important;*/
					}
					.jiaoyidui {
						box-sizing: border-box;
						span {
							margin-left: 70px;
						}
					}
				}
			}
		}
		/*公告部分*/
		.gong-gao {
			width: 320px;
			float: left;
			color: #fff;
			border: 2px solid #33304e;
			border-radius: 2px;
			margin-left: 20px;
			.gg-title {
				width: 100%;
				height: 42px;
				box-sizing: border-box;
				padding-left: 20px;
				border-bottom: 1px solid #575284;
				line-height: 38px;
				font-size: 16px;
				cursor: pointer;
			}
			.tong-zhi {
				width: 280px;
				margin: 0 auto;
				li {
					width: 100%;
					border-bottom: 1px solid #323048;
					margin-top: 16px;
					cursor: pointer;
				}
				li:nth-of-type(1) {
					margin-top: 20px;
				}
				li:nth-last-child(1) {
					border-bottom: none;
				}
				li:hover {
					color: #857fc9;
				}
				.text {
					width: 100%;
					height: 45px;
					line-height: 25px;
					font-size: 12px;
					display: -webkit-box;
					-webkit-box-orient: vertical;
					-webkit-line-clamp: 2;
					/*文本行数*/
					overflow: hidden;
				}
				.time {
					width: 100%;
					text-align: right;
					margin: 15px 0 13px 0;
					color: #6b65a9;
					font-size: 12px;
					box-sizing: border-box;
					padding-right: 5px;
				}
			}
		}
	}
	/*首页头部*/

	.HomeHeader {
		width: 100%;
		min-height: 450px;
		#swiper {
			width: 100%;
      min-height: 450px;
			.swiper-slide {
				width: 100%;
				height: 100%;
				cursor: pointer;
				img {
					width: 100%;
					height: 100%;
				}
			}
		}
	}
	/*白色公告部分*/

	.announcement_white {
		.box {
			background: #f7f6fc !important;
		}
		li {
			color: #000 !important;
			.border {
				background: -webkit-gradient(linear, 0 0, 0 100%, from(rgba(139, 135, 193, 0)), color-stop(0.25, rgba(35, 196, 205, 0.3)), color-stop(0.5, rgba(35, 196, 205, 0.5)), color-stop(0.75, rgba(35, 196, 205, 0.3)), to(rgba(35, 196, 205, 0.0))) !important;
			}
		}
	}
	/*首页公告列表*/

	.announcement {
		margin: 0 50px;
		height: 180px;
		position: relative;
		.box {
			color: #fff;
			position: absolute;
			top: -25px;
			width: 100%;
			height: 200px;
			border-radius: 4px;
			z-index: 99;
			box-sizing: border-box;
			padding: 0 10px;
			background: linear-gradient(to bottom, #2e3074, #2c2d6f, #2c2d6f, #2c2d6f, #28296a, #24255c, #24255c);
			.announcement_title {
				width: 100%;
				height: 80px;
				line-height: 80px;
				text-align: center;
				font-size: 16px;
				a{
					color: #19d6e1;
				}
			}
			.noticeList {
				width: 100%;
				display: flex;
				li {
					flex: 1;
					text-align: center;
					cursor: pointer;
					position: relative;
					padding: 0 20px;
					.border {
						position: absolute;
						right: 0;
						top: -20px;
						height: 150%;
						width: 1px;
						background: -webkit-gradient(linear, 0 0, 0 100%, from(rgba(162, 163, 189, 0)), color-stop(0.25, rgba(162, 163, 189, 0.3)), color-stop(0.5, rgba(162, 163, 189, 0.5)), color-stop(0.75, rgba(162, 163, 189, 0.3)), to(rgba(162, 163, 189, 0.0)));
						background: -webkit-linear-gradient(rgba(162, 163, 189, 0), rgba(162, 163, 189, 0.3), rgba(162, 163, 189, 0.5), rgba(162, 163, 189, 0.3), rgba(162, 163, 189, 0.0));
						background: -moz-linear-gradient(rgba(162, 163, 189, 0), rgba(162, 163, 189, 0.3), rgba(162, 163, 189, 0.5), rgba(162, 163, 189, 0.3), rgba(162, 163, 189, 0.0));
						background: -o-linear-gradient(rgba(162, 163, 189, 0), rgba(162, 163, 189, 0.3), rgba(162, 163, 189, 0.5), rgba(162, 163, 189, 0.3), rgba(162, 163, 189, 0.0));
						background: linear-gradient(rgba(162, 163, 189, 0), rgba(162, 163, 189, 0.3), rgba(162, 163, 189, 0.5), rgba(162, 163, 189, 0.3), rgba(162, 163, 189, 0.0));
					}
					.top {
						font-size: 16px;
						margin-bottom: 10px;
					}
					.content {
						height: 50px;
						font-size: 13px;
						line-height: 28px;
						overflow: hidden;
					}
				}
			}
		}
	}
	/*首页币种选择背景*/

	.currencyType {
		width: 100%;
		background: #232345;
		padding: 22px 0;
	}
	/*下载地址部分*/

	.downLoad {
		width: 100%;
		height: 250px;
		margin-top: 20px;
		background: url(../../assets/dolowd.png) no-repeat;
		background-size: 100% 100%;
		display: flex;
		justify-content: flex-end;
		align-items: center;
		.box {
			margin-right: 228px;
			display: flex;
			flex-direction: column;
			align-items: center;
			img {
				width: 120px;
				height: 120px;
				margin-top: 30px;
			}
			ul {
				display: flex;
				color: #fff;
				li {
					line-height: 70px;
					text-align: center;
					font-size: 16px;
					margin: 0 10px;
					.iconfont {
						margin-right: 5px;
					}
				}
			}
		}
	}
</style>
