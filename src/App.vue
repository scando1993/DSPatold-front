<template>
	<div>
		<router-view></router-view>
<!--		<customizer></customizer>-->
	</div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: 'App',
	data() {
		return {};
	},
	computed: {
		...mapGetters(["getThemeMode"]),
		themeName() {
			return this.getThemeMode.dark ? "dark-theme" : " ";
		},
		rtl() {
			return this.getThemeMode.rtl ? "rtl" : " ";
		}
	},
	metaInfo() {
		return {
			// if no subcomponents specify a metaInfo.title, this title will be used
			title: "DSPat",
			// all titles will be injected into this template
			titleTemplate: "%s | DSPat - Admin Dashboard Template",
			bodyAttrs: {
				class: [this.themeName, "text-left"]
			},
			htmlAttrs: {
				dir: this.rtl
			}
		};
	}
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
