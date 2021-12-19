<template>
    <div id="map" class="map"></div>
</template>

<script>

const { ol, axios } = window
export default {
  name: 'Map',
  data () {
    return {
      map: null,
      points: new ol.layer.VectorLayer({
        source: this.vectorSource
      })
    }
  },
  mounted () {
    this.init()
    this.getAllPoints()
    this.clickHadler()
  },
  methods: {
    async getAllPoints () {
      const { data } = await axios.get('http://localhost:3001/points/all')
      const coordinates = data.map((el) => el.coordinates)
      console.log(coordinates)
    },
    init () {
      this.map = new ol.Map({
        target: 'map',
        layers: [
          new ol.layer.Tile({
            source: new ol.source.OSM()
          })
        ],
        view: new ol.View({
          center: ol.proj.fromLonLat([37.41, 8.82]),
          zoom: 4
        })
      })
    },
    clickHadler () {
      this.map.on('click', (data) => {
        this.$emit('popUp', data)
      })
    }
  }
}
</script>

<style scoped>
.map {
  width: 100%;
  height: 100%;
  position: fixed;
}
</style>
