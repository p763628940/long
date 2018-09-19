
import axios from "axios";

import { httpUrl } from "../../components/http_url/http_url";

let host = httpUrl.host;
const api = function (token) {
    return {
		
		/**
		 * 1.用户币种申请信息列表 和 详情
		 * App\Http\Controllers\Api\v1\CurrencyApplyController@index 
		 * @param {Object} data - 数据
		 * @param {numeric} data.status - 状态(0:审核中 -1:被驳回 1:已上线) 
		 * @param {string} data.eid - 加密id 
		 **/
		async currencyApplyGet({ status,eid }) {
			return await axios.get(host + "/api/v1/currencyApply", {
				params: { status,eid },
				headers: {
					"Authorization": "Bearer " + token
				}
			})
		},			

		/**
		 * 2.币种上线申请
		 * App\Http\Controllers\Api\v1\CurrencyApplyController@store 
		 * @param {Object} data - 数据
		 * @param {string} data.projectZh - 项目名称（中文版） 
		 * @param {string} data.projectEn - 项目名称（英文版） 
		 * @param {string} data.logoUrl - 币种图片Logo 
		 * @param {string} data.fullName - 币种的英文全称 
		 * @param {string} data.zhName - 币种的中文全称 
		 * @param {string} data.pageIdentifier - 币种简称 
		 * @param {string} data.summary - 币种简介(中文) 
		 * @param {string} data.summaryEn - 币种简介(英文) 
		 * @param {string} data.norm - 币种的标准 
		 * @param {string} data.pactUrl - 币种合同地址 
		 * @param {string} data.officiaWebsite - 币种官网 
		 * @param {string} data.whitePaperEn - 白皮书（英文版） 
		 * @param {string} data.whitePaperZh - 白皮书（中文版） 
		 * @param {string} data.whitePaperUrl - 永久连接到白皮书的地址 
		 * @param {string} data.contentEn - 富文本的币种详细介绍(英文版) 
		 * @param {string} data.contentZh - 富文本的币种详细介绍(中文版） 
		 * @param {string} data.referee_number - 邀请人账号（非必填） 
		 * @param {number} data.digit - 支持的小数点位数 
		 * @param {number} data.contacts_mobile - 联系人手机号 
		 * @param {number} data.is_airdrop - 是否空投（1，0） 
		 **/
		async currencyApplyPost({ projectZh,projectEn,logoUrl,fullName,zhName,pageIdentifier,summary,summaryEn,norm,pactUrl,officiaWebsite,whitePaperEn,whitePaperZh,whitePaperUrl,contentEn,contentZh,refereeNumber,digit,contactsMobile,isAirdrop }) {
			return await axios.post(host + "/api/v1/currencyApply", { projectZh,projectEn,logoUrl,fullName,zhName,pageIdentifier,summary,summaryEn,norm,pactUrl,officiaWebsite,whitePaperEn,whitePaperZh,whitePaperUrl,contentEn,contentZh,referee_number: refereeNumber,digit,contacts_mobile: contactsMobile,is_airdrop: isAirdrop },{
				headers: {
					"Authorization": "Bearer " + token
				}
			})
		},			

		/**
		 * 3.失败币种信息编辑
		 * App\Http\Controllers\Api\v1\CurrencyApplyController@update 
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
		 * @param {string} data.contentEn - 富文本的币种详细介绍(英文版) 
		 * @param {string} data.contentZh - 富文本的币种详细介绍(中文版） 
		 * @param {string} data.referee_number - 邀请人账号（非必填） 
		 * @param {number} data.digit - 支持的小数点位数 
		 * @param {number} data.contacts_mobile - 联系人手机号 
		 * @param {number} data.is_airdrop - 是否空投（1，0） 
		 **/
		async currencyApplyPut({ eid,projectZh,projectEn,logoUrl,fullName,zhName,summary,norm,pactUrl,officiaWebsite,whitePaperEn,whitePaperZh,whitePaperUrl,contentEn,contentZh,refereeNumber,digit,contactsMobile,isAirdrop }) {
			return await axios.put(host + "/api/v1/currencyApply", )
		},			

       
    }
}
export default api