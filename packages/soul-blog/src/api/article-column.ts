import { ResponseData, Headers, BaseDbModel } from "@/types/common";
import HttpClient from "@/lib/http-client";

export type ArticleColumn = BaseDbModel & {
  categoryId?: number
  themeId?: number
  userId?: number
  identify?: string
  name: string
  note?: string
  icon?: string
  summary: string
  viewScope?: number
}

export type ColumnAddParams = Omit<ArticleColumn, "id" | "createdAt" | "updatedAt">

export type ColumnUpdateParams = Omit<ArticleColumn, "createdAt" | "updatedAt">

export async function requestColumnAdd(params: ColumnAddParams, headers?: Headers): Promise<ResponseData<ArticleColumn>> {
  return await HttpClient.post<ColumnAddParams, ArticleColumn>("/column/create", params, headers)
}

export async function requestColumnRename(params: ColumnUpdateParams, headers?: Headers): Promise<ResponseData<null>> {
  return await HttpClient.post<ColumnUpdateParams, null>("/column/save", params, headers)
}

export async function requestColumnRemove(id: number, headers?: Headers): Promise<ResponseData<null>> {
  return await HttpClient.post<number, null>("/column/remove" + "/" + id, id, headers)
}

export async function requestColumnDataList(categoryId: number, headers?: Headers): Promise<ResponseData<ArticleColumn[]>> {
  return await HttpClient.get<{categoryId: number}, ArticleColumn[]>("/column/list", {categoryId}, headers)
}

export async function requestColumnWithIdentify(identify: string, headers?: Headers): Promise<ResponseData<ArticleColumn>> {
  return await HttpClient.get<string, ArticleColumn>("/column/" + identify, identify, headers)
}

export async function requestSingleColumn(id: number, headers?: Headers): Promise<ResponseData<ArticleColumn>> {
  return await HttpClient.get<number, ArticleColumn>("/detail/" + id, id, headers)
}