<template>
  <el-row>
    <el-col :span ="24">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm" size="medium">
        <h1 style="font-size: 30px;margin-bottom: 30px">活动详情</h1>
        <el-row>
          <el-col :span="12">
            <el-form-item label="活动名称" prop="name" style="">
              <span></span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="活动主题" prop="theme" >
              <span></span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="活动地点" prop="address">
          <el-input v-model="ruleForm.address"></el-input>
        </el-form-item>
        <el-form-item label="活动时间" required>
          <el-col :span="11">
            <el-form-item prop="date1">
              <el-date-picker type="date" placeholder="选择开始日期" v-model="ruleForm.date1" style="width: 100%;"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col class="line" :span="2">-</el-col>
          <el-col :span="11">
            <el-form-item prop="date2">
              <el-date-picker placeholder="选择结束日期" v-model="ruleForm.date2" style="width: 100%;"></el-date-picker>
            </el-form-item>
          </el-col>
        </el-form-item>
        <el-form-item label="报名时间" required>
          <el-col :span="11">
            <el-form-item prop="date1">
              <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.date1" style="width: 100%;"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col class="line" :span="2">-</el-col>
          <el-col :span="11">
            <el-form-item prop="date2">
              <el-time-picker placeholder="选择时间" v-model="ruleForm.date2" style="width: 100%;"></el-time-picker>
            </el-form-item>
          </el-col>
        </el-form-item>
        <el-row>
          <el-col :span="12">
            <el-form-item label="参与对象" prop="type" style="float: left">
              <el-checkbox-group v-model="ruleForm.type" style="margin-left: 10px">
                <el-checkbox label="学生" name="type"></el-checkbox>
                <el-checkbox label="老师" name="type"></el-checkbox>
              </el-checkbox-group>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="参与人数" prop="address">
              <el-input v-model="ruleForm.address"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="进行方式" prop="resource" style="float: left">
              <el-radio-group v-model="ruleForm.resource" style="margin-left: 10px">
                <el-radio label="线上活动"></el-radio>
                <el-radio label="线下活动"></el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="活动类型" prop="resource" style="float: left">
              <el-radio-group v-model="ruleForm.resource" style="margin-left: 10px">
                <el-radio label="校内活动"></el-radio>
                <el-radio label="校外活动"></el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="活动详情" prop="desc">
          <el-input type="textarea" autosize v-model="ruleForm.desc" placeholder="在此输入活动详情页内容"></el-input>
        </el-form-item>
        <el-form-item label="上传图片">
          <el-upload
            class="upload-demo"
            action="https://jsonplaceholder.typicode.com/posts/"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :file-list="fileList"
            list-type="picture"
            show-file-list="true">
            <el-button size="small" type="primary">点击上传图片</el-button>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
          </el-upload>
        </el-form-item>
        <el-form-item label="上传附件">
          <el-upload
            class="upload-demo"
            action="https://jsonplaceholder.typicode.com/posts/"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :before-remove="beforeRemove"
            multiple
            :on-exceed="handleExceed"
            :file-list="fileList">
            <el-button size="small" type="primary">点击上传附件</el-button>
            <div slot="tip" class="el-upload__tip">只能上传文件，且不超过500kb</div>
          </el-upload>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>
