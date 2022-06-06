import { login, logout, getInfo } from '@/api/user';
import { getToken, setToken, removeToken } from '@/utils/auth';
import { traverseRoutes } from '@/utils/route';
import { resetRouter } from '@/router';
import { constantRoutes } from '@/router';
const state = {
  token: getToken(),
  name: '',
  avatar: '',
  permissions: null,
  role: null,
  routes: [],
  addRoutes: [],
};

const mutations = {
  // 设置Token
  SET_TOKEN: (state, token) => {
    state.token = token;
  },
  // 设置用户名（昵称）
  SET_NAME: (state, name) => {
    state.name = name;
  },
  // 设置头像
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar;
  },
  // 设置个人信息
  SET_PROFILE: (state, profile) => {
    state.profile = profile;
  },
  // 设置权限
  SET_PERMISSIONS: (state, permissions) => {
    state.permissions = permissions;
  },
  // 设置角色
  SET_ROLE: (state, role) => {
    state.role = role;
  },
  // 设置路由
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes;
    state.routes = constantRoutes.concat(routes); // 拼接权限认证成功路由
  },
};

const actions = {
  // 异步登录
  login({ dispatch, commit }, userInfo) {
    const { username, password } = userInfo;
    return new Promise((resolve, reject) => {
      // 调用登录API
      login({
        username: username.trim(),
        password: password,
      })
        .then(response => {
          const { data } = response.data;
          commit('SET_TOKEN', data.tokenValue);
          setToken(data.tokenValue);
          resolve();
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  autoLogin({ dispatch, commit }, userInfo) {
    const { token } = userInfo;
    return new Promise((resolve, reject) => {
      commit('SET_TOKEN', token);
      setToken(token);
      resolve();
    });
  },
  // 获取用户信息
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo()
        .then(response => {
          const { data } = response.data;
          const { profile, permissions } = data;
          commit('SET_NAME', profile.username);
          commit('SET_AVATAR', profile.avatar);
          commit('SET_PROFILE', profile);
          commit('SET_ROLE', profile.sysRole);
          commit('SET_PERMISSIONS', permissions);
          const menu = JSON.parse(profile.sysRole.menu);
          const routes = traverseRoutes(menu);
          commit('SET_ROUTES', routes);
          data.routes = routes;
          resolve(data);
        })
        .catch(error => {
          reject(error);
        });
    });
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout(state.token)
        .then(() => {
          commit('SET_TOKEN', '');
          commit('SET_NAME', '');
          commit('SET_AVATAR', '');
          commit('SET_PROFILE', {});
          commit('SET_ROLE', null);
          commit('SET_PERMISSIONS', []);
          removeToken();
          resetRouter();
          resolve();
        })
        .catch(error => {
          reject(error);
        });
    });
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '');
      removeToken();
      resolve();
    });
  },
  updateToken({ commit }, { token }) {
    console.log('newToken', token);
    commit('SET_TOKEN', token);
    setToken(token);
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
