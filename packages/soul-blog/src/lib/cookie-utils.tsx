"use server";
import { cookies } from "next/headers";
import { TOKEN_KEY } from "@/lib/localstore";
import { requestUserInfo } from "@/api/user";
import { UserLoginInfo } from "@/types/user";
const getToken = async () => {
  const cookieList = await cookies();
  return cookieList.get(TOKEN_KEY)?.value || "";
};

const getAuthHeader = async () => {
  const token = await getToken();
  return {
    Authorization: token,
  };
};
const defaultInfo: UserLoginInfo = {
  hasLogin: false,
  info: {
    username: "",
    userId: 0,
    menus: [],
    roles: [],
    exp: 0,
  },
};

const validSession = async () => {
  const token = cookies().get(TOKEN_KEY)?.value;
  if (!token) {
    return defaultInfo;
  }
  try {
    const res = await requestUserInfo();
    const { success } = res;
    if (!success) {
      return defaultInfo;
    }
    return res.data;
  } catch (error) {
    return defaultInfo;
  }
};

export { getToken, getAuthHeader, validSession };
