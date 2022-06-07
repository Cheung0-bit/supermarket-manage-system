package top.zhanglin.server.mapper;

import org.apache.ibatis.annotations.Mapper;
import top.zhanglin.server.domian.SysUser;

import java.util.List;

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
     *
     * @param userId
     * @return
     */
    SysUser queryById(Integer userId);

    /**
     * 用户名查询
     *
     * @param username
     * @return
     */
    SysUser queryByNameSysUser(String username);

    /**
     * 批量查询
     *
     * @param username
     * @return
     */
    List<SysUser> queryAll(String username);

    /**
     * 新增数据
     *
     * @param sysUser 实例对象
     * @return 影响行数
     */
    int insert(SysUser sysUser);

    /**
     * 修改启用
     *
     * @param userId
     * @param enable
     * @return
     */
    int updateEnable(Integer userId, Boolean enable);

    /**
     * 编辑信息
     *
     * @param sysUser
     * @return
     */
    int update(SysUser sysUser);

    /**
     * 删除
     *
     * @param userId
     * @return
     */
    int deleteByIdInt(Integer userId);

    /**
     * 修改密码
     *
     * @param userId
     * @param password
     * @return
     */
    int updatePassword(Integer userId, String password);

}
