import type { MenuProps, MenuClickEventHandler } from "antd";
import { Menu } from "antd";
import { AppMenuItem } from "@/types/app";
import PermissionRouters from "@/router/permission";
import { getMenuItemsFromRoutes } from "@/lib/routerUtils";
import { useNavigate } from "react-router-dom";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
type MenuItem = Required<MenuProps>["items"][number];

const adapterAntdMenuItems = (
  appMenuItems: AppMenuItem[],
  parentKey = "0"
): MenuItem[] => {
  console.log("1");
  const antdMenuItems: MenuItem[] = [];
  for (const item of appMenuItems) {
    const { children } = item;
    let antdChildren: MenuItem[] = [];
    if (children && children.length > 0) {
      antdChildren = adapterAntdMenuItems(children);
    }
    const antdMenuItem: MenuItem = {
      key: item.path === "" ? "/" : item.path,
      label: item.label,
      icon: item.icon,
      children: antdChildren.length === 0 ? undefined : antdChildren,
    };
    antdMenuItems.push(antdMenuItem);
  }
  return antdMenuItems;
};

const findOpenKeys = (key: string, items: MenuItem[]): string[] => {
  for (const item of items) {
    if (key === item?.key) {
      return [item?.key];
    }
    if (item?.children) {
      const openKeys = findOpenKeys(key, item?.children);
      if (openKeys.length > 0) {
        return [item?.key, ...openKeys];
      }
    }
  }
  return [];
};
const Menus = () => {
  const menuCollapse = useSelector(
    (state: RootState) => state.app.menuCollapse
  );
  const dyMenuItems: AppMenuItem[] = useMemo(
    () => getMenuItemsFromRoutes(PermissionRouters),
    []
  );
  const menuItems: MenuItem[] = useMemo(
    () =>
      adapterAntdMenuItems(
        dyMenuItems.length > 0 ? dyMenuItems[0].children || [] : []
      ),
    [dyMenuItems]
  );

  const path = window.location.pathname;
  const navigate = useNavigate();
  const onMenuClick = ({ key }: MenuClickEventHandler) => {
    navigate(key);
  };
  return (
    <>
      <div>
        <Menu
          defaultOpenKeys={findOpenKeys(location.pathname, menuItems)}
          mode="inline"
          inlineCollapsed={menuCollapse}
          defaultSelectedKeys={[path]}
          items={menuItems}
          onClick={onMenuClick}
        />
      </div>
    </>
  );
};

export default Menus;
