<template>
  <div>
    <el-button type="text" @click="collapseMenu">
      <i class="el-icon-more"></i>
    </el-button>
    <el-menu default-active="1" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" :collapse="isCollapse">
      <el-menu-item index="1">
        <i class="el-icon-map-location"></i>
        <span slot="title">Main Map</span>
      </el-menu-item>
      <el-menu-item index="2">
        <i class="el-icon-plus"></i>
        <span slot="title">Add some objects</span>
      </el-menu-item>
      <el-menu-item index="3">
        <i class="el-icon-info"></i>
        <span slot="title">About app</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>

export default{
  name: 'MenuBar',
  data () {
    return {
      isCollapse: true
    }
  },
  methods: {
    collapseMenu () {
      this.isCollapse = !this.isCollapse
    },
    handleOpen (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath)
    }
  }

}
</script>

<style>
.el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
</style>
