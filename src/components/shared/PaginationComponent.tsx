"use client";
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";

interface IProps {
    pages: number;
    currentPage: number;
    category: string;
}

const PaginationComponent = ({ pages, currentPage, category }: IProps) => {
    const getLink = (page: number) => {
        const params = new URLSearchParams();
        if (category && category !== "All") params.set("category", category);
        params.set("page", page.toString());
        return `all-courses?${params.toString()}`;
    };

    const getPageNumbers = () => {
        const pageNumbers: (number | string)[] = [];
        const delta = 2;

        for (let i = 1; i <= pages; i++) {
            if (i === 1 || i === pages || (i >= currentPage - delta && i <= currentPage + delta)) {
                pageNumbers.push(i);
            } else if (i === currentPage - delta - 1 || i === currentPage + delta + 1) {
                pageNumbers.push("ellipsis");
            }
        }
        return pageNumbers;
    };

    return (
        <Pagination>
            <PaginationContent>
                {/* previous */}
                <PaginationItem>
                    {currentPage > 1 && (
                        <PaginationPrevious
                            href={getLink(currentPage - 1)}
                            className={
                                "px-3 py-1 rounded-md transition-colors hover:bg-blue-100 hover:text-blue-600 text-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-100"
                            }
                        />
                    )}
                </PaginationItem>
                {/* numbers with ellipsis */}
                {getPageNumbers().map((page, index) => (
                    <PaginationItem key={index}>
                        {page === "ellipsis" ? (
                            <PaginationEllipsis />
                        ) : (
                            <PaginationLink
                                href={getLink(page as number)}
                                isActive={page === currentPage}
                                className={`px-3 py-1 rounded-md transition-colors hover:bg-blue-100 hover:text-blue-600
                                ${page === currentPage
                                        ? "bg-blue-600 text-white hover:bg-blue-600 hover:text-white "
                                        : "text-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-100"
                                    }
                                `}
                            >
                                {page}
                            </PaginationLink>
                        )}
                    </PaginationItem>
                ))}
                {/* next */}
                <PaginationItem>
                    {currentPage < pages && (
                        <PaginationNext
                            href={getLink(currentPage + 1)}
                            className={
                                "px-3 py-1 rounded-md transition-colors hover:bg-blue-100 hover:text-blue-600 text-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-100"
                            }
                        />
                    )}
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    );
};

export default PaginationComponent;
