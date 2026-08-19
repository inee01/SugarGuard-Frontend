# SugarGuard

> 식후 15분, 당신의 컨디션을 지켜드립니다.

SugarGuard는 식사 후 사용자의 위치, 시간대, 날씨 등의 환경 정보를 바탕으로
AI가 현재 상황에 적합한 15분 활동을 추천하고 실행까지 연결하는 서비스입니다.

---

## 주요 기능

- 위치·시간대·날씨 기반 환경 정보 인식
- AI 기반 맞춤 활동 추천
- 스쿼트 / 걷기 등 15분 활동 제공
- 15분 활동 타이머
- GPS 기반 걷기 거리 측정
- 활동 전·후 졸림 정도 기록 및 비교
- 활동 기록을 활용한 개인화 추천

---

## 서비스 흐름

1. SugarGuard 접속
2. `밥 먹었어요!` 버튼 선택
3. 사용자 위치 및 환경 정보 인식
4. 현재 상황에 맞는 활동 추천
5. 활동 전 졸림 정도 기록
6. 추천받은 15분 활동 진행
7. 활동 완료
8. 활동 후 졸림 정도 기록
9. 활동 전·후 결과 확인

---

## Frontend Tech Stack

- React
- JavaScript
- CSS
- Geolocation API
- REST API
- Git / GitHub
- Vercel

---

## 프로젝트 실행 방법

### 1. Repository Clone

터미널에서 아래 명령어를 실행합니다.

```bash
git clone https://github.com/inee01/SugarGuard-Frontend.git
```

### 2. 프로젝트 폴더로 이동

```bash
cd SugarGuard-Frontend
```

### 3. 패키지 설치

```bash
npm install
```

### 4. 개발 서버 실행

```bash
npm start
```

실행 후 브라우저에서 아래 주소로 접속합니다.

```text
http://localhost:3000
```

### 5. 프로덕션 빌드

배포용 빌드가 필요한 경우 아래 명령어를 실행합니다.

```bash
npm run build
```

빌드가 완료되면 `build` 폴더가 생성됩니다.

---

## 배포

Frontend는 Vercel을 통해 배포되어 있습니다.

https://sugar-guard-frontend.vercel.app

---

## 사용 시 참고사항

- 위치 기반 기능을 사용하기 위해 브라우저의 위치 권한 허용이 필요합니다.
- GPS 정확도와 사용 환경에 따라 측정되는 이동 거리에 차이가 발생할 수 있습니다.
- 모바일 환경에서 위치 기반 활동을 테스트할 때는 위치 서비스가 활성화되어 있어야 합니다.

---

## SugarGuard가 해결하고자 하는 것

SugarGuard는 단순히 활동을 추천하는 데 그치지 않고,

**추천 → 실행 → 결과 측정 → 개인화**

로 이어지는 구조를 통해 사용자가 식후 15분의 건강한 행동을 일상적인 습관으로 만드는 것을 목표로 합니다.