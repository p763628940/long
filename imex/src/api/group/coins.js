
import axios from "axios";

import { httpUrl } from "../../components/http_url/http_url";

let host = httpUrl.host;
const api = function (token) {
    return {
		
		/**
		 * 6.币详细介绍
		 * App\Http\Controllers\Api\v1\CoinMatchingController@coinDetailed 
		 * @param {Object} data - 数据
		 * @param {number} data.currency_id - 币ID 
		 **/
		async coinDetailed({ currencyId }) {
			return await axios.get(host + "/api/v1/coinDetailed", {
				params: { currency_id: currencyId }})
		},			

		/**
		 * 1.获取所有币对
		 * App\Http\Controllers\Api/v1/CoinMatchingController@coin_matching 
		 * @param {Object} data - 数据
		 **/
		async coinMatching() {
			return await axios.get(host + "/api/v1/coin_matching", {
				params: {}})
		},			

		/**
		 * 4.币信息
		 * App\Http\Controllers\Api\v1\CoinMatchingController@currency 
		 * @param {Object} data - 数据
		 * @param {number} data.currency_id - 币ID 
		 **/
		async currency({ currencyId }) {
			return await axios.get(host + "/api/v1/currency", {
				params: { currency_id: currencyId }})
		},			

		/**
		 * 3.获取子域名的banner
		 * App\Http\Controllers\Api\v1\CoinMatchingController@getHeaderLogoUrl 
		 * @param {Object} data - 数据
		 * @param {string} data.prefix - 前缀 
		 **/
		async currencyHeaderLogo({ prefix }) {
			return await axios.get(host + "/api/v1/currencyHeaderLogo", {
				params: { prefix }})
		},			

		/**
		 * 2.收藏|取消,币对
		 * App\Http\Controllers\Api\v1\CoinMatchingController@follow_matchcoin 
		 * @param {Object} data - 数据
		 * @param {number} data.matchcoin_id - 币对ID 
		 **/
		async follow({ matchcoinId }) {
			return await axios.post(host + "/api/v1/follow_matchcoin", { matchcoin_id: matchcoinId },{
				headers: {
					"Authorization": "Bearer " + token
				}
			})
		},			

		/**
		 * 7.获取币对K线
		 * App\Http\Controllers\Api\v1\CoinMatchingController@kline 
		 * @param {Object} data - 数据
		 * @param {number} data.matchcoin_id - 币对ID 
		 * @param {number} data.time_type - k线时间类型 
		 **/
		async kline({ matchcoinId,timeType }) {
			return await axios.get(host + "/api/v1/kline", {
				params: { matchcoin_id: matchcoinId,time_type: timeType }})
		},			

		/**
		 * 3.我的收藏
		 * App\Http\Controllers\Api\v1\CoinMatchingController@myfollow 
		 * @param {Object} data - 数据
		 **/
		async myfollow() {
			return await axios.get(host + "/api/v1/my_follow", {
				params: {},
				headers: {
					"Authorization": "Bearer " + token
				}
			})
		},			

		/**
		 * 5.币对费率
		 * App\Http\Controllers\Api\v1\CoinMatchingController@transactionRate 
		 * @param {Object} data - 数据
		 **/
		async transactionRate() {
			return await axios.get(host + "/api/v1/transactionRate", {
				params: {}})
		},			

       
    }
}
export default api