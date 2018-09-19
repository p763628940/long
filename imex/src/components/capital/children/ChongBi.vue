<template>
  <div id="chongbi">
    <!--充币头部-->
    <my-header :text="header_title"></my-header>
    <!--底部内容-->
    <div class="box_content">
      <div class="mian">
        <p class="currencyName">{{$t("WalletManagement.Deposit")}} {{curName}}</p>
        <img :src="qrcode"/>
        <div class="address" id="address">
          {{addressStr}}
          <i class="iconfont icon-fuzhi1" id="copy" :data-clipboard-text="addressStr" @click="copy()" v-if="isLabelShow"></i>
        </div>
        <!--标签-->
        <div class="label" v-if="isLabelShow">
          <div class="label_title"></div>
          <div class="address-str">
            <p class="address-str-text" id="labelContent">
              tag{{$t("capital.Label")}}:
              {{originAddress}}
              <i class="iconfont icon-fuzhi1" id="copy" :data-clipboard-text="originAddress" @click="copy()"></i>
            </p>
          </div>
        </div>
        <div class="button" v-if="!isLabelShow">
          <button id="copy" :data-clipboard-text="addressStr" @click="copy()">
            {{$t("capital.Copy")}}{{$t("capital.Address")}}
          </button>
          <button @click="addressHistory">{{$t("capital.DepositHistory")}}</button>
        </div>
      </div>
    </div>
    <!--温馨提示-->
    <div class="Prompthtml" v-html="prohibitHtml"></div>
    <mt-popup v-model="HistoryIsShow" position="right">
      <div class="header_box">
        <div class="register_header">
          <p class="back" @click="HistoryIsShow=false">
            <i class="iconfont icon-zuojiantou"></i>
          </p>
          <p class="register_type">
            {{$t("capital.DepositHistory")}}
          </p>
        </div>
        <!--创建时间+地址-->
        <div class="time_address">
          <span>{{$t("otc.CreationTime")}}</span>
          <span>{{$t("capital.Address")}}</span>
        </div>
        <ul class="Adresslist">
          <li v-for="item in HistoryAdressList">
            <p class="time">{{formatTime(item.created_at)}}</p>
            <p class="add">{{item.address}}</p>
          </li>
        </ul>
        <!--没有显示-->
        <div class="noData" v-show="HistoryAdressList.length==0">
          {{$t("list.noData")}}
        </div>
      </div>
    </mt-popup>

  </div>
</template>

<script>
  import header from "../../public/backHeader.vue";
  import {Message} from 'element-ui';
  import $ from "jquery";
  import { mapGetters,mapActions,mapState,mapMutations } from 'vuex'

  export default {
    data() {
      return {
        header_title: this.$t("capital.Deposit"),
        popupVisible: false,
        coin_matching: [],
        /*获取所有币对*/
        currencyList: [],
        /*币种列表*/
        currencyName: "",
        /*当前币种*/
        copySuccess: false,
        /*复制成功*/
        addressStr: "",
        /*地址*/
        currencyID: this.$route.params.curId,
        /*当前币的ID*/
        qrcode: "",
        /*图片地址*/
        HistoryAdressList: [],
        /*历史地址*/
        HistoryIsShow: false,
        /*显示*/
        prohibitHtml: "",
        /*币种详细信息*/
        labelContent: '', /*label标签的显示内容，从接口中获取*/
        isLabelShow: false, /*判断label标签是否显示*/
        originAddress: '',/*用于页面显示标签的值*/
        curName:"",  /*币种名称*/
        // lang:window.localStorage.getItem("lang"), /*语言*/
      }
    },
      computed:{
			...mapState('user',['lang']),
		},
    components: {
      "my-header": header
    },
    mounted() {
      let _this = this;
      console.log()
      /*获取所有币对信息*/
      this.$ajax.get(this.httpUrl.currencyWallet, {
        headers: {
          "Authorization": "Bearer " + _this.token
        },
        params:{
          lang:this.lang
        }
      }).then(res=>{
        this.coin_matching = res.data.data;
        /*初始化获取用户钱包地址*/
        _this.$ajax.get(_this.httpUrl.wallet_address, {
          headers: {
            "Authorization": "Bearer " + _this.token
          },
          params: {
            "currency_id": _this.currencyID
          }
        }).then(function (res) {
          _this.qrcode = res.data.data.qrcode;
          if (res.data.data.address) {
            /*遍历获取的币种信息，拿到列表提示内容部分*/
            for (let i = 0; i < _this.coin_matching.length; i++) {
              if (_this.coin_matching[i].id == _this.currencyID) {
                _this.prohibitHtml = _this.coin_matching[i].coin_promting;
                _this.curName = _this.coin_matching[i].pageIdentifier;
                if (_this.coin_matching[i].isLabel == 1) {
                  _this.isLabelShow = true;
                  _this.originAddress = res.data.data.address;
                  _this.addressStr = _this.coin_matching[i].labelText;
                } else {
                  _this.isLabelShow = false;
                  _this.addressStr = res.data.data.address;
                }
              }
            }
          }
        }, function (err) {
          console.log(err)
        })
      },err=>{
        console.log(err)
      })
      /*获取提币地址*/
      _this.$ajax.get(_this.httpUrl.addressHistory, {
        headers: {
          "Authorization": "Bearer " + _this.token
        },
        params: {
          "currency_id": _this.currencyID
        }
      }).then(function (res) {
        _this.HistoryAdressList = res.data.data;
      }, function (err) {
        console.log(err)
      })


    },
    methods: {
      addressHistory(){
        let _this = this;
        /*获取历史地址*/
        this.$ajax.get(this.httpUrl.addressHistory, {
          headers: {
            "Authorization": "Bearer " + _this.token
          },
          params: {
            "currency_id": _this.currencyID
          }
        }).then(function (res) {
          _this.HistoryAdressList = res.data.data;
          _this.HistoryIsShow=true;
        }, function (err) {
          console.log(err)
        })

      },
      copy() { /*复制粘贴*/
        let _this = this;
        var clipboard = new Clipboard('#copy');
        clipboard.on('success', e => {
          _this.$message({
            message: _this.$t("InvitationCode.Replicatingsuccess"),
            type: 'success'
          });
          // 释放内存
          clipboard.destroy()
        })
        clipboard.on('error', e => {
          _this.$message({
            message: _this.$t("shouye.Phonedoesnotsup"),
            type: 'error'
          });
          // 释放内存
          clipboard.destroy()
        })
      }
    }
  }
