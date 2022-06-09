package top.zhanglin.server.api.base;

import cn.dev33.satoken.annotation.SaCheckLogin;
import cn.dev33.satoken.stp.StpUtil;
import cn.dev33.satoken.util.SaResult;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.web.bind.annotation.*;
import top.zhanglin.server.annotation.LogTrack;
import top.zhanglin.server.domian.LogInfo;
import top.zhanglin.server.service.BaseService;

import javax.annotation.Resource;

/**
 * <基本API>
 *
 * @Author Lin
 * @createTime 2022/6/2 11:16
 */
@RestController
@CrossOrigin
@Api(value = "Base", tags = "基本接口")
@RequestMapping("/api")
public class BaseApi {

    @Resource
    private BaseService baseService;

    @PostMapping("/login")
    @ApiOperation("登录")
    @LogTrack(LogInfo.LOGIN)
    public SaResult login(@RequestParam String username, @RequestParam String password) {
        return baseService.authCheck(username, password);
    }

    @GetMapping("/logout")
    @ApiOperation("注销")
    @SaCheckLogin
    public SaResult logout() {
        StpUtil.logout();
        return SaResult.ok();
    }

    @GetMapping("/loginInfo")
    @ApiOperation("获取登录信息")
    @SaCheckLogin
    @LogTrack(LogInfo.QUERY)
    public SaResult loginInfo() {
        return baseService.getInfo();
    }

}
