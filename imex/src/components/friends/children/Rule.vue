<template>
	<div id="Rule">
		<my-header :text="titleText"></my-header>
		<!--活动规则-->
		<div class="ActivityRules">
			<p class="Rules">
				{{$t("introduce.Activityrules")}}
			</p>
			<ul class="ActivityRules_wrapper">
				<li>
					<span>1</span>
					<p>
						{{$t("inviteFriends.ActivityrulesO")}}
					</p>
				</li>
				<li> 
					<span>2</span>
					<p>{{$t("inviteFriends.ActivityrulesonetTe")}}</p>
				</li>
			</ul>
		</div>

	</div>
</template>

<script>
	import header from "../../public/backHeader"
	export default {
		data() {
			return {
				titleText: this.$t("introduce.ActivityrulesTi")
			}
		},
		components: {
			"my-header": header
		}
	}
</script>

<style lang="scss" scoped>
	#Rule {
		min-height: 100%;
		color: #fff;
		background: #191d38;
		padding-bottom: .1rem;
	}
	
	.ActivityRules {
		box-sizing: border-box;
		padding: 0 .15rem;
		background: url(https://imxpro.oss-cn-beijing.aliyuncs.com/BG.png) no-repeat;
		background-size: 100%;
		.Rules {
			width: 100%;
			font-size: .15rem;
			height: .5rem;
			line-height: .5rem;
		}
	}
	
	.ActivityRules_wrapper {
		width: 100%;
		li {
			width: 100%;
			display: flex;
			margin-bottom: .2rem;
			span {
				flex: .07;
				display: inline-block;
				width: .2rem;
				height: .2rem;
				text-align: center;
				line-height: .2rem;
				background: #fff;
				border-radius: 2px;
				color: #000;
				margin-right: .1rem;
			}
			p {
				flex: .9;
				font-size: .14rem;
			}
		}
	}
</style>