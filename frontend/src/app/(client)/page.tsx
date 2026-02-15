import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';

import AdminRedirect from '@/components/common/AdminRedirect';
import ArticleGrid from '@/components/main/ArticleGrid';
import HeroSection from '@/components/main/HeroSection';
import MentorContent from '@/components/main/MentorContent';
import ReviewSlider from '@/components/main/ReviewSlider';
import { fetchArticles } from '@/libs/article';
import { fetchSessions } from '@/libs/main';

export default async function Home() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['sessions', 1, 'all', 8, 'latest'],
    queryFn: () => fetchSessions(1, 'all', 8, 'latest'),
  });

  await queryClient.prefetchQuery({
    queryKey: ['article', 1, 'all', 3, 'latest'],
    queryFn: () => fetchArticles(1, 'all', 3, 'latest'),
  });

  return (
    <>
      <AdminRedirect />
      <HydrationBoundary state={dehydrate(queryClient)}>
        <HeroSection />
        <MentorContent initialCategory="all" />
        <ArticleGrid />
        <ReviewSlider />
      </HydrationBoundary>
    </>
  );
}
