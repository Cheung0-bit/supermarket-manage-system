/*
 * @Description:
 * @Author: cheung0
 * @Date: 2022-06-05 18:21:20
 */
import { isvalidUsername } from '@/utils/validate';
import LangSelect from '@/components/LangSelect';
export default {
  name: 'login',
  components: { LangSelect },
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!isvalidUsername(value)) {
        callback(new Error(this.$t('login.errorAccount')));
      } else {
        callback();
      }
    };
    const validatePassword = (rule, value, callback) => {
      if (value.length < 3) {
        callback(new Error(this.$t('login.errorPassword')));
      } else {
        callback();
      }
    };
    return {
      loginForm: {
        username: '',
        password: '',
      },
      loginRules: {
        username: [
          { required: true, trigger: 'blur', validator: validateUsername },
        ],
        password: [
          { required: true, trigger: 'blur', validator: validatePassword },
        ],
      },
      loading: false,
      pwdType: 'password',
      redirect: '/',
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      const redirect = this.$route.query.redirect;
      if (redirect) {
        this.redirect = redirect;
      }
    },
    showPwd() {
      if (this.pwdType === 'password') {
        this.pwdType = '';
      } else {
        this.pwdType = 'password';
      }
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true;
          this.$store
            .dispatch('user/login', this.loginForm)
            .then(() => {
              this.loading = false;
              if (this.redirect === '/' || this.redirect === '/dashboard') {
                this.$notify({
                  title: '成功',
                  message: `欢迎回来${this.loginForm.username}`,
                  type: 'success',
                });
              }
              this.$router.push({ path: this.redirect });
            })
            .catch(err => {
              this.loading = false;
            });
        } else {
          return false;
        }
      });
    },
  },
};
