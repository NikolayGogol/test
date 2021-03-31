<template>
  <div id="app">
    <button @click="autoGenerate(5)">Auto play</button>
    <Items @click.native="addItem"
           id="mainContainer"
           v-if="lineRotate === 'transform:rotate(0deg)'"/>
    <div class="deg">{{ onlyNumb(lineRotate) }} <sup>o</sup></div>
    <div class="wrapper"
         @click="defState"
         :style="lineRotate">
      <Items :style="`top:${-heightContainer}px`"
             v-if="lineRotate !== 'transform:rotate(0deg)'"/>
      <div :data-left="leftWeight.toFixed(2)"
           :data-right="rightWeight.toFixed(2)"
           ref="line" class="line"></div>
    </div>
    <div class="center-triangle"></div>
  </div>
</template>

<script>
import Items from "@/components/Items";
import Helpers from "@/helper/helpers";
import actions from "@/mixins/actions";

export default {
  name: 'App',
  mixins: [actions()],
  components: {
    Items
  },
  data() {
    return {
      lineTopPosition: 0,
      itemsArr: [],
      lineRotate: 'transform:rotate(0deg)',
      leftWeight: 0,
      rightWeight: 0,
      heightContainer: 0
    }
  },
  mounted() {
    this.lineTopPosition = this.$refs.line.getBoundingClientRect().top.toFixed(0) * 1
    this.heightContainer = document.getElementById('mainContainer').offsetHeight
  },
  methods: {
    defState() {
      let a = confirm('Try again???')
      if (a) {
        this.itemsArr = []
        this.$store.dispatch('clearState', [])
        this.lineRotate = 'transform:rotate(0deg)'
        this.leftWeight = 0
        this.rightWeight = 0
      }
    },
    onlyNumb(numb) {
      return Helpers.onlyNumb(numb)
    },
    autoGenerate(count) {
      this.defState()
      for (let i = 0; i < count; i++) {
        const ev = {
          clientX: Helpers.randomIntFromInterval(0, 800),
          offsetX: i % 2 ? Helpers.randomIntFromInterval(500, 800) : Helpers.randomIntFromInterval(0, 350),
          offsetY: Helpers.randomIntFromInterval(10, 100),
        }
        this.addItem(ev, i % 2 ? 'right' : 'left')
      }
    }
  }
}
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
}

#app {
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
  height: 90vh;
  position: relative;

  .center-triangle {
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 0 50px 200px 50px;
    border-color: transparent transparent #007bff transparent;
  }

  .wrapper {
    max-width: 1000px;
    width: 100%;
    transition: all 1s linear;

    .line {
      width: 100%;
      height: 4px;
      background-color: black;
      position: relative;

      &:before {
        content: attr(data-left);
        position: absolute;
        left: 0;
        top: -20px;
        color: red;
      }

      &:after {
        content: attr(data-right);
        position: absolute;
        right: 0;
        top: -20px;
        color: red;
      }
    }
  }


  .items {
    position: absolute;
    top: 0;
    left: 50%;
    height: calc(90vh - 204px);
    max-width: 1000px;
    transform: translateX(-50%);
    width: 100%;

    li {
      list-style: none;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 800;

      &.circle {
        border-radius: 50%;
        width: 100px;
        height: 100px;
      }

      &.square {
        width: 150px;
        height: 150px;
      }

      &.triangle {
        &:after {
          content: attr(data-triangle);
        }
      }
    }
  }
}

.deg {
  font-weight: bolder;
  color: green;
  position: relative;
  z-index: 2;
  font-size: 20px;
}

button {
  position: absolute;
  top: 0;
  left: 0;
}
</style>
