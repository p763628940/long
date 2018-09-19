<template>
	<div id="bbjy">
		<!--币币交易头部-->
		<div class="header_box">
			<div class="bbjy_header">
				<p class="bbjy_header_left" @click="currencyIsShow=true">
					<i class="iconfont icon-im_fenlei"></i>
					<span>{{viewData.forMoney}}/{{viewData.mainCurrency}}</span>
					<span class="youxia">
						<i class="iconfont icon-youxia"></i>
					</span>
				</p>
				<p class="bbjy_header_conter">{{$t("list.Currency_exchange")}}</p>
				<span class="zi-xuan">
					<i class="iconfont icon-xingxingman" :class="{'active':itemslocalstorge.indexOf(Number(viewData.matchcoin_id))!=-1}" @click="Collection($event)"></i>
				</span>
			</div>
		</div>
		<div class="oHeight"></div>
		<!--历史委托筛选-->
		<div class="men_back" v-show="saiLishiWeituo" @click="saiLishiWeituo=false"></div>
		<mt-popup v-model="saiLishiWeituo" position="right">
			<!--历史委托头部-->
			<div class="weituo_title">
				<p>
					<i class="iconfont icon-icon-1" @click="saiLishiWeituo=false"></i>
					<span>{{$t("bbjy.Select")}}</span>
				</p>
				<p>
					<i class="iconfont icon-gengduo2" @click="saiLishiWeituo=false"></i>
				</p>
			</div>
			<!--当日-->
			<div class="TimeList">
				<ul>
					<li class="active_color" @click="historyEntrust(0)">{{$t("list.Same_day")}}</li>
					<li @click="historyEntrust(1)">{{$t("list.a_week")}}</li>
					<li @click="historyEntrust(2)">{{$t("list.One_month")}}</li>
					<li @click="historyEntrust(3)">{{$t("list.Three_months")}}</li>
				</ul>
			</div>
			<!--选择开始时间和结束时间-->
			<div class="startTimeAndEedTime">
				<dl>
					<p class="startTime" @click="openStartTime">{{startWeiTime}}</p>
					<span>-</span>
					<p class="endTime" @click="openEndTime">{{endWeiTime}}</p>
				</dl>
				<button @click="HistorySearch">{{$t("list.search")}}</button>
			</div>
		</mt-popup>
		<!--选择开始时间-->
		<div class="time_bottom">
			<mt-datetime-picker v-model="pickerValue1" type="date" ref="startTime" @confirm="picker"></mt-datetime-picker>
		</div>
		<!--选择结束时间-->
		<div class="time_bottom">
			<mt-datetime-picker v-model="pickerValue2" type="date" ref="endTime" @confirm="endTime"></mt-datetime-picker>
		</div>

		<!--币种切换开始-->
		<div class="men_back" v-show="currencyIsShow" @click="currencyIsShow=false"></div>
		<mt-popup v-model="currencyIsShow" position="left">
			<!--选择币种部分-->
			<div class="tab_currency_trade">
				<ul class="tab_title">
					<li v-for="(item,key) in matchcoins" class="title" :class="{'active_color':key==0}" @click="tabCurrency(item.id,key)">
						{{item.pageIdentifier}}
						<span></span>
					</li>
					<li @click="SelfSelection()" class="SelfSelection">
						{{$t("list.Optional")}}
						<span></span>
					</li>
				</ul>
				<p class="search" @click="withdraw">
					<i class="iconfont icon-chehui"></i>
				</p>
			</div>
			<!--交易币对    价格     涨跌幅-->
			<ul class="jiaoyidui">
				<li>{{$t("bbjy.Pairs")}}</li>
				<li>{{$t("list.Price")}}</li>
				<li>{{$t("bbjy.Change")}}</li>
			</ul>
			<!--币种内容-->
			<div class="currency_box">
				<div class="ContentList" v-for="(items,key) in matchcoins" v-show="key==0">
					<ul class="ContentList_item" v-for="item in items.matchcoins" @click="tabswitching(item.matchcoin_id,items.id,item.id)">
						<li>
							<span>{{item.pageIdentifier}}</span>
							<span>/</span>
							<span>{{items.pageIdentifier}}</span>
						</li>
						<li :class="{'buy':item.price>=0,'sell':item.price<0}">
							<span v-show="item.price!=null">$ {{item.price | number(viewData.decimals)}}</span>
							<span v-show="item.price==null">$ 0.00</span>
						</li>
						<li :class="{'buy':item.updown>=0,'sell':item.updown<0}">
							<span v-show="item.updown!=null">{{item.updown}}%</span>
							<span v-show="item.updown==null">0.00%</span>
						</li>
					</ul>
				</div>
				<!--自选内容-->
				<div class="zi_xuan" v-show="zxIsShow">
					<div v-show="OptionalList.length==0" class="noData">{{$t("list.noData")}}</div>
					<ul class="OptionalList_item" v-for="item in OptionalList" @click="tabswitching(item.matchcoin_id,item.main_id,item.currencyID)">
						<li>
							<span>{{item.matchname}}</span>
						</li>
						<li :class="{'buy':item.price>=0,'sell':item.price<0}">
							<span v-show="item.price!=null">￥{{item.price| number(viewData.decimals)}}</span>
							<span v-show="item.price==null">￥0.00</span>
						</li>
						<li :class="{'buy':item.updown>=0,'sell':item.updown<0}">
							<span v-show="item.updown!=null">{{item.updown}}%</span>
							<span v-show="item.updown==null">0.00%</span>
						</li>
					</ul>
				</div>
			</div>
		</mt-popup>

		<!--币种切换结束-->
		<!--买入卖出头部-->
		<div class="buySell_title">
			<div class="buySell_title_left">
				<!--限价的买入卖出按钮-->
				<div class="xj-mm" v-show="shiJiaBox==null">
					<p class="buy buySell buy_active" @click="tabBuySell(0)">{{$t("list.Buy_BTC")}}</p>
					<p class="sell buySell" @click="tabBuySell(1)">{{$t("list.Sell_BTC")}}</p>
				</div>
				<!--市价的买入卖出按钮-->
				<div class="sj-mm" v-show="shiJiaBox!=null">
					<p class="buy buySell buy_active" @click="tabBuySell1(0)">{{$t("list.Buy_BTC")}}</p>
					<p class="sell buySell" @click="tabBuySell1(1)">{{$t("list.Sell_BTC")}}</p>
				</div>
				<p class="Fixed_price" @click.stop="shiJiaIsShow=!shiJiaIsShow">
					<span>{{bbjySelect}}</span>
					<i class="iconfont icon-youxia"></i>
				</p>
				<ul class="Fixed_price_list" v-show="shiJiaIsShow">
					<li v-for="(item,index) in bbjySelectList" @click="activeBbjy(item.name,index)">{{item.name}}</li>
				</ul>
			</div>
			<!--k线图-->
			<router-link class="buySell_title_right" :to="{'name':'Kline',params:{id:matchcoin_id}}">
				<span>{{$t("bbjy.Kchart")}}</span>
				<i class="iconfont icon-tubiao-zhexiantu"></i>
				<i class="iconfont icon-youxia"></i>
			</router-link>

		</div>
		<!--限价买入卖出-->
		<div class="tab_buySell xianjia" v-show="shiJiaBox==null">
			<!--买卖列表-------买入------->
			<div class="tab_buySell_left" style="display: block;">
				<!--买入价格-->
				<div class="price" :class="{'fours_active':fours_active}">
					<input type="text" v-model.number="limit.price" maxlength="14" @input="clearNoNum1($event,viewData.decimals)" :placeholder="$t('list.Price')" @focus="fours_active=true" @blur="fours_active=false" />
					<span>{{viewData.mainCurrency}}</span>
				</div>
				<!--换算人民币-->
				<div class="tab_money">
					<p class="num" v-show="viewData.price!=null">≈ {{(limit.price/viewData.price)*viewData.cny | number(2)}} CNY</p>
					<p class="num " v-show="viewData.price==null ">0.00 CNY</p>
				</div>
				<!--买入数量-->
				<div class="count" :class="{'fours_active':fours_active2}">
					<input type="text" v-model.number="limit.count" maxlength="14" @input="clearNoNum2($event,viewData.count_decimals)" @keypress="clearNoNum2($event,viewData.count_decimals)" @propertychange="clearNoNum2($event,viewData.count_decimals)" :placeholder="$t('list.Number')" @focus="fours_active2=true" @blur="fours_active2=false" />
					<span>{{viewData.forMoney}}</span>
				</div>
				<!--可用多少USDT-->
				<div class="tab_money">
					<span>{{$t("capital.Available")}}</span>
					<span>{{main_balance | number(viewData.decimals)}}{{viewData.mainCurrency}}</span>
				</div>
				<!--百分比-->
				<ul class="baiFen baifenBuy">
					<li @click="baiFenBuyTab(0.25,0,viewData.count_decimals)">25%</li>
					<li @click="baiFenBuyTab(0.5,1,viewData.count_decimals)">50%</li>
					<li @click="baiFenBuyTab(0.75,2,viewData.count_decimals)">75%</li>
					<li @click="baiFenBuyTab(1,3,viewData.count_decimals)">100%</li>
				</ul>
				<!--交易额-->
				<div class="turnover">
					<span>{{$t("list.A_turnover")}}</span>
					<span class="moneyNum "><span v-show="limit.count*limit.price==NaN ">0</span><span v-show="limit.count*limit.price!='NaN' ">{{limit.count*limit.price | number(8)}}</span>{{viewData.mainCurrency}}</span>
				</div>
				<!--买入按钮-->
				<div class="buySubmit">
					<button v-show="token!=null||token!=undefined" @click="xjClickbuy()">{{$t("list.Buy_BTC")}}{{viewData.forMoney}}</button>
					<button v-show="token==null||token==undefined" @click="login">{{$t("list.login")}}</button>
				</div>
			</div>
			<!--买卖列表-------卖出----->
			<div class="tab_buySell_left">
				<!--买入价格-->
				<div class="price" :class="{'fours_active':fours_active3}">
					<input type="text" v-model.number="limit2.price" maxlength="14" @keypress="clearNoNum3($event,viewData.decimals)" @keyup="clearNoNum3($event,viewData.decimals)" @input="clearNoNum3($event,viewData.decimals)" :placeholder="$t('otc.Price')" @focus="fours_active3=true" @blur="fours_active3=false" />
					<span>{{viewData.mainCurrency}}</span>
				</div>
				<!--换算人民币-->
				<div class="tab_money">
					<p class="num" v-show="viewData.price!=null">≈ {{(limit2.price/viewData.price)*viewData.cny | number(2)}} CNY</p>
					<p class="num " v-show="viewData.price==null ">0.00 CNY</p>
				</div>
				<!--买入数量-->
				<div class="count" :class="{'fours_active':fours_active4}">
					<input type="text" v-model.number="limit2.count" maxlength="14" :placeholder="$t('list.Number')" @keypress="clearNoNum4($event,viewData.decimals)" @keyup="clearNoNum4($event,viewData.decimals)" @input="clearNoNum4($event,viewData.decimals)" @focus="fours_active4=true" @blur="fours_active4=false" />
					<span>{{viewData.forMoney}}</span>
				</div>
				<!--可用多少BTC-->
				<div class="tab_money">
					<span>{{$t("capital.Available")}} {{yes_balance | number(viewData.decimals)}}{{viewData.forMoney}}</span>
				</div>
				<!--百分比-->
				<ul class="baiFen baifenSell">
					<li @click="baiFenSellTab(0.25,0,viewData.count_decimals)">25%</li>
					<li @click="baiFenSellTab(0.5,1,viewData.count_decimals)">50%</li>
					<li @click="baiFenSellTab(0.75,2,viewData.count_decimals)">75%</li>
					<li @click="baiFenSellTab(1,3,viewData.count_decimals)">100%</li>
				</ul>
				<!--交易额-->
				<div class="turnover">
					<span>{{$t("capital.Available")}} </span>
					<span class="moneyNum "><span v-show="limit2.count*limit2.price==NaN ">0</span><span v-show="limit2.count*limit2.price!='NaN' ">{{limit2.count*limit2.price | number(8)}}</span>{{viewData.mainCurrency}}</span>

				</div>
				<!--买入按钮-->
				<div class="sellSubmit">
					<button v-show="token!=null||token!=null" @click="xjClicksell()">{{$t("list.Sell_BTC")}}{{viewData.forMoney}}</button>
					<button v-show="token==null||token==undefined" @click="login">{{$t("list.login")}}</button>
				</div>
			</div>
			<!--右侧价格数量变化-->
			<div class="tab_buySell_right">
				<!--盘口  价格   数量-->
				<ul class="tab_buySell_right_title">
					<li>{{$t("bbjy.Handicap")}}</li>
					<li>{{$t("list.Price")}}</li>
					<li>{{$t("list.Number")}}</li>
				</ul>
				<!--卖出价格-->
				<div class="sellList">
					<ul class="tab_buySell_right_title sell" v-for="(item,index) in sellList.slice(-5)" @click="ClickPrice(item.price,item.prices)">
						<div class="progress red" :style="{'width':item.count/MaximumValue*100+'%'}"></div>
						<li>{{5-index}}</li>
						<li>{{item.price| number(viewData.decimals)}}</li>
						<li class="count">{{item.count| number(viewData.count_decimals)}}</li>
					</ul>
					<div class="noData" v-show="sellList.length==0">{{$t("list.NoMarket")}}</div>
				</div>
				<!--买入价格-->
				<div class="buyList">
					<ul class="tab_buySell_right_title buy" v-for="(item,index) in buyList" @click="ClickPrice(item.price,item.prices)">
						<div class="progress green" :style="{'width':item.count/MaximumValue*100+'%'}"></div>
						<li>{{index+1}}</li>
						<li>{{item.price| number(viewData.decimals)}}</li>
						<li class="count">{{item.count| number(viewData.count_decimals)}}</li>
					</ul>
					<div class="noData" v-show="buyList.length==0">{{$t("list.NoMarket")}}</div>
				</div>
				<div class="shen_du">
					<span @click.stop="shenHe=!shenHe">{{$t("list.Deep_merger")}} </span>
					<i class="iconfont icon-youxia"></i>
					<div class="box" v-show="shenHe">
						<ul>
							<li @click="merge(1000000)">0.000001</li>
							<li @click="merge(100000)">0.00001</li>
							<li @click="merge(10000)">0.0001</li>
						</ul>
					</div>
				</div>
			</div>
		</div>
		<!--市价的买入卖出-->
		<div class="tab_buySell shijia" v-show="shiJiaBox!=null">
			<!--买卖列表-------买入------->
			<div class="tab_buySell_left1" style="display: block;">
				<!--买入价格-->
				<div class="price" :class="{'fours_active':fours_active}">
					<input type="text" :placeholder="$t('list.ThBuyPrice')" disabled="disabled" />
					<span>{{viewData.mainCurrency}}</span>
				</div>
				<!--换算人民币-->
				<div class="tab_money"></div>
				<!--买入数量-->
				<div class="count" :class="{'fours_active':fours_active2}">
					<input type="text" @input="clearNoNum5($event,viewData.decimals)" maxlength="14" v-model.number="amount1.amount" :placeholder="$t('list.A_turnover')" @focus="fours_active2=true" @blur="fours_active2=false" />
					<span>{{viewData.mainCurrency}}</span>
				</div>
				<!--可用多少USDT-->
				<div class="tab_money">
					<span>{{$t("capital.Available")}} {{main_balance | number(viewData.decimals)}}{{viewData.mainCurrency}}</span>
				</div>
				<!--百分比-->
				<ul class="baiFen baifenBuy">
					<li @click="baiFenBuyTab1(0.25,0,viewData.decimals)">25%</li>
					<li @click="baiFenBuyTab1(0.5,1,viewData.decimals)">50%</li>
					<li @click="baiFenBuyTab1(0.75,2,viewData.decimals)">75%</li>
					<li @click="baiFenBuyTab1(1,3,viewData.decimals)">100%</li>
				</ul>
				<!--买入按钮-->
				<div class="buySubmit">
					<button v-show="token!=null||token!=null" @click="sjClickbuy">{{$t("list.Buy_BTC")}}{{viewData.forMoney}}</button>
					<button v-show="token==null||token==undefined" @click="login">{{$t("list.login")}}</button>
				</div>
			</div>
			<!--买卖列表-------卖出----->
			<div class="tab_buySell_left1">
				<!--买入价格-->
				<div class="price" :class="{'fours_active':fours_active3}">
					<input type="text" :placeholder="$t('list.TheSellPrice')" disabled="disabled" />
					<span>{{viewData.mainCurrency}}</span>
				</div>
				<!--换算人民币-->
				<div class="tab_money">

				</div>
				<!--买入数量-->
				<div class="count" :class="{'fours_active':fours_active4}">
					<input type="text" v-model.number="amount2.amount" maxlength="14" @input="clearNoNum6($event,viewData.decimals)" :placeholder="$t('list.Sales_volume')" @focus="fours_active4=true" @blur="fours_active4=false" />
					<span>{{viewData.forMoney}}</span>
				</div>
				<!--可用多少USDT-->
				<div class="tab_money">
					<span>{{$t("capital.Available")}} {{yes_balance | number(viewData.decimals)}}{{viewData.forMoney}}</span>
				</div>
				<!--百分比-->
				<ul class="baiFen baifenSell">
					<li @click="baiFenSellTab1(0.25,0,viewData.count_decimals)">25%</li>
					<li @click="baiFenSellTab1(0.5,1,viewData.count_decimals)">50%</li>
					<li @click="baiFenSellTab1(0.75,2,viewData.count_decimals)">75%</li>
					<li @click="baiFenSellTab1(1,3,viewData.count_decimals)">100%</li>
				</ul>
				<!--买入按钮-->
				<div class="sellSubmit">
					<button v-show="token!=null||token!=null" @click="sjClicksell">{{$t("list.Sell_BTC")}}{{viewData.forMoney}}</button>
					<button v-show="token==null||token==undefined" @click="login">{{$t("list.login")}}</button>
				</div>
			</div>
			<!--右侧价格数量变化-->
			<div class="tab_buySell_right">
				<!--盘口  价格   数量-->
				<ul class="tab_buySell_right_title">
					<li>{{$t("bbjy.Handicap")}}</li>
					<li>{{$t("list.Price")}}</li>
					<li>{{$t("list.Number")}}</li>
				</ul>
				<!--卖出价格-->
				<div class="sellList">
					<ul class="tab_buySell_right_title sell" v-for="(item,index) in sellList.slice(-5)">
						<div class="progress red" :style="{'width':item.count/MaximumValue*100+'%'}"></div>
						<li>{{sellList.slice(-5).length-index}}</li>
						<li>{{item.price | number(viewData.decimals)}}</li>
						<li class="count">{{item.count | number(viewData.count_decimals)}}</li>
					</ul>
					<div class="noData" v-show="sellList.length==0">>{{$t("list.NoMarket")}}</div>
				</div>
				<!--买入价格-->
				<div class="buyList">
					<ul class="tab_buySell_right_title buy" v-for="(item,index) in buyList">
						<div class="progress green" :style="{'width':item.count/MaximumValue*100+'%'}"></div>
						<li>{{index+1}}</li>
						<li>{{item.price | number(viewData.decimals)}}</li>
						<li class="count">{{item.count| number(viewData.count_decimals)}}</li>
					</ul>
					<div class="noData" v-show="buyList.length==0">{{$t("list.NoMarket")}}</div>
				</div>
				<div class="shen_du">
					<span @click.stop="shenHe=!shenHe">{{$t("list.Deep_merger")}} </span>
					<i class="iconfont icon-youxia"></i>
					<div class="box" v-show="shenHe">
						<ul>
							<li @click="merge(1000000)">0.000001</li>
							<li @click="merge(100000)">0.00001</li>
							<li @click="merge(10000)">0.0001</li>
						</ul>
					</div>
				</div>
			</div>
		</div>
		<!--当前委托   历史委托   历史成交   资产管理-->
		<div class="tabHistory">
			<li class="tabHistory_active" @click="tabHistory(0);HistoryChengjiao=false;HistoryWeituo=false">
				<p>{{$t("list.open_orders")}}</p>
				<span></span>
			</li>
			<li @click="tabHistory(1);HistoryWeituo=true;HistoryChengjiao=false;">
				<p>{{$t("list.order_history")}}</p>
				<span></span>
			</li>
			<li @click="tabHistory(2);HistoryChengjiao=true;HistoryWeituo=false">
				<p>{{$t("list.trade_History")}}</p>
				<span></span>
			</li>
			<li @click="tabHistory(3);HistoryChengjiao=false;HistoryWeituo=false">
				<p>{{$t("list.funds")}}</p>
				<span></span>
			</li>
			<i class="iconfont icon-gengduo2" v-show="HistoryChengjiao" @click="timeIsShow()"></i>
			<i class="iconfont icon-gengduo2" v-show="HistoryWeituo" @click="timeIsShow()"></i>
		</div>
		<!--当前委托  tab内容-->
		<div class="tabHistory_content" style="display: block;">
			<div class="wt_list">
				<!--委托内容部分-->
				<div class="wt_item" v-for="(item,index) in currentList">
					<!--头部-->
					<div class="wt_item_title">
						<p>
							<span class="buy" v-show="item.type==1">{{$t("list.Buy_BTC")}}</span>
							<span class="sell" v-show="item.type==0">{{$t("list.Sell_BTC")}}</span>
							<span class="currency">{{item.matchcoin}}</span>
						</p>
						<p>
							<button @click="back(item.eid,index)">{{$t("list.Cancel")}}</button>
						</p>
					</div>
					<!--内容部分-->
					<div class="wt_item_content">
						<ul class="title">
							<li>{{$t("list.time")}}</li>
							<li>{{$t("list.Price")}} ({{viewData.mainCurrency}})</li>
							<li>{{$t('list.Number')}} ({{viewData.forMoney}})</li>
						</ul>
						<ul class="content">
							<li>{{formatTime(item.created_at)}}</li>
							<li>{{item.price| number(viewData.decimals)}}</li>
							<li>{{item.count | number(viewData.count_decimals)}}</li>
						</ul>
						<ul class="title">
							<li>{{$t('list.Total_entrustment')}}</li>
							<li>{{$t('list.Have_done_a_deal')}}</li>
							<li>{{$t('list.No_deal')}}</li>
						</ul>
						<ul class="content">
							<li>{{item.amount | number(viewData.decimals)}}</li>
							<li>{{item.done_amount | number(viewData.count_decimals)}}</li>
							<li>{{item.wait_amount | number(viewData.count_decimals)}}</li>
						</ul>
					</div>
				</div>
				<div class="noData" v-show="currentList.length==0">{{$t("list.noData")}}</div>
			</div>
			<div class="pageCount" v-show="currentTotal>5">
				<el-pagination small layout="prev, pager, next" :page-size="5" @current-change="pageChangecurrent" :total="currentTotal" :small="true">
				</el-pagination>
			</div>
		</div>
		<div class="tabHistory_content">
			<div class="wt_list">
				<!--历史委托内容部分-->
				<div class="wt_item" v-for="(item,index) in HistoryList">
					<!--头部-->
					<div class="wt_item_title">
						<p>
							<span class="buy" v-show="item.type==1">{{$t("list.buy")}}</span>
							<span class="sell" v-show="item.type==0">{{$t("list.sell")}}</span>
							<span class="currency">{{item.matchcoin}}</span>
						</p>
					</div>
					<!--内容部分-->
					<div class="wt_item_content">
						<ul class="title">
							<li>{{$t("list.time")}}</li>
							<li>{{$t("list.Price")}} ({{viewData.mainCurrency}})</li>
							<li>{{$t("list.Entrustment")}}</li>
						</ul>
						<ul class="content">
							<li>{{formatTime(item.created_at)}}</li>
							<li>
								<span v-show="item.price>=0">{{item.price| number(viewData.decimals)}}</span>
								<span v-show="item.price<=0">{{$t("list.market_price")}}</span>
							</li>
							<li>
								<span v-show="item.count>0">{{item.count | number(viewData.count_decimals)}}</span>
								<span v-show="item.count<=0">—</span>
							</li>
						</ul>
						<ul class="title">
							<li>{{$t('list.Total_entrustment')}}</li>
							<li>{{$t('list.Have_done_a_deal')}}({{viewData.forMoney}})</li>
							<li>{{$t('list.state')}}</li>
						</ul>
						<ul class="content">
							<li>{{item.done_count | number(viewData.count_decimals)}}</li>
							<li>
								<span v-show="item.amount>0">{{item.amount | number(viewData.decimals)}}</span>
								<span v-show="item.amount<=0">—</span>
							</li>
							<li>
								<span v-if="item.status==0">{{$t("list.Unexecuted")}}</span>
								<span v-if="item.status==1">{{$t("list.Executed")}}</span>
								<span v-if="item.status==-1">{{$t("list.Cancelled")}}</span>
								<span v-if="item.status==-2">{{$t("list.Failure")}}</span>
							</li>
						</ul>
					</div>
				</div>
				<div class="noData" v-show="HistoryList.length==0">{{$t("list.noData")}}</div>
			</div>
			<div class="pageCount" v-show="HistoryTotal>5">
				<el-pagination small layout="prev, pager, next" :page-size="5" @current-change="pageChangeHistory" :total="HistoryTotal" :small="true">
				</el-pagination>
			</div>

		</div>
		<div class="tabHistory_content Assets">
			<div class="wt_list">
				<!--历史成交内容部分-->
				<div class="wt_item" v-for="(item,index) in HistoryDeal">
					<!--头部-->
					<div class="wt_item_title">
						<p>
							<span class="buy" v-show="item.type==1">{{$t("list.buy")}}</span>
							<span class="sell" v-show="item.type==0">{{$t("list.sell")}}</span>
							<span class="currency">{{item.matchcoin}}</span>
						</p>
						<p>
							<button ref="xianqing" @touchstart="isdatail(index)">{{$t("list.Details")}}</button>
						</p>
					</div>
					<!--详情内容开始-->
					<div class="children" v-if="item.detail.length>0">
						<div class="wt_item_content" v-for="datailitem in item.detail">
							<ul class="title">
								<li>{{$t("list.time")}}</li>
								<li>{{$t("list.Price")}}</li>
								<li>{{$t('list.Number')}}</li>
							</ul>
							<ul class="content">
								<li>{{formatTime(datailitem.created_at)}}</li>
								<li>{{datailitem.price|number(viewData.decimals)}}</li>
								<li>{{datailitem.count|number(viewData.count_decimals)}}</li>
							</ul>
							<ul class="title AssetsList">
								<li>{{$t("bbjy.BbjyAmount")}}</li>
								<li>{{$t('list.Service_Charge')}}</li>
							</ul>
							<ul class="content AssetsList">
								<li>{{datailitem.total|number(viewData.decimals)}}</li>
								<li>
									<span v-show="datailitem.pts>0">{{datailitem.pts|number(8)}} PTS</span>
									<span v-show="item.type==0&&datailitem.service==0">0.00{{viewData.mainCurrency}}</span>
									<span v-show="item.type==1&&datailitem.service==0">0.00{{viewData.forMoney}}</span>
									<span v-show="item.type==0&&datailitem.service>0">{{datailitem.service|number(8)}} {{viewData.mainCurrency}}</span>
									<span v-show="item.type==1&&datailitem.service>0">{{datailitem.service|number(8)}} {{viewData.forMoney}}</span>
								</li>
							</ul>
						</div>
					</div>
					<!--详情内容结束-->
					<!--内容部分-->
					<div class="wt_item_content">
						<ul class="title">
							<li>{{$t("list.time")}}</li>
							<li>{{$t('list.market')}}</li>
							<li>{{$t('list.average_price')}}</li>
						</ul>
						<ul class="content">
							<li>{{formatTime(item.created_at)}}</li>
							<li>{{item.matchcoin}}</li>
							<li>{{item.avg_price|number(viewData.decimals)}}</li>
						</ul>
						<ul class="title AssetsList">
							<li>{{$t('list.cjNum')}}</li>
							<li>{{$t('list.Transaction_amount')}}</li>
						</ul>
						<ul class="content AssetsList">
							<li>{{item.done_count|number(viewData.count_decimals)}}</li>
							<li>{{item.done_amount|number(viewData.decimals)}}</li>
						</ul>
					</div>
				</div>
			</div>
			<div class="pageCount" v-show="HistoryDealTotal>5">
				<el-pagination small layout="prev, pager, next" :page-size="5" @current-change="pageChangeHistoryDeal" :total="HistoryDealTotal" :small="true">
				</el-pagination>
			</div>
			<div class="noData" v-show="HistoryDealTotal==0">{{$t("list.noData")}}</div>
		</div>
		<div class="tabHistory_content Assets">
			<div class="wt_list">
				<div class="wt_item" v-for="(item,index) in assetsList">
					<div class="wt_item_content">
						<ul class="title currency">
							<li>{{$t("list.currency")}}</li>
							<li>{{$t("list.Total")}}</li>
							<li>{{$t("list.Available_balance")}}</li>
						</ul>
						<ul class="content currency">
							<li>{{item.currency}}</li>
							<li>{{item.balance_total | number(item.displayNum)}}</li>
							<li>{{item.balance | number(item.displayNum)}}</li>
						</ul>
						<ul class="title AssetsList">
							<li>{{$t("list.Single_freezing")}}</li>
							<li>{{$t("list.BTC_valuation")}}</li>
						</ul>
						<ul class="content AssetsList">
							<li>{{item.lock_balance | number(item.displayNum)}}</li>
							<li>{{item.btc_blance | number(item.displayNum)}}</li>
						</ul>
					</div>
				</div>
			</div>
			<div class="noData" v-show="assetsList.length==0">{{$t("list.No_holding")}}</div>
		</div>
	</div>
