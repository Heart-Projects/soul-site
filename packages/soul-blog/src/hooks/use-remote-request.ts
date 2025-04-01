import type { ResponseData,Headers } from '@/types/common';
import { useState } from "react"
import { useToast } from "./use-toast"

type RemoteRequestFunction = (params: any, headers?: Headers) => Promise<ResponseData<any>>
type SuccessCallback = (data: Awaited<ReturnType<RemoteRequestFunction>>["data"] ) => void
type ErrorCallback = (data: Awaited<ReturnType<RemoteRequestFunction>> ) => void
type Options = {
  // 禁用错误时默认的toast
  disableErrorToast?: boolean
  successCallback?: SuccessCallback
  errorCallback?: ErrorCallback
}
// 默认的配置
const defaultOptions: Options = {
  disableErrorToast: false,
  
}

export const useRemoteRequest = (request: RemoteRequestFunction, options?: Options) => {
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const mergedOptions = {...defaultOptions, ...options}
  const { successCallback, errorCallback } = mergedOptions
  const doRemoteRequest = async function ({ ...params  }:{ [key: string]: any } = {}) {
    setLoading(true)
    const res = await request(params)
    setLoading(false)
    const {success, message, data} = res
    if (!success && !mergedOptions.disableErrorToast) {
      toast({
        variant: "destructive",
        title: '请求失败',
        description: message
      })
      if (errorCallback) {
        errorCallback(res)
      }
    } else {
      // toast({
      //   title: '请求成功',
      // })
      if (successCallback) {
        successCallback(data)
      }
    }
    return res
  }
  return {
    doRemoteRequest: doRemoteRequest,
    loading: loading
  }
}