</script>
<style lang="scss">
  .label_title {
    display: block;
    width: 100%;
    margin-bottom: 0.15rem;
    text-align: center;
  }

  .label {
    margin-bottom: 0.15rem;
  }

  #chongbi {
    .mint-popup {
      width: 100%;
      height: 100%;
      background: #141738;
      overflow-y: auto;
    }
  }

  .el-message {
    /*width: 2.5rem;*/
    min-width: 2.5rem;
  }

  .el-message--success {
    background-color: #fff;
    border-color: #e1f3d8;
    border-top: 2px solid #22d9b8;
  }

  .el-message .el-icon-success {
    font-size: .15rem;
    color: #22d9b8;
  }

  .el-message--success .el-message__content {
    color: #000;
  }
</style>
<style lang="scss">
  $back_color: #141738;
  /*充币*/

  #chongbi {
    width: 100%;
    min-height: 100%;
    color: #fff;
    background: $back_color;
    .box_content {
      width: 100%;
      height: 82%;
      background: $back_color;
      margin-top: .1rem;
    }
  }

  /*币种选择*/

  .tab_currency {
    width: 100%;
    height: .4rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    box-sizing: border-box;
    padding: 0 .15rem;
    background: $back_color;
    border-top: 0.01rem solid #111627;
  }

  /*图片主区*/

  .mian {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    .currencyName{
      margin: .15rem 0;
    }
    img {
      width: 1.2rem;
      height: 1.2rem;
      display: block;
    }
    .address {
      width: 1.5rem;
      text-align: center;
      word-wrap: break-word;
      word-break: normal;
      margin-top:.15rem;
    }
    .button {
      width: 2.7rem;
      display: flex;
      justify-content: space-between;
      margin-top: .2rem;
      margin-bottom: .1rem;
      button {
        width: 1.2rem;
        height: .4rem;
        background: #00cfc6;
        border: none;
        border-radius: .02rem;
      }
    }
  }

  /*提示内容*/

  .prohibit_html {
    width: 100%;
    box-sizing: border-box;
    padding: 0 .13rem;
    margin-top: .2rem;
    ul {
      p {
        list-style-type: block;
        color: #9298e1 !important;
        margin-bottom: .05rem;
        line-height: .2rem;
        text-indent: 1.5em;
      }
      p:before {
        content: "·";
        font-size: .16rem;
        font-weight: bold;
        margin-right: .05rem;
      }
    }
  }

  /*币种选择头部*/

  .register_header {
    width: 100%;
    height: .5rem;
    line-height: .5rem;
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
      text-align: center;
      font-size: .15rem;
      font-weight: 600;
    }
  }

  $border_bottom: 1px solid #1b1d3e;
  /*币种列表选项*/

  .currencyList {
    width: 100%;
    li {
      width: 100%;
      height: .37rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-bottom: $border_bottom;
      color: #fff;
      box-sizing: border-box;
      padding: 0 .1rem;
      .iconfont {
        display: none;
      }
    }
    li:nth-of-type(1) {
      .iconfont {
        display: block;
      }
    }
  }

  /*历史地址的时间和地址*/

  .time_address {
    width: 100%;
    display: flex;
    box-sizing: border-box;
    padding: 0 .1rem;
    span {
      display: block;
      width: 50%;
      height: .3rem;
      line-height: .3rem;
      color: #5e5ebb;
    }
  }

  .Adresslist {
    li {
      width: 100%;
      display: flex;
      box-sizing: border-box;
      padding: 0 .1rem;
      p {
        display: block;
        width: 50%;
        height: .3rem;
        line-height: .3rem;
        color: #fff;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: normal;
      }
    }
  }

  /*没有数据展示*/
  .noData {
    width: 100%;
    height: .5rem;
    text-align: center;
    line-height: .5rem;
    color: #fff;
  }
  /*温馨提示*/
  .Prompthtml{
    width: 100%;
    box-sizing: border-box;
    padding: 0 .2rem;
    p{
      line-height: .3rem;
    }
  }


</style>
