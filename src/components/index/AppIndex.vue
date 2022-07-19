<template>
  <el-container style="height: 100vh">
    <el-aside width="200px" class="el-aside" >
<!--      <div style="height: 100%">-->
<!--        <el-row class="tac">-->
<!--          <el-col>-->
            <el-menu
              default-active="2"
              @open="handleOpen"
              @close="handleClose"
              @select="changeSidebar"
              background-color="#545c64"
              text-color="#fff"
              active-text-color="#ffd04b"
              style="height: 100vh">
              <el-submenu index="1">
                <template slot="title">
                  <i class="el-icon-location"></i>
                  <span>活动管理</span>
                </template>
                <el-menu-item-group>
                  <el-menu-item index="/ActivityAdd">活动添加</el-menu-item>
                  <el-menu-item index="/ActivityList">活动列表</el-menu-item>
                </el-menu-item-group>
              </el-submenu>
              <el-submenu index="2">
                <template slot="title">
                  <i class="el-icon-location"></i>
                  <span>报名审核</span>
                </template>
                <el-menu-item-group>
                  <el-menu-item index="/waitAudit">待审核</el-menu-item>
                  <el-menu-item index="/auditList">审核列表</el-menu-item>
                </el-menu-item-group>
              </el-submenu>
              <el-menu-item index="/feedback">
                <i class="el-icon-document"></i>
                <span slot="title">活动反馈</span>
              </el-menu-item>
              <el-menu-item index="/Myinfo">
                <i class="el-icon-setting"></i>
                <span slot="title">个人信息</span>
              </el-menu-item>
              <el-menu-item index="/modifyUser">
                <i class="el-icon-setting"></i>
                <span slot="title">用户信息</span>
              </el-menu-item>
              <el-menu-item index="/StuActivityList">
                <i class="el-icon-document"></i>
                <span slot="title">活动列表</span>
              </el-menu-item>
              <el-menu-item index="/StuActivityDetail">
                <i class="el-icon-document"></i>
                <span slot="title">我的活动</span>
              </el-menu-item>
            </el-menu>
<!--          </el-col>-->
<!--        </el-row>-->
<!--      </div>-->
    </el-aside>
    <el-container style="height: 100%;margin-left: 10px">
      <el-header style="text-align: right; font-size: 12px">
<!--        <span style="font-size: 18px; margin-right: 10px">{{this.name}}</span>-->
        <el-link target="_blank" size="mini" v-on:click="person" style="margin-right: 10px" plain>{{this.name}}</el-link>
        <el-link target="_blank" size="mini" v-on:click="exit" plain>退出登录</el-link>
<!--        <el-dropdown>-->
<!--          <i class="el-icon-setting" style="margin-right: 15px"></i>-->
<!--          <el-dropdown-menu slot="dropdown">-->
<!--&lt;!&ndash;            <el-dropdown-item>查看</el-dropdown-item>&ndash;&gt;-->
<!--&lt;!&ndash;            <el-dropdown-item>新增</el-dropdown-item>&ndash;&gt;-->
<!--            <el-dropdown-item >登出</el-dropdown-item>-->
<!--          </el-dropdown-menu>-->
<!--        </el-dropdown>-->
      </el-header>

      <el-main>
<!--        <el-table :data="tableData">-->
<!--          <el-table-column prop="date" label="日期" width="140">-->
<!--          </el-table-column>-->
<!--          <el-table-column prop="name" label="姓名" width="120">-->
<!--          </el-table-column>-->
<!--          <el-table-column prop="address" label="地址">-->
<!--          </el-table-column>-->
<!--        </el-table>-->
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>

</template>

<script>
/* eslint-disable */
export default {
  mounted: function () {
    this.loadActive()
  },
  data () {
    return {
      tableData: Array(20).fill(item),
      name: '',
      username: ''
    }
  },
  methods: {
    loadActive () {
      var _this = this
      this.$axios.get('/auth/myself').then(resp => {
        if (resp && resp.data.code === 200) {
          this.name=resp.data.result.username
          // console.log(resp)
        }
      })
    },
    exit () {
      this.$axios.get('/auth/myself').then(suresponse => {
        this.username = suresponse.data.result.username
        console.log(this.username)
      })
      this.$axios.get('/logout', {
        username: this.username
      }).then(resp => {
        if (resp && resp.data.code === 200) {
          console.log('success')
          console.log(resp)
          this.$router.push({
            path: '/login'
          })
        }
      })
    },
    person () {
      console.log('success')
      this.$router.push({
        path: '/Myinfo'
      })
    },
    changeSidebar (path) {
      this.$router.push(path)
    },
    handleOpen (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath)
    }
  }

}
</script>

<style>
.el-header {
  background-color: #B3C0D1;
  color: #333;
  line-height: 60px;
}

.el-aside {
  height:100vh;
  overflow-y: hidden;
  overflow-x: hidden;
}
/*index.scss*/
::-webkit-scrollbar {
  /*隐藏滚轮*/
  display: none;
}
.el-divider--vertical {
  display: inline-block;
  width: 1px;
  height: 4em;
  margin: 13px 8px;
  vertical-align: middle;
  position: relative;
}
.el-card__body, .el-main {
  padding: 0px;
}
</style>
