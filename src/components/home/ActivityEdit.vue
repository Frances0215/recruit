<template xmlns:el-col="http://www.w3.org/1999/html">
  <body>
  <br>
  <el-page-header @back="back1">
  </el-page-header>
  <br>
    <el-row>
      <el-col :span ="24">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm" size="medium">
          <h1 style="font-size: 30px;margin-bottom: 30px">活动编辑</h1>
          <el-row>
            <el-col :span="12">
              <el-form-item label="活动名称" prop="name" style="">
                <el-input v-model="ruleForm.name"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="活动主题" prop="theme" >
                <el-input v-model="ruleForm.theme" style="float: left"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item label="活动地点" prop="place">
            <el-input v-model="ruleForm.place"></el-input>
          </el-form-item>
          <el-form-item label="活动时间" required>
            <el-col :span="11">
              <el-form-item prop="star_time">
                <el-date-picker type="date" placeholder="选择开始日期" v-model="ruleForm.star_time" style="width: 100%;"></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col class="line" :span="2">-</el-col>
            <el-col :span="11">
              <el-form-item prop="end_time">
                <el-date-picker placeholder="选择结束日期" v-model="ruleForm.end_time" style="width: 100%;"></el-date-picker>
              </el-form-item>
            </el-col>
          </el-form-item>
          <el-form-item label="报名时间" required>
            <el-col :span="11">
              <el-form-item prop="enroll_time">
                <el-date-picker placeholder="选择报名开始日期" v-model="ruleForm.enroll_time" style="width: 100%;"></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col class="line" :span="2">-</el-col>
            <el-col :span="11">
              <el-form-item prop="enroll_end_time">
                <el-date-picker placeholder="选择报名结束日期" v-model="ruleForm.enroll_end_time" style="width: 100%;"></el-date-picker>
              </el-form-item>
            </el-col>
          </el-form-item>
          <el-row>
            <el-col :span="12">
              <el-form-item label="参与对象" style="float: left" prop="limit">
                <el-radio-group v-model="ruleForm.limit" style="margin-left: 10px">
                  <el-radio label="学生"></el-radio>
                  <el-radio label="教师"></el-radio>
                  <el-radio label="全部"></el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="参与人数" prop="join_num">
                <el-input v-model="ruleForm.join_num"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="进行方式" prop="tag2" style="float: left">
                <el-radio-group v-model="ruleForm.tag2" style="margin-left: 10px">
                  <el-radio label="线上活动"></el-radio>
                  <el-radio label="线下活动"></el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="活动类型" prop="tag1" style="float: left">
                <el-radio-group v-model="ruleForm.tag1" style="width: 100%">
                  <el-radio label="校内活动"></el-radio>
                  <el-radio label="校外活动"></el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="审核学校" prop="sch" style="float: left">
                <el-select v-model="ruleForm.sch" placeholder="请选择审核学校" clearable>
                  <el-option
                    v-for="item in options2"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="审核学院" prop="aca" style="float: left">
                <el-select v-model="ruleForm.aca" placeholder="请选择审核学院" clearable>
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="参加学校" prop="can_join1" style="float: left">
                <el-select v-model="ruleForm.can_join1" multiple placeholder="请选择参加学校">
                  <el-option
                    v-for="item in options2"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="参加学院" prop="can_join2" style="float: left">
                <el-select v-model="ruleForm.can_join2" multiple placeholder="请选择参加学院">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item label="活动详情" prop="text">
            <el-input type="textarea" autosize v-model="ruleForm.text" placeholder="在此输入活动详情页内容"></el-input>
          </el-form-item>
          <el-form-item label="上传附件" prop="files">
            <el-upload
              class="upload-file"
              action="/admin/active/creat"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              :before-remove="beforeRemove"
              multiple
              :on-exceed="handleExceed"
              :file-list="fileList"
              :auto-upload="false"
              :on-change="handleChange"
              name="file"
              ref="upload"
              show-file-list="true"
              :http-request="httpRequest"
              on-success="handleSuccess"
            >
              <el-button size="small" type="primary">点击上传附件/图片</el-button>
              <div slot="tip" class="el-upload__tip">单个文件不超过500kb</div>
            </el-upload>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitUpload">确认修改</el-button>
            <el-button @click="deleteActive">删除活动</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </body>
</template>

<script>

