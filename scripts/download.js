const fs = require('fs')
const axios = require('axios')

const dd = new Date()
const dataVersion = `${dd.getMonth() + 1}.${dd.getDate()}`
const url = 'https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_confirmed_US.csv'
const filePath = `public/cases-us-${dataVersion}.csv`

axios.get(url).then(res => fs.writeFileSync(filePath, res.data, 'utf-8'))
