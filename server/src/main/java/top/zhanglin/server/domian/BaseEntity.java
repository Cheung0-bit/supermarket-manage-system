package top.zhanglin.server.domian;

import lombok.Data;

import java.io.Serializable;
import java.util.Date;

/**
 * <基类>
 *
 * @Author Lin
 * @createTime 2022/6/1 15:32
 */
@Data
public class BaseEntity implements Serializable {

    /**
     * 创建时间
     */
    private Date createTime;

    /**
     * 修改时间
     */
    private Date updateTime;

}
