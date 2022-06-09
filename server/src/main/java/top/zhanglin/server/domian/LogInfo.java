package top.zhanglin.server.domian;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;
import lombok.EqualsAndHashCode;
import org.apache.ibatis.type.Alias;

import java.io.Serializable;

/**
 * <日志记录>
 *
 * @Author Lin
 * @createTime 2022/6/2 10:33
 */
@EqualsAndHashCode(callSuper = true)
@Data
@ApiModel(value = "LogInfo", description = "日志记录")
@Alias("LogInfo")
public class LogInfo extends BaseEntity implements Serializable {

    public static final String LOGIN = "登录日志";

    public static final String EXCEPTION = "异常日志";

    public static final String QUERY = "查询日志";

    public static final String INSERT = "插入日志";

    public static final String UPDATE = "更新日志";

    public static final String DELETE = "删除日志";

    @ApiModelProperty(value = "日志编号", name = "id")
    private Long id;

    @ApiModelProperty(value = "日志名称", name = "logName")
    private String logName;

    @ApiModelProperty(value = "用户名", name = "username")
    private String username;

    @ApiModelProperty(value = "角色名", name = "roleName")
    private String roleName;

    @ApiModelProperty(value = "API路径", name = "url")
    private String url;

    @ApiModelProperty(value = "ip地址", name = "ip")
    private String ip;

    @ApiModelProperty(value = "方法名", name = "functionName")
    private String functionName;

    @ApiModelProperty(value = "入参", name = "inParam")
    private String inParam;

    @ApiModelProperty(value = "出参", name = "outParam")
    private String outParam;

    public LogInfo(String logName
            , String username
            , String roleName
            , String url
            , String ip
            , String functionName
            , String inParam
            , String outParam) {
        this.logName = logName;
        this.username = username;
        this.roleName = roleName;
        this.url = url;
        this.ip = ip;
        this.functionName = functionName;
        this.inParam = inParam;
        this.outParam = outParam;
    }
}
