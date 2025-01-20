"use client";

import { cn } from "@/lib/utils";
import {
  AppstoreOutlined,
  MailOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import Link from "next/link";
import { Menu } from "antd";
import { usePathname } from "next/navigation";

type MenuItem = Required<MenuProps>["items"][number];

const items: MenuItem[] = [
  {
    key: "center_index",
    label: <Link href="/article/center/index">首页</Link>,
    icon: <MailOutlined />,
  },
  {
    key: "m2",
    label: "创作",
    type: "group",
    children: [
      {
        key: "article_create",
        label: <Link href="/article/create">写文章</Link>,
      },
    ],
  },
  {
    key: "m4",
    label: "管理",
    type: "group",
    children: [
      {
        key: "manager_list",
        label: <Link href="/article/center/manager/list">文章管理</Link>,
      },
      {
        key: "manager_draft",
        label: <Link href="/article/center/manager/draft">草稿管理</Link>,
      },
      {
        key: "manager_category",
        label: <Link href="/article/center/manager/category">分类管理</Link>,
      },
      {
        key: "manager_tag",
        label: <Link href="/article/center/manager/tag">标签管理</Link>,
      },
      {
        key: "manager_comment",
        label: <Link href="/article/center/manager/comment">评论管理</Link>,
      },
    ],
  },
  {
    key: "m5",
    label: "数据",
    type: "group",
    children: [
      {
        key: "statistics_articles",
        label: <Link href="/article/center/statistics/articles">文章数据</Link>,
      },
    ],
  },
  {
    key: "m6",
    label: "工具",
    type: "group",
    children: [
      {
        key: "tools_sync",
        label: <Link href="/article/center/tools/sync">博客搬家</Link>,
      },
    ],
  },
  {
    key: "m7",
    label: "设置",
    type: "group",
    children: [
      {
        key: "setting_sys",
        label: <Link href="/article/center/setting/sys">基本设置</Link>,
      },
      {
        key: "setting_theme",
        label: <Link href="/article/center/setting/theme">主题设置</Link>,
      },
    ],
  },
];

const SideMenu = ({ className }: { className?: string }) => {
  const pathname = usePathname();
  const pathnameArr = pathname?.split("/") || [];
  let activeKey = "";
  if (pathnameArr?.length > 1) {
    activeKey =
      pathnameArr?.[pathnameArr.length - 2] +
      "_" +
      pathnameArr?.[pathnameArr.length - 1];
  }
  return (
    <div className={cn("w-96", className)}>
      <Menu
        style={{ width: 256 }}
        selectedKeys={[activeKey]}
        mode="inline"
        items={items}
      />
    </div>
  );
};

export default SideMenu;
