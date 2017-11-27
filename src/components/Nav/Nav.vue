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
	export default {
		name: 'Nav',
		data () { 
			return { 
				currentIndex: 0,
				menu: [ 
					{ 
						name: '发布通知',
						href: '/home/publishNews'
					},
					{ 
						name: '其它菜单',
						href: '/home/other'
					}
				]
			}
		},
		methods: { 
			toggleNav (index) { 
				this.currentIndex = index
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
