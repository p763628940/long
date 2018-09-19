<template>
	<!--订单详情主体部分-->
	<div class="container" :class="{'qhbj-container':getColor==1}">
		<!--loading-->
		<div v-show="loadingIsShow">
			<loading></loading>
		</div>

		<!--上部信息部分-->
		<div class="xinxi clearfix">
			<!--上部左侧订单支付部分-->
			<div class="ddzf clearfix" :class="{'qhbj-ddzf':getColor==1}">
				<div class="ddltb clearfix" :class="{'qhbj-ddltb':getColor==1}">
					<p><span v-if="ismj">{{$t("list.Buy_BTC")}}</span><span v-if="!ismj">{{$t("list.Sell_BTC")}}</span><span>{{bz}}</span></p>
					<p>{{$t("otc.OrderNumber")}}:<span>{{ddxq.orderId}}</span></p>
					<p v-show="dfk">{{$t("fbjy.WaitingPayment")}}:<span>{{dfkdjs}}</span></p>
				</div>
				<!--卖家收款方式-->
				<div class="xx" :class="{'qhbj-xx':getColor==1}">
					<div class="yinhangka" @mouseover="hr($event)" @mouseout="hc($event)">
						<div class="yhk" v-for="(item,index) in ddxq.bankInfo" v-if="item.bankType==0" v-show="yhkxx">
							<div>
								<h5><i class="iconfont icon-iconfontjikediancanicon20"></i><span>{{item.bankName}}</span>&nbsp;<span>{{OtherPartyName}}</span></h5>
								<p>{{item.bankNumber}}</p>
								<p>{{item.bankAddress}}</p>
							</div>
						</div>
						<div class="yhk" v-show="wtjyhk">
							<h5><i class="iconfont icon-iconfontjikediancanicon20"></i>{{$t("fbjy.NotAddedBank")}}</h5>
						</div>
						<div class="ddqx" v-show="isDdqxts">
							<h6>{{$t("fbjy.OrderCanceled")}}</h6>
						</div>
					</div>

					<div class="weixin" @mouseover="hr($event)" @mouseout="hc($event)">
						<div class="wx" v-for="(item,index) in ddxq.bankInfo" v-if="item.bankType==1" v-show="wxxx">
							<div>
								<h5><i class="iconfont icon-weixin"></i><span>{{item.bankName}}</span>&nbsp;<span>{{OtherPartyName}}</span></h5>
								<p class="clearfix">
									<span class="number">{{item.bankNumber}}</span>
									<span class="ewm"><img :src="item.qrCode" @mouseover="hr($event,item.bankType)" @mouseout="hc($event,item.bankType)"/></span>
								</p>
							</div>
						</div>
						<div class="wx" v-show="wtjwx">
							<h5><i class="iconfont icon-weixin"></i>{{$t("fbjy.NotAddedWeChat")}}</h5>
						</div>
						<div class="ddqx" v-show="isDdqxts">
							<h6>{{$t("fbjy.OrderCanceled")}}</h6>
						</div>
					</div>
					<div class="zhifubao" @mouseover="hr($event)" @mouseout="hc($event)">
						<div class="zfb" v-for="(item,index) in ddxq.bankInfo" v-if="item.bankType==2" v-show="zfbxx">
							<div>
								<h5><i class="iconfont icon-zhifubao"></i><span>{{item.bankName}}</span>&nbsp;<span>{{OtherPartyName}}</span></h5>
								<p class="clearfix">
									<span class="number">{{item.bankNumber}}</span>
									<span class="ewm"><img :src="item.qrCode" @mouseover="hr($event,item.bankType)" @mouseout="hc($event,item.bankType)"/></span>
								</p>
							</div>
						</div>
						<div class="zfb" v-show="wtjzfb">
							<h5><i class="iconfont icon-zhifubao"></i>{{$t("fbjy.NotAddedAlipay")}}</h5>
						</div>
						<div class="ddqx" v-show="isDdqxts">
							<h6>{{$t("fbjy.OrderCanceled")}}</h6>
						</div>
					</div>
				</div>
				<!--交易金额、价格、数量-->
				<div class="je" :class="{'qhbj-je':getColor==1}">
					<div class="jyje">
						<h6>{{$t("fbjy.TransactionNum")}}:</h6>
						<p><span>{{ddxq.success_price}}</span>{{legal.code}}</p>
					</div>
					<div class="dd-sl">
						<h6>{{$t("list.Number")}}:</h6>
						<p><span>{{ddxq.balance | number(jyslws)}}</span>{{bz}}</p>
					</div>
					<div class="jg">
						<h6>{{$t("list.Price")}}:</h6>
						<p><span>{{ddxq.price}}</span>{{legal.code}}/{{bz}}</p>
					</div>
				</div>
				<!--点击付款以及取消交易-->
				<div class="fk" :class="{'qhbj-fk':getColor==1}">
					<div class="fk-t" :class="{'qhbj-fkt':getColor==1}">
						<p>{{$t("fbjy.PaymentReferenceNum")}}</p>
						<p>{{ddxq.reference_num}}</p>
						<p class="sskl clearfix" v-if="ssz"><i class="iconfont icon-icon"></i><span>{{$t("otc.Complaint")}} {{$t("fbjy.AppealPassword")}}  {{sskl}}</span></p>
					</div>
					<div class="fk-b" :class="{'qhbj-fkb':getColor==1}">
						<p class="fkckh">{{$t("fbjy.ConfirmsPayment")}}</p>
						<p class="jycg" v-if="isJycg">{{$t("fbjy.Congratulations")}}</p>
						<div class="fkbtn" :class="{'qhbj-fkbtn':getColor==1}">
							<button type="button" class="wyfk" v-if="wyfkan" @click="isQrfk=!isQrfk">{{$t("fbjy.HavePaid")}}</button>
							<button type="button" class="qxjy" v-if="qxjyan" @click="qxjy">{{$t("fbjy.CancelTransaction")}}</button>
							<button type="button" class="wyfk" v-if="qxddan" @click="isQxdd=!isQxdd">{{$t("fbjy.CancelTransaction")}}</button>
							<button type="button" class="qxjy" v-if="wyssan" @click="isSs=!isSs;appeal()">{{$t("fbjy.Appeal")}}</button>
							<button type="button" class="wyfk" v-if="qxssan" @click="qxss()" :class="{'qxssanjy':userId!=yhId}">{{$t("fbjy.CancelAppeal")}}</button>
							<button type="button" class="wyfk qrfx" v-if="qrfxan" @click="isQrfx=!isQrfx" :class="{'fxactive':isfx}" :disabled="isFxdisa">{{$t("fbjy.ConfirmFang")}}</button>
						</div>
						<!--提示框-->
						<div class="fktsk" v-if="wyfkan" :class="{'qhbj-fktsk':getColor==1}">
							<div class="arrow-fkts" :class="{'qhbj-arrowfkts':getColor==1}"><em></em><span></span></div>
              {{$t("fbjy.AfterSuccessPayment")}}
						</div>
						<div class="fxtsk" v-if="fkwctsk" :class="{'qhbj-fxtsk':getColor==1}">
							<div class="arrow-fkts" :class="{'qhbj-arrowfkts':getColor==1}"><em></em><span></span></div>
              {{$t("fbjy.ReleaseDigital")}}
						</div>
					</div>
				</div>
				<!--微信二维码部分-->
				<div class="wxewm" v-show="isWxewm" v-for="(item,index) in ddxq.bankInfo" v-if="item.bankType==1" :class="{'qhbj-wxewm':getColor==1}">
					<img :src="item.qrCode" />
				</div>
				<!--支付宝二维码部分-->
				<div class="zfbewm" v-show="isZfbewm" v-for="(item,index) in ddxq.bankInfo" v-if="item.bankType==2" :class="{'qhbj-zfbewm':getColor==1}">
					<img :src="item.qrCode" />
				</div>
			</div>
			<!--上部右侧卖家部分-->
			<div class="maijia" :class="{'qhbj-maijia':getColor==1}">
				<div class="mjtb" :class="{'qhbj-mjtb':getColor==1}">
					<p><span v-if="ismj"> {{$t("fbjy.Seller")}}</span><span v-if="!ismj"> {{$t("fbjy.Buyer")}}</span></p>
					<p @click="isLxmj=!isLxmj" v-if="!isDdqxts">
						<i class="iconfont icon-dianhuazhengzaibohao"></i> {{$t("fbjy.Contact")}}
						<span v-show="ismj">{{$t("fbjy.Seller")}}</span><span v-show="!ismj"> {{$t("fbjy.Buyer")}}</span>
					</p>
				</div>
				<div class="cj" :class="{'qhbj-cj':getColor==1}">
					<ul class="clearfix">
						<li>
							<p class="cjbt"> {{$t("fbjy.TransactionsRecen")}}</p>
							<p class="ds">{{ycj}}</p>
						</li>
						<li>
							<p class="cjbt"> {{$t("fbjy.AppealsRecent")}}</p>
							<p class="ds">{{ys}}</p>
						</li>
						<li>
							<p class="cjbt">{{$t("fbjy.WinningAppeals")}}</p>
							<p class="ds">{{yss}}</p>
						</li>
					</ul>
				</div>
				<div class="jyts" :class="{'qhbj-jyts':getColor==1}">
					<h6 class="clearfix"><i class="iconfont icon-icon"></i><span>{{$t("fbjy.TransactionTips")}}</span></h6>
					<div class="tsts" :class="{'qhbj-tsts':getColor==1}">
						<p>{{$t("fbjy.Tips1")}}</p>
						<p>{{$t("fbjy.Tips2")}}</p>
						<p>{{$t("fbjy.Tips3")}}
							<router-link to="/TradingRules" target="_blank">{{$t("fbjy.ViewDetailedRules")}}</router-link>
						</p>
					</div>
				</div>
			</div>
		</div>
		<!--下部聊天部分-->
		<div class="liaotian" :class="{'qhbj-liaotian':getColor==1}">
			<!--头部在线状态-->
			<div class="lttb" :class="{'qhbj-lttb':getColor==1}">
				<p>{{$t("fbjy.Chat")}} <i>{{ltsj}}</i><span v-if="dfzxzt>0">{{$t("fbjy.Offline")}}</span><span v-if="dfzxzt==0">{{$t("fbjy.Online")}}</span></p>
			</div>
			<!--查看更多-->
			<div class="ckgd" :class="{'qhbj-ckgd':getColor==1}">
				<p @click="ckgd" v-show="isCkgd">{{$t("list.Look_at_more")}}</p>
			</div>
			<!--聊天信息显示区域-->
			<div class="ltzs" :class="{'qhbj-ltzs':getColor==1}">
				<div class="ly" id="ly" v-for="(item,index) in mrltjl">
					<!--系统信息-->
					<div class="xtxx" v-if="item.type==2&&item.toUid==yhId">
						<div class="xtxx-inner" :class="{'qhbj-xtxxin':getColor==1}">
							<p class="xtxxts">{{$t("fbjy.SystemRemindsYou")}}:{{item.content}}</p>
							<p class="xtxxsj">{{formatTime(item.created_at).split(" ")[1]}}</p>
						</div>
					</div>
					<!--卖家聊天信息-->
					<div class="xxdt-mj clearfix" v-if="item.type!=2&&item.sendUid!=yhId">
						<div class="lttx-mj" :class="{'qhbj-lttxmj':getColor==1}">
							<i class="iconfont icon-morentouxiang"></i>
						</div>
						<div class="ltxxk-mj">
							<div class="nrxx-mj" v-if="item.type==0" :class="{'qhbj-nrxxmj':getColor==1}">
								<div class="arrow-l" :class="{'qhbj-arrowl':getColor==1}"><em></em><span></span></div>{{item.content}}</div>
							<div class="tp-mj" v-if="item.type==1" @click="tptk(item.content)" :class="{'qhbj-tpmj':getColor==1}">
								<div class="arrow-ltp" :class="{'qhbj-arrowltp':getColor==1}"><em></em><span></span></div><img :src="item.content" />
							</div>
						</div>
						<p class="ltsj-mj" :class="{'qhbj-ltsjmj':getColor==1}">{{formatTime(item.created_at).split(" ")[1]}}</p>
					</div>
					<!--己方聊天信息-->
					<div class="xxdt-jf clearfix" v-if="item.type!=2&&item.sendUid==yhId">
						<div class="lttx-jf" :class="{'qhbj-lttxjf':getColor==1}">
							<i class="iconfont icon-icontouxiang"></i>
						</div>
						<div class="ltxxk-jf">
							<div class="nrxx-jf" v-if="item.type==0" :class="{'qhbj-nrxxjf':getColor==1}">
								<div class="arrow-r" :class="{'qhbj-arrowr':getColor==1}"><em></em><span></span></div>{{item.content}}</div>
							<div class="tp-jf" v-if="item.type==1" @click="tptk(item.content)" :class="{'qhbj-tpjf':getColor==1}">
								<div class="arrow-rtp" :class="{'qhbj-arrowrtp':getColor==1}"><em></em><span></span></div><img :src="item.content" />
							</div>
						</div>
						<p class="ltsj-jf" :class="{'qhbj-ltsjjf':getColor==1}">{{formatTime(item.created_at).split(" ")[1]}}</p>
					</div>
				</div>
			</div>
			<!--底部文本图片编辑部分-->
			<div class="ltxx">
				<div class="ltxx-inner clearfix" :class="{'qhbj-ltxxinner':getColor==1}">
					<div class="txt" :class="{'qhbj-txt':getColor==1}">
						<input type="text" v-model="fsxx" maxlength="240" @keyup.enter="fswb(0)" :disabled="islttex" :class="{'fsjy':isfsJy}" />
					</div>
					<div class="fs" :class="{'qhbj-fs':getColor==1}">
						<input id="fswb" type="button" @click="fswb(0)" :disabled="islttex" :value="$t('fbjy.Send')" :class="{'fsjy':isfsJy}" />
					</div>
					<div class="tp" :class="{'qhbj-tp':getColor==1,'fsjy':isfsJy}">{{$t("fbjy.Photos")}}
						<input type="file" accept="image/png,image/gif,image/jpg,image/jpeg" @change="fstp(1,$event)" :disabled="islttex" style="cursor: pointer;" />
					</div>
					<div class="ltinfo" v-show="isltInfo">
						<span>{{ltInfo}}</span>
					</div>
				</div>
			</div>
		</div>

		<!--图片弹框-->
		<div ref="pop" class="picview-pop">
			<div>
				<div class="tp-cont">
					<i class="iconfont icon-cuowu" @click="close($event)"></i>
				</div>
				<i ref="rote" class="rote" @click="rote">
                <svg class="icon" style="width: 40px; height: 40px;vertical-align: middle;fill: currentColor;overflow: hidden;" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1408">
                    <path d="M951.629227 461.298248c-11.243065-11.478426-31.018457-11.573593-42.421158-0.393973l-19.681248 19.352767C879.102401 259.036661 699.342294 86.802972 477.064838 86.802972c-227.913826 0-413.357376 185.43127-413.357376 413.357376 0 227.943502 185.445596 413.373749 413.357376 413.373749 121.468492 0 236.415454-53.759391 314.960345-146.978493 3.494591-2.674922 6.330172-5.887081 8.469905-9.510608 0.283456-0.343831 0.599657-0.693802 0.913812-1.038656l2.016937-3.181459-0.661056-0.343831c1.353834-3.560082 1.984191-7.02602 1.984191-10.518564 0-17.229406-13.983479-31.240515-31.209816-31.240515-10.361999 0-20.060895 5.509481-25.698289 14.424524-67.300802 80.872912-165.997662 127.260405-270.775007 127.260405-194.21533 0-352.277252-158.031223-352.277252-352.24553 0-194.19998 158.060899-352.261902 352.277252-352.261902 192.954617 0 350.169241 155.936515 352.21483 348.388688l-35.052331-35.144428c-11.307533-11.385305-31.113625-11.417027-42.420135-0.096191-11.778254 11.701506-11.778254 30.753421-0.063445 42.48358l74.008574 74.194816c5.637394 5.701862 13.227256 8.818853 21.22644 8.818853l0.314155-0.029676 0.787946 0.218988c1.699712 0.441045 3.559059 0.944512 5.636371 0.944512 7.874341 0 15.337313-3.052522 21.00643-8.594749l76.558653-75.331709c5.732561-5.622044 8.943696-13.211906 9.008164-21.227464C960.351889 474.525504 957.266621 466.999087 951.629227 461.298248M675.059238 606.886067l-0.030699-0.124843 0.063445-234.57248c0-28.42233-23.147186-51.537793-51.554166-51.537793L311.508221 320.650951c-28.405957 0-51.522444 23.115464-51.522444 51.537793l0 268.680299c0 28.405957 23.116487 51.55212 51.522444 51.55212l312.030619 0c28.405957 0 51.554166-23.14514 51.554166-51.55212l-0.030699-32.500205 0-1.482771L675.059238 606.886067zM629.458667 374.252753l0 234.209206 0 15.150048 0 15.210423c0 4.408403-3.590781 7.997138-7.999185 7.997138L313.585533 646.819568c-4.408403 0-7.999185-3.589758-7.999185-7.997138L305.586348 374.252753c0-4.425799 3.590781-7.999185 7.999185-7.999185l307.872926 0C625.867886 366.253568 629.458667 369.826953 629.458667 374.252753M586.060251 439.742303c-6.455015 0-12.501732 2.487657-17.006326 6.974855l-83.424015 92.77908L430.235276 500.19207c-4.345981-4.077875-10.077519-6.26775-16.156982-6.26775-7.904017 0-13.951757 2.551102-18.581194 7.212262l-64.623833 86.414115c-8.345062 8.251941-8.345062 23.36822 0.913812 32.659841 4.535293 4.53427 10.519588 7.020904 16.848737 7.020904 6.487761 0 12.43931-2.548032 17.195637-7.336082l52.465932-70.101591L472.686111 588.339666c4.408403 4.122901 10.235109 6.329149 16.818037 6.329149 6.457062 0 12.472056-2.521426 17.005302-7.083326l96.746438-107.59553c4.15667-4.094248 6.643304-10.093892 6.643304-16.502859 0-6.392594-2.488681-12.392238-7.054673-16.895809C598.53333 442.261683 592.391447 439.742303 586.060251 439.742303M402.521075 487.689315c25.446555 0 46.168506-20.707624 46.168506-46.184879 0-25.446555-20.721951-46.153156-46.168506-46.153156-25.445532 0-46.167482 20.705578-46.167482 46.153156C356.353592 466.98169 377.075543 487.689315 402.521075 487.689315" p-id="1409"></path>
                </svg>
              </i>
				<img ref='img' :src="picsrc" :style="`transform: scale(${scale}) rotate(${roted}deg);width:${picW}px;height:${picH}px;top:${picTop}px;left:${picLeft}px`">
			</div>
		</div>

		<!--申诉弹框-->
		<div class="sstk" v-if="isSs">
			<div class="sstk-mengbu"></div>
			<div class="sstk-content" :class="{'qhbj-sstkcon':getColor==1}">
				<div class="sstk-tit" :class="{'qhbj-sstktit':getColor==1}">
					<p>{{$t("fbjy.Appeal")}}</p><i class="iconfont icon-cuowu" @click="isSs=!isSs;ssnr='';ssxq='';"></i>
				</div>
				<p class="ssts" :class="{'qhbj-ssts':getColor==1}">{{$t("fbjy.ApplicationSpecial")}}</p>
				<div class="sslx" :class="{'qhbj-sslx':getColor==1}">
					<p>{{$t("fbjy.AppealType")}}</p>
					<div class="xlcd" :class="{'qhbj-xlcd':getColor==1}">
						<el-select v-model="ssnr">
							<el-option v-for="(item,index) in ssyy" :label="item.title" :value="item.id" :key="item.id"></el-option>
						</el-select>
					</div>
				</div>
				<div class="ssly" :class="{'qhbj-ssly':getColor==1}">
					<p>{{$t("fbjy.AppealReason")}}</p>
					<div class="tta">
						<textarea :placeholder="$t('fbjy.EnterAppealReason')" v-model="ssxq" maxlength="240"></textarea>
						<p class="sj" v-show="isSsts">{{$t("fbjy.AfterCancelAppeal")}}<span>{{ssdjs}}</span>{{$t("fbjy.Minutes")}}</p>
					</div>
				</div>
				<div class="ssinfo" v-show="isSsinfo">
					<p>{{ssInfo}}</p>
				</div>
				<div class="ssbtn" :class="{'qhbj-ssbtn':getColor==1}">
					<div @click="isSs=!isSs;ssnr='';ssxq='';">{{$t("capital.Cancel")}}</div>
					<div @click="qrss(ssnr,ssxq)">{{$t("capital.Confirm")}}</div>
				</div>
			</div>
		</div>

		<!--确认付款弹框-->
		<div class="qrtk" v-if="isQrfk">
			<div class="qrtk-mengbu"></div>
			<div class="qrtk-content" :class="{'qhbj-sstkcon':getColor==1}">
				<div class="qrtk-tit" :class="{'qhbj-sstktit':getColor==1}">
					<p>{{$t("fbjy.Confirmzhifu")}}</p><i class="iconfont icon-cuowu" @click="isQrfk=!isQrfk"></i>
				</div>
				<div class="qrts" :class="{'qhbj-qrtkqrts':getColor==1}">
          {{$t("fbjy.ConfirmPaidFrozen")}}
				</div>
				<div class="fkinfo">
					<p v-show="isfkInfo">{{fkInfo}}</p>
				</div>
				<div class="qrbtn" :class="{'qhbj-ssbtn':getColor==1}">
					<div @click="isQrfk=!isQrfk">{{$t("capital.Cancel")}}</div>
					<div v-if="isqrfkan" @click="ykqrfk">{{$t("capital.Confirm")}}</div>
					<div v-if="!isqrfkan" @click="shqrfk">{{$t("capital.Confirm")}}</div>
				</div>
			</div>
		</div>
		<!--取消订单弹框-->
		<div class="qxtk" v-if="isQxdd">
			<div class="qxtk-mengbu"></div>
			<div class="qxtk-content" :class="{'qhbj-sstkcon':getColor==1}">
				<div class="qxtk-tit" :class="{'qhbj-sstktit':getColor==1}">
					<p>{{$t("otc.CancelOrder")}}</p><i class="iconfont icon-cuowu" @click="isQxdd=!isQxdd"></i>
				</div>
				<div class="qxts" :class="{'qhbj-qxts':getColor==1}">
          {{$t("fbjy.CancelRegulation")}}
				</div>
				<div class="qxddinfo" v-show="isqxInfo">{{qxddInfo}}</div>
				<div class="qxbtn" :class="{'qhbj-ssbtn':getColor==1}">
					<div @click="isQxdd=!isQxdd">{{$t("capital.Cancel")}}</div>
					<div @click="qxjy">{{$t("capital.Confirm")}}</div>
				</div>
			</div>
		</div>

		<!--确认放行弹框-->
		<div class="fxtk" v-if="isQrfx">
			<div class="fxtk-mengbu"></div>
			<div class="fxtk-content" :class="{'qhbj-sstkcon':getColor==1}">
				<div class="fxtk-tit" :class="{'qhbj-sstktit':getColor==1}">
					<p>{{$t("fbjy.ReceiptAndRelease")}}</p><i class="iconfont icon-cuowu" @click="isQrfx=!isQrfx;fxmm='';fxInfo='';"></i>
				</div>
				<div class="fxts" :class="{'qhbj-fxts':getColor==1}">
					<p>{{$t("fbjy.ConfirmReceipt")}}</p>
				</div>
				<div class="zjmm clearfix" :class="{'qhbj-zjmm':getColor==1}">
					<p>{{$t("otc.FundPassword")}}</p>
					<div class="inp">
						<input type="password" v-model="fxmm" @keyup="fxmminp(fxmm)" maxlength="20" />
					</div>
				</div>
				<div class="qrxx clearfix" :class="{'qhbj-qrxx':getColor==1}">
					<div class="rad">
						<input type="checkbox" v-model="istyfx" />
					</div>
					<div class="radtex">
            {{$t("fbjy.CheckPayment")}}
					</div>
				</div>
				<div class="fxinfo">
					<p v-if="isfxInfo">{{fxInfo}}</p>
					<p v-if="!isfxInfo">{{qrfxInfo}}</p>
				</div>
				<div v-if="isqrfxan" class="qrfxbtn" @click="ykqrfx" :class="{'qhbj-qrfxbtn':getColor==1}">{{$t("fbjy.ConfirmFang")}}</div>
				<div v-if="!isqrfxan" class="qrfxbtn" @click="shqrfx" :class="{'qhbj-qrfxbtn':getColor==1}">{{$t("fbjy.ConfirmFang")}}</div>
			</div>
		</div>

		<!--联系卖家弹框-->
		<div class="lxmjtk" v-show="isLxmj">
			<div class="lxmjtk-mengbu"></div>
			<div class="lxmj-cont" :class="{'qhbj-sstkcon':getColor==1}">
				<div class="lxmj-tit" :class="{'qhbj-sstktit':getColor==1}">
					<p>{{$t("otc.CancelOrder")}}</p><i class="iconfont icon-cuowu" @click="isLxmj=!isLxmj"></i>
				</div>
				<div class="lxmjdh" :class="{'qhbj-lxmjdh':getColor==1}">
					<p class="dhts" v-show="isBdsj">{{$t("fbjy.PleaseUse")}}{{userPhone}}{{$t("fbjy.Dial")}}</p>
					<p class="dhts" v-show="!isBdsj">{{$t("fbjy.NotBindPhone")}}</p>
					<p class="dh" v-show="isSj">{{mjSj}}</p>
					<p class="ys">{{$t("fbjy.PrivacyProtection")}}</p>
				</div>
				<div class="lxmjbtn" :class="{'qhbj-ssbtn':getColor==1}">
					<div @click="isLxmj=!isLxmj">{{$t("capital.Cancel")}}</div>
					<div @click="isLxmj=!isLxmj">{{$t("capital.Confirm")}}</div>
				</div>
			</div>
		</div>

	</div>
