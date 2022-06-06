<template>
  <div class="app-container">
    <div class="user">
      <h2>欢迎您 {{ user.roleSet[0].description }}</h2>
    </div>
    <el-row class="user-content" style="">
      <el-col :span="6" class="profile">
        <img class="user-avatar" :src="user.avatar" /><br />
        <p>
          <span class="title"
            ><i class="el-icon-phone"></i>&nbsp;&nbsp;{{ user.phone }}</span
          >
        </p>
        <p>
          <span class="title"
            ><i class="el-icon-message"></i>&nbsp;&nbsp;{{ user.email }}</span
          >
        </p>
        <p>
          <span class="title"
            ><i class="el-icon-open"></i>&nbsp;&nbsp;{{
              user.enable == true ? "启用" : "禁用"
            }}</span
          >
        </p>
        <p>
          <span class="title"
            ><i class="el-icon-location-outline"></i
            >&nbsp;&nbsp;南京信息工程大学</span
          >
        </p>
      </el-col>
      <el-col :span="18" style="padding-left: 10px">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="个人资料" name="profile">
            <el-form label-width="80px">
              <h4>基本信息</h4>
              <el-form-item label="名称">
                <span>{{ user.nickname }}</span>
              </el-form-item>
              <el-form-item label="密码">
                <span>{{ user.password }}</span>
              </el-form-item>
              <el-form-item label="状态">
                <span>{{ user.status }}</span>
              </el-form-item>
              <el-form-item label="签名">
                <span>{{ user.signature }}</span>
              </el-form-item>
              <h4>联系信息</h4>
              <el-form-item label="手机">
                <span>{{ user.phone }}</span>
              </el-form-item>
              <el-form-item label="邮箱">
                <span> {{ user.email }}</span>
              </el-form-item>
              <el-form-item label="地址">
                <span> 南京麦趣科技 </span>
              </el-form-item>
            </el-form>
          </el-tab-pane>
          <el-tab-pane label="最近活动" name="timeline">
            <el-timeline
              :reverse="reverse"
              style="margin-top: 15px; padding-left: 2px"
            >
              <el-timeline-item
                v-for="(activity, index) in activities"
                :key="index"
                :timestamp="activity.createTime"
              >
                {{ activity.logname }}
              </el-timeline-item>
            </el-timeline>
          </el-tab-pane>
          <el-tab-pane label="修改密码" name="updatePwd">
            <el-form
              ref="form"
              :model="form"
              :rules="rules"
              label-position="left"
              label-width="80px"
            >
              <el-row>
                <el-col :span="24">
                  <el-form-item label="原密码" prop="oldPassword">
                    <el-input
                      type="password"
                      v-model="form.oldPassword"
                    ></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="24">
                  <el-form-item label="新密码" prop="newPassword">
                    <el-input
                      type="password"
                      v-model="form.newPassword"
                      minlength="5"
                    ></el-input>
                  </el-form-item>
                </el-col>

                <el-col :span="24">
                  <el-form-item label="重复密码" prop="confirmPassword">
                    <el-input
                      type="password"
                      v-model="form.confirmPassword"
                    ></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-form-item>
                <el-button type="primary" @click="updatePwd">{{
                  $t("button.submit")
                }}</el-button>
              </el-form-item>
            </el-form>
          </el-tab-pane>
        </el-tabs>
      </el-col>
    </el-row>
  </div>
</template>

<script src="./profile.js"></script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "src/styles/common.scss";
.el-form-item {
  margin-bottom: 15px;
}
</style>

