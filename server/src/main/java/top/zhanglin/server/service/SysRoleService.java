package top.zhanglin.server.service;

import cn.dev33.satoken.util.SaResult;
import org.springframework.stereotype.Service;
import top.zhanglin.server.domian.SysRole;

/**
 * <角色业务接口>
 *
 * @Author Lin
 * @createTime 2022/6/5 16:24
 */
@Service
public interface SysRoleService {


    /**
     * 查询所有
     *
     * @param page
     * @param limit
     * @param roleName
     * @param description
     * @return
     */
    SaResult queryAll(Integer page, Integer limit, String roleName, String description);

    /**
     * 新增数据
     *
     * @param sysRole 实例对象
     * @return 实例对象
     */
    SaResult insert(SysRole sysRole);

    /**
     * 修改数据
     *
     * @param sysRole 实例对象
     * @return 实例对象
     */
    SaResult update(SysRole sysRole);

    /**
     * 通过ID删除角色
     *
     * @param roleId
     * @return
     */
    SaResult deleteById(Integer roleId);

    /**
     * 修改角色启用
     *
     * @param roleId
     * @param enable
     * @return
     */
    SaResult updateEnable(Integer roleId, Boolean enable);

}
