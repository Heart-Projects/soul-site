import { RouteObject } from "react-router-dom";
import DefaultLayout from "@/page/app/default-layout";
import Dashboard from "@/page/home/dashboard";
import TestPage from "@/page/test/test-page";
import UserList from "@/page/user/user-list";
import RoleList from "@/page/role/role-list";
import App from "@/App";
const PermissionRouters: RouteObject[] = [
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <DefaultLayout />,
        handle: {
          meta: {
            title: "首页",
          },
        },
        children: [
          {
            index: true,
            element: <Dashboard />,
            handle: {
              meta: {
                title: "首页",
                isMenu: true,
              },
            },
          },
          {
            path: "/test1",
            element: <TestPage />,
            handle: {
              meta: {
                title: "测试1",
                isMenu: true,
              },
            },
          },
          {
            path: "/test2/",
            handle: {
              meta: {
                title: "测试2",
                isMenu: true,
              },
            },
            children: [
              {
                path: "test2-1",
                element: <TestPage />,
                handle: {
                  meta: {
                    title: "测试2-1",
                    isMenu: true,
                  },
                },
              },
            ],
          },
          {
            path: "/test3",
            element: <TestPage />,
            handle: {
              meta: {
                title: "测试4",
                isMenu: true,
              },
            },
          },
          {
            path: "/sys/",
            handle: {
              meta: {
                title: "系统管理",
                isMenu: true,
              },
            },
            children: [
              {
                path: "user-list",
                element: <UserList />,
                handle: {
                  meta: {
                    title: "用户管理",
                    isMenu: true,
                  },
                },
              },
              {
                path: "role-list",
                element: <RoleList />,
                handle: {
                  meta: {
                    title: "角色管理",
                    isMenu: true,
                  },
                },
              },
            ],
          },
        ],
      },
    ],
  },
];

export default PermissionRouters;
