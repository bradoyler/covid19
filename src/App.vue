<template>
  <div id="app">
    <MainMap v-if="reports.length" :coords="coords" :reports="reports"></MainMap>
  </div>
</template>

<script>
import { csvParse } from 'd3-dsv'
import MainMap from './components/MainMap.vue'

export default {
  name: 'App',
  components: {
    MainMap
  },
  mounted () {
    console.log('appppp')
    this.loadData()
  },
  methods: {
    loadData: function () {
      Promise.all(['cases-us.csv', 'counties.csv'].map(url => {
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
          } else {
            console.log('no match:', r.Admin2, r.FIPS)
          }
          return r
        })
      })
    }
  },
  data: function () {
    return {
      location: '',
      coords: 'aaa',
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
</style>