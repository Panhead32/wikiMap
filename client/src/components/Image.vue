<template>
<div>
  <img :src="'data:image/png;base64,' + file" alt="No Photo" style="width: 100%">
</div>
</template>

<script>
const { axios } = window

export default {
  props: {
    id: {
      type: String,
      default: null
    }
  },
  data () {
    return {
      file: ''
    }
  },
  async mounted () {
    await this.getImage()
  },
  methods: {
    async getImage () {
      const { data } = await axios.get(`http://localhost:3001/points/image/get/${this.id}`)
      this.file = data.fileData
    }
  }
}
</script>
