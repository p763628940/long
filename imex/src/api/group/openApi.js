
import axios from "axios";

import { httpUrl } from "../../components/http_url/http_url";

let host = httpUrl.host;
const api = function (token) {
    return {
		
		/**
		 * OpenApi 列表 && 详情
		 * App\Http\Controllers\Api\v1\OpenApiController@index 
		 * @param {Object} data - 数据
		 * @param {string} data.eid - eid 
		 * @param {integer} data.page - page页数 
		 **/
		async openApi({ eid,page }) {
			return await axios.get(host + "/api/v1/openApi", {
				params: { eid,page },
				headers: {
					"Authorization": "Bearer " + token
				}
			})
		},			

		/**
		 * 删除OPENAPI
		 * App\Http\Controllers\Api\v1\ConsensusController@destroy 
		 * @param {Object} data - 数据
		 * @param {string} data.eid - EID 
		 **/
		async openApiDelete({ eid }) {
			return await axios.post(host + "/api/v1/openApi", { eid , _method:'DELETE'},{
				headers: {
					"Authorization": "Bearer " + token
				}
			})
		},			

		/**
		 * 更新OPENAPI
		 * App\Http\Controllers\Api\v1\ConsensusController@store 
		 * @param {Object} data - 数据
		 * @param {string} data.eid - EID 
		 * @param {string} data.ips - ip地址 逗号分隔 
		 * @param {string} data.note - 备注信息 
		 **/
		async openApiPatch({ eid,ips,note }) {
			return await axios.patch(host + "/api/v1/openApi", { eid,ips,note },{
				headers: {
					"Authorization": "Bearer " + token
				}
			})
		},			

		/**
		 * 创建OPENAPI
		 * App\Http\Controllers\Api\v1\OpenApiController@store 
		 * @param {Object} data - 数据
		 * @param {string} data.pwd - 用户密码 
		 * @param {string} data.ips - ip地址 多个以逗号分隔 
		 * @param {string} data.note - 备注信息 
		 **/
		async openApiPost({ pwd,ips,note }) {
			return await axios.post(host + "/api/v1/openApi", { pwd,ips,note },{
				headers: {
					"Authorization": "Bearer " + token
				}
			})
		},			

       
    }
}
export default api