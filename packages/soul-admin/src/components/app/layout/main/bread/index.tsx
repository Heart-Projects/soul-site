import { Link } from "react-router-dom";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { useMatches } from "react-router-dom";
import { Fragment } from "react/jsx-runtime";

const BreadNav = ({ className }: { className?: string }) => {
  const matches = useMatches();
  const effectMenuRouters = matches.filter((item) => {
    const { handle } = item;
    const { isMenu = false } = handle?.meta || {};
    return isMenu;
  });
  if (effectMenuRouters.length === 0) return null;
  const renderedItems = effectMenuRouters.map((item, index) => {
    const { handle } = item;
    const { title = "" } = handle?.meta || {};
    const breadItem = (
      <BreadcrumbItem key={"bi_" + index}>
        <BreadcrumbLink>
          <Link to={item.pathname}>{title ?? item.pathname}</Link>
        </BreadcrumbLink>
      </BreadcrumbItem>
    );
    if (index === effectMenuRouters.length - 1) {
      return breadItem;
    } else {
      return (
        <Fragment key={"f_" + index}>
          {breadItem}
          <BreadcrumbSeparator />
        </Fragment>
      );
    }
  });
  return (
    <Breadcrumb className={className}>
      <BreadcrumbList>{renderedItems}</BreadcrumbList>
    </Breadcrumb>
  );
};

export default BreadNav;
