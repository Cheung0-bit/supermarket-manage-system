import {
  getList,
  saveUser,
  remove,
  setRole,
  changeStatus,
  resetPassword
} from '@/api/system/user'
import {
  getToken
} from '@/utils/auth'

const roleArray = ['SUPER_ADMIN', 'SYSTEM_ADMIN', 'VIP', 'USER'];
export default {
  name: 'mgr',
  data() {
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
          roleName: 'VIP',
        }, {
          roleId: 4,
          roleName: 'USER'
        }],
        checkedRoleKeys: [],
        defaultProps: {
          id: 'roleId',
          label: 'roleName',
        }
      },
      statusList: [{
          label: '启用',
          value: '1'
        },
        {
          label: '冻结',
          value: '2'
        }
      ],
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
        enable: true,
      },
      rules: {
        username: [{
            required: true,
            message: '请输入登录账号',
            trigger: 'blur'
          },
          {
            min: 5,
            max: 20,
            message: '长度在 5 到 20 个字符',
            trigger: 'blur'
          }
        ],
        password: [{
            required: false,
            message: '请输入登录密码',
            trigger: 'blur'
          },
          {
            min: 5,
            max: 20,
            message: '长度在 5 到 20 个字符',
            trigger: 'blur'
          }
        ],
        nickname: [{
            required: true,
            message: '请输入用户昵称',
            trigger: 'blur'
          },
          {
            min: 2,
            max: 20,
            message: '长度在 2 到 20 个字符',
            trigger: 'blur'
          }
        ],
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
    }
  },
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'gray',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  created() {
    this.init()
  },
  methods: {
    // 初始化
    init() {
      this.fetchData()
    },
    // 获取用户信息
    fetchData() {
      this.listLoading = true
      getList(this.listQuery).then(response => {
        const {
          data
        } = response.data
        this.list = data.dataCurrentPage
        this.listLoading = false
        this.total = data.totalCount
      })
    },
    // 搜索
    search() {
      this.listQuery.page = 1
      this.fetchData()
    },
    // 重置
    reset() {
      this.listQuery.userNmae = ''
      this.listQuery.nickName = ''
      this.listQuery.page = 1
      this.listQuery.phone = ''
      this.listQuery.email = ''
      this.fetchData()
    },
    // 过滤
    handleFilter() {
      this.listQuery.page = 1
      this.getList()
    },
    handleClose() {

    },
    fetchNext() {
      this.listQuery.page = this.listQuery.page + 1
      this.fetchData()
    },
    fetchPrev() {
      this.listQuery.page = this.listQuery.page - 1
      this.fetchData()
    },
    fetchPage(page) {
      this.listQuery.page = page
      this.fetchData()
    },
    changeSize(limit) {
      this.listQuery.limit = limit
      this.fetchData()
    },
    handleCurrentChange(currentRow, oldCurrentRow) {
      this.selRow = currentRow
    },
    resetForm() {
      this.form = {
        username: '',
        password: '',
        nickname: '',
        phone: '',
        email: '',
        avatar: '',
        backImg: '',
        signature: '',
        enable: true,
      }
    },
    add() {
      this.resetForm()
      this.formTitle = '添加用户'
      this.formVisible = true
    },
    changeUserStatus(userId, enable) {
      var params = {
        "userId": userId,
        "enable": enable
      }
      changeStatus(params).then(() => {
        this.$notify({
          title: '成功',
          message: '修改成功',
          type: 'success'
        })
        this.fetchData();
      }).catch(() => {
        this.fetchData();
      })
    },
    saveUser() {
      var self = this
      this.$refs['form'].validate((valid) => {
        if (valid) {
          var form = self.form
          var roleSet = [];
          for (const role of this.roleSet) {
            if (role == 'SUPER_ADMIN') {
              roleSet.push({
                'roleId': 1
              })
            } else if (role == 'SYSTEM_ADMIN') {
              roleSet.push({
                'roleId': 2
              })
            } else if (role == 'VIP') {
              roleSet.push({
                'roleId': 3
              })
            } else {
              roleSet.push({
                'roleId': 4
              })
            }
          }
          form.roleSet = roleSet;
          console.log(form);
          saveUser(form).then(response => {
            this.$message({
              message: '提交成功',
              type: 'success'
            })
            this.fetchData()
            this.formVisible = false
          })
        } else {
          return false
        }
      })
    },
    checkSel() {
      if (this.selRow && this.selRow.id) {
        return true
      }
      this.$message({
        message: '请选中操作项',
        type: 'warning'
      })
      return false
    },
    editItem(record) {
      this.selRow = Object.assign({}, record);
      this.edit()
    },
    edit() {
      if (this.checkSel()) {
        let form = Object.assign({}, this.selRow);
        form.password = ''
        let newForm = {
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
        this.formTitle = '修改用户'
        this.formVisible = true
      }
    },
    removeItem(record) {
      this.selRow = record
      this.remove()
    },
    remove() {
      if (this.checkSel()) {
        var id = this.selRow.id
        this.$confirm('确定删除该记录?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          remove(id).then(response => {
            this.$message({
              message: '删除成功',
              type: 'success'
            })
            this.fetchData()
          }).catch(err => {
            this.$notify.error({
              title: '错误',
              message: err,
            })
          })
        }).catch(() => {})
      }
    },
    // 图片验证
    beforeImgUpload(file, type) {
      if (type == 'avatar') {
        this.avatarloading = true;
      } else {
        this.backImgloading = true;
      }
      const isJPG = file.type === 'image/jpeg' || file.type === 'image/gif' || file.type === 'image/png';
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
          type: 'success'
        })
        this.avatarloading = false;
      } else {
        this.$message({
          message: res.message,
          type: 'error'
        })
        this.avatarloading = false;
      }
    },
    // 上传背景成功处理逻辑
    handleBackImgSuccess(res) {
      if (res.code == 0) {
        this.form.backImg = res.data;
        this.$notify({
          title: '成功',
          message: '头像上传成功',
          type: 'success'
        })
        this.backImgloading = false;
      } else {
        this.$message({
          message: res.message,
          type: 'error'
        })
        this.backImgloading = false;
      }
    },
    resetPwd() {
      if (this.checkSel()) {
        var id = this.selRow.id
        this.$confirm('将密码重置为maiqu?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          resetPassword(id).then(response => {
            this.$message({
              message: '重置密码成功',
              type: 'success'
            })
          }).catch(err => {
            this.$notify.error({
              title: '错误',
              message: err,
            })
          })
        }).catch(() => {})
      }
    },
    openRoleItem(record) {
      this.selRow = record
      this.openRole()
    },
    openRole() {
      if (this.checkSel()) {
        this.roleDialog.visible = true
      }
    },
    setRole() {
      var checkedRoleKeys = this.$refs.roleTree.getCheckedKeys()
      var roleIds = ''
      for (var index in checkedRoleKeys) {
        roleIds += checkedRoleKeys[index] + ','
      }
      var data = {
        userId: this.selRow.id,
        roleIds: roleIds.slice(0, -1)
      }
      setRole(data).then(response => {
        this.roleDialog.visible = false
        this.fetchData()
        this.$message({
          message: '提交成功',
          type: 'success'
        })
      })
    }
  },
  computed: {
    token() {
      return {
        Authorization: getToken()
      }
    }
  }
}