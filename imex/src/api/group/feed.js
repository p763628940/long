
import axios from "axios";

import { httpUrl } from "../../components/http_url/http_url";

let host = httpUrl.host;
const api = function (token) {
    return {
		
		/**
		 * 1.bug 反馈
		 * \Laravel\Passport\Http\Controllers\BugFeedbackController@addFeedback 
		 * @param {Object} data - 数据
		 * @param {string} data.content - 内容 
		 * @param {file} data.photo - 图片 
		 **/
		async addFeedback({ content,photo }) {
			return await axios.post(host + "/api/v1/addFeedback", { content,photo },{
				headers: {
					"Authorization": "Bearer " + token
				}
			})
		},			

       
    }
}
export default api