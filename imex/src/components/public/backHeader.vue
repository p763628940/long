<template>
	<div class="header">
		<div class="header_box">
			<div class="register_header">
				<p class="back" @click="$router.go(-1)">
					<i class="iconfont icon-zuojiantou"></i>
				</p>
				<p class="register_type">
					{{text}}
				</p>
			</div>
		</div>
		<div class="oHeight"></div>
	</div>
</template>

<script>
	export default {
		props: ["text"]
	}
</script>

<style lang="scss" scoped>
$header_bg:#141738;
	/*撑开高度*/
	.oHeight{
		width: 100%;
		height: .5rem;
	}
	/*头部固定*/

	.header_box {
		width: 100%;
		height: .5rem;
		position: fixed;
		top: 0;
		left: 0;
		z-index: 66;
	}

	.register_header {
		width: 100%;
		height: .5rem;
		line-height: .5rem;
		position: relative;
		color: #fff;
		background: rgb(20, 23, 56);
		.back {
      width: .3rem;
			margin-left: .15rem;
		}
		.register_type {
			position: absolute;
			top: 0;
			left: 15%;
			width: 70%;
			text-align: center;
			font-size: .15rem;
			font-weight: 500;
			overflow: hidden;
			white-space: nowrap;
			text-overflow: ellipsis;
		}
	}
</style>
