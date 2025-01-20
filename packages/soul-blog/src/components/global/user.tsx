// "use client";
import { requestUserInfo } from "@/api/user";
import { useAppDispatch } from "@/store/hooks";
import { setUserInfo } from "@/store/features/user";
import { useLoginOut } from "@/lib/hooks/user";
export const CheckUserInfo = () => {
  const dispatch = useAppDispatch();
  const doLoginOut = useLoginOut();
  requestUserInfo().then((res) => {
    const { success, data, code } = res;
    if (success) {
      dispatch(setUserInfo(data));
    } else {
      if (code === 401) {
        doLoginOut();
      }
    }
  });
  return <></>;
};
