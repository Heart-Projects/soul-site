import { ResponseData, BaseResponseProperty } from "@/types/common";
import HttpClient from "../lib/http-client";
interface UserArticleCategory extends BaseResponseProperty{
  parentId: number,
  name: string
  note: string,
  order: number,
  isShow: number
}
/**
 * 获取用户自定义分类
 * @returns 
 */
export async function requestUserArticleCategory(): Promise<ResponseData<UserArticleCategory[]>> {
  return await HttpClient.get<null,UserArticleCategory[]>("/article-category/list")  
}

export type { UserArticleCategory }