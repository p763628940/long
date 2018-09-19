
import axios from "axios";

import { httpUrl } from "../../components/http_url/http_url";

let host = httpUrl.host;
const api = function () {
    return {
		
		/**
		 * 1 首页数据
		 * App\Http\Controllers\Api\v1\TradingFeeNoticeController@tradingFeesGroup 
		 * @param {Object} data - 数据
		 * @param {string} data.month - 月份 
		 * @param {string} data.type - index 首页  hour 本小时 today 今日  yesterday 昨日 
		 **/
		async tradingFeesGroup({ month,type }) {
			return await axios.get(host + "/api/v1/tradingfees/group", {
				params: { month,type }})
		},			

       
    }
}
export default api