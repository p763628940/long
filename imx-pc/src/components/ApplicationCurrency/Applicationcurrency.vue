<template>
	<div id="Applicationcurrency">
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
					{{$t("ApplicationCoin.NewCoinWallet")}}
				</span>
				<span class="oright">
					{{$t("ApplicationCoin.AllInfoFilled")}}
				</span>
			</div>
			<!--内容部分-->
			<div class="Applicationcurrency_content">
				<!--内容部分-->
				<div class="item_all">
					<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item :label="$t('ApplicationCoin.FullNameCoinEn')" prop="EnglisCurrency">
              <el-input  v-model="ruleForm.EnglisCurrency"></el-input>
            </el-form-item>
            <el-form-item :label="$t('ApplicationCoin.FullNameCoinZh')" prop="ChinesCurrency">
              <el-input  v-model="ruleForm.ChinesCurrency"></el-input>
            </el-form-item>
            <el-form-item :label="$t('ApplicationCoin.ShortCoinName')" prop="CurrencyIntroduction">
              <el-input  v-model="ruleForm.CurrencyIntroduction"></el-input>
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

						<el-form-item :label="$t('ApplicationCoin.CoinStandard')" prop="CurrencyStandard" class="select">
							<el-select v-model="ruleForm.CurrencyStandard" :placeholder="$t('ApplicationCoin.ChooseCoinStandard')">
								<el-option label="ERC-20" value="1"></el-option>
                <el-option :label="$t('ApplicationCoin.others')" value="0"></el-option>
							</el-select>
						</el-form-item>
            <!--<el-form-item label="" prop="publishTimeChe">-->
              <!--<p>-->
                <!--<span class="red">*</span>发行时间-->
              <!--</p>-->
              <!--<div>-->
                <!--<el-date-picker-->
                  <!--v-model="publishTime"-->
                  <!--type="date"-->
                  <!--placeholder="选择日期">-->
                <!--</el-date-picker>-->
              <!--</div>-->
            <!--</el-form-item>-->
            <el-form-item required>
              <p>
                <span class="red">*</span>{{$t("ApplicationCoin.IssueTime")}}
              </p>
              <div>
                <el-form-item prop="publishTime">
                  <el-date-picker
                    v-model="ruleForm.publishTime"
                    type="datetime"
                    value-format="yyyy-MM-dd hh:mm:ss"
                    :placeholder="$t('ApplicationCoin.PleaseChooseIssueTime')"
                  >
                  </el-date-picker>
                </el-form-item>
              </div>
            </el-form-item>
            <el-form-item label="" prop="publishVolume">
              <p>
                <span class="red">*</span>{{$t("ApplicationCoin.TotalAmount")}}
              </p>
              <el-input maxLength="15" :placeholder="$t('ApplicationCoin.eg')" v-model="ruleForm.publishVolume"></el-input>
            </el-form-item>
            <el-form-item label="" prop="circulateVolume">
              <p>
                <span class="red">*</span>{{$t("ApplicationCoin.TotalCirculation")}}
              </p>
              <el-input maxLength="15" :placeholder="$t('ApplicationCoin.eg')" v-model="ruleForm.circulateVolume"></el-input>
            </el-form-item>
            <el-form-item >
              <p>
                {{$t("ApplicationCoin.TokenPrice")}}
              </p>
              <el-input maxLength="30" :placeholder="$t('ApplicationCoin.eg1')" v-model="ruleForm.CrowdfundingPrice"></el-input>
            </el-form-item>
						<el-form-item label="" prop="CurrencyAddress">
							<p>
								<span class="red">*</span>{{$t("ApplicationCoin.ContractAddr")}}
							</p>
							<el-input maxLength="191" v-model="ruleForm.CurrencyAddress"></el-input>
						</el-form-item>
            <el-form-item label="" prop="BlockchainAddress">
              <p>
                <span class="red">*</span>{{$t("ApplicationCoin.BlockchainAddress")}}
              </p>
              <el-input maxLength="100" v-model="ruleForm.BlockchainAddress"></el-input>
            </el-form-item>
            <p class="">
              <span class="red">*</span> {{$t("ApplicationCoin.WhitePaper")}}
            </p>
            <div class="whitepaper">
              <div class="left">
                <span v-show="!SuccessfulUpload">
                  {{$t("ApplicationCoin.PleaseUploadWhiteWrap")}}
                </span>
                <span v-show="SuccessfulUpload">{{Englishwhitepaper}}</span>
                <input type="file" @change="addEnglishwhitepaper($event)" accept=".pdf" />
              </div>
              <img src="../../assets/loading2.gif" v-if="pdf1" />
              <span class="geshi" v-if="!pdf1">
								<span class="red">*</span>
                <span v-show="SuccessfulUpload">{{$t("ApplicationCoin.SuccessfulUpload")}}</span>
                <span  v-show="!SuccessfulUpload">{{$t("ApplicationCoin.UploadFilesFormat")}}</span>
							</span>
            </div>
            <!--<p class="">
                            <span class="red">*</span> 白皮书（中文版）
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
                        </div>	-->
            <p class="Projectname1">
              <span class="red">*</span> {{$t("ApplicationCoin.PermanentURL")}}
            </p>
            <el-form-item label="" prop="Whitepaperaddress" class="ProjectContent">
              <el-input  maxLength="100"  v-model="ruleForm.Whitepaperaddress"></el-input>
            </el-form-item>
						<el-form-item label="" prop="Officialwebsite">
							<p>
								<span class="red">*</span> {{$t("ApplicationCoin.OfficialWebsite")}}
							</p>
							<el-input maxLength="100" v-model="ruleForm.Officialwebsite"></el-input>
						</el-form-item>
						<el-form-item :label="$t('ApplicationCoin.CoinBriefIntroductionEnglish')" class="IntroductiontoEnglish" prop="IntroductiontoEnglish">
							<el-input type="textarea"   v-model="ruleForm.IntroductiontoEnglish"></el-input>
						</el-form-item>
						<el-form-item :label="$t('ApplicationCoin.CoinBriefIntroductionChinese')" class="Chineseintroduction" prop="Chineseintroduction">
							<el-input type="textarea"  v-model="ruleForm.Chineseintroduction"></el-input>
						</el-form-item>
            <el-form-item :label="$t('ApplicationCoin.CoinDetailsChinese')" class="IntroductiontoEnglish" prop="DetailedIntroductionZh">
              <el-input type="textarea"   v-model="ruleForm.DetailedIntroductionZh"></el-input>
            </el-form-item>
            <el-form-item :label="$t('ApplicationCoin.CoinDetailsEnglish')" class="Chineseintroduction" prop="DetailedIntroductionEn">
              <el-input type="textarea"  v-model="ruleForm.DetailedIntroductionEn"></el-input>
            </el-form-item>
						<div class="isTrue">
							<el-checkbox v-model="checked1">{{$t("ApplicationCoin.AboveContents")}}</el-checkbox>
						</div>
						<el-form-item class="margin">
							<el-button type="primary" :disabled="oImgUrl=='' || pdf1Url==''" @click="submitForm('ruleForm')">{{$t("login.Submit1")}}</el-button>
							<span class="prompt">
								{{prompt}}
							</span>
						</el-form-item>
					</el-form>
				</div>
        <hr class="hr"/>
        <ul class="ContactInformation">
          <li class="title">{{$t("ApplicationCoin.questions")}}</li>
          <li>
            <span>{{$t("ApplicationCoin.WeChat")}}：</span>
            <img src="../../assets/sky.jpeg" alt="">
          </li>
          <li>
            <span>{{$t("userCenter.Email")}}：</span>
            sky@imx.com
          </li>
        </ul>
			</div>

		</div>
	</div>
