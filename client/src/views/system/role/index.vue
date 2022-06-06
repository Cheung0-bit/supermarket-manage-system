<template>
  <div class="app-container">
    <div class="block">
      <el-row :gutter="20">
        <el-col :span="8">
          <el-input
            v-model="listQuery.roleName"
            size="mini"
            placeholder="请输入角色名称"
            @keyup.enter.native="search"
          ></el-input>
        </el-col>
        <el-col :span="8">
          <el-input
            v-model="listQuery.description"
            size="mini"
            placeholder="请输入角色描述"
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
          <el-button
            type="info"
            size="mini"
            icon="el-icon-s-operation"
            @click.native="openPower"
          >
            {{ $t("button.powerAllocate") }}
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
          <el-table-column label="角色名称">
            <template slot-scope="scope">
              <el-tag type="success" size="mini">
                {{ scope.row.roleName }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column label="角色描述">
            <template slot-scope="scope">
              <el-tag type="danger" size="mini">
                {{ scope.row.description }}
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
                @change="changeRoleStatus(scope.row.roleId, scope.row.enable)"
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
              <el-button
                type="text"
                size="mini"
                icon="el-icon-s-operation"
                @click.native="openPowerItem(scope.row)"
                >{{ $t("button.powerAllocate") }}</el-button
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
            <el-form-item label="角色名称" prop="roleName">
              <el-input v-model="form.roleName" minlength="1"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="角色描述" prop="description">
              <el-input v-model="form.description" minlength="1"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="是否启用">
              <el-switch v-model="form.enable"></el-switch>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item>
          <el-button type="primary" @click="saveRole">{{
            $t("button.submit")
          }}</el-button>
          <el-button @click.native="formVisible = false">{{
            $t("button.cancel")
          }}</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-dialog title="权限分配" :visible.sync="powerDialog.visible" width="45%">
      <el-form>
        <el-row>
          <el-col :span="12">
            <el-tree
              :data="powerDialog.powers"
              ref="powerTree"
              show-checkbox
              node-key="powerId"
              :default-checked-keys="powerDialog.checkedPowerKeys"
              :props="powerDialog.defaultProps"
            >
            </el-tree>
          </el-col>
        </el-row>
        <el-form-item>
          <el-button type="primary" @click="setPower">{{
            $t("button.submit")
          }}</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script src="./role.js"></script>
<style rel="stylesheet/scss" lang="scss">