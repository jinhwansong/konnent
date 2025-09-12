import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { ArticleCategoryTabType } from '@/contact/article';
import {
  deleteArticle,
  fetchLikedArticles,
  getArticle,
  getArticleDetail,
  likeArticle,
  patchArticle,
  postArticle,
} from '@/libs/article';
import {
  ArticleCardItem,
  ArticleRequest,
  ArticleResponse,
  PatchArticle,
} from '@/types/article';
import { useSession } from 'next-auth/react';

export const useGetArticle = (
  page: number,
  category: ArticleCategoryTabType = 'all',
  limit: number = 6,
  sort: string = 'latest',
) => {
  return useQuery<ArticleResponse>({
    queryKey: ['article', page, category, limit, sort],
    queryFn: () => getArticle(page, category, limit, sort),
    retry: false,
    staleTime: 1000 * 60 * 5,
    refetchOnMount: false,
  });
};

export const useGetArticleDetail = (id: string) => {
  return useQuery<ArticleCardItem>({
    queryKey: ['article-detail', id],
    queryFn: () => getArticleDetail(id),
    retry: false,
    staleTime: 1000 * 60 * 5,
    refetchOnMount: false,
  });
};

export const usePostArticle = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: ArticleRequest) => postArticle(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['article'] });
    },
  });
};

export const useLikeArticle = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => likeArticle(id),
    onMutate: async (articleId: string) => {
      await queryClient.cancelQueries({ queryKey: ['article'] });

      const previousArticle = queryClient.getQueriesData<ArticleResponse>({
        queryKey: ['article'],
      });

      const previousLiked =
        queryClient.getQueryData<string[]>(['article-liked']) || [];

      const previousDetail = queryClient.getQueryData<ArticleCardItem>([
        'article-detail',
      ]);

      // article 리스트 좋아요 카운트 조작
      queryClient.setQueriesData<ArticleResponse>(
        { queryKey: ['article'] },
        (old) => {
          if (!old) return old;
          return {
            ...old,
            data: old.data.map((article) =>
              article.id === articleId
                ? {
                    ...article,
                    likeCount: article.liked
                      ? article.likeCount - 1
                      : article.likeCount + 1,
                  }
                : article,
            ),
          };
        },
      );

      queryClient.setQueryData<ArticleCardItem>(['article-detail'], (old) => {
        if (!old) return old;
        return {
          ...old,
          likeCount: old.liked ? old.likeCount - 1 : old.likeCount + 1,
          liked: !old.liked,
        };
      });

      // likedArticles 쿼리 조작
      const isLiked = previousLiked.includes(articleId);
      const newLiked = isLiked
        ? previousLiked.filter((id) => id !== articleId)
        : [...previousLiked, articleId];
      queryClient.setQueryData(['article-liked'], newLiked);

      return { previousArticle, previousLiked, previousDetail };
    },
    onError: (err, _, context) => {
      if (context?.previousArticle) {
        for (const [queryKey, data] of context.previousArticle) {
          queryClient.setQueryData(queryKey, data);
        }
      }
      if (context?.previousLiked) {
        queryClient.setQueryData(['article-liked'], context.previousLiked);
      }
      if (context?.previousDetail) {
        queryClient.setQueryData(['article-detail'], context.previousDetail);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['article'] });
      queryClient.invalidateQueries({ queryKey: ['article-liked'] });
      queryClient.invalidateQueries({ queryKey: ['article-detail'] });
    },
  });
};

export const useLikedArticles = (ids: string[]) => {
  const { data: session } = useSession();
  return useQuery<string[]>({
    queryKey: ['article-liked', ids],
    queryFn: () => fetchLikedArticles(ids),
    enabled: !!session?.user && ids.length > 0,
  });
};

export const useDeleteArticle = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id }: { id: string }) => deleteArticle(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['article'] });
    },
  });
};

export const usePatchArticle = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: PatchArticle) => patchArticle(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['article-detail'] });
      queryClient.invalidateQueries({ queryKey: ['article'] });
    },
  });
};
