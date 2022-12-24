<script lang="ts">
  import {
    IonModal,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
  } from '@ionic/vue'
  import { defineComponent } from 'vue'

  export default defineComponent({
    props: {
      index: Number,
    },
    components: {
      IonModal,
      IonHeader,
      IonToolbar,
      IonTitle,
      IonContent,
    },
  })
</script>

<template>
  <ion-modal>
    <ion-header>
      <ion-toolbar>
        <ion-title>MenuInfo</ion-title>
        <ion-buttons slot="secondary">
          <ion-button @click="$emit('close')">닫기</ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      {{ index }}
    </ion-content>
  </ion-modal>
</template>

<style scoped></style>
