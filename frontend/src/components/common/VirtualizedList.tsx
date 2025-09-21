import React, { type ReactNode } from 'react';
import { Virtuoso } from 'react-virtuoso';

interface VirtualizedListProps<T> {
  /** 렌더링할 데이터 리스트 */
  list: T[];
  /** 각 아이템을 렌더링하는 함수 */
  item: (itemData: T, index: number) => ReactNode;
  /** 데이터가 없을 때 표시할 문구 */
  emptyText?: string;
  /** 추가 데이터를 로드하는 함수 (무한 스크롤용) */
  loadMore?: () => void;
  /** 더 불러올 데이터가 있는지 여부 */
  hasMore?: boolean;
  /** 리스트 높이 */
  height?: number | string;
  /** 리스트 vs 그리드 */
  variant?: 'list' | 'grid';
  /** className */
  className?: string;
  /** 로딩 상태 */
  loading?: boolean;
  /** 에러 상태 */
  error?: string;
}

const VirtualizedListInner = React.forwardRef(
  <T,>(
    {
      list,
      item,
      emptyText = '데이터가 없습니다.',
      loadMore,
      hasMore = false,
      height,
      className,
      loading,
      error,
      ...props
    }: VirtualizedListProps<T>,
    ref: React.Ref<HTMLDivElement>
  ) => {
    /** 에러 상태 */
    if (error) {
      return (
        <div className="flex h-48 items-center justify-center text-sm text-[var(--danger)]">
          {error}
        </div>
      );
    }

    /** 데이터가 없을경우 */
    if (!list || list.length === 0) {
      return (
        <div className="flex h-48 items-center justify-center text-sm text-[var(--text-sub)]">
          {loading ? '로딩 중...' : emptyText}
        </div>
      );
    }

    return (
      <div ref={ref} className={`${className || ''}`} {...props}>
        <Virtuoso
          useWindowScroll
          data={list}
          style={{ height: height || '100%' }}
          endReached={() => {
            if (hasMore && loadMore && !loading) {
              loadMore();
            }
          }}
          itemContent={(index, itemData) => item(itemData, index)}
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
);

VirtualizedListInner.displayName = 'VirtualizedList';

const VirtualizedList = React.memo(VirtualizedListInner) as <T>(
  props: VirtualizedListProps<T> & React.RefAttributes<HTMLDivElement>
) => React.ReactElement | null;

export default VirtualizedList;
