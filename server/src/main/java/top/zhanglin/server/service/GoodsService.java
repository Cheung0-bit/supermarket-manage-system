package top.zhanglin.server.service;

import cn.dev33.satoken.util.SaResult;
import org.springframework.stereotype.Service;
import top.zhanglin.server.domian.Goods;

/**
 * <商品业务接口>
 *
 * @Author Lin
 * @createTime 2022/6/5 16:27
 */
@Service
public interface GoodsService {

    /**
     * 增加商品
     *
     * @param goods
     * @return
     */
    SaResult insert(Goods goods);

    /**
     * 删除商品
     *
     * @param goodsId
     * @return
     */
    SaResult delete(Integer goodsId);

    /**
     * 编辑商品
     *
     * @param goods
     * @returns
     */
    SaResult update(Goods goods);

    /**
     * 批量模糊查询
     *
     * @param page
     * @param limit
     * @param goodsName
     * @param goodsType
     * @return
     */
    SaResult queryAll(Integer page, Integer limit, String goodsName, String goodsType);

}
