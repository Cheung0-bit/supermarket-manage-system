package top.zhanglin.server.api.core;

import cn.dev33.satoken.annotation.SaCheckPermission;
import cn.dev33.satoken.util.SaResult;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.web.bind.annotation.*;
import top.zhanglin.server.annotation.LogTrack;
import top.zhanglin.server.domian.LogInfo;
import top.zhanglin.server.service.PaymentInfoService;

import javax.annotation.Resource;

/**
 * <账单接口>
 *
 * @Author Lin
 * @createTime 2022/6/8 19:53
 */
@RestController
@Api(value = "PaymentApi", tags = "账单接口")
@CrossOrigin
@RequestMapping("/api/payment")
public class PaymentApi {

    @Resource
    private PaymentInfoService paymentInfoService;

    @PostMapping("/queryAll")
    @SaCheckPermission("core:payment:queryAll")
    @ApiOperation("批量查询")
    @LogTrack(LogInfo.QUERY)
    public SaResult queryAll(@RequestParam(value = "page", required = false) Integer page
            , @RequestParam(value = "limit", required = false) Integer limit
            , @RequestParam(value = "username", required = false) String username
            , @RequestParam(value = "goodsName", required = false) String goodsName
            , @RequestParam(value = "orderNo", required = false) String orderNo) {
        return paymentInfoService.queryAll(page, limit, username, goodsName, orderNo);
    }

    @DeleteMapping("/delete/{paymentInfoId}")
    @SaCheckPermission("core:payment:delete")
    @ApiOperation("删除账单")
    @LogTrack(LogInfo.DELETE)
    public SaResult delete(@PathVariable Long paymentInfoId) {
        return paymentInfoService.delete(paymentInfoId);
    }


}
