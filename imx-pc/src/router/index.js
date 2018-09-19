import Vue from 'vue'
import Router from 'vue-router'
////路由配置
////////////////首页+包括导航部分
import Index from "@/components/index";
///////导航头部内容
//1.币币交易
import bbjy from "@/components/bbjy/bbjy"
///1.1币种资料中的了解更多
import bzzl from "@/components/public/bzzl"
///1.2右侧卖出买入中的查看更多
import ckgd from "@/components/public/ckgd"
//2.淘币
import Taocoin from "@/components/Taocoin/Taocoin"
//2.1兑换淘币内容
import Exchange from "@/components/Taocoin/children/Exchange"
//2.2兑换详情内容
import Exchangeofdetails from "@/components/Taocoin/children/Exchangeofdetails"
//2.3兑换成功
import SuccessfulRedemption from "@/components/Taocoin/children/SuccessfulRedemption";
//3.法币交易
import fbjy from "@/components/fbjy/fbjy"
//34.法币交易的订单详情
import ddxq from "@/components/fbjy/ddxq"
//4.上币中心
import sbzx from "@/components/sbzx/sbzx"
//5.帮助中心
import bzzx from "@/components/bzzx/bzzx"
//6.首页
import shouye from "@/components/shouye/shouye"
//6.1交易即挖矿介绍
import transactionTransaction from "@/components/shouye/children/introduce"
//7.登录
import login from "@/components/login/login"
///7.1忘记密码
import forget from "@/components/public/forget"
//8.注册
import register from "@/components/register/register"
//9.用户中心
import userCenter from "@/components/userCenter/userCenter"
////9.1账号安全部分
import Account_security	from "@/components/userCenter/children/Account_security";
////9.2身份认证
import identity from "@/components/userCenter/children/identity"
////9.3账户安全部分
import zhanghu from "@/components/userCenter/children/zhanghu"
////9.4我的点卡部分
import myCard from "@/components/userCenter/children/myCard"
////10.资金管理
import capital from "@/components/capital/capital"
////10.1 交易账户
import Trading_account from "@/components/capital/children/Trading_account"
////10.2 冲币
import Red_Coins from "@/components/capital/children/Red_Coins"
////10.3 提币
import tiBi from "@/components/capital/children/tibi"
////10.4 资金记录
import money_Record from "@/components/capital/children/money_Record"
////10.5提币地址
import Currency_address from "@/components/capital/children/Currency_address"
////11.API管理
import api_admin from "@/components/api_admin/api_admin"
////12.费率
import rate from "@/components/rate/rate"
////12.1交易手续费
import transaction from "@/components/rate/children/transaction"
////12.2VIP费率折扣
import transactionvip from "@/components/rate/children/transactionvip"
////13.内容部分
import notice from "@/components/notice/notice"
////14.详情部分
import details from "@/components/notice/details"
////15.我的邀请码
import My_Invitation_Code from "@/components/InvitationCode/InvitationCode"
////15.1邀请榜单
import InvitationList from "@/components/InvitationCode/children/List"
////16.注册用户协议
import Agreement from "@/components/public/Agreement"
////16.1用户隐私协议
import Privacy from "@/components/public/Privacy"
////17.高级帮组中心
import Help from "@/components/public/Help"
////18.交易规则
import TradingRules from "@/components/public/jygz"
////19.收益记录
import RevenueRecord from "@/components/capital/children/RevenueRecord"
////20.收益折合详情
import AccumulationOfAssets from "@/components/shouye/children/AccumulationOfAssets"
////21.邀请(未登录)
import inviteFriends from "@/components/shouye/children/inviteFriends"
////22.回购详情
import Repurchasedetails from "@/components/shouye/children/Repurchasedetails"
////23.淘币详情
import  TaocoinDetails   from "@/components/Taocoin/children/TaocoinDetails"
////23.申请币种
import  Applicationcurrency from "@/components/ApplicationCurrency/Applicationcurrency"
///24.空投
import Airdrop from "@/components/airdrop/airdrop"
///25.空投详情
import AirdropDetails from "@/components/airdrop/children/airdropDetails"
///26.投票共识
import vote from "@/components/vote/vote"
///26.1共识详情
import voteDetails from "@/components/vote/children/voteDetails"
///27.超级钱包
import wallet from "@/components/wallet/wallet"
///淘币页面兑换规则
import TaocoinExchangeRules from "@/components/Taocoin/children/TaocoinExchangeRules"
///超级节点介绍
import supperNode from "@/components/supperNode/supperNode"
///节点详情
import supperNodeDetails from "@/components/supperNode/children/supperNodeDetails"
///IMX平台上币规则
import currencyRules from "@/currencySystem/children/currencyRules"
///上币流程页面宣传页
import voteCoinProcess from "@/currencySystem/children/voteCoinProcess"
///上币申请第一页
import currencySystem from "@/currencySystem/currencySystem"
// 上币资料填写
import Applicationcurrencymore from "@/components/ApplicationCurrencyMore/Applicationcurrencymore"
// 落地活动页
import activity from "@/components/activity/activity"
//投票上币由你做主
import voteCoin from "@/components/voteCoin/voteCoin"
//身份验证
import Authentication from "@/components/userCenter/children/Authentication"
Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      redirect:"/index"
    },
    {path:"/Agreement",component:Agreement},	 //用户协议部分
    {path:"/Privacy",component:Privacy},       //用户隐私协议
    {path:"/Help",component:Help},						 //高级认证部分
    {
    	path:"/index",
    	component:Index,
    	children:[
      	{path:"/index",redirect:"/index/Home"},				 //重定向
    		{path:"/index/Home",component:shouye},				 //首页
        {path:"/index/transactionTransaction",name:"toTransactionTransaction",component:transactionTransaction},     //交易简介
    		{path:"/index/inviteFriends",name:"inviteFriends",component:inviteFriends},  //邀请(未登录)
    		{path:"/index/Repurchasedetails",name:"Repurchasedetails",component:Repurchasedetails},  //回购详情
    		{path:"/index/notice",component:notice},				 //公告内容部分
    		{path:"/index/details/:id",name:"details",component:details},				 //公告详情部分
    		{path:"/index/trade/macthid:id",name:"bbjy",component:bbjy},  					 //币币交易
    		{path:"/index/bzzl/:id",name:"bzzl",component:bzzl}, //币币交易下的币种资料
    		{path:"/index/More/macthid:id",name:"More",component:ckgd},          	 //币币交易下的查看更多
    		{path:"/index/Taocoin",name:"Taocoin",component:Taocoin},	 								 //淘币
    		{path:"/index/Exchange",name:"exchange",component:Exchange},    //淘币兑换
    		{path:"/inded/SuccessfulRedemption",name:"successfulRedemption",component:SuccessfulRedemption},  //兑换成功
    		{path:"/index/Exchangeofdetails/:id",name:"Exchangeofdetails",component:Exchangeofdetails},  //兑换详情
    		{path:"/index/TaocoinDetails/:id",name:"TaocoinDetails",component:TaocoinDetails},     //淘币详情
    		{path:"/index/otc",name:"otc",component:fbjy},	 					 //法币交易
    		{path:"/index/ddxq/:id",name:"ddxq",component:ddxq},						 //法币交易订单详情
    		{path:"/index/sbzx",component:sbzx},	 					 //上币中心
    		{path:"/index/Help",component:bzzx},	 					 //帮助中心
    		{path:"/index/login",name:"login",component:login}, 				   //登录
    		{path:"/index/forget",name:"forget",component:forget},         //忘记密码
    		{path:"/index/register",name:"register",component:register}, 	   //注册
    		{path:"/index/api_admin",component:api_admin},   //用户API管理
    		{path:"/index/InvitationCode",name:"InvitationCode",component:My_Invitation_Code},  //我的邀请码
    		{path:"/index/InvitationList",component:InvitationList},  //邀请榜单
    		{path:"/TradingRules",component:TradingRules},	 //交易规则
        {path:"/TaocoinExchangeRules",name:"TaocoinExchangeRules",component:TaocoinExchangeRules},
        {path:"/index/RevenueRecord",component:RevenueRecord}, //收益记录
    		{path:"/index/AccumulationOfAssets/:type",name:"AccumulationOfAssets",component:AccumulationOfAssets}, //首页收益折合
    		{path:"/index/Applicationcurrency",component:Applicationcurrency},         //申请上币
    		{name:'moneyUp',path:"/index/Applicationcurrencymore", components: { default: Applicationcurrencymore},props: { default: true}},           // 0 上币信息填写 ,1 上币信息查看,2上币信息修改
    		{path:"/index/Airdrop",name:"Airdrop",component:Airdrop},   //空投
    		{path:"/index/AirdropDetails/:id",name:"AirdropDetails",component:AirdropDetails}, //空投详情页面
    		{path:"/index/vote",name:"vote",component:vote},  //投票共识页面
    		{path:"/index/voteDetails/:id",name:"voteDetails",component:voteDetails}, //投票共识详情页面
    		{path:"/index/wallet",name:"wallet",component:wallet},  //超级钱包
        {path:"/index/supperNode",name:"supperNode",component:supperNode}, //超级节点介绍
        {path:"/index/supperNodeDetails",name:"supperNodeDetails",component:supperNodeDetails}, //节点详情
        {path:"/index/currencyRules",name:"currencyRules",component:currencyRules}, //IMX平台上币规则
        {path:"/index/voteCoinProcess",name:"voteCoinProcess",component:voteCoinProcess}, //投票上币流程
        {path:"/index/currencySystem",name:"currencySystem",component:currencySystem}, //上币申请第一页
        {path:"/index/voteCoin",name:"voteCoin",component:voteCoin}, //投票上币 由你做主
        {path:"/index/activity",component:activity}, //fo 兑 eos 落地页面；
    		{
    			path:"/index/rate",																//费率
    			component:rate,
    		  	children:[
    				{path:"/index/rate",redirect:"/index/rate/transaction"},
    				{path:"/index/rate/transaction",component:transaction},  /////账号安全部分
    				{path:"/index/rate/transactionvip",component:transactionvip},									////身份认证部分
    			]
    		},
    		{
    			path:"/index/userCenter",																									//用户中心
    			component:userCenter,
    			children:[
    				{path:"/index/userCenter",redirect:"/index/userCenter/Accountsecurity/no"},
    				{path:"/index/userCenter/Accountsecurity/:bangdin",name:"Accountsecurity",component:Account_security},  /////账号安全部分
    				{path:"/index/userCenter/identity/:type",name:"identity",component:identity},	////身份认证部分
            {path:"/index/userCenter/Authentication",name:"Authentication",component:Authentication}, //实名认证+高级认证
    				{path:"/index/userCenter/zhanghu",name:"zhanghu",component:zhanghu},										////账户部分
    				{path:"/index/userCenter/myCard",component:myCard}											///我的点卡部分
    			]
    		},
    		{
    			path:"/index/capital",																										//资金管理
    			component:capital,
    			children:[
    				{path:"/index/capital",redirect:"/index/capital/Trading_account"},
    				{path:"/index/capital/Trading_account",name:"Trading_account",component:Trading_account}, 			 /////账户交易
    				{path:"/index/capital/Red_Coins",name:"Red_Coins",component:Red_Coins},		////充币
    				{path:"/index/capital/tibi",name:"tibi",component:tiBi},									////提币
    				{path:"/index/capital/money_Record",component:money_Record},							 ///资金记录
    				{path:"/index/capital/Currency_address",component:Currency_address}				 ///提币地址
    			]
			},
			{
				path: "*",
				redirect: "/"
			  }
    	]
    }
  ]
})
