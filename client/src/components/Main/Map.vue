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
      data: null,
    }
  },
  async mounted () {
    await this.init()
    this.clickHadler()
  },
  methods: {
    async init () {
      this.map = new ol.Map({
        target: 'map',
        layers: [
          new ol.layer.Tile({
            source: new ol.source.OSM()
          }),
          await this.setPoints()
        ],
        view: new ol.View({
          center: ol.proj.fromLonLat([37.41, 8.82]),
          zoom: 4
        })
      })
    },
    setProps (el, idx) {
      const a = new ol.geom.Point(el)
      a.setProperties(this.data[idx].id)
      debugger
      return a
    },
    async setPoints () {
      this.data = await this.getPoints()
      const coordinates = this.data.map((el) => Object.values(el.coordinates))
      const points = new ol.Collection(coordinates.map((el, idx) => {
        return new ol.Feature({
          geometry: this.setProps(el, idx)
        })
      }))
      const vectorSource = new ol.source.Vector({
        features: points
      })
      const VectorLayer = new ol.layer.Vector({
        source: vectorSource,
        style: new ol.style.Style({
          image: new ol.style.Icon({
            color: '#BADA55',
            crossOrigin: 'anonymous',
            // For Internet Explorer 11
            imgSize: [20, 20],
            src: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAFVBMVEX///8AAABQUFBTU1Po6OhfX18XFxfPXEYCAAABbklEQVR4nO3dsW0DQRAEQYpPMv+Q5ckf48TGoyqAwTVw/j4eAAAAAAAAAAAA3NPr/Wx4vw4Vvn8q3ocKn98O+/M8V/i5vv1Dn9fnaOF1aHpxHS08Nb04+AyF/0Rhc3qhsDm9UNicXihsTi8UNqcXCpvTC4XN6YXC5vRCYXN6obA5vVDYnF4obE4vFDanFwqb0wuFzemFwub0QmFzeqGwOb1Q2JxeKGxOLxQ2pxcKm9MLhc3phcLm9EJhc3qhsDm9UNicXihsTi8UNqcXCpvTC4XN6YXC5vRCYXN6obA5vVDYnF4obE4vFDanFwqb0wuFzemFwub0QmFzeqGwOb1Q2JxeKGxOLxQ2pxcKm9MLhc3phcLm9EJhc3qhsDm9UNicXihsTi8UNqcXCpvTC4XN6YXC5vRCYXN6obA5vVDYnF4obE4vFDanFwqb0wuFzenF2cL737C8/x3SiFOF978HfP+bzgAAAAAAAAAAAHzbL8RzDOHxqGGaAAAAAElFTkSuQmCC'
          })
        })
      })
      return VectorLayer
    },
    clickHadler () {
      this.map.on('click', (data) => {
        this.$emit('popUp', data)
      })
    },
    async getPoints () {
      const { data } = await axios.get('http://localhost:3001/points/all')
      return data
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
