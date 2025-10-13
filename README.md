<div align="center">

# 🤝 Konnect

### 멘토와 멘티를 연결하는 1:1 실시간 멘토링 플랫폼

멘토링 예약부터 화상채팅, 결제까지 한 곳에서 관리하는 올인원 멘토링 솔루션

[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Next.js](https://img.shields.io/badge/Next.js-000000?style=flat-square&logo=next.js&logoColor=white)](https://nextjs.org/)
[![NestJS](https://img.shields.io/badge/NestJS-E0234E?style=flat-square&logo=nestjs&logoColor=white)](https://nestjs.com/)
[![Socket.IO](https://img.shields.io/badge/Socket.IO-010101?style=flat-square&logo=socket.io&logoColor=white)](https://socket.io/)

[데모 보기](#) | [API 문서](#) | [기술 블로그](#)

</div>

---

## 📖 프로젝트 소개

**Konnect**는 멘토와 멘티를 실시간으로 연결하는 1:1 멘토링 플랫폼입니다.

복잡한 멘토링 프로세스를 하나의 플랫폼에서 해결할 수 있도록 설계되었으며,  
예약 관리, 실시간 화상/채팅 세션, 결제, 리뷰까지 전체 멘토링 라이프사이클을 지원합니다.

### 💡 주요 특징

- 🎯 **간편한 멘토 검색 및 예약** - 분야별 멘토 필터링, 실시간 스케줄 확인
- 💬 **실시간 커뮤니케이션** - Socket.IO 기반 채팅 + WebRTC 화상 통화
- 💳 **안전한 결제 시스템** - Toss Payments 연동 에스크로 결제
- 🔔 **스마트 알림** - 예약, 세션 시작, 리뷰 요청 등 실시간 푸시 알림
- 📝 **아티클 & 커뮤니티** - 멘토의 지식 공유 및 커뮤니티 기능
- 👨‍💼 **관리자 대시보드** - 사용자, 멘토링, 결제 통합 관리

---

## 🎨 미리보기

![preview](./docs/preview.png)

<details>
<summary>📱 더 많은 스크린샷 보기</summary>

- 메인 페이지
- 멘토 검색
- 예약 캘린더
- 채팅 & 화상 세션
- 결제 화면

</details>

---

## 🛠️ 기술 스택

### Frontend

| Category | Technologies |
|----------|-------------|
| **Framework** | ![Next.js](https://img.shields.io/badge/Next.js_15-000000?style=flat-square&logo=next.js&logoColor=white) ![React 19](https://img.shields.io/badge/React_19-61DAFB?style=flat-square&logo=react&logoColor=black) |
| **Language** | ![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat-square&logo=typescript&logoColor=white) |
| **Styling** | ![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white) ![Framer Motion](https://img.shields.io/badge/Framer_Motion-0055FF?style=flat-square&logo=framer&logoColor=white) |
| **State Management** | ![React Query](https://img.shields.io/badge/React_Query-FF4154?style=flat-square&logo=react-query&logoColor=white) ![Zustand](https://img.shields.io/badge/Zustand-000000?style=flat-square) |
| **Form** | ![React Hook Form](https://img.shields.io/badge/React_Hook_Form-EC5990?style=flat-square&logo=reacthookform&logoColor=white) ![Zod](https://img.shields.io/badge/Zod-3E67B1?style=flat-square) |
| **Real-time** | ![Socket.IO](https://img.shields.io/badge/Socket.IO-010101?style=flat-square&logo=socket.io&logoColor=white) ![WebRTC](https://img.shields.io/badge/WebRTC-333333?style=flat-square&logo=webrtc&logoColor=white) |
| **Auth** | ![NextAuth.js](https://img.shields.io/badge/NextAuth.js-000000?style=flat-square&logo=next.js&logoColor=white) |
| **Payment** | ![Toss Payments](https://img.shields.io/badge/Toss_Payments-0064FF?style=flat-square) |
| **Editor** | ![TipTap](https://img.shields.io/badge/TipTap-000000?style=flat-square) |
| **Notification** | ![Firebase](https://img.shields.io/badge/Firebase_FCM-FFCA28?style=flat-square&logo=firebase&logoColor=black) |

### Backend

| Category | Technologies |
|----------|-------------|
| **Framework** | ![NestJS](https://img.shields.io/badge/NestJS_10-E0234E?style=flat-square&logo=nestjs&logoColor=white) ![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=node.js&logoColor=white) |
| **Language** | ![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat-square&logo=typescript&logoColor=white) |
| **ORM** | ![TypeORM](https://img.shields.io/badge/TypeORM-FE0902?style=flat-square) ![Mongoose](https://img.shields.io/badge/Mongoose-880000?style=flat-square&logo=mongoose&logoColor=white) |
| **Database** | ![MySQL](https://img.shields.io/badge/MySQL-4479A1?style=flat-square&logo=mysql&logoColor=white) ![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=flat-square&logo=mongodb&logoColor=white) ![Redis](https://img.shields.io/badge/Redis-DC382D?style=flat-square&logo=redis&logoColor=white) |
| **Real-time** | ![Socket.IO](https://img.shields.io/badge/Socket.IO-010101?style=flat-square&logo=socket.io&logoColor=white) ![WebRTC](https://img.shields.io/badge/WebRTC-333333?style=flat-square&logo=webrtc&logoColor=white) |
| **Auth** | ![JWT](https://img.shields.io/badge/JWT-000000?style=flat-square&logo=json-web-tokens&logoColor=white) ![Passport](https://img.shields.io/badge/Passport-34E27A?style=flat-square&logo=passport&logoColor=white) ![OAuth](https://img.shields.io/badge/OAuth_2.0-EB5424?style=flat-square) |
| **API Docs** | ![Swagger](https://img.shields.io/badge/Swagger-85EA2D?style=flat-square&logo=swagger&logoColor=black) |
| **Email** | ![Nodemailer](https://img.shields.io/badge/Nodemailer-0072C6?style=flat-square) |
| **Notification** | ![Firebase Admin](https://img.shields.io/badge/Firebase_Admin-FFCA28?style=flat-square&logo=firebase&logoColor=black) |
| **Scheduling** | ![Cron](https://img.shields.io/badge/Cron_Jobs-000000?style=flat-square) |

### Infrastructure & DevOps

| Category | Technologies |
|----------|-------------|
| **Cloud** | ![AWS](https://img.shields.io/badge/AWS-232F3E?style=flat-square&logo=amazon-aws&logoColor=white) (EC2, RDS) |
| **Web Server** | ![Nginx](https://img.shields.io/badge/Nginx-009639?style=flat-square&logo=nginx&logoColor=white) |
| **Process Manager** | ![PM2](https://img.shields.io/badge/PM2-2B037A?style=flat-square&logo=pm2&logoColor=white) |
| **Version Control** | ![Git](https://img.shields.io/badge/Git-F05032?style=flat-square&logo=git&logoColor=white) ![GitHub](https://img.shields.io/badge/GitHub-181717?style=flat-square&logo=github&logoColor=white) |

---

## ✨ 주요 기능

### 👩‍🏫 멘토링 기능

- **멘토 프로필 관리**
  - 전문 분야, 경력, 소개, 가격 설정
  - 포트폴리오 및 인증서 업로드
  - 리뷰 및 평점 시스템

- **스케줄 관리**
  - 캘린더 기반 가능 시간 설정
  - 실시간 예약 확인 및 승인/거절
  - 자동 시간대 변환

- **예약 시스템**
  - 실시간 가능 시간 조회
  - 즉시 예약 & 승인 대기 예약
  - 예약 취소 및 환불 정책

### 💬 실시간 채팅 & 화상채팅

- **채팅 시스템** (Socket.IO)
  - 1:1 실시간 메시지
  - 파일 첨부 (이미지, 문서)
  - 메시지 히스토리 (MongoDB)
  - 커서 기반 무한스크롤
  - 타이핑 인디케이터 (예정)

- **화상 채팅** (WebRTC)
  - P2P 화상 통화
  - 화면 공유 (예정)
  - 네트워크 품질 모니터링

### 🔔 알림 시스템

- **인앱 알림** (Socket.IO)
  - 실시간 알림 푸시
  - 알림 카테고리별 필터링
  - 읽음/안 읽음 상태 관리

- **푸시 알림** (Firebase FCM)
  - 모바일/웹 푸시 알림
  - 예약 확정, 세션 시작 알림
  - 리뷰 요청, 결제 알림

- **이메일 알림** (Nodemailer)
  - 예약 확인 메일
  - 세션 리마인더
  - 영수증 발송

### 💳 결제 시스템

- **Toss Payments 연동**
  - 신용카드, 계좌이체, 간편결제
  - 에스크로 결제 (멘토링 완료 후 정산)
  - 결제 실패 시 자동 재시도
  - 부분 환불 지원

- **정산 시스템**
  - 멘토 수익 대시보드
  - 자동 정산 스케줄링
  - 세금계산서 발행

### 📝 아티클 & 커뮤니티

- **아티클 작성** (TipTap)
  - 마크다운 지원 에디터
  - 이미지 업로드 & 리사이징
  - 태그 및 카테고리 분류
  - 좋아요 & 북마크

- **댓글 시스템**
  - 대댓글 지원
  - 실시간 댓글 알림
  - 신고 기능

### 🧑‍💼 관리자 페이지

- **대시보드**
  - 주요 지표 모니터링 (예약, 매출, 사용자)
  - 실시간 통계 차트

- **사용자 관리**
  - 사용자 검색 및 필터링
  - 계정 정지/해제
  - 멘토 승인 관리

- **컨텐츠 관리**
  - 아티클 검토 및 관리
  - 신고 처리
  - 공지사항 작성

---

## 🏗️ 시스템 아키텍처

```text
┌─────────────────────────────────────────────────────────────────┐
│                          Client Layer                            │
├─────────────────────────────────────────────────────────────────┤
│                                                                   │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐          │
│  │   Next.js    │  │ Socket.IO    │  │   WebRTC     │          │
│  │  (SSR/CSR)   │  │   Client     │  │  (P2P Call)  │          │
│  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘          │
│         │                 │                  │                   │
│         │                 │                  │                   │
└─────────┼─────────────────┼──────────────────┼───────────────────┘
          │                 │                  │
          │  REST API       │  WebSocket       │  Signaling
          │  (HTTP/HTTPS)   │  (Socket.IO)     │
          │                 │                  │
┌─────────┼─────────────────┼──────────────────┼───────────────────┐
│         ▼                 ▼                  ▼                   │
│  ┌─────────────────────────────────────────────────────────┐    │
│  │                    Nginx (Reverse Proxy)                 │    │
│  │           SSL/TLS Termination + Load Balancing           │    │
│  └─────────────────────────────────────────────────────────┘    │
│                              │                                   │
│         ┌────────────────────┼────────────────────┐             │
│         ▼                    ▼                    ▼             │
│  ┌─────────────┐      ┌─────────────┐      ┌─────────────┐    │
│  │   NestJS    │      │  Socket.IO  │      │   WebRTC    │    │
│  │ API Server  │      │   Gateway   │      │  Signaling  │    │
│  │             │      │  (Chat/Noti)│      │   Server    │    │
│  └──────┬──────┘      └──────┬──────┘      └─────────────┘    │
│         │                    │                                  │
│         │                    │                                  │
│  Backend Layer (AWS EC2)                                        │
├─────────┼────────────────────┼──────────────────────────────────┤
│         │                    │                                  │
│         ▼                    ▼                                  │
│  ┌─────────────────────────────────────────────────┐           │
│  │           Data Access & Caching Layer            │           │
│  ├─────────────┬──────────────┬─────────────────────┤           │
│  │   TypeORM   │   Mongoose   │   Redis (ioredis)   │           │
│  └──────┬──────┴──────┬───────┴──────┬──────────────┘           │
│         │             │              │                          │
│         ▼             ▼              ▼                          │
│  ┌────────────┐ ┌────────────┐ ┌────────────┐                 │
│  │   MySQL    │ │  MongoDB   │ │   Redis    │                 │
│  │  (AWS RDS) │ │ (Chat/Log) │ │  (Cache)   │                 │
│  │            │ │            │ │            │                 │
│  │ • Users    │ │ • Messages │ │ • Session  │                 │
│  │ • Mentors  │ │ • Notifi.  │ │ • Queue    │                 │
│  │ • Reserv.  │ │ • Logs     │ │ • Lock     │                 │
│  │ • Payments │ │            │ │            │                 │
│  └────────────┘ └────────────┘ └────────────┘                 │
│                                                                  │
│  Database Layer (AWS RDS + MongoDB Atlas)                       │
└──────────────────────────────────────────────────────────────────┘

External Services:
┌────────────────────────────────────────────────────────────────┐
│  • Toss Payments API      (결제)                              │
│  • Firebase FCM           (푸시 알림)                         │
│  • OAuth Providers        (Google, Kakao, Naver)             │
│  • AWS S3                 (파일 스토리지)                     │
│  • SMTP Server            (이메일 발송)                       │
└────────────────────────────────────────────────────────────────┘
```

### 📊 데이터베이스 구조

```text
MySQL (관계형 데이터)
├── users              # 사용자 정보
├── mentors            # 멘토 프로필
├── mentoring_schedules # 멘토 스케줄
├── mentoring_reservations # 예약 정보
├── mentoring_sessions # 세션 기록
├── payments           # 결제 내역
├── reviews            # 리뷰
├── articles           # 아티클
└── comments           # 댓글

MongoDB (비관계형 데이터)
├── chatMessages       # 채팅 메시지
├── chatRooms          # 채팅방
├── notifications      # 알림
└── activityLogs       # 활동 로그

Redis (캐싱 & 세션)
├── user:sessions      # 사용자 세션
├── cache:*            # API 캐시
├── queue:emails       # 이메일 큐
└── lock:*             # 분산 락
```

---

## 🚀 설치 및 실행 가이드

### 사전 요구사항

- **Node.js** v20 이상
- **npm** 또는 **yarn**
- **MySQL** 8.0 이상
- **MongoDB** 6.0 이상
- **Redis** 7.0 이상


## 📂 프로젝트 구조

```text
konnect/
├── backend/                    # NestJS 백엔드
│   ├── src/
│   │   ├── admin/              # 관리자 기능
│   │   ├── auth/               # 인증/인가
│   │   ├── users/              # 사용자 관리
│   │   ├── mentors/            # 멘토 관리
│   │   ├── reservation/        # 예약 시스템
│   │   ├── session/            # 세션 관리
│   │   ├── chat/               # 채팅 (REST API)
│   │   ├── realtime/           # 실시간 통신 (Socket.IO)
│   │   │   ├── chat/           # 채팅 게이트웨이
│   │   │   └── notification/   # 알림 게이트웨이
│   │   ├── payment/            # 결제 시스템
│   │   ├── article/            # 아티클
│   │   ├── review/             # 리뷰
│   │   ├── notification/       # 알림
│   │   ├── mail/               # 이메일
│   │   ├── fcm/                # Firebase FCM
│   │   ├── scheduler/          # 크론 작업
│   │   ├── entities/           # TypeORM 엔티티
│   │   ├── schema/             # Mongoose 스키마
│   │   ├── common/             # 공통 모듈
│   │   └── main.ts             # 진입점
│   ├── test/                   # E2E 테스트
│   └── package.json
│
├── frontend/                   # Next.js 프론트엔드
│   ├── src/
│   │   ├── app/                # App Router 페이지
│   │   │   ├── (auth)/         # 인증 페이지
│   │   │   ├── (main)/         # 메인 페이지
│   │   │   ├── (mentoring)/    # 멘토링 페이지
│   │   │   └── admin/          # 관리자 페이지
│   │   ├── components/         # React 컴포넌트
│   │   │   ├── chat/           # 채팅 컴포넌트
│   │   │   ├── video/          # 화상 컴포넌트
│   │   │   └── ...
│   │   ├── hooks/              # 커스텀 훅
│   │   │   ├── query/          # React Query 훅
│   │   │   ├── useChatSocket.ts
│   │   │   └── ...
│   │   ├── libs/               # API 클라이언트
│   │   ├── stores/             # Zustand 스토어
│   │   ├── types/              # TypeScript 타입
│   │   ├── utils/              # 유틸리티 함수
│   │   └── styles/             # 전역 스타일
│   ├── public/                 # 정적 파일
│   └── package.json
│
└── README.md
```

---

## 🧪 테스트

### Backend 테스트

```bash
cd backend

# 단위 테스트
npm run test

# E2E 테스트
npm run test:e2e

# 커버리지
npm run test:cov
```

### Frontend 테스트

```bash
cd frontend

# 단위 테스트
npm run test

# 커버리지
npm run test:coverage
```