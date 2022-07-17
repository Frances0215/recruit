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
      <el-select v-model="loginForm.value" clearable placeholder="用户类型" style="width: 350px">
        <el-option
          :key="item.value"
          v-for="item in options"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item>
      <el-checkbox v-model="checked" style="float: left">记住密码</el-checkbox>
      <el-link style="float: right" @click="forget">忘记密码</el-link>
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
      loginForm: {
        username: '',
        password: '',
        value: '',
        radio: '1'
      },
      options: [{
        value: '选项1',
        label: '学生'
      }, {
        value: '选项2',
        label: '教师'
      }, {
        value: '选项3',
        label: '学院招生办'
      }, {
        value: '选项4',
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
            this.$router.replace({path: path === '/' || path === undefined ? '/index' : path})
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
