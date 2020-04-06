<template>
  <div class="">
    <div id='map'></div>
  </div>
</template>

<script>
/* globals mapboxgl */
import * as turf from '@turf/turf'

export default {
  name: 'MainMap',
  props: ['coords', 'reports', 'reportDate'],
  methods: {
    setLocation: function (map, coords) {
      new mapboxgl.Marker().setLngLat(coords).addTo(map)
    },
    buildGeoJson: function () {
      const data = this.reports
      console.log('buildJson:', data.length, this.reportDate, data[9])
      // const reportDate = this.reportDate
      return turf.featureCollection(data.map(r => {
        const cases = Math.round(Number(r.confirmed))
        const properties = { cases, FIPS: r.FIPS, pop: 0, rate: 0, percentage: 0 }
        if (r.pop) {
          const rate = Math.round(cases / (r.pop / 10000))
          const percentage = ((cases / r.pop) * 100).toFixed(1)
          properties.html = `<strong>${r.Admin2}, ${r.Province_State}</strong>
                             <p>Cases: ${cases.toLocaleString()} / Population: ${r.pop.toLocaleString()}</p>
                             <p> Per 10k residents: ${rate} (${percentage}%)</p>`
          properties.rate = rate
          properties.percentage = percentage
          properties.pop = r.pop
        }
        return turf.point([r.Long_, r.Lat], properties)
      }))
    },
    addHover: function (map) {
      const popup = new mapboxgl.Popup({ closeButton: false, closeOnClick: false })

      map.on('mouseenter', 'report', function (e) {
        map.getCanvas().style.cursor = 'pointer'
        const description = e.features[0].properties.html
        const coordinates = e.features[0].geometry.coordinates.slice()
        popup.setLngLat(coordinates).setHTML(description).addTo(map)
      })
      map.on('mouseleave', 'report', function () {
        map.getCanvas().style.cursor = ''
        popup.remove()
      })
    },
    addLayer: function (map, geojson) {
      map.addSource('report', { type: 'geojson', data: geojson })

      map.addLayer({
        id: 'report',
        type: 'circle',
        source: 'report',
        paint: {
          'circle-stroke-color': 'grey',
          'circle-stroke-width': 1,
          'circle-opacity': 1,
          'circle-radius': [
            'step',
            ['get', 'rate'],
            0,
            2, // rate per 10k
            1.0,
            7, // ..
            2.0,
            15, // ..
            3.0,
            20,
            4.0,
            40,
            5.0,
            100, // ..
            6.0,
            200, // ..
            10.0,
            250, // ..
            12.5
          ],
          'circle-color': 'rgb(165,15,21)'
        }
      })
    }
  },
  mounted () {
    mapboxgl.accessToken = window.mapbox_token

    const map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/dark-v10',
      center: [-95.830, 38.477],
      zoom: 3.5
    })

    // window.map = map // export to window
    const that = this
    map.on('load', function () {
      that.addLayer(map, that.buildGeoJson())
      that.addHover(map)
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
