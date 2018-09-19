<template>
	<div id="Applicationcurrencymore">
		<!--上币申请提交成功-->
		<div class="men_ban" v-if="isSuccess"></div>
		<!--提交成功-->
		<div class="SubmittedSuccessfully" v-if="isSuccess">
			<div class="oleft">
				<i class="iconfont icon-duihao"></i>
			</div>
			<div class="oright">
				<p class="title">{{$t("ApplicationCoin.SubmitSuccess")}}</p>
				<p class="content">{{$t("ApplicationCoin.AppliedProjects")}}</p>
				<p class="button" @click="toGo">
					{{$t("ApplicationCoin.Confirm")}}
				</p>
			</div>
		</div>
		<!--内容部分-->
		<div class="ApplicationcurrencyContent">
			<!--头部-->
			<div class="Applicationcurrency_title">
				<span class="oleft">


          	{{$t("ApplicationCoin.baseMessage")}}
				</span>
        <span class="oright">
					{{$t("ApplicationCoin.AllInfoFilled")}}
				</span>
			</div>
			<!--内容部分-->
			<div class="Applicationcurrency_content">
				<!--内容部分-->
				<div class="item_all">
          <p class="Projectname">
            <span class="red">*</span>{{$t("ApplicationCoin.ts")}}。
          </p>
					<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <div class="warp_outer" >
              <div class="warp" v-if="status==1||status==0"></div>
            <el-form-item :label="$t('ApplicationCoin.ProjectNameEn')"  prop="Englishprojectname">
							<el-input v-model="ruleForm.Englishprojectname"></el-input>
						</el-form-item>
						<el-form-item :label="$t('ApplicationCoin.ProjectNameZh')" prop="Chineseprojectname">
							<el-input  v-model="ruleForm.Chineseprojectname"></el-input>
						</el-form-item>
						<p class="Projectname">
							<span class="red">*</span>{{$t("ApplicationCoin.CoinLogo")}}
						</p>
						<div class="oImg">
							<img src="../../assets/loading1.gif" v-if="oImgIsShow1" />
							<img :src="oImgUrl" v-if="oImgIsShow" />
							<i class="iconfont icon-shangchuantupian"></i>
							<input type="file" @change="addImg($event)" accept="image/png,image/gif,image/jpg,image/jpeg" />
						</div>
						<p class="Suggest">
              {{$t("ApplicationCoin.SupportFormat")}}
						</p>
						<el-form-item :label="$t('ApplicationCoin.FullNameCoinEn')" prop="EnglisCurrency">
							<el-input  v-model="ruleForm.EnglisCurrency"></el-input>
						</el-form-item>
						<el-form-item :label="$t('ApplicationCoin.FullNameCoinZh')" prop="ChinesCurrency">
							<el-input  v-model="ruleForm.ChinesCurrency"></el-input>
						</el-form-item>
						<el-form-item :label="$t('ApplicationCoin.ShortCoinName')" prop="CurrencyIntroduction">
							<el-input  v-model="ruleForm.CurrencyIntroduction"></el-input>
						</el-form-item>
						<el-form-item :label="$t('ApplicationCoin.CoinStandard')" prop="CurrencyStandard" class="select">
							<el-select v-model="ruleForm.CurrencyStandard" :placeholder="$t('ApplicationCoin.ChooseCoinStandard')">
								<el-option label="ERC-20" value="ERC-20"></el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="" prop="CurrencyAddress">
							<p>
								<span class="red">*</span>{{$t("ApplicationCoin.ContractAddr")}}
							</p>
							<el-input v-model="ruleForm.CurrencyAddress"></el-input>
						</el-form-item>
						<el-form-item label="" prop="issuingDate">
							<p>
								<span class="red">*</span>
                {{$t("ApplicationCoin.issuingDate")}}

							</p>
              <el-date-picker class="el-date-pickeri" value-format="yyyy-MM-dd"v-model="ruleForm.issuingDate" type="date" :placeholder='$t("ApplicationCoin.selectNum")'></el-date-picker>
						</el-form-item>

            <el-form-item label="" prop="issuingPrice">
              <p>
                <span class="red">*</span>
                {{$t("ApplicationCoin.issuingPrice")}}

              </p>
              <el-input :placeholder='$t("ApplicationCoin.placeinput")'v-model="ruleForm.issuingPrice">
                <template class="issuing_price_icon" slot="prepend">$</template>
              </el-input>
            </el-form-item>

            <el-form-item label="" prop="issuingCount">
              <p>
                <span class="red">*</span>
                {{$t("ApplicationCoin.issuingCount")}}
              </p>
              <el-input v-model="ruleForm.issuingCount"></el-input>
            </el-form-item>
            <el-form-item label="" prop="circulateCount">
              <p>
                <span class="red">*</span>
                {{$t("ApplicationCoin.circulateCount")}}
              </p>
              <el-input v-model="ruleForm.circulateCount"></el-input>
            </el-form-item>


            <el-form-item label="" prop="DecimalPoint">
              <p>
                <span class="red">*</span>{{$t("ApplicationCoin.DecimalPlaces")}}
              </p>
              <el-input  maxlength="2" v-model="ruleForm.DecimalPoint"></el-input>
            </el-form-item>
						<el-form-item label="" prop="Officialwebsite">
							<p>
								<span class="red">*</span> {{$t("ApplicationCoin.OfficialWebsite")}}
							</p>
							<el-input  v-model="ruleForm.Officialwebsite"></el-input>
						</el-form-item>
            <el-form-item label="" prop="blockBower">
              <p>
                <span class="red">*</span>
                {{$t("ApplicationCoin.blockBower")}}
              </p>
              <el-input v-model="ruleForm.blockBower"></el-input>
            </el-form-item>

						<p class="Projectname1">
							<span class="red">*</span> {{$t("ApplicationCoin.PermanentURL")}}
						</p>
						<el-form-item label="" prop="Whitepaperaddress">
							<el-input    v-model="ruleForm.Whitepaperaddress"></el-input>
						</el-form-item>
            <p class="Projectname">
              <span class="red">*</span> {{$t("ApplicationCoin.WhitePaper")}}
            </p>
            <div class="whitepaper">
              <div class="left">
                <span>{{Englishwhitepaper}}</span>
                <input type="file" @change="addEnglishwhitepaper($event)" accept=".pdf" />
              </div>
              <img src="../../assets/loading2.gif" v-if="pdf1" />
              <span class="geshi" v-if="!pdf1">
								<span class="red">*</span> {{pdfadd1}}
							</span>
            </div>


            <p class="Projectname">
              <span class="red"></span>
              {{$t("ApplicationCoin.Chineswhitepaper")}}
            </p>
            <div class="whitepaper">
              <div class="left">
                <span>{{Chineswhitepaper}}</span>
                <input type="file" @change="addChineswhitepaper($event)"  accept=".pdf" />
              </div>
              <img src="../../assets/loading2.gif"v-if="pdf2" />
              <span class="geshi" v-if="!pdf2">
								<span class="red">*</span>
								{{pdfadd2}}
							</span>
            </div>

            <el-form-item :label="$t('ApplicationCoin.IntroductionEn')" class="IntroductiontoEnglish" prop="IntroductiontoEnglish">
							<el-input type="textarea"   v-model="ruleForm.IntroductiontoEnglish"></el-input>
						</el-form-item>
						<el-form-item :label="$t('ApplicationCoin.IntroductionZh')" class="Chineseintroduction" prop="Chineseintroduction">
							<el-input type="textarea"  v-model="ruleForm.Chineseintroduction"></el-input>
						</el-form-item>
						<el-form-item :label="$t('ApplicationCoin.InviterAccount')" prop="accountNumber">
							<el-input  v-model="ruleForm.accountNumber"></el-input>
						</el-form-item>
						<el-form-item label="" prop="phoneNumber">
							<p>
								<span class="red">*</span> {{$t("ApplicationCoin.DesignatedContactor")}}
							</p>
							<el-input  v-model="ruleForm.phoneNumber"></el-input>
						</el-form-item>
						<!--<div class="checkbox">-->
							<!--<span>{{$t("ApplicationCoin.ConfirmAirdrop")}}</span>-->
							<!--<el-checkbox v-model="checked">{{$t("ApplicationCoin.Yes")}}</el-checkbox>-->
						<!--</div>-->
						<!--<div class="isTrue">-->
							<!--<el-checkbox v-model="checked1">{{$t("ApplicationCoin.AboveContents")}}</el-checkbox>-->
						<!--</div>-->
            <div v-if="moneyIfo.projectEn">
              <div  class="shehitem"> {{$t("ApplicationCoin.checkedAt")}}：{{moneyIfo.checkedAt}}</div>
              <div class="shehitem">{{$t("ApplicationCoin.checkedAt")}}：{{moneyIfo.checkText}}</div>
              <div class="shehitem"> {{$t("ApplicationCoin.checkedAt")}}：{{moneyIfo.onlineAt}}</div>
            </div>
            </div>
						<el-form-item class="margin">
              <el-button v-if="status===3" type="primary" class="marginl" plain @click="back">{{$t("taocoin.Cancel")}}</el-button>
              <el-button v-if="status===3" type="primary" :disabled="oImgUrl=='' || pdf1Url==''" @click="submitForm('ruleForm',1)">{{$t("login.Submit1")}}</el-button>
              <el-button v-if="status===-1" type="primary" :disabled="oImgUrl=='' || pdf1Url==''" @click="submitForm('ruleForm',2)"> {{$t(ApplicationCoin.resubmit)}}</el-button>
              <el-button v-if="status===1||status===0" type="primary"   @click="back2">{{$t("ApplicationCoin.back")}}</el-button>
						</el-form-item>
					</el-form>
				</div>

			</div>

		</div>
	</div>
