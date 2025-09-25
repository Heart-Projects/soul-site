"use client";
import React, { useEffect, useRef } from "react";
import { PageFlip } from "page-flip";
import { Button } from "@/components/ui/button";
import "./style.scss";

const pages = [
  "第一页：这是一本酷炫的电子书。",
  "第二页：翻页效果令人惊艳！",
  "第三页：继续翻阅，发现更多内容。",
  "第四页：接近结尾了哦！",
  "第五页：恭喜你，阅读完成！",
];

const CoolBookFlip = () => {
  const bookRef = useRef(null);
  const flipBook = useRef(null);

  useEffect(() => {
    if (bookRef.current) {
      flipBook.current = new PageFlip(bookRef.current, {
        width: 550, // base page width
        height: 800, // base page height

        size: "stretch",
        // set threshold values:
        minWidth: 315,
        maxWidth: 1000,
        minHeight: 520,
        maxHeight: 1350,

        maxShadowOpacity: 0.5, // Half shadow intensity
        showCover: true,
        mobileScrollSupport: false,
      });
      flipBook.current.loadFromHTML(document.querySelectorAll(".page"));
    }
    return () => {
      if (flipBook.current) {
        // flipBook.current.destroy();
        // flipBook.current = null;
      }
    };
  }, []);

  return (
    <div className="h-screen bg-gray-100">
      <div className="container">
        <div ref={bookRef} className="flip-book" id="demoBookExample">
          <div className="page page-cover page-cover-top" data-density="hard">
            <div className="page-content">
              <h2>BOOK TITLE</h2>
            </div>
          </div>
          <div className="page">
            <div className="page-content">
              <h2 className="page-header">Page header 1</h2>
              <div className="page-image"></div>
              <div className="page-text">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. In
                cursus mollis nibh, non convallis ex convallis eu. Suspendisse
                potenti. Aenean vitae pellentesque erat. Integer non tristique
                quam. Suspendisse rutrum, augue ac sollicitudin mollis, eros
                velit viverra metus, a venenatis tellus tellus id magna. Aliquam
                ac nulla rhoncus, accumsan eros sed, viverra enim. Pellentesque
                non justo vel nibh sollicitudin pharetra suscipit ut ipsum.
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. In
                cursus mollis nibh, non convallis ex convallis eu. Suspendisse
                potenti. Aenean vitae pellentesque erat. Integer non tristique
                quam. Suspendisse rutrum, augue ac sollicitudin mollis, eros
                velit viverra metus, a venenatis tellus tellus id magna.
              </div>
              <div className="page-footer">2</div>
            </div>
          </div>
          <div className="page">
            <div className="page-content">
              <h2 className="page-header">Page header - 15</h2>
              <div className="page-image"></div>
              <div className="page-text">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. In
                cursus mollis nibh, non convallis ex convallis eu. Suspendisse
                potenti. Aenean vitae pellentesque erat. Integer non tristique
                quam. Suspendisse rutrum, augue ac sollicitudin mollis, eros
                velit viverra metus, a venenatis tellus tellus id magna. Aliquam
                ac nulla rhoncus, accumsan eros sed, viverra enim. Pellentesque
                non justo vel nibh sollicitudin pharetra suscipit ut ipsum.
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. In
                cursus mollis nibh, non convallis ex convallis eu. Suspendisse
                potenti. Aenean vitae pellentesque erat. Integer non tristique
                quam. Suspendisse rutrum, augue ac sollicitudin mollis, eros
                velit viverra metus, a venenatis tellus tellus id magna.
              </div>
              <div className="page-footer">16</div>
            </div>
          </div>
          <div className="page">
            <div className="page-content">
              <h2 className="page-header">Page header - 16</h2>
              <div className="page-image"></div>
              <div className="page-text">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. In
                cursus mollis nibh, non convallis ex convallis eu. Suspendisse
                potenti. Aenean vitae pellentesque erat. Integer non tristique
                quam. Suspendisse rutrum, augue ac sollicitudin mollis, eros
                velit viverra metus, a venenatis tellus tellus id magna. Aliquam
                ac nulla rhoncus, accumsan eros sed, viverra enim. Pellentesque
                non justo vel nibh sollicitudin pharetra suscipit ut ipsum.
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. In
                cursus mollis nibh, non convallis ex convallis eu. Suspendisse
                potenti. Aenean vitae pellentesque erat. Integer non tristique
                quam. Suspendisse rutrum, augue ac sollicitudin mollis, eros
                velit viverra metus, a venenatis tellus tellus id magna.
              </div>
              <div className="page-footer">17</div>
            </div>
          </div>
          <div
            className="page page-cover page-cover-bottom"
            data-density="hard"
          >
            <div className="page-content">
              <h2>THE END</h2>
            </div>
          </div>
        </div>
      </div>
      <div className="flex space-x-4 mt-6">
        <Button onClick={() => flipBook.current?.flipPrev()}>上一页</Button>
        <Button onClick={() => flipBook.current?.flipNext()}>下一页</Button>
      </div>
    </div>
  );
};

export default CoolBookFlip;
