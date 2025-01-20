import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { MessageCircleCode } from "lucide-react";

const EmptyColumnTip = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full">
      <Alert className=" max-w-96">
        <MessageCircleCode className="h-4 w-4" />
        <AlertTitle>Tips</AlertTitle>
        <AlertDescription className=" mt-4">
          该分类下还未创建任何栏目，努力加油吧
        </AlertDescription>
      </Alert>
    </div>
  );
};

export default EmptyColumnTip;
