
import axios from "axios";

import { httpUrl } from "../../components/http_url/http_url";

let host = httpUrl.host;
const api = function () {
    return {
		
		/**
		 * 1 app版本
		 * App\Http\Controllers\Api\v1\AppVersionController@getVserion 
		 * @param {Object} data - 数据
		 * @param {number} data.type - 类型：Plus:0,Android 1 
		 **/
		async getVserion({ type }) {
			return await axios.get(host + "/api/v1/getVserion", {
				params: { type }})
		},			

       
    }
}
export default api