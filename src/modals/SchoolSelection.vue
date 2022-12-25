<script lang="ts">
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
    IonCardSubtitle,
    toastController,
  } from '@ionic/vue'
  import { searchOutline, searchSharp } from 'ionicons/icons'
  import { defineComponent } from 'vue'

  import SimpleInfo from '../components/SimpleInfo.vue'

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
      IonCardSubtitle,

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
        error: false,
        errorCode: '000',
        searchedSchools: [],
      }
    },
    methods: {
      searchSchool(event: Event): void {
        let query = (event.target as any).value
        fetch(
          `https://open.neis.go.kr/hub/schoolInfo?KEY=${this.apikey}&Type=json&SCHUL_NM=${query}&SCHUL_KND_SC_NM=초등학교`
        )
          .then((response) => response.json())
          .then((data) => {
            if (data.RESULT) {
              this.error = true
              this.errorCode = data.RESULT.CODE.replace(/\D/g, '')
            } else {
              this.error = false
              this.searchedSchools = data.schoolInfo[1].row
            }
          })
          .catch(() => {
            this.errorCode = 'Internal'
          })
      },
      async selectSchool(
        cityCode: string,
        schoolCode: string,
        schoolName: string
      ): Promise<void> {
        this.$emit('changeSchool', cityCode, schoolCode)
        this.$emit('close')
        let toast = await toastController.create({
          message: `학교가 ${schoolName}로 선택되었어요.`,
          duration: 1500,
          position: 'bottom',
        })
        await toast.present()
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
        <ion-title>학교 선택</ion-title>
      </ion-toolbar>
      <ion-toolbar>
        <ion-searchbar
          show-clear-button="focus"
          placeholder="초등학교 이름을 입력하세요"
          :debounce="1000"
          @ionChange="searchSchool($event)"
        ></ion-searchbar>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <ion-list v-if="!error && !(searchedSchools.length == 0)">
        <ion-card
          v-for="school in searchedSchools"
          :key="(school as any).SD_SCHUL_CODE"
        >
          <ion-card-header>
            <ion-card-title>{{ (school as any).SCHUL_NM }}</ion-card-title>
            <ion-card-subtitle>{{
              (school as any).ORG_RDNMA
            }}</ion-card-subtitle>
          </ion-card-header>
          <ion-button
            fill="clear"
            @click="
              selectSchool(
                (school as any).ATPT_OFCDC_SC_CODE,
                (school as any).SD_SCHUL_CODE,
                (school as any).SCHUL_NM
              )
            "
            >이 학교로 선택</ion-button
          >
        </ion-card>
        <p>
          찾는 학교가 없나요?<br />지역명이 붙은 공식 이름으로 검색해 보세요.
        </p>
      </ion-list>
      <SimpleInfo
        v-else
        class="SimpleInfo"
        :iosicon="(searchOutline as any)"
        :mdicon="(searchSharp as any)"
        :title="
          errorCode == '200'
            ? '학교를 찾을 수 없어요.'
            : errorCode == '000' || searchedSchools.length == 0
            ? '학교 이름을 검색해 주세요.'
            : '알 수 없는 오류가 일어났어요.'
        "
        :description="
          errorCode == '200'
            ? '맞춤법을 확인해 주세요.'
            : errorCode == '000' || searchedSchools.length == 0
            ? '학교를 검색하면 결과가 나와요.'
            : '인터넷이 연결되어 있는지 확인해 주세요.'
        "
      />
    </ion-content>
  </ion-modal>
</template>

<style scoped>
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
  ion-list {
    margin-bottom: 150px;
  }
  p {
    text-align: center;
    margin: 0 10px;
    font-size: 11pt;
    color: var(--ion-color-medium-shade);
  }
  .md p {
    margin-top: 30px;
  }
  .ios .SimpleInfo {
    height: calc(100% - 108px);
  }
  .md .SimpleInfo {
    height: calc(100% - 112px);
  }
</style>
