'use client';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { useGetArticle } from '@/hooks/query/useArticle';
import { buildImageUrl } from '@/utils/getImageUrl';

export default function ArticleGrid() {
  const { data, isLoading } = useGetArticle(1, 'all', 3, 'latest');

  if (isLoading || !data?.data) return null;

  return (
    <section className="mx-auto mt-20 mb-20 px-5 sm:px-8 md:max-w-[1200px] xl:px-0">
      <div className="mb-10 flex items-end justify-between">
        <div>
          <h3 className="text-2xl font-bold text-[var(--text-bold)]">추천 아티클</h3>
          <p className="mt-2 text-[var(--text-sub)]">전문가들의 인사이트와 최신 트렌드를 확인하세요</p>
        </div>
        <Link 
          href="/articles" 
          className="flex items-center gap-1 text-sm font-semibold text-[var(--kmong-blue)] hover:underline"
        >
          전체보기 <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
        {data.data.map((article) => (
          <Link 
            key={article.id} 
            href={`/articles/${article.id}`}
            className="group flex flex-col overflow-hidden rounded-2xl bg-white shadow-sm transition-all hover:-translate-y-2 hover:shadow-xl"
          >
            <div className="relative aspect-[16/10] overflow-hidden">
              <Image
                src={buildImageUrl(article.thumbnail)}
                alt={article.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute top-4 left-4 rounded-full bg-white/90 px-3 py-1 text-xs font-bold text-[var(--kmong-blue)] backdrop-blur-sm">
                Insight
              </div>
            </div>
            
            <div className="flex flex-1 flex-col p-6">
              <h4 className="mb-3 line-clamp-2 text-lg font-bold text-[var(--text-bold)] group-hover:text-[var(--kmong-blue)]">
                {article.title}
              </h4>
              <p className="mb-6 line-clamp-2 text-sm leading-relaxed text-[var(--text-sub)]">
                {article.content}
              </p>
              
              <div className="mt-auto flex items-center justify-between border-t border-[var(--border-color)] pt-4">
                <div className="flex items-center gap-2">
                  <Image
                    src={buildImageUrl(article.author.image)}
                    width={24}
                    height={24}
                    alt={article.author.nickname}
                    className="h-6 w-6 rounded-full"
                  />
                  <span className="text-xs font-medium text-[var(--text-sub)]">{article.author.nickname}</span>
                </div>
                <span className="text-xs text-[var(--text-sub)]">
                  {new Date(article.createdAt).toLocaleDateString()}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}


