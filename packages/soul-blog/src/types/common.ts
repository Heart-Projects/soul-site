
export type ResponseData<T> = {
   code: number
   success: boolean
   message: string
   data: T
}

// 后端公共的数据属性
export type BaseResponseProperty = {
   id: number
   createAt: string
   updateAt: string
}

export type ResponsePageData<T> = {
   total: number
   pageSize: number
   pageIndex: number
   list: T[]
}

export type Headers = {
  [key: string]: string;
};

// 通用的数据库类型
export type BaseDbModel = {
   id?: number,
   createdAt?: string,
   updatedAt?: string
}