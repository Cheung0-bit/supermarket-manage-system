package top.zhanglin.server.mapper;

import org.apache.ibatis.annotations.Mapper;
import top.zhanglin.server.domian.SysPower;

import java.util.List;

/**
 * <权限maper>
 *
 * @Author Lin
 * @createTime 2022/6/2 11:50
 */
@Mapper
public interface SysPowerMapper {

    /**
     * 根据角色获取权限列表
     *
     * @param roleId
     * @return
     */
    List<SysPower> queryAllByRoleId(Integer roleId);

}