</template>

<script>
	import $ from "jquery"
	import store from "../../store"
	import { Toast } from 'mint-ui';
	import { Message } from 'element-ui'; /*消息提示*/
	import { mapGetters,mapActions,mapState,mapMutations } from 'vuex'
	export default {
		data() {
			return {
				pickerValue1: "",
				/*开始时间*/
				pickerValue2: "",
				/*结束时间*/
				fours_active: false,
				/*买入的价格输入框边框聚焦*/
				fours_active2: false,
				/*买入的数量输入框边框聚焦*/
				fours_active3: false,
				/*卖入的价格输入框边框聚焦*/
				fours_active4: false,
				/*卖出的数量输入框边框聚焦*/
				shiJiaIsShow: false,
				/*市价或者限价选择内容出现*/
				bbjyShiList: [],
				/*选择限价交易或者市价交易*/
				bbjySelect: this.$t("list.Fixed_price"),
				/*选中的交易，限价或者市价*/
				bbjySelectList: [{
					name: this.$t("list.Fixed_price")
				}, {
					name: this.$t("list.market_price")
				}],
				shiJiaBox: window.localStorage.getItem("shijia"),
				/*用户是否选中市价*/
				shenHe: false,
				/*深度合并*/
				viewData: { //页面要展示的数据
					matchcoin_id: this.$route.params.id,
					mainCurrency: "", //主币
					forMoney: "", //对币
					price: "", //价格
					updown: "", //涨幅
					low: "", //最低价
					high: "", //最高价
					hour24: "", //24小时成交量
					cny: "", ///最新价
					decimals: 4, ///限定价格
					count_decimals: 0 ///限定数量
				},
				currencyIsShow: false,
				/*切换币种的box*/
				matchcoins: [],
				/*币种列表*/
				OptionalList: [], ///收藏币种数组
				zxIsShow: false, //自选收藏部分
				matchcoin_id: this.$route.params.id,
				/*当前币对ID*/
				buyList: [],
				/*买的列表*/
				sellList: [],
				/*卖的列表*/
				MaximumValue: 0,
				/*买卖列表的最大值*/
				HistoryChengjiao: false,
				/*历史成交显示按钮--筛选*/
				HistoryWeituo: false,
				/*历史委托显示按钮---筛选*/
				itemslocalstorge: store.fetch(), ///本地存储未登录状态	   --- 收藏列表
				limit: { //限价交易
					matchcoin_id: this.$route.params.id,
					type: "buy",
					price: "", ///买入价
					count: "" ///买入量
				},
				limit2: { //限价交易
					matchcoin_id: this.$route.params.id,
					type: "sell",
					price: "", ///卖出价
					count: "" ///卖出量
				},
				amount1: { ///市价交易
					matchcoin_id: this.$route.params.id,
					type: "buy",
					amount: ""
				},
				amount2: {
					matchcoin_id: this.$route.params.id,
					type: "sell",
					amount: ""
				},
				startWeiTime: this.$t("capital.Startdate"),
				endWeiTime: this.$t("capital.Enddate"),
				yes_balance: 0,
				/*对币的余额*/
				main_balance: 0,
				/*主币的余额*/
				currentList: [],
				/*当前委托的列表*/
				currentTotal: 0,
				/*当前委托总条数*/
				CurrentPage: 1,
				/*当前委托的当前页*/
				assetsList: [],
				/*资产管理*/
				shishiList: [],
				/*实时推送数据*/
				Coins: window.localStorage.getItem("Coins"),
				/*对币ID*/
				historyWPage: 1, //历史委托当前页数
				HistoryTotal: 0, ///历史委托的总条数
				HistoryList: [], ///历史委托
				historyJPage: 1, //历史成交当前页数
				HistoryDeal: [], ///历史成交
				HistoryDealdatetype: 0, ///历史成交默认显示当日的
				Historydatetype: 0, ///历史委托默认是
				HistoryDealTotal: 0, ///历史成交的总条数
				saiLishiWeituo: false, ///历史委托筛选
				saiLishiChenJiao: false, ///历史成交筛选
			}
		},
		watch: { //监听
			itemslocalstorge: { ///收藏的数组
				handler: function(val, oldVal) {
					store.save(val)
				},
				deep: true
			}
		},
		filters: {
			//小数点过滤器 不四舍五入
			number(value, num) {
        value = isNaN(value)?0:value;
				var toFixedNum = Number(value).toFixed(num +1);
				var realVal =toFixedNum.substring(0,toFixedNum.lastIndexOf('.')+num +1);
				return realVal;
			}
		},
		methods: {
			ClickPrice(price, prices) {
				if(prices == undefined) {
					this.limit2.price = price.toFixed(this.viewData.decimals);
					this.limit.price = price.toFixed(this.viewData.decimals);
				} else {
					this.limit2.price = prices.toFixed(this.viewData.decimals)
					this.limit.price = prices.toFixed(this.viewData.decimals);
				}
			},
			timeIsShow() { /*历史委托和历史成交的时间筛选*/
				let _this = this;
				if(this.token == null || this.token == undefined) {
					return false;
				} else {
					$(".TimeList li").eq(0).addClass('active_color').siblings().removeClass("active_color");
					this.saiLishiWeituo = true;
					_this.Historydatetype = 0; //历史委托默认是0
					_this.HistoryDealdatetype = 0; //历史成交默认是0
				}
			},
			pageChangeHistoryDeal(val) { /*切换历史成交的内容*/

				let _this = this;
				_this.historyJPage = val; /*获取历史成交当前页数*/
				this.$ajax.get(this.httpUrl.history, {
					headers: {
						"Authorization": "Bearer " + _this.token
					},
					params: {
						datetype: _this.HistoryDealdatetype,
						status: 1,
						matchcoin_id: _this.matchcoin_id,
						page: val
					}
				}).then(function(res) {
					_this.HistoryDeal = res.data.data.data;
					_this.HistoryDealTotal = res.data.data.total; //获取历史成交的总条数
					for(let i = 0; i < _this.HistoryDeal.length; i++) {
						_this.HistoryDeal[i].isShow = false;
					}
					if(res.data.status.code == -200) {
						_this.$message({
							message: res.data.status.message,
							type: 'error'
						});
					}
				}, function(err) {
					console.log(err)
				})
			},
			///查看历史成交的状态
			isdatail(i) {
				if($(".children").eq(i).is(":hidden")) {
					$(".children").eq(i).show()
				} else {
					$(".children").eq(i).hide()
				}
			},
			HistorySearch() { /*搜索*/
				let _this = this;
				var startTime = _this.formAdd(_this.startWeiTime); /*开始时间*/
				var endTime = _this.formAdd(_this.endWeiTime); /*结束时间*/
				var getStartTime = new Date(this.startWeiTime).getTime(); /*获取开始时间的毫秒数*/
				var getEndTime = new Date(this.endWeiTime).getTime(); /*获取结束时间的毫秒数*/
				if(getEndTime < getStartTime) {
					_this.$message({
						showClose: true,
						message: _this.$t("bbjy.Chooseendtime"),
						type: 'warning',
						duration: 2000
					});
					return false;
				}
				/*判断是否在历史委托列表中*/
				if(this.HistoryWeituo) {
					/*搜索历史委托内容部分*/
					this.$ajax.get(this.httpUrl.history, {
						headers: {
							"Authorization": "Bearer " + _this.token
						},
						params: {
							datetype: 4,
							startdate: getStartTime,
							enddate: getEndTime,
							matchcoin_id: _this.matchcoin_id
						}
					}).then(function(res) {
						_this.HistoryList = res.data.data.data;
						_this.HistoryTotal = res.data.data.total; //总条数
						_this.saiLishiWeituo = false; /*历史委托收回去*/
						if(res.data.status.code == -200) {
							_this.$message({
								message: res.data.status.message,
								type: 'error'
							});
						}
					}, function(err) {
						console.log(err)
					})
					return false;
				}
				/*判断是否在历史成交列表中*/
				if(this.HistoryChengjiao) {
					/*搜索历史成交部分*/
					this.$ajax.get(this.httpUrl.history, {
						headers: {
							"Authorization": "Bearer " + _this.token
						},
						params: {
							datetype: 4,
							status: 1,
							startdate: getStartTime,
							enddate: getEndTime,
							matchcoin_id: _this.matchcoin_id
						}
					}).then(function(res) {
						_this.HistoryDeal = res.data.data.data;
						_this.HistoryDealTotal = res.data.data.total; //获取历史成交的总条数
						for(let i = 0; i < _this.HistoryDeal.length; i++) {
							_this.HistoryDeal[i].isShow = false;
						}
						_this.saiLishiWeituo = false; /*历史委托收回去*/
						if(res.data.status.code == -200) {
							_this.$message({
								message: res.data.status.message,
								type: 'error'
							});
						}
					}, function(err) {
						console.log(err)
					})
				}

			},
			openStartTime() { /*打开开始时间选择*/
				this.$refs.startTime.open();
			},
			openEndTime() { /*打开结束时间选择*/
				this.$refs.endTime.open();
			},
			picker(val) { /*确定开始时间*/
				this.startWeiTime = this.newDate(val);
			},
			endTime(val) { /*确定结束时间*/
				this.endWeiTime = this.newDate(val);
			},
			newDate(date) {
				var y = date.getFullYear();
				var m = date.getMonth() + 1;
				m = m < 10 ? '0' + m : m;
				var d = date.getDate();
				d = d < 10 ? ('0' + d) : d;
				return y + '-' + m + '-' + d;
			},
			historyEntrust(time) { /*历史委托切换时间*/
				var _this = this;
				_this.Historydatetype = time; //获取当日 或者 一个星期  一个月 状态
				$(".TimeList li").eq(time).addClass('active_color').siblings().removeClass("active_color");
				///调用判断是否刷新token
				if(_this.token === null || _this.token === "undefined") {
					return false;
				} else {
					//历史委托列表
					if(this.HistoryWeituo) {
						this.$ajax.get(this.httpUrl.history, {
							headers: {
								"Authorization": "Bearer " + _this.token
							},
							params: {
								datetype: time,
								matchcoin_id: _this.matchcoin_id
							}
						}).then(function(res) {
							_this.HistoryList = res.data.data.data;
							_this.HistoryTotal = res.data.data.total; //总条数
							_this.saiLishiWeituo = false; /*历史委托收回去*/
							if(res.data.status.code == -200) {
								_this.$message({
									message: res.data.status.message,
									type: 'error'
								});
							}
						}, function(err) {
							console.log(err)
						})
						return false;
					}
					/*判断是否在历史成交列表中*/
					if(this.HistoryChengjiao) {
						/*搜索历史成交部分*/
						this.$ajax.get(this.httpUrl.history, {
							headers: {
								"Authorization": "Bearer " + _this.token
							},
							params: {
								datetype: time,
								status: 1,
								matchcoin_id: _this.matchcoin_id,
								page: _this.historyJPage
							}
						}).then(function(res) {
							_this.HistoryDeal = res.data.data.data;
							_this.HistoryDealTotal = res.data.data.total; //获取历史成交的总条数
							for(let i = 0; i < _this.HistoryDeal.length; i++) {
								_this.HistoryDeal[i].isShow = false;
							}
							_this.saiLishiWeituo = false; /*历史委托收回去*/
							if(res.data.status.code == -200) {
								_this.$message({
									message: res.data.status.message,
									type: 'error'
								});
							}
						}, function(err) {
							console.log(err)
						})
					}
				}
			},

			pageChangeHistory(val) { /*切换历史委托的内容*/
				let _this = this;
				_this.historyWPage = val; //获取当前页数
				this.$ajax.get(this.httpUrl.history, {
					headers: {
						"Authorization": "Bearer " + _this.token
					},
					params: {
						matchcoin_id: _this.matchcoin_id,
						page: val,
						datetype: _this.Historydatetype
					}
				}).then(function(res) {
					_this.HistoryList = res.data.data.data;
					_this.HistoryTotal = res.data.data.total; //总条数
					if(res.data.status.code == -200) {
						_this.$message({
							message: res.data.status.message,
							type: 'error'
						});
					}
				}, function(err) {
					console.log(err)
				})
			},
			pageChangecurrent(val) { /*切换当前委托的内容*/
				let _this = this;
				_this.CurrentPage = val; /*获取当前页数*/
				this.$ajax.get(this.httpUrl.current, {
					headers: {
						"Authorization": "Bearer " + _this.token
					},
					params: {
						matchcoin_id: _this.matchcoin_id,
						page: val
					}
				}).then(function(res) {
					_this.currentList = res.data.data.data; ///获取当前委托列表
					_this.currentTotal = res.data.data.total; //总条数
					if(res.data.status.code == -200) {
						_this.$message({
							message: res.data.status.message,
							type: 'error'
						});
					}
				}, function(err) {
					console.log(err)
				})
			},
			back(id, index) { /*当前委托--撤单---*/
				var _this = this;
				///调用判断是否刷新token
				this.$ajax.post(this.httpUrl.back, {
					"transaction_eid": id
				}, {
					headers: {
						"Authorization": "Bearer " + _this.token
					}
				}).then(function(res) {
					return true;
				}, function(err) {
					console.log(err)
				})
				_this.currentList.splice(index, 1); //CurrentPage
				_this.currentTotal--;
				var Counter = Math.ceil(_this.currentTotal / 5); //获取当前页数
				if(_this.CurrentPage > Counter) {
					_this.CurrentPage = Counter
				}
				setTimeout(function() {
					_this.$ajax.get(_this.httpUrl.current, {
						headers: {
							"Authorization": "Bearer " + _this.token
						},
						params: {
							matchcoin_id: _this.matchcoin_id,
							page: _this.CurrentPage
						}
					}).then(function(res) {
						_this.currentList = res.data.data.data; ///获取当前委托列表
						_this.currentTotal = res.data.data.total; //总条数
					}, function(err) {
						console.log(err)
					})
				}, 3500)

			},
			clearNoNum1(eve, num) { /*限价的买入量限制*/
				const regexp = /(?:\.0*|(\.\d+?)0+)$/;
				var toFixedNum = Number(this.limit.price).toFixed(num + 1);
				this.limit.price = toFixedNum.substring(0, toFixedNum.toString().length - 1);
				this.limit.price = this.limit.price.replace(regexp, '$1');
				//this.limit.price = parseFloat(this.limit.price);   //去除小数点
				if(this.limit.price == "" || eve.target.value == "") {
					this.limit.price = "";
				}
				if(isNaN(this.limit.price)) {
					this.limit.price = "";
				}
				eve.target.value = eve.target.value.replace(/[^\d.]/g, ""); //清除"数字"和"."以外的字符
				eve.target.value = eve.target.value.replace(/^\./g, ""); //验证第一个字符是数字而不是
				eve.target.value = eve.target.value.replace(/\.{2,}/g, "."); //只保留第一个. 清除多余的
				eve.target.value = eve.target.value.replace(".", "$#$").replace(/\./g, "").replace("$#$", ".");

			},
			clearNoNum2(eve, num) { ///保留小数的后位数  限价的买入数量
				const regexp = /(?:\.0*|(\.\d+?)0+)$/;

				var toFixedNum = Number(this.limit.count).toFixed(num + 1);
				this.limit.count = toFixedNum.substring(0, toFixedNum.toString().length - 1);

				this.limit.count = this.limit.count.replace(regexp, '$1');
				//this.limit.count = parseFloat(this.limit.count);   //去除小数点
				if(this.limit.count == "" || eve.target.value == "") {
					this.limit.count = "";
				}
				if(isNaN(this.limit.count)) {
					this.limit.count = "";
				}
				eve.target.value = eve.target.value.replace(/[^\d.]/g, ""); //清除"数字"和"."以外的字符
				eve.target.value = eve.target.value.replace(/^\./g, ""); //验证第一个字符是数字而不是
				eve.target.value = eve.target.value.replace(/\.{2,}/g, "."); //只保留第一个. 清除多余的
				eve.target.value = eve.target.value.replace(".", "$#$").replace(/\./g, "").replace("$#$", ".");
				eve.target.value = eve.target.value.replace(/^(\-)*(\d+)\.(\d{6}).*$/, '$1$2.$3'); //限定小数位数
				$(".xianjia .baifenBuy  li").removeClass("bai_active");
			},
			clearNoNum3(eve, num) { ///限价的卖出价格
				const regexp = /(?:\.0*|(\.\d+?)0+)$/;
				var toFixedNum = Number(this.limit2.price).toFixed(num + 1);
				this.limit2.price = toFixedNum.substring(0, toFixedNum.toString().length - 1);
				this.limit2.price = this.limit2.price.replace(regexp, '$1');
				//this.limit2.pricet = parseFloat(this.limit2.price);
				if(this.limit2.price == "" || eve.target.value == "") {
					this.limit2.price = "";
				}
				if(isNaN(this.limit2.price)) {
					this.limit2.price = "";
				}
				eve.target.value = eve.target.value.replace(/[^\d.]/g, ""); //清除"数字"和"."以外的字符
				eve.target.value = eve.target.value.replace(/^\./g, ""); //验证第一个字符是数字而不是
				eve.target.value = eve.target.value.replace(/\.{2,}/g, "."); //只保留第一个. 清除多余的
				eve.target.value = eve.target.value.replace(".", "$#$").replace(/\./g, "").replace("$#$", ".");
			},
			clearNoNum4(eve, num) { ///限价的卖出数量
				const regexp = /(?:\.0*|(\.\d+?)0+)$/;

				var toFixedNum = Number(this.limit2.count).toFixed(num + 1);
				this.limit2.count = toFixedNum.substring(0, toFixedNum.toString().length - 1);
				this.limit2.count = this.limit2.count.replace(regexp, '$1');
				//this.limit2.count = parseFloat(this.limit2.count);
				if(this.limit2.count == "" || eve.target.value == "") {
					this.limit2.count = "";
				}
				if(isNaN(this.limit2.count)) {
					this.limit2.count = "";
				}
				eve.target.value = eve.target.value.replace(/[^\d.]/g, ""); //清除"数字"和"."以外的字符
				eve.target.value = eve.target.value.replace(/^\./g, ""); //验证第一个字符是数字而不是
				eve.target.value = eve.target.value.replace(/\.{2,}/g, "."); //只保留第一个. 清除多余的
				eve.target.value = eve.target.value.replace(".", "$#$").replace(/\./g, "").replace("$#$", ".");
				$(".xianjia .baifenBuy  li").removeClass("bai_active");
			},
			clearNoNum5(eve, num) {
				const regexp = /(?:\.0*|(\.\d+?)0+)$/;
				var toFixedNum = Number(this.amount1.amount).toFixed(num + 1);
				this.amount1.amount = toFixedNum.substring(0, toFixedNum.toString().length - 1);
				this.amount1.amount = this.amount1.amount.replace(regexp, '$1');
				//this.amount1.amount = parseFloat(this.amount1.amount);
				if(this.amount1.amount == "" || eve.target.value == "") {
					this.amount1.amount = "";
				}
				if(isNaN(this.amount1.amount)) {
					this.amount1.amount = "";
				}
				eve.target.value = eve.target.value.replace(/[^\d.]/g, ""); //清除"数字"和"."以外的字符
				eve.target.value = eve.target.value.replace(/^\./g, ""); //验证第一个字符是数字而不是
				eve.target.value = eve.target.value.replace(/\.{2,}/g, "."); //只保留第一个. 清除多余的
				eve.target.value = eve.target.value.replace(".", "$#$").replace(/\./g, "").replace("$#$", ".");
				$(".shijia .baifenBuy  li").removeClass("bai_active");

			},
			clearNoNum6(eve, num) {
				const regexp = /(?:\.0*|(\.\d+?)0+)$/;
				var toFixedNum = Number(this.amount2.amount).toFixed(num + 1);
				this.amount2.amount = toFixedNum.substring(0, toFixedNum.toString().length - 1);
				//this.amount2.amount = parseFloat(this.amount2.amount);
				this.amount2.amount = this.amount2.amount.replace(regexp, '$1');
				if(this.amount2.amount == "" || eve.target.value == "") {
					this.amount2.amount = "";
				}
				if(isNaN(this.amount2.amount)) {
					this.amount2.amount = "";
				}
				eve.target.value = eve.target.value.replace(/[^\d.]/g, ""); //清除"数字"和"."以外的字符
				eve.target.value = eve.target.value.replace(/^\./g, ""); //验证第一个字符是数字而不是
				eve.target.value = eve.target.value.replace(/\.{2,}/g, "."); //只保留第一个. 清除多余的
				eve.target.value = eve.target.value.replace(".", "$#$").replace(/\./g, "").replace("$#$", ".");
				$(".shijia .baifenBuy  li").removeClass("bai_active");
			},
			xjClickbuy() { /*限价的买入*/
				let _this = this;
				if(_this.shishiList.length > 0) {
					var num = _this.limit.count * _this.limit.price;
					if(num.toString().indexOf(".") != -1) {
						var par = num.toString().split(".")[0];
						var xiao = num.toString().split(".")[1].slice(0, _this.viewData.decimals);
						var Zhen = parseFloat(par + "." + xiao);
						if(Zhen <= 0) {
							if(_this.lang == "en") { ///英文版本
								_this.$message({
									showClose: true,
									message: 'The amount of entrustment is mistaken',
									type: 'warning',
									duration: 2000
								});
							} else if(_this.lang == "ko") { ///韩文版本
								_this.$message({
									showClose: true,
									message: '위탁 금액이 잘못되다',
									type: 'warning',
									duration: 2000
								});
							} else { ///中文版本
								_this.$message({
									showClose: true,
									message:_this.$t("bbjy.Mistakenamount"),
									type: 'warning',
									duration: 2000
								});
							}
							return false;
						}
					}
					if(_this.limit.price == '') {
						_this.$message({
							showClose: true,
							message: _this.$t("bbjy.pricebe0"),
							type: 'warning',
							duration: 2000
						});
						return false;
					}
					if(_this.limit.price == 0) {
						if(_this.lang == "en") { ///英文版本
							_this.$message({
								showClose: true,
								message: 'Buy price can t be 0',
								type: 'warning',
								duration: 2000
							});
						} else if(_this.lang == "ko") { ///韩文版本
							_this.$message({
								showClose: true,
								message: '매입가격은 0 이다.',
								type: 'warning',
								duration: 2000
							});
						} else { ///中文版本
							_this.$message({
								showClose: true,
								message: _this.$t("bbjy.pricebe0"),
								type: 'warning',
								duration: 2000
							});
						}
						return false;
					}
					if(_this.limit.count == 0 && _this.limit.count != '') {
						if(_this.lang == "en") { ///英文版本
							_this.$message({
								showClose: true,
								message: _this.$t("bbjy.numbernot0"),
								type: 'warning',
								duration: 2000
							});
						} else if(_this.lang == "ko") { ///韩文版本
							_this.$message({
								showClose: true,
								message: '수량을 매입하면 0 이 안 된다.',
								type: 'warning',
								duration: 2000
							});
						} else { ///中文版本
							_this.$message({
								showClose: true,
								message: _this.$t("bbjy.numbernot0"),
								type: 'warning',
								duration: 2000
							});
						}
						return false;
					}
					///计算最大数量
					var maxNum = parseFloat(_this.main_balance / _this.limit.price); //      （主币余额 / 限价的价格） = 拿到最大可买入量
					var Zhen;
					if(maxNum.toString().indexOf(".") != -1) {
						var par = maxNum.toString().split(".")[0];
						var xiao = maxNum.toString().split(".")[1].slice(0, _this.viewData.count_decimals);
						Zhen = parseFloat(par + "." + xiao);
					} else {
						Zhen = parseFloat(maxNum.toFixed(_this.viewData.count_decimals));
					}
					var money2 = parseFloat(_this.shishiList[0].price + _this.shishiList[0].price * 0.1); ////买入不能高于最新价格的110%;
					if(parseFloat(_this.limit.count) > Zhen) { ////输入买入数量是否大于最大可买入量
						if(_this.lang == "en") { ///英文版本
							_this.$message({
								showClose: true,
								message: "Buying volume is not big" + Zhen,
								type: 'warning',
								duration: 2000
							});
						} else if(_this.lang == "ko") { ///韩文版本
							_this.$message({
								showClose: true,
								message: "매입량은 초과할 수 없다" + Zhen,
								type: 'warning',
								duration: 2000
							});
						} else { ///中文版本
							_this.$message({
								showClose: true,
								message: _this.$t("bbjy.notBig") + Zhen,
								type: 'warning',
								duration: 2000
							});
						}
						return false;
					}
					//					else if(parseFloat(_this.limit.price) > money2) { ////买入不能高于最新价格的110%;
					//						if(_this.lang == "en") { ///英文版本
					//							_this.$message({
					//								showClose: true,
					//								message: "The buying price is not more than 110% of the present price.",
					//								type: 'warning',
					//								duration: 2000
					//							});
					//						} else if(_this.lang == "ko") { ///韩文版本
					//							_this.$message({
					//								showClose: true,
					//								message: "매입 가격은 현재 가격의 110% 보다 높을 수 없다.",
					//								type: 'warning',
					//								duration: 2000
					//							});
					//						} else { ///中文版本
					//							_this.$message({
					//								showClose: true,
					//								message: "买入价格不能高于现价的110%",
					//								type: 'warning',
					//								duration: 2000
					//							});
					//						}
					//						return false;
					//					}
					else if(_this.limit.price == "") { ////判断买入价是否为空
						if(_this.lang == "en") { ///英文版本
							_this.$message({
								showClose: true,
								message: "Please enter the buy price",
								type: 'warning',
								duration: 2000
							});
						} else if(_this.lang == "ko") { ///韩文版本
							_this.$message({
								showClose: true,
								message: "구매 가격 을 입력하십시오",
								type: 'warning',
								duration: 2000
							});
						} else { ///中文版本
							_this.$message({
								showClose: true,
								message: _this.$t("bbjy.Pleasebuyprice"),
								type: 'warning',
								duration: 2000
							});
						}
					} else if(_this.limit.count == "") { ////判断买入量是否为空
						if(_this.lang == "en") { ///英文版本
							_this.$message({
								showClose: true,
								message: "Please enter the buy volume",
								type: 'warning',
								duration: 2000
							});
						} else if(_this.lang == "ko") { ///韩文版本
							_this.$message({
								showClose: true,
								message: "입입량을 입력하십시오",
								type: 'warning',
								duration: 2000
							});
						} else { ///中文版本
							_this.$message({
								showClose: true,
								message:_this.$t("bbjy.Pleasevolume"),
								type: 'warning',
								duration: 2000
							});
						}
					} else {
						////成功发送请求
						this.$ajax.post(this.httpUrl.limit, _this.limit, {
							headers: {
								"Authorization": "Bearer " + _this.token
							}
						}).then(function(res) {
							_this.limit.count = ""; //清空数量
							///判断状态码
							if(res.data.status.code == -200) {
								_this.$message({
									showClose: true,
									message: _this.$t("bbjy.Incorrecttryagain"),
									type: 'error',
									duration: 2000
								});
							} else if(res.data.status.code == 200) {
								if(_this.lang == "en") { ///英文版本
									_this.$message({
										showClose: true,
										message: "Successful operation",
										type: 'success',
										duration: 2000
									});
								} else if(_this.lang == "ko") { ///韩文版本
									_this.$message({
										showClose: true,
										message: "조작이 성공하다.",
										type: 'success',
										duration: 2000
									});
								} else { ///中文版本
									_this.$message({
										showClose: true,
										message: _this.$t("bbjy.Successful"),
										type: 'success',
										duration: 2000
									});
								}
							}
						}, function(error) {
							console.log(error)
						})

					}
				}
				/*有实时成交数据*/
				if(_this.shishiList.length == 0) { /*如果没有数据,用户可以随便输入*/
					if(_this.main_balance <= 0) {
						if(_this.lang == "en") { ///英文版本
							_this.$message({
								showClose: true,
								message: "No balance",
								type: 'success',
								duration: 2000
							});
						} else if(_this.lang == "ko") { ///韩文版本
							_this.$message({
								showClose: true,
								message: "남은 액수가 없다.",
								type: 'success',
								duration: 2000
							});
						} else { ///中文版本
							_this.$message({
								showClose: true,
								message: _this.$t("bbjy.Nobalance"),
								type: 'success',
								duration: 2000
							});
						}
						return false;
					}
					if(_this.limit.price == 0) {
						return false;
					}
					if(_this.limit.price == null || _this.limit.price == "") { ////判断买入价是否为空
						if(_this.lang == "en") { ///英文版本
							_this.$message({
								showClose: true,
								message: "Please enter the buy price",
								type: 'warning',
								duration: 2000
							});
						} else if(_this.lang == "ko") { ///韩文版本
							_this.$message({
								showClose: true,
								message: "구매 가격 을 입력하십시오",
								type: 'warning',
								duration: 2000
							});
						} else { ///中文版本
							_this.$message({
								showClose: true,
								message: _this.$t("bbjy.Pleasebuyprice"),
								type: 'warning',
								duration: 2000
							});
						}
						return false;
					}
					if(_this.limit.count == null || _this.limit.count == "") { ////判断买入量是否为空
						if(_this.lang == "en") { ///英文版本
							_this.$message({
								showClose: true,
								message: "Please enter the buy volume",
								type: 'warning',
								duration: 2000
							});
						} else if(_this.lang == "ko") { ///韩文版本
							_this.$message({
								showClose: true,
								message: "입입량을 입력하십시오",
								type: 'warning',
								duration: 2000
							});
						} else { ///中文版本
							_this.$message({
								showClose: true,
								message: _this.$t("bbjy.Pleasevolume"),
								type: 'warning',
								duration: 2000
							});
						}
						return false;
					}
					////成功发送请求
					this.$ajax.post(this.httpUrl.limit, _this.limit, {
						headers: {
							"Authorization": "Bearer " + _this.token
						}
					}).then(function(res) {
						_this.limit.count = ""; //清空数量
						///判断状态码
						if(res.data.status.code == -200) {
							_this.$message({
								showClose: true,
								message: _this.$t("bbjy.Incorrecttryagain"),
								type: 'error',
								duration: 2000
							});
						} else if(res.data.status.code == 200) {
							if(_this.lang == "en") { ///英文版本
								_this.$message({
									showClose: true,
									message: "Successful operation",
									type: 'success',
									duration: 2000
								});
							} else if(_this.lang == "ko") { ///韩文版本
								_this.$message({
									showClose: true,
									message: "조작이 성공하다.",
									type: 'success',
									duration: 2000
								});
							} else { ///中文版本
								_this.$message({
									showClose: true,
									message:  _this.$t("bbjy.Successful"),
									type: 'success',
									duration: 2000
								});
							}
						}
					}, function(error) {
						console.log(error)
					})
				}
			},
			xjClicksell() { /*限价的卖出*/
				//交易内容部分
				var _this = this;
				///调用判断是否刷新token
				if(_this.shishiList.length > 0) {
					if(_this.limit2.price == 0) {
						return false;
					}
					var num = _this.limit2.count * _this.limit2.price;
					if(num.toString().indexOf(".") != -1) {
						var par = num.toString().split(".")[0];
						var xiao = num.toString().split(".")[1].slice(0, _this.viewData.decimals);
						var Zhen = parseFloat(par + "." + xiao);
						if(Zhen <= 0) {
							if(_this.lang == "en") { ///英文版本
								_this.$message({
									showClose: true,
									message: 'The amount of entrustment is mistaken',
									type: 'warning',
									duration: 2000
								});
							} else if(_this.lang == "ko") { ///韩文版本
								_this.$message({
									showClose: true,
									message: '위탁 금액이 잘못되다',
									type: 'warning',
									duration: 2000
								});
							} else { ///中文版本
								_this.$message({
									showClose: true,
									message: _this.$t("bbjy.amountMistaken"),
									type: 'warning',
									duration: 2000
								});
							}
							return false;
						}
					}
					if(_this.limit2.count == 0 && _this.limit2.count != "") {
						if(_this.lang == "en") { ///英文版本
							_this.$message({
								showClose: true,
								message: 'Sales can tbe 0 ',
								type: 'warning',
								duration: 2000
							});
						} else if(_this.lang == "ko") { ///韩文版本
							_this.$message({
								showClose: true,
								message: '매출이 0 이다.',
								type: 'warning',
								duration: 2000
							});
						} else { ///中文版本
							_this.$message({
								showClose: true,
								message: _this.$t("bbjy.Salesbe0"),
								type: 'warning',
								duration: 2000
							});
						}
						return false;
					}
					/*判断买入BTC的余额*/
					var money2 = parseFloat(_this.shishiList[0].price - _this.shishiList[0].price * 0.1); ////最新价格         ////判断输入价格是否低于最新价的90%
					var maxNum = parseFloat(_this.yes_balance).toFixed(_this.viewData.count_decimals); ///计算最大数量
					var Zhen;
					if(parseFloat(_this.limit2.count) > maxNum) { ////输入卖出数量是否大于最大可卖入量
						if(_this.lang == "en") { ///英文版本
							_this.$message({
								showClose: true,
								message: "Selling volume can't be higher than" + maxNum,
								type: 'warning',
								duration: 2000
							});
						} else if(_this.lang == "ko") { ///韩文版本
							_this.$message({
								showClose: true,
								message: "매출이 높으면 안 된다." + maxNum,
								type: 'warning',
								duration: 2000
							});
						} else { ///中文版本
							_this.$message({
								showClose: true,
								message: _this.$t("bbjy.Sellingvolume") + maxNum,
								type: 'warning',
								duration: 2000
							});
						}
						return false;
					} else if(_this.limit2.count == "") { ////输入卖出数量不能未空
						if(_this.lang == "en") { ///英文版本
							_this.$message({
								showClose: true,
								message: "Please enter the sales volume",
								type: 'warning',
								duration: 2000
							});
						} else if(_this.lang == "ko") { ///韩文版本
							_this.$message({
								showClose: true,
								message: "매출량 입력",
								type: 'warning',
								duration: 2000
							});
						} else { ///中文版本
							_this.$message({
								showClose: true,
								message: _this.$t("bbjy.salesvolume"),
								type: 'warning',
								duration: 2000
							});
						}
						return false;
					} else if(_this.limit2.price == "") { ////输入卖出价格不能未空
						if(_this.lang == "en") { ///英文版本
							_this.$message({
								showClose: true,
								message: "Please enter the selling price",
								type: 'warning',
								duration: 2000
							});
						} else if(_this.lang == "ko") { ///韩文版本
							_this.$message({
								showClose: true,
								message: "판매가를 입력하십시오.",
								type: 'warning',
								duration: 2000
							});
						} else { ///中文版本
							_this.$message({
								showClose: true,
								message: _this.$t("bbjy.sellingprice"),
								type: 'warning',
								duration: 2000
							});
						}
						return false;
					}
					//					else if(parseFloat(_this.limit2.price) < money2) { ////判断输入价格是否低于最新价的90%
					//						if(_this.lang == "en") { ///英文版本
					//							_this.$message({
					//								showClose: true,
					//								message: "The selling price should not be less than 90% of the present price.",
					//								type: 'warning',
					//								duration: 2000
					//							});
					//						} else if(_this.lang == "ko") { ///韩文版本
					//							_this.$message({
					//								showClose: true,
					//								message: "매각 가격 은 현가 의 90% 보다 낮을 수 없다",
					//								type: 'warning',
					//								duration: 2000
					//							});
					//						} else { ///中文版本
					//							_this.$message({
					//								showClose: true,
					//								message: "卖出价格不能低于现价的90%",
					//								type: 'warning',
					//								duration: 2000
					//							});
					//						}
					//						return false;
					//					}
					else {
						/////成功发送请求
						_this.$ajax.post(_this.httpUrl.limit, _this.limit2, {
							headers: {
								"Authorization": "Bearer " + _this.token
							}
						}).then(function(res) {
							_this.limit2.count = "";
							///判断状态码
							///判断状态码
							if(res.data.status.code == -200) {
								_this.$message({
									showClose: true,
									message: _this.$t("bbjy.Incorrecttryagain"),
									type: 'error',
									duration: 2000
								});
							} else if(res.data.status.code == 200) {
								if(_this.lang == "en") { ///英文版本
									_this.$message({
										showClose: true,
										message: "Successful operation",
										type: 'success',
										duration: 2000
									});
								} else if(_this.lang == "ko") { ///韩文版本
									_this.$message({
										showClose: true,
										message: "조작이 성공하다.",
										type: 'success',
										duration: 2000
									});
								} else { ///中文版本
									_this.$message({
										showClose: true,
										message: _this.$t("bbjy.Successful"),
										type: 'success',
										duration: 2000
									});
								}
							}

						}, function(error) {
							console.log(error)
						})

					}
				}
				/*没有实时成交的数据*/
				if(_this.shishiList.length == 0) {
					if(_this.yes_balance <= 0) {
						if(_this.lang == "en") { ///英文版本
							_this.$message({
								showClose: true,
								message: "No balance",
								type: 'warning',
								duration: 2000
							});
						} else if(_this.lang == "ko") { ///韩文版本
							_this.$message({
								showClose: true,
								message: "남은 액수가 없다.",
								type: 'warning',
								duration: 2000
							});
						} else { ///中文版本
							_this.$message({
								showClose: true,
								message: _this.$t("bbjy.Nobalance"),
								type: 'warning',
								duration: 2000
							});
						}
						return false;
					}
					if(_this.limit2.price == 0) {
						return false;
					}
					//判断用户输入的卖出价格
					if(_this.limit2.price == null || _this.limit2.price == "") { ////输入卖出价格不能未空
						if(_this.lang == "en") { ///英文版本
							_this.$message({
								showClose: true,
								message: "Please enter the selling price",
								type: 'warning',
								duration: 2000
							});
						} else if(_this.lang == "ko") { ///韩文版本
							_this.$message({
								showClose: true,
								message: "판매가를 입력하십시오.",
								type: 'warning',
								duration: 2000
							});
						} else { ///中文版本
							_this.$message({
								showClose: true,
								message: _this.$t("bbjy.sellingprice"),
								type: 'warning',
								duration: 2000
							});
						}
						return false;
					}
					if(_this.limit2.count == null || _this.limit2.count == "") { ////输入卖出价格不能未空
						if(_this.lang == "en") { ///英文版本
							_this.$message({
								showClose: true,
								message: "Please enter the sales volume",
								type: 'warning',
								duration: 2000
							});
						} else if(_this.lang == "ko") { ///韩文版本
							_this.$message({
								showClose: true,
								message: "매출량 입력",
								type: 'warning',
								duration: 2000
							});
						} else { ///中文版本
							_this.$message({
								showClose: true,
								message: _this.$t("bbjy.salesvolume"),
								type: 'warning',
								duration: 2000
							});
						}
						return false;
					}
					/////成功发送请求
					_this.$ajax.post(_this.httpUrl.limit, _this.limit2, {
						headers: {
							"Authorization": "Bearer " + _this.token
						}
					}).then(function(res) {
						_this.limit2.count = "";
						//console.log(res)
						///判断状态码
						///判断状态码
						if(res.data.status.code == -200) {
							_this.$message({
								showClose: true,
								message: _this.$t("bbjy.Incorrecttryagain"),
								type: 'error',
								duration: 2000
							});
						} else if(res.data.status.code == 200) {
							if(_this.lang == "en") { ///英文版本
								_this.$message({
									showClose: true,
									message: "Successful operation",
									type: 'success',
									duration: 2000
								});
							} else if(_this.lang == "ko") { ///韩文版本
								_this.$message({
									showClose: true,
									message: "조작이 성공하다.",
									type: 'success',
									duration: 2000
								});
							} else { ///中文版本
								_this.$message({
									showClose: true,
									message: _this.$t("bbjy.Successful"),
									type: 'success',
									duration: 2000
								});
							}
						}

					}, function(error) {
						console.log(error)
					})

				}
			},
			sjClickbuy() { /*市价的买入*/
				var _this = this;
				////判断是否为空
				if(_this.amount1.amount == "") {
					if(_this.lang == "en") { ///英文版本
						_this.$message({
							showClose: true,
							message: "Please enter the transaction amount",
							type: 'warning',
							duration: 2000
						});
					} else if(_this.lang == "ko") { ///韩文版本
						_this.$message({
							showClose: true,
							message: "거래액 을 입력해 주십시오",
							type: 'warning',
							duration: 2000
						});
					} else { ///中文版本
						_this.$message({
							showClose: true,
							message: _this.$t("bbjy.Transactionamount"),
							type: 'warning',
							duration: 2000
						});
					}
					return false;
				}
				if(_this.amount1.amount == 0 && _this.amount1.amount != '') {
					if(_this.lang == "en") { ///英文版本
						_this.$message({
							showClose: true,
							message: "Trading volume can't be 0",
							type: 'warning',
							duration: 2000
						});
					} else if(_this.lang == "ko") { ///韩文版本
						_this.$message({
							showClose: true,
							message: "거래액 0",
							type: 'warning',
							duration: 2000
						});
					} else { ///中文版本
						_this.$message({
							showClose: true,
							message:  _this.$t("bbjy.volumebe0"),
							type: 'warning',
							duration: 2000
						});
					}
					return false;
				}
				if(parseFloat(_this.amount1.amount) > parseFloat(_this.main_balance)) {
					if(_this.lang == "en") { ///英文版本
						_this.$message({
							showClose: true,
							message: "Please enter the transaction amount" + _this.main_balance,
							type: 'warning',
							duration: 2000
						});
					} else if(_this.lang == "ko") { ///韩文版本
						_this.$message({
							showClose: true,
							message: "거래액이 높으면 안 된다." + _this.main_balance,
							type: 'warning',
							duration: 2000
						});
					} else { ///中文版本
						_this.$message({
							showClose: true,
							message: _this.$t("bbjy.Pleaseamount") + _this.main_balance,
							type: 'warning',
							duration: 2000
						});
					}
					return false;
				} else {
					////发起请求
					this.$ajax.post(this.httpUrl.amount, _this.amount1, {
						headers: {
							"Authorization": "Bearer " + _this.token
						}
					}).then(function(res) {
						_this.amount1.amount = "";
						///判断状态码
						if(res.data.status.code == 200) {
							if(_this.lang == "en") { ///英文版本
								_this.$message({
									showClose: true,
									message: "Successful operation",
									type: 'success',
									duration: 2000
								});
							} else if(_this.lang == "ko") { ///韩文版本
								_this.$message({
									showClose: true,
									message: "조작이 성공하다.",
									type: 'success',
									duration: 2000
								});
							} else { ///中文版本
								_this.$message({
									showClose: true,
									message: _this.$t("bbjy.Successful"),
									type: 'success',
									duration: 2000
								});
							}
						}
						if(res.data.status.code == -200) {
							_this.$message({
								showClose: true,
								message: _this.$t("bbjy.Incorrecttryagain"),
								type: 'error',
								duration: 2000
							});
						}

					}, function(error) {
						console.log(error)
					})

				}
			},
			////市价的卖出
			sjClicksell() {
				var _this = this;
				////判断是否为空
				if(_this.amount2.amount == "") {
					if(_this.lang == "en") { ///英文版本
						_this.$message({
							showClose: true,
							message: "Please enter the sales volume",
							type: 'warning',
							duration: 2000
						});
					} else if(_this.lang == "ko") { ///韩文版本
						_this.$message({
							showClose: true,
							message: "매출량 입력",
							type: 'warning',
							duration: 2000
						});
					} else { ///中文版本
						_this.$message({
							showClose: true,
							message: _this.$t("bbjy.salesvolume"),
							type: 'warning',
							duration: 2000
						});
					}
					return false;
				} else if(_this.amount2.amount == 0 && _this.amount2.amount != '') {
					if(_this.lang == "en") { ///英文版本
						_this.$message({
							showClose: true,
							message: 'Sales can tbe 0 ',
							type: 'warning',
							duration: 2000
						});
					} else if(_this.lang == "ko") { ///韩文版本
						_this.$message({
							showClose: true,
							message: '매출이 0 이다.',
							type: 'warning',
							duration: 2000
						});
					} else { ///中文版本
						_this.$message({
							showClose: true,
							message: _this.$t("bbjy.Salesbe0"),
							type: 'warning',
							duration: 2000
						});
					}
					return false;
				} else if(parseFloat(_this.amount2.amount) > parseFloat(_this.yes_balance)) {
					if(_this.lang == "en") { ///英文版本
						_this.$message({
							showClose: true,
							message: 'Maximum sell amount' + _this.yes_balance,
							type: 'warning',
							duration: 2000
						});
					} else if(_this.lang == "ko") { ///韩文版本
						_this.$message({
							showClose: true,
							message: '최대 판매량' + _this.yes_balance,
							type: 'warning',
							duration: 2000
						});
					} else { ///中文版本
						_this.$message({
							showClose: true,
							message: _this.$t("bbjy.Maximumamount") + _this.yes_balance,
							type: 'warning',
							duration: 2000
						});
					}
					return false;
				} else {
					////发起请求
					this.$ajax.post(this.httpUrl.amount, _this.amount2, {
						headers: {
							"Authorization": "Bearer " + _this.token
						}
					}).then(function(res) {
						_this.amount2.amount = ""
						if(res.data.status.code == 200) {
							if(_this.lang == "en") { ///英文版本
								_this.$message({
									showClose: true,
									message: "Successful operation",
									type: 'success',
									duration: 2000
								});
							} else if(_this.lang == "ko") { ///韩文版本
								_this.$message({
									showClose: true,
									message: "조작이 성공하다.",
									type: 'success',
									duration: 2000
								});
							} else { ///中文版本
								_this.$message({
									showClose: true,
									message: _this.$t("bbjy.Successful"),
									type: 'success',
									duration: 2000
								});
							}
						}
						if(res.data.status.code == -200) {
							_this.$message({
								showClose: true,
								message: _this.$t("bbjy.Incorrecttryagain"),
								type: 'error',
								duration: 2000
							});
						}
					}, function(error) {
						console.log(error)
					})
				}
			},
			login() { /*登录*/
				this.$router.push({
					name: "login"
				})
			},
			Collection(e) { /*点击收藏或者取消收藏*/
				let _this = this;
				if(e.target.className == 'iconfont icon-xingxingman active') { //取消
					e.target.className = 'iconfont icon-xingxingman';
					for(let i = 0; i < this.itemslocalstorge.length; i++) { //删除本地存的内容
						if(this.itemslocalstorge[i] == this.matchcoin_id) {
							this.itemslocalstorge.splice(i, 1)
						}
					}
					for(let k = 0; k < _this.OptionalList.length; k++) { //删除列表内容
						if(Number(_this.OptionalList[k].matchcoin_id) == Number(_this.matchcoin_id)) {
							_this.OptionalList.splice(k, 1);
							k--;
						}
					}
				} else { //收藏
					e.target.className = 'iconfont icon-xingxingman active';
					//判断是否包含这个值
					if(this.itemslocalstorge.indexOf(this.matchcoin_id) == -1) {
						this.itemslocalstorge.push(Number(this.matchcoin_id));

					}
					for(let i = 0; i < this.matchcoins.length; i++) {
						for(let j = 0; j < this.matchcoins[i].matchcoins.length; j++) {
							if(this.matchcoins[i].matchcoins[j].matchcoin_id == this.matchcoin_id) {
								this.OptionalList.push({
									'isIf': true,
									'matchcoin_id': _this.matchcoins[i].matchcoins[j].matchcoin_id,
									'matchname': _this.matchcoins[i].matchcoins[j].pageIdentifier + "/" + _this.matchcoins[i].pageIdentifier,
									"price": _this.matchcoins[i].matchcoins[j].price,
									"updown": _this.matchcoins[i].matchcoins[j].updown,
									"hour24": _this.matchcoins[i].matchcoins[j].hour24,
									'currencyID': _this.matchcoins[i].matchcoins[j].id,
									/*对币的id*/
									"main_id": _this.matchcoins[i].id /*主币的id*/
								})
							}
						}
					}

				}

			},
			///////深度合并
			merge(num) {
				var _this = this;
				/////遍历卖列表   先把值替换
				for(let i = 0; i < _this.sellList.length; i++) {
					_this.sellList[i].prices = Math.round(_this.sellList[i].price * num) / num;
				}
				for(let i = 0; i < _this.sellList.length; i++) { //遍历第一层从0开始
					for(let j = i + 1; j < _this.sellList.length; j++) { //遍历第二层从1开始
						if(_this.sellList[i].prices == _this.sellList[j].prices) { ///判断价格是否相同
							_this.sellList[i].count += _this.sellList[j].count;
							_this.sellList.splice(j, 1); ////删除
							j--;
						}
					}
				}
				/////遍历买列表      先把值替换
				for(let i = 0; i < _this.buyList.length; i++) {
					_this.buyList[i].prices = Math.round(_this.buyList[i].price * num) / num;
				}
				for(let i = 0; i < _this.buyList.length; i++) { //遍历第一层从0开始
					for(let j = i + 1; j < _this.buyList.length; j++) { //遍历第二层从1开始
						if(_this.buyList[i].prices == _this.buyList[j].prices) { ///判断价格是否相同
							_this.buyList[i].count += _this.buyList[j].count;
							_this.buyList.splice(j, 1); ////删除
							j--;
						}
					}
				}
				/////再重新判断
				var sum1 = 0;
				_this.buyList.forEach(function(item) {
					sum1 = parseFloat(item.count) + sum1;
					item.sum = sum1;
				})

				var sum = 0;
				_this.sellList.forEach(function(item) {
					sum = parseFloat(item.count) + sum;
					item.sum = sum;
				})
				setTimeout(function() {
					_this.shenHe = false;
				}, 100)
			},
			getMaxValue: function(buyList, sellList) { /*获取买卖列队的最大值*/
				var buyMax = 0;
				var sellMax = 0;
				if(buyList.length == 0) { //判断买列队是否为空
					buyMax = 0;
				} else {
					buyMax = buyList[0].count; //买的最大值
					for(let i = 0; i < buyList.length; ++i) {
						if(buyMax < buyList[i].count) {
							buyMax = buyList[i].count
						}
					}
				}
				if(sellList.length == 0) {
					sellMax = 0;
				} else {
					sellMax = sellList[0].count; //卖的最大值
					for(let j = 0; j < sellList.length; ++j) {
						if(sellMax < sellList[j].count) {
							sellMax = sellList[j].count
						}
					}
				}
				if(buyMax > sellMax) { //比较买卖最高和最低值
					return this.MaximumValue = parseFloat(buyMax);
				} else {
					return this.MaximumValue = parseFloat(sellMax);
				}
			},
			tabswitching(matcId, main_id, currencyId) { /*在自选区切换币种*/
				this.currencyIsShow = false;
				window.localStorage.setItem("main_id", main_id); /*主币id*/
				window.localStorage.setItem("yes_id", currencyId); /*对币id*/
				this.Coins = currencyId;
				this.$router.push({
					name: "bbjy",
					params: {
						id: matcId
					}
				})
				setTimeout(function() {
					window.location.reload();
				}, 200)
			},
			withdraw() { /*选择币种返回*/
				this.currencyIsShow = false;
				window.scrollTo(0, 0);
			},
			tabCurrency(id, index) { /*币种切换*/
				this.zxIsShow = false;
				$(".tab_title .title").eq(index).addClass("active_color").siblings("li").removeClass("active_color");
				$(".ContentList").eq(index).show().siblings(".ContentList").hide();
			},
			SelfSelection() { /*自选切换*/
				this.zxIsShow = true;
				$(".SelfSelection").addClass("active_color").siblings(".title").removeClass("active_color");
				$(".ContentList").hide();
			},
			/*限价市价切换*/
			activeBbjy(name, index) {
				this.bbjySelect = name;
				this.shiJiaIsShow = false;
				/*给浏览器存个值用户点击的是否为限价或者为市价*/
				if(index == 1) {
					window.localStorage.setItem("shijia", 1); /*如果选中得为市价将值存起来*/
					this.shiJiaBox = 1;
				} else {
					window.localStorage.removeItem("shijia"); /*选中的为限价删除市价标识*/
					this.shiJiaBox = null;
				}
			},
			/*限价买卖切换*/
			tabBuySell(index) {
				$(".tab_buySell_left").eq(index).show().siblings(".tab_buySell_left").hide();
				if(index == 0) {
					$(".buySell_title .xj-mm .buySell").eq(0).addClass("buy_active").siblings(".buySell").removeClass("sell_active");
				}
				if(index == 1) {
					$(".buySell_title .xj-mm .buySell").eq(1).addClass("sell_active").siblings(".buySell").removeClass("buy_active");
				}
			},
			/*限价百分比买入百分比切换*/
			baiFenBuyTab(bai, index, toNum) {
				if(this.main_balance <= 0) { /////////////////判断主币的余额是否为0
					return false;
				}
				if(this.limit.price == "" || this.limit.price == 0 || this.limit.price == null) { /*判断价格是否为空*/
					return false;
				}
				var num = this.main_balance / this.limit.price * bai;
				//var toFixNum = num.toFixed(toNum + 1);//toFixNum.substring(0, toFixNum.toString().length - 1)
				if(num.toString().indexOf("e") != -1){
					this.limit.count = 0;
					return false;
				}
				if(num.toString().indexOf(".") != -1) { //判断有无包含小数点
					var par = num.toString().split(".")[0];
					var xiao = num.toString().split(".")[1].slice(0, toNum);
					var Zhen = parseFloat(par + "." + xiao);
					this.limit.count = Zhen;
				} else {
					this.limit.count = num;
				}
				$(".xianjia .baifenBuy  li").eq(index).addClass("bai_active").siblings("li").removeClass("bai_active");
			},
			/*限价百分比卖出百分比切换*/
			baiFenSellTab(bai, index, toNum) {
				if(this.limit2.price == "" || this.limit2.price == 0 || this.limit.price == null) { /*判断价格是否为空*/
					return false;
				}
				if(this.yes_balance <= 0) { ////判断对币的余额是否为0
					return false;
				}
				var num = this.yes_balance * bai;
				/*判断有无包含小数点*/
				if(num.toString().indexOf(".") != -1) {
					var par = num.toString().split(".")[0];
					var xiao = num.toString().split(".")[1].slice(0, toNum);
					var Zhen = parseFloat(par + "." + xiao);
					this.limit2.count = Zhen;
				} else {
					this.limit2.count = num
				}
				$(".xianjia .baifenSell li").eq(index).addClass("bai_active").siblings("li").removeClass("bai_active")
			},
			//市价买卖切换
			tabBuySell1(index) {
				$(".tab_buySell_left1").eq(index).show().siblings(".tab_buySell_left1").hide();
				if(index == 0) {
					$(".buySell_title .sj-mm .buySell").eq(0).addClass("buy_active").siblings(".buySell").removeClass("sell_active");
				}
				if(index == 1) {
					$(".buySell_title .sj-mm .buySell").eq(1).addClass("sell_active").siblings(".buySell").removeClass("buy_active");
				}
			},
			/*市价百分比买入百分比切换*/
			baiFenBuyTab1(bai, index, toNum) {
				if(this.main_balance <= 0) {
					return false;
				}
				var num = this.main_balance * bai;
				//判断是否包含小数点
				if(num.toString().indexOf(".") != -1) {
					var par = num.toString().split(".")[0];
					var xiao = num.toString().split(".")[1].slice(0, toNum);
					var Zhen = parseFloat(par + "." + xiao);
					this.amount1.amount = Zhen;
				} else {
					this.amount1.amount = num;
				}
				$(".shijia .baifenBuy li").eq(index).addClass("bai_active").siblings("li").removeClass("bai_active")
			},
			/*市价百分比卖出百分比切换*/
			baiFenSellTab1(bai, index, toNum) {
				if(this.yes_balance <= 0) {
					return false;
				}
				var num = this.yes_balance * bai;
				//判断是否包含小数点
				if(num.toString().indexOf(".") != -1) {
					var par = num.toString().split(".")[0];
					var xiao = num.toString().split(".")[1].slice(0, toNum);
					var Zhen = parseFloat(par + "." + xiao);
					this.amount2.amount = Zhen;
				} else {
					this.amount2.amount = num;
				}
				$(".shijia .baifenSell li").eq(index).addClass("bai_active").siblings("li").removeClass("bai_active")
			},
			/*当前委托   历史委托  历史成交  资产管理 内容切换*/
			tabHistory(index) {
				let _this = this;

				$(".tabHistory li").eq(index).addClass("tabHistory_active").siblings("li").removeClass("tabHistory_active");
				$(".tabHistory_content").eq(index).show().siblings(".tabHistory_content").hide();
				if(this.token == null || this.token == undefined) {
					return false;
				}
				/*判断点击的是否为历史委托*/
				if(index == 1) {
					/////获取历史委托内容
					this.$ajax.get(this.httpUrl.history, {
						headers: {
							"Authorization": "Bearer " + _this.token
						},
						params: {
							datetype: 0,
							matchcoin_id: _this.matchcoin_id
						}
					}).then(function(res) {
						_this.HistoryList = res.data.data.data;
						_this.HistoryTotal = res.data.data.total; //总条数
					}, function(err) {
						console.log(err)
					})
				}
				/*判断是否为历史成交*/
				if(index == 2) {
					///获取历史成交的内容
					this.$ajax.get(this.httpUrl.history, {
						headers: {
							"Authorization": "Bearer " + _this.token
						},
						params: {
							datetype: _this.HistoryDealdatetype,
							status: 1,
							matchcoin_id: _this.matchcoin_id
						}
					}).then(function(res) {
						_this.HistoryDeal = res.data.data.data;
						_this.HistoryDealTotal = res.data.data.total; //获取历史成交的总条数
						for(let i = 0; i < _this.HistoryDeal.length; i++) {
							_this.HistoryDeal[i].isShow = false;
						}
					}, function(err) {
						console.log(err)
					})

				}

			}
		},
		computed:{
			...mapGetters('setting', ['urlPrefix']),
		},
		created() {
			let _this = this;
			/*获取所有币对信息*/
			this.$ajax.get(this.httpUrl.coin_matching,{
			params: {
				symbol: this.urlPrefix,
				...(this.userInfo ? { code: this.userInfo.user_id } : {}),
			}
		}).then(function(res) {
				_this.matchcoins = res.data.data;
				/*判断当前的币对id是否与币种列表里面的相匹配*/
				for(let i = 0; i < _this.matchcoins.length; i++) { /*拿到页面需要的值*/
					for(let j = 0; j < _this.matchcoins[i].matchcoins.length; j++) {
						if(_this.matchcoins[i].matchcoins[j].matchcoin_id == _this.viewData.matchcoin_id) {
							_this.viewData.mainCurrency = _this.matchcoins[i].pageIdentifier;
							_this.viewData.forMoney = _this.matchcoins[i].matchcoins[j].pageIdentifier;
							_this.viewData.price = _this.matchcoins[i].matchcoins[j].price;
							_this.viewData.updown = _this.matchcoins[i].matchcoins[j].updown;
							_this.viewData.low = _this.matchcoins[i].matchcoins[j].low;
							_this.viewData.high = _this.matchcoins[i].matchcoins[j].high;
							_this.viewData.hour24 = _this.matchcoins[i].matchcoins[j].hour24;
							_this.viewData.cny = _this.matchcoins[i].matchcoins[j].cny;
							_this.viewData.decimals = _this.matchcoins[i].matchcoins[j].decimals;
							_this.viewData.count_decimals = _this.matchcoins[i].matchcoins[j].count_decimals;
							_this.limit2.price = _this.matchcoins[i].matchcoins[j].price;
							_this.limit.price = _this.matchcoins[i].matchcoins[j].price;
						}
						if(parseFloat(_this.matchcoins[i].matchcoins[j].matchcoin_id) == parseFloat(_this.matchcoin_id)) { /*判断当前id*/
							window.localStorage.setItem("main_id", _this.matchcoins[i].id) /*主币id*/
							window.localStorage.setItem("yes_id", _this.matchcoins[i].matchcoins[j].id); /*对币id*/
						}
					}
				} /*拿到自选里面的值*/
				var aa = [];
				//				if(_this.token === null || _this.token === undefined) {
				////未登录执行
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
									'currencyID': _this.matchcoins[k].matchcoins[n].id,
									"main_id": _this.matchcoins[k].id /*主币的id*/
								})
								aa.push(_this.matchcoins[k].matchcoins[n].matchcoin_id)
							}
						}
					}
				}
				//				}
			}, function(err) {
				console.log(err)
			})
			/*获取买卖列表*/
			this.$ajax.get(this.httpUrl.buy_sell_queue, {
				params: {
					"matchcoin_id": _this.matchcoin_id
				}
			}).then(function(res) {
				if(res.data.status.code == -200) {
					_this.$message({
						message: res.data.status.message,
						type: 'error'
					});
				}
				_this.buyList = res.data.data.buy_queues; //买列队
				_this.sellList = res.data.data.sell_queues;  //卖列队
				/*计算最大值*/
				_this.getMaxValue(_this.buyList, _this.sellList);
				var sum = 0;
				_this.sellList.forEach(function(item) {
					sum = parseFloat(item.count) + sum;
					item.sum = sum;
				})
				_this.sellList = _this.sellList.reverse();
				var sum1 = 0;
				_this.buyList.forEach(function(item) {
					sum1 = parseFloat(item.count) + sum1;
					item.sum = sum1;
				})
			}, function(err) {
				console.log(err)
			})
		},
		mounted() {
			var _this = this;
			if(this.$route.params.buy != undefined) { /*从k线页面进如入-默认显示限价的买入---*/
				window.localStorage.removeItem("shijia"); /*将用户选择的市价交易干掉*/
				this.shiJiaBox = null; /*将市价的内容隐藏*/
			}
			if(this.$route.params.sell != undefined) { /*从k线页面进入--默认显示限价的卖出---*/
				window.localStorage.removeItem("shijia"); /*将用户选择的市价交易干掉*/
				this.shiJiaBox = null; /*将市价的内容隐藏*/
				$(".tab_buySell_left").eq(1).show().siblings(".tab_buySell_left").hide(); /*默认显示限价的卖出部分*/
				$(".buySell_title .xj-mm .buySell").eq(1).addClass("sell_active").siblings(".buySell").removeClass("buy_active"); /*选中状态*/
			}
			/*WebSocket实时推送开始*/
			// var ws = new WebSocket(_this.wsIp); ///定义全局
			var ws = this.ws;
			const wsOpenHandle = () => {
				ws.send('{"mid":"' + _this.matchcoin_id + '"}')
				if (_this.token != null && _this.token != "undefined") {
					///获取用户信息
					if (!this.userInfo) {
						this.info().then(() => ws.send('{"bind_id":"' + this.userInfo.user_id + '"}'));
					} else {
						ws.send('{"bind_id":"' + this.userInfo.user_id + '"}')
					}
				}
			}
			//传递币对ID开始//
			if (ws.readyState === ws.OPEN) {
				wsOpenHandle();
			} else {
				ws.onopen = wsOpenHandle;
			}
			ws.onmessage = function(e) {
				var arr = JSON.parse(e.data);
				if(arr.type == "ping") { ////判断type
					ws.send('{"pong":' + Date.now() + '}');
				} else if(arr.type == "refresh") {
					/*刷新当前委托*/
					_this.$ajax.get(_this.httpUrl.current, {
						headers: {
							"Authorization": "Bearer " + _this.token
						},
						params: {
							matchcoin_id: _this.matchcoin_id,
							page: _this.CurrentPage
						}
					}).then(function(res) {
						_this.currentList = res.data.data.data; ///获取当前委托列表
						_this.currentTotal = res.data.data.total; //总条数
					}, function(err) {
						console.log(err)
					})

					/*刷新历史委托*/
					_this.$ajax.get(_this.httpUrl.history, {
						headers: {
							"Authorization": "Bearer " + _this.token
						},
						params: {
							datetype: 0,
							matchcoin_id: _this.matchcoin_id,
							page: _this.historyWPage
						}
					}).then(function(res) {
						_this.HistoryList = res.data.data.data;
						_this.HistoryTotal = res.data.data.total; //总条数
					}, function(err) {
						console.log(err)
					})

					/*刷新历史成交*/
					_this.$ajax.get(_this.httpUrl.history, {
						headers: {
							"Authorization": "Bearer " + _this.token
						},
						params: {
							datetype: 0,
							status: 1,
							matchcoin_id: _this.matchcoin_id,
							page: _this.historyJPage
						}
					}).then(function(res) {
						_this.HistoryDeal = res.data.data.data;
						_this.HistoryDealTotal = res.data.data.total; //获取历史成交的总条数
						for(let i = 0; i < _this.HistoryDeal.length; i++) {
							_this.HistoryDeal[i].isShow = false;
						}
					}, function(err) {
						console.log(err)
					})
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
							if(_this.assetsList[i].currency_id == window.localStorage.getItem("main_id")) { ///主币ID
								_this.main_balance = _this.assetsList[i].balance /////////获取主币余额
							}
							if(_this.assetsList[i].currency_id == window.localStorage.getItem("yes_id")) { ///对币ID
								_this.yes_balance = _this.assetsList[i].balance //////获取对币余额
							}
						}
						_this.CurBalance = btcBla; ///btc值变化
						_this.RBalance = rmbBla; ///人民币值变化
					}, function(err) {
						console.log(err)
					})
				} else if(arr.type == "socket") {
					for(let i = 0; i < arr.message.length; i++) {
						if(arr.message[i].type == "buySellQueue" + _this.matchcoin_id) { ///推送买卖列队




							var buySellList = arr.message[i].message;
							_this.buyList = buySellList.buy_queues;
							_this.sellList = buySellList.sell_queues;
							if(_this.buyList.length == 0) {
								_this.buyList = buySellList.buy_queues;
							} else {
								var sum1 = 0;
								_this.buyList.forEach(function(item) {
									sum1 = parseFloat(item.count) + sum1;
									item.sum = sum1;
								})
							}
							if(_this.sellList.length == 0) {
								_this.sellList = buySellList.sell_queues;
							} else {
								var sum = 0;
								_this.sellList.forEach(function(item) {
									sum = parseFloat(item.count) + sum;
									item.sum = sum;
								})
								_this.sellList = _this.sellList.reverse();
							}
							_this.getMaxValue(_this.buyList, _this.sellList); ///拿到最大值






						} else if(arr.message[i].type == "matchcoins") { //实时推送列表
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
										if(arrList[n].id == _this.viewData.matchcoin_id) {
											_this.viewData.price = arrList[n].price;
											_this.viewData.updown = arrList[n].updown;
											_this.viewData.high = arrList[n].high;
											_this.viewData.hour24 = arrList[n].hour24;
											_this.viewData.low = arrList[n].low;
											_this.viewData.cny = arrList[n].cny;
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
									}
								}
							}

						}
					}
				}

			}
			/*WebSocket实时推送结束*/
			this.$refs.startTime.close(); /*关闭开始选择时间*/
			this.$refs.endTime.close(); /*关闭结束选择时间*/
			/*点击*/
			$(document).bind("click", function(e) {
				e.stopPropagation();
				_this.shenHe = false;
				_this.shiJiaIsShow = false;
			})
			if(this.shiJiaBox != null) { /*判断用户选中是否为市价或者限价*/
				_this.bbjySelect = this.$t("list.market_price")
			} else {
				_this.bbjySelect = this.$t("list.Fixed_price")
			}
			/*点击其他地方限价市价切换收回去*/
			document.body.onclick = function(event) {
				event.stopPropagation();
				_this.shiJiaIsShow = false;
			}
			/*判断用户是否登录*/
			if(_this.token == null || _this.token == undefined) {
				return false;
			} else {
				////获取当前委托内容
				this.$ajax.get(this.httpUrl.current, {
					headers: {
						"Authorization": "Bearer " + _this.token
					},
					params: {
						matchcoin_id: _this.matchcoin_id
					}
				}).then(function(res) {
					_this.currentList = res.data.data.data;
					_this.currentTotal = res.data.data.total; //总条数
				}, function(err) {
					console.log(err)
				})

				////获取资产信息的内容
				this.$ajax.get(this.httpUrl.finances, {
					headers: {
						"Authorization": "Bearer " + _this.token
					}
				}).then(function(res) {
					_this.assetsList = res.data.data; /*资产管理*/
					let btcBla = 0; ///BTC剩余值
					let rmbBla = 0; ///人民币剩余值
					for(let i = 0; i < _this.assetsList.length; i++) {
						if(_this.assetsList[i].currency_id == window.localStorage.getItem("main_id")) { ///主币ID
							_this.main_balance = _this.assetsList[i].balance /////////获取主币余额
						}
						if(_this.assetsList[i].currency_id == window.localStorage.getItem("yes_id")) { ///对币ID
							_this.yes_balance = _this.assetsList[i].balance //////获取对币余额
						}
						btcBla += parseFloat(_this.assetsList[i].btc_blance);
						rmbBla += parseFloat(_this.assetsList[i].cny_blance);
					}
					_this.CurBalance = btcBla; ///btc值变化
					_this.RBalance = rmbBla; ///人民币值变化
				}, function(err) {
					console.log(err)
				})
			}
			//获取实时成交数据
			this.$ajax.get(this.httpUrl.shishi, {
				params: {
					'matchcoin_id': _this.matchcoin_id
				}
			}).then(function(res) {
				_this.shishiList = res.data.data;
				if(res.data.status.code == -200) {
					_this.$message({
						message: res.data.status.message,
						type: 'error'
					});
				}
			}, function(error) {
				console.log(error)
			})
		}
	}
