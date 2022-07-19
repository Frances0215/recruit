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
          <el-button @click="handleClick(scope.row)" type="text" size="small">查看详情</el-button>
          <el-button @click="handleEdit(scope.row)" type="text" size="small">查看反馈</el-button>
          <el-button @click="handledown(scope.row),dialogFeedbackVisible = true" type="text" size="small">附件下载</el-button>
<!--          <el-button @click="handlefeedClick(scope.row),dialogTableVisible=true" type="text" size="small">附件上传</el-button>-->
        </template>
      </el-table-column>
    </el-table>
    <div style="margin-top: 20px">
      <!--      <el-button @click="toggleSelection([tableData[1], tableData[2]])">切换第二、第三行的选中状态</el-button>-->
      <!--      <el-button @click="toggleSelection()">取消选择</el-button>-->
    </div>
    <el-dialog title="上传附件" :visible.sync="dialogTableVisible">
<!--      <el-upload-->
<!--        class="upload-demo"-->
<!--        drag-->
<!--        action=""-->
<!--        :file-list="fileList"-->
<!--        multiple>-->
<!--        <i class="el-icon-upload"></i>-->
<!--        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>-->
<!--        <el-button @click="asd"></el-button>-->
<!--      </el-upload>-->
      <el-upload
        class="upload-file"
        action="/admin/active/creat"
        :on-preview="handlePreview"
        :on-remove="handleRemove"
        :before-remove="beforeRemove"
        multiple
        :on-exceed="handleExceed"
        :file-list="fileList"
        :auto-upload="false"
        :on-change="handleChange"
        name="file"
        ref="upload"
        show-file-list="true"
        :http-request="httpRequest"
        on-success="handleSuccess"
        limit=1
      >
        <el-button size="small" type="primary">点击上传附件/图片</el-button>
        <div slot="tip" class="el-upload__tip">单个文件不超过500kb</div>
      </el-upload>
      <el-button @click="submitUpload"></el-button>
    </el-dialog>
    <el-dialog title="下载附件" :visible.sync="dialogFeedbackVisible">
      <el-descriptions class="margin-top"  :column="2" border>
        <el-descriptions-item label="活动附件" >
          <!--        <el-link @click="downloadFile(this.src)" target="_blank">默认链接</el-link>-->
          <!--      <button @click="downloadFile(item)"  v-for="item in blobfile" :key="item">a标签下载</button>-->
          <div v-for="item in blobfile" :key="item">
            <el-link @click="downloadFile(item)" >{{ item.filename }}<br></el-link>
          </div>

        </el-descriptions-item>
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
      value: '1',
      file:[],
      fileList:[],
      blobfile: []
    }
  },

  methods: {
    async loadfile () {
      for (var j = 0; j < this.file.length; j++) {
        var temp = j
        var url1 = '/file' + this.file[j].url
        // console.log(url1)
        await this.$axios.get(url1, {responseType: 'blob'}).then(successResponse => {
          console.log(successResponse)
          // let blob = new Blob([successResponse.data])
          // let url = window.URL.createObjectURL(blob)
          this.src = window.URL.createObjectURL(successResponse.data)
          // console.log(this.file[temp])
          this.blobfile.push({src: this.src, filename: this.file[temp].filename})
        })
      }
    },
    handledown(row){
      this.blobfile=[]
      this.file=[]
      if (row.active.files != null && row.active.files.length > 0) {
        console.log('has')
        console.log(row.active.files)
        for (var k = 0; k < row.active.files.length; k++) {
          var item = row.active.files[k]
          if (item.type === 'photo') {
          } else {
            var index1 = item.url.indexOf('files')
            item.url = item.url.substring(index1 + 5, item.url.length)
            this.file.push({url: item.url, filename: item.name})
            console.log(this.file)
          }
        }
        if (this.file.length > 0) {
          console.log('file')
          this.loadfile()
          // for (var j = 0; j < this.file.length; j++) {
          //   var temp = j
          //   var url1 = '/file' + this.file[j].url
          //   // console.log(url1)
          //   this.$axios.get(url1, {responseType: 'blob'}).then(successResponse => {
          //     console.log(successResponse)
          //     // let blob = new Blob([successResponse.data])
          //     // let url = window.URL.createObjectURL(blob)
          //     this.src = window.URL.createObjectURL(successResponse.data)
          //     // console.log(this.file[temp])
          //     this.blobfile.push({src: this.src, filename: this.file[temp].filename})
          //   })
          // }
        }
      }
    },
    downloadFile (item) {
      let link = document.createElement('a')
      link.style.display = 'none'
      link.href = item.src
      link.setAttribute('download', item.filename)
      document.body.appendChild(link)
      link.click()
    },
    handleRemove (file, fileList) {
      console.log(file, fileList)
      fileList.remove(file)
    },
    handlePreview (file) {
      console.log(file)
    },
    submitUpload () {
      var param = new FormData()
      this.$refs.upload.submit()
      this.file.forEach(function (file) {
        param.append('file', file)
      })
      param.append('desc_','')

      // var num = parseInt(this.ruleForm.join_num)
      // var canJoin = this.ruleForm.can_join1.concat(this.ruleForm.can_join2)
      param.append('id',this.row.active.id)
      console.log(this.row.active.id)
      let config = {
        header: {
          'Content-Type': 'multipart/form-data'
        }
      }
      console.log(param)
      this.$axios.post('/auth/order/addfile', {id:this.row.active.id,desc_:'',file:null}).then(response => {
        console.log('请求成功')
        console.log(response)
        this.$refs.upload.clearFiles()

        this.$message({
          type: 'info',
          message: '创建成功'
        })
        // this.openMessage()
        // 接口成功调用params上的onSuccess函数，会触发默认的successHandler函数
        // 这样可以用自带的ui等
        // params.onSuccess({name: 'eric'})
      }).catch(err => {
        console.log('请求失败')
        console.log(err)
      })
    },
    handleChange (file, fileList) {
      console.log(fileList)
      console.log(file)
      this.fileList = fileList
    },
    httpRequest (param) {
      // this.photoList = fd.fileList
      this.file.push(param.file)
      // console.log(this.photoList)
    },
    getFile (event) {
      this.files = event.target.files
    },
    handleEdit (row) {
      this.aid = row.active.id
      console.log(row.id)
      this.$axios.get('/auth/myself').then(suresponse => {
        if (suresponse.data.code === 200) {
          this.role = suresponse.data.result.role
          console.log(this.role)
          if (this.role === 'super') {
            this.$router.push({
              path: '/feedbackmassage',
              query: {
                aid: this.aid
              }
            })
          }
          if (this.role === '学生'||'教师') {
            this.$router.push({
              path: '/feedbackmassageStu',
              query: {
                aid: this.aid
              }
            })
          }
          if (this.role === '学院') {
            this.$router.push({
              path: '/feedbackmassageaca',
              query: {
                aid: this.aid
              }
            })
          }
          if (this.role === '学校') {
            this.$router.push({
              path: '/feedbackmassageSch',
              query: {
                aid: this.aid
              }
            })
          }
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
      this.refreshtable()


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
      // this.aid=row.active.id
      // this.astart_time=row.active.star_time
      // this.aend_time=row.active.end_time
      // this.aname=row.active.name
      // this.aenroll_time=row.active.enroll_time
      // this.afile=row.active.files
      // this.atext=row.active.text
      // this.des_=row.desc_
      this.row=row
    },
    handleClick(row) {
      this.$axios.get('/auth/myself').then(suresponse => {
        if (suresponse.data.code === 200) {
          this.role = suresponse.data.result.role
          console.log(this.role)
          if (this.role === 'super') {
            this.$router.push({
              path: '/JoinedActivityInfo',
              query: {
                row: row.active
              }
            })
          }
          if (this.role === '学生') {
            this.$router.push({
              path: '/JoinedActivityInfostu',
              query: {
                row: row.active
              }
            })
          }
          if (this.role === '教师') {
            this.$router.push({
              path: '/JoinedActivityInfostu',
              query: {
                row: row.active
              }
            })
          }

        }
      })
      // this.$router.push({
      //   path: '/JoinedActivityInfo',
      //   query: {
      //     row: row.active
      //   }
      // })
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
