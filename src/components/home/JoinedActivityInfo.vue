<template>
  <div>
    <br>
    <el-page-header @back="goBack" content="详情页面">
    </el-page-header>
    <br>
    <!--    <div class="block">-->
    <!--      <el-image :src="src"></el-image>-->
    <!--    </div>-->
    <div class="block" v-if="carouselTableVisible">
      <el-carousel trigger="click" height="350px" type="card">
        <el-carousel-item v-for="url in items" :key="url">
          <el-image
            style="width: 100%; height: 350px"
            :src="url"
            :fit='fill'></el-image>
        </el-carousel-item>
      </el-carousel>
    </div>
    <br>
    <el-descriptions class="margin-top"  :column="2" border :contentStyle="CS" :label-style="LS ">
<!--      <template slot="extra">-->
<!--        <el-button type="primary" size="small" @click="dialogTableVisible=true" :disabled='this.avaible'>{{ this.bttext }}</el-button>-->
<!--      </template>-->

      <el-descriptions-item label="活动ID">{{this.aid}}</el-descriptions-item>
      <el-descriptions-item label="活动名">{{this.aname}}</el-descriptions-item>
      <el-descriptions-item label="活动时间">{{ this.astart_time+'-'+this.aend_time }}</el-descriptions-item>
      <el-descriptions-item label="报名时间">{{ this.aenroll_time }}</el-descriptions-item>
      <el-descriptions-item label="活动描述">{{ this.atext }}</el-descriptions-item>
      <el-descriptions-item label="活动附件" >
        <!--        <el-link @click="downloadFile(this.src)" target="_blank">默认链接</el-link>-->
        <!--      <button @click="downloadFile(item)"  v-for="item in blobfile" :key="item">a标签下载</button>-->
        <div v-for="item in blobfile" :key="item">
          <el-link @click="downloadFile(item)" >{{ item.filename }}<br></el-link>
        </div>

      </el-descriptions-item>
    </el-descriptions>
    <el-button type="primary"  @click="dialogTableVisible=true" :disabled='this.avaible' style="margin-top: 20px; width: 100px;margin-bottom: 20px">{{ this.bttext }}</el-button>
    <el-dialog title="报名信息" :visible.sync="dialogTableVisible">
      <el-descriptions title="用户信息" direction="horizontal" :column="1" border>
        <el-descriptions-item label="用户ID">{{ this.id }}</el-descriptions-item>
        <el-descriptions-item label="用户名">{{ this.name }}</el-descriptions-item>
        <el-descriptions-item label="角色">
          <el-tag size="small">{{ this.role }}</el-tag>
        </el-descriptions-item>
        <el-descriptions-item label="手机号">{{ this.phone }}</el-descriptions-item>
        <el-descriptions-item label="邮箱">{{ this.email }}</el-descriptions-item>
        <el-descriptions-item label="管理员ID">{{ this.father }}</el-descriptions-item>
        <el-descriptions-item label="绩点" :span="2">{{ this.garde }}</el-descriptions-item>
        <el-descriptions-item label="联系地址">江苏省苏州市吴中区吴中大道 1188 号</el-descriptions-item>
      </el-descriptions>
      <span slot="footer" class="dialog-footer">
          <el-button @click="dialogTableVisible = false">取 消</el-button>
          <el-button type="primary" @click="submit">报 名</el-button>
        </span>
    </el-dialog>
  </div>

</template>

