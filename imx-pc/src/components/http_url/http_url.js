let localhostDev;
if(location.host.indexOf("imx.com") != -1) {
	localhostDev = true;
} else {
	localhostDev = false;
}
// localhostDev=true;
//如果是本地开发，就把localhostDev 设置成true，连接就是拼成‘http://localhost:8080/api/test’
//生产环境，就把localhostDev 设置成false，连接就是拼成‘http://xxx.com/api/test’
let _host = localhostDev ? 'https://api.imx.com' : '//api.tanghs.com';
// _host = 'http://api.freecoin.test';
let httpUrl = {
	'host': _host,
	'getVserion': _host + "/api/v1/getVserion", ////获取版本号码
	'userInfo': _host + '/api/v1/userinfo', ////获取用户信息
	'coin_matching': _host + '/api/v1/coin_matching', ///获取所有币对
	'buy_sell_queue': _host + "/api/v1/transaction/buy_sell_queue", //买卖队列
	'lang': _host + "/api/v1/config/lang", //获取语言包
	'login': _host + "/api/v1/token", //登录
	'register': _host + "/api/v1/register", //注册
	'send_validator_message': _host + '/api/v1/send_validator_message', ///获取登录注册验证码
	"country": _host + "/api/v1/country", ////获取国家信息
	"coinDetailed": _host + "/api/v1/coinDetailed", ////币详细介绍
	'host': _host,
	"plate_income": _host + "/api/v1/tradingfees/plate_income",
	/*平台返还累积*/
	"ptsswitch": _host + "/api/v1/pts/switch",
	/*切换点卡*/
	"rebateRecord": _host + "/api/v1/rebateRecord",
	/*平台返还收益记录*/
	"repoRecord": _host + "/api/v1/tradingfees/repoRecord",
	/*回购记录*/
	"rule": _host + "/api/v1/tradingfees/rule",
	/*发行量*/
	"personalInfo": _host + "/api/v1/personalInfo", //活动期间用户详情
	"uploadCard": _host + "/api/v1/face/uploadCard", //上传身份证信息
	"uploadCardPath": _host + "/api/v1/face/uploadCardPath", //根据路径上传身份证信息
	"uploadSet": _host + "/api/v1/uploadSet", //获取上传配置
	"seniorInfo": _host + "/api/v1/face/seniorInfo", //高级认证详情
	"invitationRecord": _host + "/api/v1/invitationRecord", //个人邀请记录
	"list": _host + "/api/v1/inviting/list", //邀请返利榜单
	"maidRecord": _host + "/api/v1/maidRecord", //返佣记录
	"userID": _host + "/api/v1/token_user_id", ///获取用户id
	"group": _host + "/api/v1/tradingfees/group", //获取回购总量 ---(待删)
	"shishi": _host + 　"/api/v1/transaction/realtimeDone",
	"limit": _host + "/api/v1/transaction/limit", //限价交易
	"amount": _host + "/api/v1/transaction/now", //市价交易
	"my_follow": _host + "/api/v1/my_follow", ////获取收藏列表
	"follow_matchcoin": _host + "/api/v1/follow_matchcoin", ////点击收藏
	"current": _host + "/api/v1/transaction/current", ////当前委托
	"history": _host + "/api/v1/transaction/history", ////历史委托
	"back": _host + "/api/v1/transaction/back", ////撤单
	"finances": _host + "/api/v1/finances", ////资产信息
	"currency": _host + "/api/v1/currency", ////获取币种信息
	"backpassword": _host + "/api/v1/backpassword", ////找回密码
	"getyan": _host + "/api/v1/send_back_password_message",
	　　　　 ////找回密码获取验证码
	"backPassValidator": _host + "/api/v1/backPassValidator", ////安全验证提交
	"resetPassword": _host + 　"/api/v1/resetPassword",
	　　　　　　　　 ///重置密码　　　
	"upDatatoken": _host + "/oauth/token", ///刷新token
	'oauth':_host + '/api/v1/oauth',
	"client_secret": "0Xq3xPo255u69f01v1jWpzC7s15hr3AzjvLkCTZD", ////要用到的串
	"client_id": "2", ////测试用的ID
	"modifyPassword": _host + "/api/v1/password", ///修改密码
	"bind": _host + "/api/v1/bind", ///绑定邮箱或者手机号
	"createSecret": _host + "/api/v1/createSecret", ///生成Google密钥
	"bindGoogleSecret": _host + "/api/v1/bindGoogleSecret", ///绑定googl密钥
	"verifyGoogleCode": _host + "/api/v1/verifyGoogleCode", ///验证code
	"loginGoogleCode": _host + "/api/v1/loginGoogleCode", ///登录状态
	"login_log": _host + "/api/v1/login_log", ///登录历史
	"settingPaypass": _host + "/api/v1/settingPaypass", ///设置或修改支付密码
	"Money_code": _host + "/api/v1/send_setting_pay_message", ///点击发送资金验证码
	"getFaceToken": _host + "/api/v1/getFaceToken", ///高级认证获取二维码
	"setIdcard": _host + "/api/v1/setIdcard", ///填写身份信息
	"bankList": _host + "/api/v1/bankList", ///银行列表
	"addCard": _host + "/api/v1/addCard", ///添加银行卡
	"getReceipList": _host + "/api/v1/getReceipList", ///获取交易方式列表
	"addReceip": _host + "/api/v1/addReceip", ///绑定微信支付宝
	"paymentSwitch": _host + 　"/api/v1/paymentSwitch", ///指定打开方式
	"finances": _host + "/api/v1/finances", ///获取资产信息
	"wallet_address": _host + "/api/v1/wallet/deposit", ///获取用户的钱包地址
	"currencyList": _host + "/api/v1/currencyList", ///在用币种列表
	"addressList": _host + "/api/v1/addressList", ///地址列表
	"addressHistory": _host + "/api/v1/addressHistory", ///指定币种的历史地址
	"currencyBalance": _host + "/api/v1/currencyBalance", ///获取用户指定币种的余额
	"recharge": _host + "/api/v1/financeLog", ///交易记录
	"sendForm": _host + "/api/v1/wallet/withdraw", ///提币
	"addressCreate": _host + "/api/v1/addressCreate", ///地址添加
	"addressDel": _host + "/api/v1/addressDel", ///地址删除
	"checkAddress": _host + "/api/v1/checkAddress", ///地址输入验证
	"transactionRate": _host + "/api/v1/transactionRate", ///获取币对费率
	"newsImportant": _host + "/api/v1/newsImportant", ///重要公告列表
	"newslist": _host + "/api/v1/newslist", ///全部公告列表
	"newsDetils": _host + "/api/v1/newsDetils", ///公告详情
	"createApi": _host + "/api/v1/openApi", ///创建api
	"listApi": _host + "/api/v1/openApi", ///api列表
	"delApi": _host + "/api/v1/openApi", ///api删除
	"editApi": _host + "/api/v1/openApi", ///api编辑
	"invitedList": _host + "/api/v1/invitedList", ///获取邀请记录
	"kline": _host + "/api/v1/kline", ///获取币对k线
	"pointCardBalance": _host + '/api/v1/pointCardBalance', // 获取点卡余额
	////////////法币交易
	"getToken": _host + "//api/v1/getToken?userId=", ///推送
	"getscjUrl": _host + "/api/v1/getLatestPrice", ///获取挂单买卖市场参考价
	"getbzUrl": _host + "/api/v1/mainCurrency", ///获取币种路径
	"getmmddUrl": _host + "/api/v1/goodsList", ///挂单买卖可交易法币列表路径
	"getwdddUrl": _host + "/api/v1/myBlaceOrder", ///获取我的订单
	"getgdlistUrl": _host + "/api/v1/myPurOrder", ///获取挂单列表路径
	"getjyfsUrl": _host + "/api/v1/getReceipList", ///获取交易方式列表
	"getisbzyeUrl": _host + "/api/v1/currencyBalance", /// 获取挂单买卖余额
	"getggxqUrl": _host + "/api/v1/purDetails", ///广告详情
	"postxdgmUrl": _host + "/api/v1/ticket", ///下单购买
	"postxdmcUrl": _host + "/api/v1/sellOut", ///下单卖出
	"sendBuy": _host + "/api/v1/sendBuy", ///提交信息
	"postdelUrl": _host + "/api/v1/delOrder", ///删除订单
	"postxjUrl": _host + "/api/v1/cancelPur", ///挂单列表下架
	"postputUrl": _host + "/api/v1/editPurchase", ///编辑挂单列表提交
	"getkjyfbUrl": _host + "/api/v1/getLegaltender", ///默认获取挂单
	"getssyyUrl": _host + "/api/v1/appealCates", ///申诉原因路径
	"getltjlUrl": _host + "/api/v1/getChatRecord", ///拉取聊天记录
	"getddxqUrl": _host + "/api/v1/orderDetails", ///获取订单详情路径
	"getltztUrl": _host + "/api/v1/onlineState", ///获取用户登录信息
	"ykfkqrUrl": _host + "/api/v1/confirmPurchase", ///游客确认支付
	"shfkqrUrl": _host + "/api/v1/buyersConfirm", ///商户确认支付
	"qrssUrl": _host + "/api/v1/orderLock", ///确认申述
	"postqxssUrl": _host + "/api/v1/orderUnlock", ///取消申述
	"postykqrfxUrl": _host + "/api/v1/touristSellersConfirm", ///游客确认放行
	"postshqrfxUrl": _host + "/api/v1/confirmBusiness", ///商户确认放行
	"postltxxUrl": _host + "/api/v1/sendMsg", ///发送聊天文本内容
	"qxddUrl": _host + "/api/v1/cancelOrder", ///取消订单
	"getjxzddUrl": _host + "/api/v1/unfinishedOrder", ///获取进行中订单
	/////////////////////////////邀请好友///////////
	"assetInfo": _host + "/api/v1/assetInfo", ///邀请好友个人资产详情
	"invitedList": _host + "/api/v1/invitedList", /// 获取邀请返利记录
	"earningsInfo": _host + "/api/v1/earningsInfo", ///邀请好友收益详情
	"identityList": _host + "/api/v1/identityList", ///高级身份申请列表
	"applyIdentity": _host + "/api/v1/applyIdentity", ///高级身份申请
	//////////淘币模块////////
	"uploadFile": _host + "/api/v1/uploadFile",///上传文件
	"currencyApply":_host +"/api/v1/currencyApply",	///用户信息币种列表
	"currencyNaught":_host + "/api/v1/naught/currency", ///币的列表
	"publish":_host + "/api/v1/naught/publish",    //要淘币
	 "goods":_host + "/api/v1/naught/goods",       //淘币市场
	 "incoin":_host + "/api/v1/naught/incoin",       //淘币中列表
	 "myOrder":_host + "/api/v1/naught/myOrder",   //我淘的币
	  "brush": _host + "/api/v1/naught/brush",			//刷新排名
	  "lower":_host + "/api/v1/naught/lower",           //下架
	  "info":_host + "/api/v1/naught/info",                //兑币详情
	  "place":_host + "/api/v1/naught/place",           //下单
	  "childOrder":_host  + "/api/v1/naught/childOrder",   //兑换列表
	   ///////空投接口////
	  "airDropCurrency":_host + "/api/v1/airDropCurrency",   //空投列表
	   "Qrcode":_host  + "/api/v1/storeQrcode",						//生成二维码
	   "uploadDropLog":_host + "/api/v1/uploadDropLog",		//空投日志
		//////共识列表//////
		"consensus":_host + "/api/v1/consensus",  		//共识列表
    ////超级钱包////
    "sendOpenWallet":_host + "/api/v1/sendOpenWallet", //发送开启钱包的验证码
    "walletOn":_host + "/api/v1/walletOn",    //开启钱包
    "financeAssets":_host + "/api/v1/financeAssets",//钱包资产列表
    "searchToken":_host + "/api/v1/searchToken",  //token搜索
    "financeSave":_host + "/api/v1/financeSave",  //币种操作
    "addContract":_host + "/api/v1/addContract",   //添加合约币种
    "currencyWallet":_host + "/api/v1/currencyWallet", //提币币种列表
    "matchCoinApply":_host + "/api/v1/matchCoinApply", //用户币种申请信息列表 和 详情 ，创建上币详情 上币信息编辑
    "supperNode":_host + "/api/v1/userExtra",//超级节点列表
    "currencyConvertPrice":_host + "/api/v1/currencyConvertPrice",//币种兑换价格
    "currencyConvert":_host + "/api/v1/currencyConvert",//提交兑换
    "currencyConvertKLine":_host + "/api/v1/currencyConvertKLine", //k线详情
    "banner":_host + "/api/v1/banner"   //用户轮播图
};

export {
	httpUrl
};
