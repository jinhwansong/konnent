<div align="center">
  <h1>🎓 MentorMatch</h1>
</div>
<div align="center">
  실시간 화상 멘토링과 채팅이 가능한 멘토-멘티 매칭 플랫폼입니다. <br/>
  전문 분야의 멘토들과 실시간으로 소통하며 학습할 수 있는 환경을 제공합니다.
</div>
<br/>
<div align="center">
  <h2>🔗 Links</h2>
</div>
<ul>
  <li><strong>배포 주소</strong>: `배포 진행 중`</li>
  <li><strong>Github</strong>: [[Repository Link]](https://github.com/jinhwansong/konnent)</li>
</ul>
<div align="center">
  <h2>📋 Project Overview</h2>
</div>
<ul>
  <li><strong>개발 기간</strong>: 2024.08 ~ 진행중</li>
  <li><strong>개발 인원</strong>: 1인 풀스택 개발</li>
  <li><strong>주요 기능</strong>: 실시간 화상 멘토링, 채팅, 멘토-멘티 매칭, 결제 시스템</li>
</ul>
<div align="center">
  <h2>💪 Challenges & Solutions</h2>
</div>
<ul>
  <li><strong>실시간 커뮤니케이션 구현</strong>: WebRTC와 WebSocket을 활용하여 끊김 없는 화상 멘토링과 채팅 서비스 구현</li>
  <li><strong>안전한 결제 시스템</strong>: PG사 API 연동으로 안전하고 신뢰성 있는 결제 프로세스 구축</li>
  <li><strong>효율적인 데이터 관리</strong>: MySQL, MongoDB, Redis를 활용한 데이터 특성에 따른 최적화된 저장소 설계</li>
  <li><strong>실시간 알림 시스템</strong>: Socket.io를 활용한 실시간 알림으로 사용자 경험 향상</li>
</ul>

<div align=center><h1>📚 Front-end Stacks</h1></div>
<div align=center> 
  <img src="https://img.shields.io/badge/html5-E34F26?style=for-the-badge&logo=html5&logoColor=white"> 
  <img src="https://img.shields.io/badge/sass-CC6699?style=for-the-badge&logo=sass&logoColor=white">
  <img src="https://img.shields.io/badge/nextdotjs-000000?style=for-the-badge&logo=nextdotjs&logoColor=white"> 
  <img src="https://img.shields.io/badge/typescript-3178C6?style=for-the-badge&logo=typescript&logoColor=white">
  <img src="https://img.shields.io/badge/zustand-brown?style=for-the-badge&logo=zustand&logoColor=white">
  <img src="https://img.shields.io/badge/tanstack query-FF4154?style=for-the-badge&logo=reactquery&logoColor=white">
  <img src="https://img.shields.io/badge/websocket-010101?style=for-the-badge&logo=socketdotio&logoColor=white">
  <br>
</div>
<div align=center><h1>📚 Back-end Stacks</h1></div>
<div align=center>
  <img src="https://img.shields.io/badge/nestjs-E0234E?style=for-the-badge&logo=nestjs&logoColor=white">
  <img src="https://img.shields.io/badge/typescript-3178C6?style=for-the-badge&logo=typescript&logoColor=white">
  <img src="https://img.shields.io/badge/passport-34E27A?style=for-the-badge&logo=passport&logoColor=white">
  <img src="https://img.shields.io/badge/typeorm-262627?style=for-the-badge&logo=typeorm&logoColor=white">
  <img src="https://img.shields.io/badge/mysql-4479A1?style=for-the-badge&logo=mysql&logoColor=white">
  <img src="https://img.shields.io/badge/mongodb-47A248?style=for-the-badge&logo=mongodb&logoColor=white">
  <img src="https://img.shields.io/badge/redis-DC382D?style=for-the-badge&logo=redis&logoColor=white">
  <br>
</div>
<div align=center><h1>📚 DevOps & Tools</h1></div>
<div align=center>
  <img src="https://img.shields.io/badge/amazon aws-232F3E?style=for-the-badge&logo=amazonaws&logoColor=white">
  <img src="https://img.shields.io/badge/git-F05032?style=for-the-badge&logo=git&logoColor=white">
  <img src="https://img.shields.io/badge/github-181717?style=for-the-badge&logo=github&logoColor=white">
  <br>
</div>
<div align="center">
  <h2>📷 Screenshots</h2>
</div>
<ul>
  <li><strong>메인 페이지</strong></li>
  <img src="./frontend/src/asset/main.png" alt="메인 페이지" width="700">
  <br/>
  <li><strong>멘토링 채팅</strong></li>
  <img src="./frontend/src/asset/chat.png" alt="화상채팅" width="700">
  <br/>
  <li><strong>결제 시스템</strong></li>
  <img src="./frontend/src/asset/sell.png" alt="결제" width="700">
</ul>
<div align="center">
  <h2>🔧 Troubleshooting</h2>
</div>
<ul>
  <li>
    <strong>세션 관리 문제</strong>
    <p>문제: AWS 배포 환경에서 사용자 인증 세션이 유지되지 않는 문제 발생</p>
    <p>원인: 세션 쿠키의 이름이 명시적으로 지정되지 않아 환경에 따라 다르게 생성됨</p>
    <p>해결: Passport와 express-session에서 세션 쿠키 이름을 명시적으로 설정하고 도메인 설정 최적화</p>
    <p>결과: 안정적인 세션 관리와 인증 시스템 구현</p>
  </li>
  <li>
    <strong>웹 성능 최적화</strong> 
    <p>문제: 이미지 용량으로 인한 낮은 Lighthouse 성능 점수(57점)</p>
    <p>해결 방법:</p>
    <ul>
      <li>프론트엔드: 이미지 해상도 및 크기 최적화, lazy loading 적용</li>
      <li>백엔드: 이미지 형식을 WebP로 변환하는 미들웨어 구현</li>
    </ul>
    <p>결과: Lighthouse 성능 점수 70점으로 향상 및 페이지 로딩 속도 개선</p>
  </li>
</ul>
<div align="center">
  <h2>🚀 Future Improvements</h2>
</div>
<ul>
  <li>
    <strong>실시간 화상 통화 구현</strong>
    <p>현재 개발 중인 화상 통화 기능을 WebRTC를 활용하여 구현할 예정입니다. 멘토와 멘티 간의 더 효과적인 커뮤니케이션을 위한 핵심 기능으로 추가될 것입니다.</p>
  </li>
  <li>
    <strong>알림 시스템 개선</strong>
    <p>현재 Socket.io 기반으로 구현된 실시간 알림 시스템을 Firebase Cloud Messaging(FCM)으로 마이그레이션할 계획입니다. 이를 통해 서버 부하를 줄이고, 앱이 백그라운드 상태일 때도 알림을 받을 수 있도록 개선할 예정입니다.</p>
  </li>
</ul>