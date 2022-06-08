package top.zhanglin.server.service.impl;

import cn.dev33.satoken.util.SaResult;
import com.github.pagehelper.Page;
import com.github.pagehelper.PageHelper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import top.zhanglin.server.domian.SysRole;
import top.zhanglin.server.mapper.SysRoleMapper;
import top.zhanglin.server.model.Paging;
import top.zhanglin.server.service.SysRoleService;

import javax.annotation.Resource;
import java.util.List;

/**
 * <角色实现类>
 *
 * @Author Lin
 * @createTime 2022/6/8 14:02
 */
@Service
@Slf4j
public class SysRoleServiceImpl implements SysRoleService {

    @Resource
    private SysRoleMapper sysRoleMapper;

    /**
     * 查询所有
     *
     * @param page
     * @param limit
     * @param roleName
     * @param description
     * @return
     */
    @Override
    public SaResult queryAll(Integer page, Integer limit, String roleName, String description) {
        if (page == null || limit == null) {
            List<SysRole> sysRoleList = sysRoleMapper.queryAll(roleName, description);
            return SaResult.data(sysRoleList);
        } else {
            Page<SysRole> rolePage = PageHelper.startPage(page, limit).doSelectPage(() -> sysRoleMapper.queryAll(roleName, description));
            Paging<SysRole> rolePaging = new Paging<>(rolePage);
            return SaResult.data(rolePaging);
        }
    }

    /**
     * 新增数据
     *
     * @param sysRole 实例对象
     * @return 实例对象
     */
    @Override
    public SaResult insert(SysRole sysRole) {
        sysRoleMapper.insert(sysRole);
        return SaResult.ok();
    }

    /**
     * 修改数据
     *
     * @param sysRole 实例对象
     * @return 实例对象
     */
    @Override
    public SaResult update(SysRole sysRole) {
        sysRoleMapper.update(sysRole);
        return SaResult.ok();
    }

    /**
     * 通过主键删除数据
     *
     * @param roleId 主键
     * @return 是否成功
     */
    @Override
    public SaResult deleteById(Integer roleId) {
        sysRoleMapper.deleteById(roleId);
        return SaResult.ok();
    }

    /**
     * 修改角色启用
     *
     * @param roleId
     * @param enable
     * @return
     */
    @Override
    public SaResult updateEnable(Integer roleId, Boolean enable) {
        sysRoleMapper.updateEnable(roleId, enable);
        return SaResult.ok();
    }

}
