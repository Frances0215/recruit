<template>
  <body>
  <div style="margin-top: 15px;">
    <el-input placeholder="请输入内容" v-model="input3" class="input-with-select">
      <el-select v-model="select" slot="prepend" placeholder="请选择">
        <el-option label="活动名称" value="1"></el-option>
        <el-option label="学生姓名" value="2"></el-option>
        <el-option label="教师姓名" value="3"></el-option>
      </el-select>
      <el-button slot="append" icon="el-icon-search"></el-button>
    </el-input>
  </div>
  <el-table
    ref="multipleTable"
    :data="tableData"
    tooltip-effect="dark"
    style="width: 100%"
    @selection-change="handleSelectionChange">
    <el-table-column
      prop="id"
      label="活动ID"
      width="150">
    </el-table-column>
    <el-table-column
      prop="name"
      label="活动"
      width="150"
      show-overflow-tooltip>
    </el-table-column>
    <el-table-column
      prop="star_time"
      label="开始时间"
      width="150"
      show-overflow-tooltip>
    </el-table-column>
    <el-table-column
      prop="end_time"
      label="结束时间"
      width="150">
    </el-table-column>
    <el-table-column
      prop="tag1"
      label="活动类型"
      width="150"
      show-overflow-tooltip>
    </el-table-column>
    <el-table-column
      prop="join_num"
      label="参与人数"
      width="150"
      show-overflow-tooltip>
    </el-table-column>
    <el-table-column label="操作">
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
      tableData: [],
      multipleSelection: [],
      input3: '',
      select: '',
      currentPage: 1,
      total: 1,
      page: 1,
      role: ''
    }
  },
  methods: {
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
    refreshtable () {
      var url = '/no_authc/allactive/page=' + this.page
      console.log(url)
      this.$axios.get(url).then(successResponse => {
        if (successResponse.data.code === 200) {
          console.log(successResponse.data.result.totalElements)
          this.total = successResponse.data.result.totalElements
          this.tableData = successResponse.data.result.content
          console.log(this.tableData)
        }
      })
        .catch(failResponse => {
        })
    },
    handleDelete (index, row) {
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
