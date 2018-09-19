<template>
  <div id="capital">
    <my-loading v-if="loadingIsShow"></my-loading>
    <!--ETH管理-->
    <mt-popup v-model="popupEthVisible" position="right">
      <div class="popupEthbox">
        <div class="popupEth_header">
          <p class="back" @click="popupEthVisible=false">
            <i class="iconfont icon-zuojiantou"></i>
          </p>
          <p class="register_type">
            ETH {{$t("WalletManagement.AssetManage")}}
          </p>
          <span class="addAssets" @click="addEthAssets=true">{{$t("WalletManagement.AddAssets")}}</span>
        </div>
      </div>
      <!--搜索内容部分-->
      <div class="searchBox">
        <input type="text" v-model="searchEthText" @keyup="lengthNoData(0)" :placeholder="$t('WalletManagement.EnterTokenNameOrAddr')">
        <i class="iconfont icon-sousuo3" @click="searchEth"></i>
      </div>
      <!--ETH资产-->
      <div class="assets">
        <ul class="assetsWrapper">
          <li class="assetsItem" v-for="(item,key) in EthList" :key="key">
            <p class="curName">{{item.pageIdentifier}}</p>
            <p class="token">
              <span class="token">{{item.contract}}</span>
              <span>
                <i class="iconfont"
                   :class="{'icon-jia3':item.finance.length>0&&item.finance[0].status==0 || item.finance.length==0,'icon-jian':item.finance.length>0&&item.finance[0].status==1}"
                   @click="AddTominus(item,$event)"></i>
              </span>
            </p>
          </li>
        </ul>
        <!--分页-->
        <div class="pageCount" v-show="EthTotal>10">
          <el-pagination small layout="prev, pager, next" :page-size="EthPage" :total="EthTotal"
                         @current-change="pageCoManagingAssetsEthChangeunt">
          </el-pagination>
        </div>
      </div>
      <!--暂无记录-->
      <div class="noData" v-show="EthTotal==0">{{$t("list.noData")}}</div>
    </mt-popup>
    <!--EOS管理-->
    <mt-popup v-model="popupEosVisible" position="right">
      <div class="popupEthbox">
        <div class="popupEth_header">
          <p class="back" @click="popupEosVisible=false">
            <i class="iconfont icon-zuojiantou"></i>
          </p>
          <p class="register_type">
            EOS {{$t("WalletManagement.AssetManage")}}
          </p>
          <span class="addAssets" @click="addEosAssets=true">{{$t("WalletManagement.AddAssets")}}</span>
        </div>
      </div>
      <!--搜索内容部分-->
      <!--<div class="searchBox">-->
        <!--<input type="text" v-model="searchEosText" @keyup="lengthNoData(1)" :placeholder="$t('WalletManagement.EnterTokenNameOrAddr')">-->
        <!--<i class="iconfont icon-sousuo3" @click="searchEos"></i>-->
      <!--</div>-->
      <!--Eos资产-->
      <div class="assets">
        <ul class="assetsWrapper">
          <li class="assetsItem" v-for="(item,key) in EosList" :key="key">
            <p class="curName">{{item.pageIdentifier}}</p>
            <p class="token">
              <span class="token">{{item.contract}}</span>
              <span>
                <i class="iconfont"
                   :class="{'icon-jia3':item.finance.length>0&&item.finance[0].status==0 || item.finance.length==0,'icon-jian':item.finance.length>0&&item.finance[0].status==1}"
                   @click="AddTominus(item,$event)"></i>
              </span>
            </p>
          </li>
        </ul>
        <!--分页-->
        <div class="pageCount" v-show="EosTotal>10">
          <el-pagination small layout="prev,pager,next" :page-size="EosPage" :total="EosTotal"
                         @current-change="pageCoManagingAssetsEosChangeunt">
          </el-pagination>
        </div>
      </div>
      <!--暂无记录-->
      <div class="noData" v-show="EosTotal==0">{{$t("list.noData")}}</div>
    </mt-popup>
    <!--主流币管理-->
    <mt-popup v-model="popupMainVisible" position="right">
      <div class="popupEthbox">
        <div class="popupEth_header">
          <p class="back" @click="popupMainVisible=false">
            <i class="iconfont icon-zuojiantou"></i>
          </p>
          <p class="register_type">
            {{$t('WalletManagement.AssetManage')}}
          </p>
        </div>
      </div>
      <!--搜索内容部分-->
      <div class="searchBox">
      <input type="text" v-model="searchMainText" @keyup="lengthNoData(2)" :placeholder="$t('WalletManagement.EnterTokenNameOrAddr')">
      <i class="iconfont icon-sousuo3" @click="searchMain"></i>
      </div>
      <div class="assets">
        <ul class="assetsWrapper">
          <li class="assetsItem" v-for="(item,key) in MainList" :key="key">
            <p class="curName">{{item.pageIdentifier}}</p>
            <p class="token">
              <span class="token">{{item.contract}}</span>
              <span>
                <i class="iconfont"
                   :class="{'icon-jia3':item.finance.length>0&&item.finance[0].status==0 || item.finance.length==0,'icon-jian':item.finance.length>0&&item.finance[0].status==1}"
                   @click="AddTominus(item,$event)"></i>
              </span>
            </p>
          </li>
        </ul>
        <!--分页-->
        <div class="pageCount" v-show="MainTotal>10">
          <el-pagination small layout="prev,pager,next" :page-size="MainPage" :total="MainTotal"
                         @current-change="pageCoManagingAssetsMainChangeunt">
          </el-pagination>
        </div>
      </div>
      <!--暂无记录-->
      <div class="noData" v-show="MainTotal==0">{{$t("list.noData")}}</div>
    </mt-popup>
    <!--添加EOS资产-->
    <mt-popup v-model="addEosAssets" position="right">
      <!--添加资产头部-->
      <div class="popupEthbox">
        <div class="popupEth_header">
          <p class="back" @click="addEosAssets=false;Account='';Token='';">
            <i class="iconfont icon-zuojiantou"></i>
          </p>
          <p class="register_type">
            {{$t("WalletManagement.AddAssets")}}
          </p>
        </div>
      </div>
      <!--添加资产1-->
      <!--添加资产成功头部展示-->
      <div class="popupEthbox popupEthboxPosition" v-if="addSuccess">
        <div class="popupEth_header addSuccess">
          <p class="back">
            <i class="iconfont icon-tixing-chenggong iconColor"></i>
          </p>
          <p class="register_type">
            {{$t("WalletManagement.AddSuccess")}}
          </p>
        </div>
      </div>
      <!--添加资产EOS输入部分-->
      <div class="EosAssetscontent">
        <ul class="EosAssetstext">
          <li class="EosAssetstextItem">
            <p class="itemLabel">{{$t("WalletManagement.AccountName")}}</p>
            <input type="text" v-model="Account" class="inputStyle" :placeholder="$t('WalletManagement.EnterEosAcount')">
          </li>
          <li class="EosAssetstextItem">
            <p class="itemLabel">{{$t("WalletManagement.AssetName")}}</p>
            <input type="text" v-model="Token" class="inputStyle" :placeholder="$t('WalletManagement.AssetNameBased')">
          </li>
        </ul>
        <div class="buttonWrapper">
          <button class="addButton" :disabled="!Account || !Token" @click="addEos">{{$t("WalletManagement.Add")}}</button>
        </div>
        <div class="description">
          <p>1.{{$t("WalletManagement.CarefulConfirm")}}</p>
          <p>2.{{$t("WalletManagement.NotReceive")}}</p>
          <p>3.{{$t("WalletManagement.AssetsWrong")}}</p>
          <p>4.{{$t("WalletManagement.AddingAssetsMust")}}</p>
        </div>
      </div>
    </mt-popup>
    <!--添加ETH资产-->
    <mt-popup v-model="addEthAssets" position="right">
      <!--添加资产头部-->
      <div class="popupEthbox">
        <div class="popupEth_header">
          <p class="back" @click="addEthAssets=false;ContractAddress='';addSuccessEth='';">
            <i class="iconfont icon-zuojiantou"></i>
          </p>
          <p class="register_type">
            {{$t("WalletManagement.AddAssets")}}
          </p>
        </div>
      </div>
      <!--添加资产1-->
      <!--添加资产成功头部展示-->
      <div class="popupEthbox popupEthboxPosition" v-if="addSuccessEth">
        <div class="popupEth_header addSuccess">
          <p class="back">
            <i class="iconfont icon-tixing-chenggong iconColor"></i>
          </p>
          <p class="register_type">
            {{$t("WalletManagement.AddSuccess")}}
          </p>
        </div>
      </div>
      <!--添加资产EOS输入部分-->
      <div class="EosAssetscontent">
        <ul class="EosAssetstext">
          <li class="EosAssetstextItem">
            <p class="itemLabel">{{$t("vote.ContractAddr")}}</p>
            <input type="text" v-model="ContractAddress" class="inputStyle" :placeholder="$t('WalletManagement.Pleaseenter1')">
          </li>
        </ul>
        <div class="buttonWrapper">
          <button class="addButton"  @click="addEth">{{$t("WalletManagement.Add")}}</button>
        </div>
        <div class="description">
          <p>{{$t("WalletManagement.AddingAssetsMust1")}}</p>
        </div>
      </div>
    </mt-popup>
    <!--资金管理头部-->
    <div class="friends_header background">
      <p class="back">
        <span @click="$router.go(-1)">
          <i class="iconfont icon-zuojiantou"></i>
        </span>
      </p>
      <p class="yao_qing">
        <span>{{$t("SupperWallet.SuperWallet")}}</span>
      </p>
    </div>
    <!--总资产折合-->
    <div class="totalAssets background">
      <div class="totalAssets_top">
        <swiper :options="swiperOption1" ref="mySwiper1">
          <swiper-slide v-for="(activity,index) in WalletList" :key="index">
            <div class="balane" :class="objectClass[index]">
              <div class="container">
                <p class="WalletName">
                  <span v-if="activity.pageIdentifier!='BTC'">{{activity.pageIdentifier}} {{$t("WalletManagement.Wallet")}}</span>
                  <span v-if="activity.pageIdentifier=='BTC'">{{$t("WalletManagement.MainstreamCoinWallet")}}</span>
                  <i class="iconfont icon-zhengyan_fill1 iconColor" :class="{'icon-biyan_fill1':isShowBalance}"
                     @click="hideBalance"></i>
                </p>
                <p class="number">
                  <span class="textSize" v-if="!isShowBalance">{{activity.btc_blance}}</span>
                  <span v-if="isShowBalance">******</span>
                  <span class="curName">BTC</span>
                </p>
                <p class="money" :class="spanColor[index]" v-if="activity.cny_balance"> ≈
                  <span v-if="!isShowBalance">{{activity.cny_balance}}</span>
                  <span v-if="isShowBalance">******</span>
                  <span>CNY</span>
                </p>
              </div>
            </div>
          </swiper-slide>
          <div class="swiper-pagination" slot="pagination"></div>
        </swiper>
      </div>
      <!--点卡数量-->
      <!--<div class="PointCard">-->
      <!--<div class="left">-->
      <!--<span>{{$t("capital.Pointcard")}}    :    </span>-->
      <!--<p class="num">{{pointCardBalance | number(8)}}</p>-->
      <!--</div>-->
      <!--<p class="switch">-->
      <!--<mt-switch v-model="value" @change="bindingShow"></mt-switch>-->
      <!--<span v-if="value" class="text">{{$t("userCenter.use")}}</span>-->
      <!--<span v-if="!value" class="text">{{$t("userCenter.Donotuse")}}</span>-->
      <!--</p>-->
      <!--</div>-->
    </div>

    <!-- <div class="Charge background">
      <ul>
        <router-link to="/ChongBi" tag="li">
          <i class="iconfont icon-yinhangqia"></i>
          <p>{{$t("capital.Deposit")}}</p>
        </router-link>
        <router-link to="/tiBi" tag="li">
          <i class="iconfont icon-tixian"></i>
          <p>{{$t("capital.Withdraw")}}</p>
        </router-link>
        <router-link to="/CapitalRecord" tag="li">
          <i class="iconfont icon-zhaohuizijinhao01"></i>
          <p>{{$t("capital.Fundrecords")}}</p>
        </router-link>
      </ul>
    </div>-->
    <!--内容-->
    <div class="ziChan">
      <div class="ziChan_header1">
        <div>
          <el-checkbox v-model="checked" @change="change(checked)">{{$t("WalletManagement.HideZeroAssets")}}</el-checkbox>
        </div>
        <div>{{$t("capital.Pointcard")}}:{{pointCardBalance | number(8)}}</div>
      </div>
      <div class="ziChan_header">
        <div class="oleft">
          <i class="iconfont icon-sousuo3 iconSize"></i>
          <input type="text" v-model="searchText" @input="searchBz(searchText)" :placeholder="$t('capital.Search')"/>
        </div>
        <div class="oRight"  @click="assetsTab">
          {{$t("WalletManagement.ManageAssets")}}
        </div>
      </div>
      <!--资产list-->
      <ul class="zhiChan_list">
        <li class="zhiChan_item" v-for="item in AssetsList" v-if="item.isIF">
          <div class="itemTitle">
            <div class="currency">
              {{item.currency}}
            </div>
            <div class="Positionright">
              <div class="bbjy">
                <!--兑换EOS-->
                <span v-if="item.currency_id==73" @click="toExchange('FotoEos')">
                  {{$t("capital.excEos")}}
                  <span class="arrows">
                 <i class="iconfont icon-shuangjiantou changeColor"></i>
                  </span>
                </span>
                <span v-if="item.currency_id==16" @click="toExchange('EostoFo')">
                  {{$t("capital.excFo")}}
                  <span class="arrows">
                 <i class="iconfont icon-shuangjiantou changeColor"></i>
                  </span>
                </span>
                <span @click="toChart(item)"
                      v-if="item.matchcoins.length>0||item.naught_on==1&&item.is_drop==1 || item.naught_on==1&&item.isTrad==1 ||item.is_drop==1&&item.isTrad==1 "
                >
                  {{$t("WalletManagement.Exchange")}}
                  <span class="arrows">
                 <i class="iconfont icon-shuangjiantou changeColor"></i>
                  </span>
                </span>
                <router-link v-if="item.naught_on==1&&item.is_drop==0&&item.matchcoins.length==0" tag="span"
                             to="/Taocoin">{{$t("WalletManagement.Taocoin")}}
                  <span class="arrows">
                    <i class="iconfont icon-shuangjiantou changeColor"></i>
                  </span>
                </router-link>
                <router-link v-if="item.is_drop>=1&&item.naught_on==0&&item.matchcoins.length==0" tag="span"
                             :to="{name:'airdropDetails',params:{id:item.currency_eid}}">{{$t("WalletManagement.Airdrop")}}
                  <span class="arrows">
                    <i class="iconfont icon-shuangjiantou changeColor"></i>
                  </span>
                </router-link>
              </div>

            </div>
          </div>
          <div @click="toDetails(item)" class="itemContent">
            <div class="center">
              <p class="text">{{$t("capital.Available")}}</p>
              <p class="price" v-if="!isShowBalance">{{item.balance | number(item.displayNum)}}</p>
              <p class="price" v-if="isShowBalance">******</p>
            </div>
            <div class="center right">
              <p class="text">{{$t("capital.Freeze")}}</p>
              <p class="price" v-if="!isShowBalance">{{item.lock_balance | number(item.displayNum)}}</p>
              <p class="price" v-if="isShowBalance">******</p>
            </div>
            <div class="center">
              <p class="text">{{$t("WalletManagement.Estimated")}}(CNY)</p>
              <span class="price" v-if="!isShowBalance">{{item.cny_blance| number(2)}}</span>
              <span class="price" v-if="isShowBalance">******</span>
              <i class="iconfont icon-gengduo2 iconColor"></i>
            </div>
          </div>
        </li>
      </ul>
      <!--资产判断-->
      <div class="lengXiao" v-show="AssetsList.length==0">
        {{$t('WalletManagement.NoAsset')}}
        <span class="blue" @click="assetsTab">{{$t('WalletManagement.clickAddAssets')}}</span>
      </div>

    </div>

  </div>
