
import axios from "axios";

import { httpUrl } from "../../components/http_url/http_url";

let host = httpUrl.host;
const api = function () {
    return {
		
		/**
		 * 1.语言包
		 * App\Http\Controllers\Api\v1\ConfigController@lang 
		 * @param {Object} data - 数据
		 **/
		async lang() {
			return await axios.get(host + "/api/v1/config/lang", {
				params: {}})
		},			

       
    }
}
export default api