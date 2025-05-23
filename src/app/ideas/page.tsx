"use client"

import Banner from "@/components/Banner";
import PostList from "@/components/PostList";
import Placeholder from "@/../public/social-media.jpg"
import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";

interface Post {
  id: string;
  image: string;
  title: string;
  date: string;
  published_at: string;
}

function IdeasContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [pagePosts, setPagePosts] = useState<Post[]>([]);
  const [displayPosts, setDisplayPosts] = useState<Post[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);

  const page = Number(searchParams.get("page") || 1);
  const showPerPage = Number(searchParams.get("size") || 10);
  const sort = searchParams.get("sort") || "-published_at";

  const updateUrl = (params: Record<string, any>) => {
    const url = new URL(window.location.href);
    Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v));
    router.replace(url.pathname + url.search);
  };

  useEffect(() => {
    setLoading(true);
    fetch(`/api/ideas?page[number]=${page}&page[size]=${showPerPage}&append[]=small_image&append[]=medium_image`)
      .then(res => res.json())
      .then(data => {
        const fetchedPosts = data.data.map((item: any) => ({
          id: item.id,
          image: item.medium_image?.url || item.small_image?.url || Placeholder,
          title: item.title,
          date: item.published_at ? new Date(item.published_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }) : '',
          published_at: item.published_at || '',
        }));
        setPagePosts(fetchedPosts);
        setTotal(data.meta?.total || 0);
        setLoading(false);
      });
  }, [page, showPerPage]);

  useEffect(() => {
    let sorted = [...pagePosts];
    if (sort === "-published_at") {
      sorted.sort((a, b) => ((b.published_at || "") > (a.published_at || "") ? 1 : -1));
    } else {
      sorted.sort((a, b) => ((a.published_at || "") > (b.published_at || "") ? 1 : -1));
    }
    setDisplayPosts(sorted);
  }, [sort, pagePosts]);

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
    </div>
  );
}

export default function Home() {
  return (
    <div>
      <main>
        <Suspense fallback={<div className="text-center py-20">Loading...</div>}>
          <IdeasContent />
        </Suspense>
      </main>
    </div>
  );
}
