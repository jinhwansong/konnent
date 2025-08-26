import React from 'react';
import { Metadata } from 'next';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import ArticleDetail from '@/components/article/ArticleDetail';
import { getArticleDetail } from '@/libs/article';

interface ArticlePageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({
  params,
}: ArticlePageProps): Promise<Metadata> {
  const { id } = await params;
  const article = await getArticleDetail(id);

  return {
    title: article.title,
    description: article.content.slice(0, 150),
    openGraph: {
      title: article.title,
      description: article.content.slice(0, 150),
      images: article.thumbnail ? [article.thumbnail] : [],
    },
  };
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { id } = await params;
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['articleDetail', id],
    queryFn: () => getArticleDetail(id),
  });
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ArticleDetail articleId={id} />
    </HydrationBoundary>
  );
}
