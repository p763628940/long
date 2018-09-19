
import axios from "axios";

import { httpUrl } from "../../components/http_url/http_url";

let host = httpUrl.host;
const api = function (token) {
    return {
		
		/**
		 * 7.Maker-买方确认打款
		 * \Laravel\Passport\Http\Controllers\BlaceOrderController@buyersConfirm 
		 * @param {Object} data - 数据
		 * @param {number} data.blace_id - 订单订单id(必传) 
		 * @param {number} data.pur_id - 广告id (必传) 
		 **/
		async buyersConfirm({ blaceId,purId }) {
			return await axios.post(host + "/api/v1/buyersConfirm", { blace_id: blaceId,pur_id: purId },{
				headers: {
					"Authorization": "Bearer " + token
				}
			})
		},			

		/**
		 * 3.取消订单(买卖)
		 * \Laravel\Passport\Http\Controllers\BlaceOrderController@cancelOrder 
		 * @param {Object} data - 数据
		 * @param {number} data.blace_id - 订单id(必传) 
		 **/
		async cancelOrder({ blaceId }) {
			return await axios.post(host + "/api/v1/cancelOrder", { blace_id: blaceId },{
				headers: {
					"Authorization": "Bearer " + token
				}
			})
		},			

		/**
		 * 5.Maker-卖方-确认收款放行
		 * \Laravel\Passport\Http\Controllers\BlaceOrderController@confirmBusiness 
		 * @param {Object} data - 数据
		 * @param {number} data.blace_id - 订单订单id(必传) 
		 * @param {number} data.pur_id - 广告id (必传) 
		 * @param {number} data.payPasswd - 支付密码 (必传) 
		 **/
		async confirmBusiness({ blaceId,purId,payPasswd }) {
			return await axios.post(host + "/api/v1/confirmBusiness", { blace_id: blaceId,pur_id: purId,payPasswd },{
				headers: {
					"Authorization": "Bearer " + token
				}
			})
		},			

		/**
		 * 4.Taker-买方-确认支付
		 * \Laravel\Passport\Http\Controllers\BlaceOrderController@confirmPurchase 
		 * @param {Object} data - 数据
		 * @param {number} data.blace_id - 订单id(必传) 
		 **/
		async confirmPurchase({ blaceId }) {
			return await axios.post(host + "/api/v1/confirmPurchase", { blace_id: blaceId },{
				headers: {
					"Authorization": "Bearer " + token
				}
			})
		},			

		/**
		 * 1.我的订单
		 * \Laravel\Passport\Http\Controllers\BlaceOrderController@myBlaceOrder 
		 * @param {Object} data - 数据
		 * @param {numeric} data.status - 状态 
		 * @param {numeric} data.orderId - 订单号 
		 * @param {numeric} data.page - 页码  (默认1) 
		 **/
		async myPurOrder({ status,orderId,page }) {
			return await axios.get(host + "/api/v1/myBlaceOrder", {
				params: { status,orderId,page },
				headers: {
					"Authorization": "Bearer " + token
				}
			})
		},			

		/**
		 * 9.获得订单详情交易界面
		 * \Laravel\Passport\Http\Controllers\BlaceOrderController@orderDetails 
		 * @param {Object} data - 数据
		 * @param {number} data.blaceId - 订单订单id(必传) 
		 **/
		async orderDetails({ blaceId }) {
			return await axios.get(host + "/api/v1/orderDetails", {
				params: { blaceId },
				headers: {
					"Authorization": "Bearer " + token
				}
			})
		},			

		/**
		 * 6.游客卖方下单卖出
		 * \Laravel\Passport\Http\Controllers\BlaceOrderController@sellOut 
		 * @param {Object} data - 数据
		 * @param {number} data.balance - 卖出数量(必传) 
		 * @param {number} data.pur_id - 广告id (必传) 
		 * @param {number} data.money - 金额 (必传) 
		 * @param {number} data.payPasswd - 资金密码 (必传) 
		 **/
		async sellOut({ balance,purId,money,payPasswd }) {
			return await axios.post(host + "/api/v1/sellOut", { balance,pur_id: purId,money,payPasswd },{
				headers: {
					"Authorization": "Bearer " + token
				}
			})
		},			

		/**
		 * 2.Taker买家下单购买
		 * \Laravel\Passport\Http\Controllers\BlaceOrderController@ticket 
		 * @param {Object} data - 数据
		 * @param {number} data.pur_id - 广告id (必传) 
		 * @param {number} data.balance - 数量 （必传） 
		 * @param {number} data.money - 钱 （必传） 
		 **/
		async ticket({ purId,balance,money }) {
			return await axios.post(host + "/api/v1/ticket", { pur_id: purId,balance,money },{
				headers: {
					"Authorization": "Bearer " + token
				}
			})
		},			

		/**
		 * 8.Taker-卖家确认收款放行订单
		 * \Laravel\Passport\Http\Controllers\BlaceOrderController@touristSellersConfirm 
		 * @param {Object} data - 数据
		 * @param {number} data.blace_id - 订单订单id(必传) 
		 * @param {number} data.payPasswd - 支付密码(必传) 
		 **/
		async touristSellersConfirm({ blaceId,payPasswd }) {
			return await axios.post(host + "/api/v1/touristSellersConfirm", { blace_id: blaceId,payPasswd },{
				headers: {
					"Authorization": "Bearer " + token
				}
			})
		},			

       
    }
}
export default api