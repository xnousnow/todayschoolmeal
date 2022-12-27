<script lang="ts">
  import {
    IonModal,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonButtons,
    IonButton,
    IonContent,
  } from '@ionic/vue'
  import { defineComponent } from 'vue'

  import filterData from '@/filterData'

  export default defineComponent({
    props: {
      index: Number,
    },
    data() {
      return {
        menu: filterData[this.index as number],
      }
    },
    watch: {
      index() {
        this.menu = filterData[this.index as number]
      },
    },
    components: {
      IonModal,
      IonHeader,
      IonToolbar,
      IonTitle,
      IonButtons,
      IonButton,
      IonContent,
    },
  })
</script>

<template>
  <ion-modal>
    <ion-header>
      <ion-toolbar>
        <ion-title>재료 정보</ion-title>
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
    scroll-behavior: smooth;
    background-color: var(--ion-color-step-100, #edeef0);
    align-items: center;
  }
  .carousel div {
    scroll-snap-align: start;
    flex-shrink: 0;
    width: 100%;
  }
  .ios .carousel div {
    height: calc(100vh - 230px);
  }
  .md .carousel div {
    height: calc(100vh - 190px);
  }
  @media (min-width: 768px) {
    .carousel div {
      height: calc(100vh - 290px) !important;
    }
  }
  @media ((min-width: 768px) and (min-height: 1120px)) {
    .ios .carousel div {
      height: 820px !important;
    }
  }
  @media ((min-width: 768px) and (max-height: 600px)) {
    .md .carousel div {
      height: calc(100vh - 180px) !important;
    }
  }
  @media ((min-width: 768px) and (min-height: 600px) and (max-height: 768px)) {
    .md .carousel div {
      height: 320px !important;
    }
  }
  @media ((min-width: 768px) and (min-height: 768px)) {
    .md .carousel div {
      height: 420px !important;
    }
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
  .ios .info {
    border-top: 1px solid
      var(
        --ion-toolbar-border-color,
        var(--ion-border-color, var(--ion-color-step-150, rgba(0, 0, 0, 0.2)))
      );
  }
  .md .info {
    box-shadow: 0 -2px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
    position: relative;
  }
  .md .info::after {
    content: '';
    position: absolute;
    bottom: -3px;
    left: 0;
    width: 100%;
    height: 4px;
    background: var(--ion-background-color, #fff);
  }
  h1 {
    line-height: 1.2;
  }
  .ios h1 {
    font-size: 28px;
    font-weight: 700;
  }
  .md h1 {
    font-size: 28px;
    font-weight: 500;
  }
  p {
    margin: 0;
  }
</style>
