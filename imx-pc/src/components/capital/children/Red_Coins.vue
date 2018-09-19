<template>
  <div id="red_coins">
    <!--充币头部-->
    <div class="red_coins_title">
      <p class="red_coins_title_text">
        {{$t("capital.Deposit")}}
      </p>
    </div>
    <!--历史地址弹框-->
    <div class="Historical_address" v-show="HistorAddressIsShow">
      <div class="Historical_address_content" :class="{'Historical_address_content_white':getColor==1}">
        <!--历史地址头部-->
        <div class="Historical_address_content_title">
          <span>{{$t("capital.DepositHistory")}}</span>
          <i class="iconfont icon-cuowu" @click="HistorAddressIsShow=false"></i>
        </div>
        <div style="clear: both;"></div>
        <!--创建时间-->
        <div class="createTime">
          <p class="time">{{$t("otc.CreationTime")}}</p>
          <p class="add">{{$t("capital.Address")}}</p>
        </div>
        <!--历史内容-->
        <ul class="Histor_content">
          <!--判断暂时没有记录-->
          <div class="HistoryList" v-show="addressHistoryList.length==0">{{$t("list.noData")}}</div>
          <li v-for="item in addressHistoryList">
            <p class="time">{{item.created_at}}</p>
            <p class="add">{{item.address}}</p>
          </li>
        </ul>

      </div>
    </div>
    <!--币种内容-->
    <div class="red_coins_content" :class="{'red_coins_content_white':getColor==1}">
      <!--币种-->
      <div class="select">
        <span class="select_title">{{$t("otc.Currency")}}</span>
        <div class="select_bz">
          <el-select v-model="value" :placeholder="$t('userCenter.Pleasechoose')" @change="change(value)">
            <el-option v-for="item in coin_matching" :key="item.pageIdentifier" :label="item.pageIdentifier"
                       :value="item.id">
            </el-option>
          </el-select>
        </div>
        <router-link to="/index/Applicationcurrency" target="_blank" class="Notfound">{{$t("capital.notfound")}}
        </router-link>
      </div>
      <div style="clear: both;"></div>
      <!--地址-->
      <div class="address">
        <span class="address_title">{{$t("capital.Address")}}</span>
        <div class="address-str">
          <p class="address-str-text" id="address">{{address}}</p>
          <i class="iconfont icon-erweima"></i>
          <div class="img">
            <img :src="qrcode"/>
          </div>
        </div>
        <div class="tishi" v-show="copySuccess">
          <i class="iconfont icon-duihao2"></i> {{$t("capital.Successfullycopied")}}
        </div>
        <div class="copy">
          <span class="btn" id="copy" data-clipboard-action="copy" data-clipboard-target="#address">{{$t("capital.Copy")}}</span>
          <span @click="HistoricalAddress()">{{$t("capital.DepositHistory")}}</span>
        </div>
      </div>
      <!--标签-->
      <div class="address" v-if="isLabelShow">
        <span class="address_title">{{$t("capital.Addresslabel")}}</span>
        <div class="address-str">
          <p class="address-str-text" id="labelContent">{{originAddress}}</p>
        </div>
      </div>
      <!--禁止内容-->
      <div class="prohibit_html" v-html="prohibitHtml"></div>
    </div>
    <!--充币记录-->
    <div class="Charge_record2" :class="{'Charge_record2_white':getColor==1}">
      <p class="Charge_record_title">
        <span class="active_border" @click="tab(0)">{{$t("capital.Chargingrecords")}}</span>
      </p>
      <div class="box" v-show="boxIsShow">
        <!--记录数据-->
        <ul class="Charge_record_content">
          <li>{{$t("capital.DepositAddress")}}</li>
          <li>{{$t("capital.Amount")}}</li>
          <li>{{$t("capital.UpdateTime")}}</li>
          <li>{{$t("capital.Status")}}</li>
        </ul>
        <ul class="Charge_record_content_list" v-for="item in Charge_record">
          <li>{{item.address}}</li>
          <li>{{item.balance | number(item.get_currency.displayNum)}}</li>
          <li>{{formatTime(item.created_at)}}</li>
          <li>
            <span v-show="item.status==1">{{$t("capital.Approve")}}</span>
            <span v-show="item.status==-1">{{$t("capital.Unapprove")}}</span>
            <span v-show="item.status==0">{{$t("capital.Processing")}}</span>
          </li>
        </ul>
        <div class="pageCount" v-show="Charge_record.length!=0">
          <div class="button">
            <el-pagination layout="prev, pager, next" background :page-size="topage" @current-change="pageChange"
                           :total="total">
            </el-pagination>
          </div>
        </div>
        <!--暂无记录-->
        <div class="No_record" v-show="Charge_record.length==0">
          <p>{{$t("list.noData")}}</p>
        </div>
      </div>

      <div class="box" v-show="!boxIsShow">
                <ul class="Charge_record_content1">
                    <li>{{$t("capital.ProjecNtame")}}</li>
                    <li>{{$t("capital.MoneySort")}}</li>
                    <li>{{$t("capital.ApplyTime")}}</li>
                    <li>{{$t("capital.Stage")}}</li>
                    <li>{{$t("capital.State")}}</li>
                    <!--<li>{{$t("capital.Operate")}}</li>-->
                </ul>
                <ul class="Charge_record_content_list1" v-for="item in match_coin_apply_list">
                    <li>{{item.projectEn}}</li>
                    <li>{{item.pageIdentifier}}</li>
                    <li>{{item.release_at}}</li>
                    <li v-if="item.status ==0">审核中</li>
                    <li v-if="item.status ==1">审核通过</li>
                    <li v-if="item.status ==-1">被驳回</li>
                    <li v-if="item.status ==1">已上线</li>
                    <li v-if="item.status !=1">未上线</li>
                    <li @click="goToUpMoney(item)" class="gotoupmoney">查看</li>
                </ul>
        <!--暂无记录-->
        <div class="No_record" v-show="match_coin_apply_list.length==0">
          <p>{{$t("list.noData")}}</p>
        </div>
        </div>
    </div>
    <!--已申请的项目-->
    <div class="appliedProjects">

    </div>
  </div>
