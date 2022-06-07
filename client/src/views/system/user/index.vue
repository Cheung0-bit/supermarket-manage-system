<template>
  <div class="app-container">
    <div class="block">
      <!-- 顶部搜索部分 -->
      <el-row :gutter="20">
        <el-col :span="4">
          <el-input
            v-model="listQuery.username"
            size="mini"
            placeholder="请输入用户名"
            @keyup.enter.native="search"
          ></el-input>
        </el-col>
        <el-col :span="4"> </el-col>
        <el-col :span="4">
          <el-button
            type="success"
            size="mini"
            icon="el-icon-search"
            @click.native="search"
            >{{ $t('button.search') }}</el-button
          >
          <el-button
            type="primary"
            size="mini"
            icon="el-icon-refresh"
            @click.native="reset"
            >{{ $t('button.reset') }}</el-button
          >
        </el-col>
      </el-row>
      <br />
      <!-- 顶部按钮部分 -->
      <el-row>
        <el-col :span="24">
          <el-button
            type="success"
            size="mini"
            icon="el-icon-plus"
            @click.native="add"
          >
            {{ $t('button.add') }}
          </el-button>
          <el-button
            type="primary"
            size="mini"
            icon="el-icon-edit"
            @click.native="edit"
          >
            {{ $t('button.edit') }}
          </el-button>
          <el-button
            type="danger"
            size="mini"
            icon="el-icon-delete"
            @click.native="remove"
          >
            {{ $t('button.delete') }}
          </el-button>
          <el-button
            type="danger"
            size="mini"
            icon="el-icon-refresh-right"
            @click.native="resetPwd"
          >
            {{ $t('button.resetPwd') }}
          </el-button>

          <el-button
            type="info"
            size="mini"
            icon="el-icon-s-operation"
            @click.native="openRole"
          >
            {{ $t('button.roleAllocate') }}</el-button
          >
        </el-col>
      </el-row>
    </div>
    <!-- 表格部分 -->
    <el-row>
      <el-col :span="24">
        <el-table
          :data="list"
          size="mini"
          v-loading="listLoading"
          element-loading-text="Loading"
          border
          fit
          highlight-current-row
          @current-change="handleCurrentChange"
        >
          <el-table-column label="系统用户名">
            <template slot-scope="scope">
              <el-popover trigger="hover" placement="top">
                <p>
                  微信ID:
                  {{ scope.row.openid || '未绑定微信' }}
                </p>
                <p>
                  密码:
                  {{ scope.row.password || '未设置密码' }}
                </p>
                <div slot="reference" class="name-wrapper">
                  <el-tag type="success" size="mini">
                    {{ scope.row.username }}
                  </el-tag>
                </div>
              </el-popover>
            </template>
          </el-table-column>
          <el-table-column label="角色" align="left">
            <template slot-scope="scope">
              <el-tag type="danger" size="mini">
                {{ scope.row.sysRole.description }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column label="头像">
            <template slot-scope="scope">
              <el-image
                :src="scope.row.avatar"
                :preview-src-list="[scope.row.avatar]"
                >></el-image
              >
            </template>
          </el-table-column>
          <el-table-column label="签名">
            <template slot-scope="scope">
              <el-tag type="warning" size="mini">
                {{ scope.row.signature }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column label="启用" align="center">
            <template slot-scope="scope">
              <el-switch
                v-model="scope.row.enable"
                @change="changeUserStatus(scope.row.id, scope.row.enable)"
              ></el-switch>
            </template>
          </el-table-column>
          <el-table-column label="操作" min-width="150px">
            <template slot-scope="scope">
              <el-button
                type="text"
                size="mini"
                icon="el-icon-edit"
                @click.native="editItem(scope.row)"
              >
                {{ $t('button.edit') }}
              </el-button>
              <el-button
                type="text"
                size="mini"
                icon="el-icon-delete"
                @click.native="removeItem(scope.row)"
              >
                {{ $t('button.delete') }}
              </el-button>
              <el-button
                type="text"
                size="mini"
                icon="el-icon-s-operation"
                @click.native="openRoleItem(scope.row)"
                >角色分配</el-button
              >
            </template>
          </el-table-column>
        </el-table>

        <el-pagination
          background
          layout="total, sizes, prev, pager, next, jumper"
          :page-sizes="[5, 10, 20, 50, 100, 500]"
          :page-size="listQuery.limit"
          :total="total"
          :current-page.sync="listQuery.page"
          @size-change="changeSize"
          @current-change="fetchPage"
          @prev-click="fetchPrev"
          @next-click="fetchNext"
        >
        </el-pagination>
      </el-col>
    </el-row>
    <el-dialog :title="formTitle" :visible.sync="formVisible" width="70%">
      <el-form
        ref="form"
        :model="form"
        :rules="rules"
        label-width="120px"
        label-position="right"
      >
        <el-row>
          <el-col :span="12">
            <el-form-item label="用户名" prop="username">
              <el-input v-model="form.username" minlength="1"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="密码" prop="password">
              <el-input v-model="form.password" type="password"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="签名" prop="signature">
              <el-input v-model="form.signature"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="头像" prop="avatar">
              <el-upload
                class="avatar-uploader"
                v-loading="avatarloading"
                action="https://api.maiquer.tech/api/upload/image"
                name="imgFile"
                :headers="token"
                :on-success="handleAvatarSuccess"
                :show-file-list="false"
                :before-upload="file => beforeImgUpload(file, 'avatar')"
              >
                <img v-if="form.avatar" :src="form.avatar" class="avatar" />
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="角色分配">
              <el-radio v-model="radio" label="1">超级管理员</el-radio>
              <el-radio v-model="radio" label="2">超市收银员</el-radio>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="是否启用">
              <el-switch v-model="form.enable"></el-switch>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item>
          <el-button type="primary" @click="saveUser">{{
            $t('button.submit')
          }}</el-button>
          <el-button @click.native="formVisible = false">{{
            $t('button.cancel')
          }}</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

    <el-dialog title="角色分配" :visible.sync="roleVisible" width="25%">
      <el-form>
        <el-form-item>
          <el-radio v-model="radio" label="1">超级管理员</el-radio>
          <el-radio v-model="radio" label="2">超市收银员</el-radio>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="setRole">{{
            $t('button.submit')
          }}</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script src="./user.js"></script>
<style rel="stylesheet/scss" lang="scss">
@import 'src/styles/common.scss';
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
