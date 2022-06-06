/*
 * @Description: 路由处理工具
 * @Author: cheung0
 * @Date: 2022-04-30 14:39:53
 */

export function setSideMenus(Menus) {
  /* 存储的是Json 字符串*/
  localStorage.setItem('sideMenus', JSON.stringfy(Menus))
}

export function getSideMenus() {
  const strMenus = localStorage.getItem('sideMenus')
  return JSON.parse(strMenus)
}

// 递归遍历处理
export function traverseRoutes(menus) {
  let routes = menus.map(menu => {
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