package top.zhanglin.server.constant;

/**
 * <Servlet常量>
 *
 * @Author Lin
 * @createTime 2022/6/4 21:15
 */
public class ServletConstant {

    public static final String JSON_UTF8 = "application/json;charset=UTF-8";
    public static final String REMOTE_HOST_0 = "0:0:0:0:0:0:0:1";
    public static final String REMOTE_HOST_127 = "127.0.0.1";

    public static class Browser {
        public static final String FIRE_FOX_UA = "Firefox";
        public static final String FIRE_FOX_NAME = "火狐浏览器";
        public static final String CHROME_UA = "Chrome";
        public static final String CHROME_NAME = "谷歌浏览器";
        public static final String IE_UA = "Trident";
        public static final String IE_NAME = "IE浏览器";
        public static final String UNKNOWN = "你用啥浏览器";
    }

    public static class Header {
        public static final String X_REQUESTED_WITH = "X-Requested-With";
        public static final String XML_HTTP_REQUEST = "XMLHttpRequest";
        public static final String CONTENT_TYPE = "Content-type";
        public static final String UA = "User-Agent";
    }

    public static class System {
        public static final String WIN_UA = "windows";
        public static final String WIN_NAME = "Windows";
        public static final String MAC_UA = "mac";
        public static final String MAC_NAME = "Mac";
        public static final String UNIX_UA = "x11";
        public static final String UNIX_NAME = "Unix";
        public static final String ANDROID_UA = "android";
        public static final String ANDROID_NAME = "Android";
        public static final String IPHONE_UA = "iphone";
        public static final String IPHONE_NAME = "iPhone";
        public static final String UNKNOWN = "UnKnown, More-Info: ";
    }

}
