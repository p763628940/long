
import axios from "axios";

import { httpUrl } from "../../components/http_url/http_url";

let host = httpUrl.host;
const api = function (token) {
    return {
		
		/**
		 * 投票列表
		 * App\Http\Controllers\Api\v1\MatchVoteRecordController@index 
		 * @param {Object} data - 数据
		 * @param {string} data.vote_activity_eid - 活动EID 
		 * @param {string} data.match_apply_eid - 币EID 
		 * @param {int} data.type - `结果 0 一期 2期 
		 * @param {int} data.commentType - 评论类型 1:只有评论 
		 **/
		async coinVoteIndex({ voteActivityEid,matchApplyEid,type,commentType }) {
			return await axios.get(host + "/api/v1/coinVote", {
				params: { vote_activity_eid: voteActivityEid,match_apply_eid: matchApplyEid,type,commentType },
				headers: {
					"Authorization": "Bearer " + token
				}
			})
		},			

		/**
		 * 上币投票
		 * App\Http\Controllers\Api\v1\MatchVoteRecordController@store 
		 * @param {Object} data - 数据
		 * @param {string} data.vote_activity_eid - 活动EID 
		 * @param {string} data.match_apply_eid - 币EID 
		 * @param {int} data.type - `结果 0 一期 2期 
		 * @param {string} data.invite_code - 邀请码 
		 **/
		async coinVotePost({ voteActivityEid,matchApplyEid,type,inviteCode }) {
			return await axios.post(host + "/api/v1/coinVote", { vote_activity_eid: voteActivityEid,match_apply_eid: matchApplyEid,type,invite_code: inviteCode },{
				headers: {
					"Authorization": "Bearer " + token
				}
			})
		},			

       
    }
}
export default api