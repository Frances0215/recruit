<template>
  <div>

<!--    <div id="divSearch" style="text-align: right">-->
<!--      <el-input-->
<!--        placeholder="请根据活动名或创建者输入查找"-->
<!--        v-model="input"-->
<!--        clearable-->
<!--        style="width: 200px">-->
<!--      </el-input>-->
<!--      <el-select v-model="value" placeholder="请选择">-->
<!--        <el-option-->
<!--          v-for="item in options"-->
<!--          :key="item.value"-->
<!--          :label="item.label"-->
<!--          :value="item.value"-->
<!--          >-->
<!--        </el-option>-->
<!--      </el-select>-->
<!--      <el-button type="primary" style="margin-left: 10px" @click="searcht">查询</el-button>-->
<!--      <el-button type="danger" @click="clear">重置</el-button>-->
<!--    </div>-->
    <el-table
      ref="multipleTable"
      :data="tableData"
      tooltip-effect="dark"
      style="width: 100%"
      @selection-change="handleSelectionChange">
      <el-table-column
        prop="active.id"
        label="活动ID"
        width="80">
      </el-table-column>
      <el-table-column
        prop="active.name"
        label="活动名称"
        width="80">
      </el-table-column>
      <el-table-column
        prop="active.star_time"
        label="开始时间"
        width="80">
      </el-table-column>
      <el-table-column
        prop="active.end_time"
        label="结束时间"
        width="80">
      </el-table-column>
      <el-table-column
        prop="active.enroll_time"
        label="报名时间"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="status"
        label="审核情况"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="active.tag2"
        label="进行方式"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="active.tag1"
        label="活动类型"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="active.place"
        label="活动地区"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="active.limit_"
        label="参与对象"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="active.join_num"
        label="参与数"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        width="300">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row),dialogTableVisible = true" type="text" size="small">查看详情</el-button>
          <el-button @click="handlefeedClick(scope.row),dialogFeedbackVisible = true" type="text" size="small">查看反馈</el-button>
          <el-button @click="handlefeedClick(scope.row),dialogFeedbackVisible = true" type="text" size="small">附件下载</el-button>
          <el-button @click="handlefeedClick(scope.row),dialogFeedbackVisible = true" type="text" size="small">附件上传</el-button>
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
    <el-dialog title="活动反馈" :visible.sync="dialogFeedbackVisible">
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
        <el-descriptions-item label="活动反馈">{{ this.des_ }}</el-descriptions-item>
<!--        <el-descriptions-item label="反馈附件">{{ this.afile }}</el-descriptions-item>-->
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
      dialogFeedbackVisible:false,
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
      des_:null,
      size:'',
      src:'',
      total:1,
      page:1,
      input: '',
      mode:1,
      tablelist:[],
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
    clear(){
      this.mode=1
      this.page=1
      this.refreshtable()
    },
    pagehandle(val){
      this.page=val
      if(this.mode=1){
        this.refreshtable()
      }
      else{
        this.searchnext()
      }
    },
    refreshtable(){
      var url='/auth/order/my/pages='+this.page
      // var url='/no_authc/allactive/page='+this.page
      console.log(url)
      this.$axios.get(url).then(successResponse => {
        if (successResponse.data.code === 200) {
          console.log(successResponse.data)
          this.total=successResponse.data.result.totalElements
          for(var i=0;i<successResponse.data.result.content.length;i++){
            this.tablelist.push(successResponse.data.result.content[i].active)
          }
          // successResponse.data.result.content.forEach(function (item){this.tablelist.append(item.active)})
          this.tableData=successResponse.data.result.content
        }
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
        })
      }
    },
    searchnext(){
      var result=new Array()
      var url1='/no_authc/name/page='+this.page
      var url2='/no_authc/publisher/page='+this.page
      if(this.value==1){
        this.$axios.post(url2, {publisher:this.input}).then(successResponse => {
          console.log(successResponse.data.result.content)
          this.tableData=successResponse.data.result.content
        }).catch(failResponse => {
          this.tableData=[]
        })
      }
      else{
        this.$axios.post(url1, {name:this.input}).then(successResponse => {
          console.log(successResponse.data.result.content)
          this.tableData=successResponse.data.result.content
        }).catch(failResponse => {
          this.tableData=[]
        })
      }

    },
    // nextpage(){
    //   this.page=this.page+1
    //   this.refreshtable()
    // },
    // prepage(){
    //   this.page=this.page-1
    //   this.refreshtable()
    // },
    handlefeedClick(row){
      this.aid=row.active.id
      this.astart_time=row.active.star_time
      this.aend_time=row.active.end_time
      this.aname=row.active.name
      this.aenroll_time=row.active.enroll_time
      this.afile=row.active.files
      this.atext=row.active.text
      this.des_=row.desc_
    },
    handleClick(row) {
      this.$router.push({
        path: '/JoinedActivityInfo',
        query: {
          row: row.active
        }
      })
      this.aid=row.active.id
      this.astart_time=row.active.star_time
      this.aend_time=row.active.end_time
      this.aname=row.active.name
      this.aenroll_time=row.active.enroll_time
      this.afile=row.active.files
      this.atext=row.active.text
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
