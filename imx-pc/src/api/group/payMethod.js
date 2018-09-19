
import axios from "axios";

import { httpUrl } from "../../components/http_url/http_url";

let host = httpUrl.host;
const api = function (token) {
    return {
		
		/**
		 * 2.添加银行卡
		 * App\Http\Controllers\Api\v1\ReceipCodeController@addCard 
		 * @param {Object} data - 数据
		 * @param {number} data.bankId - 开户行id （必填） 
		 * @param {string} data.bankAddress - 开户支行 （必填） 
		 * @param {number} data.bankNumber - 银行卡号 （必填） 
		 * @param {number} data.bankNumber_confirmation - 重复银行卡号 （必填） 
		 * @param {number} data.payPasswd - 支付密码（必填8-20） 
		 **/
		async addCard({ bankId,bankAddress,bankNumber,bankNumberConfirmation,payPasswd }) {
			return await axios.post(host + "/api/v1/addCard", { bankId,bankAddress,bankNumber,bankNumber_confirmation: bankNumberConfirmation,payPasswd },{
				headers: {
					"Authorization": "Bearer " + token
				}
			})
		},			

		/**
		 * 1.添加、修改 微信/支付宝
		 * App\Http\Controllers\Api\v1\ReceipCodeController@addReceip 
		 * @param {Object} data - 数据
		 * @param {string} data.bankNumber - 收款账号或昵称 不超出30字（必填） 
		 * @param {number} data.type - 类型  微信1 支付宝 2 （必填） 
		 * @param {file} data.picture - 上传的图片（必填） 
		 * @param {number} data.payPasswd - 支付密码（必填） 
		 **/
		async addReceip({ bankNumber,type,picture,payPasswd }) {
			return await axios.post(host + "/api/v1/addReceip", { bankNumber,type,picture,payPasswd },{
				headers: {
					"Authorization": "Bearer " + token
				}
			})
		},			

		/**
		 * 3.银行列表
		 * App\Http\Controllers\Api\v1\ReceipCodeController@bankList 
		 * @param {Object} data - 数据
		 **/
		async bankList() {
			return await axios.get(host + "/api/v1/bankList", {
				params: {},
				headers: {
					"Authorization": "Bearer " + token
				}
			})
		},			

		/**
		 * 5.获取交易方式列表
		 * App\Http\Controllers\Api\v1\ReceipCodeController@getReceipList 
		 * @param {Object} data - 数据
		 **/
		async getReceipList() {
			return await axios.get(host + "/api/v1/getReceipList", {
				params: {},
				headers: {
					"Authorization": "Bearer " + token
				}
			})
		},			

		/**
		 * 4.指定支付方式关闭 打开
		 * App\Http\Controllers\Api\v1\ReceipCodeController@paymentSwitch 
		 * @param {Object} data - 数据
		 * @param {number} data.paymentId - 支付方式ID (必填）\ 
		 **/
		async paymentSwitch({ paymentId }) {
			return await axios.post(host + "/api/v1/paymentSwitch", { paymentId },{
				headers: {
					"Authorization": "Bearer " + token
				}
			})
		},			

       
    }
}
export default api