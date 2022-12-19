<script lang="ts">
  import {
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,
    IonButtons,
    IonButton,
    IonIcon,
    IonDatetime,
    IonModal,
    IonLabel,
  } from '@ionic/vue'
  import {
    schoolOutline,
    schoolSharp,
    searchOutline,
    searchSharp,
    chevronBackOutline,
    chevronBackSharp,
    chevronForwardOutline,
    chevronForwardSharp,
  } from 'ionicons/icons'
  import { defineComponent } from 'vue'

  import MealList from '@/components/MealList.vue'
  import SchoolSelection from '@/modals/SchoolSelection.vue'
  import SimpleInfo from '@/components/SimpleInfo.vue'

  export default defineComponent({
    name: 'HomePage',
    components: {
      IonContent,
      IonHeader,
      IonPage,
      IonTitle,
      IonToolbar,
      IonButtons,
      IonButton,
      IonIcon,
      IonDatetime,
      IonModal,
      IonLabel,

      MealList,
      SchoolSelection,
      SimpleInfo,
    },
    setup() {
      const isWeekday = (dateString: string) => {
        const date = new Date(dateString)
        const utcDay = date.getUTCDay()
        return utcDay !== 0 && utcDay !== 6
      }
      return {
        schoolOutline,
        schoolSharp,
        searchOutline,
        searchSharp,
        isWeekday,
        chevronBackOutline,
        chevronBackSharp,
        chevronForwardOutline,
        chevronForwardSharp,
      }
    },
    data() {
      return {
        date: new Date().toISOString(),
        cityCode: '',
        schoolCode: '',

        apikey: '36c8f19f762644108af384935752556e',
        schoolSelectionPresentingElement: null,
      }
    },
    methods: {
      changeDate(days: number): void {
        let date = new Date(this.date)
        date.setDate(date.getDate() + days)
        if (date.getUTCDay() == 0) date.setDate(date.getDate() - 2)
        if (date.getUTCDay() == 6) date.setDate(date.getDate() + 2)
        this.date = date.toISOString()
      },
      openDatepickerModal(): void {
        (this.$refs.datepickerModal as any).$el.present()
      },
      dismissDatepickerModal(e: Event): void {
        if (e.target != (this.$refs.datepicker as any).$el) {
          (this.$refs.datepickerModal as any).$el.dismiss()
        }
      },
      openSchoolSelection(): void {
        (this.$refs.schoolSelection as any).$el.present()
      },
      dismissSchoolSelection(): void {
        (this.$refs.schoolSelection as any).$el.dismiss()
      },
      changeSchool(cityCode: string, schoolCode: string): void {
        this.cityCode = cityCode
        this.schoolCode = schoolCode
        localStorage.setItem('cityCode', cityCode)
        localStorage.setItem('schoolCode', schoolCode)
      },
    },
    computed: {
      formattedDate(): string {
        const date = new Date(this.date)
        const month = date.getMonth() + 1
        const day = date.getDate()
        const weekday = ['일', '월', '화', '수', '목', '금', '토'][
          date.getDay()
        ]
        return `${month}월 ${day}일 (${weekday})`
      },
    },
    mounted() {
      let date = new Date()
      if (date.getUTCDay() == 0) date.setDate(date.getDate() + 1)
      if (date.getUTCDay() == 6) date.setDate(date.getDate() - 1)
      this.date = date.toISOString()
      this.schoolSelectionPresentingElement = (this.$refs.page as any).$el

      let storedCityCode: string = localStorage.getItem('cityCode') as string
      let storedSchoolCode: string = localStorage.getItem(
        'schoolCode'
      ) as string
      if (storedCityCode && storedSchoolCode) {
        this.cityCode = storedCityCode
        this.schoolCode = storedSchoolCode
      }
    },
  })
</script>

<template>
  <ion-page ref="page">
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-title>오늘뭐먹지</ion-title>
        <ion-buttons slot="secondary" :collapse="true">
          <ion-button @click="openSchoolSelection()">
            <ion-icon :ios="schoolOutline" :md="schoolSharp"></ion-icon>
          </ion-button>
        </ion-buttons>
        <ion-buttons slot="primary" :collapse="true">
          <ion-button>
            <ion-icon :ios="searchOutline" :md="searchSharp"></ion-icon>
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">오늘뭐먹지</ion-title>
          <ion-buttons slot="end">
            <ion-button @click="openSchoolSelection()">
              <ion-icon :ios="schoolOutline" :md="schoolSharp"></ion-icon>
            </ion-button>
            <ion-button>
              <ion-icon :ios="searchOutline" :md="searchSharp"></ion-icon>
            </ion-button>
          </ion-buttons>
        </ion-toolbar>
      </ion-header>
      <MealList
        v-if="cityCode && schoolCode"
        class="center"
        :apikey="apikey"
        :cityCode="cityCode"
        :schoolCode="schoolCode"
        :date="date.split('T')[0].replaceAll('-', '')"
      />
      <SimpleInfo
        v-else
        class="center"
        :iosicon="schoolOutline"
        :mdicon="schoolSharp"
        title="학교가 선택되지 않았어요."
        description="오른쪽 위 학교 선택 버튼을 눌러 학교를 선택해 주세요."
      />
      <div class="datepicker">
        <ion-button fill="clear" color="dark" @click="changeDate(-1)">
          <ion-icon
            :ios="chevronBackOutline"
            :md="chevronBackSharp"
            slot="icon-only"
          ></ion-icon>
        </ion-button>
        <button @click="openDatepickerModal()">
          <ion-label>{{ formattedDate }}</ion-label>
        </button>
        <ion-button fill="clear" color="dark" @click="changeDate(1)">
          <ion-icon
            :ios="chevronForwardOutline"
            :md="chevronForwardSharp"
            slot="icon-only"
          ></ion-icon>
        </ion-button>
      </div>
      <ion-modal :keep-contents-mounted="true" ref="datepickerModal" @click="dismissDatepickerModal">
        <ion-datetime
          id="datetime"
          :max="new Date(`${new Date().getFullYear() + 1}-12-31`).toISOString()"
          locale="ko-KR"
          :is-date-enabled="isWeekday"
          presentation="date"
          v-model="date"
          ref="datepicker"
        ></ion-datetime>
      </ion-modal>
      <SchoolSelection
        ref="schoolSelection"
        :presentingElement="schoolSelectionPresentingElement"
        @close="dismissSchoolSelection"
        @changeSchool="changeSchool"
        :apikey="apikey"
      />
    </ion-content>
  </ion-page>
</template>

<style scoped>
  .datepicker {
    position: absolute;
    left: 50%;
    bottom: 50px;
    transform: translateX(-50%);
    display: flex;
    width: 100%;
    justify-content: center;
    align-items: center;
  }
  .datepicker ion-button {
    --padding-start: 0;
    --padding-end: 0;
  }
  .datepicker button {
    padding: 8px 14px;
    font-size: 16px;
    border-radius: 8px;
    background-color: var(--ion-color-step-300, #edeef0);
  }
  ion-modal:has(ion-datetime) {
    --ion-background-color: transparent;
  }
  ion-modal ion-datetime {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 14px;
    width: auto;
  }
  @media screen and (max-width: 350px) {
    ion-modal ion-datetime {
      width: 100vw;
      border-radius: 0;
    }
  }
  .center {
    position: absolute;
    top: calc(50% - 30px);
    left: 50%;
    transform: translate(-50%, -50%);
    width: 80%;
  }
</style>
