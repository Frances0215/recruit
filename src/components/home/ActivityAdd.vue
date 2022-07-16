<template xmlns:el-col="http://www.w3.org/1999/html">
  <el-row>
    <el-col :span ="24">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm" size="medium">
      <h1 style="font-size: 30px;margin-bottom: 30px">活动添加</h1>
      <el-row>
        <el-col :span="12">
        <el-form-item label="活动名称" prop="name" style="">
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>
        </el-col>
        <el-col :span="12">
        <el-form-item label="活动主题" prop="theme" >
          <el-input v-model="ruleForm.theme" style="float: left"></el-input>
        </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="活动地点" prop="place">
        <el-input v-model="ruleForm.place"></el-input>
      </el-form-item>
      <el-form-item label="活动时间" required>
        <el-col :span="11">
          <el-form-item prop="star_time">
            <el-date-picker type="date" placeholder="选择开始日期" v-model="ruleForm.star_time" style="width: 100%;"></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col class="line" :span="2">-</el-col>
        <el-col :span="11">
          <el-form-item prop="end_time">
            <el-date-picker placeholder="选择结束日期" v-model="ruleForm.end_time" style="width: 100%;"></el-date-picker>
          </el-form-item>
        </el-col>
      </el-form-item>
      <el-form-item label="报名时间" required>
        <el-col :span="11">
          <el-form-item prop="date1">
            <el-date-picker type="date" placeholder="选择报名开始日期" v-model="ruleForm.enroll_time" style="width: 100%;"></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col class="line" :span="2">-</el-col>
        <el-col :span="11">
          <el-form-item prop="date2">
            <el-date-picker placeholder="选择报名结束日期" v-model="ruleForm.enroll_end_time" style="width: 100%;"></el-date-picker>
          </el-form-item>
        </el-col>
      </el-form-item>
      <el-row>
        <el-col :span="12">
          <el-form-item label="参与对象" style="float: left">
            <el-radio-group v-model="ruleForm.limit" style="margin-left: 10px">
              <el-radio label="学生"></el-radio>
              <el-radio label="教师"></el-radio>
              <el-radio label="全部"></el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="参与人数" prop="join_num">
            <el-input v-model="ruleForm.join_num"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="进行方式" prop="tag2" style="float: left">
            <el-radio-group v-model="ruleForm.tag2" style="margin-left: 10px">
              <el-radio label="线上活动"></el-radio>
              <el-radio label="线下活动"></el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="活动类型" prop="tag1" style="float: left">
            <el-radio-group v-model="ruleForm.tag1" style="width: 100%">
              <el-radio label="校内活动"></el-radio>
              <el-radio label="校外活动"></el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="审核流程" prop="reviewer" style="float: left">
            <el-cascader
              :options="options3"
              :props="{ multiple: true, checkStrictly: true }"
              clearable
              v-model="ruleForm.reviewer"
              style="width: 100%"></el-cascader>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="活动详情" prop="text">
        <el-input type="textarea" autosize v-model="ruleForm.text" placeholder="在此输入活动详情页内容"></el-input>
      </el-form-item>
      <el-form-item label="上传图片" prop="photos">
        <el-upload
          class="upload-demo"
          action="https://jsonplaceholder.typicode.com/posts/"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :file-list="fileList"
          list-type="picture"
          show-file-list="true"
          v-model="ruleForm.photos">
          <el-button size="small" type="primary">点击上传图片</el-button>
          <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
      </el-form-item>
      <el-form-item label="上传附件" prop="files">
        <el-upload
          class="upload-demo"
          action="https://jsonplaceholder.typicode.com/posts/"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :before-remove="beforeRemove"
          multiple
          :on-exceed="handleExceed"
          :file-list="fileList"
          v-model="ruleForm.files">
          <el-button size="small" type="primary">点击上传附件</el-button>
          <div slot="tip" class="el-upload__tip">只能上传文件，且不超过500kb</div>
        </el-upload>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm">立即创建</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
    </el-col>
  </el-row>
</template>