</template>

<script>
	import Vue from 'vue'
	//  引入axios用于请求数据
	import Axios from 'axios'
	//引入jquery
	import $ from 'jquery'
	import {
		mapState,mapMutations
	} from 'vuex';
	//引用路径
	import { httpUrl } from "../http_url/http_url"
	//引入loding效果
	import loading from "../public/loading"
	export default {
		data() {
			return {
				oLtzs: {}, //存放获取的聊天展示区域Dom
				ddId:this.$router.history.current.params.id,  //获取本地存储存放的订单id
				bz: "", //订单币种
				dfk: true, //是否显示待付款倒计时
				dfkdjs: "", //显示付款倒计时
				ssdjs: "", //申诉倒计时
				sssj: "", //申诉倒计时间
				ssInfo: "", //确认申诉提示
				isSsts: true, //是否显示申诉倒计时提示
				isSsinfo: false, //是否显示确认申诉提示
				ssTime: "", //获取到的申诉时间
				ddxq: [], //用于存放获取过来的订单详情数据
				isQxdd: false, //是否取消订单
				isWxewm: false, //是否显示微信二维码
				isZfbewm: false, //是否显示支付宝二维码
				yhkxx: true, //添加银行卡信息显示隐藏
				wxxx: true, //添加微信信息显示隐藏
				zfbxx: true, //添加支付宝信息显示隐藏
				wtjyhk: false, //未添加银行卡信息默认隐藏
				wtjwx: false, //未添加微信信息默认隐藏
				wtjzfb: false, //未添加支付宝信息默认隐藏
				isDdqxts: false, //是否显示订单取消提示
				wyfkan: false, //是否显示我要付款按钮
				qxjyan: true, //是否显示取消交易按钮
				qxddan: false, //是否显示取消订单按钮
				wyssan: false, //是否显示提交申诉按钮
				qxssan: false, //是否显示取消申诉按钮
				qrfxan: true, //是否显示确认放行按钮
				fkwctsk: false, //付款完成提示框
				lxmj: false, //是否显示联系卖家
				ycj: 0, //卖家月成交
				yss: 0, //卖家月胜诉
				ys: 0, //卖家月申诉
				ssz: false, //是否显示申诉中
				isQrfk: false, //是否显示确认付款弹框
				isQxdd: false, //是否显示取消订单弹框
				isSs: false, //是否显示我要申诉弹框
				isQrfx: false, //是否显示确认放行弹框
				isLxmj: false, //是否显示联系卖家弹框
				ssyy: [], //存放获取过来的申诉原因
				ssnr: "", //申诉内容
				ssxq: "", //申诉详情
				isqrfkan: true, //游客和商户弹框内确认付款按钮切换
				isqrfxan: true, //游客和商户弹框内确认放行按钮切换
				ggId: "", //广告id
				istyfx: true, //确认放行复选框
				fxmm: "", //放行密码
				fxInfo: "", //确认放行提示
				isfxInfo: false, //是否显示放行提示
				ltsj: "", //聊天时间
				mrltjl: [], //存放拉取过来的聊天记录
				ltjlArr: [], //点击查看更多以后获取的聊天记录
				ltys: 1, //聊天默认页数
				ltdqy: "", //当前聊天页数
				ltzdy: "", //聊天记录最大页数
				isCkgd: true, //查看更多显示消失
				picsrc: "", //图片弹框中图片路径
				picW: "", //图片原始宽度
				picH: "", //图片原始高度
				scale: 0.5, //图片比例
				roted: 0, //图片旋转角度
				picTop: 0, //图片距屏幕上边的距离
				picLeft: 0, //图片距屏幕左边的距离
				userId: "", //当前订单用户Id
				toUserIds: "", //聊天发送方用户通信标识
				fsxx: "", //发送信息
				ltInfo: "", //发送图片提示
				isltInfo: false, //发送图片提示显示隐藏
				lttpList: [], //存放图片
				dfzxzt: "", //对方在线状态
				islttex: false, //发送聊天信息是否被禁用
				mjSj: "", //联系卖家手机号
				mjName: "", //联系卖家name
				isBdsj: true, //联系卖家是否绑定手机
				isSj: true, //联系卖家是否为手机,和卖家name分别显示隐藏
				isJycg: false, //交易成功提示显示隐藏
				jyslws: "", //交易数量保留小数位
				isfsJy: false, //订单锁定状态,聊天发送按钮显示禁用标志
				isfx: false, //是否确认放行,改变按钮颜色
				isFxdisa: true, //是否禁用确认放行按钮
				fkInfo: "", //确认付款提示
				isfkInfo: false, //是否显示付款提示
				isqxInfo: false, //是否显示取消提示
				qxddInfo: "", //取消订单提示
				ddzt: "", //WebSocket推送订单状态
				ismj: true, //是否显示买卖家
				isjyssan: false,
				loadingIsShow: false,
				/*loading效果*/
				OtherPartyName: "",
				/*对方名字*/
				userPhone: "", /*用户手机号*/
				legal:"", //单位
        qrfxInfo:""
			}
		},
		components: { /*页面的loading效果*/
			"loading": loading
		},
		computed:{
			...mapState('user',{yhId:state=>state.userID}),
			...mapState('setting',['sskl']),
		},
		mounted() {
			/***判断用户请求的内容开始***/
			//请求拦截器
			Axios.interceptors.request.use(config => {
				_this.loadingIsShow = true;
				return config
			}, error => {
				_this.loadingIsShow = false;
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
						_this.loadingIsShow = false;
					}
				}
				if(response.status == 200) {
					_this.loadingIsShow = false;
				}
				return response;
			}, (error) => {
				if(error.response) {
					_this.loadingIsShow = false;
				}
				return Promise.reject(error)
			})

			/***判断用户请求的结束***/
			//			获取聊天信息区域
			this.oLtzs = document.querySelector('.ltzs');
			//			 this.scrollToBottom();
			//			获取订单详情交易界面
			let _this = this
			Axios.get(httpUrl.getddxqUrl, {
				headers: {
					'Authorization': 'Bearer ' + _this.token
				},
				params: {
					"blaceId": _this.ddId
				}
			}).then(function(res) {
				//           	获取订单详情
				_this.ddxq = res.data.data;
				_this.legal = res.data.data.legal;
				//           	获取订单币种
				_this.bz = res.data.data.currency.pageIdentifier
				//           	获取广告id
				_this.ggId = res.data.data.pur_id
				//				获取当前订单用户Id
				if(res.data.data.appeal != undefined) {
					_this.userId = res.data.data.appeal.user_id
				}
				//				获取交易数量保留小数位
				_this.jyslws = res.data.data.currency.displayNum;

				/*判断卖家买家结束*/

				if(_this.ddxq.buyer) {
					// 	获取卖家月成交量
					_this.ycj = res.data.data.user.tradeMonth_num
					//           	获取卖家月胜诉量
					_this.yss = res.data.data.user.appealMonthWinTimes
					//           	获取卖家月申诉量
					_this.ys = res.data.data.user.appealMonthTimes
					//				联系卖家电话
					_this.mjSj = res.data.data.user.mobile
					//              联系卖家name
					_this.mjName = res.data.data.user.name;
					//用户手机
					_this.userPhone = res.data.data.merchant.mobile;


				} else {
					//	获取卖家月成交量
					_this.ycj = res.data.data.merchant.tradeMonth_num
					//           	获取卖家月胜诉量
					_this.yss = res.data.data.merchant.appealMonthWinTimes
					//           	获取卖家月申诉量
					_this.ys = res.data.data.merchant.appealMonthTimes
					_this.mjSj = res.data.data.merchant.mobile
					//              联系卖家name
					_this.mjName = res.data.data.merchant.name;
					//用户手机
					_this.userPhone = res.data.data.user.mobile;

				}
				if(_this.ddxq.type){
					/*卖家名字*/
					_this.OtherPartyName = res.data.data.merchant.trueName;
				}else{
					/*卖家名 字*/
					_this.OtherPartyName = res.data.data.user.trueName;
				}


				//				判断是否有申诉更新日期,赋值申诉倒计时时间
				if(res.data.data.appeal) {
					_this.ssTime = res.data.data.appeal.updated_at;
				} else {
					_this.ssTime = res.data.data.do_time;
				}
				if(_this.ssTime != null) {
					let nowTimeSs = _this.ddxq.nowTime.replace(/-/g, "/"); /*当前时间*/
					var nowTime = new Date(nowTimeSs).getTime();
					var endTime = new Date(_this.ssTime).getTime() + 1000 * 60 * 10;
					//				   申诉倒计时
					var timer1 = setInterval(function() {
						var t = endTime - nowTime;
						_this.sssj = t
						if(t > 0) {
							var min = Math.floor((t / 60000) % 60)
							var sec = Math.floor((t / 1000) % 60)
							min = min < 10 ? "0" + min : min
							sec = sec < 10 ? "0" + sec : sec
							var format = `${min}:${sec}`
							_this.ssdjs = format
							_this.isSsts = true
						} else {
							clearInterval(timer1)
							_this.isSsts = false
						}
						nowTime += 1000;
					}, 1000)
				}

				//				判断用户是否绑定手机,联系卖家弹框显示不同的内容
				if(_this.mjSj == null) {
					_this.isBdsj = false
					_this.isSj = false
				} else {
					_this.isBdsj = true
					_this.isSj = true
				}
				//              获取并判断聊天发送方用户通信标识以及对方用户id
				if(_this.yhId == res.data.data.user_id) {
					_this.toUserIds = res.data.data.pur_user + ""
				} else {
					_this.toUserIds = res.data.data.user_id + ""
				}

				/////////////获取对方在线状态///////////////
				Axios.get(httpUrl.getltztUrl, {
					headers: {
						'Authorization': 'Bearer ' + _this.token
					},
					params: {
						"userId": _this.toUserIds
					}
				}).then(function(res) {
					_this.dfzxzt = res.data.data
				}).catch(function(err) {
					console.log("err", err)
				})
				//				/////////////////判断游客商户///////////////
				if(_this.ddxq.type == 1 && _this.ddxq.buyer == 0) { //游客付款买单
					_this.wyfkan = true
					_this.qxjyan = true
					_this.qrfxan = false
					_this.isqrfkan = true
					_this.ismj = true
				} else if(_this.ddxq.type == 1 && _this.ddxq.buyer == 1) { //商户收款放行
					_this.wyfkan = false
					_this.qrfxan = true
					_this.qxjyan = false
					_this.dfk = false
					_this.wyssan = false
					_this.isqrfxan = false
					_this.lxmj = false
					_this.ismj = false
				} else if(_this.ddxq.type == 0 && _this.ddxq.buyer == 0) { //游客收款放行
					_this.wyfkan = false
					_this.qrfxan = true
					_this.wyssan = false
					_this.isqrfxan = true
					_this.qxjyan = false
					_this.dfk = true
					_this.ismj = false
				} else if(_this.ddxq.type == 0 && _this.ddxq.buyer == 1) { //商户付款买单
					_this.wyfkan = true
					_this.qxjyan = true
					_this.qrfxan = false
					_this.dfk = true
					_this.isqrfxan = false
					_this.isqrfkan = false
					_this.ismj = true
				}
				////////////////判断订单状态//////////////////
				if(_this.ddxq.status == -2) { //订单申诉中
					_this.dfk = false
					_this.isSs = false
					_this.qxjyan = false
					_this.wyfkan = false
					_this.wyssan = false
					_this.ssz = true
					_this.lxmj = true
					_this.qxssan = true
					_this.qrfxan = false
				} else if(_this.ddxq.status == -1) { //订单已关闭取消
					_this.isDdqxts = true
					_this.dfk = false
					_this.qxjyan = false
					_this.wyfkan = false
					_this.isQxdd = false
					_this.qxddan = false
					_this.wyssan = false
					_this.qrfxan = false
					_this.islttex = true
					_this.isfsJy = true
					_this.yhkxx = false
					_this.wxxx = false
					_this.zfbxx = false
					_this.wtjyhk = false
					_this.wtjwx = false
					_this.wtjzfb = false
					_this.fkwctsk = false
				} else if(_this.ddxq.status == 1) { // 订单已支付
					_this.dfk = false
					_this.isQrfk = false
					_this.wyfkan = false
					_this.qxjyan = false
					_this.qxddan = true
					_this.wyssan = true
					_this.isfx = true
					_this.isFxdisa = false
					if((_this.ddxq.type == 1 && _this.ddxq.buyer == 1) || (_this.ddxq.type == 0 && _this.ddxq.buyer == 0)) {
						_this.fkwctsk = true
					}
				} else if(_this.ddxq.status == 2) { //该笔交易被锁定
					_this.isDdqxts = true
					_this.dfk = false
					_this.qxjyan = false
					_this.wyfkan = false
					_this.isQxdd = false
					_this.qxddan = false
					_this.wyssan = false
					_this.qrfxan = false
					_this.islttex = true
					_this.isfsJy = true
					_this.yhkxx = false
					_this.wxxx = false
					_this.zfbxx = false
					_this.wtjyhk = false
					_this.wtjwx = false
					_this.wtjzfb = false
					_this.fkwctsk = false
				} else if(_this.ddxq.status == 3) { //订单已完成
					_this.wyfkan = false
					_this.qxjyan = false
					_this.qxddan = false
					_this.wyssan = false
					_this.lxmj = false
					_this.qrfxan = false
					_this.qxssan = false
					_this.wyss = false
					_this.isJycg = true
					_this.islttex = true
					_this.isfsJy = true
					_this.fkwctsk = false
				} else if(_this.ddxq.status == 0) {
					//					/////////////////待付款倒计时////////////////////
					let aTime = _this.ddxq.nowTime.replace(/-/g, "/");
					let bTime = _this.ddxq.expire_time.replace(/-/g, "/");
					var nowTime = new Date(aTime).getTime();
					var endTime = new Date(bTime).getTime();
					var timer = setInterval(function() {
						var t = endTime - nowTime;
						if(t > 0) {
							var min = Math.floor((t / 60000) % 60)
							var sec = Math.floor((t / 1000) % 60)
							min = min < 10 ? "0" + min : min
							sec = sec < 10 ? "0" + sec : sec
							var format = `${min}分${sec}秒`
							_this.dfkdjs = format
						} else {
							clearInterval(timer);
							/*倒计时结束*/
							_this.dfkdjs = _this.$t("fbjy.ProcessingOrders")
//							_this.dfk = false
//							_this.lxmj = false
//							_this.wyfkan = false
//							_this.qxjyan = false
//							_this.isDdqxts = true
//							_this.yhkxx = false
//							_this.wxxx = false
//							_this.zfbxx = false
//							_this.wtjyhk = false
//							_this.wtjwx = false
//							_this.wtjzfb = false
//							_this.islttex = true
//							_this.isfsJy = true
//							_this.qrfxan = false
						}
						nowTime += 1000;
					}, 1000)
				}
				/////////判断用户是否绑定银行卡、微信、以及支付宝,没有的话显示未绑定信息//////////
				if(_this.ddxq.bankInfo == undefined) {
					return false
				}
				var check = [];
				for(let i = 0; i < _this.ddxq.bankInfo.length; i++) {
					check[i] = _this.ddxq.bankInfo[i].bankType;
				}
				if(check.indexOf(0) == -1) {
					_this.wtjyhk = true;
				}
				if(check.indexOf(1) == -1) {
					_this.wtjwx = true;
				}
				if(check.indexOf(2) == -1) {
					_this.wtjzfb = true;
				}
			}).catch(function(err) {
				console.log("获取订单详情err", err)
			})
			/////////////默认拉取聊天记录/////////////
			Axios.get(httpUrl.getltjlUrl, {
				headers: {
					'Authorization': 'Bearer ' + _this.token
				},
				params: {
					"blaceId": _this.ddId,
					"page": 1
				}
			}).then(function(res) {
				//           	默认第一页聊天记录
				_this.mrltjl = res.data.data.data.reverse()
				//获取当前聊天记录页数
				_this.ltdqy = res.data.data.current_page
				//           	所有聊天记录总页数
				_this.ltzdy = res.data.data.last_page
				//           	获取聊天时间
				//				_this.ltsj = _this.mrltjl[0].created_at.split(" ")[0]
				//				判断如果聊天最大页小于等于聊天当前页,就让查看更多隐藏
				if(_this.ltzdy <= _this.ltdqy) {
					_this.isCkgd = false
				}
				_this.$nextTick(() => {
					_this.oLtzs.scrollTop = _this.oLtzs.scrollHeight;
				})
			}).catch(function(err) {
				console.log("默认拉取聊天记录 err", err)
			})
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
					// msgType用于消息分类处理，用户可以在发送消息时设置自定义的msgType，在收到消息时判断msgType，"reqUnReadMsgCount"、"testMsg"、"tokenExpired"为apush预定义的msgType，请不要使用。
					if(_this.ddId != arr.content.orderId) {
						return false;
					}
					_this.mrltjl.push(arr.content);
					_this.$nextTick(() => {
						_this.oLtzs.scrollTop = _this.oLtzs.scrollHeight;
					})
					if(arr.content.other != undefined) {
						if(arr.content.other.status != undefined) {
							_this.ddzt = arr.content.other.status
							//获取推送过来的申诉时间
							if(arr.content.other.do_time != undefined) {
								let aTime = arr.content.other.do_time.replace(/-/g, "/");
								var t = new Date(aTime);
								/*申诉倒计时*/
								//let nowTimeSs = _this.ddxq.nowTime;  /*当前时间*/
								var nowTime = t.getTime();
								var endTime = t.getTime() + 1000 * 60 * 10;
								//				   申诉倒计时
								var timer1 = setInterval(function() {
									var tim = endTime - nowTime;
									_this.sssj = tim
									if(tim > 0) {
										var min = Math.floor((tim / 60000) % 60)
										var sec = Math.floor((tim / 1000) % 60)
										min = min < 10 ? "0" + min : min
										sec = sec < 10 ? "0" + sec : sec
										var format = `${min}:${sec}`
										_this.ssdjs = format
										_this.isSsts = true
									} else {
										clearInterval(timer1)
										_this.isSsts = false
									}
									nowTime += 1000;
								}, 1000)
							}

							//				////////////////判断订单状态//////////////////
							if(_this.ddzt == -2) { //订单申诉中
								_this.dfk = false
								_this.isSs = false
								_this.qxjyan = false
								_this.wyfkan = false
								_this.wyssan = false
								_this.ssz = true
								_this.lxmj = true
								_this.qxssan = true
								_this.qrfxan = false
							} else if(_this.ddzt == -1) { //订单已关闭取消
								_this.isDdqxts = true
								_this.dfk = false
								_this.qxjyan = false
								_this.wyfkan = false
								_this.isQxdd = false
								_this.qxddan = false
								_this.wyssan = false
								_this.qrfxan = false
								_this.islttex = true
								_this.isfsJy = true
								_this.yhkxx = false
								_this.wxxx = false
								_this.zfbxx = false
								_this.wtjyhk = false
								_this.wtjwx = false
								_this.wtjzfb = false
								_this.fkwctsk = false
							} else if(_this.ddzt == 1) { // 订单已支付
								_this.dfk = false
								_this.isQrfk = false
								_this.wyfkan = false
								_this.qxjyan = false
								_this.qxddan = true
								_this.wyssan = true
								_this.isfx = true
								_this.isFxdisa = false
								if((_this.ddxq.type == 1 && _this.ddxq.buyer == 1) || (_this.ddxq.type == 0 && _this.ddxq.buyer == 0)) {
									_this.fkwctsk = true
								}
							} else if(_this.ddzt == 2) { //该笔交易被锁定
								_this.isDdqxts = true
								_this.dfk = false
								_this.qxjyan = false
								_this.wyfkan = false
								_this.isQxdd = false
								_this.qxddan = false
								_this.wyssan = false
								_this.qrfxan = false
								_this.islttex = true
								_this.isfsJy = true
								_this.yhkxx = false
								_this.wxxx = false
								_this.zfbxx = false
								_this.wtjyhk = false
								_this.wtjwx = false
								_this.wtjzfb = false
								_this.fkwctsk = false
							} else if(_this.ddzt == 3) { //订单已完成
								_this.wyfkan = false
								_this.qxjyan = false
								_this.qxddan = false
								_this.wyssan = false
								_this.lxmj = false
								_this.qrfxan = false
								_this.qxssan = false
								_this.wyss = false
								_this.isJycg = true
								_this.islttex = true
								_this.isfsJy = true
								_this.fkwctsk = false
							} else if(_this.ddzt == 0) {
								/////////////////待付款倒计时////////////////////
								var timer = setInterval(function() {
									let aTime = 	_this.ddxq.nowTime.replace(/-/g, "/");
									var nowTime = new Date(aTime * 1000);
									var endTime = new Date(aTime * 1000);
									var t = endTime.getTime() - nowTime.getTime();
									if(t > 0) {
										var min = Math.floor((t / 60000) % 60)
										var sec = Math.floor((t / 1000) % 60)
										min = min < 10 ? "0" + min : min
										sec = sec < 10 ? "0" + sec : sec
										var format = `${min}分${sec}秒`
										_this.dfkdjs = format
									} else {
										clearInterval(timer);   /*倒计时结束*/
										_this.dfkdjs = _this.$t("fbjy.ProcessingOrders")
//										_this.dfk = false
//										_this.lxmj = false
//										_this.wyfkan = false
//										_this.qxjyan = false
//										_this.isDdqxts = true
//										_this.yhkxx = false
//										_this.wxxx = false
//										_this.zfbxx = false
//										_this.wtjyhk = false
//										_this.wtjwx = false
//										_this.wtjzfb = false
//										_this.islttex = true
//										_this.isfsJy = true
//										_this.qrfxan = false
									}
									_this.ddxq.nowTime++;
								}, 1000)
							}
						}
					}
				}
			}

		},
		filters: {
			//小数点过滤器 不四舍五入
			number(value, num) {
				var toFixedNum = Number(value).toFixed(num +1);
				var realVal =toFixedNum.substring(0,toFixedNum.lastIndexOf('.')+num +1);
				return realVal;
			}
		},
		methods: {
			...mapMutations('setting',['setData']),
			/////////////卖家收款方式部分划入变色以及显示二维码////////////////
			hr(event, bankType) {
				if(this.getColor == 1) {
					event.currentTarget.style.background = "#f5f5f5";
				} else {
					event.currentTarget.style.background = "#1d1d33";
				}
				if(bankType == 1) {
					this.isWxewm = true
				} else if(bankType == 2) {
					this.isZfbewm = true
				}
			},
			///////////////////卖家收款方式部分划出变色以及隐藏二维码///////////////
			hc(event, bankType) {
				if(this.getColor == 1) {
					event.currentTarget.style.background = "#fff";
				} else {
					event.currentTarget.style.background = "#191828";
				}
				if(bankType == 1) {
					this.isWxewm = false
				} else if(bankType == 2) {
					this.isZfbewm = false
				}
			},
			//////////////游客确认支付/////////////////
			ykqrfk() {
				let _this = this
				Axios.post(httpUrl.ykfkqrUrl, {
					blace_id: this.ddId
				}, {
					headers: {
						'Authorization': 'Bearer ' + _this.token
					}
				}).then(function(res) {
					if(res.data.status.code == 200) {
						_this.ssTime = res.data.data
						_this.dfk = false
						_this.isQrfk = false
						_this.wyfkan = false
						_this.qxjyan = false
						_this.lxmj = true
						_this.qxddan = true
						_this.wyssan = true
						_this.isfx = true
						_this.isFxdisa = false
						if((_this.ddxq.type == 1 && _this.ddxq.buyer == 1) || (_this.ddxq.type == 0 && _this.ddxq.buyer == 0)) {
							_this.fkwctsk = true
						}
						let aTime =res.data.data.do_time.replace(/-/g, "/");
						var nowTime = new Date(aTime).getTime();
						var endTime = new Date(aTime).getTime() + 1000 * 60 * 10;
						//				   申诉倒计时
						var timer1 = setInterval(function() {
							var t = endTime - nowTime;
							_this.sssj = t
							if(t > 0) {
								var min = Math.floor((t / 60000) % 60)
								var sec = Math.floor((t / 1000) % 60)
								min = min < 10 ? "0" + min : min
								sec = sec < 10 ? "0" + sec : sec
								var format = `${min}:${sec}`
								_this.ssdjs = format
								_this.isSsts = true
							} else {
								clearInterval(timer1)
								_this.isSsts = false
							}
							nowTime += 1000;
						}, 1000)
					} else if(res.data.status.code == 101) {
						_this.isfkInfo = true
						_this.fkInfo = _this.$t("fbjy.OrderNotFound")
						setTimeout(function() {
							_this.isfkInfo = false
						}, 1000)
					} else {
						_this.isfkInfo = true
						_this.fkInfo = _this.$t("fbjy.PaymentFailed")
						setTimeout(function() {
							_this.isfkInfo = false
						}, 1000)
					}
				}).catch(function(err) {
					console.log("订单提交失败 err", err)
				})
			},
			//////////////商户确认支付/////////////////
			shqrfk() {
				let _this = this;
				Axios.post(httpUrl.shfkqrUrl, {
					blace_id: _this.ddId,
					pur_id: _this.ggId
				}, {
					headers: {
						'Authorization': 'Bearer ' + _this.token
					}
				}).then(function(res) {
					if(res.data.status.code == 200) {
						_this.ssTime = res.data.data
						_this.dfk = false
						_this.isQrfk = false
						_this.wyfkan = false
						_this.qxjyan = false
						_this.lxmj = true
						_this.qxddan = true
						_this.wyssan = true
						_this.isfx = true
						_this.isFxdisa = false
						if((_this.ddxq.type == 1 && _this.ddxq.buyer == 1) || (_this.ddxq.type == 0 && _this.ddxq.buyer == 0)) {
							_this.fkwctsk = true
						}
					} else if(res.data.status.code == 101) {
						_this.isfkInfo = true
						_this.fkInfo = _this.$t("fbjy.OrderNotFound")
						setTimeout(function() {
							_this.isfkInfo = false
						}, 1000)
					} else {
						_this.isfkInfo = true
						_this.fkInfo = _this.$t("fbjy.PaymentFailed")
						setTimeout(function() {
							_this.isfkInfo = false
						}, 1000)
					}
				}).catch(function(err) {
					console.log("订单提交失败 err", err)
				})
			},
			/////////////取消交易////////////////
			qxjy() {
				let _this = this;
				Axios.post(httpUrl.qxddUrl, {
					blace_id: this.ddId
				}, {
					headers: {
						'Authorization': 'Bearer ' + _this.token
					},
				}).then(function(res) {
					if(res.data.status.code == 200) {
						_this.isDdqxts = true
						_this.dfk = false
						_this.wyfkan = false
						_this.isQxdd = false
						_this.qxddan = false
						_this.wyssan = false
						_this.lxmj = false
						_this.qxjyan = false
						_this.islttex = true
						_this.isfsJy = true
						_this.yhkxx = false
						_this.wxxx = false
						_this.zfbxx = false
						_this.wtjyhk = false
						_this.wtjwx = false
						_this.wtjzfb = false
						_this.fkwctsk = false
					} else {
						_this.isqxInfo = true
						_this.qxddInfo = _this.$t("fbjy.CancellationFailed")
						setTimeout(function() {
							_this.isqxInfo = false
						}, 1000)
					}
				}).catch(function(err) {
					console.log("取消订单提交 err", err)
				})
			},
			////////////我要申诉,触发倒计时///////////
			appeal() {
				let _this = this
				///////////////获取申诉原因//////////////
				Axios.get(httpUrl.getssyyUrl, {
					headers: {
						'Authorization': 'Bearer ' + _this.token
					}
				}).then(function(res) {
					_this.ssyy = res.data.data;
					//					let nowTimeSs = _this.ddxq.nowTime;  /*当前时间*/
					//					var nowTime = new Date(nowTimeSs);
					//					var endTime = new Date(_this.ssTime * 1000 + 10 * 60 * 1000);
					//					var t = endTime.getTime() - nowTime.getTime();
					//					if(t<=0){
					//						_this.isSsts = false;
					//					}else{
					//						_this.isSsts = true;
					//					}
				}).catch(function(err) {
					console.log("获取申诉原因失败 err", err)
				})
			},
			////////////////确认申诉///////////////
			qrss(ssnr, ssxq) {
				let _this = this
				if(Number(_this.sssj) > 0) {
					_this.isSsinfo = true
					setTimeout(function() {
						_this.isSsinfo = false
					}, 1000)
					_this.ssInfo = _this.$t("fbjy.CountdownEnd")
					return false
				}
				if(ssnr == "" || ssxq == "" || _this.ssxq.split(" ").join("").length == 0) {
					_this.isSsinfo = true
					setTimeout(function() {
						_this.isSsinfo = false
					}, 1000)
					_this.ssInfo = _this.$t("fbjy.ContentNotEmp")
					return false
				}

				Axios.post(httpUrl.qrssUrl, {
					blaceId: this.ddId,
					appealId: ssnr,
					details: ssxq
				}, {
					headers: {
						'Authorization': 'Bearer ' + _this.token
					}
				}).then(function(res) {
					if(res.data.status.code == 101) {
						_this.isSsinfo = true
						setTimeout(function() {
							_this.isSsinfo = false
						}, 1000)
						_this.ssInfo = _this.$t("fbjy.PleaseTryLater")
					} else if(res.data.status.code == 104) {
						_this.isSsinfo = true
						setTimeout(function() {
							_this.isSsinfo = false
						}, 1000)
						_this.ssInfo = _this.$t("fbjy.PleaseTryLater")
					} else if(res.data.status.code == 105) {
						_this.isSsinfo = true
						setTimeout(function() {
							_this.isSsinfo = false
						}, 1000)
						_this.ssInfo = _this.$t("fbjy.AppealFailed")
					} else if(res.data.status.code == 200) {
						_this.ssnr = "";
						_this.ssxq = "";
						_this.dfk = false;
						_this.isSs = false;
						_this.wyssan = false;
						_this.ssz = true;
						_this.lxmj = true;
						_this.qxssan = true;
						_this.qrfxan = false;
						_this.qxddan = true;
						_this.userId = res.data.data.user_id /*获取userID*/
						//						赋值获取的申诉口令,以免第一次点击申诉后口令为空
						// _this.sskl = res.data.data.appealPwd;
						//                      将获取的申诉口令存起来,点击刷新页面不变
						// window.localStorage.setItem("sskl", res.data.data.appealPwd)
						_this.setData({sskl:res.data.data.appealPwd})
					}
				}).catch(function(err) {
					console.log("申诉提交失败 err", err)
				})
			},
			//////////////取消申诉/////////////
			qxss() {
				let _this = this
				//				对方申诉,用户自己禁用取消申诉
				if(_this.ddxq.appeal.user_id != _this.yhId) {
					return false
				}
				Axios.post(httpUrl.postqxssUrl, {
					blaceId: this.ddId
				}, {
					headers: {
						'Authorization': 'Bearer ' + _this.token
					}
				}).then(function(res) {
					if(res.data.status.code == 200) {
						_this.dfk = false
						_this.qxssan = false
						_this.wyssan = true
						_this.lxmj = true
						_this.ssz = false
						_this.qxjy = false
						if((_this.ddxq.type == 1 && _this.ddxq.buyer == 1) || (_this.ddxq.type == 0 && _this.ddxq.buyer == 0)) {
							_this.qrfxan = true
						} else {
							_this.qxddan = true
						}
						let aTime  = res.data.data.do_time.replace(/-/g, "/");
						var nowTime = new Date(aTime).getTime();
						var endTime = new Date(aTime).getTime() + 1000 * 60 * 10;
						//				   申诉倒计时
						var timer1 = setInterval(function() {
							var t = endTime - nowTime;
							_this.sssj = t
							if(t > 0) {
								var min = Math.floor((t / 60000) % 60)
								var sec = Math.floor((t / 1000) % 60)
								min = min < 10 ? "0" + min : min
								sec = sec < 10 ? "0" + sec : sec
								var format = `${min}:${sec}`
								_this.ssdjs = format
								_this.isSsts = true
							} else {
								clearInterval(timer1)
								_this.isSsts = false
							}
							nowTime += 1000;
						}, 1000)
					}
				}).catch(function(err) {
					console.log("取消申诉 err", err)
				})
			},
			fxmminp(fxmm) {
				//				判断只能输入数字正则
				var patt = /^[0-9]*$/;
				var f = patt.test(fxmm);
				if(f == false) {
					this.fxInfo = this.$t("fbjy.PureNums");
				} else {
					this.fxInfo = ""
				}
			},
			/////////////////游客确认放行//////////////
			ykqrfx() {
				let _this = this
				var patt = /^[0-9a-zA-Z]*$/;
				var f = patt.test(_this.fxmm);
				if(_this.fxmm == "") {
					_this.isfxInfo = false
					_this.qrfxInfo = _this.$t("fbjy.FundsPasswordNotEmp")
					setTimeout(function() {
						_this.isfxInfo = true
					}, 1000)
					return false
				} else if(_this.fxmm.length < 8) {
					_this.isfxInfo = false
					_this.qrfxInfo = _this.$t("fbjy.PureNums")
					setTimeout(function() {
						_this.isfxInfo = true
					}, 1000)
					return false
				} else if(f == false) {
					return false
				} else if(_this.istyfx == false) {
					_this.isfxInfo = false
					_this.qrfxInfo = _this.$t("fbjy.PleaseConfirmRece")
					setTimeout(function() {
						_this.isfxInfo = true
					}, 1000)
					return false
				}
				Axios.post(httpUrl.postykqrfxUrl, {
					blace_id: _this.ddId,
					payPasswd: _this.fxmm
				}, {
					headers: {
						'Authorization': 'Bearer ' + _this.token
					}
				}).then(function(res) {
					if(res.data.status.code == 102) {
						_this.isfxInfo = false
						_this.qrfxInfo =  _this.$t("fbjy.PasswordError")
						setTimeout(function() {
							_this.isfxInfo = true
						}, 1000)
					} else if(res.data.status.code == 101) {
						_this.isfxInfo = false
						_this.qrfxInfo =  _this.$t("fbjy.OrderNotFound")
						setTimeout(function() {
							_this.isfxInfo = true
						}, 1000)
					} else if(res.data.status.code == -200) {
						_this.isfxInfo = false
						_this.qrfxInfo =  _this.$t("fbjy.ReleaseSailed")
						setTimeout(function() {
							_this.isfxInfo = true
						}, 1000)
					} else if(res.data.status.code == 200) {
						_this.isQrfx = false
						_this.qrfxan = false
						_this.wyssan = false
						_this.qxjyan = false
						_this.isJycg = true
						_this.qxssan = false
						_this.qrfxan = false
						_this.qxddan = false
						_this.islttex = true
						_this.isfsJy = true
						_this.fkwctsk = false
					}
				}).catch(function(err) {
					console.log("游客确认放行 err", err)
				})
			},
			////////////////商户确认放行///////////////
			shqrfx() {
				let _this = this
				var patt = /^[0-9a-zA-Z]*$/;
				var f = patt.test(_this.fxmm);
				if(_this.fxmm == "") {
					_this.isfxInfo = false
					_this.qrfxInfo = _this.$t("fbjy.FundsPasswordNotEmp")
					setTimeout(function() {
						_this.isfxInfo = true
					}, 1000)
					return false
				} else if(_this.fxmm.length < 8) {
					_this.isfxInfo = false
					_this.qrfxInfo = _this.$t("fbjy.PasswordLengthNotLess")
					setTimeout(function() {
						_this.isfxInfo = true
					}, 1000)
					return false
				} else if(f == false) {
					return false
				} else if(_this.istyfx == false) {
					this.isfxInfo = false
					_this.qrfxInfo =_this.$t("fbjy.PleaseConfirmRece")
					setTimeout(function() {
						_this.isfxInfo = true
					}, 1000)
					return false
				}
				Axios.post(httpUrl.postshqrfxUrl, {
					blace_id: _this.ddId,
					payPasswd: _this.fxmm,
					pur_id: _this.ggId
				}, {
					headers: {
						'Authorization': 'Bearer ' + _this.token
					}
				}).then(function(res) {
					if(res.data.status.code == 102) {
						_this.isfxInfo = false
						_this.qrfxInfo = _this.$t("fbjy.PleaseConfirmRece")
						setTimeout(function() {
							_this.isfxInfo = true
						}, 1000)
					} else if(res.data.status.code == 101) {
						_this.isfxInfo = false
						_this.qrfxInfo = _this.$t("fbjy.OrderNotFound")
						setTimeout(function() {
							_this.isfxInfo = true
						}, 1000)
					} else if(res.data.status.code == -200) {
						_this.isfxInfo = false
						_this.qrfxInfo = _this.$t("fbjy.ReleaseSailed")
						setTimeout(function() {
							_this.isfxInfo = true
						}, 1000)
					} else if(res.data.status.code == 200) {
						_this.isQrfx = false
						_this.qrfxan = false
						_this.wyssan = false
						_this.qxjyan = false
						_this.isJycg = true
						_this.qxssan = false
						_this.qrfxan = false
						_this.qxddan = false
						_this.islttex = true
						_this.isfsJy = true
						_this.fkwctsk = false
					}
				}).catch(function(err) {
					console.log("商户确认放行 err", err)
				})
			},
			//////////////查看更多/////////////
			ckgd() {
				let _this = this
				_this.ltys++
					Axios.get(httpUrl.getltjlUrl, {
						headers: {
							'Authorization': 'Bearer ' + _this.token
						},
						params: {
							"blaceId": _this.ddId,
							"page": _this.ltys
						}
					}).then(function(res) {
						//           	点击查看更多以后拉取的聊天记录
						_this.ltjlArr = res.data.data.data
						for(var i = 0, le = _this.ltjlArr.length; i < le; i++) {
							_this.mrltjl.unshift(_this.ltjlArr[i])
						}
						//           	再次获取聊天时间
						let time = _this.formatTime(_this.mrltjl[0].created_at)
						_this.ltsj = time.split(" ")[0];
						//					判断如果聊天页数等于聊天最大页就让查看更多隐藏
						if(_this.ltys == _this.ltzdy) {
							_this.isCkgd = false
						}
					}).catch(function(err) {
						console.log("默认拉取聊天记录 err", err)
					})

			},
			////////////点击聊天信息图片,弹出图片弹框///////////
			tptk(src) {
				this.picsrc = src;
				this.scale = 0.5;
				this.roted = 0;
				this.$refs.pop.style.display = "block";
				let img = new Image();
				img.src = src;
				let _this = this;
				//				禁止滚动条滚动
				var top = $(document).scrollTop();
				$(document).on('scroll.unable', function(e) {
					$(document).scrollTop(top);
				})
				img.onload = function() {
					_this.zoom();
					_this.drag();
					_this.countImg();
				};
				window.onresize = function() {
					_this.countImg();
				};
			},
			//			滑动滚轮放大缩小图片
			zoom() {
				let _this = this;
				document.body.onmousewheel = function(event) {
					event = event || window.event;
					if(event.deltaY > 0) {
						_this.scale = _this.scale > 0.2 ? _this.scale - 0.1 : _this.scale;
					} else {
						_this.scale += 0.1;
					}
				};
			},
			//			拖拽图片
			drag() {
				let oDiv = this.$refs.img;
				let _this = this;
				oDiv.onmousedown = function(en) {
					var ev = ev || event;
					var disX = en.clientX - oDiv.offsetLeft;
					var disY = en.clientY - oDiv.offsetTop;
					if(oDiv.setCapture) {
						oDiv.setCapture();
					}
					document.onmousemove = function(en) {
						var ev = ev || event;
						if(
							en.clientY > 0 &&
							en.clientY < _this.$refs.pop.clientHeight &&
							en.clientX > 0 &&
							en.clientX < _this.$refs.pop.clientWidth
						) {
							_this.picTop = en.clientY - disY;
							_this.picLeft = en.clientX - disX;
						}
					};
					document.onmouseup = function() {
						document.onmousemove = null;
						if(oDiv.releaseCapture) {
							oDiv.releaseCapture();
						}
					};
					return false; //阻止默认行为（如果页面中有文字，则会默认拖动文字），ie8及一下不行
				};
			},
			//			旋转图片
			rote() {
				this.roted += 90;
			},
			close(e) {
				this.$refs.pop.style.display = "none";
				//				解除禁止滚动条滚动
				$(document).unbind("scroll.unable");
			},
			//			计算图片宽高
			countImg() {
				let picW = this.$refs.img.naturalWidth;
				let picH = this.$refs.img.naturalHeight;
				let Width = this.$refs.pop.offsetWidth;
				let Height = this.$refs.pop.offsetHeight;
				if(Width / Height <= picW / picH) {
					this.picW = Width;
					this.picH = `${Number(picH) * Width / Number(picW)}`;
					this.picTop = (Height - this.picH) / 2;
					this.picLeft = 0;
				} else {
					this.picH = Height;
					this.picW = `${Number(picW) * Height / Number(picH)}`;
					this.picTop = 0;
					this.picLeft = (Width - this.picW) / 2;
				}
			},
			///////////发送聊天文本内容///////////
			fswb(msgType) {
				let _this = this
				//				判断发送内容是否为空
				if(_this.fsxx == "" || _this.iswbDisab || _this.fsxx.split(" ").join("").length == 0) {
					this.ltInfo = _this.$t("fbjy.ContentNotEmp");
					this.isltInfo = true;
					setTimeout(() => {
						this.isltInfo = false;
					}, 1000)
					return false
				}
				Axios.post(httpUrl.postltxxUrl, {
					toUserIds: _this.toUserIds,
					orderId: _this.ddId,
					msgType: msgType,
					content: _this.fsxx,
				}, {
					headers: {
						'Authorization': 'Bearer ' + _this.token
					}
				}).then(function(res) {
					_this.mrltjl.push(res.data.data)
					//					发送消息滚动条到最底部
					_this.$nextTick(() => {
						_this.oLtzs.scrollTop = _this.oLtzs.scrollHeight;
					})
				}).catch(function(err) {
					console.log("发送文本信息 err", err)
				})
				_this.fsxx = ""
			},
			/////////////发送聊天图片//////////
			fstp(msgType, e) {
				let _this = this
				var file = e.target.files[0];
				/*判断用户是否上传的为图片*/
				if((!/image\/\w+/.test(file.type))) {
					this.ltInfo = _this.$t("ApplicationCoin.UploadedIsNotPhoto");
					this.isltInfo = true;
					setTimeout(() => {
						this.isltInfo = false;
					}, 1000)
					return false;
				}
				//判断用户上传的图片大小
				if(file.size > 2 * 1024 * 1024) {
					_this.$message({
						title: _this.$t("fbjy.Warning"),
						message: _this.$t("userCenter.UploadedPhoLargeselect"),
						type: 'warning',
						duration: 2000
					});
					return false;
				}
				var param = new FormData(); //创建form对象
				param.append('picture', file); //通过append向form对象添加数据
				param.append('toUserIds', this.toUserIds);
				param.append('orderId', this.ddId);
				param.append('msgType', msgType);
				this.lttpList = param;
				Axios.post(httpUrl.postltxxUrl, this.lttpList, {
					headers: {
						'Authorization': 'Bearer ' + _this.token
					}
				}).then(function(res) {
					_this.mrltjl.push(res.data.data)
					_this.$nextTick(() => {
						_this.oLtzs.scrollTop = _this.oLtzs.scrollHeight;
					})
				}).catch(function(err) {
					console.log("发送图片信息 err", err)
				})
			}

		}

	}
