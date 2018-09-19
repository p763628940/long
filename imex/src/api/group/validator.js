
import axios from "axios";

import { httpUrl } from "../../components/http_url/http_url";

let host = httpUrl.host;
const api = function (token) {
    return {
		
		/**
		 * 3.绑定Google密钥
		 * App\Http\Controllers\Api\v1\ValidatorMessageController@bindGoogleSecret 
		 * @param {Object} data - 数据
		 * @param {string} data.secret - Google密钥 
		 * @param {number} data.code - Google验证器中的验证码 
		 **/
		async bindGoogleSecret({ secret,code }) {
			return await axios.post(host + "/api/v1/bindGoogleSecret", { secret,code },{
				headers: {
					"Authorization": "Bearer " + token
				}
			})
		},			

		/**
		 * 2.生成Google密钥
		 * App\Http\Controllers\Api\v1\ValidatorMessageController@createSecret 
		 * @param {Object} data - 数据
		 **/
		async createSecret() {
			return await axios.post(host + "/api/v1/createSecret", {},{
				headers: {
					"Authorization": "Bearer " + token
				}
			})
		},			

		/**
		 * 7. 发送开启钱包的验证码(60s限制 )
		 * App\Http\Controllers\Api\v1\ValidatorMessageController@openWallet 
		 * @param {Object} data - 数据
		 * @param {number} data.mobile - 手机号（非必填） 
		 * @param {string} data.email - 邮箱（非必填） 
		 * @param {number} data.type - 验证类型（1,手机 0,邮箱） 
		 * @param {number} data.country_id - 国家ID(type:1时必填) 
		 * @param {string} data.lang - 语言 
		 **/
		async sendOpenWallet({ mobile,email,type,countryId,lang }) {
			return await axios.post(host + "/api/v1/sendOpenWallet", { mobile,email,type,country_id: countryId,lang },{
				headers: {
					"Authorization": "Bearer " + token
				}
			})
		},			

		/**
		 * 5.发送找回密码验证信息(60s限制)
		 * App\Http\Controllers\Api\v1\ValidatorMessageController@send_back_password_message 
		 * @param {Object} data - 数据
		 * @param {string} data.username - 用户名 
		 * @param {string} data.receiver_type - 接收器类型(mobile|email) 
		 **/
		async sendBackPasswordMessage({ username,receiverType }) {
			return await axios.post(host + "/api/v1/send_back_password_message", { username,receiver_type: receiverType })
		},			

		/**
		 * 6.发送各种验证码 登录状态下(60s限制)
		 * App\Http\Controllers\Api\v1\ValidatorMessageController@send_setting_pay_message 
		 * @param {Object} data - 数据
		 * @param {string} data.type - 类型 3:找回密码, 4:设置支付密码, 5:添加提款地址 （必传）, 6.Api添加编辑,7.提币,8.开启钱包 
		 * @param {string} data.receiver_type - 接收器类型   1:邮箱  0:手机号（必传） 
		 **/
		async sendSettingPayMessage({ type,receiverType }) {
			return await axios.post(host + "/api/v1/send_setting_pay_message", { type,receiver_type: receiverType },{
				headers: {
					"Authorization": "Bearer " + token
				}
			})
		},			

		/**
		 * 1.发送验证信息(60s限制)
		 * App\Http\Controllers\Api\v1\ValidatorMessageController@sendValidatorMessage 
		 * @param {Object} data - 数据
		 * @param {number} data.type - 验证类型(0:注册,1:邮箱,2:手机 ) 
		 * @param {string} data.receiver_type - 接收器类型(mobile|email) 
		 * @param {string} data.mobile - 手机号(type:mobile时必填) 
		 * @param {number} data.country_id - 国家ID(type:mobile时必填) 
		 * @param {string} data.email - 邮箱(type:email时必填;4-255位) 
		 **/
		async sendValidatorMessage({ type,receiverType,mobile,countryId,email }) {
			return await axios.post(host + "/api/v1/send_validator_message", { type,receiver_type: receiverType,mobile,country_id: countryId,email })
		},			

		/**
		 * 4.验证code
		 * App\Http\Controllers\Api\v1\ValidatorMessageController@verifyGoogleCode 
		 * @param {Object} data - 数据
		 * @param {number} data.code - Google验证器中的验证码 
		 **/
		async verifyGoogleCode({ code }) {
			return await axios.post(host + "/api/v1/verifyGoogleCode", { code },{
				headers: {
					"Authorization": "Bearer " + token
				}
			})
		},			

       
    }
}
export default api