/*
 * @Description: 路由处理工具类测试
 * @Author: cheung0
 * @Date: 2022-05-02 10:30:04
 */

const routes =  [
  {
    "roleIds": [
      1,
      2
    ],
    "path": "/system",
    "component": "layout",
    "name": "system",
    "hidden": false,
    "meta": {
      "title": "系统管理",
      "icon": "system"
    },
    "children": [
      {
        "roleIds": [
          1,
          2
        ],
        "path": "/mgr",
        "component": "views/system/user/index",
        "name": "mgr",
        "hidden": false,
        "meta": {
          "title": "用户管理",
          "icon": "user"
        },
        "children": null
      },
      null,
      {
        "roleIds": [
          1,
          2
        ],
        "path": "/dept",
        "component": "views/system/dept/index",
        "name": "dept",
        "hidden": false,
        "meta": {
          "title": "部门管理",
          "icon": "dept"
        },
        "children": null
      }
    ]
  }
]

// 递归遍历处理
function traverseRoutes(menus) {
  let routes = menus.map(menu => {
    if(menu == null) return [];
    if (menu.component) {
      let name = menu.component
      menu.component = (resolve) => require([`@/${name}`], resolve)
    }

    if (menu.children && menu.children.length) {
      menu.children = traverseRoutes(menu.children);
    } else {
      // 真的坑啊！！！ 查了一下午原因（-_-||） 
      menu.children = [];
    }
    return menu;
  })
  return routes;
}

console.log(traverseRoutes(routes));
console.log(traverseRoutes(routes)[0].children);