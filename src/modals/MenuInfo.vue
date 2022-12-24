<script lang="ts">
  import {
    IonModal,
    IonContent,
  } from '@ionic/vue'
  import { defineComponent } from 'vue'

  import importedFilterData from '@/filterData'

  export default defineComponent({
    props: {
      index: Number,
    },
    data() {
      return {
        menu: importedFilterData[this.index as number],
      }
    },
    watch: {
      index() {
        this.menu = importedFilterData[this.index as number]
      },
    },
    components: {
      IonModal,
      IonContent,
    },
  })
</script>

<template>
  <ion-modal>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="secondary">
          <ion-button @click="$emit('close')">닫기</ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <div class="carousel">
        <div v-for="image in menu.images" :key="image">
          <img :src="image" />
        </div>
      </div>
      <div class="info">
        <h1>{{ menu.name }}</h1>
        <p>{{ menu.description }}</p>
      </div>
    </ion-content>
  </ion-modal>
</template>

<style scoped>
  .carousel {
    display: flex;
    flex-direction: row;
    scroll-snap-type: x mandatory;
    overflow-x: scroll;
    overflow-y: hidden;
    background-color: var(--ion-color-step-300, #edeef0);
    scroll-behavior: smooth;
    align-items: center;
  }
  .carousel div {
    scroll-snap-align: start;
    flex-shrink: 0;
    width: 100%;
  }
  .ios .carousel div {
    height: calc(78vh - 100px);
  }
  .md .carousel div {
    height: calc(90vh - 100px);
  }
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    border-radius: 10px;
  }
  .info {
    padding: 2px 20px 20px 20px;
  }
  h1 {
    font-size: 28px;
    font-weight: 700;
    line-height: 1.2;
  }
  p {
    margin: 0;
  }
</style>
