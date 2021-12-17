<template>
  <div>
    <Map v-on:popUp="modal"></Map>
    <Modal v-on:popUp="modal" v-if="showModal"></Modal>
  </div>
</template>

<script>
import Map from './Map.vue'
import Modal from '../Modal.vue'

export default {
  components: {
    Map,
    Modal
  },
  name: 'Main',
  data () {
    return {
      showModal: false
    }
  },
  methods: {
    modal () {
      this.showModal = !this.showModal
    }
  }
}
</script>

<style scoped>

</style>
