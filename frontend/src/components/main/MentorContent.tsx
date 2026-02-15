'use client';
import { useQueryClient } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';

import MentorItem from '@/components/main/MentorItem';
import { categoryIcons, CategoryTabType } from '@/contact/mentoring';
import { useGetSession } from '@/hooks/query/useCommonSession';
import { fetchSessions } from '@/libs/main';

function getCategoryFromUrl(): CategoryTabType | null {
  if (typeof window === 'undefined') return null;
  const category = new URLSearchParams(window.location.search).get('category');
  return (category as CategoryTabType) || null;
}

export default function MentorContent({
  initialCategory,
}: {
  initialCategory: CategoryTabType;
}) {
  const queryClient = useQueryClient();
  const [selected, setSelected] = useState<CategoryTabType>(
    initialCategory || 'all'
  );

  // 최초 진입 시 URL(category=...)이 있으면 그 값으로 동기화
  useEffect(() => {
    const category = getCategoryFromUrl();
    if (category && category !== selected) setSelected(category);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 뒤로가기/앞으로가기(popstate) 대응
  useEffect(() => {
    const onPopState = () => {
      const category = getCategoryFromUrl() || 'all';
      setSelected(category);
    };
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  const { data, isLoading, isPlaceholderData } = useGetSession(1, selected, 8, 'latest');

  const prefetchCategory = (category: CategoryTabType) => {
    if (category === selected) return;

    const queryKey = ['sessions', 1, category, 8, 'latest'] as const;
    const existing = queryClient.getQueryData(queryKey);
    const state = queryClient.getQueryState(queryKey);
    if (existing || state?.fetchStatus === 'fetching') return;

    void queryClient.prefetchQuery({
      queryKey,
      queryFn: () => fetchSessions(1, category, 8, 'latest'),
      staleTime: 1000 * 60 * 5,
      gcTime: 1000 * 60 * 30,
    });
  };

  const handleTabChange = (key: CategoryTabType) => {
    if (key === selected) return;

    // 로컬 상태 즉시 업데이트
    setSelected(key);

    // URL만 업데이트 (서버 컴포넌트 재렌더링 없이)
    const params = new URLSearchParams(window.location.search);
    params.set('category', key);
    window.history.replaceState({}, '', `/?${params.toString()}`);
  };

  return (
    <article 
      id="mentor-list-section" 
      className="mx-auto w-full mt-24 px-5 sm:px-8 lg:w-[1280px] xl:px-0"
    >
      {/* 탭 디자인 변경: 아이콘 + 텍스트 캡슐 스타일 */}
      <div className="mb-12 flex gap-3 flex-wrap pb-4">
        {Object.entries(categoryIcons).map(([key, { label, icon }]) => (
          <button
            key={key}
            onClick={() => handleTabChange(key as CategoryTabType)}
            onMouseEnter={() => prefetchCategory(key as CategoryTabType)}
            className={`flex items-center gap-2.5 px-5 py-2.5 rounded-full text-sm font-bold whitespace-nowrap border-2 transition-colors duration-200 ${
              selected === key
                ? 'bg-[var(--primary)] border-[var(--primary)] text-white'
                : 'bg-[var(--card-bg)] border-[var(--border-color)] text-[var(--text-sub)] hover:border-[var(--primary)] hover:text-[var(--primary)]'
            }`}
          >
            <div className="w-6 h-6 flex items-center justify-center">
              {/* contact/mentoring.tsx의 아이콘이 Image 형태이므로 크기를 강제 조정 */}
              <div className="scale-[0.5] flex items-center justify-center">
                {icon}
              </div>
            </div>
            {label}
          </button>
        ))}
      </div>

      {/* 멘토링 세션 리스트 영역 - 로딩 시 시각적 피드백 */}
      <div className={`transition-opacity duration-200 ${isPlaceholderData || isLoading ? 'opacity-50 pointer-events-none' : 'opacity-100'}`}>
        {data?.data && data.data.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {data.data.map(item => (
              <MentorItem key={item.id} {...item} />
            ))}
          </div>
        ) : !isLoading ? (
          <div className="flex h-[300px] w-full flex-col items-center justify-center rounded-2xl bg-[var(--primary-sub02)] text-[var(--text-sub)]">
            <p className="text-lg font-medium">아직 등록된 멘토링 세션이 없습니다.</p>
            <p className="mt-1 text-sm text-gray-400">다른 카테고리를 선택해보세요!</p>
          </div>
        ) : (
          /* 최초 로딩 시에만 보여주는 스켈레톤 */
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="h-[320px] w-full animate-pulse rounded-2xl bg-gray-100 dark:bg-gray-800" />
            ))}
          </div>
        )}
      </div>
    </article>
  );
}

