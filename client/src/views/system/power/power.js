import {
  getPowerList,
  savePower,
  changeStatus,
  remove,
} from '@/api/system/power';

export default {
  name: 'power',
  data() {
    return {
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
      formTitle: '添加权限',
      form: {
        powerName: '',
        powerCode: '',
        enable: true,
      },
      rules: {
        powerName: [
          {
            required: true,
            message: '请输入权限名称',
            trigger: 'blur',
          },
        ],
        powerCode: [
          {
            required: true,
            message: '请输入权限标识',
            trigger: 'blur',
          },
        ],
      },
      listQuery: {
        page: 1,
        limit: 20,
        powerName: undefined,
        powerCode: undefined,
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
    // 获取权限信息
    fetchData() {
      this.listLoading = true;
      getPowerList(this.listQuery).then(response => {
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
      this.listQuery.powerName = '';
      this.listQuery.powerCode = '';
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
        powerName: '',
        powerCode: '',
        enable: true,
      };
    },
    add() {
      this.resetForm();
      this.formTitle = '添加权限';
      this.formVisible = true;
    },
    changePowerStatus(powerId, enable) {
      var params = {
        powerId: powerId,
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
    savePower() {
      var self = this;
      this.$refs['form'].validate(valid => {
        if (valid) {
          var form = self.form;
          savePower(form).then(response => {
            this.$message({
              message: '提交成功',
              type: 'success',
            });
            this.fetchData();
            this.formVisible = false;
          });
        } else {
          return false;
        }
      });
    },
    checkSel() {
      if (this.selRow && this.selRow.powerId) {
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
          powerId: form.powerId,
          powerName: form.powerName,
          powerCode: form.powerCode,
          enable: form.enable,
        };
        this.form = newForm;
        console.log(this.form);
        this.formTitle = '修改权限';
        this.formVisible = true;
      }
    },
    removeItem(record) {
      this.selRow = record;
      this.remove();
    },
    remove() {
      if (this.checkSel()) {
        var powerId = this.selRow.powerId;
        this.$confirm('确定删除该记录?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        })
          .then(() => {
            remove(powerId)
              .then(response => {
                this.$message({
                  message: '删除成功',
                  type: 'success',
                });
                this.fetchData();
              })
              .catch(err => {
                this.$notify.error({
                  title: '错误',
                  message: err,
                });
              });
          })
          .catch(() => {});
      }
    },
  },
};
