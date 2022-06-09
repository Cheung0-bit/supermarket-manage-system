import {
  getList,
  saveUser,
  remove,
  setRole,
  changeStatus,
  resetPassword,
} from '@/api/system/user';
import { getToken } from '@/utils/auth';

const roleArray = ['SUPER_ADMIN', 'SYSTEM_ADMIN', 'VIP', 'USER'];
export default {
  name: 'mgr',
  data() {
    return {
      radio: '2',
      roleArray: roleArray,
      roleVisible: false,
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
      formTitle: '添加用户',
      roleSet: [],
      form: {
        username: '',
        password: '',
        avatar: '',
        signature: '从前从前,有个人爱你很久...',
        enable: true,
      },
      rules: {
        username: [
          {
            required: true,
            message: '请输入登录账号',
            trigger: 'blur',
          },
          {
            min: 5,
            max: 20,
            message: '长度在 5 到 20 个字符',
            trigger: 'blur',
          },
        ],
        password: [
          {
            required: false,
            message: '请输入登录密码',
            trigger: 'blur',
          },
          {
            min: 5,
            max: 20,
            message: '长度在 5 到 20 个字符',
            trigger: 'blur',
          },
        ],
      },
      listQuery: {
        page: 1,
        limit: 5,
        usernmae: undefined,
      },
      avatarloading: false,
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
    // 获取用户信息
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
      this.listQuery.username = '';
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
        username: '',
        password: '',
        avatar: '',
        signature: '',
        enable: true,
      };
    },
    add() {
      this.resetForm();
      this.formTitle = '添加用户';
      this.formVisible = true;
    },
    changeUserStatus(userId, enable) {
      var params = {
        userId: userId,
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
    saveUser() {
      var self = this;
      this.$refs['form'].validate(valid => {
        if (valid) {
          var form = self.form;
          var sysRole = {
            roleId: this.radio,
          };
          form['sysRole'] = sysRole;
          saveUser(form).then(response => {
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
      if (this.selRow && this.selRow.id) {
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
        form.password = '';
        let newForm = {
          id: form.id,
          username: form.username,
          password: '',
          signature: form.signature,
          avatar: form.avatar,
          roleSet: form.roleSet,
          enable: form.enable,
        };
        this.form = newForm;
        this.formTitle = '修改用户';
        this.formVisible = true;
      }
    },
    removeItem(record) {
      this.selRow = record;
      this.remove();
    },
    remove() {
      if (this.checkSel()) {
        var id = this.selRow.id;
        this.$confirm('确定删除该记录?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        })
          .then(() => {
            remove(id)
              .then(response => {
                this.$message({
                  message: '删除成功',
                  type: 'success',
                });
                this.fetchData();
              })
              .catch(err => {});
          })
          .catch(() => {});
      }
    },
    // 图片验证
    beforeImgUpload(file, type) {
      if (type == 'avatar') {
        this.avatarloading = true;
      } else {
        this.backImgloading = true;
      }
      const isJPG =
        file.type === 'image/jpeg' ||
        file.type === 'image/gif' ||
        file.type === 'image/png';
      const isLt4M = file.size / 1024 / 1024 / 1024 / 1024 < 4;

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!');
      }
      if (!isLt4M) {
        this.$message.error('上传头像图片大小不能超过 4MB!');
      }
      return isJPG && isLt4M;
    },
    // 上传头像成功处理逻辑
    handleAvatarSuccess(res) {
      if (res.code == 0) {
        this.form.avatar = res.data;
        this.$notify({
          title: '成功',
          message: '头像上传成功',
          type: 'success',
        });
        this.avatarloading = false;
      } else {
        this.$message({
          message: res.message,
          type: 'error',
        });
        this.avatarloading = false;
      }
    },
    resetPwd() {
      if (this.checkSel()) {
        var id = this.selRow.id;
        this.$confirm('将密码重置为maiqu?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        })
          .then(() => {
            resetPassword(id)
              .then(response => {
                this.$message({
                  message: '重置密码成功',
                  type: 'success',
                });
              })
              .catch(err => {});
          })
          .catch(() => {});
      }
    },
    openRoleItem(record) {
      this.selRow = record;
      this.openRole();
    },
    openRole() {
      if (this.checkSel()) {
        this.roleVisible = true;
      }
    },
    setRole() {
      var data = {
        userId: this.selRow.id,
        roleId: this.radio,
      };
      console.log(data);
      setRole(data).then(response => {
        this.roleVisible = false;
        this.fetchData();
        this.$message({
          message: '提交成功',
          type: 'success',
        });
      });
    },
  },
  computed: {
    token() {
      return {
        Authorization: getToken(),
      };
    },
  },
};
