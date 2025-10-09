'use client';

import React, { useEffect, useRef, type ReactNode } from 'react';
import { Virtuoso, VirtuosoHandle } from 'react-virtuoso';

interface BaseVirtualizedListProps<T> {
  /** 렌더링할 데이터 리스트 */
  data: T[];
  /** 각 아이템 렌더 함수 */
  renderItem: (item: T, index: number) => ReactNode;
  /** className */
  className?: string;
  /** 로딩 상태 */
  loading?: boolean;
  /** 에러 메시지 */
  error?: string;
  /** 빈 리스트 메시지 */
  emptyText?: string;
  /** 높이 */
  height?: number | string;
}

interface ChatListProps<T> extends BaseVirtualizedListProps<T> {
  mode: 'chat';
}

interface FeedListProps<T> extends BaseVirtualizedListProps<T> {
  mode: 'feed';
  loadMore?: () => void;
  hasMore?: boolean;
  useWindowScroll?: boolean;
}

type VirtualizedListProps<T> = ChatListProps<T> | FeedListProps<T>;

export default function VirtualizedList<T>({
  data,
  renderItem,
  className = '',
  loading = false,
  error,
  emptyText = '데이터가 없습니다.',
  height = '100%',
  ...rest
}: VirtualizedListProps<T>) {
  const virtuosoRef = useRef<VirtuosoHandle>(null);
  const mode = 'mode' in rest ? rest.mode : 'chat';

  useEffect(() => {
    if (mode === 'chat' && data && data.length > 0) {
      setTimeout(() => {
        virtuosoRef.current?.scrollToIndex({
          index: data.length - 1,
          align: 'end',
          behavior: 'smooth',
        });
      }, 50);
    }
  }, [mode, data]);


  /** 공통 에러 처리 */
  if (error) {
    return (
      <div className="flex h-48 items-center justify-center text-sm text-[var(--color-danger)]">
        {error}
      </div>
    );
  }

  /** 공통 빈 데이터 처리 */
  if (!data || data.length === 0) {
    return (
      <div className="flex h-48 items-center justify-center text-sm text-[var(--text-sub)]">
        {loading ? '로딩 중...' : emptyText}
      </div>
    );
  }

  // FEED 모드 (댓글, 피드, 무한스크롤)
  if (mode === 'feed') {
    const {
      loadMore,
      hasMore = false,
      useWindowScroll = true,
    } = rest as FeedListProps<T>;

    return (
      <div className={`${className || ''}`}>
        <Virtuoso
          useWindowScroll={useWindowScroll}
          data={data}
          style={{ height }}
          endReached={() => {
            if (hasMore && loadMore && !loading) loadMore();
          }}
          itemContent={(index, item) => (
            <div className={index !== data.length - 1 ? 'pb-6' : ''}>
              {renderItem(item, index)}
            </div>
          )}
          components={{
            Footer: () =>
              loading ? (
                <div className="flex justify-center py-4">
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-[var(--primary)] border-t-transparent" />
                </div>
              ) : null,
          }}
        />
      </div>
    );
  }

  // CHAT 모드 (실시간 채팅, 하단 고정)
  if (mode === 'chat') {
    return (
      <div className={`flex-1 ${className}`} style={{ height: '100%', overflow: 'hidden' }}>
        <Virtuoso
          ref={virtuosoRef}
          data={data}
          itemContent={(index, item) => renderItem(item, index)}
          overscan={5}
          followOutput="smooth"
          initialTopMostItemIndex={data.length - 1}
          alignToBottom
          style={{ height: '100%' }}
        />
      </div>
    );
  }

  return null;
}
