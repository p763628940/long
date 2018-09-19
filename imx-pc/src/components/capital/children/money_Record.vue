<template>
	<div id="money_Record">
		<!--资金头部-->
		<div class="money_Record_title">
			<p class="money_Record_title_text">
        {{$t("capital.Fundrecords")}}
			</p>
		</div>
		<!--币种选项-->
		<div class="Currency_options" :class="{'Currency_options_white':getColor==1}">
			<!--币种-->
			<ul class="Currency_options_title">
				<li class="currency">
					<span class="currency_title">{{$t("capital.Currency")}}</span>
					<p class="select">
						<el-select v-model="value" :placeholder="$t('userCenter.Pleasechoose')" @change="change(value)">
              <el-option v-for="item in coin_matching" :key="item.pageIdentifier" :label="$t('Record.allCoins')" :value="item.id" v-if="item.id=='All'" >
              </el-option>
							<el-option v-for="item in coin_matching" :key="item.pageIdentifier" :label="item.pageIdentifier" :value="item.id" v-if="item.id!='All'" >
							</el-option>
						</el-select>
					</p>
				</li>
				<li class="type">
					<span class="currency_title">{{$t("capital.Types")}}</span>
					<p class="select">
						<el-select v-model="type" :placeholder="$t('userCenter.Pleasechoose')" @change="change1(type)">
							<el-option v-for="item in ChoiceOfcurrency" :key="item.value" :label="item.value" :value="item.type">
							</el-option>
						</el-select>
					</p>
				</li>
				<li class="Date_table">
					<el-date-picker v-model="value6" value-format="yyyy-MM-dd" format="yyyy-MM-dd" type="daterange" :range-separator="$t('capital.to')" :start-placeholder="$t('capital.Startdate')" :end-placeholder="$t('capital.Enddate')">
					</el-date-picker>
				</li>
				<li class="query">
					<el-button type="primary" @click="query()">{{$t("capital.Inquire")}} </el-button>
				</li>
			</ul>
			<div style="clear: both;"></div>
			<!--币种资料内容-->
			<!--币种时间手续费-->
			<table class="money_Record_content">
				<tr>
					<td><span>{{$t("capital.Currency")}}</span></td>
					<td><span>{{$t("capital.Time")}}</span></td>
					<td><span>{{$t("capital.Types")}}</span></td>
					<td><span>{{$t("capital.Amounts")}}</span></td>
					<td v-show="type!=-1"><span>{{$t("capital.Fees")}}</span></td>
					<td>
						<span>{{$t("capital.StatusZT")}}</span>
					</td>
				</tr>
				<tr v-for="item in Currency_record" class="biz">
					<td><span>{{item.get_currency.pageIdentifier}}</span></td>
					<td><span>{{formatTime(item.created_at)}}</span></td>
					<td><span v-if="">gettype(item.type)</span></td>
					<td><span>{{item.balance | number(item.get_currency.displayNum)}}</span></td>
					<td v-show="type!=-1"><span>{{item.serverCharge | number(item.get_currency.displayNum)}}</span></td>
					<td>
						<span v-show="item.status==0">
							{{$t("capital.Audit")}}
						</span>
						<span v-show="item.status==1"> {{$t("capital.Success")}}</span>
						<span v-show="item.status==-1"> {$t("capital.Notthrough")}}</span>
					</td>
				</tr>
			</table>

			<div style="clear: both;"></div>
			<!--判断有无资金记录-->
			<div class="isShowMoneyRecord" v-show="Currency_record.length==0">
        {{$t("capital.Norecordforthetime")}}
			</div>
		</div>
		<!--分页-->
		<div class="pageCount" v-show="Currency_record.length!=0">
			<div class="button">
				<el-pagination layout="prev, pager, next" background :page-size="topage" @current-change="pageChange" :total="total">
				</el-pagination>
			</div>
		</div>
	</div>
</template>

