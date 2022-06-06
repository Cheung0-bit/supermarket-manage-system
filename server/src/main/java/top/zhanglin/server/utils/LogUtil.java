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

    public static LogInfo generateLogInfo(String functionName, String logName, String outParam, boolean isAuthed) {
        String url = ServletUtil.getRequestURI();
        String ip = ServletUtil.getRemoteHost();
        String inParam = ServletUtil.getQueryParam();
        String username = null;
        String roleName = null;
        if (isAuthed) {
            username = StpUtil.getLoginId().toString();
            roleName = StpUtil.getExtra("roleName").toString();
        } else {
            username = "Unknown-User";
            roleName = "Unknown-Role";
        }
        return new LogInfo(logName, username, roleName, url, ip, functionName, inParam, outParam);
    }

}