</template>

<script>
  import {httpUrl} from "../../http_url/http_url";
  import axios from "axios";
  import $ from "jquery";
  import {mapGetters, mapActions, mapState, mapMutations} from 'vuex'

  export default {
    data() {
      return {
        value: '',
        /*申请项目列表*/
        match_coin_apply_list:[],
        /*币对ID*/
        coin_matching: [],
        /*获取所有币对*/
        address: "",
        /*二维码地址*/
        qrcode: "",
        total: 0,
        /*总条数*/
        topage: 10,
        /*显示几天*/
        /*获取图片*/
        HistorAddressIsShow: false,
        /*显示隐藏*/
        addressHistoryList: [],
        /*获取指定币种的历史地址*/
        Charge_record: [],
        /*充币记录*/
        copySuccess: false,
        /*复制成功*/
        prohibitHtml: "",
        /*html片段*/
        boxIsShow: true,
        /*盒子切换*/
        labelContent: '',
        /*label标签的显示内容，从接口中获取*/
        isLabelShow: false,
        /*判断label标签是否显示*/
        originAddress: ''
      }
    },
    filters: {
      //小数点过滤器 不四舍五入
      number(value, num) {
        var toFixedNum = Number(value).toFixed(num + 1);
        var realVal = toFixedNum.substring(0, toFixedNum.lastIndexOf('.') + num + 1);
        return realVal;
      }
    },
    computed:{
      ...mapState('user',['lang']),
    },
    methods: {
      tab(type) { /*切换*/
        if (type == 0) {
          this.boxIsShow = true;
          $(".Charge_record_title span").eq(0).addClass("active_border").siblings("span").removeClass("active_border");
        } else {
          this.boxIsShow = false;
          $(".Charge_record_title span").eq(1).addClass("active_border").siblings("span").removeClass("active_border");
        }
      },
      /* 查看或者修改上币信息*/
      goToUpMoney(item){
        this.$router.push({ name: 'moneyUp', params:item});
      },
      /*换页*/
      /*换页事件*/
      pageChange(val) {
        var _this = this;
        _this.callback();
        /*刷新token判断*/
        axios.get(httpUrl.recharge, {
          params: {
            "page": val,
            "currency_id": _this.value
          },
          headers: {
            "Authorization": "Bearer " + _this.token
          }
        }).then(function (res) {
          _this.Charge_record = res.data.data.data;
        }, function (err) {
          console.log(err)
        })
      },
      /*显示隐藏历史地址*/
      HistoricalAddress() {
        var _this = this;
        _this.callback();
        /*刷新token判断*/
        axios.get(httpUrl.addressHistory, {
          headers: {
            "Authorization": "Bearer " + _this.token
          },
          params: {
            "currency_id": _this.value
          }
        }).then(function (res) {
          _this.addressHistoryList = res.data.data;
          _this.HistorAddressIsShow = true;
        }, function (err) {
          console.log(err)
        })

      },
      /*切换币种*/
      change(id) {
        var _this = this;
        _this.callback();
        /*刷新token判断*/
        _this.address = "";
        /*先清空地址*/
        axios.get(httpUrl.wallet_address, {
          headers: {
            "Authorization": "Bearer " + _this.token
          },
          params: {
            "currency_id": id
          }
        }).then(function (res) {
          _this.address = res.data.data.address;
          _this.qrcode = res.data.data.qrcode;
          if (res.data.data.address) {
            /*遍历获取的币种信息，拿到列表提示内容部分*/
            for (let i = 0; i < _this.coin_matching.length; i++) {
              if (_this.coin_matching[i].id == id) {
                _this.prohibitHtml = _this.coin_matching[i].coin_promting;
                if (_this.coin_matching[i].isLabel == 1) {
                  _this.isLabelShow = true;
                  _this.originAddress = res.data.data.address;
                  _this.address = _this.coin_matching[i].labelText;
                } else {
                  _this.isLabelShow = false;
                  _this.address = res.data.data.address;
                }
              }
            }
          }


        }, function (err) {
          console.log(err)
        })
        /*获取交易记录*/
        axios.get(httpUrl.recharge, {
          headers: {
            "Authorization": "Bearer " + _this.token
          },
          params: {
            currency_id: id,
            type: 1
          }
        }).then(function (res) {
          _this.Charge_record = res.data.data.data;
          _this.total = Number(res.data.data.total);
        }, function (err) {
          console.log(err)
        })
      }
    },
    mounted() {
      var _this = this;
      let matchCoinApply =this.api.matchCoinApply(_this.token);
     /*获取已经申请币种列表*/
      matchCoinApply.matchCoinApplyGet({}).then(function (res) {
        _this.match_coin_apply_list=res.data.data;
      }).catch(function (err) {
        console.log(err);
      });
      let lang;
      if(this.lang=='zh-CN'){
        lang = 'zh';
      }else{
        lang = 'en';
      }
      /*获取所有币对*/
      axios.get(httpUrl.currencyWallet, {
        headers: {
          "Authorization": "Bearer " + _this.token
        },
        params:{
          lang:lang
        }
      }).then(function (res) {
        _this.prohibitHtml = res.data.data[0].coin_promting;
        _this.coin_matching = res.data.data;
        /*跳转默认显示*/
        if (_this.$route.params.key == undefined) {
          _this.value = _this.coin_matching[0].id;
          /*初始化获取用户钱包地址*/
          axios.get(httpUrl.wallet_address, {
            headers: {
              "Authorization": "Bearer " + _this.token
            },
            params: {
              "currency_id": _this.value
            }
          }).then(function (res) {
            _this.address = res.data.data.address;
            _this.qrcode = res.data.data.qrcode;
          }, function (err) {
            console.log(err)
          })
          /*默认选项*/
        } else {
          _this.value = _this.$route.params.key;
          _this.change(_this.$route.params.key);
        }
        /*获取交易记录*/
        axios.get(httpUrl.recharge, {
          headers: {
            "Authorization": "Bearer " + _this.token
          },
          params: {
            currency_id: _this.value,
            type: 1
          }
        }).then(function (res) {
          _this.Charge_record = res.data.data.data;
          _this.total = res.data.data.total;
        }, function (err) {
          console.log(err)
        })
      }, function (err) {
        console.log(err)
      })
      /*复制和粘贴*/
      var clipboard = new Clipboard(".btn");
      clipboard.on("success", function (e) {
        _this.copySuccess = true;
        setTimeout(function () {
          _this.copySuccess = false;
        }, 1000)
      })
      clipboard.on("error", function (e) {
        console.log("复制失败")
      })

    }
  }