export default {
  mounted: function () { // 自动触发写入的函数
    this.refreshOptions()
    this.refreshOptions2()
    this.refreshForm()
  },
  data () {
    return {
      row: [],
      id: '',
      ruleForm: {
        star_time: '',
        end_time: '',
        theme: '',
        tag1: '',
        tag2: '',
        name: '',
        join_num: '',
        text: '',
        limit: '',
        enroll_time: '',
        enroll_end_time: '',
        place: '',
        aca: '',
        sch: '',
        can_join1: [],
        can_join2: []
      },
      rules: {
        name: [
          { required: true, message: '请输入活动名称', trigger: 'blur' }
        ],
        theme: [
          { required: true, message: '请输入活动主题', trigger: 'blur' }
        ],
        star_time: [
          { type: 'date', required: true, message: '请选择开始日期', trigger: 'change' }
        ],
        end_time: [
          { type: 'date', required: true, message: '请选择结束日期', trigger: 'change' }
        ],
        type: [
          { type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' }
        ],
        tag1: [
          { required: true, message: '请选择活动类型', trigger: 'change' }
        ],
        tag2: [
          { required: true, message: '请选择活动形式', trigger: 'change' }
        ],
        join_num: [
          { required: true, type: 'int', message: '请输入最大参与人数', trigger: 'blur' }
        ],
        limit: [
          { required: true, message: '请选择参与对象', trigger: 'change' }
        ],
        text: [
          { required: true, type: 'text', message: '请输入活动详情', trigger: 'blur' }
        ],
        enroll_time: [
          { type: 'date', required: true, message: '请选择报名开始日期', trigger: 'change' }
        ],
        enroll_end_time: [
          { type: 'date', required: true, message: '请选择报名结束日期', trigger: 'change' }
        ]
      },
      options2: [],
      options: [],
      photoList: [],
      fileList: [],
      headers: {
        Authorization: 'Bearer ' + window.localStorage.getItem('token')
      },
      params: {},
      file: []
      // param: {}
    }
  },
  methods: {
    resetForm (formName) {
      this.$refs[formName].resetFields()
    },
    handleRemove (file, fileList) {
      console.log(file, fileList)
      fileList.remove(file)
    },
    handlePreview (file) {
      console.log(file)
    },
    submitUpload () {
      var param = new FormData()
      this.$refs.upload.submit()
      this.file.forEach(function (file) {
        param.append('file', file, file.name)
      })
      var num = parseInt(this.ruleForm.join_num)
      var canJoin = this.ruleForm.can_join1.concat(this.ruleForm.can_join2)
      // param.append('star_time', 'Fri Jul 08 2022 00:00:00 GMT+0800')
      // param.append('end_time', 'Fri Jul 08 2022 00:00:00 GMT+0800')
      // param.append('theme', '诚邀新友，共赏明月')
      // param.append('tag1', '校内活动')
      // param.append('tag2', '线下活动')
      // param.append('name', '寝室文化节')
      // param.append('join_num', 100)
      // param.append('aca', '软件学院')
      // param.append('sch', '四川大学')
      // param.append('text', '111111111111111')
      // param.append('limit', '全部')
      // param.append('enroll_time', 'Fri Jul 08 2022 00:00:00 GMT+0800')
      // param.append('enroll_end_time', 'Fri Jul 08 2022 00:00:00 GMT+0800')
      // param.append('place', '二基楼报告厅')
      // param.append('can_join', '四川大学')
      // param.append('body', JSON.stringify(this.newData))
      console.log(this.ruleForm)
      param.append('star_time', this.ruleForm.star_time)
      param.append('end_time', this.ruleForm.end_time)
      param.append('theme', this.ruleForm.theme)
      param.append('tag1', this.ruleForm.tag1)
      param.append('tag2', this.ruleForm.tag2)
      param.append('name', this.ruleForm.name)
      param.append('join_num', num)
      param.append('text', this.ruleForm.text)
      param.append('limit', this.ruleForm.limit)
      param.append('enroll_time', this.ruleForm.enroll_time)
      param.append('enroll_end_time', this.ruleForm.enroll_end_time)
      param.append('place', this.ruleForm.place)
      if (typeof this.ruleForm.aca === 'undefined' || this.ruleForm.aca === '') {
        this.ruleForm.aca = 'no'
      }
      param.append('aca', this.ruleForm.aca)
      if (typeof this.ruleForm.sch === 'undefined' || this.ruleForm.sch === '') {
        this.ruleForm.sch = 'no'
      }
      param.append('sch', this.ruleForm.sch)
      param.append('place', this.ruleForm.place)
      param.append('can_join', canJoin)
      param.append('id', this.id)
      let config = {
        header: {
          'Content-Type': 'multipart/form-data'
        }
      }
      console.log(this.ruleForm.name)
      this.$axios.post('/admin/active/edit_add', param, config).then(response => {
        console.log('请求成功')
        console.log(response)
        this.$message({
          type: 'info',
          message: '修改成功'
        })
        // this.openMessage()
        // 接口成功调用params上的onSuccess函数，会触发默认的successHandler函数
        // 这样可以用自带的ui等
        // params.onSuccess({name: 'eric'})
      }).catch(err => {
        console.log('请求失败')
        console.log(err)
      })
    },
    handleChange (file, fileList) {
      console.log(fileList)
      console.log(file)
      this.fileList = fileList
    },
    httpRequest (param) {
      // this.photoList = fd.fileList
      this.file.push(param.file)
      // console.log(this.photoList)
    },
    getFile (event) {
      this.files = event.target.files
    },
    refreshOptions () {
      var url = '/un-authc/user/academy'
      this.$axios.get(url).then(successResponse => {
        if (successResponse.data.code === 200) {
          console.log('请求成功')
          console.log(successResponse.data.result)
          var temp = successResponse.data.result
          console.log(temp)
          for (var i = 0; i < temp.length; i++) {
            var a = {'label': temp[i].username, 'value': temp[i].username, 'id': temp[i].id}
            this.options.push(a)
          }
          console.log(this.options)
        }
      })
        .catch(failResponse => {
          console.log(failResponse)
        })
    },
    refreshOptions2 () {
      var url = '/un-authc/user/school'
      this.$axios.get(url).then(successResponse => {
        if (successResponse.data.code === 200) {
          console.log('请求成功')
          console.log(successResponse.data.result)
          var temp = successResponse.data.result
          for (var i = 0; i < temp.length; i++) {
            var a = {'label': temp[i].username, 'value': temp[i].username, 'id': temp[i].id}
            this.options2.push(a)
          }
          console.log(this.options2)
        }
      })
        .catch(failResponse => {
          console.log('请求失败')
        })
    },
    refreshForm () {
      this.row = this.$route.query.row
      this.id = this.row.id
      var url = '/no-authc/id/'
      var a = {'id': this.$route.query.row.id}
      this.$axios.post(url, {'id': this.$route.query.row.id}).then(successResponse => {
        if (successResponse.data.code === 200) {
          console.log('请求成功')
          console.log(successResponse.data.result)
          var result = successResponse.data.result
          var aca
          for (var i = 0; i < this.options.length; i++) {
            if (this.options[i].id === result.aca) {
              aca = this.options[i].value
            }
          }
          var sch
          console.log(this.options2)
          console.log(result.sch)
          for (var a = 0; a < this.options2.length; a++) {
            if (this.options2[a].id === result.sch) {
              sch = this.options2[a].value
            }
          }
          console.log(sch)
          // 获取can_join
          var canJoin = result.join_user
          var canJoin1 = []
          var canJoin2 = []
          if (canJoin !== null) {
            for (var b = 0; b < canJoin.length; b++) {
              if (canJoin[b].role === '学校') {
                canJoin1.push(canJoin[b].username)
              } else if (canJoin[b].role === '学院') {
                canJoin2.push(canJoin[b].username)
              }
            }
          }
          this.ruleForm.star_time = result.star_time
          this.ruleForm.end_time = result.end_time
          this.ruleForm.theme = result.theme
          this.ruleForm.tag1 = result.tag1
          this.ruleForm.tag2 = result.tag2
          this.ruleForm.name = result.name
          this.ruleForm.join_num = result.join_num
          this.ruleForm.text = result.text
          this.ruleForm.limit = result.limit_
          this.ruleForm.enroll_time = result.enroll_time
          this.ruleForm.enroll_end_time = result.enroll_end_time
          this.ruleForm.place = result.place
          this.ruleForm.aca = aca
          this.ruleForm.sch = sch
          this.ruleForm.place = result.place
          this.ruleForm.can_join1 = canJoin1
          this.ruleForm.can_join2 = canJoin2
          this.fileList = result.files
          console.log(this.ruleForm)
        }
      })
        .catch(failResponse => {
          console.log('请求失败')
          console.log(failResponse)
        })
    },
    deleteActive () {
      var url = '/admin/delete'
      console.log(this.$route.query.row.id)
      this.$axios.post(url, {'id': this.$route.query.row.id}).then(successResponse => {
        if (successResponse.data.code === 200) {
          console.log('请求成功')
          console.log(successResponse.data.result)
          this.$refs.upload.clearFiles()
          this.$refs['ruleForm'].resetFields()
          this.$message({
            type: 'info',
            message: '删除成功'
          })
          this.$router.push({
            path: '/ActivityList'
          })
        }
      })
        .catch(failResponse => {
          console.log('请求失败')
          console.log(failResponse)
        })
    },
    back1 () {
      console.log('返回')
      this.$router.push({
        path: '/ActivityList'
      })
    }
  }
}
</script>
<style>
.el-form-item__label {
  text-align: right;
  vertical-align: middle;
  float: left;
  font-size: 18px;
  color: #606266;
  line-height: 40px;
  padding: 0 12px 0 0;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}
/*.el-input{*/
/*  margin-left: 10px;*/
/*  float: left;*/
/*}*/
</style>
