import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import { getSessions } from '@/libs/main';
import MentorContent from '@/components/main/MentorContent';
import Slider from '@/components/main/Slider';
import { getArticle } from '@/libs/article';
import ArticleList from '@/components/main/ArticleList';
export default async function Home() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['sessions', 1, 'all', 8, 'latest'],
    queryFn: () => getSessions(1, 'all', 8, 'latest'),
  });

  await queryClient.prefetchQuery({
    queryKey: ['article', 1, 'all', 4, 'likes'],
    queryFn: () => getArticle(1, 'all', 4, 'likes'),
  });
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <section>
        <Slider />
        <MentorContent initialCategory="all" />
        <ArticleList type="likes" />
      </section>
    </HydrationBoundary>
  );
}
