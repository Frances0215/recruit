<template>
  <body>
<!--  <div style="margin-top: 15px;">-->
<!--    <el-input placeholder="请输入内容" v-model="input" class="input-with-select">-->
<!--      <el-select v-model="value" slot="prepend" placeholder="请选择">-->
<!--        <el-option label="活动名称" value="2"></el-option>-->
<!--        <el-option label="发布用户" value="1"></el-option>-->
<!--      </el-select>-->
<!--      <el-button slot="append" @click="searcht" icon="el-icon-search"></el-button>-->
<!--      <el-button slot="append" type="danger" @click="clear" icon="el-icon-refresh-left">重置</el-button>&ndash;&gt;-->
<!--    </el-input>-->
<!--  </div>-->
  <el-table
    ref="multipleTable"
    :data="tableData"
    tooltip-effect="dark"
    style="width: 100%"
    @selection-change="handleSelectionChange">
    <el-table-column
      prop="id"
      label="审核ID"
      width="150">
    </el-table-column>
    <el-table-column
      prop="active.id"
      label="活动ID"
      width="80">
    </el-table-column>
    <el-table-column
      prop="active.name"
      label="活动名称"
      width="80">
    </el-table-column>
    <el-table-column
      prop="status"
      label="审核情况"
      show-overflow-tooltip>
    </el-table-column>
    <el-table-column
      prop="active.limit_"
      label="参与对象"
      show-overflow-tooltip>
    </el-table-column>
    <el-table-column
      prop="active.join_num"
      label="参与数"
      show-overflow-tooltip>
    </el-table-column>

    <el-table-column label="操作" fixed="right">
      <template slot-scope="scope">
        <el-button
          size="mini"
          v-on:click="handleEdit(scope.row)">查看反馈
        </el-button>
        <el-button
          size="mini"
          @click="handleDelete(scope.$index, scope.row)">编辑活动总结
        </el-button>
      </template>
    </el-table-column>
  </el-table>
  <div class="block" style="margin-top: 10px">
    <el-pagination
      @current-change="handleCurrentChange"
      layout="total, prev, pager, next, jumper"
      :total="this.total">
    </el-pagination>
  </div>
  <el-dialog title="编写活动总结" :visible.sync="dialogTableVisible">
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="内容">
        <el-input type="textarea" v-model="form.desc"></el-input>
      </el-form-item>
      <el-form-item label="附件">
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
          limit=1
        >
          <el-button size="small" type="primary">点击上传附件/图片</el-button>
        </el-upload>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitUpload">提交</el-button>
        <el-button @click="this.dialogTableVisible=false">取消</el-button>
      </el-form-item>
    </el-form>

    <!--      <el-upload-->
    <!--        class="upload-demo"-->
    <!--        drag-->
    <!--        action=""-->
    <!--        :file-list="fileList"-->
    <!--        multiple>-->
    <!--        <i class="el-icon-upload"></i>-->
    <!--        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>-->
    <!--        <el-button @click="asd"></el-button>-->
    <!--      </el-upload>-->

  </el-dialog>
  </body>
</template>
<style>
.el-select .el-input {
  width: 130px;
}

