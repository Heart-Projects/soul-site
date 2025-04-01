import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { requestUserArticleSummary } from "@/api/user";
import { getAuthHeader } from "@/lib/cookie-utils";
import Image from "next/image";

const LabeInfo = ({
  label,
  value,
}: {
  label: string;
  value: string | number;
}) => {
  return (
    <div className=" flex flex-col gap-2 items-center">
      <span>{value}</span>
      <span className=" text-xs text-gray-400">{label}</span>
    </div>
  );
};
export default async function UserInfoCard() {
  const authHeader = await getAuthHeader();
  const articleSummaryData = await requestUserArticleSummary(authHeader);
  const { success, message, data } = articleSummaryData;
  const { user, articleData } = data || {};
  return (
    <Card className="w-72">
      <CardContent>
        <div className="  flex flex-col justify-center items-center pt-4">
          <div className=" w-20 h-20 rounded-full border border-gray-200 flex justify-center items-center bg-background cursor-pointer [clip-path:content-box]">
            <Image src={user.avatar} alt={user.name} width={100} height={100} />
          </div>
          <span className="mt-2">{user.name}</span>
        </div>
        <div className=" flex justify-between mt-4">
          <LabeInfo label="人气" value={articleData.hotCount} />
          <LabeInfo label="文章" value={articleData.articleCount} />
          <LabeInfo label="关注" value={articleData.followCount} />
        </div>
        <p className="h-[1px] mt-2 bg-gray-100"></p>
        <div className=" flex justify-between mt-4">
          <LabeInfo label="转载" value={articleData.forwardCount} />
          <LabeInfo label="收藏" value={articleData.favoriteCount} />
          <LabeInfo label="评论" value={articleData.commentCount} />
        </div>
        <div className="mt-4 px-2 flex justify-between">
          <Button>关注</Button>
          <Button variant={"outline"}>私信</Button>
        </div>
      </CardContent>
    </Card>
  );
}
