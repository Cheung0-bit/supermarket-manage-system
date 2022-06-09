package top.zhanglin.server.api.rbac;

import cn.dev33.satoken.annotation.SaCheckPermission;
import cn.dev33.satoken.util.SaResult;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.web.bind.annotation.*;
import top.zhanglin.server.annotation.LogTrack;
import top.zhanglin.server.domian.LogInfo;
import top.zhanglin.server.domian.SysUser;
import top.zhanglin.server.service.SysUserService;

import javax.annotation.Resource;

/**
 * <用户类API>
 *
 * @Author Lin
 * @createTime 2022/6/5 16:04
 */
@RestController
@CrossOrigin
@Api(value = "SysUserApi", tags = "用户类接口")
@RequestMapping("/api/user")
public class SysUserApi {

    @Resource
    private SysUserService sysUserService;

    @PostMapping("/queryAll")
    @SaCheckPermission("sys:user:queryAll")
    @ApiOperation("批量查询")
    @LogTrack(LogInfo.QUERY)
    public SaResult queryAll(@RequestParam(value = "page", required = false) Integer page,
                             @RequestParam(value = "limit", required = false) Integer limit,
                             @RequestParam(value = "username", required = false) String username) {
        return sysUserService.queryAll(page, limit, username);
    }

    @PostMapping("/add")
    @SaCheckPermission("sys:user:add")
    @ApiOperation("添加用户")
    @LogTrack(LogInfo.INSERT)
    public SaResult add(@RequestBody SysUser sysUser) {
        if (sysUser.getId() == null) {
            return sysUserService.insert(sysUser);
        } else {
            return sysUserService.update(sysUser);
        }
    }

    @DeleteMapping("/delete/{id}")
    @SaCheckPermission("sys:user:delete")
    @ApiOperation("删除用户")
    @LogTrack(LogInfo.DELETE)
    public SaResult delete(@PathVariable("id") Integer userId) {
        return sysUserService.delete(userId);
    }

    /**
     * @param userId
     * @param enable
     * @return
     */
    @PutMapping("/updateEnable")
    @SaCheckPermission("sys:user:updateEnable")
    @ApiOperation(value = "修改用户启用", notes = "注意正确传参")
    @LogTrack(LogInfo.UPDATE)
    public SaResult updateEnable(@RequestParam Integer userId, @RequestParam Boolean enable) {
        return sysUserService.updateEnable(userId, enable);
    }

    @PostMapping("/resetPassword")
    @SaCheckPermission("sys:user:resetPassword")
    @ApiOperation(value = "重置密码")
    @LogTrack(LogInfo.UPDATE)
    public SaResult resetPassword(@RequestParam Integer userId) {
        return sysUserService.resetPassword(userId);
    }

    /**
     * 管理员修改密码
     *
     * @param oldPassword
     * @param newPassword
     * @param confirmPassword
     * @return
     */
    @PutMapping("/updatePassword")
    @SaCheckPermission("sys:user:updatePassword")
    @ApiOperation(value = "修改用户密码", notes = "注意正确传参")
    @LogTrack(LogInfo.UPDATE)
    public SaResult updatePassword(@RequestParam String oldPassword
            , @RequestParam String newPassword
            , @RequestParam String confirmPassword) {
        return sysUserService.updatePasswd(oldPassword, newPassword, confirmPassword);
    }

    /**
     * 分配角色
     *
     * @param userId
     * @param roleId
     * @return
     */
    @PostMapping("/setRole")
    @ApiOperation(value = "分配角色")
    @LogTrack(LogInfo.UPDATE)
    public SaResult setRole(@RequestParam Integer userId, @RequestParam Integer roleId) {
        return sysUserService.setRole(userId, roleId);
    }


}
