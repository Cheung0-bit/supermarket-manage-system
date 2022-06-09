package top.zhanglin.server.api.rbac;

import cn.dev33.satoken.annotation.SaCheckPermission;
import cn.dev33.satoken.util.SaResult;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.web.bind.annotation.*;
import top.zhanglin.server.annotation.LogTrack;
import top.zhanglin.server.domian.LogInfo;
import top.zhanglin.server.domian.SysPower;
import top.zhanglin.server.service.SysPowerService;

import javax.annotation.Resource;
import java.util.HashSet;

/**
 * <权限接口>
 *
 * @Author Lin
 * @createTime 2022/6/8 14:39
 */
@RestController
@CrossOrigin
@Api(value = "权限", tags = "权限接口")
@RequestMapping("/api/power")
public class SysPowerApi {

    @Resource
    private SysPowerService sysPowerService;

    @GetMapping("/queryAll")
    @SaCheckPermission("sys:power:queryAll")
    @ApiOperation(value = "查询所有")
    @LogTrack(LogInfo.QUERY)
    public SaResult queryAll(@RequestParam(value = "page", required = false) Integer page,
                             @RequestParam(value = "limit", required = false) Integer limit,
                             @RequestParam(value = "powerName", required = false) String powerName,
                             @RequestParam(value = "powerCode", required = false) String powerCode) {
        return sysPowerService.queryAll(page, limit, powerName, powerCode);
    }

    @GetMapping("/queryByRole/{roleId}")
    @SaCheckPermission("sys:power:queryByRole")
    @ApiOperation(value = "通过角色查询")
    @LogTrack(LogInfo.QUERY)
    public SaResult queryByRole(@PathVariable("roleId") Integer roleId) {
        return sysPowerService.queryByRole(roleId);
    }


    @PostMapping("/addPower")
    @SaCheckPermission("sys:power:add")
    @ApiOperation(value = "添加权限", notes = "注意Body主体")
    @LogTrack(LogInfo.INSERT)
    public SaResult add(@RequestBody SysPower sysPower) {

        if (sysPower.getPowerId() == null) {
            return sysPowerService.insert(sysPower);
        } else {
            return sysPowerService.update(sysPower);
        }

    }

    @DeleteMapping("/deletePower/{powerId}")
    @SaCheckPermission("sys:power:delete")
    @LogTrack(LogInfo.DELETE)
    @ApiOperation(value = "通过Id删除权限", notes = "注意正确传参")
    public SaResult deleteById(@PathVariable("powerId") Integer powerId) {
        return sysPowerService.delete(powerId);
    }

    @PostMapping("/setPower")
    @SaCheckPermission("sys:power:setPower")
    @ApiOperation(value = "分配权限", notes = "注意正确传参")
    @LogTrack(LogInfo.UPDATE)
    public SaResult setPower(@RequestParam Integer roleId, @RequestParam HashSet<Integer> powerIds) {
        return sysPowerService.setPower(roleId, powerIds);
    }

    @PutMapping("/updateEnable")
    @SaCheckPermission("sys:power:updateEnable")
    @ApiOperation(value = "修改权限启用", notes = "注意正确传参")
    @LogTrack(LogInfo.UPDATE)
    public SaResult updateEnable(@RequestParam Integer powerId,
                                 @RequestParam Boolean enable) {
        return sysPowerService.updateEnable(powerId, enable);
    }

}