</script>
<style>
	.xlcd .el-input__inner {
		width: 335px;
		height: 40px;
		color: #fff;
		border: solid 2px #3b3c53;
		background: #22223f;
	}

	.xlcd .el-input__inner:hover {
		border: solid 2px #3b3c53;
	}

	.xlcd .el-input__inner::-webkit-input-placeholder {
		color: #fff;
	}

	.xlcd .el-input__inner:-moz-placeholder {
		color: #fff;
	}

	.xlcd .el-input__inner::-moz-placeholder {
		color: #fff;
	}

	.xlcd .el-input__inner:-ms-input-placeholder {
		color: #fff;
	}

	.container .qhbj-xlcd .el-input__inner {
		color: #333;
		border: solid 1px #ccc;
		background: #fff;
	}

	.container .qhbj-xlcd .el-input__inner::-webkit-input-placeholder {
		color: #999;
	}

	.container .qhbj-xlcd .el-input__inner:-moz-placeholder {
		color: #999;
	}

	.container .qhbj-xlcd .el-input__inner::-moz-placeholder {
		color: #999;
	}

	.container .qhbj-xlcd .el-input__inner:-ms-input-placeholder {
		color: #999;
	}
</style>
<style scoped>
	/*标准版样式*/
	/*容器颜色*/

	body .qhbj-container {
		background: #eaeff3;
	}
	/*上部左侧订单支付部分*/

	.container .qhbj-ddzf {
		background: #fff;
		border: solid 1px #ddd;
	}

	.container .qhbj-ddltb {
		background: #f5f5f5;
		color: #404040;
		border-bottom: none;
	}
	/*卖家收款方式部分*/

	.container .qhbj-xx {
		color: #333;
		border-right: solid 1px #ddd;
	}

	.container .qhbj-xx .yinhangka {
		border-bottom: solid 1px #f5f5f5;
	}

	.container .qhbj-xx .weixin {
		border-bottom: solid 1px #f5f5f5;
	}

	.container .qhbj-xx h5 {
		color: #999;
	}

	.container .qhbj-xx h6 {
		color: #999;
	}

	.container .qhbj-xx .yhk i {
		color: #302f66;
	}

	.container .qhbj-xx .wx i {
		color: #54ae21;
	}

	.container .qhbj-xx .zfb i {
		color: #00a3eb;
	}
	/*交易金额、价格、数量部分*/

	.container .qhbj-je {
		color: #333;
		border-right: solid 1px #ddd;
	}

	.container .qhbj-je div {
		border-bottom: solid 1px #f5f5f5;
	}

	.container .qhbj-je .jg {
		border-bottom: none;
	}
	/*点击付款以及取消交易部分*/

	.container .qhbj-fk {
		color: #333;
	}

	.container .qhbj-fkt {
		border-bottom: solid 1px #f5f5f5;
	}

	.container .qhbj-fkt p {
		color: #333;
	}

	.container .qhbj-fkt i {
		color: #f00;
	}

	.container .qhbj-fkt span {
		color: #333;
	}

	.container .qhbj-fkb .fkckh {
		color: #999;
	}

	.container .qhbj-fkbtn button {
		color: #313067;
	}

	.container .qhbj-fkbtn .wyfk {
		background: #302f66;
		color: #fff;
	}

	.container .qhbj-fkbtn .qxjy {
		border: solid 1px #302f66;
		color: #302F66;
		background: #fff;
	}

	.container .qhbj-fkbtn .qrfx {
		background: #ccc;
		color: #fff;
		border: solid 2px #ccc;
	}

	.container .qhbj-fkbtn .qxssanjy {
		border: solid 1px #302f66;
		color: #302F66;
		background: #fff;
		cursor: not-allowed;
	}

	.container .qhbj-fkbtn .fxactive {
		background: #302f66;
		color: #fff;
		border: solid 2px #302f66;
	}
	/*付款按钮提示框部分*/

	.container .qhbj-fktsk {
		background: #fff;
		border: solid 1px #ddd;
	}

	.container .qhbj-fxtsk {
		background: #fff;
		border: solid 1px #ddd;
	}

	.container .qhbj-arrowfkts {
		position: absolute;
		width: 20px;
		height: 20px;
		left: 45px;
		top: -20px;
	}

	.container .qhbj-arrowfkts * {
		display: block;
		border-width: 10px;
		position: absolute;
		border-style: dashed dashed solid dashed;
		font-size: 0;
		line-height: 0;
	}

	.container .qhbj-arrowfkts em {
		border-color: transparent transparent #ddd transparent;
	}

	.container .qhbj-arrowfkts span {
		border-color: transparent transparent #fff transparent;
		top: 1px;
	}
	/*上部右侧商家部分*/

	.container .qhbj-maijia {
		border: solid 1px #ddd;
		background: #fff;
	}

	.container .qhbj-mjtb {
		color: #333;
		border-bottom: none;
		background: #f5f5f5;
	}

	.container .qhbj-cj {
		color: #333;
		border-bottom: solid 1px #f5f5f5;
	}

	.container .qhbj-cj .cjbt {
		color: #999;
	}

	.container .qhbj-jyts {
		color: #666;
	}

	.container .qhbj-jyts h6 {
		color: #333;
	}

	.container .qhbj-tsts a {
		color: #302f66;
	}
	/*下部聊天部分*/

	.container .qhbj-liaotian {
		border: solid 1px #ddd;
		background: #fff;
	}
	/*头部聊天在线状态*/

	.container .qhbj-lttb {
		color: #333;
		border-bottom: none;
		background: #f5f5f5;
	}

	.container .qhbj-lttb i {
		font-style: normal;
		color: #666;
	}

	.container .qhbj-lttb span {
		color: #302f66;
	}
	/*查看更多*/

	.container .qhbj-ckgd p {
		margin-top: 15px;
		padding: 4px 12px;
		background: #fff;
		box-shadow: 2px 2px 5px #ccc;
		color: #666;
	}
	/*聊天信息展示区域*/
	/*系统消息样式*/

	.container .qhbj-xtxxin {
		color: #333;
		background: #e9f0f3;
	}
	/*卖家聊天信息样式部分*/

	.container .qhbj-lttxmj {
		background: #302f66;
	}

	.container .qhbj-lttxmj i {
		color: #fff;
	}
	/*卖家聊天气泡框样式*/

	.container .qhbj-nrxxmj {
		border: none;
		color: #333;
		background: #f5f5f5;
	}
	/*卖家聊天气泡框三角样式*/

	.container .qhbj-arrowl em {
		border-color: transparent #f5f5f5 transparent transparent;
		left: 2px;
	}

	.container .qhbj-arrowl span {
		border-color: transparent #f5f5f5 transparent transparent;
		left: 2px;
	}

	.container .qhbj-arrowltp em {
		border-color: transparent #f5f5f5 transparent transparent;
	}

	.container .qhbj-arrowltp span {
		border-color: transparent #f5f5f5 transparent transparent;
		left: 1px;
	}

	.container .qhbj-tpmj {
		border: solid 2px #f5f5f5;
		background: #f5f5f5;
	}

	.container .qhbj-ltsjmj {
		color: #999;
	}
	/*己方聊天信息样式部分*/

	.container .qhbj-lttxjf {
		background: #302f66;
	}

	.container .qhbj-lttxjf i {
		color: #fff;
	}
	/*己方聊天气泡框样式*/

	.container .qhbj-nrxxjf {
		background: #a7a4fe;
		color: #333;
		border: none;
	}
	/*己方聊天气泡框三角样式*/

	.container .qhbj-arrowr em {
		border-color: transparent transparent transparent #a7a4fe;
		right: 20px;
	}

	.container .qhbj-arrowr span {
		border-color: transparent transparent transparent #a7a4fe;
		right: 24px;
	}

	.container .qhbj-arrowrtp em {
		border-color: transparent transparent transparent #a7a4fe;
		right: 20px;
	}

	.container .qhbj-arrowrtp span {
		border-color: transparent transparent transparent #a7a4fe;
		right: 24px;
	}

	.container .qhbj-tpjf {
		border: none;
		background: #a7a4fe;
	}

	.container .qhbj-ltsjjf {
		color: #999;
	}
	/*底部文本图片发送部分*/

	.container .qhbj-txt input {
		color: #333;
		background: #fff;
		border: solid 1px #ddd;
	}

	.container .qhbj-fs input {
		background: #302f66;
	}

	.container .qhbj-ltxxinner .qhbj-tp {
		background: #302f66;
	}
	/*我要申诉弹框部分*/

	.container .qhbj-sstkcon {
		background: #fff;
	}

	.container .qhbj-sstktit {
		border-bottom: solid 2px #ddd;
	}

	.container .qhbj-sstktit p {
		color: #333;
	}

	.container .qhbj-sstktit i {
		color: #333;
	}

	.container .qhbj-ssts {
		color: #333;
	}

	.container .qhbj-sslx {
		color: #333;
	}

	.container .qhbj-sslx p {
		color: #333;
	}

	.container .qhbj-ssly p {
		color: #333;
	}

	.container .qhbj-ssly .tta textarea {
		color: #333;
		border: solid 1px #ccc;
		background: #fff;
	}

	.container .qhbj-ssly .tta textarea::-webkit-input-placeholder {
		color: #999;
	}

	.container .qhbj-ssly .tta textarea:-moz-placeholder {
		color: #999;
	}

	.container .qhbj-ssly .tta textarea::-moz-placeholder {
		color: #999;
	}

	.container .qhbj-ssly .tta textarea:-ms-input-placeholder {
		color: #999;
	}

	.container .qhbj-ssly .tta p {
		color: #333;
	}

	.container .qhbj-ssbtn {
		border-top: solid 1px #ddd;
	}

	.container .qhbj-ssbtn div {
		color: #333;
	}

	.container .qhbj-ssbtn div:nth-child(2) {
		background: #302f66;
		color: #fff;
	}
	/*确认付款弹框*/

	.container .qhbj-qrtkqrts {
		color: #333;
	}
	/*取消订单弹框*/

	.container .qhbj-qxtkcon {
		background: #fff;
	}

	.container .qhbj-qxtktit {
		border-bottom: solid 2px #ddd;
	}

	.container .qhbj-qxtktit p {
		color: #333;
	}

	.container .qhbj-qxtktit i {
		color: #333;
	}

	.container .qhbj-qxts {
		color: #333;
	}
	/*确认放行弹框*/

	.container .qhbj-fxts p {
		color: #333;
	}

	.container .qhbj-zjmm p {
		color: #333;
	}

	.container .qhbj-zjmm input {
		border: solid 2px #ccc;
		color: #333;
		background: #fff;
	}

	.container .qhbj-qrxx .rad input {
		background: #fff;
	}

	.container .qhbj-qrxx .radtex {
		color: #333;
	}

	.container .qhbj-qrfxbtn {
		color: #fff;
		background: #302f66;
	}
	/*联系卖家弹框*/

	.container .qhbj-lxmjdh {
		color: #333;
	}
	/*微信 支付宝二维码*/

	.container .qhbj-wxewm {
		background: #fff;
		border: solid 1px #ddd;
	}

	.container .qhbj-zfbewm {
		background: #fff;
		border: solid 1px #ddd;
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
	/*媒体查询,大于1900px*/

	@media only screen and (min-width: 1900px) {
		.xinxi {
			width: 1350px !important;
		}
		.liaotian {
			width: 1350px !important;
		}
		.ddzf {
			width: 845px !important;
		}
		.maijia {
			width: 475px !important;
		}
		.xx {
			width: 265px !important;
			font-size: 16px !important;
		}
		.je {
			width: 230px !important;
		}
		.je h6 {
			font-size: 16px !important;
		}
		.fk {
			width: 345px !important;
		}
		.fk-t p {
			padding-left: 40px !important;
			font-size: 16px !important;
		}
		.sskl i {
			font-size: 17px !important;
		}
		.fk-b p {
			padding: 15px 40px !important;
			font-size: 16px !important;
			line-height: 30px !important;
		}
		.fk-b .jycg {
			font-size: 22px !important;
		}
		.fkbtn .wyfk {
			position: absolute;
			left: 40px !important;
			top: 0 !important;
			font-size: 16px !important;
		}
		.fkbtn .qxjy {
			position: absolute;
			left: 195px !important;
			top: 0 !important;
			font-size: 16px !important;
		}
		.fkbtn button {
			height: 35px !important;
		}
		.cj {
			font-size: 18px !important;
		}
		.jyts {
			font-size: 16px !important;
		}
		.jyts h6 {
			padding-left: 40px !important;
		}
		.jyts i {
			font-size: 17px !important;
		}
		.tsts p {
			line-height: 23px !important;
		}
		.ddltb p:nth-child(1) {
			font-size: 21px !important;
		}
		.ddltb p:nth-child(2) {
			padding-left: 20px !important;
		}
		.ddltb p:nth-child(3) {
			font-size: 20px !important;
		}
		.mjtb {
			font-size: 18px !important;
		}
		.lttb p {
			font-size: 18px;
		}
		.ckgd p {
			font-size: 14px !important;
		}
		.wxewm {
			width: 300px !important;
			/*height: 350px !important;*/
			position: absolute;
			left: 260px !important;
			top: 198px !important;
		}
		.wxewm img {
			width: 300px !important;
			/*height: 350px !important;*/
		}
		.zfbewm {
			width: 300px !important;
			/*height: 350px !important;*/
			position: absolute;
			left: 260px !important;
			top: 319px !important;
		}
		.zfbewm img {
			width: 300px !important;
			/*height: 350px !important;*/
		}
	}
	/*主体部分*/

	.container {
		width: 100%;
		background: #191828;
	}
	/*上部信息部分*/

	.xinxi {
		width: 1128px;
		height: 420px;
		padding-top: 20px;
		margin: auto;
		position: relative;
	}
	/*上部左侧订单支付部分*/

	.ddzf {
		width: 700px;
		height: 420px;
		float: left;
		border: solid 2px #2c2a3e;
	}

	.ddltb {
		height: 55px;
		line-height: 55px;
		color: #fff;
		border-bottom: solid 1px #57517f;
	}

	.ddltb p {
		float: left;
	}

	.ddltb p:nth-child(1) {
		font-size: 19px;
		padding-left: 20px;
	}

	.ddltb p:nth-child(2) {
		font-size: 16px;
		padding-left: 20px;
	}

	.ddltb p:nth-child(3) {
		float: right;
		padding-right: 20px;
		font-size: 18px;
	}
	/*卖家收款方式部分*/

	.xx {
		width: 223px !important;
		height: 364px;
		font-size: 14px;
		color: #fff;
		float: left;
		border-right: solid 2px #3e3a5b;
	}

	.xx div {
		height: 120px;
		cursor: pointer;
	}

	.xx .wx {
		height: 121px;
		cursor: pointer;
	}

	.yinhangka {
		border-bottom: solid 1px #1f1d33;
	}

	.weixin {
		border-bottom: solid 1px #1f1d33;
	}

	.xx h5 {
		padding-left: 20px;
		padding-top: 20px;
	}

	.xx h6 {
		padding-top: 55px;
		text-align: center;
	}

	.xx i {
		padding-right: 10px;
		font-size: 20px;
	}

	.xx p {
		padding-top: 15px;
		padding-left: 52px;
	}

	.xx .number {
		float: left;
	}

	.xx .ewm {
		display: inline-block;
		width: 20px;
		height: 20px;
		padding-right: 15px;
		float: right;
	}

	.xx .ewm img {
		width: 100%;
		height: 100%;
	}
	/*交易金额、价格、数量部分*/

	.je {
		width: 180px;
		height: 364px;
		float: left;
		color: #fff;
		border-right: solid 2px #3e3a5b;
	}

	.je div {
		height: 120px;
		border-bottom: solid 2px #1f1d33;
	}

	.je .jg {
		border-bottom: none;
	}

	.je h6 {
		font-size: 14px;
		padding-left: 20px;
		padding-top: 20px;
	}

	.je p {
		padding-left: 20px;
		padding-top: 20px;
	}
	/*点击付款以及取消交易部分*/

	.fk {
		width: 293px;
		height: 364px;
		color: #fff;
		float: left;
	}

	.fk-t {
		height: 120px;
		border-bottom: solid 2px #1f1d33;
	}

	.fk-t p {
		padding-left: 20px;
		padding-top: 20px;
		font-size: 14px;
		color: #fff;
	}

	.sskl {
		height: 20px;
		line-height: 20px;
	}

	.sskl i {
		padding-right: 10px;
		font-size: 13px;
		color: #f00;
		float: left;
	}

	.sskl span {
		float: left;
	}

	.fk-b p {
		padding: 15px 20px;
		line-height: 30px;
		font-size: 14px;
	}

	.fk-b .jycg {
		text-align: center;
		font-size: 20px;
	}

	.fkbtn {
		height: 35px;
		margin-top: 30px;
		position: relative;
	}

	.fkbtn button {
		width: 115px;
		height: 35px;
		color: #fff;
		outline: none;
		border: none;
		cursor: pointer;
		border-radius: 5px;
	}

	.fkbtn .wyfk {
		background: #464593;
		position: absolute;
		left: 20px;
		top: 0;
	}

	.fkbtn .qxjy {
		border: solid 2px #323150;
		background: #191828;
		position: absolute;
		left: 165px;
		top: 0;
	}

	.fkbtn .qrfx {
		background: #191828;
		border: solid 2px #323150;
	}

	.fkbtn .qxssanjy {
		border: solid 2px #323150;
		background: #191828;
		cursor: not-allowed;
	}

	.fkbtn .fxactive {
		background: #464593;
		border: solid 2px #464593;
	}
	/*付款按钮提示框部分*/

	.fktsk {
		width: 200px;
		height: 30px;
		line-height: 30px;
		margin-left: 20px;
		margin-top: 20px;
		text-align: center;
		background: #353664;
		position: relative;
		border-radius: 5px;
		font-size: 13px;
	}

	.fxtsk {
		width: 190px;
		height: 40px;
		line-height: 20px;
		margin-left: 20px;
		margin-top: 20px;
		padding: 5px;
		text-align: center;
		background: #353664;
		position: relative;
		border-radius: 5px;
		font-size: 13px;
	}

	.arrow-fkts {
		position: absolute;
		width: 20px;
		height: 20px;
		left: 45px;
		top: -20px;
	}

	.arrow-fkts * {
		display: block;
		border-width: 10px;
		position: absolute;
		border-style: dashed dashed solid dashed;
		font-size: 0;
		line-height: 0;
	}

	.arrow-fkts em {
		border-color: transparent transparent #353664 transparent;
	}

	.arrow-fkts span {
		border-color: transparent transparent #353664 transparent;
	}
	/*微信、支付宝外侧二维码部分*/

	.wxewm {
		width: 150px;
		height: 220px;
		position: absolute;
		left: 215px;
		top: 198px;
		background: #454592;
		z-index: 99;
	}

	.wxewm img {
		width: 300px;
		/*height: 350px;*/
	}

	.zfbewm {
		width: 150px;
		height: 220px;
		position: absolute;
		left: 215px;
		top: 319px;
		background: #454592;
		z-index: 99;
	}

	.zfbewm img {
		width: 300px;
		/*height: 350px;*/
	}
	/*上部右侧商家部分*/

	.maijia {
		width: 400px;
		height: 420px;
		float: right;
		border: solid 2px #2c2a3e;
	}

	.mjtb {
		height: 55px;
		line-height: 55px;
		font-size: 16px;
		color: #fff;
		border-bottom: solid 1px #57517f;
	}

	.mjtb p:nth-child(1) {
		float: left;
		padding-left: 20px;
	}

	.mjtb p:nth-child(2) {
		float: right;
		padding-right: 20px;
		cursor: pointer;
	}

	.mjtb i {
		font-size: 16px;
		padding-right: 10px;
	}

	.cj {
		height: 78px;
		font-size: 16px;
		color: #fff;
		border-bottom: solid 2px #1d1d33;
	}

	.cj ul li {
		width: 33%;
		float: left;
	}

	.cj p {
		padding-top: 16px;
		text-align: center;
	}

	.cj .ds {
		font-size: 14px;
	}

	.jyts {
		height: 282px;
		font-size: 13px;
		color: #fff;
	}

	.jyts h6 {
		height: 20px;
		line-height: 20px;
		padding-top: 20px;
		padding-left: 20px;
	}

	.jyts i {
		display: inline-block;
		padding-right: 10px;
		font-size: 13px;
		color: #f00;
		float: left;
	}

	.jyts span {
		float: left;
	}

	.tsts {
		width: 350px;
		height: 120px;
		margin: 15px auto;
	}

	.tsts p {
		line-height: 20px;
		padding-top: 10px;
	}

	.tsts a {
		color: #9a9ccf;
	}
	/*下部聊天部分*/

	.liaotian {
		width: 1128px;
		height: 690px;
		margin: 20px auto;
		border: solid 2px #2c2a3e;
		border-radius: 4px;
		box-sizing: border-box;
		position: relative;
	}
	/*头部聊天在线状态*/

	.lttb {
		height: 55px;
		line-height: 55px;
		color: #fff;
		border-bottom: solid 1px #57527b;
		border-top-left-radius: 4px;
		border-top-right-radius: 4px;
	}

	.lttb p {
		margin-left: 22px;
	}

	.lttb i {
		font-style: normal;
	}

	.lttb span {
		float: right;
		padding-right: 22px;
	}
	/*查看更多*/

	.ckgd {
		height: 70px;
		padding: 1px;
	}

	.ckgd p {
		width: 70px;
		height: 30px;
		line-height: 30px;
		text-align: center;
		margin: 10px auto;
		color: #fff;
		padding: 4px 12px;
		cursor: pointer;
	}
	/*聊天信息展示区域*/

	.ltzs {
		width: 100%;
		height: 450px;
		overflow: auto;
	}
	/*系统消息样式*/

	.xtxx {
		width: 100%;
		margin-top: 30px;
	}

	.xtxx-inner {
		width: 490px;
		min-height: 50px;
		margin: auto;
		color: #fff;
		background: #464593;
		border-radius: 5px;
		padding: 15px;
		font-size: 14px;
	}

	.xtxxts {
		line-height: 25px;
	}

	.xtxxsj {
		margin-left: 429px;
		padding-top: 2px;
	}
	/*卖家聊天信息样式部分*/

	.xxdt-mj {
		width: 100%;
		min-height: 45px;
		margin-top: 30px;
	}

	.lttx-mj {
		width: 45px;
		height: 45px;
		margin-left: 25px;
		float: left;
		background: #fff;
	}

	.lttx-mj i {
		display: inline-block;
		font-size: 40px;
		padding-top: 5px;
		padding-left: 3px;
		color: #2f2e67;
	}
	/*卖家聊天气泡框样式*/

	.nrxx-mj {
		max-width: 50%;
		color: #fff;
		border: solid 2px #fff;
		border-radius: 5px;
		float: left;
		padding: 8px 12px;
		line-height: 25px;
		position: relative;
		margin-left: 25px;
		font-size: 15px;
		word-wrap: break-word;
		word-break: break-all;
	}
	/*卖家聊天气泡框三角样式*/

	.arrow-l {
		position: absolute;
		width: 40px;
		height: 40px;
		left: -14px;
	}

	.arrow-l * {
		display: block;
		border-width: 6px;
		position: absolute;
		border-style: dashed solid dashed dashed;
		font-size: 0;
		line-height: 0;
	}

	.arrow-l em {
		border-color: transparent #fff transparent transparent;
	}

	.arrow-l span {
		border-color: transparent #191828 transparent transparent;
		left: 3px;
	}

	.arrow-ltp {
		position: absolute;
		width: 40px;
		height: 40px;
		top: 8px;
		left: -14px;
	}

	.arrow-ltp * {
		display: block;
		border-width: 6px;
		position: absolute;
		border-style: dashed solid dashed dashed;
		font-size: 0;
		line-height: 0;
	}

	.arrow-ltp em {
		border-color: transparent #fff transparent transparent;
	}

	.arrow-ltp span {
		border-color: transparent #191828 transparent transparent;
		left: 3px;
	}

	.tp-mj {
		width: 115px;
		height: 100px;
		float: left;
		margin-left: 25px;
		border: solid 2px #fff;
		border-radius: 5px;
		cursor: pointer;
		position: relative;
	}

	.tp-mj img {
		width: 83px;
		height: 83px;
		padding: 8px 17px;
	}

	.ltsj-mj {
		height: 45px;
		line-height: 45px;
		color: #fff;
		float: left;
		margin-left: 20px;
	}
	/*己方聊天信息样式部分*/

	.xxdt-jf {
		width: 100%;
		margin-top: 30px;
	}

	.lttx-jf {
		width: 45px;
		height: 45px;
		margin-right: 25px;
		float: right;
		background: #fff;
	}

	.lttx-jf i {
		display: inline-block;
		font-size: 40px;
		padding-top: 6px;
		padding-left: 3px;
		color: #675eb9;
	}
	/*己方聊天气泡框样式*/

	.nrxx-jf {
		max-width: 50%;
		color: #fff;
		border: solid 2px #dbd7ff;
		border-radius: 5px;
		float: right;
		padding: 8px 12px;
		line-height: 25px;
		position: relative;
		margin-right: 25px;
		font-size: 15px;
		word-wrap: break-word;
		word-break: break-all;
	}
	/*己方聊天气泡框三角样式*/

	.arrow-r {
		position: absolute;
		width: 40px;
		height: 40px;
		right: -32px;
	}

	.arrow-r * {
		display: block;
		border-width: 6px;
		position: absolute;
		border-style: dashed dashed dashed solid;
		font-size: 0;
		line-height: 0;
	}

	.arrow-r em {
		border-color: transparent transparent transparent #dbd7ff;
		right: 18px;
	}

	.arrow-r span {
		border-color: transparent transparent transparent #191828;
		right: 22px;
	}

	.arrow-rtp {
		position: absolute;
		width: 40px;
		height: 40px;
		top: 8px;
		right: -32px;
	}

	.arrow-rtp * {
		display: block;
		border-width: 6px;
		position: absolute;
		border-style: dashed dashed dashed solid;
		font-size: 0;
		line-height: 0;
	}

	.arrow-rtp em {
		border-color: transparent transparent transparent #dbd7ff;
		right: 18px;
	}

	.arrow-rtp span {
		border-color: transparent transparent transparent #191828;
		right: 22px;
	}

	.tp-jf {
		width: 115px;
		height: 100px;
		margin-right: 25px;
		float: right;
		border: solid 2px #dbd7ff;
		border-radius: 5px;
		cursor: pointer;
		position: relative;
	}

	.tp-jf img {
		width: 83px;
		height: 83px;
		padding: 8px 17px;
	}

	.ltsj-jf {
		height: 45px;
		line-height: 45px;
		color: #fff;
		float: right;
		margin-right: 20px;
	}
	/*底部文本图片发送部分*/

	.ltxx {
		width: 100%;
		height: 130px;
		position: absolute;
		left: 0;
		bottom: 0;
	}

	.ltxx-inner {
		width: 920px;
		height: 60px;
		line-height: 20px;
		margin: 35px auto;
		display: flex;
		align-items: center;
	}

	.ltxx-inner input {
		border: none;
		outline: none;
		border-radius: 5px;
	}

	.ltxx-inner .txt {
		width: 542px;
		height: 60px;
		float: left;
	}

	.txt input {
		width: 520px;
		height: 45px;
		padding-left: 20px;
		color: #fff;
		background: #191828;
		border: solid 1px #59538f;
	}

	.ltxx-inner .fs,
	.tp {
		width: 74px;
		height: 45px;
		line-height: 45px;
		margin-left: 30px;
		border-radius: 5px;
		text-align: center;
		float: left;
		font-size: 15px;
	}

	.fs input {
		width: 76px;
		height: 45px;
		color: #fff;
		background: #3f3fa3;
		cursor: pointer;
		font-size: 15px;
	}

	.ltxx-inner .tp {
		position: relative;
		color: #fff;
		cursor: pointer;
		background: #3f3fa3;
		font-size: 15px;
	}

	.tp input {
		display: inline-block;
		width: 76px;
		cursor: pointer;
		height: 43px;
		line-height: 45px;
		position: absolute;
		right: 0;
		top: 2px;
		opacity: 0;
		filter: alpha(opacity=0);
	}

	.ltxx .ltxx-inner .fsjy {
		cursor: not-allowed;
		font-size: 15px;
	}

	.ltxx .ltxx-inner .fsjy input {
		cursor: not-allowed !important;
	}

	.ltxx-inner .ltinfo {
		display: inline-block;
		width: 160px;
		margin-left: 10px;
		float: left;
		font-size: 13px;
		color: #f00;
	}
	/*图片弹框*/

	.tptk {
		width: 100%;
		height: 100%;
		position: fixed;
		left: 0;
		top: 0;
	}

	.tp-cont {
		width: 900px;
		height: 25px;
		position: absolute;
		left: 50%;
		top: 10%;
		margin-left: -450px;
		border-radius: 5px;
	}

	.tp-cont i {
		font-size: 25px;
		float: right;
		color: #fff;
		display: inline-block;
		cursor: pointer;
	}

	.picview-pop {
		display: none;
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: rgba(0, 0, 0, 0.6);
		user-select: none;
		overflow: hidden;
	}

	.picview-pop .rote {
		display: block;
		width: 40px;
		height: 40px;
		cursor: pointer;
		position: absolute;
		right: 50%;
		margin-right: -20px;
		top: 90%;
		z-index: 9999;
		color: #fff;
	}

	.picview-pop img {
		cursor: move;
		position: absolute;
	}
	/*确认付款弹框*/

	.qrtk {
		width: 100%;
		height: 100%;
		position: fixed;
		left: 0;
		top: 0;
	}

	.qrtk-mengbu {
		width: 100%;
		height: 100%;
		background: rgba(0, 0, 0, 0.6);
	}

	.qrtk-content {
		width: 350px;
		height: 225px;
		position: absolute;
		left: 50%;
		top: 50%;
		margin-left: -175px;
		margin-top: -112px;
		background: #22223f;
		border-radius: 5px;
	}

	.qrtk-tit {
		width: 305px;
		height: 65px;
		line-height: 65px;
		margin: auto;
		border-bottom: solid 2px #3c3b5e;
	}

	.qrtk-tit p {
		float: left;
		font-size: 16px;
		color: #fff;
	}

	.qrtk-tit i {
		font-size: 16px;
		float: right;
		color: #fff;
		display: inline-block;
		cursor: pointer;
	}

	.qrts {
		width: 305px;
		height: 50px;
		padding-top: 25px;
		font-size: 14px;
		color: #fff;
		margin: auto;
	}

	.fkinfo {
		width: 305px;
		height: 20px;
		line-height: 20px;
		margin: auto;
		font-size: 14px;
		color: #f00;
	}

	.qrbtn {
		width: 100%;
		height: 60px;
		line-height: 60px;
		border-top: solid 1px #3c3b5e;
		position: absolute;
		left: 0;
		bottom: 0;
	}

	.qrbtn div {
		width: 174.5px;
		color: #fff;
		font-size: 16px;
		text-align: center;
		cursor: pointer;
		float: left;
	}

	.qrbtn div:nth-child(1) {
		border-right: solid 1px #3c3b5e;
	}
	/*取消订单弹框*/

	.qxtk {
		width: 100%;
		height: 100%;
		position: fixed;
		left: 0;
		top: 0;
	}

	.qxtk-mengbu {
		width: 100%;
		height: 100%;
		background: rgba(0, 0, 0, 0.6);
	}

	.qxtk-content {
		width: 350px;
		height: 240px;
		position: absolute;
		left: 50%;
		top: 50%;
		margin-left: -175px;
		margin-top: -120px;
		background: #22223f;
		border-radius: 5px;
	}

	.qxtk-tit {
		width: 305px;
		height: 65px;
		line-height: 65px;
		margin: auto;
		border-bottom: solid 2px #3c3b5e;
	}

	.qxtk-tit p {
		float: left;
		font-size: 16px;
		color: #fff;
	}

	.qxtk-tit i {
		font-size: 16px;
		float: right;
		color: #fff;
		display: inline-block;
		cursor: pointer;
	}

	.qxts {
		width: 305px;
		line-height: 25px;
		font-size: 14px;
		color: #fff;
		padding: 10px 0;
		margin: auto;
	}

	.qxddinfo {
		width: 305px;
		margin: auto;
		color: #f00;
		font-size: 14px;
	}

	.qxbtn {
		width: 100%;
		height: 55px;
		line-height: 55px;
		margin-top: 31px;
		border-top: solid 1px #3c3b5e;
		position: absolute;
		left: 0;
		bottom: 0;
	}

	.qxbtn div {
		width: 174.5px;
		color: #fff;
		font-size: 16px;
		text-align: center;
		cursor: pointer;
		float: left;
	}

	.qxbtn div:nth-child(1) {
		border-right: solid 1px #3c3b5e;
	}
	/*我要申诉弹框部分*/

	.sstk {
		width: 100%;
		height: 100%;
		position: fixed;
		left: 0;
		top: 0;
	}

	.sstk-mengbu {
		width: 100%;
		height: 100%;
		background: rgba(0, 0, 0, 0.6);
	}

	.sstk-content {
		width: 470px;
		height: 456px;
		position: absolute;
		left: 50%;
		top: 50%;
		margin-left: -235px;
		margin-top: -228px;
		background: #22223f;
		border-radius: 5px;
	}

	.sstk-tit {
		width: 420px;
		height: 70px;
		line-height: 70px;
		margin: auto;
		border-bottom: solid 2px #3c3b5e;
	}

	.sstk-tit p {
		float: left;
		font-size: 16px;
		color: #fff;
	}

	.sstk-tit i {
		font-size: 16px;
		float: right;
		color: #fff;
		display: inline-block;
		cursor: pointer;
	}

	.ssts {
		width: 420px;
		height: 90px;
		line-height: 25px;
		font-size: 14px;
		color: #fff;
		margin: auto;
		padding-top: 15px;
	}

	.sslx {
		width: 420px;
		height: 42px;
		line-height: 42px;
		color: #fff;
		margin: auto;
	}

	.sslx p {
		font-size: 16px;
		color: #fff;
		float: left;
	}

	.sslx .xlcd {
		width: 340px;
		height: 42px;
		float: left;
		margin-left: 15px;
	}

	.ssly {
		width: 420px;
		height: 110px;
		margin: 20px auto;
	}

	.ssly p {
		margin-top: 10px;
		color: #fff;
		font-size: 16px;
		float: left;
	}

	.ssly .tta {
		width: 340px;
		height: 125px;
		float: left;
		margin-left: 15px;
	}

	.ssly .tta textarea {
		width: 305px;
		height: 68px;
		padding: 15px;
		color: #fff;
		border: solid 2px #3b3c53;
		border-radius: 5px;
		background: #22223f;
		user-zoom: initial;
		outline: none;
		resize: none;
	}

	.ssly .tta textarea::-webkit-input-placeholder {
		color: #fff;
	}

	.ssly .tta textarea:-moz-placeholder {
		color: #fff;
	}

	.ssly .tta textarea::-moz-placeholder {
		color: #fff;
	}

	.ssly .tta textarea:-ms-input-placeholder {
		color: #fff;
	}

	.ssly .tta p {
		color: #fff;
		font-size: 12px;
	}

	.ssinfo {
		height: 20px;
		line-height: 20px;
		padding-left: 100px;
		color: #f00;
		font-size: 13px;
	}

	.ssbtn {
		width: 100%;
		height: 55px;
		line-height: 55px;
		margin-top: 10px;
		border-top: solid 1px #3c3b5e;
		position: absolute;
		left: 0;
		bottom: 0;
	}

	.ssbtn div {
		width: 50%;
		color: #fff;
		box-sizing: border-box;
		font-size: 16px;
		text-align: center;
		cursor: pointer;
		float: left;
	}

	.ssbtn div:nth-child(1) {
		border-right: solid 1px #3c3b5e;
	}
	/*确认放行弹框*/

	.fxtk {
		width: 100%;
		height: 100%;
		position: fixed;
		left: 0;
		top: 0;
	}

	.fxtk-mengbu {
		width: 100%;
		height: 100%;
		background: rgba(0, 0, 0, 0.6);
	}

	.fxtk-content {
		width: 350px;
		height: 293px;
		position: absolute;
		left: 50%;
		top: 50%;
		margin-left: -175px;
		margin-top: -146px;
		background: #22223f;
		border-radius: 5px;
	}

	.fxtk-tit {
		width: 305px;
		height: 65px;
		line-height: 65px;
		margin: auto;
		border-bottom: solid 2px #3c3b5e;
	}

	.fxtk-tit p {
		float: left;
		font-size: 16px;
		color: #fff;
	}

	.fxtk-tit i {
		font-size: 16px;
		float: right;
		color: #fff;
		display: inline-block;
		cursor: pointer;
	}

	.fxts {
		width: 305px;
		height: 80px;
		margin: auto;
	}

	.fxts p {
		font-size: 13px;
		color: #fff;
		line-height: 20px;
		padding-top: 20px;
	}

	.zjmm {
		width: 305px;
		height: 35px;
		line-height: 35px;
		margin: auto;
	}

	.zjmm p {
		font-size: 13px;
		color: #fff;
		float: left;
	}

	.zjmm .inp {
		width: 225px;
		height: 35px;
		border-radius: 5px;
		float: left;
		margin-left: 20px;
	}

	.zjmm input {
		width: 215px;
		height: 31px;
		padding-left: 15px;
		font-size: 13px;
		border: solid 2px #444366;
		border-radius: 5px;
		outline: none;
		color: #fff;
		background: #222140;
	}

	.qrxx {
		width: 300px;
		height: 20px;
		margin: auto;
		margin-top: 10px;
	}

	.qrxx .rad {
		float: left;
	}

	.qrxx .rad input {
		width: 13px;
		height: 13px;
		margin-left: 70px;
		background: #22223f;
	}

	.qrxx .radtex {
		float: left;
		color: #fff;
		font-size: 12px;
		padding-left: 5px;
	}

	.fxinfo {
		height: 25px;
		color: #f00;
		font-size: 13px;
	}

	.fxinfo p {
		margin-left: 95px;
		margin-bottom: 10px;
	}

	.qrfxbtn {
		width: 100%;
		height: 60px;
		line-height: 60px;
		text-align: center;
		color: #fff;
		font-size: 17px;
		border-top: solid 1px #454166;
		cursor: pointer;
		position: absolute;
		left: 0;
		bottom: 0;
	}
	/*联系卖家弹框*/

	.lxmjtk {
		width: 100%;
		height: 100%;
		position: fixed;
		left: 0;
		top: 0;
	}

	.lxmjtk-mengbu {
		width: 100%;
		height: 100%;
		background: rgba(0, 0, 0, 0.6);
	}

	.lxmj-cont {
		width: 495px;
		height: 300px;
		position: absolute;
		left: 50%;
		top: 50%;
		margin-left: -247px;
		margin-top: -184px;
		background: #22223f;
		border-radius: 5px;
	}

	.lxmj-tit {
		width: 430px;
		height: 65px;
		line-height: 65px;
		margin: auto;
		border-bottom: solid 2px #3c3b5e;
	}

	.lxmj-tit p {
		float: left;
		font-size: 16px;
		color: #fff;
	}

	.lxmj-tit i {
		font-size: 16px;
		float: right;
		color: #fff;
		display: inline-block;
		cursor: pointer;
	}

	.lxmjdh {
		width: 430px;
		height: 170px;
		color: #fff;
		text-align: center;
		margin: auto;
	}

	.dhts {
		margin-top: 35px;
		font-size: 18px;
	}

	.dh {
		margin-top: 20px;
		font-size: 22px;
	}

	.ys {
		margin-top: 25px;
	}

	.lxmjbtn {
		width: 100%;
		height: 60px;
		line-height: 60px;
		border-top: solid 2px #3c3b5e;
		color: #fff;
		font-size: 18px;
		position: absolute;
		left: 0;
		bottom: 0;
	}

	.lxmjbtn div {
		width: 247px;
		float: left;
		text-align: center;
		cursor: pointer;
	}

	.lxmjbtn div:nth-child(1) {
		border-right: solid 1px #3c3b5e;
	}
</style>
