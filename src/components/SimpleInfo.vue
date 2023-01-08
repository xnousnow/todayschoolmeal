<script lang="ts">
  import { IonIcon, IonButton } from '@ionic/vue'
  import { defineComponent } from 'vue'

  export default defineComponent({
    props: {
      iosicon: String,
      mdicon: String,
      title: String,
      description: [String, Array<string>],
      button: String,
    },
    computed: {
      isDescriptionString(): boolean {
        return typeof this.description === 'string'
      },
    },
    components: {
      IonIcon,
      IonButton,
    },
  })
</script>

<template>
  <div class="container ion-padding">
    <ion-icon :ios="(iosicon as any)" :md="(mdicon as any)"></ion-icon>
    <h1>{{ title }}</h1>
    <div v-if="isDescriptionString">
      <p>{{ description }}</p>
    </div>
    <div v-else>
      <p v-for="line in description" :key="line">{{ line }}</p>
    </div>
    <ion-button v-if="button" @click="$emit('buttonClick')">
      {{ button }}
    </ion-button>
  </div>
</template>

<style scoped>
  .container {
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
