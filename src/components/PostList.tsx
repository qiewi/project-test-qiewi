import React from 'react';
import PostCard from './PostCard';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { ChevronLeftIcon, ChevronRightIcon, ChevronsLeftIcon, ChevronsRightIcon, MoreHorizontalIcon } from "lucide-react";

interface Post {
  id: string;
  image: string;
  title: string;
  date: string;
}

interface PostListProps {
  posts: Post[];
  sort: string;
  showPerPage: number;
  onSortChange: (sort: string) => void;
  onShowPerPageChange: (size: number) => void;
  page: number;
  total: number;
  onPageChange: (page: number) => void;
}

const PostList: React.FC<PostListProps> = ({ posts, sort, showPerPage, onSortChange, onShowPerPageChange, page, total, onPageChange }) => {
  const start = (page - 1) * showPerPage + 1;
  const end = Math.min(page * showPerPage, total);
  const totalPages = Math.ceil(total / showPerPage);

  // Pagination logic
  let pages: (number | string)[] = [];
  if (totalPages <= 5) {
    pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  } else {
    if (page <= 3) {
      pages = [1, 2, 3, 4, '...', totalPages];
    } else if (page >= totalPages - 2) {
      pages = [1, '...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
    } else {
      pages = [1, '...', page - 1, page, page + 1, '...', totalPages];
    }
  }

  return (
    <section className="container mx-auto py-10">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 text-black">
        <div className="text-sm">Showing {start} - {end} of {total}</div>
        <div className='flex flex-row gap-4'>
          <div className="flex gap-2 items-center">
            <span>Show per page:</span>
            <Select value={showPerPage.toString()} onValueChange={(value) => onShowPerPageChange(Number(value))}>
              <SelectTrigger className="rounded-3xl border-gray-300 w-[120px]">
                <SelectValue placeholder="Select size" />
              </SelectTrigger>
              <SelectContent className='bg-white border-none'>
                {[10, 20, 50].map(size => (
                  <SelectItem key={size} value={size.toString()}>{size}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex gap-2 items-center">
            <span>Sort by:</span>
            <Select value={sort} onValueChange={onSortChange}>
              <SelectTrigger className="rounded-3xl border-gray-300 w-[120px]">
                <SelectValue placeholder="Select sort" />
              </SelectTrigger>
              <SelectContent className='bg-white border-none'>
                <SelectItem value="-published_at">Newest</SelectItem>
                <SelectItem value="published_at">Oldest</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {posts.map(post => (
          <PostCard key={post.id} image={post.image} title={post.title} date={post.date} />
        ))}
      </div>
      {/* Pagination */}
      <div className="flex justify-center mt-16">
        <Pagination>
          <PaginationContent>
            {/* First page */}
            <PaginationItem>
              <button
                className="w-8 h-8 flex items-center justify-center rounded transition-colors disabled:opacity-50"
                onClick={() => onPageChange(1)}
                disabled={page === 1}
                aria-label="First page"
              >
                <ChevronsLeftIcon className="w-4 h-4" />
              </button>
            </PaginationItem>
            {/* Previous page */}
            <PaginationItem>
              <button
                className="w-8 h-8 flex items-center justify-center rounded transition-colors disabled:opacity-50"
                onClick={() => onPageChange(page - 1)}
                disabled={page === 1}
                aria-label="Previous page"
              >
                <ChevronLeftIcon className="w-4 h-4" />
              </button>
            </PaginationItem>
            {/* Page numbers and ellipsis */}
            {pages.map((p, idx) =>
              p === '...'
                ? (
                  <PaginationItem key={`ellipsis-${idx}`}>
                    <span className="w-8 h-8 flex items-center justify-center text-gray-400 select-none">
                      <MoreHorizontalIcon className="w-4 h-4" />
                    </span>
                  </PaginationItem>
                ) : (
                  <PaginationItem key={p}>
                    <button
                      className={`w-8 h-8 flex items-center justify-center rounded font-medium transition-colors ${page === p ? 'bg-[#FF6600] text-white' : 'bg-transparent text-black hover:bg-[#FF6600]/80 hover:text-white border border-transparent'} `}
                      onClick={() => onPageChange(Number(p))}
                      aria-current={page === p ? 'page' : undefined}
                    >
                      {p}
                    </button>
                  </PaginationItem>
                )
            )}
            {/* Next page */}
            <PaginationItem>
              <button
                className="w-8 h-8 flex items-center justify-center rounded transition-colors disabled:opacity-50"
                onClick={() => onPageChange(page + 1)}
                disabled={page === totalPages}
                aria-label="Next page"
              >
                <ChevronRightIcon className="w-4 h-4" />
              </button>
            </PaginationItem>
            {/* Last page */}
            <PaginationItem>
              <button
                className="w-8 h-8 flex items-center justify-center rounded transition-colors disabled:opacity-50"
                onClick={() => onPageChange(totalPages)}
                disabled={page === totalPages}
                aria-label="Last page"
              >
                <ChevronsRightIcon className="w-4 h-4" />
              </button>
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </section>
  );
};

export default PostList; 