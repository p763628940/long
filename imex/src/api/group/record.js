
import axios from "axios";

import { httpUrl } from "../../components/http_url/http_url";

let host = httpUrl.host;
const api = function (token) {
    return {
		
		/**
		 * 4.拉取聊天记录
		 * \Laravel\Passport\Http\Controllers\Api\v1\RecordController@getChatRecord 
		 * @param {Object} data - 数据
		 * @param {number} data.blaceId - 订单id（必传） 
		 * @param {number} data.page - 页码数（非必传） 
		 **/
		async getChatRecord({ blaceId,page }) {
			return await axios.get(host + "/api/v1/getChatRecord", {
				params: { blaceId,page },
				headers: {
					"Authorization": "Bearer " + token
				}
			})
		},			

		/**
		 * 2.获取聊天的token
		 * \Laravel\Passport\Http\Controllers\Api\v1\RecordController@getToken 
		 * @param {Object} data - 数据
		 * @param {string} data.userId - 用户通信标识 
		 **/
		async getToken({ userId }) {
			return await axios.get(host + "/api/v1/getToken", {
				params: { userId }})
		},			

		/**
		 * 1.换取通信 userIds
		 * \Laravel\Passport\Http\Controllers\Api\v1\RecordController@getUserId 
		 * @param {Object} data - 数据
		 **/
		async getUserId() {
			return await axios.get(host + "/api/v1/getUserId", {
				params: {},
				headers: {
					"Authorization": "Bearer " + token
				}
			})
		},			

		/**
		 * 5.获取指定用户的在线情况
		 * \Laravel\Passport\Http\Controllers\Api\v1\RecordController@onlineState 
		 * @param {Object} data - 数据
		 * @param {string} data.userId - 用户ID（必传） 
		 **/
		async onlineState({ userId }) {
			return await axios.get(host + "/api/v1/onlineState", {
				params: { userId },
				headers: {
					"Authorization": "Bearer " + token
				}
			})
		},			

		/**
		 * 3.发送消息
		 * \Laravel\Passport\Http\Controllers\Api\v1\RecordController@sendMsg 
		 * @param {Object} data - 数据
		 * @param {string} data.toUserIds - 发送方用户通信标识 （必填） 
		 * @param {number} data.orderId - 订单号 （必填） 
		 * @param {number} data.msgType - 消息类型 （必填）0 文本  1 文件 
		 * @param {string} data.content - 消息内容  msgType 为 0 时必填 
		 * @param {file} data.picture - 图片 msgType 为 1 时必填 
		 **/
		async sendMsg({ toUserIds,orderId,msgType,content,picture }) {
			return await axios.post(host + "/api/v1/sendMsg", { toUserIds,orderId,msgType,content,picture },{
				headers: {
					"Authorization": "Bearer " + token
				}
			})
		},			

       
    }
}
export default api