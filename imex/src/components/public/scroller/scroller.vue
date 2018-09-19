<template>
  <div
    class="scroller"
    ref="scroller"
    @scroll="outterscroll"
    @touchstart="tchstart"
    @touchmove="tchmove"
    @touchend="tchend"
  >
    <div class="top_title">
      <slot name="top">
        <span class="spinner">
        	{{$t("login.Refreshing")}}...
        </span>
      </slot>
    </div>
    <div class="content_box"
      :style="{transform: `translateY(${pulldownlen || pulluplen}px)`, 'background-color': contentBackgroundColor}"
    >
      <slot class="inner"></slot>
    </div>
    <div class="bottom_box"  v-show="pullState===2">
      {{$t("login.Hardloading")}}...
    </div>
  </div>
</template>

<script>
export default {
  name: "scroller",
  data() {
    return {
      topPercent: 0, // 页面卷动比例
      startPos: 0, // 触摸开始位置
      limitPulldown: 50, // 下拉阈值
      limitPullup: 50, // 上拉阈值
      pulldownlen: 0, // 下拉距离
      pulluplen: 0, // 上拉距离
      pullState: 0, // 拉动状态, 0: 无 , 1:下拉, 2:上拉
      hasMore: true, // 默认有更多
    };
  },
  props: {
    onInfinite: {
      type: Function,
      required: false,
      default: function(done){
        setTimeout(() => {
          done();
        }, 500);
      },
    }, // 上拉
    onRefresh: {
      type: Function,
      required: false,
      default: function(done){
        this.onInfinite(done);
      },
    }, // 下拉
    isFirstLoad: {
      // 是否第一次加载
      type: Boolean,
      default: false,
    },
    bottomPosition: {
      // 底部动画
      type: Number,
      default: 0,
    },
    contentBackgroundColor: {
      // 主体背景色
      type: String,
      default: '', // 默认是空, 但是css设置的透明色
    }
  },
  computed: {
    reachBottom() {
      // 触底
      return this.topPercent === 1;
    },
    reachTop() {
      // 触顶
      return this.topPercent === 0;
    },
    loading() {
      return this.pullState ? true : false; // 0则未加载, 非0则正在加载中
    }
  },
  methods: {
    // 滚动条滚动
    outterscroll() {
      const scroller = this.$refs.scroller; // 当前组件根元素
      let sTop = scroller.scrollTop; // 滚动距离
      let sHeight = scroller.scrollHeight; // 可滚动高度
      let offsetHeight = scroller.offsetHeight; // 总高度
      /* console.log({
        sTop,
        sHeight,
        offsetHeight
      }); */
      this.topPercent = sTop / (sHeight - offsetHeight); // 移动百分比;
    },
    tchstart(e) {
      // 在非 loading 状态下, 重置状态
      if (!this.loading) {
        this.pulldownlen = 0;
        this.pulluplen = 0;
        this.startPos = e.touches[0].clientY;
      } else {
        null;
      }
    },
    tchmove(e) {
      let len = e.touches[0].clientY - this.startPos;
      if (this.reachTop && len > 0) {
        // 下拉
        this.pulluplen = 0;
        this.pulldownlen = len / 7;
      } else if (this.reachBottom && len < 0) {
        // 上拉
        this.pulldownlen = 0;
        this.pulluplen = len / 7;
      }
    },
    tchend() {
      // 触顶, 且超过 限制
      if (this.reachTop && this.pulldownlen > this.limitPulldown) {
        this.pulldownlen = this.limitPulldown;
        this.pullState = 1;
      } else {
        this.pulldownlen = 0;
      }
      // 触底, 且超过 限制 , 且有可加载的数据
      if (this.reachBottom && this.pulluplen < -this.limitPullup && this.hasMore) {
        this.pulluplen = -this.limitPullup;
        this.pullState = 2;
      } else {
        this.pulluplen = 0;
      }
    },

    done(hasMore) {
      if(hasMore === false){
        this.hasMore = false;
      }else{
        this.hasMore = true;
      }
      //完成加载后, 重置各种状态
      this.pulldownlen = 0;
      this.pulluplen = 0;
      this.pullState = 0;
    },
    // 手动触发 上拉加载
    triggerInfinite() {
      this.onInfinite && this.onInfinite(this.done);
    }
  },
  watch: {
    loading() {
      switch (this.pullState) {
        case 0: // 无动作
          break;
        case 1: // 下拉
          this.onRefresh && this.onRefresh(this.done);
          break;
        case 2: // 上拉
          this.onInfinite && this.onInfinite(this.done);
          break;
        default:
          break;
      }
    }
  },
  created() {
    this.isFirstLoad && this.onInfinite(this.done); // 第一次进入是否自动调用上拉加载
  }
};
</script>

<style lang="less" scoped>
.scroller {
  width: 100%;
  height: 100%;
  max-width: 100vw;
  max-height: 100vh;
  overflow: hidden;
  overflow-y: scroll;
  position: relative;
  .content_box {
    transition: all 0.2s ease-out;
    background-color: transparent;
    padding-bottom: 20px; /* 减掉浏览器地址栏高度, 不得已而设置, 后续看看怎么隐藏浏览器地址栏 */
  }
  .top_title {
    position: absolute;
    width: 100%;
    top: 0;
  }
  .bottom_box {
    position: fixed;
    bottom: .7rem;
    left: 0;
    width: 100vw;
    z-index: 6666;
    color: #fff;
    text-align: center;
  }
  span.spinner {
    display: block;
    width: 100%;
    height: .28rem;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
    img{
    	width: .2rem;
    	height: .2rem;
    	margin-right: .1rem;
    }
  }
}

// animation
@keyframes round {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>

