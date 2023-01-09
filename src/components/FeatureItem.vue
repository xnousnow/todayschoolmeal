<script lang="ts">
  import { IonIcon } from '@ionic/vue'
  import { defineComponent } from 'vue'

  export default defineComponent({
    props: {
      iosicon: String,
      mdicon: String,
      title: String,
      description: String,
    },
    components: {
      IonIcon,
    },
  })
</script>

<template>
  <div class="item">
    <div class="icon">
      <ion-icon
        :ios="(iosicon as any)"
        :md="(mdicon as any)"
        color="primary"
      ></ion-icon>
    </div>
    <div class="description">
      <h2>{{ title }}</h2>
      <p>{{ description }}</p>
    </div>
  </div>
</template>

<style scoped>
  .item {
    display: flex;
    gap: 16px;
    align-items: center;
  }
  .icon {
    font-size: 35px;
  }
  ion-icon {
    font-size: 35px;
  }
  .description {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    gap: 1px;
  }
  h2 {
    font-size: 15px;
    font-weight: 600;
    margin: 0;
    padding: 0;
  }
  p {
    font-size: 15px;
    margin: 0;
    padding: 0;
    color: var(--ion-color-step-600, #666666);
    line-height: 1.3;
  }
</style>
