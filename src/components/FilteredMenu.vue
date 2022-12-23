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
  }
  .ios span::after {
    content: '';
    position: absolute;
    bottom: -1px;
    left: 0;
    width: 100%;
    height: 5px;
    background-color: var(--highlighter-color);
    border-radius: 10px;
  }
  .md span {
    background: linear-gradient(
      to bottom,
      transparent 80%,
      var(--highlighter-color) 80%
    );
  }
</style>
