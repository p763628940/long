<template>
	<div id="gong_gao">
		<!--公告头部-->
		<my-header :backisShow="headerIsShow" :headerTitle="title"></my-header>
		<!--公告头部-->
		<div class="gong_gao_title">
			<span class="title">{{gonggao.title}}</span>
			<span class="time">{{formatTime(gonggao.created_at)}}</span>
		</div>
		<!--解析content-->
		<div id="container" v-html="gonggao.content"></div>
	</div>
</template>

<script>
	import header from "./header" /*引入头部*/
	import { mapState } from 'vuex';
	export default {
		data() {
			return {
				title: this.$t("list.Announcement"),
				headerIsShow: true,
				gonggao: "",
				/*拿到返回的公告内容*/
				gonggaoTitle: "",
				/*拿到返回的公告标题*/
			}
		},
		computed:{
			...mapState('user',['lang']),
		},
		components: { //注册组件
			"my-header": header
		},
		mounted() {
			let _this = this;
			if(this.lang != 'zh') {
				/*获取公告详情内容*/
				this.$ajax.get(this.httpUrl.newsDetils, {
					params: {
						newsId: this.$route.params.id,
						lang: "en"
					}
				}).then(function(res) {
					_this.gonggao = res.data.data;
				}, function(err) {
					console.log(err)
				})
			} else {
				/*获取公告详情内容*/
				this.$ajax.get(this.httpUrl.newsDetils, {
					params: {
						newsId: this.$route.params.id,
						lang: "zh"
					}
				}).then(function(res) {
					_this.gonggao = res.data.data;
				}, function(err) {
					console.log(err)
				})
			}

		}
	}
</script>

<style lang="scss">
	$font_color:#cacefe;
	$blue:#6068b6;
	.gong_gao_title {
		width: 100%;
		min-height: .5rem;
		display: flex;
		justify-content: space-between;
		align-items: center;
		flex-wrap: wrap;
		box-sizing: border-box;
		padding: 0 .1rem;
		.title {
			color: #fff;
			font-size: .15rem;
		}
		.time {
			color: $blue;
		}
	}

	#container {
		color: $font_color;
		box-sizing: border-box;
		padding: 0 .1rem;
	}

	#container p {
		line-height: .22rem !important;
	}

	#container p:nth-of-type(1) {
		line-height: .3rem !important;
		font-size: .14rem;
		color: #fff;
	}
</style>
