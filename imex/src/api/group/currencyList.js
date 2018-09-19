
import axios from "axios";

import { httpUrl } from "../../components/http_url/http_url";

let host = httpUrl.host;
const api = function () {
    return {
		
		/**
		 * 1.在用币种列表
		 * App\Http\Controllers\Api\v1\FinanceController@currencyList 
		 * @param {Object} data - 数据
		 **/
		async currencyList() {
			return await axios.get(host + "/api/v1/currencyList", {
				params: {}})
		},			

       
    }
}
export default api