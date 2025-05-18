import React from 'react';
import Image from 'next/image';

interface PostCardProps {
  image: string;
  title: string;
  date: string;
}

const PostCard: React.FC<PostCardProps> = ({ image, title, date }) => {
  return (
    <div className="rounded-lg shadow bg-white overflow-hidden flex flex-col">
      <div className="relative w-full aspect-[16/10]">
        <Image
          src={image}
          alt={title}
          fill
          style={{ objectFit: 'cover' }}
          loading="lazy"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
      </div>
      <div className="p-4 flex flex-col flex-1">
        <div className="text-xs text-gray-500 mb-2">{date}</div>
        <div className="font-semibold text-base line-clamp-3 h-[4.5em] overflow-hidden">{title}</div>
      </div>
    </div>
  );
};

export default PostCard; 