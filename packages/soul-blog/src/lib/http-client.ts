import { ResponseData, Headers } from "@/types/common";
import { getToken } from "@/lib/localstore";
import { LoginOut } from "@/lib/auth";
interface IHttpClient {
  post<P, R>(url: string, data?: P, headers?: Headers): Promise<ResponseData<R>>;
  get<P, R>(url: string, data?: P, headers?: Headers): Promise<ResponseData<R>>;
  request<P, R>(url: string, method: string, data?: P, headers?: Headers): Promise<ResponseData<R>>;
}




const defaultHeaders: Headers = {
  "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
};

type RequestInterceptor = (request: Request) => Request;

class FetchHttpClient implements IHttpClient {
  readonly baseApiUrl: string;

  httpHeaders: Headers = defaultHeaders;

  constructor(
    public baseUrl: string,
    public headers?: Headers,
    public interceptors: RequestInterceptor[] = []
  ) {
    this.baseApiUrl = baseUrl;
    if (headers) {
    this.httpHeaders = headers;
    }
  }

  async post<P, R>(url: string, data?: P, headers?: Headers): Promise<ResponseData<R>> {
    return this.request(url, "POST", data, headers);
  }

  async get<P, R>(url: string, data?: P, headers?: Headers): Promise<ResponseData<R>> {
    return this.request(url, "GET", data, headers);
  }

  async request<P, R>(
    url: string,
    method: string,
    data?: P,
    headers?: Headers
  ): Promise<ResponseData<R>> {
    let requestUrl = this.baseApiUrl + url;
    const requestMethod = method.toUpperCase();
    if (requestMethod === "GET" && data) {
      requestUrl += "?" + this.transformRequestData(data);
    }
    const token = getToken();
    const authHeader = token ? { Authorization: token } : null;
    let res: Response = null;
    let responseData: Promise<ResponseData<R>> = null;
    try {
      res = await fetch(requestUrl, {
        method,
        // 注意这里添加头需要后端运行添加
        headers: { ...this.httpHeaders, ...authHeader, ...headers },
        body:
          requestMethod === "POST" || requestMethod === "PUT"
            ? this.transformRequestData(data)
            : null,
      });
      const { ok, status } = res;
      const contentType = res.headers.get("content-type");
      console.log('执行完', ok, status, contentType)
      if (ok || status === 200) {
        responseData =  await res.json();
      } else {
        if (status === 401) {
          LoginOut();
        }
        responseData = new Promise<ResponseData<R>>((resolve) => {
          resolve({ code: res.status, success: false, message: `请求出错${res.url}`, data: null });
        });
      }
    } catch (error) {
      let errMsg = "";
      if (error instanceof TypeError) {
        const err = error as TypeError;
        errMsg = err.message;
      } else if (error instanceof DOMException ) {
        const err = error as DOMException;
        errMsg = err.message;
      }
      console.log(error)
      responseData = new Promise<ResponseData<R>>((resolve) => {
        resolve({ code: 500, success: false, message: errMsg || "请求服务端出错", data: null });
      });
    }
    return responseData;
  }

  private transformRequestData(data: any): string {
    let newData = "";
    if (!data) {
      return newData;
    }
    for (const k in data) {
      if (data.hasOwnProperty(k) === true) {
        newData += `${encodeURIComponent(k)}=${encodeURIComponent(data[k])}&`;
      }
    }
    return newData;
  }
}
const baseUrl = process.env.NEXT_PUBLIC_API_URL || ""
console.log('baseUrl=' + baseUrl)
const httpClient: IHttpClient = new FetchHttpClient(
  baseUrl
)

export default httpClient