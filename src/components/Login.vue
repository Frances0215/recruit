<template>
  <body id="poster">
  <el-form class="login-container" label-position="left"
           label-width="0px">
    <h3 class="login_title">系统登录</h3>
    <el-form-item>
      <el-input type="text" v-model="loginForm.username"
                auto-complete="off" placeholder="账号"></el-input>
    </el-form-item>
    <el-form-item>
      <el-input type="password" v-model="loginForm.password"
                auto-complete="off" placeholder="密码"></el-input>
    </el-form-item>
    <el-form-item>
<!--      <el-select v-model="loginForm.value" clearable placeholder="用户类型" style="width: 350px">-->
<!--        <el-option-->
<!--          :key="item.value"-->
<!--          v-for="item in options"-->
<!--          :label="item.label"-->
<!--          :value="item.value">-->
<!--        </el-option>-->
<!--      </el-select>-->
    </el-form-item>
    <el-form-item>
      <el-checkbox v-model="checked" style="float: left">记住密码</el-checkbox>
<!--      <el-button type="text" v-on:click="modify">修改密码</el-button>-->
      <el-button type="text" style="float: right" @click="open">忘记密码</el-button>
    </el-form-item>
    <el-form-item style="width: 100%">
      <el-button type="primary" style="width: 100%;background: #505458;border: none" v-on:click="login">登录</el-button>
    </el-form-item>
  </el-form>
  </body>
</template>
<script>
import {methods} from 'babel-plugin-transform-runtime/lib/definitions'

export default {
  name: 'Login',
  data () {
    return {
      checked: true,
      role: '',
      loginForm: {
        username: '',
        password: '',
        value: '',
        radio: '1'
      },
      options: [{
        value: '学生',
        label: '学生'
      }, {
        value: '教师',
        label: '教师'
      }, {
        value: '学院招生办',
        label: '学院招生办'
      }, {
        value: '学校招生办',
        label: '学校招生办'
      }],
      responseResult: []
    }
  },
  methods: {
    login () {
      var _this = this
      // console.log(this.$store.state)
      this.$axios
        .post('/login', {
          username: this.loginForm.username,
          password: this.loginForm.password
        })
        .then(successResponse => {
          console.log(successResponse)
          if (successResponse.data.code === 200) {
            // var data = this.loginForm
            console.log('success')
            // _this.$store.commit('login', _this.loginForm)
            var path = this.$route.query.redirect
            this.$axios.get('/auth/myself').then(suresponse => {
              if (suresponse.data.code === 200) {
                this.role = suresponse.data.result.role
                console.log(this.role)
                if (this.role === 'super') {
                  this.$router.replace({path: path === '/' || path === undefined ? '/index' : path})
                }
                if (this.role === '学院') {
                  this.$router.replace({path: path === '/' || path === undefined ? '/indexaca' : path})
                }
                if (this.role === '学校') {
                  this.$router.replace({path: path === '/' || path === undefined ? '/indexschool' : path})
                }
                if (this.role === '学生') {
                  this.$router.replace({path: path === '/' || path === undefined ? '/indexstudent' : path})
                }
                if (this.role === '教师') {
                  this.$router.replace({path: path === '/' || path === undefined ? '/indexstudent' : path})
                }
              }
            })
            // if (this.loginForm.value === '') {
            //   this.$router.replace({path: path === '/' || path === undefined ? '/index' : path})
            // }
            // if (this.loginForm.value === '学生') {
            //   this.$router.replace({path: path === '/' || path === undefined ? '/indexstudent' : path})
            // }
            // if (this.loginForm.value === '教师') {
            //   this.$router.replace({path: path === '/' || path === undefined ? '/indexstudent' : path})
            // }
            // if (this.loginForm.value === '学院招生办') {
            //   this.$router.replace({path: path === '/' || path === undefined ? '/indexaca' : path})
            // }
            // if (this.loginForm.value === '学校招生办') {
            //   this.$router.replace({path: path === '/' || path === undefined ? '/indexschool' : path})
            // }
            // this.$router.replace({path: path === '/' || path === undefined ? '/index' : path})
            // this.$router.replace({path: '/index'})
          }
        })
        .catch(failResponse => {
        })
      this.$axios.get('/auth/myself').then(successResponse => {
        console.log(successResponse)
        if (successResponse.data.result.role === 'super') {
          console.log('super')
        }
      })
        .catch(failResponse => {
        })
    },
    modify () {
      var _this = this
      var path = this.$route.query.redirect
      this.$router.replace({path: path === '/' || path === undefined ? '/modify' : path})
    },
    open () {
      this.$alert('请联系教务处重置密码', '忘记密码', {
        confirmButtonText: '确定',
        callback: action => {
          this.$message({
            type: 'info',
            message: `action: $ { action }`
          })
        }
      })
    },
    clickitem () {
      if (this.loginForm === 1) {
        this.loginForm.radio = ''
      } else {
        this.loginForm.radio = '1'
      }
    }
  }
}
</script>

<style scoped>
  .login-container {
    border-radius: 15px;
    background-clip: padding-box;
    margin: 90px auto;
    width: 350px;
    padding: 35px 35px 15px 35px;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
  }
  .login_title {
    margin: 0px auto 40px auto;
    text-align: center;
    color: #505458;
  }
  #poster {
    background:url("../assets/eva.jpg") no-repeat;
    background-position: center;
    height: 100%;
    width: 100%;
    background-size: cover;
    position: fixed;
    background-size: cover; /* 使图片平铺满整个浏览器（从宽和高的最大需求方面来满足，会使某些部分无法显示在区域中） */
    position: absolute; /* 不可缺少 */
  }
  body{
    margin: 0px;
  }

</style>
