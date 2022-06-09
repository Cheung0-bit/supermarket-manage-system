package top.zhanglin.server.mapper;

import org.apache.ibatis.annotations.Mapper;
import top.zhanglin.server.domian.FeedBack;

import java.util.List;

/**
 * <反馈Mapper>
 *
 * @Author Lin
 * @createTime 2022/6/8 20:01
 */
@Mapper
public interface FeedBackMapper {

    /**
     * 批量查询
     *
     * @param username
     * @param goodsName
     * @return
     */
    List<FeedBack> queryAll(String username, String goodsName);

    /**
     * 删除
     *
     * @param id
     * @return
     */
    int delete(Integer id);

    /**
     * 回复
     * @param feedBackId
     * @param reply
     * @return
     */
    int updateReplyInt(Integer feedBackId, String reply);

}
