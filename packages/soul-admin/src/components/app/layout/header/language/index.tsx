import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import i18n from "@/i18n";
const LanguageSwitch = ({ className }: { className?: string }) => {
  const onLanguageChange = (value: string) => {
    i18n.changeLanguage(value);
  };
  return (
    <div className={cn(" inline-block", className)}>
      <Select defaultValue="zh" onValueChange={onLanguageChange}>
        <SelectTrigger className="w-[100px]">
          <SelectValue placeholder="语言" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="zh">中文</SelectItem>
          <SelectItem value="en">English</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};
export default LanguageSwitch;
