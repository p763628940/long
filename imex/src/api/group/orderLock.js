
import axios from "axios";

import { httpUrl } from "../../components/http_url/http_url";

let host = httpUrl.host;
const api = function (token) {
    return {
		
		/**
		 * 2.申诉原因
		 * \Laravel\Passport\Http\Controllers\BlaceOrderController@appealCates 
		 * @param {Object} data - 数据
		 **/
		async appealCates() {
			return await axios.get(host + "/api/v1/appealCates", {
				params: {},
				headers: {
					"Authorization": "Bearer " + token
				}
			})
		},			

		/**
		 * 1.申诉订单
		 * \Laravel\Passport\Http\Controllers\BlaceOrderController@orderLock 
		 * @param {Object} data - 数据
		 * @param {number} data.blaceId - 订单订单id(必传) 
		 * @param {number} data.appealId - 申诉原因(必传) 
		 * @param {string} data.details - 申述详情(必传) 
		 **/
		async orderLock({ blaceId,appealId,details }) {
			return await axios.post(host + "/api/v1/orderLock", { blaceId,appealId,details },{
				headers: {
					"Authorization": "Bearer " + token
				}
			})
		},			

		/**
		 * 3.取消申诉
		 * \Laravel\Passport\Http\Controllers\BlaceOrderController@orderUnlock 
		 * @param {Object} data - 数据
		 * @param {number} data.blaceId - 订单ID(必传) 
		 **/
		async orderUnlock({ blaceId }) {
			return await axios.post(host + "/api/v1/orderUnlock", { blaceId },{
				headers: {
					"Authorization": "Bearer " + token
				}
			})
		},			

       
    }
}
export default api