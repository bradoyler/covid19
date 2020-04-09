<template>
<div id="app">
  <div class="header">
    <h3 class="header-title">
      <div class="mb1"> COVID-19 Reports - US Map</div>
      <a v-on:click="loadMapLayer('confirmed')" v-bind:class="[mapType ==='confirmed' ? 'ba' : '']"
      class="f7 link dim br2 ph3 pv2 mb2 dib white bg-black" href="#confirmed">
        Cases {{totalCases.toLocaleString()}}
      </a>
      <a v-on:click="loadMapLayer('confirmed-pc')" v-bind:class="[mapType ==='confirmed-pc' ? 'ba' : '']"
      class="f7 link dim br2 ph3 pv2 mb2 dib white bg-black" href="#confirmed">
        Per Capita
      </a>
      <a v-on:click="loadMapLayer('deaths')" v-bind:class="[mapType ==='deaths' ? 'ba' : '']"
      class="f7 link dim br2 ph3 pv2 mb2 dib white bg-black" href="#deaths">
        Deaths {{totalDeaths.toLocaleString()}}
      </a>
    </h3>
  </div>
    <MainMap v-if="reports.length" :mapType="mapType" :reportDate="reportDate" :coords="coords" :deathReports="deathReports" :reports="reports"></MainMap>
  <div class="footer">
    <small style="font-size: x-small">updated: {{reportDate}}</small>
  </div>
</div>
</template>

<script>
import MainMap from './components/MainMap.vue'
const reportDate = process.env.VUE_APP_REPORT_PATH
const dataVersion = reportDate.replace(/\//g, '.')

export default {
  name: 'App',
  components: {
    MainMap
  },
  mounted () {
    this.loadData()
  },
  methods: {
    loadMapLayer: function (name) {
      this.mapType = name
    },
    joinData: function (r, counties) {
      const fips = Math.round(Number(r.FIPS))
      const county = counties.find(c => fips === +`${c.STATE}${c.COUNTY}`)
      if (county) {
        r.pop = Number(county.POPESTIMATE2019)
      }
      return r
    },
    getTotalCases: function () {
      const data = this.reports.map(r => r.confirmed)
      return data.reduce((acc, curr) => Number(acc) + Number(curr))
    },
    getTotalDeaths: function () {
      const data = this.deathReports.map(r => r.confirmed)
      return data.reduce((acc, curr) => Number(acc) + Number(curr))
    },
    loadData: function () {
      const jsonFiles = [`cases2-us-${dataVersion}.json`, `deaths-us-${dataVersion}.json`, 'counties-v2.json']
      Promise.all(jsonFiles.map(url => {
        return fetch(url).then(response => {
          return response.ok ? response.json() : Promise.reject(response.status)
        })
      })).then(responses => {
        const reports = responses[0]
        const deathReports = responses[1]
        const counties = responses[2]
        this.deathReports = deathReports.map(r => this.joinData(r, counties))
        this.reports = reports.map(r => this.joinData(r, counties))
        console.log('>>> reports:', this.reports.length, this.deathReports.length)
        this.totalCases = this.getTotalCases()
        this.totalDeaths = this.getTotalDeaths()
      })
    }
  },
  data: function () {
    return {
      mapType: 'confirmed',
      recovered: 0,
      totalCases: 0,
      totalDeaths: 0,
      reportDate: reportDate,
      location: '',
      coords: '', // [-74.8477, 40.247]
      counties: [],
      reports: [],
      deathReports: []
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
  top: 0;
  z-index: 9999;
  text-align: center;
  width: 100%;
}

.footer {
  padding-bottom: 5px;
  position: fixed;
  bottom: 0;
  z-index: 9999;
  text-align: center;
  width: 100%;
  font-size: 1.2rem;
  border-radius: 10px;
  color: antiquewhite;
  background-color: black;
}

.header-title {
  font-size: 1.2rem;
  border-radius: 10px;
  background-color: black;
  margin: auto;
  max-width: 420px;
  padding: 6px;
  color: antiquewhite;
}
</style>
