
import axios from "axios";

import { httpUrl } from "../../components/http_url/http_url";

let host = httpUrl.host;
const api = function (token) {
    return {
		
		/**
		 * 活动日志添加
		 * App\Http\Controllers\Api\v1\FileController@log 
		 * @param {Object} data - 数据
		 * @param {numeric} data.type - 类型 
		 * @param {string} data.currency_eid - 币种EID(建议传递过来) 
		 * @param {string} data.invite_code - 邀请码 不传则为匿名用户 
		 **/
		async log({ type,currencyEid,inviteCode }) {
			return await axios.post(host + "/api/v1/uploadDropLog", { type,currency_eid: currencyEid,invite_code: inviteCode })
		},			

		/**
		 * 二维码生成
		 * App\Http\Controllers\Api\v1\FileController@qrCode 
		 * @param {Object} data - 数据
		 * @param {string} data.text - 文字 URL等 （必传） 
		 **/
		async qrCode({ text }) {
			return await axios.get(host + "/api/v1/storeQrcode", {
				params: { text },
				headers: {
					"Authorization": "Bearer " + token
				}
			})
		},			

		/**
		 * 文件上传
		 * App\Http\Controllers\Api\v1\FileController@addressDel 
		 * @param {Object} data - 数据
		 * @param {file} data.file - 文件 （必传） 
		 * @param {string} data.mimes - 文件格式 
		 * @param {string} data.size - 文件大小(KB) 
		 **/
		async uploadFile({ file,mimes,size }) {
			return await axios.post(host + "/api/v1/uploadFile", { file,mimes,size },{
				headers: {
					"Authorization": "Bearer " + token
				}
			})
		},			

		/**
		 * 获得上传配置
		 * App\Http\Controllers\Api\v1\FileController@uploadSet 
		 * @param {Object} data - 数据
		 * @param {string} data.mimes - 文件格式 
		 * @param {integer} data.size - 文件大小(KB) 
		 **/
		async uploadSet({ mimes,size }) {
			return await axios.post(host + "/api/v1/uploadSet", { mimes,size })
		},			

       
    }
}
export default api