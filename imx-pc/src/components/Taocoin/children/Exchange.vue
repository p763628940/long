<template>
	<div id="Exchange">
		<!--资产为空-->
		<div class="men_ban" v-if="isAssets"></div>
		<div class="assets_alert" v-if="isAssets">
			<div class="padding">
				<div class="title">
					<i class="iconfont icon-cuowu" @click="isAssets=false"></i>
				</div>
				<div class="content">
					<div class="text">{{$t("taocoin.InsufficientAssets")}}</div>
					<div class="gray">{{$t("taocoin.PleaseDeposit")}}</div>
				</div>
			</div>
			<div class="bottom">
				<button @click="isAssets=false">{{$t("taocoin.Confirm")}}</button>
			</div>
		</div>
		<!--兑换内容-->
		<div class="Exchange_content">
			<div class="title">
				<span class="text">{{$t("taocoin.Taocoin")}} · {{$t("taocoin.PublishTaocoin")}}</span>
			</div>
			<!--淘币内容部分-->
			<div class="content">
				<!--兑换形式    兑换内容     兑换比例-->
				<div class="exchange_item">
					<div class="oleft">
						<span class="text">{{$t("taocoin.ExchangeForm")}}</span>
						<p class="select">
							<el-select v-model="selectdCurrency" :placeholder="$t('taocoin.PleaseChooseEX')" @change="selectdMainCurrency(selectdCurrency)">
								<el-option v-for="item in currencyList" :key="item.pageIdentifier" :label="item.pageIdentifier" :value="item.id" :disabled="checkoutCurrency.indexOf(item.id)!=-1">
									<span>{{item.pageIdentifier}}</span>
								</el-option>
							</el-select>
						</p>
					</div>
					<div class="oright">
						<span class="text">{{$t("taocoin.Exchange")}}</span>
						<p class="select">
							<el-select v-model="checkoutCurrency" multiple :placeholder="$t('taocoin.PleaseChooseEX')" @change="checkout(checkoutCurrency)" @remove-tag="removeCurrency">
								<el-option v-for="item in currencyList" :key="item.name" :label="item.pageIdentifier" :value="item.id" :disabled="item.id == selectdCurrency">
									<span>{{item.pageIdentifier}}</span>
								</el-option>
							</el-select>
						</p>
					</div>
				</div>
				<!--兑换比例-->
				<div class="proportion" v-if="selectedList.length>0&&selectMainCurrency!=''">
					<div class="oleft">
            <span class="iconfont">
              *
            </span>
						<span class="text">{{$t("taocoin.ExchangeRatio")}}</span>
					</div>
					<div class="oright">
						<li v-for="(item,index) in selectedList">
							<p class="select">
								<el-input v-model="item.m_num" maxlength="14" @keyup.native="onlyInt($event)"></el-input>
								<span class="currency">{{selectMainCurrency}}</span>
							</p>
							<span class="Equalsign">
								<i class="iconfont icon-dengyu-copy"></i>
							</span>
							<p class="select">
								<el-input v-model="item.c_num" maxlength="14" @keyup.native="onlyInt($event)"></el-input>
								<span class="currency">{{item.pageIdentifier}}</span>
							</p>
							<el-radio v-model="radio" :key="index" :label="index" @change="chanGeradio(index)">{{$t("taocoin.SetAsDefault")}}</el-radio>
						</li>
					</div>
				</div>
				<!--提示-->
				<div class="prompt">
					{{$t("taocoin.DecimalsRisk")}}
				</div>
				<!--兑换限制-->
				<div class="proportion1 margin">
					<div class="oleft">
             <span class="iconfont">
              *
            </span>
						<span class="text">{{$t("taocoin.ExchangeAmount")}}</span>
					</div>
					<div class="oright">
						<li>
							<div class="select">
								<dl>{{$t('taocoin.SingleMinimum')}}</dl>
                <input class="el-input__inner" @input="clearNoNum($event,8)" v-model.number="Lowerlimit" :placeholder="$t('taocoin.SingleMinimum')" type="text">
								<!--<el-input  maxlength="14" @input.native="clearNoNum($event,8)" @keyup.native="clearNoNum($event,8)" v-model.number="Lowerlimit" :placeholder="$t('taocoin.SingleMinimum')"></el-input>-->
								<span class="currency">{{selectMainCurrency}}</span>
							</div>
							<span class="Equalsign">
							</span>
							<div class="select">
								<dl>{{$t('taocoin.Maxexchangeamount')}}	（{{$t("taocoin.RreezePublishedAssets")}}）</dl>
                <input class="el-input__inner" type="text" v-model.number="Upperlimit" maxlength="14" @input="clearNoNum2($event,8)" :placeholder="$t('taocoin.Maxexchangeamount')">
								<!--<el-input v-model.number="Upperlimit" maxlength="14" @keyup.native="onlyInt($event)" :placeholder="$t('taocoin.Maxexchangeamount')"></el-input>-->
								<span class="currency">{{selectMainCurrency}}</span>
							</div>
						</li>
						<li class="AvailableAssets" v-if="CurrencyBalance!=''">
							<span>{{$t("taocoin.AvailableAssets")}}:
                <span v-if="CurrencyBalance!=0">{{CurrencyBalance | number(8)}}</span>
                <span v-if="CurrencyBalance==0">0.00</span>
								{{selectMainCurrency}}
							</span>
						</li>
					</div>
				</div>
				<!--兑换限制2-->
				<div class="Exchangerestrictions">
					<div class="oleft">
						{{$t("taocoin.ExchangeLimit")}}
					</div>
					<ul class="oright">
						<li>
							<el-checkbox v-model="bindingAdvanced">{{$t("taocoin.NeedPassAdvanced")}}</el-checkbox>
						</li>
						<li>
							<el-checkbox v-model="bindingMobile">{{$t("taocoin.NeedBindPhone")}}</el-checkbox>
						</li>
						<li>
							{{$t("taocoin.SettingLimits")}}
						</li>
					</ul>
				</div>
				<!--淘币说明-->
				<div class="Exchangerestrictions Description">
					<div class="oleft">
             <span class="iconfont">
              *
            </span>
						{{$t("taocoin.TaocoinIntro")}}
					</div>
					<ul class="oright">
						<p class="select">
							<el-input type="textarea" maxlength="500" @blur="onBlur" v-model="Description" :placeholder="$t('taocoin.MoreQuickly')"></el-input>
						</p>
					</ul>
				</div>
				<!--自动回复-->
				<!--<div class="Exchangerestrictions Description">
					<div class="oleft">
            {{$t("taocoin.AutoResponse")}}
					</div>
					<ul class="oright">
						<p class="select">
							<el-input type="textarea" v-model="AutomaticResponse" placeholder="用户在线咨询后回复信息"></el-input>
						</p>
					</ul>
				</div>-->
				<!--资金密码-->
				<div class="Exchangerestrictions">
					<div class="oleft">
            <span class="iconfont">
              *
            </span>
						{{$t("taocoin.FundsPassword")}}
					</div>
					<ul class="oright">
						<p class="select">
							<el-input v-model="Fundpassword" type="password" :placeholder="$t('taocoin.EnterFundsPassword')"></el-input>
						</p>
						<li>
							<el-checkbox v-model="AgreeRule"> {{$t("taocoin.HaveKnown")}}</el-checkbox>
							<span class="quetocolor">《
								<router-link target="_blank" to="/TaocoinExchangeRules" class="linkcolor">{{$t("taocoin.ExchangeRules")}}</router-link>
								》</span>
						</li>
						<li class="button">
							<button class="submit_new" :class="{'gray_button':SubmitIsDisable}" :disabled="SubmitIsDisable" @click="Submit">{{$t("login.Submit1")}}</button>
						</li>
					</ul>
				</div>

			</div>

		</div>
	</div>
