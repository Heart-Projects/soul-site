import { Button } from "@/components/ui/button";
import UserInfo from "../../header/user-info";

export default function ArticleCreateHeader({
  children,
  onPublish,
  onDraft,
}: {
  children?: React.ReactNode;
  onPublish?: () => void;
  onDraft?: () => void;
}) {
  return (
    <div className=" flex-grow-0 h-13 flex items-center justify-between py-3 border-b ">
      <div className="ml-4 flex-grow-0 w-40">
        <span className="text-3xl text-gray-800 ">Soul Blog</span>
      </div>
      <div className="ml-4 flex-grow">{children}</div>
      <div className="mr-4 flex-grow-0 w-70">
        <Button onClick={onDraft}>草稿箱</Button>
        <Button className="ml-2" variant="outline" onClick={onPublish}>
          发布文章
        </Button>
        <UserInfo />
      </div>
    </div>
  );
}
