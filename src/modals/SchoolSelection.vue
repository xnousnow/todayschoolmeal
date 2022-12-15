<script lang="ts">
  import {
    IonModal,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonList,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardSubtitle,
    IonButton,
  } from '@ionic/vue'
  import {} from 'ionicons/icons'
  import { defineComponent } from 'vue'

  export default defineComponent({
    props: ['trigger'],
    components: {
      IonModal,
      IonHeader,
      IonTitle,
      IonToolbar,
      IonContent,
      IonList,
      IonCard,
      IonCardHeader,
      IonCardTitle,
      IonCardSubtitle,
      IonButton,
    },
  })
</script>

<template>
  <ion-modal ref="modal" :trigger="trigger">
    <ion-header>
      <ion-toolbar>
        <ion-title>학교 선택</ion-title>
      </ion-toolbar>
      <ion-toolbar>
        <ion-searchbar
          show-clear-button="focus"
          placeholder="초등학교 이름을 입력하세요"
        ></ion-searchbar>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <ion-list>
        <ion-card>
          <ion-card-header>
            <ion-card-title>국원초등학교</ion-card-title>
            <ion-card-subtitle>충청북도 충주시 국원초1길 47</ion-card-subtitle>
          </ion-card-header>
          <ion-button fill="clear">이 학교로 선택</ion-button>
        </ion-card>
        <ion-card>
          <ion-card-header>
            <ion-card-title>성남초등학교</ion-card-title>
            <ion-card-subtitle>충청북도 충주시 염밭로 101</ion-card-subtitle>
          </ion-card-header>
          <ion-button fill="clear">이 학교로 선택</ion-button>
        </ion-card>
      </ion-list>
    </ion-content>
  </ion-modal>
</template>

<style scoped>
  span {
    margin-top: 50%;
    margin-left: 50%;
  }
  ion-card-header.ios {
    display: flex;
    flex-flow: column-reverse;
  }
  ion-toolbar:has(ion-searchbar) {
    position: relative;
    bottom: 6px;
  }
  ion-searchbar.ios {
    padding: 0 4px 3px 4px !important;
  }
</style>
