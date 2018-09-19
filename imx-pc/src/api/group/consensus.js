
import axios from "axios";

import { httpUrl } from "../../components/http_url/http_url";

let host = httpUrl.host;
const api = function (token) {
    return {
		
		/**
		 * IMX-共识 列表 && 详情
		 * App\Http\Controllers\Api\v1\ConsensusController@index 
		 * @param {Object} data - 数据
		 * @param {string} data.eid - eid 
		 * @param {string} data.name - 搜索名称 
		 * @param {string} data.lang - 语言(默认中文) 
		 **/
		async consensus({ eid,name,lang }) {
			return await axios.get(host + "/api/v1/consensus", {
				params: { eid,name,lang },
				headers: {
					"Authorization": "Bearer " + token
				}
			})
		},			

		/**
		 * 共识投票
		 * App\Http\Controllers\Api\v1\ConsensusController@store 
		 * @param {Object} data - 数据
		 * @param {string} data.currency_eid - 币EID 
		 * @param {int} data.result - 结果 0 否决 1支持 
		 * @param {string} data.invite_code - 邀请码 
		 **/
		async consensusPost({ currencyEid,result,inviteCode }) {
			return await axios.post(host + "/api/v1/consensus", { currency_eid: currencyEid,result,invite_code: inviteCode },{
				headers: {
					"Authorization": "Bearer " + token
				}
			})
		},			

       
    }
}
export default api