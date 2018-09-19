import axios from "axios";

import { httpUrl } from "../components/http_url/http_url";

let host = httpUrl.host;

const api = function (token) {
    return {
        async login(username, password, client_id, client_secret) {
            return await axios.post(httpUrl.login, { username, password, client_id, client_secret });
        },
        async loginGoogleCode(token, code) {
            return await axios.post(httpUrl.loginGoogleCode, { token, code })
        },
        async oauth(token, source) {
            return await axios.post(httpUrl.oauth, { t: token, s: source })

        },
        async backpassword(username) {
            return await axios.post(httpUrl.backpassword, {
                username
            }, {
                    headers: {
                        "Authorization": "Bearer " + this.token
                    }
                })
        },
        async info() {
            return axios.get(httpUrl.userInfo, {
                headers: {
                    "Authorization": "Bearer " + token
                }
            });

        }
    }
}

export default api
