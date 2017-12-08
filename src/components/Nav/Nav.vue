<template>
	<ul class="nav">
		<!-- <router-link tag="li" :to="item.href" v-for="(item, index) in menu" :class="index === currentIndex ? 'active' : ''" @click.native="toggleNav(index)">
			<a href="">{{item.name}}</a>
		</router-link> -->
		<li v-for="(item, index) in menu">
			<router-link tag="a" :to="item.href"  :class="index === currentIndex ? 'active' : ''" @click.native="toggleNav(index)">
				{{item.name}}
			</router-link>
		</li>
	</ul>
</template>

<script>
	const PATH1 = '/index/publishNews'
	const PATH2 = '/index/newsMarquee'
	export default {
		name: 'Nav',
		data () { 
			return { 
				currentIndex: 0,
				menu: [ 
					{ 
						name: '集团公告发布',
						href: PATH1
					},
					{ 
						name: '首页滚动消息',
						href: PATH2
					}
				]
			}
		},
		methods: { 
			toggleNav (index) { 
				this.currentIndex = index
			}
		},
		created () { 
			if (this.$route.path === PATH2) { 
				this.currentIndex = 1
			}
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scope>
	@import '../../assets/less/varialbe.less';
	.nav { 
		position: absolute;
		top: @header-height;
		bottom: 0;
		width: 150px;
		background-color: #1f2d3d;
		border-top: 1px solid #303e4f;
		padding-top: 15px;
		li { 
			a { 
				display: block;
				line-height: 42px;
				color: white;
				padding-left: 1em;
				&:hover { 
					background-color: #0d141b;
				}
			}
			.active { 
				background-color: #0d141b;
			}
		}
		
	}
</style>
