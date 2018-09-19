<template>
	<!--法币交易主体-->
	<div class="container" id="fbjy" :class="{'qhbj-container':getColor==1}">
		<div v-show="tabBuySell">
			<loading></loading>
		</div>
		<!--左侧币种-->
		<div class="fb_bz" :class="{'qhbj-fbbz':getColor==1}">
			<ul>
				<li v-for="(item,index) in bz" @click="bzTab($event,index,item.id,item.pageIdentifier)" class="bzBtn" :class="{'bztabjy':bzDis,'qhbj-bztabjy':bzDis2}">{{item.pageIdentifier}}</li>
			</ul>
		</div>
		<!--右侧买入卖出挂单买卖-->
		<div class="mmdd">
			<!--买入、卖出、挂单买卖tab切换部分-->
			<ul class="mmddtab" :class="{'qhbj-mmddtab':getColor==1}">
				<li class="mmddBtn" @click="mmbs(0);mr(1)">{{$t("otc.Buy")}}</li>
				<li class="mmddBtn" @click="mmbs(1);mr(0)">{{$t("otc.Sell")}}</li>
				<li class="mmddBtn" v-show="userList.otc_maker != 0" @click="mmbs(2);gdmm()">{{$t("otc.Merchant")}}</li>
			</ul>
			<!--买入卖出列表部分-->
			<div v-show="isMm">
				<div class="mmtit" :class="{'qhbj-mmtit':getColor==1}">
					<div>
						<ul>
							<li>{{$t("otc.Quantity")}}({{mmbz}})</li>
							<li v-for="item in listTitle">{{item}}</li>
						</ul>
					</div>
				</div>
				<div class="mmlist" id="mmlist" :class="{'qhbj-mmlist':getColor==1}">
					<div class="mrList" :class="{'qhbj-mrList':getColor==1}">
						<ul v-for="(item,index) in mmfyList" class="mrList-cont" :class="{'qhbj-mrcont':getColor==1}">
							<li>{{item.balance | number(item.cuccency.displayNum)}}</li>
							<li>{{item.price}}({{item.legal.code}})</li>
							<li>{{item.minTradeLimit}}({{item.legal.code}})</li>
							<li>{{item.maxTradeLimit}}({{item.legal.code}})</li>
							<li>{{item.user.name}}
								<span class="Completion_rate" v-show="item.user.traded_num!=0">
									( {{item.user.traded_num+item.user.fail_num}} | {{ parseInt(item.user.traded_num / (item.user.traded_num+item.user.fail_num)*100)}}%  )
								</span>
								<span class="Completion_rate" v-show="item.user.traded_num==0">(    {{item.user.traded_num+item.user.fail_num}} | 0%  )</span>
							</li>
							<li>
								<i class="iconfont icon-iconfontjikediancanicon20" v-show='item.user.bank_status'></i>
								<i class="iconfont icon-zhifubao" v-show="item.user.alipy_status"></i>
								<i class="iconfont icon-weixin" v-show='item.user.wxpay_status'></i>
							</li>
							<li>
								<span @click="ggxq(item.id,item.type,item.maxTradeLimit,item.user_id,item.legal.code);" class="mr" v-show="item.type==1" :class="{'mmanjy':yhId==item.user_id}">{{$t("otc.Buy")}}</span>
								<span @click="ggxq(item.id,item.type,item.maxTradeLimit,item.user_id,item.legal.code,item.cuccency.displayNum);" class="mr" v-show="item.type==0" :class="{'mmanjy':yhId==item.user_id}">{{$t("otc.Sell")}}</span>
							</li>
						</ul>
					</div>
				</div>
				<!--订单切换++++买卖列表分页-->
				<!--订单切换-->
				<div class="btm clearfix" :class="{'qhbj-btm':getColor==1}">
					<div class="ddTab" :class="{'qhbj-ddTab':getColor==1}">
						<div class="ddsty" @click="ddlx(0,$event)">
							<p>{{$t("otc.IncompleteOrders")}}</p>
						</div>
						<div class="ddsty mar-l" @click="ddlx(3,$event)">
							<p>{{$t("otc.CompletedOrders")}}</p>
						</div>
						<div class="ddsty mar-l" @click="ddlx(-1,$event)">
							<p>{{$t("otc.CancelOrder")}}</p>
						</div>
					</div>
					<!--买卖列表分页-->
					<div class="fenye" v-show="mmddList.length!=0" :class="{'qhbj-fenye':getColor==1}">
						<el-pagination background layout="prev, pager, next" :page-size="pagesize" :total="mmddList.length" @current-change="mmddfy">
						</el-pagination>
					</div>
				</div>
				<!--订单详情部分-->
				<table class="ddxq" :class="{'qhbj-ddxq':getColor==1}">
					<tr class="ddxq-tit" :class="{'qhbj-ddxqtit':getColor==1}">
						<td v-for="item in ddxqTitle">{{item}}</td>
					</tr>
					<tr class="ddxqts" v-if="wdddList.length==0">
						<td colspan="10">
							<p>{{$t("otc.NoOrder")}}</p>
							<p>{{$t("otc.Notice")}}</p>
						</td>
					</tr>
					<tr class="ddxq-cont" v-for="(item,index) in wdddList">
						<td class="ddh" @click="wdddly(item.id)">
							<a>{{item.orderId}}</a>
						</td>
						<td>{{formatTime(item.created_at)}}</td>
						<td>{{item.currency.pageIdentifier}}</td>
						<td>
							<span v-if="item.type==1">{{$t("otc.Buy")}}</span>
							<span v-if="item.type==0">{{$t("otc.Sell")}}</span>
						</td>
						<td>{{item.price}}</td>
						<td>{{item.balance | number(item.currency.displayNum)}}</td>
						<td>{{item.success_price | number(2)}}</td>
						<td>{{item.taker_fee | number(item.currency.displayNum)}}</td>
						<td>
							<span v-if="item.status==-2">{{$t("otc.Complaint")}}</span>
							<span v-if="item.status==-1">{{$t("otc.Ordercancelled")}}</span>
							<span v-if="item.status==0">{{$t("otc.WaitingPayment")}}</span>
							<span v-if="item.status==1">{{$t("otc.Waitingforrelease")}}</span>
							<span v-if="item.status==2">{{$t("otc.Orderislocked")}}</span>
							<span v-if="item.status==3">{{$t("login.Submit")}}</span>
						</td>
						<td>{{item.reference_num}}</td>
					</tr>
				</table>
				<!--订单分页-->
				<div class="ddfy-wrap" v-show="wdddList.length!=0" :class="{'qhbj-fenye':getColor==1}">
					<div class="ddfy-inner">
						<el-pagination background layout="prev, pager, next" :page-size="ddmysl" @current-change="wdddfy" :total="ddts">
						</el-pagination>
					</div>
				</div>
			</div>

			<!--挂单买卖部分-->
			<div v-show="isGdmm">
				<ul class="gdmm" :class="{'qhbj-gdmm':getColor==1}">
					<!--我在一栏-->
					<li class="wz clearfix" :class="{'qhbj-wz':getColor==1}">
						<div class="wztit gdli-tit">{{$t("fbjy.IamIn")}}</div>
						<div class="gj">
							<el-select class="gdsel" v-model="selectItem" :disabled="isDisabled" @change="selectLang(selectItem)" :class="{'qhbj-gdsel':getColor==1}">
								<el-option :label="item.name" v-for="(item,index) in kjyfbs" :key="index" :value="item.id"></el-option>
							</el-select>
						</div>
						<div class="yi">{{$t("fbjy.use")}}</div>
						<div class="rmb" :class="{'qhbj-rmb':getColor==1}">
							<el-select class="gdsel" v-model="rmbid" @change="rmbcha(rmbid)" :disabled="isDisabled">
								<el-option v-for="(item,index) in selectlegaltender" :label="item.title" :value="item.id" :key="item.id"></el-option>
							</el-select>
						</div>
						<div class="cs" :class="{'qhbj-cs':getColor==1}">
							<el-select class="gdsel" v-model="mmzt" @change="cscha(mmzt)" :disabled="isDisabled" :class="{'qhbj-gdsel':getColor==1}">
								<el-option v-for="(item,index) in gdmmlx" :label="item.title" :value="item.id" :key="item.id"></el-option>
							</el-select>
						</div>
						<div class="btc" :class="{'qhbj-btc':getColor==1}">
							<el-select class="gdsel" @change="bzcha(gdbzId)" v-model="gdbzId" :disabled="isDisabled" :class="{'qhbj-gdsel':getColor==1}">
								<el-option v-for="(item,index) in bz" :label="item.pageIdentifier" :value="item.id" :key="item.id"></el-option>
							</el-select>
						</div>
					</li>
					<!--价格一栏-->
					<li class="jiage clearfix" :class="{'qhbj-jiage':getColor==1}">
						<div class="jgtit gdli-tit">{{$t("otc.Price")}}</div>
						<div class="jgsz">
							<p :class="{'qhbj-gdfbt':getColor==1}">{{$t("fbjy.PriceSetting")}}</p>
							<div class="szsel">
								<el-select class="gdsel" v-model="sfgdjg" @change="jgcha" :class="{'qhbj-gdsel':getColor==1}">
									<el-option v-for="(item,index) in gdsfgd" :label="item.title" :value="item.id" :key="item.id"></el-option>
								</el-select>
							</div>
						</div>
						<div class="gd" v-show="isGd">
							<p class="bdtit" :class="{'qhbj-gdfbt':getColor==1}">{{$t("otc.Fixedprice")}}</p>
							<div class="gd-inp clearfix" :class="{'qhbj-gdinp':getColor==1}">
								<input class="gdinp" @keyup="gdjgInp($event)" v-model.number="gdjg" maxlength="14" />
								<span>{{rmbcode}}</span>
							</div>
							<p class="xzinfo">{{gdInfo}}</p>
						</div>
						<div class="gd" v-show="!isGd">
							<p class="bdtit" :class="{'qhbj-gdfbt':getColor==1}">{{$t("otc.Floatingratio")}}</p>
							<div class="gd-inp clearfix" :class="{'qhbj-gdinp':getColor==1}">
								<input class="gdinp" @keyup="fdblInp($event)" v-model.number="fdbl" />
								<span>%</span>
							</div>
							<p class="xzinfo">{{gdInfo}}</p>
						</div>
						<div class="jyjg" v-show="isGd">
							<p>{{$t("otc.TradingPrice")}}</p>
							<p><span>{{gdjg | number(2)}}</span>{{rmbcode}}</p>
						</div>
						<div class="jyjg" v-show="!isGd">
							<p>{{$t("otc.TradingPrice")}}</p>
							<p v-show="!isCs"><span>{{scj+scj*Number(fdbl)/100 | number(2)}}</span>{{rmbcode}}</p>
							<p v-show="isCs"><span>{{scj-scj*Number(fdbl)/100 | number(2)}}</span>{{rmbcode}}</p>
						</div>
						<div class="scck" :class="{'qhbj-scck':getColor==1}">
							<p>{{$t("otc.Marketprice")}}<span>{{scj}}</span></p>
							<p>{{$t("otc.Whenfixed")}}</p>
						</div>
					</li>
					<!--交易限制一栏-->
					<li class="jyxz clearfix">
						<div class="jyxz-inp" :class="{'qhbj-jyxzinp':getColor==1}">
							<div class="jyxztit gdli-tit">{{$t("otc.Limit")}}</div>
							<div class="jysl">
								<p class="bdtit" :class="{'qhbj-gdfbt':getColor==1}">{{$t("otc.Amount1")}}</p>
								<div class="gd-inp clearfix" :class="{'qhbj-gdinp':getColor==1,'inpjy':isDisabled}">
									<input class="gdinp" :placeholder="slPlace" @keyup="gdslInp($event)" v-model.number="jysl" :disabled="isDisabled" :class="{'inpjy':isDisabled}" maxlength="14" />
									<span>{{gdbz}}</span>
								</div>
								<p class="xzinfo">{{slInfo}}</p>
							</div>
							<div class="zxxe">
								<p class="bdtit" :class="{'qhbj-gdfbt':getColor==1}">{{$t("otc.Minlimit")}}</p>
								<div class="gd-inp clearfix" :class="{'qhbj-gdinp':getColor==1}">
									<input class="gdinp" @keyup="zxInp($event)" @blur="zxbl" v-model.number="minxe" maxlength="14" />
									<span>{{rmbcode}}</span>
								</div>
								<p class="xzinfo">{{zxInfo}}</p>
							</div>
							<div class="zdxe">
								<p class="bdtit" :class="{'qhbj-gdfbt':getColor==1}">{{$t("otc.Maxlimit")}}</p>
								<div class="gd-inp clearfix" :class="{'qhbj-gdinp':getColor==1}">
									<input class="gdinp" @keyup="zdInp($event)" @blur="zdbl" v-model.number="maxxe" maxlength="14" />
									<span>{{rmbcode}}</span>
								</div>
								<p class="xzinfo">{{zdInfo}}</p>
							</div>
							<div class="fkqx">
								<p class="bdtit" :class="{'qhbj-gdfbt':getColor==1}">{{$t("otc.PaymentTime")}}</p>
								<div class="gd-inp clearfix" :class="{'qhbj-gdinp':getColor==1}">
									<input class="gdinp" @keyup="qxInp($event)" v-model.number="fkqx" maxlength="14" />
									<span>{{$t("otc.Minute")}}</span>
								</div>
								<p class="xzinfo">{{qxInfo}}</p>
							</div>
						</div>
						<div class="jyxzts" :class="{'qhbj-jyxzts':getColor==1}">
							<p>{{$t("fbjy.LimitBuyer")}}</p>
							<p>{{$t("fbjy.ThePaymentPeriod")}}</p>
						</div>
					</li>
					<!--支付方式一栏-->
					<li class="zffs clearfix" :class="{'qhbj-zffs':getColor==1}">
						<div class="zffstit gdli-tit">{{$t("otc.PaymentMethod")}}</div>
						<div class="zffscont" :class="{'qhbj-zffscont':getColor==1}">
							<p class="zf" v-for="(item,index) in gdZffs.list">
								<i class="iconfont icon-iconfontjikediancanicon20" v-show="item.bankType==0"></i>
								<i class="iconfont icon-weixin" v-show="item.bankType==1"></i>
								<i class="iconfont icon-zhifubao" v-show="item.bankType==2"></i>
								<span>{{gdZffs.userInfo}}</span>
								<span>{{item.bankName}}</span>
								<span>{{item.bankNumber}}</span>
							</p>
							<p v-show="isZfts">{{$t("fbjy.ActivateLeastOne")}}</p>

							<p class="ys">{{$t("fbjy.PaymentInfo")}}
								<router-link to="/index/userCenter/zhanghu" tag="span" class="dj">{{$t("fbjy.ClickOn")}}</router-link>{{$t("fbjy.Here")}}</p>
							<el-button type="button" @click="sx">{{$t("fbjy.Refresh")}}</el-button>
						</div>
					</li>
					<!--自动回复一栏-->
					<li class="zdhf clearfix" :class="{'qhbj-zdhf':getColor==1}">
						<div class="zdhftit gdli-tit">{{$t("fbjy.AutoResponse")}}</div>
						<div class="zdhftex" :class="{'qhbj-zdhftex':getColor==1}">
							<textarea v-model="lynr" maxlength="200"></textarea>
							<p>{{$t("fbjy.AfterOrderCreated")}}</p>
						</div>
					</li>
					<!--交易限制对方一栏-->
					<li class="jyxzdf clearfix" :class="{'qhbj-jyxzdf':getColor==1}">
						<div class="jyxzdftit gdli-tit">{{$t("fbjy.TransactionLimit")}}</div>
						<div class="jyxzdfcont">
							<p class="jybs" :class="{'qhbj-gdfbt':getColor==1}">{{$t("fbjy.NeedsCompleteMinimum")}}</p>
							<div class="csxz clearfix">
								<div class="num clearfix" :class="{'qhbj-num':getColor==1}">
									<input type="text" class="csinp" v-model="jycs" @keyup="csxzinp($event)" :class="{'qhbj-csinp':getColor==1}" maxlength="14" />
									<div class="csjj" :class="{'qhbj-csjj':getColor==1}">
										<p class="iconfont icon-top" @click="add(jycs)"></p>
										<p class="iconfont icon-xiala" @click="minus(jycs)"></p>
									</div>
								</div>
								<p class="csinfo">{{csInfo}}</p>
							</div>
							<div class="gjrz" :class="{'qhbj-gjrz':getColor==1}">
								<label>
								<input type="checkbox" v-model="gjcheck"/>
								<span>{{$t("fbjy.NeedsPassCertification")}}</span>
							</label>
							</div>
							<div class="bdsjh" :class="{'qhbj-bdsjh':getColor==1}">
								<label>
							<input type="checkbox" v-model="sjcheck">
							<span>{{$t("fbjy.NeedBindPhone")}}</span>
							</label>
							</div>
							<p class="jyxzdfts" :class="{'qhbj-jyxzdfts':getColor==1}">{{$t("fbjy.SettingLimits")}}</p>
						</div>
					</li>
					<!--资金密码一栏-->
					<li class="zjmm clearfix" :class="{'qhbj-zjmm':getColor==1}">
						<div class="zjmmtit gdli-tit">{{$t("otc.FundPassword")}}</div>
						<div class="zjmmcont" :class="{'qhbj-zjmmcont':getColor==1}">
							<p :class="{'qhbj-gdfbt':getColor==1}">{{$t("otc.Pleasepassword")}}</p>
							<input type="password" v-model="gdzjmm" @keyup="gdmmInp(gdzjmm)" @blur="gdmmbl(gdzjmm)" @focus="gdmmfo(gdzjmm)" maxlength="20" />
							<span class="gdmminfo">{{gdmmInfo}}</span>
						</div>
					</li>
					<!--发布交易一栏-->
					<li class="fb" :class="{'qhbj-fb':getColor==1}">
						<!--<div class="hk" :class="{'qhbj-hk':getColor==1}">

						</div>-->
						<div class="ty" :class="{'qhbj-ty':getColor==1}">
							<label><input type="checkbox" v-model="tycheck"><span>{{$t("fbjy.HaveKnown")}}</span></label>
							<router-link to="/TradingRules" target="_blank">《 {{$t("fbjy.SettingLimits")}} 》</router-link>
						</div>
						<div class="fbbtn" :class="{'qhbj-fbbtn':getColor==1}">
							<button type="button" v-if="isBj" @click="fbjy">{{$t("fbjy.PublishTransaction")}}</button>
							<button type="button" v-if="!isBj" @click="bjjy(gdbjId)">{{$t("fbjy.EditTransactionZone")}}</button>
							<span v-show="isfbInfo">{{fbInfo}}</span>
						</div>
					</li>

				</ul>
				<!--挂单列表-->
				<div class="gdlb" :class="{'gdlb_white':getColor==1}">
					<!--头部切换部分-->
					<div class="gdlb-tit" :class="{'qhbj-gdlbtit':getColor==1}">
						<p class="gdlbtab" @click="jxddTab(0,$event)">{{$t("otc.OrderList")}}</p>
						<!--<p class="gdlbtab" @click="jxddTab(1,$event)">进行中订单</p>-->
					</div>

					<!--挂单列表订单-->
					<div v-show="isgdlb">
						<div class="gdlbxq" :class="{'qhbj-gdlbxq':getColor==1}">
							<ul class="gdlbxq-tit" :class="{'qhbj-gdlbxqtit':getColor==1}">
								<li v-for="(item,index) in gdmmTitle">{{item}}</li>
							</ul>
							<ul class="gdts" v-if="gdList.length==0">
								<li colspan="8">
									<p>{{$t("otc.NoOrder")}}</p>
									<p>{{$t("otc.Notice")}}</p>
								</li>
							</ul>
							<ul class="gdlbxq-cont" v-for="(item,index) in gdList" :class="{'qhbj-gdlbxqcont':getColor==1}">
								<li>{{item.orderID}}</li>
								<li>{{formatTime(item.created_at)}}</li>
								<li>{{item.cuccency.pageIdentifier}}</li>
								<li>
									<span v-if="item.type==0">{{$t("otc.Buy")}}</span>
									<span v-if="item.type==1">{{$t("otc.Sell")}}</span>
								</li>
								<li>{{item.price}}</li>
								<li>{{item.balance | number(item.cuccency.displayNum)}}</li>
								<li>{{item.minTradeLimit | number(2)}}-{{item.maxTradeLimit | number(2)}}</li>
								<li class="cz">
									<span v-if="item.status==0" @click="bj(item.id)">{{$t("otc.edit")}}</span>
									<span v-if="item.status==0" @click="xj(item.id,index)">{{$t("otc.Dropoff")}}</span>
									<span v-if="item.status==-1||item.status==1" @click="del(item.id,index)">{{$t("otc.delete")}}</span>
								</li>
							</ul>
						</div>
						<!--挂单列表分页-->
						<div class="gdfy-wrap" :class="{'qhbj-fenye':getColor==1}" v-show="gdList.length!=0">
							<div class="gdfy-inner">
								<el-pagination background layout="prev, pager, next" :page-size="gdmysl" :total="gdts" @current-change="gdfy">
								</el-pagination>
							</div>
						</div>
					</div>
					<!--进行中订单-->
					<div v-show="!isgdlb">
						<div class="gdlbxq" :class="{'qhbj-gdlbxq':getColor==1}" v-show="!isgdlb">
							<tr class="jxddxq-tit" :class="{'qhbj-gdlbxqtit':getColor==1}">
								<td v-for="(item,index) in jxddTitle">{{item}}</td>
							</tr>
							<tr class="gdts" v-if="jxddList.length==0">
								<td colspan="8">
									<p>{{$t("otc.NoOrder")}}</p>
									<p>{{$t("otc.Notice")}}</p>
								</td>
							</tr>
							<ul class="gdlbxq-cont" v-for="(item,index) in jxddList" :class="{'qhbj-gdlbxqcont':getColor==1}">
								<li @click="jxddly(item.id)">
									<a>{{item.orderId}}</a>
								</li>
								<li>{{item.created_at}}</li>
								<li>{{item.currency.pageIdentifier}}</li>
								<li>
									<span v-if="item.type==0">{{$t("otc.Buy")}}</span>
									<span v-if="item.type==1">{{$t("otc.Sell")}}</span>
								</li>
								<li>{{item.price}}</li>
								<li>{{item.balance | number(item.currency.displayNum)}}</li>
								<li class="jxzt">
									<span v-if="item.status==-2">{{$t("otc.Complaint")}}</span>
									<span v-if="item.status==-1">{{$t("otc.Ordercancelled")}}</span>
									<span v-if="item.status==0">{{$t("otc.WaitingPayment")}}</span>
									<span v-if="item.status==1">{{$t("otc.Waitingforrelease")}}</span>
									<span v-if="item.status==2">{{$t("otc.Orderislocked")}}</span>
									<span v-if="item.status==3">{{$t("login.Submit")}}</span>
								</li>
							</ul>
						</div>
						<!--进行中订单分页-->
						<div class="gdfy-wrap" :class="{'qhbj-fenye':getColor==1}" v-show="jxddList.length!=0">
							<div class="gdfy-inner">
								<el-pagination background layout="prev, pager, next" :page-size="jxmysl" :total="jxts" @current-change="gdfy">
								</el-pagination>
							</div>
						</div>
					</div>

				</div>

			</div>
		</div>

		<!--买入弹框部分isMr-->
		<div class="jytk" v-show="isMr">
			<!--透明蒙布-->
			<div class="jytk-mengbu"></div>
			<div class="jytk-content" :class="{'qhbj-jytkcon':getColor==1}">
				<div class="jytk-tit" :class="{'qhbj-jytktit':getColor==1}">
					<p><span v-if="ggxqmm.type==1">{{$t("otc.Buy")}}</span>
						<span v-if="ggxqmm.type==0">{{$t("otc.Sell")}}</span>
						<span>{{ggxqbz}}</span>
					</p>
					<i class="iconfont icon-cuowu" @click="isMr=!isMr;xdgmSl='';xdgmJe='';mrslInfo='';mrjeInfo='';"></i>
					<span class="time" :class="{'time_White':getColor==1}">{{$t("otc.PleaseConfirm")}}   <span class="second">40s</span>{{$t("otc.okmake")}}</span>
				</div>
				<div class="jytk-jyjg" :class="{'qhbj-jytkjyjg':getColor==1}">
					<p>{{$t("otc.TradingPrice")}}({{ltbz}}/{{ggxqbz}})</p>
					<p class="tkjg">{{ggxqmm.price}}</p>
				</div>
				<div class="dbxe" :class="{'qhbj-dbxe':getColor==1}">
					<p>{{$t("otc.AmountLimit")}}<span>{{ggxqmm.minTradeLimit}}~{{ggxqmm.maxTradeLimit}} {{ltbz}}</span></p>
				</div>
				<div class="jytk-sl clearfix" :class="{'qhbj-jytksl':getColor==1}">
					<div class="sl">{{$t("otc.Quantity")}}{{ggxqbz}}</div>
					<div class="text">
						<input type="text" :placeholder="$t('otc.PleaseEnterQuantity')" @keyup="mrslInp($event,ggxqmm.maxTradeLimit,ggxqmm.price,ggxqmm.balance,ggxqmm.cuccency.displayNum)" v-model.number="xdgmSl" maxlength="14" /><span @click="mrqb(ggxqmm.maxTradeLimit,ggxqmm.price,ggxqmm.balance,ggxqmm.cuccency.displayNum)">{{$t("otc.All")}}</span>
					</div>
				</div>
				<div class="sl-info">
					<p>{{mrslInfo}}</p>
				</div>
				<div class="jytk-je clearfix" :class="{'qhbj-jytkje':getColor==1}">
					<div class="je">{{$t("otc.Amount")}}{{ltbz}}</div>
					<div class="text">
						<input type="text" :placeholder="$t('otc.PleaseEnterAmount')" @keyup="mrjeInp($event,ggxqmm.maxTradeLimit,ggxqmm.minTradeLimit,ggxqmm.price,ggxqmm.cuccency.displayNum)" v-model.number="xdgmJe" maxlength="14" /><span @click="mrqb(ggxqmm.maxTradeLimit,ggxqmm.price,ggxqmm.balance,ggxqmm.cuccency.displayNum)">{{$t("otc.All")}}</span>
					</div>
				</div>
				<div class="je-info">
					<p v-show="ismrjeInfo">{{mrjeInfo}}</p>
					<p v-show="!ismrjeInfo">{{qdmrInfo}}</p>
				</div>
				<div class="anniu" :class="{'qhbj-anniu':getColor==1}">
					<div @click="isMr=!isMr;xdgmSl='';xdgmJe='';mrslInfo='';mrjeInfo='';buyCountDown=1;">
						({{buyCountDown}}) s {{$t("otc.CancelAutomatically")}}
					</div>
					<div @click="xdgm(ggId,xdgmSl,xdgmJe,ggxqmm.minTradeLimit,ggxqmm.maxTradeLimit)">{{$t("otc.Confirm")}}</div>
				</div>
			</div>
		</div <!--卖出弹框部分isMc-->
		<div class="jytk" v-if="isMc">
			<!--透明蒙布-->
			<div class="jytk-mengbu"></div>
			<div class="mctk-content" :class="{'qhbj-mctkcon':getColor==1}">
				<div class="jytk-tit" :class="{'qhbj-jytktit':getColor==1}">
					<p>
						<span v-if="ggxqmm.type==1">{{$t("otc.Buy")}}</span>
						<span v-if="ggxqmm.type==0">{{$t("otc.Sell")}}</span>
						<span>{{ggxqbz}}</span>
					</p>
					<i class="iconfont icon-cuowu" @click="isMc=!isMc;xdmcSl='';xdmcJe='';mczjmm='';mcslInfo='';mcjeInfo='';mcmmInfo='';"></i>
					<span class="time" :class="{'time_White':getColor==1}">{{$t("otc.PleaseConfirm")}}  <span class="second">40s</span>{{$t("otc.okmake")}}</span>
				</div>
				<div class="jytk-jyjg" :class="{'qhbj-jytkjyjg':getColor==1}">
					<p>{{$t("otc.TradingPrice")}}({{ltbz}}/{{ggxqbz}})</p>
					<p>{{ggxqmm.price}}</p>
				</div>
				<div class="dbxe" :class="{'qhbj-dbxe':getColor==1}">
					<p>{{$t("otc.AmountLimit")}}<span>{{ggxqmm.minTradeLimit}}~{{ggxqmm.maxTradeLimit}} {{ltbz}}</span></p>
				</div>
				<div class="zhye" :class="{'qhbj-zhye':getColor==1}">
					<p>{{$t("otc.AccountBalance")}}:{{mcbzye | number(yeSlws)}}{{ggxqbz}}</p>
				</div>
				<div class="jytk-sl clearfix" :class="{'qhbj-jytksl':getColor==1}">
					<div class="sl">{{$t("otc.Quantity")}}{{ggxqbz}}</div>
					<div class="text">
						<input type="text" :placeholder="$t('otc.PleaseEnterQuantity')" @keyup="mcslInp($event,ggxqmm.maxTradeLimit,ggxqmm.price,ggxqmm.balance,ggxqmm.cuccency.displayNum)" v-model.number="xdmcSl" /><span @click="mcqb(ggxqmm.maxTradeLimit,ggxqmm.price,ggxqmm.balance,ggxqmm.cuccency.displayNum)">{{$t("otc.All")}}</span>
					</div>
				</div>
				<div class="sl-info">
					<p>{{mcslInfo}}</p>
				</div>
				<div class="jytk-je clearfix" :class="{'qhbj-jytkje':getColor==1}">
					<div class="je">{{$t("otc.Amount")}} {{ltbz}}</div>
					<div class="text">
						<input type="text" :placeholder="$t('otc.PleaseEnterAmount')" @keyup="mcjeInp($event,ggxqmm.maxTradeLimit,ggxqmm.minTradeLimit,ggxqmm.price,ggxqmm.cuccency.displayNum)" v-model.number="xdmcJe" /><span @click="mcqb(ggxqmm.maxTradeLimit,ggxqmm.price,ggxqmm.balance,ggxqmm.cuccency.displayNum)">{{$t("otc.All")}}</span>
					</div>
				</div>
				<div class="je-info">
					<p>{{mcjeInfo}}</p>
				</div>
				<div class="jytk-zjmm clearfix" :class="{'qhbj-jytkzjmm':getColor==1}">
					<div class="zjmm">{{$t("otc.FundPassword")}}</div>
					<div class="zjtex">
						<input type="password" :placeholder="$t('otc.ForFinancial')" v-model="mczjmm" maxlength="20" @keyup="mcmmInp(mczjmm)" />
					</div>
				</div>
				<div class="zjmm-info">
					<p v-show="ismcmmInfo">{{mcmmInfo}}</p>
					<p v-show="!ismcmmInfo">{{qdmcInfo}}</p>
				</div>
				<div class="anniu" :class="{'qhbj-anniu':getColor==1}">
					<div @click="isMc=!isMc;xdmcSl='';xdmcJe='';mczjmm='';mcslInfo='';mcjeInfo='';mcmmInfo='';sellCountDown=1;">({{sellCountDown}})s {{$t("otc.CancelAutomatically")}}</div>
					<div @click="xdmc(xdmcSl,ggId,xdmcJe,mczjmm,ggxqmm.minTradeLimit,ggxqmm.maxTradeLimit)">{{$t("otc.Confirm")}}</div>
				</div>
			</div>
		</div>
		<!--订单提醒弹框-->
		<div class="txtk" v-show="istxTk">
			<div class="txtk-mengbu"></div>
			<div class="txtk-content" :class="{'qhbj-txtkcon':getColor==1}">
				<div class="txtk-tit" :class="{'qhbj-txtktit':getColor==1}">
					<p>{{$t("fbjy.OrderNote")}}</p><i class="iconfont icon-cuowu" @click="istxTk=!istxTk"></i>
				</div>
				<div class="ddtx" :class="{'qhbj-txtkddtx':getColor==1}">
					<p>{{$t("fbjy.AnUnfinishedOrder")}},
						<router-link :to="{name:'ddxq',params:{id:orderId}}">{{$t("fbjy.GoCheck")}}</router-link>
					</p>
				</div>
				<div class="txqr" @click="istxTk=!istxTk" :class="{'qhbj-txtktxqr':getColor==1}">
					<router-link :to="{name:'ddxq',params:{id:orderId}}">{{$t("fbjy.OrderNote")}}{{$t("userCenter.determine")}}</router-link>
				</div>
			</div>
		</div>

		<!--蒙版部分1-->
		<div class="force" v-show="isShowUser" :class="{'qhbj-force':getColor==1}">
			<div class="force-content" :class="{'qhbj-forcecon':getColor==1}">
				<div class="force-text" :class="{'qhbj-forcetext':getColor==1}">
					<!--实名认证头部-->
					<div class="force-title" :class="{'qhbj-forcetit':getColor==1}">
						<span>{{$t("fbjy.ImportantNote")}}</span>
						<i class="iconfont icon-cuowu" @click="isShowUser=false"></i>
					</div>
					<!--告诉-->
					<div class="force_content" :class="{'qhbj_forcecon':getColor==1}">
						{{$t("fbjy.ForFundsSecurity")}}<br />{{$t("fbjy.ClickConfirm")}}
						<span class="renz" @click="clickTo" :class="{'qhbj-renz':getColor==1}">{{$t("userCenter.Gotosettings")}}</span>
					</div>
					<!--确认按钮和取消按钮-->
					<div class="confirm-cancel" :class="{'qhbj-confirmcancel':getColor==1}">
						<p @click="isShowUser=false">{{$t("capital.Cancel")}}</p>
						<p @click="clickTo">{{$t("userCenter.determine")}}</p>
					</div>
				</div>
			</div>
		</div>
		<!--蒙版部分2-->
		<div class="force" v-show="isShowUser2" :class="{'qhbj-force':getColor==1}">
			<div class="force-content" :class="{'qhbj-forcecon':getColor==1}">
				<div class="force-text" :class="{'qhbj-forcetext':getColor==1}">
					<!--实名认证头部-->
					<div class="force-title" :class="{'qhbj-forcetit':getColor==1}">
						<span>{{$t("fbjy.ImportantNote")}}</span>
						<i class="iconfont icon-cuowu" @click="isShowUser2=false"></i>
					</div>
					<!--告诉-->
					<div class="force_content" :class="{'qhbj_forcecon':getColor==1}">
						{{$t("fbjy.BindRealName")}}<br /> {{$t("fbjy.ClickConfirm")}}
						<span class="renz" @click="clickGo" :class="{'qhbj-renz':getColor==1}">{{$t("fbjy.SetUpNow")}}</span>
					</div>
					<!--确认按钮和取消按钮-->
					<div class="confirm-cancel" :class="{'qhbj-confirmcancel':getColor==1}">
						<p @click="isShowUser2=false">{{$t("userCenter.Cancel")}}</p>
						<p @click="clickGo">{{$t("userCenter.determine")}}</p>
					</div>
				</div>
			</div>
		</div>
		<!--蒙版部分3-->
		<div class="force" v-show="isBinding" :class="{'qhbj-force':getColor==1}">
			<div class="force-content" :class="{'qhbj-forcecon':getColor==1}">
				<div class="force-text" :class="{'qhbj-forcetext':getColor==1}">
					<!--暂无绑定支付方式-->
					<div class="force-title" :class="{'qhbj-forcetit':getColor==1}">
						<span> {{$t("fbjy.TransactionTips")}}  </span>
						<i class="iconfont icon-cuowu" @click="isBinding=false"></i>
					</div>
					<!--告诉-->
					<div class="force_content" :class="{'qhbj_forcecon':getColor==1}">
						{{$t("fbjy.BindPaymentMethod")}}<br /> {{$t("fbjy.ClickConfirm")}}
						<span class="renz" @click="clickGo2" :class="{'qhbj-renz':getColor==1}">{{$t("userCenter.Gotosettings")}}</span>
					</div>
					<!--确认按钮和取消按钮-->
					<div class="confirm-cancel" :class="{'qhbj-confirmcancel':getColor==1}">
						<p @click="isBinding=false">{{$t("userCenter.Cancel")}}</p>
						<p @click="clickGo2">{{$t("userCenter.determine")}}</p>
					</div>
				</div>
			</div>
		</div>

	</div>
	</div>
