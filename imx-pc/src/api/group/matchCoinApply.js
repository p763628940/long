
import axios from "axios";

import { httpUrl } from "../../components/http_url/http_url";

let host = httpUrl.host;
const api = function (token) {
    return {
		
		/**
		 * 1.用户币种申请信息列表 和 详情
		 * App\Http\Controllers\Api\v1\MatchCoinApplyController@index 
		 * @param {Object} data - 数据
		 * @param {numeric} data.status - 状态(0:审核中 -1:被驳回 1:已上线) 
		 * @param {string} data.eid - 加密id 
		 **/
		async matchCoinApplyGet({ status,eid }) {
			return await axios.get(host + "/api/v1/matchCoinApply", {
				params: { status,eid },
				headers: {
					"Authorization": "Bearer " + token
				}
			})
		},			

		/**
		 * 2.创建上币申请
		 * App\Http\Controllers\Api\v1\MatchCoinApplyController@store 
		 * @param {Object} data - 数据
		 * @param {string} data.projectZh - 项目名称（中文版） 
		 * @param {string} data.projectEn - 项目名称（英文版） 
		 * @param {string} data.logoUrl - 币种图片Logo 
		 * @param {string} data.fullName - 币种的英文全称 
		 * @param {string} data.zhName - 币种的中文全称 
		 * @param {string} data.summary - 币种简称 
		 * @param {string} data.norm - 币种的标准 
		 * @param {string} data.pactUrl - 币种合同地址 
		 * @param {string} data.officiaWebsite - 币种官网 
		 * @param {string} data.whitePaperEn - 白皮书（英文版） 
		 * @param {string} data.whitePaperZh - 白皮书（中文版） 
		 * @param {string} data.whitePaperUrl - 永久连接到白皮书的地址 
		 * @param {string} data.summeryEn - 富文本的币种详细介绍(英文版） 
		 * @param {string} data.referee_number - 邀请人账号 
		 * @param {number} data.digit - 支持的小数点位数 
		 * @param {number} data.contacts_mobile - 联系人手机号 
		 * @param {string} data.blockChainExplorer - 区块链浏览器 
		 * @param {string} data.releasePriceStr - &#39;发行价格&#39; 
		 * @param {date} data.release_at - &#39;发行日期&#39; 
		 * @param {string} data.releaseCount - &#39;发行总量&#39; 
		 **/
		async matchCoinApplyPost({ projectZh,projectEn,logoUrl,fullName,zhName,summary,norm,pactUrl,officiaWebsite,whitePaperEn,whitePaperZh,whitePaperUrl,summeryEn,refereeNumber,digit,contactsMobile,blockChainExplorer,releasePriceStr,releaseAt,releaseCount }) {
			return await axios.post(host + "/api/v1/matchCoinApply", { projectZh,projectEn,logoUrl,fullName,zhName,summary,norm,pactUrl,officiaWebsite,whitePaperEn,whitePaperZh,whitePaperUrl,summeryEn,referee_number: refereeNumber,digit,contacts_mobile: contactsMobile,blockChainExplorer,releasePriceStr,release_at: releaseAt,releaseCount },{
				headers: {
					"Authorization": "Bearer " + token
				}
			})
		},			

		/**
		 * 3.上币申请信息编辑
		 * App\Http\Controllers\Api\v1\MatchCoinApplyController@update 
		 * @param {Object} data - 数据
		 * @param {string} data.eid - 加密id 
		 * @param {string} data.projectZh - 项目名称（中文版） 
		 * @param {string} data.projectEn - 项目名称（英文版） 
		 * @param {string} data.logoUrl - 币种图片Logo 
		 * @param {string} data.fullName - 币种的英文全称 
		 * @param {string} data.zhName - 币种的中文全称 
		 * @param {string} data.summary - 币种简称 
		 * @param {string} data.norm - 币种的标准 
		 * @param {string} data.pactUrl - 币种合同地址 
		 * @param {string} data.officiaWebsite - 币种官网 
		 * @param {string} data.whitePaperEn - 白皮书（英文版） 
		 * @param {string} data.whitePaperZh - 白皮书（中文版） 
		 * @param {string} data.whitePaperUrl - 永久连接到白皮书的地址 
		 * @param {string} data.summeryEn - 富文本的币种详细介绍(英文版） 
		 * @param {string} data.referee_number - 邀请人账号（非必填） 
		 * @param {number} data.digit - 支持的小数点位数 
		 * @param {number} data.contacts_mobile - 联系人手机号 
		 * @param {string} data.blockChainExplorer - 区块链浏览器 
		 * @param {string} data.releasePriceStr - &#39;发行价格&#39; 
		 * @param {date} data.release_at - &#39;发行日期&#39; 
		 * @param {string} data.releaseCount - &#39;发行总量&#39; 
		 **/
		async matchCoinApplyPut({ eid,projectZh,projectEn,logoUrl,fullName,zhName,summary,norm,pactUrl,officiaWebsite,whitePaperEn,whitePaperZh,whitePaperUrl,summeryEn,refereeNumber,digit,contactsMobile,blockChainExplorer,releasePriceStr,releaseAt,releaseCount }) {
			return await axios.put(host + "/api/v1/matchCoinApply", )
		},			

       
    }
}
export default api