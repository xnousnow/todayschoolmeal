<script lang="ts">
  import {
    IonHeader,
    IonToolbar,
    IonTitle,
    IonButtons,
    IonBackButton,
    IonButton,
    IonContent,

    modalController,
  } from '@ionic/vue'
  import { defineComponent } from 'vue'

  import filterData from '@/filterData'

  export default defineComponent({
    props: {
      index: Number,
      backButton: Boolean,
    },
    data() {
      return {
        menu: filterData[this.index as number],
      }
    },
    methods: {
      close(): void {
        modalController.dismiss()
      }
    },
    watch: {
      index() {
        this.menu = filterData[this.index as number]
      },
    },
    components: {
      IonHeader,
      IonToolbar,
      IonTitle,
      IonButtons,
      IonBackButton,
      IonButton,
      IonContent,
    },
  })
</script>

<template>
  <ion-header>
    <ion-toolbar>
      <ion-buttons v-if="backButton" slot="start">
        <ion-back-button defaultHref="/" text="검색"></ion-back-button>
      </ion-buttons>
      <ion-title>재료 정보</ion-title>
      <ion-buttons :slot="backButton ? 'primary' : 'secondary'">
        <ion-button @click="close">닫기</ion-button>
      </ion-buttons>
    </ion-toolbar>
  </ion-header>

  <ion-content :scroll-y="false">
    <div class="wrapper">
      <div class="carousel">
        <div v-for="image in menu.images" :key="image">
          <img :src="image" />
        </div>
      </div>
      <div class="info">
        <h1>{{ menu.name }}</h1>
        <p>{{ menu.description }}</p>
      </div>
    </div>
  </ion-content>
</template>

<style scoped>
  .wrapper {
    display: flex;
    flex-direction: column;
    height: calc(100% - 50px);
  }
  .carousel {
    flex: 1;
    scroll-snap-type: x mandatory;
    overflow-x: scroll;
    overflow-y: hidden;
    display: flex;
    align-items: center;
  }
  .carousel div {
    scroll-snap-align: center;
    flex: 0 0 100%;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: var(--ion-color-step-100, #edeef0);
  }
  .carousel div img {
    max-width: 100%;
    max-height: 100%;
  }
  .info {
    padding: 0 20px;
    height: 140px;
  }
  .ios .info {
    border-top: 0.547px solid
      var(
        --ion-toolbar-border-color,
        var(--ion-border-color, var(--ion-color-step-150, rgba(0, 0, 0, 0.2)))
      );
  }
  .md .info {
    box-shadow: 0 -2px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
    position: relative;
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
