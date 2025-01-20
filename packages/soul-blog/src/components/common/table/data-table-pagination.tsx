import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

export default function DataTablePagination({
  totalPage,
  pageIndex,
  onChangePageIndex,
}: {
  totalPage: number;
  pageIndex: number;
  onChangePageIndex?: (index: number) => void;
}) {
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            label="上一页"
            isActive={pageIndex !== 0}
            onClick={() => {
              pageIndex > 0 && onChangePageIndex?.(pageIndex - 1);
            }}
          />
        </PaginationItem>
        {Array.from({ length: totalPage }, (_, index) => {
          if (index < 4 || index > totalPage - 3) {
            return (
              <PaginationItem key={index}>
                <PaginationLink
                  isActive={pageIndex === index}
                  onClick={() => onChangePageIndex?.(index)}
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
            label="下一页"
            isActive={pageIndex !== totalPage - 1}
            onClick={() => {
              pageIndex < totalPage - 1 && onChangePageIndex?.(pageIndex + 1);
            }}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