</script>
<style lang="scss">
	#bbjy {
		.mint-popup-right,
		.mint-popup-left {
			width: 100%;
			height: 100%;
			background: #323560;
			.currency_box {
				width: 100%;
				height: 80%;
				overflow-y: auto;
			}
		}
		.mint-datetime-cancel,
		.mint-datetime-confirm {
			color: #5a63dd;
		}
		.el-pager li {
			/*分页的背景颜色*/
			background: none;
			color: #fff;
		}
		.el-pagination .btn-next,
		.el-pagination .btn-prev {
			background: none;
			color: #fff;
		}
		.el-pager li.active,
		.el-pagination button:hover {
			color: #a4acff;
		}
		.el-pagination button:disabled {
			color: #fff;
			background: none;
		}
	}
</style>

<style lang="scss" scoped>
	/*币币交易公用的色值*/

	$color_bg:#141738;
	/*一块一块内容的背景颜色*/

	$buy_color:#02c289;
	/*买入*/

	$sell_color:#ea6954;
	/*卖出*/

	$button_color:#5f7cc0;
	/*按钮的颜色*/

	$xian_color:#6d87c7;
	/*限价字体*/

	$alert_bg:#474da0;
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
	$color_moren:#7f8af4;
	/*蒙版*/
	/*分页*/

	.pageCount {
		width: 100%;
		height: .4rem;
		display: flex;
		justify-content: center;
		align-items: center;
		background: #141738;
	}
	/*选中的颜色*/

	.active_color {
		color: #fff !important;
		span {
			display: block !important;
		}
	}
	/*黑色蒙版*/

	.men_back {
		width: 100%;
		height: 100%;
		position: fixed;
		left: 0;
		top: 0;
		z-index: 100;
		background: rgba(0, 0, 0, 0.5);
	}
	/*高度*/

	.oHeight {
		height: .45rem;
	}
	/*输入框背景颜色*/

	.fours_active {
		/*聚焦边框颜色*/
		border: 1px solid #a199f4 !important;
	}

	.icon-youxia {
		font-size: 10px;
		transform: scale(0.7);
		align-self: center;
	}
	/*买入边框颜色*/

	.buy_active {
		border-bottom: 2px solid $buy_color;
	}
	/*卖出边框颜色*/

	.sell_active {
		border-bottom: 2px solid $sell_color;
	}
	/*百分比选中颜色*/

	.bai_active {
		color: #fff !important;
	}
	/*当前委托选中*/

	.tabHistory_active {
		color: #fff !important;
		span {
			border: 1px solid #fff !important;
		}
	}
	/*买的颜色*/

	.buy {
		color: $buy_color !important;
	}
	/*卖的颜色*/

	.sell {
		color: $sell_color !important;
	}
	/*资产管理*/

	.Assets {
		width: 100%;
		.AssetsList {
			li {
				text-align: left !important;
			}
		}
		.wt_item_title {
			height: .4rem !important;
		}
		.children {
			width: 100%;
			border: 1px solid #303678;
			position: relative;
			display: none;
			box-sizing: border-box;
			.AssetsList {
				li:nth-last-of-type(1) {
					width: 40% !important;
				}
			}
		}
		.children:after {
			border: 12px solid transparent;
			border-bottom: 12px solid #303678;
			width: 0;
			height: 0;
			position: absolute;
			right: .3rem;
			top: -.24rem;
			content: ' '
		}
		.children:before {
			border: 10px solid transparent;
			border-bottom: 11px solid #141738;
			width: 0;
			height: 0;
			position: absolute;
			right: .32rem;
			top: -.21rem;
			content: ' ';
			z-index: 666;
		}
	}
	/*当前委托内容*/

	.wt_list {
		width: 100%;
		.wt_item {
			/*当前委托item*/
			width: 100%;
			background: $color_bg;
			margin-bottom: .1rem;
			.wt_item_title {
				/*委托头部*/
				width: 100%;
				height: .35rem;
				line-height: .35rem;
				display: flex;
				justify-content: space-between;
				box-sizing: border-box;
				padding: 0 .11rem 0 .17rem;
				border-bottom: $alet_border;
				button {
					width: .55rem;
					height: .24rem;
					background: $button_color;
					border: 1px solid $button_color;
					color: #fff;
					border-radius: .02rem;
					outline: none;
				}
				.currency {
					font-size: .12rem;
					color: #fff;
				}
			}
			.wt_item_content {
				/*委托内容*/
				width: 100%;
				box-sizing: border-box;
				padding: 0 .11rem 0.02rem .17rem;
				overflow: hidden;
				.currency {
					li:nth-of-type(1) {
						width: 20% !important;
					}
					li {
						width: 40% !important;
					}
					li:nth-of-type(2) {
						text-align: center;
					}
				}
				ul {
					width: 100%;
					height: .25rem;
					display: flex;
					li {
						width: 37%;
						text-align: left;
						margin-top: .05rem;
					}
					li:nth-of-type(2) {
						width: 35%;
						text-align: left;
					}
					li:nth-last-child(1) {
						width: 25%;
						text-align: right;
					}
				}
				.title {
					color: $fontColor_price;
					margin-top: .05rem;
				}
				.content {
					color: $price_content_color;
					margin-bottom: .1rem;
				}
			}
		}
	}
	/*当前委托     历史委托     历史成交    资产管理内容部分*/

	.tabHistory_content {
		display: none;
	}
	/*当前委托     历史委托     历史成交    资产管理*/

	.tabHistory {
		width: 100%;
		height: .35rem;
		display: flex;
		box-sizing: border-box;
		padding: 0 .05rem;
		/*justify-content: space-between;*/
		li {
			width: 31%;
			text-align: center;
			display: flex;
			flex-direction: column;
			align-items: center;
			color: $xian_color;
			p {
				height: .3rem;
				line-height: .3rem;
			}
			span {
				display: inline-block;
				width: 0.2rem;
			}
		}
		.iconfont {
			line-height: .3rem;
			color: #fff;
			margin-left: .05rem;
		}
	}
	/*买入卖出内容部分*/

	.tab_buySell {
		width: 100%;
		display: flex;
		background: $color_bg;
		.tab_buySell_left1 {
			@extend .tab_buySell_left;
		}
		.tab_buySell_left {
			width: 55%;
			box-sizing: border-box;
		}
		.tab_buySell_right {
			width: 45%;
			box-sizing: border-box;
		}
		/*右侧盘口   价格  数量部分*/
		.tab_buySell_right {
			.tab_buySell_right_title {
				width: 100%;
				height: .2rem;
				position: relative;
				font-size: .1rem;
				display: flex;
				justify-content: space-between;
				box-sizing: border-box;
				padding-right: .1rem;
				line-height: .2rem;
				color: $fontColor_price;
				li {
					flex: 1;
					text-align: right;
					z-index: 66;
					/*color: #fff;*/
				}
				.progress {
					position: absolute;
					right: 0;
					top: 0;
					height: .2rem;
				}
				.progress.red {
					background: #d32f47;
					opacity: 0.18;
				}
				.progress.green {
					background: #4b9b5e;
					opacity: 0.18;
				}
				li:nth-of-type(1) {
					flex: 0.5;
					text-align: center;
				}
			}
			/*卖出部分*/
			.sellList {
				width: 100%;
				height: 1.15rem;
				box-sizing: border-box;
				border-bottom: $alet_border;
				overflow: hidden;
				ul {
					height: .23rem;
					line-height: .23rem;
				}
				.sell {
					color: $sell_color;
					.count {
						color: $xian_color;
					}
				}
			}
			/*买入部分*/
			.buyList {
				width: 100%;
				height: 1.05rem;
				box-sizing: border-box;
				overflow: hidden;
				.buy {
					color: $buy_color;
				}
				ul {
					height: .22rem;
					line-height: .22rem;
				}
				.count {
					color: $xian_color;
				}
			}
			/*深度图*/
			.shen_du {
				width: 100%;
				height: .33rem;
				display: flex;
				box-sizing: border-box;
				padding-right: .05rem;
				line-height: .3rem;
				justify-content: flex-end;
				color: $xian_color;
				position: relative;
				.iconfont {
					color: #fff;
					align-self: flex-end;
					margin-left: .05rem;
				}
				.box {
					position: absolute;
					top: -.9rem;
					width: .65rem;
					z-index: 99;
					ul {
						width: .65rem;
						li {
							background: #474da0;
							text-align: center;
							color: #fff;
							border-bottom: 1px solid #303678;
						}
						li:nth-last-of-type(1) {
							border-bottom: none;
						}
					}
				}
			}
		}
		/*左侧买入卖出内容*/
		.tab_buySell_left {
			display: none;
			.price {
				width: 1.55rem;
				height: .3rem;
				position: relative;
				border: $input_border;
				border-radius: .02rem;
				box-sizing: border-box;
				background: $input_bgColor;
				margin: .1rem 0 0 .1rem;
				input {
					width: 100%;
					height: 100%;
					border: none;
					background: none;
					outline: none;
					color: #fff;
					box-sizing: border-box;
					padding-left: .05rem;
					font-size: .12rem;
				}
				input::-webkit-input-placeholder {
					color: #2f3c5d;
				}
				span {
					position: absolute;
					right: .05rem;
					top: .08rem;
					color: $color_zise;
				}
			}
			/*数量*/
			.count {
				@extend .price;
				margin-top: 0;
			}
			/*转换人民币*/
			.tab_money {
				width: 100%;
				height: .3rem;
				line-height: .3rem;
				box-sizing: border-box;
				padding-left: .1rem;
				color: $color_zise;
			}
			/*百分比*/
			.baiFen {
				width: 100%;
				height: .25rem;
				line-height: .25rem;
				display: flex;
				box-sizing: border-box;
				padding: 0 .05rem;
				justify-content: space-around;
				box-sizing: border-box;
				margin-top: .05rem;
				li {
					color: $color_zise;
				}
			}
			/*交易额*/
			.turnover {
				width: 100%;
				height: .2rem;
				line-height: .2rem;
				box-sizing: border-box;
				padding-left: .1rem;
				margin-top: .2rem;
				color: $color_zise;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
			}
			/*买入BTC*/
			.buySubmit {
				width: 1.55rem;
				text-align: center;
				margin: .2rem auto;
				button {
					width: 1.55rem;
					height: .3rem;
					background: $buy_color;
					border-radius: .02rem;
					border: none;
					outline: none;
					color: #fff;
				}
			}
			/*卖出BTC*/
			.sellSubmit {
				@extend .buySubmit;
				button {
					background: $sell_color;
				}
			}
		}
		/*右侧开盘*/
	}
	/*买入卖出的头部*/

	.buySell_title {
		width: 100%;
		height: .37rem;
		display: flex;
		justify-content: space-between;
		box-sizing: border-box;
		padding: 0 10px;
		.buySell_title_left {
			width: 50%;
			position: relative;
			display: flex;
			align-items: flex-end;
			justify-content: space-between;
			p {
				height: .25rem;
			}
			div {
				display: flex;
				p:nth-of-type(1) {
					margin-right: .15rem;
				}
			}
			.buy {
				color: $buy_color;
				box-sizing: border-box;
			}
			.sell {
				color: $sell_color;
				box-sizing: border-box;
			}
			.Fixed_price {
				/*限价*/
				display: flex;
				color: $xian_color;

			}
			.Fixed_price_list {
				/*点击跳转*/
				position: absolute;
				right: -.3rem;
				top: .35rem;
				z-index: 999;
				li {
					width: .75rem;
					height: .3rem;
					text-align: center;
					color: #fff;
					line-height: .3rem;
					background: $alert_bg;
					border-bottom: $alet_border;
				}
				li:hover {
					background: $alert_hover;
				}
				li:nth-last-child(1) {
					border-bottom: none;
				}
			}
		}
		.buySell_title_right {
			align-self: center;
			color: #fff;
			display: flex;
			span {
				margin-right: .05rem;
				align-self: center;
			}
			.icon-tubiao-zhexiantu {
				font-size: .17rem;
			}
			.icon-youxia {
				align-self: flex-end;
			}
		}
	}
	/*币币页面头部*/

	.header_box {
		width: 100%;
		height: .45rem;
		position: fixed;
		left: 0;
		top: 0;
		z-index: 100;
	}

	.bbjy_header {
		width: 100%;
		height: .45rem;
		position: relative;
		display: flex;
		justify-content: space-between;
		color: #fff;
		align-items: center;
		background: $color_bg;
		box-sizing: border-box;
		.zi-xuan {
			margin-right: .1rem;
			.iconfont {
				color: #5c72aa;
			}
			.active {
				color: #0095f0 !important;
			}
		}
		.bbjy_header_left {
			height: .45rem;
			display: flex;
			align-items: center;
			box-sizing: border-box;
			padding-left: .05rem;
			.icon-im_fenlei {
				line-height: .16rem;
				font-size: .14rem;
			}
			span {
				margin: 0 0 0 .05rem;
				font-size: .14rem;
			}
			.youxia {
				height: .2rem;
				display: flex;
				margin: 0;
				.icon-youxia {
					font-size: .1rem;
					align-self: flex-end;
					transform: scale(0.56);
				}
			}
		}
		.bbjy_header_conter {
			width: 20%;
			position: absolute;
			left: 40%;
			top: 28%;
			font-size: .15rem;
			font-weight: 500;
			text-align: center;
		}
	}
	/*选择币种*/

	.tab_currency_trade {
		width: 100%;
		height: .35rem;
		display: flex;
		align-items: center;
		box-sizing: border-box;
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
					border: 1px solid #fff;
					display: none;
				}
			}
		}
	}
	/*交易对*/

	.jiaoyidui {
		width: 100%;
		height: .3rem;
		display: flex;
		align-items: center;
		justify-content: space-between;
		box-sizing: border-box;
		padding: 0 .1rem;
		li {
			color: #7a87ff;
		}
		li {
			flex: 1;
			text-align: left;
		}
		li:nth-of-type(2) {
			flex: 1;
		}
		li:nth-last-of-type(1) {
			flex: .6;
			text-align: right;
		}
	}
	/*币种内容*/

	.ContentList,
	.zi_xuan {
		ul {
			@extend .jiaoyidui;
			height: .33rem;
			border-bottom: 1px solid #2b2d5a;
			li {
				color: #fff;
			}
		}
	}
	/*自选内容*/

	.noData {
		width: 100%;
		height: .3rem;
		text-align: center;
		line-height: .3rem;
		color: #fff;
	}
	/*历史委托筛选*/

	.weituo_title {
		width: 100%;
		height: .5rem;
		display: flex;
		justify-content: space-between;
		align-items: center;
		box-sizing: border-box;
		padding: 0 .1rem;
		color: #fff;
		p:nth-of-type(1) {
			display: flex;
			align-items: center;
			.iconfont {
				font-size: .18rem;
				margin-right: .1rem;
			}
			span {
				font-size: .14rem;
			}
		}
		.iconfont {
			font-size: .18rem;
		}
		border-bottom:1px solid #202454;
	}
	/*时间列表*/

	.TimeList {
		width: 100%;
		ul {
			width: 100%;
			height: .5rem;
			display: flex;
			align-items: center;
			justify-content: space-between;
			box-sizing: border-box;
			padding: 0 .1rem;
			color: #989fff;
		}
	}
	/*选择开始时间和结束时间*/

	.startTimeAndEedTime {
		width: 100%;
		height: .6rem;
		display: flex;
		align-items: center;
		justify-content: space-between;
		dl {
			width: 80%;
			display: flex;
			align-items: center;
			justify-content: center;
			.startTime,
			.endTime {
				width: 40%;
				height: .3rem;
				border: 1px solid #989fff;
				background: #262746;
				text-align: center;
				line-height: .3rem;
				color: #989fff;
				border-radius: .05rem;
			}
			span {
				color: #989fff;
				margin: 0 .1rem;
			}
		}
		button {
			width: .5rem;
			height: .3rem;
			border: none;
			background: #fff;
			border-radius: .05rem;
			margin-right: .1rem;
		}
	}
</style>
