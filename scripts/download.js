require('dotenv').config()
const fs = require('fs')
const axios = require('axios')
const { csvParse } = require('d3-dsv')

const confirmedUrl = 'https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_confirmed_US.csv'
const deathsUrl = 'https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_deaths_US.csv'
const reportDate = process.env.VUE_APP_REPORT_PATH
const dataVersion = reportDate.replace(/\//g, '.')

console.log('downloading', reportDate, '->', dataVersion)

function transformJson (json) {
  return json.map(i => {
    // eslint-disable-next-line camelcase
    const { FIPS, Admin2, Province_State, Long_, Lat } = i
    const fips = Math.round(FIPS).toString()
    return { FIPS: fips, Admin2, Province_State, Long_, Lat, confirmed: i[reportDate] }
  })
}

const filePath = 'public/cases-us.csv'
axios.get(confirmedUrl).then(res => fs.writeFileSync(filePath, res.data, 'utf-8'))

const deathsFilePath = 'public/deaths-us.csv'
axios.get(deathsUrl)
  .then(res => fs.writeFileSync(deathsFilePath, res.data, 'utf-8'))

const jsonFilePath = `public/cases2-us-${dataVersion}.json`
axios.get(confirmedUrl)
  .then(res => csvParse(res.data))
  .then(json => transformJson(json))
  .then(json => fs.writeFileSync(jsonFilePath, JSON.stringify(json), 'utf-8'))

const jsonDeathsFilePath = `public/deaths-us-${dataVersion}.json`
axios.get(deathsUrl)
  .then(res => csvParse(res.data))
  .then(json => transformJson(json))
  .then(json => fs.writeFileSync(jsonDeathsFilePath, JSON.stringify(json), 'utf-8'))
