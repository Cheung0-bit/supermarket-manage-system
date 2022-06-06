package top.zhanglin.server.mapper;

import org.apache.ibatis.annotations.Mapper;
import top.zhanglin.server.domian.SysRole;

/**
 * <角色mapper>
 *
 * @Author Lin
 * @createTime 2022/6/2 11:41
 */
@Mapper
public interface SysRoleMapper {

    /**
     * 通过ID查询
     * @param roleId
     * @return
     */
    SysRole queryById(Integer roleId);

}
