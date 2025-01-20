import Tag from "@/components/common/blog/tag";
import { forwardRef, KeyboardEventHandler } from "react";
import { useState } from "react";

// 自定符合表单规范的组件时，如下（通过经验）
/**
 * 1. 使用 forwardRef 包裹，貌似上次控制器解构时将 ref 传入，否则会报错
 * 2. 提供一个名称为value的props作为组件的初始值
 * 3. 提供 onValueChange 函数作为值变化的回调
 */

type LabelInputProps = {
  value?: string[];
  readonly?: boolean;
  placeholder?: string;
  onValueChange?: (labels: string[]) => void;
};

const LabelInput = forwardRef<HTMLElement, LabelInputProps>(
  (
    {
      value = [],
      readonly = false,
      placeholder = "输入文本后按回车即可添加标签",
      onValueChange,
    }: LabelInputProps,
    ref
  ) => {
    const [labels, setLabels] = useState<string[]>(value);
    const onKeyDown: KeyboardEventHandler<HTMLInputElement> = (event) => {
      if (event.key === "Enter") {
        event.preventDefault();

        const input = event.currentTarget;
        const label = input.value.trim();
        if (label) {
          input.value = "";
          const newLabels = [...labels, label];
          setLabels(newLabels);
          onValueChange?.(newLabels);
        }
      }
    };
    const removeLabel = (label: string) => {
      const resetLabels = labels.filter((item) => item !== label);
      setLabels(resetLabels);
      onValueChange?.([...resetLabels]);
    };
    const labelsElement = labels.map((label, index) => (
      <Tag key={index} readonly={readonly} onRemove={() => removeLabel(label)}>
        {label}
      </Tag>
    ));
    return (
      <>
        <div className="flex h-11 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 items-center">
          <div className="flex-grow-0 flex gap-1">{labelsElement}</div>
          <input
            ref={ref}
            placeholder={labels.length ? undefined : placeholder}
            className="flex-1 h-9 w-full border-none focus:border-none outline-none"
            onKeyDown={onKeyDown}
          />
        </div>
      </>
    );
  }
);
LabelInput.displayName = "LabelInput";
export default LabelInput;
