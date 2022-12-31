<script lang="ts">
  interface filterMenu {
    name: string
    images: Array<string>
    description: string
  }

  import {
    IonModal,
    IonHeader,
    IonTitle,
    IonButtons,
    IonButton,
    IonToolbar,
    IonSearchbar,
    IonContent,
    IonList,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
  } from '@ionic/vue'
  import { searchOutline, searchSharp } from 'ionicons/icons'
  import { defineComponent } from 'vue'

  import SimpleInfo from '../components/SimpleInfo.vue'

  import filterData from '@/filterData'

  export default defineComponent({
    props: {
      apikey: String,
    },
    components: {
      IonModal,
      IonHeader,
      IonTitle,
      IonButtons,
      IonButton,
      IonToolbar,
      IonSearchbar,
      IonContent,
      IonList,
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
      openMenuInfo(index: number): void {
        this.$emit('openMenuInfo', index)
      },
    },
  })
</script>

<template>
  <ion-modal>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="secondary">
          <ion-button @click="$emit('close')">취소</ion-button>
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
        <ion-card
          v-for="menu in searchedMenus"
          :key="menu.name"
          @click="openMenuInfo(filterData.indexOf(menu))"
        >
          <img :src="menu.images[0]" :alt="`${menu.name}의 모습`" />
          <ion-card-header>
            <ion-card-title>{{ menu.name }}</ion-card-title>
          </ion-card-header>
          <ion-card-content>{{ menu.description }}</ion-card-content>
        </ion-card>
      </ion-list>
      <SimpleInfo
        v-else
        class="SimpleInfo"
        :iosicon="(searchOutline as any)"
        :mdicon="(searchSharp as any)"
        title="재료를 찾을 수 없어요."
        description="맞춤법을 확인해 주세요."
        :center="true"
      />
    </ion-content>
  </ion-modal>
</template>

<style scoped>
  ion-toolbar:has(ion-searchbar) {
    position: relative;
    bottom: 6px;
  }
  ion-searchbar.ios {
    padding: 0 4px 3px 4px !important;
  }
  ion-list {
    margin-bottom: 130px;
  }
  img {
    width: 100%;
    aspect-ratio: 16 / 9;
    object-fit: cover;
  }
</style>