<script>
export default {
  data () {
    return {
      ruleForm: {
        star_time: '',
        end_time: '',
        theme: '',
        tag1: '',
        tag2: '',
        name: '',
        join_num: '',
        reviewer: [],
        text: '',
        photos: [],
        files: [],
        limit: '',
        enroll_time: '',
        enroll_end_time: '',
        place: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入活动名称', trigger: 'blur' }
        ],
        theme: [
          { required: true, message: '请输入活动主题', trigger: 'blur' }
        ],
        star_time: [
          { type: 'date', required: true, message: '请选择开始日期', trigger: 'change' }
        ],
        end_time: [
          { type: 'date', required: true, message: '请选择结束日期', trigger: 'change' }
        ],
        type: [
          { type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' }
        ],
        tag1: [
          { required: true, message: '请选择活动类型', trigger: 'change' }
        ],
        tag2: [
          { required: true, message: '请选择活动形式', trigger: 'change' }
        ],
        join_num: [
          { required: true, type: 'int', message: '请输入最大参与人数', trigger: 'blur' }
        ],
        limit: [
          { required: true, message: '请选择参与对象', trigger: 'change' }
        ],
        text: [
          { required: true, type: 'text', message: '请输入活动详情', trigger: 'blur' }
        ],
        enroll_time: [
          { type: 'date', required: true, message: '请选择报名开始日期', trigger: 'change' }
        ],
        enroll_end_time: [
          { type: 'date', required: true, message: '请选择报名结束日期', trigger: 'change' }
        ]
      },
      options3: [{
        value: 'zhinan',
        label: '指南',
        children: [{
          value: 'shejiyuanze',
          label: '设计原则',
          children: [{
            value: 'yizhi',
            label: '一致'
          }, {
            value: 'fankui',
            label: '反馈'
          }, {
            value: 'xiaolv',
            label: '效率'
          }, {
            value: 'kekong',
            label: '可控'
          }]
        }, {
          value: 'daohang',
          label: '导航',
          children: [{
            value: 'cexiangdaohang',
            label: '侧向导航'
          }, {
            value: 'dingbudaohang',
            label: '顶部导航'
          }]
        }]
      }, {
        value: 'zujian',
        label: '组件',
        children: [{
          value: 'basic',
          label: 'Basic',
          children: [{
            value: 'layout',
            label: 'Layout 布局'
          }, {
            value: 'color',
            label: 'Color 色彩'
          }, {
            value: 'typography',
            label: 'Typography 字体'
          }, {
            value: 'icon',
            label: 'Icon 图标'
          }, {
            value: 'button',
            label: 'Button 按钮'
          }]
        }, {
          value: 'form',
          label: 'Form',
          children: [{
            value: 'radio',
            label: 'Radio 单选框'
          }, {
            value: 'checkbox',
            label: 'Checkbox 多选框'
          }, {
            value: 'input',
            label: 'Input 输入框'
          }, {
            value: 'input-number',
            label: 'InputNumber 计数器'
          }, {
            value: 'select',
            label: 'Select 选择器'
          }, {
            value: 'cascader',
            label: 'Cascader 级联选择器'
          }, {
            value: 'switch',
            label: 'Switch 开关'
          }, {
            value: 'slider',
            label: 'Slider 滑块'
          }, {
            value: 'time-picker',
            label: 'TimePicker 时间选择器'
          }, {
            value: 'date-picker',
            label: 'DatePicker 日期选择器'
          }, {
            value: 'datetime-picker',
            label: 'DateTimePicker 日期时间选择器'
          }, {
            value: 'upload',
            label: 'Upload 上传'
          }, {
            value: 'rate',
            label: 'Rate 评分'
          }, {
            value: 'form',
            label: 'Form 表单'
          }]
        }, {
          value: 'data',
          label: 'Data',
          children: [{
            value: 'table',
            label: 'Table 表格'
          }, {
            value: 'tag',
            label: 'Tag 标签'
          }, {
            value: 'progress',
            label: 'Progress 进度条'
          }, {
            value: 'tree',
            label: 'Tree 树形控件'
          }, {
            value: 'pagination',
            label: 'Pagination 分页'
          }, {
            value: 'badge',
            label: 'Badge 标记'
          }]
        }, {
          value: 'notice',
          label: 'Notice',
          children: [{
            value: 'alert',
            label: 'Alert 警告'
          }, {
            value: 'loading',
            label: 'Loading 加载'
          }, {
            value: 'message',
            label: 'Message 消息提示'
          }, {
            value: 'message-box',
            label: 'MessageBox 弹框'
          }, {
            value: 'notification',
            label: 'Notification 通知'
          }]
        }, {
          value: 'navigation',
          label: 'Navigation',
          children: [{
            value: 'menu',
            label: 'NavMenu 导航菜单'
          }, {
            value: 'tabs',
            label: 'Tabs 标签页'
          }, {
            value: 'breadcrumb',
            label: 'Breadcrumb 面包屑'
          }, {
            value: 'dropdown',
            label: 'Dropdown 下拉菜单'
          }, {
            value: 'steps',
            label: 'Steps 步骤条'
          }]
        }, {
          value: 'others',
          label: 'Others',
          children: [{
            value: 'dialog',
            label: 'Dialog 对话框'
          }, {
            value: 'tooltip',
            label: 'Tooltip 文字提示'
          }, {
            value: 'popover',
            label: 'Popover 弹出框'
          }, {
            value: 'card',
            label: 'Card 卡片'
          }, {
            value: 'carousel',
            label: 'Carousel 走马灯'
          }, {
            value: 'collapse',
            label: 'Collapse 折叠面板'
          }]
        }]
      }, {
        value: 'ziyuan',
        label: '资源',
        children: [{
          value: 'axure',
          label: 'Axure Components'
        }, {
          value: 'sketch',
          label: 'Sketch Templates'
        }, {
          value: 'jiaohu',
          label: '组件交互文档'
        }]
      }],
      fileList: [{name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}, {name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}]
    }
  },
  methods: {
    submitForm () {
      console.log(this.ruleForm)
      let param = new FormData()
      // param.append('star_time', this.ruleForm.star_time)
      // param.append('end_time', this.ruleForm.end_time)
      // param.append('theme', this.ruleForm.theme)
      // param.append('tag1', this.ruleForm.tag1)
      // param.append('tag2', this.ruleForm.tag2)
      // param.append('name', this.ruleForm.name)
      // param.append('join_num', this.ruleForm.join_num)
      // param.append('reviewer', this.ruleForm.reviewer)
      // param.append('text', this.ruleForm.text)
      // param.append('limit', this.ruleForm.limit)
      // param.append('enroll_time', this.ruleForm.enroll_time)
      // param.append('enroll_end_time', this.ruleForm.enroll_end_time)
      // param.append('place', this.ruleForm.place)
      param.append('star_time', 'Fri Jul 08 2022 00:00:00 GMT+0800')
      param.append('end_time', 'Fri Jul 08 2022 00:00:00 GMT+0800')
      param.append('theme', '诚邀新友，共赏明月')
      param.append('tag1', '校内活动')
      param.append('tag2', '线下活动')
      param.append('name', '寝室文化节')
      param.append('join_num', 100)
      param.append('reviewer', ['软件学院'])
      param.append('text', '111111111111111')
      param.append('limit', '全部')
      param.append('enroll_time', 'Fri Jul 08 2022 00:00:00 GMT+0800')
      param.append('enroll_end_time', 'Fri Jul 08 2022 00:00:00 GMT+0800')
      param.append('place', '二基楼报告厅')
      param.append('can_join', '四川大学')
      let url = '/admin/active/creat'
      this.$axios.post(url, param).then(res => {
        console.log('请求成功')
        console.log(res)
      }).catch(error => {
        console.log('请求失败')
        console.log(error)
      })
    },
    // {
    //   star_time: this.ruleForm.star_time,
    //     end_time: this.ruleForm.end_time,
    //   theme: this.ruleForm.theme,
    //   tag1: this.ruleForm.tag1,
    //   tag2: this.ruleForm.tag2,
    //   name: this.ruleForm.name,
    //   join_num: this.ruleForm.join_num,
    //   reviewer: this.ruleForm.reviewer,
    //   text: this.ruleForm.text,
    //   limit: this.ruleForm.limit,
    //   enroll_time: this.ruleForm.enroll_time,
    //   enroll_end_time: this.ruleForm.enroll_end_time,
    //   place: this.ruleForm.place
    // }
    resetForm (formName) {
      this.$refs[formName].resetFields()
    },
    handleRemove (file, fileList) {
      console.log(file, fileList)
    },
    handlePreview (file) {
      console.log(file)
    }
  }
}
</script>
<style>
.el-form-item__label {
  text-align: right;
  vertical-align: middle;
  float: left;
  font-size: 18px;
  color: #606266;
  line-height: 40px;
  padding: 0 12px 0 0;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}
/*.el-input{*/
/*  margin-left: 10px;*/
/*  float: left;*/
/*}*/
</style>
