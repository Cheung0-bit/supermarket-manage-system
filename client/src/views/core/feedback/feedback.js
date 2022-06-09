import { getList, remove, reply } from '@/api/system/feedback';

export default {
  name: 'feedback',
  data() {
    return {
      listQuery: {
        page: 1,
        limit: 5,
        username: undefined,
        goodsName: undefined,
      },
      total: 0,
      list: null,
      listLoading: true,
      replyVisible: false,
      replyContext: '',
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
    fetchData() {
      this.listLoading = true;
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
      this.listQuery.username = '';
      this.listQuery.goodsName = '';
      this.listQuery.orderNo = '';
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
    replyItem(record) {
      this.selRow = record;
      this.replyContext = '';
      this.reply();
    },
    reply() {
      if (this.checkSel()) {
        this.replyVisible = true;
      }
    },
    doReply() {
      const param = {
        feedBackId: this.selRow.id,
        reply: this.replyContext,
      };
      console.log(param);
      reply(param)
        .then(response => {
          this.$message({
            message: '回复成功',
            type: 'success',
          });
          this.fetchData();
          this.replyVisible = false;
        })
        .catch(() => {});
    },
    removeItem(record) {
      this.selRow = record;
      this.remove();
    },
    remove() {
      if (this.checkSel()) {
        var paymentId = this.selRow.id;
        this.$confirm('确定删除该记录?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        })
          .then(() => {
            remove(paymentId)
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
  },
};
