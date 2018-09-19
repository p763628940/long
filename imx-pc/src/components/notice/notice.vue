<template>
	<div id="notice">
		<div class="notice_content">
			<!--公告头部-->
			<div class="notice_title" :class="{'notice_title_white':getColor==1}">
				<p>{{$t("Announcement.AnnouncementList")}}</p>
			</div>
			<!--公告主体内容-->
			<ul class="notice_content_wrapper" :class="{'notice_content_wrapper_white':getColor==1}">
				<li v-for="(item,index) in noticeList" class="notice_content_item" :key="index" tag="li" @click="noticeClick(item.id)">
					<p class="text">
						<span v-if="item.important">{{$t("Announcement.Important")}}</span> {{item.title}}
					</p>
					<p class="time">{{formatTime(item.created_at)}}</p>
				</li>
			</ul>
			<!--分页-->
			<div class="pageCount">
				<el-pagination background layout="prev, pager, next" :page-size="topage" @current-change="pageChange" :total="total">
				</el-pagination>
			</div>
		</div>
	</div>
</template>

<script>
	import axios from "axios"
	import { httpUrl } from "../http_url/http_url"
	import { mapGetters,mapActions,mapState,mapMutations } from 'vuex'
	export default {
		data() {
			return {
				noticeList: [],
				/*公告全部列表*/
				topage: 10,
				total: 0,
			}
		},
		computed: {
			...mapState('user',['lang']),
		},
		methods: {
			pageChange(val) { /*页数显示*/
				var _this = this;
				axios.get(httpUrl.newslist, {
					params: {
						"page": val
					}
				}).then(function(res) {
					_this.noticeList = res.data.data.data; /*获取列表信息*/
				}, function(err) {
					console.log(err)
				})
			},
			noticeClick(id) {
				/*设置广告ID*/
				this.$router.push({
					name: "details",
					params: {
						id: id
					}
				}); //路由跳转
			},
		},
		mounted() {
			var _this = this; 
			if(this.lang != "zh-CN") {		
				axios.get(httpUrl.newslist, {
					params: {
						"lang": "en"
					}
				}).then(function(res) {
					_this.noticeList = res.data.data.data; /*获取列表信息*/
					_this.total = res.data.data.total; /*获取列表总条数*/
				}, function(err) {
					console.log(err)
				})
			} else {	
				axios.get(httpUrl.newslist).then(function(res) {
					_this.noticeList = res.data.data.data; /*获取列表信息*/
					_this.total = res.data.data.total; /*获取列表总条数*/
				}, function(err) {
					console.log(err)
				})
			}	

		}
	}
</script>

<style lang="scss" scoped>
	/*白色背景开始*/
	
	.notice_title_white {
		border-bottom: 2px solid #312e67 !important;
		p {
			background: #312e67 !important;
		}
	}
	
	.notice_content_wrapper_white {
		border: 1px solid #ddd !important;
		background: #fff !important;
		color: #000 !important;
		li:hover {
			background: #eee !important;
			color: #000 !important;
		}
		li {
			border-bottom: 1px solid #eaeaea !important;
		}
	}
	/*白色背景结束*/
	
	#notice {
		color: #fff;
		/*分页样式*/
		.el-pagination.is-background .el-pager li.active {
			background: #9F99F2;
		}
	}
	/*公告内容部分*/
	
	.notice_content {
		width: 70%;
		margin: 20px auto;
	}
	/*内容头部*/
	
	.notice_title {
		width: 100%;
		height: 45px;
		width: 100%;
		height: 45px;
		p {
			display: inline-block;
			height: 45px;
			text-align: center;
			padding: 0 35px;
			font-size: 16px;
			line-height: 45px;
			color: #fff;
			background: #272867;
		}
	}
	/*内容数据展示部分*/
	
	.notice_content_wrapper {
		width: 100%;
		height: 510px;
		border-radius: 2px;
		background: #16182c;
		margin-top: 20px;
		.notice_content_item {
			width: 100%;
			height: 50px;
			line-height: 50px;
			cursor: pointer;
			border-bottom: 1px solid #33304e;
			.text {
				float: left;
				margin-left: 10px;
				span {
					padding: 0 2px;
					height: 20px;
					line-height: 20px;
					background: #9f9dfa;
					display: inline-block;
					border-radius: 4px;
				}
			}
			.time {
				float: right;
				margin-right: 10px;
			}
		}
		li:hover {
			color: #9f9dfa;
			span {
				color: #fff;
			}
		}
		li:nth-last-child(1) {
			border-bottom: none !important;
		}
	}
	/*分页*/
	
	.pageCount {
		float: right;
		margin-top: 20px;
	}
</style>