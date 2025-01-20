import { forwardRef } from "react";
const DefaultContent = forwardRef((props, ref) => {
  return <div>default</div>;
});

DefaultContent.displayName = "DefaultContent";

export default DefaultContent;
