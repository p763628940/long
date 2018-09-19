<template>
	<div id="header">
		<div id="header_home">
		  <div id="content">
		  	 <i class="iconfont icon-zuojiantou" @click="$router.go(-1)" v-show="backisShow"></i>  
		  	 <span>{{headerTitle}}</span>  
		  </div>  	     
		</div>
		<div class="oHeight"></div>
	</div>
</template>

<script>
export default{
	data(){
		return{
			
		}
	},
	props: { 
		headerTitle:{type:String},
		backisShow:{type:Boolean}
	},
	methods:{
		
	}
}
</script>

<style lang="scss" scoped>
$header_bg:#141738;
/*头部样式*/
#header_home{
	width: 100%;
	height: .44rem;	     			
	line-height: .44rem;
	text-align: center;
	color: #fff;  
	background:$header_bg;
	font-size: .15rem;	
	font-weight: 500;
	position: fixed;
	top: 0;
	left: 0;
	z-index: 50;  
	#content{
		width: 100%;
		height: 100%;
		display: flex;
		align-items: center;
		position: relative;
		.iconfont{
			width: .5rem;
			text-align: center;
			font-size: .14rem;
			z-index: 50;
		} 
		span{
			width: 100%;  
			height: 100%;
			position: absolute;
			left: 0;
			top: 0;
			text-align: center;
		}
	}
}
/*高度撑起*/
.oHeight{
	width: 100%;
	height: .45rem;
}




</style>