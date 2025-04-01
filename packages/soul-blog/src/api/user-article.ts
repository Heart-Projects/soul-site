import { ResponseData, ResponsePageData, Headers } from "@/types/common";
import HttpClient from "../lib/http-client";
interface SaveArticleParams {
  id?: number
  userId?: number
  siteCategoryId: number
  categoryId: number
  columnId?: number
  type: number
  title: string
  content: string
  summary?: string
  status: number
  thumbnail?: string
  label?: string
  labels?: ArticleTag[]
  isComment: boolean | string
  isOnTop: boolean | string
  updatedAt?: string
}
export async function saveArticle(articleParams: SaveArticleParams): Promise<ResponseData<number>> {
  return await HttpClient.post<SaveArticleParams, number>("/article/save", articleParams)
}

interface UserArticleListParams {
  pageIndex: number
  pageSize: number
  category: string
}
interface ArticleTag {
  id?: number
  name: string
  note: string
  color: string
}
interface ArticleNavItem {
  id: number
  title: string
}
interface UserArticleItem extends SaveArticleParams  {
  labels: ArticleTag[]
  // 上一遍文章
  next?: ArticleNavItem
  // 下一遍文章
  pre?: ArticleNavItem
}

/**
 * 获取用户文章列表
 * @param params 
 * @returns 
 */
export async function requestUserArticleList(params: UserArticleListParams, headers?: Headers): Promise<ResponseData<ResponsePageData<UserArticleItem>>> {
  return await HttpClient.get<UserArticleListParams, ResponsePageData<UserArticleItem>>("/article/list", params, headers)
}

type ArticleDetailParams = {
  articleId: number,
  userId: number
}

/**
 * 获取用户文章详情
 * @param params 
 * @param headers 
 * @returns 
 */
export async function requestArticleDetail(params: ArticleDetailParams, headers?: Headers): Promise<ResponseData<UserArticleItem>> {
  return await HttpClient.get<ArticleDetailParams, UserArticleItem>("/article/detail/" +params.userId + "/" + params.articleId, undefined, headers)
}

export async function requestArticleEditDetail(params: {articleId: number}, headers?: Headers): Promise<ResponseData<UserArticleItem>> {
  return await HttpClient.get<ArticleDetailParams, UserArticleItem>("/article/edit/detail/" + params.articleId, undefined, headers)
}

export type { SaveArticleParams, UserArticleItem, UserArticleListParams, ArticleTag, ArticleDetailParams }