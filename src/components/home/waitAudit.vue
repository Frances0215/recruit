<template>
  <body>
  <div style="margin-top: 15px;">
    <el-input placeholder="请输入内容" v-model="input" class="input-with-select">
      <el-select v-model="select" slot="prepend" placeholder="请选择">
        <el-option label="活动名称" value="2"></el-option>
        <el-option label="发布用户" value="1"></el-option>
      </el-select>
      <el-button slot="append" @click="searcht" icon="el-icon-search"></el-button>
      <el-button slot="append" type="danger" @click="clear" icon="el-icon-refresh-left">重置</el-button>-->
    </el-input>
  </div>
  <el-row style="margin-top: 10px">
      <el-button size="mini"
                 @click="handleEdit(scope.$index, scope.row)"
                 style="float: left"
                 type="success" round>审核通过</el-button>
      <el-button size="mini"
                 @click="handleEdit(scope.$index, scope.row)"
                 style="float: left"
                 type="danger" round>审核不通过</el-button>
  </el-row>
  <el-table
    ref="multipleTable"
    :data="tableData"
    tooltip-effect="dark"
    style="width: 100%"
    @selection-change="handleSelectionChange">
    <el-table-column
      type="selection"
      width="55">
    </el-table-column>
    <el-table-column
      label="申请日期"
      width="180"
      show-overflow-tooltip>
    </el-table-column>
    <el-table-column
      label="姓名"
      width="180">
      <template slot-scope="scope">
        <el-popover trigger="hover" placement="top">
          <p>姓名: {{ scope.row.name }}</p>
          <p>住址: {{ scope.row.address }}</p>
          <div slot="reference" class="name-wrapper">
<!--            <i class="el-icon-user"></i>-->
            <el-tag size="medium">{{ scope.row.name }}</el-tag>
          </div>
        </el-popover>
      </template>
    </el-table-column>
    <el-table-column
      prop="status"
      label="报名状态"
      width="180"
      show-overflow-tooltip>
    </el-table-column>
    <el-table-column
      label="身份"
      width="180"
      show-overflow-tooltip>
    </el-table-column>
    <el-table-column
      label="活动"
      width="180">
      <template slot-scope="scope">
        <el-popover trigger="hover" placement="top">
          <p>活动名称: {{ scope.row.activity }}</p>
          <p>举办地址: {{ scope.row.activityAddress }}</p>
          <div slot="reference" class="name-wrapper">
            <el-tag size="medium">{{ scope.row.activity }}</el-tag>
          </div>
        </el-popover>
      </template>
    </el-table-column>
    <el-table-column
      label="活动状态"
      width="180"
      show-overflow-tooltip>
    </el-table-column>
    <el-table-column
      label="活动总名额"
      width="180"
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
    this.refreshtable()
  },
  detail: {name: 'd'},
  data () {
    return {
      tableData: [],
      multipleSelection: [],
      input: '',
      date: '',
      name: '',
      address: '',
      activity: '',
      activityAddress: '',
      restS: '',
      statuss: '',
      typee: '',
      status: '',
      input3: '',
      currentPage4: 1,
      select: '',
      currentPage: 1,
      total: 1,
      page: 1,
      role: '',
      mode: 1,
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
    clear () {
      this.mode = 1
      this.page = 1
      this.refreshtable()
    },
    searcht () {
      this.mode = 2
      console.log(this.input)
      if (this.value === 1) {
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
    handleDelete (index, row) {
      console.log(index, row)
    },
    handleCurrentChange (val) {
      this.page = val
      this.refreshtable()
    },
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
    },
    handleEdit (index, row) {
      console.log(index, row)
    },
    refreshtable () {
      var url = '/auth/order/deed_audit/pages=' + this.page
      console.log(url)
      this.$axios.post(url, {
        status: '审核中'
      }).then(successResponse => {
        if (successResponse.data.code === 200) {
          console.log(successResponse.data.result.totalElements)
          this.total = successResponse.data.result.totalElements
          this.tableData = successResponse.data.result.content
          console.log(this.tableData)
        }
      })
        .catch(failResponse => {
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
