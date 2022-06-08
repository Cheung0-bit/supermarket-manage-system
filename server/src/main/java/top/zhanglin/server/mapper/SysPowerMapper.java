package top.zhanglin.server.mapper;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import top.zhanglin.server.domian.SysPower;

import java.util.ArrayList;
import java.util.HashSet;
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
     * 添加权限
     *
     * @param sysPower
     * @return
     */
    int insert(SysPower sysPower);

    /**
     * 查询权限
     *
     * @param powerId
     * @return
     */
    SysPower queryById(Integer powerId);

    /**
     * 批量查询
     *
     * @param powerName
     * @param powerCode
     * @return
     */
    List<SysPower> queryAll(String powerName, String powerCode);

    /**
     * 通过角色查询
     *
     * @param roleId
     * @return
     */
    ArrayList<Integer> queryByRole(Integer roleId);

    /**
     * 通过角色编号查询权限
     *
     * @param userId
     * @return
     */
    List<SysPower> queryByRoleId(Integer userId);

    /**
     * 通过角色名称查询权限
     *
     * @param roleName
     * @return
     */
    List<SysPower> queryByRoleName(String roleName);

    /**
     * 更新权限
     *
     * @param sysPower
     * @return
     */
    int updateById(SysPower sysPower);

    /**
     * 删除权限
     *
     * @param powerId
     * @return
     */
    int deleteById(Integer powerId);

    /**
     * 分配权限
     *
     * @param roleId
     * @param powerIds
     * @return
     */
    int setPower(Integer roleId, @Param("powerIds") HashSet<Integer> powerIds);

    /**
     * 删除角色所有权限
     *
     * @param roleId
     * @return
     */
    int deleteByRoleId(Integer roleId);

    /**
     * 修改启用
     *
     * @param powerId
     * @param enable
     * @return
     */
    int updateEnable(Integer powerId, Boolean enable);

}
