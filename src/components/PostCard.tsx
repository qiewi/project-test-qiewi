import React from 'react';
import Image from 'next/image';
import {
  Card,
  CardContent,
  CardHeader,
} from "@/components/ui/card"

interface PostCardProps {
  image: string;
  title: string;
  date: string;
}

const PostCard: React.FC<PostCardProps> = ({ image, title, date }) => {
  return (
    <Card className="overflow-hidden flex flex-col border-none shadow-xl rounded-xl py-0">
      <CardHeader className="p-0">
        <div className="relative w-full aspect-[16/10] rounded-xl">
          <Image
            src={image}
            alt={title}
            fill
            style={{ objectFit: 'cover' }}
            loading="lazy"
            sizes="(max-width: 768px) 100vw, 33vw"
            className='rounded-xl'
          />
        </div>
      </CardHeader>
      <CardContent className="p-4 flex flex-col flex-1">
        <div className="text-xs text-gray-500 mb-2 uppercase">{date}</div>
        <div className="font-semibold text-base line-clamp-3 h-[4.5em] overflow-hidden">{title}</div>
      </CardContent>
    </Card>
  );
};

export default PostCard; 