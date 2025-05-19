"use client"

import Header from "../components/Header";
import Banner from "../components/Banner";
import PostList from "../components/PostList";
import SocialMedia from "@/../public/social-media.jpg"
import { useEffect, useState } from "react";

interface Post {
  id: string;
  image: string;
  title: string;
  date: string;
}

export default function Home() {
  const searchParams = typeof window !== 'undefined' ? new URLSearchParams(window.location.search) : null;
  const [posts, setPosts] = useState<Post[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);

  // State dari URL
  const page = Number(searchParams?.get("page") || 1);
  const showPerPage = Number(searchParams?.get("size") || 10);
  const sort = searchParams?.get("sort") || "-published_at";

  // Update URL
  const updateUrl = (params: Record<string, any>) => {
    const url = new URL(window.location.href);
    Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v));
    window.history.replaceState({}, '', url.toString());
  };

  // Fetch data
  useEffect(() => {
    setLoading(true);
    fetch(`/api/ideas?page[number]=${page}&page[size]=${showPerPage}&sort=${sort}&append[]=small_image&append[]=medium_image`)
      .then(res => res.json())
      .then(data => {
        setPosts(
          data.data.map((item: any) => ({
            id: item.id,
            image: item.medium_image?.url || item.small_image?.url || SocialMedia,
            title: item.title,
            date: item.published_at ? new Date(item.published_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }) : '',
          }))
        );
        setTotal(data.meta?.total || 0);
        setLoading(false);
      });
  }, [page, showPerPage, sort]);

  // Handler
  const handleSortChange = (val: string) => {
    updateUrl({ sort: val, page: 1 });
  };
  const handleShowPerPageChange = (val: number) => {
    updateUrl({ size: val, page: 1 });
  };
  const handlePageChange = (val: number) => {
    updateUrl({ page: val });
  };

  return (
    <div>
      <Header />
      <main>
        <Banner
          imageUrl={"/banner.jpg"}
          title="Ideas"
          text="Where all our great things begin"
        />
        {loading ? (
          <div className="text-center py-20">Loading...</div>
        ) : (
          <PostList
            posts={posts}
            sort={sort}
            showPerPage={showPerPage}
            onSortChange={handleSortChange}
            onShowPerPageChange={handleShowPerPageChange}
            page={page}
            total={total}
            onPageChange={handlePageChange}
          />
        )}
      </main>
    </div>
  );
}
