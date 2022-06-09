import { getList, changeStatus, saveRole, remove } from '@/api/system/role';

import { getPowerList, getPowerListByRole, setPower } from '@/api/system/power';

export default {
  name: 'role',
  data() {
    return {
      powerDialog: {
        visible: false,
        powers: [],
        checkedPowerKeys: [1],
        defaultProps: {
          id: 'powerId',
          label: 'powerLabel',
        },
      },
      statusList: [
        {
          label: '启用',
          value: '1',
        },
        {
          label: '冻结',
          value: '2',
        },
      ],
      formVisible: false,
      formTitle: '添加角色',
      form: {
        roleName: '',
        description: '',
        enable: true,
      },
      rules: {
        roleName: [
          {
            required: true,
            message: '请输入角色名称',
            trigger: 'blur',
          },
        ],
        description: [
          {
            required: true,
            message: '请输入角色描述',
            trigger: 'blur',
          },
        ],
      },
      listQuery: {
        page: 1,
        limit: 5,
        roleName: undefined,
        description: undefined,
      },
      total: 0,
      list: null,
      listLoading: true,
      selRow: {},
    };
  },
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'gray',
        deleted: 'danger',
      };
      return statusMap[status];
    },
  },
  created() {
    this.init();
  },
  methods: {
    // 初始化
    init() {
      this.fetchData();
    },
    // 获取角色信息
    fetchData() {
      this.listLoading = true;
      getList(this.listQuery).then(response => {
        const { data } = response.data;
        this.list = data.dataCurrentPage;
        this.listLoading = false;
        this.total = data.totalCount;
      });
    },
    // 搜索
    search() {
      this.listQuery.page = 1;
      this.fetchData();
    },
    // 重置
    reset() {
      this.listQuery.roleName = '';
      this.listQuery.description = '';
      this.listQuery.page = 1;
      this.fetchData();
    },
    // 过滤
    handleFilter() {
      this.listQuery.page = 1;
      this.getList();
    },
    handleClose() {},
    fetchNext() {
      this.listQuery.page = this.listQuery.page + 1;
      this.fetchData();
    },
    fetchPrev() {
      this.listQuery.page = this.listQuery.page - 1;
      this.fetchData();
    },
    fetchPage(page) {
      this.listQuery.page = page;
      this.fetchData();
    },
    changeSize(limit) {
      this.listQuery.limit = limit;
      this.fetchData();
    },
    handleCurrentChange(currentRow, oldCurrentRow) {
      this.selRow = currentRow;
    },
    resetForm() {
      this.form = {
        roleName: '',
        description: '',
        enable: true,
      };
    },
    add() {
      this.resetForm();
      this.formTitle = '添加角色';
      this.formVisible = true;
    },
    changeRoleStatus(roleId, enable) {
      var params = {
        roleId: roleId,
        enable: enable,
      };
      changeStatus(params)
        .then(() => {
          this.$notify({
            title: '成功',
            message: '修改成功',
            type: 'success',
          });
          this.fetchData();
        })
        .catch(() => {
          this.fetchData();
        });
    },
    saveRole() {
      var self = this;
      this.$refs['form'].validate(valid => {
        if (valid) {
          this.$message({
            message: '不允许你修改哦',
            type: 'error',
          });
          this.formVisible = false;
          this.fetchData();
        } else {
          return false;
        }
      });
    },
    checkSel() {
      if (this.selRow && this.selRow.roleId) {
        return true;
      }
      this.$message({
        message: '请选中操作项',
        type: 'warning',
      });
      return false;
    },
    editItem(record) {
      this.selRow = Object.assign({}, record);
      this.edit();
    },
    edit() {
      if (this.checkSel()) {
        let form = Object.assign({}, this.selRow);
        let newForm = {
          roleId: form.roleId,
          roleName: form.roleName,
          description: form.description,
          enable: form.enable,
        };
        this.form = newForm;
        console.log(this.form);
        this.formTitle = '修改角色';
        this.formVisible = true;
      }
    },
    openPowerItem(record) {
      this.selRow = record;
      this.openPower();
    },
    openPower() {
      if (this.checkSel()) {
        this.powerDialog.checkedPowerKeys = [];
        getPowerList().then(response => {
          const { data } = response.data;
          for (const power of data) {
            power.powerLabel = `${power.powerName} ${power.powerCode}`;
          }
          this.powerDialog.powers = data;
        });
        this.powerDialog.visible = true;
        let form = Object.assign({}, this.selRow);
        getPowerListByRole(form.roleId).then(response => {
          const { data } = response.data;
          this.powerDialog.checkedPowerKeys = data;
        });
      }
    },
    setPower() {
      var checkedPowerKeys = this.$refs.powerTree.getCheckedKeys();
      var powerIds = '';
      for (var index in checkedPowerKeys) {
        powerIds += checkedPowerKeys[index] + ',';
      }
      var data = {
        roleId: this.selRow.roleId,
        powerIds: powerIds.slice(0, -1),
      };
      setPower(data).then(response => {
        this.powerDialog.visible = false;
        this.fetchData();
        this.$message({
          message: '提交成功',
          type: 'success',
        });
      });
    },
    removeItem(record) {
      this.selRow = record;
      this.remove();
    },
    remove() {
      if (this.checkSel()) {
        var roleId = this.selRow.roleId;
        this.$confirm('确定删除该记录?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        })
          .then(() => {
            this.$message({
              message: '不允许你删除哦',
              type: 'error',
            });
          })
          .catch(() => {});
      }
    },
  },
};
