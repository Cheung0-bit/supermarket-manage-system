package top.zhanglin.server.mapper;

import org.apache.ibatis.annotations.Mapper;
import top.zhanglin.server.domian.SysUser;

/**
 * <用户Mapper接口>
 *
 * @Author Lin
 * @createTime 2022/6/2 11:20
 */
@Mapper
public interface SysUserMapper {

    /**
     * 通过ID查询
     * @param id
     * @return
     */
    SysUser queryById(Integer id);

    /**
     * 用户名查询
     * @param username
     * @return
     */
    SysUser queryByNameSysUser(String username);

    /**
     * 批量查询
     * @param username
     * @return
     */
    SysUser queryAll(String username);


}
