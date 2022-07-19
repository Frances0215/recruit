<template>
  <body>
<!--  <div style="margin-top: 15px;">-->
<!--    <el-input placeholder="请输入内容" v-model="input" class="input-with-select">-->
<!--      <el-select v-model="value" slot="prepend" placeholder="请选择">-->
<!--        <el-option label="待审核活动ID" value="2"></el-option>-->
<!--        <el-option label="报名学生/老师ID" value="1"></el-option>-->
<!--      </el-select>-->
<!--      <el-button slot="append" @click="searcht" icon="el-icon-search"></el-button>-->
<!--      <el-button slot="append" type="danger" @click="clear" icon="el-icon-refresh-left">重置</el-button>&ndash;&gt;-->
<!--    </el-input>-->
<!--  </div>-->
  <!--  <el-row style="margin-top: 10px">-->
  <!--      <el-button size="mini"-->
  <!--                 @click="handleEdit(scope.$index, scope.row)"-->
  <!--                 style="float: left"-->
  <!--                 type="danger" round>删除记录</el-button>-->
  <!--  </el-row>-->
  <el-table
    ref="multipleTable"
    :data="tableData"
    tooltip-effect="dark"
    style="width: 100%"
    @selection-change="handleSelectionChange">
    <!--    <el-table-column-->
    <!--      type="selection"-->
    <!--      width="55">-->
    <!--    </el-table-column>-->
    <!--    <el-table-column-->
    <!--      label="审批日期"-->
    <!--      width="180">-->
    <!--      <template slot-scope="scope">-->
    <!--        <i class="el-icon-time"></i>-->
    <!--        <span style="margin-left: 10px">{{ scope.row.date }}</span>-->
    <!--      </template>-->
    <!--    </el-table-column>-->
    <!--    <el-table-column-->
    <!--      label="申请日期"-->
    <!--      width="180">-->
    <!--      <template slot-scope="scope">-->
    <!--        <i class="el-icon-time"></i>-->
    <!--        <span style="margin-left: 10px">{{ scope.row.date }}</span>-->
    <!--      </template>-->
    <!--    </el-table-column>-->
    <!--    <el-table-column-->
    <!--      label="姓名"-->
    <!--      width="180">-->
    <!--      <template slot-scope="scope">-->
    <!--        <el-popover trigger="hover" placement="top">-->
    <!--          <p>姓名: {{ scope.row.name }}</p>-->
    <!--          <p>住址: {{ scope.row.address }}</p>-->
    <!--          <div slot="reference" class="name-wrapper">-->
    <!--            &lt;!&ndash;            <i class="el-icon-user"></i>&ndash;&gt;-->
    <!--            <el-tag size="medium">{{ scope.row.name }}</el-tag>-->
    <!--          </div>-->
    <!--        </el-popover>-->
    <!--      </template>-->
    <!--    </el-table-column>-->
    <!--    <el-table-column-->
    <!--      label="身份"-->
    <!--      width="180">-->
    <!--      <template slot-scope="scope">-->
    <!--        <span style="margin-left: 10px">{{ scope.row.typee }}</span>-->
    <!--      </template>-->
    <!--    </el-table-column>-->
    <!--    <el-table-column-->
    <!--      label="活动"-->
    <!--      width="180">-->
    <!--      <template slot-scope="scope">-->
    <!--        <el-popover trigger="hover" placement="top">-->
    <!--          <p>活动名称: {{ scope.row.activity }}</p>-->
    <!--          <p>举办地址: {{ scope.row.activityAddress }}</p>-->
    <!--          <div slot="reference" class="name-wrapper">-->
    <!--            &lt;!&ndash;            <i class="el-icon-s-flag"></i>&ndash;&gt;-->
    <!--            <el-tag size="medium">{{ scope.row.activity }}</el-tag>-->
    <!--          </div>-->
    <!--        </el-popover>-->
    <!--      </template>-->
    <!--    </el-table-column>-->
    <!--    <el-table-column-->
    <!--      label="活动状态"-->
    <!--      width="180">-->
    <!--      <template slot-scope="scope">-->
    <!--        <i class="el-icon-video-pause"></i>-->
    <!--        <span style="margin-left: 10px">{{ scope.row.statuss }}</span>-->
    <!--      </template>-->
    <!--    </el-table-column>-->
    <!--    <el-table-column-->
    <!--      label="审批结果"-->
    <!--      width="180">-->
    <!--      <template slot-scope="scope">-->
    <!--        <i class="el-icon-circle-check"></i>-->
    <!--        <span style="margin-left: 10px">{{ scope.row.result }}</span>-->
    <!--      </template>-->
    <!--    </el-table-column>-->
    <!--    <el-table-column-->
    <!--      prop="active.id"-->
    <!--      label="活动ID"-->
    <!--      width="120"-->
    <!--      show-overflow-tooltip>-->
    <!--    </el-table-column>-->
    <el-table-column
      prop="id"
      label="用户ID"
      width="120"
      show-overflow-tooltip>
    </el-table-column>
    <el-table-column
      prop="username"
      label="姓名"
      width="120"
      show-overflow-tooltip>
      <!--      <template slot-scope="scope">-->
      <!--        <el-popover trigger="hover" placement="top">-->
      <!--          <p>姓名: {{ scope.row.name }}</p>-->
      <!--          <p>住址: {{ scope.row.address }}</p>-->
      <!--          <div slot="reference" class="name-wrapper">-->
      <!--&lt;!&ndash;            <i class="el-icon-user"></i>&ndash;&gt;-->
      <!--            <el-tag size="medium">{{ scope.row.name }}</el-tag>-->
      <!--          </div>-->
      <!--        </el-popover>-->
      <!--      </template>-->
    </el-table-column>
    <el-table-column
      prop="phone"
      label="联系方式"
      width="120"
      show-overflow-tooltip>
    </el-table-column>
    <el-table-column
      prop="email"
      label="邮箱"
      width="120"
      show-overflow-tooltip>
    </el-table-column>
    <el-table-column
      prop="role"
      label="身份"
      width="120"
      show-overflow-tooltip>
    </el-table-column>
    <el-table-column
      prop="father"
      label="学院"
      width="120"
      show-overflow-tooltip>
    </el-table-column>
    <el-table-column
      prop="garde"
      label="绩点"
      width="120"
      show-overflow-tooltip>
    </el-table-column>
    <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button
          size="mini"
          v-on:click="handleEdit(scope.row)">重置密码
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
export default {
  mounted: function () {
    this.refreshtable()
  },
  detail: {name: 'd'},
  data () {
    return {
      tableData: [],
      tableData1: [],
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
      currentPage4: 1,
      select: '',
      currentPage: 1,
      total: 1,
      page: 1,
      role: '',
      mode: 1,
      activename: '',
      publisher: '',
      username: '',
      id: '',
      usernameuser: '',
      ids: [],
      sels: [],
      orders: [],
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
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
    },
    searcht () {
      this.mode = 2
      // console.log(this.input)
      if (this.value === '1') {
        console.log('3')
        this.$axios.post('/admin/userjoin/pages=1', {
          uid: parseInt(this.input),
          status: ''
        }).then(successResponse => {
          console.log('success')
          console.log(successResponse.data.result.content)
          this.total = successResponse.data.result.totalElements
          this.tableData = successResponse.data.result.content
          this.page = 1
        }).catch(failResponse => {
          this.tableData = []
        })
      } else {
        console.log(this.value)
        this.$axios.post('/admin/order/find/pages=1', {
          aid: parseInt(this.input),
          father: '',
          status: '',
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
    handleEdit (row) {
      this.usernameuser = row.username
      // console.log(this.usernameuser)
      this.$axios.put('/admin/user/password', {
        username: 'scu小明'
      }).then(srps => {
        // console.log(this.usernameuser)
        console.log(this.usernameuser)
        console.log(srps.data.result)
        this.$alert(srps.data.result, '重置密码', {
          confirmButtonText: '确定'
          // callback: action => {
          //   this.$message({
          //     type: 'info',
          //     // message: `action: $ { action }`
          //   })
          // }
        })
      })
    },
    handleCurrentChange (val) {
      this.page = val
      this.refreshtable()
    },
    handleDelete (index, row) {
      console.log(index, row)
    },
    refreshtable () {
      this.$axios.get('/auth/myself').then(suresponse => {
        this.username = suresponse.data.result.username
        console.log(this.username)
        var url = '/admin/user/grandfather/page=' + this.page
        // console.log(this.username)
        this.$axios.post(url, {
          grandfather: this.username
        }).then(successResponse => {
          if (successResponse.data.code === 200) {
            console.log(successResponse.data.result.totalElements)
            this.total = successResponse.data.result.totalElements
            this.tableData = successResponse.data.result.content
            // this.activename = successResponse.data.result.content.active.name
            console.log(successResponse.data.result.content)
          }
        })
          .catch(failResponse => {
          })
      })
      // var url = '/admin/user/grandfather/page=' + this.page
      // console.log(this.username)
      // this.$axios.post(url, {
      //   grandfather: '四川大学'
      // }).then(successResponse => {
      //   if (successResponse.data.code === 200) {
      //     console.log(successResponse.data.result.totalElements)
      //     this.total = successResponse.data.result.totalElements
      //     this.tableData = successResponse.data.result.content
      //     // this.activename = successResponse.data.result.content.active.name
      //     console.log(successResponse.data.result.content)
      //   }
      // })
      //   .catch(failResponse => {
      //   })
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
