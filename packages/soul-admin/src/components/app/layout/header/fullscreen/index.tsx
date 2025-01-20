import { cn } from "@/lib/utils";
import { Maximize, Minimize } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
const FullScreen = ({ className }: { className?: string }) => {
  const [isFullScreen, setIsFullScreen] = useState(false);

  const onToggleFullScreen = useCallback(() => {
    if (document.fullscreenElement) {
      document.exitFullscreen();
      setIsFullScreen(false);
    } else {
      document.documentElement.requestFullscreen();
      setIsFullScreen(true);
    }
  }, []);

  useEffect(() => {
    document.addEventListener("fullscreenchange", () => {
      setIsFullScreen(document.fullscreenElement ? true : false);
    });
    return () => {
      document.removeEventListener("fullscreenchange", () => {});
    };
  }, []);

  return (
    <span
      className={cn("cursor-pointer inline-block", className)}
      onClick={onToggleFullScreen}
    >
      {isFullScreen ? <Minimize /> : <Maximize />}
    </span>
  );
};

export default FullScreen;
