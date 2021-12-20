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
          }),
          this.setPoints()
        ],
        view: new ol.View({
          center: ol.proj.fromLonLat([37.41, 8.82]),
          zoom: 4
        })
      })
    },
    setPoints () {
      const rome = new ol.Feature({
        geometry: new ol.geom.Point(ol.proj.fromLonLat([12.5, 41.9]))
      })
      rome.setStyle(
        new ol.style.Style({
          image: new ol.style.Icon({
            color: '#BADA55',
            crossOrigin: 'anonymous',
            // For Internet Explorer 11
            imgSize: [20, 20],
            src: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAFVBMVEX///8AAABQUFBTU1Po6OhfX18XFxfPXEYCAAABbklEQVR4nO3dsW0DQRAEQYpPMv+Q5ckf48TGoyqAwTVw/j4eAAAAAAAAAAAA3NPr/Wx4vw4Vvn8q3ocKn98O+/M8V/i5vv1Dn9fnaOF1aHpxHS08Nb04+AyF/0Rhc3qhsDm9UNicXihsTi8UNqcXCpvTC4XN6YXC5vRCYXN6obA5vVDYnF4obE4vFDanFwqb0wuFzemFwub0QmFzeqGwOb1Q2JxeKGxOLxQ2pxcKm9MLhc3phcLm9EJhc3qhsDm9UNicXihsTi8UNqcXCpvTC4XN6YXC5vRCYXN6obA5vVDYnF4obE4vFDanFwqb0wuFzemFwub0QmFzeqGwOb1Q2JxeKGxOLxQ2pxcKm9MLhc3phcLm9EJhc3qhsDm9UNicXihsTi8UNqcXCpvTC4XN6YXC5vRCYXN6obA5vVDYnF4obE4vFDanFwqb0wuFzenF2cL737C8/x3SiFOF978HfP+bzgAAAAAAAAAAAHzbL8RzDOHxqGGaAAAAAElFTkSuQmCC'
          })
        })
      )
      const vectorSource = new ol.source.Vector({
        features: [rome]
      })
      const VectorLayer = new ol.layer.Vector({
        source: vectorSource
      })
      return VectorLayer
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