</template>

<script>
	////获取请求路径
	import { httpUrl } from "../http_url/http_url";
	import { Message } from 'element-ui'; ///消息提示
	import Vue from 'vue'
	//  引入axios用于请求数据
	import Axios from 'axios'
	//引入jquery
	import $ from 'jquery'
	//引入loding效果
	import loading from "../public/loading"
	import {mapState} from 'vuex';
	export default {
		data() {
			return {
				isBinding: false,
				/*判断是否绑定支付方式*/
				sellCountDown: 40, ///卖出弹框倒计时
				sellTime: "", ///卖出倒计时函数
				buyCountDown: 40, ///买入弹框倒计时
				buyTime: "", ///买入倒计时函数
				mmbz: "", //买卖币种
				bzDis: false, //挂单买卖时禁用币种切换(专业版)
				bzDis2: false, //挂单买卖时禁用币种切换(标准版)
				isMm: true, //是否显示买卖部分
				isGdmm: false, //是否显示挂单买卖部分
				isShowUser: false, //绑定资金密码
				isShowUser2: false, //绑定实名认证
				bz: [], //存放获取过来的币种
				bzID: 1, //币种对应ID
				bzType: "1", //买卖类型
				mmddList: [], //存放买卖订单列表
				wdddList: [], //存放我的订单
				userList: [], //获取用户信息
				ggxqmm: [], //存放获取过来的广告详情
				ggxqbz: "", //弹框广告详情币种
				authgrade: "", //登录用户authgrade
				mobile: "", //登录用户mobile
				ltbz: "", //买入卖出弹框币种type
				yeSlws: "", //账户余额数量保留小数位数
				xdgmSl: "", //下单购买数量
				xdgmJe: "", //下单购买金额
				maxgmsl: "", //最大下单购买数量
				maxgmje: "", //最大下单购买金额
				maxmcsl: "", //最大下单卖出数量
				maxmcje: "", //最大下单卖出金额
				xdmcSl: "", //下单卖出数量
				xdmcJe: "", //下单卖出金额
				mczjmm: "", //下单卖出资金密码
				ggId: "", //广告Id
				mrslInfo: "", //买入弹框下单数量是否合法
				mrjeInfo: "", //买入弹框下单金额是否合法
				qdmrInfo: "", //买入弹框确定买入提示
				mcslInfo: "", //卖出弹框卖出下单数量是否合法
				mcjeInfo: "", //卖出弹框卖出下单金额是否合法
				qdmcInfo: "", //卖出弹框确定卖出提示
				mcmmInfo: "", //弹框卖出资金密码是否合法
				isMr: false, //买入弹框显示隐藏
				isMc: false, //卖出弹框显示隐藏
				istxTk: false, //提醒弹框显示隐藏
				ismrjeInfo: true, //买入弹框是否显示买入金额提示或者确定购买提示
				ismcmmInfo: true, //卖出弹框是否显示卖出资金密码提示或者确定卖出提示
				mmddType: 1, //买卖类型
				tradednum: "", //获取用户交易次数
				mcbzye: "", //用户指定币种的余额
				pagesize: 10, //买卖列表每页数量
				mmfyList: [], //存放买卖列表每一页的数据
				ddts: 0, //我的订单总条数
				ddmysl: 0, //我的订单每页数量
				ddStatus: 0, //订单状态
				kjyfbs: [], //可交易法币列表含国籍
				kjyfb: [], //可交易法币列表
				kjyfbgj: "", //可交易法币国籍
				kjyfbgjId: "", //可交易法币国籍id
				gdbz: "", //挂单列表币种
				gdList: [], //存放挂单列表
				gdbzslws: 0, //挂单买卖币种数量位数
				gdts: 0, //挂单列表总条数
				gdmysl: 0, //挂单列表每页数量
				gdjg: "", //挂单买卖固定价格
				fdbl: "", //挂单买卖浮动比例
				tjfdbl: 0, //挂单买卖提交浮动比例
				jyjg: 0, //挂单买卖交易价格
				rmbcode: "", //可交易法币列表币种type英文缩写
				rmbid: "", //可交易法币列表币种id
				isCs: true, //是否出售还是买入
				isGd: true, //固定价格与非固定价格切换
				isZfts: true, //是否显示支付激活提示
				gdZffs: [], //存放挂单买卖支付方式
				scj: 0, //市场价
				gdbzId: "", //挂单币种id
				fkqx: 10, //挂单买卖付款期限
				jycs: 0, //挂单买卖交易次数限制
				minxe: 100, //挂单买卖最小限额
				maxxe: 150, //挂单买卖最大限额
				lynr: "", //挂单买卖留言内容
				tjlynr: "", //挂单买卖提交留言内容
				gjcheck: 0, //挂单买卖是否高级认证
				sjcheck: 0, //挂单买卖是否绑定手机号
				tycheck: 1, //挂单买卖是否同意交易规则
				jysl: "", //挂单买卖交易数量
				mmzt: 0, //挂单买卖默认显示买入状态
				sfgdjg: 1, //挂单买卖默认显示固定价格
				gdzjmm: "", //挂单买卖资金密码
				kjybzye: 0, //挂单买卖可交易币种余额
				gdInfo: "", //挂单买卖固定价格及浮动比例提示
				slInfo: "", //挂单买卖交易数量提示
				zxInfo: "", //挂单买卖最小限制提示
				zdInfo: "", //挂单买卖最大限制提示
				qxInfo: "", //挂单买卖付款期限提示
				csInfo: "", //挂单买卖交易次数提示
				gdmmInfo: "", //挂单买卖密码提示
				fbInfo: "", //挂单买卖发布到交易区提示
				isfbInfo: false, //挂单买卖发布交易提示显示隐藏
				gdlbput: [], //存放挂单列表修改时获取的列表信息
				gdbjId: "", //挂单买卖编辑广告id
				isDisabled: false, //编辑挂单列表时,返回页面的不可修改数据是否禁用
				isBj: true, //发布交易和修改挂单列表时分别显示不同的按钮
				ismmanjy: false, //是否显示买卖列表买入卖出按钮禁用图标
				isgdlb: true, //是否显示挂单列表项
				jxddList: [], //进行中的订单
				jxmysl: 0, //进行中订单每页数量
				jxts: 0, //进行中订单总条数
				listTitle: [this.$t('otc.Price'), this.$t('otc.MinAmount'), this.$t('otc.MaxAmount'), this.$t('otc.Principal'), this.$t('otc.PaymentMethod'), this.$t('otc.Operating')], //买卖订单头部
				ddxqTitle: [this.$t('otc.OrderNumber'), this.$t('otc.CreationTime'), this.$t('otc.Currency'), this.$t('otc.Types'), this.$t('otc.TradingPrice'), this.$t('otc.Quantity'), this.$t('otc.Amount'), this.$t('otc.Fees'), this.$t('otc.Status'), this.$t('otc.ReferenceNo')], //订单信息头部
				gdmmTitle: [this.$t('fbjy.PendingOrderNum'), this.$t('otc.CreationTime'), this.$t('otc.Currency'), this.$t('otc.Types'), this.$t('otc.TradingPrice'), this.$t('list.Number'), this.$t('fbjy.OrderLimit'), this.$t('list.Action')], //挂单买卖列表头部
				jxddTitle: [this.$t('otc.OrderNumber'), this.$t('otc.CreationTime'), this.$t('otc.Currency'), this.$t('otc.Types'), this.$t('otc.TradingPrice'), this.$t('list.Number'), this.$t('otc.Status')], //挂单买卖列表头部
				gdmmlx: [{
					id: 1,
					title: this.$t("fbjy.Sell")
				}, {
					id: 0,
					title: this.$t("list.Buy_BTC")
				}], //挂单买卖类型
				gdsfgd: [{
					id: 1,
					title: this.$t("otc.Fixedprice")
				}, {
					id: 0,
					title: this.$t("fbjy.NonFixedPrice")
				}], //挂单买卖是否固定价格
				currencyCount: 1, //挂单列表当前页数
				slPlace: "0.00", //挂单买卖交易限制一栏,交易数量提示
				gdjjxzmin: 0, //挂单交易限制最小值
				gdjjxxmax: 0, //挂单交易限制最大值
				tabBuySell: false, //切换买卖广告loading
				selectlegaltender: "", //选中国家列表
				selectItem: "", //选中的值
        orderId:0,  /*订单id*/
			}
		},
		components: { /*页面的loading效果*/
			"loading": loading
		},
		computed:{
			...mapState('user',{yhId:state=>state.userID}),
		},
		mounted() {
			let _this = this;
			/***判断用户请求的内容开始***/
			//请求拦截器
			Axios.interceptors.request.use(config => {
				_this.tabBuySell = true;
				return config
			}, error => {
				_this.tabBuySell = false;
				_this.$message.error({
					message: _this.$t("userCenter.ResponseTimeAgain"),
					type: "warning"
				});
				return Promise.reject(error)
			})
			// 响应拦截器
			Axios.interceptors.response.use((response) => {
				if(response.data.status != undefined) {
					if(Number(response.data.status.code) !== 200) {
						_this.tabBuySell = false;
					}
				}
				if(response.status == 200) {
					_this.tabBuySell = false;
				}
				return response;
			}, (error) => {
				if(error.response) {
					_this.tabBuySell = false;
				}
				return Promise.reject(error)
			})

			/***判断用户请求的结束***/

			/////////////获取币种列表////////////////

			Axios.get(httpUrl.getbzUrl).then(function(res) {

				_this.bz = res.data.data
				//              获取挂单买卖币种下拉菜单第一项id

				_this.gdbzId = _this.bz[0].id
				//获取挂单买卖默认币种数量保留小数位
				_this.gdbzslws = _this.bz[0].displayNum
				//				获取买卖列表头部数量默认币种
				_this.mmbz = _this.bz[0].pageIdentifier
				//				获取挂单列表我在一栏默认币种赋值给交易限制一栏数量币种
				_this.gdbz = _this.bz[0].pageIdentifier
				//      获取默认BTC的最小交易数量
				_this.gdjjxzmin = _this.bz[0].otc_min;
				//      获取默认BTC的最大交易数量
				_this.gdjjxzmax = _this.bz[0].otc_max;
				//	                              获取挂单买卖第一项币种市场参考价
				//////////////默认获取买卖订单列表/////////////
				Axios.get(httpUrl.getmmddUrl, {
					params: {
						"currency_id": _this.gdbzId,
						"type": 1
					}
				}).then(function(res) {
					_this.mmddList = res.data.data;
					for(var i = 0, le = _this.mmddList.length; i < le; i++) {
						_this.uId = _this.mmddList[i].user_id
					}
					//				默认显示首页数据
					_this.mmfyList = _this.mmddList.slice(0, _this.pagesize)
				}).catch(function(err) {
					console.log("默认获取买卖订单列表err", err)
				})
				if(_this.token == undefined || _this.token == null) { ///判断用户是否登录
					return false;
				} else {

					//			 获取挂单买卖第一项币种余额
					Axios.get(httpUrl.getisbzyeUrl, {
						headers: {
							'Authorization': 'Bearer ' + _this.token
						},
						params: {
							"currency_id": _this.gdbzId
						}
					}).then(function(res) {
						//					可交易币种余额
						_this.kjybzye = res.data.data.balance
						//					   保留可交易币种余额小数位
						var toFixedNum = Number(_this.kjybzye).toFixed(_this.gdbzslws + 1);
						_this.kjybzye = toFixedNum.substring(0, toFixedNum.toString().length - 1);
						//				        赋值挂单买卖交易限制一栏,交易数量提示
						if(_this.mmzt == 0 || _this.kjybzye == 0) {
							_this.slPlace = "0.00" + _this.gdbz;
							return false;
						} else {
							_this.slPlace = _this.$t("fbjy.Available") + _this.kjybzye + _this.gdbz;
						}
					}).catch(function(err) {
						console.log("get可交易币种余额 err", err)
					})

				}
			}).catch(function(err) {
				console.log("获取币种列表err", err)
			})

			if(this.token == undefined || this.token == null) { ///判断用户是否登录
				return false;
			}
			/////////////默认获取我的订单/////////////
			if(this.token == null || this.token == undefined) {
				return false;
			} else {
				Axios.get(httpUrl.getwdddUrl, {
					headers: {
						'Authorization': 'Bearer ' + _this.token
					},
					params: {
						stauts: 0
					}
				}).then(function(res) {
					//				获取我的订单数据
					_this.wdddList = res.data.data.data;
					//				获取订单条数
					_this.ddts = res.data.data.total
					//				获取每页订单数量
					_this.ddmysl = res.data.data.per_page
				}).catch(function(err) {
					console.log("默认获取我的订单err", err)
				})
				//////////默认获取挂单买卖可交易法币列表////////////
				Axios.get(httpUrl.getkjyfbUrl, {
					headers: {
						'Authorization': 'Bearer ' + _this.token
					}
				}).then(function(res) {
					//				获取可交易法币列表含国籍
					_this.kjyfbs = res.data.data
					//				获取可交易法币列表
					_this.kjyfb = res.data.data.legaltender
					//				获取可交易法币列表币种type第一项英文缩写
					_this.rmbcode = res.data.data.legaltender[0].code
					//				获取可交易法币列表币种第一项币种id
					_this.rmbid = res.data.data.legaltender[0].id
					//          	获取可交易法币国籍
					_this.kjyfbgj = res.data.data.name
					//				获取可交易法币国籍id
					_this.kjyfbgjId = res.data.data.id
				}).catch(function(err) {
					console.log("get挂单买卖可交易法币列表 err", err)
				})
				//////////////获取交易方式列表////////////
				Axios.get(httpUrl.getjyfsUrl, {
					headers: {
						'Authorization': 'Bearer ' + _this.token
					}
				}).then(function(res) {
					_this.gdZffs = res.data.data;
					//              判断支付方式的条数,如果等于0条就让激活提示显示出来
					if(_this.gdZffs.list.length == 0) {
						_this.isZfts = true
					} else {
						_this.isZfts = false
					}
				}).catch(function(err) {
					console.log("get交易方式列表 err", err)
				})
				/////////////获取登录用户信息/////////////
				Axios.get(httpUrl.userInfo, {
					headers: {
						'Authorization': 'Bearer ' + _this.token
					}
				}).then(function(res) {
					//				获取用户信息
					_this.userList = res.data.data;
					//				获取用户auth_grade,判断是否需要高级认证
					_this.authgrade = res.data.data.auth_grade;
					//获取用户交易次数
					_this.tradednum = res.data.data.traded_num
				}).catch(function(err) {
					console.log("get登录用户信息 err", err);
				})
			}

			////////////通过WebSocket全双工通信协议实现对方聊天信息实时发送///////////
			// var ws = new WebSocket(_this.wsIp); ///定义全局
			var ws = this.ws;
			const wsOpenHandle = function() {
				ws.send('{"bind_id":"' + _this.yhId + '"}')
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
				} else if(arr.type == "otc") {
					_this.istxTk = true;
          _this.orderId = arr.content.orderId;
					// window.localStorage.setItem("ddId", arr.content.orderId)
				}
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
			selectLang(id) {
				for(let i = 0; i < this.kjyfbs.length; i++) {
					if(id == this.kjyfbs[i].id) {
						this.selectlegaltender = this.kjyfbs[i].legaltender;
						this.kjyfbgjId = this.kjyfbs[i].id;
					}
				}
			},
			clickGo() { /*绑定身份证*/
				this.isShowUser2 = false;
				this.$router.push({
					name: "identity",
					params: {
						type: 'Jump'
					}
				});
			},
			clickGo2() {
				this.isBinding = false;
				this.$router.push({
					name: "zhanghu"
				});
			},
			clickTo() { /*绑定资金密码*/
				this.isShowUser = false;
				this.$router.push({
					name: "Accountsecurity",
					params: {
						bangdin: "yes"
					}
				})
			},
			///////////////币种tab切换///////////////
			bzTab(event, index, id, mmbz) {
				this.bzID = id;
				this.gdbzId = id;
				this.mmbz = mmbz
				let _this = this;
				if(_this.bzDis == true) {
					return false
				}

				Axios.get(httpUrl.getmmddUrl, {
					params: {
						"currency_id": _this.bzID,
						"type": _this.bzType
					}
				}).then(function(res) {

					//					获取买卖订单列表
					_this.mmddList = res.data.data;
					for(var i = 0, le = _this.mmddList.length; i < le; i++) {
						_this.uId = _this.mmddList[i].user_id
					}
					//					默认显示当前币种买卖列表首页数据
					_this.mmfyList = _this.mmddList.slice(0, _this.pagesize);
				}).catch(function(err) {
					console.log("通过币种tab获取买卖订单err", err)
				})
				//				点击改变当前币种项颜色
				var bzBtn_All = document.querySelectorAll(".bzBtn");
				for(var i = 0; i < bzBtn_All.length; i++) {
					if(this.getColor == 1) {
						bzBtn_All[i].style.background = "#fff";
						event.currentTarget.style.background = "#f5f5f5";
					} else {
						bzBtn_All[i].style.background = "#161726";
						event.currentTarget.style.background = "#363864";
					}
				}
			},
			//////////////////买入卖出tab切换/////////////////
			//			更改当前项颜色
			mmbs(index) {
				let _this = this;
				if(index == 2) {
					if(_this.userList.auth_grade == 0) {
						_this.$message({
							showClose: true,
							message: _this.$t("fbjy.CompleteAdvancedCertification"),
							type: 'warning',
							duration: 2000
						});
						return false;
					}
				}
				this.isDisabled = false;
				var mmddBtn_All = document.querySelectorAll(".mmddBtn");
				for(var i = 0; i < mmddBtn_All.length; i++) {
					if(this.getColor == 1) {
						mmddBtn_All[i].style.background = "#fff";
						mmddBtn_All[i].style.color = "#333";
						mmddBtn_All[index].style.background = "#312e67";
						mmddBtn_All[index].style.color = "#fff";
					} else {
						mmddBtn_All[i].style.background = "#161726";
						mmddBtn_All[index].style.background = "#363864";
					}
				}
			},
			//          切换类型
			mr(type, event) {
				let _this = this;
				/////判断用户是否登录
				if(_this.token == undefined || _this.token == null) {
					this.$router.push("/index/login")
					return false
				}
				this.isMm = true
				this.isGdmm = false
				this.bzDis = false
				this.bzDis2 = false
				this.bzType = type
				this.currentPage = 1
				Axios.get(httpUrl.getmmddUrl, {
					params: {
						"currency_id": _this.gdbzId,
						"type": type
					}
				}).then(function(res) {
					_this.mmddList = res.data.data
					//					默认显示当前买卖类型首页数据
					_this.mmfyList = _this.mmddList.slice(0, _this.pagesize)

				}).catch(function(err) {
					console.log("通过指定币种以及指定买卖类型获取买卖订单err", err)
				})
			},
			///////////////订单tab切换///////////////
			ddlx(status, event) {
				this.ddStatus = status
				let _this = this
				/////判断用户是否登录
				if(_this.token == undefined || _this.token == null) {
					this.$router.push("/index/login")
					return false
				}
				let obj;
				if(status==3 || status==-1){
          obj={
            "status": status,
            "code":1
          }
        }else{
				  obj={
            "status": status
          }
        }
				//             通过订单状态获取我的订单
				Axios.get(httpUrl.getwdddUrl, {
					headers: {
						'Authorization': 'Bearer ' + _this.token
					},
					params: obj
				}).then(function(res) {
					//				  	获取我的订单数据
					_this.wdddList = res.data.data.data
					//					获取订单条数
					_this.ddts = res.data.data.total
					//					获取每页订单数量
					_this.ddmysl = res.data.data.per_page
				}).catch(function(err) {
					console.log("通过订单状态获取我的订单err", err)
				})
				//				点击改变当前订单tab项样式
				var ddsty_All = document.querySelectorAll(".ddsty");
				for(var i = 0; i < ddsty_All.length; i++) {
					if(this.getColor == 1) {
						ddsty_All[i].style.color = "#666";
						ddsty_All[i].style.borderBottom = "none";
					} else {
						ddsty_All[i].style.color = "#fff";
						ddsty_All[i].style.borderBottom = "none";
					}
				}
				if(this.getColor == 1) {
					event.currentTarget.style.color = "#2e2c46";
					event.currentTarget.style.borderBottom = "solid 2px #DDD";
				} else {
					event.currentTarget.style.color = "#9f99f1";
					event.currentTarget.style.borderBottom = "solid 2px #9e98f2";
				}
			},
			//////////////买入卖出按钮广告详情///////////
			ggxq(id, type, max, uId, ltbz, displayNum) {
				let _this = this
				//				广告Id
				_this.ggId = id
				//				买入卖出弹框币种type
				_this.ltbz = ltbz
				//				账户余额数量保留小数位数
				_this.yeSlws = displayNum
				if(_this.yhId == uId) {
					return false
				}

				/////判断用户是否实名注册
				if(_this.token == undefined || _this.token == null) {
					this.$router.push("/index/login")
					return false
				} else if(_this.userList.idCard == "") {
					////判断用户是否绑定身份信息
					this.isShowUser2 = true;
					return false
				} else if(_this.userList.pay_password_status == false) {
					////判断用户是否绑定资金密码
					this.isShowUser = true;
					return false
				} else if(_this.userList.wxpay_status != 1 && _this.userList.alipy_status != 1 && _this.userList.bank_status != 1) {
					this.isBinding = true;
					return false;
				}
				if(type == 0) {
					Axios.get(httpUrl.getisbzyeUrl, {
						headers: {
							'Authorization': 'Bearer ' + this.token
						},
						params: {
							"currency_id": _this.gdbzId
						}
					}).then(function(res) {
						if(res.data.data.length == 0) {
							_this.mcbzye = 0
						} else {
							_this.mcbzye = res.data.data.balance;
						}
					}).catch(function(err) {
						console.log("卖出币种余额 err", err)
					})
				}
				Axios.get(httpUrl.getggxqUrl, {
					headers: {
						'Authorization': 'Bearer ' + this.token
					},
					params: {
						"pur_id": id
					}
				}).then(function(res) {
					//										判断商品是否下架
					if(res.data.status.code == 101) {
						_this.$message({
							showClose: true,
							message: _this.$t("fbjy.ProductRemoved"),
							type: 'warning',
							duration: 2000
						});
					}
					//					获取广告详情
					_this.ggxqmm = res.data.data;
					//					获取广告详情币种
					_this.ggxqbz = res.data.data.cuccency.pageIdentifier
					//                  判断是否需要高级认证、绑定手机号以及交易次数是否符合
					if(res.data.data.isCheck == 1 && _this.authgrade != 1) {
						//						警告框内容
						_this.$message({
							showClose: true,
							message: _this.$t("fbjy.RequireAdvanced"),
							type: 'warning',
							duration: 2000
						});
					} else if(res.data.data.isMobile == 1 && _this.userList.mobile_status == 0) {
						//						警告框内容
						_this.$message({
							showClose: true,
							message: _this.$t("fbjy.NeedBindPhoneNum"),
							type: 'warning',
							duration: 2000
						});
					} else if(res.data.data.numLimit != 0 && _this.tradednum < res.data.data.numLimit) {
						_this.$message({
							showClose: true,
							message: _this.$t("fbjy.InsufficientNum"),
							type: 'warning',
							duration: 2000
						});
					} else {
						if(_this.bzType == 0) {
							_this.isMc = true; /*卖出的弹框*/
							_this.sellCountDown = 40;
							clearInterval(_this.sellTime);
							_this.sellTime = setInterval(function() { /*限定倒计时*/
								_this.sellCountDown--;
								if(_this.sellCountDown == 0) {
									clearInterval(_this.sellTime);
									_this.sellCountDown = 0;
									_this.isMc = false;
								}
							}, 1000)
						} else {
							_this.isMr = true /*买入的弹框*/
							_this.buyCountDown = 40;
							clearInterval(_this.buyTime);
							_this.buyTime = setInterval(function() { /*限定倒计时*/
								_this.buyCountDown--;
								if(_this.buyCountDown <= 0) {
									clearInterval(_this.buyTime);
									_this.buyCountDown = 40;
									_this.isMr = false;
								}
							}, 1000)
						}
					}
				}).catch(function(err) {
					console.log("获取广告详情 err", err)
				})
			},

			//////////////判断下单购买弹框数量是否符合要求//////////////
			mrslInp(eve, max, price, balance, bzslws) {
				var _this = this
				//				限制输入内容,并保留一定小数位
				const regexp = /(?:\.0*|(\.\d+?)0+)$/;
				var toFixedNum = Number(this.xdgmSl).toFixed(bzslws + 1);
				_this.xdgmSl = toFixedNum.substring(0, toFixedNum.toString().length - 1);
				_this.xdgmSl = _this.xdgmSl.replace(regexp, '$1');
				if(_this.xdgmSl == "" || eve.target.value == "") {
					_this.xdgmSl = "";
				}
				if(isNaN(_this.xdgmSl)) {
					_this.xdgmSl = "";
				}
				eve.target.value = eve.target.value.replace(/[^\d.]/g, ""); //清除"数字"和"."以外的字符
				eve.target.value = eve.target.value.replace(/^\./g, ""); //验证第一个字符是数字而不是
				eve.target.value = eve.target.value.replace(/\.{2,}/g, "."); //只保留第一个. 清除多余的
				eve.target.value = eve.target.value.replace(".", "$#$").replace(/\./g, "").replace("$#$", ".");
				let maxLen = max / price
				if(Number(maxLen) > Number(balance)) {
					_this.maxgmsl = balance
				} else {
					_this.maxgmsl = maxLen
				}
				var toFixedNum = Number(_this.maxgmsl).toFixed(bzslws + 1);
				_this.maxgmsl = toFixedNum.substring(0, toFixedNum.toString().length - 1);
				//				输入提示
				if(Number(_this.xdgmSl) > Number(_this.maxgmsl)) {
					_this.mrslInfo = _this.$t("fbjy.NumNotLarger") + _this.maxgmsl
				} else if(Number(_this.xdgmSl) < Number(_this.maxgmsl)) {
					_this.mrslInfo = ""
					_this.mrjeInfo = ""
				} else {
					_this.mrslInfo = ""
					_this.mrjeInfo = ""
				}
				var num = _this.xdgmSl * price; //计算金额
				//				保留购买金额数量小数位
				if(num.toString().indexOf(".") != -1) { //判断有无包含小数点
					var par = num.toString().split(".")[0];
					var xiao = num.toString().split(".")[1].slice(0, 2);
					var Zhen = parseFloat(par + "." + xiao);
					_this.xdgmJe = Zhen;
				} else {
					_this.xdgmJe = num;
				}
				if(_this.xdgmJe == 0) {
					_this.xdgmJe = ""
				}
			},
			//////////////判断下单购买弹框金额是否符合要求//////////////
			mrjeInp(eve, max, min, price, bzslws) {
				let _this = this
				//				限制输入内容,并保留一定小数位
				let regexp = /(?:\.0*|(\.\d+?)0+)$/;
				var toFixedNum = Number(this.xdgmJe).toFixed(2 + 1);
				_this.xdgmJe = toFixedNum.substring(0, toFixedNum.toString().length - 1);
				_this.xdgmJe = _this.xdgmJe.replace(regexp, '$1');
				if(_this.xdgmJe == "" || eve.target.value == "") {
					_this.xdgmJe = "";
				}
				if(isNaN(_this.xdgmJe)) {
					_this.xdgmJe = "";
				}
				eve.target.value = eve.target.value.replace(/[^\d.]/g, ""); //清除"数字"和"."以外的字符
				eve.target.value = eve.target.value.replace(/^\./g, ""); //验证第一个字符是数字而不是
				eve.target.value = eve.target.value.replace(/\.{2,}/g, "."); //只保留第一个. 清除多余的
				eve.target.value = eve.target.value.replace(".", "$#$").replace(/\./g, "").replace("$#$", ".");
				//				输入提示
				if(Number(_this.xdgmJe) > Number(max)) {
					_this.mrjeInfo = _this.$t("fbjy.Amountcannotgreater") + max + this.ltbz;
				} else if(Number(_this.xdgmJe) < Number(min) && Number(_this.xdgmJe) > 0) {
					_this.mrjeInfo = _this.$t("fbjy.Amountcannotsmaller") + min + this.ltbz;
				} else {
					_this.mrjeInfo = ""
				}
				var num = (_this.xdgmJe / price); //计算金额
				//				保留购买金额数量小数位
				if(num.toString().indexOf(".") != -1) { //判断有无包含小数点
					var par = num.toString().split(".")[0];
					var xiao = num.toString().split(".")[1].slice(0, bzslws);
					var Zhen = parseFloat(par + "." + xiao);
					_this.xdgmSl = Zhen;
				} else {
					_this.xdgmSl = num;
				}
				if(Number(_this.xdgmSl) < Number(_this.maxgmsl)) {
					_this.mrslInfo = ""
				}
				if(_this.xdgmSl == 0) {
					_this.xdgmSl = ""
				}
				if(_this.xdgmSl.length == 0) {
					_this.mrslInfo = ""
					_this.mrjeInfo = ""
				}
			},
			///////////////点击下单购买弹框全部按钮,输入最大购买数量,最大购买金额/////////////
			mrqb(max, price, balance, bzslws) {
				let _this = this
				_this.mrslInfo = ""
				_this.mrjeInfo = ""
				let maxLen = max / price;
				if(Number(maxLen) > Number(balance)) {
					_this.maxgmsl = balance
				} else {
					_this.maxgmsl = maxLen
				}
				//				保留最大购买数量小数位
				var balance = _this.maxgmsl;
				if(balance.toString().indexOf(".") != -1) {
					var Int = balance.toString().split(".")[0];
					var Flo = balance.toString().split(".")[1].slice(0, bzslws);
					var All = parseFloat(Int + "." + Flo);
					_this.xdgmSl = All;
				} else {
					_this.xdgmSl = balance;
				}
				var num = _this.maxgmsl * price;
				//				保留购买金额小数位
				if(num.toString().indexOf(".") != -1) { //判断有无包含小数点
					var par = num.toString().split(".")[0];
					var xiao = num.toString().split(".")[1].slice(0, 2);
					var Zhen = parseFloat(par + "." + xiao);
					_this.xdgmJe = Zhen;
				} else {
					_this.xdgmJe = num;
				}
			},
			//////////////判断下单卖出弹框数量是否符合要求//////////////
			mcslInp(eve, max, price, balance, bzslws) {
				let _this = this
				//				限制输入内容,并保留一定小数位
				let regexp = /(?:\.0*|(\.\d+?)0+)$/;
				var toFixedNum = Number(_this.xdmcSl).toFixed(bzslws + 1);
				_this.xdmcSl = toFixedNum.substring(0, toFixedNum.toString().length - 1);
				_this.xdmcSl = _this.xdmcSl.replace(regexp, '$1');
				if(_this.xdmcSl == "" || eve.target.value == "") {
					_this.xdmcSl = "";
				}
				if(isNaN(_this.xdmcSl)) {
					_this.xdmcSl = "";
				}
				eve.target.value = eve.target.value.replace(/[^\d.]/g, ""); //清除"数字"和"."以外的字符
				eve.target.value = eve.target.value.replace(/^\./g, ""); //验证第一个字符是数字而不是
				eve.target.value = eve.target.value.replace(/\.{2,}/g, "."); //只保留第一个. 清除多余的
				eve.target.value = eve.target.value.replace(".", "$#$").replace(/\./g, "").replace("$#$", ".");
				let maxLen = max / price
				if(Number(maxLen) > Number(balance)) {
					_this.maxmcsl = balance
				} else {
					_this.maxmcsl = maxLen
				}
				var toFixedNum = Number(_this.maxmcsl).toFixed(bzslws + 1);
				_this.maxmcsl = toFixedNum.substring(0, toFixedNum.toString().length - 1);
				//				输入提示
				if(Number(_this.xdmcSl) > Number(_this.mcbzye)) {
					_this.mcslInfo = _this.$t("fbjy.AmountOfCoin")
				} else if(Number(_this.xdmcSl) > Number(_this.maxmcsl)) {
					_this.mcslInfo = _this.$t("fbjy.NumNotLarger") + _this.maxmcsl
				} else if(Number(_this.xdmcSl) < Number(_this.maxmcsl)) {
					_this.mcslInfo = ""
					_this.mcjeInfo = ""
				}
				var num = _this.xdmcSl * price; //计算金额
				if(num.toString().indexOf(".") != -1) { //判断有无包含小数点
					var par = num.toString().split(".")[0];
					var xiao = num.toString().split(".")[1].slice(0, 2);
					var Zhen = parseFloat(par + "." + xiao);
					_this.xdmcJe = Zhen;
				} else {
					_this.xdmcJe = num;
				}
				if(_this.xdmcJe == 0) {
					_this.xdmcJe = ""
				}
				if(_this.mcbzye == 0) {
					_this.mcslInfo = _this.$t("fbjy.CoinBalanceNotEnough")
				}
				if(_this.xdmcSl.length == 0) {
					_this.mcslInfo = ""
					_this.mcjeInfo = ""
				}
			},
			//////////////判断下单卖出弹框金额是否符合要求//////////////
			mcjeInp(eve, max, min, price, bzslws) {
				let _this = this
				//				限制输入内容,并保留一定小数位
				let regexp = /(?:\.0*|(\.\d+?)0+)$/;
				var toFixedNum = Number(_this.xdmcJe).toFixed(2 + 1);
				_this.xdmcJe = toFixedNum.substring(0, toFixedNum.toString().length - 1);
				_this.xdmcJe = _this.xdmcJe.replace(regexp, '$1');
				if(_this.xdmcJe == "" || eve.target.value == "") {
					_this.xdmcJe = "";
				}
				if(isNaN(_this.xdmcJe)) {
					_this.xdmcJe = "";
				}
				eve.target.value = eve.target.value.replace(/[^\d.]/g, ""); //清除"数字"和"."以外的字符
				eve.target.value = eve.target.value.replace(/^\./g, ""); //验证第一个字符是数字而不是
				eve.target.value = eve.target.value.replace(/\.{2,}/g, "."); //只保留第一个. 清除多余的
				eve.target.value = eve.target.value.replace(".", "$#$").replace(/\./g, "").replace("$#$", ".");
				//				输入提示
				if(Number(_this.xdmcJe) > Number(max)) {
					_this.mcjeInfo = _this.$t("fbjy.Amountcannotgreater") + max + _this.ltbz;
				} else if(Number(_this.xdmcJe) < Number(min) && Number(_this.xdmcJe) > 0) {
					_this.mcjeInfo = _this.$t("fbjy.Amountcannotsmaller") + min + _this.ltbz;
				} else {
					_this.mcjeInfo = ""
				}
				var num = (_this.xdmcJe / price); //计算数量

				if(num.toString().indexOf(".") != -1) { //判断有无包含小数点
					var par = num.toString().split(".")[0];
					var xiao = num.toString().split(".")[1].slice(0, bzslws);
					var Zhen = parseFloat(par + "." + xiao);
					_this.xdmcSl = Zhen;
				} else {
					_this.xdmcSl = num;
				}
				if(Number(_this.xdmcSl) < Number(_this.maxmcsl)) {
					_this.mcslInfo = ""
				}
				if(_this.xdmcSl == 0) {
					_this.xdmcSl = ""
				}
				if(_this.mcbzye == 0) {
					_this.mcjeInfo = _this.$t("fbjy.CoinBalanceNotEnough")
				}
				if(_this.xdmcJe.length == 0) {
					_this.mcjeInfo = ""
					_this.mcslInfo = ""
				}
			},
			//			卖出资金密码提示
			mcmmInp(mczjmm) {
				//				判断只能输入数字正则
				var patt = /^[0-9a-zA-Z]+$/;
				var f = patt.test(mczjmm);
				if(f == false) {
					this.mcmmInfo = _this.$t("fbjy.PasswordsContains")
				} else {
					this.mcmmInfo = ""
				}
			},
			///////////////点击下单卖出弹框全部按钮,输入最大卖出数量,最大卖出金额/////////////
			mcqb(max, price, balance, bzslws) {
				let _this = this
				_this.mcslInfo = ""
				_this.mcjeInfo = ""
				let maxLen = max / price;
				if(Number(maxLen) > Number(balance)) {
					_this.maxmcsl = balance
				} else {
					_this.maxmcsl = maxLen
				}
				if(Number(_this.maxmcsl) > Number(_this.mcbzye)) {
					_this.maxmcsl = _this.mcbzye
				} else {
					_this.maxmcsl = _this.maxmcsl
				}
				/*数量*/
				if(_this.maxmcsl == 0) {
					_this.maxmcsl = 0;
				} else {
					_this.maxmcsl = _this.maxmcsl;
				}
				var balance = _this.maxmcsl;
				if(balance.toString().indexOf(".") != -1) {
					var Int = balance.toString().split(".")[0];
					var Flo = balance.toString().split(".")[1].slice(0, bzslws);
					var All = parseFloat(Int + "." + Flo);
					_this.xdmcSl = All;
				} else {
					_this.xdmcSl = balance;
				}

				var num = _this.maxmcsl * price;
				//				保留卖出金额小数位
				/*判断有无包含小数点*/
				if(num.toString().indexOf(".") != -1) {
					var par = num.toString().split(".")[0];
					var xiao = num.toString().split(".")[1].slice(0, 2);
					var Zhen = parseFloat(par + "." + xiao);
					_this.xdmcJe = Zhen;
				} else {
					_this.xdmcJe = num
				}
				if(_this.mcbzye == 0) {
					_this.xdmcSl = ""
					_this.xdmcJe = ""
					_this.ismcmmInfo = false
					_this.qdmcInfo = _this.$t("fbjy.CoinBalanceNotEnough")
					setTimeout(function() {
						_this.ismcmmInfo = true
					}, 1000)
				}
			},
			////////////////下单购买//////////////
			xdgm(id, sl, je, min, max) {
				let _this = this
				//				判断内容是否为空
				if(sl == "") {
					_this.ismrjeInfo = false
					_this.qdmrInfo = _this.$t("otc.PleaseEnterQuantity")
					setTimeout(function() {
						_this.ismrjeInfo = true
					}, 1000)
					return false
				}
				if(je == "") {
					_this.ismrjeInfo = false
					_this.qdmrInfo = _this.$t("otc.PleaseEnterAmount")
					setTimeout(function() {
						_this.ismrjeInfo = true
					}, 1000)
					return false
				}
				//				判断金额是否符合限额
				if(Number(je) < Number(min)) {
					_this.ismrjeInfo = false
					_this.qdmrInfo = _this.$t("fbjy.AmountLessLimitedNum")
					setTimeout(function() {
						_this.ismrjeInfo = true
					}, 1000)
					return false
				} else if(Number(je) > Number(max)) {
					_this.ismrjeInfo = false
					_this.qdmrInfo = _this.$t("fbjy.AmountLargerLimitedNum")
					setTimeout(function() {
						_this.ismrjeInfo = true
					}, 1000)
					return false
				} else {
					Axios.post(httpUrl.postxdgmUrl, {
						pur_id: id,
						balance: sl,
						money: je
					}, {
						headers: {
							'Authorization': 'Bearer ' + _this.token
						}
					}).then(function(res) {
						//						判断状态
						if(res.data.status.code == 101) {
							_this.ismrjeInfo = false
							_this.qdmrInfo = _this.$t("fbjy.AcountLockedContact")
							setTimeout(function() {
								_this.ismrjeInfo = true
							}, 1000)
						} else if(res.data.status.code == 109) {
							_this.ismrjeInfo = false
							_this.qdmrInfo = _this.$t("fbjy.UnfinishedOrderProcess")
							setTimeout(function() {
								_this.ismrjeInfo = true
							}, 1000)
						} else if(res.data.status.code == 108) {
							_this.ismrjeInfo = false
							_this.qdmrInfo = _this.$t("fbjy.ViolationNum")
							setTimeout(function() {
								_this.ismrjeInfo = true
							}, 1000)
						} else if(res.data.status.code == 106) {
							_this.ismrjeInfo = false
							_this.qdmrInfo = _this.$t("fbjy.TransactionAmountError")
							setTimeout(function() {
								_this.ismrjeInfo = true
							}, 1000)
						} else if(res.data.status.code == 200) {
							_this.ismrjeInfo = false
							_this.qdmrInfo = _this.$t("fbjy.BuySuccess")
							setTimeout(function() {
								_this.ismrjeInfo = true
							}, 1000)
							//                  把订单号id存放到本地存储里面
							_this.isMr = false
							//	                                    路由显示到订单详情页面
							_this.wdddly(res.data.data)
						}
					}).catch(function(err) {
						console.log("下单购买失败 err", err)
					})
				}

			},
			////////////////下单卖出/////////////
			xdmc(xdmcSl, ggId, xdmcJe, mczjmm, min, max) {
				let _this = this
				//				判断只能输入数字正则
				var patt = /^[0-9a-zA-Z]+$/;
				var f = patt.test(_this.mczjmm);
				//				判断是否符合条件
				if(_this.mcbzye == 0) {
					_this.ismcmmInfo = false
					_this.qdmcInfo = _this.$t("fbjy.CoinBalanceNotEnough")
					setTimeout(function() {
						_this.ismcmmInfo = true
					}, 1000)
					return false
				}
				if(xdmcSl == "" || xdmcJe == "") {
					_this.ismcmmInfo = false
					_this.qdmcInfo = _this.$t("fbjy.AmountNotEmp")
					setTimeout(function() {
						_this.ismcmmInfo = true
					}, 1000)
					return false
				} else if(Number(xdmcJe) < Number(min)) {
					_this.ismcmmInfo = false
					_this.qdmcInfo = _this.$t("fbjy.AmountLessLimitedNum")
					setTimeout(function() {
						_this.ismcmmInfo = true
					}, 1000)
					return false
				} else if(Number(xdmcJe) > Number(max)) {
					_this.ismcmmInfo = false
					_this.qdmcInfo = _this.$t("fbjy.AmountLargerLimitedNum")
					setTimeout(function() {
						_this.ismcmmInfo = true
					}, 1000)
					return false
				} else if(mczjmm == "") {
					_this.ismcmmInfo = false
					_this.qdmcInfo = _this.$t("otc.Pleasepassword")
					setTimeout(function() {
						_this.ismcmmInfo = true
					}, 1000)
					return false
				} else if(mczjmm.length < 8) {
					_this.ismcmmInfo = false
					_this.qdmcInfo = _this.$t("fbjy.PasswordsContains")
					setTimeout(function() {
						_this.ismcmmInfo = true
					}, 1000)
					return false
				}
				Axios.post(httpUrl.postxdmcUrl, {
					balance: xdmcSl,
					pur_id: ggId,
					money: xdmcJe,
					payPasswd: mczjmm
				}, {
					headers: {
						'Authorization': 'Bearer ' + _this.token
					}
				}).then(function(res) {
					//					判断状态
					if(res.data.status.code == 101) {
						_this.ismcmmInfo = false
						_this.qdmcInfo = _this.$t("fbjy.AcountLockedContact")
						setTimeout(function() {
							_this.ismcmmInfo = true
						}, 1000)
					} else if(res.data.status.code == 107) {
						_this.ismcmmInfo = false
						_this.qdmcInfo = _this.$t("fbjy.PasswordError")
						setTimeout(function() {
							_this.ismcmmInfo = true
						}, 1000)
					} else if(res.data.status.code == 103) {
						_this.ismcmmInfo = false
						_this.qdmcInfo = _this.$t("fbjy.BalanceNotEnough")
						setTimeout(function() {
							_this.ismcmmInfo = true
						}, 1000)
					} else if(res.data.status.code == 104) {
						_this.ismcmmInfo = false
						_this.qdmcInfo = _this.$t("fbjy.TransactionAmountError")
						setTimeout(function() {
							_this.ismcmmInfo = true
						}, 1000)
					} else if(res.data.status.code == 108) {
						_this.ismcmmInfo = false
						_this.qdmcInfo = _this.$t("fbjy.SellError")
						setTimeout(function() {
							_this.ismcmmInfo = true
						}, 1000)
					} else if(res.data.status.code == 200) {
						_this.ismcmmInfo = false
						_this.qdmcInfo = _this.$t("fbjy.SellSuccess")
						setTimeout(function() {
							_this.ismcmmInfo = true
						}, 1000)
						//            	    	把订单号id存放到本地存储里面
						// window.localStorage.setItem("ddId", res.data.data)
						_this.isMc = false
						//            	    	路由显示到订单详情页面
						_this.wdddly(res.data.data);
					}

				}).catch(function(err) {
					console.log("下单卖出 err", err)
				})
			},
			///////////////点击我的订单里面的订单号,将订单id存放本地存储,跳转到订单详情界面,订单详情页面获取id/////////////
			wdddly(ddId) {
				this.$router.push({
					name: "ddxq",
					params: {
						id: ddId
					}
				})
			},
			/////////////////买卖订单分页////////////
			mmddfy(val) {
				let _this = this
				let start = (val - 1) * _this.pagesize
				_this.mmfyList = _this.mmddList.slice(start, start + _this.pagesize)
			},
			///////////////我的订单分页///////////////
			wdddfy(val) {
				let _this = this
				//                 通过订单状态以及当前页数获取订单路径
				Axios.get(httpUrl.getwdddUrl, {
					headers: {
						'Authorization': 'Bearer ' + _this.token
					},
					params: {
						"status": _this.ddStatus,
						"page": val
					}
				}).then(function(res) {
					//					获取我的订单
					_this.wdddList = res.data.data.data;
				}).catch(function(err) {
					console.log("get我的订单列表分页 err", err)
				})

			},
			////////////////挂单买卖切换////////////
			gdmm() {
				let _this = this
				/////判断用户是否登录
				if(_this.token == undefined || _this.token == null) {
					this.$router.push("/index/login")
					return false
				}
				if(_this.userList.auth_grade == 0) {
					_this.$message({
						showClose: true,
						message: _this.$t("fbjy.CompleteAdvancedCertification"),
						type: 'warning',
						duration: 2000
					});
					return false;
				}
				_this.isMm = false
				_this.isGdmm = true
				_this.bzDis = true
				//				判断专业版还是标准版,点击挂单买卖币种切换禁用时,显示不同的样式
				if(_this.getColor == 1) {
					_this.bzDis2 = true
				} else {
					_this.bzDis = true
				}
				//				获取挂单列表
				Axios.get(httpUrl.getgdlistUrl, {
					headers: {
						'Authorization': 'Bearer ' + _this.token
					}
				}).then(function(res) {
					//              获取挂单列表数据
					_this.gdList = res.data.data.data
					//				获取挂单列表总条数
					_this.gdts = res.data.data.total
					//				获取挂单列表每页数量
					_this.gdmysl = res.data.data.per_page
				}).catch(function(err) {
					console.log("get挂单列表 err", err)
				})
			},
			///////////改变可交易法币列表币种type英文缩写////////
			rmbcha(rmbid) {
				let _this = this
				//              对比可交易法币列表币种,赋值当前币种英文缩写
				for(var i = 0, le = _this.selectlegaltender.length; i < le; i++) {
					if(rmbid == _this.selectlegaltender[i].id) {
						_this.rmbcode = _this.selectlegaltender[i].code
					}
				}
				Axios.get(httpUrl.getscjUrl, {
					headers: {
						'Authorization': 'Bearer ' + _this.token
					},
					params: {
						"currency_id": _this.gdbzId,
						"french_id": rmbid
					}
				}).then(function(res) {
					_this.scj = Number(res.data.data);
				}).catch(function(err) {
					console.log("get市场价 err", err)
				})
			},
			///////////////出售买入切换////////////
			cscha(mmzt) {
				let _this = this
				if(mmzt == 0) {
					_this.isCs = true
					_this.slPlace = ""
				} else {
					_this.isCs = false
					_this.slPlace = _this.$t("fbjy.Available") + _this.kjybzye + _this.gdbz
				}
			},
			/////////通过币种获取不同市场价,以及余额////////
			bzcha(id) {
				let _this = this
				//				获取挂单列表我在一栏币种赋值给交易限制一栏数量币种
				for(var i = 0, le = _this.bz.length; i < le; i++) {
					if(this.bz[i].id == id) {
						_this.gdbz = _this.bz[i].pageIdentifier;
						_this.gdbzslws = _this.bz[i].displayNum;
						_this.gdjjxzmin = _this.bz[i].otc_min; /*最小交易数量*/
						_this.gdjjxzmax = _this.bz[i].otc_max; /*最大交易数量*/
					}
				}
				//				获取不同可交易币种余额
				if(_this.mmzt == 0) {
					_this.slPlace = "";
					return false;
				}
				Axios.get(httpUrl.getisbzyeUrl, {
					headers: {
						'Authorization': 'Bearer ' + this.token
					},
					params: {
						"currency_id": id
					}
				}).then(function(res) {
					if(res.data.data.length == 0) {
						_this.kjybzye = 0
						//						  保留可交易币种余额小数位
						var toFixedNum = Number(_this.kjybzye).toFixed(_this.gdbzslws + 1);

						_this.kjybzye = toFixedNum.substring(0, toFixedNum.toString().length - 1);
						//				        赋值挂单买卖交易限制一栏,交易数量提示
						_this.slPlace = _this.$t("fbjy.Available") + _this.kjybzye + _this.gdbz
					} else {
						_this.kjybzye = res.data.data.balance
						//						  保留可交易币种余额小数位
						var toFixedNum = Number(_this.kjybzye).toFixed(_this.gdbzslws + 1);
						_this.kjybzye = toFixedNum.substring(0, toFixedNum.toString().length - 1);
						//				        赋值挂单买卖交易限制一栏,交易数量提示
						_this.slPlace = _this.$t("fbjy.Available") + _this.kjybzye + _this.gdbz
					}
				}).catch(function(err) {
					console.log("get可交易币种余额 err", err)
				})
			},
			////////////固定价格非固定价格切换//////////
			jgcha() {
				let _this = this
				if(_this.sfgdjg == 1) {
					_this.isGd = true
					_this.gdjg = ""
				} else {
					_this.isGd = false
					_this.fdbl = ""
				}
			},
			//////////固定价格提示/////////
			gdjgInp(eve) {
				let _this = this
				//				限制输入内容,并保留一定小数位
				let regexp = /(?:\.0*|(\.\d+?)0+)$/;
				var toFixedNum = Number(_this.gdjg).toFixed(2 + 1);
				_this.gdjg = toFixedNum.substring(0, toFixedNum.toString().length - 1);
				_this.gdjg = _this.gdjg.replace(regexp, '$1');
				if(_this.gdjg == "" || eve.target.value == "") {
					_this.gdjg = "";
				}
				if(isNaN(_this.gdjg)) {
					_this.gdjg = "";
				}
				eve.target.value = eve.target.value.replace(/[^\d.]/g, ""); //清除"数字"和"."以外的字符
				eve.target.value = eve.target.value.replace(/^\./g, ""); //验证第一个字符是数字而不是
				eve.target.value = eve.target.value.replace(/\.{2,}/g, "."); //只保留第一个. 清除多余的
				eve.target.value = eve.target.value.replace(".", "$#$").replace(/\./g, "").replace("$#$", ".");
			},
			///////////////浮动比例限制输入////////
			fdblInp(eve) {
				let _this = this
				//				限制输入内容,并保留一定小数位
				let regexp = /(?:\.0*|(\.\d+?)0+)$/;
				var toFixedNum = Number(_this.fdbl).toFixed(0 + 1);
				_this.fdbl = toFixedNum.substring(0, toFixedNum.toString().length - 1);
				_this.fdbl = _this.fdbl.replace(regexp, '$1');
				if(_this.fdbl == "" || eve.target.value == "") {
					_this.fdbl = "";
				}
				if(_this.fdbl >= 50) {
					_this.fdbl = 50;
				}
				if(isNaN(_this.fdbl)) {
					_this.fdbl = "";
				}
				eve.target.value = eve.target.value.replace(/[^\d.]/g, ""); //清除"数字"和"."以外的字符
				eve.target.value = eve.target.value.replace(/^\./g, ""); //验证第一个字符是数字而不是
				eve.target.value = eve.target.value.replace(/\.{2,}/g, "."); //只保留第一个. 清除多余的
				eve.target.value = eve.target.value.replace(".", "$#$").replace(/\./g, "").replace("$#$", ".");
			},
			//////////交易数量提示/////////
			gdslInp(eve) {
				let _this = this
				//				限制输入内容,并保留一定小数位
				let regexp = /(?:\.0*|(\.\d+?)0+)$/;
				var toFixedNum = Number(_this.jysl).toFixed(_this.gdbzslws + 1);
				_this.jysl = toFixedNum.substring(0, toFixedNum.toString().length - 1);
				_this.jysl = _this.jysl.replace(regexp, '$1');
				if(_this.jysl == "" || eve.target.value == "") {
					_this.jysl = "";
				}
				if(isNaN(_this.jysl)) {
					_this.jysl = "";
				}
				eve.target.value = eve.target.value.replace(/[^\d.]/g, ""); //清除"数字"和"."以外的字符
				eve.target.value = eve.target.value.replace(/^\./g, ""); //验证第一个字符是数字而不是
				eve.target.value = eve.target.value.replace(/\.{2,}/g, "."); //只保留第一个. 清除多余的
				eve.target.value = eve.target.value.replace(".", "$#$").replace(/\./g, "").replace("$#$", ".");

				//				判断输入数量是否小于币种余额且只能为数字
				if((Number(_this.jysl) > Number(_this.kjybzye)) && this.mmzt != 0) {
					_this.slInfo = _this.$t("fbjy.CoinBalanceNotEnough")
				} else {
					_this.slInfo = ""
				}
				//				如果内容为空提示消失
				if(_this.jysl.length == 0) {
					_this.slInfo = ""
					return false;
				}
				/*判断卖的状态*/
				if(_this.mmzt != 0) {
					if(_this.jysl > parseFloat(_this.kjybzye)) { /*可用余额*/
						_this.slInfo = _this.$t("fbjy.TransactionAmountNotLarger")
					}
				}
				//    限制交易数量最大金额
				if(_this.jysl > parseFloat(_this.gdjjxzmax)) {
					var maxNum = parseFloat(_this.gdjjxzmax);
					_this.slInfo = _this.$t("fbjy.TransactionNUmNotLarger") + maxNum.toFixed(_this.gdbzslws);
				}
				//    限制交易数量的最小金额
				if(_this.jysl < parseFloat(_this.gdjjxzmin)) {
					var minNum = parseFloat(_this.gdjjxzmin)
					_this.slInfo = _this.$t("fbjy.TransactionNumNotLess") + minNum.toFixed(_this.gdbzslws);
				}

			},
			/////////最小限额提示/////////
			zxInp(eve) {
				let _this = this
				//				限制输入内容,并保留一定小数位
				const regexp = /(?:\.0*|(\.\d+?)0+)$/;
				var toFixedNum = Number(_this.minxe).toFixed(2 + 1);
				_this.minxe = toFixedNum.substring(0, toFixedNum.toString().length - 1);
				_this.minxe = _this.minxe.replace(regexp, '$1');
				if(_this.minxe == "" || eve.target.value == "") {
					_this.minxe = "";
				}
				if(isNaN(_this.minxe)) {
					_this.minxe = "";
				}
				eve.target.value = eve.target.value.replace(/[^\d.]/g, ""); //清除"数字"和"."以外的字符
				eve.target.value = eve.target.value.replace(/^\./g, ""); //验证第一个字符是数字而不是
				eve.target.value = eve.target.value.replace(/\.{2,}/g, "."); //只保留第一个. 清除多余的
				eve.target.value = eve.target.value.replace(".", "$#$").replace(/\./g, "").replace("$#$", ".");

				//				判断输入限额大于0不能小于100且不能大于最大限额

				if(Number(_this.minxe) < 100 && Number(_this.minxe) > 0) {
					_this.zxInfo = _this.$t("fbjy.MinAmountNotLess")
				} else if(parseFloat(_this.minxe) >= 100) {
					_this.zxInfo = ""
					_this.maxxe = parseFloat(_this.minxe) + 50;
				} else if(parseFloat(_this.minxe) > parseFloat(_this.maxxe)) {
					_this.zxInfo = _this.$t("fbjy.MinAmountNotLarger") + _this.maxxe
				} else if(_this.minxe == "") {
					_this.zxInfo = "";
				}
			},
			zxbl() {
				if(Number(this.minxe) <= Number(this.maxxe)) {
					this.zdInfo = ""
				}
			},
			//////////最大限额提示/////////
			zdInp(eve) {
				let _this = this
				//				限制输入内容,并保留一定小数位
				const regexp = /(?:\.0*|(\.\d+?)0+)$/;
				var toFixedNum = Number(_this.maxxe).toFixed(2 + 1);
				_this.maxxe = toFixedNum.substring(0, toFixedNum.toString().length - 1);
				_this.maxxe = _this.maxxe.replace(regexp, '$1');
				if(_this.maxxe == "" || eve.target.value == "") {
					_this.maxxe = "";
				}
				if(isNaN(_this.maxxe)) {
					_this.maxxe = "";
				}

				eve.target.value = eve.target.value.replace(/[^\d.]/g, ""); //清除"数字"和"."以外的字符
				eve.target.value = eve.target.value.replace(/^\./g, ""); //验证第一个字符是数字而不是
				eve.target.value = eve.target.value.replace(/\.{2,}/g, "."); //只保留第一个. 清除多余的
				eve.target.value = eve.target.value.replace(".", "$#$").replace(/\./g, "").replace("$#$", ".");
				if(this.maxxe <= 100) {
					this.zdInfo = _this.$t("fbjy.MaxAmountNotLess") + "150"
					return false;
				}
				//				判断输入限额大于0不能小于最小限额
				if(Number(_this.maxxe) < Number(_this.minxe) && Number(_this.maxxe) > 0) {
					_this.zdInfo = _this.$t("fbjy.MaxAmountNotLess") + _this.minxe
				} else {
					_this.zdInfo = ""
				}
			},
			zdbl() {
				if(Number(this.minxe) <= Number(this.maxxe)) {
					this.zxInfo = ""
				}
			},
			/////////付款期限提示/////////
			qxInp(eve) {
				let _this = this
				//				限制输入内容,并保留一定小数位
				let regexp = /(?:\.0*|(\.\d+?)0+)$/;
				var toFixedNum = Number(_this.fkqx).toFixed(0 + 1);
				_this.fkqx = toFixedNum.substring(0, toFixedNum.toString().length - 1);
				_this.fkqx = _this.fkqx.replace(regexp, '$1');
				if(_this.fkqx == "" || eve.target.value == "") {
					_this.fkqx = "";
				}
				if(isNaN(_this.fkqx)) {
					_this.fkqx = "";
				}
				eve.target.value = eve.target.value.replace(/[^\d.]/g, ""); //清除"数字"和"."以外的字符
				eve.target.value = eve.target.value.replace(/^\./g, ""); //验证第一个字符是数字而不是
				eve.target.value = eve.target.value.replace(/\.{2,}/g, "."); //只保留第一个. 清除多余的
				eve.target.value = eve.target.value.replace(".", "$#$").replace(/\./g, "").replace("$#$", ".");
				//				判断输入期限是否大于10小于30且为正整数
				if(_this.fkqx < 10 && _this.fkqx >= 0) {
					_this.qxInfo = _this.$t("fbjy.PaymentPeriodNotLess")
				} else if(_this.fkqx > 30) {
					_this.qxInfo = _this.$t("fbjy.PaymentPeriodNotMore")
				} else {
					_this.qxInfo = ""
				}
				//				如果内容为空提示消失
				if(_this.fkqx.length == 0) {
					_this.qxInfo = ""
				}
			},
			/////////////交易次数提示////////////
			csxzinp(eve) {
				let _this = this
				//				限制输入内容,并保留一定小数位
				const regexp = /(?:\.0*|(\.\d+?)0+)$/;
				var toFixedNum = Number(_this.jycs).toFixed(2 + 1);
				_this.jycs = toFixedNum.substring(0, toFixedNum.toString().length - 1);
				_this.jycs = _this.jycs.replace(regexp, '$1');
				if(_this.jycs == "" || eve.target.value == "") {
					_this.jycs = "";
				}
				if(_this.jycs >= 100) {
					_this.jycs = 100;
				}
				if(isNaN(_this.jycs)) {
					_this.jycs = "";
				}
				eve.target.value = eve.target.value.replace(/[^\d.]/g, ""); //清除"数字"和"."以外的字符
				eve.target.value = eve.target.value.replace(/^\./g, ""); //验证第一个字符是数字而不是
				eve.target.value = eve.target.value.replace(/\.{2,}/g, "."); //只保留第一个. 清除多余的
				eve.target.value = eve.target.value.replace(".", "$#$").replace(/\./g, "").replace("$#$", ".");
			},
			//			交易次数加按钮
			add(jycs) {
				this.jycs++
					if(this.jycs >= 100) {
						this.jycs = 100
					}
			},
			//			交易次数减按钮
			minus(jycs) {
				this.jycs--
					if(this.jycs <= 0) {
						this.jycs = 0
					}
			},
			/////////////资金密码提示////////////
			//			密码输入框失去焦点事件
			gdmmInp(gdzjmm) {
				//				判断只能输入数字正则
				var patt = /^[0-9a-zA-Z]+$/;
				var f = patt.test(gdzjmm);
				if(f == false) {
					this.gdmmInfo = _this.$t("fbjy.PasswordsContains")
				} else {
					this.gdmmInfo = ""
				}
			},
			gdmmbl(gdzjmm) {
				let _this = this
				//				判断只能输入数字正则
				var patt = /^[0-9a-zA-Z]+$/;
				var f = patt.test(gdzjmm);
				if(gdzjmm.length < 8 && gdzjmm.length > 0) {
					_this.gdmmInfo = _this.$t("fbjy.PasswordsContains")
				} else if(f == false) {
					this.gdmmInfo = _this.$t("fbjy.PasswordsContains")
				} else {
					_this.gdmmInfo = ""
				}
				//				 else {
				//					this.gdmmInfo = ""
				//				}
			},
			//			密码输入框获取焦点事件
			gdmmfo(gdzjmm) {
				let _this = this
				_this.gdmmInfo = ""
			},
			////////////刷新重新获取支付方式///////////
			sx() {
				let _this = this
				Axios.get(httpUrl.getjyfsUrl, {
					headers: {
						'Authorization': 'Bearer ' + _this.token
					}
				}).then(function(res) {
					_this.gdZffs = res.data.data
					//              判断支付方式的条数,如果等于0条就让激活提示显示出来
					if(_this.gdZffs.list.length == 0) {
						_this.isZfts = true
					} else {
						_this.isZfts = false
					}
				}).catch(function(err) {
					console.log("get交易方式列表 err", err)
				})
			},
			/////////////发布到交易区/////////////
			fbjy() {
				let _this = this;
				//				判断密码只能输入数字正则
				var patt = /^[0-9a-zA-Z]+$/;
				var f = patt.test(_this.gdzjmm);
				//				判断提交信息是否为空或者合法
				if(_this.sfgdjg == 1 && _this.gdjg == "") {
					_this.isfbInfo = true
					_this.fbInfo = _this.$t("fbjy.FixedPriceNotEmp")
					setTimeout(function() {
						_this.isfbInfo = false
					}, 1000)
					return false
				} else if(_this.sfgdjg == 1 && _this.gdjg == 0) {
					_this.isfbInfo = true
					_this.fbInfo = _this.$t("fbjy.FixedPriceNotZero")
					setTimeout(function() {
						_this.isfbInfo = false
					}, 1000)
					return false
				} else if(_this.sfgdjg == 0 && _this.fdbl == "") {
					_this.isfbInfo = true
					_this.fbInfo = _this.$t("fbjy.RatioNnotEmp")
					setTimeout(function() {
						_this.isfbInfo = false
					}, 1000)
					return false
				} else if(_this.jysl == "") {
					_this.isfbInfo = true
					_this.fbInfo = _this.$t("fbjy.AmountNotEmpty")
					setTimeout(function() {
						_this.isfbInfo = false
					}, 1000)
					return false
				} else if((Number(_this.jysl) > Number(_this.kjybzye)) && this.mmzt != 0) {
					_this.isfbInfo = true
					_this.fbInfo = _this.$t("fbjy.CoinBalanceNotEnough")
					setTimeout(function() {
						_this.isfbInfo = false
					}, 1000)
					return false
				} else if(_this.gdzjmm == "") {
					_this.isfbInfo = true
					_this.fbInfo = _this.$t("fbjy.FundsPasswordNotEmp")
					setTimeout(function() {
						_this.isfbInfo = false
					}, 1000)
					return false
				} else if(parseFloat(_this.maxxe) < 150) {
					_this.isfbInfo = true
					_this.fbInfo = _this.$t("fbjy.MaxAmountNotLess") + "150";
					setTimeout(function() {
						_this.isfbInfo = false
					}, 1000)
					return false;
				} else if(parseFloat(_this.jysl) > parseFloat(_this.gdjjxzmax)) {
					var maxNum = parseFloat(_this.gdjjxzmax);
					_this.isfbInfo = true
					_this.fbInfo = _this.$t("fbjy.TransactionNUmNotLarger") + maxNum.toFixed(_this.gdbzslws);
					setTimeout(function() {
						_this.isfbInfo = false
					}, 1000)
					return false;
				} else if(parseFloat(_this.jysl) < parseFloat(_this.gdjjxzmin)) {
					var minNum = parseFloat(_this.gdjjxzmin);
					_this.isfbInfo = true
					_this.fbInfo = _this.$t("fbjy.TransactionNumNotLess") + minNum.toFixed(_this.gdbzslws);
					setTimeout(function() {
						_this.isfbInfo = false
					}, 1000)
					return false;
				} else if(Number(_this.minxe) == "") {
					_this.isfbInfo = true
					_this.fbInfo = _this.$t("fbjy.MinNUmNotEmpty")
					setTimeout(function() {
						_this.isfbInfo = false
					}, 1000)
					return false
				} else if(Number(_this.minxe) < 100 && Number(_this.minxe) > 0) {
					_this.isfbInfo = true
					_this.fbInfo = _this.$t("fbjy.MinAmountNotLess")
					setTimeout(function() {
						_this.isfbInfo = false
					}, 1000)
					return false
				} else if(Number(_this.maxxe) == "") {
					_this.isfbInfo = true
					_this.fbInfo = _this.$t("fbjy.MaxAmountNotEmp")
					setTimeout(function() {
						_this.isfbInfo = false
					}, 1000)
					return false
				} else if(Number(_this.minxe) > Number(_this.maxxe)) {
					_this.isfbInfo = true
					_this.fbInfo = _this.$t("fbjy.MinAmountNotGreateMax")
					setTimeout(function() {
						_this.isfbInfo = false
					}, 1000)
					return false
				} else if(_this.fkqx < 10 && _this.fkqx >= 0) {
					_this.isfbInfo = true
					_this.fbInfo = _this.$t("fbjy.PaymentPeriodNotLess")
					setTimeout(function() {
						_this.isfbInfo = false
					}, 1000)
					return false
				} else if(_this.fkqx > 30) {
					_this.isfbInfo = true
					_this.fbInfo = _this.$t("fbjy.PaymentPeriodNotMores")
					setTimeout(function() {
						_this.isfbInfo = false
					}, 1000)
					return false
				} else if(_this.gdzjmm.length < 8) {
					_this.isfbInfo = true
					_this.fbInfo = _this.$t("fbjy.FundsPasswordLeast")
					setTimeout(function() {
						_this.isfbInfo = false
					}, 1000)
					return false
				} else if(f == false) {
					_this.isfbInfo = true
					_this.fbInfo = _this.$t("fbjy.FundsPasswordInclude")
					setTimeout(function() {
						_this.isfbInfo = false
					}, 1000)
					return false
				} else if(_this.tycheck == false) {
					_this.isfbInfo = true
					_this.fbInfo = _this.$t("fbjy.AgreeRegulations")
					setTimeout(function() {
						_this.isfbInfo = false
					}, 1000)
					return false
				}
				//					判断是否为固定价格,如果为固定价格,交易价格等于固定价格,固定后台传0
				if(_this.sfgdjg == 1) {
					_this.jyjg = _this.gdjg
					_this.tjfdbl = 0
				} else {
					_this.tjfdbl = _this.fdbl
				}
				//					判断非固定价格情况下买卖状态,并提交对应的交易价格
				if(_this.sfgdjg == 0 && _this.mmzt == 0) {
					_this.jyjg = _this.scj - _this.scj * Number(_this.fdbl) / 100
				} else if(_this.sfgdjg == 0 && _this.mmzt == 1) {
					_this.jyjg = _this.scj + _this.scj * Number(_this.fdbl) / 100
				}
				//				交易价格保留小数位
				var toFixedNum = Number(_this.jyjg).toFixed(2 + 1);
				_this.jyjg = toFixedNum.substring(0, toFixedNum.toString().length - 1);
				//					判断自动回复内容,如果为空就提交默认留言内容,否则提交用户输入内容
				if(_this.lynr == "") {
					_this.tjlynr = "0"
				} else {
					_this.tjlynr = _this.lynr
				}
				//				将高级认证和绑定手机号布尔值转化为数字提交
				if(_this.gjcheck == false) {
					_this.gjcheck = 0
				} else {
					_this.gjcheck = 1
				}
				if(_this.sjcheck == false) {
					_this.sjcheck = 0
				} else {
					_this.sjcheck = 1
				}
				//					提交数据
				Axios.post(httpUrl.sendBuy, {
					currency_id: _this.gdbzId,
					country_id: _this.kjyfbgjId,
					currency_type: _this.rmbid,
					timeLimit: _this.fkqx,
					numLimit: _this.jycs,
					isCheck: _this.gjcheck,
					isMobile: _this.sjcheck,
					price: _this.jyjg,
					balance: _this.jysl,
					type: _this.mmzt,
					minTradeLimit: _this.minxe,
					maxTradeLimit: _this.maxxe,
					is_fixed: _this.sfgdjg,
					proportion: _this.tjfdbl,
					reply_text: _this.tjlynr,
					payPasswd: _this.gdzjmm
				}, {
					headers: {
						'Authorization': 'Bearer ' + _this.token
					}
				}).then(function(res) {
					if(res.data.status.code == 101) {
						_this.$message({
							showClose: true,
							message: _this.$t("fbjy.AcountLockedContact"),
							type: 'warning',
							duration: 2000
						});
					} else if(res.data.status.code == 110) {
						_this.$message({
							showClose: true,
							message: _this.$t("fbjy.HaveunfinishedOrders"),
							type: 'warning',
							duration: 2000
						});
					} else if(res.data.status.code == 102) {
						_this.$message({
							showClose: true,
							message: _this.$t("fbjy.FillLeastOne"),
							type: 'warning',
							duration: 2000
						});
					} else if(res.data.status.code == 103) {
						_this.$message({
							showClose: true,
							message: _this.$t("fbjy.PasswordError"),
							type: 'warning',
							duration: 2000
						});
					} else if(res.data.status.code == 108) {
						_this.$message({
							showClose: true,
							message: _this.$t("fbjy.CoinNotExist"),
							type: 'warning',
							duration: 2000
						});
					} else if(res.data.status.code == 107) {
						_this.$message({
							showClose: true,
							message: _this.$t("fbjy.PublishTransactionError"),
							type: 'warning',
							duration: 2000
						});
					} else if(res.data.status.code == -500) {
						_this.$message({
							showClose: true,
							message: _this.$t("fbjy.PublishTransactionError"),
							type: 'warning',
							duration: 2000
						});
					} else if(res.data.status.code == 200) {
						//						   清空发布内容,恢复默认项
						_this.kjyfbgjId = "";
						_this.rmbid = "";
						_this.mmzt = 0;
						_this.gdbzId = "";
						_this.sfgdjg = 1;
						_this.isGd = true;
						_this.isCs = true;
						_this.gdjg = "";
						_this.fdbl = "";
						_this.rmbcode = "";
						_this.jysl = "";
						_this.minxe = 100;
						_this.maxxe = 150;
						_this.fkqx = 10;
						_this.lynr = "";
						_this.lynr = "";
						_this.jycs = 0;
						_this.gjcheck = 0;
						_this.sjcheck = 0;
						_this.gdzjmm = "";
						_this.gInfo = "";
						_this.slInfo = "";
						_this.zxInfo = "";
						_this.zdInfo = "";
						_this.qxInfo = "";
						_this.gdmmInfo = "";
						//             重新获取数据
						Axios.get(httpUrl.getgdlistUrl, {
							headers: {
								'Authorization': 'Bearer ' + _this.token
							}
						}).then(function(res) {
							//              获取挂单列表数据
							_this.gdList = res.data.data.data
							//				获取挂单列表条数
							_this.gdts = res.data.data.total
							//				获取挂单列表每页数量
							_this.gdmysl = res.data.data.per_page
						}).catch(function(err) {
							console.log("get挂单列表 err", err)
						})
						_this.$message({
							showClose: true,
							message: _this.$t("fbjy.PublishSuccess"),
							type: 'success',
							duration: 2000
						});
					}
				}).catch(function(err) {
					console.log("err", err)
				})
			},
			/////////////挂单列表删除////////////
			del(id, index) {
				let _this = this
				//          	删除当条订单
				Axios.post(httpUrl.postdelUrl, {
					order_id: id
				}, {
					headers: {
						'Authorization': 'Bearer ' + _this.token
					}
				}).then(function(res) {
					if(res.data.status.code == 200) {
						//						删除当条数据
						_this.gdts--;
						_this.gdList.splice(index, 1);
						_this.currencyCount = Math.ceil(_this.gdts / 10);
						_this.$message({
							showClose: true,
							message: _this.$t("fbjy.OrderDletedSuccess"),
							type: 'success',
							duration: 2000
						});
						Axios.get(httpUrl.getgdlistUrl, {
							headers: {
								'Authorization': 'Bearer ' + _this.token
							},
							params: {
								"page": _this.currencyCount
							}
						}).then(function(res) {
							_this.gdList = res.data.data.data;
						}).catch(function(err) {
							console.log("get挂单列表分页 err", err)
						})
					}
				}).catch(function(err) {
					console.log("挂单列表del err", err)
				})
			},
			////////////挂单列表下架/////////////
			xj(id, index) {
				let _this = this
				Axios.post(httpUrl.postxjUrl, {
					order_id: id
				}, {
					headers: {
						'Authorization': 'Bearer ' + _this.token
					}
				}).then(function(res) {
					if(res.data.status.code == 200) {
						//						改变当条数据状态
						_this.gdList[index].status = -1
						_this.$message({
							showClose: true,
							message: _this.$t("fbjy.OrderRemovedSuccess"),
							type: 'success',
							duration: 2000
						});
					}
				}).catch(function(err) {
					console.log("挂单列表xj err", err)
				})
			},
			//////////挂单列表编辑获取订单数据返回页面/////////
			bj(id) {
				let _this = this
				//		   	获取编辑信息
				Axios.get(httpUrl.getggxqUrl, {
					headers: {
						'Authorization': 'Bearer ' + _this.token
					},
					params: {
						"pur_id": id
					}
				}).then(function(res) {
					_this.gdlbput = res.data.data
					if(res.data.status.code == 200) {
						//						获取挂单买卖编辑广告id
						_this.gdbjId = id
						//					    发布交易和修改挂单列表时切换不同按钮
						_this.isBj = false
						//						将获取的币种类型返回给页面
						for(var i = 0, le = _this.selectlegaltender.length; i < le; i++) {
							if(_this.gdlbput.currency_type == _this.selectlegaltender[i].id) {
								_this.rmbcode = _this.selectlegaltender[i].code
							}
						}
						//						将获取的币种返回给交易限制一栏数量币种
						for(var i = 0, le = _this.bz.length; i < le; i++) {
							if(_this.gdlbput.currency_id == _this.bz[i].id) {
								_this.gdbz = _this.bz[i].pageIdentifier
							}
						}
						//		判断是否为固定价格,固定价格与非固定价格等内容切换,返回对应的价格与比例
						if(_this.gdlbput.is_fixed == 1) {
							_this.isGd = true
							_this.gdjg = Number(_this.gdlbput.price)
						} else {
							_this.isGd = false
							_this.scj = Number(_this.gdlbput.market_guidance_price)
							_this.fdbl = _this.gdlbput.proportion
							if(_this.gdlbput.type == 1) {
								_this.isCs = false
							} else {
								_this.isCs = true
							}
						}
						//						判断获取到的自动回复内容,为0的话返回页面自动回复内容为空,否则返回自动回复内容
						if(_this.gdlbput.reply_text == 0) {
							_this.lynr = ""
						} else {
							_this.lynr = _this.gdlbput.reply_text
						}
						//					赋值页面数据
						_this.kjyfbgjId = _this.gdlbput.country_id
						_this.rmbid = _this.gdlbput.currency_type
						_this.mmzt = _this.gdlbput.type
						_this.gdbzId = _this.gdlbput.cuccency.id
						_this.sfgdjg = _this.gdlbput.is_fixed
						_this.jysl = _this.gdlbput.balance
						//						返回交易数量保留小数位
						var toFixedNum = Number(_this.jysl).toFixed(_this.gdlbput.cuccency.displayNum + 1);
						_this.jysl = toFixedNum.substring(0, toFixedNum.toString().length - 1);
						_this.minxe = _this.gdlbput.minTradeLimit
						_this.maxxe = _this.gdlbput.maxTradeLimit
						_this.fkqx = _this.gdlbput.timeLimit
						_this.jycs = _this.gdlbput.numLimit
						_this.gjcheck = _this.gdlbput.isCheck
						_this.sjcheck = _this.gdlbput.isMobile
						_this.gdzjmm = ""
						//                  禁用不可改变数据
						_this.isDisabled = true
						//					滚动条到顶部
						$("html,body").animate({
							scrollTop: 0
						}, 500);
						_this.$message({
							showClose: true,
							message: _this.$t("fbjy.GeOrderSuccess"),
							type: 'success',
							duration: 2000
						});
					}
				}).catch(function(err) {
					console.log("get挂单列表 err", err)
				})

			},
			///////////////编辑挂单列表提交//////////////
			bjjy(id) {
				let _this = this
				//				判断密码只能输入数字正则
				var patt = /^[0-9a-zA-Z]+$/;
				var f = patt.test(_this.gdzjmm);
				//			判断提交信息是否为空或者合法
				if(_this.sfgdjg == 1 && _this.gdjg == "") {
					_this.isfbInfo = true
					_this.fbInfo = _this.$t("fbjy.FixedPriceNotEmp")
					setTimeout(function() {
						_this.isfbInfo = false
					}, 1000)
					return false
				} else if(_this.sfgdjg == 1 && _this.gdjg == 0) {
					_this.isfbInfo = true
					_this.fbInfo = _this.$t("fbjy.FixedPriceNotZero")
					setTimeout(function() {
						_this.isfbInfo = false
					}, 1000)
					return false
				} else if(_this.sfgdjg == 0 && _this.fdbl == "") {
					_this.isfbInfo = true
					_this.fbInfo = _this.$t("fbjy.RatioNnotEmp")
					setTimeout(function() {
						_this.isfbInfo = false
					}, 1000)
					return false
				} else if(_this.jysl == "") {
					_this.isfbInfo = true
					_this.fbInfo = _this.$t("fbjy.AmountNotEmpty")
					setTimeout(function() {
						_this.isfbInfo = false
					}, 1000)
					return false
				} else if(_this.gdzjmm == "") {
					_this.isfbInfo = true
					_this.fbInfo = _this.$t("fbjy.FundsPasswordNotEmp")
					setTimeout(function() {
						_this.isfbInfo = false
					}, 1000)
					return false
				} else if(Number(_this.minxe) == "") {
					_this.isfbInfo = true
					_this.fbInfo = _this.$t("fbjy.MinNUmNotEmpty")
					setTimeout(function() {
						_this.isfbInfo = false
					}, 1000)
					return false
				} else if(Number(_this.minxe) < 100 && Number(_this.minxe) > 0) {
					_this.isfbInfo = true
					_this.fbInfo = _this.$t("fbjy.MinAmountNotLess")
					setTimeout(function() {
						_this.isfbInfo = false
					}, 1000)
					return false
				} else if(Number(_this.maxxe) == "") {
					_this.isfbInfo = true
					_this.fbInfo = _this.$t("fbjy.MaxAmountNotEmp")
					setTimeout(function() {
						_this.isfbInfo = false
					}, 1000)
					return false
				} else if(Number(_this.maxxe) < 100 && Number(_this.maxxe) > 0) {
					_this.isfbInfo = true
					_this.fbInfo = _this.$t("fbjy.MaxAmountNotLess") + "100"
					setTimeout(function() {
						_this.isfbInfo = false
					}, 1000)
					return false
				} else if(Number(_this.minxe) > Number(_this.maxxe)) {
					_this.isfbInfo = true
					_this.fbInfo = _this.$t("fbjy.MinAmountNotGreateMax")
					setTimeout(function() {
						_this.isfbInfo = false
					}, 1000)
					return false
				} else if(_this.fkqx < 10 && _this.fkqx >= 0) {
					_this.isfbInfo = true
					_this.fbInfo = _this.$t("fbjy.PaymentPeriodNotLess")
					setTimeout(function() {
						_this.isfbInfo = false
					}, 1000)
					return false
				} else if(_this.fkqx > 30) {
					_this.isfbInfo = true
					_this.fbInfo = _this.$t("fbjy.PaymentPeriodNotMore")
					setTimeout(function() {
						_this.isfbInfo = false
					}, 1000)
					return false
				} else if(_this.gdzjmm.length < 8) {
					return false
				} else if(f == false) {
					return false
				} else if(_this.tycheck == false) {
					_this.isfbInfo = true
					_this.fbInfo = _this.$t("fbjy.AgreeRegulations")
					setTimeout(function() {
						_this.isfbInfo = false
					}, 1000)
					return false
				}
				//					判断是否为固定价格,如果为固定价格,交易价格等于固定价格,固定后台传0
				if(_this.sfgdjg == 1) {
					_this.jyjg = _this.gdjg
					_this.tjfdbl = 0
				} else {
					_this.tjfdbl = _this.fdbl
				}
				//					判断非固定价格情况下买卖状态,并提交对应的交易价格
				if(_this.sfgdjg == 0 && _this.mmzt == 0) {
					_this.jyjg = _this.scj - _this.scj * Number(_this.fdbl) / 100
				} else if(_this.sfgdjg == 0 && _this.mmzt == 1) {
					_this.jyjg = _this.scj + _this.scj * Number(_this.fdbl) / 100
				}
				//				交易价格保留小数位
				var toFixedNum = Number(_this.jyjg).toFixed(2 + 1);
				_this.jyjg = toFixedNum.substring(0, toFixedNum.toString().length - 1);
				//					判断自动回复内容,如果为空就提交默认留言内容,否则提交用户输入内容
				if(_this.lynr == "") {
					_this.tjlynr = "0"
				} else {
					_this.tjlynr = _this.lynr
				}
				//				将高级认证和绑定手机号布尔值转化为数字提交
				if(_this.gjcheck == false) {
					_this.gjcheck = 0
				} else {
					_this.gjcheck = 1
				}
				if(_this.sjcheck == false) {
					_this.sjcheck = 0
				} else {
					_this.sjcheck = 1
				}
				//					   	提交编辑信息
				Axios.post(httpUrl.postputUrl, {
					pur_id: id,
					timeLimit: _this.fkqx,
					numLimit: _this.jycs,
					isCheck: _this.gjcheck,
					isMobile: _this.sjcheck,
					minTradeLimit: _this.minxe,
					maxTradeLimit: _this.maxxe,
					price: _this.jyjg,
					is_fixed: _this.sfgdjg,
					proportion: _this.tjfdbl,
					reply_text: _this.tjlynr,
					payPasswd: _this.gdzjmm
				}, {
					headers: {
						'Authorization': 'Bearer ' + _this.token
					}
				}).then(function(res) {
					if(res.data.status.code == 101) {
						_this.$message({
							showClose: true,
							message: _this.$t("fbjy.SubmitInforError"),
							type: 'warning',
							duration: 2000
						});
					} else if(res.data.status.code == 102) {
						_this.$message({
							showClose: true,
							message: _this.$t("fbjy.OrderExpired"),
							type: 'warning',
							duration: 2000
						});
					} else if(res.data.status.code == 103) {
						_this.$message({
							showClose: true,
							message: _this.$t("fbjy.PasswordError"),
							type: 'warning',
							duration: 2000
						});
					} else if(res.data.status.code == -500) {
						_this.$message({
							showClose: true,
							message: _this.$t("fbjy.SubmitInforError"),
							type: 'warning',
							duration: 2000
						});
					} else if(res.data.status.code == 200) {
						//						发布交易和修改挂单列表时切换不同按钮
						_this.isBj = true;
						//						   清空发布内容,恢复默认项,解除禁用状态
						_this.kjyfbgjId = "";
						_this.rmbid = "";
						_this.mmzt = 0;
						_this.gdbzId = "";
						_this.sfgdjg = 1;
						_this.isGd = true;
						_this.isCs = true;
						_this.gdjg = "";
						_this.fdbl = "";
						_this.rmbcode = "";
						_this.jysl = "";
						_this.minxe = 100;
						_this.maxxe = 100;
						_this.fkqx = 10;
						_this.lynr = "";
						_this.lynr = "";
						_this.jycs = 0;
						_this.gjcheck = 0;
						_this.sjcheck = 0;
						_this.gdzjmm = "";
						_this.gdInfo = "";
						_this.slInfo = "";
						_this.zxInfo = "";
						_this.zdInfo = "";
						_this.qxInfo = "";
						_this.gdmmInfo = "";
						_this.isDisabled = false
						_this.$message({
							showClose: true,
							message: _this.$t("fbjy.Submitsuccess"),
							type: 'success',
							duration: 2000
						});
						//             重新获取数据
						Axios.get(httpUrl.getgdlistUrl, {
							headers: {
								'Authorization': 'Bearer ' + _this.token
							}
						}).then(function(res) {
							//              获取挂单列表数据
							_this.gdList = res.data.data.data
							//				获取挂单列表条数
							_this.gdts = res.data.data.total
							//				获取挂单列表每页数量
							_this.gdmysl = res.data.data.per_page
						}).catch(function(err) {
							console.log("get挂单列表 err", err)
						})
					}
				}).catch(function(err) {
					console.log("挂单列表编辑 err", err)
				})

			},
			///////////挂单列表分页//////////
			gdfy(val) {
				let _this = this;
				_this.currencyCount = val; /*当前页数*/
				Axios.get(httpUrl.getgdlistUrl, {
					headers: {
						'Authorization': 'Bearer ' + _this.token
					},
					params: {
						"page": val
					}
				}).then(function(res) {
					_this.gdList = res.data.data.data
				}).catch(function(err) {
					console.log("get挂单列表分页 err", err)
				})
			},
			//////////////////挂单列表与进行中订单切换///////////////
			jxddTab(type, event) {
				let _this = this
				if(type == 0) {
					_this.isgdlb = true;
				} else {
					//					Axios.get(httpUrl.getjxzddUrl, {
					//						headers: {
					//							'Authorization': 'Bearer ' + _this.token
					//						},
					//					}).then(function(res) {
					//						if(res.data.status.code == 200) {
					//							_this.isgdlb = false;
					//							_this.jxddList = res.data.data.data
					//							//				获取进行中订单总条数
					//							_this.jxts = res.data.data.total
					//							//				获取进行中订单每页数量
					//							_this.jxmysl = res.data.data.per_page
					//						}
					//					}).catch(function(err) {
					//						console.log("get挂单列表分页 err", err)
					//					})
				}
				var gdlbtab_All = document.querySelectorAll(".gdlbtab");
				for(var i = 0; i < gdlbtab_All.length; i++) {
					if(this.getColor == 1) {
						gdlbtab_All[i].style.color = "#666";
						gdlbtab_All[i].style.borderBottom = "none";
					} else {
						gdlbtab_All[i].style.color = "#fff";
						gdlbtab_All[i].style.borderBottom = "none";
					}
				}
				if(this.getColor == 1) {
					event.currentTarget.style.color = "#2e2c46";
					event.currentTarget.style.borderBottom = "solid 2px #0f0b4e";
				} else {
					event.currentTarget.style.color = "#9f99f1";
					event.currentTarget.style.borderBottom = "solid 2px #9e98f2";
				}
			},
			///////////////点击进行中订单里面的订单号,将订单id存放本地存储,跳转到订单详情界面,订单详情页面获取id/////////////
			jxddly(ddId) {
				this,wdddly(ddId)
			},
			/////////////进行中订单分页/////////////
			jxddfy(val) {
				let _this = this
				Axios.get(httpUrl.getjxzddUrl, {
					headers: {
						'Authorization': 'Bearer ' + _this.token
					},
					params: {
						"page": val
					}
				}).then(function(res) {
					_this.jxddList = res.data.data.data
				}).catch(function(err) {
					console.log("get进行中订单分页 err", err)
				})
			}
		}
	}
