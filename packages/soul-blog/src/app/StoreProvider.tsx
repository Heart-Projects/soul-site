"use client";
import { Provider } from "react-redux";
import type { AppStore } from "@/store/store";
import { setupListeners } from "@reduxjs/toolkit/query";
import { useRef, useEffect } from "react";
import store from "@/store/store";
export default function StoreProvider({
  children,
}: {
  readonly children: React.ReactNode;
}) {
  const storeRef = useRef<AppStore | null>(null);
  if (!storeRef.current) {
    storeRef.current = store;
  }
  useEffect(() => {
    if (storeRef.current !== null) {
      const unsubscribe = setupListeners(storeRef.current.dispatch);
      return unsubscribe;
    }
  }, []);
  return <Provider store={storeRef.current}>{children}</Provider>;
}
