<template>
  <div>
    <h1 style="font-size: 35px">用户信息</h1>
    <el-descriptions direction="horizontal" :column="1" border :contentStyle="CS" :label-style="LS ">
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
<!--      <el-form :label-position="labelPosition" label-width="80px" :model="formLabelAlign">-->
<!--        <el-form-item label="新密码">-->
<!--          <el-input v-model="formLabelAlign.pass" show-password></el-input>-->
<!--        </el-form-item>-->
<!--        <el-form-item label="确认密码">-->
<!--          <el-input v-model="formLabelAlign.confirm" show-password></el-input>-->
<!--        </el-form-item>-->
<!--      </el-form>-->
      <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="密码" prop="pass">
          <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPass">
          <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
        </el-form-item>
<!--        <el-form-item label="年龄" prop="age">-->
<!--          <el-input v-model.number="ruleForm.age"></el-input>-->
<!--        </el-form-item>-->
      </el-form>
      <span slot="footer" class="dialog-footer">
          <el-button @click="dialogTableVisibleVisible = false">取 消</el-button>
          <el-button type="primary" @click="submitForm('ruleForm')">确 定</el-button>
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
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (this.ruleForm.checkPass !== '') {
          this.$refs.ruleForm.validateField('checkPass')
        }
        callback()
      }
    }
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.ruleForm.pass) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      CS: {
        'text-align': 'center', // 文本居中
        'min-width': '250px', // 最小宽度
        'word-break': 'break-all', // 过长时自动换行
        'font-size': '16px'
      },
      LS: {
        'color': '#000',
        'text-align': 'center',
        'font-weight': '600',
        'height': '40px',
        'background-color': '#b3c1d1',
        'min-width': '100px',
        'word-break': 'keep-all',
        'font-size': '16px'
      },
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
      },
      ruleForm: {
        pass: '',
        checkPass: '',
        age: ''
      },
      rules: {
        pass: [
          { validator: validatePass, trigger: 'blur' }
        ],
        checkPass: [
          { validator: validatePass2, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('已修改密码')
          this.changepassword()
        } else {
          alert('信息错误')
          console.log('error submit!!')
          return false
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
          console.log('this.info')
          console.log(this.info)
        }
      })
    },
    changepassword () {
      this.$axios.put('/auth/user/password', {username: 'admin', password: this.ruleForm.pass}).then(resp => {
        if (resp && resp.data.code === 200) {
          console.log(resp)
        }
      })
      this.dialogTableVisible = false
    }

  }
}
</script>
