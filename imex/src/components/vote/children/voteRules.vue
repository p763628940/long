<template>
	<div id="ActivityRules">
		<my-header :text="headerTitle"></my-header>
		<div class="ActivityRulesContent">
			<div class="title">
				{{$t("vote.TaocoinVotingRules")}}
			</div>
			<div class="Introduction">
				<ul>
					<li>1、{{$t("vote.TVRules1")}}</li>
					<li>2、{{$t("vote.TVRules2")}}</li>
					<li>3、{{$t("vote.TVRules3")}}</li>
					<li>4、{{$t("vote.TVRules4")}}
					</li>
					<li>5、{{$t("vote.TVRules5")}}
					</li>
					<li>{{$t("vote.DetailedFollows")}}
					</li>
          <li>{{$t("vote.Detailed1")}}
          </li>
          <li>{{$t("vote.Detailed2")}}
          </li>
					<li>{{$t("vote.Detailed3")}}
					</li>
          <li>{{$t("vote.Detailed4")}}
          </li>
          <li>{{$t("vote.Detailed5")}}
          </li>
          <li>{{$t("vote.Detailed6")}}
          </li>
          <li>{{$t("vote.Detaile7")}}
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
