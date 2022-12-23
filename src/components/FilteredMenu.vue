<script lang="ts">
  export default {
    props: {
      highlighterColor: String,
      word: String,
    },
  }
</script>

<template>
  <span :style="{ '--highlighter-color': `var(${highlighterColor})` }">
    {{ word }}
  </span>
</template>

<style scoped>
  span {
    position: relative;
    z-index: 1;
  }
  span::after {
    content: '';
    position: absolute;
    bottom: -1px;
    left: 0;
    width: 100%;
    height: 10px;
    z-index: -1;
    background-color: var(--highlighter-color);
  }
  .ios span::after {
    border-radius: 3px;
  }
</style>
