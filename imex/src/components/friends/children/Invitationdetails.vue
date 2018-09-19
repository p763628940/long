<template>
	<div id="Invitationdetails">
		  <my-header :text="titleText"></my-header>
		  <!--邀请记录  和 返佣记录-->
		  <div class="inviteAnti">
		  	  <span :class="{'active':isShow}" @click="isShow=true">{{$t("invitation.Invitehistory")}}</span>
		  	  <span :class="{'active':!isShow}" @click="isShow=false">{{$t("invitation.Cashbackhistory")}}</span>
		  </div>
		  <div class="tabContent" v-show="isShow">
		  	    <ul class="title">
			  	    	<li>{{$t("invitation.Inviteeaccount")}}</li>
			  	    	<li>{{$t("invitation.Time")}}</li>
			  	    	<li>{{$t("invitation.Status")}}</li>
		  	    </ul>
		  	    <ul v-for="item in invitationRecordList">
			  	    	<li>{{item.name}}</li>
			  	    	<li>{{formatTime(item.created_at).split(" ")[0]}}</li>
			  	    	<li>
			  	    		<span class="blue" v-show="item.type==1">{{$t("invitation.Valid")}}</span>
			  	    		<span class="shiXiao" v-show="item.type==0">{{$t("invitation.Expired")}}</span>
			  	    	</li>
		  	    </ul>
				<!--分页开始-->
		<div class="pageCount" v-show="invitationTotal>10">
			<el-pagination small layout="prev, pager, next" :page-size="10" :total="invitationTotal" @current-change="pageChange">
			</el-pagination>
		</div>
		<!--暂无记录-->
		<div class="noData" v-show="invitationTotal==0">{{$t("list.noData")}}</div>
		  </div>

		  <div class="tabContent" v-show="!isShow">
		  	    <ul class="title">
			  	    	<li>{{$t("invitation.Inviteeaccount")}}</li>
			  	    	<li>{{$t("invitation.Time")}}</li>
			  	    	<li>{{$t("invitation.cashback")}}(IMX)</li>
		  	    </ul>
		  	    <ul v-for="item in maidRecordList">
			  	    	<li>{{item.source_uid}}</li>
			  	    	<li>{{formatTime(item.updated_at).split(" ")[0]}}</li>
			  	    	<li>
							{{item.balance | number(8)}}
			  	    	</li>
			  	</ul>
			  	<!--分页开始-->
		<div class="pageCount" v-show="maidTotal>10">
			<el-pagination small layout="prev, pager, next" :page-size="10" :total="maidTotal" @current-change="pageChangeMaid">
			</el-pagination>
		</div>
		<!--暂无记录-->
		<div class="noData" v-show="maidTotal==0">{{$t("list.noData")}}</div>
		  </div>

	</div>
</template>

<script>
import header from "../../public/backHeader"
export default{
	data(){
		return{
			 titleText:this.$t("userCenter.Invitationdetails"),
			 isShow:true,     /*默认显示邀请记录*/
			invitationRecordList:[],  /*邀请列表*/
			invitationTotal:0,      /*邀请总条数*/
			maidRecordList:[],  /*返佣金*/
			maidTotal:0        /*佣金总条数*/
		}
	},
	components:{
		"my-header":header
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
			pageChange(val) { /*邀请记录*/
				let _this = this;
				this.$ajax.get(this.httpUrl.invitationRecord, {
					headers: {
						"Authorization": "Bearer " + _this.token
					},
					params: {
						page: val
					}
				}).then(function(res) {
					_this.invitationRecordList = res.data.data.data;
				}, function(err) {
					console.log(err)
				})
			},
			pageChangeMaid(val) { /*返佣记录*/
				let _this = this;
				this.$ajax.get(this.httpUrl.maidRecord, {
					headers: {
						"Authorization": "Bearer " + _this.token
					},
					params: {
						page: val
					}
				}).then(function(res) {
					_this.maidRecordList = res.data.data.data;
				}, function(err) {
					console.log(err)
				})
			}
		},
	mounted(){
		let _this = this;
		/*邀请记录*/
			this.$ajax.get(this.httpUrl.invitationRecord, {
				headers: {
					"Authorization": "Bearer " + _this.token
				}
			}).then(function(res) {
				_this.invitationRecordList = res.data.data.data;
				_this.invitationTotal = res.data.data.total;
			}, function(err) {
				console.log(err)
			})

			/*返佣记录*/
			this.$ajax.get(this.httpUrl.maidRecord, {
				headers: {
					"Authorization": "Bearer " + _this.token
				}
			}).then(function(res) {
				_this.maidRecordList = res.data.data.data;
				_this.maidTotal = res.data.data.total;
			}, function(err) {
				console.log(err)
			})
	}
}

</script>
<style lang="scss">

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
		color: #a4acff;
	}

	.el-pagination button:disabled {
		color: #fff;
		background: none;
	}
</style>
<style lang="scss" scoped>
#Invitationdetails{
	color: #fff;
}
.active{
	color: #12f3f7;
	border-bottom: 1px solid #12f3f7;
}
.noData{
	text-align: center;
	line-height: .25rem;
	font-size: .13rem;
}
/*切换头部*/
.inviteAnti{
	width: 100%;
	height: .6rem;
	display: flex;
	align-items: center;
	justify-content: center;
	span{
		display: inline-block;
		height: .2rem;
		margin: 0 .1rem;
		padding-bottom: .05rem;
		box-sizing: border-box;
	}
}
/*切换内容*/
.tabContent{
	width: 93%;
	margin: 0 auto;
	ul{
		display: flex;
		box-sizing: border-box;
		padding: 0 .06rem;
		border-bottom: 1px solid #1b203c;
		li{
			flex: 1;
			height: .3rem;
			line-height: .3rem;
			white-space: nowrap;
			text-overflow: ellipsis;
			overflow: hidden;
			.blue{
				color: #12f3f7;
			}
			.shiXiao{
				color: #646da0;
			}
		}
		li:nth-of-type(1){
			text-align: left;
		}
		li:nth-of-type(2){
			text-align: center;
		}
		li:nth-of-type(3){
			text-align: right;
		}
	}
	.title{
		background: #171b39;
	}
}

	/*分页*/

	.pageCount {
		width: 100%;
		margin: .1rem 0;
		display: flex;
		justify-content: center;
	}
</style>
