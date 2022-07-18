<template>
  <div>
    <br>
    <el-page-header @back="goBack" content="详情页面">
    </el-page-header>
    <div class="block">
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

    <el-dialog title="修改密码" :visible.sync="dialogTableVisible">
      <el-form :label-position="labelPosition" label-width="80px" :model="formLabelAlign">
        <el-form-item label="新密码">
          <el-input v-model="formLabelAlign.pass" show-password></el-input>
        </el-form-item>
        <el-form-item label="确认密码">
          <el-input v-model="formLabelAlign.confirm" show-password></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
          <el-button @click="dialogTableVisibleVisible = false">取 消</el-button>
          <el-button type="primary" @click="changepassword">确 定</el-button>
        </span>
    </el-dialog>
  </div>

</template>

<script>
export default {
  mounted: function () {
    this.row = this.$route.query.row
    this.aid = this.row.id
    this.astart_time = this.row.star_time
    this.aend_time = this.row.end_time
    this.aname = this.row.name
    this.aenroll_time = this.row.enroll_time
    this.afile = this.row.files
    this.atext = this.row.text
  },
  data () {
    return {
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
      dialogTableVisible: false,
      labelPosition: 'right',
      formLabelAlign: {
        pass: '',
        region: '',
        confirm: ''
      }
    }
  },
  methods: {
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
          console.log('this.info')
          console.log(this.info)
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
      // this.$router.push({
      //   path: '/StuActivityDetail'
      // })
    },
    changepassword () {
      if (this.formLabelAlign.confirm === this.formLabelAlign.pass) {
        this.$axios.put('/auth/user/password', {username: 'admin', password: this.formLabelAlign.pass}).then(resp => {
          if (resp && resp.data.code === 200) {
            console.log(resp)
          }
        })
        this.dialogTableVisible = false
      } else {
        alert('密码不一致')
      }
    }

  }
}
</script>
