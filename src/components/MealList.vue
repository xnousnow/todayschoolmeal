<script lang="ts">
  import {
    clipboardOutline,
    clipboardSharp,
    warningOutline,
    warningSharp,
  } from 'ionicons/icons'
  import { defineComponent } from 'vue'

  import SimpleInfo from './SimpleInfo.vue'
  import importedFilterData from '../filterData'

  export default defineComponent({
    props: {
      apikey: String,
      cityCode: String,
      schoolCode: String,
      date: String,
    },
    setup() {
      return {
        clipboardOutline,
        clipboardSharp,
        warningOutline,
        warningSharp,
      }
    },
    data() {
      return {
        meal: [] as Array<string>,
        error: false,
        errorCode: '000',
        filterData: importedFilterData,
      }
    },
    methods: {
      updateMeal(): void {
        fetch(
          `https://open.neis.go.kr/hub/mealServiceDietInfo?KEY=${this.apikey}&Type=json&ATPT_OFCDC_SC_CODE=${this.cityCode}&SD_SCHUL_CODE=${this.schoolCode}&MLSV_YMD=${this.date}`
        )
          .then((response) => response.json())
          .then((data) => {
            if (data.RESULT) {
              this.error = true
              this.errorCode = data.RESULT.CODE.replace(/\D/g, '')
            } else {
              this.error = false
              let meal = data.mealServiceDietInfo[1].row[0].DDISH_NM.replaceAll(
                /[ @]*((\()?[0-9.]+(\))?)?(흰죽 *\(환아용\) *(<br\/>)?)?\*?(김치양념)?(양념류)?(\(?(강화|저지방|고칼슘)?우유(급식)? ?(\((우유)?(급식)?\))?\)?)?(\([A-za-z+]*\))?[csO+]*/g,
                ''
              )
                .split(/<br\/>|, ?|\/|\\/g)
                .filter((e: any) => {
                  return !!e
                })
              this.meal = this.filterMeal(meal)
            }
          })
          .catch(() => {
            this.errorCode = 'Internal'
          })
      },
      filterMeal(meal: Array<string>): Array<string> {
        let filteredMeal: Array<string> = meal
        let filteredWord = ''
        let i = 0
        filteredMeal.forEach((menu) => {
          filteredWord = ''
          this.filterData.forEach((filter) => {
            if (
              menu.includes(filter.name) &&
              !filteredWord.includes(filter.name)
            ) {
              filteredMeal[i] = menu.replace(
                filter.name,
                `<span style="background: linear-gradient(to bottom, transparent 50%, #abdee6 50%)">${filter.name}</span>`
              )
              filteredWord += filter.name
            }
          })
          i++
        })
        console.log(filteredMeal)
        return filteredMeal
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
    components: {
      SimpleInfo,
    },
  })
</script>

<template>
  <ul v-if="!error">
    <li v-for="menu in meal" :key="menu" v-html="menu"></li>
  </ul>
  <SimpleInfo
    v-else
    :iosicon="errorCode == '200' ? clipboardOutline : warningOutline"
    :mdicon="errorCode == '200' ? clipboardSharp : warningSharp"
    :title="
      !(errorCode == 'Internal')
        ? '급식을 불러올 수 없어요.'
        : '알 수 없는 오류가 일어났어요.'
    "
    :description="
      (errorCode = '200')
        ? '급식 정보가 없어요. 선택된 날짜가 공휴일이나 방학인지 확인해 주세요.'
        : !(errorCode == 'Internal')
        ? '인터넷이 연결되어 있는지 확인해 주세요.'
        : ''
    "
  />
</template>

<style scoped>
  ul {
    list-style: none;
    padding: 0;
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
  div {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 80%;
  }
</style>
