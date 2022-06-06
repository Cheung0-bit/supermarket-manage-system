package top.zhanglin.server.service;

import cn.dev33.satoken.util.SaResult;
import org.springframework.stereotype.Service;

/**
 * <账单业务接口>
 *
 * @Author Lin
 * @createTime 2022/6/5 16:26
 */
@Service
public interface PaymentInfoService {

    /**
     * 删除
     *
     * @param paymentInfoId
     * @return
     */
    SaResult delete(Long paymentInfoId);

    /**
     * 批量查询
     *
     * @param page
     * @param limit
     * @param username
     * @param goodsName
     * @param orderNo
     * @return
     */
    SaResult queryAll(Integer page, Integer limit, String username, String goodsName, String orderNo);


}
