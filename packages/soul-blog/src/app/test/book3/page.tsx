"use client";
import { useState, useRef, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
interface BookPage {
  id: number;
  content: string;
}

const BookReader = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const bookRef = useRef<HTMLDivElement>(null);

  // 示例书籍内容
  const pages: BookPage[] = [
    {
      id: 1,
      content: "Mrs. Dalloway said she would buy the flowers herself...",
    },
    { id: 2, content: "For Lucy had her work cut out for her..." },
    // 添加更多页面...
  ];

  const handlePageTurn = (direction: "next" | "prev") => {
    if (isAnimating) return;

    setIsAnimating(true);
    const bookElement = bookRef.current;

    if (bookElement) {
      bookElement.style.transform =
        direction === "next" ? "rotateY(-180deg)" : "rotateY(180deg)";
    }

    setTimeout(() => {
      setCurrentPage((prev) =>
        direction === "next"
          ? Math.min(prev + 1, pages.length - 1)
          : Math.max(prev - 1, 0)
      );
      setIsAnimating(false);
      if (bookElement) {
        bookElement.style.transform = "rotateY(0deg)";
      }
    }, 800);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="relative perspective-1000 w-[800px] h-[600px]">
        <div
          ref={bookRef}
          className="relative w-full h-full transition-transform duration-800 ease-in-out transform-style-preserve-3d"
        >
          {/* 当前页 */}
          <Card className="absolute w-full h-full bg-background shadow-lg backface-hidden">
            <CardContent className="p-8 h-full">
              <p>{pages[currentPage].content}</p>
            </CardContent>
          </Card>

          {/* 下一页（预渲染） */}
          {currentPage < pages.length - 1 && (
            <Card className="absolute w-full h-full bg-background shadow-lg transform rotateY-180 backface-hidden">
              <CardContent className="p-8 h-full">
                <p>{pages[currentPage + 1].content}</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      <div className="mt-8 flex gap-4">
        <Button
          variant="outline"
          size="icon"
          onClick={() => handlePageTurn("prev")}
          disabled={currentPage === 0 || isAnimating}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>

        <Button
          variant="outline"
          size="icon"
          onClick={() => handlePageTurn("next")}
          disabled={currentPage === pages.length - 1 || isAnimating}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default BookReader;
