package top.zhanglin.server.domian;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;
import lombok.EqualsAndHashCode;
import org.apache.ibatis.type.Alias;

import java.io.Serializable;

/**
 * <用户反馈>
 *
 * @Author Lin
 * @createTime 2022/6/2 10:33
 */
@EqualsAndHashCode(callSuper = true)
@Data
@ApiModel(value = "FeedBack", description = "用户反馈")
@Alias("FeedBack")
public class FeedBack extends BaseEntity implements Serializable {

    @ApiModelProperty(value = "编号", name = "id")
    private Integer id;

    @ApiModelProperty(value = "用户名", name = "username")
    private String username;

    @ApiModelProperty(value = "商品", name = "goods")
    private Goods goods;

    @ApiModelProperty(value = "图片", name = "picture")
    private String picture;

    @ApiModelProperty(value = "评论", name = "comment")
    private String comment;

    @ApiModelProperty(value = "回复", name = "reply")
    private String reply;
}
