
import axios from "axios";

import { httpUrl } from "../../components/http_url/http_url";

let host = httpUrl.host;
const api = function (token) {
    return {
		
		/**
		 * 4.商品时间刷新
		 * App\Http\Controllers\Api\v1\NaughtController@naughtLower 
		 * @param {Object} data - 数据
		 * @param {number} data.goods_id - 兑换ID 
		 **/
		async brush({ goodsId }) {
			return await axios.post(host + "/api/v1/naught/brush", { goods_id: goodsId },{
				headers: {
					"Authorization": "Bearer " + token
				}
			})
		},			

		/**
		 * 9.子订单列表
		 * App\Http\Controllers\Api\v1\NaughtController@childOrder 
		 * @param {Object} data - 数据
		 * @param {number} data.goods_id - 币ID 
		 **/
		async childOrder({ goodsId }) {
			return await axios.get(host + "/api/v1/naught/childOrder", {
				params: { goods_id: goodsId },
				headers: {
					"Authorization": "Bearer " + token
				}
			})
		},			

		/**
		 * 2.淘币市场
		 * App\Http\Controllers\Api\v1\NaughtController@naughtGoods 
		 * @param {Object} data - 数据
		 * @param {number} data.m_id - 兑出币ID 
		 * @param {number} data.c_id - 兑入币ID (m_id 不为空时必穿，否则不传) 
		 **/
		async goods({ mId,cId }) {
			return await axios.get(host + "/api/v1/naught/goods", {
				params: { m_id: mId,c_id: cId }})
		},			

		/**
		 * 5.淘币中列表
		 * App\Http\Controllers\Api\v1\NaughtController@naughtIncoin 
		 * @param {Object} data - 数据
		 * @param {number} data.m_id - 兑出币ID 
		 * @param {nmmber} data.c_id - 兑入币ID (m_id 不为空时必穿，否则不传) 
		 **/
		async incoin({ mId,cId }) {
			return await axios.post(host + "/api/v1/naught/incoin", { m_id: mId,c_id: cId },{
				headers: {
					"Authorization": "Bearer " + token
				}
			})
		},			

		/**
		 * 6.兑币详情
		 * App\Http\Controllers\Api\v1\NaughtController@naughtInfo 
		 * @param {Object} data - 数据
		 * @param {number} data.goods_id - 兑换ID 
		 **/
		async info({ goodsId }) {
			return await axios.get(host + "/api/v1/naught/info", {
				params: { goods_id: goodsId }})
		},			

		/**
		 * 3.下架
		 * App\Http\Controllers\Api\v1\NaughtController@naughtLower 
		 * @param {Object} data - 数据
		 * @param {number} data.goods_id - 兑换ID 
		 **/
		async lower({ goodsId }) {
			return await axios.post(host + "/api/v1/naught/lower", { goods_id: goodsId },{
				headers: {
					"Authorization": "Bearer " + token
				}
			})
		},			

		/**
		 * 8.我淘的币
		 * App\Http\Controllers\Api\v1\NaughtController@myOrder 
		 * @param {Object} data - 数据
		 * @param {number} data.m_id - 币ID 
		 * @param {number} data.c_id - 币ID 
		 **/
		async myOrder({ mId,cId }) {
			return await axios.get(host + "/api/v1/naught/myOrder", {
				params: { m_id: mId,c_id: cId },
				headers: {
					"Authorization": "Bearer " + token
				}
			})
		},			

		/**
		 * 9.1.淘币可用币列表
		 * App\Http\Controllers\Api\v1\NaughtController@naughtCurrency 
		 * @param {Object} data - 数据
		 **/
		async naughtCurrency() {
			return await axios.get(host + "/api/v1/naught/naughtCurrency", {
				params: {}})
		},			

		/**
		 * 7.下单
		 * App\Http\Controllers\Api\v1\NaughtController@naughtPlace 
		 * @param {Object} data - 数据
		 * @param {numeric} data.stocks_id - 兑换对ID 
		 * @param {numeric} data.goods_id - 兑换ID 
		 * @param {numeric} data.balance - 兑换量 
		 * @param {string} data.payPasswd - 支付密码 
		 **/
		async place({ stocksId,goodsId,balance,payPasswd }) {
			return await axios.post(host + "/api/v1/naught/place", { stocks_id: stocksId,goods_id: goodsId,balance,payPasswd },{
				headers: {
					"Authorization": "Bearer " + token
				}
			})
		},			

		/**
		 * 1.淘币发布
		 * App\Http\Controllers\Api\v1\NaughtController@publishGoods 
		 * @param {Object} data - 数据
		 * @param {numeric} data.m_id - 兑出币ID 
		 * @param {numeric} data.balance - 兑出量 
		 * @param {numeric} data.lower - 最小兑换量 
		 * @param {numeric} data.check_num - 限制成交次数（0 -200） 
		 * @param {numeric} data.is_auth - 限制高级认证 
		 * @param {numeric} data.is_mobile - 限制绑定手机号 
		 * @param {string} data.replay_text - 自定义回复内容（0-200） 
		 * @param {string} data.goods_info - 商品详情 
		 * @param {string} data.payPasswd - 支付密码 
		 **/
		async publish({ mId,balance,lower,checkNum,isAuth,isMobile,replayText,goodsInfo,payPasswd }) {
			return await axios.post(host + "/api/v1/naught/publish", { m_id: mId,balance,lower,check_num: checkNum,is_auth: isAuth,is_mobile: isMobile,replay_text: replayText,goods_info: goodsInfo,payPasswd },{
				headers: {
					"Authorization": "Bearer " + token
				}
			})
		},			

       
    }
}
export default api