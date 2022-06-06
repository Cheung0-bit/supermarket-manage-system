"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _user = require("@/api/system/user");

var _auth = require("@/utils/auth");

var roleArray = ['SUPER_ADMIN', 'SYSTEM_ADMIN', 'VIP', 'USER'];
var _default = {
  name: 'mgr',
  data: function data() {
    return {
      roleArray: roleArray,
      roleDialog: {
        visible: false,
        roles: [{
          roleId: 1,
          roleName: 'SUPER_ADMIN'
        }, {
          roleId: 2,
          roleName: 'SYSTEM_ADMIN'
        }, {
          roleId: 3,
          roleName: 'VIP'
        }, {
          roleId: 4,
          roleName: 'USER'
        }],
        checkedRoleKeys: [],
        defaultProps: {
          id: 'roleId',
          label: 'roleName'
        }
      },
      statusList: [{
        label: '启用',
        value: '1'
      }, {
        label: '冻结',
        value: '2'
      }],
      formVisible: false,
      formTitle: '添加用户',
      roleSet: [],
      form: {
        username: '',
        password: '',
        nickname: '',
        phone: '',
        email: '',
        avatar: '',
        backImg: '',
        signature: '从前从前,有个人爱你很久...',
        enable: true
      },
      rules: {
        username: [{
          required: true,
          message: '请输入登录账号',
          trigger: 'blur'
        }, {
          min: 5,
          max: 20,
          message: '长度在 5 到 20 个字符',
          trigger: 'blur'
        }],
        password: [{
          required: false,
          message: '请输入登录密码',
          trigger: 'blur'
        }, {
          min: 5,
          max: 20,
          message: '长度在 5 到 20 个字符',
          trigger: 'blur'
        }],
        nickname: [{
          required: true,
          message: '请输入用户昵称',
          trigger: 'blur'
        }, {
          min: 2,
          max: 20,
          message: '长度在 2 到 20 个字符',
          trigger: 'blur'
        }],
        phone: [{
          required: false,
          message: '请输入email',
          trigger: 'blur'
        }],
        email: [{
          required: false,
          message: '请输入email',
          trigger: 'blur'
        }]
      },
      listQuery: {
        page: 1,
        limit: 5,
        userNmae: undefined,
        nickName: undefined,
        phone: undefined,
        email: undefined
      },
      avatarloading: false,
      backImgloading: false,
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
    // 获取用户信息
    fetchData: function fetchData() {
      var _this = this;

      this.listLoading = true;
      (0, _user.getList)(this.listQuery).then(function (response) {
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
      this.listQuery.userNmae = '';
      this.listQuery.nickName = '';
      this.listQuery.page = 1;
      this.listQuery.phone = '';
      this.listQuery.email = '';
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
        username: '',
        password: '',
        nickname: '',
        phone: '',
        email: '',
        avatar: '',
        backImg: '',
        signature: '',
        enable: true
      };
    },
    add: function add() {
      this.resetForm();
      this.formTitle = '添加用户';
      this.formVisible = true;
    },
    changeUserStatus: function changeUserStatus(userId, enable) {
      var _this2 = this;

      var params = {
        "userId": userId,
        "enable": enable
      };
      (0, _user.changeStatus)(params).then(function () {
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
    saveUser: function saveUser() {
      var _this3 = this;

      var self = this;
      this.$refs['form'].validate(function (valid) {
        if (valid) {
          var form = self.form;
          var roleSet = [];
          var _iteratorNormalCompletion = true;
          var _didIteratorError = false;
          var _iteratorError = undefined;

          try {
            for (var _iterator = _this3.roleSet[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
              var role = _step.value;

              if (role == 'SUPER_ADMIN') {
                roleSet.push({
                  'roleId': 1
                });
              } else if (role == 'SYSTEM_ADMIN') {
                roleSet.push({
                  'roleId': 2
                });
              } else if (role == 'VIP') {
                roleSet.push({
                  'roleId': 3
                });
              } else {
                roleSet.push({
                  'roleId': 4
                });
              }
            }
          } catch (err) {
            _didIteratorError = true;
            _iteratorError = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion && _iterator["return"] != null) {
                _iterator["return"]();
              }
            } finally {
              if (_didIteratorError) {
                throw _iteratorError;
              }
            }
          }

          form.roleSet = roleSet;
          console.log(form);
          (0, _user.saveUser)(form).then(function (response) {
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
      if (this.selRow && this.selRow.id) {
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
        form.password = '';
        var newForm = {
          id: form.id,
          username: form.username,
          password: '',
          nickname: form.nickname,
          phone: form.phone,
          email: form.email,
          signature: form.signature,
          avatar: form.avatar,
          backImg: form.backImg,
          roleSet: form.roleSet,
          enable: form.enable
        };
        this.form = newForm;
        this.formTitle = '修改用户';
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
        var id = this.selRow.id;
        this.$confirm('确定删除该记录?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(function () {
          (0, _user.remove)(id).then(function (response) {
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
    },
    // 图片验证
    beforeImgUpload: function beforeImgUpload(file, type) {
      if (type == 'avatar') {
        this.avatarloading = true;
      } else {
        this.backImgloading = true;
      }

      var isJPG = file.type === 'image/jpeg' || file.type === 'image/gif' || file.type === 'image/png';
      var isLt4M = file.size / 1024 / 1024 / 1024 / 1024 < 4;

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!');
      }

      if (!isLt4M) {
        this.$message.error('上传头像图片大小不能超过 4MB!');
      }

      return isJPG && isLt4M;
    },
    // 上传头像成功处理逻辑
    handleAvatarSuccess: function handleAvatarSuccess(res) {
      if (res.code == 0) {
        this.form.avatar = res.data;
        this.$notify({
          title: '成功',
          message: '头像上传成功',
          type: 'success'
        });
        this.avatarloading = false;
      } else {
        this.$message({
          message: res.message,
          type: 'error'
        });
        this.avatarloading = false;
      }
    },
    // 上传背景成功处理逻辑
    handleBackImgSuccess: function handleBackImgSuccess(res) {
      if (res.code == 0) {
        this.form.backImg = res.data;
        this.$notify({
          title: '成功',
          message: '头像上传成功',
          type: 'success'
        });
        this.backImgloading = false;
      } else {
        this.$message({
          message: res.message,
          type: 'error'
        });
        this.backImgloading = false;
      }
    },
    resetPwd: function resetPwd() {
      var _this5 = this;

      if (this.checkSel()) {
        var id = this.selRow.id;
        this.$confirm('将密码重置为maiqu?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(function () {
          (0, _user.resetPassword)(id).then(function (response) {
            _this5.$message({
              message: '重置密码成功',
              type: 'success'
            });
          })["catch"](function (err) {
            _this5.$notify.error({
              title: '错误',
              message: err
            });
          });
        })["catch"](function () {});
      }
    },
    openRoleItem: function openRoleItem(record) {
      this.selRow = record;
      this.openRole();
    },
    openRole: function openRole() {
      if (this.checkSel()) {
        this.roleDialog.visible = true;
      }
    },
    setRole: function setRole() {
      var _this6 = this;

      var checkedRoleKeys = this.$refs.roleTree.getCheckedKeys();
      var roleIds = '';

      for (var index in checkedRoleKeys) {
        roleIds += checkedRoleKeys[index] + ',';
      }

      var data = {
        userId: this.selRow.id,
        roleIds: roleIds.slice(0, -1)
      };
      (0, _user.setRole)(data).then(function (response) {
        _this6.roleDialog.visible = false;

        _this6.fetchData();

        _this6.$message({
          message: '提交成功',
          type: 'success'
        });
      });
    }
  },
  computed: {
    token: function token() {
      return {
        Authorization: (0, _auth.getToken)()
      };
    }
  }
};
exports["default"] = _default;