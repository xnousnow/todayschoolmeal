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
    IonNav,
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
  import FeatureTutorial from '@/modals/FeatureTutorial.vue'
  import SchoolSelection from '@/modals/SchoolSelection.vue'
  import MenuSearch from '@/modals/MenuSearch.vue'
  import SimpleInfo from '@/components/SimpleInfo.vue'
  import MenuInfo from '@/modals/MenuInfo.vue'

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
      IonNav,

      MealList,
      FeatureTutorial,
      SchoolSelection,
      SimpleInfo,
      MenuInfo,
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
        schoolName: '',

        page: null,
        apikey: '36c8f19f762644108af384935752556e',
        menuInfoIndex: 0,
        menuSearch: MenuSearch,
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
      changeSchool(cityCode: string, schoolCode: string, schoolName: string): void {
        this.cityCode = cityCode
        this.schoolCode = schoolCode
        this.schoolName = schoolName
        localStorage.setItem('cityCode', cityCode)
        localStorage.setItem('schoolCode', schoolCode)
        localStorage.setItem('schoolName', schoolName)
      },
      openMenuSearch(): void {
        (this.$refs.menuSearch as any).$el.present()
      },
      openMenuInfo(index: number): void {
        this.menuInfoIndex = index
        ;(this.$refs.menuInfo as any).$el.present()
      },
    },
    computed: {
      formattedDate(): string {
        const date = new Date(this.date)
        const month = date.getMonth() + 1
        const day = date.getDate()
        const weekday = ['???', '???', '???', '???', '???', '???', '???'][
          date.getDay()
        ]
        return `${month}??? ${day}??? (${weekday})`
      },
    },
    mounted() {
      let date = new Date()
      if (date.getUTCDay() == 0) date.setDate(date.getDate() + 1)
      if (date.getUTCDay() == 6) date.setDate(date.getDate() - 1)
      this.date = date.toISOString()

      let storedCityCode: string = localStorage.getItem('cityCode') as string
      let storedSchoolCode: string = localStorage.getItem(
        'schoolCode'
      ) as string
      let storedSchoolName: string = localStorage.getItem(
        'schoolName'
      ) as string
      if (storedCityCode && storedSchoolCode && storedSchoolName) {
        this.cityCode = storedCityCode
        this.schoolCode = storedSchoolCode
        this.schoolName = storedSchoolName
      }
      if (!localStorage.getItem('tutorial')) {
        setTimeout(() => {
          (this.$refs.tutorial as any).$el.present()
        }, 1000)
      }
      this.page = (this.$refs.page as any).$el
    },
  })
</script>

