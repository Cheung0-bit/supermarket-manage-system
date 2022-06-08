package top.zhanglin.server.mapper;

import org.apache.ibatis.annotations.Mapper;
import top.zhanglin.server.domian.Goods;

import java.util.List;

/**
 * <商品Mapper>
 *
 * @Author Lin
 * @createTime 2022/6/8 20:02
 */
@Mapper
public interface GoodsMapper {

    /**
     * 批量查询
     *
     * @param goodsName
     * @param goodsType
     * @return
     */
    List<Goods> queryAll(String goodsName, String goodsType);

    /**
     * 通过商品名查询
     *
     * @param goodsName
     * @return
     */
    Goods queryByGoodsNameGoods(String goodsName);

    /**
     * 添加商品
     *
     * @param goods
     * @return
     */
    int insert(Goods goods);

    /**
     * 更新信息
     *
     * @param goods
     * @return
     */
    int update(Goods goods);

    /**
     * 删除商品
     *
     * @param goods
     * @return
     */
    int delete(Goods goods);


}
