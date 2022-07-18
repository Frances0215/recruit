<template>
  <div>
    <el-carousel :interval="4000" type="card" height="200px">
      <el-carousel-item v-for="item in 6" :key="item">
        <h3 class="medium">{{ item }}</h3>
      </el-carousel-item>
    </el-carousel>
    <div style="margin-top: 15px;">
      <el-input placeholder="请输入内容" v-model="input" class="input-with-select">
        <el-select v-model="value" slot="prepend" placeholder="请选择">
          <el-option label="活动名称" value="2"></el-option>
          <el-option label="发布用户" value="1"></el-option>
        </el-select>
        <el-button slot="append" @click="searcht" icon="el-icon-search"></el-button>
        <el-button slot="append" type="danger" @click="clear" icon="el-icon-refresh-left">重置</el-button>
        <el-button slot="append" type="danger" @click="myact">我可以参加的活动</el-button>
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
        fixed="right"
        label="操作"
        width="100">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="text" size="small">查看详情</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div style="margin-top: 20px">
<!--      <el-button @click="toggleSelection([tableData[1], tableData[2]])">切换第二、第三行的选中状态</el-button>-->
<!--      <el-button @click="toggleSelection()">取消选择</el-button>-->
    </div>
    <el-dialog title="活动信息" :visible.sync="dialogTableVisible">
      <div class="block">
        <span class="demonstration">默认</span>
        <el-image :src="src"></el-image>
      </div>
      <el-descriptions class="margin-top"  :column="3" :size="size" border>
        <template slot="extra">
          <el-button type="primary" size="small">参与</el-button>
        </template>
        <el-descriptions-item label="活动ID">{{this.aid}}</el-descriptions-item>
        <el-descriptions-item label="活动名">{{this.aname}}</el-descriptions-item>
        <el-descriptions-item label="活动时间">{{ this.astart_time+'-'+this.aend_time }}</el-descriptions-item>
        <el-descriptions-item label="报名时间">{{ this.aenroll_time }}</el-descriptions-item>
        <el-descriptions-item label="活动描述">{{ this.atext }}</el-descriptions-item>
        <el-descriptions-item label="活动附件">{{ this.afile }}</el-descriptions-item>
      </el-descriptions>
    </el-dialog>
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
var responses

/* eslint-disable */
export default {
  mounted:function () {   //自动触发写入的函数
    this.refreshtable()
  },
  data () {

    return {
      tableData: [],
      multipleSelection: [],
      dialogTableVisible: false,
      aid:null,
      astart_time:null,
      aend_time:null,
      atag1:null,
      atag2:null,
      atext:null,
      atheme:null,
      aname:null,
      ajoin_num:null,
      auid:null,
      acreat_time:null,
      areviewer:null,
      alimit:null,
      aenroll_time:null,
      aplace:null,
      afile:null,
      size:'',
      src:'',
      total:1,
      page:1,
      input: '',
      mode:1,
      // input3:'',

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
    myact(){
      this.page=1
      this.mode=3
      var url='/auth/can_join/page='+this.page
      this.$axios.get(url).then(successResponse => {
        console.log(successResponse)
        if (successResponse.data.code === 200) {
          console.log(successResponse.data.result.totalElements)
          this.total=successResponse.data.result.totalElements
          this.tableData=successResponse.data.result.content

        }
        else{
          this.tableData=[]
          this.total=0
        }
      })
    },
    myactnext(){
      var url='/auth/can_join/page='+this.page
      console.log(url)
      this.$axios.get(url).then(successResponse => {
        if (successResponse.data.code === 200) {
          console.log(successResponse)
          console.log(successResponse.data.result.totalElements)
          this.total=successResponse.data.result.totalElements
          this.tableData=successResponse.data.result.content
        }
      })
    },
    clear(){
      this.mode=1
      this.page=1
      this.refreshtable()
    },
    pagehandle(val){
      this.page=val
      if(this.mode==1){
        this.refreshtable()
      }
      else if(this.mode==2){
        this.searchnext()
      }
      else{
        this.myactnext()
      }
    },
    refreshtable(){
      var url='/no_authc/allactive/page='+this.page
      console.log(url)
      this.$axios.get(url).then(successResponse => {
        if (successResponse.data.code === 200) {
          console.log(successResponse.data.result.totalElements)
          this.total=successResponse.data.result.totalElements
          this.tableData=successResponse.data.result.content
          console.log(this.tableData)
        }
      })
        .catch(failResponse => {
        })
    },
    searcht(){
      this.mode=2
      // console.log(this.input)
      if(this.value==1){
        this.$axios.post('/no-authc/publisher/page=1', {publisher:this.input}).then(successResponse => {
          console.log(successResponse.data.result.content)
          this.tableData=successResponse.data.result.content
          this.total=this.total=successResponse.data.result.totalElements
          this.page=1
        }).catch(failResponse => {
          this.tableData=[]
          this.total=0
        })
      }
      else{
        this.$axios.post('/no-authc/name/page=1', {name:this.input}).then(successResponse => {
          console.log(successResponse.data.result.content)
          this.tableData=successResponse.data.result.content
          this.total=this.total=successResponse.data.result.totalElements
          this.page=1
        }).catch(failResponse => {
          this.tableData=[]
          this.total=0
        })
      }
    },
    searchnext(){
      var result=new Array()
      var url1='/no-authc/name/page='+this.page
      var url2='/no-authc/publisher/page='+this.page
      if(this.value==1){
        this.$axios.post(url2, {publisher:this.input}).then(successResponse => {
          console.log(successResponse.data.result.content)
          this.tableData=successResponse.data.result.content
        }).catch(failResponse => {
          this.tableData=[]
          this.total=0
        })
      }
      else{
        this.$axios.post(url1, {name:this.input}).then(successResponse => {
          console.log(successResponse.data.result.content)
          this.tableData=successResponse.data.result.content
        }).catch(failResponse => {
          this.tableData=[]
          this.total=0
        })
      }

    },

    handleClick(row) {
      this.$axios.get('/auth/myself').then(suresponse => {
        if (suresponse.data.code === 200) {
          this.role = suresponse.data.result.role
          console.log(this.role)
          if (this.role === 'super') {
            this.$router.push({
              path: '/ActivityInfo',
              query: {
                row: row
              }
            })
          }
          if (this.role === '学生') {
            this.$router.push({
              path: '/ActivityInfostu',
              query: {
                row: row
              }
            })
          }
          if (this.role === '教师') {
            this.$router.push({
              path: '/ActivityInfostu',
              query: {
                row: row
              }
            })
          }

        }
      })
      // this.$router.push({
      //   path: '/ActivityInfo',
      //   query: {
      //     row: row
      //   }
      // })
      this.aid=row.id
      this.astart_time=row.star_time
      this.aend_time=row.end_time
      this.aname=row.name
      this.aenroll_time=row.enroll_time
      this.afile=row.files
      this.atext=row.text
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

.el-scrollbar__wrap {
  overflow: scroll;
  height: 100%;
  margin-bottom: 0px;
  margin-right: 0px;
}
</style>
