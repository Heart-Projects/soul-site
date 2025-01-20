import { AppMenuItem } from './../types/app';
import type { RouteObject} from "react-router"
export const getMenuItemsFromRoutes = (routes: RouteObject[]):AppMenuItem[] =>  {
  if(!routes) return []
  const menuItems:AppMenuItem[] = []
  for (const route of routes) {
    const { path, children, handle } = route
    let childrenMenus: AppMenuItem[] = []
    if (children && children.length > 0) {
      childrenMenus = getMenuItemsFromRoutes(children)
    }
    const { hidden  = false, isMenu = true } = handle?.meta || {}
    if (!isMenu) continue
    const menuItem:AppMenuItem = {
      path: path || '',
      label: handle?.meta?.title || route.path,
      icon: handle?.meta?.icon,
      children: childrenMenus
    }
    menuItem.children?.forEach(item => {
      if (item.path.startsWith('/')) {
        return
      }
      item.path = `${menuItem.path}${item.path}`
    })
    menuItems.push(menuItem)
  }
  if (menuItems.length === 1 && menuItems[0].children?.length === 1) {
    return menuItems[0].children
  }
  return menuItems
}