.input-with-select .el-input-group__prepend {
  background-color: #fff;
}
</style>
<script>
var responses
export default {
  mounted: function () {
    this.refreshtable()
  },
  detail: {name: 'd'},
  data () {
    return {
      tablelist: [],
      file: [],
      row: [],
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      dialogTableVisible: false,
      tableData: [],
      multipleSelection: [],
      input: '',
      select: '',
      currentPage: 1,
      total: 1,
      page: 1,
      role: '',
      mode: 1,
      name: '',
      publisher: '',
      options: [{
        value: '1',
        label: '发布者'
      }, {
        value: '2',
        label: '活动名'
      }],
      value: '1'
    }
  },
  methods: {
    // refreshtable () {
    //   var url = '/no_authc/allactive/page=' + this.page
    //   console.log(url)
    //   this.$axios.get(url).then(successResponse => {
    //     if (successResponse.data.code === 200) {
    //       console.log(successResponse.data.result.totalElements)
    //       this.total = successResponse.data.result.totalElements
    //       this.tableData = successResponse.data.result.content
    //       console.log(this.tableData)
    //     }
    //   })
    //     .catch(failResponse => {
    //     })
    // },
    refreshtable () {
      var url = '/auth/order/my/pages=' + this.page
      // var url='/no_authc/allactive/page='+this.page
      console.log(url)
      this.$axios.get(url).then(successResponse => {
        if (successResponse.data.code === 200) {
          console.log(successResponse.data)
          this.total = successResponse.data.result.totalElements
          for (var i = 0; i < successResponse.data.result.content.length; i++) {
            if (successResponse.data.result.content[i].status === '已通过') {
              this.tablelist.push(successResponse.data.result.content[i])
            }
            // this.tablelist.push(successResponse.data.result.content[i])
          }
          // successResponse.data.result.content.forEach(function (item){this.tablelist.append(item.active)})
          this.tableData = this.tablelist
          this.total = this.tablelist.length
        }
      })
    },
    handledown (row) {
      if (row.active.file != null && row.active.file.length > 0) {
        // console.log('has')
        for (var k = 0; k < row.active.file.length; k++) {
          var item = row.active.file[k]
          if (item.type === 'photo') {
          } else {
            var index1 = item.url.indexOf('files')
            item.url = item.url.substring(index1 + 5, item.url.length)
            this.file.push({url: item.url, filename: item.name})
            console.log(this.file)
          }
        }
        if (this.file.length > 0) {
          console.log('file')

          for (var j = 0; j < this.file.length; j++) {
            var temp = j
            var url1 = '/file' + this.file[j].url
            // console.log(url1)
            this.$axios.get(url1, {responseType: 'blob'}).then(successResponse => {
              console.log(successResponse)
              // let blob = new Blob([successResponse.data])
              // let url = window.URL.createObjectURL(blob)
              this.src = window.URL.createObjectURL(successResponse.data)
              // console.log(this.file[temp])
              this.blobfile.push({src: this.src, filename: this.file[temp].filename})
            })
          }
        }
      }
    },
    downloadFile (item) {
      let link = document.createElement('a')
      link.style.display = 'none'
      link.href = item.src
      link.setAttribute('download', item.filename)
      document.body.appendChild(link)
      link.click()
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
        param.append('file', file)
      })
      param.append('desc_', this.form.desc)

      // var num = parseInt(this.ruleForm.join_num)
      // var canJoin = this.ruleForm.can_join1.concat(this.ruleForm.can_join2)
      param.append('id', this.row.id)
      console.log(this.row.id)
      let config = {
        header: {
          'Content-Type': 'multipart/form-data'
        }
      }
      console.log(param)
      this.$axios.post('/auth/order/addfile', param).then(response => {
        console.log('请求成功')
        console.log(response)
        this.$refs.upload.clearFiles()
        this.$message({
          type: 'info',
          message: '提交成功'
        })
        this.dialogTableVisible = false
        // this.openMessage()
        // 接口成功调用params上的onSuccess函数，会触发默认的successHandler函数
        // 这样可以用自带的ui等
        // params.onSuccess({name: 'eric'})
      }).catch(err => {
        this.$message({
          type: 'info',
          message: '提交失败'
        })
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
    clear () {
      this.mode = 1
      this.page = 1
      this.refreshtable()
    },
    searcht () {
      this.mode = 2
      console.log(this.input)
      if (this.value === '1') {
        this.$axios.post('/no-authc/publisher/page=1', {publisher: this.input}).then(successResponse => {
          console.log(successResponse.data.result.content)
          this.total = successResponse.data.result.totalElements
          this.tableData = successResponse.data.result.content
          this.page = 1
        }).catch(failResponse => {
          this.tableData = []
        })
      } else {
        this.$axios.post('/no-authc/name/page=1', {name: this.input}).then(successResponse => {
          console.log(successResponse.data.result.content)
          this.total = successResponse.data.result.totalElements
          this.tableData = successResponse.data.result.content
          this.page = 1
        }).catch(failResponse => {
          this.tableData = []
        })
      }
    },
    handleEdit (row) {
      this.aid = row.id
      console.log(row.id)
      this.$axios.get('/auth/myself').then(suresponse => {
        if (suresponse.data.code === 200) {
          this.role = suresponse.data.result.role
          console.log(this.role)
          if (this.role === 'super') {
            this.$router.push({
              path: '/feedbackmassage',
              query: {
                aid: this.aid
              }
            })
          }
          if (this.role === '学生' || this.role === '教室') {
            this.$router.push({
              path: '/feedbackmassageStu',
              query: {
                aid: this.aid,
                mode: 2
              }
            })
          }
          if (this.role === '学院') {
            this.$router.push({
              path: '/feedbackmassageaca',
              query: {
                aid: this.aid
              }
            })
          }
          if (this.role === '学校') {
            this.$router.push({
              path: '/feedbackmassageSch',
              query: {
                aid: this.aid
              }
            })
          }
        }
      })
    },
    handleCurrentChange (val) {
      this.page = val
      this.refreshtable()
    },

    handleDelete (index, row) {
      this.dialogTableVisible = true
      this.row = row
      console.log(index, row)
    }
  },
  toggleSelection (rows) {
    if (rows) {
      rows.forEach(row => {
        this.$refs.multipleTable.toggleRowSelection(row)
      })
    } else {
      this.$refs.multipleTable.clearSelection()
    }
  },
  handleSelectionChange (val) {
    this.multipleSelection = val
  }
}
</script>
