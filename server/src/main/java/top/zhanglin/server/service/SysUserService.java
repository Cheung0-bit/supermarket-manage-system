package top.zhanglin.server.service;

import cn.dev33.satoken.util.SaResult;
import org.springframework.stereotype.Service;
import top.zhanglin.server.domian.SysUser;

/**
 * <用户业务接口>
 *
 * @Author Lin
 * @createTime 2022/6/5 16:10
 */
@Service
public interface SysUserService {

    /**
     * 批量查询
     *
     * @param page
     * @param limit
     * @param username
     * @return
     */
    SaResult queryAll(Integer page, Integer limit, String username);

    /**
     * 新增用户
     *
     * @param sysUser
     * @return
     */
    SaResult insert(SysUser sysUser);

    /**
     * 编辑用户
     *
     * @param sysUser
     * @return
     */
    SaResult update(SysUser sysUser);

    /**
     * 修改信息
     *
     * @param sysUser
     * @return
     */
    SaResult fuzzyUpdate(SysUser sysUser);

    /**
     * 修海密码
     *
     * @param oldPasswd
     * @param confirmPasswd
     * @param newPasswd
     * @return
     */
    SaResult updatePasswd(String oldPasswd, String confirmPasswd, String newPasswd);

    /**
     * 重置密码
     *
     * @param userId
     * @return
     */
    SaResult resetPassword(Integer userId);

    /**
     * 更新启用
     *
     * @param userId
     * @param enable
     * @return
     */
    SaResult updateEnable(Integer userId, Boolean enable);

    /**
     * 删除用户
     *
     * @param userId
     * @return
     */
    SaResult delete(Integer userId);


}
