package top.zhanglin.server.domian;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;
import lombok.EqualsAndHashCode;
import org.apache.ibatis.type.Alias;

import java.io.Serializable;

/**
 * <系统用户>
 *
 * @Author Lin
 * @createTime 2022/6/1 8:45
 */
@EqualsAndHashCode(callSuper = true)
@Data
@ApiModel(value = "SysUser", description = "系统用户")
@Alias("SysUser")
public class SysUser extends BaseEntity implements Serializable {

    private static final long serialVersionUID = 1323768179931939356L;

    /**
     * 账户ID
     */
    @ApiModelProperty(value = "用户编号", name = "id")
    private Integer id;

    /**
     * 角色
     */
    @ApiModelProperty(value = "用户编号", name = "id")
    private SysRole sysRole;

    /**
     * 昵称
     */
    @ApiModelProperty(value = "系统用户名", name = "username")
    private String username;

    /**
     * 密码
     */
    @ApiModelProperty(value = "用户密码", name = "password", example = "123456")
    private String password;

    /**
     * 头像
     */
    @ApiModelProperty(value = "用户头像", name = "avatar", example = "https://images.maiquer.tech/images/bad6364a.jpg")
    private String avatar = "https://images.maiquer.tech/images/bad6364a.jpg";

    /**
     * 个性签名
     */
    @ApiModelProperty(value = "个性签名", name = "signature", example = "从前从前,有个人爱你很久...")
    private String signature = "从前从前，有个人爱你很久";

    /**
     * 是否启用
     */
    @ApiModelProperty(value = "是否启用", name = "enable")
    private Boolean enable = true;

}
