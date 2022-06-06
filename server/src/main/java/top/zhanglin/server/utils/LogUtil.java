package top.zhanglin.server.utils;

import cn.dev33.satoken.stp.StpUtil;
import top.zhanglin.server.domian.LogInfo;

/**
 * <日志工具>
 *
 * @Author Lin
 * @createTime 2022/6/4 21:52
 */
public class LogUtil {

    public static LogInfo generateLogInfo(String functionName, String logName, String outParam) {
        String username = StpUtil.getLoginId().toString();
        String roleName = StpUtil.getExtra("roleName").toString();
        String url = ServletUtil.getRequestURI();
        String ip = ServletUtil.getRemoteHost();
        String inParam = ServletUtil.getQueryParam();
        return new LogInfo(logName, username, roleName, url, ip, functionName, inParam, outParam);
    }

}
