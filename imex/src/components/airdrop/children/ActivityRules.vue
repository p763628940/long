<template>
	<div id="ActivityRules">
		<my-header :text="headerTitle"></my-header>
		<div class="ActivityRulesContent">
			<div class="title">
				{{$t("airdrop.IMCandyRules")}}
			</div>
			<div class="Introduction">
				<ul>
					<li>1、{{$t("airdrop.AirdropParties")}}</li>
					<li>2、{{$t("airdrop.IMXUsers")}}</li>
					<li>3、{{$t("airdrop.Eachairdrop")}}</li>
					<li>4、{{$t("airdrop.Tokenwill")}}
					</li>
					<li>5、{{$t("airdrop.Inviteyour")}}
					</li>
					<li>6、{{$t("airdrop.AirdropCandy")}}
					</li>
          <li class="textIndex">{{$t("airdrop.OrdinaryCandy")}}
          </li>
          <li class="textIndex">{{$t("airdrop.Highgrade")}}
          </li> 
					<li>7、{{$t("airdrop.Candieswill")}}
					</li>
          <li>{{$t("airdrop.UniqueRight")}}
          </li>
				</ul>
			</div>
		</div>


	</div>
</template>

<script>
import header from "../../public/backHeader"
export default{
	data(){
		return{
			headerTitle:this.$t("airdrop.ActivityRules")
		}
	},
	components:{
		"my-header":header
	},
	mounted(){
		
	}
}
</script>

<style lang="scss" scoped>
#ActivityRules{
	color: #fff;
	background: #141738;	
	padding: .1rem 0;
} 
.ActivityRulesContent{
	width: 100%;
	box-sizing: border-box;
	padding: 0 .2rem;
	.title{
		line-height: .4rem;
	}
	.Introduction{
		li{
			line-height: .2rem;
			margin: 10px 0;
		}
	}
}
.textIndex{
  margin-left:2em !important;
}


</style>
