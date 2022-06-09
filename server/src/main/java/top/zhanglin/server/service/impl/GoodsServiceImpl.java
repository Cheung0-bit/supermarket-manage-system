package top.zhanglin.server.service.impl;

import cn.dev33.satoken.util.SaResult;
import com.github.pagehelper.Page;
import com.github.pagehelper.PageHelper;
import org.springframework.stereotype.Service;
import top.zhanglin.server.domian.Goods;
import top.zhanglin.server.mapper.GoodsMapper;
import top.zhanglin.server.model.Paging;
import top.zhanglin.server.service.GoodsService;

import javax.annotation.Resource;
import java.util.List;

/**
 * <商品实现>
 *
 * @Author Lin
 * @createTime 2022/6/8 21:37
 */
@Service
public class GoodsServiceImpl implements GoodsService {

    @Resource
    private GoodsMapper goodsMapper;

    private String checkGoods(Goods goods) {
        if (goods.getGoodsPic().isEmpty()) {
            return "请上传商品图片";
        } else if (goods.getGoodsType().isEmpty()) {
            return "请选择商品分类";
        } else if (goods.getGoodsName().isEmpty()) {
            return "请填写货物名称";
        } else if (goods.getGoodsPrice() == null) {
            return "请填写商品价格";
        } else if (goods.getStock() == null) {
            return "请填写库存";
        } else {
            return null;
        }
    }

    @Override
    public SaResult insert(Goods goods) {
        String checkRes;
        if ((checkRes = checkGoods(goods)) != null) {
            return SaResult.error(checkRes);
        }
        goods.setBuyCount(0);
        goodsMapper.insert(goods);
        return SaResult.ok();
    }

    @Override
    public SaResult delete(Integer goodsId) {
        goodsMapper.delete(goodsId);
        return SaResult.ok();
    }

    @Override
    public SaResult update(Goods goods) {
        String checkRes;
        if ((checkRes = checkGoods(goods)) != null) {
            return SaResult.error(checkRes);
        }
        goodsMapper.update(goods);
        return SaResult.ok();
    }

    @Override
    public SaResult queryAll(Integer page, Integer limit, String goodsName, String goodsType) {
        if (page == null || limit == null) {
            List<Goods> goodsList = goodsMapper.queryAll(goodsName, goodsType);
            return SaResult.data(goodsList);
        } else {
            Page<Goods> goodsPage = PageHelper.startPage(page, limit).doSelectPage(() -> goodsMapper.queryAll(goodsName, goodsType));
            Paging<Goods> goodsPaging = new Paging<>(goodsPage);
            return SaResult.data(goodsPaging);
        }
    }
}