</template>

<script>
	import axios from "axios";
	import { httpUrl } from "../http_url/http_url"
	export default {
		data() {
      let reUrl01 =  /^((ht|f)tps?):\/\/([\w-]+(\.[\w-]+)*\/?)+(\?([\w\-\.,@?^=%&:\/~\+#]*)+)?$/;
      var validateAmount = (rule, value, callback) => {
				if(value === '') {
					callback(new Error(this.checkLang('WebsiteNotEmpty')));
				}else if(!reUrl01.test(value)){
          callback(new Error(this.checkLang('WhitePaperStart')));
        } else {
					callback();
				}
			}
			var validateAddress = (rule, value, callback) => {
				if(value === '') {
					callback(new Error(this.checkLang('WhitePaperAddr')));
				}else if(!reUrl01.test(value)){
          callback(new Error(this.checkLang('WhitePaperStart')));
        } else {
					callback();
				}
			}
      var BlockchainAddress = (rule, value, callback) => {
        if(value === '') {
          callback(new Error(this.checkLang('BlockchainAddressCannotBeEmpty')));
        }else if(!reUrl01.test(value)){
          callback(new Error(this.checkLang('WhitePaperStart')));
        } else {
          callback();
        }
      }

			var isNum = (rule, value, callback) => {
				if(value === '') {
					callback(new Error(this.checkLang('PhoneNumNotEmpty')));
				} else if(!/^[0-9]*[1-9][0-9]*$/.test(value)) {
					callback(new Error(this.checkLang('EnterCorrectNum')));
				} else {
					callback();
				}
			}
			var CurrencyAddressOne = (rule, value, callback) => {
				if(value === '') {
					callback(new Error(this.checkLang('ContractAddrNotEmpty')));
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

				pdf2: false,
				/*loading2*/
				pdf2Url: "",
				/*判断图片是否上传*/
				ruleForm: {
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
					Officialwebsite: "",
					/*官网网站*/
					Whitepaperaddress: "",
					/*白皮书地址*/
					IntroductiontoEnglish: "",
					/*英文介绍*/
					Chineseintroduction: "",
					/*中文介绍*/
          publishTime:"", /*发行的 年 月 日 时 分 秒*/
          publishVolume:"", /*发行总量*/
          circulateVolume:"",/*流通总量*/
          CrowdfundingPrice:"", /*众筹价格*/
          BlockchainAddress:"", /*区块链地址*/
          DetailedIntroductionZh:"",/*币种详细介绍中文*/
          DetailedIntroductionEn:"", /*币种详细介绍英文*/
          langText:"", /*语言文字*/
          Englishwhitepaper:"",
				},
        Englishwhitepaper:this.$t("ApplicationCoin.PleaseUploadWhiteWrap"),
        pdfadd1:this.$t("ApplicationCoin.UploadFilesFormat"),
        SuccessfulUpload:false, /*是否上传成功*/
				rules: {
          publishTime:[
            {type: 'string', required: true, message: this.checkLang('PleaseChooseIssueTime'), trigger: 'change'}
          ],
          publishVolume:[
            {required: true, message: this.checkLang('PleaseEnterTotalAmount'), trigger: 'blur'}
          ],
          circulateVolume:[
            {required: true, message: this.checkLang('PleaseEnterTotalCirculation'), trigger: 'blur'}
          ],
          BlockchainAddress:[
            { /*白皮书地址*/
              validator: BlockchainAddress,
              trigger: 'blur'
            }
          ],
          DetailedIntroductionZh:[{
            required: true,
            message: this.checkLang('CoinDetailsCannotBeEmpty'),
            trigger: 'blur'
          }],
          DetailedIntroductionEn:[{
            required: true,
            message: this.checkLang('CoinDetailsCannotBeEmpty'),
            trigger: 'blur'
          }],
					Chineseintroduction: [{
            required: true,
            message: this.checkLang('CoinBriefIntroductionsCannotBeEmpty'),
            trigger: 'blur'
          },{
						min: 10,
						max: 2000,
						message: this.checkLang('maxMinLength'),
						trigger: 'blur'
					}],
					IntroductiontoEnglish: [{
							required: true,
							message: this.checkLang('CoinBriefIntroductionsCannotBeEmpty'),
							trigger: 'blur'
						},
						{
							min: 10,
							max: 2000,
							message: this.checkLang('ProjectNameNotLess'),
							trigger: 'blur'
						}
					],
					EnglisCurrency: [{
							required: true,
							message: this.checkLang('CoinNamenotEmpty'),
							trigger: 'blur'
						},
						{
							min: 1,//
							max: 50,
							message: this.checkLang('CoinFullNotLess'),
							trigger: 'blur'
						}
					],
					ChinesCurrency: [{
            required: true,
            message: this.checkLang('CoinNamenotEmpty'),
            trigger: 'blur'
          },{
            required: true,
						min: 1,
						max: 50,
						message: this.checkLang('CoinFullNotLess'),
						trigger: 'blur'
					}],
					CurrencyIntroduction: [{ /*币种简介*/
							required: true,
							message: this.checkLang('ShortNameNotEmpty'),
							trigger: 'blur'
						},
						{
							min: 1,
							max: 10,
							message: this.checkLang('CoinShortNnotLess'),
							trigger: 'blur'
						}
					],
					CurrencyAddress: [{ /*币种地址*/
						validator: CurrencyAddressOne,
						trigger: 'blur'
					}],
					Officialwebsite: [{
						validator: validateAmount,
						trigger: 'blur'
					}],
					Whitepaperaddress: [{ /*白皮书地址*/
						validator: validateAddress,
						trigger: 'blur'
					}],
					CurrencyStandard: [{ /*币种标准*/
						required: true,
						message:this.checkLang('ChooseCoinStandard'),
						trigger: 'change'
					}],
				}
			};
		},
    computed:{
      pdfadd2(){
        return this.$t("ApplicationCoin.UploadFilesFormat");
      },
      prompt(){
        return this.$t("ApplicationCoin.ReviewAndOnline");
      },
      Chineswhitepaper(){
        return this.$t("ApplicationCoin.PleaseUploadZh");
      },
      closure () {
        return lang => {
          /** do something  */
          return this.$t("ApplicationCoin."+this.langText);
        }
      }
    },
		mounted() {
			if(this.token == null && this.token == undefined) {
				this.$router.push({
					name: "login"
				})
			}

		},

		methods: {
      checkLang(lang){
        return this.$t("ApplicationCoin."+lang);
      },
			toGo(){
				this.$router.push({
					path: "/index/Home"
				});
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
				this.Englishwhitepaper = file.name;
        this.SuccessfulUpload = true; /*上传成功*/
			},
			//			addChineswhitepaper(e){	 /*上传中文白皮书*/
			//				let _this = this;
			//				var file = e.target.files[0];
			//				if(file==undefined){
			//					return false;
			//				}
			//				_this.pdf2 = true;		/*loading*/
			//				var param = new FormData(); //创建 form对象
      //				param.append('file', file); //通过append向form对象添加数据
			//				param.append('mimes', file.name.split(".")[1]); //文件格式
			//				param.append('size', file.size); //文件大小(KB)
			//				axios.post(httpUrl.uploadFile,param,{
			//						headers: {
			//								"Authorization": "Bearer " + _this.token,
			//								'Content-Type': 'multipart/form-data'
			//							}
			//				}).then(function(res){
			//					_this.pdf2 = false;		/*loading*/
			//					_this.pdf2Url = res.data.data;
			//					_this.pdfadd2 = "上传成功";
			//					_this.Chineswhitepaper = file.name;
			//				},function(err){
			//					console.log(err)
			//				})
			//			},
			async addImg(e) { /*上传币种logo*/
				var file = e.target.files[0];
				if(file == undefined) {
					return false;
				}
				var size = Math.ceil(file.size / 1000);
				if(size > 1000) {
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
			submitForm(formName) { /*提交表单*/
				let _this = this;
				if(this.checked1==false){
					this.prompt = _this.$t("ApplicationCoin.confirmTheContent");
					setTimeout(function(){
						_this.prompt = _this.$t("ApplicationCoin.ReviewAndOnline")
					},1000)
					return false;
				}
				this.$refs[formName].validate((valid) => {
					if(valid) {
					  let newDate = _this.publishTime + " "+_this.publishTime1;
						/*判断是否填写*/
						let obj = {
							logoUrl: _this.oImgUrl,
							fullName: _this.ruleForm.EnglisCurrency,
							zhName: _this.ruleForm.ChinesCurrency,
							pageIdentifier: _this.ruleForm.CurrencyIntroduction,
              isErc20: _this.ruleForm.CurrencyStandard,
							pactUrl: _this.ruleForm.CurrencyAddress,
							officiaWebsite: _this.ruleForm.Officialwebsite,
							whitePaperEn: _this.pdf1Url,
							whitePaperZh: _this.pdf1Ur2,
							whitePaperUrl: _this.ruleForm.Whitepaperaddress,
							summaryEn: _this.ruleForm.IntroductiontoEnglish,
              summary: _this.ruleForm.Chineseintroduction,
              contentZh:_this.ruleForm.DetailedIntroductionZh,
              contentEn:_this.ruleForm.DetailedIntroductionEn,
              crowdfundingPrice:_this.ruleForm.CrowdfundingPrice,
              publishTime:_this.formatTime(_this.ruleForm.publishTime),
              circulateVolume:_this.ruleForm.circulateVolume,
              publishVolume:_this.ruleForm.publishVolume,
              blockQuery:_this.ruleForm.BlockchainAddress,
            };
						axios.post(httpUrl.currencyApply,obj, {
							headers: {
								"Authorization": "Bearer " + _this.token
							}
						}).then(function(res) {
							if(res.data.status.code == 200) {
								_this.isSuccess = true;
							}
						}, function(err) {
							console.log(err)
						})
					} else {
						return false;
					}
				});
			}
		}
	}
</script>
<style lang="scss">
	#Applicationcurrency {
    .el-col{
      .el-form-item{
        height: auto;
      }
    }
		/*改变element-ui的变化*/
		.el-form-item {
			height: 90px;
			margin-bottom: 15px;
		}
    .el-form-item.ProjectContent{
      height: auto;
    }
		.margin {
			width: 200%;
			margin-top: 50px;
		}
		.el-form-item__content {
			margin: 0 !important;
      .line{
        text-align: center;
      }
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
    .el-input__inner::-webkit-input-placeholder{
      color: #6d6da0 !important;
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
	#Applicationcurrency {
		width: 100%;
		min-height: 100%;
		color: #fff;
		background: #242541;
		padding-top: 5px;
	}
	.isTrue{
		width: 150%;
    margin-top: 30px;
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
.hr{
  border-color: #eee;
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
  .ContactInformation{
    li{
      font-size: 14px;
      margin-bottom: 15px;
      img{
        width: 150px;
        height: 150px;
      }
    }
  }
</style>

