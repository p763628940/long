import Vue from "Vue"
import Vuex from "vuex"
import axios from "axios"
import { httpUrl } from "./components/http_url/http_url"
Vue.use(Vuex)
let token = window.localStorage.getItem("token");
var CurrencyBalance = 0; //获取BTC余额
var RMBBalance = 0; //获取人民币余额
let state={}
if(token != undefined || token != null) {
	axios.get(httpUrl.finances, { 
		headers: {			
			"Authorization": "Bearer " + Vue.prototype.token
		}
	}).then(function(res) {
		let arr = res.data.data;
		for(let i = 0; i < arr.length; i++) {
			CurrencyBalance += parseFloat(arr[i].btc_blance);
			RMBBalance += parseFloat(arr[i].cny_blance);
		}
		state = {
			CurBalance:CurrencyBalance,              ///BTC剩余值
			RBalance:RMBBalance						 ///人名币剩余值
		}
	}, function(err) {
		console.log(err)
	})	
} 

