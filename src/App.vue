<template>
	<div id="app">
		<router-view></router-view>
	</div>
</template>

<script>
	export default {
		name: 'app'
	}
</script>

<style lang="less">
	html, body {
		margin: 0;
		padding: 0;
	}

	ul { 
		margin: 0;
		padding: 0;
	}

	ul, li { 
		list-style: none;
	}

	a {
		text-decoration: none;
	}

	[v-cloak] {
		display: none;
	}

	#app {
		font-family: 'Avenir', Helvetica, Arial, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
	}

	.elForm { 
		width: 80%;
		margin: 0 auto;
	}

	.fr { 
		float: right;
	}

	.m-l-15 { 
		margin-left: 15px;
	}
</style>
