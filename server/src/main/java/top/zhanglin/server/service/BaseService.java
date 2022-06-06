package top.zhanglin.server.service;

import cn.dev33.satoken.util.SaResult;
import org.springframework.stereotype.Service;

/**
 * <基础业务>
 *
 * @Author Lin
 * @createTime 2022/6/2 14:04
 */
@Service
public interface BaseService {

    /**
     * 身份检查
     *
     * @param username
     * @param password
     * @return
     */
    SaResult authCheck(String username, String password);

    /**
     * 组装信息
     *
     * @return
     */
    SaResult getInfo();

}
