<template>
  <ul class="items">
    <li v-for="item in items"
        :style="item.style"
        :class="item.className"
        :id="`item_${item.id}`"
        :key="item.id">
      <span :style="item.triangleHeight ? `position:relative;top:${item.triangleHeight / 2}px`: null">{{
          item.label
        }}</span>
    </li>
  </ul>
</template>

<script>
import {mapState} from "vuex";

export default {
  name: "Items",
  computed: {
    ...mapState(['items']),
  }
}
</script>
