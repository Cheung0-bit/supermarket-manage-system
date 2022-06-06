package top.zhanglin.server;

import cn.dev33.satoken.secure.SaSecureUtil;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
class ServerApplicationTests {

    @Test
    void contextLoads() {
    }

    @Test
    void sha256Encrypt() throws Exception {
        System.out.println(SaSecureUtil.sha256("123456"));
        System.out.println(SaSecureUtil.md5("123456"));
        System.out.println(SaSecureUtil.sha1("123456"));
        System.out.println(SaSecureUtil.rsaGenerateKeyPair());
    }

}
