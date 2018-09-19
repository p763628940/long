import axios from "axios";

import { httpUrl } from "../components/http_url/http_url";

let host = httpUrl.host;

const api = function (token){
    return {
        async index(page=1){
            return await axios.get(httpUrl.listApi, {
				headers: {
					"Authorization": "Bearer " + token
                },
                params:{
                    page
                }
			})
        },
        async show(eid){
            return await axios.get(httpUrl.listApi, {
				headers: {
					"Authorization": "Bearer " + token
                },
                params:{
                    eid
                }
			})
        },
        async create(data){
            return await axios.post(httpUrl.createApi, data,{                headers: {
                "Authorization": "Bearer " + token
            }})

        },
        async update(data){
            return await axios.patch(httpUrl.editApi,data, {
				headers: {
					"Authorization": "Bearer " + token
                },

			})
        },
        async delete(eid){
            return await axios.post(httpUrl.delApi, {
                _method:'DELETE',
                eid
            }, {
                headers: {
                    "Authorization": "Bearer " + token
                }
            })
        }
    }
}

export default api
