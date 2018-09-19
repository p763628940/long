<template>
	<div id="userCenter">
		<!--个人中心头部-->
		<div class="fixed_header">
			<div class="userCenter_Height">
				<p>{{$t("userCenter.PersonalCenter")}}</p>
				<router-link to="/SetUp" tag="span" class="iconfont">
					<i class="iconfont icon-shezhi"></i>
				</router-link>
			</div>
		</div>
		<div class="oHeight"></div>
		<!--用户头部-->
		<!--用户名称-->
		<div class="userName men_back">
			<p class="tou_xian">
				<i class="iconfont icon-icontouxiang"></i>
			</p>
			<div class="name">
				<p class="name_text" v-show="token">{{userName}}</p>
				<p class="name_text" v-show="!token">
					<router-link to="/login" tag="span">{{$t("login.Clicktolog")}}</router-link>
				</p>
				<p class="userID" v-show="!token">{{$t("userCenter.WelcometoIMX")}}</p>
				<p class="userID" v-show="token">
					<span v-show="userType==2" v-cloak>
						<img src="../../assets/si1.png" />
						{{$t("userCenter.Supernode")}}
					</span>
					<span v-show="userType==0" v-cloak>
						<img src="../../assets/si2.png" />
						{{$t("userCenter.ordinaryusers")}}
					</span>
					<span v-show="userType==1" v-cloak>
						<img src="../../assets/si3.png" />
						{{$t("userCenter.Superusers")}}
					</span>
				</p>
			</div>
		</div>
		<!--交易次数-->
		<div class="transaction men_back" v-show="userIsLogin">
			<ul>
				<li>
					<p class="num">1</p>
					<p class="text">{{$t("userCenter.Numbertrades")}}</p>
				</li>
				<li>
					<p class="num">0</p>
					<p class="text">{{$t("userCenter.Numberappeals")}}</p>
				</li>
				<li>
					<p class="num">0</p>
					<p class="text">{{$t("userCenter.Numberwins")}}</p>
				</li>
			</ul>
		</div>
		<!--用户选择内容部分capital-->
		<div class="userContent men_back">
			<ul>
				<li @click="toLogin('capital')">
					<p class="icon">
						<i class="iconfont icon-zhanghuzichan"></i>
					</p>
					<p class="text">
						{{$t("SupperWallet.SuperWallet")}}
						<i class="iconfont icon-iconfontjiantou5"></i>
					</p>
				</li>
				<li  @click="toLogin('identity')" >
					<p class="icon">
						<i class="iconfont icon-shenfen-tianchong"></i>
					</p>

					<p class="text">
            {{$t("userCenter.Authentication")}}
						<i class="iconfont icon-iconfontjiantou5"></i>
					</p>
				</li>
				<li  @click="toLogin('SecurityCenter')">
					<p class="icon">
						<i class="iconfont icon-anquanzhongxinon"></i>
					</p>

					<p class="text">
            {{$t("userCenter.Securitycenter")}}
						<i class="iconfont icon-iconfontjiantou5"></i>
					</p>
				</li>
				<li @click="toLogin('friends')">
					<p class="icon">
						<i class="iconfont icon-gift"></i>
					</p>

					<p class="text">
            {{$t("userCenter.Invitationprogram")}}
						<i class="iconfont icon-iconfontjiantou5"></i>
					</p>
				</li>
				<li @click="toLogin('accountSet')">
					<p class="icon">
						<i class="iconfont icon-setting-user"></i>
					</p>

					<p class="text">
            {{$t("list.Account_setting")}}
						<i class="iconfont icon-iconfontjiantou5"></i>
					</p>
				</li>
				<li @click="toLogin('AddressList')">
					<p class="icon">
						<i class="iconfont icon-shouhuodizhi"></i>
					</p>

					<p class="text">
            {{$t("capital.Withdrawaddress")}}
						<i class="iconfont icon-iconfontjiantou5"></i>
					</p>
				</li>
				<li @click="Register">
					<p class="icon">
						<i class="iconfont icon-wodexuanzhong"></i>
					</p>

					<p class="text">
            {{$t("otc.Merchant")}}
						<i class="iconfont icon-iconfontjiantou5"></i>
					</p>
				</li>
				<li @click="toLogin('Aboutus')" >
					<p class="icon">
						<i class="iconfont icon-info"></i>
					</p>
					<i class="icon_red" v-show="isUpdate"></i>
					<p class="text">
            {{$t("userCenter.Aboutus")}}
						<i class="iconfont icon-iconfontjiantou5"></i>
					</p>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
	import { Message } from 'element-ui'; /*消息提示*/
	export default {
		data() {
			return {
				userIsLogin: "",
				userName: "",
				userList:{},
				userType:"",
        version:"",
        isUpdate:false, /*判断是否更新*/
			}
		},
		props: ['sjIsShow'],
		methods: {
			Register() {
				this.$message({
					showClose: true,
					message: this.$t("userCenter.Notopen"),
					type: 'warning',
					duration: 2500
				});
			},
			toLogin(name){
				if(name=="friends"&&this.token==null&&this.token==undefined){
					 this.$router.push({name:"inviteNoLogin"});
					 return false;
				}
				if(this.token==null||this.token==undefined){
					this.$router.push({name:"login"});
					return;
				}else if(name=='capital'&&this.userList.wallet_on!=1){
          this.$router.push({name:"OpenWallet"});
          return;
        }else if(name=='capital'){
          this.$router.push({name:"capital",params:{index:0}});
          return;
        }else if(name=='identity'){
          this.$ajax.get(this.httpUrl.seniorInfo,{
            headers:{"Authorization": "Bearer " + this.token}
          }).then(res=>{
            if(res.data.data.length!=0){ /*高级认证*/
              this.$router.push('/senior')
            }else{                       /*实名认证*/
              this.$router.push('/realname')
            }
          },err=>{
            console.log(err);
          })
				  return;
        } else{
					this.$router.push({name:name})
				}
			}
		},
		mounted() {
			let _this = this;
      /*判断用户手机机型*/
      var u = navigator.userAgent;
      if(window.plus) {
        plus.runtime.getProperty(plus.runtime.appid, function(wgtinfo) {
          _this.version = wgtinfo.version;
        });
        if(u.indexOf('iPhone') > -1) { //苹果手机
          this.$ajax.get(this.httpUrl.getVserion, {
            params: {
              type: 0
            }
          }).then(function(res) {
            _this.newVersion = res.data.data.version_code; /*最新版本的版本号*/
            _this.newVersionUrl = res.data.data.down_url; /*下载新版链接*/
            _this.versionContent = res.data.data.content; /*更新的内容*/
            if(_this.version!=_this.newVersion){ /*判断用户版本号是否相同*/
              _this.isUpdate = true;
            }
          }, function(err) {
            console.log(err)
          })
        } else {
          this.$ajax.get(this.httpUrl.getVserion, {
            params: {
              type: 1
            }
          }).then(function(res) {
            _this.newVersion = res.data.data.version_code; /*最新版本的版本号*/
            _this.newVersionUrl = res.data.data.down_url; /*下载新版链接*/
            _this.versionContent = res.data.data.content; /*更新的内容*/
            if(_this.version!=_this.newVersion){
              _this.isUpdate = true;
            }
          }, function(err) {
            console.log(err)
          })
        }
      }

			if(this.token == null || this.token == undefined) {
				return false;
			} else {
				/*获取用户信息*/
				this.$ajax.get(this.httpUrl.userInfo, {
					headers: {
						"Authorization": "Bearer " + _this.token
					}
				}).then(function(res) {
					/*获取用户信息*/
					_this.userName = res.data.data.name;  /*用户名称*/
					_this.userList = res.data.data;
				},function(err){
					console.log(err)
				})
				/*获取用户身份*/
				this.$ajax.get(this.httpUrl.assetInfo, {
					headers: {
						"Authorization": "Bearer " + _this.token
					}
				}).then(function(res){
					_this.userType = res.data.data.identity; /*用户身份*/
				},function(err){
					console.log(err)
				})



			}
		}
	}
