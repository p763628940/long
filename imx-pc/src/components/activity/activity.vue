<template>
<div  id="activity" :class="[en_or_zh=='zh-CN' ? 'ban1': 'ban2', 'activity']">
  <!--蒙版-->
  <div class="men_ban" v-if="isQimg"></div>
  <div class="shareIt" v-if="isQimg">
    <div class="title">
      <span>{{$t('activity.Share')}}</span>
      <i class="iconfont icon-cuowu" @click="isQimg=false"></i>
    </div>
    <div class="oImg">
      <img :src="addQrImg" />
      <p class="oUrl">{{yaoUrl}}</p>
      <ul class="shareItWrapper">
        <li class="active_color" @click="tabColor(0)">
          <i class="iconfont icon-weixin1"></i>
        </li>
        <li @click="tabColor(1)">
          <i class="iconfont icon-weibo"></i>
        </li>
        <li @click="tabColor(2)">
          <i class="iconfont icon-qq"></i>
        </li>
        <li class="copy" data-clipboard-action="copy" data-clipboard-target=".oUrl">
          <i class="iconfont icon-lianjie "></i>
        </li>
      </ul>
    </div>
  </div>
  <div class="activity_con">
    <div class="fowhat">
      <div class="fx" @click="shareIt"></div>
      <div class="item_inner">
        <div class="fowhat_tit actit" >
       {{$t("activity.What")}}
        </div>
        <div class="fowhat_con">
          <div class="fowhatl"></div>
          <div class="fowhatr">
            <div>● {{$t("activity.fo1")}}</div>
            <div>● {{$t("activity.fo2")}}</div>
            <div>● {{$t("activity.fo3")}}</div>
            <div>● {{$t("activity.fo4")}}</div>
          </div>
        </div>
      </div>

    </div>
    <div class="zst">
      <div class="item_inner">
        <div class="zst_tit actit">
         {{$t("activity.zstit")}}(1 EOS≈{{eos_to_fo}} FO)
        </div>
        <div class="zst_con" id="zst_con">
        </div>
        <div class="footer_text">
          {{$t("activity.gf")}}

        </div>
      </div>

    </div>
    <div class="activity_tit">
      <div class="activity_tit_con">
        <div  @click="settype(1)" :class="[nowtype==1 ? 'actit': '','cu']" >{{$t("activity.fd")}}</div>
        <div class="ga">|</div>
        <div @click="settype(2)" :class="[nowtype==2 ? 'actit': '','cu']">{{$t("activity.ef")}}</div>
      </div>
    </div>
    <div class="act_content">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm">
        <div :class="[nowtype==1 ? 'left15': '', 'dia_con']">
          <div class="dia_con_item">

            <div class="dia_con_itemll">
              <div class="dia_con_itemllt">
                <div class="dia_con_item_l1t lin30 font14"  v-if="nowtype==1">{{$t("capital.foAmount")}}</div>
                <div class="dia_con_item_l1t lin30  font14"  v-if="nowtype==2">{{$t("capital.eosAmount")}}</div>
                <div class="dia_con_item_l2t lin30" v-if="nowtype==1">{{$t("capital.balance")}}：{{balance_fo| number(4)}} FO</div>
                <div class="dia_con_item_l2t lin30" v-if="nowtype==2">{{$t("capital.balance")}}：{{balance_eso| number(4)}} EOS</div>
              </div>
              <div class="dia_con_itemllb">
                <div class="dia_con_item_l1">
                  <div class="dia_con_item_l1b fo_icon" v-if="nowtype==1"></div>
                  <div class="eso_icon" v-if="nowtype==2"></div>
                </div>
                <div class="dia_con_item_l2">
                  <div class="dia_con_item_l2b">
                    <el-form-item prop="fo" v-if="nowtype==1">
                      <el-input  v-if="nowtype==1" v-model="ruleForm.fo" class="dia_input" :placeholder="$t('capital.enterAmount')"></el-input>

                    </el-form-item>
                    <el-form-item prop="eso" v-if="nowtype==2">
                      <el-input   v-model="ruleForm.eso" class="dia_input" :placeholder="$t('capital.enterAmount')"></el-input>
                    </el-form-item>
                  </div>
                </div>
              </div>

            </div>

            <div class="exchange_icon"></div>
            <div class="dia_con_item_l3">

              <div class="dia_con_item_l3t lin30" v-if="nowtype==1">{{$t("capital.estimatedEos")}}({{$t("capital.actual")}})</div>
              <div class="dia_con_item_l3t lin30" v-if="nowtype==2">{{$t("capital.estimatedFo")}}({{$t("capital.actual")}})</div>
              <div class="dia_con_item_l3b ab">
                <el-input  v-if="nowtype==1"v-model="ruleForm.eso" class="dia_input" :disabled="true"></el-input>
                <el-input  v-if="nowtype==2" v-model="ruleForm.fo" class="dia_input" :disabled="true"></el-input>
                <div class="yve" v-if="nowtype==1">{{$t('capital.balance')}}：{{ number(balance_eso,4)}} EOS</div>
                <div class="yve" v-if="nowtype==2">{{$t('capital.balance')}}：{{ number(balance_fo ,4)}} FO</div>
                <div class="eso_icon" v-if="nowtype==1"></div>
                <div class="fo_icon mt30" v-if="nowtype==2"></div>
              </div>
            </div>
          </div>
          <!--<div class="dia_con_item dia_con_info" v-if="nowtype==1">-->
            <!--FO:ESO {{$t("capital.exchangeRate")}} 1：{{fo_to_eos}}-->
          <!--</div>-->
          <div class="dia_con_item dia_con_info" >
            EOS:FO  {{$t("capital.exchangeRate")}} 1：{{eos_to_fo}}
          </div>
        </div>
      </el-form>
      <el-button type="primary"  @click="sendExchange('ruleForm')" class="btn_exchange">{{$t("capital.exchange")}}</el-button>
    </div>

    <div class="dh_lc">
       <div class="item_inner">
         <div class="dh_lc_tit actit" >
      {{$t('activity.jc')}}
         </div>
         <div class="dh_lc_tab">
           <div class="tab_item" v-for="(item,index) in jcTabList" @click="changetype(index)" :class="[jctype==index? 'acbg': '']">
             <div :class="[index==1 ? 'dh_lc_tabicon2': 'dh_lc_tabicon']">
               <img :src="item.icon" alt="" :class="[index==1 ? 'img2': 'img1']">
             </div>
             <div class="dh_lc_tabicon_tit" :class="[jctype==index? 'accolor': '']">{{item.iconName}}</div>
           </div>
         </div>
         <div class="dh_lc_con" v-for="(item2,index2) in jcLit2">
           <div class="dh_lc_con_tit">
            {{item2.title}}
           </div>
           <img  v-for="img in item2.src" class="jc" :src="img" alt="">
         </div>
       </div>
    </div>
  </div>
  <myfooter></myfooter>
