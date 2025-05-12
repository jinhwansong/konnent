🎓 MentorMatch
<div align="center"> 실시간 화상 멘토링과 채팅이 가능한 멘토-멘티 매칭 플랫폼 전문 분야의 멘토들과 실시간으로 소통하며 학습할 수 있는 환경을 제공합니다. </div>
🔗 Links
배포 주소: 배포 진행 중

GitHub Repository: MentorMatch Repository

📋 Project Overview
개발 기간: 2024.08 ~ 진행중

개발 인원: 1인 풀스택 개발

주요 기능:

💬 실시간 화상 멘토링 (WebRTC)

💡 실시간 채팅 (Socket.IO)

🔍 멘토-멘티 매칭 시스템

💳 결제 시스템 (PG사 API 연동)

📢 실시간 알림 시스템 (Firebase Cloud Messaging)

🌟 Why MentorMatch?
🚀 실시간 커뮤니케이션 최적화: WebRTC 기반의 끊김 없는 화상 통화

💡 직관적인 매칭 시스템: 멘토와 멘티의 성향, 전문 분야 기반 추천

💳 안전한 결제 시스템: PG사 API 연동으로 안전하고 신뢰성 높은 결제 시스템

🔔 다양한 알림 방식: Socket.IO와 Firebase Cloud Messaging으로 실시간 알림

⚡ 고성능 데이터 관리: MySQL, MongoDB, Redis로 다양한 데이터 저장소 분리

💪 Challenges & Solutions
| 문제                  | 해결 방법                        | 결과                    |
| ------------------- | ---------------------------- | --------------------- |
| ⚡ **실시간 커뮤니케이션 끊김** | WebRTC와 WebSocket 최적화        | 안정적인 화상 채팅 제공         |
| 🔒 **안전한 결제 시스템**   | PG사 API 연동                   | 안전하고 신뢰성 있는 결제 시스템 구축 |
| 📊 **데이터 효율성 부족**   | MySQL, MongoDB, Redis로 분리 저장 | 성능 최적화 및 데이터 관리 개선    |
| 🚀 **성능 최적화**       | 이미지 WebP 변환, lazy loading    | 페이지 로딩 속도 30% 향상      |


📚 Tech Stack
💡 Front-end
<div align="center"> <img src="https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white"> <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white"> <img src="https://img.shields.io/badge/Sass-CC6699?style=for-the-badge&logo=sass&logoColor=white"> <img src="https://img.shields.io/badge/ReactQuery-FF4154?style=for-the-badge&logo=reactquery&logoColor=white"> <img src="https://img.shields.io/badge/Socket.IO-010101?style=for-the-badge&logo=socket.io&logoColor=white"> <img src="https://img.shields.io/badge/Zustand-brown?style=for-the-badge&logo=zustand&logoColor=white"> </div>
💡 Back-end
<div align="center"> <img src="https://img.shields.io/badge/NestJS-E0234E?style=for-the-badge&logo=nestjs&logoColor=white"> <img src="https://img.shields.io/badge/TypeORM-262627?style=for-the-badge&logo=typeorm&logoColor=white"> <img src="https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=mysql&logoColor=white"> <img src="https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white"> <img src="https://img.shields.io/badge/Redis-DC382D?style=for-the-badge&logo=redis&logoColor=white"> <img src="https://img.shields.io/badge/Passport-34E27A?style=for-the-badge&logo=passport&logoColor=white"> </div>
💡 DevOps & Tools
<div align="center"> <img src="https://img.shields.io/badge/Amazon AWS-232F3E?style=for-the-badge&logo=amazonaws&logoColor=white"> <img src="https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=git&logoColor=white"> <img src="https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white"> </div>
📷 Screenshots
| 메인 페이지                                                | 멘토링 채팅                                                | 결제 시스템                                                |
| ----------------------------------------------------- | ----------------------------------------------------- | ----------------------------------------------------- |
| <img src="./frontend/src/asset/main.png" width="250"> | <img src="./frontend/src/asset/chat.png" width="250"> | <img src="./frontend/src/asset/sell.png" width="250"> |


🚀 Future Improvements
✅ 실시간 화상 통화 개선: WebRTC 성능 최적화

✅ 알림 시스템 개선: Socket.IO → Firebase Cloud Messaging (FCM) 마이그레이션

✅ 대시보드 UI 개선: 더 직관적인 멘토 관리 시스템 제공

✅ 다국어 지원: 영어/한국어 등 다국어 설정 지원

📌 Getting Started
# 1. 클론
git clone https://github.com/jinhwansong/konnent.git

# 2. 디렉토리 이동
cd konnent

# 3. 패키지 설치
npm install

# 4. 개발 서버 실행
npm run dev

📌 Directory Structure
├── frontend
│   └── src
│       ├── components    # UI 컴포넌트
│       ├── hooks         # React Query 커스텀 훅
│       ├── pages         # 페이지 파일 (Next.js 라우팅)
│       └── styles        # SCSS 스타일 파일
└── backend
    └── src
        ├── controllers   # API 엔드포인트
        ├── services      # 비즈니스 로직
        └── entities      # TypeORM 엔티티

    └── src
        ├── controllers   # API 엔드포인트
        ├── services      # 비즈니스 로직
        └── entities      # TypeORM 엔티티
