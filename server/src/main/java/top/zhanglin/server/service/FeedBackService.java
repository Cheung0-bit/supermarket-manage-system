package top.zhanglin.server.service;

import cn.dev33.satoken.util.SaResult;
import org.springframework.stereotype.Service;

/**
 * <回馈业务接口>
 *
 * @Author Lin
 * @createTime 2022/6/5 16:26
 */
@Service
public interface FeedBackService {

    /**
     * 删除
     *
     * @param feedBackId
     * @return
     */
    SaResult delete(Integer feedBackId);

    /**
     * 批量查询
     *
     * @param page
     * @param limit
     * @param username
     * @param goodsName
     * @param comment
     * @return
     */
    SaResult queryAll(Integer page, Integer limit, String username, String goodsName, String comment);

    /**
     * 回复
     *
     * @param feedBackId
     * @return
     */
    int reply(Integer feedBackId);


}
