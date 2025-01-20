import { ResponseData, Headers, BaseDbModel } from "@/types/common";
import HttpClient from "@/lib/http-client";

type SaveArticleContentParams = {
  source: number,
  docId?: number,
  content: string
}

export type ArticleContent = BaseDbModel & SaveArticleContentParams & {
  // 文档类型
  docType?: string
}

// 文章来源
export enum ArticleSource {
  // 普通文章
  DEFAULT = 0,
  // 专栏文章
  COLUMN = 1
}

type GetArticleContentParams = Omit<SaveArticleContentParams, "content"> & {
  identify?: string
}

export async function requestSaveArticleContent(params: SaveArticleContentParams, headers?: Headers): Promise<ResponseData<any>> {
  return await HttpClient.post<SaveArticleContentParams, any>("/article-content/save", params, headers)
}

export async function requestArticleContent(params: GetArticleContentParams, headers?: Headers): Promise<ResponseData<ArticleContent>> {
  return await HttpClient.get<GetArticleContentParams, ArticleContent>("/article-content/get", params, headers)
}