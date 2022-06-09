<template>
<div class="app-container">
  <div class="block">
    <el-row :gutter="20">
      <el-col :span="8">
        <el-input v-model="listQuery.username" size="mini" placeholder="请输入用户名称" @keyup.enter.native="search"></el-input>
      </el-col>
      <el-col :span="8">
        <el-input v-model="listQuery.url" size="mini" placeholder="请输入请求链接" @keyup.enter.native="search"></el-input>
      </el-col>
      <el-col :span="8">
        <el-button type="success" size="mini" icon="el-icon-search" @click.native="search">{{ $t("button.search") }}</el-button>
        <el-button type="primary" size="mini" icon="el-icon-refresh" @click.native="reset">{{ $t("button.reset") }}</el-button>
        <el-button type="danger" size="mini" icon="el-icon-delete" @click.native="remove">
          {{ $t("button.delete") }}
        </el-button>
      </el-col>
    </el-row>
  </div>
  <br />
  <!-- 表格部分 -->
  <el-row>
    <el-col :span="24">
      <el-table :data="list" size="mini" v-loading="listLoading" element-loading-text="Loading" border fit highlight-current-row @current-change="handleCurrentChange">
        <el-table-column label="日志名称">
          <template slot-scope="scope">
            {{ scope.row.logName }}
          </template>
        </el-table-column>
        <el-table-column label="操作用户">
          <template slot-scope="scope">
            {{ scope.row.username }}
          </template>
        </el-table-column>
        <el-table-column label="操作角色">
          <template slot-scope="scope">
            {{ scope.row.roleName }}
          </template>
        </el-table-column>
        <el-table-column label="API路径">
          <template slot-scope="scope">
            {{ scope.row.url }}
          </template>
        </el-table-column>
        <el-table-column label="请求IP">
          <template slot-scope="scope">
            {{ scope.row.ip }}
          </template>
        </el-table-column>
        <el-table-column label="方法名">
          <template slot-scope="scope">
            {{ scope.row.functionName }}
          </template>
        </el-table-column>
        <el-table-column label="入参">
          <template slot-scope="scope">
            {{ scope.row.inParam }}
          </template>
        </el-table-column>
        <el-table-column label="出参">
          <template slot-scope="scope">
            <el-popover placement="bottom" width="200" trigger="click" :content="scope.row.outParam">
              <el-button slot="reference">点击查看</el-button>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column label="请求时间" sortable prop="createTime">
          <template slot-scope="scope">
            {{ scope.row.createTime }}
          </template>
        </el-table-column>
        <el-table-column label="操作" min-width="150px" align="center">
          <template slot-scope="scope">
            <el-button type="text" size="mini" icon="el-icon-delete" @click.native="removeItem(scope.row)">
              {{ $t("button.delete") }}
            </el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-pagination background layout="total, sizes, prev, pager, next, jumper" :page-sizes="[5, 10, 20, 50, 100, 500]" :page-size="listQuery.limit" :total="total" :current-page.sync="listQuery.page" @size-change="changeSize" @current-change="fetchPage" @prev-click="fetchPrev" @next-click="fetchNext">
      </el-pagination>
    </el-col>
  </el-row>
</div>
</template>

<script src="./loginlog.js"></script>
<style rel="stylesheet/scss" lang="scss">
