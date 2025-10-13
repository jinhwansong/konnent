# 스크롤 위치 복원 유틸리티

채팅 메시지 무한스크롤에서 이전 메시지를 불러올 때(prepend) 스크롤 위치를 정확하게 유지하기 위한 유틸리티입니다.

## 문제 상황

@tanstack/react-virtual을 사용한 채팅에서 이전 메시지를 불러올 때:
- 새 데이터가 위쪽에 추가되면 `scrollHeight`가 변경됨
- 단순히 `scrollTop`을 조정해도 동적 높이 측정 타이밍 차이로 정확도 떨어짐
- 사용자가 보던 메시지 위치가 미세하게 어긋나거나 튐

## 해결 방법

### 1. Anchor 기반 스크롤 복원

현재 보이는 첫 번째 요소를 "anchor"로 삼아, 데이터 로드 전후의 위치를 비교합니다.

```typescript
// 로드 전: anchor 저장
const anchor = captureScrollAnchor(scrollContainer);

// 데이터 로드
await fetchPreviousMessages();

// 로드 후: anchor 기반 복원
restoreScrollAnchor(scrollContainer, anchor);
```

### 2. 2단계 보정

렌더링 타이밍 차이를 고려해 2번의 `requestAnimationFrame`으로 보정합니다.

```typescript
// 1단계: 초기 렌더링 기준 보정
requestAnimationFrame(() => {
  const diff1 = currentOffset - anchorOffset;
  scrollTop -= diff1;

  // 2단계: 동적 높이 측정 완료 후 재보정
  requestAnimationFrame(() => {
    const diff2 = currentOffset - anchorOffset;
    scrollTop -= diff2; // 미세 조정
  });
});
```

## API

### `captureScrollAnchor(scrollContainer)`

현재 보이는 첫 번째 요소를 anchor로 캡처합니다.

**반환값:**
```typescript
{
  element: HTMLElement,      // anchor 요소
  offsetTop: number,          // 컨테이너 상단으로부터의 offset
  scrollTop: number           // 현재 scrollTop
}
```

### `restoreScrollAnchor(scrollContainer, anchor, onComplete?)`

Anchor를 기준으로 스크롤 위치를 복원합니다.

**매개변수:**
- `scrollContainer`: 스크롤 컨테이너 요소
- `anchor`: `captureScrollAnchor`로 캡처한 anchor 객체
- `onComplete`: 복원 완료 후 콜백 (optional)

**동작:**
1. 1차 보정 (초기 렌더링)
2. 2차 보정 (동적 높이 측정 완료)

### `restoreScrollByHeightDiff(scrollContainer, beforeHeight, beforeScrollTop)`

scrollHeight 차이 기반 보정 (fallback 방식).

**매개변수:**
- `scrollContainer`: 스크롤 컨테이너 요소
- `beforeHeight`: 로드 전 `scrollHeight`
- `beforeScrollTop`: 로드 전 `scrollTop`

## 사용 예시

### VirtualizedList 컴포넌트에서

```typescript
const handleScroll = () => {
  if (scrollTop < 200 && hasPrevious) {
    // 1. anchor 캡처
    const anchor = captureScrollAnchor(scrollEl);

    // 2. 데이터 로드
    Promise.resolve()
      .then(() => onLoadPrevious?.())
      .then(() => {
        // 3. 스크롤 복원 (2단계 보정)
        restoreScrollAnchor(scrollEl, anchor, () => {
          console.log('스크롤 복원 완료');
        });
      });
  }
};
```

## 정확도 보장

- ✅ **Anchor 기반**: 실제 DOM 요소의 위치를 추적하여 높은 정확도
- ✅ **2단계 보정**: 렌더링 타이밍 차이를 고려한 미세 조정
- ✅ **에러 처리**: try-catch로 예외 상황 대응
- ✅ **중복 호출 방지**: `isLoadingPreviousRef`로 동시 로드 방지

## 주의사항

1. **anchor 요소는 반드시 `data-index` 속성을 가져야 합니다.**
   ```tsx
   <div data-index={index} ref={virtualizer.measureElement}>
     {/* 메시지 내용 */}
   </div>
   ```

2. **캐시 초기화 시 anchor가 사라지지 않도록 충분한 딜레이를 둡니다.**
   ```typescript
   setTimeout(() => {
     resetCache();
   }, 1000); // 스크롤 보정 완료 대기
   ```

3. **`passive: true` 이벤트에서는 async 함수를 직접 사용하지 않습니다.**
   ```typescript
   // ❌ Bad
   scrollEl.addEventListener('scroll', async () => { ... });

   // ✅ Good
   scrollEl.addEventListener('scroll', () => {
     Promise.resolve().then(async () => { ... });
   }, { passive: true });
   ```

