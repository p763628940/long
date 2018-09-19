<template>
	<div id="Exchangeofdetails">
		<!--测变栏-->
		<div class="contact">
			<div class="user">
				<i class="iconfont icon-morentouxiang"></i>
			</div>
			<div class="mobile" @click="Mobile">
				<i class="iconfont icon-dianhua"></i>
			</div>
			<!--<div class="information1">
				<i class="iconfont icon-xiaoxi"></i>
			</div>-->
		</div>
		<!--是否确认兑换-->
		<div class="men_ban" v-if="isExchange"></div>
		<div class="exchange_alear" v-if="isExchange">
			<div class="top">
				<div class="title">
					<i class="iconfont icon-cuowu" @click="isExchange=false;Fundpassword=''"></i>
				</div>
				<div class="isDui">{{$t("taocoin.SureExchange")}}</div>
				<div class="xuZhi">{{$t("taocoin.NeedPay")}}<span class="orange">{{selectStocks.c_num/selectStocks.m_num*ExchangeAmount | number(selectStocks.currency.displayNum)}}</span>{{selectStocks.currency.pageIdentifier}}</div>
				<div class="oinput">
					<input type="password" v-model="Fundpassword" />
				</div>
				<p class="tiShi">{{$t("taocoin.ClickConfirmNotBack")}}</p>
			</div>
			<div class="confirm">
				<span @click="isExchange=false;Fundpassword=''">{{$t("userCenter.Cancel")}}</span>
				<button @click="ConfirmExchange">{{$t("userCenter.determine")}}</button>
			</div>
		</div>
    <!--蒙版-->
    <div class="men_ban" v-if="isIdentity"></div>
    <!--判断是否进行高级认证-->
    <div class="voteBox" v-if="isIdentity">
      <div class="title">
        <i class="iconfont icon-cuowu" @click="isIdentity=false"></i>
      </div>
      <div class="content">
        {{$t('taocoin.SellerNeedComplete')}}
      </div>
      <div class="bottom">
        <button class="cancel" @click="isIdentity=false">{{$t("vote.LetmeThink")}}</button>
        <button class="confirm" @click="toIdentity">{{$t("vote.Verify")}}</button>
      </div>
    </div>
    <!--蒙版-->
    <div class="men_ban" v-if="isBandingMobile"></div>
    <!--判断是否绑定手机-->
    <div class="voteBox" v-if="isBandingMobile">
      <div class="title">
        <i class="iconfont icon-cuowu" @click="isBandingMobile=false"></i>
      </div>
      <div class="content">
        {{$t('taocoin.SellerNeedBind')}}
      </div>
      <div class="bottom">
        <button class="cancel" @click="isBandingMobile=false">{{$t("vote.LetmeThink")}}</button>
        <button class="confirm" @click="toBadingMobile">{{$t("taocoin.Bind")}}</button>
      </div>
    </div>
		<!--资产不足-->
		<div class="men_ban" v-if="isAssetsNoDate"></div>
		<div class="assets_alert" v-if="isAssetsNoDate">
			<div class="padding">
				<div class="title">
					<i class="iconfont icon-cuowu" @click="isAssetsNoDate=false"></i>
				</div>
				<div class="content">
					<div class="text">{{$t("taocoin.InsufficientAssets")}}</div>
					<div class="orange">
						{{$t("taocoin.OnlyLeft")}}<span>{{CurrencyBalance | number(8)}}</span>{{selectStocks.currency.pageIdentifier}},{{$t("taocoin.CannotExchange")}}
					</div>
				</div>
			</div>
			<div class="bottom">
				<button @click="isAssetsNoDate=false">{{$t("userCenter.determine")}}</button>
			</div>
		</div>
		<!--联系卖家-->
		<div class="men_ban" v-if="isMobile"></div>
		<div class="ContactInformation" v-if="isMobile">
			<div class="padding">
				<div class="title">
					<span class="Seller">{{$t("taocoin.ContactSeller")}}</span>
					<i class="iconfont icon-cuowu" @click="isMobile=false"></i>
				</div>
				<div class="content">
					<p class="mobie">{{CurrencyList.user.mobile}}</p>
				</div>
			</div>
			<div class="bottom">
				<span class="prompt">{{$t("fbjy.PrivacyProtection")}}</span>
				<button @click="isMobile=false">{{$t("userCenter.determine")}}</button>
			</div>
		</div>
		<!--已下架-->
		<div class="men_ban" v-if="isHasBeenRemoved"></div>
		<div class="HasBeenRemoved1" v-if="isHasBeenRemoved">
			<div class="padding">
				<div class="title">
					<i class="iconfont icon-cuowu" @click="isHasBeenRemoved=false"></i>
				</div>
				<div class="content">
					<p class="text">
						<i class="iconfont icon-gantanhao"></i> {{$t("taocoin.AlreadyRemoved")}}
					</p>
					<p class="gray">{{$t("taocoin.SelectOtherSellers")}}</p>
				</div>
			</div>
			<div class="bottom">
				<button @click="isHasBeenRemoved=false">{{$t("userCenter.determine")}}</button>
			</div>
		</div>
		<!--暂无库存-->
		<!--<div class="men_ban" v-if="isNoStockAvailable"></div>
		<div class="HasBeenRemoved" v-if="isNoStockAvailable">
			<div class="padding">
				<div class="title">
					<i class="iconfont icon-cuowu" @click="isNoStockAvailable=false"></i>
				</div>
				<div class="content">
					<p class="text">
						<i class="iconfont icon-gantanhao"></i> 库存不足
					</p>
					<p class="gray">此商家库存仅剩：<span class="Num">10000</span> IMX,无法完成兑换！</p>
				</div>
			</div>
			<div class="bottom">
				<button @click="isNoStockAvailable=false">确认</button>
			</div>
		</div>-->
		<div class="Exchangeofdetails_content">
			<!--风险提示-->
			<div class="Exchangeofdetails_header">
				<span class="risk">{{$t("taocoin.RiskReminder")}}：</span>{{$t("taocoin.InvestCoin")}}
			</div>
			<!--兑换内容部分-->
			<div class="ExchangeOfContent">
				<div class="title">
					<div class="oleft">
						<img :src="mainDetails.logoUrl" />
						<span class="briefIntroduction">{{mainDetails.pageIdentifier}}</span>
						<span class="FullName">{{mainDetails.fullName}}</span>
					</div>
					<ul class="oright" v-if="CurrencyList.is_auth || CurrencyList.is_mobile">
						<p>{{$t("taocoin.ExchangeLimit")}}：</p>
						<li v-if="CurrencyList.is_auth==1">
							<i class="iconfont icon-renzheng"></i>
							<span>{{$t("taocoin.AdvancedCertification")}}</span>
						</li>
						<li v-if="CurrencyList.is_mobile==1">
							<i class="iconfont icon-icon_bangdingshouji"></i>
							<span>{{$t("taocoin.BindPhoneNum")}}</span>
						</li>
					</ul>
				</div>
				<div class="content">
					<div class="currency">
						<p class="header">{{mainDetails.pageIdentifier}}{{$t("list.Introduction")}}</p>
						<p class="text">
							{{mainDetails.summary}}
						</p>
					</div>
					<div class="exchange">
						<!--兑价-->
						<div class="ExchangePrice">
							<div class="price">
                {{$t("taocoin.ExchangePrice")}}：
								<span class="Number">{{selectStocks.c_num/selectStocks.m_num | number(selectStocks.currency.displayNum)}}</span> {{selectStocks.currency.pageIdentifier}}
							</div>
							<ul class="currencyList">
								<li v-for="item in CurrencyList.stocks" @click="selectSot(item)">
									<img :src="item.currency.logoUrl" />
								</li>
							</ul>
						</div>
						<!--兑换量-->
						<div class="ExchangeRate">
							<p class="Rate">{{$t("taocoin.ExchangeAmount")}}</p>
							<div class="oInput_new">
								<div class="oleft">
									<div class="input">
										<input type="text" @input="clearNoNum($event,mainDetails.displayNum)" :placeholder="CurrencyList.lower | number(mainDetails.displayNum)" maxlength="14" v-model.number="ExchangeAmount" />
										<span>{{mainDetails.pageIdentifier}}</span>
									</div>
									<div class="button">
										<button class="add" @click="addNum(mainDetails.displayNum)">+</button>
										<button class="reduce" @click="reduce(mainDetails.displayNum)">-</button>
									</div>
								</div>
								<div class="oright">
									<p>{{CurrencyList.order_people_count}}{{$t("taocoin.XXexchange")}}</p>
									<span>{{$t("taocoin.Stocks")}}：{{CurrencyList.dec_balance | number(mainDetails.displayNum)}}{{mainDetails.pageIdentifier}}</span>
								</div>
							</div>
						</div>
						<!--需支付-->
						<div class="NeedToPay">
							<span class="text">{{$t("taocoin.NeedPay")}}：</span>
							<span class="Number">{{selectStocks.c_num/selectStocks.m_num*ExchangeAmount | number(selectStocks.currency.displayNum)}}</span>
							<span class="currencyName">{{selectStocks.currency.pageIdentifier}}</span>

						</div>
						<!--立即兑换-->
						<div class="submit_dui">
							<button @click="RedeemNow">{{$t("taocoin.ExchangeImmediate")}}</button>
              <span class="errText">{{errText}}</span>
						</div>
					</div>
				</div>
    </div>
			<!--兑换    说明    代币全称-->
			<div class="Description_box">
				<!--淘币说明-->
				<div class="Description">
					<p class="title">
						<span class="blue">{{$t("taocoin.TaocoinIntro")}}</span>
					</p>
					<p class="content">
							{{CurrencyList.goods_info}}
					</p>
				</div>
				<!--代币全称-->
				<div class="Token">
					<div class="title">
						<p class="blue">
              <span class="curName">{{mainDetails.pageIdentifier}}</span>
              <span class="fullName">{{mainDetails.fullName}}</span>
            </p>
						<p>
							<span @click="toOpen(mainDetails.officiaWebsite)">{{$t("taocoin.GoOfficialWebsite")}}</span>
							<span @click="toOpen(mainDetails.whitePaper)">{{$t("taocoin.ViewWhitePaper")}}</span>
						</p>
					</div>
					<p class="content">
						{{mainDetails.summary}}
					</p>
					<p class="ToUnderstanding">
						<router-link :to="{name:'bzzl',params:{id:mainDetails.id}}" tag="span">{{$t("taocoin.KnowMore")}}</router-link>
					</p>
				</div>
				<div class="Token" v-for="item in stocksList">
					<div class="title">
						<p class="blue">
              <span class="curName">{{item.currency.pageIdentifier}}</span>
              <span class="fullName">{{item.currency.fullName}}</span>
            </p>
						<p>
							<span @click="toOpen(item.currency.officiaWebsite)">{{$t("taocoin.GoOfficialWebsite")}}</span>
							<span @click="toOpen(item.currency.whitePaper)">{{$t("taocoin.ViewWhitePaper")}}</span>
						</p>
					</div>
					<p class="content">
						{{item.currency.summary}}
					</p>
					<p class="ToUnderstanding">
						<router-link :to="{name:'bzzl',params:{id:item.currency.id}}" tag="span">{{$t("taocoin.KnowMore")}}</router-link>
					</p>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import axios from "axios";
	import { httpUrl } from "../../http_url/http_url";
  import {mapState} from 'vuex';
	export default {
		data() {
			return {
				ExchangeAmount: "",
				/*兑换量*/
				isExchange: false,
				/*用户输入资金密码*/
				isAssets: false,
				/*用户资产为空*/
				isAssetsNoDate: false,
				/*用户资产为空*/
				isMobile: false,
				/*联系卖家*/
				isHasBeenRemoved: false,
				/*判断是否已经下架*/
				isNoStockAvailable: false,
				/*判读是否有库存*/
				currenCyId: this.$route.params.id,
				/*兑换币的详情*/
				mainDetails: {},
				/*主币内容*/
				CurrencyList: [],
				/*所有内容*/
				stocksList: [],
				/*对币列表*/
				selectStocks: {
					id: "",
					currency: {
						displayNum: 4,
						fullName: "",
						id: "",
						logoUrl: "",
						officiaWebsite: "",
						pageIdentifier: "",
						summary: "",
						whitePaper: "",
						zhName: ""
					}
				},
				/*选中兑换量*/
				CurrencyBalance: "",
				/*指定币种余额*/
				errText: "",
				/*错误提示*/
				Fundpassword: "",
				/*资金密码*/
				userList:{},  /*用户信息*/
				goods_id:"",  //兑换要传的goods_id
        isIdentity:false, //是否高级认证
        isBandingMobile:false, //是否手机验证
			}

		},
		mounted() {
			let _this = this;
      this.refreshLang();
			if(this.token==null&&this.token==undefined){
				return false;
			}
			/*获取用户信息*/
			axios.get(httpUrl.userInfo,{
				headers:{"Authorization":"Bearer "+this.token}
			}).then(function(res){
				_this.userList = res.data.data;
			},function(err){
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
    computed : {
      ...mapState('user',['lang']),
    },
    watch:{
      lang:function (val){
        this.refreshLang();
      }
    },
		methods: {
      refreshLang(){
        let _this= this;
        if(this.lang == "zh-CN") {
          /*获取币种信息*/
          axios.get(httpUrl.info, {
            params: {
              goods_id: this.currenCyId,
              lang:"zh"
            }
          }).then(function(res) {
            _this.CurrencyList = res.data.data;
            _this.mainDetails = res.data.data.main;
            _this.stocksList = res.data.data.stocks;
            _this.selectStocks = res.data.data.stocks[0];
            _this.goods_id = res.data.data.id;
            if(_this.token==null&&_this.token==undefined){
              return false;
            }
            /*获取指定币种余额*/
            axios.get(httpUrl.currencyBalance, {
              headers: {
                "Authorization": "Bearer " + _this.token
              },
              params: {
                currency_id: _this.selectStocks.currency.id
              }
            }).then(function(res) {
              if(res.data.data.length==0){
                _this.CurrencyBalance = "0.00"
                return false;
              };
              _this.CurrencyBalance = res.data.data.balance;
            }, function(err) {
              console.log(err)
            })
          }, function(err) {
            console.log(err)
          })
        }else{
          /*获取币种信息*/
          axios.get(httpUrl.info, {
            params: {
              goods_id: this.currenCyId,
              lang:"en"
            }
          }).then(function(res) {
            _this.CurrencyList = res.data.data;
            _this.mainDetails = res.data.data.main;
            _this.stocksList = res.data.data.stocks;
            _this.selectStocks = res.data.data.stocks[0];
            _this.goods_id = res.data.data.id;
            if(_this.token==null&&_this.token==undefined){
              return false;
            }
            /*获取指定币种余额*/
            axios.get(httpUrl.currencyBalance, {
              headers: {
                "Authorization": "Bearer " + _this.token
              },
              params: {
                currency_id: _this.selectStocks.currency.id
              }
            }).then(function(res) {
              if(res.data.data.length==0){
                _this.CurrencyBalance = "0.00"
                return false;
              };
              _this.CurrencyBalance = res.data.data.balance;
            }, function(err) {
              console.log(err)
            })
          }, function(err) {
            console.log(err)
          })
        }
      },
			selectSot(item){
				let _this = this;
				this.selectStocks = item;
				if(this.token==null&&this.token==undefined){
					return false;
				}
				/*获取指定币种余额*/
				axios.get(httpUrl.currencyBalance, {
					headers: {
						"Authorization": "Bearer " + _this.token
					},
					params: {
						currency_id: item.currency.id
					}
				}).then(function(res) {
					if(res.data.data.length==0){
						_this.CurrencyBalance = "0.00"
						return false;
					};
					_this.CurrencyBalance = res.data.data.balance;
				}, function(err) {
					console.log(err)
				})
			},
			Mobile(){
				if(this.token==null&&this.token==undefined){
					return false;
				}
				this.isMobile = true;
			},
			toOpen(oUrl){  /*打开新窗口*/
				window.open(oUrl)
			},
      toIdentity() { //跳转高级认证
        this.$router.push({
          name: "identity",
          params: {
            type: "normal"
          }
        })
      },
      toBadingMobile(){
        this.$router.push({
          name: "Accountsecurity",
          params: {
            bangdin: "no"
          }
        })
      },
			RedeemNow() { /*立即兑换*/
				let _this = this;
				if(this.token==null&&this.token==undefined){
					this.$router.push({name:"login"})
					return false;
				}
        if(this.CurrencyList.status!=0){
          this.$message({
            message: this.$t("fbjy.ProductRemoved"),
            type: 'warning'
          });
          return false;
        }
        if(Number(this.ExchangeAmount) < Number(this.CurrencyList.lower)){
          this.errText = _this.$t("taocoin.cannotbesmaller");
          setTimeout(function() {
            _this.errText = "";
          }, 1500)
          return false;
        }
        if(Number(this.ExchangeAmount) > this.CurrencyList.dec_balance){
          return false;
        }
				if(this.userList.auth_grade==0&&this.CurrencyList.is_auth==1) {
          this.isIdentity = true;
          return false;
        }
				if(this.userList.mobile_status==0&&this.CurrencyList.is_mobile==1){
					this.isBandingMobile = true;
					return false;
				}
				if(this.ExchangeAmount == "" || this.ExchangeAmount == 0) {
					return false;
				}
				if(this.selectStocks.c_num / this.selectStocks.m_num * this.ExchangeAmount > this.CurrencyBalance) { /*判断用户余额是否足够*/
					this.isAssetsNoDate = true;
					return false;
				}

				this.isExchange = true;
			},
			ConfirmExchange() { /*输入资金密码，确认兑换*/
				let _this = this;
				if(this.Fundpassword == "") {
					return false;
				}
				axios.post(httpUrl.place, {
					stocks_id: this.selectStocks.id,
					balance: this.ExchangeAmount,
					payPasswd: this.Fundpassword,
					goods_id:this.goods_id,
				}, {
					headers: {
						"Authorization": "Bearer " + _this.token
					}
				}).then(function(res) {
					if(res.data.status.code == 200) {
						_this.$router.push({
							name: "successfulRedemption"
						});
					}
				}, function(err) {
					console.log(err)
				})

			},
			clearNoNum(eve, num) {
				const regexp = /(?:\.0*|(\.\d+?)0+)$/;
				var toFixedNum = Number(this.ExchangeAmount).toFixed(num + 1);
				this.ExchangeAmount = toFixedNum.substring(0, toFixedNum.toString().length - 1);
				this.ExchangeAmount = this.ExchangeAmount.replace(regexp, '$1');
				if(this.ExchangeAmount == "" || eve.target.value == "") {
					this.ExchangeAmount = "";
				}
				if(isNaN(this.ExchangeAmount)) {
					this.ExchangeAmount = "";
				}
				eve.target.value = eve.target.value.replace(/[^\d.]/g, ""); //清除"数字"和"."以外的字符
				eve.target.value = eve.target.value.replace(/^\./g, ""); //验证第一个字符是数字而不是
				eve.target.value = eve.target.value.replace(/\.{2,}/g, "."); //只保留第一个. 清除多余的
				eve.target.value = eve.target.value.replace(".", "$#$").replace(/\./g, "").replace("$#$", ".");
				let _this = this;

        if(Number(this.ExchangeAmount) > Number(this.CurrencyList.balance)){
          this.errText = _this.$t("taocoin.AmountInsufficient");
          setTimeout(function() {
            _this.errText = "";
          }, 1000)
          this.ExchangeAmount = this.CurrencyList.balance;
        }
				if(Number(this.ExchangeAmount) > Number(this.CurrencyList.dec_balance)) {
					this.errText = _this.$t("taocoin.AmountInsufficient");
					setTimeout(function() {
						_this.errText = "";
					}, 1000)
					this.ExchangeAmount = this.CurrencyList.dec_balance;
				}
			},
			///增加
			addNum(num) {
			  //判断是否大于库存
        if(Number(this.ExchangeAmount) == Number(this.CurrencyList.dec_balance)) {
          return false;
        }
				var str = "1" + Array(num).join("0") + "0";
				var addNumber = Number(str);
				var NewNum = "";
				for(let i = 0; i < num - 1; i++) {
					NewNum += "0"
				}
				var pre = "0." + NewNum + "1";
				if(this.ExchangeAmount == 0 || this.ExchangeAmount == "") {
					this.ExchangeAmount = pre;
					return false;
				}
				///将获取到的值加
				var Num = Math.round(this.ExchangeAmount * addNumber);
				Num++;
				this.ExchangeAmount = (Num / addNumber).toFixed(num);
				var xsd = this.ExchangeAmount.toString().split(".");
				if(xsd.length > 1) { 
					if(xsd[1].length < num) { 
						this.ExchangeAmount = this.ExchangeAmount.toString() + "0"; 
					} 
				}

			}, ///减少   限价   卖出价格
			reduce(num) {
				if(this.ExchangeAmount == 0 || this.ExchangeAmount == "") {
					this.ExchangeAmount = 0.00;
					return false;
				}
				var str = "1" + Array(num).join("0") + "0";
				var remNumber = Number(str);
				var Num = Math.round(this.ExchangeAmount * remNumber);
				Num--;
				this.ExchangeAmount = (Num / remNumber).toFixed(num);
				var xsd = this.ExchangeAmount.toString().split(".");
				if(xsd.length > 1) { 
					if(xsd[1].length < num) { 
						this.ExchangeAmount = this.ExchangeAmount.toString() + "0"; 
					} 
				}
        if(Number(this.ExchangeAmount) < Number(this.CurrencyList.lower)){
          this.errText = _this.$t("taocoin.cannotbesmaller");
          setTimeout(function() {
            _this.errText = "";
          }, 1000)
          this.ExchangeAmount = this.CurrencyList.lower;
        }
			}
		}
	}
</script>

<style lang="scss" scoped="scoped">
	$color_text:#a7a7a7;
	$font_color:#999999;
	$high_color:#23ccc7;
  $font_color:#999da9;
  $color_green:#26cbc5;
  $bgColor:#26cbc5;
	#Exchangeofdetails {
		width: 100%;
		min-height: 100%;
		background: #0c1331;
		padding-bottom: 50px;
	}

	.Exchangeofdetails_content {
		width: 1200px;
		margin: 0 auto;
		padding-top: 5px;
	}
	/*风险提示头部*/

	.Exchangeofdetails_header {
		width: 100%;
		height: 70px;
		line-height: 70px;
		background: linear-gradient(to bottom, rgba(26, 42, 130, 0.2), rgba(26, 42, 130, 0.3), rgba(26, 42, 130, 0.4), rgba(26, 42, 130, 0.5), rgba(26, 42, 130, 0.8));
		margin: 30px 0;
		color: #fff;
		font-size: 13px;
		box-sizing: border-box;
		padding: 0 20px;
		white-space: nowrap;
		text-overflow: ellipsis;
		overflow: hidden;
		.risk {
			color: #f38c13;
		}
	}

	.ExchangeOfContent {
		width: 100%;
		background: #fff;
		border-radius: 4px;
		overflow: hidden;
		.title {
			width: 100%;
			height: 70px;
			display: flex;
			justify-content: space-between;
			box-sizing: border-box;
			padding: 0 20px;
			align-items: center;
			box-shadow: 2px 2px 8px #e8e8e8;
			.oleft {
				display: flex;
				img {
					width: 40px;
					height: 40px;
				}
				.briefIntroduction {
					font-size: 18px;
					margin-top: 18px;
					margin-left: 10px;
				}
				.FullName {
					color: #a7a7a7;
					margin-top: 23px;
					margin-left: 10px;
				}
			}
			.oright {
				display: flex;
				align-items: center;
				color: $font_color;
				font-size: 13px;
				li {
					margin-right: 10px;
					display: flex;
					align-items: center;
					.iconfont {
						color: $high_color;
						margin: 0 5px;
					}
				}
				li:nth-last-child(1) {
					margin-right: 0;
				}
			}
		}
		.content {
			width: 100%;
			height: 310px;
			display: flex;
			box-sizing: border-box;
			padding: 25px 25px;
			.currency {
				width: 40%;
				border-right: 1px solid #d8d8d8;
				box-sizing: border-box;
				padding-right: 30px;
				.header {
					color: #505b82;
					font-size: 20px;
					margin-bottom: 20px;
				}
				.text {
					font-size: 14px;
					line-height: 30px;
					color: $color_text;
					display: -webkit-box;
					-webkit-box-orient: vertical;
					-webkit-line-clamp: 7;
					overflow: hidden;
				}
			}
			/*兑换*/
			.exchange {
				width: 60%;
				box-sizing: border-box;
				padding: 0 20px;
				.ExchangePrice {
					width: 100%;
					height: 55px;
					background: #f4f4f9;
					border-radius: 4px;
					display: flex;
					align-items: center;
					justify-content: space-between;
					font-size: 14px;
					.price {
						margin-left: 20px;
						line-height: 55px;
						color: #999baa;
						.Number {
							color: #ff7e00;
							font-size: 20px;
						}
					}
					.currencyList {
						display: flex;
						align-items: center;
						li {
							cursor: pointer;
						}
						img {
							width: 24px;
							height: 24px;
							margin-right: 10px;
						}
					}
				}
				.ExchangeRate {
					/*兑换量*/
					color: #989baa;
					.Rate {
						width: 100%;
						height: 45px;
						line-height: 45px;
						font-size: 14px;
					}
					.oInput_new {
						width: 100%;
						display: flex;
						align-items: center;
						.oleft {
							display: flex;
              line-height: 50px;
							align-items: center;
							.input {
								width: 370px;
								height: 45px;
								border: 1px solid #d1d3de;
								border-radius: 4px;
								position: relative;
								display: flex;
								align-items: center;
								input {
									width: 90%;
									height: 100%;
									outline: none;
									position: absolute;
									left: 5px;
									top: 0;
									border: none;
									box-sizing: border-box;
									font-size: 16px;
								}
                input::-webkit-input-placeholder{
                  color:#e4e4e4;
                }
                input:-moz-placeholder{
                  color: #e4e4e4;
                }
                input::-ms-input-placeholder{
                  color: #e4e4e4;
                }
								span {
									position: absolute;
                  top: -2px;
									right: 10px;
									font-size: 15px;
									color: #000;
								}
							}
							.button {
								button {
									display: block;
									width: 25px;
									height: 22px;
									border: 1px solid #d1d3de;
									background: #f4f4f9;
									text-align: center;
									line-height: 19px;
									margin: 2px;
									font-size: 23px;
									outline: none;
								}
							}
						}
						.oright {
							color: #989baa;
							margin-left: 25px;
							font-size: 14px;
							p {
								line-height: 30px;
							}
						}
					}
				}
				.NeedToPay {
					/*需要支付*/
					height: 60px;
					display: flex;
					align-items: center;
					position: relative;
					.text {
						color: #989baa;
					}
					.Number {
						color: #ff7e00;
						font-size: 23px;
						margin-bottom: 5px;
					}
					.currencyName {
						color: #000;
						margin: 5px;
					}

				}
				.submit_dui {
					/*立即兑换*/
					button {
						width: 240px;
						height: 50px;
						background: #25cbc5;
						color: #fff;
						font-size: 16px;
						outline: none;
						border-radius: 4px;
					}
          .errText {
            color: red;
          }
				}
			}
		}
	}
	/*说明内容*/

	.Description_box {
		background: #fff;
		border-radius: 4px;
		margin-top: 30px;
		box-sizing: border-box;
		padding: 0 20px;
		padding-bottom: 25px;
	}
	/*淘币说明*/

	.Description {
		width: 100%;
		padding: 20px 0;
		border-bottom: 1px solid #d8d8d8;
		.title {
      height: 50px;
			line-height: 50px;
			font-size: 20px;
			color: #505b82;
		}
		.content {
      width: 100%;
      line-height: 20px;
      overflow: hidden;
			font-size: 13px;
			color: #a7a7a7;
		}
	}
	/*代币全称*/

	.Token:nth-last-child(1) {
		border-bottom: none;
	}

	.Token {
		width: 100%;
		padding: 20px 0;
		border-bottom: 1px solid #d8d8d8;
		.title {
			display: flex;
			box-sizing: border-box;
			align-items: center;
			justify-content: space-between;
			height: 50px;
			line-height: 50px;
			.blue {
				font-size: 20px;
        .curName{
          color: #33406d;
        }
        .fullName{
          color: #c2cade;
          font-size: 15px;
        }
			}
			p {
				font-size: 13px;
				span {
					color: #25cbc5;
					margin-left: 10px;
					cursor: pointer;
				}
			}
		}
		.content {
			font-size: 13px;
			color: #a7a7a7;
			line-height: 20px;
		}
		.ToUnderstanding {
			line-height: 20px;
			text-align: right;
			color: #25cbc5;
			cursor: pointer;
		}
	}
	/*右侧固定*/

	.contact {
		position: fixed;
		right: 0;
		top: 50%;
		height: 145px;
		margin-top: -70px;
		div {
			width: 35px;
			height: 35px;
			border-radius: 4px;
			background: #25cbc5;
			text-align: center;
			line-height: 35px;
			color: #fff;
			margin-bottom: 10px;
			cursor: pointer;
		}
	}
	/*淘币兑换弹框*/

	.men_ban {
		width: 100%;
		height: 100%;
		background: rgba(0, 0, 0, 0.5);
		position: fixed;
		left: 0;
		top: 0;
		z-index: 66;
	}

	.exchange_alear {
		width: 400px;
		height: 230px;
		box-sizing: border-box;
		padding: 20px 0 0 0;
		border-radius: 4px;
		background: #fff;
		margin-left: -200px;
		margin-top: -115px;
		position: fixed;
		left: 50%;
		top: 50%;
		z-index: 99;
		.top {
			box-sizing: border-box;
			padding: 0 20px;
		}
		.title {
			text-align: right;
			.iconfont {
				cursor: pointer;
			}
		}
		.isDui {
			color: #353377;
			font-size: 15px;
		}
		.xuZhi {
			line-height: 40px;
			color: #b2b5c5;
			font-size: 13px;
			.orange {
				color: #ff7e00;
				font-size: 15px;
				margin: 0 4px;
			}
		}
		.tiShi {
      min-height: 45px;
			line-height: 25px;
			color: #b2b5c5;
		}
		.oinput {
			width: 100%;
			height: 37px;
			border-radius: 4px;
			display: flex;
			align-items: center;
			justify-content: center;
			input {
				width: 98%;
				height: 90%;
				box-sizing: border-box;
				border: none;
				outline: none;
			}
			border:1px solid #d1d3de;
		}
		.confirm {
			border-top: 1px solid #eee;
			height: 50px;
			display: flex;
			justify-content: flex-end;
			align-items: center;
			span {
				cursor: pointer;
        color: #49436f;
			}
			button {
				width: 90px;
				height: 30px;
				background: #25cbc5;
				border-color: #25cbc5;
				border-radius: 4px;
				margin-right: 10px;
				color: #fff;
				font-size: 14px;
				margin-left: 20px;
				outline: none;
			}
		}
	}
	/*公用的弹框样式*/

	.assets_alert {
		width: 400px;
		height: 210px;
		border-radius: 4px;
		background: #fff;
		margin-left: -200px;
		margin-top: -105px;
		position: fixed;
		left: 50%;
		top: 50%;
		z-index: 99;
		.padding {
			padding: 20px 20px;
		}
		.title {
			text-align: right;
			.iconfont {
				cursor: pointer;
			}
		}
		.content {
			text-align: center;
			.text {
        height: 40px;
        line-height: 40px;
				font-size: 16px;
        color: #353377;
			}
			.gray {
				color: #84889b;
			}
			.orange {
        min-height: 58px;
        line-height: 40px;
				color: #b2b5c5;
        font-size: 14px;
				span {
					font-size: 15px;
					color: #ff7e00;
				}
			}
		}
		.bottom {
			height: 55px;
			display: flex;
			justify-content: center;
			align-items: center;
			border-top: 1px solid #eee;
			button {
				width: 90px;
				height: 30px;
				background: #25cbc5;
				border-color: #25cbc5;
				border-radius: 4px;
				margin-right: 10px;
				color: #fff;
				font-size: 14px;
				margin-left: 20px;
				outline: none;
			}
		}
	}
	/*联系卖买家*/

	.ContactInformation {
		width: 400px;
		height: 170px;
		border-radius: 4px;
		background: #fff;
		margin-left: -200px;
		margin-top: -85px;
		position: fixed;
		left: 50%;
		top: 50%;
		z-index: 99;
		.padding {
			box-sizing: border-box;
			padding: 20px 20px;
			.title {
				display: flex;
				justify-content: space-between;
				align-items: center;
				.Seller {
					font-size: 15px;
					color: #1e1d54;
				}
				.iconfont {
					cursor: pointer;
				}
			}
			.content {
				text-align: center;
				margin-top: 20px;
				.gray {
					color: #84889b;
					line-height: 40px;
					font-size: 14px;
				}
				.mobie {
					line-height: 40px;
					font-size: 20px;
					color: #1e1d54;
				}
			}
		}
		.bottom {
			border-top: 1px solid #eee;
			width: 100%;
			height: 55px;
			display: flex;
			align-items: center;
			justify-content: space-between;
			box-sizing: border-box;
			padding: 0 20px;
			button {
				width: 90px;
				height: 30px;
				background: #25cbc5;
				border-color: #25cbc5;
				border-radius: 4px;
				margin-right: 10px;
				color: #fff;
				font-size: 14px;
				margin-left: 20px;
				outline: none;
			}
		}
	}
	/*商品已下架*/

	.HasBeenRemoved {
		@extend .assets_alert;
		.content {
			.iconfont {
				color: #e53932;
			}
			.Num {
				color: #ff7e00;
				font-size: 15px;
				margin: 0 4px;
			}
		}
		.bottom {
			display: flex;
			margin-top: 12px;
		}
	}
  .HasBeenRemoved1{
    @extend .assets_alert;
    .content {
      .iconfont {
        color: #e53932;
      }
      .gray{
        min-height: 60px;
        line-height: 25px;
      }
    }
    .bottom {
      display: flex;
    }
  }
  .voteBox {
    width: 400px;
    height: 200px;
    background: #fff;
    position: fixed;
    left: 50%;
    top: 50%;
    margin-left: -200px;
    margin-top: -100px;
    z-index: 666;
    border-radius: 4px;
    .title {
      box-sizing: border-box;
      padding: 0 10px;
      line-height: 40px;
      text-align: right;
      .iconfont {
        font-size: 15px;
        font-weight: bold;
        cursor: pointer;
      }
    }
    .content {
      width: 100%;
      height: 100px;
      display: flex;
      line-height: 20px;
      align-items: center;
      justify-content: center;
      font-size: 15px;
      border-bottom: 1px solid #d8d8d8;
      box-sizing: border-box;
      padding: 0 10px;
      color: #353377;
    }
    .bottom {
      height: 60px;
      display: flex;
      align-items: center;
      justify-content: center;
      button{
        outline: none;
      }
      .cancel {
        width: 120px;
        height: 35px;
        border: 1px solid $color_green;
        color: $color_green;
        border-radius: 4px;
      }
      .confirm {
        width: 120px;
        height: 35px;
        background: $color_green;
        border-radius: 4px;
        color: #fff;
        margin-left: 10px;
      }
    }
  }
</style>