</script>
<style lang="scss">
	#fbjy {
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
<style scoped lang="scss">
	/*完成率*/

	.Completion_rate {
		color: #bbb5ff;
	}
	/*标准版颜色*/

	.time_White {
		color: #8f8f8f !important;
		.second {
			color: #312e67 !important;
		}
	}
	/*容器背景*/

	body .qhbj-container {
		background: #e9f0f3;
	}
	/*切换标准版改变表格的tr颜色*/

	.qhbj-ddxqtit {
		border-bottom: 1px solid #DDD !important;
	}
	/*切换币种部分*/

	.container .qhbj-fbbz {
		background: #fff;
	}

	.container .qhbj-fbbz li {
		background: #fff;
		color: #333;
	}

	.container .qhbj-fbbz li:nth-child(1) {
		background: #f5f5f5;
	}
	/*标准版币种切换禁用状态时的样式*/

	.container .qhbj-fbbz .qhbj-bztabjy {
		cursor: not-allowed;
		background: #fff !important;
	}
	/*买入 卖出,挂单买卖切换部分*/

	.container .qhbj-mmddtab li {
		color: #333;
		background: #fff;
	}

	.container .qhbj-mmddtab li:nth-child(1) {
		background: #312e67;
		color: #fff;
	}

	.container .qhbj-mmddtab .col {
		background: #fff;
	}
	/*买卖列表头部*/

	.container .qhbj-mmtit {
		background: #fff;
		border-bottom: solid 1px #ddd;
	}

	.container .qhbj-mmtit div {
		color: #666;
		background: #fff;
	}
	/*买卖列表项*/

	.container .qhbj-mrList {
		/*border: solid 2px #ddd;*/
		border-top: none;
	}

	.container .qhbj-mrList ul {
		background: #fff;
	}

	.container .qhbj-mrcont {
		color: #262342;
	}

	.container .qhbj-mrList ul.qhbj-mrcont:hover {
		background: #f5f5f5;
	}

	.container .qhbj-mrList i:nth-child(1) {
		color: #25225f;
	}

	.container .qhbj-mrList i:nth-child(2) {
		color: #00a2ec;
	}

	.container .qhbj-mrList i:nth-child(3) {
		color: #54ad22;
	}
	/*订单切换 ,买卖分页部分*/

	.container .qhbj-btm {
		background: #fff !important;
		border-bottom: solid 2px #ddd !important;
	}

	.container .qhbj-ddTab div {
		color: #666;
	}

	.container .qhbj-ddTab div:nth-child(1) {
		color: #2e2c46;
		border-bottom: solid 2px #C9C9C9;
	}
	/*订单详情部分*/

	.container .qhbj-ddxq {
		background: #fff !important;
	}

	.container .qhbj-ddxq .ddxq-tit {
		color: #999;
	}

	.container .qhbj-ddxq .ddxqts p:nth-child(1) {
		color: #333;
	}

	.container .qhbj-ddxq .ddxqts p:nth-child(2) {
		color: #333;
	}

	.container .qhbj-ddxq .ddxq-cont {
		color: #333;
	}

	.container .qhbj-ddxq .ddh a {
		color: #333;
	}
	/*交易弹框共用部分*/

	.container .qhbj-jytkcon {
		background: #fff;
	}

	.container .qhbj-jytktit {
		border-bottom: solid 2px #ddd;
	}

	.container .qhbj-jytktit p {
		color: #333;
	}

	.container .qhbj-jytktit i {
		color: #333;
	}

	.container .qhbj-jytkjyjg {
		background: #f5f5f5;
	}

	.container .qhbj-jytkjyjg p {
		color: #666;
	}

	.container .qhbj-jytkjyjg .tkjg {
		color: #312e67;
	}

	.container .qhbj-dbxe {
		color: #666;
	}

	.container .qhbj-dbxe span {
		color: #333;
	}

	.container .qhbj-zhye {
		color: #666;
	}

	.container .qhbj-jytksl {
		color: #666;
	}

	.container .qhbj-jytksl .text {
		border: solid 1px #ccc;
	}

	.container .qhbj-jytksl .text input {
		color: #312e67;
		background: #fff;
	}

	.container .qhbj-jytksl .text span {
		border-left: solid 1px #ccc;
		color: #312e67;
	}

	.container .qhbj-jytkje {
		color: #666;
	}

	.container .qhbj-jytkje .text {
		border: solid 1px #ccc;
	}

	.container .qhbj-jytkje .text input {
		color: #312e67;
		background: #fff;
	}

	.container .qhbj-jytksl .text input::-webkit-input-placeholder {
		color: #999;
	}

	.container .qhbj-jytksl .text input:-moz-placeholder {
		color: #999;
	}

	.container .qhbj-jytksl .text input::-moz-placeholder {
		color: #999;
	}

	.container .qhbj-jytksl .text input:-ms-input-placeholder {
		color: #999;
	}

	.container .qhbj-jytkje .text input::-webkit-input-placeholder {
		color: #999;
	}

	.container .qhbj-jytkje .text input:-moz-placeholder {
		color: #999;
	}

	.container .qhbj-jytkje .text input::-moz-placeholder {
		color: #999;
	}

	.container .qhbj-jytkje .text input:-ms-input-placeholder {
		color: #999;
	}

	.container .qhbj-jytkje .text span {
		border-left: solid 1px #ccc;
		color: #312e67;
	}

	.container .qhbj-anniu {
		border-top: solid 1px #ddd;
	}

	.container .qhbj-anniu div {
		color: #666;
	}

	.container .qhbj-anniu div:nth-child(2) {
		background: #302f66;
		color: #fff;
	}
	/*卖出弹框部分*/

	.container .qhbj-mctkcon {
		background: #fff;
	}

	.container .qhbj-jytkzjmm .zjmm {
		color: #666;
	}

	.container .qhbj-jytkzjmm .zjtex {
		border: solid 1px #ccc;
	}

	.container .qhbj-jytkzjmm .zjtex input {
		color: #312e67;
		background: #fff;
	}

	.container .qhbj-jytkzjmm .zjtex input::-webkit-input-placeholder {
		color: #999;
	}

	.container .qhbj-jytkzjmm .zjtex input:-moz-placeholder {
		color: #999;
	}

	.container .qhbj-jytkzjmm .zjtex input::-moz-placeholder {
		color: #999;
	}

	.container .qhbj-jytkzjmm .zjtex input:-ms-input-placeholder {
		color: #999;
	}
	/*订单提醒弹框部分*/

	.container .qhbj-txtkcon {
		background: #fff;
	}

	.container .qhbj-txtktit {
		border-bottom: solid 2px #ddd;
	}

	.container .qhbj-txtktit p {
		color: #333;
	}

	.container .qhbj-txtktit i {
		color: #333;
	}

	.container .qhbj-txtkddtx {
		color: #333;
	}

	.container .qhbj-txtkddtx a {
		color: #312e67;
	}

	.container .qhbj-txtktxqr {
		border-top: solid 2px #ddd;
		background: #302f66;
	}

	.container .qhbj-txtktxqr a {
		color: #fff;
	}
	/*挂单买卖部分*/

	.container .qhbj-gdmm {
		border: solid 2px #ddd;
		background: #fff;
	}

	.container .qhbj-gdmm li {
		border-top: solid 1px #ddd;
	}

	.container .qhbj-gdmm li:nth-child(1) {
		border-top: none;
	}
	/*我在一栏*/

	.container .qhbj-wz div {
		color: #333;
	}
	/*共用input输入框样式*/

	.container .qhbj-gdinp .gdinp {
		background: #fff;
		color: #333;
	}
	/*价格一栏*/

	.container .qhbj-jiage div {
		color: #333;
	}

	.container .qhbj-gdinp {
		border: solid 1px #ddd;
	}

	.container .qhbj-gdinp input::-webkit-input-placeholder {
		color: #999;
	}

	.container .qhbj-gdinp input:-moz-placeholder {
		color: #999;
	}

	.container .qhbj-gdinp input::-moz-placeholder {
		color: #999;
	}

	.container .qhbj-gdinp input:-ms-input-placeholder {
		color: #999;
	}

	.container .qhbj-gdinp span {
		border-left: solid 1px #ddd;
	}

	.container .qhbj-scck p {
		color: #333;
	}
	/*交易限制一栏*/

	.container .qhbj-jyxzinp div {
		color: #333;
	}

	.container .qhbj-jyxzts p {
		color: #999;
	}
	/*支付方式一栏*/

	.container .qhbj-zffs {
		color: #333;
	}

	.container .qhbj-zffscont .dj {
		color: #302f66;
	}

	.container .qhbj-zffscont .zf {
		color: #333;
	}

	.container .qhbj-zffscont .zf i:nth-child(1) {
		color: #322f68;
	}

	.container .qhbj-zffscont .zf i:nth-child(2) {
		color: #54af26;
	}

	.container .qhbj-zffscont .zf i:nth-child(3) {
		color: #01a2e8;
	}

	.container .qhbj-zffscont .ys {
		color: #999;
	}

	.container .qhbj-zffscont p {
		color: #333;
	}
	/*自动回复一栏*/

	.container .qhbj-zdhf {
		color: #333;
	}

	.container .qhbj-zdhftex textarea {
		border: solid 1px #ddd;
		background: #fff;
		color: #666;
	}

	.container .qhbj-zdhftex p {
		color: #333;
	}
	/*交易限制对方一栏*/

	.container .qhbj-jyxzdf {
		color: #333;
	}

	.container .qhbj-num {
		border: solid 1px #ddd;
	}

	.container .qhbj-csinp {
		background: #fff;
		color: #333;
	}

	.container .qhbj-csjj {
		border-left: 1px solid #ddd;
	}

	.container .qhbj-csjj p:nth-child(1) {
		border-bottom: solid 1px #ddd;
	}

	.container .qhbj-gjrz {
		color: #666;
	}

	.container .qhbj-bdsjh {
		color: #666;
	}

	.container .qhbj-jyxzdfts {
		color: #666;
	}
	/*资金密码一栏*/

	.container .qhbj-zjmm {
		color: #333;
	}

	.container .qhbj-zjmmcont input {
		border: solid 1px #ddd;
		background: #fff;
		color: #333;
	}
	/*发布一栏*/

	.container .qhbj-fb {
		color: #333;
	}

	.container .qhbj-hk {
		border: solid 2px #ddd;
	}

	.container .qhbj-ty a {
		color: #302f66;
	}

	.container .qhbj-fbbtn button {
		color: #fff;
		background: #302f66;
	}

	.container .qhbj-gdfbt {
		color: #666;
	}
	/*挂单列表*/
	/*挂单列表头部分*/

	.container .qhbj-gdlbtit {
		background: #fff !important;
	}

	.container .qhbj-gdlbtit p {
		border-bottom: solid 2px #fafafa;
		color: #666;
	}

	.container .qhbj-gdlbtit p:nth-child(1) {
		color: #2e2c46;
		border-bottom: solid 2px #2e2c46;
	}
	/*挂单列表详情部分*/

	.container .qhbj-gdlbxq {
		background: #fff !important;
		border-top: solid 2px #4e4b71;
		color: #333;
	}
	/*挂单列表详情头部部分*/

	.container .qhbj-gdlbxqtit {
		color: #333;
	}
	/*挂单列表详情提示部分*/

	.container .qhbj-gdlbxq .gdts {
		color: #666;
	}
	/*挂单列表详情头部部分*/

	.container .qhbj-gdlbxqtit {
		color: #999;
	}
	/*挂单列表详情主体部分*/

	.container .qhbj-gdlbxqcont {
		color: #333;
	}

	.container .qhbj-gdlbxqcont .cz span {
		border: solid 1px #302F66;
		color: #333;
		background: #e9f0f3;
		border-radius: 3px;
	}

	.container .qhbj-gdlbxqcont td a {
		color: #333;
	}
	/*清浮动*/

	.clearfix:after {
		display: block;
		content: '';
		clear: both;
	}

	.clearfix {
		zoom: 1;
	}
	/*设置火狐浏览器下placeholder透明度为1*/

	input:-moz-placeholder,
	input::-moz-placeholder {
		opacity: 1;
	}
	/*主体部分*/

	.container {
		min-width: 1195px;
		height: 100%;
		padding-top: 20px;
	}
	/*币种*/

	.fb_bz {
		width: 220px;
		box-sizing: border-box;
		padding: 10px 10px;
		margin-left: 20px;
		float: left;
		border-radius: 5px;
		background: #16182c;
	}
	/*内部边框*/

	.border_nei {
		width: 100%;
		height: 100%;
		box-sizing: border-box;
		border: 3px solid #0b0b15;
	}

	.fb_bz li {
		height: 40px;
		line-height: 40px;
		font-size: 14px;
		background: #161726;
		color: #fff;
		padding-left: 22px;
		cursor: pointer;
	}

	.fb_bz li a {
		width: 100%;
		height: 100%;
		font-size: 14px;
		color: #fff;
		display: block;
		cursor: pointer;
	}

	.fb_bz li:nth-child(1) {
		border-top: none;
		background: #363864;
	}
	/*专业版币种切换禁用状态时的样式*/

	.fb_bz .bztabjy {
		cursor: not-allowed;
		background: #161726 !important;
	}
	/*买卖订单*/

	.mmdd {
		padding-left: 265px;
		padding-right: 20px;
		height: 100%;
	}
	/*买卖订单tab切换部分*/

	.mmddtab {
		height: 40px;
	}

	.mmddtab li {
		padding: 0 40px;
		height: 40px;
		line-height: 40px;
		float: left;
		font-size: 15px;
		color: #fff;
		cursor: pointer;
		background: #16182c;
	}

	.mmddtab li:nth-child(1) {
		background: #363864;
	}

	.mmddtab li:nth-child(3) {
		border-right: none;
	}
	/*买入/卖出 列表部分*/
	/*显示滚动条*/

	.mmlist {
		height: 500px;
		background: #16182c;
		overflow: auto;
	}

	.qhbj-mmlist {
		background: #fff !important;
		border-bottom: solid 2px #ddd !important;
	}
	/*买入/卖出 列表头部*/

	.mmtit {
		height: 50px;
		background: #16182c;
		border-bottom: 1px solid #2e3157;
		font-size: 13px;
	}

	.mmtit div {
		width: 100%;
		color: #fff;
	}

	.mmtit div li {
		height: 50px;
		line-height: 50px;
	}

	.mmtit div ul {
		height: 50px;
		line-height: 50px;
		display: flex;
		align-items: center;
		box-sizing: border-box;
		padding: 0 10px;
		li {
			flex: 1;
			text-align: center;
		}
		li:nth-of-type(5) {
			flex: 1.5;
		}
	}
	/*买入/卖出 列表主体部分*/

	.mrList {
		width: 100%;
		border: none;
		border-top: none;
		font-size: 13px;
	}

	.mrList tr {
		height: 50px;
		line-height: 50px;
		border-top: solid 1px #4d4a72;
		background: #161726;
	}

	.mrList tr:nth-child(1) {
		border-top: none;
	}

	.mrList tr td {
		white-space: nowrap;
		cursor: pointer;
	}

	.mrList-cont {
		font-size: 14px;
		color: #fff;
		width: 100%;
		height: 50px;
		display: flex;
		align-items: center;
		box-sizing: border-box;
		padding: 0 10px;
		li {
			flex: 1;
			text-align: center;
		}
		li:nth-of-type(5) {
			flex: 1.5;
		}
	}

	.mrList ul.mrList-cont:hover {
		background: #363864;
	}

	.mrList-cont i {
		font-size: 30px;
		padding: 0 5px;
		color: #fff;
	}

	.mr {
		display: inline-block;
		width: 115px;
		height: 30px;
		line-height: 30px;
		color: #4a9b5d;
		border: solid 1px #4a9b5d;
		border-radius: 5px;
		text-align: center;
		cursor: pointer;
	}

	.mr:hover {
		color: #fff;
		background: #4a9b5d;
	}

	.mrList-cont .mmanjy:hover {
		cursor: not-allowed;
	}
	/*订单切换++++分页*/

	.btm {
		height: 72px;
		background: #16182c;
		border-bottom: solid 2px #2e3157 !important;
	}
	/*订单切换tab*/

	.ddTab {
		height: 50px;
		margin-top: 20px;
		float: left;
	}

	.ddTab div {
		height: 50px;
		line-height: 50px;
		float: left;
		text-align: center;
		color: #fff;
		font-size: 16px;
		cursor: pointer;
	}

	.ddTab div:nth-child(1) {
		margin-left: 40px;
		color: #9d98f2;
		border-bottom: solid 2px #9e98f2;
	}

	.ddTab .mar-l {
		margin-left: 90px;
	}
	/*分页部分*/

	.fenye {
		margin-top: 28px;
		margin-right: 25px;
		float: right;
	}
	/*订单详情部分*/

	.ddxq {
		width: 100%;
		background: #16182c;
	}

	.ddxq tr {
		height: 40px;
		line-height: 40px;
	}

	.ddxq tr td {
		white-space: nowrap;
	}
	/*订单详情标题*/

	.ddxq .ddxq-tit {
		font-size: 14px;
		color: #46446d;
		border-bottom: 1px solid #2e3157;
	}

	.ddxq .ddxq-tit td:nth-child(1) {
		width: 18%;
		padding-left: 40px;
	}

	.ddxq .ddxq-tit td:nth-child(2) {
		width: 15%;
	}

	.ddxq .ddxq-tit td:nth-child(3) {
		width: 5%;
	}

	.ddxq .ddxq-tit td:nth-child(6) {
		width: 9%;
	}

	.ddxq .ddxq-tit td:nth-child(8) {
		width: 10%;
	}

	.ddxq .ddxq-tit td:nth-child(9) {
		width: 10%;
	}
	/*订单详情提示*/

	.ddxq .ddxqts {
		height: 110px;
		text-align: center;
	}

	.ddxq .ddxqts p:nth-child(1) {
		font-size: 20px;
		color: #fff;
	}

	.ddxq .ddxqts p:nth-child(2) {
		font-size: 15px;
		color: #fff;
	}
	/*订单详情主体*/

	.ddxq .ddxq-cont {
		font-size: 13px;
		color: #fff;
	}

	.ddxq .ddxq-cont .ddh {
		padding-left: 40px;
	}

	.ddxq .ddh a {
		color: #fff;
		cursor: pointer;
	}
	/*订单分页*/

	.ddfy-wrap {
		height: 65px;
	}

	.ddfy-inner {
		float: right;
		margin-right: 25px;
		margin-top: 20px;
	}
	/*挂单买卖*/

	.gdmm {
		overflow: auto;
		background: #16182c;
	}

	.gdmm li {
		font-size: 12px;
		border-top: solid 1px #2e3157;
	}

	.gdmm li:nth-child(1) {
		border-top: none;
	}
	/*共用下拉菜单和input输入框样式   默认宽度为小于1330分辨率下*/

	.gd-inp {
		margin-top: 10px;
		border: solid 2px #2a3472;
		border-radius: 5px;
	}

	.gd-inp input::-webkit-input-placeholder {
		color: #9a9ccf;
	}

	.gd-inp input:-moz-placeholder {
		color: #9a9ccf;
	}

	.gd-inp input::-moz-placeholder {
		color: #9a9ccf;
	}

	.gd-inp input:-ms-input-placeholder {
		color: #9a9ccf;
	}

	.gd-inp span {
		display: inline-block;
		width: 43px;
		height: 35px;
		line-height: 35px;
		text-align: center;
		border-left: solid 2px #2a3472;
		float: left;
	}

	.gdsel {
		width: 140px;
	}

	.gd-inp .gdinp {
		width: 82px;
		height: 35px;
		padding-left: 10px;
		background: #161523;
		color: #fff;
		float: left;
		border: none;
		outline: none;
	}
	/*我在一栏*/

	.wz {
		height: 110px;
		border-top: none;
	}

	.wz div {
		float: left;
		color: #fff;
	}

	.wztit,
	.jgtit {
		margin-left: 3.3%;
		margin-right: 4.7%;
		font-size: 16px;
	}

	.wztit {
		line-height: 110px;
	}

	.wz .yi {
		margin: 0 2.6%;
		line-height: 110px;
	}

	.wz .gj,
	.rmb,
	.cs,
	.btc {
		margin-top: 35px;
	}

	.wz .cs {
		margin-left: 6.8%;
	}

	.wz .btc {
		margin-left: 6.8%;
	}
	/*价格一栏*/

	.jiage {
		height: 128px;
	}

	.jgtit {
		margin-top: 60px;
	}

	.jiage div {
		float: left;
		color: #fff;
	}

	.jgsz p {
		margin-top: 28px;
	}

	.jgsz .szsel {
		margin-top: 10px;
	}

	.gd {
		margin-left: 6.1%;
		margin-right: 5.7%;
	}

	.bdtit {
		margin-top: 28px;
	}

	.jyjg {
		width: 77px;
		height: 127px;
		margin-right: 3%;
	}

	.jyjg p:nth-child(1) {
		margin-top: 28px;
	}

	.jyjg p:nth-child(2) {
		margin-top: 20px;
		font-size: 20px;
	}

	.jyjg p:nth-child(3) {
		margin-top: 20px;
		font-size: 20px;
	}

	.scck p {
		line-height: 25px;
		color: #9a9ccf;
	}

	.scck p:nth-child(1) {
		margin-top: 45px;
	}
	/*交易限制一栏*/

	.jyxz {
		height: 187px;
	}

	.jyxz-inp {
		height: 95px;
	}

	.jyxz-inp>div {
		float: left;
		color: #fff;
		position: relative;
	}

	.jyxztit {
		margin-top: 60px;
		margin-left: 3.3%;
		margin-right: 2.5%;
		font-size: 16px;
	}

	.inpjy {
		cursor: not-allowed;
	}

	.zxxe {
		margin-left: 6.2%;
	}

	.zdxe {
		margin-left: 7%;
	}

	.fkqx {
		margin-left: 7%;
	}

	.xzinfo {
		line-height: 15px;
		color: #f00;
		position: absolute;
		left: 0;
		top: 90px;
	}

	.jyxzts p {
		margin-left: 10.3%;
		height: 25px;
		line-height: 25px;
		color: #9a9ccf;
	}

	.jyxzts p:nth-child(1) {
		margin-top: 20px;
	}
	/*支付方式一栏*/

	.zffs {
		height: 190px;
		color: #fff;
	}

	.zffs div {
		float: left;
	}

	.zffstit {
		margin-top: 35px;
		margin-left: 3.3%;
		font-size: 16px;
	}

	.zffscont {
		margin-left: 2%;
	}

	.zffscont .dj {
		color: #fff;
		cursor: pointer;
		padding: 0 5px;
	}

	.zffscont .zf {
		color: #fff;
	}

	.zffscont p {
		height: 25px;
		line-height: 25px;
		color: #8e8fc0;
	}

	.zffscont p:nth-child(1) {
		margin-top: 25px;
	}
	/*自动回复一栏*/

	.zdhf {
		height: 208px;
		color: #fff;
	}

	.zdhftit {
		padding-top: 40px;
		margin-left: 3.3%;
		font-size: 16px;
		float: left;
	}

	.zdhftex {
		margin-left: 2%;
		margin-top: 25px;
		float: left;
	}

	.zdhftex textarea {
		width: 582px;
		height: 87px;
		padding: 15px;
		border: solid 2px #2b3676;
		background: #161523;
		color: #fff;
		border-radius: 5px;
		outline: none;
		resize: none;
	}

	.zdhftex p {
		margin-top: 15px;
		color: #9a9ccf;
	}
	/*交易限制对方一栏*/

	.jyxzdf {
		height: 203px;
		color: #fff;
	}

	.jyxzdftit {
		margin-top: 25px;
		margin-left: 3.3%;
		font-size: 16px;
		float: left;
	}

	.jyxzdfcont {
		margin-left: 2%;
		float: left;
	}

	.jybs {
		margin-top: 25px;
	}

	.csxz {
		height: 37px;
		margin-top: 20px;
	}

	.num {
		border: solid 2px #2a3472;
		border-radius: 5px;
		float: left;
	}

	.csinp {
		width: 82px;
		height: 35px;
		padding-left: 10px;
		background: #161523;
		color: #fff;
		float: left;
		border: none;
		outline: none;
	}

	.csjj {
		width: 43px;
		height: 35px;
		float: left;
		text-align: center;
		border-left: 1px solid #2a3472;
	}

	.csjj p {
		height: 17px;
		line-height: 17px;
		cursor: pointer;
	}

	.csjj p:nth-child(1) {
		height: 17px;
		border-bottom: solid 1px #2a3472;
	}

	.csjj .iconfont {
		font-size: 12px;
	}

	.csinfo {
		height: 35px;
		line-height: 35px;
		float: left;
		color: #f00;
		margin-left: 10px;
	}

	.gjrz,
	.bdsjh {
		margin-top: 16px;
		color: #8e8fc0;
	}

	.gjrz input {
		width: 12px;
		height: 12px;
		border: solid 1px #2a3472;
		margin-right: 10px;
	}

	.bdsjh input {
		width: 12px;
		height: 12px;
		border: solid 1px #2a3472;
		margin-right: 10px;
	}

	.gjrz span {
		cursor: pointer;
	}

	.bdsjh span {
		cursor: pointer;
	}

	.jyxzdfts {
		margin-top: 16px;
		color: #8e8fc0;
	}
	/*资金密码一栏*/

	.zjmm {
		height: 128px;
		color: #fff;
	}

	.zjmmtit {
		margin-left: 3.3%;
		margin-top: 25px;
		font-size: 16px;
		float: left;
	}

	.zjmmcont {
		margin-left: 2%;
		float: left;
	}

	.zjmmcont p {
		margin-top: 26px;
	}

	.zjmmcont input {
		width: 125px;
		height: 35px;
		margin-top: 20px;
		padding-left: 10px;
		border: solid 2px #2b3676;
		background: #161523;
		color: #fff;
		border-radius: 5px;
		outline: none;
	}

	.gdmminfo {
		margin-left: 10px;
		color: #f00;
	}
	/*发布一栏*/

	.fb {
		height: 150px;
		color: #fff;
	}

	.hk {
		width: 375px;
		height: 40px;
		margin-top: 30px;
		margin-left: 12.2%;
		border: solid 2px #2b3676;
		border-radius: 5px;
	}

	.ty {
		margin-top: 30px;
		margin-left: 12.2%;
	}

	.ty input {
		width: 12px;
		height: 12px;
		background: yellow;
		margin-right: 10px;
	}

	.ty input {
		width: 12px;
		height: 12px;
		background: yellow;
		margin-right: 10px;
	}

	.ty span {
		cursor: pointer;
	}

	.ty a {
		color: #9a9ccf;
	}

	.fbbtn {
		margin-top: 25px;
		margin-left: 12.2%;
	}

	.fbbtn button {
		width: 170px;
		height: 40px;
		border-radius: 5px;
		color: #fff;
		background: #6666fa;
		outline: none;
		border: none;
		cursor: pointer;
	}

	.fbbtn span {
		margin-left: 10px;
		color: #f00;
	}
	/*媒体查询 适用于1900以上分辨率*/

	@media only screen and (min-width: 1900px) {
		.gdmm .gdsel {
			width: 258px;
		}
		.gdmm .gdinp {
			width: 197px;
		}
		.gdmm .gd-inp .gdinp {
			padding-left: 15px;
		}
		.gdmm .csxz .csinp {
			padding-left: 15px;
			width: 197px;
		}
		.gdmm .zjmmcont input {
			width: 240px;
			padding-left: 15px;
		}
		.container .gdmm .gd {
			margin-left: 5.9%;
		}
		.container .gdmm .jyjg {
			margin-right: 13%;
		}
		.container .gdmm .zxxe {
			margin-left: 5.7%;
		}
		.container .gdmm .zdxe {
			margin-left: 6.9%;
		}
		.container .gdmm .fkqx {
			margin-left: 6.9%;
		}
		.container .gdmm .wz .btc {
			margin-left: 7.4%;
		}
		.container .gdmm .zffscont {
			margin-left: 2.6%;
		}
		.container .gdmm .zdhftex {
			margin-left: 2.6%;
		}
		.container .gdmm .jyxzdfcont {
			margin-left: 2.6%;
		}
		.container .gdmm .zjmmcont {
			margin-left: 2.6%;
		}
		.container .gdmm .hk {
			margin-left: 10.3%;
		}
		.container .gdmm .ty {
			margin-left: 10.3%;
		}
		.container .gdmm .fbbtn {
			margin-left: 10.3%;
		}
		.container .gdmm li {
			font-size: 14px !important;
		}
		/*挂单买卖字体大小*/
		.container .gdmm .gdli-tit {
			font-size: 18px;
		}
		.container .gdmm .jyjg p:nth-child(2) {
			font-size: 22px;
		}
		.container .gdmm .jyjg p:nth-child(3) {
			font-size: 22px;
		}
		/*挂单列表字体大小*/
		.container .gdlb .gdlbxq-tit {
			font-size: 16px;
		}
		.container .gdlb .gdlbxq-cont {
			font-size: 15px;
		}
		/*进行中订单列表头部字体大小*/
		.container .gdlb .jxddxq-tit {
			font-size: 16px;
		}
		/*买卖订单里面我的订单字体大小*/
		.container .ddxq .ddxq-tit {
			font-size: 16px;
		}
		.container .ddxq .ddxq-cont {
			font-size: 15px;
		}
	}
	/*适用于1600-1900分辨率*/

	@media only screen and (min-width: 1600px)and (max-width:1900px) {
		.gdmm .gdsel {
			width: 215px;
		}
		.gdmm .gdinp {
			width: 157px;
		}
		.gdmm .csxz .csinp {
			width: 157px;
		}
		.gdmm .zjmmcont input {
			width: 200px;
		}
		.container .gdmm .jyjg {
			margin-right: 7%;
		}
		.container .gdmm .zxxe {
			margin-left: 6%;
		}
		.container .gdmm .zdxe {
			margin-left: 6.6%;
		}
		.container .gdmm .hk {
			margin-left: 9.8%;
		}
		.container .gdmm .ty {
			margin-left: 9.8%;
		}
		.container .gdmm .fbbtn {
			margin-left: 9.8%;
		}
	}
	/*适用于1420-1600分辨率*/

	@media only screen and (min-width: 1420px)and (max-width:1600px) {
		.gdmm .gdsel {
			width: 178px;
		}
		.gdmm .gdinp {
			width: 125px;
		}
		.gdmm .csxz .csinp {
			width: 125px;
		}
		.gdmm .zjmmcont input {
			width: 165px;
		}
		.container .gdmm .wztit {
			margin-right: 5.2%;
		}
		.container .gdmm .jgtit {
			margin-right: 5.2%;
		}
		.container .gdmm .wz .cs {
			margin-left: 7.2%;
		}
		.container .gdmm .fkqx {
			margin-left: 7.9%;
		}
		.container .gdmm .wz .btc {
			margin-left: 8.2%;
		}
		.container .gdmm .jyjg {
			margin-right: 13%;
		}
		.container .gdmm .zxxe {
			margin-left: 5.8%;
		}
		.container .gdmm .fkqx {
			margin-left: 7.5%;
		}
		.container .gdmm .jyxzts p {
			margin-left: 11.2%;
		}
		.container .gdmm .zffscont {
			margin-left: 2.6%;
		}
		.container .gdmm .zdhftex {
			margin-left: 2.6%;
		}
		.container .gdmm .jyxzdfcont {
			margin-left: 2.6%;
		}
		.container .gdmm .zjmmcont {
			margin-left: 2.6%;
		}
		.container .gdmm .hk {
			margin-left: 10.7%;
		}
		.container .gdmm .ty {
			margin-left: 10.7%;
		}
		.container .gdmm .fbbtn {
			margin-left: 10.7%;
		}
	}
	/*适用于1330-1420分辨率*/

	@media only screen and (min-width: 1330px) and (max-width:1420px) {
		.gdmm .gdsel {
			width: 162px;
		}
		.gdmm .gdinp {
			width: 104px;
		}
		.gdmm .csxz .csinp {
			width: 104px;
		}
		.gdmm .zjmmcont input {
			width: 150px;
		}
		.container .gdmm .wztit {
			margin-right: 5.4%;
		}
		.container .gdmm .jgtit {
			margin-right: 5.4%;
		}
		.gdmm .gd {
			margin-right: 2%;
		}
		.container .gdmm .jyjg {
			margin-right: 14%;
		}
		.container .gdmm .zxxe {
			margin-left: 6.1%;
		}
		.container .gdmm .fkqx {
			margin-left: 7.3%;
		}
		.container .gdmm .wz .btc {
			margin-left: 7.3%;
		}
		.container .gdmm .jyxzts {
			margin-left: 1.5%;
		}
		.container .gdmm .hk {
			margin-left: 10.6%;
		}
		.container .gdmm .ty {
			margin-left: 10.6%;
		}
		.container .gdmm .fbbtn {
			margin-left: 10.6%;
		}
	}
	/*适用于小于1330分辨率*/

	@media only screen and (max-width: 1330px) {
		.container .gdmm .wz .yi {
			margin: 0 2.9%;
		}
		.container .gdmm .wz .cs {
			margin-left: 8.5%;
		}
		.container .gdmm .wz .btc {
			margin-left: 7.5%;
		}
		.container .gdmm .jyxztit {
			margin-right: 1.5%;
		}
		.container .gdmm .gd {
			margin-left: 7%;
			margin-right: 2%;
		}
		.container .gdmm .jyjg {
			margin-right: 9%;
			font-size: 12px;
		}
		.container .gdmm .jyjg p:nth-child(2) {
			font-size: 14px;
		}
		.container .gdmm .jyjg p:nth-child(3) {
			font-size: 14px;
		}
		.container .gdmm .zxxe {
			margin-left: 6.9%;
		}
		.container .gdmm .zdxe {
			margin-left: 8.5%;
		}
		.container .gdmm .fkqx {
			margin-left: 7.9%;
		}
		.container .gdmm .wz .btc {
			margin-left: 7.9%;
		}
		.container .gdmm .jyxzts p {
			margin-left: 11.2%;
		}
	}
	/*挂单列表*/
	/*挂单列表头部分*/

	.gdlb {
		width: 100%;
		background: #16182c;
	}

	.gdlb-tit {
		width: 100%;
		height: 80px;
	}

	.gdlb-tit p {
		width: 80px;
		height: 60px;
		line-height: 60px;
		text-align: center;
		margin: 18px 40px 0;
		font-size: 16px;
		color: #fff;
		float: left;
		cursor: pointer;
	}

	.gdlb-tit p:nth-child(1) {
		border-bottom: solid 2px #9d98f2;
		color: #9d98f2;
	}
	/*挂单列表详情部分*/

	.gdlbxq {
		width: 100%;
		border-top: solid 2px #33304e;
		color: #fff;
	}

	.gdlbxq tr {
		height: 40px;
		line-height: 40px;
	}
	/*挂单列表详情头部部分*/

	.gdlbxq-tit {
		display: flex;
		line-height: 50px;
		font-size: 14px;
		color: #46446d;
	}

	.gdlbxq-tit li:nth-child(1) {
		flex: .9;
		padding-left: 40px;
	}

	.gdlbxq-tit li:nth-child(2) {
		flex: .5;
	}
  .gdlbxq-tit li:nth-child(3) {
    flex: .5;
    text-align: center;
  }
  .gdlbxq-tit li:nth-child(4) {
    flex: .35;
    text-align: center;
  }
  .gdlbxq-tit li:nth-child(4) {
    flex: .5;
  }
  .gdlbxq-tit li:nth-child(5) {
    flex: .5;
  }
	.gdlbxq-tit li:nth-child(6) {
		flex: .5;
	}

	.gdlbxq-tit li:nth-child(7) {
		flex: .5;
	}

	.gdlbxq-tit li:last-child {
		flex: .5;
	}
	/*进行中订单头部部分*/

	.jxddxq-tit {
		font-size: 14px;
		color: #46446d;
	}

	.jxddxq-tit td:nth-child(1) {
		width: 23%;
		padding-left: 40px;
	}

	.jxddxq-tit td:nth-child(2) {
		width: 16%;
	}

	.jxddxq-tit td:nth-child(3) {
		width: 10%;
	}

	.jxddxq-tit td:nth-child(4) {
		width: 10%;
	}

	.jxddxq-tit td:nth-child(5) {
		width: 10%;
	}

	.jxddxq-tit td:nth-child(6) {
		width: 10%;
	}

	.jxddxq-tit td:nth-child(7) {
		width: 15%;
	}
	/*挂单列表详情提示*/

	.gdlbxq .gdts {
		height: 110px;
		text-align: center;
		color: #fff;
	}

	.gdlbxq .gdts p:nth-child(1) {
		font-size: 20px;
	}

	.gdlbxq .gdts p:nth-child(2) {
		font-size: 15px;
	}
	/*挂单列表详情主体部分*/

	.gdlbxq-cont {
		@extend .gdlbxq-tit;
		font-size: 13px;
		color: #fff;
	}

	.gdlbxq-cont li:nth-of-type(1) {
		padding-left: 40px;
	}

	.gdlbxq-cont .cz span {
		display: inline-block;
		min-width: 45px;
		height: 30px;
		line-height: 25px;
		text-align: center;
		margin-right: 10px;
		border: solid 2px #2b3676;
		border-radius: 5px;
		box-sizing: border-box;
		padding: 0 10px;
		color: #fff;
		background: #171625;
		cursor: pointer;
	}

	.gdlb_white {
		background: #fff !important;
	}

	.gdlbxq-cont li a {
		color: #fff;
		cursor: pointer;
	}
	/*挂单列表分页*/

	.gdfy-wrap {
		height: 65px;
	}

	.gdfy-inner {
		float: right;
		margin-right: 25px;
		margin-top: 20px;
	}
	/*交易弹框部分
          买入卖出弹框共用部分媒体查询高度小于700px*/

	@media only screen and (max-height: 700px) {
		.jytk-content {
			width: 375px !important;
			height: 349px !important;
			margin-left: -187px !important;
			margin-top: -174px !important;
		}
		.jytk-tit {
			width: 330px !important;
			height: 45px !important;
			line-height: 45px !important;
		}
		.jytk-tit p {
			font-size: 11px !important;
		}
		.jytk-tit i {
			font-size: 12px !important;
		}
		.jytk-jyjg {
			width: 330px !important;
			height: 50px !important;
			margin: 20px auto !important;
		}
		.jytk-jyjg p {
			height: 25px !important;
			line-height: 25px !important;
			font-size: 10px !important;
		}
		.dbxe {
			width: 330px !important;
			height: 25px !important;
			line-height: 25px !important;
			font-size: 10px !important;
		}
		.zhye {
			width: 330px !important;
			font-size: 10px !important;
		}
		.dbxe span {
			margin-left: 30px !important;
		}
		.jytk-sl {
			width: 330px !important;
			height: 32px !important;
			line-height: 32px !important;
			font-size: 10px !important;
		}
		.jytk-sl .text {
			width: 260px !important;
			height: 30px !important;
			line-height: 30px !important;
		}
		.jytk-sl .text input {
			width: 205px !important;
			height: 25px !important;
			padding-left: 10px !important;
		}
		.jytk-sl .text span {
			width: 44px !important;
			height: 23px !important;
			line-height: 23px !important;
			font-size: 10px !important;
		}
		.sl-info {
			width: 330px !important;
			height: 25px !important;
		}
		.sl-info p {
			line-height: 25px !important;
			margin-left: 70px !important;
			font-size: 10px !important;
		}
		.jytk-je {
			width: 330px !important;
			height: 32px !important;
			line-height: 32px !important;
			font-size: 10px !important;
		}
		.jytk-je .text {
			width: 260px !important;
			height: 30px !important;
			line-height: 30px !important;
		}
		.jytk-je .text input {
			width: 205px !important;
			height: 25px !important;
			padding-left: 10px !important;
		}
		.jytk-je .text span {
			width: 44px !important;
			height: 23px !important;
			line-height: 23px !important;
			font-size: 10px !important;
		}
		.je-info {
			width: 330px !important;
		}
		.je-info p {
			margin-left: 70px !important;
			font-size: 10px !important;
		}
		.anniu {
			height: 50px !important;
			line-height: 50px !important;
			margin-top: 10px !important;
		}
		.anniu div {
			width: 187px !important;
			font-size: 12px !important;
		}
	}
	/*买入卖出弹框共用部分*/

	.jytk {
		width: 100%;
		height: 100%;
		position: fixed;
		left: 0;
		top: 0;
	}

	.jytk-mengbu {
		width: 100%;
		height: 100%;
		background: rgba(0, 0, 0, 0.6);
	}

	.jytk-content {
		width: 440px;
		height: 458px;
		position: absolute;
		left: 50%;
		top: 50%;
		margin-left: -220px;
		margin-top: -223px;
		background: #22223f;
		border-radius: 5px;
	}

	.jytk-tit {
		width: 390px;
		height: 70px;
		line-height: 70px;
		margin: auto;
		border-bottom: solid 2px #3c3b5e;
	}

	.jytk-tit p {
		float: left;
		font-size: 16px;
		color: #fff;
	}

	.jytk-tit .time {
		font-size: 12px;
		margin-left: 10px;
		color: #c0c0ff;
		.second {
			color: #fff;
			margin: 0 5px;
		}
	}

	.jytk-tit i {
		font-size: 16px;
		float: right;
		color: #fff;
		display: inline-block;
		cursor: pointer;
	}

	.jytk-jyjg {
		width: 390px;
		height: 70px;
		background: #2b2c5b;
		margin: 25px auto;
	}

	.jytk-jyjg p {
		height: 35px;
		line-height: 35px;
		text-align: center;
		color: #fff;
		font-size: 15px;
	}

	.jytk-jyjg .tkjg {
		font-size: 18px;
	}

	.dbxe {
		width: 390px;
		height: 35px;
		margin: auto;
		line-height: 35px;
		font-size: 14px;
		color: #fff;
	}

	.dbxe span {
		margin-left: 40px;
	}

	.zhye {
		width: 390px;
		height: 15px;
		margin: auto;
		line-height: 15px;
		font-size: 13px;
		color: #fff;
	}

	.zhye p {
		float: right;
	}

	.jytk-sl {
		width: 390px;
		height: 42px;
		line-height: 42px;
		margin: auto;
		margin-top: 10px;
		color: #fff;
	}

	.jytk-sl .sl {
		float: left;
	}

	.jytk-sl .text {
		width: 305px;
		height: 42px;
		line-height: 40px;
		float: right;
		border: solid 1px #3b3c53;
		border-radius: 5px;
	}

	.jytk-sl .text input {
		width: 240px;
		height: 38px;
		padding-left: 15px;
		font-size: 14px;
		font-weight: 600;
		color: #fff;
		outline: none;
		border: none;
		background: #22223f;
	}

	.jytk-sl .text span {
		width: 45px;
		height: 34px;
		line-height: 34px;
		font-size: 14px;
		border-left: solid 1px #3b3c53;
		display: inline-block;
		text-align: center;
		cursor: pointer;
	}

	.sl-info {
		width: 390px;
		height: 25px;
		margin: auto;
	}

	.sl-info p {
		line-height: 25px;
		margin-left: 100px;
		font-size: 14px;
		color: #f00;
	}

	.jytk-je {
		width: 390px;
		height: 42px;
		line-height: 42px;
		margin: auto;
		color: #fff;
	}

	.jytk-je .je {
		float: left;
	}

	.jytk-je .text {
		width: 305px;
		height: 42px;
		line-height: 40px;
		float: right;
		border: solid 1px #3b3c53;
		border-radius: 5px;
	}

	.jytk-je .text input {
		width: 240px;
		height: 38px;
		padding-left: 15px;
		font-size: 14px;
		color: #fff;
		font-weight: 600;
		outline: none;
		border: none;
		background: #22223f;
	}

	.jytk-sl .text input::-webkit-input-placeholder {
		color: #fff;
	}

	.jytk-sl .text input:-moz-placeholder {
		color: #fff;
	}

	.jytk-sl .text input::-moz-placeholder {
		color: #fff;
	}

	.jytk-sl .text input:-ms-input-placeholder {
		color: #fff;
	}

	.jytk-je .text input::-webkit-input-placeholder {
		color: #fff;
	}

	.jytk-je .text input:-moz-placeholder {
		color: #fff;
	}

	.jytk-je .text input::-moz-placeholder {
		color: #fff;
	}

	.jytk-je .text input:-ms-input-placeholder {
		color: #fff;
	}

	.jytk-je .text span {
		width: 45px;
		height: 34px;
		line-height: 34px;
		font-size: 14px;
		border-left: solid 1px #3b3c53;
		font-size: #fff;
		display: inline-block;
		text-align: center;
		cursor: pointer;
	}

	.je-info {
		width: 390px;
		height: 25px;
		margin: auto;
	}

	.je-info p {
		line-height: 25px;
		margin-left: 100px;
		font-size: 14px;
		color: #f00;
	}

	.anniu {
		width: 100%;
		height: 55px;
		line-height: 55px;
		margin-top: 30px;
		border-top: solid 2px #3c3b5e;
		position: absolute;
		left: 0;
		bottom: 0;
	}

	.anniu div {
		width: 219.5px;
		color: #fff;
		font-size: 16px;
		text-align: center;
		cursor: pointer;
		float: left;
	}

	.anniu div:nth-child(1) {
		border-right: solid 1px #3c3b5e;
	}
	/*卖出弹框
	 卖出弹框媒体查询高度小于700px*/

	@media only screen and (max-height:700px) {
		.mctk-content {
			width: 375px !important;
			height: 405px !important;
			margin-left: -187px !important;
			margin-top: -202px !important;
		}
		.jytk-zjmm {
			width: 330px !important;
			height: 32px !important;
			line-height: 32px !important;
			font-size: 10px !important;
		}
		.jytk-zjmm .zjmm {
			height: 32px !important;
		}
		.jytk-zjmm .zjtex {
			width: 260px !important;
			height: 30px !important;
			line-height: 30px !important;
		}
		.jytk-zjmm .zjtex input {
			width: 205px !important;
			height: 25px !important;
			padding-left: 10px !important;
		}
		.zjmm-info {
			width: 330px !important;
			height: 25px !important;
		}
		.zjmm-info p {
			line-height: 25px !important;
			margin-left: 70px !important;
			font-size: 10px !important;
		}
	}
	/*卖出弹框*/

	.mctk-content {
		width: 440px;
		height: 525px;
		position: absolute;
		left: 50%;
		top: 50%;
		margin-left: -220px;
		margin-top: -257px;
		background: #22223f;
		border-radius: 5px;
	}

	.jytk-zjmm {
		width: 390px;
		height: 42px;
		line-height: 42px;
		margin: auto;
		color: #fff;
	}

	.jytk-zjmm .zjmm {
		height: 42px;
		float: left;
	}

	.jytk-zjmm .zjtex {
		width: 305px;
		height: 40px;
		line-height: 40px;
		float: right;
		border: solid 1px #3b3c53;
		border-radius: 5px;
	}

	.jytk-zjmm .zjtex input {
		width: 240px;
		height: 38px;
		padding-left: 15px;
		font-size: 14px;
		color: #fff;
		font-weight: 600;
		outline: none;
		border: none;
		background: #22223f;
	}

	.jytk-zjmm .zjtex input::-webkit-input-placeholder {
		color: #fff;
	}

	.jytk-zjmm .zjtex input:-moz-placeholder {
		color: #fff;
	}

	.jytk-zjmm .zjtex input::-moz-placeholder {
		color: #fff;
	}

	.jytk-zjmm .zjtex input:-ms-input-placeholder {
		color: #fff;
	}

	.zjmm-info {
		width: 390px;
		height: 25px;
		margin: auto;
	}

	.zjmm-info p {
		line-height: 25px;
		margin-left: 100px;
		font-size: 14px;
		color: #f00;
	}
	/*订单提醒弹框*/

	.txtk {
		width: 100%;
		height: 100%;
		position: fixed;
		left: 0;
		top: 0;
		z-index: 99;
	}

	.txtk-mengbu {
		width: 100%;
		height: 100%;
		background: rgba(0, 0, 0, 0.6);
	}

	.txtk-content {
		width: 480px;
		height: 250px;
		position: absolute;
		left: 50%;
		top: 50%;
		margin-left: -240px;
		margin-top: -125px;
		background: #22223f;
		border-radius: 5px;
	}

	.txtk-tit {
		width: 420px;
		height: 65px;
		line-height: 65px;
		margin: auto;
		border-bottom: solid 2px #3c3b5e;
	}

	.txtk-tit p {
		float: left;
		font-size: 16px;
		color: #fff;
	}

	.txtk-tit i {
		font-size: 16px;
		float: right;
		color: #fff;
		display: inline-block;
		cursor: pointer;
	}

	.ddtx {
		width: 420px;
		height: 115px;
		line-height: 115px;
		text-align: center;
		color: #fff;
		font-size: 18px;
	}

	.ddtx a {
		color: #7478e9;
	}

	.txqr {
		width: 100%;
		height: 66px;
		line-height: 66px;
		border-top: solid 2px #3c3b5e;
		text-align: center;
		color: #fff;
		cursor: pointer;
		position: absolute;
		left: 0;
		bottom: 0;
	}

	.txqr a {
		display: block;
		width: 100%;
		height: 66px;
		color: #fff;
	}
	/*判断用户是否输入了身份证*/

	.force {
		width: 100%;
		height: 100%;
		position: fixed;
		left: 0;
		top: 0;
		background-color: rgba(0, 0, 0, 0.5);
		.force-content {
			width: 100%;
			height: 100%;
			position: relative;
			.force-text {
				width: 475px;
				height: 255px;
				position: absolute;
				left: 35%;
				top: 20%;
				color: #fff;
				background: #22223f;
				/*头部内容*/
				.force-title {
					width: 100%;
					height: 55px;
					line-height: 55px;
					border-bottom: 1px solid #4e4a76;
					span {
						float: left;
						margin-left: 20px;
						font-size: 16px;
					}
					.iconfont {
						float: right;
						margin-right: 20px;
						cursor: pointer;
					}
				}
				/*实名认证中间内容*/
				.force_content {
					width: 100%;
					height: 145px;
					line-height: 30px;
					text-align: center;
					padding: 45px 10px 0 10px;
					box-sizing: border-box;
					font-size: 17px;
					border-bottom: 1px solid #4e4a76;
					text-indent: 2em;
					.renz {
						color: #7478e9;
						cursor: pointer;
						margin-left: 10px;
					}
				}
				/*确认按钮和取消按钮部分*/
				.confirm-cancel {
					width: 100%;
					height: 54px;
					line-height: 54px;
					font-size: 16px;
					p {
						width: 50%;
						text-align: center;
						float: left;
						box-sizing: border-box;
						cursor: pointer;
					}
					p:nth-of-type(1) {
						border-right: 1px solid #4e4a76;
					}
				}
			}
		}
	}
	/*标准版判断用户是否输入了身份证*/

	.qhbj-force {
		background-color: rgba(0, 0, 0, 0.5);
		.qhbj-forcecon {
			.qhbj-forcetext {
				color: #333;
				background: #fff;
				/*头部内容*/
				.qhbj-forcetit {
					border-bottom: 1px solid #ddd;
				}
				/*实名认证中间内容*/
				.qhbj_forcecon {
					border-bottom: 1px solid #ddd;
					.qhbj-renz {
						color: #312e67;
					}
				}
				/*确认按钮和取消按钮部分*/
				.qhbj-confirmcancel {
					p:nth-of-type(1) {
						border-right: 1px solid #ddd;
					}
					p:nth-of-type(2) {
						background: #302f66;
						color: #fff;
					}
				}
			}
		}
	}
