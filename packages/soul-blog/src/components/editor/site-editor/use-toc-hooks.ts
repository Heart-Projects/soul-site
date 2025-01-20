import { useCallback, useLayoutEffect, useRef } from "react";
import { useTocElementState } from "@udecode/plate-heading/react";
import type { HeadItem } from "./editor-side-components";
type VisibleTocItem = {
  id: string;
  index: number;
};
export function useTocNavigationState() {
  const { headingList } = useTocElementState();
  const availableActiveToCItem = useRef<VisibleTocItem[]>([]);
  const activeToCItem = useRef<VisibleTocItem>({ id: "root", index: -1 });
  const headList = headingList as HeadItem[];
  let ticking = false;
  // 增加一个索引编号后续用于导航
  headList.forEach((item, index) => {
    item.index = index;
  });
  const onChangeNavigation = useCallback(() => {
    const oldActiveToCItem = activeToCItem.current;
    if (headList.length === 0) {
      return;
    }
    if (availableActiveToCItem.current.length === 0) {
      activeToCItem.current = headList[0];
    } else {
      // find index smaller
      availableActiveToCItem.current.sort((a, b) => a.index - b.index);
      const firstActiveItem = availableActiveToCItem.current[0];
      const { index } = firstActiveItem;
      if (index === 0) {
        activeToCItem.current = firstActiveItem;
      } else {
        activeToCItem.current = headList[index - 1];
      }
    }
    if (oldActiveToCItem.id !== activeToCItem.current.id) {
      document
        .querySelector(`.doc-toc [data-block-id='${oldActiveToCItem.id}']`)
        ?.classList.remove("text-green-500");
      document
        .querySelector(`.doc-toc [data-block-id='${activeToCItem.current.id}']`)
        ?.classList.add("text-green-500");

      document
        .querySelector(`.simple-toc [data-block-id='${oldActiveToCItem.id}']`)
        ?.classList.remove("bg-green-500");
      document
        .querySelector(
          `.simple-toc [data-block-id='${activeToCItem.current.id}']`
        )
        ?.classList.add("bg-green-500");
    }
  }, [headList]);
  useLayoutEffect(() => {
    console.log("useLayoutEffect");
    onChangeNavigation();
    const contentObserve = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const visibleItemId =
              entry.target.getAttribute("data-block-id") || "";
            if (visibleItemId === "") {
              return;
            }
            const visibleItemIndex = headList.find(
              (item) => item.id === visibleItemId
            )?.index;
            // 说明非标题元素
            if (visibleItemId === "" || visibleItemIndex === undefined) {
              return;
            }

            if (entry.intersectionRatio > 0.6) {
              if (
                availableActiveToCItem.current.findIndex(
                  (item) => item.id === visibleItemId
                ) === -1
              ) {
                availableActiveToCItem.current.push({
                  id: visibleItemId,
                  index: Number(visibleItemIndex),
                });
                onChangeNavigation();
              }
            } else if (entry.intersectionRatio < 0.5) {
              if (
                availableActiveToCItem.current.findIndex(
                  (item) => item.id === visibleItemId
                ) === -1
              ) {
                return;
              }
              availableActiveToCItem.current =
                availableActiveToCItem.current.filter(
                  (item) => item.id !== visibleItemId
                );
              onChangeNavigation();
            }
          }
        });
      },
      {
        rootMargin: "-300px 0px 0px 0px",
        threshold: [0, 0.2, 0.4, 0.6, 0.8, 1.0],
      }
    );
    window.addEventListener("scroll", () => {
      window.requestAnimationFrame(() => {
        availableActiveToCItem.current = [];
        contentObserve.disconnect();
        document
          .querySelectorAll(
            ".slate-editor h1, .slate-editor h2, .slate-editor h3, .slate-editor h4, .slate-editor h5, .slate-editor h6"
          )
          .forEach((node) => {
            contentObserve.observe(node);
          });
      });
    });
    document
      .querySelectorAll(
        ".slate-editor h1, .slate-editor h2, .slate-editor h3, .slate-editor h4, .slate-editor h5, .slate-editor h6"
      )
      .forEach((node) => {
        contentObserve.observe(node);
      });
    return () => {
      window.removeEventListener("scroll", () => {});
      contentObserve.disconnect();
    };
  }, [headList, onChangeNavigation]);
}
