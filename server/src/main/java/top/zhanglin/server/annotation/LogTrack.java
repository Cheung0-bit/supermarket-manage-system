package top.zhanglin.server.annotation;

import org.springframework.stereotype.Component;

import java.lang.annotation.*;

/**
 * @author Lin
 */
@Target({ElementType.METHOD})
@Retention(RetentionPolicy.RUNTIME)
@Documented
@Component
public @interface LogTrack {
    String value() default "";
}