</template>


<script>
  import header from "../public/header"
  import axios from "axios";
  import {httpUrl} from "../http_url/http_url"
  import {swiper, swiperSlide} from 'vue-awesome-swiper'
  import $ from "jquery"
  import {mapGetters, mapActions, mapState, mapMutations} from 'vuex'
  import loading from "../public/loading"
  require('swiper/dist/css/swiper.css') //注意这里
  export default {
    data() {
      return {
        capitalHeader: this.$t("list.fund_management"),
        checked: false,
        /*隐藏资产为0的币种*/
        financesList: [],
        /*获取资产信息列表*/
        CurrencyBalance: 0, ///资产折合比特币的剩余余额
        RMBBalance: 0, ///人民币余额
        userMoneyIsShow: true, //显示隐藏余额
        searchText: "",
        /*搜索框*/
        pointCardBalance: 0,
        /*点卡剩余数量*/
        value: false,
        swiperOption1: {
          /*轮播*/
          slidesPerView: 1.1,
          pagination: {el: ".swiper-pagination", clickable: true,},
        },
        WalletList: [], /*我的钱包*/
        AssetsList: [], /*默认列表*/
        bind_id: "", /*绑定id*/
        managementEth: false, /*管理ETH*/
        managementEos: false, /*管理EOS*/
        BdShowMobile: false, /*已绑定手机显示*/
        NoShowMobile: false, /*未绑定手机显示*/
        EthList: [], /*eth列表*/
        EosList: [], /*eos列表*/
        MainList:[], /*主流币列表*/
        MainPage:0, /*主流币分页*/
        MainTotal:0, /*主流币总页数*/
        EthPage: 0, /*eth分页*/
        EosPage: 0, /*eos分页*/
        EthTotal: 0, /*eth总页数*/
        EosTotal: 0, /*eos总页数*/
        searchEthText: "", /*搜索eth地址*/
        searchEosText: "", /*搜索eos地址*/
        searchMainText:"", /*搜素主流币地址*/
        objectClass: {
          0: 'bgColor1',
          1: 'bgColor2',
          2: 'bgColor3'
        },
        spanColor: {
          0: 'spanColor0',
          1: 'spanColor1',
          2: 'spanColor2'
        },
        isShowBalance: false, /*是否显示资产*/
        popupEthVisible: false, /*ETH资产管理*/
        popupEosVisible: false, /*EOS资产管理*/
        popupMainVisible:false, /*主流币资产管理*/
        addEosAssets: false, /*添加eos资产*/
        addSuccess: false, /*添加成功*/
        Account: "", /*账户*/
        Token: "", /*token信息*/
        activeIndex:this.$route.params.index,  /*下标*/
        managementType:"", /*用户切换币种*/
        addEthAssets:false, /*eth地址*/
        addSuccessEth:false, /*添加成功*/
        ContractAddress:"", /*eth地址*/
        loadingIsShow:false, /*loading*/
      }
    },
    components: {
      "my-header": header,
      swiper,
      swiperSlide
    },
    filters: {
      //小数点过滤器 不四舍五入
      number(value, num) {
        var toFixedNum = Number(value).toFixed(num + 1);
        var realVal = toFixedNum.substring(0, toFixedNum.toString().length - 1);
        return realVal;
      }
    },
    computed:{
      ...mapState('setting',['isHidden']),
    },
    components:{
      "my-loading":loading
    },
    methods: {
      ...mapMutations('setting',['setData']),
      toExchange(type){ /*兑换类型*/
        this.$router.push({name:"Exchange",params:{toType:type}});
      },
      toDetails(item){
        let strObj = JSON.stringify(item)
        window.localStorage.setItem("AssetDetails",strObj);
        this.$router.push({name:'AssetDetails',params:{'curId':item.currency_id}});
      },
      addEth(){
        var reg = /^[0-9a-zA-Z]+$/;
        if(this.ContractAddress==''){
          this.$message({
            message: this.$t("WalletManagement.Pleaseenter1"),
            type: 'warning'
          });
          console.log('111')
          return;
        }else if(!reg.test(this.ContractAddress)) {
          this.$message({
            message: this.$t("WalletManagement.contractAddress"),
            type: 'warning'
          });
          console.log('222')
          return;
        }else if(this.ContractAddress.length<40){
          this.$message({
            message: this.$t("WalletManagement.addresslengthError"),
            type: 'warning'
          });
          console.log('333')
          return;
        }else{
          axios.post(httpUrl.addContract, {
            address: this.ContractAddress,
            type: 0
          }, {
            headers: {"Authorization": "Bearer " + this.token}
          }).then(res => {
            if (res.data.status.code == 200) {
              this.addSuccessEth = true;
              /*提示成功*/
              setTimeout(() => {
                this.addSuccessEth = false;
              }, 1500)
              this.ContractAddress = '';
              /*获取token*/
              axios.get(httpUrl.searchToken, {
                headers: {"Authorization": "Bearer " + this.token},
                params: {text: this.searchEthText, bind_id: this.bind_id}
              }).then(res => {
                this.EthList = res.data.data.data;
                this.EthPage = res.data.data.per_page;
                this.EthTotal = res.data.data.total;
              }, err => {
                console.log(err)
              })
              /*刷新接口*/
              this.getMyMoney();
              /*刷新钱包*/

            }
          }, err => {
            console.log(err);
          })
        }
      },
      addEos() {
        var reg = /^[A-Za-z0-9]{12}$/;
        var reg1 = /^[a-z]{1,20}$/;
        if (!reg.test(this.Account)) {
          this.$message({
            message: this.$t("WalletManagement.AccountFormatError"),
            type: 'warning'
          });
          return;
        }
        if (!reg1.test(this.Token)) {
          this.$message({
            message: this.$t("WalletManagement.TokenNameLength"),
            type: 'warning'
          });
          return;
        }
        axios.post(httpUrl.addContract, {
          address: this.Account,
          symbol: this.Token,
          type: 1
        }, {
          headers: {"Authorization": "Bearer " + this.token}
        }).then(res => {
          if (res.data.status.code == 200) {
            this.Account = '';
            this.Token = '';
            this.addSuccess = true;
            /*提示成功*/
            setTimeout(() => {
              this.addSuccess = false;
            }, 1500)
            axios.get(httpUrl.searchToken, {
              headers: {"Authorization": "Bearer " + this.token},
              params: {text: this.searchEosText, bind_id: this.bind_id}
            }).then(res => {
              this.EosList = res.data.data.data;
              this.EosPage = res.data.data.per_page;
              this.EosTotal = res.data.data.total;
            }, err => {
              console.log(err)
            })
            /*刷新接口*/
            this.getMyMoney();
            /*刷新钱包*/
          }
        }, err => {
          console.log(err);
        })
      },
      AddTominus(item, e) {
        var _this = this;
        /*添加--AddTominus减少*/
        if (item.finance.length>0&&item.finance[0].status == 0 || item.finance.length==0) { /*加*/
          axios.post(httpUrl.financeSave, {
            currency_id: item.id, type: 1
          }, {
            headers: {"Authorization": "Bearer " + this.token}
          }).then(res => {
            if (res.data.status.code == 200) {
              e.target.className = "iconfont icon-jian";
              this.getMyMoney();
              /*刷新资产管理*/
              if(item.finance.length==0){
                item.finance = [{currency_id:item.id,status:1,balance:0}];
              }else{
                item.finance[0].status=1;
              }
            }
          }, err => {
            console.log(err)
          })
        }
        if (item.finance.length>0&&item.finance[0].status == 1) { /*减*/
          if (item.finance[0].balance > 0) {
            this.$message({
              message: _this.$t("WalletManagement.HveBalance"),
              type: 'warning'
            });
            return false;
          }
          axios.post(httpUrl.financeSave, {
            currency_id: item.id,
            type: 0
          }, {
            headers: {"Authorization": "Bearer " + this.token}
          }).then(res => {
            if (res.data.status.code == 200) {
              e.target.className = "iconfont icon-jia3";
              if(item.finance.length==0){
                item.finance = [{currency_id:item.id,status:0,balance:0}];
              }else{
                item.finance[0].status=0;
              }
              this.getMyMoney();
              /*刷新资产管理*/
            }
          }, err => {
            console.log(err)
          })
        }
      },
      lengthNoData(type) { /*内容为空*/
        if(type==2&&this.searchMainText.length == 0){
          axios.get(httpUrl.searchToken, {
            headers: {"Authorization": "Bearer " + this.token},
            params: {text: this.searchMainText, bind_id: this.bind_id}
          }).then(res => {
            this.MainList = res.data.data.data;
            this.MainPage = res.data.data.per_page;
            this.MainTotal = res.data.data.total;
          }, err => {
            console.log(err)
          })
        }
        if (type == 0 && this.searchEthText.length == 0) {
          axios.get(httpUrl.searchToken, {
            headers: {"Authorization": "Bearer " + this.token},
            params: {text: this.searchEthText, bind_id: this.bind_id}
          }).then(res => {
            this.EthList = res.data.data.data;
            this.EthPage = res.data.data.per_page;
            this.EthTotal = res.data.data.total;
          }, err => {
            console.log(err);
          })
        }
        if (type == 1 && this.searchEosText.length == 0) {
          axios.get(httpUrl.searchToken, {
            headers: {"Authorization": "Bearer " + this.token},
            params: {text: this.searchEosText, bind_id: this.bind_id}
          }).then(res => {
            this.EosList = res.data.data.data;
            this.EosPage = res.data.data.per_page;
            this.EosTotal = res.data.data.total;
          }, err => {
            console.log(err)
          })
        }
      },
      searchMain(){
        if(this.searchMainText==""){
          this.$message({
            message: this.$t('WalletManagement.EnterTokenNameOrAddr'),
            type: 'warning'
          });
          return;
        }
        /*获取token*/
        axios.get(httpUrl.searchToken, {
          headers: {"Authorization": "Bearer " + this.token},
          params: {text: this.searchMainText, bind_id: this.bind_id}
        }).then(res => {
          this.MainList = res.data.data.data;
          this.MainPage = res.data.data.per_page;
          this.MainTotal = res.data.data.total;
        }, err => {
          console.log(err)
        })
      },
      searchEth() { /*搜索eth*/
        if(this.searchEthText==""){
          this.$message({
            message: this.$t('WalletManagement.EnterTokenNameOrAddr'),
            type: 'warning'
          });
          return;
        }
        /*获取token*/
        axios.get(httpUrl.searchToken, {
          headers: {"Authorization": "Bearer " + this.token},
          params: {text: this.searchEthText, bind_id: this.bind_id}
        }).then(res => {
          this.EthList = res.data.data.data;
          this.EthPage = res.data.data.per_page;
          this.EthTotal = res.data.data.total;
        }, err => {
          console.log(err)
        })
      },
      searchEos() {
        if(this.searchEosText==""){
          this.$message({
            message: this.$t('WalletManagement.EnterTokenNameOrAddr'),
            type: 'warning'
          });
          return;
        }
        /*获取token*/
        axios.get(httpUrl.searchToken, {
          headers: {"Authorization": "Bearer " + this.token},
          params: {text: this.searchEosText, bind_id: this.bind_id}
        }).then(res => {
          this.EosList = res.data.data.data;
          this.EosPage = res.data.data.per_page;
          this.EosTotal = res.data.data.total;
        }, err => {
          console.log(err)
        })
      },
      assetsTab() { /*切换资产*/
        if(this.managementType=='BTC'){
          this.popupMainVisible = true;
          /*获取token*/
          axios.get(httpUrl.searchToken, {
            headers: {"Authorization": "Bearer " + this.token},
            params: {text: "", bind_id: this.bind_id}
          }).then(res => {
            this.MainList = res.data.data.data;
            this.MainPage = res.data.data.per_page;
            this.MainTotal = res.data.data.total;
          }, err => {
            console.log(err)
          })
        }
        if (this.managementType=='ETH') {
          this.popupEthVisible = true;
          /*获取token*/
          axios.get(httpUrl.searchToken, {
            headers: {"Authorization": "Bearer " + this.token},
            params: {text: "", bind_id: this.bind_id}
          }).then(res => {
            this.EthList = res.data.data.data;
            this.EthPage = res.data.data.per_page;
            this.EthTotal = res.data.data.total;
          }, err => {
            console.log(err)
          })
        }
        if (this.managementType=='EOS') {
          this.popupEosVisible = true;
          /*获取token*/
          axios.get(httpUrl.searchToken, {
            headers: {"Authorization": "Bearer " + this.token},
            params: {text: "", bind_id: this.bind_id}
          }).then(res => {
            this.EosList = res.data.data.data;
            this.EosPage = res.data.data.per_page;
            this.EosTotal = res.data.data.total;
          }, err => {
            console.log(err)
          })
        }

      },
      pageCoManagingAssetsEthChangeunt(val) { /*eth分页*/
        axios.get(httpUrl.searchToken, {
          headers: {"Authorization": "Bearer " + this.token},
          params: {text: this.searchEthText, bind_id: this.bind_id, page: val}
        }).then(res => {
          this.EthList = res.data.data.data;
          this.EthPage = res.data.data.per_page;
          this.EthTotal = res.data.data.total;
        }, err => {
          console.log(err)
        })
      },
      pageCoManagingAssetsEosChangeunt(val) { /*eos分页*/
        axios.get(httpUrl.searchToken, {
          headers: {"Authorization": "Bearer " + this.token},
          params: {text: this.searchEosText, bind_id: this.bind_id, page: val}
        }).then(res => {
          this.EosList = res.data.data.data;
          this.EosPage = res.data.data.per_page;
          this.EosTotal = res.data.data.total;
        }, err => {
          console.log(err)
        })
      },
      pageCoManagingAssetsMainChangeunt(val){
        axios.get(httpUrl.searchToken, {
          headers: {"Authorization": "Bearer " + this.token},
          params: {text: this.searchMainText, bind_id: this.bind_id, page: val}
        }).then(res => {
          this.MainList = res.data.data.data;
          this.MainPage = res.data.data.per_page;
          this.MainTotal = res.data.data.total;
        }, err => {
          console.log(err)
        })
      },
      toChart(item) { /*跳转币币页面*/
        this.$router.push("/index/bbjy/macthid" + item.matchcoins[0].id)
      },
      hideBalance() {
        this.isShowBalance = !this.isShowBalance;
        if (this.isShowBalance) {
          window.localStorage.setItem("isShowBalance", true);
        } else {
          window.localStorage.setItem("isShowBalance", false);
        }
      },
      bindingShow() {
        let _this = this;
        axios.get(httpUrl.ptsswitch, {
          headers: {
            "Authorization": "Bearer " + _this.token
          }
        }).then(function (res) {
          if (res.data.data) {
            _this.value = true;
          } else {
            _this.value = false;
          }
        }, function (err) {
          console.log(err)
        })
      },
      /*搜索币种*/
      searchBz(val) {
        var _this = this;
        var to_Up = val.toUpperCase();
        _this.searchText = _this.searchText.toUpperCase();
        for (let i = 0; i < _this.AssetsList.length; i++) {
          if (_this.AssetsList[i].currency.indexOf(_this.searchText) == -1) {
            _this.AssetsList[i].isIF = false;
          } else {
            _this.AssetsList[i].isIF = true;
          }
        }
      }, //隐藏0余额
      change(val) {
        this.setData({isHidden:val});
        if (val) {
          for (let i = 0; i < this.AssetsList.length; i++) {
            if (this.AssetsList[i].balance_total == 0) {
              this.AssetsList[i].isIF = false;
            }
          }
        } else {
          for (let i = 0; i < this.AssetsList.length; i++) {
            if (this.AssetsList[i].balance_total == 0) {
              this.AssetsList[i].isIF = true;
            }
          }
        }
      },
      changeSilde() { /*切换币的余额*/
        let activeNum = this.$refs.mySwiper1.swiper.activeIndex;
        if (this.$refs.mySwiper1.swiper.progress == 1) {
          activeNum = this.$refs.mySwiper1.swiper.slides.length - 1;
        }
        let item = this.WalletList[activeNum];
        this.bind_id = this.WalletList[activeNum].id;
        this.managementType = this.WalletList[activeNum].pageIdentifier;
        this.activeIndex = activeNum;
        this.$route.params.index = activeNum;
        if (!item.list) { //判断有无list
          this.AssetsList = [];
          this.isEmpty = true;
        } else {
          this.AssetsList = item.list;
          for (let i = 0; i < this.AssetsList.length; i++) {
            this.AssetsList[i].isIF = true;
          }
          this.isEmpty = false;
        }
        this.searchText = "";
        /*清空搜索框*/
        this.change(this.checked);
      },
      initSwiper(){
        this.swiper.slideTo(this.$route.params.index, 1000, false);
      },
      getMyMoney() {
        /*获取我的钱包*/
        axios.get(httpUrl.financeAssets, {
          headers: {'Authorization': "Bearer " + this.token}
        }).then(res => {
          this.$refs.mySwiper1.swiper.activeIndex = this.$route.params.index;
          this.WalletList = res.data.data;
          this.AssetsList = res.data.data[this.$refs.mySwiper1.swiper.activeIndex].list;
          this.bind_id = res.data.data[this.$refs.mySwiper1.swiper.activeIndex].id;
          this.managementType = res.data.data[this.$refs.mySwiper1.swiper.activeIndex].pageIdentifier;
          for (let i = 0; i < this.AssetsList.length; i++) {
            this.AssetsList[i].isIF = true;
          }
          if(this.isHidden){ /*判断用户是否隐藏小额资产*/
            this.checked = true;
            this.change(this.checked);
          }

          this.initSwiper();
        }, err => {
          console.log(err)
        })
      }
    },
    computed: {
      swiper() {
        return this.$refs.mySwiper1.swiper
      }
    },
    mounted() {
      let _this = this;
      /*请求显示loading*/
      this.$ajax.interceptors.request.use(config => {
        this.loadingIsShow = true;
        return config
      }, function (err) {
        return Promise.reject(err)
      });
      this.$ajax.interceptors.response.use(response => {
        this.loadingIsShow = false;
        return response
      }, error => {
        this.loadingIsShow = false;
        return Promise.reject(error);
      });
      /*获取我的钱包*/
      this.getMyMoney();
      /*初始化轮播图滑动事件*/
      this.$refs.mySwiper1.swiper.on('slideChangeTransitionEnd', () => this.changeSilde());
      /*判断是否选择隐藏余额*/
      if (JSON.parse(window.localStorage.getItem("isShowBalance"))) {
        this.isShowBalance = true;
      } else {
        this.isShowBalance = false;
      }
      /*判断用户是否登录*/
      if (_this.token == null || _this.token == undefined) {
        return false;
      } else {
        /*获取资产信息*/
        axios.get(httpUrl.finances, {
          headers: {
            "Authorization": "Bearer " + _this.token
          }
        }).then(function (res) {
          _this.financesList = res.data.data;
          for (let i = 0; i < _this.financesList.length; i++) {
            _this.CurrencyBalance += parseFloat(_this.financesList[i].btc_blance);
            _this.RMBBalance += parseFloat(_this.financesList[i].cny_blance);
          }
        }, function (err) {
          console.log(err)
        })
        /*获取点卡数量*/
        this.$ajax.get(this.httpUrl.pointCardBalance, {
          headers: {
            "Authorization": "Bearer " + _this.token
          }
        }).then(function (res) {
          _this.pointCardBalance = res.data.data.pointcard;
          if (res.data.data.pts_on == 1) {
            _this.value = true;
          } else {
            _this.value = false;
          }
        }, function (err) {
          console.log(err)
        })
      }
      if(this.isHidden){ /*判断用户是否隐藏小额资产*/
        this.checked = true;
        this.change(this.checked);
      }
    }
  }
