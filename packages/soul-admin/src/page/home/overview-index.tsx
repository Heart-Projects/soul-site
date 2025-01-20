import { UserRoundPlus } from "lucide-react";
import StatCard from "@/components/view/home/stat-card";
const OverviewIndex = () => {
  return (
    <div className=" flex justify-between px-2">
      <StatCard
        title="登录人数"
        count="+100"
        desc="新增人数"
        icon={<UserRoundPlus />}
      />
      <StatCard
        title="登录人数"
        count="+100"
        desc="新增人数"
        icon={<UserRoundPlus />}
      />
      <StatCard
        title="登录人数"
        count="+100"
        desc="新增人数"
        icon={<UserRoundPlus />}
      />
      <StatCard
        title="登录人数"
        count="+100"
        desc="新增人数"
        icon={<UserRoundPlus />}
      />
    </div>
  );
};

export default OverviewIndex;
