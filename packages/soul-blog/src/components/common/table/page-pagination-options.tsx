import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function PagePaginationOptions({
  defaultValue,
  options,
  onValueChange,
}: {
  defaultValue: number;
  options: number[];
  onValueChange?: (value: number) => void;
}) {
  return (
    <div className="inline-block">
      <Select
        defaultValue={defaultValue.toString()}
        onValueChange={(value) => {
          onValueChange && onValueChange(Number.parseInt(value));
        }}
      >
        <SelectTrigger className="w-[80px]">
          <SelectValue placeholder="Theme" />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option} value={option.toString()}>
              {option}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
