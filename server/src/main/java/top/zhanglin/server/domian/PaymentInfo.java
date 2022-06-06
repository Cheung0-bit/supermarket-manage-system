package top.zhanglin.server.domian;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;
import lombok.EqualsAndHashCode;
import org.apache.ibatis.type.Alias;

import java.io.Serializable;
import java.math.BigDecimal;

/**
 * <账单流水>
 *
 * @Author Lin
 * @createTime 2022/6/2 10:32
 */
@EqualsAndHashCode(callSuper = true)
@Data
@ApiModel(value = "PaymentInfo", description = "账单信息")
@Alias("PaymentInfo")
public class PaymentInfo extends BaseEntity implements Serializable {

    @ApiModelProperty(value = "编号", name = "id")
    private Long id;

    @ApiModelProperty(value = "系统用户", name = "sysUser")
    private SysUser sysUser;

    @ApiModelProperty(value = "商品", name = "goods")
    private Goods goods;

    @ApiModelProperty(value = "账单号", name = "orderNo")
    private String orderNo;

    @ApiModelProperty(value = "交易状态", name = "tradeState")
    private String tradeState;

    @ApiModelProperty(value = "金额", name = "id")
    private BigDecimal total;

}
