<template>
  <div>
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
    <el-row>
      <br>
      <el-col :span="24"><div class="grid-content bg-purple-dark"><el-button @click="changepassword,dialogTableVisible = true">修改密码</el-button></div></el-col>
    </el-row>

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
    this.loadActive()
  },
  data () {
    return {
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
