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
      label="下载图片"
      width="150"
      show-overflow-tooltip>
    </el-table-column>
    <el-table-column
      label="下载附件"
      width="150"
      show-overflow-tooltip>
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
    console.log(this.aid)
    this.refreshtable()
  },
  detail: {name: 'd'},
  data () {
    return {
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
    clear () {
      this.mode = 1
      this.page = 1
      this.refreshtable()
    },
    searcht () {
      this.mode = 2
      console.log(this.input)
      if (this.value === '1') {
        this.$axios.post('/admin/order/find/pages=1', {
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
        this.$axios.post('/admin/order/find/pages=1', {
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
      var url = '/admin/order/find/pages=' + this.page
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
