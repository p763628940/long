<template>
	<div id="bzzl">
		<!--币种资料内容部分-->
		<div class="currency-wrapper">
			<!--左侧币种-->
			<div class="currency-container-left">
				<ul class="border">
					<div>
						<li v-for="(item,key) in currencyList" :class="{'active_bg_color':key==0}" @click="tabCurrency(item.id,key)">{{item.text}}</li>
					</div>
				</ul>
			</div>
			<!--右侧币种-->
			<div class="currency-container-right white-text">
				<!--币种头部-->
				<div class="currency-title">
					<p class="text white-active-bg">{{$t("newProblems.NoviceHelp")}}</p>
				</div>
				<!--币种信息-->
				<div class="currency_information font_color">
					<div>
            <div class="Novice_guidance_content" style="display: block;">
              <!--1.官方网站及APP下载网址-->
              <ul class="Novice_guidance_list">
                <li>
                  <p class="title">{{$t("newProblems.OfficalWeb")}}</p>
                </li>
                <li>
                  <p class="title">{{$t("newProblems.IOSapp")}}</p>
                </li>
                <li>
                  <p class="title">{{$t("newProblems.Androidapp")}}</p>
                </li>
              </ul>
            </div>
						<!--2.如何注册帐号-->
						<div class="Novice_guidance_content">
            <!--标题-->
            <div class="Novice_guidance_content_title">
              {{$t("newProblems.HowRegister")}}
            </div>
            <!--内容部分-->
            <ul class="Novice_guidance_list">
              <li>
                <p class="title">{{$t("newProblems.HowRegisterStep1")}}</p>
                <div class="img">
                  <img src="../../assets/1.png"/>
                </div>
              </li>
              <li>
                <p class="title">{{$t("newProblems.HowRegisterStep2")}}</p>
                <div class="img">
                  <img src="../../assets/2.png" />
                </div>
              </li>
              <li>
                <p class="title">{{$t("newProblems.HowRegisterStep3")}}</p>
                <div class="img">
                  <img src="../../assets/3.png" />
                </div>
              </li>
            </ul>
          </div>
            <!--3.如何邀请好友-->
            <div class="Novice_guidance_content">
              <!--标题-->
              <div class="Novice_guidance_content_title">
                {{$t("newProblems.HowInviteFriends")}}
              </div>
              <!--内容部分-->
              <ul class="Novice_guidance_list">
                <li>
                  <p class="title">{{$t("newProblems.HowInviteStep1")}}</p>
                  <div class="img">
                    <img src="../../assets/1.png" />
                  </div>
                </li>
                <li>
                  <p class="title">{{$t("newProblems.HowInviteStep2")}}</p>
                  <div class="img">
                    <img src="../../assets/2.png" />
                  </div>
                </li>
                <li>
                  <p class="title">{{$t("newProblems.HowInviteStep3")}}</p>
                  <p class="title">{{$t("newProblems.HowInviteWay1")}}</p>
                  <p class="title">{{$t("newProblems.HowInviteWay2")}}</p>
                  <p class="title">{{$t("newProblems.HowInviteWay3")}}</p>
                  <p class="title">{{$t("newProblems.HowInviteStep4")}}</p>
                </li>
              </ul>
            </div>
						<!--4.如何充币-->
						<div class="Novice_guidance_content">
							<!--标题-->
							<div class="Novice_guidance_content_title">
								{{$t("newProblems.HowDepositCoin")}}
							</div>
							<!--内容部分-->
							<ul class="Novice_guidance_list">
								<li>
									<p class="title"><span class="red">{{$t("newProblems.DepositCoinStep1")}}</span><span>{{$t("newProblems.DepositCoinStep11")}}</span></p>
									<div class="img">
										<img src="../../assets/16.png" />
									</div>
								</li>
								<li>
									<p class="title"><span>{{$t("newProblems.DepositCoinStep2")}}</span><span class="red">{{$t("newProblems.DepositCoinStepNoce")}}</span></p>
									<div class="img">
										<img src="../../assets/17.png" />
									</div>
								</li>
							</ul>
						</div>
						<!--5.如何提币-->
						<div class="Novice_guidance_content">
							<!--标题-->
							<div class="Novice_guidance_content_title">
								{{$t("newProblems.HowWithdrawCoin")}}
							</div>
							<!--内容部分-->
							<ul class="Novice_guidance_list">
								<li>
									<p class="title">	{{$t("newProblems.WithdrawCoinStep1")}}</p>
									<div class="img">
										<img src="../../assets/18.png" />
									</div>
								</li>
								<li>
									<p class="title">{{$t("newProblems.WithdrawCoinStep2")}}
										<span class="red">
											{{$t("newProblems.WithdrawCoinStep2Noce")}}
										</span>
									</p>
									<div class="img">
										<img src="../../assets/tibiImg.jpg" />
									</div>
								</li>
							</ul>
						</div>
            <!--6.如何进行实名认证-->
            <div class="Novice_guidance_content">
              <!--标题-->
              <div class="Novice_guidance_content_title">
                {{$t("newProblems.HowVerifyName")}}
              </div>
              <!--内容部分-->
              <ul class="Novice_guidance_list">
                <li>
                  <p class="title">{{$t("newProblems.VerifyNameStep1")}}</p>
                </li>
                <li>
                  <p class="title">{{$t("newProblems.VerifyNameStep2")}}<span class="red">{{$t("newProblems.VerifyNameStep2Noce")}}</span></p>
                  <div class="img">
                    <img src="../../assets/7.png" />
                  </div>
                </li>
              </ul>
            </div>
            <!--7.如何进行高级认证-->
            <div class="Novice_guidance_content">
              <!--标题-->
              <div class="Novice_guidance_content_title">
                {{$t("newProblems.AdvancedVerify")}}
              </div>
              <!--内容部分-->
              <ul class="Novice_guidance_list">
                <li>
                  <p class="title">{{$t("newProblems.AdvancedVerifyStep1")}}</p>
                  <div class="img">
                    <img src="../../assets/7.png" />
                  </div>
                </li>
                <li>
                  <p class="title">{{$t("newProblems.AdvancedVerifyStep2")}}<span class="red">{{$t("newProblems.AdvancedVerifyStep2A")}}</span>{{$t("newProblems.AdvancedVerifyStep2B")}}</p>
                  <div class="img">
                    <img src="../../assets/7.png" />
                  </div>
                </li>
                <li>
                  <p class="title">{{$t("newProblems.AdvancedVerifyStep3")}}<span class="red">{{$t("newProblems.AdvancedVerifyStep3Noce")}}</span></p>
                  <div class="img">
                    <img src="../../assets/7.png" />
                  </div>
                </li>
              </ul>
            </div>
						<!--8.如何快速购买数字货币-->
						<div class="Novice_guidance_content">
							<!--标题-->
							<div class="Novice_guidance_content_title">
								{{$t("newProblems.HowBuyDigitalAsset")}}
							</div>
							<!--内容部分-->
							<ul class="Novice_guidance_list">
								<li>
									<p class="title">{{$t("newProblems.BuyDigitalAssetStep1")}}</p>
									<div class="img">
										<img src="../../assets/6.png" />
									</div>
								</li>
								<li>
									<p class="title">{{$t("newProblems.BuyDigitalAssetStep2")}}</p>
									<div class="img">
										<img src="../../assets/7.png" />
									</div>
								</li>
								<li>
									<p class="title">{{$t("newProblems.BuyDigitalAssetStep3")}}
										<span class="red">
										 {{$t("newProblems.BuyDigitalAssetStep3Noce")}}
									</span>
									</p>
									<div class="img">
								    <img src="../../assets/8.png"/>
									</div>
								</li>
								<li>
									<p class="title">{{$t("newProblems.BuyDigitalAssetStep4")}}</p>
									<div class="img">
										<img src="../../assets/9.png" />
									</div>
								</li>
								<li>
									<p class="title">{{$t("newProblems.BuyDigitalAssetStep5")}}</p>
									<div class="img">
										<img src="../../assets/11.png" />
									</div>
								</li>
							</ul>
						</div>
						<!--9.如何快速出售数字货币-->
						<div class="Novice_guidance_content">
							<!--标题-->
							<div class="Novice_guidance_content_title">
								{{$t("newProblems.HowSellDigitalAsset")}}
							</div>
							<!--内容部分-->
							<ul class="Novice_guidance_list">

								<li>
									<p class="title">{{$t("newProblems.SellDigitalAssetStep1")}}</p>
									<div class="img">
										<img src="../../assets/14.png" />
									</div>
								</li>
								<li>
									<p class="title">{{$t("newProblems.SellDigitalAssetStep2")}}</p>
									<div class="img">
										<img src="../../assets/15.png" />
									</div>
								</li>
								<li>
									<p class="title">{{$t("newProblems.SellDigitalAssetStep3")}}</p>
								</li>
								<li>
									<p class="title">{{$t("newProblems.SellDigitalAssetStep4")}}</p>
								</li>
							</ul>
						</div>

					</div>
				</div>

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
				currencyList: [
          {
            text: this.$t("newProblems.OfficialWebsite"),
            isShow: true
          },
				  {
						text: this.$t("newProblems.HowRegister"),
						isShow: false
					},
          {
            text: this.$t("newProblems.HowInviteFriends"),
            isShow: false
          },
					{
						text:this.$t("newProblems.HowDepositCoin"),
						isShow: false
					},
					{
						text:this.$t("newProblems.HowWithdrawCoin"),
						isShow: false
					},
          {
            text:this.$t("newProblems.HowVerifyName"),
            isShow: false
          },
          {
            text: this.$t("newProblems.AdvancedVerify"),
            isShow: false
          },
					{
						text:this.$t("newProblems.HowBuyDigitalAsset"),
						isShow: false
					},
					{
						text: this.$t("newProblems.HowSellDigitalAsset"),
						isShow: false
					}
				],
				/*币种列表*/
				currencyListHtml: "",
				/*html片段*/
				item: {},
				/*当前币种的资料*/
			}
		},
		methods: {
			tabCurrency(id, index) {
				var _this = this;
				$(".currency-container-left li").eq(index).addClass("active_bg_color").siblings("li").removeClass("active_bg_color");
				$(".Novice_guidance_content").eq(index).css("display", "block").siblings(".Novice_guidance_content").css("display", "none")
			}
		}
	}