</template>

<script>
	import axios from "axios";
	import { httpUrl } from "../../http_url/http_url"
	export default {
		data() {
			return {
				selectdCurrency: "",
				/*选中币种*/
				checkoutCurrency: [],
				/*多选数组*/
				bindingAdvanced: false,
				/*需要对方高级认证*/
				bindingMobile: false,
				/*需对方绑定手机号*/
				AgreeRule: false,
				/*兑换规则*/
				currencyList: [],
				/*可用币种列表*/
				selectedList: [],
				/*选中币种列表*/
				Description: "",
				/*说明*/
				AutomaticResponse: this.$t("taocoin.IsEmpty"),
				/*自动回复*/
				selectMainCurrency: "",
				/*选中的币种*/
				selectMainCurrencyId: "",
				/*选中币种id*/
				Upperlimit: "",
				/*兑换上限*/
				Lowerlimit: "",
				/*兑换下限*/
				least: 0,
				/*最少完成几笔*/
				Fundpassword: "",
				/*资金密码*/
				radio: 0,
				CurrencyBalance: "",
				/*币种余额*/
				isAssets: false, /*资产余额不足*/
        SubmitIsDisable:false,  //是否禁用按钮
			}
		},
		mounted() {
			let _this = this;
			/*判断是否登录*/
			if(this.token==null&&this.token==undefined){
			  this.$router.go(-1)
      }
			/*获取在线币种列表*/
			axios.get(httpUrl.currencyNaught).then(function(res) {
				_this.currencyList = res.data.data;
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
			onBlur(){
				if(this.Description == "") {
					this.$message({
						message: this.$t("taocoin.FilTaocoinIntro"),
						type: 'warning'
					});
					return false;
				}
			},
			onlyInt(eve) { /*输入整数*/
        eve.target.value = eve.target.value.replace(/[^\d.]/g, ""); //清除“数字”和“.”以外的字符
        eve.target.value = eve.target.value.replace(/\.{2,}/g, "."); //只保留第一个. 清除多余的
        eve.target.value = eve.target.value.replace(".", "$#$").replace(/\./g, "").replace("$#$", ".");
        eve.target.value = eve.target.value.replace(/^(\-)*(\d+)\.(\d\d\d\d\d\d\d\d).*$/, '$1$2.$3'); //只能输入8个小数
        if(eve.target.value.indexOf(".") < 0 && eve.target.value != "") { //以上已经过滤，此处控制的是如果没有小数点，首位不能为类似于 01、02的金额
          eve.target.value = parseFloat(eve.target.value);
        }
      },
      clearNoNum(eve,num) { /*输入整数*/
        const regexp = /(?:\.0*|(\.\d+?)0+)$/;
        var toFixedNum = Number(this.Lowerlimit).toFixed(num + 1);
        this.Lowerlimit = toFixedNum.substring(0, toFixedNum.toString().length - 1);
        this.Lowerlimit = this.Lowerlimit.replace(regexp, '$1');
        //this.limit.price = parseFloat(this.limit.price);   //去除小数点
        if(this.Lowerlimit == "" || eve.target.value == "") {
          this.Lowerlimit = "";
        }
        if(isNaN(this.Lowerlimit)) {
          this.Lowerlimit= "";
        }
        eve.target.value = eve.target.value.replace(/[^\d.]/g, ""); //清除"数字"和"."以外的字符
        eve.target.value = eve.target.value.replace(/^\./g, ""); //验证第一个字符是数字而不是
        eve.target.value = eve.target.value.replace(/\.{2,}/g, "."); //只保留第一个. 清除多余的
        eve.target.value = eve.target.value.replace(".", "$#$").replace(/\./g, "").replace("$#$", ".");
      },
      clearNoNum2(eve,num) { /*输入整数*/
        const regexp = /(?:\.0*|(\.\d+?)0+)$/;
        var toFixedNum = Number(this.Upperlimit).toFixed(num + 1);
        this.Upperlimit = toFixedNum.substring(0, toFixedNum.toString().length - 1);
        this.Upperlimit = this.Upperlimit.replace(regexp, '$1');
        //this.limit.price = parseFloat(this.limit.price);   //去除小数点
        if(this.Upperlimit == "" || eve.target.value == "") {
          this.Upperlimit = "";
        }
        if(isNaN(this.Upperlimit)) {
          this.Upperlimit= "";
        }
        eve.target.value = eve.target.value.replace(/[^\d.]/g, ""); //清除"数字"和"."以外的字符
        eve.target.value = eve.target.value.replace(/^\./g, ""); //验证第一个字符是数字而不是
        eve.target.value = eve.target.value.replace(/\.{2,}/g, "."); //只保留第一个. 清除多余的
        eve.target.value = eve.target.value.replace(".", "$#$").replace(/\./g, "").replace("$#$", ".");
      },
			Positiveinteger(eve) { /*输入整数*/
				if(eve.target.value.length == 1) {
					eve.target.value = eve.target.value.replace(/[^1-9]/g, '')
				} else {
					eve.target.value = eve.target.value.replace(/\D/g, '')
				}
			},
			chanGeradio(index) { /*单选*/
				for(let i = 0; i < this.selectedList.length; i++) {
					this.selectedList[i].front = 0;
				}
				this.selectedList[index].front = 1;
			},
			checkout(item) { /*多选币种*/
				var arr = item;
				/*限定只能选择3个币种*/
				if(item.length >= 3) {
					this.checkoutCurrency = this.checkoutCurrency.slice(0, 3);
				}
				for(let i = 0; i < this.currencyList.length; i++) {
					for(let j = 0; j < this.checkoutCurrency.length; j++) {
						if(this.checkoutCurrency[j] == this.currencyList[i].id && this.selectedList.indexOf(this.currencyList[i]) == -1 && this.selectedList.length <= 3) {
							this.currencyList[i].m_num = ""; /*兑换比例*/
							this.currencyList[i].c_num = ""; /*兑换比例*/
							this.currencyList[i].c_id = this.currencyList[i].id; /*兑换币种*/
							this.currencyList[i].front = 0;
							this.selectedList.push(this.currencyList[i]);
						}
					}
				}
				/*取消选择的值给去掉*/
				let kong = [];
				if(this.selectedList.length > 0) {
					for(let a = 0; a < arr.length; a++) {
						for(let b = 0; b < this.selectedList.length; b++) {
							if(this.selectedList[b].id == arr[a]) {
								kong.push(this.selectedList[b]);
							}
						}
					}
					this.selectedList = kong;
				}
				if(this.selectedList.length == 1) {
					this.selectedList[0].front = 1;
				}
			},
			removeCurrency(item) { /*多选币种删除*/
				for(let i = 0; i < this.selectedList.length; i++) {
					if(this.selectedList[i].id == item) {
						this.selectedList.splice(i, 1);
						i--;
					}
				}
			},
			selectdMainCurrency(item) { /*单选币种*/
				for(let i = 0; i < this.currencyList.length; i++) {
					if(this.currencyList[i].id == item) {
						this.selectMainCurrency = this.currencyList[i].pageIdentifier;
						this.selectMainCurrencyId = this.currencyList[i].id;
					}
				}
				/*获取币种余额*/
				let _this = this;
				axios.get(httpUrl.currencyBalance, {
					params: {
						currency_id: item
					},
					headers: {
						Authorization: "Bearer " + this.token
					}
				}).then(function(res) {
					if(res.data.data.length == 0) {
						_this.CurrencyBalance = 0;
						_this.$message({
							message: _this.$t("taocoin.Account") + _this.selectMainCurrency + _this.$t("taocoin.AmountZero"),
							type: 'warning'
						});
					}else{
            _this.CurrencyBalance = res.data.data.balance;
          }
				}, function(err) {
					console.log(err)
				})
			},
			Submit() { /*提交*/
				let _this = this;
				/*判断用户输入是否填写完整*/
				if(this.selectedList.length == 0) {
					this.$message({
						message: _this.$t("taocoin.ChooseExchangeForm"),
						type: 'warning'
					});
					return false;
				}
        if(Number(this.Lowerlimit) > Number(this.Upperlimit)) { //判断最小限额是否大于上限
          this.$message({
            message: this.$t("taocoin.TheSingleNotLarge"),
            type: 'warning'
          });
          this.Lowerlimit = this.Upperlimit;
        }
        if(this.Lowerlimit=='' || this.Upperlimit=='') { //判断是否输入最大最小限制
          this.$message({
            message: _this.$t("taocoin.cannotbeempty"),
            type: 'warning'
          });
          return false;
        }
				let Nul = false;
				for(let i = 0; i < this.selectedList.length; i++) {
					if(this.selectedList[i].front == 1) {
						Nul = true;
					}
					if(this.selectedList[i].m_num == "" || this.selectedList[i].c_num == "" || this.selectedList[i].m_num == 0 || this.selectedList[i].c_num == 0 || this.selectedList[i].m_num == 0.00000001 || this.selectedList[i].c_num == 0.00000001) {
						this.$message({
							message: _this.$t("taocoin.FillInRatio"),
							type: 'warning'
						});
						return false;
					}
				}
				if(Nul == false) {
					this.$message({
						message: _this.$t("taocoin.SetDefaultRatio"),
						type: 'warning'
					});
					return false;
				}

				if(this.Description == "") {
					this.$message({
						message: _this.$t("taocoin.FilTaocoinIntro"),
						type: 'warning'
					});
					return false;
				}
				if(this.Fundpassword == "") {
					this.$message({
						message: _this.$t("userCenter.FillFundsPassword"),
						type: 'warning'
					});
					return false;
				}
        if(this.Fundpassword.length<8){
          this.$message({
            message: _this.$t("userCenter.FundsPasswordError"),
            type: 'warning'
          });
          return false;
        }
				if(this.AgreeRule == false) {
					this.$message({
						message: _this.$t("taocoin.AgreeExchangeFirst"),
						type: 'warning'
					});
					return false;
				}
				/*判断用户账户余额是否为空*/
				if(_this.CurrencyBalance == "") {
					_this.$message({
						message: _this.$t("taocoin.Account") + _this.selectMainCurrency + _this.$t("taocoin.AmountZero"),
						type: 'warning'
					});
					return false;
				}
				/*判断账户余额是否不足*/
				if(_this.CurrencyBalance < Number(this.Upperlimit) || _this.CurrencyBalance < Number(this.Lowerlimit)) {
					this.isAssets = true;
					return false;
				}
        this.SubmitIsDisable = true; //按钮灰掉
				/*发起请求*/
				axios.post(httpUrl.publish, {
					m_id: this.selectMainCurrencyId,
					balance: this.Upperlimit,
					lower: this.Lowerlimit,
					check_num: this.least,
					is_auth: this.bindingAdvanced,
					is_mobile: this.bindingMobile,
					replay_text: this.AutomaticResponse,
					goods_info: this.Description,
					payPasswd: this.Fundpassword,
					stocks: this.selectedList
				}, {
					headers: {
						"Authorization": "Bearer " + this.token
					}
				}).then(function(res) {
					if(res.data.status.code == 200) {
						_this.$message({
							message: _this.$t("taocoin.PublishSuccessfully"),
							type: 'success',
							duration: 4000
						});
						setTimeout(function() {
							_this.$router.push({
								path: '/index/Taocoin'
							})
						}, 4050)
					}else{
            _this.SubmitIsDisable = false; //按钮灰掉
          }
				}, function(err) {
					console.log(err)
				})
			}

		}
	}
</script>

<style lang="scss">
	#Exchange {
		.el-select {
			width: 100% !important;
		}
		.el-input__inner {
			width: 100% !important;
			border-color: #d1d3de;
		}
		.el-input__inner:focus {
			border-color: #409eff;
		}
		.el-checkbox {
			font-weight: 400;
			color: #a0a0a0;
		}
		.el-textarea__inner {
			height: 112px;
		}
		.el-radio__input {
			margin-left: 20px;
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
		.el-radio__inner:hover {
			border-color: #26CBC5 !important;
		}
		.el-radio__input.is-checked .el-radio__inner {
			border-color: #26CBC5 !important;
			background: #26CBC5 !important;
		}
		.el-radio__input.is-checked+.el-radio__label {
			color: #26CBC5 !important;
		}
	}
</style>

<style lang="scss" scoped="scoped">
	#Exchange {
		width: 100%;
		min-height: 100%;
		background: #0c1330;
		padding-top: 1px;
		padding-bottom: 1px;
		color: #505b82;
	}
	/*内容部分*/

	.Exchange_content {
		max-width: 1200px;
		margin: 55px auto;
		background: #fff;
		border-radius: 4px;
		overflow: hidden;
		padding-bottom: 60px;
		.title {
			width: 100%;
			height: 70px;
			line-height: 70px;
			color: #2a3763;
			box-sizing: border-box;
			padding-left: 35px;
			.text {
				font-size: 16px;
			}
			box-shadow: 2px 2px 8px #e8e8e8;
		}
		.content {
			margin-top: 35px;
			box-sizing: border-box;
			padding: 0 30px;
		}
	}
	/*兑换形式   兑换比例   兑换限制*/

	.exchange_item {
		display: flex;
		margin-top: 40px;
		.oleft,
		.oright {
			display: flex;
			align-items: center;
			font-size: 14px;
			.text {
				display: block;
				width: 125px;
				.iconfont {
					font-size: 20px;
				}
			}
			.select {
				width: 285px;
				position: relative;
				.currency {
					position: absolute;
					right: 10px;
					top: 14px;
				}

			}
		}
		.oright {
			.text {
				width: 100px;
				text-align: center;
			}
		}
	}
	/*兑换比例*/

	.proportion {
		display: flex;
		align-items: center;
		margin-top: 40px;
		.text {
			display: block;
			width: 125px;
			.iconfont {
				font-size: 20px;
			}
		}
		.Equalsign {
			width: 100px;
			line-height: 40px;
			text-align: center;
		}
		.oleft {
      position: relative;
      .iconfont{
        position: absolute;
        left: -10px;
        top: -6px;
        font-size: 12px;
        font-weight: bold;
        color: #e23a2d;
      }
			.text {
				font-size: 14px;
			}
		}
		.oright {
			li {
				display: flex;
				margin-bottom: 10px;
				align-items: center;
			}
			.select {
				width: 285px;
				position: relative;
				.currency {
					font-size: 14px;
					position: absolute;
					right: 10px;
					top: 14px;
				}
        .el-input__inner{
          font-size: 14px;
        }
			}
		}
	}
	.proportion1{
		@extend .proportion;
		.oright{
			margin-top: 20px;
			li{
				margin: 0;
			}
			.AvailableAssets{
				width: 100%;
				height: 50px;
				line-height: 50px;
				font-size: 14px;
				display: flex;
				justify-content: flex-end;
				align-items: center;
			}
			.select{
				width: 285px;
				position: relative;
				.currency {
					font-size: 14px;
					position: absolute;
					right: 10px;
					top: 44px;
				}
				dl{
					font-size: 14px;
					line-height: 30px;
				}
			}
		}
	}
	/*兑换限制*/

	.Exchangerestrictions {
		display: flex;
		font-size: 14px;
		margin-top: 30px;
		.oleft {
			width: 125px;
			line-height: 40px;
      position: relative;
      .iconfont{
        position: absolute;
        left: -10px;
        top: -6px;
        font-size: 12px;
        font-weight: bold;
        color: #e23a2d;
      }
		}
		.oright {
			.select {
				width: 285px;
			}
			li {
				margin-top: 10px;
				color: #A0A0A0;
				.submit_new {
					width: 150px;
					height: 45px;
					border-radius: 4px;
					border-color: #26cbc5;
					background: #26cbc5;
					color: #fff;
					font-size: 18px;
					margin-top: 20px;
					outline: none;
				}
        .gray_button{
          background: #c9c9c9;
        }
			}
		}
	}
	/*淘币说明*/

	.Description {
		margin: 60px 0;
		.oright {
			.select {
				width: 800px;
				height: 105px;
			}
		}
	}
	/*提示*/

	.prompt {
		color: #e23a2d;
		box-sizing: border-box;
		padding-left: 128px;
		margin-top: 10px;
	}
	/*上边距*/

	.margin {
		margin-top: 15px;
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
	/*弹框样式*/

	.assets_alert {
		width: 420px;
		height: 210px;
		border-radius: 4px;
		background: #fff;
		margin-left: -210px;
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
				font-size: 16px;
				line-height: 70px;
			}
			.gray {
				color: #84889b;
			}
			.orange {
				color: #84889B;
				span {
					font-size: 14px;
					color: #ff7e00;
				}
			}
		}
		.bottom {
			margin-top: 15px;
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

	.linkcolor {
		color: #26CBC5;
	}

	.quetocolor {
		color: #26CBC5;
	}
</style>
