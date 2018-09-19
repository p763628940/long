
import axios from "axios";

import { httpUrl } from "../../components/http_url/http_url";

let host = httpUrl.host;
const api = function () {
    return {
		
		/**
		 * oauth用户资金记录
		 * App\Http\Controllers\Api\v1\TuzyOauthController@OauthFinanceLog 
		 * @param {Object} data - 数据
		 * @param {string} data.date - 加密日期 
		 * @param {string} data.page - 页数 
		 * @param {string} data.s - 来源公司 
		 * @param {string} data.size - 每页数量 
		 **/
		async oauth({ date,page,s,size }) {
			return await axios.get(host + "/api/v1/oauth/financeLog", {
				params: { date,page,s,size }})
		},			

		/**
		 * 1.oauth
		 * App\Http\Controllers\Api\v1\TuzyOauthController@oauth 
		 * @param {Object} data - 数据
		 * @param {string} data.t - 临时token 
		 * @param {string} data.s - 来源公司 
		 **/
		async oauth({ t,s }) {
			return await axios.post(host + "/api/v1/oauth", { t,s })
		},			

       
    }
}
export default api