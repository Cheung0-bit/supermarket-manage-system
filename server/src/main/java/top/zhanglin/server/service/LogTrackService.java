package top.zhanglin.server.service;

import cn.dev33.satoken.util.SaResult;
import org.springframework.stereotype.Service;
import top.zhanglin.server.domian.LogInfo;

import java.util.List;

/**
 * <日志监控接口>
 *
 * @Author Lin
 * @createTime 2022/6/9 15:04
 */
@Service
public interface LogTrackService {

    /**
     * 批量查询
     *
     * @param page
     * @param limit
     * @param logName
     * @param username
     * @param url
     * @return
     */
    SaResult queryAll(Integer page, Integer limit, String logName, String username, String url);

    /**
     * 删除
     *
     * @param id
     * @return
     */
    SaResult delete(Long id);


}
