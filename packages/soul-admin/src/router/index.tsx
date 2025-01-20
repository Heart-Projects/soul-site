import { createBrowserRouter } from "react-router-dom";
import CommonRouters from "./common";
import PermissionRouters from "./permission";
const router = createBrowserRouter([...PermissionRouters, ...CommonRouters]);

export default router;
