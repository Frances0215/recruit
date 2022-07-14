<template>
  <el-table
    :data="tableData"
    style="width: 100%">
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
            <el-tag size="medium">{{ scope.row.name }}</el-tag>
          </div>
        </el-popover>
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
            <i class="el-icon-s-flag"></i>
            <el-tag size="medium">{{ scope.row.activity }}</el-tag>
          </div>
        </el-popover>
      </template>
    </el-table-column>
    <el-table-column
      label="活动状态"
      width="180">
      <template slot-scope="scope">
        <i class="el-icon-time"></i>
        <span style="margin-left: 10px">{{ scope.row.statuss }}</span>
      </template>
    </el-table-column>
    <el-table-column
      label="活动剩余人数"
      width="180">
      <template slot-scope="scope">
        <i class="el-icon-time"></i>
        <span style="margin-left: 10px">{{ scope.row.rest }}</span>
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
</template>

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
        rest: '2',
        statuss: '报名阶段'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        activity: '寝室文化节',
        activityAddress: '四川大学江安校区',
        address: '上海市普陀区金沙江路 1517 弄',
        rest: '2',
        statuss: '报名阶段'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        activity: '寝室文化节',
        activityAddress: '四川大学江安校区',
        address: '上海市普陀区金沙江路 1519 弄',
        rest: '2',
        statuss: '报名阶段'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        activity: '寝室文化节',
        activityAddress: '四川大学江安校区',
        address: '上海市普陀区金沙江路 1516 弄',
        rest: '2',
        statuss: '报名阶段'
      }]
    }
  },
  methods: {
    handleEdit (index, row) {
      console.log(index, row)
    },
    handleDelete (index, row) {
      console.log(index, row)
    }
  }
}
</script>
