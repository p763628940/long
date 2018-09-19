
import axios from "axios";

import { httpUrl } from "../../components/http_url/http_url";

let host = httpUrl.host;
const api = function (token) {
    return {
		
		/**
		 * 4. 邀请好友个人资产详情
		 * /api/v1/assetInfo 
		 * @param {Object} data - 数据
		 **/
		async assetInfo() {
			return await axios.get(host + "/api/v1/assetInfo", {
				params: {},
				headers: {
					"Authorization": "Bearer " + token
				}
			})
		},			

		/**
		 * 3. 超级用户推广收益详情
		 * /api/v1/earngingsSuper 
		 * @param {Object} data - 数据
		 **/
		async earngingsSuper() {
			return await axios.get(host + "/api/v1/earngingsSuper", {
				params: {},
				headers: {
					"Authorization": "Bearer " + token
				}
			})
		},			

		/**
		 * 2. 邀请好友收益详情
		 * /api/v1/earningsInfo 
		 * @param {Object} data - 数据
		 **/
		async earningsInfo() {
			return await axios.get(host + "/api/v1/earningsInfo", {
				params: {},
				headers: {
					"Authorization": "Bearer " + token
				}
			})
		},			

		/**
		 * 1. 超级节点邀请返利记录(一级用户)
		 * /api/v1/invitedList 
		 * @param {Object} data - 数据
		 * @param {number} data.page - 页码 (选填) 
		 **/
		async invitedList({ page }) {
			return await axios.get(host + "/api/v1/invitedList", {
				params: { page },
				headers: {
					"Authorization": "Bearer " + token
				}
			})
		},			

		/**
		 * 5.超级用户获取邀请列表
		 * /api/v1/invitedSuperList 
		 * @param {Object} data - 数据
		 **/
		async invitedSuperList() {
			return await axios.get(host + "/api/v1/invitedSuperList", {
				params: {},
				headers: {
					"Authorization": "Bearer " + token
				}
			})
		},			

       
    }
}
export default api