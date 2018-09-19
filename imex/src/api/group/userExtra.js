
import axios from "axios";

import { httpUrl } from "../../components/http_url/http_url";

let host = httpUrl.host;
const api = function (token) {
    return {
		
		/**
		 * 1.超级用户列表
		 * App\Http\Controllers\Api\v1\UserExtraControler@index 
		 * @param {Object} data - 数据
		 * @param {string} data.eid - 加密id 
		 **/
		async userExtraGet({ eid }) {
			return await axios.get(host + "/api/v1/userExtra", {
				params: { eid },
				headers: {
					"Authorization": "Bearer " + token
				}
			})
		},			

       
    }
}
export default api