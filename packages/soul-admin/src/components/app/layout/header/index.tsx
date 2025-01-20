import UserAvatar from "./avatar";
import SiteUserInfo from "./info";
import SiteLogo from "./logo";
import SiteSearch from "./search";
import LanguageSwitch from "./language";
import MenuTrigger from "./menu-trigger";
import FullScreen from "./fullscreen";
import { cn } from "@/lib/utils";
const Header = ({
  className,
  menuCollapse = false,
}: {
  className?: string;
  menuCollapse?: boolean;
}) => {
  const logoClassName = menuCollapse
    ? "w-[80px] text-sm scale-75"
    : "w-60 text-2xl";
  return (
    <div className="flex items-center">
      <SiteLogo
        className={cn(logoClassName, "flex-grow-0")}
        menuCollapse={menuCollapse}
      />
      <MenuTrigger />
      <div className="flex-1 flex justify-between">
        <div className="mx-4">
          <SiteSearch />
        </div>
        <div className=" flex pr-6 align-middle">
          <LanguageSwitch />
          <FullScreen className="ml-2 pt-2" />
          <SiteUserInfo className="ml-4">
            <UserAvatar />
          </SiteUserInfo>
        </div>
      </div>
    </div>
  );
};
export default Header;
