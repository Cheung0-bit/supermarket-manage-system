package top.zhanglin.server.service.impl;

import cn.dev33.satoken.util.SaResult;
import com.github.pagehelper.Page;
import com.github.pagehelper.PageHelper;
import org.springframework.stereotype.Service;
import top.zhanglin.server.domian.SysPower;
import top.zhanglin.server.mapper.SysPowerMapper;
import top.zhanglin.server.model.Paging;
import top.zhanglin.server.service.SysPowerService;

import javax.annotation.Resource;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;

/**
 * <权限接口实现>
 *
 * @Author Lin
 * @createTime 2022/6/8 14:42
 */
@Service
public class SysPowerServiceImpl implements SysPowerService {

    @Resource
    private SysPowerMapper sysPowerMapper;

    @Override
    public SaResult queryAll(Integer page, Integer limit, String powerName, String powerCode) {
        if (page == null || limit == null) {
            List<SysPower> sysPowerList = sysPowerMapper.queryAll(powerName, powerCode);
            return SaResult.data(sysPowerList);
        } else {
            Page<SysPower> powerPage = PageHelper.startPage(page, limit).doSelectPage(() -> sysPowerMapper.queryAll(powerName, powerCode));
            Paging<SysPower> powerPaging = new Paging<>(powerPage);
            return SaResult.data(powerPaging);
        }
    }

    @Override
    public SaResult queryByRole(Integer roleId) {
        ArrayList<Integer> powerIds = sysPowerMapper.queryByRole(roleId);
        return SaResult.data(powerIds);
    }

    @Override
    public SaResult insert(SysPower sysPower) {
        sysPowerMapper.insert(sysPower);
        return SaResult.ok();
    }

    @Override
    public SaResult update(SysPower sysPower) {
        sysPowerMapper.updateById(sysPower);
        return SaResult.ok();
    }

    @Override
    public SaResult delete(Integer powerId) {
        sysPowerMapper.deleteById(powerId);
        return SaResult.ok();
    }

    @Override
    public SaResult setPower(Integer roleId, HashSet<Integer> powerIds) {
        if (powerIds == null || powerIds.isEmpty()) {
            return SaResult.error("请分配权限");
        }
        sysPowerMapper.deleteByRoleId(roleId);
        sysPowerMapper.setPower(roleId, powerIds);
        return SaResult.ok();
    }

    @Override
    public SaResult updateEnable(Integer powerId, Boolean enable) {
        sysPowerMapper.updateEnable(powerId, enable);
        return SaResult.ok();
    }
}
