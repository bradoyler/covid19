<template>
  <div id="app">
  <div class="header">
    <h3 class="header-title">COVID-19 Confirmed cases (per capita) <br>
      <small>last update: 4/4/20</small>
    </h3>
  </div>
    <MainMap v-if="reports.length" :reportDate="reportDate" :coords="coords" :reports="reports"></MainMap>
  </div>
</template>

<script>
import { csvParse } from 'd3-dsv'
import MainMap from './components/MainMap.vue'
const dataVersion = '4.4'
const reportDate = '4/4/20'

export default {
  name: 'App',
  components: {
    MainMap
  },
  mounted () {
    this.loadData()
  },
  methods: {
    loadData: function () {
      Promise.all([`cases-us-${dataVersion}.csv`, 'counties.csv'].map(url => {
        return fetch(url).then(response => {
          return response.ok ? response.text() : Promise.reject(response.status)
        }).then(text => csvParse(text))
      })).then(datum => {
        const reports = datum[0]
        const counties = datum[1]
        this.reports = reports.map(r => {
          const fips = Math.round(Number(r.FIPS))
          const county = counties.find(c => fips === +`${c.STATE}${c.COUNTY}`)
          if (county) {
            r.pop = Number(county.POPESTIMATE2019)
          }
          return r
        })
        console.log('>>>', this.reports.length)
      })
    }
  },
  data: function () {
    return {
      reportDate: reportDate,
      location: '',
      coords: '', // [-74.8477705, 40.2470771]
      counties: [],
      reports: []
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.header {
  position: fixed;
  top: 8px;
  z-index: 9999;
  text-align: center;
  width: 100%;
}

.header-title {
    border-radius: 10px;
    background-color: black;
    margin: auto;
    max-width: 420px;
    padding: 6px;
    color: antiquewhite;
}
</style>
