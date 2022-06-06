package top.zhanglin.server.api.rbac;

import cn.dev33.satoken.util.SaResult;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.web.bind.annotation.*;
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
    @ApiOperation("批量查询")
    public SaResult queryAll(@RequestParam(value = "page", required = false) Integer page,
                             @RequestParam(value = "limit", required = false) Integer limit,
                             @RequestParam(value = "username", required = false) String username) {
        return sysUserService.queryAll(page, limit, username);
    }

    @PostMapping("/add")
    @ApiOperation("添加用户")
    public SaResult add(@RequestBody SysUser sysUser) {
        return sysUserService.insert(sysUser);
    }

    @DeleteMapping("/delete/{id}")
    public SaResult delete(@PathVariable("id") Integer userId) {
        return sysUserService.delete(userId);
    }


}
