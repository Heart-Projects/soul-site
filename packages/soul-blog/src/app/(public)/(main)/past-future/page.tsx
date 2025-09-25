import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { SmilePlus } from "lucide-react";

export default function PastFuturePageIndex() {
  return (
    <section className="min-h-screen flex items-center justify-center">
      <Alert className="max-w-2xl">
        <SmilePlus className="h-4 w-4" />
        <AlertTitle>过去和未来</AlertTitle>
        <AlertDescription>功能还在开发中，敬请期待</AlertDescription>
      </Alert>
    </section>
  );
}
