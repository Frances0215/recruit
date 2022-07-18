<template>
  <body>
  <el-button slot="append" style='float: left;margin-bottom: 10px' v-on:click="back" icon="el-icon-arrow-left"></el-button>
  <div>
    <el-input placeholder="请输入内容" v-model="input3" class="input-with-select">
      <el-select v-model="select" slot="prepend" placeholder="请选择">
        <el-option label="活动名称" value="1"></el-option>
        <el-option label="学生姓名" value="2"></el-option>
        <el-option label="教师姓名" value="3"></el-option>
      </el-select>
      <el-button slot="append" icon="el-icon-search"></el-button>
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
      prop="aid"
      label="活动名称"
      width="150">
    </el-table-column>
    <el-table-column
      prop="id"
      label="参与者"
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
      input3: '',
      select: '',
      currentPage: 1,
      total: 1,
      page: 1,
      father: '',
      status: '',
      grandfather: '',
      aid: '',
      role: ''
    }
  },
  methods: {
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
          status: '',
          grandfather: ''
          // status: ''
        })
        .then(successResponse => {
          console.log(successResponse)
          if (successResponse.data.code === 200) {
            console.log(successResponse.data.result.totalElements)
            this.total = successResponse.data.result.totalElements
            this.id = successResponse.data.result.id
            this.desc_ = successResponse.data.result.desc_
            console.log(this.id, this.desc_)
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
            this.$router.push({
              path: '/StuActivityDetail',
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