</div>


</template>
<script>
  import axios from "axios";
  import {httpUrl} from "../http_url/http_url";
  import Homefooter from "../public/Homefooter"
  import Vue from "vue";
  import $ from "jquery";
  import {mapGetters, mapActions, mapState, mapMutations} from 'vuex'
  import echarts from 'echarts'
  var eosiconb=require("../../assets/eos_iconb.png");
  var eosiconw=require("../../assets/eos_iconw.png");
  var fo_icon=require("../../assets/fo_icon.png");

  var jcen1 =require("../../assets/jcen1.png");
  var jcen2 =require("../../assets/jcen2.png");
  var jcen3 =require("../../assets/jcen3.png");
  var jcen4 =require("../../assets/jcen4.png");

  var jcen21 =require("../../assets/jcen21.png");
  var jcen22 =require("../../assets/jcen22.png");
  var jcen23 =require("../../assets/jcen23.png");

  var jcen31 =require("../../assets/jcen31.png");
  var jcen32 =require("../../assets/jcen32.png");
  var jcen33 =require("../../assets/jcen33.png");



  var jczh1 =require("../../assets/jczh1.png");
  var jczh2 =require("../../assets/jczh2.png");
  var jczh3 =require("../../assets/jczh3.png");
  var jczh4 =require("../../assets/jczh4.png");

  var jczh21 =require("../../assets/jczh21.png");
  var jczh22 =require("../../assets/jczh22.png");
  var jczh23 =require("../../assets/jczh23.png");

  var jczh31 =require("../../assets/jczh31.png");
  var jczh32 =require("../../assets/jczh32.png");
  var jczh33 =require("../../assets/jczh33.png");
  export default {
    components:{
      "myfooter":Homefooter
    },
    data() {
      var checkPrice = (rule, value, callback) => {

        let reg = /^\d+(\.\d+)?$/;
        if(this.nowtype==1){
          if(value==''){
            callback(new Error(this.$t("capital.enterAmount")))

          }
          else if(new RegExp(reg).test(value) == false) {
            callback(new Error(this.$t("capital.amountDgits")));
          }  else if (parseFloat(this.balance_fo)<value&&this.token) {
            callback(new Error(this.$t("capital.SmallerThan")));

          }
          else if (value<1&&this.token) {
            callback(new Error(this.$t("activity.none")));


          }else  {
            callback();
            this.ruleForm.eso = Math.floor(value *this.fo_to_eos*10000)/10000;
          }
        }else {
          if(value==''){
            callback(new Error(this.$t("capital.enterAmount")))
          }
          else if(new RegExp(reg).test(value) == false) {
            callback(new Error(this.$t("capital.amountDgits")));
          }  else if (parseFloat(this.balance_eso)<value&&this.token&&parseFloat(this.balance_fo)>1) {
            callback(new Error(this.$t("capital.SmallerThan")));
          } else  {
            this.ruleForm.fo = Math.floor(value *this.eos_to_fo*10000)/10000;
            callback();

          }

        }

      };
      return {
        lock:true,
        activity:'',
        nowtype:1,
        isActive:'',
        // 余额
        balance_fo:'',
        balance_eso:'',
        //兑率
        eos_to_fo:'',
        fo_to_eos:'',
        //验证表单
        ruleForm:{
          fo:'',
          eso:''
        },
        // 验证规则
        rules:{
          fo: [
            { validator: checkPrice, trigger: 'change' },


          ],
          eso: [
            { validator: checkPrice, trigger: 'change' },


          ],
        },
        // fo数量
        fo:'',
        //eso数量
        eso:'',
        jctype:0,
        // 按钮列表
        jcLit:[],

        isQimg:false,
        yaoUrl:"",
        addQrImg:"",
      }

    },



    watch: {
      // 如果 `question` 发生改变，这个函数就会运行
      en_or_zh: function () {
        this.setJC();
        if(this.nowtype==1){
          this.jcLit=this.type2List;
        }else if(this.nowtype==2){
          this.jcLit=this.type3List;
        }else {
          this.jcLit=this.type1List;
        }

      }},
    filters: {
      //小数点过滤器 不四舍五入
      number(value, num) {
        var toFixedNum = Number(value).toFixed(num + 1);
        var realVal = toFixedNum.substring(0, toFixedNum.lastIndexOf('.') + num + 1);
        return realVal;
      }
    },
    computed:{
      ...mapState('setting',['isHidden']),
      ...mapState('user',['lang',"userID"]),
      jcLit2:function(){
        return this.jcLit;
      },
      type1List: function (){
        return[
          {title: this.$t("activity.type1"), src:[jczh1,jczh2]},
          {title:this.$t("activity.type2"), src:[jczh3]},
          {title:this.$t("activity.type3"), src:[jczh4]},
        ]

      },
      type2List: function (){
        return[
          {title:this.$t("activity.type21"), src:[jczh21]},
          {title:this.$t("activity.type22"), src:[jczh22]},
          {title:this.$t("activity.type23"), src:[jczh23]},
        ]

      },
      type3List: function (){
        return[
          {title:this.$t("activity.type31"), src:[jczh31]},
          {title:this.$t("activity.type32"), src:[jczh32]},
          {title:this.$t("activity.type33"), src:[jczh33]},
        ]

      },

    jcTabList: function () {
    // `this` 指向 vm 实例
    return [
      {
        icon:fo_icon ,
        iconName:this.$t('activity.yiyf'),
      },
      {
        icon:eosiconb,
        iconName: this.$t("activity.ef"),
      },
      {
        icon:fo_icon,
        iconName:this.$t("activity.fd"),
      }
    ]
  },
      en_or_zh: function () {
        // `this` 指向 vm 实例
        return this.$store.state.user.lang;
      },
      login:function () {
        return this.$store.state.user.token;
      }


    },
    methods: {
      ...mapMutations('user', [
        'setUserInfo' // 将 `this.logout()` 映射为 `this.$store.commit('logout')`
      ]),
      ...mapMutations('setting', ['setData']),
      tabColor(index) { //切换
        $(".shareItWrapper li").eq(index).addClass("active_color").siblings("li").removeClass("active_color");
      },
      number(value, num) {
        var toFixedNum = Number(value).toFixed(num + 1);
        var realVal = toFixedNum.substring(0, toFixedNum.lastIndexOf('.') + num + 1);
        return realVal;
      },
      shareIt() {
        let _this = this;
        if(this.token == null && this.token == undefined) {
          this.$router.push({
            name: "login"
          })
          return false;
        } else {
          let imgPath;
          if(location.host.indexOf("imx.com") != -1) {
            imgPath = "https://m.imx.com/#/ExchangLanding";
          } else {
            imgPath = "http://m.tanghs.com/#/ExchangLanding";
          }
          _this.yaoUrl = imgPath;
          axios.get(httpUrl.Qrcode, {
            headers: {
              "Authorization": "Bearer " + this.token
            },
            params: {
              text: imgPath
            }
          }).then(function(res) {
            _this.addQrImg = res.data.data;
            _this.isQimg = true;
          }, function(err) {
          })

        }
      },
      settype(type){
        this.rest('ruleForm');
        this.nowtype =type;

      },
      changetype(type){

        if(type==1){
          this.jcTabList[1].icon=eosiconw;

        }else {
          this.jcTabList[1].icon=eosiconb;
        }
        this.jctype=type;
        this. setJC();



        if(type==1){
          this.jcLit=this.type2List;
        }else if(type==2){
          this.jcLit=this.type3List;
        }else {
          this.jcLit=this.type1List;
        }

      },
      getMyMoneyType(id) {
        axios.get(httpUrl.currencyBalance, {
          headers: {'Authorization': "Bearer " + this.token},
          params: {
            currency_id: id
          }
        }).then(res => {

          if(id==73){
            this.balance_fo = res.data.data.balance;
          }else {
            this.balance_eso = res.data.data.balance;
          }



        }, err => {
        })
      },
      // 币种兑换价格
      getPrice(type){
        axios.get(httpUrl.currencyConvertPrice, {
          headers: {'Authorization': "Bearer " + this.token},
          params: {
            method: type,
            amount:1
          }
        }).then(res => {
          if(type=='eosToFo'){
            this.eos_to_fo = res.data.data;
          }else {
            this.fo_to_eos = res.data.data;
          }

        }, err => {
          console.log(err)
        })
      },
      // 提交兑换
      sendExchange(formName){

        if(!this.token){

          this.$router.push({path: '/index/login'})
          return
        }
      if(this.balance_fo<=0&&this.nowtype==1 || this.balance_eso<=0&&this.nowtype==0 || this.ruleForm.eso==0 || this.ruleForm.fo==0){
          return;
      }
        this.$refs[formName].validate((valid) => {
          if (valid) {


            if(!this.lock){
              return
            }
            this.lock=false;

            if(this.nowtype==1){
              var val = this.ruleForm.fo;
              var type ="foToEos"
            }else {
              var val = this.ruleForm.eso;
              var type ="eosToFo"
            }

            axios.post(httpUrl.currencyConvert,
              {
                method: type,
                amount:val
              }, {
                headers: {'Authorization': "Bearer " + this.token},
              }).then(res => {
              this.lock=true;
              this.$message({
                message: this.$t("capital.exchangeSuccess"),
                type: 'success'
              });
              this.rest('ruleForm');
              //获取eso 余额
              this.getMyMoneyType(73);
              //获取fo余额
              this.getMyMoneyType(16);
            }, err => {
              console.log(err)
              this.lock=true;
            })


          } else {
            console.log('error submit!!');
            return false;
          }
        })


      },
      // 显示兑换 type1 fo to eso   type2 eso to fo
      showExchange(id){

        if(id==73){
          this.nowtype =1;
          this.exTit=this.$t("capital.foExcEos")
        }else {
          this.nowtype =2;
          this.exTit=this.$t("capital.eosExcFo")
        }
        this.dialogFormVisible =true;
      },
      // 重置一下
      rest(formRule){
        this.ruleForm.eso='';
        this.ruleForm.fo='';
        this.$refs[formRule].resetFields();

      },
      drawLine(data){
        let myChart = echarts.init(document.getElementById('zst_con'));
       let _this =this;


        let option = {
          tooltip : {
            trigger: 'axis',
          },
          xAxis : [
            {
              type : 'category',
              boundaryGap : false,
              data : [
                '2018-09-05 13:00:00',
                '2018-09-05 13:00:01',
                '2018-09-05 13:00:02',
                '2018-09-05 13:00:03',
                '2018-09-05 13:00:04',
                '2018-09-05 13:00:05',
                '2018-09-05 13:00:06'
              ]
            }
          ],

          yAxis: [
            {
              type: 'value',
              max: function(value) {
                return   _this.number(value.max+5,4);
              },
              min: function(value) {
                return  _this.number(value.min-5,4);
              }
            }

          ],
          series : [
            {
              name:this.$t('activity.FOExchange'),
              type:'line',
              stack: '',
              data:[465.1111, 466.1111, 475.1111, 495.1111, 505.1111, 515.1111, 665.1111]
            }
          ]
        };

        option.xAxis[0].data=data.t.reverse();
        option.series[0].data= data.p.reverse();
        myChart.setOption(option)
      },

      getKline(){
        var timezone = jstz.determine();
        axios.get(httpUrl.currencyConvertKLine, {
          headers: {'Authorization': "Bearer " + this.token},
          params: {
            timezone: timezone.name()
          }
        }).then(res => {
          this.drawLine(res.data.data)
        }, err => {
          console.log(err)
        })
      },
      setJcen(){
        this.type1List[0].src=[jcen1,jcen2];
        this.type1List[1].src=[jcen3];
        this.type1List[2].src=[jcen4];

        this.type2List[0].src=[jcen21];
        this.type2List[1].src=[jcen22];
        this.type2List[2].src=[jcen23];

        this.type3List[0].src=[jcen31];
        this.type3List[1].src=[jcen32];
        this.type3List[2].src=[jcen33];
      },
      setJczh(){
        this.type1List[0].src=[jczh1,jczh2];
        this.type1List[1].src=[jczh3];
        this.type1List[2].src=[jczh4];

        this.type2List[0].src=[jczh21];
        this.type2List[1].src=[jczh22];
        this.type2List[2].src=[jczh23];

        this.type3List[0].src=[jczh31];
        this.type3List[1].src=[jczh32];
        this.type3List[2].src=[jczh33];
      },
      setJC(){
        if(this.en_or_zh=='zh-CN'){
          this.setJczh()
        }else {
          this.setJcen()
        }
      }



    },
    mounted() {
      var _this = this;
      this. setJC();
      this.jcLit=this.type1List;
      if(this.token){
        //获取eso 余额
        this.getMyMoneyType(73);
        //获取fo余额
        this.getMyMoneyType(16);
      }
      // 获取兑换比例
      this.getPrice('eosToFo');
      // 获取兑换比例
      this.getPrice('foToEos');
      //空投日志添加
      axios.post(httpUrl.uploadDropLog, {
        type: 7,
        invite_code: this.userID
      }).then(function(res) {
        return true;
      })
      this.getKline();
      var clipboard = new Clipboard(".copy");
      clipboard.on("success", function(e) {
        _this.$message({
          message: _this.$t("airdrop.CopyLinkSuccess"),
          type: 'success',
          duration: 2000
        });
      })
      clipboard.on("error", function(e) {
      })

    }
  }
