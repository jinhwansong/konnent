'use client';

import { useEffect, useRef } from 'react';
import { Virtuoso, VirtuosoHandle } from 'react-virtuoso';

interface VirtualizedListProps<T> {
  data: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
  className?: string;
  overscan?: number;
}

export default function VirtualizedList<T>({ 
  data, 
  renderItem, 
  className = '',
  overscan = 5 
}: VirtualizedListProps<T>) {
  const virtuosoRef = useRef<VirtuosoHandle>(null);

  // 데이터가 변경될 때마다 맨 아래로 스크롤
  useEffect(() => {
    if (virtuosoRef.current && data.length > 0) {
      setTimeout(() => {
        virtuosoRef.current?.scrollToIndex({ 
          index: data.length - 1, 
          align: 'end' 
        });
      }, 100);
    }
  }, [data.length]);

  if (data.length === 0) {
    return null;
  }

  return (
    <div className={`flex-1 overflow-y-auto px-2 custom-scrollbar ${className}`}>
      <Virtuoso
        ref={virtuosoRef}
        data={data}
        itemContent={(index, item) => renderItem(item, index)}
        overscan={overscan}
        followOutput="smooth"
        className="h-full"
        style={{ height: '100%' }}
      />
    </div>
  );
}