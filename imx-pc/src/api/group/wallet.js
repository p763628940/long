
import axios from "axios";

import { httpUrl } from "../../components/http_url/http_url";

let host = httpUrl.host;
const api = function (token) {
    return {
		
		/**
		 * 4.添加合约币种
		 * App\Http\Controllers\Api\v1\FinanceController@addContract 
		 * @param {Object} data - 数据
		 * @param {string} data.address - 地址 
		 * @param {string} data.symbol - 币名称 （EOS 必填） 
		 * @param {type} data.type - 操作类型（1：EOS 0：ETH） 
		 **/
		async addContract({ address,symbol,type }) {
			return await axios.post(host + "/api/v1/addContract", { address,symbol,type },{
				headers: {
					"Authorization": "Bearer " + token
				}
			})
		},			

		/**
		 * 5.充提币币种列表
		 * App\Http\Controllers\Api\v1\FinanceController@currencyWallet 
		 * @param {Object} data - 数据
		 **/
		async currencyWallet() {
			return await axios.get(host + "/api/v1/currencyWallet", {
				params: {},
				headers: {
					"Authorization": "Bearer " + token
				}
			})
		},			

		/**
		 * 1.钱包资产列表
		 * App\Http\Controllers\Api\v1\FinanceController@financeAssets 
		 * @param {Object} data - 数据
		 **/
		async financeAssets() {
			return await axios.get(host + "/api/v1/financeAssets", {
				params: {},
				headers: {
					"Authorization": "Bearer " + token
				}
			})
		},			

		/**
		 * 3.币种操作
		 * App\Http\Controllers\Api\v1\FinanceController@financeSave 
		 * @param {Object} data - 数据
		 * @param {number} data.currency_id - 币ID 
		 * @param {type} data.type - 操作类型（1：添加 0：移除） 
		 **/
		async financeSave({ currencyId,type }) {
			return await axios.post(host + "/api/v1/financeSave", { currency_id: currencyId,type },{
				headers: {
					"Authorization": "Bearer " + token
				}
			})
		},			

		/**
		 * 2.token搜索
		 * App\Http\Controllers\Api\v1\FinanceController@searchToken 
		 * @param {Object} data - 数据
		 * @param {string} data.text - token名称或合约地址 
		 * @param {numeric} data.bind_id - 对应的主链Id 
		 **/
		async searchToken({ text,bindId }) {
			return await axios.get(host + "/api/v1/searchToken", {
				params: { text,bind_id: bindId },
				headers: {
					"Authorization": "Bearer " + token
				}
			})
		},			

		/**
		 * 1.开启钱包
		 * App\Http\Controllers\Api\v1\FinanceController@walletOn 
		 * @param {Object} data - 数据
		 * @param {number} data.code - 验证码 (必传) 
		 * @param {number} data.type - 类型 (手机,1 邮箱,0) 
		 * @param {number} data.mobile - 手机号（已绑定非必传） 
		 * @param {string} data.email - 邮箱  （已绑定非必传） 
		 **/
		async walletOn({ code,type,mobile,email }) {
			return await axios.post(host + "/api/v1/walletOn", { code,type,mobile,email },{
				headers: {
					"Authorization": "Bearer " + token
				}
			})
		},			

       
    }
}
export default api