<template>
  <ion-page ref="page">
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-title>???????????????</ion-title>
        <ion-buttons slot="secondary" :collapse="true">
          <ion-button @click="openSchoolSelection">
            <ion-icon :ios="schoolOutline" :md="schoolSharp"></ion-icon>
          </ion-button>
        </ion-buttons>
        <ion-buttons slot="primary" :collapse="true">
          <ion-button @click="openMenuSearch">
            <ion-icon :ios="searchOutline" :md="searchSharp"></ion-icon>
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true" :scrollY="false">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">???????????????</ion-title>
          <ion-buttons slot="end">
            <ion-button @click="openSchoolSelection">
              <ion-icon :ios="schoolOutline" :md="schoolSharp"></ion-icon>
            </ion-button>
            <ion-button @click="openMenuSearch">
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
        @openMenuInfo="openMenuInfo"
      />
      <SimpleInfo
        v-else
        class="center mealError"
        :iosicon="schoolOutline"
        :mdicon="schoolSharp"
        title="????????? ????????? ?????????."
        button="?????? ????????????"
        @buttonClick="openSchoolSelection"
      />
      <div class="datepicker">
        <ion-button
          class="datepicker-arrow"
          fill="clear"
          color="dark"
          @click="changeDate(-1)"
        >
          <ion-icon
            :ios="chevronBackOutline"
            :md="chevronBackSharp"
            slot="icon-only"
          ></ion-icon>
        </ion-button>
        <ion-button
          class="datepicker-button"
          color="white"
          @click="openDatepickerModal"
        >
          <ion-label>{{ formattedDate }}</ion-label>
        </ion-button>
        <ion-button
          class="datepicker-arrow"
          fill="clear"
          color="dark"
          @click="changeDate(1)"
        >
          <ion-icon
            :ios="chevronForwardOutline"
            :md="chevronForwardSharp"
            slot="icon-only"
          ></ion-icon>
        </ion-button>
      </div>
      <ion-modal
        class="datepicker-modal"
        :keep-contents-mounted="true"
        ref="datepickerModal"
        @click="dismissDatepickerModal"
      >
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
      <FeatureTutorial
        ref="tutorial"
        :presentingElement="page"
      />
      <SchoolSelection
        ref="schoolSelection"
        :presentingElement="page"
        @changeSchool="changeSchool"
        :apikey="apikey"
        :selectedSchool="schoolName"
      />
      <ion-modal ref="menuSearch" :presentingElement="page">
        <ion-nav :root="menuSearch"></ion-nav>
      </ion-modal>
      <ion-modal ref="menuInfo" :presentingElement="page">
        <MenuInfo
          :index="menuInfoIndex"
          :backButton="false"
        />
      </ion-modal>
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
  .ios .datepicker-arrow {
    --padding-start: 0;
    --padding-end: 0;
  }
  .md .datepicker-arrow {
    --padding-start: 4px;
    --padding-end: 4px;
  }
  .datepicker-button {
    --color: var(--ion-text-color, #000000) !important;
    width: 120px;
  }
  .ios .datepicker-button {
    --padding-start: 14px;
    --padding-end: 14px;
    --padding-top: 8px;
    --padding-bottom: 8px;
    --background: var(--ion-color-step-300, #edeef0);
    height: auto !important;
  }
  .ios .datepicker-button::part(native) {
    height: auto !important;
  }
  .ios .datepicker-button ion-label {
    --padding: 0;
  }
  .ios .ion-color-white {
    --ion-color-base: #edeef0;
    --ion-color-base-rgb: 237, 238, 240;
    --ion-color-contrast: #000000;
    --ion-color-contrast-rgb: 0, 0, 0;
    --ion-color-shade: #d1d1d3;
    --ion-color-tint: #eff0f2;
  }
  .md .ion-color-white {
    --ion-color-base: #ffffff;
    --ion-color-base-rgb: 255, 255, 255;
    --ion-color-contrast: #000000;
    --ion-color-contrast-rgb: 0, 0, 0;
    --ion-color-shade: #e0e0e0;
    --ion-color-tint: #ffffff;
  }
  @media (prefers-color-scheme: dark) {
    .ios .ion-color-white {
      --ion-color-base: #1f1f1f;
      --ion-color-base-rgb: 31, 31, 31;
      --ion-color-contrast: #ffffff;
      --ion-color-contrast-rgb: 255, 255, 255;
      --ion-color-shade: #1b1b1b;
      --ion-color-tint: #353535;
    }
    .md .ion-color-white {
      --ion-color-base: #1f1f1f;
      --ion-color-base-rgb: 31, 31, 31;
      --ion-color-contrast: #ffffff;
      --ion-color-contrast-rgb: 255, 255, 255;
      --ion-color-shade: #1b1b1b;
      --ion-color-tint: #353535;
    }
  }
  .datepicker-modal {
    --ion-background-color: transparent;
    --box-shadow: none;
  }
  ion-modal ion-datetime {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: auto;
  }
  .ios .datepicker-modal ion-datetime {
    border-radius: 14px;
  }
  .md .datepicker-modal ion-datetime {
    border-radius: 2px;
    box-shadow: 0 28px 48px rgba(0, 0, 0, 0.4);
  }
  @media screen and (max-width: 350px) {
    ion-modal ion-datetime {
      width: 100vw;
      border-radius: 0 !important;
    }
  }
  .center {
    position: absolute;
    top: calc(50% - 30px);
    left: 50%;
    transform: translate(-50%, -50%);
    width: 80%;
  }
  .mealError {
    padding-top: 30px;
  }
</style>
