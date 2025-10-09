# Chat 시스템 사용 가이드

## 개요

실시간 채팅 시스템이 `/chat` 네임스페이스의 Socket.IO를 통해 구현되어 있습니다.

**두 가지 백엔드 게이트웨이를 지원합니다:**
1. **일반 채팅** (`realtime/chat/chat.gateway.ts`) - 기본 채팅 기능
2. **예약 채팅** (`chat/chat.gateway.ts`) - JWT + 시간 검증 기반

## 파일 구조

```
frontend/src/
├── components/chat/
│   ├── ChatPanel.tsx        # 메인 채팅 패널 (이미 rooms/[roomId]에 연결됨)
│   ├── ChatRoom.tsx         # 독립 실행형 채팅방 컴포넌트
│   ├── ChatMessage.tsx      # 메시지 표시 컴포넌트
│   ├── ChatInput.tsx        # 메시지 입력 컴포넌트
│   ├── ChatExample.tsx      # 사용 예제
│   └── FilePreview.tsx      # 파일 미리보기
├── hooks/
│   ├── useChatSocket.ts     # 일반 채팅방용 소켓 훅
│   └── useReservationChat.ts # 예약 기반 채팅방용 소켓 훅
└── types/
    └── chat.ts              # 채팅 관련 타입 정의
```

## 현재 구현 상태

### ✅ 완료된 항목

1. **Socket.IO 연결**
   - `/chat` 네임스페이스 연결
   - JWT 토큰 자동 인증
   - 자동 재연결 설정

2. **ChatPanel 컴포넌트**
   - `rooms/[roomId]` 페이지에 이미 통합됨
   - `useChatSocket` 훅과 연결 완료
   - 실시간 메시지 송수신
   - 사용자 목록 표시

3. **이벤트 처리**
   - `user_connected`: 사용자 입장
   - `user_disconnected`: 사용자 퇴장
   - `new_message`: 메시지 송수신
   - `users_list`: 참여자 목록
   - `messages_history`: 메시지 히스토리

## 사용 방법

### 1. 기본 사용 (이미 구현됨)

`rooms/[roomId]` 페이지에서 자동으로 ChatPanel이 실행됩니다:

```tsx
// app/(mentoring)/rooms/[roomId]/page.tsx
<ChatPanel 
  roomId={roomId}
  currentUser={{
    id: session.user.id,
    name: session.user.name,
    image: session.user.image || undefined,
    isMentor: false,
  }}
/>
```

### 2. 독립 실행형 채팅방

```tsx
import ChatRoom from '@/components/chat/ChatRoom';

<ChatRoom
  roomId="room-123"
  user={{
    id: 'user-456',
    name: '홍길동',
    image: 'https://...',
    isMentor: false,
  }}
  onClose={() => console.log('Chat closed')}
/>
```

### 3. 일반 채팅 모드 (기본값)

```tsx
import { useChatSocket } from '@/hooks/useChatSocket';

const {
  isConnected,
  isJoined,
  messages,
  users,
  sendMessage,
  leaveRoom,
} = useChatSocket({
  roomId: 'room-123',
  user: {
    id: 'user-456',
    name: '홍길동',
    isMentor: false,
  },
  mode: 'general', // 생략 가능 (기본값)
  onNewMessage: (msg) => console.log('💬 새 메시지:', msg),
  onUserJoined: (user) => console.log('🙋 사용자 입장:', user),
});
```

### 4. 예약 채팅 모드 (JWT + 시간 검증)

```tsx
import { useChatSocket } from '@/hooks/useChatSocket';

const {
  isConnected,
  isJoined,
  error,
  sendMessage,
  leaveRoom,
} = useChatSocket({
  roomId: 'reservation-room-123',
  user: {
    id: 'user-456',
    name: '홍길동',
    isMentor: false,
  },
  mode: 'reservation', // 예약 모드 사용
  onJoinSuccess: (data) => console.log('🎉 입장 성공:', data),
  onJoinDenied: (data) => console.error('🚫 입장 거부:', data.reason),
});

// 에러 처리 예시
if (error) {
  // "예약 시간이 아닙니다.", "인증 토큰이 유효하지 않습니다." 등
  console.error(error);
}
```

## 백엔드 게이트웨이 이벤트

### 일반 채팅 모드 (realtime/chat/chat.gateway.ts)

> **🔒 보안**: JWT 토큰으로 사용자 인증 후 DB에서 사용자 정보(role 포함)를 조회합니다.  
> 클라이언트는 `roomId`만 전송하며, 사용자 정보는 백엔드에서 자동으로 채워집니다.

#### 클라이언트 → 서버

| 이벤트 | 페이로드 | 설명 |
|--------|---------|------|
| `user_connected` | `{ roomId }` | 방 입장 (JWT 인증) |
| `user_disconnected` | `{ roomId }` | 방 퇴장 |
| `new_message` | `{ roomId, message, type?, fileUrl?, fileName? }` | 메시지 전송 |

#### 서버 → 클라이언트

