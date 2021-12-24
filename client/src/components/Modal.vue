<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
          <template v-if="showInfo">
            <div>
            <el-button class="btn-close" type="danger" size="mini" circle @click="resetForm()"> x </el-button>
              <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="120px" class="demo-ruleForm">
                <el-form-item label="Id" prop="id" hidden>
                  <el-input v-model="ruleForm.id" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="Name" prop="name">
                  <el-input v-model="ruleForm.name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="Short Name" prop="shortName">
                  <el-input v-model="ruleForm.short_name" autocomplete="off"></el-input>
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
                <div class="submit-btn">
                  <el-button type="primary" icon="el-icon-edit" circle @click="changeFormState()"></el-button>
                  <el-button type="primary" @click="submitForm('ruleForm')">Submit</el-button>
                  <el-button @click="resetForm('ruleForm')">Reset</el-button>
                </div>
              </el-form>
            </div>
          </template>
          <template v-else>
            <el-button class="btn-close" type="danger" size="mini" circle @click="resetForm()"> x </el-button>
            <div>
            <h4>{{ ruleForm.name }}</h4>
            <h6>{{ ruleForm.short_name }}</h6>
            <br>
            <p v-html="ruleForm.description"></p>
            <code>{{ ruleForm.coordinates }}</code>
            <br>
            <img :src="ruleForm.file" alt="photo">
            </div>
            <div class="submit-btn">
              <el-button utton type="primary" icon="el-icon-edit" circle @click="changeFormState()"></el-button>
            </div>
          </template>
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
    },
    id: {
      type: Text,
      default: null
    }
  },
  data () {
    return {
      showInfo: false,
      ruleForm: {
        id: '',
        name: '',
        short_name: '',
        description: '',
        coordinates: '',
        file: ''
      }
    }
  },
  async mounted () {
    await this.mergeData()
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          axios.post(`http://localhost:3001/points/`, this.ruleForm)
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm () {
      this.$emit('popUp', null)
    },
    async getData (id) {
      const { data } = await axios.get(`http://localhost:3001/points/${id}`)
      return data[0]
    },
    async mergeData () {
      this.ruleForm = Object.assign(this.ruleForm, await this.getData(this.id))
      this.ruleForm.coordinates = Object.values(this.ruleForm.coordinates).length ? Object.values(this.ruleForm.coordinates) : this.coordinates
    },
    changeFormState () {
      console.log(this.showInfo);
      this.showInfo = !this.showInfo
    }
  }
}
</script>

<style scoped>
.submit-btn {
  justify-content: right;
  display: flex;
}
.btn-close {
    position: absolute;
    right: 41%;
    z-index: 100;
}
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
