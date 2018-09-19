<template>
	<div id="api_admin">
		<!--限定创建条数报错-->
		<div class="limit" v-show="limitIsShow">
			<i class="iconfont icon-gantanhao"></i>
			<p>{{$t("ApiManage.CreateUpFive")}}</p>
		</div>

		<!--编辑成功-->
		<div class="bianji_success" v-show="bianjiIsShow">
			<i class="iconfont icon-duihao2"></i>
			<p>{{$t("ApiManage.EditSuccess")}}</p>
		</div>
		<!--创建密钥-->
		<div class="api_admin_title">
			<p>{{$t("ApiManage.CreateKey")}}</p>
		</div>
		<!--备注    绑定IP地址-->
		<div class="api_admin_content" :class="{'api_admin_content_title':getColor==1}">
			<!--创建密钥-->
			<div class="api_admin_content_left">
				<div class="input-item">
					<!--提示内容-->
					<div class="tishi" v-show="tiShi">{{$t("ApiManage.EnterCorrectAddr")}}</div>
					<p class="input-item-title">{{$t("ApiManage.Note")}}</p>
					<el-input v-model="Remarks"></el-input>
				</div>
				<div class="input-item">
					<p class="input-item-title">{{$t("ApiManage.BindIP")}}</p>
					<el-input v-model="binding"></el-input>
				</div>
				<div class="item-button">
					<el-button type="primary" :disabled="!Remarks" @click="createIp()">
						<span v-show="!bianji">{{$t("ApiManage.Create")}}</span>
						<span v-show="bianji">{{$t("ApiManage.Edit")}}</span>
					</el-button>
				</div>
			</div>
			<!--提示-->
			<div class="api_admin_content_right">
				<p>{{$t("ApiManage.Hint")}}：</p>
				<ul>
					<li>{{$t("ApiManage.OurProvides")}}</li>
					<li>{{$t("ApiManage.CreateUpFive")}}</li>
					<li>
						<span>
              {{$t("ApiManage.AoidLoss")}}
						</span>{{$t("ApiManage.NotDiscloseKey")}}
					</li>
					<li>{{$t("ApiManage.OneAddress")}}</li>
				</ul>
			</div>

		</div>
		<!--我的密钥-->
		<div class="api_admin_title wode">
			<p>{{$t("ApiManage.MyKey")}}</p>
		</div>
		<!--创建时间   备注   访问密钥     -->
		<div class="createTimeList" :class="{'createTimeList_white':getColor==1}">
			<!--复制成功-->
			<div class="copySuccess" v-show="copySuccess">{{$t("capital.Successfullycopied")}}</div>
			<!--头部-->
			<table class="createTimeList_title">
				<tr>
					<td>{{$t("ApiManage.CreateTime")}}</td>
					<td>{{$t("ApiManage.Note")}}</td>
					<td>{{$t("ApiManage.AccessKey")}}Access Key</td>
					<td>{{$t("ApiManage.BindIPAddress")}}</td>
					<td>{{$t("ApiManage.RemainExpiryDate")}}</td>
					<td>{{$t("ApiManage.Status")}}</td>
					<td>{{$t("ApiManage.Action")}}</td>
				</tr>
				<!--内容部分-->
				<tr class="createTimeList_content" v-for="(item,index) in addressList">
					<td>
						<span>{{formatTime(item.created_at)}}</span>
					</td>
					<td :title="item.remark">
						<p class="Remarks">{{item.note}}</p>
					</td>
					<td>
						<span class="oleft">{{item.access_key}}</span>
						<span class="oright" ref="key" @click="seeMore(index)">
								{{$t("capital.Viewmore")}}
						</span>
						<div class="boxKey" v-show="item.isShow">
							<span id="key" style='word-break:break-all'>
								{{item.access_key}}
							</span>
							<p>
								<span class="copy" id="copy" data-clipboard-action="copy" data-clipboard-target="#key">{{$t("capital.Successfullycopied")}}</span>
							</p>
						</div>
					</td>
					<td :title="item.ips">
						<p class="ip" v-show="item.ips!=''">{{item.ips}}</p>
						<p class="ipNull" v-show="item.ips==''">--</p>
					</td>
					<td>
						<span v-show="item.expiretime==0 || item.status==0">--</span>
						<span v-show="item.expiretime!=0" v-if="item.status==1">{{item.day}}{{$t("ApiManage.Day")}}</span>
					</td>
					<td>
						<span v-if="item.status==1">{{$t("ApiManage.Normal")}}</span>
						<span v-show="item.status==0">{{$t("ApiManage.Expired")}}</span>
						<span v-show="item.status==-1">{{$t("ApiManage.Deleted")}}</span>
					</td>
					<td>
						<span class="edit" @click="editApi(item)">{{$t("ApiManage.Edit")}}</span>
						<span class="remove" @click="removeApiItem({eid:item.eid,index})">{{$t("ApiManage.Delete")}}</span>
					</td>
				</tr>
							<div class="votePageCount" v-if="last_page>1">
				<el-pagination layout="prev, pager, next" background :current-page="page" :page-size="last_page" @current-change="changePage" :total="last_page+1">
				</el-pagination>
			</div>
			</table>

		</div>
		<!--弹框-->

		<!--安全验证-----弹框内容-->
		<div class="CurrencyAddress_alert" v-show="alertIsShow">
			<!--蒙版内容-->
			<div class="CurrencyAddress_alert_menban"></div>
			<div class="CurrencyAddress_alert_content" :class="{'CurrencyAddress_alert_content_white':getColor==1}">
				<!--安全验证上部分-->
				<div class="CurrencyAddress_alert_content_top">
					<!--头部安全验证-->
					<div class="CurrencyAddress_alert_content_top_title">
						<span>{{$t("login.safetyVerification")}}</span>
						<i class="iconfont icon-cuowu" @click="alertIsShow=false"></i>
					</div>
					<!--手机号验证-->
					<el-form>
						<div class="phone">
							<div class="phone-ma">{{$t("login.PleasePassword")}}</div>
							<div class="oInput">
								<el-form-item id="you-yan">
								<el-input type="password" v-model="pwd" auto-complete="off" @keyup.enter.native="subTow()"></el-input>
								</el-form-item>
								<p class="tishi-red" v-show="phoneNokong">{{phoneText}}</p>
							</div>
						</div>
					</el-form>
				</div>
				<!--确认  取消-->
				<div class="confirm_cancel">
					<dd @click="alertIsShow=false">{{$t("capital.Cancel")}}</dd>
					<dd @click="subTow()" v-show="!bianji">{{$t("capital.Confirm")}}</dd>
					<dd @click="bianjiClick()" v-show="bianji">{{$t("capital.Confirm")}}</dd>
				</div>
			</div>
		</div>

		<!--创建成功的弹框-->
		<div class="createSuccess" v-show="createIsShow" :class="{'createSuccess_white':getColor==1}">
			<!--复制成功-->
			<div class="copySuccess" v-show="copySuccess">{{$t("capital.Successfullycopied")}}</div>
			<!--创建成功弹框内容部分-->
			<div class="createSuccess_content">
				<!--头部-->
				<div class="createSuccess_content_title">
					<span>{{$t("ApiManage.CreateSuccess")}}</span>
					<i class="iconfont icon-cuowu" @click="createIsShow=false"></i>
				</div>
				<!--访问密钥-->
				<div class="title">
					{{$t("ApiManage.AccessKey")}}
				</div>
				<!--密钥内容展示-->
				<div class="secretkey">
					<p class="input" id="secretkey2" >{{createSuccess.access_key}}</p>
					<span class="border-right"></span>
					<span class="copy" id="copy" data-clipboard-action="copy" data-clipboard-target="#ipt">{{$t("capital.Copy")}}</span>
				</div>
				<!--绑定ip地址-->
				<div class="title" v-show="createSuccess.ips!=''">
					<span>{{$t("ApiManage.BindIPAddress")}}</span>
				</div>
				<!--密钥内容展示-->
				<div class="secretkey" v-show="createSuccess.ips!=''">
					<p class="input" id="secretkey3">{{createSuccess.ips}}</p>
					<span class="border-right"></span>
					<span class="copy" data-clipboard-action="copy" data-clipboard-target="#secretkey3">{{$t("capital.Copy")}}</span>
				</div>
				<!--提示-->
				<ul class="prompt">
					<li>{{$t("ApiManage.Hint")}}</li>
					<li>• {{$t("ApiManage.AoidLoss")}}</li>
					<!--<li>• 如您忘记了秘密密钥，请回收该密钥对并申请新的密钥对。</li>-->
				</ul>
				<!--确认按钮-->
				<div class="button">
					<el-button type="primary" @click="createIsShow=false">{{$t("capital.Confirm")}}</el-button>
				</div>

			</div>
		</div>

	</div>
</template>

<script src='./main.js'>
</script>

<style lang="scss">

	@import 'api_admin.scss';

</style>