</script>

<style lang="scss">
  /*白色版本开始*/
  .gotoupmoney{
    cursor: pointer;
  }
    .Charge_record_content_list1{
      text-align: center;
    }
  .red_coins_content_white {
    background: #fff !important;
    color: #333;
    border: 2px solid #ddd !important;
    border-top: none !important;
    .el-input__inner {
      background: #fff !important;
      color: #000 !important;
    }
    .address {
      .img {
        background: #eee !important;
      }
    }
    .Notfound {
      color: #000 !important;
    }
  }

  .Charge_record2_white {
    background: #fff !important;
    .Charge_record_content {
      li:nth-of-type(1) {
        box-sizing: border-box;
        padding-left: 10px;
      }
    }
    .Charge_record_title {
      border-bottom: 1px solid #eee !important;
    }
    .Charge_record_title {
      span {
        color: #000;
      }
    }

    .No_record,
    .Charge_record_content_list1 {
      color: #000 !important;
    }
    .Charge_record_content_list {
      li {
        color: #333 !important;
      }
      li:nth-of-type(1) {
        box-sizing: border-box;
        padding-left: 10px;
      }
    }
  }

  /*历史地址部分*/

  .Historical_address_content_white {
    background: #fff !important;
    color: #000 !important;
    .Historical_address_content_title {
      border-bottom: 1px solid #ddd !important;
    }
    .Histor_content {
      border-bottom: 1px solid #ddd !important;
      .time {
        color: #333 !important;
      }
      .add {
        color: #000 !important;
      }
    }
  }

  /*白色版本结束*/
  /*边框内部*/

  .border_nei {
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    border: 3px solid #0b0b15;
  }

  /*历史地址*/

  .Historical_address {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 999;
    background: rgba(0, 0, 0, 0.5);
    .Historical_address_content {
      position: fixed;
      left: 38%;
      top: 30%;
      z-index: 100;
      width: 500px;
      height: 280px;
      color: #fff;
      background: #222140;
      box-sizing: border-box;
      padding: 0 20px;
      /*头部*/
      .Historical_address_content_title {
        width: 100%;
        height: 50px;
        line-height: 50px;
        border-bottom: 1px solid #454167;
        span {
          float: left;
          font-size: 15px;
        }
        .iconfont {
          cursor: pointer;
          float: right;
        }
      }
      /*时间头部*/
      .createTime {
        width: 100%;
        height: 50px;
        line-height: 50px;
        p {
          float: left;
          color: #5e5ebb;
        }
        .time {
          width: 45%;
        }
        .add {
          width: 54%;
        }
      }
      /*时间内容*/
      .Histor_content {
        width: 100%;
        height: 120px;
        position: relative;
        border-bottom: 1px solid #454167;
        overflow-x: hidden;
        overflow-y: auto;
        .HistoryList {
          position: absolute;
          top: 35%;
          left: 25%;
          width: 50%;
          text-align: center;
          font-size: 15px;
        }
        li {
          width: 100%;
          height: 50px;
          line-height: 50px;
          p {
            float: left;
            color: #fff;
          }
          .time {
            width: 45%;
          }
          .add {
            width: 54%;
          }
        }
      }
    }
  }

  /*充币的大盒子*/

  #red_coins {
    color: #fff;
    /*分页样式*/
    .el-pagination.is-background .el-pager li.active {
      background: #9F99F2;
    }
    .el-select {
      width: 100% !important;
      .el-input {
        width: 100% !important;
      }
    }
    .el-input {
      width: 100% !important;
      float: left;
    }
    .el-input__inner {
      width: 100% !important;
      height: 40px !important;
      color: #fff;
      border: 1px solid #2c3983;
      background: #101034;
    }
  }

  /*头部内容*/

  .red_coins_title {
    width: 100%;
    height: 45px;
    line-height: 45px;
    .red_coins_title_text {
      display: inline-block;
      padding: 0 35px;
      text-align: center;
      font-size: 15px;
      background: #272867;
    }
  }

  /*币种内容*/

  .red_coins_content {
    width: 100%;
    background: #16182c;
    /*选择内容*/
    .select {
      width: 100%;
      height: 80px;
      line-height: 80px;
      .select_title {
        display: inline-block;
        float: left;
        margin: 0 15px;
        font-size: 15px;
      }
      .select_bz {
        float: left;
        width: 220px;
        height: 80px;
      }
      .Notfound {
        font-size: 12px;
        margin-left: 15px;
        cursor: pointer;
        color: #fff;
      }
    }
  }

  /*地址*/

  .address {
    width: 100%;
    height: 80px;
    line-height: 80px;
    position: relative;
    .tishi {
      width: 100px;
      text-align: center;
      /*height: 35px;*/
      line-height: 30px;
      color: #fff;
      font-size: 14px;
      background: #414182;
      box-shadow: 2px 2px 5px #000;
      border-radius: 2px;
      position: absolute;
      top: 30%;
      left: 20%;
      z-index: 999;
      .icon-duihao2 {
        color: #4b9b5e;
        margin-right: 6px;
      }
    }
    .address_title,
    .address-str,
    .copy {
      float: left;
    }
    .address_title {
      display: inline-block;
      float: left;
      margin: 0 15px;
      font-size: 15px;
    }
    /*获取的字符串*/
    .address-str {
      width: 370px;
      height: 40px;
      position: relative;
      line-height: 40px;
      border: 1px solid #2c3983;
      border-radius: 4px;
      margin-top: 20px;
      .img {
        width: 140px;
        height: 140px;
        position: absolute;
        right: -40px;
        top: 50px;
        z-index: 999;
        background: #262a42;
        display: none;
        img {
          width: 120px;
          height: 120px;
          display: block;
          margin: 10px auto;
        }
      }
      .address-str-text {
        width: 90%;
        height: 40px;
        box-sizing: border-box;
        padding-left: 10px;
        font-size: 14px;
        float: left;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .iconfont {
        float: left;
        cursor: pointer;
      }
      .iconfont:hover + .img {
        display: block;
      }
    }
    /*复制内容*/
    .copy {
      span {
        color: #8078a3;
        margin-left: 25px;
        cursor: pointer;
      }
    }
  }

  /*提示信息*/

  .information {
    width: 100%;
    padding-bottom: 20px;
    border-bottom: 1px solid #575284;
    p {
      font-size: 13px;
      margin-left: 60px;
      margin-top: 10px;
    }
  }

  /*禁止内容*/

  .prohibit_html {
    margin-bottom: 25px;
      p {
        height: 30px;
        line-height: 30px;
        margin-left: 60px;
      }
  }

  .active_border {
    color: #9791e8 !important;
    border-bottom: 2px solid #9791e8;
  }

  /*充币记录*/

  .Charge_record2 {
    width: 100%;
    margin-top: 20px;
    background: #16182c;
    box-sizing: border-box;
    padding: 0 10px;
    .Charge_record_title {
      width: 100%;
      height: 40px;
      line-height: 40px;
      border-bottom: 1px solid #2e3157;
      span {
        cursor: pointer;
        display: inline-block;
        height: 40px;
        font-size: 14px;
        box-sizing: border-box;
        margin-right: 50px;
      }
    }
    /*记录的数据*/
    .Charge_record_content1,
    .Charge_record_content_list1 {
      text-align: center;
      display: flex;
      height: 40px;
      align-items: center;
      color: #7a74c3;
      li {
        flex: 1;
        text-align: center;
      }
      li:nth-of-type(1) {
        text-align: left;
        flex: 1;
      }
      li:nth-of-type(3) {
        flex: 1.5;
      }
      li:nth-last-child(1) {
        text-align: right;
        box-sizing: border-box;
      }
    }
    .Charge_record_content_list1 {
      color: #fff;
    }
    .Charge_record_content,
    .Charge_record_content_list {
      width: 100%;
      height: 40px;
      li {
        width: 23%;
        height: 40px;
        float: left;
        color: #7a74c3;
        line-height: 40px;
        text-align: center;
      }
      li:nth-of-type(1) {
        width: 30%;
        text-align: left;
      }
      li:nth-last-child(1) {
        text-align: left;
        box-sizing: border-box;
        padding-left: 150px;
      }
    }
    /*数据*/
    .Charge_record_content_list {
      li {
        color: #fff;
      }
      li:nth-last-child(1) {
        padding-left: 162px;
      }
    }
    /*暂无记录*/
    .No_record {
      width: 100%;
      height: 50px;
      line-height: 50px;
      text-align: center;
      color: #fff;
      font-size: 14px;
    }
    /*分页*/
    .pageCount {
      width: 100%;
      height: 60px;
      .button {
        float: right;
        margin-top: 15px;
        span {
          display: inline-block;
          width: 20px;
          height: 20px;
          font-size: 14px;
          line-height: 20px;
          text-align: center;
          cursor: pointer;
        }
        i {
          font-size: 14px;
          cursor: pointer;
        }
      }
    }
  }
</style>
