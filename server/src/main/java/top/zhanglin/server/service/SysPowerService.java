package top.zhanglin.server.service;

import cn.dev33.satoken.util.SaResult;
import org.springframework.stereotype.Service;
import top.zhanglin.server.domian.SysPower;

import java.util.HashSet;

/**
 * <权限业务接口>
 *
 * @Author Lin
 * @createTime 2022/6/5 16:25
 */
@Service
public interface SysPowerService {


    /**
     * 查询权限
     *
     * @param page
     * @param limit
     * @param powerName
     * @param powerCode
     * @return
     */
    SaResult queryAll(Integer page, Integer limit, String powerName, String powerCode);

    /**
     * 通过角色查询
     *
     * @param roleId
     * @return
     */
    SaResult queryByRole(Integer roleId);

    /**
     * 插入
     *
     * @param sysPower
     * @return
     */
    SaResult insert(SysPower sysPower);

    /**
     * 更新
     *
     * @param sysPower
     * @return
     */
    SaResult update(SysPower sysPower);

    /**
     * 删除
     *
     * @param powerId
     * @return
     */
    SaResult delete(Integer powerId);

    /**
     * 分配权限
     *
     * @param roleId
     * @param powerIds
     * @return
     */
    SaResult setPower(Integer roleId, HashSet<Integer> powerIds);

    /**
     * 修改启用
     *
     * @param powerId
     * @param enable
     * @return
     */
    SaResult updateEnable(Integer powerId, Boolean enable);

}
