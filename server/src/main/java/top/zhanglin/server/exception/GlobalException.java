package top.zhanglin.server.exception;

import cn.dev33.satoken.exception.DisableLoginException;
import cn.dev33.satoken.exception.NotLoginException;
import cn.dev33.satoken.exception.NotPermissionException;
import cn.dev33.satoken.exception.NotRoleException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import top.zhanglin.server.domian.LogInfo;
import top.zhanglin.server.mapper.LogTrackMapper;
import top.zhanglin.server.model.AjaxJson;
import top.zhanglin.server.utils.LogUtil;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * <全局异常统一处理>
 *
 * @Author Lin
 * @createTime 2022/6/1 8:40
 */
@RestControllerAdvice
public class GlobalException {

    @Resource
    private LogTrackMapper logTrackMapper;

    /**
     * 全局异常拦截（拦截项目中的所有异常）
     *
     * @param e        异常
     * @param request  请求体
     * @param response 响应体
     * @return AjaxJson响应体
     * @throws Exception
     */
    @ResponseBody
    @ExceptionHandler
    public AjaxJson handlerException(Exception e, HttpServletRequest request, HttpServletResponse response)
            throws Exception {

        // 打印堆栈，以供调试
        System.out.println("全局异常---------------");
        e.printStackTrace();

        LogInfo logInfo = null;
        // 不同异常返回不同状态码
        AjaxJson aj = null;
        if (e instanceof NotLoginException) {
            logInfo = LogUtil.generateLogInfo("handlerException", "异常信息", e.getMessage(), false);
            NotLoginException ee = (NotLoginException) e;
            aj = AjaxJson.getNotLogin().setMsg(ee.getMessage());
        } else if (e instanceof NotRoleException) {
            logInfo = LogUtil.generateLogInfo("handlerException", "异常信息", e.getMessage(), true);
            NotRoleException ee = (NotRoleException) e;
            aj = AjaxJson.getNotJur("无此角色：" + ee.getRole());
        } else if (e instanceof NotPermissionException) {
            logInfo = LogUtil.generateLogInfo("handlerException", "异常信息", e.getMessage(), true);
            NotPermissionException ee = (NotPermissionException) e;
            aj = AjaxJson.getNotJur("无此权限：" + ee.getPermission());
        } else if (e instanceof DisableLoginException) {
            logInfo = LogUtil.generateLogInfo("handlerException", "异常信息", e.getMessage(), true);
            DisableLoginException ee = (DisableLoginException) e;
            aj = AjaxJson.getNotJur("账号被封禁：" + ee.getDisableTime() + "秒后解封");
        } else {    // 普通异常, 输出：500 + 异常信息
            logInfo = LogUtil.generateLogInfo("handlerException", "异常信息", e.getMessage(), true);
            aj = AjaxJson.getError(e.getMessage());
        }
        logTrackMapper.insert(logInfo);
        // 返回给前端
        return aj;
    }


}