<script>
export default {
  mounted: function () {
    this.loadActive()
  },
  data () {
    return {
      CS: {
        'text-align': 'center', // 文本居中
        'min-width': '250px', // 最小宽度
        'word-break': 'break-all' // 过长时自动换行
      },
      LS: {
        'color': '#000',
        'text-align': 'center',
        'font-weight': '600',
        'height': '40px',
        'background-color': '#b3c1d1',
        'min-width': '200px',
        'word-break': 'keep-all'
      },
      carouselTableVisible: false,
      avaible: false,
      bttext: '报 名',
      aid: null,
      astart_time: null,
      aend_time: null,
      atag1: null,
      atag2: null,
      atext: null,
      atheme: null,
      aname: null,
      ajoin_num: null,
      auid: null,
      acreat_time: null,
      areviewer: null,
      alimit: null,
      aenroll_time: null,
      aplace: null,
      afile: null,
      id: '',
      name: '',
      phone: '',
      email: '',
      father: '',
      garde: '',
      role: '',
      src: '',
      dialogTableVisible: false,
      labelPosition: 'right',
      formLabelAlign: {
        pass: '',
        region: '',
        confirm: ''
      },
      items: [],
      file: [],
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
    // downloadFile (url, fileName = 'a') {
    //   let link = document.createElement('a')
    //   link.style.display = 'none'
    //   link.href = url
    //   link.setAttribute('download', fileName)
    //   document.body.appendChild(link)
    //   link.click()
    // },
    downloadFile (item) {
      let link = document.createElement('a')
      link.style.display = 'none'
      link.href = item.src
      link.setAttribute('download', item.filename)
      document.body.appendChild(link)
      link.click()
    },
    submit () {
      this.$axios.post('/auth/join', {id: this.aid}).then(resp => {
        console.log(resp)
        if (resp && resp.data.code === 200) {
          alert('报名成功')
        } else {
          alert('报名失败')
        }
      })
    },
    loadActive () {
      var _this = this
      this.$axios.get('/auth/myself').then(resp => {
        if (resp && resp.data.code === 200) {
          this.info = resp.data.result
          this.name = resp.data.result.username
          this.id = resp.data.result.id
          this.phone = resp.data.result.phone
          this.email = resp.data.result.email
          this.father = resp.data.result.father
          this.garde = resp.data.result.garde
          this.role = resp.data.result.role
          // console.log('this.info')
          // console.log(this.info)

          this.row = this.$route.query.row
          this.aid = this.row.id
          this.astart_time = this.row.star_time
          this.aend_time = this.row.end_time
          this.aname = this.row.name
          this.aenroll_time = this.row.enroll_time
          this.afile = this.row.files
          this.atext = this.row.text
          console.log(this.aid, this.id)
          this.$axios.post('auth/can_join', {aid: this.aid, uid: this.id}).then(successResponse => {
            console.log(successResponse.data.result)
            if (successResponse && successResponse.data.code === 200) {
              if (!successResponse.data.result) {
                // console.log('auth/can_join')
                this.bttext = '没有报名资格'
                this.avaible = true
              }
            }
          })
          if (this.afile != null && this.afile.length > 0) {
            // console.log('has')
            var photo = []
            for (var k = 0; k < this.afile.length; k++) {
              var item = this.afile[k]
              if (item.type === 'photo') {
                var index = item.url.indexOf('files//')
                if (index !== -1) {
                  item.url = item.url.substring(index + 6, item.url.length)
                } else {
                  index = item.url.indexOf('files/')
                  if (index !== -1) {
                    item.url = item.url.substring(index + 5, item.url.length)
                  }
                }
                photo.push(item)
              } else {
                var index1 = item.url.indexOf('files')
                item.url = item.url.substring(index1 + 5, item.url.length)
                this.file.push({url: item.url, filename: item.name})
                console.log(this.file)
              }
            }
            if (photo.length > 0) {
              this.carouselTableVisible = true
              for (var i = 0; i < photo.length; i++) {
                var url = '/file' + photo[i].url
                console.log(url)
                this.$axios.get(url, {responseType: 'blob'}).then(successResponse => {
                  // console.log(successResponse.data)
                  // let blob = new Blob([successResponse.data])
                  // let url = window.URL.createObjectURL(blob)
                  this.src = window.URL.createObjectURL(successResponse.data)
                  this.items.push(this.src)
                  // console.log(this.items)
                })
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
          console.log(this.blobfile)
          // this.$axios.get('/file/f78pe5QQ图片20210901104628.png', {responseType: 'blob'}).then(successResponse => {
          //   // console.log(successResponse.data)
          //   // let blob = new Blob([successResponse.data])
          //   // let url = window.URL.createObjectURL(blob)
          //   this.src = window.URL.createObjectURL(successResponse.data)
          //   this.items.push(this.src)
          // })
          // this.$axios.get('/file/v3uis0InkedUFOZJXZGO@P4U6VQ_T@X2$G_LI.jpg', {responseType: 'blob'}).then(successResponse => {
          //   // console.log(successResponse.data)
          //   // let blob = new Blob([successResponse.data])
          //   // let url = window.URL.createObjectURL(blob)
          //   this.src = window.URL.createObjectURL(successResponse.data)
          //   this.items.push(this.src)
          // })
        }
      })
    },

    goBack () {
      this.$axios.get('/auth/myself').then(suresponse => {
        if (suresponse.data.code === 200) {
          this.role = suresponse.data.result.role
          console.log(this.role)
          if (this.role === 'super') {
            this.$router.push({
              path: '/StuActivityDetail'
            })
          }
          if (this.role === '学生') {
            this.$router.push({
              path: '/StuActivityDetailStu'
            })
          }
          if (this.role === '教师') {
            this.$router.push({
              path: '/StuActivityDetailStu'
            })
          }
        }
      })
    }

  }
}
</script>
<style>
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 150px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n+1) {
  background-color: #d3dce6;
}
</style>
