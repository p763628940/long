
import axios from "axios";

import { httpUrl } from "../../components/http_url/http_url";

let host = httpUrl.host;
const api = function () {
    return {
		
		/**
		 * IMX-Banner
		 * App\Http\Controllers\Api\v1\BannerController@index 
		 * @param {Object} data - 数据
		 * @param {string} data.type - 类型 
		 * @param {string} data.lang - 语言 
		 **/
		async banner({ type,lang }) {
			return await axios.get(host + "/api/v1/banner", {
				params: { type,lang }})
		},			

       
    }
}
export default api