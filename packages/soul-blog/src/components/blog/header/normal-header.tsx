import UserInfo from "@/components/blog/header/user-info";
import { Input } from "@/components/ui/input";
import { SiteSearch } from "./head-search";
export default function NormalHeader() {
  return (
    <div className=" flex-grow-0 h-13 flex items-center justify-between py-3 border-b ">
      <div className="ml-4 flex-grow-0 w-40">
        <span className="text-3xl text-gray-800 ">Soul Blog</span>
      </div>
      <div className="ml-4 flex-grow">
        <SiteSearch />
        {/* <Input className="ml-2 mr-2" /> */}
      </div>
      <div className="mr-4 flex-grow-0 w-70">
        <UserInfo />
      </div>
    </div>
  );
}