</style>

<style>
	/*挂单买卖表单样式*/

	.gdmm .el-input__inner {
		background: #161523;
		color: #fff;
		border: solid 2px #2a3472;
		outline: none;
	}

	.gdmm .el-input__inner:hover {
		border: solid 2px #2a3472;
	}

	.gdmm .el-select .el-input .el-select__caret {
		color: #fff;
	}

	.el-input.is-disabled .el-input__inner {
		background-color: #161523;
		border-color: #2a3472;
		color: #fff;
	}
	/*刷新按钮样式*/

	.zffscont .el-button {
		width: 80px;
		height: 30px;
		margin-top: 10px;
		color: #2b3b98;
		padding: 0;
		font-weight: 600;
	}

	.zffscont .el-button span {
		font-size: 15px;
		font-weight: 600;
	}
	/*分页样式*/

	.el-pagination.is-background .el-pager li:not(.disabled).active {
		background-color: #9f99f2;
		color: #161726;
	}

	.container .qhbj-fenye .el-pagination.is-background .btn-next,
	.el-pagination.is-background .btn-prev,
	.el-pagination.is-background .el-pager li {
		background-color: #161726;
		color: #fff;
		border: solid 1px #fff;
	}

	.el-pagination.is-background .el-pager li:not(.disabled):hover {
		color: #161726;
	}
	/*分页标准版样式*/

	.container .qhbj-fenye .el-pagination.is-background .el-pager li:not(.disabled).active {
		background-color: #4e4b71;
		color: #fff;
	}

	.container .qhbj-fenye .el-pagination.is-background .btn-next,
	.el-pagination.is-background .btn-prev,
	.el-pagination.is-background .el-pager li {
		background-color: #fff;
		color: #333;
		border: solid 1px #ddd;
	}
	/*挂单买卖标准版表单样式*/
	/*下拉菜单样式*/

	.container .qhbj-gdmm .el-input__inner {
		background: #fff;
		color: #333;
		border: solid 1px #ddd;
		outline: none;
		box-shadow: none;
	}

	.container .qhbj-gdmm .el-input__inner:hover {
		border: solid 1px #ddd;
	}

	.container .qhbj-gdmm.gdmm .el-select .el-input .el-select__caret {
		color: #333;
	}

	.container .qhbj-gdmm .qhbj-gdinp .el-input__inner {
		border: none;
	}
	/*刷新按钮样式*/

	.container .qhbj-zffscont .el-button {
		color: #333;
		border: solid 1px #ddd;
	}

	.container .qhbj-zffscont .el-button span {
		font-size: 15px;
		font-weight: 600;
	}
</style>
