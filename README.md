# 이어줄게

전통문화의 단절을 3D 체험, AI 창작, 실제 방문 QR로 잇는 해커톤 MVP입니다.

공개 배포: https://ieojulge.vercel.app

## 구조

- `01_기획.md` - 문제 정의와 서비스 기획
- `02_개발.md` - 개발 범위와 구현 계획
- `03_PPT발표.md` - 발표 흐름
- `04_기타.md` - 후속 확장과 참고 내용
- `ieojulge/` - Next.js MVP 앱

## 로컬 실행

```bash
cd ieojulge
npm install
npm run dev
```

로컬 환경변수는 `ieojulge/.env.local`에만 둡니다.

```env
OPENAI_API_KEY=
OPENAI_IMAGE_MODEL=gpt-image-1
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_AUDIENCE_SITE_URL=
```

## QR 구분

- 로컬 시연: `/experience`
- 관객용 QR: `https://ieojulge.vercel.app/offline/cheomseongdae`
- Vercel 공개 배포에는 OpenAI API 키를 넣지 않으면 AI 생성은 백업 이미지로 동작합니다.

## Vercel 배포

GitHub 연결 시 Vercel의 Root Directory를 `ieojulge`로 설정합니다.

필요한 공개 환경변수:

```env
NEXT_PUBLIC_SITE_URL=https://배포주소
NEXT_PUBLIC_AUDIENCE_SITE_URL=https://배포주소
```

OpenAI 키는 발표 로컬 시연에서만 쓰는 것을 권장합니다.
