package top.zhanglin.server.api.logtrack;

import cn.dev33.satoken.annotation.SaCheckPermission;
import cn.dev33.satoken.util.SaResult;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.web.bind.annotation.*;
import top.zhanglin.server.domian.LogInfo;
import top.zhanglin.server.service.LogTrackService;

import javax.annotation.Resource;

/**
 * <日志接口>
 *
 * @Author Lin
 * @createTime 2022/6/9 15:49
 */
@RestController
@Api(value = "LogApi", tags = "日志接口")
@CrossOrigin
@RequestMapping("/api/log")
public class LogApi {

    @Resource
    private LogTrackService logTrackService;

    @PostMapping("/queryAllLogin")
    @SaCheckPermission("log-track:log:query-all-login")
    @ApiOperation("批量查询登录日志")
    public SaResult queryAllLogin(@RequestParam(value = "page", required = false) Integer page
            , @RequestParam(value = "limit", required = false) Integer limit
            , @RequestParam(value = "username", required = false) String username
            , @RequestParam(value = "url", required = false) String url) {
        return logTrackService.queryAll(page, limit, LogInfo.LOGIN, username, url);
    }

    @PostMapping("/queryAllException")
    @SaCheckPermission("log-track:log:query-all-exception")
    @ApiOperation("批量查询异常日志")
    public SaResult queryAllException(@RequestParam(value = "page", required = false) Integer page
            , @RequestParam(value = "limit", required = false) Integer limit
            , @RequestParam(value = "username", required = false) String username
            , @RequestParam(value = "url", required = false) String url) {
        return logTrackService.queryAll(page, limit, LogInfo.EXCEPTION, username, url);
    }

    @PostMapping("/queryAllOperate")
    @SaCheckPermission("log-track:log:query-all-operate")
    @ApiOperation("批量查询操作日志")
    public SaResult queryAllOperate(@RequestParam(value = "page", required = false) Integer page
            , @RequestParam(value = "limit", required = false) Integer limit
            , @RequestParam(value = "username", required = false) String username
            , @RequestParam(value = "url", required = false) String url) {
        return logTrackService.queryAll(page, limit, null, username, url);
    }

    @DeleteMapping("/delete/{logId}")
    @SaCheckPermission("log-track:log:delete")
    @ApiOperation("删除日志")
    public SaResult delete(@PathVariable Long logId) {
        return logTrackService.delete(logId);
    }


}