</script>
<style lang="scss">
  .swiper {
    height: 100px;
  }

  .el-checkbox__inner {
    background-color: transparent;
  }

  #capital {
    .mint-popup {
      width: 100%;
      height: 100%;
      background: #141738;
      overflow-y: auto;
    }
    .el-pager li {
      /*分页的背景颜色*/
      background: none;
      color: #fff;
    }

    .el-pagination .btn-next,
    .el-pagination .btn-prev {
      background: none;
      color: #fff;
    }

    .el-pager li.active,
    .el-pagination button:hover {
      color: #26b3ab;
    }

    .el-pagination button:disabled {
      color: #fff;
      background: none;
    }
  }
</style>
<style lang="scss">
  $alet_border: 0.01rem solid #1b1d3e;
  $color_gao: #696fb4;
  $blue: #5f6389;
  $color_bg: #141738;
  $textColor: #7588e0;
  /*充币 提币 交易  资金记录*/

  .Charge {
    width: 100%;
    ul {
      width: 100%;
      height: .6rem;
      display: flex;
      justify-content: space-between;
      li {
        width: 33.3%;
        height: .6rem;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        border-right: $alet_border;
        .iconfont {
          font-size: .18rem;
        }
        p {
          margin-top: .05rem;
        }
      }
    }
  }

  /*一块一块内容的背景颜色*/

  #capital {
    width: 100%;
    height: 100%;
    color: #fff;
    .el-checkbox {
      color: $color_gao !important;
    }
    .el-checkbox__label {
      font-size: 12px !important;
      padding-left: .03rem;
    }
    .el-checkbox__inner {
      border: 1px solid $color_gao;
    }
    .mint-switch-core,
    .mint-switch-core::before,
    .mint-switch-core::after {
      height: .21rem !important;
    }
  }

  /*添加EOS资产成功头部定位显示*/
  .popupEthboxPosition {
    width: 100%;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 999;
    .addSuccess {
      background: #1e2149;
      .back {
        margin-left: 0.9rem;
        .iconColor {
          color: #25cbc5;
        }
      }
    }
  }

  /*添加EOS资产输入部分样式*/
  .EosAssetscontent {
    font-size: 0.12rem;
    width: 100%;
    height: 100%;
    .EosAssetstext {
      padding: 0.25rem;
      .EosAssetstextItem {
        input {
          width: 100%;
          background: none;
          outline: none;
          border: 0px solid red;
        }
        .itemLabel {
          padding-top: 0.08rem;
          line-height: 0.28rem;
        }
        .inputStyle {
          border-bottom: 1px solid #2e3053;
          font-size: 0.14rem;
          padding: 0.08rem 0;
        }
        //修改placeholder的默认颜色：
        input::-webkit-input-placeholder {
          color: #545784;
        }
        input::-moz-placeholder { /* Mozilla Firefox 19+ */
          color: #545784;
        }
        input:-moz-placeholder { /* Mozilla Firefox 4 to 18 */
          color: #545784;
        }
        input:-ms-input-placeholder { /* Internet Explorer 10-11 */
          color: #545784;
        }
      }
    }
    .buttonWrapper {
      padding: 0.25rem;
      button {
        border: 0px;
      }
      .addButton {
        font-size: 0.15rem;
        width: 100%;
        background: #25cbc5;
        border-radius: 0.02rem;
        padding: 0.14rem 0rem;
      }
    }
    .description {
      padding: 0 0.25rem;
      color: #545784;
      line-height: 0.24rem;
    }
  }

  /*背景*/

  .background {
    background: $color_bg;
  }

  /*提示资产记录暂无*/

  .lengXiao {
    width: 100%;
    height: .3rem;
    line-height: .3rem;
    text-align: center;
    color: $blue;
    .blue{
      color: #23bab6;
    }
  }

  /*资金记录头部*/

  .friends_header {
    width: 100%;
    height: .5rem;
    position: relative;
    display: flex;
    justify-content: space-between;
    line-height: .5rem;
    box-sizing: border-box;
    border-bottom: $alet_border;
    padding: 0 .1rem;
    color: #fff;
    .yao_qing {
      width: 60%;
      text-align: center;
      position: absolute;
      left: 20%;
      font-size: .15rem;
      font-weight: 600;
    }
    .shouyi {
      font-size: .14rem;
    }
  }

  /*总资产折合*/

  .totalAssets {
    width: 100%;
    color: #fff;
    border-bottom: $alet_border;
    padding-bottom: .1rem;
    .totalAssets_top {
      width: 100%;
      height: 1.2rem;
      box-sizing: border-box;
      .balane {
        width: 90%;
        height: 1rem;
        margin: 0 auto;
        .container {
          color: #fff;
          font-size: 0.14rem;
          padding: 0.2rem;
          box-sizing: border-box;
          .WalletName {
            display: flex;
            justify-content: space-between;
            .iconColor {
              font-size: .15rem;
              color: #fff;
            }
          }
          .number {
            padding-top: 0.12rem;
            .textSize {
              font-size: 0.18rem;
            }
          }
        }
      }
      .swiper-container {
        width: 100%;
        height: 100%;
        .swiper-slide {
          width: 90% !important;
        }
      }
      .swiper {
        width: 100%;
        height: 100%;

      }
    }
    .assetsContent {
      display: flex;
      justify-content: space-between;
      width: 90%;
      margin-left: 0.2rem;
      padding: 0.1rem 0.2rem;
      box-sizing: border-box;
    }
    .bgColor1 {
      background: -webkit-linear-gradient(left, #6c9ca2, #1f7584); /* Safari 5.1 - 6.0 */
      background: -o-linear-gradient(right, #6c9ca2, #1f7584); /* Opera 11.1 - 12.0 */
      background: -moz-linear-gradient(right, #6c9ca2, #1f7584); /* Firefox 3.6 - 15 */
      background: linear-gradient(to right, #6c9ca2, #1f7584); /* 标准的语法 */
    }
    .bgColor2 {
      background: -webkit-linear-gradient(left, #9597ad, #363a59); /* Safari 5.1 - 6.0 */
      background: -o-linear-gradient(right, #9597ad, #363a59); /* Opera 11.1 - 12.0 */
      background: -moz-linear-gradient(right, #9597ad, #363a59); /* Firefox 3.6 - 15 */
      background: linear-gradient(to right, #9597ad, #363a59); /* 标准的语法 */
    }
    .bgColor3 {
      background: -webkit-linear-gradient(left, #3e445d, #282d49); /* Safari 5.1 - 6.0 */
      background: -o-linear-gradient(right, #3e445d, #282d49); /* Opera 11.1 - 12.0 */
      background: -moz-linear-gradient(right, #3e445d, #282d49); /* Firefox 3.6 - 15 */
      background: linear-gradient(to right, #3e445d, #282d49); /* 标准的语法 */
    }
    .spanColor0 {
      color: #c1d3d1;
      font-size: 0.12rem;
    }
    .spanColor1 {
      color: #c0c1c7;
      font-size: 0.12rem;
    }
    .spanColor2 {
      color: #c0c3c7;
      font-size: 0.12rem;
    }
    .swiper-pagination {
      position: absolute;
      bottom: 0;
    }
    .swiper-pagination-bullet {
      bottom: .1rem;
      width: 0.2rem;
      height: 0.03rem;
      border-radius: 0.1rem;
      background: #2a2c4f;
      opacity: 1;
      margin-left: .1rem;
      outline: none;
    }
    .swiper-pagination-bullet-active {
      background: #434998;
    }
    .oleft {
      p {
        .textColor {
          color: #c1d3d1;
        }
      }
      .title {
        font-size: .15rem;
        font-weight: 600;
        margin-bottom: .1rem;
      }
      .locationRight {
        margin-right: 0px;
      }
      .noKan {
        display: flex;
        span {
          display: flex;
          align-items: center;
          .iconfont {
            font-size: .12rem;
            transform: scale(0.7);
          }
          .iconfont:nth-last-child(1) {
            margin-right: .05rem;
          }
        }
        .yue {
          margin: 0 .1rem;
        }
      }
    }
  }

  /*点卡数量*/

  .PointCard {
    width: 100%;
    height: .5rem;
    line-height: .5rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    box-sizing: border-box;
    padding-left: .15rem;
    .left {
      display: flex;
      align-items: center;
      span {
        font-size: .15rem;
        font-weight: 600;
      }
      .num {
        margin-left: .1rem;
      }
    }
    .switch {
      box-sizing: border-box;
      padding: 0 .1rem;
      display: flex;
      align-items: center;
      background: #141738;
      .text {
        margin-left: .05rem;
      }
    }
  }

  /*资产内容*/

  .ziChan {
    width: 100%;
    min-height: 68%;
    background: $color_bg;
    border-top: .1rem solid #121528;
    .ziChan_header1 {
      width: 100%;
      height: .4rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-bottom: $alet_border;
      box-sizing: border-box;
      padding: 0 .1rem;
    }
    .ziChan_header {
      width: 100%;
      height: .4rem;
      box-sizing: border-box;
      padding: 0 .1rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: $alet_border;
      .oleft {
        display: flex;
        align-items: center;
        .iconfont {
          color: #5f6eed;
          font-size: .18rem;
        }
        .iconSize {
          font-size: .16rem;
          color: #6c7ccf;
        }
        input {
          border: none;
          background: none;
          outline: none;
          color: #fff;
          box-sizing: border-box;
          padding-left: .1rem;
        }
        input::-webkit-input-placeholder {
          color: $color_gao;
        }
      }
      .oRight {
        color: #23bab6;
      }
      .ziChan_header1 {
        display: flex;
        justify-content: space-between;
        align-items: center;
        color: #6c7ccf;
        span {
          margin-right: 0.08rem;
        }
        .iconColor {
          color: #FFF;
        }
      }
    }
  }

  /*资产列表*/

  .zhiChan_list {
    width: 100%;
    .zhiChan_item {
      width: 100%;
      box-sizing: border-box;
      align-items: center;
      padding: 0 .1rem;
      color: #fff;
      border-bottom: $alet_border;
      .itemTitle {
        display: flex;
        justify-content: space-between;
        padding-top: .1rem;
        padding-bottom: 0.1rem;

      }
      .itemContent {
        display: flex;
        justify-content: space-between;
        padding-bottom: 0.1rem;
        .center:nth-of-type(1){
          width: 35%;
        }
        .center:nth-of-type(2){
          width: 25%;
        }
        .center:nth-last-child(1){
          width: 35%;
          text-align: right;
          .text{
            margin-right: .16rem;
          }
        }
      }
      /*div {
        width: 33.3%;
      }*/
      .currency {
        width: 15%;
        font-size: .13rem;
      }
      .Positionright {
        display: flex;
        justify-content: space-between;
        align-items: center;
        .bbjy {
          padding-right: 0.08rem;
          color: $textColor;
        }
        .arrows {
          .changeColor {
            background: -webkit-linear-gradient(left, #5b69b0, #7588e0); /* Safari 5.1 - 6.0 */
            background: -o-linear-gradient(right, #5b69b0, #7588e0); /* Opera 11.1 - 12.0 */
            background: -moz-linear-gradient(right, #5b69b0, #7588e0); /* Firefox 3.6 - 15 */
            background: linear-gradient(to right, #5b69b0, #7588e0); /* 标准的语法 */
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
          }
          .iconfont {
            font-size: .12rem;
          }
        }
      }
      .center {
        .price {
          line-height: 0.25rem;
        }
        .text {
          color: $blue;
        }
        .iconColor {
          color: #4a4d7d;
        }
      }
      .right {
        text-align: left;
        box-sizing: border-box;
        padding-left: .1rem;
      }
    }
  }

  /*地址头部*/
  .popupEth_header {
    width: 100%;
    height: .5rem;
    line-height: .5rem;
    display: flex;
    justify-content: space-between;
    position: relative;
    color: #fff;
    background: rgb(20, 23, 56);
    .back {
      margin-left: .15rem;
    }
    .register_type {
      position: absolute;
      top: 0;
      left: 20%;
      width: 60%;
      height: .5rem;
      line-height: .5rem;
      text-align: center;
      font-size: .15rem;
      font-weight: 600;
    }
    .addAssets {
      margin-right: .1rem;
    }
  }

  /*搜索地址头部*/
  .searchBox {
    width: 100%;
    height: .4rem;
    box-shadow: .01rem .02rem .08rem #000;
    box-sizing: border-box;
    padding: 0 .15rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: #7174a1;
    input {
      width: 85%;
      height: .25rem;
      border: none;
      background: none;
      color: #fff;
    }
    input::-webkit-input-placeholder {
      color: #7174a1;
    }
  }

  /*资产*/
  .assetsWrapper {
    box-sizing: border-box;
    padding-left: .15rem;
    .assetsItem {
      width: 100%;
      height: .75rem;
      border-bottom: .01rem solid #252849;
      .curName {
        height: .4rem;
        line-height: .5rem;
      }
      .token {
        line-height: .2rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .token {
          color: #7174a1;
        }
        .iconfont {
          margin-right: .1rem;
          color: #26b3ab;
        }
      }
    }
  }

  .noData {
    width: 100%;
    text-align: center;
    line-height: .25rem;
  }

  .pageCount {
    height: .5rem;
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>
