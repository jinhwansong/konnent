import {
  ArticleCardItem,
  ArticleRequest,
  ArticleResponse,
} from '@/types/article';
import { fetcher } from '@/utils/fetcher';
import { ArticleCategoryTabType } from '@/contact/article';

export const getArticle = async (
  page: number,
  category: ArticleCategoryTabType = 'all',
  limit: number,
  sort: string = 'latest',
): Promise<ArticleResponse> => {
  const searchParams = new URLSearchParams({
    page: String(page),
    limit: String(limit),
    sort: String(sort),
  });
  if (category !== 'all') {
    searchParams.append('category', category);
  }
  return fetcher<ArticleResponse>(`article?${searchParams.toString()}`, {
    method: 'GET',
  });
};

export const postArticle = async (data: ArticleRequest) => {
  console.log(data);
  const formData = new FormData();
  formData.append('title', data.title);
  formData.append('content', data.content);
  formData.append('category', data.category);
  const file = data.thumbnail?.[0];
  if (file) {
    formData.append('thumbnail', file);
  }
  return fetcher<ArticleRequest>(`article`, {
    method: 'POST',
    body: formData,
  });
};

export const uploadArticleImage = (
  formData: FormData,
): Promise<{ urls: string[] }> => {
  return fetcher<{ urls: string[] }>('article/upload-image', {
    method: 'POST',
    body: formData,
  });
};

export const likeArticle = async (id: string) => {
  return fetcher<ArticleRequest>(`article/${id}/like`, {
    method: 'PATCH',
  });
};

export const fetchLikedArticles = async (ids: string[]) => {
  const query = ids.map((id) => `ids=${id}`).join('&');
  return fetcher<string[]>(`article/liked?${query}`, {
    method: 'GET',
  });
};

export const getArticleDetail = async (
  id: string,
): Promise<ArticleCardItem> => {
  return fetcher<ArticleCardItem>(`article/${id}`, {
    method: 'GET',
  });
};

export const deleteArticle = async (id: string) => {
  return fetcher(`article/${id}`, {
    method: 'DELETE',
  });
};

export const patchArticle = async (id: string, data: ArticleRequest) => {
  const formData = new FormData();
  formData.append('title', data.title);
  formData.append('content', data.content);
  formData.append('category', data.category);
  const file = data.thumbnail?.[0];
  if (file) {
    formData.append('thumbnail', file);
  }
  return fetcher<ArticleRequest>(`article/${id}`, {
    method: 'PATCH',
    body: formData,
  });
};
