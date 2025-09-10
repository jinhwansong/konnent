'use client';
import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import ArticleForm from '@/components/article/ArticleForm';
import { useToastStore } from '@/stores/useToast';
import { useGetArticleDetail, usePatchArticle } from '@/hooks/query/useArticle';
import { ArticleRequest } from '@/types/article';

export default function EditArticlePage() {
  const { id } = useParams();
  const { showToast } = useToastStore();
  const router = useRouter();
  const { data: article, isLoading } = useGetArticleDetail(id as string);
  const { mutate: patchArticle } = usePatchArticle();

  const onSubmit = async (data: ArticleRequest) => {
    try {
      await patchArticle({
        id: article?.id as string,
        data,
      });
      showToast('아티클수정을 완료했습니다.', 'success');
      router.push(`/articles/${id}`);
    } catch {
      showToast('아티클수정에 실패했습니다.', 'error');
    }
  };
  if (isLoading) return null;
  return (
    <ArticleForm
      defaultValues={article}
      onSubmit={onSubmit}
      title="아티클 수정"
    />
  );
}
