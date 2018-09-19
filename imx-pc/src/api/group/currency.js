
import axios from "axios";

import { httpUrl } from "../../components/http_url/http_url";

let host = httpUrl.host;
const api = function (token) {
    return {
		
		/**
		 * 4.商家撤单
		 * \Laravel\Passport\Http\Controllers\PurchaseOrderController@cancelPur 
		 * @param {Object} data - 数据
		 * @param {string} data.order_id - 订单号 
		 **/
		async cancelPur({ orderId }) {
			return await axios.post(host + "/api/v1/cancelPur", { order_id: orderId },{
				headers: {
					"Authorization": "Bearer " + token
				}
			})
		},			

		/**
		 * 7.获取用户指定币种的余额信息
		 * \Laravel\Passport\Http\Controllers\PurchaseOrderController@currencyBalance 
		 * @param {Object} data - 数据
		 * @param {number} data.currency_id - 币种的ID (必传) 
		 **/
		async currencyBalance({ currencyId }) {
			return await axios.get(host + "/api/v1/currencyBalance", {
				params: { currency_id: currencyId },
				headers: {
					"Authorization": "Bearer " + token
				}
			})
		},			

		/**
		 * 5.删除广告
		 * \Laravel\Passport\Http\Controllers\PurchaseOrderController@delOrder 
		 * @param {Object} data - 数据
		 * @param {string} data.order_id - 订单号 
		 **/
		async delOrder({ orderId }) {
			return await axios.post(host + "/api/v1/delOrder", { order_id: orderId },{
				headers: {
					"Authorization": "Bearer " + token
				}
			})
		},			

		/**
		 * 10.广告编辑
		 * \Laravel\Passport\Http\Controllers\PurchaseOrderController@editPurchase 
		 * @param {Object} data - 数据
		 * @param {number} data.pur_id - 广告id (必传) 
		 * @param {number} data.timeLimit - 时间限制 
		 * @param {number} data.numLimit - 交易次数限制 
		 * @param {number} data.isCheck - 是否限制对方为认证用户 
		 * @param {number} data.isMobile - 是否限制对方必须绑定手机 
		 * @param {number} data.minTradeLimit - 最小购买钱数  （最小 100) 
		 * @param {number} data.maxTradeLimit - 最大购买钱数  （最小 100) 
		 * @param {number} data.price - 交易价格 
		 * @param {number} data.is_fixed - 是否采用固定价格 1 固定 0 非固定 
		 * @param {number} data.proportion - 非固定价格时的比例 
		 * @param {string} data.reply_text - 留言内容 
		 * @param {number} data.payPasswd - 资金密码 (必传) 
		 **/
		async editPurchase({ purId,timeLimit,numLimit,isCheck,isMobile,minTradeLimit,maxTradeLimit,price,isFixed,proportion,replyText,payPasswd }) {
			return await axios.post(host + "/api/v1/editPurchase", { pur_id: purId,timeLimit,numLimit,isCheck,isMobile,minTradeLimit,maxTradeLimit,price,is_fixed: isFixed,proportion,reply_text: replyText,payPasswd },{
				headers: {
					"Authorization": "Bearer " + token
				}
			})
		},			

		/**
		 * 10.1.获取指定币种的最新成交价
		 * \Laravel\Passport\Http\Controllers\PurchaseOrderController@getLatestPrice 
		 * @param {Object} data - 数据
		 * @param {number} data.currency_id - 币种ID (必传) 
		 * @param {number} data.french_id - 法币ID (必传) 
		 **/
		async getLatestPrice({ currencyId,frenchId }) {
			return await axios.get(host + "/api/v1/getLatestPrice", {
				params: { currency_id: currencyId,french_id: frenchId },
				headers: {
					"Authorization": "Bearer " + token
				}
			})
		},			

		/**
		 * 9.得到可交易法币列表(人民币)
		 * \Laravel\Passport\Http\Controllers\PurchaseOrderController@getLegaltender 
		 * @param {Object} data - 数据
		 **/
		async getLegaltender() {
			return await axios.get(host + "/api/v1/getLegaltender", {
				params: {},
				headers: {
					"Authorization": "Bearer " + token
				}
			})
		},			

		/**
		 * 2.买卖订单列表
		 * App\Http\Controllers\Api\v1\PurchaseOrderController@goodsList 
		 * @param {Object} data - 数据
		 * @param {number} data.currency_id - 币的id（必填） 
		 * @param {number} data.type - 类型 买 1 卖  0（必填） 
		 **/
		async goodsList({ currencyId,type }) {
			return await axios.get(host + "/api/v1/goodsList", {
				params: { currency_id: currencyId,type },
				headers: {
					"Authorization": "Bearer " + token
				}
			})
		},			

		/**
		 * 6.法币可交易列表
		 * \Laravel\Passport\Http\Controllers\PurchaseOrderController@mainCurrency 
		 * @param {Object} data - 数据
		 **/
		async mainCurrency() {
			return await axios.get(host + "/api/v1/mainCurrency", {
				params: {}})
		},			

		/**
		 * 3.我发布的广告
		 * \Laravel\Passport\Http\Controllers\PurchaseOrderController@myPurOrder 
		 * @param {Object} data - 数据
		 **/
		async myPurOrder() {
			return await axios.get(host + "/api/v1/myPurOrder", {
				params: {},
				headers: {
					"Authorization": "Bearer " + token
				}
			})
		},			

		/**
		 * 8.广告详情
		 * \Laravel\Passport\Http\Controllers\PurchaseOrderController@purDetails 
		 * @param {Object} data - 数据
		 * @param {number} data.pur_id - 广告id (必传) 
		 **/
		async purDetails({ purId }) {
			return await axios.get(host + "/api/v1/purDetails", {
				params: { pur_id: purId },
				headers: {
					"Authorization": "Bearer " + token
				}
			})
		},			

		/**
		 * 1.商家发布广告（买卖）
		 * App\Http\Controllers\Api\v1\PurchaseController@sendBuy 
		 * @param {Object} data - 数据
		 * @param {number} data.currency_id - 币种id 
		 * @param {number} data.country_id - 国家id 
		 * @param {number} data.currency_type - 法定币种id 
		 * @param {number} data.timeLimit - 时间限制 
		 * @param {number} data.numLimit - 交易次数限制 
		 * @param {number} data.isCheck - 是否限制对方为认证用户 
		 * @param {number} data.isMobile - 是否限制对方必须绑定手机 
		 * @param {number} data.price - 价格（必填） 
		 * @param {number} data.balance - 数量（必填） 
		 * @param {number} data.type - 卖买状态（必填） 
		 * @param {number} data.minTradeLimit - 最小购买钱数 
		 * @param {number} data.maxTradeLimit - 最大购买钱数 
		 * @param {number} data.is_fixed - 是否采用固定价格 
		 * @param {number} data.proportion - 非固定价格时的比例 
		 * @param {string} data.reply_text - 留言内容 
		 * @param {number} data.payPasswd - 资金密码 
		 **/
		async sendBuy({ currencyId,countryId,currencyType,timeLimit,numLimit,isCheck,isMobile,price,balance,type,minTradeLimit,maxTradeLimit,isFixed,proportion,replyText,payPasswd }) {
			return await axios.post(host + "/api/v1/sendBuy", { currency_id: currencyId,country_id: countryId,currency_type: currencyType,timeLimit,numLimit,isCheck,isMobile,price,balance,type,minTradeLimit,maxTradeLimit,is_fixed: isFixed,proportion,reply_text: replyText,payPasswd },{
				headers: {
					"Authorization": "Bearer " + token
				}
			})
		},			

		/**
		 * 10.2.获取未完成的订单
		 * \Laravel\Passport\Http\Controllers\PurchaseOrderController@unfinishedOrder 
		 * @param {Object} data - 数据
		 * @param {number} data.page - 页码 (非必传) 
		 **/
		async unfinishedOrder({ page }) {
			return await axios.get(host + "/api/v1/unfinishedOrder", {
				params: { page },
				headers: {
					"Authorization": "Bearer " + token
				}
			})
		},			

       
    }
}
export default api