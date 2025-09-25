"use client";
import React from "react";
import HTMLFlipBook from "react-pageflip";
import "./style.scss";
import { Button } from "@/components/ui/button";
const PageCover = React.forwardRef((props, ref) => {
  return (
    <div className="page page-cover" ref={ref} data-density="hard">
      <div className="page-content">
        <h2>{props.children}</h2>
      </div>
    </div>
  );
});

const Page = React.forwardRef((props, ref) => {
  return (
    <div className="page" ref={ref}>
      <div className="page-content">
        <h2 className="page-header">Page header - {props.number}</h2>
        <div className="page-image"></div>
        <div className="page-text">{props.children}</div>
        <div className="page-footer">{props.number + 1}</div>
      </div>
    </div>
  );
});
const DemoBook = function () {
  const [page, setPage] = React.useState(0);
  const [totalPage, setTotalPage] = React.useState(0);
  const flipBook = React.useRef(null);
  const nextButtonClick = () => {
    flipBook.current.pageFlip().flipNext();
  };

  const prevButtonClick = () => {
    const a = flipBook.current;
    flipBook.current.pageFlip().flipPrev();
  };

  const onPage = (e) => {
    setPage(e.data);
  };

  React.useEffect(() => {
    setTotalPage(4);
  }, []);

  return (
    <div className="container">
      <HTMLFlipBook
        width={550}
        height={733}
        size="stretch"
        minWidth={315}
        maxWidth={1000}
        minHeight={400}
        maxHeight={1533}
        maxShadowOpacity={0.5}
        showCover={true}
        mobileScrollSupport={true}
        onFlip={onPage}
        className="demo-book"
        ref={flipBook}
      >
        <PageCover>BOOK TITLE</PageCover>
        <Page number={1}>Lorem ipsumsd</Page>
        <Page number={2}>Lorem ipsumsdkkdksdk</Page>
        <Page number={3}>Lorem ipsumsd</Page>
        <Page number={4}>Lorem ipsumsdkkdksdk</Page>
        <Page number={5}>Lorem ipsumsd</Page>
        <Page number={6}>Lorem ipsumsdkkdksdk</Page>
        <PageCover>THE END</PageCover>
      </HTMLFlipBook>

      <div>
        <Button onClick={prevButtonClick}>Previous page</Button>[
        <span>{page}</span> of
        <span>{totalPage}</span>]
        <Button type="button" onClick={nextButtonClick}>
          Next page
        </Button>
      </div>
      <div>
        {/* State: <i>{this.state.state}</i>, orientation:{" "}
          <i>{this.state.orientation}</i> */}
      </div>
    </div>
  );
};

export default DemoBook;
