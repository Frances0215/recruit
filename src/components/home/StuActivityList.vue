<template>
  <div>
    <img :src=this.src style="width:50%;height:50%">
    <el-carousel :interval="4000" type="card" height="200px">
      <el-carousel-item v-for="item in 6" :key="item">
        <h3 class="medium">{{ item }}</h3>
      </el-carousel-item>
    </el-carousel>

    <div id="divSearch" style="text-align: right">
      <el-input
        placeholder="请输入需要查找的活动名或创建人"
        v-model="input"
        clearable
        style="width: 400px">
      </el-input>
      <el-button type="primary" style="margin-left: 10px" @click="searcht">查询</el-button>
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
          <el-button @click="handleClick(scope.row),dialogTableVisible = true" type="text" size="small">查看详情</el-button>
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
        :total=this.total>
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
      input: ''
    }
  },

  methods: {
    pagehandle(val){
      this.page=val
      this.refreshtable()
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
    clear(){
      this.input=''
    },
    searcht(){
      console.log(this.input)
      let par=new FormData
      par.append("publisher",this.input)
      this.$axios.post('/no-authc/name/page=1', {name:this.input}).then(successResponse => {
          console.log(successResponse)
        this.tableData=successResponse.data.result.content
        this.total=successResponse.data.result.totalElements
        this.page=1
      })
    },
    // nextpage(){
    //   this.page=this.page+1
    //   this.refreshtable()
    // },
    // prepage(){
    //   this.page=this.page-1
    //   this.refreshtable()
    // },
    handleClick(row) {
      this.aid=row.id
      this.astart_time=row.star_time
      this.aend_time=row.end_time
      this.aname=row.name
      this.aenroll_time=row.enroll_time
      this.afile=row.files
      this.atext=row.text
      // let param=new FormData
      // param.append("fid",'17')
      // let param={
      //   fid:'17'
      // }
      this.$axios.get('/file',{params:{fid:17}}).then(successResponse => {
        console.log(successResponse)
        let blob = new Blob([successResponse.data])
        let url = window.URL.createObjectURL(blob)
        this.src = url
      })
      // this.$refs.edate.innerText="a"
      // this.$axios
      //   .post('/no-authc/publisher/page=1', {
      //     username: this.loginForm.username,
      //     password: this.loginForm.password
      //   })
      //   .then(successResponse => {
      //     console.log(successResponse)
      //     if (successResponse.data.code === 200) {
      //       // var data = this.loginForm
      //       console.log('success')
      //       // _this.$store.commit('login', _this.loginForm)
      //       var path = this.$route.query.redirect
      //       // this.$router.replace({path: path === '/' || path === undefined ? '/index' : path})
      //       // this.$router.replace({path: '/index'})
      //     }
      //   })
      //   .catch(failResponse => {
      //   })
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
