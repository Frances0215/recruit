<template>
  <body>
  <el-button slot="append" style='float: left;margin-bottom: 10px' v-on:click="back" icon="el-icon-arrow-left"></el-button>
  <div>
    <el-input placeholder="请输入内容" v-model="input" class="input-with-select">
      <el-select v-model="value" slot="prepend" placeholder="请选择">
        <el-option label="学生学院" value="2"></el-option>
        <el-option label="学生学校" value="1"></el-option>
      </el-select>
      <el-button slot="append" @click="searcht" icon="el-icon-search"></el-button>
      <el-button slot="append" type="danger" @click="clear" icon="el-icon-refresh-left">重置</el-button>-->
    </el-input>
  </div>
<!--  <el-row style="margin-top: 10px">-->
<!--    <el-col :span="12">-->
<!--    </el-col>-->
<!--  </el-row>-->
  <el-table
    ref="multipleTable"
    :data="tableData"
    tooltip-effect="dark"
    style="width: 100%"
    @selection-change="handleSelectionChange">
    <el-table-column
      prop="id"
      label="审核ID"
      width="150"
      show-overflow-tooltip>
    </el-table-column>
    <el-table-column
      prop="active.name"
      label="活动名称"
      width="150">
    </el-table-column>
    <el-table-column
      prop="user.username"
      label="参与者"
      width="150"
      show-overflow-tooltip>
    </el-table-column>
    <el-table-column
      prop="uid"
      label="参与ID"
      width="150"
      show-overflow-tooltip>
    </el-table-column>
    <el-table-column
      prop="aca"
      label="学院ID"
      width="150"
      show-overflow-tooltip>
    </el-table-column>
    <el-table-column
      prop="sch"
      label="学校ID"
      width="150"
      show-overflow-tooltip>
    </el-table-column>
    <el-table-column
      prop="status"
      label="参与状态"
      width="150"
      show-overflow-tooltip>
    </el-table-column>
    <el-table-column
      prop="desc_"
      label="反馈内容"
      width="150"
      show-overflow-tooltip>
    </el-table-column>

    <el-table-column
      fixed="right"
      label="操作"
      width="100">
      <template slot-scope="scope">
        <el-button @click="downfile(scope.row)" type="text" size="small">下载附件</el-button>
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
export default {
  mounted: function () {
    this.aid = parseInt(this.$route.query.aid)
    this.modea = parseInt(this.$route.query.mode)
    console.log(this.aid)
    this.refreshtable()
  },
  detail: {name: 'd'},
  data () {
    return {
      modea: 1,
      tableData: [],
      multipleSelection: [],
      input: '',
      select: '',
      currentPage: 1,
      total: 1,
      page: 1,
      name: '',
      publisher: '',
      father: '',
      status: '',
      grandfather: '',
      aid: '',
      role: '',
      mode: 1,
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
    async loadfile () {
      for (var j = 0; j < this.file.length; j++) {
        var temp = j
        var url1 = '/file' + this.file[j].url
        // console.log(url1)
        await this.$axios.get(url1, {responseType: 'blob'}).then(successResponse => {
          console.log(successResponse)
          // let blob = new Blob([successResponse.data])
          // let url = window.URL.createObjectURL(blob)
          this.src = window.URL.createObjectURL(successResponse.data)
          // console.log(this.file[temp])
          this.blobfile.push({src: this.src, filename: this.file[temp].filename})
        })
      }
    },
    async downfile (row) {
      var url = row.url
      var index = url.indexOf('files/')
      var name = url.substring(index + 5, url.length)
      var src
      console.log(name)
      var url1 = '/file' + name
      console.log(url1)
      await this.$axios.get(url1, {responseType: 'blob'}).then(successResponse => {
        // let blob = new Blob([successResponse.data])
        // let url = window.URL.createObjectURL(blob)
        console.log(successResponse)
        src = window.URL.createObjectURL(successResponse.data)
        // console.log(this.file[temp])
      })
      console.log(src)
      let link = document.createElement('a')
      link.style.display = 'none'
      link.href = src
      link.setAttribute('download', name)
      document.body.appendChild(link)
      link.click()
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
        this.$axios.post('/auth/order/find/pages=1', {
          aid: this.aid,
          father: '',
          status: '已反馈',
          grandfather: parseInt(this.input)
        }).then(successResponse => {
          console.log(successResponse.data.result.content)
          this.total = successResponse.data.result.totalElements
          this.tableData = successResponse.data.result.content
          this.page = 1
        }).catch(failResponse => {
          this.tableData = []
        })
      } else {
        this.$axios.post('/auth/order/find/pages=1', {
          aid: this.aid,
          father: parseInt(this.input),
          status: '已反馈',
          grandfather: ''
        }).then(successResponse => {
          console.log(successResponse.data.result.content)
          this.total = successResponse.data.result.totalElements
          this.tableData = successResponse.data.result.content
          this.page = 1
        }).catch(failResponse => {
          this.tableData = []
        })
      }
    },
    // handleEdit (row) {
    //   this.aid = row.id
    //   console.log(row.id)
    //   this.$router.push({
    //     path: '/feedbackmassage',
    //     query: {
    //       aid: this.aid
    //     }
    //   })
    // },
    handleCurrentChange (val) {
      this.page = val
      this.refreshtable()
    },
    refreshtable () {
      var url = '/auth/order/find/pages=' + this.page
      console.log(url)
      console.log(this.aid)
      this.$axios
        .post(url, {
          aid: this.aid,
          father: '',
          status: '已反馈',
          grandfather: ''
          // status: ''
        })
        .then(successResponse => {
          console.log(successResponse)
          if (successResponse.data.code === 200) {
            console.log(successResponse.data.result.totalElements)
            this.total = successResponse.data.result.totalElements
            this.tableData = successResponse.data.result.content
            console.log(this.tableData)
          }
        })
    },
    handleDelete (index, row) {
      console.log(index, row)
    },
    back () {
      this.$axios.get('/auth/myself').then(suresponse => {
        if (suresponse.data.code === 200) {
          this.role = suresponse.data.result.role
          console.log(this.role)
          if (this.role === 'super') {
            this.$router.push({
              path: '/feedback',
              query: {
                aid: this.aid
              }
            })
          }
          if (this.role === '学生' || this.role === '教师') {
            if (this.modea === 2) {
              this.$router.push({
                path: '/StuFeedback',
                query: {
                  aid: this.aid
                }
              })
            } else {
              this.$router.push({
                path: '/StuActivityDetailStu',
                query: {
                  aid: this.aid
                }
              })
            }
          }
          if (this.role === '学院') {
            this.$router.push({
              path: '/feedbackaca',
              query: {
                aid: this.aid
              }
            })
          }
          if (this.role === '学校') {
            this.$router.push({
              path: '/feedbackSch',
              query: {
                aid: this.aid
              }
            })
          }
        }
      })
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
