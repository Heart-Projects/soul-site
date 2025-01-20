import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import OverviewIndex from "./overview-index";
import TaskIndex from "./task-index";
import MessageIndex from "./message-index";
const Dashboard = () => {
  return (
    <div className=" p-1 h-full w-full">
      <Tabs defaultValue="overview" className="w-full h-full">
        <TabsList>
          <TabsTrigger value="overview">概览</TabsTrigger>
          <TabsTrigger value="task-center">任务</TabsTrigger>
          <TabsTrigger value="message-center">消息中心</TabsTrigger>
        </TabsList>
        <TabsContent className="w-full" value="overview">
          <OverviewIndex />
        </TabsContent>
        <TabsContent className="w-full" value="task-center">
          <TaskIndex />
        </TabsContent>
        <TabsContent value="message-center">
          <MessageIndex />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Dashboard;
