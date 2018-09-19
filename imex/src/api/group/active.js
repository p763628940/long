
import axios from "axios";

import { httpUrl } from "../../components/http_url/http_url";

let host = httpUrl.host;
const api = function (token) {
    return {

		/**
		 * 2.个人邀请记录
		 * /api/v1/invitationRecord
		 * @param {Object} data - 数据
		 **/
		async invitationRecord() {
			return await axios.get(host + "/api/v1/invitationRecord", {
				params: {},
				headers: {
					"Authorization": "Bearer " + token
				}
			})
		},

		/**
		 * 1.活动期间用户详情
		 * /api/v1/personalInfo
		 * @param {Object} data - 数据
		 **/
		async personalInfo() {
			return await axios.get(host + "/api/v1/personalInfo", {
				params: {},
				headers: {
					"Authorization": "Bearer " + token
				}
			})
		},


    }
}
export default api
