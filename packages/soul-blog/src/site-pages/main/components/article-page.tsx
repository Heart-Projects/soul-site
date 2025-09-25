import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

export default function ArticlePage({
  totalPage,
  pageIndex,
  category,
}: {
  totalPage: number;
  pageIndex: number;
  category?: string;
}) {
  const articlePrefix = category ? `nav/${category}/` : "";
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href={`${articlePrefix}?p=${pageIndex == 1 ? 1 : pageIndex - 1}`}
            label="上一页"
          />
        </PaginationItem>
        {Array.from({ length: totalPage }, (_, index) => {
          if (index < 4 || index > totalPage - 3) {
            return (
              <PaginationItem key={index}>
                <PaginationLink
                  href={`${articlePrefix}?p=${index + 1}`}
                  isActive={pageIndex === index + 1}
                >
                  {index + 1}
                </PaginationLink>
              </PaginationItem>
            );
          } else if (index === 4) {
            return (
              <PaginationItem key={index}>
                <PaginationEllipsis />
              </PaginationItem>
            );
          } else {
            return null;
          }
        })}
        <PaginationItem>
          <PaginationNext
            href={`${articlePrefix}?p=${pageIndex == totalPage ? totalPage : pageIndex + 1}`}
            label="下一页"
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