</script>
<style type="text/css">
	.el-message {
		/*width: 2.5rem;*/
		min-width: 2.5rem;
		z-index: 2099 !important;
	}

	.el-message--warning {
		background-color: #fff;
		border-top: 2px solid #f96a0e;
	}

	.el-message .el-icon-warning {
		font-size: .15rem;
		color: #f96a0e;
	}

	.el-message--warning .el-message__content {
		color: #000;
	}
</style>
<style lang="scss" scoped>
	$header_bg:#141738;
	/*币币交易公用的色值*/

	$color_bg:#141738;
	/*一块一块内容的背景颜色*/

	$buy_color:#02c289;
	/*买入*/

	$sell_color:#ea6954;
	/*卖出*/

	$button_color:#5f7cc0;
	/*按钮的颜色*/

	$xian_color:#6d87c7;
	/*限价字体*/

	$alert_bg:#474da0;
	/*弹出框的背景颜色*/

	$alet_border:1px solid #303678;
	/*弹出框的边框*/

	$alert_hover:#3f4494;
	/*鼠标滑过的颜色*/

	$fontColor_price:#474f95;
	/*价格标题颜色*/

	$price_content_color:#b9c0ff;
	/*价格内容颜色*/

	$xian_color:#5f7bc0;
	/*限价字体颜色*/

	$color_zise:#4a5b8b;
	$title_color:#485099;
	/*当前委托  时间  价格   数量*/
	/*右下角大小*/

	$input_border:1px solid #344063;
	/*输入框颜色*/

	$input_activeBorder:1px solid #a199f4;
	$input_bgColor:#121528;
	$color_moren:#7f8af4;
	/*背景*/

	.men_back {
		background: $color_bg;
	}
	/*用户中心*/

	#userCenter {
		width: 100%;
		/*height: 100%;*/
		color: #fff;
	}
	/*用户中心的头部*/

	.fixed_header {
		width: 100%;
		height: .45rem;
		position: fixed;
		left: 0;
		top: 0;
		z-index: 100;
	}

	.userCenter_Height {
		width: 100%;
		height: .45rem;
		display: flex;
		justify-content: flex-end;
		align-items: center;
		position: relative;
		p {
			width: 100%;
			height: 100%;
			position: absolute;
			text-align: center;
			line-height: .45rem;
			font-size: .15rem;
			font-weight: 500;
		}
		.iconfont {
			width: .5rem;
			height: .45rem;
			text-align: center;
			line-height: .45rem;
			z-index: 66;
		}
		background:$header_bg;
	}

	.oHeight {
		height: .45rem;
	}
	/*用户头部*/

	.userName {
		width: 100%;
		height: .65rem;
		display: flex;
		align-items: center;
		box-sizing: border-box;
		padding: 0 .15rem;
		.tou_xian {
			width: .46rem;
			height: .46rem;
			text-align: center;
			line-height: .46rem;
			border-radius: 50%;
			background: #fff;
			margin-right: .12rem;
			.iconfont {
				color: $color_bg;
				font-size: .3rem;
			}
		}
		.name_text {
			font-size: .16rem;
			font-weight: 600;
		}
		.userID {
			margin-top: .03rem;
			display: flex;
			align-items: center;
			span {
				display: flex;
				align-items: center;
			}
			img {
				width: .2rem;
				height: .2rem;
				margin-right: .03rem;
			}
		}
	}
	/*交易次数*/

	.transaction {
		width: 100%;
		ul {
			width: 100%;
			height: .55rem;
			display: flex;
			justify-content: space-between;
			align-items: center;
			border-top: 1px solid #1f2354;
			li {
				width: 30%;
				text-align: center;
				border-right: 1px solid #1F2354;
			}
		}
	}
	/*用户选择内容部分*/

	.userContent {
		width: 100%;
		min-height: 70%;
		margin-top: .1rem;
		box-sizing: border-box;
		padding: 0 .18rem 0 .15rem;
		position: relative;
		ul {
			width: 100%;
			li {
				width: 100%;
				height: .49rem;
				display: flex;
				align-items: center;
				position: relative;
				.icon_red{
					width: 0.05rem;
					height: 0.05rem;
					background: red;
					border-radius: 50%;
					position: absolute;
					right: 10%;
					top: 30%;
				}
				.icon {
					width: 18%;
					display: flex;
					justify-content: center;
					align-items: center;
					.iconfont {
						font-size: .19rem;
					}
				}
				.text {
					width: 82%;
					height: .5rem;
					font-size: .13rem;
					display: flex;
					justify-content: space-between;
					align-items: center;
					border-bottom: 1px solid #1b1d40;
				}
			}
			li:nth-last-of-type(1) {
				.text {
					border-bottom: none;
				}
			}
		}
	}
</style>