</template>

<script>
	import axios from "axios";
	import { httpUrl } from "../http_url/http_url"
	export default {
		data() {
			var validateAmount = (rule, value, callback) => {
				if(value === '') {
					callback(new Error(this.$t("ApplicationCoin.WebsiteNotEmpty")));
				} else {
					callback();
				}
			}
			var validateAddress = (rule, value, callback) => {
				if(value === '') {
					callback(new Error(this.$t("ApplicationCoin.WhitePaperAddr")));
				}else {
					callback();
				}
			}
			var DecimalPointNumber = (rule, value, callback) => {
				if(value === '') {
					callback(new Error(this.$t("ApplicationCoin.DecimalNOtEmp")));
				} else if(!/^[0-9]*[1-9][0-9]*$/.test(value)) {

					callback(new Error(this.$t("ApplicationCoin.EnterPositive")));
				}else if(value>18){
					callback(new Error(this.$t("ApplicationCoin.Decimalmaximum")));
				}else {
					callback();
				}
			}
			var isNum = (rule, value, callback) => {
				if(value === '') {
					callback(new Error(this.$t("ApplicationCoin.PhoneNumNotEmpty")));
				} else if(!/^[0-9]*[1-9][0-9]*$/.test(value)) {
					callback(new Error(this.$t("ApplicationCoin.EnterCorrectNum")));
				} else {
					callback();
				}
			}
			var isUrl=(rule,value,callback)=>{
        if(value === '') {
          callback(new Error(this.$t("ApplicationCoin.her1")));
        } else if(!/(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&:/~\+#]*[\w\-\@?^=%&/~\+#])?/.test(value)) {
          callback(new Error(this.$t("ApplicationCoin.her2")));
        } else {
          callback();
        }
      }
			var CurrencyAddressOne = (rule, value, callback) => {
				if(value === '') {
					callback(new Error(this.$t("ApplicationCoin.ContractAddrNotEmpty")));
				// } else if(!/^[\da-zA-Z]+$/.test(value)) {
				// 	callback(new Error(this.$t("ApplicationCoin.Pleaseenter")));
				// } else if(value.length>191){
				// 	callback(new Error(this.$t("ApplicationCoin.Pleaseenter")));
				} else {
					callback();
				}
			}
			return {
				oImgUrl: "",
				checked1: false,
				/*同意*/
				oImgIsShow: false,
				/*正常图片*/
				oImgIsShow1: false,
				/*loading*/
				isSuccess: false,
				/*判断是否成功申请*/
				pdf1: false,
				/*loading1*/
				pdf1Url: "",
				/*pdf上传成功地址*/
				pdfadd1: this.$t("ApplicationCoin.UploadFilesFormat"),
				pdfadd2: this.$t("ApplicationCoin.UploadFilesFormat"),
				prompt:this.$t("ApplicationCoin.ReviewAndOnline"),
				pdf2: false,
				/*loading2*/
				pdf2Url: '',
				/*pdf上传成功地址*/
				Englishwhitepaper: this.$t("ApplicationCoin.PleaseUploadWhiteWrap"),
				Chineswhitepaper: this.$t("ApplicationCoin.PleaseUploadZh"),
				/*判断图片是否上传*/
				checked: false,
				/*是否空投*/
				ruleForm: {
					Chineseprojectname: '',
					/*中文项目名称*/
					Englishprojectname: "",
					/*英文项目名称*/
					ChinesCurrency: "",
					/*币种中文全称*/
					EnglisCurrency: "",
					/*币种英文全称*/
					CurrencyIntroduction: "",
					/*币种简介*/
					CurrencyStandard: "",
					/*币种标准*/
					CurrencyAddress: "",
					/*币种地址*/
          issuingDate:'',
          /*发行日期*/
          issuingPrice:'',
          /*发行价格*/
          issuingCount:'',
          /*发行总量*/
          circulateCount:'',
          /*流通数量*/
          Officialwebsite: "http://",
					/*官网网站*/
          blockBower: "http://",
					/*区块链浏览器*/
					Whitepaperaddress: "http://",
					/*永久链接到白皮书的地址*/
					IntroductiontoEnglish: "",
					/*英文介绍*/
					Chineseintroduction: "",
					/*中文介绍*/
					accountNumber: "",
					/*推荐人账号*/
					phoneNumber: "" ,/*指定联系人手机号*/
          DecimalPoint:''
				},
				rules: {
				  // 发行日期
          issuingDate:[{
            required: true,
            message: this.$t("ApplicationCoin.issuingDateErr"),
            trigger: 'blur'
          }],
				  // 发行价格
          issuingPrice:[{
            required: true,
            message:  this.$t("ApplicationCoin.issuingPriceErr"),
            trigger: 'blur'
          }],
				  // 发行总量
          issuingCount:[{
            required: true,
            message:  this.$t("ApplicationCoin.issuingCountErr"),
            trigger: 'blur'
          }],
				  // 流通数量
          circulateCount:[{
            required: true,
            message:  this.$t("ApplicationCoin.circulateCountErr"),
            trigger: 'blur'
          }],
				  // 邀请人
          accountNumber:[{
            required: true,
            message:  this.$t("ApplicationCoin.accountNumberErr"),
            trigger: 'blur'
          }],
          // 区块链浏览器
          blockBower: [{
            validator: isUrl,
            trigger: 'blur'
          }],
          //永久链接到白皮书的地址
          Officialwebsite: [{
            validator: isUrl,
            trigger: 'blur'
          }],


					Chineseintroduction: [{
						min: 10,
						max: 1000,
						message: this.$t("ApplicationCoin.ProjectNameNotLess"),
						trigger: 'blur'
					}],
					IntroductiontoEnglish: [{
							required: true,
							message: this.$t("ApplicationCoin.IntroNnotEmpty"),
							trigger: 'blur'
						},
						{
							min: 10,
							max: 1000,
							message: this.$t("ApplicationCoin.ProjectNameNotLess"),
							trigger: 'blur'
						}
					],
					Englishprojectname: [{
							required: true,
							message: this.$t("ApplicationCoin.ProjectNameNotEmp"),
							trigger: 'blur'
						},
						{
							min: 1,
							max: 50,
							message: this.$t("ApplicationCoin.ProjectNameNotLess3Ch"),
							trigger: 'blur'
						}
					],
					Chineseprojectname: [{
						min: 1,
						max: 50,
						message: this.$t("ApplicationCoin.ProjectNameNotLess3Ch"),
						trigger: 'blur'
					}],
					EnglisCurrency: [{
							required: true,
							message: this.$t("ApplicationCoin.CoinNamenotEmpty"),
							trigger: 'blur'
						},
						{
							min: 1,
							max: 30,
							message: this.$t("ApplicationCoin.CoinFullNotLess"),
							trigger: 'blur'
						}
					],
					ChinesCurrency: [{
						min: 1,
						max: 30,
						message: this.$t("ApplicationCoin.CoinFullNotLess"),
						trigger: 'blur'
					}],
					CurrencyIntroduction: [{ /*币种简介*/
							required: true,
							message: this.$t("ApplicationCoin.ShortNameNotEmpty"),
							trigger: 'blur'
						},
						{
							min: 1,
							max: 8,
							message: this.$t("ApplicationCoin.CoinShortNnotLess"),
							trigger: 'blur'
						}
					],
					CurrencyAddress: [{ /*币种地址*/
						validator: CurrencyAddressOne,
						trigger: 'blur'
					}],
					DecimalPoint: [{ /*小数点位数*/
						validator: DecimalPointNumber,
						trigger: 'blur'
					}],
					Officialwebsite: [{
						validator: isUrl,
						trigger: 'blur'
					}],
					Whitepaperaddress: [{ /*白皮书地址*/
						validator: validateAddress,
						trigger: 'blur'
					}],
					CurrencyStandard: [{ /*币种标准*/
						required: true,
						message:this.$t("ApplicationCoin.ChooseCoinStandard"),
						trigger: 'change'
					}],
					phoneNumber: [{
						validator: isNum,
						trigger: 'blur'
					}]
				},
        //当前的审核状态
        status:3,
        // 当前上币填写信息
        moneyIfo:''
			};
		},
		mounted() {
			if(this.token == null && this.token == undefined) {
				this.$router.push({
					name: "login"
				})
			}

			//从router获取表单数据
			if(this.$route.params.projectEn){
        this.moneyIfo=this.$route.params;
        this.status=  parseInt(this.$route.params.status);
        let moneyifo =this.$route.params;

        let ruleForm=this.ruleForm;
        ruleForm.Chineseprojectname= moneyifo.projectZh,
          /*中文项目名称*/
          ruleForm. Englishprojectname=moneyifo.projectEn,
          /*英文项目名称*/
          ruleForm.ChinesCurrency=moneyifo.zhName,
          /*币种中文全称*/
          ruleForm.EnglisCurrency=moneyifo.fullName,
          /*币种英文全称*/
          ruleForm.CurrencyIntroduction=moneyifo.pageIdentifier,
          /*币种简称*/
          ruleForm.CurrencyStandard=moneyifo.norm,
          /*币种标准*/
          ruleForm.CurrencyAddress=moneyifo.pactUrl,
          /*币种地址*/
          ruleForm.Officialwebsite=moneyifo.officiaWebsite,
          /*官网网站*/
          ruleForm.Whitepaperaddress=moneyifo.whitePaperUrl,
          /*白皮书地址*/
          ruleForm.IntroductiontoEnglish=moneyifo.summaryEn,
          /*英文介绍*/
          ruleForm.Chineseintroduction=moneyifo.summary,
          /*中文介绍*/
          ruleForm.accountNumber=moneyifo.referee_number,
          /*推荐人账号*/
          ruleForm.phoneNumber=moneyifo.contacts_mobile,/*指定联系人手机号*/
          ruleForm.issuingDate=moneyifo.release_at,
          /*发行日期*/
          ruleForm.issuingPrice=moneyifo.releasePriceStr,
          /*发行价格*/
          ruleForm.issuingCount=moneyifo.releaseCount,
          /*发行总量*/
          ruleForm.circulateCount=moneyifo.numInCirculation,
          /*流通数量*/
          ruleForm.blockBower= moneyifo.blockChainExplorer,
          ruleForm.DecimalPoint= moneyifo.digit
        /*区块链浏览器*/
        this.oImgUrl =moneyifo.logoUrl;
        this.oImgIsShow=true;
        this.pdf1Url =moneyifo.whitePaperEn;
        this.pdf2Url =moneyifo.whitePaperZh;
        this.Englishwhitepaper="白皮书已上传";
        this.Chineswhitepaper="白皮书已上传";
      }

		},
    computed:{
    },
    created() {

		},

		methods: {
			toGo(){
				this.$router.push({
					path: "/index/Home"
				});
			},
      back(){
        this.$alert('您确认要放弃编辑吗', '友情提示', {
          confirmButtonText: '确定',
          callback: action => {
            this.$router.go(-1);//返回上一层
          }
        });
      },
      back2(){
        this.$router.go(-1);//返回上一层
      },
			noKong(e){  /*禁止输入空格*/
				e.target.value = e.target.value.replace(/\s+/g,'');
			},
			 generateUID() {
				// I generate the UID from two parts here
				// to ensure the random number provide enough bits.
				let firstPart = (Math.random() * 46656) | 0;
				let secondPart = (Math.random() * 46656) | 0;
				firstPart = ("000" + firstPart.toString(36)).slice(-3);
				secondPart = ("000" + secondPart.toString(36)).slice(-3);
				return JSON.stringify(new Date()).split('T')[0].replace(/-|"/g,'')+firstPart + secondPart;
			},
			 async uploadFile(file){
				let config = await axios.get(httpUrl.uploadSet, {
					params: {
						mimes: file.type,
						size:file.size
					},
					headers: {
						"Authorization": "Bearer " + this.token
					}
				});
				let param = new FormData(); //创建 form对象
				let fileName = 'currency' + this.generateUID()
				param.append("OSSAccessKeyId",config.data.data.accessKeyId);
				param.append("policy",config.data.data.policy);
				param.append("signature",config.data.data.signature);
				param.append("key",fileName);
				param.append('file', file); //通过append向form对象添加数据
				console.log(fileName);
				// await Promise.resolve('');
				let res  = await axios.post(config.data.data.url, param, {
					headers: {
						'Content-Type': 'multipart/form-data'
					}
				})
				return config.data.data.url+'/'+fileName;
			},
			async addEnglishwhitepaper(e) { /*上传英文白皮书*/
				var file = e.target.files[0];
				if(file == undefined) {
					return false;
				}
				this.pdf1 = true; /*loading*/
				var size = Math.ceil(file.size / 1000);
				if(size > 5 * 1024) {
					this.$message({
						message: this.$t("ApplicationCoin.ReSelect"),
						type: 'warning'
					});
					return false;
				}
				const path = await this.uploadFile(file);
				this.pdf1 = false; /*loading*/
				this.pdf1Url = path;
				this.pdfadd1 = this.$t("ApplicationCoin.SuccessfulUpload");
				this.Englishwhitepaper = file.name;

			},
						addChineswhitepaper(e){	 /*上传中文白皮书*/
							let _this = this;
							var file = e.target.files[0];
							if(file==undefined){
								return false;
							}
							_this.pdf2 = true;		/*loading*/
							var param = new FormData(); //创建 form对象
							param.append('file', file); //通过append向form对象添加数据
							param.append('mimes', file.name.split(".")[1]); //文件格式
							param.append('size', file.size); //文件大小(KB)
							axios.post(httpUrl.uploadFile,param,{
									headers: {
											"Authorization": "Bearer " + _this.token,
											'Content-Type': 'multipart/form-data'
										}
							}).then(function(res){
								_this.pdf2 = false;		/*loading*/
								_this.pdf2Url = res.data.data;
								_this.pdfadd2 = "上传成功";
								_this.Chineswhitepaper = file.name;
							},function(err){
								console.log(err)
							})
						},
			async addImg(e) { /*上传币种logo*/
				var file = e.target.files[0];
				if(file == undefined) {
					return false;
				}
				var size = Math.ceil(file.size / 1000);
				if(size > 500) {
					this.$message({
						message: this.$t("ApplicationCoin.UploadedPhotoLarger"),
						type: 'warning'
					});
					return false;
				}
				//提示用户上传文件
				if(file.name != "") {
					this.SelectWeChatImg = false;
					this.SelectWeChatText = file.name;
				}
				this.oImgIsShow1 = true; /*loading*/
				const path = await this.uploadFile(file);
				this.oImgUrl = path;
				this.oImgIsShow1 = false; /*loading*/
				this.oImgIsShow = true; /*图片*/

			},
			submitForm(formName,type) { /*提交表单*/
				let _this = this;
				// if(this.checked1==false){
				// 	this.prompt = _this.$t("ApplicationCoin.confirmTheContent");
				// 	setTimeout(function(){
				// 		_this.prompt = _this.$t("ApplicationCoin.ReviewAndOnline")
				// 	},1000)
				// 	return false;
				// }
				this.$refs[formName].validate((valid) => {
					if(valid) {
						/*判断是否填写*/
						let obj = {

              projectEn: _this.ruleForm.Englishprojectname,
              logoUrl: _this.oImgUrl,
              fullName: _this.ruleForm.EnglisCurrency,
              pageIdentifier: _this.ruleForm.CurrencyIntroduction,
              norm: _this.ruleForm.CurrencyStandard,
              pactUrl: _this.ruleForm.CurrencyAddress,
              officiaWebsite: _this.ruleForm.Officialwebsite,
              whitePaperEn: _this.pdf1Url,
              whitePaperUrl: _this.ruleForm.Whitepaperaddress,
              summaryEn: _this.ruleForm.IntroductiontoEnglish,

							// is_airdrop: _this.checked,
							contacts_mobile: _this.ruleForm.phoneNumber,
              //推荐人
							referee_number: _this.ruleForm.accountNumber,
							digit: _this.ruleForm.DecimalPoint,
                release_at:_this.ruleForm.issuingDate,
              /*发行日期*/
                releasePriceStr:_this.ruleForm.issuingPrice,
              /*发行价格*/
                releaseCount:_this.ruleForm.issuingCount,
              /*发行总量*/
                numInCirculation:_this.ruleForm.circulateCount,
              /*流通数量*/
              blockChainExplorer:_this.ruleForm.blockBower
            /*区块链浏览器*/
						};
						if(_this.ruleForm.ChinesCurrency!=""){
							obj.zhName = _this.ruleForm.ChinesCurrency;
						}
						if(_this.ruleForm.Chineseintroduction!=""){
							obj.summary = _this.ruleForm.Chineseintroduction;
						}
						if( _this.pdf2Url!=""){
							obj.whitePaperZh = _this.pdf2Url;
						}
						if(_this.ruleForm.Chineseprojectname!=""){
							obj.projectZh = _this.ruleForm.Chineseprojectname;
						}
						if(_this.ruleForm.ChinesCurrency!=""){
							obj.zhName = _this.ruleForm.ChinesCurrency;
						}
						if(_this.ruleForm.accountNumber!=""){
							obj.referee_number = _this.ruleForm.accountNumber;
						}
            let bcobj;
            if(type==1){
              bcobj=  axios.post(httpUrl.matchCoinApply,obj, {
                headers: {
                  "Authorization": "Bearer " + _this.token
                }
              })
            }else{
              obj.eid=_this.moneyIfo.eid;
              bcobj= axios.put(httpUrl.matchCoinApply,obj, {
                headers: {
                  "Authorization": "Bearer " + _this.token
                }
              })
            }
            bcobj.then(function(res) {
							if(res.data.status.code == 200) {
								_this.isSuccess = true;
								console.log(obj);
                console.log("我提交成功了")

							}
						}, function(err) {
							console.log(err)
							console.log("我没有通过")
						})
					} else {
					  console.log('未验证通过')
						return false;
					}
				});
			}
		}
	}
</script>
<style lang="scss">
	#Applicationcurrencymore {
		/*改变element-ui的变化*/

    /*取消按钮*/
    .marginl{
      margin-right: 50px;
      background:#17172b;
    }
    .el-form-item__error {
      color: #e23a2d;
      font-size: 12px;
      line-height: 1;
      padding-top: 4px;
      position: absolute;
      left: 600px;
      top: 52px;
      width: 300px;
    }

    /*datepacike长度*/
    .el-date-pickeri{
      width: 100%;
    }
    /*发行价格图标样式*/

    .el-input-group__prepend{
      background: #101034;
      color: #fff;
     border-color: #2c3983;
    }


		.el-form-item {
			height: 90px;
			margin-bottom: 15px;
		}
		.margin {
			width: 200%;
			margin-top: 50px;
		}
		.el-form-item__content {
			margin: 0 !important;
		}
		.el-form-item__label:before {
			color: #e23a2d;
		}
		.el-form-item__label {
			width: 100% !important;
			display: block;
			color: #bdc1e4;
			text-align: left;
		}
		.el-textarea__inner {
			height: 90px;
			border: 1px solid #2c3983;
			background: #101034;
			color: #fff;
		}
		.el-form-item__error {
			color: #e23a2d;
		}
		.select .el-select {
			width: 100%;
		}
		.el-input__inner {
			width: 100%;
			height: 45px !important;
			color: #fff;
			border: 1px solid #2c3983;
			background: #101034;
		}
		/*按钮大小*/
		.el-button--primary {
			width: 160px !important;
			height: 40px !important;
			background-color: #6666fa !important;
			border: 1px solid #6666fa !important;
		}
		.el-input__inner::-webkit-input-placeholder {
			color: #fff;
		}
		.IntroductiontoEnglish,
		.Chineseintroduction {
			height: 135px;
		}
		.el-checkbox__label {
			width: 100%;
			color: #fff;
		}
		.is-checked .el-checkbox__inner {
			background: #949bf8;
			border: 1px solid #949bf8;
			white-space: initial;
		}
		.isTrue .el-checkbox{
			display: flex;
			align-items: center;
			white-space: initial;
		}
		.el-checkbox__input.is-checked+.el-checkbox__label {
			color: #949bf8;
		}
	}
</style>

<style lang="scss" scoped>
	$bgcolor:#16172c;
  .shehitem{
    line-height: 30px;
    margin-top: 10px;
    font-size:12px;
  }
  .warp_outer{
    position: relative;
  }
  .warp{
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    z-index: 666;
  }
	#Applicationcurrencymore {
		width: 100%;
		min-height: 100%;
		color: #fff;
		background: #242541;
		padding-top: 5px;
	}
	.isTrue{
		width: 150%;
	}
	.prompt {
		display: inline-block;
		margin-left: 10px;
		color: #e23a2d;
	}
	/*蒙版内容*/

	.men_ban {
		width: 100%;
		height: 100%;
		background: rgba(0, 0, 0, 0.5);
		position: fixed;
		left: 0;
		top: 0;
		z-index: 666;
	}

	.checkbox {
		line-height: 50px;
		span {
			font-size: 14px;
			margin-right: 30px;
		}
	}

	.SubmittedSuccessfully {
		position: fixed;
		left: 50%;
		top: 50%;
		margin-left: -250px;
		margin-top: -150px;
		width: 500px;
		height: 300px;
		background: #22233f;
		z-index: 999;
		box-sizing: border-box;
		padding: 0 20px;
		display: flex;
		align-items: center;
		justify-content: space-between;
		.oleft {
			width: 120px;
			height: 120px;
			border-radius: 50%;
			border: 2px solid #8080b8;
			text-align: center;
			line-height: 120px;
			.iconfont {
				font-size: 80px;
				color: #6eda85;
			}
		}
		.oright {
			width: 300px;
			.title {
				font-size: 18px;
				height: 40px;
			}
			.content {
				height: 60px;
				font-size: 15px;
				line-height: 25px;
			}
			.button {
				width: 185px;
				height: 50px;
				border: 1px solid #fff;
				border-radius: 5px;
				text-align: center;
				line-height: 50px;
				margin-top: 35px;
				cursor: pointer;
			}
		}
	}

	.item_all {
		width: 500px;
		/*上传图片部分*/
		.Projectname {
			font-size: 14px;
			margin-top: 20px;
		}
		.Projectname1 {
			font-size: 14px;
			margin: 20px 0;
		}
		.Suggest {
			line-height: 30px;
			color: #b0b1e9;
			font-size: 14px;
			margin-bottom: 10px;
		}
		/*上传白皮书*/
		.whitepaper {
			width: 100%;
			display: flex;
			align-items: center;
			.left {
				width: 50%;
				height: 45px;
				border: 1px solid #2c3983;
				background: #101034;
				text-align: center;
				line-height: 45px;
				margin: 20px 0;
				position: relative;
				white-space: nowrap;
				text-overflow: ellipsis;
				overflow: hidden;
				font-size: 14px;
				border-radius: 4px;
				input {
					width: 100%;
					height: 100%;
					position: absolute;
					left: 0;
					top: 0;
					z-index: 66;
					opacity: 0;
				}
			}
			img {
				margin-left: 30px;
			}
			.geshi {
				margin-left: 20px;
			}
		}
		.oImg {
			width: 180px;
			height: 180px;
			border: 1px solid #2c3983;
			background: #101034;
			text-align: center;
			line-height: 180px;
			margin: 15px 0;
			position: relative;
			img {
				position: absolute;
				left: 0;
				top: 0;
				width: 100%;
				height: 100%;
			}
			input {
				width: 100%;
				height: 100%;
				position: absolute;
				left: 0;
				top: 0;
				z-index: 66;
				outline: none;
				opacity: 0;
			}
			.iconfont {
				font-size: 60px;
			}
		}
	}
	.ApplicationcurrencyContent {
		width: 1200px;
		box-sizing: border-box;
		margin: 0 auto;
		.Applicationcurrency_title {
			width: 100%;
			height: 90px;
			background: $bgcolor;
			line-height: 90px;
			box-sizing: border-box;
			padding: 0 30px;
			margin: 40px 0;
			border-radius: 4px;
			display: flex;
			justify-content: space-between;
			align-items: center;
			.oleft {
				font-size: 18px;
			}
			.oright {
				font-size: 13px;
			}
		}
		.Applicationcurrency_content {
			width: 100%;
			box-sizing: border-box;
			padding: 10px 40px;
			background: $bgcolor;
			border-radius: 4px;
			color: #bdc1e4;
			.red {
				font-size: 16px;
				color: #e23a2d;
			}
			.title {
				font-size: 16px;
				margin: 35px 0;
			}
		}
	}
</style>

