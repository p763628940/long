
import axios from "axios";

import { httpUrl } from "../../components/http_url/http_url";

let host = httpUrl.host;
const api = function (token) {
    return {
		
		/**
		 * 1.外部发送短信或邮件
		 * App\Http\Controllers\Api\v1\sms\ValidatorMessageController@externalSms 
		 * @param {Object} data - 数据
		 * @param {string} data.key - （3c1203ddd17d8103d9527d69d87609ed6f5609dec45c5c84a7e3ddd7） 
		 * @param {string} data.type - mobile|email 
		 * @param {string} data.mobile_email - 国内|新加坡手机号|邮箱 
		 * @param {string} data.china - true|false 
		 * @param {string} data.content - 要发送的内容 
		 **/
		async externalSms({ key,type,mobileEmail,china,content }) {
			return await axios.post(host + "/api/v1/sms/externalSms", { key,type,mobile_email: mobileEmail,china,content },{
				headers: {
					"Authorization": "Bearer " + token
				}
			})
		},			

       
    }
}
export default api