
import axios from "axios";

import { httpUrl } from "../../components/http_url/http_url";

let host = httpUrl.host;
const api = function (token) {
    return {
		
		/**
		 * 5.指定币种的历史地址
		 * App\Http\Controllers\Api\v1\FinanceController@addressHistory 
		 * @param {Object} data - 数据
		 * @param {number} data.currency_id - 币ID 
		 **/
		async addressHistory({ currencyId }) {
			return await axios.get(host + "/api/v1/addressHistory", {
				params: { currency_id: currencyId },
				headers: {
					"Authorization": "Bearer " + token
				}
			})
		},			

		/**
		 * 1.充币接口
		 * App\Http\Controllers\Api\v1\FinanceController@deposit 
		 * @param {Object} data - 数据
		 * @param {number} data.currency_id - 币ID 
		 **/
		async deposit({ currencyId }) {
			return await axios.get(host + "/api/v1/wallet/deposit", {
				params: { currency_id: currencyId },
				headers: {
					"Authorization": "Bearer " + token
				}
			})
		},			

		/**
		 * 6.交易记录
		 * App\Http\Controllers\Api\v1\FinanceController@financeLog 
		 * @param {Object} data - 数据
		 * @param {number} data.currency_id - 币ID 
		 * @param {number} data.type - 类型 
		 * @param {string} data.start_at - 开始时间 （日期格式） 
		 * @param {string} data.end_at - 结束时间（开始时间存在则必填） 
		 **/
		async financeLog({ currencyId,type,startAt,endAt }) {
			return await axios.get(host + "/api/v1/financeLog", {
				params: { currency_id: currencyId,type,start_at: startAt,end_at: endAt },
				headers: {
					"Authorization": "Bearer " + token
				}
			})
		},			

		/**
		 * 3.资产信息
		 * App\Http\Controllers\Api\v1\FinanceController@finances 
		 * @param {Object} data - 数据
		 **/
		async finances() {
			return await axios.get(host + "/api/v1/finances", {
				params: {},
				headers: {
					"Authorization": "Bearer " + token
				}
			})
		},			

		/**
		 * 7.获取点卡余额
		 * App\Http\Controllers\Api\v1\FinanceController@pointCardBalance 
		 * @param {Object} data - 数据
		 **/
		async pointCardBalance() {
			return await axios.get(host + "/api/v1/pointCardBalance", {
				params: {},
				headers: {
					"Authorization": "Bearer " + token
				}
			})
		},			

		/**
		 * 7.返利记录
		 * App\Http\Controllers\Api\v1\FinanceController@rebateRecord 
		 * @param {Object} data - 数据
		 * @param {string} data.txid - 类型 
		 * @param {string} data.start_at - 开始时间 （日期格式） 
		 * @param {string} data.end_at - 结束时间（开始时间存在则必填） 
		 **/
		async rebateRecord({ txid,startAt,endAt }) {
			return await axios.get(host + "/api/v1/rebateRecord", {
				params: { txid,start_at: startAt,end_at: endAt },
				headers: {
					"Authorization": "Bearer " + token
				}
			})
		},			

		/**
		 * 2.提币
		 * App\Http\Controllers\Api\v1\FinanceController@withdraw 
		 * @param {Object} data - 数据
		 * @param {number} data.currency_id - 币ID 
		 * @param {string} data.address - 提币地址 
		 * @param {string} data.tag - 地址标签(可为空) 
		 * @param {number} data.amount - 提币数量 
		 * @param {string} data.mobile_code - 手机验证码(开启验证时必填) 
		 * @param {string} data.email_code - 邮箱验证码(开启验证时必填) 
		 * @param {string} data.google_code - Google验证码(开启验证时必填) 
		 **/
		async withdraw({ currencyId,address,tag,amount,mobileCode,emailCode,googleCode }) {
			return await axios.post(host + "/api/v1/wallet/withdraw", { currency_id: currencyId,address,tag,amount,mobile_code: mobileCode,email_code: emailCode,google_code: googleCode },{
				headers: {
					"Authorization": "Bearer " + token
				}
			})
		},			

       
    }
}
export default api