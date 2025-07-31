'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useQueryClient } from '@tanstack/react-query';
import ArticleForm from '@/components/article/ArticleForm';
import { useToastStore } from '@/stores/useToast';
import { usePostArticle } from '@/hooks/query/useArticle';
import { ArticleRequest } from '@/types/article';

export default function ArticleCreatePage() {
  const queryClient = useQueryClient();
  const [content, setContent] = useState('');
  const { showToast } = useToastStore();
  const { mutate: postArticle } = usePostArticle();
  const router = useRouter();

  const onSubmit = async (data: ArticleRequest) => {
    try {
      await postArticle({
        ...data,
        content,
      });
      showToast('아티클 등록을 완료했습니다.', 'success');
      queryClient.invalidateQueries({ queryKey: ['article'] });
      router.push('/articles');
    } catch {
      showToast('아티클 등록에 실패했습니다.', 'error');
    }
  };
  return (
    <ArticleForm
      onSubmit={onSubmit}
      content={content}
      setContent={setContent}
      title="아티클 등록"
    />
  );
}