| 이벤트 | 페이로드 | 설명 |
|--------|---------|------|
| `user_connected` | `{ userId, userName, userImage, isMentor, socketId }` | 사용자 입장 알림 (DB 조회 정보) |
| `user_disconnected` | `{ userId, userName, socketId }` | 사용자 퇴장 알림 |
| `users_list` | `ChatUser[]` | 참여자 목록 (입장 시, DB 조회 정보) |
| `messages_history` | `ChatMessage[]` | 메시지 히스토리 (입장 시) |
| `new_message` | `ChatMessage` | 새 메시지 브로드캐스트 (DB 조회 정보 포함) |
| `join_denied` | `{ reason: string }` | 인증 실패 시 |

### 예약 채팅 모드 (chat/chat.gateway.ts)

#### 클라이언트 → 서버

| 이벤트 | 페이로드 | 설명 |
|--------|---------|------|
| `join_room` | `{ roomId, userId, token }` | 예약 방 입장 (JWT + 시간 검증) |
| `leave_room` | `{ roomId, userId }` | 예약 방 퇴장 |

#### 서버 → 클라이언트

| 이벤트 | 페이로드 | 설명 |
|--------|---------|------|
| `join_success` | `{ roomId, userId }` | 방 입장 성공 |
| `join_denied` | `{ reason }` | 방 입장 거부 (INVALID_TOKEN, NOT_IN_TIME_WINDOW 등) |
| `user_joined` | `{ userId, socketId }` | 다른 사용자 입장 알림 |
| `user_left` | `{ userId, socketId }` | 사용자 퇴장 알림 |

## 인증 설정

### JWT 토큰

소켓 연결 시 **next-auth 세션**에서 자동으로 JWT 토큰을 가져옵니다:

```tsx
const { data: session } = useSession();
const token = session?.accessToken;

// useChatSocket 훅에서 자동으로 처리됨
// auth: { token } 형태로 소켓에 전달
```

백엔드에서는 `socket.handshake.auth.token`을 검증하고 DB에서 사용자 정보를 조회합니다.

### 멘토 여부 판별

- ❌ **클라이언트에서 전송 X**: `isMentor` 값은 조작 가능하므로 보내지 않습니다.
- ✅ **백엔드에서 조회**: JWT 토큰 검증 후 `user.role === UserRole.MENTOR`로 판별합니다.
- 💡 **장점**: 보안 강화, 프론트엔드 코드 단순화

## 환경 변수

```bash
# .env.local
NEXT_PUBLIC_API_URL=http://localhost:8000
```

## TODO: 향후 개선 사항

### 1. 파일 업로드
현재 파일 첨부 UI는 있지만, 실제 업로드 로직이 필요합니다:

```tsx
// ChatPanel.tsx 수정 필요
const handleSendMessage = async (message: string, files?: File[]) => {
  if (files && files.length > 0) {
    // 1. 파일을 서버에 업로드
    const formData = new FormData();
    files.forEach(file => formData.append('files', file));
    
    const response = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    });
    
    const { fileUrls } = await response.json();
    
    // 2. 파일 URL과 함께 메시지 전송
    sendMessage(message, 'file', fileUrls[0], files[0].name);
  } else {
    sendMessage(message);
  }
};
```

### 2. 읽음 표시
메시지 읽음 상태 추적:

```tsx
// 백엔드에 추가 필요
socket.emit('mark_as_read', { roomId, messageId });
socket.on('message_read', ({ userId, messageId }) => {
  // UI 업데이트
});
```

### 3. 타이핑 인디케이터
사용자가 입력 중일 때 표시:

```tsx
socket.emit('typing_start', { roomId, userId });
socket.emit('typing_stop', { roomId, userId });
socket.on('user_typing', ({ userId, userName }) => {
  // "OOO님이 입력 중..." 표시
});
```

### 4. 메시지 페이지네이션
오래된 메시지 로드:

```tsx
const loadMoreMessages = async (before: string) => {
  const response = await fetch(`/api/chat/rooms/${roomId}/messages?before=${before}`);
  const oldMessages = await response.json();
  // 메시지 목록에 추가
};
```

## 트러블슈팅

### 연결이 안 될 때
1. JWT 토큰이 localStorage 또는 쿠키에 있는지 확인
2. `NEXT_PUBLIC_API_URL` 환경 변수 확인
3. 백엔드 서버가 실행 중인지 확인
4. 브라우저 콘솔에서 소켓 에러 확인

### 메시지가 전송되지 않을 때
1. `isJoined` 상태가 `true`인지 확인
2. 네트워크 탭에서 WebSocket 연결 확인
3. 백엔드 로그 확인

### 예약 방 입장 실패
- `INVALID_TOKEN`: JWT 토큰 만료 또는 무효
- `RESERVATION_NOT_FOUND`: 예약 정보 없음
- `NOT_IN_TIME_WINDOW`: 예약 시간이 아님
- `NOT_PARTICIPANT`: 참여자 권한 없음

## 테스트

```bash
# 개발 서버 실행
npm run dev

# 채팅 테스트 페이지 접속
http://localhost:3000/rooms/test-room-id
```

## 참고

- Socket.IO 문서: https://socket.io/docs/v4/
- Next.js 문서: https://nextjs.org/docs

