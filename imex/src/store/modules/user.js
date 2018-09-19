import auth from '../../api/group/auth'
import oauth from '../../api/group/oauth'

// initial state
const state = {
    username: '',
    token: null,
    refreshToken: '',
    curTime: '',
    /*谷歌验证*/
    googleToken: '',
    expiresIn: null,
    findPswdList: {
        "mobile": {
            "title": "",
            "check": false
        },
        "email": {
            "title": "",
            "check": false
        },
        "google": {
            "title": "Google",
            "check": false
        }
    },
    userInfo: null,
    userID: null,
    lang: 'en',
    color: 0,
    orderID: null,//mobile端用
    // matchcoin_id:null,


}

// getters
const getters = {
}

// actions
const actions = {
    async login({ commit, dispatch }, { username, password, client_id, client_secret }) {
        let res = await auth().userLogin({ username, password, clientId: client_id, clientSecret: client_secret });
        ////判断是否需要谷歌验证
        if (res.data.google_check) {
            commit('setGoogleToken', res.data.token)
        } else if (res.data.access_token) {
            ///用户输入正确     储存token值
            //1.存当前时间
            let curTime = new Date().getTime(); //获取当前时间的
            let data = {
                "username": username, //获取用户信息
                "token": res.data.access_token, //获取用户信息用的token
                "refreshToken": res.data.refresh_token, ///获取刷新token的token
                "expiresIn": res.data.expires_in,
                "curTime": curTime, ///存一个时间用于判断
            };
            commit('setData', data);
            await dispatch('info');
        }
        return res;

    },
    async oauth({ commit, state, dispatch }, { token, source }) {
        let res = await oauth().oauth({ t: token, s: source });
        if (res.data.status.code == 200) {
            ///用户输入正确     储存token值
            let curTime = new Date().getTime(); //获取当前时间的
            let data = {
                "username": '', //获取用户信息
                "token": res.data.data.access_token, //获取用户信息用的token
                "refreshToken": res.data.data.refresh_token, ///获取刷新token的token
                "curTime": curTime, ///存一个时间用于判断
                "expiresIn": res.data.data.expires_in
            };
            commit('setData', data);
            if (data.token) {
                await dispatch('info');
            }
        }
        return res;
    },
    async loginGoogleCode({ commit, state, dispatch }, { token, code }) {
        let res = await auth().loginGoogleCode({ token, code });
        if (res.data.expires_in) {
            ///用户输入正确     储存token值
            let curTime = new Date().getTime(); //获取当前时间的
            let data = {
                "username": state.username, //获取用户信息
                "token": res.data.access_token, //获取用户信息用的token
                "refreshToken": res.data.refresh_token, ///获取刷新token的token
                "expiresIn": res.data.expires_in,
                "curTime": curTime, ///存一个时间用于判断
            };
            commit('setData', data);
            commit('setGoogleToken', '')
            await dispatch('info');
        }
        return res;
    },
    async backpassword({ commit, state }, { username = null }) {
        let res = await auth(state.token).backpassword({ username: username || state.username });
        if (res.data.status.code == 200) {
            commit('setBackPassword', res.data.data);
        }
        return res;
    },
    async info({ commit, state }) {
        let res = await auth(state.token).userinfo();
        if (res.data.status.code == 200) {
            // _this.userInfo = res.data.data.name;
            // window.localStorage.setItem("userID", res.data.data.user_id);
            commit('setUserInfo', { userInfo: res.data.data, userId: res.data.data.user_id });
        }
        return res;
    },


}

// mutations
const mutations = {
    setGoogleToken(state, token) {
        state.googleToken = token;
    },
    setData(state, obj = { username, token, refreshToken, curTime }) {
        Object.assign(state, obj);
        // state.username = username;
        // state.token = token;
        // state.refreshToken = refreshToken;
        // state.curTime = curTime;
    },
    setExpiresIn(state, code) {
        state.httpCode = code;
    },
    setBackPassword(state, list) {
        state.findPswdList = list
    },
    setUserInfo(state, { userInfo, userId }) {
        Object.assign(state, { userInfo, userID: userId });
    },
    setLang(state, lang) {
        state.lang = lang;
    },
    setColor(state, color) {
        state.color = color;
    },
    logout(state) {
        state.username = '';
        state.token = null;
        state.refreshToken = '';
        state.curTime = '';
        state.userInfo = null;
        state.userID = '';
        state.googleToken = '';
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
