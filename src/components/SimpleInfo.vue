<script lang="ts">
  import { IonIcon, IonButton } from '@ionic/vue'
  import { defineComponent } from 'vue'

  export default defineComponent({
    props: {
      iosicon: String,
      mdicon: String,
      title: String,
      description: String,
      button: String,
    },
    components: {
      IonIcon,
      IonButton,
    },
  })
</script>

<template>
  <div>
    <ion-icon :ios="(iosicon as any)" :md="(mdicon as any)"></ion-icon>
    <h1>{{ title }}</h1>
    <p>{{ description }}</p>
    <ion-button v-if="button" @click="$emit('buttonClick')">
      {{ button }}
    </ion-button>
  </div>
</template>

<style scoped>
  div {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 4px;
  }
  ion-icon {
    color: var(--ion-color-step-600, #666666);
    font-size: 3.8rem;
    margin-bottom: 10px;
  }
  h1 {
    font-weight: bold;
    margin: 0;
    font-size: 16pt;
  }
  p {
    margin: 0;
    font-size: 11pt;
    color: var(--ion-color-step-600, #666666);
    text-align: center;
  }
</style>
