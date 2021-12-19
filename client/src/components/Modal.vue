<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
          <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="120px" class="demo-ruleForm">
            <el-form-item label="Id" prop="id" hidden>
              <el-input v-model="ruleForm.id" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="Name" prop="name">
              <el-input v-model="ruleForm.name" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="Short Name" prop="shortName">
              <el-input v-model="ruleForm.shortName" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="Description" prop="description">
              <el-input v-model="ruleForm.description"  autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="Coordinates" prop="coordinates">
              <el-input v-model="ruleForm.coordinates"  autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="File" prop="file">
              <el-input v-model="ruleForm.file"  autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitForm('ruleForm')">Submit</el-button>
              <el-button @click="resetForm('ruleForm')">Reset</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import { v4 as uuidv4 } from 'uuid'
const { axios } = window

export default {
  props: {
    coordinates: {
      type: Array,
      default: null
    }
  },
  data () {
    return {
      ruleForm: {
        id: '',
        name: '',
        shortName: '',
        description: '',
        coordinates: this.coordinates || '',
        file: ''
      }
    }
  },
  mounted () {
    this.getData(this.ruleForm.coordinates)
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!')
          axios.post(`/points/${uuidv4()}`, this.ruleForm)
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm (formName) {
      this.$emit('popUp', null)
      this.$refs[formName].resetFields()
    }
  }
}
</script>

<style scoped>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 300px;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
  font-family: Helvetica, Arial, sans-serif;
}

.modal-header h3 {
  margin-top: 0;
  color: #42b983;
}

.modal-body {
  margin: 20px 0;
}

.modal-default-button {
  float: right;
}

/*
 * The following styles are auto-applied to elements with
 * transition="modal" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the modal transition by editing
 * these styles.
 */

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}

</style>
