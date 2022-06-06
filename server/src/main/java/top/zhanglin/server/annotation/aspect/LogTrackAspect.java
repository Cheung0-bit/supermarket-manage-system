package top.zhanglin.server.annotation.aspect;

import cn.dev33.satoken.util.SaResult;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.AfterReturning;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Pointcut;
import org.aspectj.lang.reflect.MethodSignature;
import org.springframework.stereotype.Component;
import top.zhanglin.server.annotation.LogTrack;
import top.zhanglin.server.domian.LogInfo;
import top.zhanglin.server.mapper.LogTrackMapper;
import top.zhanglin.server.utils.LogUtil;

import javax.annotation.Resource;

/**
 * <日志记录切面>
 *
 * @Author Lin
 * @createTime 2022/6/4 16:37
 */
@Aspect
@Component
public class LogTrackAspect {

    @Resource
    private LogTrackMapper logTrackMapper;

    @Pointcut(value = "@annotation(top.zhanglin.server.annotation.LogTrack)")
    public void access() {
    }

    @AfterReturning(returning = "saResult", pointcut = "@annotation(top.zhanglin.server.annotation.LogTrack)")
    public Object afterExec(JoinPoint jp, SaResult saResult) {
        MethodSignature signature = (MethodSignature) jp.getSignature();
        LogTrack annotation = signature.getMethod().getAnnotation(LogTrack.class);
        String functionName = signature.getName();
        String logName = annotation.value();
        boolean isAuthed = saResult.getCode() == SaResult.CODE_SUCCESS;
        LogInfo logInfo = LogUtil.generateLogInfo(functionName, logName, saResult.toString(), isAuthed);
        logTrackMapper.insert(logInfo);
        return saResult;
    }

}
