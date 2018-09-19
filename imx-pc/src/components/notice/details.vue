<template>
	<div id="details">
		<!--公告详情的内容部分-->
		<div class="details_content">
			<div class="details_title_new" :class="{'notice_title_white':getColor == 1}">
				<p>{{$t("Announcement.Announcement")}}>{{$t("Announcement.AnnouncementDetails")}}</p>
				<router-link to="/index/notice" tag="span" class="ckgd">{{$t("Announcement.Viewmore")}}<i class="iconfont icon-xiangyou"></i></router-link>
			</div>
			<!--公告详情内容部分-->
			<div class="details_content_wrapper" :class="{'details_content_wrapper_white':getColor == 1}">
				<!--详情内容头部-->
				<div class="details_content_wrapper_title">
					<p class="text">{{details.title}}</p>
					<p class="time">{{formatTime(details.created_at)}}</p>
				</div>
				<div style="clear: both;"></div>
				<!--传过来的文本-->
				<div class="detailsHtml" v-html="details.content"></div>
			</div>

		</div>

	</div>
</template>

<script>
	import axios from "axios";
	import { httpUrl } from "../http_url/http_url";
	import $ from "jquery";
	import { mapGetters,mapActions,mapState,mapMutations } from 'vuex'
	export default {
		data() {
			return {
				noticeID: this.$route.params.id,
				/*获取id*/
				details: {},
				/*获取详情内容部分*/
			}
		},
		mounted() {
			var _this = this;
			if(this.lang != "zh-CN") {
				axios.get(httpUrl.newsDetils, {
					params: {
						"newsId": _this.noticeID,
						"lang": "en"	
					}
				}).then(function(res) {
					_this.details = res.data.data;
				}, function(err) {	
					console.log(err)
				})
			} else {		
				axios.get(httpUrl.newsDetils, {
					params: {
						"newsId": _this.noticeID
					}
				}).then(function(res) {
					_this.details = res.data.data;
				}, function(err) {
					console.log(err)
				})
			}

		},
		computed: {
			...mapState('user',['lang']),
		},
		updated() {
			$(".detailsHtml p").css({
				"line-height": "25px"
			})
		}
	}
</script>

<style lang="scss" scoped>
	/*白色版本开始*/
	
	.notice_title_white {
		border-bottom: 2px solid #312e67 !important;
		p {
			background: #312e67 !important;
		}
	}
	
	.details_content_wrapper_white {
		background: #fff !important;
		color: #000 !important;
		border: 1px solid #eee !important;
		.details_content_wrapper_title {
			border-bottom: 1px solid #eee !important;
		}
	}
	/*白色版本结束*/
	
	#details {
		color: #fff;
	}
	/*详情内容部分*/
	
	.details_content_wrapper {
		width: 100%;
		margin-top: 20px;
		background: #16182c;
	}
	/*内部边框*/
	
	.border_nei {
		box-sizing: border-box;
		border: 3px solid #0b0b15;
	}
	/*详情内容头部*/
	
	.details_content_wrapper_title {
		width: 100%;
		height: 50px;
		line-height: 50px;
		box-sizing: border-box;
		padding: 0 10px;
		border-bottom: 1px solid #33304e;
		.text {
			float: left;
			font-size: 16px;
		}
		.time {
			float: right;
			font-size: 15px;
			color: #857fc9;
		}
	}
	/*传过来的文本内容*/
	
	.detailsHtml {
		box-sizing: border-box;
		padding: 10px 10px;
		font-size: 14px;
	}
	/*公告详情头部*/
	
	.details_content {
		width: 70%;
		margin: 20px auto;
	}
	/*内容头部*/
	
	.details_title_new {
		width: 100%;
		height: 45px;
		width: 100%;
		background: #272867;
		display: flex;
		justify-content: space-between;
		align-items: center;
		p {
			display: inline-block;
			height: 45px;
			padding: 0 35px;
			text-align: center;
			font-size: 16px;
			line-height: 45px;
			color: #fff;
		}
		.ckgd {
			display: flex;
			align-items: center;
			font-size: 14px;
			color: #767ff1;
			cursor: pointer;
			.iconfont {
				font-size: 15px;
			}
		}
	}
</style>