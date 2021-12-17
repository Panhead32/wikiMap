<template>
    <div id="map" class="map"></div>
</template>

<script>

const { ol } = window
export default {
  name: 'Map',
  data () {
    return {
      map: null
    }
  },
  mounted () {
    this.init()
    this.clickHadler()
  },
  methods: {
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
      this.map.on('click', () => {
        this.$emit('popUp')
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.map {
  width: 100%;
  height: 100%;
  position: fixed;
}
</style>
