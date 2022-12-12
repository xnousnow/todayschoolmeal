<script lang="ts">
import { IonContent, IonPage } from '@ionic/vue'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'HomePage',
  components: {
    IonContent,
    IonPage,
  },
})
</script>

<template>
  <ion-page>
    <ion-content :fullscreen="true"> Hello, world! </ion-content>
  </ion-page>
</template>

<style scoped></style>
