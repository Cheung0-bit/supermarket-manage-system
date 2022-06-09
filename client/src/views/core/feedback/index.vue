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
        <el-col :span="4">
          <el-input
            v-model="listQuery.goodsName"
            size="mini"
            placeholder="请输入货品名"
            @keyup.enter.native="search"
          ></el-input>
        </el-col>
        <el-col :span="8">
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
      <br />
      <!-- 顶部按钮部分 -->
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
          <el-table-column label="用户名" align="left">
            <template slot-scope="scope">
              <el-tag type="success" size="mini">
                {{ scope.row.username }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column label="货物名" align="left">
            <template slot-scope="scope">
              <el-tag type="info" size="mini">
                {{ scope.row.goods.goodsName }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column label="货品图片">
            <template slot-scope="scope">
              <el-image
                :src="scope.row.picture"
                :preview-src-list="[scope.row.picture]"
                >></el-image
              >
            </template>
          </el-table-column>
          <el-table-column label="用户评价">
            <template slot-scope="scope">
              {{ scope.row.comment }}
            </template>
          </el-table-column>
          <el-table-column label="店家回复">
            <template slot-scope="scope">
              {{ scope.row.reply || '未回复' }}
            </template>
          </el-table-column>
          <el-table-column label="创建时间" sortable prop="createTime">
            <template slot-scope="scope">
              <el-tag type="warning" size="mini">
                {{ scope.row.createTime }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column label="操作" min-width="150px">
            <template slot-scope="scope">
              <el-button
                type="text"
                size="mini"
                icon="el-icon-s-promotion"
                @click.native="replyItem(scope.row)"
              >
                {{ $t('button.reply') }}
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
    <el-dialog :visible.sync="replyVisible" width="70%">
      <el-input placeholder="请输入内容" v-model="replyContext"> </el-input>
      <el-button type="text" icon="el-icon-s-promotion" @click.native="doReply">
        {{ $t('button.reply') }}
      </el-button>
    </el-dialog>
  </div>
</template>

<script src="./feedback.js"></script>

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
