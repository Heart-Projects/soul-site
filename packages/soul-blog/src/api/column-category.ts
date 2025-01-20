

import { ResponseData, Headers, BaseDbModel } from "@/types/common";
import HttpClient from "@/lib/http-client";

export type ArticleColumnCategory = {
  parentId?: number
  userId?: number
  name: string
  level?: number
  treePath?: string
} & BaseDbModel

export type ArticleColumnCategoryTree = ArticleColumnCategory & {
  children: ArticleColumnCategory[]  
}

export type ArticleColumnCategoryAddParams = Pick<ArticleColumnCategory, "parentId" | "name">
export async function requestColumnCategoryAdd(params: ArticleColumnCategoryAddParams, headers?: Headers): Promise<ResponseData<ArticleColumnCategory>> {
  return await HttpClient.post<ArticleColumnCategoryAddParams, ArticleColumnCategory>("/column-category/add", params, headers)
}

export type ArticleColumnCategoryUpdateParams = Pick<ArticleColumnCategory, "id" | "name"| "parentId">
export async function requestColumnCategoryRename(params: ArticleColumnCategoryUpdateParams, headers?: Headers): Promise<ResponseData<null>> {
  return await HttpClient.post<ArticleColumnCategoryUpdateParams, null>("/column-category/rename", params, headers)
}

export async function requestColumnCategoryRemove(id: number, headers?: Headers): Promise<ResponseData<null>> {
  return await HttpClient.post<number, null>("/column-category/remove" + "/" + id, id, headers)
}

export async function requestColumnCategoryTreeData(headers?: Headers): Promise<ResponseData<ArticleColumnCategoryTree[]>> {
  return await HttpClient.get<null, ArticleColumnCategoryTree[]>("/column-category/tree", null, headers)
}