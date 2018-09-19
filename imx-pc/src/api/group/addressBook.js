
import axios from "axios";

import { httpUrl } from "../../components/http_url/http_url";

let host = httpUrl.host;
const api = function (token) {
    return {
		
		/**
		 * 3.地址添加
		 * App\Http\Controllers\Api\v1\ReceipCodeController@addressCreate 
		 * @param {Object} data - 数据
		 * @param {number} data.currency_id - 币种ID （必传） 
		 * @param {string} data.remarks - 备注 （必传） 
		 * @param {string} data.address - 地址 （必传） 
		 * @param {string} data.google_code - 谷歌码 （非必传） 
		 * @param {string} data.mobile_code - 短信码 （非必传） 
		 * @param {string} data.email_code - 邮箱码 （非必传） 
		 **/
		async addressCreate({ currencyId,remarks,address,googleCode,mobileCode,emailCode }) {
			return await axios.post(host + "/api/v1/addressCreate", { currency_id: currencyId,remarks,address,google_code: googleCode,mobile_code: mobileCode,email_code: emailCode },{
				headers: {
					"Authorization": "Bearer " + token
				}
			})
		},			

		/**
		 * 2.地址删除
		 * App\Http\Controllers\Api\v1\ReceipCodeController@addressDel 
		 * @param {Object} data - 数据
		 * @param {number} data.addressId - 地址ID （必传） 
		 **/
		async addressDel({ addressId }) {
			return await axios.post(host + "/api/v1/addressDel", { addressId },{
				headers: {
					"Authorization": "Bearer " + token
				}
			})
		},			

		/**
		 * 1.地址列表
		 * App\Http\Controllers\Api\v1\ReceipCodeController@addressList 
		 * @param {Object} data - 数据
		 * @param {number} data.page - 页码 (可选) 
		 * @param {number} data.currency_id - 币种 Id (可选) 
		 **/
		async addressList({ page,currencyId }) {
			return await axios.get(host + "/api/v1/addressList", {
				params: { page,currency_id: currencyId },
				headers: {
					"Authorization": "Bearer " + token
				}
			})
		},			

		/**
		 * 4.地址输入验证
		 * App\Http\Controllers\Api\v1\ReceipCodeController@checkAddress 
		 * @param {Object} data - 数据
		 * @param {number} data.currency_id - 币种ID （必传） 
		 * @param {string} data.address - 地址 （必传） 
		 **/
		async checkAddress({ currencyId,address }) {
			return await axios.post(host + "/api/v1/checkAddress", { currency_id: currencyId,address },{
				headers: {
					"Authorization": "Bearer " + token
				}
			})
		},			

       
    }
}
export default api