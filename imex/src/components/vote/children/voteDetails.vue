<template>
  <div id="voteDetails">
    <!--进行高级认证-->
    <div class="men_ban" v-if="isIdentity"></div>
    <div class="Identity" v-if="isIdentity">
      <div class="content">
        {{$t("vote.CanNotdAvancedVote")}}
      </div>
      <router-link to="/senior" tag="div" class="button">{{$t("vote.AdvancedCer")}}</router-link>
    </div>
    <div class="Close" v-if="isIdentity" @click="isIdentity=false">
      <i class="iconfont icon-quxiao1"></i>
    </div>

    <!--投票-->
    <div class="men_ban" v-if="isVote"></div>
    <div class="vote" v-if="isVote">
      <div class="title">
        <p>{{$t("vote.ImmediatVote")}}</p>
        <p>{{$t("vote.OnlyOneVote")}}</p>
      </div>
      <div class="content">
        <div class="zan" @click="ThumbsUp">
          <p class="icon" :class="{'animated bounceIn':isThumbsUp,'Fabulous':isThumbsUp}">
            <i class="iconfont icon-zan3"></i>
          </p>
          <p class="zanText">{{$t("vote.Like")}}</p>
        </div>
        <div class="cai" @click="StepOn">
          <p class="icon" :class="{'stepon':isStepOn}">
            <i class="iconfont icon-cai1-copy"></i>
          </p>
          <p class="caiText">{{$t("vote.Boo")}}</p>
        </div>
      </div>
      <div class="bottom" @click="ConfirmVote">
        {{$t("vote.ConfirmVote")}}
      </div>
    </div>
    <div class="Close1" v-if="isVote" @click="isVote=false;isThumbsUp=false;isStepOn=false;result='';">
      <i class="iconfont icon-quxiao1"></i>
    </div>
    <!--	头部内容-->
    <div class="fixed_header">
      <div class="userCenter_Height">
        <router-link tag="i" to="/vote" class="iconfont icon-zuojiantou"></router-link>
        <p>{{$t("vote.VoteDetails")}}</p>
      </div>
    </div>
    <div class="oHeight"></div>
    <div class="DetailHeader">
      <div class="title">
        <p class="oLeft">
          <img :src="voteDetails.logoUrl"/>
          <span class="curName">{{voteDetails.pageIdentifier}}</span>
          <span class="fullName">{{voteDetails.fullName}}</span>
        </p>
        <p class="oRight" v-if="voteDetails.consensus_vote_count+voteDetails.consensus_pass_count>300">
          {{$t("vote.SupportRate")}}：<span class="Num">
					<span v-if="voteDetails.consensus_pass_count!=0 || voteDetails.consensus_vote_count!=0">{{voteDetails.consensus_pass_count/ (voteDetails.consensus_vote_count+voteDetails.consensus_pass_count)*100 | number(2)}}%</span>
					<span v-if="voteDetails.consensus_pass_count==0 && voteDetails.consensus_vote_count==0">0%</span>
					</span>
        </p>
      </div>
      <div class="content">
        <ul>
          <li>
            <p class="copyCode">{{$t("vote.ContractAddr")}}: {{voteDetails.contract}}</p>
            <p class="copy">
              <i class="iconfont icon-fuzhi1" id="copy" :data-clipboard-text="voteDetails.contract" @click="copy"></i>
            </p>
          </li>
          <li
            :class="{'Liked':voteDetails.consensus_records&&voteDetails.consensus_records.length>0&&voteDetails.consensus_records[0].result==1,'HasSteppedOn':voteDetails.consensus_records&&voteDetails.consensus_records.length>0&&voteDetails.consensus_records[0].result==0}">
						<span class="zan">
							<i class="iconfont icon-zan3"></i>
							<span>{{voteDetails.consensus_pass_count}}</span>
						</span>
            <span class="cai">
							<i class="iconfont icon-cai1-copy"></i>
							<span>{{voteDetails.consensus_vote_count}}</span>
						</span>
          </li>
          <li></li>
        </ul>
      </div>
    </div>
    <!--跳转链接-->
    <div class="Nesting" v-if="iframeIsShow">
      <div class="NestingTitle">
        <i class="iconfont icon-cuowu" @click="iframeIsShow=false"></i>
      </div>
      <iframe :src="iframeSrc" id="iframe"></iframe>
    </div>
    <!--项目介绍-->
    <div class="ProjectIntroduction">
      <div class="title">
        <span class="text">{{$t("airdrop.ProjectIntroduction")}}</span>
        <p class="open">
          <span @click="open(voteDetails.officiaWebsite)">{{$t("airdrop.GoToWebsite")}}</span>
          <span @click="open(voteDetails.whitePaper)">{{$t("airdrop.ViewWhitePaper")}}</span>
        </p>
      </div>
      <div class="content">
        {{voteDetails.summary}}
      </div>
    </div>
    <!--立即投票-->
    <div class="oHeight1"></div>
    <div class="VoteNow">
      <button class="zan" @click="VoteNow(voteDetails)"
              :class="{'yitou':voteDetails.consensus_records&&voteDetails.consensus_records.length>0&&voteDetails.consensus_records[0].result==1,'yitou1':voteDetails.consensus_records&&voteDetails.consensus_records.length>0&&voteDetails.consensus_records[0].result==0}">
        <span v-if="!voteDetails.consensus_records || voteDetails.consensus_records.length==0">{{$t("vote.ImmediatVote")}}</span>
        <span
          v-if="voteDetails.consensus_records&&voteDetails.consensus_records.length>0&&voteDetails.consensus_records[0].result==1">{{$t("vote.Liked")}}</span>
        <span
          v-if="voteDetails.consensus_records&&voteDetails.consensus_records.length>0&&voteDetails.consensus_records[0].result==0">{{$t("vote.Booed")}}</span>
      </button>
      <button class="pull" @click="shareIt(voteDetails.eid,voteDetails.pageIdentifier)">{{$t("vote.CanvassForHim")}}
      </button>
    </div>
    <!--分享微信好友  分享微信朋友圈-->
    <div class="men_ban" v-if="IsShareIt" @click="IsShareIt=false"></div>
    <div class="shareIt" v-if="IsShareIt">
      <div class="box">
        <p @click="shareWeixinMessage(0)">
          <img src="../../../assets/WeChatFriends.png" class="WeChatFriends"/>
        </p>
        <p @click="shareWeixinMessage(1)">
          <img src="../../../assets/CircleOffriends.png" class="CircleOffriends"/>
        </p>
        <span id="copy" :data-clipboard-text="inviteCopy" @click="copy">
					<i class="iconfont icon-link"></i>
				</span>
      </div>
      <div class="CancelSharing" @click="IsShareIt=false">
        {{$t("airdrop.CancelShare")}}
      </div>
    </div>

  </div>
