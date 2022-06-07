package top.zhanglin.server;

import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ConfigurableApplicationContext;
import org.springframework.core.env.Environment;

/**
 * @author Lin
 */
@Slf4j
@SpringBootApplication
public class ServerApplication {

    public static void main(String[] args) {
        ConfigurableApplicationContext applicationContext = SpringApplication.run(ServerApplication.class, args);
        Environment env = applicationContext.getEnvironment();
        String port = env.getProperty("server.port");
        log.info("\n************************************************************\n\t" +
                "Application is running! Access URLs:\n\t" +
                "Local访问网址: \t\thttp://localhost:" + port + "/doc.html\n" +
                "************************************************************");
    }

}
