<script lang="ts">
  import { IonModal, IonHeader, IonContent, IonList } from '@ionic/vue'
  import {
    restaurantOutline,
    restaurantSharp,
    nutritionOutline,
    nutritionSharp,
    schoolOutline,
    schoolSharp,
    searchOutline,
    searchSharp,
  } from 'ionicons/icons'

  import { defineComponent } from 'vue'

  import FeatureItem from '@/components/FeatureItem.vue'

  export default defineComponent({
    setup() {
      return {
        restaurantOutline,
        restaurantSharp,
        nutritionOutline,
        nutritionSharp,
        schoolOutline,
        schoolSharp,
        searchOutline,
        searchSharp,
      }
    },
    methods: {
      close() {
        this.$emit('close')
      },
    },
    components: {
      IonModal,
      IonHeader,
      IonContent,
      IonList,

      FeatureItem,
    },
  })
</script>

<template>
  <ion-modal>
    <ion-header></ion-header>
    <ion-content>
      <h1>오늘뭐먹지 시작하기</h1>
      <ion-list lines="none">
        <FeatureItem
          :iosicon="restaurantOutline"
          :mdicon="restaurantSharp"
          title="급식 보기"
          description="선택한 날짜의 급식을 빠르고 쉽게 볼 수 있습니다."
        />
        <FeatureItem
          :iosicon="nutritionOutline"
          :mdicon="nutritionSharp"
          title="재료 정보 보기"
          description="급식에 들어가는 재료들의 사진과 효능을 보여주어 낯설어하지 않고 먹어볼 수 있습니다."
        />
        <FeatureItem
          :iosicon="searchOutline"
          :mdicon="searchSharp"
          title="재료 정보 검색하기"
          description="재료 정보를 검색하여 볼 수도 있습니다."
        />
        <FeatureItem
          :iosicon="schoolOutline"
          :mdicon="schoolSharp"
          title="전국 학교 모두 지원"
          description="전국의 모든 초등학교를 지원합니다. 정보는 자동으로 업데이트됩니다."
        />
      </ion-list>
      <div class="close-button">
        <ion-button expand="block" @click="close">계속</ion-button>
      </div>
    </ion-content>
  </ion-modal>
</template>

<style scoped>
  h1 {
    padding: 20px 16px 6px;
    transform-origin: left center;
    bottom: 0px;
    align-items: flex-end;
    min-width: 100%;
    font-size: 34px;
    font-weight: 700;
    text-align: center;
  }
  .ios h1 {
    margin-top: 40px;
  }
  .md h1 {
    margin-top: 60px;
  }
  ion-list {
    margin: 20px 40px 40px 37px;
    background: transparent;
    display: flex;
    flex-direction: column;
    gap: 24px;
  }
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
    color: var(--ion-color-medium-shade);
    word-break: keep-all;
    line-height: 1.3;
  }
  .close-button {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    padding: 20px 22px 60px;
    background: var(--ion-background-color);
  }
  ion-button.ios {
    --padding-top: 25px;
    --padding-bottom: 25px;
    --border-radius: 14px;
  }
</style>
