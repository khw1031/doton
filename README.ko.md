# Doton

[![Test and Publish](https://github.com/khw1031/doton/actions/workflows/publish.yml/badge.svg?branch=main)](https://github.com/khw1031/doton/actions/workflows/publish.yml)
[![npm version](https://img.shields.io/npm/v/doton.svg)](https://www.npmjs.com/package/doton)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Buy me a coffee](https://img.shields.io/badge/Buy%20me%20a%20coffee-Support-yellow.svg)](https://buymeacoffee.com/fkmgifhne)

[English](./README.md) | 한국어

개발 환경 구성을 쉽게 초기화할 수 있는 CLI 도구입니다.

## 기능

- 크로스 플랫폼 지원 (macOS, Linux, Windows)
- 대화형 CLI 인터페이스
- 다양한 구성 템플릿
- npx를 통한 간편한 설치 및 사용
- TypeScript로 작성됨

## 설치

별도의 설치가 필요 없습니다! npx를 사용하세요:

```shell
npx doton init
```

또는 전역 설치:

```shell
pnpm install -g doton
doton init
```

## 사용법

1. 초기화 도구 실행:
   ```shell
   npx doton init
   ```

2. 메뉴에서 구성 유형 선택:
   ```
   초기화할 구성 선택:
   > cursor - Cursor 구성
   > vscode - VSCode 구성
   ```

3. 구성을 저장할 대상 디렉토리 입력:
   ```
   대상 디렉토리 입력: ./my-config
   ```

4. 구성 파일이 지정한 디렉토리에 복사됩니다!

## 사용 가능한 구성

- **cursor** - Cursor 구성
  - ESLint 구성
  - Prettier 구성
  - TypeScript 설정
  - 에디터 설정
  - 권장 확장 프로그램

- **vscode** - Visual Studio Code 구성
  - ESLint 통합
  - 저장 시 자동 포맷팅
  - TypeScript SDK 경로
  - 에디터 설정 (줄 끝 문자, 후행 공백, 마지막 줄 개행)
  - 권장 확장 프로그램:
    - ESLint
    - Prettier
    - Code Spell Checker

## 개발

### 요구 사항

- Node.js 18.0.0 이상 (LTS 버전 권장)
- pnpm 10.0.0 이상

### 설치 및 설정

이 프로젝트는 패키지 관리자로 [pnpm](https://pnpm.io/)을 사용합니다. pnpm이 설치되어 있지 않은 경우 다음 명령어로 설치할 수 있습니다:

```bash
npm install -g pnpm
```

그런 다음 프로젝트를 설정합니다:

```bash
# 의존성 설치
pnpm install

# 프로젝트 빌드
pnpm build

# 개발 모드에서 실행 (변경 사항 자동 감지)
pnpm dev

# 테스트 실행
pnpm test

# 코드 린트
pnpm lint
```

## CI/CD

이 프로젝트는 지속적 통합 및 배포를 위해 GitHub Actions를 사용합니다.

### 풀 리퀘스트 검사

PR이 생성되거나 업데이트될 때 다음 검사가 자동으로 실행됩니다:
- 린팅
- 현재 LTS Node.js 버전(18.x, 20.x)에서의 테스트

### 게시 프로세스

코드가 `main` 브랜치에 병합되거나 푸시될 때:
1. 모든 것이 정상 작동하는지 확인하기 위한 테스트 실행
2. 테스트가 통과하면 npm에 대한 패키지 버전 확인
3. 현재 버전이 게시된 버전보다 적거나 같으면 패치 버전 업데이트 적용
4. 패키지가 빌드되어 npm에 게시됨

### 상태 배지

이 README 상단의 CI 상태 배지는 main 브랜치의 테스트 및 게시 워크플로우의 현재 상태를 보여줍니다. 이 저장소를 포크한 경우 README의 배지 URL을 사용자 이름으로 업데이트하세요.

## 사용자 정의 구성 추가하기

이 도구에서 사용할 자체 구성 파일을 추가하려면:

1. 프로젝트 루트에 구성 이름으로 새 디렉토리 생성
2. 해당 디렉토리 내에 구성 파일 추가
3. `src/index.ts`의 `configurations` 객체를 업데이트하여 새 구성 포함

## 라이선스

MIT

## 후원하기

이 도구가 도움이 되었다면, [커피 한 잔](https://buymeacoffee.com/fkmgifhne) 사주세요!
