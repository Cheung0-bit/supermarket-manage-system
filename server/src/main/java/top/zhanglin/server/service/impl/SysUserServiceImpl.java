package top.zhanglin.server.service.impl;

import cn.dev33.satoken.util.SaResult;
import org.springframework.stereotype.Service;
import top.zhanglin.server.domian.SysUser;
import top.zhanglin.server.service.SysUserService;

/**
 * <用户实现类>
 *
 * @Author Lin
 * @createTime 2022/6/5 18:18
 */
@Service
public class SysUserServiceImpl implements SysUserService {

    @Override
    public SaResult queryAll(Integer page, Integer limit, String username) {
        return null;
    }

    @Override
    public SaResult insert(SysUser sysUser) {
        return null;
    }

    @Override
    public SaResult fuzzyUpdate(SysUser sysUser) {
        return null;
    }

    @Override
    public SaResult updatePasswd(String oldPasswd, String confirmPasswd, String newPasswd) {
        return null;
    }

    @Override
    public SaResult updateEnable(Integer userId, Boolean enable) {
        return null;
    }

    @Override
    public SaResult delete(Integer userId) {
        return null;
    }
}
