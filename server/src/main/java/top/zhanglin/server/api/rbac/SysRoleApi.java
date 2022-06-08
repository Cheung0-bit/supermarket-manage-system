package top.zhanglin.server.api.rbac;

import cn.dev33.satoken.annotation.SaCheckPermission;
import cn.dev33.satoken.util.SaResult;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.web.bind.annotation.*;
import top.zhanglin.server.domian.SysRole;
import top.zhanglin.server.service.SysRoleService;

import javax.annotation.Resource;

/**
 * <角色接口>
 *
 * @Author Lin
 * @createTime 2022/6/8 13:34
 */
@RestController
@Api(value = "SysRoleApi", tags = "角色类接口")
@CrossOrigin
@RequestMapping("/api/role")
public class SysRoleApi {

    @Resource
    private SysRoleService sysRoleService;

    @GetMapping("/queryAll")
    @SaCheckPermission("sys:role:queryAll")
    @ApiOperation(value = "查询所有角色")
    public SaResult queryAll(@RequestParam(value = "page", required = false) Integer page,
                             @RequestParam(value = "limit", required = false) Integer limit,
                             @RequestParam(value = "roleName", required = false) String roleName,
                             @RequestParam(value = "description", required = false) String description) {

        return sysRoleService.queryAll(page, limit, roleName, description);
    }

    @PutMapping("/updateEnable")
    @SaCheckPermission("sys:role:updateEnable")
    @ApiOperation(value = "修改角色启用", notes = "注意正确传参")
    public SaResult updateEnable(@RequestParam Integer roleId,
                                 @RequestParam Boolean enable) {
        return sysRoleService.updateEnable(roleId, enable);
    }

    @PostMapping("/addRole")
    @SaCheckPermission("sys:role:add")
    @ApiOperation(value = "添加角色", notes = "注意Body主体")
    public SaResult insertRole(@RequestBody SysRole sysRole) {

        if (sysRole.getRoleId() == null) {
            return sysRoleService.insert(sysRole);
        } else {
            return sysRoleService.update(sysRole);
        }

    }

    @DeleteMapping("/deleteRole/{roleId}")
    @SaCheckPermission("sys:role:delete")
    @ApiOperation(value = "通过Id删除角色", notes = "注意正确传参")
    public SaResult deleteById(@PathVariable("roleId") Integer roleId) {
        return sysRoleService.deleteById(roleId);
    }


}
