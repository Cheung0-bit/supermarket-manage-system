package top.zhanglin.server.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import springfox.documentation.builders.ApiInfoBuilder;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.service.*;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spi.service.contexts.SecurityContext;
import springfox.documentation.spring.web.plugins.Docket;
import top.zhanglin.server.config.property.SwaggerProperty;

import javax.annotation.Resource;
import java.util.Arrays;
import java.util.List;

/**
 * <swagger文档配置>
 *
 * @Author Lin
 * @createTime 2022/6/1 17:04
 */
@Configuration
public class SwaggerConfigure {

    @Resource
    private SwaggerProperty documentAutoProperties;

    @Bean
    public Docket docket() {

        return new Docket(DocumentationType.OAS_30)
                .enable(documentAutoProperties.getEnable())
                .securityContexts(Arrays.asList(securityContext()))
                .securitySchemes(Arrays.asList(apiKey()))
                .groupName(documentAutoProperties.getGroupName())
                .apiInfo(apiInfo())
                .select()
                .apis(RequestHandlerSelectors.basePackage(documentAutoProperties.getScanPackage()))
                .build();
    }

    public ApiInfo apiInfo() {
        return new ApiInfoBuilder()
                .contact(new Contact(documentAutoProperties.getContactName(), documentAutoProperties.getContactUrl(), documentAutoProperties.getContactEmail()))
                .title(documentAutoProperties.getTitle())
                .description(documentAutoProperties.getDescription())
                .version(documentAutoProperties.getVersion())
                .build();
    }

    /**
     * 自定义一个Apikey
     * 这是一个包含在header中键名为Authorization的JWT标识
     */
    private ApiKey apiKey() {
        return new ApiKey("Authorization", "Authorization", "header");
    }

    /**
     * 配置JWT的SecurityContext 并设置全局生效
     */
    private SecurityContext securityContext() {
        return SecurityContext.builder().securityReferences(defaultAuth()).build();
    }

    private List<SecurityReference> defaultAuth() {
        AuthorizationScope authorizationScope = new AuthorizationScope("global", "accessEverything");
        AuthorizationScope[] authorizationScopes = new AuthorizationScope[1];
        authorizationScopes[0] = authorizationScope;
        return Arrays.asList(new SecurityReference("Authorization", authorizationScopes));
    }

}
