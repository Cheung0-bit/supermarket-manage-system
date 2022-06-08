package top.zhanglin.server.domian;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;
import lombok.EqualsAndHashCode;
import org.apache.ibatis.type.Alias;

import java.io.Serializable;
import java.math.BigDecimal;

/**
 * <商品>
 *
 * @Author Lin
 * @createTime 2022/6/2 10:33
 */
@EqualsAndHashCode(callSuper = true)
@Data
@ApiModel(value = "Goods", description = "商品")
@Alias("Goods")
public class Goods extends BaseEntity implements Serializable {

    @ApiModelProperty(value = "商品编号", name = "goodsId")
    private Integer goodsId;

    @ApiModelProperty(value = "商品名称", name = "goodsName")
    private String goodsName;

    @ApiModelProperty(value = "商品类型", name = "goodsType")
    private String goodsType;

    @ApiModelProperty(value = "商品图片", name = "goodsPic")
    private String goodsPic;

    @ApiModelProperty(value = "商品价格", name = "goodsPrice")
    private BigDecimal goodsPrice;

    @ApiModelProperty(value = "商品库存", name = "stock")
    private Integer stock;

    @ApiModelProperty(value = "商品购买量", name = "buyCount")
    private Integer buyCount;

}
