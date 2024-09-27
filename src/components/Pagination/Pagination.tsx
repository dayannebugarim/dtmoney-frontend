import { Box, Button, HStack, IconButton, Text } from "@chakra-ui/react";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { useState, useEffect } from "react";

interface PaginationProps {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({
  totalPages,
  currentPage,
  onPageChange,
}) => {
  const [pages, setPages] = useState<(number | string)[]>([]);

  useEffect(() => {
    let visiblePages: (number | string)[] = [];

    if (totalPages <= 8) {
      visiblePages = Array.from({ length: totalPages }, (_, i) => i + 1);
    } else if (currentPage < 5) {
      visiblePages = [1, 2, 3, 4, 5, "...", totalPages];
    } else if (currentPage >= totalPages - 3) {
      visiblePages = [1, "...", totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
    } else {
      visiblePages = [1, "...", currentPage - 1, currentPage, currentPage + 1, "...", totalPages];
    }

    setPages(visiblePages);
  }, [totalPages, currentPage]);

  const handlePageClick = (page: number | string) => {
    if (page === "...") {
      const newPage = currentPage < totalPages / 2 ? currentPage + 5 : currentPage - 5;
      onPageChange(Math.max(1, Math.min(totalPages, newPage)));
    } else {
      onPageChange(page as number);
    }
  };

  return (
    <HStack spacing={2} justifyContent="center" mt={3}>
      <IconButton
        icon={<ChevronLeftIcon />}
        isDisabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        aria-label="Previous page"
        variant="paginationControl"
      />

      {pages.map((page, index) => (
        <Button
          key={index}
          onClick={() => handlePageClick(page)}
          isDisabled={page === currentPage}
          variant={page === currentPage ? "paginationSelected" : "pagination"}
        >
          {page}
        </Button>
      ))}

      <IconButton
        icon={<ChevronRightIcon />}
        isDisabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        aria-label="Next page"
        variant="paginationControl"
      />
    </HStack>
  );
};
