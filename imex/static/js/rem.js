//<script type="text/javascript"> 
			//事件  ： 屏幕发生改变时触发的事件        (屏幕宽是320px   苹果4的屏)
			window.onresize=window.onload=function(){
				var width=document.documentElement.clientWidth;//获取文档的宽
				////设置文档字体  (根目录下设置)
				document.documentElement.style.fontSize=width/3.2+"px";  
				//1rem=100px
			}
//		</script>