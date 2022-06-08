package top.zhanglin.server.service.impl;

import cn.dev33.satoken.secure.SaSecureUtil;
import cn.dev33.satoken.stp.StpUtil;
import cn.dev33.satoken.util.SaResult;
import com.github.pagehelper.Page;
import com.github.pagehelper.PageHelper;
import org.springframework.stereotype.Service;
import top.zhanglin.server.domian.SysUser;
import top.zhanglin.server.mapper.SysUserMapper;
import top.zhanglin.server.model.Paging;
import top.zhanglin.server.service.SysUserService;

import javax.annotation.Resource;
import java.util.List;

/**
 * <用户实现类>
 *
 * @Author Lin
 * @createTime 2022/6/5 18:18
 */
@Service
public class SysUserServiceImpl implements SysUserService {

    private static final String PASSWD = "maiqu";

    @Resource
    private SysUserMapper sysUserMapper;

    @Override
    public SaResult queryAll(Integer page, Integer limit, String username) {
        if (page == null || limit == null) {
            List<SysUser> sysUserList = sysUserMapper.queryAll(username);
            return SaResult.data(sysUserList);
        } else {
            Page<SysUser> userPage = PageHelper.startPage(page, limit).doSelectPage(() -> sysUserMapper.queryAll(username));
            Paging<SysUser> userPaging = new Paging<>(userPage);
            return SaResult.data(userPaging);
        }
    }

    @Override
    public SaResult insert(SysUser sysUser) {
        if (sysUser.getUsername() == null || sysUser.getPassword() == null) {
            return SaResult.error("登录账号或密码不可为空");
        }
        if (sysUser.getSysRole() == null) {
            return SaResult.error("请分配角色");
        }
        // 实例化一对象用于接收
        SysUser myUser = sysUserMapper.queryByNameSysUser(sysUser.getUsername());
        if (myUser != null) {
            return SaResult.error("用户已存在");
        }
        myUser = new SysUser();
        if (sysUser.getAvatar() != null && !"".equals(sysUser.getAvatar())) {
            myUser.setAvatar(sysUser.getAvatar());
        }
        if (sysUser.getSignature() != null && !"".equals(sysUser.getSignature())) {
            myUser.setSignature(sysUser.getSignature());
        }
        myUser.setSysRole(sysUser.getSysRole());
        myUser.setUsername(sysUser.getUsername());
        myUser.setPassword(SaSecureUtil.sha256(sysUser.getPassword()));
        sysUserMapper.insert(myUser);
        return SaResult.data(sysUserMapper.queryById(myUser.getId()));
    }

    @Override
    public SaResult update(SysUser sysUser) {
        if (sysUser.getUsername() == null) {
            return SaResult.error("登录账号不可为空");
        }
        if (sysUser.getSysRole() == null) {
            return SaResult.error("请分配角色");
        }
        // 取出用户
        SysUser myUser = sysUserMapper.queryById(sysUser.getId());
        if (myUser == null) {
            return SaResult.error("用户不存在");
        }
        // 判断有无修改密码
        if (sysUser.getPassword() != null && !sysUser.getPassword().equals("")) {
            sysUser.setPassword(SaSecureUtil.sha256(sysUser.getPassword()));
        } else {
            sysUser.setPassword(myUser.getPassword());
        }
        sysUserMapper.update(sysUser);
        return SaResult.ok();
    }

    @Override
    public SaResult fuzzyUpdate(SysUser sysUser) {
        sysUserMapper.update(sysUser);
        return SaResult.ok();
    }

    @Override
    public SaResult updatePasswd(String oldPasswd, String confirmPasswd, String newPasswd) {
        SysUser sysUser = sysUserMapper.queryByNameSysUser(StpUtil.getLoginId().toString());
        if (!newPasswd.equals(confirmPasswd)) {
            return SaResult.error("两次输入密码不一致");
        }
        if (oldPasswd.equals(newPasswd)) {
            return SaResult.error("新密码与原密码一样");
        }
        if (!SaSecureUtil.sha256(oldPasswd).equals(sysUser.getPassword())) {
            return SaResult.error("原密码不正确");
        }
        sysUserMapper.updatePassword(sysUser.getId(), SaSecureUtil.sha256(newPasswd));
        return SaResult.ok();
    }

    @Override
    public SaResult resetPassword(Integer userId) {
        sysUserMapper.updatePassword(userId, SaSecureUtil.sha256(PASSWD));
        return SaResult.ok();
    }

    @Override
    public SaResult updateEnable(Integer userId, Boolean enable) {
        sysUserMapper.updateEnable(userId, enable);
        return SaResult.ok();
    }

    @Override
    public SaResult delete(Integer userId) {
        sysUserMapper.deleteByIdInt(userId);
        return SaResult.ok();
    }

    @Override
    public SaResult setRole(Integer userId, Integer roleId) {
        sysUserMapper.updateRoleId(userId, roleId);
        return SaResult.ok();
    }
}
