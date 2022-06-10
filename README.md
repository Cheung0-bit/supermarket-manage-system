## 🍦引言

### 🍟课题背景和意义

检验数据库课程的学习成果，在实际操作中锻炼将理论知识应用的能力。锻炼系统架构的能力，从需求分析到模型抽象、建库建表、业务流程代码的编写。本次所选课题为“小型超市商品管理系统”，旨在于做一个完整的、具备一定安全防护的超市商品的后台管理系统，除了最基本的用户角色访问控制、商品的增删改查，还应具备一定的系统监控、日志记录，安全报警等功能。通过建立一个管理系统中台，为超市的管理层工作人员带来极度友好的操作体验和在一定程序上改善工作时的心情

### 🍟课题内容

小型超市商品管理系统

### 🍟功能实现

- [x] RBAC权限管理
- [x] JWT身份验证与鉴权
- [x] 分角色动态更新菜单
- [x] Swagger/Knife4j接口文档
- [x] i18N国际化
- [x] 日志监控
- [ ] 异常报警

## 🍿系统需求分析及相关技术介绍

### 🍔功能需求分析

- 用户角色权限的细粒度管理
- 商品种类的划分、有关详情信息的增删改查
- 顾客评价及回应
- 订单流水报表
- 系统日志监控

### 🍔可行性分析

- 社会：通过调研观察，很多超市在物流管理方面仍然使用较为传统的方式，大量的人工操作会带来很多的问题，包括但不限于商品损坏、顾客投诉得不到及时处理、报表出错，给超市带来很大的经济损失。鉴于此情况，要跟上时代的步伐，帮助超市搭建中台，有助于减少重复且没有意义的人工操作，解放工作人员的时间
- 技术：由于使用者有限，与计算机运行速度相比较微不足道，不需要考虑的高并发、高可用、高性能
- 经济：该系统只需部署在私人电脑上，没有服务器成本。系统处理的计算量微不足道，不用考虑耗电成本

### 🍔系统运行环境

- 操作系统：
  - Debian GNU/Linux 11
  - Microsoft Windows 10 企业版
- Java: V1.8.0_301
- NodeJs: V14.18.0
- Vue：2
- MySql: V8.0.26 
- MongoDB: V5.0
- Docker: V20.10.16

### 🍔相关技术介绍

本系统通过HTTP协议进行交互，属于B/S架构。采用前后端分离，使用electron打包，方便用户在不同的操作系统上运行

#### ✨后端

使用`SpringBoot`作为HTTP通信的搭建框架

