<template>
	<div id="bzzl">
		<!--币种资料内容部分-->
		<div class="currency-wrapper">
			<!--左侧币种-->
			<div class="currency-container-left">
				<ul :class="{'border':getColor==1}">
					<li v-for="(item,key) in currencyList" :class="{'white-active-bg1':getColor==1,'currency-active': getColor!=1&&getCurrencyID==item.id,'active_bg_color':getColor==1&&getCurrencyID==item.id}" @click="tabCurrency(item.id,key)">{{item.pageIdentifier}}({{item.zhName}})</li>
				</ul>
			</div>
			<!--右侧币种-->
			<div class="currency-container-right" :class="{'white-text':getColor==1}">
				<!--币种头部-->
				<div class="currency-title">
					<p class="text" :class="{'white-active-bg':getColor==1}">{{item.pageIdentifier}}({{item.zhName}})</p>
				</div>
				<!--币种信息-->
				<div class="currency_information" v-html="currencyListHtml" :class="{'font_color':getColor==1}"></div>
			</div>
		</div>

	</div>
</template>

<script>
	import axios from "axios";
	import { httpUrl } from "../http_url/http_url";
	import $ from "jquery"
	export default {
		data() {
			return {
				// getColor: window.localStorage.getItem("setColor"),
				currencyList: [],
				/*币种列表*/
				currencyListHtml: "",
				/*html片段*/
				getCurrencyID: this.$route.params.id, /*获取主币ID*/
				item:{},  /*当前币种的资料*/
			}
		},
		methods: {
			tabCurrency(id, index) {
				 var _this = this;
				 if(_this.getColor==1){
				 	$(".currency-container-left li").eq(index).addClass("active_bg_color").siblings("li").removeClass("active_bg_color");
				 }else{
				 	$(".currency-container-left li").eq(index).addClass("currency-active").siblings("li").removeClass("currency-active");
				 }
				/*获取币详细介绍*/
				axios.get(httpUrl.coinDetailed, {
					params: {
						"currency_id": id
					}
				}).then(function(res) {
					_this.currencyListHtml = res.data.data.content;
				}, function(err) {
					console.log(err)
				})
				_this.currencyList.forEach(function(item){
					if(item.id == id){
						_this.item = item;
					}
				})
			}
		},
		updated(){
			$(".currency_information p strong").css({"font-size":"16px"});
			$(".currency_information p").css({"box-sizing":"border-box","padding":"0 10px","line-height":"20px"});
			$(".currency_information p a").css({"color":"#6666fa"})

		},
		mounted() {
			let _this = this;
			let currencyId = _this.$route.params.id;
			/*获取币种*/
			axios.get(httpUrl.currencyList, {
				headers: {
					"Authorization": "Bearer " + _this.token
				}
			}).then(function(res) {
				_this.currencyList = res.data.data;
				_this.currencyList.forEach(function(item){
					if(item.id == _this.getCurrencyID){
						_this.item = item;
					}
				})
			}, function(err) {
				console.log(err)
			})

			/*获取币详细介绍*/
			axios.get(httpUrl.coinDetailed, {
				params: {
					"currency_id": _this.getCurrencyID
				}
			}).then(function(res) {
				_this.currencyListHtml = res.data.data.content;
			}, function(err) {
				console.log(err)
			})

		}
	}
</script>

<style scoped lang="scss">
	/*白色版本样式*/

	.border {
		background: #fff !important;
		border: 1px solid #e5e5e5 !important;
		li {
			border-bottom: 1px solid #ddd !important;
			color: #000 !important;
		}
		li:hover {
			background-color: #E5E5E5 !important;
		}
		li:nth-last-child(1) {
			border-bottom: none !important;
		}
	}
	.font_color{
		color: #000 !important;
		background-color: #fff !important;
		border: 1px solid #ddd !important;
	}
	.white-active-bg1{
		background: #fff !important;
	}
	.white-active-bg {
		color: #fff !important;
		background: #312e67 !important;
	}
	.white-text {
		.currency-title {
			border-bottom: 1px solid #ddd !important;
		}
		.currency-information {
			color: #000 !important;
			border: 1px solid #ddd !important;
		}
	}
	/*选中颜色部分*/
	.active_bg_color{
		background: #ddd !important;
	}
	/*边框内容*/
	.border_nei {
		width: 100%;
		height: 100%;
		box-sizing: border-box;
		border: 3px solid #0b0b15;
	}

	/*选中内容*/

	.currency-active {
		background: #363765;
	}
	/*币种资料*/

	.currency-wrapper {
		width: 1150px;
		height: 100%;
		/*border: 1px solid red;*/
		margin: 17px auto;
		/*左侧选择币种类型*/
		.currency-container-left {
			width: 180px;
			float: left;
			ul {
				width: 100%;
				border-radius: 4px;
				background: #16182c;
				box-sizing: border-box;
				padding: 20px 20px;
				li {
					width: 100%;
					height: 40px;
					text-align: center;
					line-height: 40px;
					font-size: 14px;
					color: #fff;
					cursor: pointer;
				}
				li:nth-last-child(1) {
					border-bottom: none;
				}
				li:hover {
					background: #363765;
				}
			}
		}
		/*右侧币种信息*/
		.currency-container-right {
			width: 930px;
			height: 100%;
			/*background-color: #1d263e;*/
			float: right;
			.currency-title {
				width: 100%;
				height: 41px;
				.text {
					width: 165px;
					height: 41px;
					font-size: 14px;
					text-align: center;
					line-height: 41px;
					background-color: #363765;
					color: #fff;
				}
			}
			/*币种信息*/
			.currency_information {
				width: 100%;
				font-size: 15px;
				color: #fff;
				padding: 20px 0;
				background: #16182c;
			}
		}
	}
</style>
