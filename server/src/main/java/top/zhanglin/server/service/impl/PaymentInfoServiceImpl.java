package top.zhanglin.server.service.impl;

import cn.dev33.satoken.util.SaResult;
import com.github.pagehelper.Page;
import com.github.pagehelper.PageHelper;
import org.springframework.stereotype.Service;
import top.zhanglin.server.domian.PaymentInfo;
import top.zhanglin.server.mapper.PaymentInfoMapper;
import top.zhanglin.server.model.Paging;
import top.zhanglin.server.service.PaymentInfoService;

import javax.annotation.Resource;
import java.util.List;

/**
 * <账单接口实现>
 *
 * @Author Lin
 * @createTime 2022/6/9 14:26
 */
@Service
public class PaymentInfoServiceImpl implements PaymentInfoService {

    @Resource
    private PaymentInfoMapper paymentInfoMapper;

    @Override
    public SaResult delete(Long paymentInfoId) {
        paymentInfoMapper.delete(paymentInfoId);
        return SaResult.ok();
    }

    @Override
    public SaResult queryAll(Integer page, Integer limit, String username, String goodsName, String orderNo) {
        if (page == null || limit == null) {
            List<PaymentInfo> paymentInfoList = paymentInfoMapper.queryAll(username, goodsName, orderNo);
            return SaResult.data(paymentInfoList);
        } else {
            Page<PaymentInfo> paymentInfoPage = PageHelper.startPage(page, limit).doSelectPage(() -> paymentInfoMapper.queryAll(username, goodsName, orderNo));
            Paging<PaymentInfo> paymentInfoPaging = new Paging<>(paymentInfoPage);
            return SaResult.data(paymentInfoPaging);
        }
    }
}
