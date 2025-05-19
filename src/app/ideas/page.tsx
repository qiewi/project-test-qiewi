"use client"

import Header from "@/components/Header";
import Banner from "@/components/Banner";
import PostList from "@/components/PostList";
import SocialMedia from "@/../public/social-media.jpg"
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

interface Post {
  id: string;
  image: string;
  title: string;
  date: string;
  published_at: string;
}

export default function Home() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [pagePosts, setPagePosts] = useState<Post[]>([]);
  const [displayPosts, setDisplayPosts] = useState<Post[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);

  const page = Number(searchParams.get("page") || 1);
  const showPerPage = Number(searchParams.get("size") || 10);
  const sort = searchParams.get("sort") || "-published_at";

  // Update URL and refresh
  const updateUrl = (params: Record<string, any>) => {
    const url = new URL(window.location.href);
    Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v));
    router.replace(url.pathname + url.search);
  };

  // Fetch data for the current page only
  useEffect(() => {
    setLoading(true);
    fetch(`/api/ideas?page[number]=${page}&page[size]=${showPerPage}&append[]=small_image&append[]=medium_image`)
      .then(res => res.json())
      .then(data => {
        const fetchedPosts = data.data.map((item: any) => ({
          id: item.id,
          image: item.medium_image?.url || item.small_image?.url || SocialMedia,
          title: item.title,
          date: item.published_at ? new Date(item.published_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }) : '',
          published_at: item.published_at || '',
        }));
        setPagePosts(fetchedPosts);
        setTotal(data.meta?.total || 0);
        setLoading(false);
      });
  }, [page, showPerPage]);

  // Sort only the posts shown on the current page (frontend sort)
  useEffect(() => {
    let sorted = [...pagePosts];
    if (sort === "-published_at") {
      sorted.sort((a, b) => ((b.published_at || "") > (a.published_at || "") ? 1 : -1));
    } else {
      sorted.sort((a, b) => ((a.published_at || "") > (b.published_at || "") ? 1 : -1));
    }
    setDisplayPosts(sorted);
  }, [sort, pagePosts]);

  // Handler
  const handleSortChange = (val: string) => {
    updateUrl({ sort: val });
  };
  const handleShowPerPageChange = (val: number) => {
    updateUrl({ size: val, page: 1 });
  };
  const handlePageChange = (val: number) => {
    updateUrl({ page: val });
  };

  return (
    <div>
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
            posts={displayPosts}
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
