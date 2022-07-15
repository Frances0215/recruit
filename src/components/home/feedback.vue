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
    <!--    <el-table-header>-->
    <!--      <el-button size="mini"-->
    <!--                 @click="handleEdit(scope.$index, scope.row)" type="success" round>成功按钮</el-button>-->
    <!--      <el-button type="danger" round>危险按钮</el-button>-->
    <!--    </el-table-header>-->
    <el-table-column
      type="selection"
      width="55">
    </el-table-column>
    <el-table-column
      label="申请日期"
      width="180">
      <template slot-scope="scope">
        <i class="el-icon-time"></i>
        <span style="margin-left: 10px">{{ scope.row.date }}</span>
      </template>
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
      label="身份"
      width="180">
      <template slot-scope="scope">
        <!--        <i class="el-icon-user-solid"></i>-->
        <span style="margin-left: 10px">{{ scope.row.typee }}</span>
      </template>
    </el-table-column>
    <el-table-column
      label="活动"
      width="180">
      <template slot-scope="scope">
        <el-popover trigger="hover" placement="top">
          <p>活动名称: {{ scope.row.activity }}</p>
          <p>举办地址: {{ scope.row.activityAddress }}</p>
          <div slot="reference" class="name-wrapper">
            <!--            <i class="el-icon-s-flag"></i>-->
            <el-tag size="medium">{{ scope.row.activity }}</el-tag>
          </div>
        </el-popover>
      </template>
    </el-table-column>
    <el-table-column
      label="活动状态"
      width="180">
      <template slot-scope="scope">
        <i class="el-icon-video-pause"></i>
        <span style="margin-left: 10px">{{ scope.row.statuss }}</span>
      </template>
    </el-table-column>
    <el-table-column
      label="活动学生剩余名额"
      width="180">
      <template slot-scope="scope">
        <i class="el-icon-circle-check"></i>
        <span style="margin-left: 10px">{{ scope.row.restS }}</span>
      </template>
    </el-table-column>
    <el-table-column
      label="活动教师剩余名额"
      width="180">
      <template slot-scope="scope">
        <i class="el-icon-circle-check"></i>
        <span style="margin-left: 10px">{{ scope.row.restT }}</span>
      </template>
    </el-table-column>
    <!--    <el-table-column label="审批">-->
    <!--      <template slot-scope="scope">-->
    <!--        <el-button-->
    <!--          size="mini"-->
    <!--          @click="handleEdit(scope.$index, scope.row)">通过</el-button>-->
    <!--        <el-button-->
    <!--          size="mini"-->
    <!--          type="danger"-->
    <!--          @click="handleDelete(scope.$index, scope.row)">不通过</el-button>-->
    <!--      </template>-->
    <!--    </el-table-column>-->
  </el-table>
  <div class="block" style="margin-top: 10px">
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage4"
      :page-sizes="[100, 200, 300, 400]"
      :page-size="100"
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
export default {
  data () {
    return {
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄',
        activity: '寝室文化节',
        activityAddress: '四川大学江安校区',
        restS: '2',
        restT: '3',
        statuss: '报名阶段',
        typee: '学生'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        activity: '寝室文化节',
        activityAddress: '四川大学江安校区',
        address: '上海市普陀区金沙江路 1517 弄',
        restS: '2',
        restT: '3',
        statuss: '报名阶段',
        typee: '学生'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        activity: '寝室文化节',
        activityAddress: '四川大学江安校区',
        address: '上海市普陀区金沙江路 1519 弄',
        restS: '2',
        restT: '3',
        statuss: '报名阶段',
        typee: '学生'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        activity: '寝室文化节',
        activityAddress: '四川大学江安校区',
        address: '上海市普陀区金沙江路 1516 弄',
        restS: '2',
        restT: '3',
        statuss: '报名阶段',
        typee: '学生'
      }],
      multipleSelection: [],
      input3: '',
      select: '',
      currentPage4: 1
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
