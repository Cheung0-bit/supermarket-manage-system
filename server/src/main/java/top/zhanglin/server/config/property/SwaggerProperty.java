package top.zhanglin.server.config.property;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

import java.io.Serializable;

/**
 * <swagger参数配置>
 *
 * @Author Lin
 * @createTime 2022/6/1 17:06
 */
@Data
@Configuration
@ConfigurationProperties("supermarket.swagger")
public class SwaggerProperty implements Serializable {
    /**
     * 是 否 开 启
     */
    private Boolean enable;

    /**
     * 分 组 名 称
     */
    private String groupName;

    /**
     * 系 统 标 题
     */
    private String title;

    /**
     * 描 述 信 息
     */
    private String description;

    /**
     * 版 本 信 息
     */
    private String version;

    /**
     * 扫 描 路 径
     */
    private String scanPackage;

    /**
     * 联 系 人 名 字
     */
    private String contactName;

    /**
     * 联 系 人 链 接
     */
    private String contactUrl;

    /**
     * 联 系 人 邮 箱
     */
    private String contactEmail;

}
