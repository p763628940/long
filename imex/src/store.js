
///登录成功收藏按钮
const SET_ICON = "SET_ICON";
////用于保存收藏类型
const STORAGE_KEY = 'todos-vuejs';   
///用于保存code值
const SETCODE = "SETCODE";	
export default {
	fetch: function() {
		return window.JSON.parse(window.localStorage.getItem(STORAGE_KEY) || '[]')
	},
	save: function(items) {
		window.localStorage.setItem(STORAGE_KEY, window.JSON.stringify(items))
	},
	set: function(items){
		window.localStorage.setItem(SET_ICON,window.JSON.stringify(items))  
	},
	get: function(items){
		return window.JSON.parse(window.localStorage.getItem(SET_ICON) || '[]')
	},
	setcode: function(items){
		window.localStorage.setItem(SETCODE,window.JSON.stringify(items))
	},
	getcode: function(items){
		return window.JSON.parse(window.localStorage.getItem(SETCODE) || '{}')
	},
	setToken: function(items){ ////存token
		window.localStorage.setItem(SETCODE,window.JSON.stringify(items))
	},
	getToken: function(items){
		return window.JSON.parse(window.localStorage.getItem(SETCODE))
	}
}






