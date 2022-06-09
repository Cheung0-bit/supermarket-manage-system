package top.zhanglin.server.service.impl;

import cn.dev33.satoken.util.SaResult;
import com.github.pagehelper.Page;
import com.github.pagehelper.PageHelper;
import org.springframework.stereotype.Service;
import top.zhanglin.server.domian.LogInfo;
import top.zhanglin.server.mapper.LogTrackMapper;
import top.zhanglin.server.model.Paging;
import top.zhanglin.server.service.LogTrackService;

import javax.annotation.Resource;
import java.util.List;

/**
 * <日志服务接口实现>
 *
 * @Author Lin
 * @createTime 2022/6/9 15:33
 */
@Service
public class LogTrackServiceImpl implements LogTrackService {

    @Resource
    private LogTrackMapper logTrackMapper;

    @Override
    public SaResult queryAll(Integer page, Integer limit, String logName, String username, String url) {
        if (page == null || limit == null) {
            List<LogInfo> logInfoList;
            if (logName.equals(LogInfo.LOGIN)) {
                logInfoList = logTrackMapper.queryAllLogin(username, url);
            } else if (logName.equals(LogInfo.EXCEPTION)) {
                logInfoList = logTrackMapper.queryAllException(username, url);
            } else {
                logInfoList = logTrackMapper.queryAllOperate(username, url);
            }
            return SaResult.data(logInfoList);
        } else {
            Page<LogInfo> logInfoPage;
            if (logName.equals(LogInfo.LOGIN)) {
                logInfoPage = PageHelper.startPage(page, limit).doSelectPage(() -> logTrackMapper.queryAllLogin(username, url));
            } else if (logName.equals(LogInfo.EXCEPTION)) {
                logInfoPage = PageHelper.startPage(page, limit).doSelectPage(() -> logTrackMapper.queryAllException(username, url));
            } else {
                logInfoPage = PageHelper.startPage(page, limit).doSelectPage(() -> logTrackMapper.queryAllOperate(username, url));
            }
            Paging<LogInfo> logInfoPaging = new Paging<>(logInfoPage);
            return SaResult.data(logInfoPaging);
        }
    }

    @Override
    public SaResult delete(Long id) {
        logTrackMapper.delete(id);
        return SaResult.ok();
    }

}
