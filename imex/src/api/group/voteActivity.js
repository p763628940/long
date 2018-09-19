
import axios from "axios";

import { httpUrl } from "../../components/http_url/http_url";

let host = httpUrl.host;
const api = function (token) {
    return {
		
		/**
		 * 1.活动列表/详情
		 * App\Http\Controllers\Api\v1\UserExtraControler@index 
		 * @param {Object} data - 数据
		 * @param {string} data.eid - 加密id 
		 * @param {string} data.status - 加密id 
		 **/
		async get({ eid,status }) {
			return await axios.get(host + "/api/v1/voteActivity", {
				params: { eid,status },
				headers: {
					"Authorization": "Bearer " + token
				}
			})
		},			

		/**
		 * 2.投票
		 * App\Http\Controllers\Api\v1\UserExtraControler@index 
		 * @param {Object} data - 数据
		 * @param {string} data.type - 阶段 0:第一 1:第二  阶段 
		 * @param {string} data.match_apply_eid - 投票项目eid 
		 * @param {string} data.vote_activity_eid - 投票活动eid 
		 * @param {string} data.note - 超级节点评论 
		 **/
		async vote({ type,matchApplyEid,voteActivityEid,note }) {
			return await axios.post(host + "/api/v1/voteActivity/vote", { type,match_apply_eid: matchApplyEid,vote_activity_eid: voteActivityEid,note },{
				headers: {
					"Authorization": "Bearer " + token
				}
			})
		},			

       
    }
}
export default api