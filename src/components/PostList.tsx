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
  let pages: number[] = [];
  if (totalPages <= 5) {
    pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  } else {
    if (page <= 3) {
      pages = [1, 2, 3, 4, 5];
    } else if (page >= totalPages - 2) {
      pages = [totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
    } else {
      pages = [page - 2, page - 1, page, page + 1, page + 2];
    }
  }

  return (
    <section className="container mx-auto py-10">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div className="text-[#757575] text-sm">Showing {start} - {end} of {total}</div>
        <div className='flex flex-row gap-4'>
          <div className="flex gap-2 items-center">
            <span className="text-[#757575]">Show per page:</span>
            <Select value={showPerPage.toString()} onValueChange={(value) => onShowPerPageChange(Number(value))}>
              <SelectTrigger className="w-[80px]">
                <SelectValue placeholder="Select size" />
              </SelectTrigger>
              <SelectContent>
                {[10, 20, 50].map(size => (
                  <SelectItem key={size} value={size.toString()}>{size}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex gap-2 items-center">
            <span className="text-[#757575]">Sort by:</span>
            <Select value={sort} onValueChange={onSortChange}>
              <SelectTrigger className="w-[120px]">
                <SelectValue placeholder="Select sort" />
              </SelectTrigger>
              <SelectContent>
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
      <div className="flex justify-center mt-8">
        <Pagination>
          <PaginationContent>
            {page > 1 && (
              <PaginationItem>
                <PaginationPrevious onClick={() => onPageChange(page - 1)} />
              </PaginationItem>
            )}
            {pages.map(p => (
              <PaginationItem key={p}>
                <PaginationLink
                  onClick={() => onPageChange(p)}
                  isActive={page === p}
                >
                  {p}
                </PaginationLink>
              </PaginationItem>
            ))}
            {page < totalPages && (
              <PaginationItem>
                <PaginationNext onClick={() => onPageChange(page + 1)} />
              </PaginationItem>
            )}
          </PaginationContent>
        </Pagination>
      </div>
    </section>
  );
};

export default PostList; 