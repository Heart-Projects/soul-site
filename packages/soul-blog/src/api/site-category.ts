import { ResponseData, BaseResponseProperty } from "@/types/common";
import HttpClient from "../lib/http-client";
interface SiteCategory extends BaseResponseProperty{
  parentId: number,
  name: string
  navName : string
  note: string,
  order: number,
  isShow: number
}
/**
 * 获取站点分类
 * @returns 
 */
export async function requestSiteCategory(): Promise<ResponseData<SiteCategory[]>> {
  const response = await HttpClient.get<null,SiteCategory[]>("/site-category/list")  
  return response
}

/**
 * 获取首页分类
 * @returns 
 */
export async function requestHomeSiteCategory(): Promise<ResponseData<SiteCategory[]>> {
  const response = await HttpClient.get<null,SiteCategory[]>("/open-api/site-category/list")  
  return response
}

export type { SiteCategory }