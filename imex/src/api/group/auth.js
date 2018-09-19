
import axios from "axios";

import { httpUrl } from "../../components/http_url/http_url";

let host = httpUrl.host;
const api = function (token) {
    return {
		
		/**
		 * 9.2.找回密码验证
		 * /api/v1/backPassValidator 
		 * @param {Object} data - 数据
		 * @param {string} data.username - 邮箱或手机(必填) 
		 * @param {string} data.mobile_code - 手机验证码 
		 * @param {string} data.email_code - 邮箱验证码 
		 * @param {string} data.google_code - Google验证码 
		 **/
		async backPassValidator({ username,mobileCode,emailCode,googleCode }) {
			return await axios.post(host + "/api/v1/backPassValidator", { username,mobile_code: mobileCode,email_code: emailCode,google_code: googleCode })
		},			

		/**
		 * 9.1.找回密码
		 * /api/v1/backpassword 
		 * @param {Object} data - 数据
		 * @param {string} data.username - 邮箱或手机(必填) 
		 **/
		async backpassword({ username }) {
			return await axios.post(host + "/api/v1/backpassword", { username })
		},			

		/**
		 * 5.绑定(邮箱,手机)
		 * App\Http\Controllers\Api\v1\AuthController@bind 
		 * @param {Object} data - 数据
		 * @param {string} data.type - 绑定类型(mobile|email,必填) 
		 * @param {string} data.mobile - 手机号(type:mobile时必填) 
		 * @param {number} data.country_id - 国家ID(type:mobile时必填) 
		 * @param {string} data.email - 邮箱(type:email时必填;4-255位) 
		 * @param {string} data.code - 验证码(必填,4-255位) 
		 **/
		async bind({ type,mobile,countryId,email,code }) {
			return await axios.post(host + "/api/v1/bind", { type,mobile,country_id: countryId,email,code },{
				headers: {
					"Authorization": "Bearer " + token
				}
			})
		},			

		/**
		 * 9.登录状态验证code
		 * App\Http\Controllers\Api\v1\ValidatorMessageController@loginGoogleCode 
		 * @param {Object} data - 数据
		 * @param {string} data.token - 登录返回的token 
		 * @param {number} data.code - Google验证器中的验证码 
		 **/
		async loginGoogleCode({ token,code }) {
			return await axios.post(host + "/api/v1/loginGoogleCode", { token,code })
		},			

		/**
		 * 9.4.登录历史
		 * /api/v1/login_log 
		 * @param {Object} data - 数据
		 * @param {number} data.page - 当前页(可为空:默认第一页) 
		 **/
		async loginLog({ page }) {
			return await axios.get(host + "/api/v1/login_log", {
				params: { page },
				headers: {
					"Authorization": "Bearer " + token
				}
			})
		},			

		/**
		 * 9.8 其它注册
		 * App\Http\Controllers\Api\v1\AuthController@otherRegister 
		 * @param {Object} data - 数据
		 * @param {string} data.mobile - 手机号 
		 * @param {number} data.mobile_prefix - 国家手机号前缀 
		 **/
		async otherRegister({ mobile,mobilePrefix }) {
			return await axios.post(host + "/api/v1/otherRegister", { mobile,mobile_prefix: mobilePrefix })
		},			

		/**
		 * 8.刷新token
		 * oauth/token 
		 * @param {Object} data - 数据
		 * @param {string} data.client_id - client_id(2) 
		 * @param {string} data.client_secret - client_secret(0Xq3xPo255u69f01v1jWpzC7s15hr3AzjvLkCTZD) 
		 * @param {string} data.refresh_token - refresh_token 
		 * @param {string} data.grant_type - refresh_token 
		 **/
		async refreshToken({ clientId,clientSecret,refreshToken,grantType }) {
			return await axios.post(host + "/oauth/token", { client_id: clientId,client_secret: clientSecret,refresh_token: refreshToken,grant_type: grantType })
		},			

		/**
		 * 1 注册
		 * App\Http\Controllers\Api\v1\AuthController@register 
		 * @param {Object} data - 数据
		 * @param {string} data.type - 注册类型(mobile|email,必填) 
		 * @param {string} data.mobile - 手机号(type:mobile时必填) 
		 * @param {number} data.country_id - 国家ID(必填) 
		 * @param {string} data.email - 邮箱(type:email时必填;4-255位) 
		 * @param {string} data.code - 验证码(必填,4-255位) 
		 * @param {string} data.password - 密码(最小6位,必填) 
		 * @param {string} data.password_confirmation - 重复密码(必填) 
		 * @param {string} data.invite_code - 邀请码 （选填） 
		 * @param {string} data.source - 来源 （选填） 
		 **/
		async register({ type,mobile,countryId,email,code,password,passwordConfirmation,inviteCode,source }) {
			return await axios.post(host + "/api/v1/register", { type,mobile,country_id: countryId,email,code,password,password_confirmation: passwordConfirmation,invite_code: inviteCode,source })
		},			

		/**
		 * 9.3.重置密码
		 * /api/v1/resetPassword 
		 * @param {Object} data - 数据
		 * @param {string} data.username - 邮箱或手机(必填) 
		 * @param {string} data.mobile_code - 手机验证码 
		 * @param {string} data.email_code - 邮箱验证码 
		 * @param {string} data.google_code - Google验证码 
		 * @param {string} data.password - 密码(最小6位,必填) 
		 * @param {string} data.password_confirmation - 重复密码(必填) 
		 **/
		async resetPassword({ username,mobileCode,emailCode,googleCode,password,passwordConfirmation }) {
			return await axios.post(host + "/api/v1/resetPassword", { username,mobile_code: mobileCode,email_code: emailCode,google_code: googleCode,password,password_confirmation: passwordConfirmation })
		},			

		/**
		 * 9.6.填写身份信息
		 * /api/v1/setIdcard 
		 * @param {Object} data - 数据
		 * @param {string} data.idCard - 身份证 (必填) 
		 * @param {string} data.trueName - 真实姓名 (必填) 
		 * @param {string} data.country_id - 国家ID (必填) 
		 **/
		async setIdcard({ idCard,trueName,countryId }) {
			return await axios.post(host + "/api/v1/setIdcard", { idCard,trueName,country_id: countryId },{
				headers: {
					"Authorization": "Bearer " + token
				}
			})
		},			

		/**
		 * 9.5.设置或修改支付密码
		 * /api/v1/settingPaypass 
		 * @param {Object} data - 数据
		 * @param {string} data.code - 验证码 (必填) 
		 * @param {string} data.pay_password - 密码(最小8位,必填) 
		 * @param {string} data.pay_password_confirmation - 重复密码(必填) 
		 **/
		async settingPaypass({ code,payPassword,payPasswordConfirmation }) {
			return await axios.post(host + "/api/v1/settingPaypass", { code,pay_password: payPassword,pay_password_confirmation: payPasswordConfirmation },{
				headers: {
					"Authorization": "Bearer " + token
				}
			})
		},			

		/**
		 * 9.7 pts 开关
		 * App\Http\Controllers\Api\v1\AuthController@ptsSwitch 
		 * @param {Object} data - 数据
		 **/
		async switchnd() {
			return await axios.get(host + "/api/v1/pts/switch", {
				params: {},
				headers: {
					"Authorization": "Bearer " + token
				}
			})
		},			

		/**
		 * 4.修改密码
		 * \Laravel\Passport\Http\Controllers\AccessTokenController@password 
		 * @param {Object} data - 数据
		 * @param {string} data.old_password - 原密码 
		 * @param {string} data.password - 密码(最小6位,必填) 
		 * @param {string} data.password_confirmation - 重复密码(必填) 
		 **/
		async updatePassword({ oldPassword,password,passwordConfirmation }) {
			return await axios.post(host + "/api/v1/password", { old_password: oldPassword,password,password_confirmation: passwordConfirmation },{
				headers: {
					"Authorization": "Bearer " + token
				}
			})
		},			

		/**
		 * 2.用户登录
		 * \Laravel\Passport\Http\Controllers\Api\v1\AuthController@issueToken 
		 * @param {Object} data - 数据
		 * @param {string} data.client_id - client_id(2) 
		 * @param {string} data.client_secret - client_secret(0Xq3xPo255u69f01v1jWpzC7s15hr3AzjvLkCTZD) 
		 * @param {string} data.username - 用户名 
		 * @param {string} data.password - 密码 
		 **/
		async userLogin({ clientId,clientSecret,username,password }) {
			return await axios.post(host + "/api/v1/token", { client_id: clientId,client_secret: clientSecret,username,password })
		},			

		/**
		 * 3.获取登录的用户信息
		 * App\Http\Controllers\Api\v1\AuthController@userinfo 
		 * @param {Object} data - 数据
		 **/
		async userinfo() {
			return await axios.get(host + "/api/v1/userinfo", {
				params: {},
				headers: {
					"Authorization": "Bearer " + token
				}
			})
		},			

       
    }
}
export default api