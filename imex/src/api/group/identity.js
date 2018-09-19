
import axios from "axios";

import { httpUrl } from "../../components/http_url/http_url";

let host = httpUrl.host;
const api = function (token) {
    return {
		
		/**
		 * 2.高级身份申请
		 * \Laravel\Passport\Http\Controllers\IdentityTypeController@applyIdentity 
		 * @param {Object} data - 数据
		 * @param {number} data.identity_type - 类型(必传) 
		 * @param {string} data.turnout_address - 地址（非必传） 
		 * @param {number} data.price - 自定义数量 （当类型为 3 时必传） 
		 **/
		async applyIdentity({ identityType,turnoutAddress,price }) {
			return await axios.post(host + "/api/v1/applyIdentity", { identity_type: identityType,turnout_address: turnoutAddress,price },{
				headers: {
					"Authorization": "Bearer " + token
				}
			})
		},			

		/**
		 * 1.高级身份申请列表
		 * \Laravel\Passport\Http\Controllers\IdentityTypeController@identityList 
		 * @param {Object} data - 数据
		 **/
		async identityList() {
			return await axios.get(host + "/api/v1/identityList", {
				params: {},
				headers: {
					"Authorization": "Bearer " + token
				}
			})
		},			

		/**
		 * 3.余额购买高级身份
		 * \Laravel\Passport\Http\Controllers\IdentityTypeController@payIdentity 
		 * @param {Object} data - 数据
		 **/
		async payIdentity() {
			return await axios.post(host + "/api/v1/payIdentity", {},{
				headers: {
					"Authorization": "Bearer " + token
				}
			})
		},			

		/**
		 * 4.撤销申请
		 * \Laravel\Passport\Http\Controllers\IdentityTypeController@revokeAppeal 
		 * @param {Object} data - 数据
		 **/
		async revokeAppeal() {
			return await axios.post(host + "/api/v1/revokeAppeal", {},{
				headers: {
					"Authorization": "Bearer " + token
				}
			})
		},			

       
    }
}
export default api