import { Loader2 } from "lucide-react";
import { Button, ButtonProps } from "@/components/ui/button";
export interface SoulButtonProps extends ButtonProps {
  loading?: boolean;
}
const SoulButton = (props: SoulButtonProps) => {
  const { loading, ...rest } = props;
  return (
    <Button disabled={loading || props.disabled} {...rest}>
      {props.loading && <Loader2 className="animate-spin" />}
      {props.children}
    </Button>
  );
};

export { SoulButton };
