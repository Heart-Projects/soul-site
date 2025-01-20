import { Outlet } from "react-router-dom";
import { ConfigProvider, theme, ColorPicker } from "antd";
import { useSelector } from "react-redux";
import type { RootState } from "./store";
import { useMemo } from "react";

function App() {
  const themeConfig = useSelector((state: RootState) => state.app.theme);
  const antTheme = useMemo(() => {
    if (themeConfig.primaryColor === "dark") {
      return theme.darkAlgorithm;
    } else if (themeConfig.primaryColor === "light") {
      return theme.defaultAlgorithm;
    }
  }, [themeConfig]);
  return (
    <>
      <ConfigProvider
        theme={{
          algorithm: antTheme,
        }}
      >
        <div className="p-1 h-full w-full overflow-scroll bg-background rounded-lg">
          <Outlet />
        </div>
      </ConfigProvider>
    </>
  );
}

export default App;
