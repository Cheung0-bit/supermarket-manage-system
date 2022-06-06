"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _power = require("@/api/system/power");

var _default = {
  name: 'power',
  data: function data() {
    return {
      statusList: [{
        label: '启用',
        value: '1'
      }, {
        label: '冻结',
        value: '2'
      }],
      formVisible: false,
      formTitle: '添加权限',
      form: {
        powerName: '',
        powerUrl: '',
        powerCode: '',
        enable: true
      },
      rules: {
        powerName: [{
          required: true,
          message: '请输入权限名称',
          trigger: 'blur'
        }],
        powerUrl: [{
          required: true,
          message: '请输入权限路径',
          trigger: 'blur'
        }],
        powerCode: [{
          required: true,
          message: '请输入权限标识',
          trigger: 'blur'
        }]
      },
      listQuery: {
        page: 1,
        limit: 10,
        powerName: undefined,
        powerUrl: undefined,
        powerCode: undefined
      },
      total: 0,
      list: null,
      listLoading: true,
      selRow: {}
    };
  },
  filters: {
    statusFilter: function statusFilter(status) {
      var statusMap = {
        published: 'success',
        draft: 'gray',
        deleted: 'danger'
      };
      return statusMap[status];
    }
  },
  created: function created() {
    this.init();
  },
  methods: {
    // 初始化
    init: function init() {
      this.fetchData();
    },
    // 获取权限信息
    fetchData: function fetchData() {
      var _this = this;

      this.listLoading = true;
      (0, _power.getPowerList)(this.listQuery).then(function (response) {
        var data = response.data.data;
        _this.list = data.dataCurrentPage;
        _this.listLoading = false;
        _this.total = data.totalCount;
      });
    },
    // 搜索
    search: function search() {
      this.listQuery.page = 1;
      this.fetchData();
    },
    // 重置
    reset: function reset() {
      this.listQuery.powerName = '';
      this.listQuery.powerUrl = '';
      this.listQuery.powerCode = '';
      this.listQuery.page = 1;
      this.fetchData();
    },
    // 过滤
    handleFilter: function handleFilter() {
      this.listQuery.page = 1;
      this.getList();
    },
    handleClose: function handleClose() {},
    fetchNext: function fetchNext() {
      this.listQuery.page = this.listQuery.page + 1;
      this.fetchData();
    },
    fetchPrev: function fetchPrev() {
      this.listQuery.page = this.listQuery.page - 1;
      this.fetchData();
    },
    fetchPage: function fetchPage(page) {
      this.listQuery.page = page;
      this.fetchData();
    },
    changeSize: function changeSize(limit) {
      this.listQuery.limit = limit;
      this.fetchData();
    },
    handleCurrentChange: function handleCurrentChange(currentRow, oldCurrentRow) {
      this.selRow = currentRow;
    },
    resetForm: function resetForm() {
      this.form = {
        powerName: '',
        powerUrl: '',
        powerCode: '',
        enable: true
      };
    },
    add: function add() {
      this.resetForm();
      this.formTitle = '添加权限';
      this.formVisible = true;
    },
    changePowerStatus: function changePowerStatus(powerId, enable) {
      var _this2 = this;

      var params = {
        "powerId": powerId,
        "enable": enable
      };
      (0, _power.changeStatus)(params).then(function () {
        _this2.$notify({
          title: '成功',
          message: '修改成功',
          type: 'success'
        });

        _this2.fetchData();
      })["catch"](function () {
        _this2.fetchData();
      });
    },
    savePower: function savePower() {
      var _this3 = this;

      var self = this;
      this.$refs['form'].validate(function (valid) {
        if (valid) {
          var form = self.form;
          (0, _power.savePower)(form).then(function (response) {
            _this3.$message({
              message: '提交成功',
              type: 'success'
            });

            _this3.fetchData();

            _this3.formVisible = false;
          });
        } else {
          return false;
        }
      });
    },
    checkSel: function checkSel() {
      if (this.selRow && this.selRow.powerId) {
        return true;
      }

      this.$message({
        message: '请选中操作项',
        type: 'warning'
      });
      return false;
    },
    editItem: function editItem(record) {
      this.selRow = Object.assign({}, record);
      this.edit();
    },
    edit: function edit() {
      if (this.checkSel()) {
        var form = Object.assign({}, this.selRow);
        var newForm = {
          powerId: form.powerId,
          powerName: form.powerName,
          powerUrl: form.powerUrl,
          powerCode: form.powerCode,
          enable: form.enable
        };
        this.form = newForm;
        console.log(this.form);
        this.formTitle = '修改权限';
        this.formVisible = true;
      }
    },
    removeItem: function removeItem(record) {
      this.selRow = record;
      this.remove();
    },
    remove: function remove() {
      var _this4 = this;

      if (this.checkSel()) {
        var powerId = this.selRow.powerId;
        this.$confirm('确定删除该记录?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(function () {
          (0, _power.remove)(powerId).then(function (response) {
            _this4.$message({
              message: '删除成功',
              type: 'success'
            });

            _this4.fetchData();
          })["catch"](function (err) {
            _this4.$notify.error({
              title: '错误',
              message: err
            });
          });
        })["catch"](function () {});
      }
    }
  }
};
exports["default"] = _default;