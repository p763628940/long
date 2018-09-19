
import axios from "axios";

import { httpUrl } from "../../components/http_url/http_url";

let host = httpUrl.host;
const api = function (token) {
    return {
		
		/**
		 * IMX-分享糖果 列表 && 详情
		 * App\Http\Controllers\Api\v1\AirDropCurrencyConfigController@index 
		 * @param {Object} data - 数据
		 * @param {string} data.eid - eid 
		 * @param {string} data.name - 搜索名称 
		 * @param {string} data.lang - {zh,en}]  语言 
		 **/
		async airDropCurrency({ eid,name,lang }) {
			return await axios.get(host + "/api/v1/airDropCurrency", {
				params: { eid,name,lang },
				headers: {
					"Authorization": "Bearer " + token
				}
			})
		},			

       
    }
}
export default api