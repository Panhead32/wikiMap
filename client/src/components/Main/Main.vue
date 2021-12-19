<template>
  <div>
    <Map @popUp="modal"></Map>
    <Modal
      @popUp="modal"
      v-if="showModal"
      :coordinates=coordinates
    >
    </Modal>
  </div>
</template>

<script>
import Map from './Map.vue'
import Modal from '../Modal.vue'
const { axios } = window

export default {
  components: {
    Map,
    Modal
  },
  name: 'Main',
  data () {
    return {
      showModal: false,
      coordinates: null
    }
  },
  methods: {
    modal (params) {
      this.showModal = !this.showModal
      if (params) {
        this.coordinates = params.coordinate
        if (this.showModal) {
          this.getData(this.coordinates)
        }
      }
    },
    async getData (coords) {
      const { data } = await axios.get(`http://localhost:3001/points/`)
      console.log(data)
    }
  }
}
</script>

<style scoped>

</style>