![](https://0-bit.oss-cn-beijing.aliyuncs.com/springboot.png)

> Spring Boot是由Pivotal团队提供的全新[框架](https://baike.baidu.com/item/框架/1212667)，其设计目的是用来[简化](https://baike.baidu.com/item/简化/3374416)新[Spring](https://baike.baidu.com/item/Spring/85061)应用的初始搭建以及开发过程。该框架使用了特定的方式来进行配置，从而使开发人员不再需要定义样板化的配置。通过这种方式，Spring Boot致力于在蓬勃发展的快速应用开发领域(rapid application development)成为领导者

`SpringBoot`是一个一`Java`为语言基础长期发展而来的一款优秀的`WEB`框架。以`IOC`和`AOP`作为两大核心，使其天然区别于其他`WEB`框架(包括不限于`Django`、`Express`、`Gin`)，有着截然不同的气质。在`SpringBoot`中，实例化的对象即是一个Bean，有`BeanFactory`通一管理，随时可在程序中依赖注入。

`SpringBoot`限制的四层架构天然的符合设计模式，限制了开发者的自由，但同时降低系统模块间的耦合度，提高系统健壮性。

#### ✨前端

`Vue2`+`Vuex`+`Electron`

![](https://0-bit.oss-cn-beijing.aliyuncs.com/Logo-Vuejs.png)

> Vue (读音 /vjuː/，类似于 view) 是一套用于构建[用户界面](https://baike.baidu.com/item/用户界面/6582461)的渐进式[JavaScript](https://baike.baidu.com/item/JavaScript/321142)框架。 [5] 与其它大型框架不同的是，Vue 被设计为可以自底向上逐层应用。Vue 的核心库只关注视图层，不仅易于上手，还便于与第三方库或既有项目整合。另一方面，当与现代化的工具链以及各种支持[类库](https://baike.baidu.com/item/类库/3351433)结合使用时，Vue 也完全能够为复杂的单页应用（[SPA](https://baike.baidu.com/item/SPA/17536313)）提供驱动。

`Vue`是一款由国人尤雨溪开发的前端脚手架,解救前端工作者于劳苦之中。`Electron`作为打包工具，可将WEB端应用打包为不同平台的窗口程序。

#### ✨数据库

`MySQL`

![](https://0-bit.oss-cn-beijing.aliyuncs.com/1200px-MySQL.svg.png)

> MySQL是一个**[关系型数据库管理系统](https://baike.baidu.com/item/关系型数据库管理系统/696511)****，**由瑞典[MySQL AB](https://baike.baidu.com/item/MySQL AB/2620844) 公司开发，属于 [Oracle](https://baike.baidu.com/item/Oracle) 旗下产品。MySQL 是最流行的[关系型数据库管理系统](https://baike.baidu.com/item/关系型数据库管理系统/696511)之一，在 [WEB](https://baike.baidu.com/item/WEB/150564) 应用方面，MySQL是最好的 [RDBMS](https://baike.baidu.com/item/RDBMS/1048260) (Relational Database Management System，关系数据库管理系统) 应用软件之一。

#### ✨权限管理

[Sa-Token](https://github.com/dromara/Sa-Token)

![image-20220610090946876](https://0-bit.oss-cn-beijing.aliyuncs.com/image-20220610090946876.png)

> **Sa-Token** 是一个轻量级 Java 权限认证框架，主要解决：**`登录认证`**、**`权限认证`**、**`Session会话`**、**`单点登录`**、**`OAuth2.0`**、**`微服务网关鉴权`** 等一系列权限相关问题。

相较于`Shiro`、`SpringSecurity`,其使用起来更加便捷、简单。其底层封装好了各式各样的API供开发者调用。在老师/老板对系统性能于安全不做过高要求的情况，`Sa-Token`不失为一个极佳的选择

#### ✨模板框架

[Vue-Element-Admin](https://github.com/PanJiaChen/vue-element-admin)是目前国内最流行的后台管理框架，帮助开发者专注于接口的对接，而非页面的设计开发，快速搭建后台管理系统。

![image-20220610091020551](https://0-bit.oss-cn-beijing.aliyuncs.com/image-20220610091020551.png)

## 🍧系统总体设计

### 🍗系统功能结构设计

![image-20220531184831426](https://0-bit.oss-cn-beijing.aliyuncs.com/image-20220531184831426.png)

​											图3-1

### 🍗系统功能流程设计

#### 🧈登录功能流程设计

打开应用是后端首先判断用户是否具备登录口令，没有的话则先进行登录。登录成功数据库查询用户所分配的角色，根据不同的角色渲染菜单栏，分配不同的功能权限。如图3-2-1所示

![image-20220531190939846](https://0-bit.oss-cn-beijing.aliyuncs.com/image-20220531190939846.png)

​										图3-2-1

#### 🧈主要业务模块流程设计

主要业务包括了RBAC的用户角色权限，商品分栏，账单流水、系统日志的管理。及对应的增删改查。如图3-2-2所示

![image-20220531191516243](https://0-bit.oss-cn-beijing.aliyuncs.com/image-20220531191516243.png)

​									图3-2-2

#### 🧈日志模块流程设计

在每次用户发起操作前，系统都会统一记录操作日志。若该操作引发系统异常，则系统会发送警报

![image-20220531192047807](https://0-bit.oss-cn-beijing.aliyuncs.com/image-20220531192047807.png)

​										图3-2-3

### 🍗数据库设计

#### 🧈概念结构设计

- RBAC模块分为用户角色权限。由于本系统较为简单，且不具备可拓展的可能性，故将用户和角色设置为一对一关系，角色和权限之间是多对多的关系

- 商品独立抽象成一张表
- 商品ID与商品名称作为账单表的外键，建立联系
- 日志表对API的签名、入参、出参、URL、请求用户、请求者角色、请求IP、日志名称、请求时间、更新时间

整体UML设计如图3-3-1所示：

![](https://0-bit.oss-cn-beijing.aliyuncs.com/image-20220531210424692.png)

​										图3-3-1

#### 🧈逻辑结构设计

用户表（sys_user）

![image-20220531211051212](https://0-bit.oss-cn-beijing.aliyuncs.com/image-20220531211051212.png)

​									    图3-3-2-1

角色表（sys_role）

![image-20220531211151894](https://0-bit.oss-cn-beijing.aliyuncs.com/image-20220531211151894.png)

​										图3-3-2-2

权限表（sys_power）

![image-20220531211331900](https://0-bit.oss-cn-beijing.aliyuncs.com/image-20220531211331900.png)

​										图3-3-2-3

角色权限中间表（sys_role_power）

![image-20220531211351943](https://0-bit.oss-cn-beijing.aliyuncs.com/image-20220531211351943.png)

​										图3-3-2-4

商品表（goods）

![](https://0-bit.oss-cn-beijing.aliyuncs.com/image-20220531211811181.png)

​										图3-3-2-5

账单表（payment_info）

![](https://0-bit.oss-cn-beijing.aliyuncs.com/image-20220531211659431.png)

​										图3-3-2-6

反馈表（feed_back）

![](https://0-bit.oss-cn-beijing.aliyuncs.com/image-20220605163008385.png)

​										图3-3-2-7

日志表（log_info）

![image-20220531211928995](https://0-bit.oss-cn-beijing.aliyuncs.com/image-20220531211928995.png)

​										图3-3-2-8

所有表信息如下

![image-20220531212517623](https://0-bit.oss-cn-beijing.aliyuncs.com/image-20220531212517623.png)

​										图3-3-2-9

## 🧀系统实现

### 🍚登录功能实现

![image-20220610091113524](https://0-bit.oss-cn-beijing.aliyuncs.com/image-20220610091113524.png)

![image-20220610091741884](https://0-bit.oss-cn-beijing.aliyuncs.com/image-20220610091741884.png)

![image-20220610091802047](https://0-bit.oss-cn-beijing.aliyuncs.com/image-20220610091802047.png)

![image-20220610092036184](C:\Users\Lin\AppData\Roaming\Typora\typora-user-images\image-20220610092036184.png)

![image-20220610092058388](https://0-bit.oss-cn-beijing.aliyuncs.com/image-20220610092058388.png)

![image-20220610092132366](https://0-bit.oss-cn-beijing.aliyuncs.com/image-20220610092132366.png)

![image-20220610092152553](https://0-bit.oss-cn-beijing.aliyuncs.com/image-20220610092152553.png)

![image-20220610092217382](https://0-bit.oss-cn-beijing.aliyuncs.com/image-20220610092217382.png)

### 🍚主要业务实现

![image-20220610092236974](https://0-bit.oss-cn-beijing.aliyuncs.com/image-20220610092236974.png)

![image-20220610092248417](https://0-bit.oss-cn-beijing.aliyuncs.com/image-20220610092305507.png)

### 🍚日志业务实现

![image-20220610092329223](https://0-bit.oss-cn-beijing.aliyuncs.com/image-20220610092329223.png)

![image-20220610092341240](https://0-bit.oss-cn-beijing.aliyuncs.com/image-20220610092341240.png)

![image-20220610092353132](https://0-bit.oss-cn-beijing.aliyuncs.com/image-20220610092353132.png)

## 🎉总结

通过本次课程设计，锻炼了数据库的开发能力，受益匪浅

