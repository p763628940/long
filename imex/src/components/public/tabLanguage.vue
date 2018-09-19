<template>
	<div>
		<ul>
			<li  v-for="(item,key) in language">
				<a role="button" class="item" @click="changeLang(key)">{{item}}</a>
			</li>
		</ul>

	</div>
</template>

<script>
	import Vue from "vue";
	import $ from "jquery";
	import { mapGetters,mapActions,mapState,mapMutations } from 'vuex'

	export default {
		data() {
			return {
				language: {
					"zh": "中文简体",
					"en": "English",
					"kr": "한국어"
				}
			}
		},
		computed: {
			lang() {
				return Vue.config.lang;
			}
		},
		methods: {
			...mapMutations('user',['setLang']),
			changeLang(lang) {
				this.$i18n.locale = lang;
				Vue.config.lang = lang;
				this.setLang(lang);
			}
		}
	}
</script>

<style lang="scss">
	ul {
		display: flex;
		flex-direction: column;
		li {
			width: 100%;
			height: 20px;
			line-height: 20px;
		}
	}
</style>
