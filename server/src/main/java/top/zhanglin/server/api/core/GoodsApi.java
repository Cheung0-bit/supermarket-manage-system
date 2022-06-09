package top.zhanglin.server.api.core;

import cn.dev33.satoken.annotation.SaCheckPermission;
import cn.dev33.satoken.util.SaResult;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.web.bind.annotation.*;
import top.zhanglin.server.annotation.LogTrack;
import top.zhanglin.server.domian.Goods;
import top.zhanglin.server.domian.LogInfo;
import top.zhanglin.server.service.GoodsService;

import javax.annotation.Resource;

/**
 * <货物接口>
 *
 * @Author Lin
 * @createTime 2022/6/8 19:52
 */
@RestController
@Api(value = "GoodsApi", tags = "货物接口")
@CrossOrigin
@RequestMapping("/api/goods")
public class GoodsApi {

    @Resource
    private GoodsService goodsService;

    @PostMapping("/queryAll")
    @SaCheckPermission("core:goods:queryAll")
    @ApiOperation("批量查询")
    @LogTrack(LogInfo.QUERY)
    public SaResult queryAll(@RequestParam(value = "page", required = false) Integer page
            , @RequestParam(value = "limit", required = false) Integer limit
            , @RequestParam(value = "goodsName", required = false) String goodsName
            , @RequestParam(value = "goodsType", required = false) String goodsType) {
        return goodsService.queryAll(page, limit, goodsName, goodsType);
    }

    @PostMapping("/add")
    @SaCheckPermission("core:goods:add")
    @ApiOperation("添加货物")
    @LogTrack(LogInfo.INSERT)
    public SaResult add(@RequestBody Goods goods) {
        if (goods.getGoodsId() == null) {
            return goodsService.insert(goods);
        } else {
            return goodsService.update(goods);
        }
    }

    @DeleteMapping("/delete/{goodsId}")
    @SaCheckPermission("core:goods:delete")
    @ApiOperation("删除货物")
    @LogTrack(LogInfo.DELETE)
    public SaResult delete(@PathVariable Integer goodsId) {
        return goodsService.delete(goodsId);
    }


}
