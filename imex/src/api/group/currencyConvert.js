
import axios from "axios";

import { httpUrl } from "../../components/http_url/http_url";

let host = httpUrl.host;
const api = function (token) {
    return {
		
		/**
		 * 2.兑换币种
		 * App\Http\Controllers\Api\v1\ConvertController@store 
		 * @param {Object} data - 数据
		 * @param {string} data.method - 兑换类型 
		 * @param {numeric} data.amount - 数量(4位小数) 
		 **/
		async currencyConvert({ method,amount }) {
			return await axios.post(host + "/api/v1/currencyConvert", { method,amount },{
				headers: {
					"Authorization": "Bearer " + token
				}
			})
		},			

		/**
		 * 3.兑换币种 FO K线
		 * App\Http\Controllers\Api\v1\ConvertController@kline 
		 * @param {Object} data - 数据
		 * @param {string} data.timezone - 时区 
		 **/
		async currencyConvertKLine({ timezone }) {
			return await axios.get(host + "/api/v1/currencyConvertKLine", {
				params: { timezone }})
		},			

		/**
		 * 1.兑换币种价格
		 * App\Http\Controllers\Api\v1\ConvertController@price 
		 * @param {Object} data - 数据
		 * @param {string} data.method - 兑换类型 
		 * @param {numeric} data.amount - 数量 
		 **/
		async currencyConvertPrice({ method,amount }) {
			return await axios.get(host + "/api/v1/currencyConvertPrice", {
				params: { method,amount }})
		},			

       
    }
}
export default api