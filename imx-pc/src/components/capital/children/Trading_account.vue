<template>
  <div id="trading" :class="{'trading_white':getColor==1}">
    <!--判断用户是否绑定手机号码-->
    <div class="men_ban" v-if="!isBdMobile&&!NoShowMobile&&userInfo.wallet_on==0"></div>
    <!--首次使用钱包绑定手机号-->
    <div class="bdMobile" v-if="!isBdMobile&&!NoShowMobile&&userInfo.wallet_on==0">
      <div class="bdMobileTitle">{{$t("WalletManagement.FirstUseWallet")}}</div>
      <div class="bdMobileText">{{$t("WalletManagement.Bindphone")}}</div>
      <!--表单-->
      <div class="Mobile">
        <el-select v-model="value" :placeholder="$t('userCenter.Pleasechoose')" id="phone-title" @change="change(value)">
          <el-option v-for="item in cities" :value="item.id" :key="item.mobile_prefix"  :label="item.mobile_prefix"
                     id="option">
          </el-option>
        </el-select>
        <input type="text" :placeholder="$t('userCenter.EnterPhoneNum')" v-model="mobileNum" class="phoneNum">
      </div>
      <!--表单-->
      <div class="Mobile1">
        <input type="text" :placeholder="$t('login.PleaseCode')" v-model="mobileCode" class="getCode">
        <p class="getCodeText">
          <span class="blue" v-if="CountdownStarts" @click="getCode('mobile')">{{getCodeText}}</span>
          <span class="gray" v-if="!CountdownStarts">{{Countdown}}{{$t("WalletManagement.AfterSeconds")}}</span>
        </p>
      </div>
      <!--收不到短信/邮箱-->
      <div class="NoReception">
        <p>{{$t("WalletManagement.CanNotReceive")}} <span class="blue" @click="tabEmail(0)">{{$t("WalletManagement.SwitchMail")}}</span></p>
      </div>
      <!--立即重启-->
      <div class="RestartNow">
        <button @click="OpenNow('monole')">{{$t("WalletManagement.Open")}}</button>
      </div>
    </div>
    <!--判断用户是否绑定手机号码-->
    <div class="men_ban" v-if="noBdEmail&&userInfo.wallet_on==0"></div>
    <!--首次使用钱包绑定手机号-->
    <div class="bdMobile" v-if="noBdEmail&&userInfo.wallet_on==0">
      <div class="bdMobileTitle">{{$t("WalletManagement.FirstUseWallet")}}</div>
      <div class="bdMobileText">{{$t("WalletManagement.Bindemail")}}</div>
      <!--表单-->
      <div class="Mobile">
        <input type="text" :placeholder="$t('login.PleaseEmailAddr')" v-model="emailAddress" class="emailAddress">
      </div>
      <!--表单-->
      <div class="Mobile1">
        <input type="text" :placeholder="$t('login.PleaseCode')" v-model="emailCode" class="getCode">
        <p class="getCodeText">
          <span class="blue" v-if="CountdownStarts" @click="getCode('email')">{{getCodeText}}</span>
          <span class="gray" v-if="!CountdownStarts">{{Countdown}}{{$t("WalletManagement.AfterSeconds")}}</span>
        </p>
      </div>
      <!--收不到短信/邮箱-->
      <div class="NoReception">
        <p>{{$t("WalletManagement.CanNotReceiveMail")}}<span class="blue" @click="tabMobile(0)">{{$t("WalletManagement.SwitchSMSVer")}}</span></p>
      </div>
      <!--立即重启-->
      <div class="RestartNow">
        <button @click="OpenNow('email')">{{$t("WalletManagement.Open")}}</button>
      </div>
    </div>
    <!--已绑定手机号的用户-->
    <div class="men_ban" v-if="isBdMobile&&!BdShowMobile&&userInfo.wallet_on==0"></div>
    <!--首次使用钱包绑定手机号-->
    <div class="bdMobile" v-if="isBdMobile&&!BdShowMobile&&userInfo.wallet_on==0">
      <div class="bdMobileTitle">{{$t("WalletManagement.FirstUseWallet")}}</div>
      <div class="bdMobileText">{{$t("WalletManagement.SentBoundNum")}}</div>
      <!--表单-->
      <div class="MobileBd">
        {{userInfo.mobile}}
      </div>
      <!--表单-->
      <div class="Mobile1">
        <input type="text" :placeholder="$t('login.PleaseCode')" v-model="mobileCode" class="getCode">
        <p class="getCodeText">
          <span class="blue" v-if="CountdownStarts" @click="getCode1('mobile')">{{getCodeText}}</span>
          <span class="gray" v-if="!CountdownStarts">{{Countdown}}{{$t("WalletManagement.AfterSeconds")}}</span>
        </p>
      </div>
      <!--收不到短信/邮箱-->
      <div class="NoReception">
        <p>{{$t("WalletManagement.CanNotReceive")}} <span class="blue" @click="tabEmail(1)">{{$t("WalletManagement.SwitchMail")}}</span></p>
      </div>
      <!--立即重启-->
      <div class="RestartNow">
        <button @click="OpenBdNow('mobile')">{{$t("WalletManagement.Open")}}</button>
      </div>
    </div>
    <!--已绑定的用户-->
    <div class="men_ban" v-if="yesBdEmail&&userInfo.wallet_on==0"></div>
    <!--首次使用钱包绑定手机号-->
    <div class="bdMobile" v-if="yesBdEmail&&userInfo.wallet_on==0">
      <div class="bdMobileTitle">{{$t("WalletManagement.FirstUseWallet")}}</div>
      <div class="bdMobileText">{{$t("WalletManagement.EailSentBound")}}</div>
      <!--表单-->
      <div class="MobileBd">
        {{userInfo.email}}
      </div>
      <!--表单-->
      <div class="Mobile1">
        <input type="text" :placeholder="$t('login.PleaseCode')" v-model="emailCode" class="getCode">
        <p class="getCodeText">
          <span class="blue" v-if="CountdownStarts" @click="getCode1('email')">{{getCodeText}}</span>
          <span class="gray" v-if="!CountdownStarts">{{Countdown}}{{$t("WalletManagement.AfterSeconds")}}</span>
        </p>
      </div>
      <!--收不到短信/邮箱-->
      <div class="NoReception">
        <p>{{$t("WalletManagement.CanNotReceiveMail")}} <span class="blue" @click="tabMobile(1)">{{$t("WalletManagement.SwitchPhoneVer")}}</span></p>
      </div>
      <!--立即重启-->
      <div class="RestartNow">
        <button @click="OpenBdNow('email')">{{$t("WalletManagement.Open")}}</button>
      </div>
    </div>
    <!--管理ETH资产-->
    <div class="men_ban" v-if="managementEth"></div>
    <div class="ManagingAssetsBox" v-if="managementEth">
      <div class="ManagingAssetsTitle">
        <span>{{$t("WalletManagement.ManageEthAssets")}}</span>
        <i class="iconfont icon-cuowu" @click="managementEth=false;searchEthText=''"></i>
      </div>
      <div class="management">
        <div class="ManagingAssetsSearch">
          <input type="text" v-model="searchEthText" @keyup.enter="searchEth" @keyup="lengthNoData(0)" :placeholder="$t('WalletManagement.EnterTokenNameOrAddr')">
          <i class="iconfont icon-search" @click="searchEth"></i>
        </div>
        <button class="ManagementButton" @click="addEthAssets=true;managementEth=false;">{{$t("WalletManagement.AddAssets")}}</button>
      </div>
      <!--搜索币种列表-->
      <div class="ManagingAssetsList" v-if="EthList.length>0">
        <ul class="ManagingAssetsWrapper">
          <li class="ManagingAssetsItem" v-for="(item,key) in EthList">
            <dl>
              <dd>
                <p class="oImg">
                  <img src="../../../assets/coin.png" v-if="item.logoUrl==''" alt="">
                  <img :src="item.logoUrl" v-if="item.logoUrl!=''" alt="">
                </p>
                <span class="curName">{{item.pageIdentifier}}</span>
                <span class="fullName">{{item.fullName}}</span>
              </dd>
              <dd class="ManagingAssetsAddress">
                <p class="oImg"></p>
                <p class="address1">
                  <span class="text">{{item.contract}}</span>
                  <i class="iconfont" :class="{'icon-jia':item.finance.length>0&&item.finance[0].status==0 || item.finance.length==0,'icon-jian':item.finance.length>0&&item.finance[0].status==1}" @click="AddTominus(item,$event)"></i>
                </p>
              </dd>
            </dl>
          </li>
        </ul>
      </div>
      <!--分页-->
      <div class="pageCount" v-if="EthTotal>0">
        <div class="button">
          <el-pagination layout="prev, pager, next" background :page-size="EthPage"
                         @current-change="ManagingAssetsEthChange" :total="EthTotal">
          </el-pagination>
        </div>
      </div>
      <!--未搜索到此token-->
      <div class="noData" v-if="EthList.length==0">
        <p class="gray">{{$t("WalletManagement.NotFoundToken")}}</p>
        <router-link to="/index/Applicationcurrency" target="_blank" class="blue">{{$t("WalletManagement.ApplyNewCoin")}}</router-link>
      </div>
    </div>
    <!--管理主流币资产-->
    <div class="men_ban" v-if="managementMain" ></div>
    <div class="ManagingAssetsBox"v-if="managementMain" >
      <div class="ManagingAssetsTitle">
        <span>{{$t('WalletManagement.ManageMainstream')}}</span>
        <i class="iconfont icon-cuowu" @click="managementMain=false;searchMainText='';"></i>
      </div>
      <div class="management">
        <div class="ManagingAssetsSearch">
          <input type="text" v-model="searchMainText" @keyup.enter="searchMain" @keyup="lengthNoData(2)" :placeholder="$t('WalletManagement.EnterTokenNameOrAddr')">
          <i class="iconfont icon-search" @click="searchMain"></i>
        </div>
      </div>
      <!--搜索币种列表-->
      <div class="ManagingAssetsList" v-if="MainList.length>0">
        <ul class="ManagingAssetsWrapper">
          <li class="ManagingAssetsItem" v-for="(item,key) in MainList">
            <dl>
              <dd>
                <p class="oImg">
                  <img :src="item.logoUrl" alt="">
                </p>
                <span class="curName">{{item.pageIdentifier}}</span>
                <span class="fullName">{{item.fullName}}</span>
              </dd>
              <dd class="ManagingAssetsAddress">
                <p class="oImg"></p>
                <p class="address1">
                  <span class="text">{{item.contract}}</span>
                  <i class="iconfont" :class="{'icon-jia':item.finance.length>0&&item.finance[0].status==0 || item.finance.length==0,'icon-jian':item.finance.length>0&&item.finance[0].status==1}" @click="AddTominus(item,$event)"></i>
                </p>
              </dd>
            </dl>
          </li>
        </ul>
      </div>
      <!--分页-->
      <div class="pageCount" v-if="MainTotal>0">
        <div class="button">
          <el-pagination layout="prev, pager, next" background :page-size="MainPage"
                         @current-change="ManagingAssetsMainChange" :total="MainTotal">
          </el-pagination>
        </div>
      </div>
      <!--未搜索到此token-->
      <div class="noData" v-if="MainList.length==0">
        <p class="gray">{{$t("WalletManagement.NotFoundToken")}}</p>
        <router-link to="/index/Applicationcurrency" target="_blank" class="blue">{{$t("WalletManagement.ApplyNewCoin")}}</router-link>
      </div>
    </div>
    <!--管理EOS资产-->
    <div class="men_ban" v-if="managementEos"></div>
    <div class="ManagingAssetsBox" v-if="managementEos">
      <div class="ManagingAssetsTitle">
        <span>{{$t("WalletManagement.ManageEosAssets")}}</span>
        <i class="iconfont icon-cuowu" @click="managementEos=false;searchEosText=''"></i>
      </div>
      <div class="management">
        <div class="ManagingAssetsSearch">
          <input type="text" v-model="searchEosText" @keyup.enter="searchEos" @keyup="lengthNoData(1)" :placeholder="$t('WalletManagement.EnternNmeOrAccount')">
          <i class="iconfont icon-search" @click="searchEos"></i>
        </div>
        <button class="ManagementButton" @click="addEosAssets=true;managementEos=false;">{{$t("WalletManagement.AddAssets")}}</button>
      </div>
      <!--搜索币种列表-->
      <div class="ManagingAssetsList">
        <ul class="ManagingAssetsWrapper" v-if="EosList.length>0">
          <li class="ManagingAssetsItem" v-for="(item,key) in EosList">
            <dl>
              <dd>
                <p class="oImg">
                  <img src="../../../assets/coin.png" v-if="item.logoUrl==''" alt="">
                  <img :src="item.logoUrl" v-if="item.logoUrl!=''" alt="">
                </p>
                <span class="curName">{{item.pageIdentifier}}</span>
                <span class="fullName">{{item.fullName}}</span>
              </dd>
              <dd class="ManagingAssetsAddress">
                <p class="oImg"></p>
                <p class="address1">
                  <span class="text">{{item.contract}}</span>
                  <i class="iconfont" :class="{'icon-jia':item.finance.length>0&&item.finance[0].status==0 || item.finance.length==0,'icon-jian':item.finance.length>0&&item.finance[0].status==1}" @click="AddTominus(item,$event)"></i>
                </p>
              </dd>
            </dl>
          </li>
        </ul>
      </div>
      <!--分页-->
      <div class="pageCount" v-if="EosTotal>0">
        <div class="button">
          <el-pagination layout="prev, pager, next" background :page-size="EosPage"
                         @current-change="ManagingAssetsEosChange" :total="EosTotal">
          </el-pagination>
        </div>
      </div>
      <!--未搜索到此token-->
      <div class="noData"v-if="EosList.length==0">
        <p class="gray">{{$t("WalletManagement.NotFoundToken")}}</p>
        <router-link to="/index/Applicationcurrency" target="_blank" class="blue">{{$t("WalletManagement.ApplyNewCoin")}}</router-link>
      </div>
    </div>
    <!--添加ETH资产-->
    <div class="men_ban" v-if="addEthAssets"></div>
    <div class="managementEos" v-if="addEthAssets">
      <div class="managementEosTitle">
        <span>{{$t("WalletManagement.AddEthAssets")}}</span>
        <i class="iconfont icon-cuowu" @click="addEthAssets=false;managementEth=true;ContractAddress='';"></i>
      </div>
      <!--账户名-->
      <ul class="managementEosContent">
        <li class="managementEosItem">
          <dd class="oLeft">
            <span>*</span>
            {{$t('vote.ContractAddr')}}
          </dd>
          <dd class="oRight">
            <input type="text" v-model="ContractAddress" @keyup="ContractAddress=ContractAddress.replace(/[^\w\.\/]/ig,'')" @blur="onBlur2" :placeholder="$t('WalletManagement.Pleaseenter1')">
            <p class="errorRed">{{wrongFormat}}</p>
          </dd>
        </li>
      </ul>
      <div class="addButton">
        <span class="cancel" @click="addEthAssets=false;managementEth=true;ContractAddress='';">{{$t("WalletManagement.Cancel")}}</span>
        <button class="AddTo"  @click="addEth">{{$t("WalletManagement.Add")}}</button>
      </div>
      <!--说明-->
      <div class="Description">
        <p class="DescriptionTitle">{{$t("WalletManagement.Description")}}:</p>
        <ul class="DescriptionWrapper">
          <li class="DescriptionItem">{{$t("WalletManagement.Description4")}}</li>
        </ul>
      </div>
    </div>
    <!--添加EOS资产-->
    <div class="men_ban" v-if="addEosAssets"></div>
    <div class="managementEos" v-if="addEosAssets">
      <div class="managementEosTitle">
        <span>{{$t("WalletManagement.AddEosAssets")}}</span>
        <i class="iconfont icon-cuowu" @click="addEosAssets=false;managementEos=true;Account='';Token='';"></i>
      </div>
      <!--账户名-->
      <ul class="managementEosContent">
        <li class="managementEosItem">
          <dd class="oLeft">
            <span>*</span>
            {{$t("WalletManagement.AccountName")}}
          </dd>
          <dd class="oRight">
            <input type="text" v-model="Account" @blur="onBlur" :placeholder="$t('WalletManagement.AccountIncluding')">
            <p class="errorRed">{{wrongFormat}}</p>
          </dd>
        </li>
        <li class="managementEosItem">
          <dd class="oLeft">
            <span>*</span>
            {{$t("WalletManagement.TokenName")}}
          </dd>
          <dd class="oRight">
            <input type="text" v-model="Token" @blur="onBlur1" :placeholder="$t('WalletManagement.EnterTokenName')">
            <p class="errorRed">{{LengthLimit}}</p>
          </dd>
        </li>
      </ul>
      <div class="addButton">
        <span class="cancel" @click="addEosAssets=false;managementEos=true;Account='';Token='';">{{$t("WalletManagement.Cancel")}}</span>
        <button class="AddTo" :disabled="!Account&&!Token" @click="addEos">{{$t("WalletManagement.Add")}}</button>
      </div>
      <!--说明-->
      <div class="Description">
        <p class="DescriptionTitle">{{$t("WalletManagement.Description")}}:</p>
        <ul class="DescriptionWrapper">
          <li class="DescriptionItem">1、{{$t("WalletManagement.Description1")}}</li>
          <li class="DescriptionItem">2、{{$t("WalletManagement.Description2")}}</li>
          <li class="DescriptionItem">3、{{$t("WalletManagement.Description3")}}</li>
        </ul>
      </div>

    </div>

    <!--总资产折合-->
    <div class="zhe_he">
      <div class="zhe_he_title">
        <ul class="zhTitleLeft" v-show="CurrencyBalance>0">
          <span>{{$t("WalletManagement.EstimatedValue")}}</span>
          <i class="iconfont icon-tishi"></i>
          <p class="Withprice">{{$t("WalletManagement.EstimatedValuableWallets")}}  </p>
          <span>{{CurrencyBalance| number(8)}}  BTC  ≈  {{RMBBalance | number(2)}}  CNY</span>
        </ul>
        <span v-show="CurrencyBalance==0">{{$t("bbjy.Nobalance")}}</span>
        <span class="right">
					{{$t("capital.Pointcard")}}：{{pointCardBalance | number(8)}}  {{$t("capital.Pointcard")}}
					<el-switch v-model="value4" :active-text="$t('userCenter.use')" :inactive-text="$t('userCenter.Donotuse')"
                     @change="bindingShow(value4)">
						</el-switch>
				</span>
      </div>
    </div>
    <!--我的钱包-->
    <div class="MyPurse" :class="{'MyPurse_white':getColor==1}">
      <div class="MyPurseTitle">{{$t("WalletManagement.MyWallets")}}</div>
      <!--钱包分类-->
      <div class="purseType">
        <ul class="purseTypeWrapper">
          <li class="purseTypeItem" v-for="(item,key) in WalletList" :class="{'purseTypeActive':key==0}"
              @click="purseType(key,item)">
            <p class="purseTypeTitle">
              <span v-if="item.pageIdentifier=='BTC'">{{$t("WalletManagement.MainstreamCoinWallet")}}</span>
              <span v-if="item.pageIdentifier!='BTC'">{{item.pageIdentifier}} {{$t("WalletManagement.Wallet")}}</span>
              <span v-if="item.pageIdentifier=='EOS'" class="curName">({{$t("WalletManagement.supportExchange")}})</span>
            </p>
            <p class="purseTypeBottom">{{$t("WalletManagement.Estimated")}}
              <span class="num">{{item.btc_blance}}</span>
              BTC
            </p>
          </li>
        </ul>
      </div>
    </div>
    <!--主流币钱包资产列表-->
    <div class="balaneListTitle" :class="{'balaneListTitleWhite':getColor==1}">
      <div class="balaneListTitleContent">
        <p class="oLeft">
          <span v-if="managementType=='BTC'">
            {{$t("WalletManagement.AssetsMainstream")}}
          </span>
          <span v-if="managementType=='ETH'">
            ETH {{$t("WalletManagement.XWalletAssets")}}
          </span>
          <span v-if="managementType=='EOS'">
            EOS {{$t("WalletManagement.XWalletAssets")}}
          </span>
        </p>
        <div class="oRight">
          <div class="search">
            <input type="text"  v-model="searchText" :placeholder="$t('WalletManagement.Pleaseenter')" @input="searchBz(searchText)"/>
            <i class="iconfont icon-search"></i>
          </div>
          <button class="ManagingAssets"  @click="tube">{{$t("WalletManagement.ManageAssets")}}</button>
        </div>
      </div>
    </div>
    <!--资产折合底部内容-->
    <div class="Equivalent">
      <!--头部内容部分-->
      <ul class="Equivalent-title">
        <li>
          <span class="bz-text">{{$t("otc.Currency")}}</span>
          <el-checkbox v-model="checked" @change="change(checked)">{{$t("WalletManagement.HideZeroAssets")}}</el-checkbox>
        </li>
        <li>
          <span>{{$t("capital.Available")}}</span>
        </li>
        <li>
          <span>{{$t("capital.Freeze")}}</span>
        </li>
        <li>
          <span>{{$t("capital.BTCvaluation")}}</span>
        </li>
        <li>
          <span>{{$t("WalletManagement.Action")}}</span>
        </li>
      </ul>
      <!--内容部分-->
      <div style="clear: both;"></div>
      <ul class="Equivalent-content" v-for="(items,index) in AssetsList" v-if="items.isIF">
        <li>
          <span class="bz-text">{{items.currency}}</span>
        </li>
        <li>
          <span>{{items.balance | number(items.displayNum)}}</span>
        </li>
        <li>
          <span>{{items.lock_balance | number(items.displayNum)}}</span>
        </li>
        <li>
          <span>{{items.btc_blance | number(items.displayNum)}}</span>
        </li>
        <li class="transaction" :class="{'transaction_color':getColor==1}">
          <router-link :to="{name:'Red_Coins',params:{key:items.currency_id}}" tag="span" class="span">
            {{$t("capital.Deposit")}}
          </router-link>
          <router-link :to="{name:'tibi',params:{key:items.currency_id}}" tag="span" class="span spanRight">
            {{$t("capital.Withdraw")}}
          </router-link>
          <dl class="jiao-yi" ref="jiaoyi" @mouseover="showTransaction(index)" @mouseleave="hideTransaction(index)">
            <p
              v-if="items.matchcoins.length>0&&!items.canConvert||items.naught_on==1&&items.is_drop==1&&!items.canConvert || items.naught_on==1&&items.isTrad==1&&!items.canConvert ||items.is_drop==1&&items.isTrad==1&&!items.canConvert || items.matchcoins.length==0&&items.is_drop==0&&items.naught_on!=1&&!items.canConvert"
              :class="{'gray':items.matchcoins.length==0&&items.is_drop==0&&items.naught_on!=1&&items.canConvert==false}">
              {{$t("capital.Transaction")}}</p>
            <p v-if="items.canConvert" @click="showExchange(items.currency_id)">{{$t("capital.exchange")}}</p>
            <router-link v-if="items.naught_on==1&&items.is_drop==0&&items.matchcoins.length==0" target="_blank"
                         to="/index/Taocoin">{{$t("WalletManagement.Taocoin")}}
            </router-link>
            <router-link v-if="items.is_drop>=1&&items.naught_on==0&&items.matchcoins.length==0" target="_blank"
                         :to="{name:'AirdropDetails',params:{id:items.currency_eid}}">{{$t("WalletManagement.Airdrop")}}
            </router-link>
            <dl class="transaction-title" :class="{'transaction-title-white':getColor==1}">
              <router-link to="/index/otc" tag="dd" v-if="items.isTrad==1">{{$t("list.Currency_trading")}}
              </router-link>
              <router-link v-if="items.naught_on==1&&items.is_drop>=1" tag="dd" to="/index/Taocoin">{{$t("WalletManagement.Taocoin")}}</router-link>
              <router-link v-if="items.is_drop>=1&&items.naught_on==1" tag="dd"
                           :to="{name:'AirdropDetails',params:{id:items.currency_eid}}">{{$t("WalletManagement.Airdrop")}}
              </router-link>
              <dd v-for="item in items.matchcoins" @click="Choice(item.id)">{{item.pageIdentifier}}</dd>
            </dl>
          </dl>
        </li>
      </ul>
      <!--暂无资产-->
      <div class="NoAsset" v-if="AssetsList.length==0">
          {{$t('WalletManagement.NoAsset')}}
          <span class="blue" @click="tube">{{$t('WalletManagement.clickAddAssets')}}</span>
      </div>
    </div>

    <!--兑换窗口-->
    <el-dialog :title="exTit" class="diatit" :visible.sync="dialogFormVisible" closable width="800px" @close="rest('ruleForm')" :closeOnClickModal="false" >
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm">
      <div class="dia_con">
        <div class="dia_con_item">

          <div class="dia_con_itemll">
            <div class="dia_con_itemllt">
              <div class="dia_con_item_l1t lin30"  v-if="nowtype==1">{{$t("capital.foAmount")}}</div>
              <div class="dia_con_item_l1t lin30 font14"  v-if="nowtype==2">{{$t("capital.eosAmount")}}</div>
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
        <!--FO:EOS {{$t("capital.exchangeRate")}} 1：{{fo_to_eos}}-->
        <!--</div>-->
        <div class="dia_con_item dia_con_info">
          EOS:FO  {{$t("capital.exchangeRate")}} 1：{{eos_to_fo}}
        </div>
      </div>
      </el-form>

      <div  class="diabtn_box">
        <el-button @click="dialogFormVisible = false" class="btn_clean">{{$t("capital.cancel")}}</el-button>
        <el-button type="primary" :disabled="balance_fo<=0&&nowtype==1 || balance_eso<=0&&nowtype==0 || ruleForm.eso==0 || ruleForm.fo==0" @click="sendExchange('ruleForm')" class="btn_exchange" style="background:#60C8C4">{{$t("capital.exchange")}}</el-button>
      </div>
      <div class="kline_box">
        <div class="klineinner">
          <div class="klinetit">{{$t('activity.zstit')}} </div>
          <div class="kline" id="kline"></div>
          <div class="klinefoot"> {{$t('activity.gf')}} </div>
        </div>


        <div class="kline_text">
          <div class="kline_text_tit">{{$t('foText.tit')}}</div>
          <p>{{$t('foText.p1')}}</p>
          <p>{{$t('foText.p2')}}</p>
          <p>{{$t('foText.p3')}}</p>
          <p>{{$t('foText.ft')}}</p>


        </div>
      </div>

    </el-dialog>
  </div>

