"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _notice = require("@/api/system/notice");

var _vuex = require("vuex");

var _ECharts = _interopRequireDefault(require("vue-echarts/components/ECharts"));

require("echarts/lib/chart/bar");

require("echarts/lib/chart/line");

require("echarts/lib/chart/pie");

require("echarts/lib/chart/map");

require("echarts/lib/chart/radar");

require("echarts/lib/chart/scatter");

require("echarts/lib/chart/effectScatter");

require("echarts/lib/component/tooltip");

require("echarts/lib/component/polar");

require("echarts/lib/component/geo");

require("echarts/lib/component/legend");

require("echarts/lib/component/title");

require("echarts/lib/component/visualMap");

require("echarts/lib/component/dataset");

require("echarts/map/js/world");

require("zrender/lib/svg/svg");

var _elementResizeDetector = _interopRequireDefault(require("element-resize-detector"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _default = {
  name: 'dashboard',
  components: {
    chart: _ECharts["default"]
  },
  data: function data() {
    var data = [];

    for (var i = 0; i <= 360; i++) {
      var t = i / 180 * Math.PI;
      var r = Math.sin(2 * t) * Math.cos(2 * t);
      data.push([r, i]);
    }

    return {
      notice: [],
      lineData: {
        title: {
          text: ''
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: [this.$t('dashboard.email'), this.$t('dashboard.ad'), this.$t('dashboard.vedio'), this.$t('dashboard.direct'), this.$t('dashboard.searchEngine')]
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: [this.$t('common.week.mon'), this.$t('common.week.tue'), this.$t('common.week.wed'), this.$t('common.week.thu'), this.$t('common.week.fri'), this.$t('common.week.sat'), this.$t('common.week.sun')]
        },
        yAxis: {
          type: 'value'
        },
        series: [{
          name: this.$t('dashboard.email'),
          type: 'line',
          stack: '总量',
          data: [120, 132, 101, 134, 90, 230, 210]
        }, {
          name: this.$t('dashboard.ad'),
          type: 'line',
          stack: '总量',
          data: [220, 182, 191, 234, 290, 330, 310]
        }, {
          name: this.$t('dashboard.vedio'),
          type: 'line',
          stack: '总量',
          data: [150, 232, 201, 154, 190, 330, 410]
        }, {
          name: this.$t('dashboard.direct'),
          type: 'line',
          stack: '总量',
          data: [320, 332, 301, 334, 390, 330, 320]
        }, {
          name: this.$t('dashboard.searchEngine'),
          type: 'line',
          stack: '总量',
          data: [820, 932, 901, 934, 1290, 1330, 1320]
        }]
      },
      barData: {
        xAxis: {
          type: 'category',
          data: [this.$t('common.week.mon'), this.$t('common.week.tue'), this.$t('common.week.wed'), this.$t('common.week.thu'), this.$t('common.week.fri'), this.$t('common.week.sat'), this.$t('common.week.sun')]
        },
        yAxis: {
          type: 'value'
        },
        series: [{
          data: [120, 200, 150, 80, 70, 110, 130],
          type: 'bar'
        }]
      },
      pieData: {
        title: {
          text: this.$t('dashboard.userFrom'),
          subtext: '纯属虚构',
          x: 'center'
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        legend: {
          orient: 'vertical',
          left: 'left',
          data: [this.$t('dashboard.email'), this.$t('dashboard.ad'), this.$t('dashboard.vedio'), this.$t('dashboard.direct'), this.$t('dashboard.searchEngine')]
        },
        series: [{
          name: 'from',
          type: 'pie',
          radius: '55%',
          center: ['50%', '60%'],
          data: [{
            value: 335,
            name: this.$t('dashboard.direct')
          }, {
            value: 310,
            name: this.$t('dashboard.email')
          }, {
            value: 234,
            name: this.$t('dashboard.ad')
          }, {
            value: 135,
            name: this.$t('dashboard.vedio')
          }, {
            value: 1548,
            name: this.$t('dashboard.searchEngine')
          }],
          itemStyle: {
            emphasis: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }]
      },
      tableData: [{
        date: '2020-05-04',
        name: '张林',
        address: '南京信息工程大学文园17栋'
      }, {
        date: '2020-05-04',
        name: '张林',
        address: '南京信息工程大学文园17栋'
      }, {
        date: '2020-05-04',
        name: '张林',
        address: '南京信息工程大学文园17栋'
      }, {
        date: '2020-05-04',
        name: '张林',
        address: '南京信息工程大学文园17栋'
      }]
    };
  },
  computed: _objectSpread({}, (0, _vuex.mapGetters)(['name', 'roles'])),
  created: function created() {
    this.fetchData();
  },
  mounted: function mounted() {
    //绑定echart图表跟随窗口大小自动缩放
    var that = this;
    var erd = (0, _elementResizeDetector["default"])();
    erd.listenTo(document.getElementById("dashboard"), function (element) {
      that.$nextTick(function () {
        that.$refs.lineChart.resize();
        that.$refs.barChart.resize();
        that.$refs.pieChart.resize();
      });
    });
  },
  methods: {
    fetchData: function fetchData() {// this.listLoading = true
      // const self = this
      // getList(self.listQuery).then(response => {
      //   for (var i = 0; i < response.data.length; i++) {
      //     var notice = response.data[i]
      //     self.$notify({
      //       title: notice.title,
      //       message: notice.content,
      //       duration: 3000
      //     })
      //   }
      //   self.listLoading = false
      // })
    }
  }
};
exports["default"] = _default;