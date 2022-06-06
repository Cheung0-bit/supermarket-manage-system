package top.zhanglin.server.service.impl;

import cn.dev33.satoken.secure.SaSecureUtil;
import cn.dev33.satoken.stp.SaLoginConfig;
import cn.dev33.satoken.stp.StpUtil;
import cn.dev33.satoken.util.SaResult;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import top.zhanglin.server.domian.SysPower;
import top.zhanglin.server.domian.SysUser;
import top.zhanglin.server.mapper.SysPowerMapper;
import top.zhanglin.server.mapper.SysUserMapper;
import top.zhanglin.server.service.BaseService;

import javax.annotation.Resource;
import java.util.HashMap;
import java.util.List;
import java.util.stream.Collectors;

/**
 * <BaseService实现类>
 *
 * @Author Lin
 * @createTime 2022/6/2 14:07
 */
@Service
@Slf4j
public class BaseServiceImpl implements BaseService {

    @Resource
    private SysUserMapper sysUserMapper;

    @Resource
    private SysPowerMapper sysPowerMapper;

    @Override
    public SaResult authCheck(String username, String password) {

        SysUser sysUser = sysUserMapper.queryByNameSysUser(username);
        if (sysUser == null) {
            return SaResult.error("用户不存在");
        }
        if (!sysUser.getPassword().equals(SaSecureUtil.sha256(password))) {
            return SaResult.error("密码不正确");
        }
        StpUtil.login(username, SaLoginConfig.setExtra("roleName", sysUser.getSysRole().getRoleName()));
        return SaResult.data(StpUtil.getTokenInfo());
    }

    @Override
    public SaResult getInfo() {
        HashMap<String, Object> account = new HashMap<>();
        SysUser sysUser = sysUserMapper.queryByNameSysUser(StpUtil.getLoginId().toString());
        List<SysPower> sysPowerList = sysPowerMapper.queryAllByRoleId(sysUser.getSysRole().getRoleId());
        List<String> permissions = sysPowerList.stream().map(SysPower::getPowerCode).collect(Collectors.toList());
        account.put("profile", sysUser);
        account.put("permissions", permissions);
        return SaResult.data(account);
    }

}
