package top.zhanglin.server.api.core;

import cn.dev33.satoken.annotation.SaCheckPermission;
import cn.dev33.satoken.util.SaResult;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.web.bind.annotation.*;
import top.zhanglin.server.annotation.LogTrack;
import top.zhanglin.server.domian.LogInfo;
import top.zhanglin.server.service.FeedBackService;

import javax.annotation.Resource;

/**
 * <反馈接口>
 *
 * @Author Lin
 * @createTime 2022/6/8 19:53
 */
@RestController
@Api(value = "FeedBackApi", tags = "反馈接口")
@CrossOrigin
@RequestMapping("/api/feedback")
public class FeedBackApi {

    @Resource
    private FeedBackService feedBackService;

    @PostMapping("/queryAll")
    @SaCheckPermission("core:feedback:queryAll")
    @ApiOperation("批量查询")
    @LogTrack(LogInfo.QUERY)
    public SaResult queryAll(@RequestParam(value = "page", required = false) Integer page
            , @RequestParam(value = "limit", required = false) Integer limit
            , @RequestParam(value = "username", required = false) String username
            , @RequestParam(value = "goodsName", required = false) String goodsName) {
        return feedBackService.queryAll(page, limit, username, goodsName);
    }

    @DeleteMapping("/delete/{feedBackId}")
    @SaCheckPermission("core:feedback:delete")
    @ApiOperation("删除反馈")
    @LogTrack(LogInfo.DELETE)
    public SaResult delete(@PathVariable Integer feedBackId) {
        return feedBackService.delete(feedBackId);
    }

    @PutMapping("/reply")
    @SaCheckPermission("core:feedback:reply")
    @ApiOperation("回复评论")
    @LogTrack(LogInfo.UPDATE)
    public SaResult reply(@RequestParam Integer feedBackId, @RequestParam String reply) {
        return feedBackService.reply(feedBackId, reply);
    }

}
