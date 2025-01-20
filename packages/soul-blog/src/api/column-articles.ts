import { ResponseData, Headers, BaseDbModel } from "@/types/common";
import HttpClient from "@/lib/http-client";

type ColumnArticles = BaseDbModel & {
  parentId: number,
  columnId?: number,
  columnIdentify?: string
  type: string,
  treePath?: string
  identify?: string
  title: string
  order?: number
}

export type ColumnArticleContent = {
  content: any
} & ColumnArticles
export enum ColumnArticleTypeEnum {
  DOC = "doc",
  FOLDER = "folder",
  EXCEL = "excel"
}

export type ColumnArticlesAddParams = Pick<ColumnArticles, "parentId" | "columnId" | "type" | "title">
export type ColumnArticleRenameParams = Pick<ColumnArticles, "id" | "title">
export type ColumnArticleSaveContent = {
  id: number,
  content: string
}

export type ColumnArticleModifyOrderParams = {
  sourceItemId: number,
  targetItemId: number
}
export type ColumnArticleModifyParentParams = Pick<ColumnArticles, "id" | "parentId">

type GetArticleContent = {
    identify: string
    columnIdentify: string
}
export async function requestColumnArticlesAdd(params: ColumnArticlesAddParams, headers?: Headers): Promise<ResponseData<ColumnArticles>> {
  return await HttpClient.post<ColumnArticlesAddParams, ColumnArticles>("/column-articles/add", params, headers)
}

export async function requestColumnArticlesRename(params: ColumnArticleRenameParams, headers?: Headers): Promise<ResponseData<null>> {
  return await HttpClient.post<ColumnArticleRenameParams,null>("/column-articles/rename", params, headers)
}

export async function requestColumnArticlesRemove(id: number, headers?: Headers): Promise<ResponseData<null>> {
  return await HttpClient.post<number, null>("/column-articles/remove/" + id, id, headers)
}

export async function requestColumnArticlesModifyOrder(params: ColumnArticleModifyOrderParams, headers?: Headers): Promise<ResponseData<any>> {
  return await HttpClient.post<ColumnArticleModifyOrderParams, any>("/column-articles/modify-order", params, headers)
}

export async function requestColumnArticlesSaveContent(params: ColumnArticleSaveContent,headers?: Headers): Promise<ResponseData<any>> {
  return await HttpClient.post<ColumnArticleSaveContent, any>("/column-articles/save-content" , params, headers)
}

export async function requestColumnArticlesContent(params: GetArticleContent,headers?: Headers): Promise<ResponseData<ColumnArticleContent>> {
  return await HttpClient.get<GetArticleContent, ColumnArticleContent>("/column-articles/content" , params, headers)
}

export async function requestColumnArticlesModifyParent(params: ColumnArticleModifyParentParams, headers?: Headers): Promise<ResponseData<any>> {
  return await HttpClient.post<ColumnArticleModifyParentParams, any>("/column-articles/modify-parent", params, headers)
}

export type ColumnArticleTree = {
  children?: ColumnArticles[],
} & ColumnArticles

export async function requestColumnArticlesTreeData(columnIdentify: string, headers?: Headers): Promise<ResponseData<ColumnArticleTree[]>> {
  return await HttpClient.get<string, ColumnArticleTree[]>("/column-articles/tree/" + columnIdentify, "", headers)
}