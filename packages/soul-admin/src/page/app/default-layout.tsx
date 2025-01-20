import { Outlet } from "react-router-dom";
import AppHeader from "@/components/app/layout/header";
import AppSide from "@/components/app/layout/side";
import BreadNav from "@/components/app/layout/main/bread";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { cn } from "@/lib/utils";
import ThemeSwitch from "@/components/app/layout/header/theme";
const DefaultLayout = () => {
  const menuCollapse = useSelector(
    (state: RootState) => state.app.menuCollapse
  );
  const sideClassName = menuCollapse ? "w-[80px]" : "w-60";
  return (
    <div className="h-full w-full relative">
      <AppHeader className="h-16 p-1" menuCollapse={menuCollapse} />
      <div
        className="flex overflow-scroll"
        style={{ height: "calc(100% - 64px)" }}
      >
        <AppSide className={cn(sideClassName, "flex-grow-0")} />
        <div className="flex-grow  bg-secondary rounded-lg flex flex-col">
          <div className="flex-grow-0 px-4 py-2">
            <BreadNav className="border bg-background pl-4 py-2 rounded-lg" />
          </div>
          <div className="px-4 py-1 h-full w-full overflow-scroll">
            <div className="bg-background rounded-lg h-full ">
              <Outlet />
            </div>
          </div>
        </div>
      </div>
      <ThemeSwitch className="absolute top-1/2 right-[-2px]" />
    </div>
  );
};
export default DefaultLayout;
