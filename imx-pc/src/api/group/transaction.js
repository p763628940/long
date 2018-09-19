
import axios from "axios";

import { httpUrl } from "../../components/http_url/http_url";

let host = httpUrl.host;
const api = function (token) {
    return {
		
		/**
		 * 3.撤单
		 * App\Http\Controllers\Api\v1\TransactionController@back 
		 * @param {Object} data - 数据
		 * @param {number} data.transaction_eid - 订单ID 
		 **/
		async back({ transactionEid }) {
			return await axios.post(host + "/api/v1/transaction/back", { transaction_eid: transactionEid },{
				headers: {
					"Authorization": "Bearer " + token
				}
			})
		},			

		/**
		 * 7.获取买卖列队
		 * App\Http\Controllers\Api\v1\TransactionController@buy_sell_queue 
		 * @param {Object} data - 数据
		 * @param {number} data.matchcoin_id - 对币ID 
		 **/
		async buySellQueue({ matchcoinId }) {
			return await axios.get(host + "/api/v1/transaction/buy_sell_queue", {
				params: { matchcoin_id: matchcoinId }})
		},			

		/**
		 * 4.当前委托
		 * App\Http\Controllers\Api\v1\TransactionController@current 
		 * @param {Object} data - 数据
		 * @param {number} data.matchcoin_id - 币对ID(不为空时只获取当前币对,空时所有币对) 
		 * @param {number} data.page - 页码 默认 1 
		 * @param {number} data.perpage - 每页显示数量 默认 5 
		 **/
		async current({ matchcoinId,page,perpage }) {
			return await axios.get(host + "/api/v1/transaction/current", {
				params: { matchcoin_id: matchcoinId,page,perpage },
				headers: {
					"Authorization": "Bearer " + token
				}
			})
		},			

		/**
		 * 10.1 获取手续费
		 * App\Http\Controllers\Api\v1\TransactionController@get_total_fee 
		 * @param {Object} data - 数据
		 **/
		async getTotalFee() {
			return await axios.get(host + "/api/v1/get_total_fee", {
				params: {},
				headers: {
					"Authorization": "Bearer " + token
				}
			})
		},			

		/**
		 * 5.历史委托
		 * App\Http\Controllers\Api\v1\TransactionController@history 
		 * @param {Object} data - 数据
		 * @param {number} data.datetype - 时间类型(0:当日,1:一周,2:一个月,3:三个月,4:自定义起始时间) 
		 * @param {number} data.matchcoin_id - 币对ID(可选,默认所有) 
		 * @param {number} data.status - 成交类型(可选,默认所有,1:只显示已成交) 
		 * @param {string} data.startdate - 开始时间(datetype:4时,必填) 
		 * @param {string} data.enddate - 开始时间(datetype:4时,必填) 
		 * @param {number} data.page - 页码 默认1 
		 * @param {number} data.perpage - 每页显示数量 默认5 
		 **/
		async history({ datetype,matchcoinId,status,startdate,enddate,page,perpage }) {
			return await axios.get(host + "/api/v1/transaction/history", {
				params: { datetype,matchcoin_id: matchcoinId,status,startdate,enddate,page,perpage },
				headers: {
					"Authorization": "Bearer " + token
				}
			})
		},			

		/**
		 * 8.获取委托详情
		 * App\Http\Controllers\Api\v1\TransactionController@info 
		 * @param {Object} data - 数据
		 * @param {string} data.transaction_eid - 
		 **/
		async info({ transactionEid }) {
			return await axios.get(host + "/api/v1/transaction/info", {
				params: { transaction_eid: transactionEid },
				headers: {
					"Authorization": "Bearer " + token
				}
			})
		},			

		/**
		 * 1.限价交易
		 * App\Http\Controllers\Api\v1\TransactionController@limit 
		 * @param {Object} data - 数据
		 * @param {number} data.matchcoin_id - 币对ID 
		 * @param {string} data.type - 买卖(buy|sell) 
		 * @param {number} data.price - 价格(主币) 
		 * @param {number} data.count - 数量(对币) 
		 **/
		async limit({ matchcoinId,type,price,count }) {
			return await axios.post(host + "/api/v1/transaction/limit", { matchcoin_id: matchcoinId,type,price,count },{
				headers: {
					"Authorization": "Bearer " + token
				}
			})
		},			

		/**
		 * 10.公司账户回收IMX接口信息
		 * App\Http\Controllers\Api\v1\TransactionController@mining_info 
		 * @param {Object} data - 数据
		 * @param {string} data.date - 当天回购的日期(2018-06-28) 
		 **/
		async miningInfo({ date }) {
			return await axios.get(host + "/api/v1/mining_info", {
				params: { date },
				headers: {
					"Authorization": "Bearer " + token
				}
			})
		},			

		/**
		 * 2.市价交易
		 * App\Http\Controllers\Api\v1\TransactionController@now 
		 * @param {Object} data - 数据
		 * @param {number} data.matchcoin_id - 币对ID 
		 * @param {string} data.type - 买卖(buy|sell) 
		 * @param {number} data.amount - 交易额|数量 
		 **/
		async now({ matchcoinId,type,amount }) {
			return await axios.post(host + "/api/v1/transaction/now", { matchcoin_id: matchcoinId,type,amount },{
				headers: {
					"Authorization": "Bearer " + token
				}
			})
		},			

		/**
		 * 6.实时成交数据
		 * App\Http\Controllers\Api\v1\TransactionController@realtimeDone 
		 * @param {Object} data - 数据
		 * @param {number} data.matchcoin_id - 对币ID 
		 **/
		async realtimeDone({ matchcoinId }) {
			return await axios.get(host + "/api/v1/transaction/realtimeDone", {
				params: { matchcoin_id: matchcoinId }})
		},			

		/**
		 * 9.获取行情
		 * App\Http\Controllers\Api\v1\TransactionController@ticker 
		 * @param {Object} data - 数据
		 * @param {number} data.matchcoin_id - 对币ID 
		 **/
		async ticker({ matchcoinId }) {
			return await axios.get(host + "/api/v1/ticker", {
				params: { matchcoin_id: matchcoinId }})
		},			

		/**
		 * 9.1 获取所有行情
		 * App\Http\Controllers\Api\v1\TransactionController@ticker_all 
		 * @param {Object} data - 数据
		 **/
		async tickerAll() {
			return await axios.get(host + "/api/v1/symbol/ticker", {
				params: {}})
		},			

       
    }
}
export default api