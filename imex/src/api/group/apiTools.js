
import axios from "axios";

import { httpUrl } from "../../components/http_url/http_url";

let host = httpUrl.host;
const api = function (token) {
    return {
		
		/**
		 * 1.创建api
		 * App\Http\Controllers\Api\v1\ReceipCodeController@createApi 
		 * @param {Object} data - 数据
		 * @param {string} data.remark - 备注 （必传） 
		 * @param {string} data.bindIp - 绑定的iP地址 （必传,多个以英文 “,” 拼接） 
		 * @param {string} data.google_code - 谷歌码 （非必传） 
		 * @param {string} data.mobile_code - 短信码 （非必传） 
		 * @param {string} data.email_code - 邮箱码 （非必传） 
		 **/
		async createApi({ remark,bindIp,googleCode,mobileCode,emailCode }) {
			return await axios.post(host + "/api/v1/createApi", { remark,bindIp,google_code: googleCode,mobile_code: mobileCode,email_code: emailCode },{
				headers: {
					"Authorization": "Bearer " + token
				}
			})
		},			

		/**
		 * 3.Api 删除
		 * App\Http\Controllers\Api\v1\ApiToolsController@delApi 
		 * @param {Object} data - 数据
		 * @param {number} data.apiId - API  ID 
		 **/
		async delApi({ apiId }) {
			return await axios.post(host + "/api/v1/delApi", { apiId },{
				headers: {
					"Authorization": "Bearer " + token
				}
			})
		},			

		/**
		 * 4.api编辑
		 * App\Http\Controllers\Api\v1\ReceipCodeController@editApi 
		 * @param {Object} data - 数据
		 * @param {number} data.apiId - apiID（ 必传） 
		 * @param {string} data.remark - 备注 （非必传） 
		 * @param {string} data.bindIp - 绑定的iP地址 （非必传,多个以英文 “,” 拼接） 
		 * @param {string} data.google_code - 谷歌码 （非必传） 
		 * @param {string} data.mobile_code - 短信码 （非必传） 
		 * @param {string} data.email_code - 邮箱码 （非必传） 
		 **/
		async editApi({ apiId,remark,bindIp,googleCode,mobileCode,emailCode }) {
			return await axios.post(host + "/api/v1/editApi", { apiId,remark,bindIp,google_code: googleCode,mobile_code: mobileCode,email_code: emailCode },{
				headers: {
					"Authorization": "Bearer " + token
				}
			})
		},			

		/**
		 * 2.Api 列表
		 * App\Http\Controllers\Api\v1\ApiToolsController@listApi 
		 * @param {Object} data - 数据
		 **/
		async listApi() {
			return await axios.get(host + "/api/v1/listApi", {
				params: {},
				headers: {
					"Authorization": "Bearer " + token
				}
			})
		},			

       
    }
}
export default api