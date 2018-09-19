
import axios from "axios";

import { httpUrl } from "../../components/http_url/http_url";

let host = httpUrl.host;
const api = function (token) {
    return {
		
		/**
		 * 1.获取FACE_token URL
		 * \Laravel\Passport\Http\Controllers\FaceCheckController@getFaceToken 
		 * @param {Object} data - 数据
		 **/
		async getFaceToken() {
			return await axios.get(host + "/api/v1/getFaceToken", {
				params: {},
				headers: {
					"Authorization": "Bearer " + token
				}
			})
		},			

		/**
		 * 3.验证详情
		 * \Laravel\Passport\Http\Controllers\FaceCheckController@seniorInfo 
		 * @param {Object} data - 数据
		 **/
		async seniorInfo() {
			return await axios.post(host + "/api/v1/face/seniorInfo", {},{
				headers: {
					"Authorization": "Bearer " + token
				}
			})
		},			

		/**
		 * 2.1 上传身份照片的线上路径
		 * \Laravel\Passport\Http\Controllers\FaceCheckController@uploadCardPath 
		 * @param {Object} data - 数据
		 * @param {string} data.idcard_front - 正面 
		 * @param {string} data.idcard_back - 反面 
		 * @param {string} data.idcard_holt - 手持 
		 **/
		async uploadCardPath({ idcardFront,idcardBack,idcardHolt }) {
			return await axios.post(host + "/api/v1/face/uploadCardPath", { idcard_front: idcardFront,idcard_back: idcardBack,idcard_holt: idcardHolt },{
				headers: {
					"Authorization": "Bearer " + token
				}
			})
		},			

		/**
		 * 2.上传身份照片
		 * \Laravel\Passport\Http\Controllers\FaceCheckController@uploadIdcard 
		 * @param {Object} data - 数据
		 * @param {file} data.idcard_front - 正面 
		 * @param {file} data.idcard_back - 反面 
		 * @param {file} data.idcard_holt - 手持 
		 **/
		async uploadIdcard({ idcardFront,idcardBack,idcardHolt }) {
			return await axios.post(host + "/api/v1/face/uploadCard", { idcard_front: idcardFront,idcard_back: idcardBack,idcard_holt: idcardHolt },{
				headers: {
					"Authorization": "Bearer " + token
				}
			})
		},			

       
    }
}
export default api