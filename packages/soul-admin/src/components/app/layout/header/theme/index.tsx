import { cn } from "@/lib/utils";
import { SunMoon } from "lucide-react";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useSelector, useDispatch } from "react-redux";
import { setTheme } from "@/store/features/appSlice";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { RootState } from "@/store";

const ThemeSwitchTrigger = ({
  className,
  onClick,
}: {
  className?: string;
  onClick?: () => void;
}) => {
  return (
    <div
      className={cn(
        "inline-block bg-background cursor-pointer shadow-lg rounded-sm text-foreground",
        className
      )}
      onClick={onClick}
    >
      <SunMoon />
    </div>
  );
};
const themes = [
  {
    name: "light",
    value: "light",
  },
  {
    name: "dark",
    value: "dark",
  },
  {
    name: "system",
    value: "system",
  },
];
const ThemeSetting = () => {
  const themeConfig = useSelector((state: RootState) => state.app.theme);
  const dispatch = useDispatch();
  const onChangeTheme = (value: string) => {
    dispatch(setTheme({ primaryColor: value }));
    if (value === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };
  return (
    <div>
      <div>
        <h3 className=" py-4">主色调</h3>
        <RadioGroup
          defaultValue={themeConfig.primaryColor}
          className=" flex"
          onValueChange={onChangeTheme}
        >
          {themes.map((theme, index) => (
            <div className="inline-flex items-center space-x-2">
              <RadioGroupItem value={theme.value} id={`r${index + 1}`} />
              <Label htmlFor={`r${index + 1}`}>{theme.name}</Label>
            </div>
          ))}
        </RadioGroup>
      </div>
    </div>
  );
};

const ThemeSwitch = ({ className }: { className?: string }) => {
  return (
    <Sheet>
      <SheetTrigger>
        <ThemeSwitchTrigger className={className} />
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>主题设置</SheetTitle>
        </SheetHeader>
        <ThemeSetting />
      </SheetContent>
    </Sheet>
  );
};

export default ThemeSwitch;