</template>

<script>
  import axios from "axios";
  import {httpUrl} from "../../http_url/http_url";
  import Vue from "vue";
  import $ from "jquery";
  import {mapGetters, mapActions, mapState, mapMutations} from 'vuex'
  import echarts from 'echarts'

  export default {
    data() {

      var checkPrice = (rule, value, callback) => {

        let reg = /^\d+(\.\d+)?$/;
          if(this.nowtype==1){
            if(value==''){
                callback(new Error(this.$t("capital.enterAmount")));
            }
            else if(new RegExp(reg).test(value) == false) {
              callback(new Error(this.$t("capital.amountDgits")));
            }  else if (parseFloat(this.balance_fo)<value) {
              callback(new Error(this.$t("capital.SmallerThan")));
            }
            else if (value<1) {
              callback(new Error(this.$t("activity.none")));
            }else  {
              callback();
              this.ruleForm.eso = Math.floor(value *this.fo_to_eos*10000)/10000;
            }
          }else {
            if(value==''){
              callback(new Error(this.$t("capital.EnterEosA")))
            }
            else if(new RegExp(reg).test(value) == false) {
              callback(new Error(this.$t("capital.amountDgits")));
            }  else if (parseFloat(this.balance_eso)<value) {
              callback(new Error(this.$t("capital.SmallerThan")));
            } else  {
              this.ruleForm.fo = Math.floor(value *this.eos_to_fo*10000)/10000;
              callback();

            }

          }

      };

      return {
        lock:true,
        exTit:'',
        // 兑换窗口类型  1 fo to eso   2 eso to fo
        nowtype:1,
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
        //兑换框样式
        dialogFormVisible:false,
        // fo数量
        fo:'',
        //eso数量
        eso:'',
        searchText: "",
        /*搜索框的value值*/
        checked: false,
        /*是否显示隐藏交易账户*/
        AssetsList: [],
        /*获取资产信息*/
        CurrencyBalance: 0, ///资产折合比特币的剩余余额
        RMBBalance: 0, ///人民币余额
        isEmpty: false, ///暂无数据
        pointCardBalance: 0, /*点卡剩余数量*/
        value4: false, /*判断点卡是否开启*/
        cities: [], /*选择国家*/
        value: "", /*国家id*/
        mobileNum: "", /*用户输入手机号*/
        mobileCode: "", /*手机验证码*/
        Countdown: 0, /*倒计时*/
        isBdMobile: false, /*判断是否绑定手机号*/
        ManagingAssetsPage: 0, /*分页条数*/
        ManagingAssetsTotal: 0, /*总条数*/
        emailAddress: "", /*邮箱地址*/
        emailCode: "", /*邮箱验证码*/
        noBdEmail: false, /*未绑定邮箱*/
        yesBdEmail: false, /*已绑定邮箱*/
        getCodeText: this.$t("WalletManagement.GetVerCode"), /*获取验证码*/
        CountdownStarts: true, /*显示获取验证码*/
        addEosAssets: false, /*添加EOS资产*/
        wrongFormat: "", /*验证账户格式*/
        LengthLimit: "", /*代币名称长度*/
        Account: "", /*账户*/
        Token: "", /*代币*/
        managementEth: false, /*管理ETH*/
        managementEos: false, /*管理EOS*/
        managementMain:false, /*管理主流币*/
        BdShowMobile: false, /*已绑定手机显示*/
        NoShowMobile: false, /*未绑定手机显示*/
        managementType: "", /*管理钱包的类型*/
        WalletList: [], /*钱包列表*/
        bind_id:"",/*eos或eth的ID*/
        EthList:[], /*eth列表*/
        EosList:[], /*eos列表*/
        MainList:[], /*主流币列表*/
        MainPage:0, /*主流币分页*/
        EthPage:0, /*eth分页*/
        EosPage:0, /*eos分页*/
        EthTotal:0, /*eth总页数*/
        EosTotal:0, /*eos总页数*/
        MainTotal:0,/*主流币总页数*/
        searchMainText:"", /*搜索主流币地址*/
        searchEthText:"", /*搜索eth地址*/
        searchEosText:"", /*搜索eos地址*/
        activeIndex:0, /*钱包下标*/
        avtiveName:"", /*选中币种名称*/
        addEthAssets:false, /*添加eth地址*/
        ContractAddress:"",  /*ETH合约地址*/
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
      ...mapState('setting',['isHidden']),
      ...mapState('user',['lang']),
    },
    methods: {
      ...mapMutations('user', [
        'setUserInfo' // 将 `this.logout()` 映射为 `this.$store.commit('logout')`
      ]),
      ...mapMutations('setting', ['setData']),
      number(value, num) {
        var toFixedNum = Number(value).toFixed(num + 1);
        var realVal = toFixedNum.substring(0, toFixedNum.lastIndexOf('.') + num + 1);
        return realVal;
      },
      searchMain() {
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
      lengthNoData(type) { /*判断输入长度是否为空*/
        if (type == 0 && this.searchEthText.length == 0) {
          this.searchEth();
        }
        if (type == 1 && this.searchEosText.length == 0) {
          this.searchEos();
        }
        if (type == 2 && this.searchMainText.length == 0) {
          this.searchMain();
        }
      },
      AddTominus(item, e) {
        var _this = this;
        /*添加--AddTominus减少*/
        if (item.finance.length > 0 && item.finance[0].status == 0 || item.finance.length == 0) { /*加*/
          axios.post(httpUrl.financeSave, {
            currency_id: item.id, type: 1
          }, {
            headers: {"Authorization": "Bearer " + this.token}
          }).then(res => {
            if (res.data.status.code == 200) {
              e.target.className = "iconfont icon-jian";
              this.getMyMoney();
              /*刷新资产管理*/
              if (item.finance.length == 0) {
                item.finance = [{currency_id: item.id, status: 1, balance: 0}];
              } else {
                item.finance[0].status = 1;
              }
            }
          }, err => {
            console.log(err)
          })
        }
        if (item.finance.length && item.finance[0].status == 1) { /*减*/
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
              e.target.className = "iconfont icon-jia";
              if (item.finance.length == 0) {
                item.finance = [{currency_id: item.id, status: 0, balance: 0}];
              } else {
                item.finance[0].status = 0;
              }
              this.getMyMoney();
              /*刷新资产管理*/
            }
          }, err => {
            console.log(err)
          })
        }
      },
      searchEth() { /*搜索eth*/
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
      OpenNow(TypesOf) { /*未绑定立即开启*/
        var _this = this;
        if (TypesOf == "email") {
          if (this.emailAddress.length == 0) {
            this.$message({
              message: _this.$t("WalletManagement.EnterEmail"),
              type: 'warning'
            });
            return false;
          }
          if (this.emailCode.length == 0) {
            this.$message({
              message: _this.$t("WalletManagement.EnterVerCode"),
              type: 'warning'
            });
            return false;
          }
          if (this.emailCode.length < 4) {
            this.$message({
              message: _this.$t("WalletManagement.VerCodeIncludes"),
              type: 'warning'
            });
            return false;
          }
          if (this.emailCode.length > 6 || this.emailCode.length < 5) {
            this.$message({
              message: _this.$t("WalletManagement.Verificationcode"),
              type: 'warning'
            });
            return false;
          }
          axios.post(httpUrl.walletOn, {
            code: this.emailCode,
            email: this.emailAddress,
            type: 0
          }, {
            headers: {"Authorization": "Bearer " + this.token}
          }).then(res => {
            if (res.data.status.code == 200) {
              this.userInfo.wallet_on = 1;
              let userInfo = this.userInfo;
              this.setUserInfo({userInfo});
            }
          }, err => {
            console.log(err)
          })
        } else {
          if (this.mobileNum.length == 0) {
            this.$message({
              message: _this.$t("userCenter.EnterPhoneNum"),
              type: 'warning'
            });
            return false;
          }
          if (this.mobileCode.length == 0) {
            this.$message({
              message: _this.$t("WalletManagement.EnterVerCode"),
              type: 'warning'
            });
            return false;
          }
          if (this.value.length == 0) {
            this.$message({
              message: _this.$t("WalletManagement.PhonePrefix"),
              type: 'warning'
            });
            return false;
          }
          if (this.mobileCode.length < 4) {
            this.$message({
              message: _this.$t("WalletManagement.VerCodeIncludes"),
              type: 'warning'
            });
            return false;
          }
          axios.post(httpUrl.walletOn, {
            code: this.mobileCode,
            mobile: this.mobileNum,
            country_id: this.value,
            type: 1
          }, {
            headers: {"Authorization": "Bearer " + this.token}
          }).then(res => {
            if (res.data.status.code == 200) {
              this.userInfo.wallet_on = 1;
              let userInfo = this.userInfo;
              this.setUserInfo({userInfo});
            }
          }, err => {
            console.log(err)
          })
        }
      },
      OpenBdNow(TypesOf) { /*已绑定*/
        if (TypesOf == "email") {
          if (this.emailCode.length == 0) return;
          if (this.emailCode.length > 6 || this.emailCode.length < 5) {
            this.$message({
              message: _this.$t("WalletManagement.Verificationcode"),
              type: 'warning'
            });
            return false;
          }
          axios.post(httpUrl.walletOn, {
            code: this.emailCode,
            type: 0
          }, {
            headers: {"Authorization": "Bearer " + this.token}
          }).then(res => {
            if (res.data.status.code == 200) {
              this.userInfo.wallet_on = 1;
              let userInfo = this.userInfo;
              this.setUserInfo({userInfo});
            }
          }, err => {
            console.log(err)
          })
        } else {
          if (this.mobileCode.length == 0) return;
          if (this.mobileCode.length > 6 || this.mobileCode.length < 5) {
            this.$message({
              message: _this.$t("WalletManagement.Verificationcode"),
              type: 'warning'
            });
            return false;
          }
          axios.post(httpUrl.walletOn, {
            code: this.mobileCode,
            type: 1
          }, {
            headers: {"Authorization": "Bearer " + this.token}
          }).then(res => {
            if (res.data.status.code == 200) {
              this.userInfo.wallet_on = 1;
              let userInfo = this.userInfo;
              this.setUserInfo({userInfo});
            }
          }, err => {
            console.log(err)
          })
        }
      },
      tube() { /*判断用户是否选择钱包*/
        if (this.managementType == 'ETH') {
          this.managementEth = true;
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
        } else if (this.managementType == 'EOS') {
          this.managementEos = true;
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
        } else {  /*主流币地址*/
          this.managementMain = true;
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
      },
      tabEmail(type) { /*切换邮箱*/
        if (this.userInfo.email_status == 0 && type == 0) { /*未绑定手机切换未绑定邮箱*/
          this.noBdEmail = true;
          this.NoShowMobile = true;
        }
        if (this.userInfo.email_status == 0 && type == 1) { /*已绑定手机切换未绑定邮箱*/
          this.noBdEmail = true;
          this.BdShowMobile = true;
        }
        if (this.userInfo.email_status != 0 && type == 0) { /*未绑定手机切换已绑定邮箱*/
          this.yesBdEmail = true;
          this.NoShowMobile = true;
        }
        if (this.userInfo.email_status != 0 && type == 1) { /*已绑定手机切换已绑定邮箱*/
          this.yesBdEmail = true;
          this.BdShowMobile = true;
        }
        this.CountdownStarts = true;
        /*获取验证码显示*/
        this.Countdown = 0;
        /*清空倒计时*/
        this.getCodeText = this.$t("WalletManagement.GetVerCode");
        /*默认显示*/
        this.mobileNum = "";
        /*清空手机号*/
        this.mobileCode = "";
        /*清空手机验证码*/
      },
      tabMobile(type) { /*切换手机*/
        if (this.userInfo.mobile_status == 0 && type == 0) { /*未绑定邮箱切换未绑定手机*/
          this.noBdEmail = false;
          this.NoShowMobile = false;
        }
        if (this.userInfo.mobile_status == 0 && type == 1) { /*已绑定邮箱切换未绑定手机*/
          this.yesBdEmail = false;
          this.NoShowMobile = false;
        }
        if (this.userInfo.mobile_status != 0 && type == 0) { /*未绑定邮箱切换已绑定手机*/
          this.noBdEmail = false;
          this.BdShowMobile = false;
        }
        if (this.userInfo.mobile_status != 0 && type == 1) { /*已绑定邮箱切换已绑定手机*/
          this.yesBdEmail = false;
          this.BdShowMobile = false;
        }
        this.CountdownStarts = true;
        /*获取验证码显示*/
        this.Countdown = 0;
        /*清空倒计时*/
        this.getCodeText = this.$t("WalletManagement.GetVerCode");
        /*默认显示*/
        this.emailAddress = "";
        /*清空邮箱地址*/
        this.emailCode = "";
        /*清空邮箱验证码*/
      },
      onBlur() {
        var reg = /^[A-Za-z0-9]{12}$/;
        if (!reg.test(this.Account)) {
          this.wrongFormat = this.$t("WalletManagement.AccountFormatError");
          setTimeout(() => {
            this.wrongFormat = "";
          }, 1500)
          return false;
        }
      },
      onBlur1() {
        var reg1 = /^[A-Za-z0-9]{0,50}$/;
        if (!reg1.test(this.Token)) {
          this.LengthLimit = this.$t("WalletManagement.TokenNameLength");
          setTimeout(() => {
            this.LengthLimit = "";
          }, 1500)
        }
      },
      onBlur2() {
        var reg = /^[0-9a-zA-Z]+$/;
        if (this.ContractAddress == '') {
          this.wrongFormat = this.$t('WalletManagement.Pleaseenter1');
          setTimeout(() => {
            this.wrongFormat = "";
          }, 1500)
          return;
        } else if (!reg.test(this.ContractAddress)) {
          this.wrongFormat = this.$t('WalletManagement.contractAddress');
          setTimeout(() => {
            this.wrongFormat = "";
          }, 1500);
          return;
        } else if (this.ContractAddress.length < 40) {
          this.wrongFormat = this.$t('WalletManagement.addresslengthError');
          setTimeout(() => {
            this.wrongFormat = "";
          }, 1500)
          return;
        } else {
          return true;
        }
      },
      addEth() {
        let isTrue = this.onBlur2();
        if (isTrue) {
          axios.post(httpUrl.addContract, {
            address: this.ContractAddress,
            type: 0
          }, {
            headers: {"Authorization": "Bearer " + this.token}
          }).then(res => {
            if (res.data.status.code == 200) {
              this.$message({
                message: this.$t("WalletManagement.AddSuccess"),
                type: "success"
              });
              this.searchEth();
              /*刷新接口*/
              this.getMyMoney();
              /*添加地址*/
              this.addEthAssets = false;
              /*关闭添加资产*/
              this.managementEth = true;
              /*打开资产列表*/
              this.ContractAddress = '';
              /*清空地址*/
            }
          }, err => {
            console.log(err);
          })
        }

      },
      addEos() { /*添加EOS地址*/
        var reg = /^[A-Za-z0-9]{12}$/;
        var reg1 = /^[A-Za-z0-9]{0,50}$/;
        if (!reg.test(this.Account)) {
          this.wrongFormat = this.$t("WalletManagement.AccountFormatError");
          setTimeout(() => {
            this.wrongFormat = "";
          }, 1500)
          return false;
        }
        if (!reg1.test(this.Token)) {
          this.LengthLimit = this.$t("WalletManagement.TokenNameLength");
          setTimeout(() => {
            this.LengthLimit = "";
          }, 1500)
          return false;
        }
        axios.post(httpUrl.addContract, {
          address: this.Account,
          symbol: this.Token,
          type: 1
        }, {
          headers: {"Authorization": "Bearer " + this.token}
        }).then(res => {
          if (res.data.status.code == 200) {
            this.$message({
              message: this.$t("WalletManagement.AddSuccess"),
              type: "success"
            });
            this.searchEos();
            /*刷新接口*/
            this.getMyMoney();
            /*添加地址*/
            this.addEosAssets = false;
            /*关闭添加资产*/
            this.managementEos = true;
            /*打开资产列表*/
            this.Account = '';
            /*清空地址*/
            this.Token = '';
            /*清空token*/
          }
        }, err => {
          console.log(err);
        })

      },
      getCode(TypesOf) { /*获取验证码(未绑定)*/
        var _this = this;
        if (TypesOf == "email") {
          if (this.emailAddress.length == 0) {
            this.$message({
              message: _this.$t("WalletManagement.EnterEmail"),
              type: 'warning'
            });
            return;
          }
          ;
          /*用户提示中英文*/
          let lang;
          if (this.lang != 'zh-CN') {
            lang = 'en'
          } else {
            lang = 'zh'
          }
          axios.post(httpUrl.sendOpenWallet, {
            email: this.emailAddress,
            type: 0,
            lang: lang
          }, {
            headers: {"Authorization": "Bearer " + this.token}
          }).then(res => {
            if (res.data.status.code == 200) {
              this.Countdown = 60;
              this.CountdownStarts = false;
              let time = setInterval(() => {
                this.Countdown--;
                if (this.Countdown <= 0) {
                  clearInterval(time);
                  this.CountdownStarts = true;
                  this.getCodeText = _this.$t("WalletManagement.Resend");
                }
              }, 1000)
            }
          }, err => {
            console.log(err)
          })
        } else {
          if (this.mobileNum.length == 0) {
            this.$message({
              message: _this.$t("userCenter.EnterPhoneNum"),
              type: 'warning'
            });
            return;
          }
          ;
          axios.post(httpUrl.sendOpenWallet, {
            mobile: this.mobileNum,
            type: 1
          }, {
            headers: {"Authorization": "Bearer " + this.token}
          }).then(res => {
            if (res.data.status.code == 200) {
              this.Countdown = 60;
              this.CountdownStarts = false;
              let time = setInterval(() => {
                this.Countdown--;
                if (this.Countdown <= 0) {
                  clearInterval(time);
                  this.CountdownStarts = true;
                  this.getCodeText = _this.$t("WalletManagement.Resend");
                }
              }, 1000)
            }
          }, err => {
            console.log(err)
          })
        }
      },
      getCode1(TypesOf) { /*获取验证码(已绑定)*/
        let _this = this;
        let lang;
        if (this.lang != 'zh-CN') {
          lang = 'en'
        } else {
          lang = 'zh'
        }
        if (TypesOf == "email") {
          axios.post(httpUrl.sendOpenWallet, {
            type: 0,
            lang: lang
          }, {
            headers: {"Authorization": "Bearer " + this.token}
          }).then(res => {
            if (res.data.status.code == 200) {
              this.Countdown = 60;
              this.CountdownStarts = false;
              let time = setInterval(() => {
                this.Countdown--;
                if (this.Countdown <= 0) {
                  clearInterval(time);
                  this.CountdownStarts = true;
                  this.getCodeText = _this.$t("WalletManagement.Resend");
                }
              }, 1000)
            }
          }, err => {
            console.log(err)
          })
        } else {
          axios.post(httpUrl.sendOpenWallet, {
            type: 1,
            lang: lang
          }, {
            headers: {"Authorization": "Bearer " + this.token}
          }).then(res => {
            if (res.data.status.code == 200) {
              this.Countdown = 60;
              this.CountdownStarts = false;
              let time = setInterval(() => {
                this.Countdown--;
                if (this.Countdown <= 0) {
                  clearInterval(time);
                  this.CountdownStarts = true;
                  this.getCodeText = _this.$t("WalletManagement.Resend");
                }
              }, 1000)
            }
          }, err => {
            console.log(err)
          })
        }
      },
      ManagingAssetsEosChange(val) { /*搜索eos*/
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
      ManagingAssetsEthChange(val) { /*搜索eth*/
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
      ManagingAssetsMainChange(val) {
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
      purseType(index, item) { /*切换钱包*/
        this.managementType = item.pageIdentifier;
        this.bind_id = item.id;
        this.activeIndex = index;
        /*钱包的下标*/
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
        $(".purseTypeItem").eq(index).addClass("purseTypeActive").siblings(".purseTypeItem").removeClass("purseTypeActive");
        this.searchText = "";
        /*清空搜索框*/
        this.change(this.checked);
        /*调用隐藏小额资产*/
      },
      bindingShow(type) {
        var _this = this;
        axios.get(httpUrl.ptsswitch, {
          headers: {
            "Authorization": "Bearer " + _this.token
          }
        }).then(function (res) {
          if (res.data.data) {
            _this.value4 = true;
          } else {
            _this.value4 = false;
          }
        }, function (err) {
          console.log(err)
        })
      },
      showTransaction(i) {
        this.$refs.jiaoyi[i].lastElementChild.style.display = "block"
      },
      hideTransaction(i) {
        this.$refs.jiaoyi[i].lastElementChild.style.display = "none"
      },
      /*搜索币种*/
      searchBz(val) {
        var _this = this;
        var to_Up = val.toUpperCase();
        _this.searchText = _this.searchText.toUpperCase();
        //判断用户输入是否是空格
        if (_this.searchText.indexOf(" ") >= 0) {
          _this.isEmpty = true;
        } else {
          _this.isEmpty = false;
        }
        var num = 0;
        for (let i = 0; i < _this.AssetsList.length; i++) {
          if (_this.AssetsList[i].currency.indexOf(_this.searchText) == -1) {
            _this.AssetsList[i].isIF = false;
            num++;
          } else {
            _this.AssetsList[i].isIF = true;
          }
        }
        if (num == _this.AssetsList.length) {
          _this.isEmpty = true;
        }
      },
      /*隐藏*/
      change(val) {
        this.setData({isHidden: val});
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
      /*点击事件*/
      Choice(mactid) {
        this.$router.push({
          name: "bbjy",
          params: {
            id: mactid
          }
        });
        // window.location.reload(); ////跳转成功后刷新页面
      },
      getMyMoney() {
        /*获取我的钱包*/
        axios.get(httpUrl.financeAssets, {
          headers: {'Authorization': "Bearer " + this.token}
        }).then(res => {
          this.WalletList = res.data.data;
          this.AssetsList = res.data.data[this.activeIndex].list || [];
          this.bind_id = res.data.data[this.activeIndex].id;
          this.managementType = res.data.data[this.activeIndex].pageIdentifier;
          for (let i = 0; i < this.AssetsList.length; i++) {
            this.AssetsList[i].isIF = true;
          }
        }, err => {
          console.log(err)
        })
      },
      // 获取币种
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
          console.log(err)
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
              this.getMyMoney();
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
        this.getKline();
      },
      // 重置一下
      rest(formRule){
        this.ruleForm.eso='';
        this.ruleForm.fo='';
        this.$refs[formRule].resetFields();
      },
      // 画折线图
      drawLine(data){
        let myChart = echarts.init(document.getElementById('kline'));
        let _this =this;
        let option = {
          tooltip : {
            trigger: 'axis',
          },
          grid:{
            top:10
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
      //获取数据
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



    },
    mounted() {
      var _this = this;

      /*获取我的钱包*/
      this.getMyMoney();
      //获取eso 余额
      this.getMyMoneyType(73);
      //获取fo余额
      this.getMyMoneyType(16);
      // 获取兑换比例
     this.getPrice('eosToFo');
      // 获取兑换比例
      this.getPrice('foToEos');

      this.value = this.userInfo.country_id;
      /*默认选中的国家id*/
      /*判断用户是否绑定手机*/
      if (this.userInfo.mobile_status == 0) { /*未绑定手机号码未开启钱包*/
        this.isBdMobile = false;
      } else if (this.userInfo.mobile_status != 0) { /*已绑定手机号码未开启钱包*/
        this.isBdMobile = true;
      }
      ///获取国家信息
      axios.get(httpUrl.country).then(function (res) {
        _this.cities = res.data.data;
      }, function (error) {
        console.log(error)
      })
      ///获取资产信息-------资产折合
      axios.get(httpUrl.finances, {
        headers: {
          "Authorization": "Bearer " + _this.token
        }
      }).then(function (res) {
        let arr = res.data.data;
        for (let i = 0; i < arr.length; i++) {
          _this.CurrencyBalance += parseFloat(arr[i].btc_blance);
          _this.RMBBalance += parseFloat(arr[i].cny_blance);
        }
      }, function (err) {
        console.log(err)
      })
      /*获取点卡数量*/
      axios.get(httpUrl.pointCardBalance, {
        headers: {
          "Authorization": "Bearer " + _this.token
        }
      }).then(function (res) {
        if (res.data.data.length == 0) {
          _this.pointCardBalance = 0;
        } else {
          _this.pointCardBalance = res.data.data.pointcard;
        }

        if (res.data.data.pts_on == 1) {
          _this.value4 = true;
        } else {
          _this.value4 = false;
        }
      }, function (err) {
        console.log(err)
      })

      /*判断用户是否有选中隐藏小额币种*/
      if (this.isHidden) {
        this.checked = true;
        this.change(this.checked)
      }


    }
  }
</script>
<style lang="scss">
  #trading{
    .el-dialog__body{
      padding: 30px 0;
    }
  }

</style>

<style scoped>

  .klinetit{
    font-size: 18px;
    line-height: 30px;
    color: #1e1d54;
  }
  .klineinner{
    background: #f5f6fc;
    padding: 20px 20px;
  }
  .klinefoot{
    text-align: left;
    font-size: 14px;
    color: #03022d;
    margin-top: -24px;
  }
  .diabtn_box{
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
  }
  .ab{
    position: relative;
  }
  .yve{
    position: absolute;
    top: 45px;
    right: 75px;
    color: red;
  }
  .kline_box{
    margin-top: 20px;
  }
  .kline{
    width: 100%;
    height: 200px;

  }
  .kline_text{

    font-size: 12px;
    line-height: 20px;
    text-align: left;
    padding: 0 20px;
    padding-top: 20px;
    color: #232258;
  }
  .kline_text p{
    margin-top: 10px;
  }
  .dia_con_item_l3b{
    display: flex;
    flex-direction: row;
  }
  .dia_con_item{
    display: flex;
    flex-direction: row;
    width: 740px;
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
    background: url("../../../assets/fo_icon.png") no-repeat center;
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
    width: 274px;
    height:45px;
  }
  .exchange_icon{
    background: url("../../../assets/ex_change.png")no-repeat center;
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
    background: url("../../../assets/eso_icon.png") no-repeat center;
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
    margin-top: 30px;
  }
  .btn_exchange{
    color: #fff;
    background:#60C8C4;
    width: 200px;
    height: 40px;
    border: 1px solid #60C8C4;
    margin-right: 36px;
  }

  .btn_exchange:hover{
    border: 1px solid #12B4C8;
    background:#60C8C4;
  }


</style>

<style lang="scss">

  button {
    outline: none;
  }


  /*交易账户*/

  .trading_white {
    /*头部内容部分*/
    .Equivalent {
      background: #f7f6fc;
      border: 1px solid #ddd;
      border-top: none;
      .Equivalent-title {
        color: #000 !important;
        border-bottom: none !important;
        .el-checkbox__input.is-checked + .el-checkbox__label {
          color: #409EFF !important;
        }
        .el-checkbox__label {
          color: #666;
        }
        input {
          color: #000 !important;
        }
      }
      .Equivalent-content {
        border-bottom: 1px solid #ddd;
      }
    }
    /*折合头部*/
    .zhe_he {
      background: #e8e8f4 !important;
      color: #000 !important;
      box-shadow: 0 7px 10px rgba(0, 0, 0, 0.2) !important;
      .zhe_he_title {
        border-bottom: 1px solid #ddd !important;
      }
      .toNum {
        color: #7773f4 !important;
      }
    }
    .Equivalent-content:hover {
      background: #fff !important;
    }
  }

  .transaction_color {
    span, p {
      color: #7773f4 !important;
    }
  }

  .transaction-title-white {
    dd:nth-of-type(1) {
      border-top: 1px solid #ddd;
    }
    dd {
      border-right: 1px solid #ddd !important;
      border-bottom: 1px solid #ddd !important;
      border-left: 1px solid #ddd !important;
      color: #000 !important;
      background: #fff !important;
    }
    dd:hover {
      background: #ddd !important;
    }
  }

  /*边框内部*/

  .border_nei {
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    border: 3px solid #0b0b15;
  }

  /*暂无数据*/

  .no-data {
    width: 100%;
    text-align: center;
    line-height: 30px;
  }

  .no-data-active {
    color: #000 !important;
  }

  /*整体大box*/

  #trading {
    .el-checkbox {
      color: #fff;
    }
  }

  #trading {
    width: 100%;
    color: #fff;
    /*分页样式*/
    .el-checkbox {
      font-weight: 400;
      color: #a0a0a0;
    }
    .el-pagination.is-background .el-pager li.active {
      border-color: #26cbc5 !important;
      background: #26cbc5 !important;
    }
    .zhe_he {
      width: 100%;
      box-sizing: border-box;
      background: #17172c;
      padding-left: 15px;
      box-shadow: 0 7px 10px rgba(0, 0, 0, 0.8);
      .zhe_he_title {
        display: flex;
        line-height: 50px;
        justify-content: space-between;
        box-sizing: border-box;
        padding: 0 15px 0 0;
        text-align: center;
        font-size: 15px;
        .zhTitleLeft {
          .iconfont {
            font-size: 20px;
            cursor: pointer;
          }
          .iconfont:hover + .Withprice {
            display: block;
          }
          position: relative;
          .Withprice {
            display: none;
            position: absolute;
            top: -40px;
            left: 8%;
            font-size: 12px;
            background: #242540;
            box-shadow: 0 7px 10px rgba(0, 0, 0, 0.8);
            padding: 0 5px;
            border-radius: 4px;
          }
          .Withprice:after {
            content: "";
            position: absolute;
            bottom: -8px;
            left: 50%;
            margin-left: -6px;
            border-bottom: 0;
            border-top: 8px solid #242540;
            border-right: 8px dashed transparent;
            border-left: 8px dashed transparent;
          }
        }
        span {
          font-size: 14px;
        }

        .right {
          .el-switch {
            margin-left: 12px;
            .el-switch__label.el-switch__label--left {
              color: #fff;
            }
            .el-switch__label.el-switch__label--right {
              color: #ffff;
            }
            .el-switch__label--left.is-active,
            .el-switch__label--right.is-active {
              color: #409EFF !important;
            }
          }
        }
      }
      .Folding {
        display: flex;
        box-sizing: border-box;
        padding: 0 15px 0 0;
        line-height: 45px;
        justify-content: space-between;
        font-size: 14px;
        .toNum {
          color: #767ff1;
          display: flex;
          cursor: pointer;
          align-items: center;
          .iconfont {
            font-size: 13px;
            margin-left: 2px;
          }
        }
      }
    }
  }

  /*折合内容部分*/

  .Equivalent {
    width: 100%;
    border-top: none;
    box-sizing: border-box;
    background: #16182c;
    padding: 0 0 0 15px;
    /*数据*/
    .Equivalent-content {
      cursor: pointer;
      @extend .Equivalent-title;
      li:nth-last-child(1) {
        span {
          cursor: pointer;
          margin-left: 25px;
          color: #13f2fa;
        }
        span:nth-of-type(1) {
          margin-left: 35px;
        }
      }
      .transaction {
        display: flex;
        justify-content: center;
        .spanRight{
          margin-right:20px;
        }
        .jiao-yi {
          width: 60px;
          height: 50px;
          float: left;
          position: relative;
          .gray {
            color: #8d8d8d;
          }
          p, a {
            color: #13f2fa;
            cursor: pointer;
          }
          .transaction-title {
            position: absolute;
            right: -20px;
            top: 40px;
            z-index: 999;
            display: none;
            border-radius: 10px;
            dt {
              width: 90px;
              height: 30px;
              line-height: 30px;
              background-color: #242540;
              cursor: pointer;
            }
            dd {
              @extend dt;
            }
            dt:hover,
            dd:hover {
              background: #2b2c53;
              color: #13f2fa;
            }
          }
        }

      }
    }
    .Equivalent-content:nth-last-child(1) {
      border-bottom: none;
    }
    .Equivalent-content:hover {
      background: #202341;
    }
    /*头部内容部分*/
    .Equivalent-title {
      width: 100%;
      height: 45px;
      line-height: 45px;
      border-bottom: 1px solid #2e3157;
      display: flex;
      li:nth-of-type(1) {
        flex: 1.3;
        text-align: left;
        .bz-text {
          margin-right: 15px;
        }
      }
      li:nth-last-child(1) {
        flex: 1.5;
        height: 45px;
        text-align: center;
      }
      li {
        flex: 1.1;
        text-align: center;
      }
    }
  }

  /*我的钱包*/
  .MyPurse_white{
    background: #fff !important;
  }
  .MyPurse {
    width: 100%;
    height: 200px;
    background: #16182c;
    margin-top: 5px;
    padding-top: 10px;
    .MyPurseTitle {
      width: 100%;
      height: 55px;
      line-height: 55px;
      box-sizing: border-box;
      padding-left: 15px;
      font-size: 14px;
    }
    .purseType {
      width: 100%;
      height: 150px;
      .purseTypeWrapper {
        display: flex;
        justify-content: space-between;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        padding: 0 15px;
        .purseTypeItem {
          width: 32.5%;
          height: 140px;
          background: -webkit-gradient(linear, 100% 0, 0 0, from(#515a78), to(#383c5e));
          background: -webkit-linear-gradient(to right, #515a78, #383c5e);
          background: -moz-linear-gradient(to right, #515a78, #383c5e);
          background: -o-linear-gradient(to right, #515a78, #383c5e);
          background: linear-gradient(to right, #515a78, #383c5e);
          border-radius: 4px;
          cursor: pointer;
          color: #fff;
          box-sizing: border-box;
          padding: 10px 10px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          .purseTypeTitle {
            width: 100%;
            height: 50px;
            line-height: 50px;
            font-size: 18px;
            .curName{
              font-size: 14px;
            }
          }
          .purseTypeBottom {
            width: 100%;
            height: 50px;
            line-height: 50px;
            font-size: 15px;
            .num {
              font-size: 18px;
            }
          }
        }
        .purseTypeActive {
          background: -webkit-gradient(linear, 100% 0, 0 0, from(#5bc3bf), to(#5bc3bf));
          background: -webkit-linear-gradient(to right, #5bc3bf, #5bc3bf);
          background: -moz-linear-gradient(to right, #5bc3bf, #5bc3bf);
          background: -o-linear-gradient(to right, #5bc3bf, #5bc3bf);
          background: linear-gradient(to right, #5bc3bf, #5bc3bf);
          position: relative;
        }
        .purseTypeActive:after {
          content: "";
          position: absolute;
          bottom: -8px;
          left: 50%;
          margin-left: -6px;
          border-bottom: 0;
          border-top: 8px solid #5bc3bf;
          border-right: 8px dashed transparent;
          border-left: 8px dashed transparent;
        }
      }
    }
  }
  /*白版balaneListTitle*/
  .balaneListTitleWhite{
    background: #fff !important;
    .balaneListTitleContent{
      border-color: #eee !important;
    }
    .search{
      background: #eee !important;
      border-color: #e3e5e6 !important;
    }
  }
  /*资产列表头部*/
  .balaneListTitle {
    width: 100%;
    height: 100px;
    background: #17172c;
    padding-top: 30px;
    .balaneListTitleContent {
      display: flex;
      height: 100px;
      margin-left: 15px;
      justify-content: space-between;
      align-items: center;
      box-sizing: border-box;
      border-bottom: 2px solid #2e3157;
      padding-right: 15px;
      .oLeft {
        font-size: 18px;
        color: #13f2fa;
      }
      .oRight {
        display: flex;
        align-items: center;
        .ManagingAssets {
          width: 100px;
          height: 38px;
          background: #25cbc5;
          border-radius: 4px;
          color: #fff;
          margin-left: 20px;
        }
      }
      .search {
        width: 150px;
        height: 35px;
        line-height: 35px;
        border: 1px solid #45497a;
        border-radius: 4px;
        background: #1f1f3d;
        input {
          float: left;
          width: 80%;
          height: 100%;
          border: none;
          background: none;
          outline: none;
          box-sizing: border-box;
          padding-left: 10px;
          color: #fff;
          font-size: 14px;
        }
        .iconfont {
          float: left;
          margin-left: 5px;
          cursor: pointer;
          color: #45497a;
          font-size: 20px;
        }
      }
    }
  }

  .men_ban {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    z-index: 66;
  }

  .bdMobile {
    position: fixed;
    left: 50%;
    top: 50%;
    width: 450px;
    height: 325px;
    background: #fff;
    margin-left: -225px;
    margin-top: -165px;
    z-index: 99;
    -webkit-border-radius: 4px;
    -moz-border-radius: 4px;
    border-radius: 4px;
    box-sizing: border-box;
    padding: 15px 15px;
    input::-webkit-input-placeholder{
      font-size: 14px;
      color: #e3e5e6;
    }
    .bdMobileTitle {
      line-height: 50px;
      font-size: 16px;
      color: #1e1d54;
    }
    .bdMobileText {
      color: #5b5a83;
      margin-top: 10px;
    }
    .Mobile {
      width: 100%;
      height: 40px;
      border: 1px solid #d1d3de;
      border-radius: 4px;
      margin: 15px 0;
      .el-select {
        width: 80px;
        .el-input__inner {
          border: none;
        }
      }
      .phoneNum {
        width: 330px;
        height: 30px;
        outline: none;
        margin-left: 5px;
        border: none;
        box-sizing: border-box;
        font-size: 16px;
        border-left: 1px solid #d1d3de;
        padding-left: 10px;
      }
      .emailAddress {
        width: 90%;
        height: 100%;
        margin-left: 5px;
        border: none;
        outline: none;
        font-size: 16px;
      }
    }
    .MobileBd {
      width: 100%;
      height: 40px;
      line-height: 40px;
      color: #1f285b;
      background: #efeff3;
      border-radius: 4px;
      margin-top: 15px;
      font-size: 14px;
      box-sizing: border-box;
      padding-left: 10px;
    }
    .Mobile1 {
      @extend .Mobile;
      display: flex;
      align-items: center;
      margin-top: 20px;
      .getCode {
        min-width: 300px;
        height: 30px;
        outline: none;
        margin-left: 5px;
        border: none;
        box-sizing: border-box;
        font-size: 16px;
        border-right: 1px solid #d1d3de;
        padding-left: 10px;
      }
      .getCodeText {
        flex: 1;
        font-size: 14px;
        display: inline-block;
        text-align: center;
        .blue {
          color: #25cbc5;
          cursor: pointer;
        }
        .gray {
          color: #c7c7c7;
          cursor: auto;
        }
      }
    }
    .NoReception {
      width: 100%;
      height: 40px;
      line-height: 40px;
      text-align: right;
      color: #5b5a83;
      .blue {
        color: #25cbc5;
        cursor: pointer;
      }
    }
    .RestartNow {
      width: 100%;
      text-align: right;
      button {
        width: 150px;
        height: 40px;
        background: #60c8c4;
        color: #fff;
        border-radius: 4px;
        margin-top: 10px;
      }
    }
  }

  /*管理资产*/
  .ManagingAssetsBox {
    position: fixed;
    left: 50%;
    top: 15%;
    width: 450px;
    height: 450px;
    background: #fff;
    margin-left: -225px;
    z-index: 99;
    -webkit-border-radius: 4px;
    -moz-border-radius: 4px;
    border-radius: 4px;
    box-sizing: border-box;
    padding: 20px 20px;
    .ManagingAssetsTitle {
      display: flex;
      justify-content: space-between;
      span {
        font-size: 16px;
        color: #1e1d54;
      }
      .iconfont {
        font-size: 16px;
        font-weight: bold;
        color: #a3a3bf;
        cursor: pointer;
      }
    }
    .management {
      width: 100%;
      display: flex;
      align-items: center;
      .ManagingAssetsSearch {
        flex: 1;
        display: flex;
        align-items: center;
        height: 40px;
        line-height: 40px;
        border: 1px solid #d1d3de;
        border-radius: 4px;
        margin: 20px 0;
        input {
          width: 90%;
          height: 90%;
          border: none;
          outline: none;
          box-sizing: border-box;
          padding-left: 5px;
        }
        .iconfont {
          color: #000;
          margin-left: 10px;
          font-weight: bold;
          font-size: 18px;
          cursor: pointer;
        }
      }
      .ManagementButton {
        width: 100px;
        height: 40px;
        background: #25cbc5;
        color: #fff;
        border-radius: 4px;
        margin-left: 10px;
        outline: none;
      }
    }
    .noListData{
      text-align: center;
      color: #000;
    }
    /*列表*/
    .ManagingAssetsList {
      width: 100%;
      .ManagingAssetsWrapper {
        width: 100%;
        height: 250px;
        overflow-y: auto;
        .ManagingAssetsItem {
          width: 100%;
          height: 80px;
          background: #f9fafa;
          margin-bottom: 5px;
          dl {
            color: #000;
            width: 100%;
            height: 80px;
            dd:nth-of-type(1) {
              padding-top: 10px;
            }
            dd {
              display: flex;
              align-items: center;
              .oImg {
                width: 30px;
                height: 30px;
                margin-left: 8px;
                margin-right: 5px;
                img {
                  width: 26px;
                  height: 26px;
                }
              }
              .curName {
                margin: 0 5px;
                font-size: 16px;
              }
              .fullName {
                color: #adafbb;
              }
            }
            .ManagingAssetsAddress {
              .oImg {
                margin-right: 10px;
              }
              .address1 {
                width: 365px;
                display: flex;
                align-items: center;
                justify-content: space-between;
                .text {
                  color: #b5b8c5;
                }
                .iconfont {
                  width: 15px;
                  height: 15px;
                  line-height: 15px;
                  border: 1px solid #25cbc5;
                  border-radius: 2px;
                  color: #25cbc5;
                  margin-right: 5px;
                  cursor: pointer;
                }
              }
            }
          }
        }
      }

    }
  }

  .managementEos {
    position: fixed;
    left: 50%;
    top: 15%;
    width: 450px;
    background: #fff;
    margin-left: -225px;
    z-index: 99;
    -webkit-border-radius: 4px;
    -moz-border-radius: 4px;
    border-radius: 4px;
    box-sizing: border-box;
    padding: 20px 20px;
    .managementEosTitle {
      width: 100%;
      height: 40px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      color: #1e1d54;
      font-size: 16px;
      .iconfont {
        font-size: 15px;
        font-weight: bold;
        cursor: pointer;
      }
    }
    .managementEosContent {
      padding-top: 30px;
      .managementEosItem {
        width: 100%;
        display: flex;
        line-height: 50px;
        .oLeft {
          flex: .2;
          color: #505b82;
          font-size: 13px;
          span {
            color: red;
          }
        }
        .oRight {
          flex: .8;
          input {
            display: block;
            width: 100%;
            height: 40px;
            border: 1px solid #d1d3de;
            border-radius: 4px;
            outline: none;
            box-sizing: border-box;
            padding-left: 10px;
          }
          .errorRed {
            width: 100%;
            height: 50px;
            color: red;
          }
        }
      }
    }
    .addButton {
      width: 100%;
      height: 60px;
      display: flex;
      justify-content: flex-end;
      align-items: center;
      .cancel {
        font-size: 15px;
        color: #1e1d54;
        cursor: pointer;
      }
      .AddTo {
        width: 150px;
        height: 40px;
        background: #60c8c4;
        color: #fff;
        border-radius: 4px;
        font-size: 15px;
        margin-left: 20px;
        outline: none;
      }
    }
    .Description {
      .DescriptionTitle, .DescriptionItem {
        color: #c7c7c7;
        line-height: 22px;
      }
    }
  }

  .pageCount {
    width: 100%;
    height: 100px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }

  .noData {
    width: 100%;
    margin-top: 100px;
    text-align: center;
    .gray {
      color: #c0c0c9;
      line-height: 30px;
      font-size: 14px;
    }
    .blue {
      color: #25cbc5;
      cursor: pointer;
      font-size: 15px;
    }
  }
  /*暂无记录*/
  .NoAsset{
    width: 100%;
    height:50px;
    line-height: 50px;
    text-align: center;
    font-size: 14px;
    .blue {
      color: #25cbc5;
      cursor: pointer;
      font-size: 15px;
    }
  }
</style>
