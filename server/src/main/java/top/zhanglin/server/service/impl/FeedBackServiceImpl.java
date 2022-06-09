package top.zhanglin.server.service.impl;

import cn.dev33.satoken.util.SaResult;
import com.github.pagehelper.Page;
import com.github.pagehelper.PageHelper;
import org.springframework.stereotype.Service;
import top.zhanglin.server.domian.FeedBack;
import top.zhanglin.server.mapper.FeedBackMapper;
import top.zhanglin.server.model.Paging;
import top.zhanglin.server.service.FeedBackService;

import javax.annotation.Resource;
import java.util.List;

/**
 * <反馈接口实现>
 *
 * @Author Lin
 * @createTime 2022/6/9 14:31
 */
@Service
public class FeedBackServiceImpl implements FeedBackService {

    @Resource
    private FeedBackMapper feedBackMapper;

    @Override
    public SaResult delete(Integer feedBackId) {
        feedBackMapper.delete(feedBackId);
        return SaResult.ok();
    }

    @Override
    public SaResult queryAll(Integer page, Integer limit, String username, String goodsName) {
        if (page == null || limit == null) {
            List<FeedBack> feedBackList = feedBackMapper.queryAll(username, goodsName);
            return SaResult.data(feedBackList);
        } else {
            Page<FeedBack> feedBackPagePage = PageHelper.startPage(page, limit).doSelectPage(() -> feedBackMapper.queryAll(username, goodsName));
            Paging<FeedBack> feedBackPaging = new Paging<>(feedBackPagePage);
            return SaResult.data(feedBackPaging);
        }
    }

    @Override
    public SaResult reply(Integer feedBackId, String reply) {
        feedBackMapper.updateReplyInt(feedBackId, reply);
        return SaResult.ok();
    }

}
