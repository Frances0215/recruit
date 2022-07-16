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
<!--  <el-row style="margin-top: 10px">-->
<!--    <el-button size="mini"-->
<!--               @click="handleEdit(scope.$index, scope.row)"-->
<!--               style="float: left"-->
<!--               type="success" round>审核通过</el-button>-->
<!--    <el-button size="mini"-->
<!--               @click="handleEdit(scope.$index, scope.row)"-->
<!--               style="float: left"-->
<!--               type="danger" round>删除记录</el-button>-->
<!--  </el-row>-->
  <el-table
    ref="multipleTable"
    :data="tableData"
    tooltip-effect="dark"
    style="width: 100%">
<!--    @selection-change="handleSelectionChange">-->
    <!--    <el-table-header>-->
    <!--      <el-button size="mini"-->
    <!--                 @click="handleEdit(scope.$index, scope.row)" type="success" round>成功按钮</el-button>-->
    <!--      <el-button type="danger" round>危险按钮</el-button>-->
    <!--    </el-table-header>-->
    <el-table-column
      prop="id"
      label="活动ID"
      width="150">
    </el-table-column>
    <el-table-column
      prop="pageSize"
      label="活动"
      width="150"
      show-overflow-tooltip>
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
    </el-table-column>
<!--    <el-table-column-->
<!--      type="selection"-->
<!--      width="55">-->
<!--    </el-table-column>-->
    <el-table-column
      prop="star_time"
      label="开始时间"
      width="150"
      show-overflow-tooltip>
<!--      <template slot-scope="scope">-->
<!--        <i class="el-icon-time"></i>-->
<!--        <span style="margin-left: 10px">{{ scope.row.date }}</span>-->
<!--      </template>-->
    </el-table-column>
    <el-table-column
      prop="end_time"
      label="结束时间"
      width="150">
    </el-table-column>
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
    <el-table-column
      prop="tag1"
      label="活动类型"
      width="150"
      show-overflow-tooltip>
<!--      <template slot-scope="scope">-->
<!--        <i class="el-icon-video-pause"></i>-->
<!--        <span style="margin-left: 10px">{{ scope.row.statuss }}</span>-->
<!--      </template>-->
    </el-table-column>
    <el-table-column
      prop="join_num"
      label="参与人数"
      width="150"
      show-overflow-tooltip>
<!--      <template slot-scope="scope">-->
<!--        &lt;!&ndash;        <i class="el-icon-user-solid"></i>&ndash;&gt;-->
<!--        <span style="margin-left: 10px">{{ scope.row.num }}</span>-->
<!--      </template>-->
    </el-table-column>
<!--    <el-table-column-->
<!--      label="活动学生剩余名额"-->
<!--      width="180">-->
<!--      <template slot-scope="scope">-->
<!--        <i class="el-icon-circle-check"></i>-->
<!--        <span style="margin-left: 10px">{{ scope.row.restS }}</span>-->
<!--      </template>-->
<!--    </el-table-column>-->
<!--    <el-table-column-->
<!--      label="已提交反馈份数"-->
<!--      width="180">-->
<!--      <template slot-scope="scope">-->
<!--        <i class="el-icon-circle-check"></i>-->
<!--        <span style="margin-left: 10px">{{ scope.row.submit}}</span>-->
<!--      </template>-->
<!--    </el-table-column>-->
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleEdit(scope.$index, scope.row)">查看反馈</el-button>
            <el-button
              size="mini"
              @click="handleDelete(scope.$index, scope.row)">编辑活动总结</el-button>
          </template>
        </el-table-column>
  </el-table>
  <div class="block" style="margin-top: 10px">
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="10"
      layout="total, sizes, prev, pager, next, jumper"
      :total="400">
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
  detail: {name: 'd'},
  data () {
    this.$axios.get('/no_authc/allactive').then(successResponse => {
      if (successResponse.data.code === 200) {
        this.tableData = successResponse.data.result.content
        console.log(this.tableData)
      }
    })
      .catch(failResponse => {
      })
    return {
      tableData: [],
      multipleSelection: [],
      input3: '',
      select: '',
      currentPage: 1
    }
  },
  methods: {
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
    },
    handleEdit (index, row) {
      console.log(index, row)
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
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
