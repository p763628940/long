import axios from "axios";
import {httpUrl} from "../http_url/http_url"
import {mapGetters, mapActions, mapState, mapMutations} from 'vuex'
import footer from "../public/Homefooter"
import userExtra from "../../store/modules/userExtra";

export default {
  data() {
    return {
    }
  },
  components: {
    "my-footer": footer
  },
  computed: {
    ...mapState('userExtra',['userExtraList']),
    ...mapState({
      userExtraList1: state => state.userExtra.userExtraList,
    })
  },
  async mounted() {
    if (this.token == null && this.token == undefined) {
      this.$router.push({
        name: "login"
      })
    } else {
      //this.setToken(this.token);
      await this.getUserExtra();
    }

  },
  methods: {
    ...mapActions('userExtra', ['getUserExtra']),
    userDetail(id) {//跳转超级节点详情页面
      const {
        href
      } = this.$router.resolve({
        name: "supperNodeDetails",
        params: {
          id: id
        }
      });
      window.open(href, '_blank');
    }
  }
}

