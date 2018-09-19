
import axios from "axios";

import { httpUrl } from "../../components/http_url/http_url";

let host = httpUrl.host;
const api = function () {
    return {
		
		/**
		 * 1 国家列表
		 * App\Http\Controllers\Api\v1\CountryController@country 
		 * @param {Object} data - 数据
		 **/
		async countryList() {
			return await axios.get(host + "/api/v1/country", {
				params: {}})
		},			

       
    }
}
export default api