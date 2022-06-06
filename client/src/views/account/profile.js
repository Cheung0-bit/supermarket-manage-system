import {
  queryByUser
} from '@/api/system/log'
import {
  updatePwd
} from '@/api/user'
import {
  isvalidPassword
} from "@/utils/validate";
export default {
  data() {
    // 密码校验工具
    const validatepassword = (rule, value, callback) => {
      if (!isvalidPassword(value)) {
        callback(new Error("密码不能为空或长度不合法"));
      } else {
        callback();
      }
    };
    return {
      activeName: 'profile',
      user: {},
      reverse: false,
      activities: [],
      form: {
        oldPassword: '',
        newPassword: '',
        confirmPassword: ''
      },
      rules: {
        oldPassword: [{
          required: true,
          trigger: "blur",
          validator: validatepassword,
        }, ],
        newPassword: [{
          required: true,
          trigger: "blur",
          validator: validatepassword,
        }, ],
        confirmPassword: [{
          required: true,
          trigger: "blur",
          validator: validatepassword,
        }, ],
      },
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      this.user = this.$store.state.user.profile
      console.log('user', this.user);
      // this.queryByUser()
    },
    handleClick(tab, event) {
      // this.$router.push({ path: '/account/'+tab.name})
    },
    // TODO 根据用户查看活动日志 
    queryByUser() {
      // queryByUser().then(response => {
      //   console.log(response)
      //   this.activities = response.data
      // }).catch((err) => {
      //   this.$message({
      //     message: err,
      //     type: 'error'
      //   })
      // })
    },
    // TODO 更新密码
    updatePwd() {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          updatePwd({
            oldPassword: this.form.oldPassword,
            newPassword: this.form.newPassword,
            confirmPassword: this.form.confirmPassword
          }).then(response => {
            this.form.oldPassword = '';
            this.form.newPassword = '';
            this.form.confirmPassword = '';
            //退出登录，该操作是个异步操作，所以后面跳转到登录页面延迟1s再执行（如果有更好的方法再调整）
            this.$store.dispatch('user/logout')
            const self = this
            self.$notify({
              title: '成功',
              message: '密码修改成功，请重新登录',
              type: 'success'
            })
            setTimeout(function () {
              self.$router.push(`/login`)
            }, 1000)
          }).catch(() => {

          })
        } else {
          return false
        }
      })
    }


  }
}