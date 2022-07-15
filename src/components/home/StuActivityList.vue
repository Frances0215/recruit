<template>
  <div>
    <el-carousel :interval="4000" type="card" height="200px">
      <el-carousel-item v-for="item in 6" :key="item">
        <h3 class="medium">{{ item }}</h3>
      </el-carousel-item>
    </el-carousel>
    <el-table
      ref="multipleTable"
      :data="tableData"
      tooltip-effect="dark"
      style="width: 100%"
      @selection-change="handleSelectionChange">
      <el-table-column
        prop="name"
        label="活动名称"
        width="120">
      </el-table-column>
      <el-table-column
        prop="date"
        label="活动时间"
        width="120">
      </el-table-column>
      <el-table-column
        prop="time"
        label="报名时间"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="type"
        label="活动类型"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="address"
        label="活动地区"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="partner"
        label="参与对象"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="num"
        label="参与数"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        width="100">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="text" size="small">查看详情</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div style="margin-top: 20px">
      <el-button @click="toggleSelection([tableData[1], tableData[2]])">切换第二、第三行的选中状态</el-button>
      <el-button @click="toggleSelection()">取消选择</el-button>
    </div>
    <el-descriptions title="用户信息">
      <el-descriptions-item label="用户名" ref="ename">kooriookami</el-descriptions-item>
      <el-descriptions-item label="手机号" ref="edate">18100000000</el-descriptions-item>
      <el-descriptions-item label="居住地">苏州市</el-descriptions-item>
      <el-descriptions-item label="备注">
        <el-tag size="small">学校</el-tag>
      </el-descriptions-item>
      <el-descriptions-item label="联系地址">江苏省苏州市吴中区吴中大道 1188 号</el-descriptions-item>
    </el-descriptions>
  </div>

</template>

<script>
/* eslint-disable */
export default {
  data () {
    var tabledata = []
    this.$axios.get('/auth/can_join/page=1').then(successResponse => {
      if (successResponse.data.code === 200) {
        successResponse.data.result.content.forEach(function (item) {
          var act = {name: item.name, date: item.creat_time}
          tabledata.push(act)
        })
        console.log(tabledata)
      }
    })
      .catch(failResponse => {
      })
    return {
      tableData: tabledata, multipleSelection: []
    }
  },

  methods: {
    handleClick(row) {
      console.log();

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
}
</script>

<style>
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n+1) {
  background-color: #d3dce6;
}

.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both
}

.box-card {
  width: 480px;
}
</style>
