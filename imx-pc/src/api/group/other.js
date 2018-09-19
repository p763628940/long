
import axios from "axios";

import { httpUrl } from "../../components/http_url/http_url";

let host = httpUrl.host;
const api = function () {
    return {
		
		/**
		 * 1.加密手机号
		 * App\Http\Controllers\Api\v1\OtherTransferController@hashPhone 
		 * @param {Object} data - 数据
		 * @param {string} data.phone - 手机号 
		 **/
		async hashPhone({ phone }) {
			return await axios.get(host + "/api/v1/hashPhone", {
				params: { phone }})
		},			

		/**
		 * 2.转账
		 * App\Http\Controllers\Api\v1\OtherTransferController@otherTrans 
		 * @param {Object} data - 数据
		 * @param {string} data.token - token 
		 * @param {numeric} data.transfernumber - 转账金额 
		 * @param {numeric} data.currency_id - 币种ID(IMX 最多14个) 
		 * @param {string} data.mobile_prefix - 手机号前缀 
		 * @param {string} data.company_name - 公司名称 
		 **/
		async otherTrans({ token,transfernumber,currencyId,mobilePrefix,companyName }) {
			return await axios.post(host + "/api/v1/otherTrans", { token,transfernumber,currency_id: currencyId,mobile_prefix: mobilePrefix,company_name: companyName })
		},			

       
    }
}
export default api