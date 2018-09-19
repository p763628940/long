import Vue from 'vue'
import Router from 'vue-router'
/*1.首页*/
import Home from "@/components/shouye/shouye"
/*1.1首页公告部分*/
import Notice from "@/components/public/Notice"
/*1.2交易即挖矿介绍*/
import TradingRules from "@/components/shouye/children/TradingRules"
/*1.2邀请榜单*/
import AllList from "@/components/friends/children/AllList"
/*1.4累积折合*/
import Fold from "@/components/shouye/children/Fold"
/*1.4昨日已回购IMX总量*/
import imxRepurchase from "@/components/shouye/children/imxRepurchase"
/*1.5未登录邀请页面*/
import inviteNoLogin from "@/components/shouye/children/inviteNoLogin"
/*2.币币交易*/
import bbjy from "@/components/bbjy/bbjy"
/*3.法币交易*/
import fbjy from "@/components/fbjy/fbjy"
/*3.1卖家订单详情*/
import sellddxq from "@/components/fbjy/children/sellddxq"
/*3.2买家订单详情*/
import buyddxq from "@/components/fbjy/children/buyddxq"
/*3.3聊天*/
import chat from "@/components/fbjy/children/chat"
/*3.4法币订单*/
import fbdd from "@/components/fbjy/children/fbdd"
/*4.用户中心*/
import userCenter from "@/components/userCenter/userCenter"
/*4.1身份认证*/
import identity from "@/components/identity/identity"
/*4.1.1实名认证*/
import RealName from "@/components/identity/children/RealName"
/*4.1.2高级认证*/
import senior from "@/components/identity/children/senior"
/*4.2资金管理*/
import capital from "@/components/capital/capital"
/*4.2.1充币*/
import ChongBi from "@/components/capital/children/ChongBi"
/*4.2.2提币*/
import tiBi from "@/components/capital/children/tibi"
/*4.2.3资金记录*/
import CapitalRecord from "@/components/capital/children/CapitalRecord"
////4.3.账户设置
import accountSet from "@/components/accountSet/accountSet"
///4.3.1绑定银行卡
import BankCard from "@/components/BankCard/BankCard"
import bindingAlipay from "@/components/accountSet/children/bindingAlipay"
///4.3.3绑定微信
///4.3.2绑定支付宝
import bindingWeChat from "@/components/accountSet/children/bindingWeChat"
///4.4安全中心
import SecurityCenter from "@/components/userCenter/Children/SecurityCenter"
///4.4.1绑定资金密码
import CapitalCipher from "@/components/accountSet/children/CapitalCipher"
///4.4.2绑定谷歌验证器
import bindingGoogle from "@/components/bindingGoogle/bindingGoogle"
///4.5邀请好友
import friends from "@/components/friends/friends"
///4.5.1邀请规则
import Rule from "@/components/friends/children/Rule"
///4.5.2我的收益
import Invitationdetails from "@/components/friends/children/Invitationdetails"
///4.6关于我们
import Aboutus from "@/components/userCenter/Children/Aboutus"
///4.6.1产品建议
import ProductFeedback from "@/components/userCenter/Children/ProductFeedback"
///4.6.2地址列表
import AddressList from "@/components/userCenter/Children/AddressList"
///4.6.3添加地址
import addAddress from "@/components/userCenter/Children/addAddress"
/*5.主要配置页面*/
import index from "@/components/index"
/*6.登录页面*/
import login from "@/components/login/login"
/*7.设置页面*/
import SetUp from "@/components/userCenter/Children/SetUp"
/*8.注册页面*/
import register from "@/components/register/register"
/*9.找回密码*/
import forget from "@/components/forget/forget";
/*10.k线部分*/
import Kline from "@/components/Kline/Kline"
/*11.空投邀请页面*/
import InvitationCandy from "@/components/InvitationCandy/InvitationCandy"
/*12.空投列表*/
import airdrop from "@/components/airdrop/airdrop";
/*12.1空投详情内容*/
import airdropDetails from "@/components/airdrop/children/airdropDetails"
/*12.2空投规则页面*/
import ActivityRules from "@/components/airdrop/children/ActivityRules"
/*13.超级钱包落地页面*/
import wallet from "@/components/wallet/wallet"
/*14.淘币拉票*/
import MoneyCanvassing from "@/components/MoneyCanvassing/MoneyCanvassing"
/*15.投票页面*/
import vote from "@/components/vote/vote";
/*15.1投票详情*/
import voteDetails from "@/components/vote/children/voteDetails"
/*15.2投票规则*/
import voteRules from "@/components/vote/children/voteRules"
/*16.淘币*/
import Taocoin from "@/components/Taocoin/Taocoin"
/*16.1淘币市场详情*/
import Exchangeofdetails from "@/components/Taocoin/children/Exchangeofdetails"
/*16.2淘币我的兑换*/
import releaseDetails from "@/components/Taocoin/children/releaseDetails"
/*17.开启钱包*/
import OpenWallet from "@/components/capital/children/OpenWallet"
/*18.资产详情*/
import AssetDetails from "@/components/capital/children/AssetDetails"
/*19.兑换（EOS,FO）*/
import Exchange from "@/components/capital/children/exchange"
/*20.兑换落地页*/
import ExchangLanding from "@/components/shouye/children/ExchangLanding"
/*21.常见问题*/
import CommonProblem from "@/components/shouye/children/CommonProblem"
/*22.新超级钱包*/
import newWallet from "@/components/wallet/newWallet"
Vue.use(Router)

