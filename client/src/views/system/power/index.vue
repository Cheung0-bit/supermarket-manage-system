<template>
  <div class="app-container">
    <div class="block">
      <el-row :gutter="20">
        <el-col :span="4">
          <el-input
            v-model="listQuery.powerName"
            size="mini"
            placeholder="请输入权限名称"
            @keyup.enter.native="search"
          ></el-input>
        </el-col>
        <el-col :span="4">
          <el-input
            v-model="listQuery.powerUrl"
            size="mini"
            placeholder="请输入权限路径"
            @keyup.enter.native="search"
          ></el-input>
        </el-col>
        <el-col :span="4">
          <el-input
            v-model="listQuery.powerCode"
            size="mini"
            placeholder="请输入权限标识"
            @keyup.enter.native="search"
          ></el-input>
        </el-col>
        <el-col :span="4">
          <el-button
            type="success"
            size="mini"
            icon="el-icon-search"
            @click.native="search"
            >{{ $t("button.search") }}</el-button
          >
          <el-button
            type="primary"
            size="mini"
            icon="el-icon-refresh"
            @click.native="reset"
            >{{ $t("button.reset") }}</el-button
          >
        </el-col>
      </el-row>
      <br />
      <el-row>
        <el-col :span="24">
          <el-button
            type="success"
            size="mini"
            icon="el-icon-plus"
            @click.native="add"
          >
            {{ $t("button.add") }}
          </el-button>
          <el-button
            type="primary"
            size="mini"
            icon="el-icon-edit"
            @click.native="edit"
          >
            {{ $t("button.edit") }}
          </el-button>
          <el-button
            type="danger"
            size="mini"
            icon="el-icon-delete"
            @click.native="remove"
          >
            {{ $t("button.delete") }}
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
          <el-table-column label="权限名称">
            <template slot-scope="scope">
              <el-tag type="success" size="mini">
                {{ scope.row.powerName }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column label="权限路径">
            <template slot-scope="scope">
              <el-tag type="danger" size="mini">
                {{ scope.row.powerUrl }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column label="权限标识">
            <template slot-scope="scope">
              <el-tag type="warn" size="mini">
                {{ scope.row.powerCode }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column label="创建时间">
            <template slot-scope="scope">
              <el-tag type="info" size="mini">
                {{ scope.row.createTime }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column label="修改时间">
            <template slot-scope="scope">
              <el-tag type="info" size="mini">
                {{ scope.row.updateTime }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column label="启用" align="center">
            <template slot-scope="scope">
              <el-switch
                v-model="scope.row.enable"
                @change="changePowerStatus(scope.row.powerId, scope.row.enable)"
              ></el-switch>
            </template>
          </el-table-column>
          <el-table-column label="操作" min-width="150px" align="center">
            <template slot-scope="scope">
              <el-button
                type="text"
                size="mini"
                icon="el-icon-edit"
                @click.native="editItem(scope.row)"
              >
                {{ $t("button.edit") }}
              </el-button>
              <el-button
                type="text"
                size="mini"
                icon="el-icon-delete"
                @click.native="removeItem(scope.row)"
              >
                {{ $t("button.delete") }}
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
            <el-form-item label="权限名称" prop="powerName">
              <el-input v-model="form.powerName" minlength="1"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="权限路径" prop="powerUrl">
              <el-input v-model="form.powerUrl" minlength="1"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="权限标识" prop="powerCode">
              <el-input v-model="form.powerCode" minlength="1"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="是否启用">
              <el-switch v-model="form.enable"></el-switch>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item>
          <el-button type="primary" @click="savePower">{{
            $t("button.submit")
          }}</el-button>
          <el-button @click.native="formVisible = false">{{
            $t("button.cancel")
          }}</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script src="./power.js"></script>
<style rel="stylesheet/scss" lang="scss">