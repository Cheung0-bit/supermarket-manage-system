package top.zhanglin.server.domian;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;
import lombok.EqualsAndHashCode;
import org.apache.ibatis.type.Alias;

import java.io.Serializable;

/**
 * <系统权限>
 *
 * @Author Lin
 * @createTime 2022/6/2 10:10
 */
@EqualsAndHashCode(callSuper = true)
@ApiModel(value = "SysPower", description = "系统权限")
@Data
@Alias("SysPower")
public class SysPower extends BaseEntity implements Serializable {

    /**
     * 权限编号
     */
    @ApiModelProperty(value = "权限编号", name = "powerId")
    private Integer powerId;

    /**
     * 权限名称
     */
    @ApiModelProperty(value = "权限名称", name = "powerName")
    private String powerName;

    /**
     * 权限标识
     */
    @ApiModelProperty(value = "权限标识", name = "powerCode")
    private String powerCode;

    /**
     * 是否启用
     */
    @ApiModelProperty(value = "是否启用", name = "enable")
    private Boolean enable;

}
