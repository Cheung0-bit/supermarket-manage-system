package top.zhanglin.server.mapper;

import org.apache.ibatis.annotations.Mapper;
import top.zhanglin.server.domian.LogInfo;

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
     * @param logInfo
     * @return
     */
    int insert(LogInfo logInfo);

}
