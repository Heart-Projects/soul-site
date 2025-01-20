import { cn } from "@/lib/utils";
import { Menu, Tally3 } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store";
import { setMenuCollapse } from "@/store/features/appSlice";
const MenuTrigger = ({ className }: { className?: string }) => {
  const dispatch = useDispatch();
  const menuCollapse = useSelector(
    (state: RootState) => state.app.menuCollapse
  );

  const onChangeMenuCollapse = () => {
    console.log("menuCollapse", menuCollapse);
    dispatch(setMenuCollapse(!menuCollapse));
  };
  return (
    <span
      className={cn("cursor-pointer inline-block", className)}
      onClick={onChangeMenuCollapse}
    >
      {menuCollapse ? <Tally3 /> : <Menu />}
    </span>
  );
};
export default MenuTrigger;
