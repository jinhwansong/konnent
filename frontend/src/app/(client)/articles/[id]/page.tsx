import React from 'react';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import ArticleDetail from '@/components/article/ArticleDetail';
import { getArticleDetail } from '@/libs/article';

export default async function Page({ params }: { params: { id: string } }) {
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
