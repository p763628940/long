<template>
	<div id="Aboutus">
		<my-header :text="headerText"></my-header>
		<div v-show="loadingIsShow">
			<my-loading></my-loading>
		</div>
		<!--版本升级-->
		<div class="meng_ban" v-show="upgradeIsShow"></div>
		<div id="SetUp" v-show="upgradeIsShow">
			<div class="Setup_header">
				<span>{{$t("userCenter.Versionupdate")}}</span>
				<span>{{newVersion}}</span>
			</div>
			<div class="Setup_content">
				{{versionContent}}
			</div>
			<div class="bottom">
				<p v-show="'forceIsShow'" @click="upgradeIsShow=false">{{$t("capital.Cancel")}}</p>
				<p @click="topVersion">{{$t("userCenter.Update")}}</p>
			</div>
		</div>
		<!--当前已经是最新版本-->
		<div class="meng_ban" v-show="Newest"></div>
		<div id="SetUp" v-show="Newest">
			<div class="Setup_header">
				<span>{{$t("userCenter.Versionupdate")}}</span>
			</div>
			<div class="Setup_content">
				{{$t("userCenter.Thelatestversion")}}
			</div>
			<div class="bottom">
				<p @click="Newest=false">{{$t("userCenter.determine")}}</p>
			</div>
		</div>

		<!--联系我们   产品建议  版本更新-->
		<div class="Aboutus_content">
			<ul>
				<router-link to="/ProductFeedback" tag="li">
					<span>{{$t("userCenter.Productsuggestion")}}</span>
					<i class="iconfont icon-iconfontjiantou5"></i>
				</router-link>
				<li @click="translate" v-show="islocation">
					<i class="icon_red" v-show="isUpdate"></i>
					<span>{{$t("userCenter.Versionupdating")}}</span>
					<span>{{$t("userCenter.Currentversion")}}: V.{{version}}</span>
				</li>
			</ul>
		</div>

	</div>
</template>

<script>
	import header from "../../public/backHeader"
	import { Toast, MessageBox } from 'mint-ui'
	import loading from "../../public/loading";
	import { mapGetters,mapActions,mapState,mapMutations } from 'vuex'
	export default {
		data() {
			return {
				headerText: this.$t("userCenter.Aboutus"),
				version: "",
				/*获取当前版本号码*/
				versionAddress: "",
				/*升级地址*/
				versionContent: "",
				/*更新内容部分*/
				upgradeIsShow: false,
				/*用户点击升级*/
				newVersion: "",
				/*新的版本号*/
				Newest: false,
				/*当前已经是最新版本*/
				islocation: true,
				/*判断用户是否在浏览器中登录*/
				loadingIsShow: false,
				/*loading效果*/
				newVersionUrl: "", /*更新安装包路径*/
        isUpdate:false, /*判断是否更新*/
			}
		},
		computed:{
			//...mapState('setting',['version']),
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


			if(window.location.host) {
				this.islocation = false;
			}
		},
		components: {
			"my-header": header,
			"my-loading": loading
		},
		methods: {
			topVersion() { /*升级*/
				let _this = this;
				/*下载本地的包*/
				var u = navigator.userAgent;
				if(u.indexOf('iPhone') > -1) {//苹果手机
					window.open("itms-services://?action=download-manifest&url=https://www.imx.com/manifest.plist");
					return false;
				}
				_this.loadingIsShow = true;
				var dtask = plus.downloader.createDownload(_this.newVersionUrl, {
					method: "GET"
				}, function(d, status) {
					if(status == 200) { //下载成功
						_this.loadingIsShow = false;
						Toast(_this.$t("userCenter.Downloadsuccee"));
						plus.runtime.install(d.filename, {
							method: "GET"
						}, function() {
							Toast(_this.$t("userCenter.Updatesuccess"));
							setTimeout(function() {
								plus.runtime.restart();
								//plus.runtime.quit(); /*重新启动应用*/
							}, 1000)
						}, function(err) {
							Toast(err.message);
						});
					} else {
						_this.loadingIsShow = false;
						//下载失败,需删除本地临时文件,否则下次进来时会检查到图片已存在
						Toast(_this.$t("userCenter.Downloadfailed"));
						/*下载失败的状态码*/
						//dtask.abort();//文档描述:取消下载,删除临时文件;(但经测试临时文件没有删除,故使用delFile()方法删除);
					}
				}); //启动下载任务
				dtask.start();
			},
			translate() { /*判断当前版本号码*/
				if(this.newVersion != this.version) { /*判断当前版本是不是最新版本*/
					this.upgradeIsShow = true; /*升级版本*/
				} else {
					this.Newest = true; /*最新版*/
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	#Aboutus {
		width: 100%;
		height: 100%;
		color: #fff;
	}
	/*边框线*/

	$border_bottom:0.01rem solid #1b1d40;
	/*关于我们内容*/

	.Aboutus_content {
		width: 100%;
		ul {
			width: 100%;
			li {
				width: 100%;
				height: .4rem;
				display: flex;
				justify-content: space-between;
				align-items: center;
				background: #141738;
				box-sizing: border-box;
				padding: 0 .1rem;
				border-bottom: $border_bottom;
				position: relative;
				.icon_red {
					width: .05rem;
					height: .05rem;
					background: red;
					border-radius: 50%;
					position: absolute;
					left: 20%;
					top: 20%;
				}
			}
		}
	}
	/*蒙版*/

	.meng_ban {
		width: 100%;
		height: 100%;
		background: rgba(0, 0, 0, 0.5);
		position: fixed;
		left: 0;
		top: 0;
		z-index: 999;
	}
	/*蒙版内容*/

	#SetUp {
		width: 90%;
		background: #323560;
		color: #fff;
		position: fixed;
		left: 5%;
		top: 20%;
		z-index: 9999;
		/*升级的头部*/
		.Setup_header {
			width: 100%;
			height: .35rem;
			display: flex;
			justify-content: space-between;
			box-sizing: border-box;
			align-items: center;
			padding: 0 .1rem;
			border-bottom: 0.01rem solid #1F2353;
		}
		/*升级的内容部分*/
		.Setup_content {
			width: 100%;
			box-sizing: border-box;
			padding: .1rem .1rem;
		}
		/*立即升级按钮*/
		.bottom {
			width: 100%;
			height: .35rem;
			display: flex;
			line-height: .35rem;
			justify-content: center;
			border-top: 0.01rem solid #1f2353;
			p {
				flex: 1;
				text-align: center;
				box-sizing: border-box;
			}
			p:nth-of-type(1) {
				border-right: 1px solid #1F2351;
			}
		}
	}
</style>