</template>

<script>
  import axios from "axios";
  import {httpUrl} from "../../http_url/http_url"
  import { mapGetters,mapActions,mapState,mapMutations } from 'vuex'
  export default {
    data() {
      return {
        iframeIsShow: false, //是否显示
        iframeSrc: "", //跳转链接
        voteDetails: {}, //详情内容
        userList: {}, //用户信息
        isIdentity: false, //判断是否进行高级认证
        isVote: false, //判断是否点击投票
        isThumbsUp: false, //是否点赞
        isStepOn: false, //是否点踩
        result: "", //赞或踩
        curName: "", //币种名称
        IsShareIt: false, //分享微信  朋友圈
        inviteCopy: "", //复制链接
        shares: null, //分享
        sharewx: null, //分享
        inviteCopy: "", //分享链接
      }
    },
    		computed:{
      ...mapState('user',{'invite_code':state=>state.userID}),
      ...mapState('user',['lang']),
		},
    filters: {
      //小数点过滤器 不四舍五入
      number(value, num) {
        var toFixedNum = Number(value).toFixed(num + 1);
        var realVal = toFixedNum.substring(0, toFixedNum.lastIndexOf('.') + num + 1);
        return realVal;
      }
    },
    methods: {
      ThumbsUp() { //点赞
        this.isThumbsUp = !this.isThumbsUp;
        if (this.isThumbsUp) {
          this.result = "1"; //赞
        } else {
          this.result = ""; //赞
        }
        this.isStepOn = false; //关闭赞
      },
      StepOn() { //点踩
        this.isStepOn = !this.isStepOn;
        if (this.isStepOn) {
          this.result = "0"; //踩
        } else {
          this.result = "";
        }
        this.isThumbsUp = false; //关闭踩
      },
      ConfirmVote() {
        let _this = this;
        if (this.result == "") {
          _this.$message({
            message: _this.$t("vote.BooOrLike"),
            type: 'warning',
            duration: 2000
          });
          return false;
        }
        axios.post(httpUrl.consensus, {
          currency_eid: this.currency_eid,
          result: this.result
        }, {
          headers: {
            "Authorization": "Bearer " + this.token
          }
        }).then(function (res) {
          if (res.data.status.code == 200) { //投票成功
            _this.$message({
              message: _this.$t("vote.VoteSucces"),
              type: 'success',
              duration: 2000
            });
            _this.isVote = false;
            _this.isThumbsUp = false;
            _this.isStepOn = false;
            //刷新列表接口
            _this.openSend();
          }
          if (res.data.status.code == -1) {
            _this.$message({
              message: _this.$t("vote.Voted"),
              type: 'warning',
              duration: 2000
            });
          }

        })
      },
      shareIt(eid, curName) { //分享
        let _this = this;
        if (this.token == null && this.token == undefined) {
          this.$router.push({
            name: "login"
          })
          return false;
        } else {
          let imgPath;
          if (location.host.indexOf("tanghs.com") != -1 || location.host.indexOf("localhost") != -1) {
            imgPath = "http://m.tanghs.com/#/MoneyCanvassing/" + this.invite_code + "/" + eid;
          } else {
            imgPath = "https://m.imx.com/#/MoneyCanvassing/" + this.invite_code + "/" + eid;
          }
          //空投日志添加
          this.$ajax.post(this.httpUrl.uploadDropLog, {
            type: 4,
            currency_eid: eid,
            invite_code: this.invite_code
          }).then(function (res) {
            return true;
          })
          this.inviteCopy = imgPath; //分享链接
          this.IsShareIt = true;
          this.curName = curName; //选中币种
        }
      },
      shareWeixinMessage(type) { //分享微信朋友圈
        let _this = this;
        let FriendisCircle;
        if (type == 0) { //分享朋友
          FriendisCircle = "WXSceneSession";
        } else { //分享朋友圈
          FriendisCircle = "WXSceneTimeline";
        }
        _this.sharewx.send({
          content: _this.$t("vote.InImx") + _this.curName + _this.$t("vote.ComeAndReceive"),
          pictures: "https://imxpro.oss-cn-beijing.aliyuncs.com/static/APP.png",
          thumbs: "https://imxpro.oss-cn-beijing.aliyuncs.com/static/APP.png",
          type:"web",
          href: _this.inviteCopy, //分享路径
          extra: {
            scene: FriendisCircle ////分享微信好友  	或者     朋友圈
          }
        }, function () {
          _this.IsShareIt = false;
          alert(_this.$t("vote.ShareSuccessfully"));
        }, function (e) {
          return true;
        });
      },
      copy() {
        let _this = this;
        var clipboard = new Clipboard('#copy');
        clipboard.on('success', e => {
          _this.$message({
            message: _this.$t("capital.Successfullycopied"),
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
      },
      open(url) {
        this.iframeSrc = url;
        this.iframeIsShow = true;
      },
      VoteNow(item) { //立即投票按钮
        if (this.token == null && this.token == undefined) {
          this.$router.push({
            name: "login"
          })
          return false;
        } else {
          if (this.userList.auth_grade != 1) { //判断有无高级认证
            this.isIdentity = true;
            return false;
          }
          if (item.consensus_records && item.consensus_records.length > 0) { //已投票，不能进行点击
            return;
          }
          this.isVote = true; //点击投票
          this.currency_eid = item.eid; //选中eid
          this.curName = item.pageIdentifier; //选中币种名称
        }
      },
      openSend() { //获取详情
        let _this = this;
        /*共识列表*/
        if (this.token == null && this.token == undefined) {
          if (this.lang == "zh") {
            axios.get(httpUrl.consensus, {
              params: {
                lang: "zh",
                eid: this.$route.params.eid
              }
            }).then(function (res) {
              _this.voteDetails = res.data.data;
            }, function (err) {
              console.log(err)
            })
          } else {
            axios.get(httpUrl.consensus, {
              params: {
                lang: "en",
                eid: this.$route.params.eid
              }
            }).then(function (res) {
              _this.voteDetails = res.data.data;
            }, function (err) {
              console.log(err)
            })
          }
        } else {
          if (this.lang == "zh") {
            axios.get(httpUrl.consensus, {
              params: {
                lang: "zh",
                eid: this.$route.params.eid
              },
              headers: {
                "Authorization": "Bearer " + this.token
              }
            }).then(function (res) {
              _this.voteDetails = res.data.data;
            }, function (err) {
              console.log(err)
            })
          } else {
            axios.get(httpUrl.consensus, {
              params: {
                lang: "en",
                eid: this.$route.params.eid
              },
              headers: {
                "Authorization": "Bearer " + this.token
              }
            }).then(function (res) {
              _this.voteDetails = res.data.data;
            }, function (err) {
              console.log(err)
            })
          }
        }
      }
    },
    mounted() {
      let _this = this;
      if (window.localStorage.getItem("isConsensus")) { //判断是否从拉票页面进入
        window.localStorage.removeItem("isConsensus");
        //空投日志添加
        this.$ajax.post(this.httpUrl.uploadDropLog, {
          type: 6,
          currency_eid: this.$route.params.eid,
          invite_code: this.invite_code
        }).then(function (res) {
          return true;
        })
      }
      if (window.plus) {
        plus.share.getServices(function (s) {
          _this.shares = s;
          for (var i in s) {
            if ('weixin' == s[i].id) {
              _this.sharewx = s[i];
            }
          }
        }, function (e) {
          alert("获取分享服务列表失败");
        });
      }
      //获取详情
      this.openSend();
      /*用户信息*/
      if (this.token == undefined && this.token == null) {
        return false;
      } else {
        //用户信息
        axios.get(httpUrl.userInfo, {
          headers: {
            "Authorization": "Bearer " + this.token
          }
        }).then(function (res) {
          _this.userList = res.data.data;
        }, function (err) {
          console.log(err)
        })
      }
    }
  }
</script>

<style lang="scss" scoped="scoped">
  $header_bg: #111336;
  $green: #25cbc5;
  .fixed_header {
    width: 100%;
    height: .45rem;
    position: fixed;
    left: 0;
    top: 0;
    z-index: 100;
  }

  .userCenter_Height {
    width: 100%;
    height: .45rem;
    line-height: .45rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;
    box-sizing: border-box;
    border-bottom: .01rem solid #282e64;
    .iconfont {
      height: .45rem;
      line-height: .45rem;
      position: absolute;
      left: 0;
      margin-left: .1rem;
      color: #fff;
      font-size: .14rem;
      position: absolute;
      left: 0;
      z-index: 66;
    }
    p {
      width: 100%;
      height: 100%;
      position: absolute;
      text-align: center;
      line-height: .45rem;
      font-size: .15rem;
      font-weight: 500;
      color: #fff;
    }
    .icon {
      width: .3rem;
      height: .45rem;
      line-height: .45rem;
      z-index: 66;
      color: #6f74a6;
      margin-right: .1rem;
      position: absolute;
      top: 0;
      right: 0;
      z-index: 999;
      .iconfont {
        font-size: .16rem;
      }
    }
    background: $header_bg;
  }

  .oHeight {
    height: .45rem;
  }

  .oHeight1 {
    height: .6rem;
  }

  /*共识详情头部*/

  .DetailHeader {
    width: 100%;
    box-sizing: border-box;
    padding: .1rem .1rem;
    background: $header_bg;
    .title {
      width: 100%;
      height: .7rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .oLeft {
        display: flex;
        align-items: center;
        color: #fff;
        img {
          width: .3rem;
          height: .3rem;
          margin-right: .05rem;
        }
        .curName {
          font-size: .15rem;
          margin: 0 .05rem;
        }
        .fullName {
          margin-top: .03rem;
        }
      }
      .oRight {
        color: #25cbc5;
        .Num {
          font-size: .16rem;
        }
      }
    }
    .content {
      color: #6f74a6;
      .Liked {
        .zan {
          color: #25cbc5;
        }
      }
      .HasSteppedOn {
        .cai {
          color: #a41a0f;
        }
      }
      ul {
        li {
          width: 100%;
          line-height: .2rem;
          .zan {
            margin-right: .1rem;
          }
          .zan,
          .cai {
            font-size: .14rem;
          }
          .copyCode {
            line-height: .2rem;
            font-size: .14rem;
            white-space: normal;
          }
          .copy {
            text-align: right;
            color: #fff;
            .iconfont {
              margin-right: .07rem;
            }
          }
        }
      }
    }
  }

  .ProjectIntroduction {
    width: 100%;
    background: $header_bg;
    box-sizing: border-box;
    margin-top: .1rem;
    padding: 0 .1rem;
    .title {
      width: 100%;
      height: .4rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-bottom: 1px solid rgba(59, 66, 134, 0.3);
      .text {
        color: #e1e6f9;
      }
      .open {
        span {
          color: #26cbc5;
          margin-left: .05rem;
        }
      }
    }
    .content {
      padding-top: .1rem;
      padding-bottom: .1rem;
      line-height: .2rem;
      color: #babed9;
    }
  }

  .Nesting {
    width: 100%;
    height: 100%;
    background: #0c0934;
    position: fixed;
    left: 0;
    top: 0;
    z-index: 999;
    .NestingTitle {
      width: 100%;
      height: .5rem;
      line-height: .5rem;
      text-align: right;
      box-sizing: border-box;
      padding-right: .1rem;
      .iconfont {
        color: #fff;
      }
    }
    #iframe {
      width: 100%;
      height: 90%;
      box-sizing: border-box;
    }
  }

  .VoteNow {
    width: 100%;
    height: .6rem;
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 66;
    display: flex;
    justify-content: center;
    align-items: center;
    background: $header_bg;
    .yitou,
    .yitou1 {
      background: #242652 !important;
      color: #6f74a6 !important;
    }
    button {
      width: 1.1rem;
      height: .35rem;
      border: none;
      border-radius: .04rem;
      margin: 0 .1rem;
    }
    .zan {
      background: #25cbc5;
      color: #fff;
    }
    .pull {
      border: .01rem solid #25cbc5;
      background: none;
      color: #25cbc5;
    }
  }

  .Identity {
    width: 2.2rem;
    height: 1.2rem;
    border-radius: .04rem;
    box-sizing: border-box;
    padding: 0 .1rem;
    background: #fff;
    position: fixed;
    left: 50%;
    top: 50%;
    margin-top: -1rem;
    margin-left: -1.1rem;
    z-index: 888;
    .content {
      width: 100%;
      height: .8rem;
      display: flex;
      align-items: center;
      text-align: center;
      border-bottom: .01rem solid #eee;
    }
    .button {
      width: 100%;
      height: .4rem;
      text-align: center;
      font-size: .14rem;
      line-height: .4rem;
      color: #25cbc5;
    }
  }

  /*投票*/

  .vote {
    width: 2.2rem;
    height: 2.2rem;
    background: #fff;
    position: fixed;
    left: 50%;
    top: 50%;
    margin-left: -1.1rem;
    margin-top: -1.4rem;
    z-index: 999;
    box-sizing: border-box;
    padding: 0 .1rem;
    .title {
      text-align: center;
      box-sizing: border-box;
      padding: .1rem 0;
      color: #1d1e51;
      border-bottom: .01rem solid #eee;
      p {
        line-height: .2rem;
      }
    }
    .content {
      width: 100%;
      height: 1.2rem;
      display: flex;
      justify-content: center;
      border-bottom: .01rem solid #eee;
      div {
        text-align: center;
        margin: .2rem 0;
        .icon {
          width: .6rem;
          height: .6rem;
          background: #d7d7d7;
          border-radius: 50%;
          text-align: center;
          line-height: .6rem;
          margin: 0 .1rem;
          margin-bottom: .05rem;
          .iconfont {
            font-size: .35rem;
            color: #fff;
          }
        }
        .Fabulous {
          background: #25cbc5;
        }
        .stepon {
          background: #8d2d2d;
        }
        .zanText {
          color: #25cbc5;
        }
        .caiText {
          color: #8d2d2d;
        }
      }
    }
    .bottom {
      width: 100%;
      height: .38rem;
      text-align: center;
      font-size: .14rem;
      line-height: .38rem;
      color: #25cbc5;
    }
  }

  .Close {
    position: fixed;
    left: 50%;
    top: 50%;
    z-index: 999;
    margin-left: -.13rem;
    margin-top: .5rem;
    .iconfont {
      color: #fff;
      font-size: .25rem;
    }
  }

  .men_ban {
    width: 100%;
    height: 100%;
    position: fixed;
    left: 0;
    top: 0;
    z-index: 666;
    background: rgba(0, 0, 0, 0.6);
  }

  .Close1 {
    @extend .Close;
    margin-top: 1rem;
  }

  .shareIt {
    width: 100%;
    height: 1.4rem;
    background: #0c0934;
    position: fixed;
    left: 0;
    bottom: 0;
    z-index: 999;
    .box {
      width: 100%;
      height: .95rem;
      display: flex;
      align-items: center;
      justify-content: center;
      p {
        width: .55rem;
        height: .55rem;
        box-sizing: border-box;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        background: #18134a;
        margin-right: .1rem;
        img {
          width: 80%;
          height: 80%;
        }
        .CircleOffriends {
          margin-left: .02rem;
          margin-bottom: .01rem;
        }
      }
      #copy {
        display: inline-block;
        width: .55rem;
        height: .55rem;
        border-radius: 50%;
        text-align: center;
        line-height: .55rem;
        background: #18134a;
      }
      .iconfont {
        color: #25cbc5;
        font-size: .3rem;
      }
    }
    .CancelSharing {
      width: 100%;
      height: .4rem;
      border-top: 1px solid #261f65;
      text-align: center;
      line-height: .42rem;
      font-size: .13rem;
      color: #fff;
    }
  }
</style>
