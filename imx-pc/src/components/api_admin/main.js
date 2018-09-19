import axios from "axios";
import { mapGetters,mapActions,mapState,mapMutations } from 'vuex'
import { httpUrl } from "../http_url/http_url"
export default {
    data() {
        return {
            tiShi: false,
            /*提示IP输入错误*/
            Remarks: "",
            newDate: 0,
            /*获取当前时间*/
            /*备注*/
            binding: "",
            /*绑定ip地址*/
            /*绑定IP地址*/
            alertIsShow: false,
            /*弹框显示*/
            userList: {
                "mobile": {
                    "title": "",
                    "check": false
                },
                "email": {
                    "title": "",
                    "check": true
                },
                "google": {
                    "title": "Google",
                    "check": false
                }
            },
            /*获取用户信息*/
            pwd: "", ///登陆密码
            email_code: "", ///获取邮箱验证码
            google_code: "", //谷歌验证码
            /*获取用户信息*/
            sendAuthCode: true, ///是否禁用手机获取验证码
            sendAuthCodeEmail: true, //是否禁用邮箱获取验证码
            auth_time: 0, //获取手机验证码倒计时
				email_time: 0, //获取邮箱验证码倒计时
            emailNokong: false,
            /*提示*/
            phoneNokong: false,
            /*提示*/
            googleNokong: false,
            /*提示*/
            createIsShow: false,
				googleText:this.$t("ApiManage.GoogleCdeNotEmpty"),
            /*谷歌提示内容*/
				phoneText: this.$t("login.PasswordCannotEmp"),
            /*密码提示内容*/
				emailText: this.$t("ApiManage.EmailCodeNotEmpty"),
            /*邮箱提示内容*/
            /*创建成功弹出的内容*/
            copySuccess: false,
            /*复制成功按钮*/
            // addressList: [],
            /*获取密钥接口*/
            bianji: false,
            /*编辑选中的对象*/
            bianjiIsShow: false,
            /*编辑成功*/
            limitIsShow: false /*限定条数*/
        }
    },
    async mounted() {
        var curDate = new Date();
        var nextDate = new Date(curDate.getTime()).getTime();
        this.newDate = nextDate;
        // axios.defaults.headers.common['Authorization'] = "Bearer " + this.token;
        /*获取用户信息*/
        // let res = await axios.post(httpUrl.backpassword, {
        //     username: this.getUser
        // },{
		// 	headers: {
		// 		"Authorization": "Bearer " + this.token
		// 	}
		// })
        // this.userList = res.data.data;
        /*复制和粘贴*/
        var clipboard = new Clipboard(".copy");
        clipboard.on("success", (e)=> {
            this.copySuccess = true;
            setTimeout(()=> {
                this.copySuccess = false;
            }, 1000)
        })
        clipboard.on("error", function(e) {
            console.log("复制失败")
        })
        /*获取我的密钥展示内容*/
        await this.changePage(this.page);
        for(let i = 0; i < this.addressList.length; i++) {
            this.addressList[i].isShow = false; //显示隐藏
        }

    },
	computed: {
        // 数组形式，当映射的计算属性的名称与 state 的子节点名称相同时使用
        // 下面为了简便，均以数组形式使用
		...mapState('openApi',[  'last_page','per_page', 'page','httpCode']),
        // 对象形式，可重命名 state 子节点名称
        ...mapState({
            addressList: state => state.openApi.apiList,
			createSuccess: state=>state.openApi.createItem,
			bianjiList: state=>state.openApi.editItem,
        })
    },
    methods: {
		...mapActions('openApi',[
			"getApiList",'removeApiItem','createApi','editApiItem' // 將 `this.getApiList()` 映射為 `this.$store.dispatch('getApiList')`
		]),
		...mapMutations('openApi',['setEditItem']),
        async changePage(val) { //分页
			await this.getApiList(val);
        },
        seeMore(i) {
            this.addressList[i].isShow = !this.addressList[i].isShow;
            if(this.addressList[i].isShow) {
                this.$refs.key[i].nextElementSibling.style.display = "block";
                this.$refs.key[i].innerHTML = this.$t("userCenter.Donotuse");
            } else {
                this.$refs.key[i].nextElementSibling.style.display = "none";
					this.$refs.key[i].innerHTML = this.$t("capital.Viewmore");
            }
        },
        async bianjiClick() { //编辑的确认按钮
            /*请求编辑的接口*/
			await this.editApiItem({eid:this.bianjiList.eid,note:this.Remarks,ips:this.binding})
            //判断编辑是否成功
            if(this.httpCode == 200) {
                this.alertIsShow = false;
                this.Remarks = "";
                this.binding = "";
                this.google_code = "";
                this.email_code = "";
                this.pwd = "";
                this.bianjiIsShow = true;
                this.bianji = false;
                setTimeout(()=> {
                    console.log('adffa',this);
                    this.bianjiIsShow = false
                }, 1000)
            }
            if(this.httpCode == 202) {
					this.phoneText = this.$t("ApiManage.PhoneCodeError");
                this.phoneNokong = true;
                setTimeout(()=> {
                    this.phoneNokong = false;
                }, 1000)
            }
            if(this.httpCode == 201) {
					this.googleText =this.$t("ApiManage.Gvce");
                this.googleNokong = true;
                setTimeout(()=> {
                    this.googleNokong = false;
                }, 1000)
            }
            if(this.httpCode == 203) {
					this.emailText = this.$t("ApiManage.Mvce");
                console.log("邮箱验证码有错误")
                this.emailNokong = true;
                setTimeout(()=> {
                    this.emailNokong = false;
                }, 1000)
            }
            if(this.httpCode == 101) {
                this.alertIsShow = false;
                this.limitIsShow = true;
                setTimeout(()=> {
                    this.limitIsShow = false;
                }, 1500)
            }

        },
        editApi(item) { //编辑api
            this.Remarks = item.note; /*默认显示已经备注文字*/
            this.binding = item.ips; /*默认绑定已经绑定的ip地址*/
            this.bianji = true; /*显示编辑的按钮*/
			this.setEditItem(item);

        },
        createIp() { //判断ip地址是否输入正确
            var _this = this;
            var isTrue = _this.binding.split(',').every(function(ip) {
                return _this.isIp(ip)
            });
            if(_this.binding.length == 0) {
                if(this.bianji){
                    this.bianjiClick();
                }else{
                    _this.alertIsShow = true; /*弹出提交*/
                }

                return false;

            }
            if(_this.binding.length > 0 && isTrue) {
                if(this.bianji){
                    this.bianjiClick();
                }else{
                    _this.alertIsShow = true; /*弹出提交*/
                }
            } else {
                _this.tiShi = true;
                setTimeout(function() {
                    _this.tiShi = false
                }, 1000)
                return false;
            }

        },
        ////安全验证
        async subTow() {
            this.callback(); /*刷新token判断*/
				///判断用户是否输入完整信息
            if(this.pwd == "" ) {
                this.phoneNokong = true;
                setTimeout(function() {
                    this.phoneNokong = false;
                }, 1000)
                return false;
				}
            /*发起请求*/
			await this.createApi({note:this.Remarks,ips:this.binding,pwd:this.pwd});
			if(this.httpCode == 200) {
                this.createIsShow = true;
                this.alertIsShow = false;
                this.Remarks = "";
                this.binding = "";
                this.google_code = "";
                this.email_code = "";
                this.pwd = "";
                /*获取我的密钥展示内容*/
                this.changePage(this.page);
            }
            if(this.httpCode == 202) {
					this.phoneText = this.$t("fbjy.PasswordError");
                this.phoneNokong = true;
                setTimeout(()=> {
                    this.phoneNokong = false;
                }, 1000)
            }
            if(this.httpCode == 101) {
                this.alertIsShow = false;
                this.limitIsShow = true;
                setTimeout(()=> {
                    this.limitIsShow = false;
                }, 1500)
            }

        },
        ///获取手机验证码
        getPhoneYan() {
            var _this = this;
            axios.post(httpUrl.Money_code, {
                    type: 6,
                    receiver_type: 0
                }, {
                    headers: {
                        "Authorization": "Bearer " + _this.token
                    }
                })
                .then(function(res) {
                    ///获取成功
                    _this.sendAuthCode = false;
                    _this.auth_time = 60;
                    var auth_timetimer = setInterval(() => {
                        _this.auth_time--;
                        if(_this.auth_time <= 0) {
                            _this.sendAuthCode = true;
                            clearInterval(auth_timetimer);
                        }
                    }, 1000);

                })
        },
        ////获取邮箱验证码
        getEmailYan() {
            var _this = this;
            axios.post(httpUrl.Money_code, {
                    type: 6,
                    receiver_type: 1
                }, {
                    headers: {
                        "Authorization": "Bearer " + _this.token
                    }
                })
                .then(function(res) {
						///获取成功
                    _this.sendAuthCodeEmail = false;
                    _this.email_time = 60;
                    var auth_timetimer = setInterval(() => {
                        _this.email_time--;
                        if(_this.email_time <= 0) {
                            _this.sendAuthCodeEmail = true;
                            clearInterval(auth_timetimer);
                        }
                    }, 1000)

                })
        },
        ////验证IP地址
        isIp(value) {
            var regexp = /^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/;
            var valid = regexp.test(value);
            if(!valid) { //首先必须是 xxx.xxx.xxx.xxx 类型的数字，如果不是，返回false
                return false;
            }
            return value.split('.').every(function(num) {
                //切割开来，每个都做对比，可以为0，可以小于等于255，但是不可以0开头的俩位数
                //只要有一个不符合就返回false
                if(num.length > 1 && num.charAt(0) === '0') {
                    //大于1位的，开头都不可以是‘0’
                    return false;
                } else if(parseInt(num, 10) > 255) {
                    //大于255的不能通过
                    return false;
                }
                return true;
            });
        }

    }
}
