package top.zhanglin.server.mapper;

import org.apache.ibatis.annotations.Mapper;
import top.zhanglin.server.domian.LogInfo;

import java.util.List;

/**
 * <日志mapper>
 *
 * @Author Lin
 * @createTime 2022/6/4 20:49
 */
@Mapper
public interface LogTrackMapper {

    /**
     * 插入新的数据
     *
     * @param logInfo
     * @return
     */
    int insert(LogInfo logInfo);

    /**
     * 批量查询
     *
     * @param logName
     * @param username
     * @param url
     * @return
     */
    List<LogInfo> queryAll(String logName, String username, String url);

    /**
     * 删除
     *
     * @param id
     * @return
     */
    int delete(Long id);

}
