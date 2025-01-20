"use client";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/store/hooks";
import { clearUseInfo } from "@/store/features/user";
import { clearSaveCookie } from "./../localstore";
export const useLoginOut = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  return function () {
    clearSaveCookie();
    dispatch(clearUseInfo());
    router.push("/login");
  };
};