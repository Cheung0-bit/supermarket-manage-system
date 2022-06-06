package top.zhanglin.server.utils;

import org.aspectj.lang.reflect.MethodSignature;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;
import top.zhanglin.server.constant.ServletConstant;
import top.zhanglin.server.constant.SystemConstant;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;

/**
 * <ServletUtil工具>
 *
 * @Author Lin
 * @createTime 2022/6/4 21:11
 */
public class ServletUtil {


    /**
     * 获取 HttpServletRequest 对象
     *
     * @return
     */
    public static HttpServletRequest getRequest() {
        ServletRequestAttributes servletRequestAttributes = (ServletRequestAttributes) RequestContextHolder.getRequestAttributes();
        assert servletRequestAttributes != null;
        return servletRequestAttributes.getRequest();
    }

    /**
     * 获取 HttpServletResponse 对象
     *
     * @return
     */
    public static HttpServletResponse getResponse() {
        ServletRequestAttributes servletRequestAttributes = (ServletRequestAttributes) RequestContextHolder.getRequestAttributes();
        assert servletRequestAttributes != null;
        return servletRequestAttributes.getResponse();
    }

    /**
     * 获取 HttpServletSession 对象
     *
     * @return
     */
    public static HttpSession getSession() {
        ServletRequestAttributes servletRequestAttributes = (ServletRequestAttributes) RequestContextHolder.getRequestAttributes();
        assert servletRequestAttributes != null;
        return servletRequestAttributes.getRequest().getSession();
    }

    /**
     * 判断是否为 Ajax 请求
     *
     * @param request
     * @return
     */
    public static Boolean isAjax(HttpServletRequest request) {
        String requestType = request.getHeader(ServletConstant.Header.X_REQUESTED_WITH);
        return ServletConstant.Header.XML_HTTP_REQUEST.equals(requestType);
    }

    /**
     * 对象写出数据
     *
     * @param msg
     * @throws IOException
     */
    public static void write(String msg) throws IOException {
        HttpServletResponse response = getResponse();
        response.setHeader(ServletConstant.Header.CONTENT_TYPE, ServletConstant.JSON_UTF8);
        response.setCharacterEncoding(SystemConstant.UTF8);
        response.getWriter().write(msg);
    }

    /**
     * 获取查询参数
     *
     * @return
     */
    public static String getQueryParam() {
        return getRequest().getQueryString();
    }

    /**
     * 获取请求地址
     *
     * @return
     */
    public static String getRequestURI() {
        return getRequest().getRequestURI();
    }

    /**
     * 获取客户端地址
     *
     * @return
     */
    public static String getRemoteHost() {
        String remoteHost = getRequest().getRemoteHost();
        if (ServletConstant.REMOTE_HOST_0.equals(remoteHost)) {
            remoteHost = ServletConstant.REMOTE_HOST_127;
        }
        return remoteHost;
    }

    /**
     * 获取当前请求方法
     *
     * @return
     */
    public static String getMethod() {
        return getRequest().getMethod();
    }

    /**
     * 获取请求头
     *
     * @param name
     * @return
     */
    public static String getHeader(String name) {
        return getRequest().getHeader(name);
    }

    /**
     * 获取 UserAgent
     *
     * @return
     */
    public static String getAgent() {
        return getHeader(ServletConstant.Header.UA);
    }

    /**
     * 获取浏览器类型
     *
     * @return
     */
    public static String getBrowser() {
        String userAgent = getAgent();
        if (userAgent.contains(ServletConstant.Browser.FIRE_FOX_UA)) {
            return ServletConstant.Browser.FIRE_FOX_NAME;
        } else if (userAgent.contains(ServletConstant.Browser.CHROME_UA)) {
            return ServletConstant.Browser.CHROME_NAME;
        } else if (userAgent.contains(ServletConstant.Browser.IE_UA)) {
            return ServletConstant.Browser.IE_NAME;
        } else {
            return ServletConstant.Browser.UNKNOWN;
        }
    }

    /**
     * 获取系统类型
     *
     * @return
     */
    public static String getSystem() {
        String userAgent = getAgent();
        if (userAgent.toLowerCase().contains(ServletConstant.System.WIN_UA)) {
            return ServletConstant.System.WIN_NAME;
        } else if (userAgent.toLowerCase().contains(ServletConstant.System.MAC_UA)) {
            return ServletConstant.System.MAC_NAME;
        } else if (userAgent.toLowerCase().contains(ServletConstant.System.UNIX_UA)) {
            return ServletConstant.System.UNIX_NAME;
        } else if (userAgent.toLowerCase().contains(ServletConstant.System.ANDROID_UA)) {
            return ServletConstant.System.ANDROID_NAME;
        } else if (userAgent.toLowerCase().contains(ServletConstant.System.IPHONE_UA)) {
            return ServletConstant.System.IPHONE_NAME;
        } else {
            return ServletConstant.System.UNKNOWN + userAgent;
        }
    }

}
