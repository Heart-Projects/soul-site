"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "antd";
import { requestLogin, requestUserInfo } from "@/api/user";
import { useRouter } from "next/navigation";
import { setToken } from "@/lib/localstore";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { setUserInfo } from "@/store/features/user";
export default function LoginPage() {
  const r = useRouter();
  const dispatch = useAppDispatch();
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const onClickLogin = async () => {
    if (!username || !password) {
      setErrorMessage("用户名或密码不能为空");
      return;
    }
    setLoading(true);
    setErrorMessage("");
    const res = await requestLogin({
      username: username,
      password: password,
    });
    if (res.success) {
      setToken(res.data);
      const userInfo = await requestUserInfo();
      setLoading(false);
      const { success, message, data } = userInfo;
      if (success) {
        dispatch(setUserInfo(data));
        const { hasLogin, info } = data;
        if (hasLogin) {
          r.push("/");
        }
      } else {
        setErrorMessage(message);
      }
    } else {
      setLoading(false);
      setErrorMessage(res.message);
    }
  };
  return (
    <div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">登录</h1>
            {/* <p className="text-balance text-muted-foreground">
              Enter your email below to login to your account
            </p> */}
          </div>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">账号</Label>
              <Input
                value={username}
                id="email"
                autoFocus
                type="email"
                placeholder="请输入账号"
                required
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">密码</Label>
                <Link
                  href="/forgot-password"
                  className="ml-auto inline-block text-sm underline"
                >
                  忘记密码?
                </Link>
              </div>
              <Input
                id="password"
                type="password"
                required
                value={password}
                placeholder="请输入密码"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <Button type="primary" loading={loading} onClick={onClickLogin}>
              登录
            </Button>
            {/* <Button variant="outline" className="w-full">
              Login with Google
            </Button> */}
            <div className="mt-1 text-ellipsis text-sm text-red-600">
              {errorMessage}
            </div>
          </div>
          <div className="mt-2 text-center text-sm">
            还没有账号?{" "}
            <Link href="#" className="underline">
              注册
            </Link>
          </div>
        </div>
      </div>
      <div className="hidden bg-muted lg:block">
        <Image
          src="/login-bg.jpg"
          alt="Soul Blog"
          width="1920"
          height="1080"
          className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  );
}
