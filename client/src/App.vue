<template>
  <div id="app" style="display: flex">
    <Menubar style="display: flex; flex-direction: column;"></Menubar>
    <router-view/>
  </div>
</template>

<script>
import Menubar from '@/components/Menubar'
export default {
  components: {
    Menubar
  },
  name: 'app'
}
</script>

<style>
* {
  padding: 0px;
  margin: 0px;
}
</style>
