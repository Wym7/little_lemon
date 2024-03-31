import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "./ui/pagination";

const PagePagination = ({
  totalPosts,
  menusPerPage,
  setCurrentPage,
  activePage,
}: {
  totalPosts: number;
  menusPerPage: number;
  setCurrentPage: (pageNumber: number) => void;
  activePage: number;
}) => {
  let pages = [];

  for (let i = 1; i <= Math.ceil(totalPosts / menusPerPage); i++) {
    pages.push(i);
  }
  return (
    <div>
      <Pagination>
        <PaginationContent>
          <PaginationItem className="cursor-pointer">
            <PaginationPrevious
              onClick={() => {
                if (activePage > 1) {
                  setCurrentPage(activePage - 1);
                }
              }}
            />
          </PaginationItem>
          {pages.map((page, index) => (
            <>
              <PaginationItem key={index} onClick={() => setCurrentPage(page)}>
                <PaginationLink
                  isActive={page === activePage}
                  className={page === activePage ? "bg-yellow-400" : ""}
                >
                  {page}
                </PaginationLink>
              </PaginationItem>
            </>
          ))}
          <PaginationItem className="cursor-pointer">
            <PaginationNext
              onClick={() => {
                if (activePage < Math.ceil(totalPosts / menusPerPage)) {
                  setCurrentPage(activePage + 1);
                }
              }}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default PagePagination;
