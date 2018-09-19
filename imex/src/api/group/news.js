
import axios from "axios";

import { httpUrl } from "../../components/http_url/http_url";

let host = httpUrl.host;
const api = function () {
    return {
		
		/**
		 * 3.公告详情
		 * App\Http\Controllers\Api\v1\NewsController@newsDetils 
		 * @param {Object} data - 数据
		 * @param {number} data.newsId - 公告ID(必传) 
		 * @param {string} data.lang - 语言(默认zh) 
		 **/
		async newsDetils({ newsId,lang }) {
			return await axios.get(host + "/api/v1/newsDetils", {
				params: { newsId,lang }})
		},			

		/**
		 * 1.全部公告列表
		 * App\Http\Controllers\Api\v1\NewsController@newslist 
		 * @param {Object} data - 数据
		 * @param {string} data.lang - 语言(默认zh) 
		 **/
		async newslist({ lang }) {
			return await axios.get(host + "/api/v1/newslist", {
				params: { lang }})
		},			

		/**
		 * 2.重要公告列表
		 * App\Http\Controllers\Api\v1\NewsController@newsImportant 
		 * @param {Object} data - 数据
		 * @param {string} data.lang - 语言(默认zh) 
		 **/
		async piclistList({ lang }) {
			return await axios.get(host + "/api/v1/newsImportant", {
				params: { lang }})
		},			

       
    }
}
export default api