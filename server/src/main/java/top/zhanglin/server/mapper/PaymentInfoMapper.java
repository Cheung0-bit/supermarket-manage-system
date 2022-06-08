package top.zhanglin.server.mapper;

import org.apache.ibatis.annotations.Mapper;
import top.zhanglin.server.domian.PaymentInfo;

import java.util.List;

/**
 * <账单Mapper>
 *
 * @Author Lin
 * @createTime 2022/6/8 20:02
 */
@Mapper
public interface PaymentInfoMapper {

    /**
     * 批量查询
     *
     * @param username
     * @param goodsName
     * @param orderNo
     * @return
     */
    List<PaymentInfo> queryAll(String username, String goodsName, String orderNo);

    /**
     * 删除
     *
     * @param id
     * @return
     */
    int delete(Long id);


}
