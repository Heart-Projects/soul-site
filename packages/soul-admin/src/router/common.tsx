import { RouteObject } from "react-router-dom";
import Login from "@/page/login";
import Register from "@/page/register";
import ErrorPage404 from "@/page/error/404_page";
const CommonRouters: RouteObject[] = [
  {
    path: "/login",
    element: <Login />,
    handle: {
      meta: {
        title: "登录",
      },
    },
  },
  {
    path: "/register",
    element: <Register />,
    handle: {
      meta: {
        title: "注册",
      },
    },
  },
  {
    path: "*",
    element: <ErrorPage404 />,
  },
];

export default CommonRouters;
