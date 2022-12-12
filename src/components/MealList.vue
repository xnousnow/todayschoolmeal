<script lang="ts">
  import { defineComponent } from 'vue'
  export default defineComponent({
    props: {
      apikey: String,
      cityCode: String,
      schoolCode: String,
      date: String,
    },
    data() {
      return {
        meal: [],
      }
    },
    methods: {
      updateMeal() {
        fetch(
          `https://open.neis.go.kr/hub/mealServiceDietInfo?KEY=${this.apikey}&Type=json&ATPT_OFCDC_SC_CODE=${this.cityCode}&SD_SCHUL_CODE=${this.schoolCode}&MLSV_YMD=${this.date}`
        )
          .then((response) => response.json())
          .then((data) => {
            this.meal = data.mealServiceDietInfo[1].row[0].DDISH_NM.replaceAll(
              / *((\()?[0-9.]+(\))?)?(흰죽 *\(환아용\) *(<br\/>)?)?\*?(김치양념)?(양념류)?((강화)?우유(\(우유급식\))?)?/g,
              ''
            )
              .split(/<br\/>|, ?|\/|\\/g)
              .filter((e: any) => {
                return !!e
              })
          })
      },
    },
    mounted() {
      this.updateMeal()
    },
    watch: {
      apikey() {
        this.updateMeal()
      },
      cityCode() {
        this.updateMeal()
      },
      schoolCode() {
        this.updateMeal()
      },
      date() {
        this.updateMeal()
      },
    },
  })
</script>

<template>
  <ul>
    <li v-for="menu in meal" :key="menu">{{ menu }}</li>
  </ul>
</template>

<style scoped>
  ul {
    list-style: none;
    padding: 0;
    position: absolute;
    top: calc(50% - 30px);
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 25px;
    margin-bottom: 10px;
    font-weight: 500;
    line-height: 1.2;
    text-align: center;
    width: 100%;
  }
  @media screen and (min-width: 375px) {
    ul {
      font-size: 30px;
    }
  }
</style>