</script>

<style lang="scss">
  #activity{
    .el-button{
      background:#60C8C4;
      border: 1px solid #60C8C4;
    }
  }

</style>

<style lang="scss" scoped>
  .ab{
    position: relative;
  }
  .yve{
    position: absolute;
    top: 45px;
    right: 75px;
    color: red;
  }
  .font14{
    font-size: 14px;
  }
  .cu{
    cursor: pointer;
  }
  .zst_con{
    width: 870px;
    height:300px;
  }
  .dia_con{
    margin-left: -10px;
  }
  .left15{
    margin-left: -15px;
  }
  .act_content{
    width: 800px;
    margin: 0 auto;

  }
  .ga{
    color: #1c2030;
  }
  .fowhatl{
    background: url("../../assets/gongshi.png") no-repeat center;
    width: 353px;
    height: 105px;
    background-size: 100% 100%;
  }
  .activity_con{
    width: 1200px;
    margin: 0 auto;
    background: #fff;
    border-radius:4px;
    padding-top: 20px;
    padding-bottom: 30px;
  }
  .activity_tit_con{
    width: 520px;
    margin: 0 auto;
    line-height: 40px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
  .fx{
    width: 23.14px;
    height: 23.14px;
    position: absolute;
    right: 29px;
    top:0px;
    cursor: pointer;
    background: url("../../assets/fenxiang.png") no-repeat center;

  }
  .activity_tit{
    position: relative;
    display: flex;
    flex-direction: row;
    font-size: 28px;
    color: #999999;
    margin-top: 18px;
  }

  .activity{
    width: 100%;
    height: auto;
    padding-top: 164px;
  }
  .ban1{
    background: url("../../assets/avban1.png") no-repeat center top;
  }
  .ban2{
    background: url("../../assets/avban2.png") no-repeat center top;
  }
  .dia_con_item_l3b{
    display: flex;
    flex-direction: row;
  }
  .dia_con_item{
    display: flex;
    flex-direction: row;
    width: 870px;
    margin: 0 auto;
    margin-top: 20px;
  }
  .dia_con_itemllt{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
  .dia_con_itemllb{
    display: flex;
    flex-direction: row;
  }


  .dia_con_item_l1{
    margin-right: 5px;
  }
  .dia_con_item_l1t{
    height: 20px;
    color: #1E1D54;
  }
  .fo_icon{
    background: url("../../assets/fo_icon.png") no-repeat center;
    width: 59px;
    height: 37px;
    margin-top: 10px;
  }
  .mt30{
    margin-left: 5px;
    width: 65px;
    margin-top: 0;
  }
  .diatit{

    text-align: center;
    color: #1E1D54;
    font-size:20px ;
  }
  .dia_con_item_l2{
  }
  .dia_con_item_l2t{
    text-align: right;
    color:#999999;
    font-size: 14px;

  }
  .dia_input{
    width: 312px;
    height:45px;
  }
  .exchange_icon{
    background: url("../../assets/ex_change.png")no-repeat center;
    width: 70px;
    height: 60px;
    margin: 0 10px;
    margin-top: 20px;
  }
  .dia_con_item_l3{
  }
  .dia_con_item_l3t{
    color:#1E1D54;
    font-size: 14px;
    text-align: left;
  }
  .eso_icon{
    background: url("../../assets/eso_icon.png") no-repeat center;
    width: 50px;
    height: 60px;
    background-size:auto 60px;
    margin-top: -5px;
  }
  .lin30{
    line-height: 30px;


  }
  .dia_con_info{
    color: #FF7E00;
    font-size: 20px;
    margin-top: 29px;
    text-align: center;
    width: 800px;
    display: block;
  }
  .btn_exchange{
    color: #fff;
    background:#60C8C4;
    width: 200px;
    height: 48px;
    border: 1px solid #60C8C4;
    display: block;
    margin: 0 auto;
    margin-top: 11px;
    font-size: 20px;
  }
  .btn_exchange:hover{
    border: 1px solid #12B4C8;
    background:#12B4C8;
  }
  .actit{
    color: #1e1d54;
    font-size: 28px;
    line-height: 40px;
  }
  .fowhat{
    width: 100%;
    height: 229px;
    background: #fff;
    position: relative;
  }
  .item_inner{
    width: 870px;
    height: auto;
    margin: 0 auto;
  }
  .fowhat_tit{
    margin-top: 20px;
  }
  .fowhat_con{
    display: flex;
    flex-direction: row;

  }
  .fowhatl{
    margin-top: 33px;
    margin-right: 46px;
  }
  .fowhatr{
    width: 467px;
    height: 120px;
    line-height: 24px;
    color: #1e1d54;
    font-size: 14px;
  }
  .zst{
    margin-top: 23px;
    width: 100%;
    height: 360px;
    background: #F5F6FC ;
    padding-top: 29px;
  }
  .footer_text{
    font-size: 14px;
    line-height: 28px;
    margin-top: -30px;
    margin-left: 30px;
  }
  .dh_lc{
    width: 100%;
    background:#F5F6FC;
    padding-top: 29px;
    margin-top: 20px;
  }
  .dh_lc_tit{
  }
  .dh_lc_tab{
    margin-top: 26px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
  .tab_item{
    width: 148px;
    height:109px;
    background: #fff;
    border-radius: 4px;
    border: 1px solid rgba(151, 151, 151, 1);
    cursor: pointer;
  }
  .dh_lc_tabicon{
    width: 59px;
    height: 37px;
    margin: 0 auto;
    margin-top: 18px;
  }
  .dh_lc_tabicon2{
    width: 31px;
    height: 49px;
    margin: 0 auto;
    margin-top: 10px;
  }
  .img1{
    width: 59px;
    height: 37px;
  }
  .img2{
    width: 31px;
    height: 49px;
  }

  .dh_lc_tabicon_tit{
    text-align: center;
    width: 100%;
    font-size: 16px;
    word-break: break-all;
    color: #1E1D54;
    margin-top: 12px;
  }
  .accolor{
    color: #fff;
  }
  .acbg{
    background-color: rgba(34, 33, 87, 1);
    border: 1px solid rgba(151, 151, 151, 1);
  }
  .dh_lc_con{
    width: 100%;
  }
  .dh_lc_con_tit{
    line-height: 20px;
    margin-top: 26px;
    font-size: 14px;
  }
  .jc{
    margin-top: 20px;
  }
  .men_ban {
    position: fixed;
    left: 0;
    top: 0;
    z-index: 66;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
  }
  /*选择部分*/

  .active_color {
  .iconfont {
    color: #5fc8c4 !important;
  }
  }
  /*分享*/

  .shareIt {
    width: 400px;
    height: 250px;
    background: #fff;
    border-radius: 4px;
    margin-top: -125px;
    margin-left: -200px;
    position: fixed;
    left: 50%;
    top: 50%;
    z-index: 88;
    box-sizing: border-box;
    padding: 0 20px;
  .title {
    width: 100%;
    height: 50px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  span {
    color: #1f1c53;
    font-size: 16px;
  }
  border-bottom:1px solid #d8d8d8;
  .iconfont {
    cursor: pointer;
  }
  }
  .oImg {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
  img {
    width: 120px;
    height: 120px;
    margin-top: 15px;
  }
  .oUrl {
    opacity: 0;
  }
  ul {
    display: flex;
    align-items: center;
  li {
    width: 35px;
    height: 35px;
    margin-right: 16px;
    color: #747a7a;
    cursor: pointer;
  .iconfont {
    font-size: 35px;
  }
  .icon-qq {
    display: inline-block;
    margin-top: -2px;
  }
  .icon-lianjie {
    display: inline-block;
    font-size: 38px;
    margin-top: -2px;
  }
  }
  li:nth-last-child(1) {
    margin: 0;
  }
  }
  }
  }

  .textIndex {
    margin-left: 20px;
  }
</style>
