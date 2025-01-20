"use server";
import { cookies } from "next/headers";
import { TOKEN_KEY } from "@/lib/localstore";

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

export { getToken, getAuthHeader };
