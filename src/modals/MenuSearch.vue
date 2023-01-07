<script lang="ts">
  interface filterMenu {
    name: string
    images: Array<string>
    description: string
  }

  import {
    IonHeader,
    IonTitle,
    IonButtons,
    IonButton,
    IonToolbar,
    IonSearchbar,
    IonContent,
    IonList,
    IonNavLink,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,

    modalController,
  } from '@ionic/vue'
  import { searchOutline, searchSharp } from 'ionicons/icons'
  import { defineComponent } from 'vue'

  import SimpleInfo from '../components/SimpleInfo.vue'
  import filterData from '@/filterData'
  import MenuInfo from './MenuInfo.vue'

  export default defineComponent({
    props: {
      apikey: String,
    },
    components: {
      IonHeader,
      IonTitle,
      IonButtons,
      IonButton,
      IonToolbar,
      IonSearchbar,
      IonContent,
      IonList,
      IonNavLink,
      IonCard,
      IonCardHeader,
      IonCardTitle,
      IonCardContent,

      SimpleInfo,
    },
    setup() {
      return {
        searchOutline,
        searchSharp,
      }
    },
    data() {
      return {
        searchedMenus: filterData as Array<filterMenu>,
        filterData: filterData,
        menuInfo: MenuInfo,
      }
    },
    methods: {
      searchMenu(event: Event): void {
        let query = (event.target as HTMLInputElement).value
        if (!query) {
          this.searchedMenus = filterData
          return
        }
        this.searchedMenus = filterData.filter((menu) => {
          return menu.name.includes(query)
        })
      },
      close(): void {
        modalController.dismiss()
      },
    },
  })
</script>

<template>
  <ion-header>
    <ion-toolbar>
      <ion-buttons slot="secondary">
        <ion-button @click="close">취소</ion-button>
      </ion-buttons>
      <ion-title>재료 검색</ion-title>
    </ion-toolbar>
    <ion-toolbar>
      <ion-searchbar
        show-clear-button="focus"
        placeholder="재료 이름을 입력해 주세요."
        :debounce="200"
        inputmode="search"
        @ionChange="searchMenu($event)"
      ></ion-searchbar>
    </ion-toolbar>
  </ion-header>

  <ion-content>
    <ion-list v-if="searchedMenus.length > 0">
      <ion-nav-link
        v-for="menu in searchedMenus"
        :key="menu.name"
        router-direction="forward"
        :component="menuInfo"
        :component-props="{ index: filterData.indexOf(menu), backButton: true }"
      >
        <ion-card>
          <img :src="menu.images[0]" :alt="`${menu.name}의 모습`" />
          <ion-card-header>
            <ion-card-title>{{ menu.name }}</ion-card-title>
          </ion-card-header>
          <ion-card-content>{{ menu.description }}</ion-card-content>
        </ion-card>
      </ion-nav-link>
    </ion-list>
    <SimpleInfo
      v-else
      class="SimpleInfo"
      :iosicon="(searchOutline as any)"
      :mdicon="(searchSharp as any)"
      title="재료를 찾을 수 없어요."
      description="맞춤법을 확인해 주세요."
    />
  </ion-content>
</template>

<style scoped>
  ion-content::part(background) {
    background: var(--ion-item-background, var(--ion-background-color, #fff));
  }
  ion-header.ios {
    height: 103px;
  }
  ion-header.md {
    height: 106px;
  }
  ion-toolbar:has(ion-searchbar) {
    position: relative;
    bottom: 6px;
  }
  ion-searchbar.ios {
    padding: 0 4px 3px 4px !important;
  }
  ion-list {
    margin-bottom: 130px;
    display: grid;
    grid-template-columns: 1fr;
  }
  @media screen and (min-width: 500px) {
    ion-list {
      grid-template-columns: 1fr 1fr;
    }
  }
  img {
    width: 100%;
    aspect-ratio: 16 / 9;
    object-fit: cover;
  }
  .SimpleInfo {
    height: calc(100% - 55px);
  }
</style>
