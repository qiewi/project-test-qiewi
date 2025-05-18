import React from 'react';
import PostCard from './PostCard';

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
  return (
    <section className="container mx-auto py-10">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div className="text-[#757575] text-sm">Showing {start} - {end} of {total}</div>
        <div className="flex gap-2 items-center">
          <span className="text-[#757575]">Show per page:</span>
          <select value={showPerPage} onChange={e => onShowPerPageChange(Number(e.target.value))} className="border rounded px-2 py-1">
            {[10, 20, 50].map(size => (
              <option key={size} value={size}>{size}</option>
            ))}
          </select>
        </div>
        <div className="flex gap-2 items-center">
          <span className="text-[#757575]">Sort by:</span>
          <select value={sort} onChange={e => onSortChange(e.target.value)} className="border rounded px-2 py-1">
            <option value="-published_at">Newest</option>
            <option value="published_at">Oldest</option>
          </select>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {posts.map(post => (
          <PostCard key={post.id} image={post.image} title={post.title} date={post.date} />
        ))}
      </div>
      {/* Pagination */}
      <div className="flex justify-center mt-8 gap-2">
        {Array.from({ length: Math.ceil(total / showPerPage) }, (_, i) => (
          <button
            key={i}
            className={`w-8 h-8 rounded font-medium transition-colors ${page === i + 1 ? 'bg-[#FF6600] text-white' : 'bg-[#F2F2F2] text-[#757575] hover:bg-[#FF6600]/80 hover:text-white'}`}
            onClick={() => onPageChange(i + 1)}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </section>
  );
};

export default PostList; 