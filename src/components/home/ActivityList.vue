<template>
  <div>
    <el-carousel :interval="4000" type="card" height="200px">
      <el-carousel-item v-for="item in 6" :key="item">
        <h3 class="medium">{{ item }}</h3>
      </el-carousel-item>
    </el-carousel>
  <div id="divNumber">
    <div class="block" style="width: 25%">
      <p class="demonstration">全部活动</p>
      <p class="demonstration">8个</p>
    </div>
    <el-divider direction="vertical" style="height: 100%" content-position="center"></el-divider>
    <div class="block" style="width: 25%">
      <p class="demonstration">未开始</p>
      <p class="demonstration">0个</p>
    </div>
    <el-divider direction="vertical"></el-divider>
    <div class="block" style="width: 25%">
      <p class="demonstration">报名中</p>
      <p class="demonstration">0个</p>
    </div>
    <el-divider direction="vertical"></el-divider>
    <div class="block" style="width: 25%">
      <p class="demonstration">活动中</p>
      <p class="demonstration">3个</p>
    </div>
  </div>
<!--    <div id="divSelect">-->
<!--      <el-select v-model="value" placeholder="请选择地区">-->
<!--        <el-option-->
<!--          v-for="item in cities"-->
<!--          :key="item.value"-->
<!--          :label="item.label"-->
<!--          :value="item.value">-->
<!--          <span style="float: left">{{ item.label }}</span>-->
<!--          <span style="float: right; color: #8492a6; font-size: 13px">{{ item.value }}</span>-->
<!--        </el-option>-->
<!--      </el-select>-->
<!--      <el-select v-model="value" placeholder="请选择学校" style="margin-left: 10px">-->
<!--        <el-option-->
<!--          v-for="item in cities"-->
<!--          :key="item.value"-->
<!--          :label="item.label"-->
<!--          :value="item.value">-->
<!--          <span style="float: left">{{ item.label }}</span>-->
<!--          <span style="float: right; color: #8492a6; font-size: 13px">{{ item.value }}</span>-->
<!--        </el-option>-->
<!--      </el-select>-->
<!--      <el-select v-model="value" placeholder="选择活动类型" style="margin-left: 10px">-->
<!--        <el-option-->
<!--          v-for="item in cities"-->
<!--          :key="item.value"-->
<!--          :label="item.label"-->
<!--          :value="item.value">-->
<!--          <span style="float: left">{{ item.label }}</span>-->
<!--          <span style="float: right; color: #8492a6; font-size: 13px">{{ item.value }}</span>-->
<!--        </el-option>-->
<!--      </el-select>-->
<!--      <div class="block" style="margin-left: 10px">-->
<!--        <el-date-picker-->
<!--          v-model="value2"-->
<!--          type="daterange"-->
<!--          align="right"-->
<!--          unlink-panels-->
<!--          range-separator="至"-->
<!--          start-placeholder="活动开始日期"-->
<!--          end-placeholder="活动结束日期"-->
<!--          :picker-options="pickerOptions2">-->
<!--        </el-date-picker>-->
<!--      </div>-->
<!--      <div class="block" style="margin-left: 10px">-->
<!--        <el-date-picker-->
<!--          v-model="value2"-->
<!--          type="daterange"-->
<!--          align="right"-->
<!--          unlink-panels-->
<!--          range-separator="至"-->
<!--          start-placeholder="报名开始日期"-->
<!--          end-placeholder="报名结束日期"-->
<!--          :picker-options="pickerOptions2">-->
<!--        </el-date-picker>-->
<!--      </div>-->
<!--      <el-select v-model="value" placeholder="参与对象" style="margin-left: 10px">-->
<!--        <el-option-->
<!--          v-for="item in cities"-->
<!--          :key="item.value"-->
<!--          :label="item.label"-->
<!--          :value="item.value">-->
<!--          <span style="float: left">{{ item.label }}</span>-->
<!--          <span style="float: right; color: #8492a6; font-size: 13px">{{ item.value }}</span>-->
<!--        </el-option>-->
<!--      </el-select>-->
<!--    </div>-->
    <div id="divSearch">
      <el-select v-model="value" placeholder="请选择学校" style="margin-right: 10px">
        <el-option
          v-for="item in cities"
          :key="item.value"
          :label="item.label"
          :value="item.value">
          <span style="float: left">{{ item.label }}</span>
          <span style="float: right; color: #8492a6; font-size: 13px">{{ item.value }}</span>
        </el-option>
      </el-select>
      <el-input
        placeholder="请输入内容"
        v-model="input"
        clearable
      style="width: 400px">
      </el-input>
      <el-button type="primary" style="margin-left: 10px">查询</el-button>
      <el-button type="danger">重置</el-button>
      <el-button type="primary">导出表格</el-button>
    </div>
    <div>
      <el-table
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange">
        <el-table-column
          prop="id"
          label="活动ID"
          width="120">
        </el-table-column>
        <el-table-column
          prop="name"
          label="活动名称"
          width="120">
        </el-table-column>
        <el-table-column
          prop="star_time"
          label="开始时间"
          width="120">
        </el-table-column>
        <el-table-column
          prop="end_time"
          label="结束时间"
          width="120">
        </el-table-column>
        <el-table-column
          prop="enroll_time"
          label="报名时间"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="tag2"
          label="进行方式"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="tag1"
          label="活动类型"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="place"
          label="活动地区"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="limit_"
          label="参与对象"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="join_num"
          label="参与数"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          label="操作"
          width="100">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
            <el-button type="text" size="small">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      pickerOptions: {
        shortcuts: [{
          text: '今天',
          onClick (picker) {
            picker.$emit('pick', new Date())
          }
        }, {
          text: '昨天',
          onClick (picker) {
            const date = new Date()
            date.setTime(date.getTime() - 3600 * 1000 * 24)
            picker.$emit('pick', date)
          }
        }, {
          text: '一周前',
          onClick (picker) {
            const date = new Date()
            date.setTime(date.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', date)
          }
        }]
      },
      value1: '',
      value2: '',
      value3: '',
      cities: [{
        value: 'Beijing',
        label: '北京'
      }, {
        value: 'Shanghai',
        label: '上海'
      }, {
        value: 'Nanjing',
        label: '南京'
      }, {
        value: 'Chengdu',
        label: '成都'
      }, {
        value: 'Shenzhen',
        label: '深圳'
      }, {
        value: 'Guangzhou',
        label: '广州'
      }],
      pickerOptions2: {
        shortcuts: [{
          text: '最近一周',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近一个月',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近三个月',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
            picker.$emit('pick', [start, end])
          }
        }]
      },
      tableData: [{
        name: '',
        theme: '',
        join_num: '',
        actTime: '',
        type: '',
        reviewer_users: [{}],
        address: ''
      }],
      // tableData: [{
      //   name: '学子家乡行',
      //   actTime: '2022-07-20至2022-08-21',
      //   regiTime: '2022-07-01至2022-07-08',
      //   type: '线下/校外活动',
      //   address: '四川省成都市',
      //   people: '学生',
      //   studentNum: '80/100'
      // }, {
      //   name: '学子家乡行',
      //   actTime: '2022-07-20至2022-08-21',
      //   regiTime: '2022-07-01至2022-07-08',
      //   type: '线下/校外活动',
      //   address: '四川省成都市',
      //   people: '学生',
      //   studentNum: '80/100'
      // }, {
      //   name: '学子家乡行',
      //   actTime: '2022-07-20至2022-08-21',
      //   regiTime: '2022-07-01至2022-07-08',
      //   type: '线下/校外活动',
      //   address: '四川省成都市',
      //   people: '学生',
      //   studentNum: '80/100'
      // }, {
      //   name: '学子家乡行',
      //   actTime: '2022-07-20至2022-08-21',
      //   regiTime: '2022-07-01至2022-07-08',
      //   type: '线下/校外活动',
      //   address: '四川省成都市',
      //   people: '学生',
      //   studentNum: '80/100'
      // }, {
      //   name: '学子家乡行',
      //   actTime: '2022-07-20至2022-08-21',
      //   regiTime: '2022-07-01至2022-07-08',
      //   type: '线下/校外活动',
      //   address: '四川省成都市',
      //   people: '学生',
      //   studentNum: '80/100'
      // }, {
      //   name: '学子家乡行',
      //   actTime: '2022-07-20至2022-08-21',
      //   regiTime: '2022-07-01至2022-07-08',
      //   type: '线下/校外活动',
      //   address: '四川省成都市',
      //   people: '学生',
      //   studentNum: '80/100'
      // }, {
      //   name: '学子家乡行',
      //   actTime: '2022-07-20至2022-08-21',
      //   regiTime: '2022-07-01至2022-07-08',
      //   type: '线下/校外活动',
      //   address: '四川省成都市',
      //   people: '学生',
      //   studentNum: '80/100'
      // }],
      value: ''
    }
  },
  mounted: function () {
    this.loadActive()
  },
  methods: {
    loadActive () {
      var _this = this
      this.$axios.get('/no_authc/allactive/page=1').then(resp => {
        if (resp && resp.data.code === 200) {
          _this.tableData = resp.data.result.content
          console.log(this.tableData)
        }
      })
    }
  }
}
</script>
<style>
#divNumber{
  display: flex;
  flex-wrap: nowrap;
  border:solid 1px #F2F6FC;
  border-radius: 2px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}
.block{
  vertical-align: middle;
}
#divSelect{
  display: flex;
  flex-wrap: nowrap;
  margin-top: 10px;
}
#divSearch{
  display: flex;
  flex-wrap: nowrap;
  margin-top: 10px;
}
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
</style>