export default new Router({
	routes: [{
			path: '/',
			redirect: "/index"
		},
		{ ///未登录邀请页面
			path: "/inviteNoLogin",
			name: "inviteNoLogin",
			component: inviteNoLogin
		},
		{ //空投邀请页面
			path: "/InvitationCandy/:InvitationCode/:CandyId",
			name: "InvitationCandy",
			component: InvitationCandy
		},
		{ //淘币拉票
			path:"/MoneyCanvassing/:InvitationCode/:currEid",
			name:"MoneyCanvassing",
			component:MoneyCanvassing
		},
    { //淘币市场详情
      path:"/Exchangeofdetails/:id",
      name:"Exchangeofdetails",
      component:Exchangeofdetails
    },
    { //淘币我的兑换
      path:"/releaseDetails/:id",
      name:"releaseDetails",
      component:releaseDetails
    },
		{  //共识列表
			path:"/vote",
			name:"vote",
			component:vote
		},
		{  //共识详情
			path:"/voteDetails/:eid",
			name:"voteDetails",
			component:voteDetails
		},
		{ //共识规则
			path:"/voteRules",
			name:"voteRules",
			component:voteRules
		},
		{ //淘币页面
			path:"/Taocoin",
			name:"Taocoin",
			component:Taocoin
		},
		{ /*空投列表页面*/
			path: "/airdropDetails/:id",
			name: "airdropDetails",
			component: airdropDetails
		},
		{ /*空投规则页面*/
			path: "/activityRules",
			name: "activityRules",
			component: ActivityRules
		},
		{ /*空投列表页面*/
			path: "/airdrop",
			name: "airdrop",
			component: airdrop
		},
    { /*资产详情*/
      path:"/AssetDetails/:curId",
      name:"AssetDetails",
      component:AssetDetails
    },
    { /*币种切换落地页*/
      path:"/ExchangLanding",
      name:"ExchangLanding",
      component:ExchangLanding
    },
    { /*币种切换跳转*/
      path:"/Exchange/:toType",
      name:"Exchange",
      component:Exchange
    },
    { /*常见问题*/
      path:"/CommonProblem/:index",
      name:"CommonProblem",
      component:CommonProblem
    },
		{
			path: '/index',
			name: 'index',
			component: index,
			children: [{
					path: "/index",
					redirect: "/index/shouye"
				}, ///重定向
				{
					path: "/index/shouye",
					name: "home",
					component: Home
				}, ///首页
				{
					path: "/index/fbjy",
					name: "otc",
					component: fbjy
				}, //法币交易
				{
					path: "/index/bbjy/macthid:id",
					name: "bbjy",
					component: bbjy
				}, ///币币交易
				{
					path: "/index/userCenter",
					name: "userCenter",
					component: userCenter
				}, ///用户中心
				{ /*超级钱包页面*/
					path: "/index/wallet",
					name: "wallet",
					component: wallet
				},
        { /*新的钱包页面*/
          path:"/index/newWallet",
          name:"newWallet",
          component:newWallet
        },
				{
					path: "/index/register",
					name: "register",
					component: register
				}, //注册
			]
		},
		{ ///公告部分
			path: "/gongGao/:id",
			name: "gongGao",
			component: Notice
		},
		{ ///交易即挖矿介绍
			path: "/TradingRules",
			name: "TradingRules",
			component: TradingRules
		},
		{ //收入折合
			path: "/Fold/:type",
			name: "Fold",
			component: Fold
		},
		{ //imx分配
			path: "/imxRepurchase",
			name: "imxRepurchase",
			component: imxRepurchase
		},
		{ ///身份认证
			path: "/identity",
			name: "identity",
			component: identity
		},
		{ ///实名认证
			path: "/realname",
			name: "realname",
			component: RealName
		},
		{ ///高级认证
			path: "/senior",
			name: "senior",
			component: senior
		},
		{ ///资金管理
			path: "/capital/:index",
			name: "capital",
			component: capital
		},
		{ ///账户设置
			path: "/accountSet",
			name: "accountSet",
			component: accountSet
		},
		{ ///绑定银行卡
			path: "/BankCard",
			name: "BankCard",
			component: BankCard
		},
		{ ///绑定微信
			path: "/bindingWeChat",
			name: "bindingWeChat",
			component: bindingWeChat
		},
		{ ///绑定支付宝
			path: "/bindingAlipay",
			name: "bindingAlipay",
			component: bindingAlipay
		},
		{ ///安全中心
			path: "/SecurityCenter",
			name: "SecurityCenter",
			component: SecurityCenter
		},
		{ ///绑定资金密码
			path: "/CapitalCipher",
			name: "CapitalCipher",
			component: CapitalCipher
		},
		{ ///绑定谷歌验证器
			path: "/bindingGoogle",
			name: "bindingGoogle",
			component: bindingGoogle
		},
		{ ///邀请返佣
			path: "/friends",
			name: "friends",
			component: friends
		},
		{ //我的收益
			path: "/Invitationdetails",
			name: "Invitationdetails",
			component: Invitationdetails
		},
		{ //邀请规则
			path: '/Rule',
			name: "Rule",
			component: Rule
		},
		{ ///充币
			path: "/ChongBi/:curId",
			name: "ChongBi",
			component: ChongBi
		},
		{ ///提币
			path: "/tiBi/:curId?curName",
			name: "tiBi",
			component: tiBi
		},
		{ ///资金记录
			path: "/CapitalRecord",
			name: "CapitalRecord",
			component: CapitalRecord
		},
		{ ///关于我们
			path: "/Aboutus",
			name: "Aboutus",
			component: Aboutus
		},
		{ ///产品反馈
			path: "/ProductFeedback",
			name: "ProductFeedback",
			component: ProductFeedback
		},
		{ ///提币地址
			path: "/AddressList",
			name: "AddressList",
			component: AddressList
		},
		{ //添加地址
			path: "/addAddress",
			name: "addAddress",
			component: addAddress
		},
		{ //登录
			path: "/login",
			name: "login",
			component: login
		},
		{ //找回密码
			path: "/forget",
			name: "forget",
			component: forget
		},
		{ //设置
			path: "/setUp",
			name: "SetUp",
			component: SetUp
		},
		{ //k线图
			path: "/Kline/macthid:id",
			name: "Kline",
			component: Kline
		},
		{ //卖家订单详情
			path: "/sellddxq",
			name: "sellddxq",
			component: sellddxq
		},
		{ //买家订单详情
			path: "/buyddxq",
			name: "buyddxq",
			component: buyddxq
		},
		{ //法币订单
			path: "/fbdd",
			name: "fbdd",
			component: fbdd
		},
		{ //聊天
			path: "/chat/OrderId:id",
			name: "chat",
			component: chat
		},
		{ //邀请好友
			path: "/AllList",
			name: "AllList",
			component: AllList
		},
    { //打开钱包
      path:"/OpenWallet",
      name:"OpenWallet",
      component:OpenWallet
	}
	,
			{
				path: "*",
				redirect: "/"
			  }
	]
})
