<template>
	<div id="bb-content">
		<!--币币交易右侧内容-->
		<div class="bb-wrapper-right">
			<!--上部分-->
			<div class="box-content" :class="{'bg_color':getColor == 1}">
				<div class="balane">
					<p class="text" v-show="token==null||token==undefined" :class="{'xz-active':getColor==1}">
						<router-link to="/index/login">{{$t("list.login")}}</router-link>
						{{$t("list.or")}}
						<router-link to="/index/register">{{$t("list.register")}}</router-link>
						{{$t("list.StartADeal")}}
					</p>
					<div v-show="token!=null || token != undefined" class="money" :class="{'boder_white':getColor==1}">
						<i class="iconfont icon-yanjing yan" @click="UserIsShow = !UserIsShow" v-show="UserIsShow"></i>
						<i class="iconfont icon-biyanjing yan" @click="UserIsShow = !UserIsShow" v-show="!UserIsShow"></i>
						<p v-show="UserIsShow" class="show">
							{{$t('list.Asset_conversion')}} : <span>{{CurBalance | number(8)}}BTC</span>&nbsp;<span class="yuedeng">≈&nbsp;{{RBalance | number(2)}}{{BalanceName}}</span>
						</p>
						<p v-show="!UserIsShow" class="noShow">
							{{$t('list.Asset_conversion')}} :
							<span>
								<i class="iconfont icon-xinghao"></i>
								<i class="iconfont icon-xinghao"></i>
								<i class="iconfont icon-xinghao"></i>
								<i class="iconfont icon-xinghao"></i>
								<i class="iconfont icon-xinghao"></i>
							</span>
							<span>≈
								<i class="iconfont icon-xinghao"></i>
								<i class="iconfont icon-xinghao"></i>
								<i class="iconfont icon-xinghao"></i>
								<i class="iconfont icon-xinghao"></i>
								<i class="iconfont icon-xinghao"></i>
							</span>
						</p>
					</div>
					<!--{{bgColor}}-->
				</div>
				<!--买入卖出-->
				<div class="mai-mai">
					<!--头部选项-->
					<ul class="mm-title" :class="{'quan-mai':getColor == 1}">
						<li v-for="(item,index) in $t('list.Allmai')" :class="{'qh-active':index==0&&getColor!=1,'qh-active-white':index==0&&getColor==1}" @click="mmTab(index)">
							{{item}}
							<span>|</span>
						</li>
						<router-link :to="{name:'More',params:{id:matchcoin_id}}" target="_blank" class="cha_kan">{{$t('list.Look_at_more')}}</router-link><span class="border-right">|</span>
						<div class="shen-he" @click="Num = !Num" :class="{'qh-active':Num==true,'active_color':getColor==1&&Num==true}">
							{{$t('list.Deep_merger')}}
							<i class="iconfont icon-icon3" :class="{'rotate':Num==true}"></i>
							<dl class="shen-he-alter" v-show="Num">
								<dd @click="merge(1000000)">0.000001</dd>
								<dd @click="merge(100000)">0.00001</dd>
								<dd @click="merge(10000)">0.0001</dd>
							</dl>
						</div>
					</ul>
					<!--价格  数量  金额-->
					<ul class="jg-sl">
						<li></li>
						<li>{{$t('list.Price')}}<span>({{viewData.mainCurrency}})</span></li>
						<li>{{$t('list.Number')}}<span>({{viewData.forMoney}})</span></li>
						<li>{{$t('list.Cumulative')}}</li>
					</ul>
					<!--选项内容 -->
					<div class="mmTab-content" style="display: block;">
						<div class="mm-money">
							<div class="market_depth">
								<dl v-for="(item,index) in sellList.slice(-10)" @click="ClickPrice(item.price,item.prices)" class="cursor">
									<!--进度条-->
									<div class="progress red" :style="{'width':item.count/MaximumValue*100+'%'}"></div>
									<dd class="mai"><span>{{$t('list.sell')}}</span></dd>
									<dd><span v-show="item.prices==undefined">{{item.price | number(viewData.decimals)}}</span><span v-show="item.prices!=undefined">{{item.prices | number(viewData.decimals)}}</span></dd>
									<dd><span>{{item.count | number(viewData.count_decimals)}}</span></dd>
									<dd><span>{{item.sum | number(viewData.count_decimals)}}</span></dd>
								</dl>
							</div>
							<div class="NoData" v-show="sellList.length==0" :class="{'noDate_white':getColor==1}">
								<span>{{$t('list.NoMarket')}}</span>
							</div>
						</div>
						<div class="mm-money">
							<div class="market_depth">
								<dl v-for="(item,index) in buyList" @click="ClickPrice(item.price,item.prices)" class="cursor">
									<div class="progress green" :style="{'width':item.count/MaximumValue*100+'%'}"></div>
									<dd class="maii"><span>{{$t('list.buy')}}</span></dd>
									<dd><span v-show="item.prices==undefined">{{item.price | number(viewData.decimals)}}</span><span v-show="item.prices!=undefined">{{item.prices | number(viewData.decimals)}}</span></dd>
									<dd><span>{{item.count | number(viewData.count_decimals)}}</span></dd>
									<dd><span>{{item.sum | number(viewData.count_decimals)}}</span></dd>
								</dl>
							</div>
							<div class="NoData" v-show="buyList.length==0" :class="{'noDate_white':getColor==1}">
								<span>{{$t('list.NoMarket')}}</span>
							</div>
						</div>
					</div>
					<div class="mmTab-content">
						<div class="money-hua">
							<div class="market_depth">
								<dl v-for="(item,index) in sellListAll" :key="index" @click="ClickPrice(item.price,item.prices)" class="cursor">
									<!--进度条-->
									<div class="progress red" :style="{'width':item.count/MaximumValue*100+'%'}"></div>
									<dd class="mai"><span>{{$t('list.sell')}}</span></dd>
									<dd><span v-show="item.prices==undefined">{{item.price | number(viewData.decimals)}}</span><span v-show="item.prices!=undefined">{{item.prices | number(viewData.decimals)}}</span></dd>
									<dd><span>{{item.count | number(viewData.count_decimals)}}</span></dd>
									<dd><span>{{item.sum | number(viewData.count_decimals)}}</span></dd>
								</dl>
							</div>
							<div class="NoData" v-show="sellListAll.length==0" :class="{'noDate_white':getColor==1}">
								<span>{{$t('list.NoMarket')}}</span>
							</div>
						</div>
					</div>
					<div class="mmTab-content">
						<div class="money-zheng">
							<div class="market_depth">
								<dl v-for="(item,index) in buyList" @click="ClickPrice(item.price,item.prices)" class="cursor">
									<!--进度条-->
									<div class="progress green" :style="{'width':item.count/MaximumValue*100+'%'}"></div>
									<dd class="maii"><span>{{$t('list.buy')}}</span></dd>
									<dd><span v-show="item.prices==undefined">{{item.price | number(viewData.decimals)}}</span><span v-show="item.prices!=undefined">{{item.prices | number(viewData.decimals)}}</span></dd>
									<dd><span>{{item.count | number(viewData.count_decimals)}}</span></dd>
									<dd><span>{{item.sum | number(viewData.count_decimals)}}</span></dd>
								</dl>
							</div>
							<div class="NoData" v-show="buyList.length==0" :class="{'noDate_white':getColor==1}">
								<span>{{$t('list.NoMarket')}}</span>
							</div>
						</div>
					</div>
				</div>
				<!--实时成交-->
				<div class="shi-shi">
					<div class="ss-title">{{$t('list.Real_time_transaction')}}</div>
					<!--价格  数量  时间-->
					<ul class="numTime">
						<li>{{$t('list.Price')}}<span>({{viewData.mainCurrency}})</span></li>
						<li>{{$t('list.Number')}}<span>({{viewData.forMoney}})</span></li>
						<li>{{$t('list.time')}}</li>
					</ul>
					<!--显示内容-->
					<div class="ss-content">
						<table cellpadding="0" class="table">
							<!--买卖实时成交-->
							<tr v-for="item in shishiList">
								<td>
									<span class="money-zheng1" v-show="item.in_out == false">{{$t('list.sell')}}</span>
									<span class="money-hua1" v-show="item.in_out">{{$t('list.buy')}}</span>
								</td>
								<td><span>{{item.price | number(viewData.decimals)}}</span></td>
								<td><span>{{item.count | number(viewData.count_decimals)}}</span></td>
								<td><span>{{formatTime(item.time).split(" ")[1]}}</span></td>
							</tr>
						</table>
						<div class="NoData" v-show="shishiList.length==0" :class="{'noDate_white':getColor==1}">
							<span>{{$t('list.NoMarket')}}</span>
						</div>
					</div>

				</div>
			</div>
			<!--下部分 限价 市价  止盈止损-->
			<div class="shi-jia" :class="{'bg_color':getColor == 1}">
				<!--提示内容部分-->
				<div class="tishi" v-show="tishiIsShow" :class="{'tishi_white':getColor==1}">
					<i class="iconfont icon-gantanhao" v-show="tishiIcon"></i>
					<i class="iconfont icon-duihao2" v-show="tishiIcon2"></i> {{tiShi}}
				</div>
				<!--title-->
				<div class="sj-title">
					<ul class="title-left">
						<li v-for="(item,index) in $t('list.xj_sj')" :class="{'xxk-active':index==0&&getColor!=1,'xxk-active-white':index==0&&getColor==1}" @click="tabShi(index)">{{item}}</li>
					</ul>
					<router-link target="_blank" to="/index/rate" class="title-right">{{$t('list.rate')}}</router-link>
					<!--币种资料-->
					<div class="title-right curpi" @click="getCurrency()">
						{{$t('list.MSCurrency')}}
					</div>
				</div>
				<!--切换的内容  限价-->
				<div class="shijia-content" style="display: block;">
					<!--买入价    买入量    交易额-->
					<ul class="mai-rujia">
						<!--买入价scount_decimals-->
						<li class="mai-usdt">
							<span class="text">{{$t('list.Buy_price')}}</span>
							<div class="jage">
								<div class="jage-title" :class="{'focus-active':focus_active}">
									<input type="text" @input="clearNoNum1($event,viewData.decimals)" maxlength="14" @focus="focus_active=true" @blur="focus_active=false,limit.price=limit.price" ref="xjBuy" class="inp1" v-model.number="limit.price" />
									<span class="pos_font" :class="{'btc_white':getColor==1}">{{viewData.mainCurrency }}</span>
									<dl>
										<p class="iconfont icon-top" @click="addNum(viewData.decimals)"></p>
										<p class="iconfont icon-xiala" @click="reduce(viewData.decimals)"></p>
									</dl>
								</div>
								<p class="num" v-show="viewData.price==null">0.00 CNY</p>
								<p class="num" v-show="viewData.price!=null">≈ {{(limit.price/viewData.price)*viewData.cny | number(2)}} CNY</p>
							</div>
						</li>
						<!--买入量-->
						<li class="mai-data">
							<span class="text">{{$t('list.Buy_volume')}}</span>
							<div class="jage" :class="{'focus-active':focus_active2}">
								<input type="text" @input="clearNoNum2($event,viewData.count_decimals)" maxlength="14" @focus="focus_active2=true" @blur="focus_active2=false" ref="xjBuy" v-model.number="limit.count " />
								<span class="btc " :class="{ 'btc_white':getColor==1} ">{{viewData.forMoney}}</span>
							</div>
						</li>
						<!--百分比-->
						<div class="bai-fen " :class="{ 'btc_white':getColor==1} ">
							<span v-for="(item,index) in baiList " @click="baifenbuy(item.text,index,viewData.count_decimals) " :class="{ 'write':item.active, 'black':item.active&&getColor==1} ">
								{{item.text}}
							</span>
						</div>
						<!--交易额-->
						<div class="jiao-yi ">
							<span class="text ">{{$t('list.A_turnover')}}</span>
							<span class="moneyNum "><span v-show="limit.count*limit.price==NaN ">0</span><span v-show="limit.count*limit.price!='NaN' ">{{limit.count*limit.price | number(8)}}</span>{{viewData.mainCurrency}}</span>
						</div>
						<!--闪电交易-->
						<div class="lightning" :class="{'lightningWhite':getColor==1}">
							<el-checkbox v-model="ISlightningBuy">{{$t("bbjy.Rememberdata")}}</el-checkbox>
						</div>
						<!--提交---------买入BTC------->
						<el-button type="submit " class="submit " :disabled="buttonDisabled " @click="xjClickbuy() ">{{$t('list.Buy_BTC')}}{{viewData.forMoney}}</el-button>
					</ul>
					<!--卖出价    卖出量    交易额-->
					<div class="mai-chujia ">
						<!--卖出价-->
						<li class="mai-usdt ">
							<span class="text ">{{$t('list.Selling_price')}}</span>
							<div class="jage ">
								<div class="jage-title " :class="{ 'focus-active':focus_active3} ">
									<input type="text " @input="clearNoNum3($event,viewData.decimals)" maxlength="14 " @focus="focus_active3=true " @blur="focus_active3=false " class="xjSell " v-model.number="limit2.price " />
									<span class="pos_font " :class="{ 'btc_white':getColor==1} ">{{viewData.mainCurrency}}</span>
									<dl>
										<p class="iconfont icon-top " @click="addNum1(viewData.decimals) "></p>
										<p class="iconfont icon-xiala " @click="reduce1(viewData.decimals) "></p>
									</dl>
								</div>
								<p class="num " v-show="viewData.price==null ">0.00 CNY</p>
								<p class="num " v-show="viewData.price!=null ">≈ {{(limit2.price/viewData.price)*viewData.cny | number(2)}} CNY</p>
							</div>
						</li>
						<!--卖出量-->
						<li class="mai-data ">
							<span class="text ">{{$t('list.Sales_volume')}}</span>
							<div class="jage " :class="{ 'focus-active':focus_active4} ">
								<input type="text " @input="clearNoNum4($event,viewData.count_decimals) " maxlength="14 " @focus="focus_active4=true " class="xjSell " @blur="focus_active4=false " v-model.number="limit2.count " />
								<span class="btc " :class="{ 'btc_white':getColor==1} ">{{viewData.forMoney}}</span>
							</div>
						</li>
						<!--百分比-->
						<div class="bai-fen " :class="{ 'btc_white':getColor==1} ">
							<span v-for="(item,index) in baiList1 " @click="baifensell(item.text,index,viewData.count_decimals) " :class="{ 'write':item.active, 'black':item.active&&getColor==1} ">
								{{item.text}}
							</span>
						</div>
						<!--交易额-->
						<div class="jiao-yi ">
							<span class="text ">{{$t('list.A_turnover')}}</span>
							<span class="moneyNum "><span v-show="limit2.count*limit2.price==NaN ">0</span><span v-show="limit2.count*limit2.price!='NaN' ">{{limit2.count*limit2.price | number(8)}}</span>{{viewData.mainCurrency}}</span>
						</div>
						<!--闪电交易-->
						<div class="lightning" :class="{'lightningWhite':getColor==1}">
							<el-checkbox v-model="ISlightningSell">{{$t("bbjy.Rememberdata")}}</el-checkbox>
						</div>
						<!--提交-->
						<el-button :disabled="buttonDisabled " class="sub-mai " @click="xjClicksell() ">{{$t('list.Sell_BTC')}}{{viewData.forMoney}}</el-button>
					</div>
				</div>
				<!--市价-->
				<div class="shijia-content ">
					<!--市价左侧内容-->
					<div class="shijia-left ">
						<!--买入价-->
						<div class="shijia-mai ">
							<span class="text ">{{$t('list.Buy_price')}}</span>
							<div class="jage ">
								<!--<input type="text " placeholder="excellent " disabled="disabled " />-->
								<p :class="{ 'placeholder_white':getColor==1} ">{{$t('list.ThBuyPrice')}}</p>
								<span :class="{ 'btc_white':getColor==1} ">{{viewData.mainCurrency}}</span>
							</div>
						</div>
						<!--交易额-->
						<div class="shijia-mai ">
							<span class="text ">{{$t('list.A_turnover')}}</span>
							<div class="jage " :class="{ 'focus-active':focus_active5} ">
								<input type="text " v-model.number="amount1.amount " maxlength="14 " @focus="focus_active5=true " @blur="focus_active5=false " @input="clearNoNum5($event,viewData.decimals)" />
								<span :class="{ 'btc_white':getColor==1} ">{{viewData.mainCurrency}}</span>
							</div>
						</div>
						<!--百分比-->
						<div class="bai-fen " :class="{ 'btc_white':getColor==1} ">
							<span v-for="(item,index) in baiList3 " @click="bfshibuy(item.text,index,viewData.decimals) " :class="{ 'write':item.active, 'black':item.active&&getColor==1} ">
								{{item.text}}
							</span>
						</div>
						<!--买入-->
						<el-button :disabled="buttonDisabled " class="submit " @click="sjClickbuy() ">{{$t('list.Buy_BTC')}}{{viewData.forMoney}}</el-button>
					</div>
					<!--市价右侧内容-->
					<div class="shijia-left ">
						<!--卖出价-->
						<div class="shijia-mai ">
							<span class="text ">{{$t('list.Selling_price')}}</span>
							<div class="jage ">
								<!--<input type="text "  disabled="disabled " />-->
								<p :class="{ 'placeholder_white':getColor==1} ">{{$t('list.TheSellPrice')}}</p>
								<span :class="{ 'btc_white':getColor==1} ">{{viewData.mainCurrency}}</span>
							</div>
						</div>
						<!--交易额-->
						<div class="shijia-mai ">
							<span class="text ">{{$t('list.Sales_volume')}}</span>
							<div class="jage " :class="{ 'focus-active':focus_active6} ">
								<input type="text " v-model.number="amount2.amount " @focus="focus_active6=true " maxlength="14" @blur="focus_active6=false " @input="clearNoNum6($event,viewData.count_decimals) " />
								<span :class="{ 'btc_white':getColor==1} ">{{viewData.forMoney}}</span>
							</div>
						</div>
						<!--百分比-->
						<div class="bai-fen " :class="{ 'btc_white':getColor==1} ">
							<span v-for="(item,index) in baiList4 " @click="bfshisell(item.text,index,viewData.count_decimals) " :class="{ 'write':item.active, 'black':item.active&&getColor==1} ">
								{{item.text}}
							</span>
						</div>
						<!--买入-->
						<el-button :disabled="buttonDisabled " @click="sjClicksell() " class="sub-mai ">{{$t('list.Sell_BTC')}}{{viewData.forMoney}}</el-button>
					</div>
				</div>
			</div>

		</div>

		<!--币币交易左侧内容-->
		<div class="bb-wrapper-left ">
			<!--切换币种包括图表-->
			<div class="bz-content " :class="{ 'bg_color':getColor==1} ">
				<!--币种部分-->
				<div class="tab-bizhong " :class="{ 'border-bottom':getColor==1} ">
					<!--切换币种-->
					<div class="tab-bi " @click="isShow=! isShow " :class="{ 'qh-active':isShow==true, 'active_color':getColor==1&&isShow==true} ">
						<p>{{$t('list.Currency_switching')}}({{viewData.forMoney}}/{{viewData.mainCurrency}})</p>
						&nbsp;<i class="iconfont icon-icon3 " :class="{ 'rotate':isShow==true} "></i>
					</div>
					<!-------------------切换币种弹出框----------------->
					<div class="alert " v-show="isShow " :class="{ 'alert-active':getColor==1 } ">
						<!--币种选项卡-->
						<div class="alert-header ">
							<span class="sjx "></span>
							<ul class="alert-header-list ">
								<li v-for="(item,key) in coin_matching " :class="{ 'xxk-active':key==0&&getColor!=1, 'xxk-active-white':key==0&&getColor==1} " @click="tabSwitch(key,item.id) ">{{item.pageIdentifier}}</li>
								<li @click="Optional() " class="zi-xuan ">{{$t('list.Marked')}}</li>
							</ul>
							<!--搜索框  input事件筛选-->
							<div class="alert-header-search " :class="{ 'alert-header-search-write':getColor==1 } ">
								<i class="iconfont icon-search "></i>
								<input type="text " v-model="searchVal " @input="searchBz(searchVal) " />
							</div>
						</div>
						<!--市场  价格  24h跌涨  24h成交量-->
						<ul class="title ">
							<li class="shi-chang ">
								<span>{{$t('list.market')}}</span>
							</li>
							<div class="right ">
								<li class="jia-ge ">{{$t('list.Price')}}</li>
								<li class="die-zhang ">{{$t('list.h_rise_and_fall')}}</li>
								<li class="cheng-jiao ">{{$t('list.h_turnover')}}</li>
							</div>
						</ul>
						<!--切换内容-->
						<div class="alert-content-box ">
							<!--内容USDT部分-->
							<ul class="content-box-list " v-for="(items,key) in coin_matching " v-show="key==0 ">
								<div v-show="items.num==0 " class="no-data " :class="{ 'no-data-active':getColor==1 } ">{{$t("list.noData")}}</div>
								<!--<div class="box-title " v-if="items.main.length>0" :class="{'box-title-white':getColor == 1}">
								<p>主区</p>
							</div>-->
								<li v-for="(item,index) in items.main" v-show="item.isIf" @click="tabBz(items.id,item.matchcoin_id,item.id)">
									<!--{{item.isIf}}-->
									<!--未登录显示-->
									<p class="xx" v-if="token==null || token == undefined">
										<i class="iconfont icon-xingxing" :class="{'icon-xingxingman':itemslocalstorge.indexOf(item.matchcoin_id)!=-1}" @click.stop="isClone(item,$event,index)"></i>
										<span>
											{{item.pageIdentifier}}
										</span>
									</p>
									<!--登录显示-->
									<p class="xx" v-if="token!=null || token != undefined">
										<i class="iconfont icon-xingxing" @click.stop="isClone(item,$event,index)" :class="{'icon-xingxingman':getIcon.indexOf(item.matchcoin_id) != -1}"></i>
										<span>{{item.pageIdentifier}}</span>
									</p>
									<div class="tab_bz_container">
										<p class="money">
											<span>{{item.price}}</span>
											<span v-if="item.price==null">0</span>
											<span v-show="item.price!=null">/￥{{item.cny}}</span>
											<span v-show="item.price==null">/￥0</span>
										</p>
										<p class="baifen" :class="{'red':item.updown<0,'green':item.updown>0}">
											{{item.updown}}%
										</p>
										<p class="chengjiao">
											<span>{{item.hour24  | number(viewData.count_decimals)}}</span> {{item.pageIdentifier}}
										</p>
									</div>
								</li>
								<!-- <div class="box-title" v-if="items.innovation.length>0" :class="{'box-title-white':getColor == 1}">
									<p>创新区</p>
								</div> -->
								<li v-for="(item,index) in items.innovation" v-show="item.isIf" @click="tabBz(items.id,item.matchcoin_id,item.id)">
									<!--未登录显示-->
									<p class="xx" v-if="token==null || token == undefined">
										<i class="iconfont icon-xingxing" :class="{'icon-xingxingman':itemslocalstorge.indexOf(item.matchcoin_id)!=-1}" @click.stop="isClone(item,$event,index)"></i> {{item.pageIdentifier}}
									</p>
									<!--登录显示-->
									<p class="xx" v-if="token!=null||token!=undefined">
										<i class="iconfont icon-xingxing" :class="{'icon-xingxingman':getIcon.indexOf(item.matchcoin_id)!=-1}" @click.stop="isClone(item,$event,index)"></i> {{item.pageIdentifier}}
									</p>
									<div class="tab_bz_container">
										<p class="money">
											<span>{{item.price}}</span>
											<span v-if="item.price==null">0</span>
											<span v-show="item.price!=null">/￥{{item.cny}}</span>
											<span v-show="item.price==null">/￥0</span>
										</p>
										<p class="baifen" :class="{'red':item.updown<0,'green':item.updown>0}">
											{{item.updown}}%
										</p>
										<p class="chengjiao">
											<span>{{item.hour24 | number(viewData.count_decimals)}}</span> {{item.pageIdentifier}}
										</p>
									</div>
								</li>
							</ul>
							<!--内容BTC部分-->

							<!--内容ETH部分-->

							<!--自选内容部分-->
							<!--未登录-->
							<ul class="zixuan-content" v-show="ziActive">
								<!--<div class="box-title" v-if="OptionalList.main.length>0" :class="{'box-title-white':getColor == 1}">
									<p>主区</p>
								</div>-->
								<li v-for="(item,index) in OptionalList.main" v-show="item.isIf" @click="tabBz(items.id,item.matchcoin_id,item.id)">
									<!--未登录显示-->
									<p class="xx" v-if="token==null || token == undefined">
										<i class="iconfont icon-xingxingman" @click.stop="notZhu(item,$event,index)"></i> {{item.matchname}}
									</p>
									<!--登录显示-->
									<p class="xx" v-if="token!=null || token != undefined">
										<i class="iconfont icon-xingxingman" @click.stop="removeZhu(item,$event,index)" :id="iconActive+item.matchcoin_id"></i> {{item.matchname}}
									</p>
									<div class="tab_bz_container">
										<p class="money">
											<span>{{item.price}}</span>
											<span v-if="item.price==null">0</span>
											<span v-show="item.price!=null">/￥{{item.cny}}</span>
											<span v-show="item.price==null">/￥0</span>
										</p>
										<p class="baifen" :class="{'red':item.updown<0,'green':item.updown>0}">
											{{item.updown}}%
										</p>
										<p class="chengjiao">
											<span>{{item.hour24  | number(viewData.count_decimals)}}</span> {{item.pageIdentifier}}
										</p>
									</div>

								</li>
								<!--<div class="box-title" v-if="OptionalList.innovation.length>0" :class="{'box-title-white':getColor == 1}">
									<p>创新区</p>
								</div>-->
								<li v-for="(item,index) in OptionalList.innovation" v-show="item.isIf">
									<!--未登录显示-->
									<p class="xx" v-if="token==null || token == undefined">
										<i class="iconfont icon-xingxingman" @click="notNew(item,$event,index)"></i> {{item.matchname}}
									</p>
									<!--登录显示-->
									<p class="xx" v-if="token!=null||token!= undefined">
										<i class="iconfont icon-xingxingman" @click="removeNew(item,$event,index)" :id="iconActive+item.matchcoin_id"></i> {{item.matchname}}
									</p>

									<div class="tab_bz_container" @click="tabBz(items.id,item.matchcoin_id,item.id)">
										<p class="money">
											<span>{{item.price}}</span>
											<span v-if="item.price==null">0</span>
											<span v-show="item.price!=null">/￥{{item.cny}}</span>
											<span v-show="item.price==null">/￥0</span>
										</p>
										<p class="baifen" :class="{'red':item.updown<0,'green':item.updown>0}">
											{{item.updown}}%
										</p>
										<p class="chengjiao">
											<span>{{item.hour24  | number(viewData.count_decimals)}}</span> {{item.pageIdentifier}}
										</p>
									</div>
								</li>
								<!--暂无记录-->
								<div v-show="isEmpoet" class="no-data" :class="{'no-data-active':getColor == 1}">{{$t("list.noData")}}</div>
							</ul>
						</div>
					</div>
					<!-----------------切换币种弹出框end------------------->

					<!--换算-->
					<div class="tab_Currency">
						<p v-show="viewData.price==null">0.00 CNY</p>
						<p v-show="viewData.price!=null">{{viewData.price}}≈{{viewData.cny}}CNY</p>
						<p>{{$t('list.Rose')}}
							<span :class="{'red':viewData.updown<0,'green':viewData.updown>0}">
									{{viewData.updown}}%
								</span>
						</p>
						<p>
							{{$t('list.high')}} : <span v-show="viewData.high!=null">{{viewData.high}}</span>
							<span v-show="viewData.high==null">0.00</span>
						</p>
						<p>
							{{$t('list.low')}} : <span v-show="viewData.low!=null">{{viewData.low}}</span>
							<span v-show="viewData.low==null">0.00</span>
						</p>
						<p>
							{{$t('list.The_amount_of_24H')}} <span>{{viewData.hour24 | number(viewData.count_decimals)}}  {{viewData.forMoney}}</span>
						</p>
					</div>
				</div>
				<!--图表部分-->
				<div class="tu-biao">
					<!--图表开始-->
					<div id="chart" style="height: 580px"></div>
					<!--图表结束-->
				</div>

			</div>
			<!--委托+当前委托部分+历史委托部分+历史成交部分+资产管理部分-->
			<div class="wei-tuo" :class="{'bg_color':getColor ==1}">
				<!--头部选项内容-->
				<div class="wt-title">
					<ul class="list">
						<li :class="{'xxk-active':getColor!=1,'xxk-active-white':getColor==1}" @click="tabisActive(0)">{{$t('list.open_orders')}}</li>
						<li @click="tabisActive(1)">{{$t('list.order_history')}}</li>
						<li @click="tabisActive(2)">{{$t('list.trade_History')}}</li>
						<li @click="tabisActive(3)">{{$t('list.funds')}}</li>
					</ul>
				</div>
				<!--当前委托-->
				<div class="wt-content" style="display: block;" :class="{'dan-qian':getColor==1}">
					<div id="table-container">
						<ul>
							<li>{{$t("list.time")}}</li>
							<li>{{$t("list.Transaction_pair")}}</li>
							<li>{{$t("list.direction")}}</li>
							<li>{{$t("list.Price")}}({{viewData.mainCurrency}})</li>
							<li>{{$t("list.Number")}}({{viewData.forMoney}})</li>
							<li>{{$t("list.Total")}}({{viewData.mainCurrency}})</li>
							<li>{{$t("list.Have_done_a_deal")}}</li>
							<li>{{$t("list.No_deal")}}</li>
							<li>{{$t("list.Action")}}</li>
						</ul>
					</div>
					<!--显示数据-->
					<div class="tab-wrapper">
						<div>
							<ul v-for="(item,index) in currentList">
								<li>{{formatTime(item.created_at)}}</li>
								<li>{{item.matchcoin}}</li>
								<li>
									<span class="money-zheng1" v-show="item.type==0">{{$t('list.sell')}}</span>
									<span class="money-hua1" v-show="item.type==1">{{$t('list.buy')}}</span>
								</li>
								<li><span>{{item.price| number(viewData.decimals)}}</span></li>
								<li><span>{{item.count | number(viewData.count_decimals)}}</span></li>
								<li><span>{{item.amount | number(viewData.decimals)}}</span></li>
								<li style="padding-left: 10px;">{{item.done_amount | number(viewData.count_decimals)}}</li>
								<li>{{item.wait_amount | number(viewData.count_decimals)}}</li>
								<li>
									<span class="che" @click="back(item.eid,index)">{{$t("list.Cancel")}}</span>
								</li>
							</ul>
						</div>
					</div>
					<!--分页器-->
					<div class="pageCount" v-show="currentTotal>1">
						<el-pagination background layout="prev, pager, next" :page-size="5" @current-change="pageChangecurrent" :total="currentTotal" :small="true">
						</el-pagination>
					</div>
					<!--暂无记录-->
					<div class="No_record" :class="{'No_record_white':getColor==1}" v-show="currentList.length==0">{{$t("list.noData")}}</div>
				</div>
				<!--历史委托-->
				<div class="wt-content" :class="{'dan-qian':getColor==1}">
					<!--时间选项部分-->
					<div class="time-tab">
						<ul class="time-tab-left">
							<li @click="historyEntrust(0)" :class="{'qh-active':getColor!=1,'qh-active-white':getColor==1}">{{$t("list.Same_day")}}</li>
							<li @click="historyEntrust(1)">{{$t("list.a_week")}}</li>
							<li @click="historyEntrust(2)">{{$t("list.One_month")}}</li>
							<li @click="historyEntrust(3)">{{$t("list.Three_months")}}</li>
						</ul>
						<div class="time-tab-right" :class="{'searchTime_white':getColor==1}">
							<!--时间-->
							<span class="time-title">{{$t("list.Start_and_stop_time")}}</span>
							<div class="block">
								<el-date-picker value-format="yyyy-MM-dd" v-model="value13" format="yyyy-MM-dd" type="daterange" :start-placeholder="$t('capital.Startdate')" :end-placeholder="$t('capital.Enddate')" size="mini">
								</el-date-picker>
							</div>
						</div>
						<!--搜索-->
						<el-button size="small" @click="searchTime()" type="success">{{$t("list.search")}}</el-button>
					</div>
					<!--选项部分-->
					<table id="table-container">
						<ul>
							<li>{{$t("list.time")}}</li>
							<li>{{$t("list.Transaction_pair")}}</li>
							<li>{{$t("list.direction")}}</li>
							<li>{{$t("list.Price")}}({{viewData.mainCurrency}})</li>
							<li>{{$t("list.Entrustment")}}</li>
							<li>{{$t("list.Have_done_a_deal")}}({{viewData.forMoney}})</li>
							<li>{{$t("list.Total_entrustment")}}</li>
							<li>{{$t("list.state")}}</li>
						</ul>
					</table>
					<!--显示数据-->
					<div class="wt-data">
						<div id="table-container">
							<ul v-for="item in HistoryList">
								<li>{{formatTime(item.created_at)}}</li>
								<li>{{item.matchcoin}}</li>
								<li>
									<span class="money-zheng1" v-show="item.type==0">{{$t('list.sell')}}</span>
									<span class="money-hua1" v-show="item.type==1">{{$t('list.buy')}}</span>
								</li>
								<li>
									<span v-show="item.price>0">{{item.price | number(viewData.decimals)}}</span>
									<span v-show="item.price<=0">{{$t('list.market_price')}}</span>
								</li>
								<li>
									<span v-show="item.count>0">{{item.count | number(viewData.count_decimals)}}</span>
									<span v-show="item.count<=0">—</span>
								</li>
								<li><span>{{item.done_count | number(viewData.count_decimals)}}</span></li>
								<li>
									<span v-show="item.amount>0">{{item.amount | number(viewData.decimals)}}</span>
									<span v-show="item.amount<=0">—</span>
								</li>
								<li>
									<span v-if="item.status==0">{{$t('list.Unexecuted')}}</span>
									<span v-if="item.status==1">{{$t('list.Executed')}}</span>
									<span v-if="item.status==-1">{{$t('list.Cancelled')}}</span>
									<span v-if="item.status==-2">{{$t('list.Failure')}}</span>
								</li>
							</ul>
						</div>
					</div>
					<!--分页器-->
					<div class="pageCount" v-show="HistoryTotal>1">
						<el-pagination background layout="prev, pager, next" :page-size="5" @current-change="pageChangeHistory" :total="HistoryTotal" :small="true">
						</el-pagination>
					</div>
					<!--暂无记录-->
					<div class="No_record" :class="{'No_record_white':getColor==1}" v-show="HistoryList.length==0">{{$t("list.noData")}}</div>
				</div>
				<!--历史成交-->
				<div class="wt-content" :class="{'dan-qian':getColor==1}">
					<!--时间选项部分-->
					<div class="time-tab">
						<ul class="time-tab-left Deal">
							<li @click="dealData(0)" :class="{'qh-active':getColor!=1,'qh-active-white':getColor==1}">{{$t("list.Same_day")}}</li>
							<li @click="dealData(1)">{{$t("list.a_week")}}</li>
							<li @click="dealData(2)">{{$t("list.One_month")}}</li>
							<li @click="dealData(3)">{{$t("list.Three_months")}}</li>
						</ul>
						<div class="time-tab-right" :class="{'searchTime_white':getColor==1}">
							<!--时间-->
							<span class="time-title">{{$t("list.Start_and_stop_time")}}</span>
							<div class="block">
								<el-date-picker value-format="yyyy-MM-dd" v-model="value14" format="yyyy-MM-dd " type="daterange" :start-placeholder="$t('capital.Startdate')" :end-placeholder="$t('capital.Enddate')" size="mini">
								</el-date-picker>
							</div>
							<!--搜索-->
							<el-button size="small" @click="searchTime1()" type="success">{{$t("list.search")}}</el-button>
						</div>
					</div>
					<!--头部分类-->
					<table id="table-container2">
						<ul>
							<li>{{$t("list.time")}}</li>
							<li>{{$t("list.market")}}</li>
							<li>{{$t("list.type")}}</li>
							<li>{{$t("list.average_price")}}</li>
							<li>{{$t("list.cjNum")}}</li>
							<li>{{$t("list.Transaction_amount")}}</li>
							<li>{{$t("list.operation")}}</li>
						</ul>
					</table>
					<!--显示 内容部分-->
					<div class="tab-wrapper2">
						<div v-for="(item,index) in HistoryDeal" class="deal-content">
							<ul class="deal-list" :class="{'border-bottom':getColor==1}">
								<li>{{formatTime(item.created_at)}}</li>
								<li>{{item.matchcoin}}</li>
								<li>
									<span class="money-zheng1" v-show="item.type==0">{{$t('list.sell')}}</span>
									<span class="money-hua1" v-show="item.type==1">{{$t('list.buy')}}</span>
								</li>
								<li>{{item.avg_price|number(viewData.decimals)}}</li>
								<li>{{item.done_count|number(viewData.count_decimals)}}</li>
								<li>{{item.done_amount|number(viewData.decimals)}}</li>
								<li><span class="details" ref="xianqing" @click="isdatail(index)">{{$t('list.Details')}}</span></li>
							</ul>
							<!--显示内容部分-->
							<div class="show-datail" v-if="item.detail.length>0" :class="{'History_cuccess_white':getColor ==1}">
								<ul class="datail-title" :class="{'background-hover':getColor==1}">
									<li>{{$t("list.time")}}</li>
									<li>{{$t("list.Price")}}</li>
									<li>{{$t("list.Number")}}</li>
									<li>{{$t("list.Total")}}</li>
									<li>{{$t('list.Fee')}}</li>
								</ul>
								<!--显示内容部分-->
								<ul v-for="datailitem in item.detail" class="datail-content" :class="{'border-bottom':getColor==1,'background-hover2':getColor==1}">
									<li>{{formatTime(datailitem.created_at)}}</li>
									<li>{{datailitem.price|number(viewData.decimals)}}</li>
									<li>{{datailitem.count|number(viewData.count_decimals)}}</li>
									<li>{{datailitem.total|number(viewData.decimals)}}</li>
									<li>
										<span v-show="datailitem.pts>0">{{datailitem.pts|number(8)}} PTS</span>
										<!--<span v-show="datailitem.pts==0">0.00PTS</span>-->
										<span v-show="item.type==0&&datailitem.service==0">0.00{{viewData.mainCurrency}}</span>
										<span v-show="item.type==1&&datailitem.service==0">0.00{{viewData.forMoney}}</span>
										<span v-show="item.type==0&&datailitem.service>0">{{datailitem.service|number(8)}} {{viewData.mainCurrency}}</span>
										<span v-show="item.type==1&&datailitem.service>0">{{datailitem.service|number(8)}} {{viewData.forMoney}}</span>
									</li>
								</ul>
							</div>
						</div>
					</div>
					<!--分页器-->
					<div class="pageCount" v-show="HistoryDealTotal>1">
						<el-pagination background layout="prev, pager, next" :page-size="5" @current-change="pageChangeHistoryDeal" :total="HistoryDealTotal" :small="true">
						</el-pagination>
					</div>
					<!--暂无记录-->
					<div class="No_record" :class="{'No_record_white':getColor==1}" v-show="HistoryDeal.length==0">{{$t("list.noData")}}</div>
				</div>
				<!--资产管理-->
				<div class="wt-content" :class="{'dan-qian':getColor==1}">
					<div id="table-container-wt">
						<ul>
							<li>{{$t("list.currency")}}</li>
							<li>{{$t("list.Total")}}</li>
							<li>{{$t("list.Available_balance")}}</li>
							<li>{{$t("list.Single_freezing")}}</li>
							<li>{{$t("list.BTC_valuation")}}</li>
						</ul>
					</div>
					<div v-show="token!=null" :class="{'bg_color':getColor==1}" class="assetsBox">
						<div id="table-container-wt-content">
							<ul v-for="item in assetsList">
								<li>{{item.currency}}</li>
								<li>{{item.balance_total | number(item.displayNum)}}</li>
								<li>{{item.balance | number(item.displayNum)}}</li>
								<li>{{item.lock_balance | number(item.displayNum)}}</li>
								<li>{{item.btc_blance | number(item.displayNum)}}</li>
							</ul>
						</div>
					</div>
					<!--暂无持仓-->
					<div class="isGuanli" v-if="assetsList.length<=0">
						<span>{{$t("list.No_holding")}}</span>
					</div>
				</div>
			</div>
		</div>

		<!-------------------弹框----币种资料------------->
		<div class="alert_mengban" v-show="show">
			<!--黑色蒙版-->
			<div class="mengban"></div>
			<!--蒙版内容-->
			<div class="menban_wrapper" :class="{'write-menban_wrapper':getColor==1}">
				<div class="menban_content">
					<!--头部-->
					<div class="menban_title">
						<h1>{{currencyDetailsList.pageIdentifier}}</h1>
						<span class="iconfont icon-cuowu" @click="show=!show"></span>
					</div>
					<!--btc介绍-->
					<div class="btc-js">
						{{currencyDetailsList.pageIdentifier}}<span>({{currencyDetailsList.fullName}})</span>
					</div>
					<!--简介-->
					<div class="jian_jie">
						<p class="jj-title">{{$t('list.Introduction')}}</p>
						<p class="jj-content">
							{{currencyDetailsList.summary}}
						</p>
						<div class="liao-jie">
							<router-link :to="{name:'bzzl',params:{key:currency}}">{{$t('list.LearnMore')}}</router-link?>
						</div>
					</div>
				</div>
			</div>
		</div>

	</div>
</template>
<script src="../../../static/charting_library/charting_library.min.js"></script>
<script src='./main.js'>
</script>
<style lang="scss">
	@import 'bbjy.scss';
</style>
