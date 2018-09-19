
import axios from "axios";

import { httpUrl } from "../../components/http_url/http_url";

let host = httpUrl.host;
const api = function () {
    return {
		
		/**
		 * 1 首页轮播图
		 * App\Http\Controllers\Api\v1\CarouselController@piclist 
		 * @param {Object} data - 数据
		 **/
		async piclistList() {
			return await axios.get(host + "/api/v1/piclist", {
				params: {}})
		},			

       
    }
}
export default api