</script>

<style scoped lang="scss">
	body {
		width: 100%;
		height: 100%;
		background: #eaeff3;
	}
	.red{
		line-height: 25px !important;
		color: red !important;
	}
	#bzzl {
		width: 100%;
		height: 100%;
		background: #eaeff3;
	}
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

	.font_color {
		color: #000 !important;
		background-color: #fff !important;
		border: 1px solid #ddd !important;
	}

	.white-active-bg1 {
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
		}
	}
	/*选中颜色部分*/

	.active_bg_color {
		background: #ddd !important;
	}
	/*选中内容*/

	.currency-active {
		background: #363765;
	}
	/*边框内容*/

	.border_nei {
		width: 100%;
		height: 100%;
		box-sizing: border-box;
		border: 3px solid #0b0b15;
	}
	/*币种资料*/

	.currency-wrapper {
		width: 1200px;
		height: 100%;
		/*border: 1px solid red;*/
		margin: 17px auto;
		/*左侧选择币种类型*/
		.currency-container-left {
			width: 260px;
			float: left;
			ul {
				width: 100%;
				border-radius: 4px;
				border: 2px solid #33304e;
				li {
					width: 100%;
					height: 50px;
					line-height: 20px;
					font-size: 14px;
					color: #fff;
					border-bottom: 1px solid #3a3756;
					white-space: normal;
					/*cursor: pointer;
					padding: 0 2px;
					box-sizing: border-box;
					padding-top: 5px;*/
					box-sizing: border-box;
					display: flex;
					align-items: center;
					box-sizing: border-box;
					padding-left: 5px;
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
			/*border: 1px solid #515774;*/
			/*background-color: #1d263e;*/
			float: right;
			.currency-title {
				width: 100%;
				height: 41px;
				border-bottom: 1px solid #363765;
				.text {
					width: 100px;
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
				/*padding: 20px 0;*/
				border: 2px solid #33304e;
				.Novice_guidance_content {
					width: 100%;
					box-sizing: border-box;
					padding: 20px 25px;
					display: none;
					.Novice_guidance_content_title {
						line-height: 30px;
						font-size: 16px;
						font-weight: bold;
					}
					/*图文部分*/
					.Novice_guidance_list {
						width: 100%;
						li {
							width: 100%;
							.title {
								margin: 20px 0;
								line-height: 23px;
							}
							.img {
								width: 100%;
								img {
									width: 100%;
								}
							}
						}
					}
					dl{
						dt,dd{
							line-height: 25px;
						}
					}
				}
			}
		}
	}
</style>
