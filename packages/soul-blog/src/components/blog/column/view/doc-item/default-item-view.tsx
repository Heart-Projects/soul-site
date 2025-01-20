import { forwardRef } from "react";
const DefaultContentView = forwardRef((props, ref) => {
  return <div>default</div>;
});

DefaultContentView.displayName = "DefaultContentView";

export default DefaultContentView;
