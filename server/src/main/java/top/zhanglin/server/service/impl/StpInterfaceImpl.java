package top.zhanglin.server.service.impl;

import cn.dev33.satoken.stp.StpInterface;
import org.springframework.stereotype.Component;
import top.zhanglin.server.domian.SysPower;
import top.zhanglin.server.domian.SysUser;
import top.zhanglin.server.mapper.SysPowerMapper;
import top.zhanglin.server.mapper.SysUserMapper;

import javax.annotation.Resource;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

/**
 * <SaToken鉴权实现类>
 *
 * @Author Lin
 * @createTime 2022/6/7 19:30
 */
@Component
public class StpInterfaceImpl implements StpInterface {

    @Resource
    private SysUserMapper sysUserMapper;

    @Resource
    private SysPowerMapper sysPowerMapper;

    /**
     * 返回一个账号所拥有的权限码集合
     */
    @Override
    public List<String> getPermissionList(Object loginId, String loginType) {
        SysUser sysUser = sysUserMapper.queryByNameSysUser(loginId.toString());
        List<SysPower> sysPowerList = sysPowerMapper.queryAllByRoleId(sysUser.getSysRole().getRoleId());
        return sysPowerList.stream().map(SysPower::getPowerCode).collect(Collectors.toList());
    }

    /**
     * 返回一个账号所拥有的角色标识集合 (权限与角色可分开校验)
     */
    @Override
    public List<String> getRoleList(Object loginId, String loginType) {
        SysUser sysUser = sysUserMapper.queryByNameSysUser(loginId.toString());
        List<String> roleList = new ArrayList<>();
        roleList.add(sysUser.getSysRole().getRoleName());
        return roleList;
    }

}
