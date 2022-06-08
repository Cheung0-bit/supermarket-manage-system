package top.zhanglin.server.domian;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;
import lombok.EqualsAndHashCode;
import org.apache.ibatis.type.Alias;

import java.io.Serializable;
import java.util.List;


/**
 * <系统角色>
 *
 * @Author Lin
 * @createTime 2022/6/1 18:34
 */
@EqualsAndHashCode(callSuper = true)
@Data
@ApiModel(value = "SysRole", description = "系统角色")
@Alias("SysRole")
public class SysRole extends BaseEntity implements Serializable {


    /**
     * id值
     */
    @ApiModelProperty(value = "角色编号", name = "roleId", example = "2")
    private Integer roleId;

    /**
     * 名称
     */
    @ApiModelProperty(value = "角色名称", name = "roleName")
    private String roleName;

    /**
     * 描述
     */
    @ApiModelProperty(value = "角色名称", name = "roleName")
    private String description;

    /**
     * 菜单
     */
    @ApiModelProperty(value = "菜单", name = "menu")
    private String menu;

    /**
     * 状态
     */
    @ApiModelProperty(value = "是否启用", name = "enable")
    private Boolean enable = true;

}
