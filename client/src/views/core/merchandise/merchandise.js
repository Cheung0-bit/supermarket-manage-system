import { getList, saveGoods, remove } from '@/api/system/goods';

export default {
  name: 'merchandise',
  data() {
    return {
      options: ['零食', '饮料', '日用品'],
      radio: '零食',
      value: '',
      formVisible: false,
      formTitle: '添加用户',
      roleSet: [],
      form: {
        goodsName: '',
        goodsType: '',
        goodsPic: '',
        goodsPrice: '',
        stock: '',
      },
      rules: {
        goodsName: [
          {
            required: true,
            message: '请输入货物名',
            trigger: 'blur',
          },
          {
            min: 2,
            max: 20,
            message: '长度在 2 到 20 个字符',
            trigger: 'blur',
          },
        ],
        goodsPrice: [
          {
            required: true,
            message: '请填写价格',
            trigger: 'blur',
          },
        ],
        stock: [
          {
            required: true,
            message: '请填写库存',
            trigger: 'blur',
          },
        ],
      },
      listQuery: {
        page: 1,
        limit: 5,
        goodsName: undefined,
        goodsType: undefined,
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
      this.listQuery.goodsType = this.value;
      console.log(this.listQuery);
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
      this.listQuery.goodsName = '';
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
        goodsName: '',
        goodsType: '',
        goodsPic: '',
        goodsPrice: '',
        stock: '',
      };
    },
    add() {
      this.resetForm();
      this.formTitle = '添加货品';
      this.formVisible = true;
    },
    saveGoods() {
      var self = this;
      this.$refs['form'].validate(valid => {
        if (valid) {
          var form = self.form;
          form['goodsType'] = this.radio;
          console.log(form);
          saveGoods(form).then(response => {
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
      if (this.selRow && this.selRow.goodsId) {
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
          goodsId: form.goodsId,
          goodsName: form.goodsName,
          goodsType: form.goodsType,
          goodsPic: form.goodsPic,
          goodsPrice: form.goodsPrice,
          stock: form.stock,
        };
        this.form = newForm;
        this.formTitle = '修改货品';
        this.formVisible = true;
      }
    },
    removeItem(record) {
      this.selRow = record;
      this.remove();
    },
    remove() {
      if (this.checkSel()) {
        var goodsId = this.selRow.goodsId;
        this.$confirm('确定删除该记录?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        })
          .then(() => {
            remove(goodsId)
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
        this.form.goodsPic = res.data;
        this.$notify({
          title: '成功',
          message: '图片上传成功',
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
  },
};
