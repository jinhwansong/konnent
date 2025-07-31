import ArticleContent from '@/components/article/ArticleContent';
import { getArticle } from '@/libs/article';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';

export default async function page() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['article', 1, 'all', 10, 'latest'],
    queryFn: () => getArticle(1, 'all', 10, 'latest'),
  });
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ArticleContent initialCategory="all" />
    </HydrationBoundary>
  );
}