<script>
	import axios from "axios";
	import { httpUrl } from "../../http_url/http_url"
	import $ from "jquery"
	export default {
		data() {
			return {
				value6: [],
				/*时间选择表*/
				coin_matching: [],
				/*获取所有币对*/
				value: "",
				/*选择币种*/
				/*类型列表*/
				type: 100,
				ChoiceOfcurrencySelect: "",
				/*选择类型*/
				Currency_record: [],
				/*获取资金记录*/
				total: 0,
				/*总条数*/
				topage: 10,
				/*每页显示条数*/
				currencyID:"",
				/*传递的ID*/
			}
		},
		mounted() {
			var _this = this;
      this.settime();

			/*获取所有币对*/
			axios.get(httpUrl.currencyList, {
				headers: {
					"Authorization": "Bearer " + _this.token
				}
			}).then(function(res) {
				_this.coin_matching = res.data.data;
        _this.coin_matching.push({id:'All'});
				_this.value = _this.coin_matching[0].id; /*默认选项*/
				_this.currencyID = _this.coin_matching[0].id;  /*默认币种ID*/
				/*初始化获取用户钱包地址*/
				axios.get(httpUrl.wallet_address, {

					headers: {
						"Authorization": "Bearer " + _this.token
					},
					params: {
						"currency_id": _this.value
					}
				}).then(function(res) {
					_this.address = res.data.data.address;
					_this.qrcode = res.data.data.qrcode;
				}, function(err) {
					console.log(err)
				})

        let obj =_this.settype( _this.value,_this.type);
				axios.get(httpUrl.recharge, {
					headers: {
						"Authorization": "Bearer " + _this.token
					},
					params:obj
				}).then(function(res) {
					_this.Currency_record = res.data.data.data;
					_this.total = res.data.data.total;
				}, function(err) {
					console.log(err)
				})

			}, function(err) {
				console.log(err)
			})
			/*遍历*/
			for(let i = 0; i < _this.ChoiceOfcurrency.length; i++) {
				if(_this.ChoiceOfcurrency[i].type == _this.type) {
					_this.ChoiceOfcurrencySelect = _this.ChoiceOfcurrency[i].value
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
    computed:{
		  gettype(type){
        switch(type)
        {
          case 0:
            return  this.$t("Record.all");
            break;
          case 1:
            return  this.$t("Record.Deposit");
            break;
          case -1:
            return  this.$t("Record.Withdraw");
            break;
          case -2:
            return  this.$t("Record.Sell");
            break;
          case 2:
            return  this.$t("Record.Buy");
            break;
          case 3:
            return  this.$t('capital.Otheramount')+'+';
            break;
          case 4:
            return  this.$t("Record.Airdrop");
            break;
          case 6:
            return  this.$t("Record.ExchangeC");
            break;
          case -6:
            return  this.$t("Record.ExchangeR");
            break;
          default:
            return  this.$t("Record.all");
            break

        }
      },
      ChoiceOfcurrency(){
       return [
         {
           type: 100,
           value:  this.$t("Record.all")  //全部
         },
         {

         type: 1,
         value: this.$t('capital.Deposit')   //买币
       },
         {
           type: -1,
           value: this.$t('capital.Withdraw')   //'提币'
         },
         {
           type: -2,
           value: this.$t('otc.Sell')   //'卖出'
         },
         {
           type: 2,
           value: this.$t('otc.Buy')   //'买入'
         },
         {
           type:4,
           value: this.$t("airdrop.Airdrop")   //空投
         },
         {
           type: -6,
           value: this.$t("taocoin.ExchangeR")  //兑入
         },
         {
           type: 6,
           value:  this.$t("taocoin.ExchangeC")  //兑出
         },
         {
           type: 3,
           value: this.$t('capital.Otheramount')+'+'   //'其他金额+'
         }


       ]
      }
    },
		methods: {

  getNowFormatDate(dates) {
    var date = dates;
    var seperator1 = "-";
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
      month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
      strDate = "0" + strDate;
    }
    var currentdate = year + seperator1 + month + seperator1 + strDate;
    return currentdate;
  },

		  settime(){


        const end = new Date();
        const start = new Date();
        let end2 = this.getNowFormatDate(end);
        let start2 =this.getNowFormatDate( new Date(start-2592000000));
        this.value6=[start2,end2]


      },
		  settype(id,type){
		    let _this =this;
        let startTime = _this.formAdd(_this.value6[0]);  /*开始时间*/
        let entTime = _this.formAdd(_this.value6[1]);	 /*结束时间*/
        if( this.value=='All'&&type==100){
          var useobj={
            start_at:startTime,
            end_at:entTime
          }
        }else if(type==100){
          var useobj={
            currency_id:id,
            start_at:startTime,
            end_at:entTime
          };
        }else if(this.value=='All'){
          var useobj={
            type:type,
            start_at:startTime,
            end_at:entTime
          };
        }else {
          var useobj ={
            currency_id: id,
            type: type,
            start_at:startTime,
            end_at:entTime
          }
        }
        return useobj;
      },
			change(id) {
				var _this = this;
				_this.callback(); /*刷新token判断*/
				_this.currencyID = id; /*获取传递的id*/

        let obj =this.settype(id,this.type);
				/*获取交易记录*/
				axios.get(httpUrl.recharge, {
					headers: {
						"Authorization": "Bearer " + _this.token
					},
					params: obj
				}).then(function(res) {
					_this.Currency_record = res.data.data.data;
					_this.total = Number(res.data.data.total);
				}, function(err) {
					console.log(err)
				})
			},
			change1(type) {
				var _this = this;
				for(let i = 0; i < _this.ChoiceOfcurrency.length; i++) {
					if(_this.ChoiceOfcurrency[i].type == type) {
						_this.ChoiceOfcurrencySelect = _this.ChoiceOfcurrency[i].value
					}
				}
       let obj = this.settype(this.currencyID,type);
				axios.get(httpUrl.recharge,{
					headers: {
						"Authorization": "Bearer " + _this.token
					},
					params:obj
				}).then(function(res){
					_this.Currency_record = res.data.data.data;
					_this.total = Number(res.data.data.total);
				},function(err){
					console.log(err)
				})

			},
			query() {
				var _this = this;

				_this.callback(); /*刷新token判断*/
				if(_this.value6.length == 0) {
					return false;
				}

				let obj =_this.settype( _this.currencyID,_this.type);
				axios.get(httpUrl.recharge, {
					headers: {
						"Authorization": "Bearer " + _this.token
					},
					params:obj
				}).then(function(res) {
					_this.Currency_record = res.data.data.data;
					_this.total = Number(res.data.data.total);
				}, function(err) {
					console.log(err)
				})
			},
			/*换页*/
			/*换页事件*/
			pageChange(val) {
				var _this = this;
        let startTime = _this.formAdd(_this.value6[0]);  /*开始时间*/
        let entTime = _this.formAdd(_this.value6[1]);	 /*结束时间*/
				_this.callback(); /*刷新token判断*/
        let obj;

        if(_this.currencyID=="All"){
          obj={"page": val,
            start_at:startTime,
            end_at:entTime}
        }else{
            obj={"page": val,
              start_at:startTime,
              end_at:entTime,
              "currency_id":_this.currencyID}
          }
				axios.get(httpUrl.recharge, {
					params:obj,
					headers: {
						"Authorization": "Bearer " + _this.token
					}
				}).then(function(res) {
					_this.Currency_record = res.data.data.data;
				}, function(err) {
					console.log(err)
				})
			}
		}
	}
</script>

<style lang="scss">
	/*资金记录*/
	.Currency_options_white{
		background: #fff !important;
		color: #000;
		border: 2px solid #ddd !important;
		border-top: none !important;
		.el-input__inner,.el-range-input{
			background: #fff !important;
			color: #000 !important;
		}
		.el-range-input::-webkit-input-placeholder {
			color: #000 !important;
		}
		.money_Record_content{
			td{
				color: #000 !important;
			}
		}
	}
	/*媒体查询*/

	@media only screen and (max-width: 1535px) {
		.query,
		.Lately,
		.Date_table,
		.type {
			margin-left: 0px !important;
		}
	}

	@media only screen and (max-width: 1230px) {
		.type,
		.currency {
			width: 165px !important;
		}
		.Lately {
			width: 190px !important;
		}
	}
	/*高亮部分*/

	.active_border_color {
		border: 1px solid #6666fa !important;
	}
	/*资金部分*/

	#money_Record {
		width: 100%;
		color: #fff;
		/*分页样式*/
		.el-pagination.is-background .el-pager li.active {
			background: #9F99F2;
			border: 1px solid #9F99F2;
		}
		.el-date-editor--daterange {
			.el-input__icon {
				width: 21px;
			}
		}
		.el-range__close-icon {
			width: 0px !important;
			margin-right: 10px;
		}
		.el-select {
			width: 100% !important;
			height: 100% !important;
			.el-input {
				width: 100% !important;
			}
		}
		.el-input {
			width: 100% !important;
			float: left;
		}
		.el-range-input::-webkit-input-placeholder {
			color: #fff;
		}
		.el-range-separator {
			color: #6666fa;
		}
		.el-input__inner {
			width: 100% !important;
			height: 40px !important;
			color: #fff ;
			border: 1px solid #2c3983;
			background: #101034;
		}
		.el-range-input {
			background: #101034;
			color: #fff;
		}
		/*按钮*/
		.el-button--primary {
			background: #6666fa;
			border-color: #6666fa;
		}
	}
	/*资金内容*/

	.money_Record_content {
		width: 100%;
		tr {
			width: 100%;
			height: 40px;
			line-height: 40px;
			td {
				text-align: center;
				color: #7a74c3;
			}
			td:nth-of-type(1) {
				text-align: left;
				box-sizing: border-box;
				padding-left: 10px;
			}
			td:nth-of-type(2) {
				box-sizing: border-box;
				text-align: left;
				padding-left: 30px;
			}
		}
		.biz {
			td {
				color: #fff;
			}
		}
	}
	/*分页*/

	.pageCount {
		width: 100%;
		height: 60px;
		.button {
			float: right;
			margin-top: 15px;
			span {
				display: inline-block;
				width: 20px;
				height: 20px;
				font-size: 14px;
				line-height: 20px;
				text-align: center;
				cursor: pointer;
			}
			i {
				font-size: 14px;
				cursor: pointer;
			}
		}
	}
	/*判读有没有资金记录*/

	.isShowMoneyRecord {
		width: 100%;
		height: 50px;
		line-height: 50px;
		text-align: center;
	}
	/*资金头部*/

	.money_Record_title {
		width: 100%;
		height: 45px;
		line-height: 45px;
		.money_Record_title_text {
			display: inline-block;
			padding: 0 35px;
			text-align: center;
			font-size: 15px;
			background: #272867;
		}
	}
	/*边框内部*/
	.border_nei{
		width: 100%;
		height: 100%;
		box-sizing: border-box;
		border: 3px solid #0b0b15;
	}
	/*资金内容部分*/

	.Currency_options {
		width: 100%;
		box-sizing: border-box;
		background: #16182c;
		.Currency_options_title {
      padding-left: 10px;
			width: 100%;
			height: 75px;
			line-height: 75px;
			display: flex;
			align-items: center;
			/*币种      类型*/
			.currency,
			.type {
				height: 75px;
				.currency_title {
					margin: 0 10px;
				}
				.select {
					width: 113px;
					height: 35px;
					line-height: 35px;
					float: left;
					margin-top: 20px;
				}
			}
			/*类型*/
			.type {
				margin-left: 20px;
			}
			/*最近俩天*/
			.Lately {
				width: 200px;
				height: 75px;
				margin-left: 20px;
				span {
					width: 45%;
					height: 35px;
					float: left;
					cursor: pointer;
					text-align: center;
					box-sizing: border-box;
					line-height: 35px;
					display: inline-block;
					border: 1px solid #2c3983;
					margin-top: 20px;
					background: #101034;
				}
				span:nth-of-type(1) {
					border-right: none;
					border-top-left-radius: 4px;
					border-bottom-left-radius: 4px;
				}
				span:nth-last-child(1) {
					border-top-right-radius: 4px;
					border-bottom-right-radius: 4px;
				}
			}
			/*时间表*/
			.Date_table {
				width: 260px;
				height: 75px;
				margin-left: 20px;
			}
			/*查询按钮*/
			.query {
				height: 75px;
				text-align: center;
				margin-left: 40px;
				button {
					margin-left: 20px;
				}
			}
		}
	}
</style>
