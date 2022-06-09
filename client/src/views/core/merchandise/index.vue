<template>
  <div class="app-container">
    <div class="block">
      <!-- 顶部搜索部分 -->
      <el-row :gutter="20">
        <el-col :span="4">
          <el-input
            v-model="listQuery.goodsName"
            size="mini"
            placeholder="请输入货品名"
            @keyup.enter.native="search"
          ></el-input>
        </el-col>
        <el-col :span="4">
          <el-select v-model="value" placeholder="请选择" size="mini">
            <el-option
              v-for="item in options"
              :key="item"
              :label="item"
              :value="item"
            >
            </el-option>
          </el-select>
        </el-col>
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
          <el-table-column label="货品类别" align="left">
            <template slot-scope="scope">
              <el-tag type="success" size="medium">
                {{ scope.row.goodsType }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column label="货品名称" align="left">
            <template slot-scope="scope">
              <el-tag type="info" size="medium">
                {{ scope.row.goodsName }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column label="货品图片">
            <template slot-scope="scope">
              <el-image
                :src="scope.row.goodsPic"
                :preview-src-list="[scope.row.goodsPic]"
                >></el-image
              >
            </template>
          </el-table-column>
          <el-table-column label="货品价格">
            <template slot-scope="scope">
              <el-tag type="warning" size="medium">
                ￥{{ scope.row.goodsPrice }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column label="货品库存">
            <template slot-scope="scope">
              <el-tag type="warning" size="medium">
                {{ scope.row.stock }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column label="下单量">
            <template slot-scope="scope">
              <el-tag type="warning" size="medium">
                {{ scope.row.buyCount }}
              </el-tag>
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
            <el-form-item label="货品名称" prop="goodsName">
              <el-input v-model="form.goodsName" minlength="1"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="货品类别" prop="goodsType">
              <el-radio v-model="radio" label="零食"></el-radio>
              <el-radio v-model="radio" label="饮料"></el-radio>
              <el-radio v-model="radio" label="日用品"></el-radio>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="货品价格" prop="goodsPrice">
              <el-input v-model="form.goodsPrice"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="货品图片" prop="goodsPic">
              <el-upload
                class="avatar-uploader"
                v-loading="avatarloading"
                action="https://api.maiquer.tech/api/upload/image"
                name="imgFile"
                :on-success="handleAvatarSuccess"
                :show-file-list="false"
                :before-upload="file => beforeImgUpload(file, 'avatar')"
              >
                <img v-if="form.goodsPic" :src="form.goodsPic" class="avatar" />
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="货品库存" prop="stock">
              <el-input v-model="form.stock"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item>
          <el-button type="primary" @click="saveGoods">{{
            $t('button.submit')
          }}</el-button>
          <el-button @click.native="formVisible = false">{{
            $t('button.cancel')
          }}</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script src="./merchandise.js"></script>

<style lang="scss">
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
