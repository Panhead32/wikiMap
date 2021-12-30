<template>
  <div>
    <Map @popUp="modal"></Map>
    <Modal
      @popUp="modal"
      v-if="showModal"
      :coordinates="coordinates"
      :id="id"
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
      coordinates: null,
      id: null
    }
  },
  methods: {
    async modal (params) {
      this.showModal = !this.showModal
      if (!Array.isArray(params)) {
        this.id = null
        this.coordinates = params.coordinate
      } else {
        this.id = params[0].getProperties().geometry.A.id
        this.coordinates = null
      }
    }
  }
}
</script>

<style scoped>

</style>
