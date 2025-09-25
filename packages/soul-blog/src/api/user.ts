import { ResponseData, Headers } from "@/types/common";
import HttpClient from "../lib/http-client";
import type { UserInfo, UserLoginInfo } from "@/types/user";
type UserLogin = {
  username: string;
  password: string;
};

type SysUser = {
  id: number;
  userIdentify: string;
  name: string;
  email: string;
  phone: string;
  avatar: string;
  homeUrl: string;
};
type UserArticleStatisticData = {
  id: number;
  // 热度
  hotCount: number;
  // 文章数量
  articleCount: number;
  // 关注数量
  followCount: number;
  // 收藏数量
  favoriteCount: number;
  // 转发数量
  forwardCount: number;
  // 评论数量
  commentCount: number;
};

type SimpleUser = Pick<
  SysUser,
  "id" | "userIdentify" | "name" | "avatar" | "homeUrl" | "email"
>;

type UserArticleData = {
  user: SimpleUser;
  articleData: UserArticleStatisticData;
};
export async function requestLogin({
  username,
  password,
}: UserLogin): Promise<ResponseData<string>> {
  const response = await HttpClient.post<UserLogin, string>("/user/login", {
    username,
    password,
  });
  return response;
}

export async function requestUserInfo(): Promise<ResponseData<UserLoginInfo>> {
  const response = await HttpClient.get<null, UserLoginInfo>("/user/info");
  return response;
}

/**
 * 获取用户文章统计
 * @returns
 */
export async function requestUserArticleSummary(
  userIdentify: string,
  headers?: Headers
): Promise<ResponseData<UserArticleData>> {
  return await HttpClient.get<null, UserArticleData>(
    "/user/article" + "/" + userIdentify + "/summary",
    undefined,
    headers
  );
}

// 用户站点配置
type UserSiteConfig = {
  userId: number;
  userIdentify: string;
  theme: string;
};

// 获取用户站点配置
export async function requestUserSiteConfig(
  userIdentify: string,
  headers?: Headers
): Promise<ResponseData<UserSiteConfig>> {
  return await HttpClient.get<null, UserSiteConfig>(
    "/user/" + userIdentify + "/site-config",
    undefined,
    headers
  );
}
