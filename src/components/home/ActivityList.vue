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
      <el-input placeholder="请输入内容" v-model="input" class="input-with-select" clearable>
        <el-select v-model="value" slot="prepend" placeholder="请选择">
          <el-option label="活动名称" value="2"></el-option>
          <el-option label="发布用户" value="1"></el-option>
        </el-select>
        <el-button slot="append" @click="searcht" icon="el-icon-search"></el-button>
        <el-button slot="append" type="danger" @click="clear" icon="el-icon-refresh-left">重置</el-button>-->
      </el-input>
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
    <div class="block">
      <el-pagination
        @current-change="pagehandle"
        layout="prev, pager, next"
        :total=this.total
        :current-page=this.page
      >
      </el-pagination>
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
      options: [{
        value: '1',
        label: '发布者'
      }, {
        value: '2',
        label: '活动名'
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
      value: '',
      size: '',
      src: '',
      total: 1,
      page: 1,
      input: '',
      mode: 1
    }
  },
  mounted: function () {
    this.refreshtable()
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
    },
    clear () {
      this.mode = 1
      this.page = 1
      this.refreshtable()
    },
    pagehandle (val) {
      this.page = val
      if (this.mode === 1) {
        this.refreshtable()
      } else {
        this.searchnext()
      }
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
    searcht () {
      this.mode = 2
      // console.log(this.input)
      if (this.value === 1) {
        this.$axios.post('/no-authc/publisher/page=1', {publisher: this.input}).then(successResponse => {
          console.log(successResponse.data.result.content)
          this.tableData = successResponse.data.result.content
          this.total = this.total = successResponse.data.result.totalElements
          this.page = 1
        }).catch(failResponse => {
          this.tableData = []
        })
      } else {
        this.$axios.post('/no-authc/name/page=1', {name: this.input}).then(successResponse => {
          console.log(successResponse.data.result.content)
          this.tableData = successResponse.data.result.content
          this.total = this.total = successResponse.data.result.totalElements
          this.page = 1
        }).catch(failResponse => {
          this.tableData = []
        })
      }
    },
    searchnext () {
      var result = []
      var url1 = '/no-authc/name/page=' + this.page
      var url2 = '/no-authc/publisher/page=' + this.page
      if (this.value === 1) {
        this.$axios.post(url2, {publisher: this.input}).then(successResponse => {
          console.log(successResponse.data.result.content)
          this.tableData = successResponse.data.result.content
        }).catch(failResponse => {
          this.tableData = []
        })
      } else {
        this.$axios.post(url1, {name: this.input}).then(successResponse => {
          console.log(successResponse.data.result.content)
          this.tableData = successResponse.data.result.content
        }).catch(failResponse => {
          this.tableData = []
        })
      }
    },
    handleClick (row) {
      this.$router.push({
        path: '/ActivityInfo',
        query: {
          row: row
        }
      })
      this.aid = row.id
      this.astart_time = row.star_time
      this.aend_time = row.end_time
      this.aname = row.name
      this.aenroll_time = row.enroll_time
      this.afile = row.files
      this.atext = row.text
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
