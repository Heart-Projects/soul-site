import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { cn } from "@/lib/utils";

import * as React from "react";
import { Button } from "@/components/plate-ui/button";
import UserInfo from "./user-info";
import { SiteSearch } from "./head-search";
const components: { title: string; href: string; description: string }[] = [
  {
    title: "过去",
    href: "/past-future",
    description: "过去已逝，记录点点滴滴！未来将来，提起笔许个愿望！",
  },
  {
    title: "未来",
    href: "/past-future",
    description: "过去已逝，记录点点滴滴！未来将来，提起笔许个愿望！",
  },
  {
    title: "照片墙",
    href: "/photo",
    description: "一组照片，留住时光，待将来留下许多念想.",
  },
  {
    title: "留言板",
    href: "/photo",
    description: "送给自己的tips.",
  },
];

export default function TopHeader({ userIdentity }: { userIdentity?: string }) {
  const urlPrefix = userIdentity ? userIdentity : "/user";
  return (
    <>
      <div className="sticky top-0 left-0 bg-background z-10">
        <div className="flex items-center justify-between pt-2 pb-2 ">
          <div className="flex">
            <div className="text-3xl font-bold pl-4 pr-4">
              <Link href="/" legacyBehavior passHref>
                <span className=" cursor-pointer">Soul</span>
              </Link>
            </div>
            <div>
              <NavigationMenu>
                <NavigationMenuList>
                  <NavigationMenuItem>
                    <Link href="/" legacyBehavior passHref>
                      <NavigationMenuLink
                        className={navigationMenuTriggerStyle()}
                      >
                        首页
                      </NavigationMenuLink>
                    </Link>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <Link href="/column" legacyBehavior passHref>
                      <NavigationMenuLink
                        className={navigationMenuTriggerStyle()}
                      >
                        专栏
                      </NavigationMenuLink>
                    </Link>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <Link href="/opensource" legacyBehavior passHref>
                      <NavigationMenuLink
                        className={navigationMenuTriggerStyle()}
                      >
                        开源项目
                      </NavigationMenuLink>
                    </Link>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <NavigationMenuTrigger>个人空间</NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                        {components.map((component) => (
                          <ListItem
                            key={component.title}
                            title={component.title}
                            href={component.href}
                          >
                            {component.description}
                          </ListItem>
                        ))}
                      </ul>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
            </div>
          </div>
          <div className="flex pr-4 items-center">
            <SiteSearch className=" w-44 leading-7 px-1 " />

            <Button className="ml-2" asChild>
              <Link href={urlPrefix + "/article/create"} target="_blank">
                写文章
              </Link>
            </Button>
            <UserInfo />
          </div>
        </div>
        <div className=" h-1 bg-second-background"></div>
      </div>
    </>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
