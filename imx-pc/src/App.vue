<template>
	<div id="app" :style="{background:backColor}">
		<loading v-show="loadingIsShow || showLoading"></loading>
		<router-view/>
		<!-- 提示-->
		<div class="men_ban" v-show="PromptIsShow"></div>
		<!--提示内容部分-->
		<dl class="Prompt" v-show="PromptIsShow">
			<dt class="Prompt_top">
				<span>Important Notice : </span>
				<i></i>
			</dt>
			<!--内容-->
			<dd class="Prompt_content">
				<p class="english">
					Please confirm that you are not a citizen or resident in the following countries or regions or territories (the “Jurisdiction”): the United States of America, mainland China, Hong Kong, Cuba, Iran, North Korea, Crimea, Sudan, Malaysia, Syria, Bangladesh, Bolivia, Ecuador, and Kyrgyzstan or a citizen or resident of any other jurisdiction that are subject to restrictions on the services provided by IMX under any applicable law. If you do not meet these eligibility requirements, do not use our Services. IMX also reserve the right to immediately stop all services to you. For more details, please read our Terms of Service.
				</p>
				<p class="yes" @click="Close">
					<span>I Got It</span>
				</p>
			</dd>
		</dl>
	</div>
</template>

<script>
	import axios from "axios";
	import store from './store/store.js';
	import { mapGetters,mapActions,mapState,mapMutations } from 'vuex'
	import Vue from "vue";
	import { httpUrl } from "./components/http_url/http_url";
	import loading from "@/components/public/loading"
	import { Notification } from 'element-ui';
	import localstorage from "@/store/localStorageTime"; /*判断过期时间*/
	export default {
		name: 'App',
		store,
		data() {
			return {
				// getColor: window.localStorage.getItem("setColor"),
				loadingIsShow: false,
				matchcoin_id: "",
				/*币对id*/
				PromptIsShow: true,
				/*提示*/
				BeOverdue: localstorage.get("BeOverdue") /*获取存的值*/
			}
		},
		components: {
			"loading": loading
		},
		watch: {
			curTime: {
				handler: function(val, oldVal) {
					console.log(val)
				},
				deep: true
			},
      lang:{
        handler: (val, oldVal) => {
          if(val!='zh-CN'){
            document.title = 'Digital Asset Exchange';
          }else{
            document.title = 'IMX – 数字资产交易平台';
          }
        },
      }
		},
		methods: {
			...mapMutations('user',['logout']),
			Close() { /*将用户关闭的值存起来*/
				this.PromptIsShow = false;
				localstorage.set("BeOverdue", "0");
			}
		},
		  computed: {
			  backColor:function (){
				let color =   "#232740";
				if(this.$route.path == "/index/Help") { /*判断是否在帮助中心*/
					////初始化颜色
					color=  "#eaeff3";
				} else {
					if(this.getColor == 1) {
						color=  "#eaeff3";
					} else if(this.getColor == 0) {
						color=   "#232740";
					}
				}
				document.body.style.backgroundColor  = color;document.body.style.transition = 'background-color 500ms'; /*过渡效果*/
				return color;
			  },
		// 使用对象展开运算符将 getter 混入 computed 对象中
			...mapGetters([
				'showLoading',
			// ...
			]),
			...mapState('user',[
				'token',
			  'lang'
			// ...
			])
		},
		mounted() {
		  let _this = this;
			if(this.BeOverdue == null || this.BeOverdue == undefined) { /*判断用户是否观看提示*/
				this.PromptIsShow = true;
			} else {
				this.PromptIsShow = false;
			}
			/*判断用户语言类型*/
      if(this.lang!='zh-CN'){
        document.title = 'Digital Asset Exchange';
      }else{
        document.title = 'IMX – 数字资产交易平台';
      }
			// 响应拦截器
			axios.interceptors.response.use((response) => {
				if(response.data.status != undefined) {
					if(Number(response.data.status.code) == -200) {
						this.$message.error({
							message: response.data.status.message,
							type: "error"
						});
					}
					if(Number(response.data.status.code) != 200) {
						this.$message.error({
							message: response.data.status.message,
							type: "error"
						});
					}
				}
				return response
			}, (error) => {
				if(error.response) {
					switch(error.response.status) {
						case 401: // 这里写清除token的代码
							// window.localStorage.removeItem("token");
							// window.localStorage.removeItem("curTime");
							this.logout();
							////获取所有币对   GET请求
							axios.get(httpUrl.coin_matching).then(function(res) {
							if(_this.$router.name!="bbjy"){
                				_this.$router.push({ /*跳转到币币页面*/
										name: "bbjy",
										params: {
											id: res.data.data[0].matchcoins[0].matchcoin_id
										}
									});
								}
							});

							// this.$router.push({ /*跳转到币币页面*/
							// 		name: "login",
							// 	});
							// window.location.reload();
							break;
						case 413:
							this.$message.error({
								message: this.$t("shouye.UploadFileLarger"),
								type: "error"
							});
							break;
						case 504:
							this.$message.error({
								message: this.$t("shouye.ResponseTime"),
								type: "error"
							});
							break;
						case 500:
							this.$message.error({
								message: this.$t("shouye.ServerError"),
								type: "error"
							});
							break;
            case 408:
              console.log('没相应');
              break;
					}
				}
				return Promise.reject(error)
			})
			/*判断用户是否关闭页面*/
			window.onunload = function() {       
				var a_n = window.event.screenX - window.screenLeft;       
				var a_b = a_n > document.documentElement.scrollWidth - 20;       
				if(a_b && window.event.clientY < 0 || window.event.altKey) {       
					// window.localStorage.removeItem("token");
					// window.localStorage.removeItem("curTime");
					// window.localStorage.removeItem("userID");
				}
			}

    }

	}
</script>


<style lang="scss" scoped>

	#app,
	#app>div {
		width: 100%;
		height: 100%;
	}
	/*蒙版*/

	.men_ban {
		width: 100%;
		height: 100%;
		background: rgba(0, 0, 0, 0.5);
		position: fixed;
		left: 0;
		top: 0;
		z-index: 66;
	}
	/*弹框内容提示*/

	.Prompt {
		position: fixed;
		left: 50%;
		top: 50%;
		z-index: 999;
		width: 560px;
		border-radius: 2px;
		background: #222140;
		box-sizing: border-box;
		padding: 0 25px;
		color: #fff;
		margin-left: -280px;
		margin-top: -152px;
		font-size: 14px;
		.Prompt_top {
			width: 100%;
			height: 50px;
			display: flex;
			align-items: center;
			justify-content: space-between;
			.iconfont {
				cursor: pointer;
			}
		}
		.Prompt_content {
			width: 100%;
			.Chinese {
				box-sizing: border-box;
				padding-top: 20px;
				margin-bottom: 10px;
				line-height: 20px;
			}
			.english {
				/*margin-top: 20px;*/
				box-sizing: border-box;
				line-height: 20px;
			}
			.yes {
				width: 100%;
				line-height: 60px;
				margin-top: 20px;
				box-sizing: border-box;
				text-align: center;
				border-top: 1px solid #4e4a72;
				font-size: 20px;
				cursor: pointer;
			}
		}
	}
  /*断网提示*/
  .promptBrokenNetwork{
    width: 200px;
    height: 200px;
    background: #fff;
    position: fixed;
    left: 50%;
    top: 50%;
    margin-left: -100px;
    margin-top: -100px;
    z-index: 999;
  }
</style>
