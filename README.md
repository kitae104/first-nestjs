# NestJS 시작하기

1. NestJS CLI 설치

- npm install -g @nestjs/cli

2. 프로젝트 생성하기

- nest new first-nestjs

3. 실행

- npm run start:dev (개발중)
- npm run start

4. 모듈 생성
- nest g module board
- nest g module auth

5. 컨트롤러 생성
- nest g controller boards --no-spec
- nest g controller auth --no-spec

6. 서비스 생성
- nest g service boards --no-spec
- nest g service auth --no-spec

7. 모델 추가 
- 직접 파일로 생성 
- board.model.ts

8. 추가 모듈 설치 
- npm install --save uuid
- npm install --save class-validator class-transformer
- npm install --save @nestjs/typeorm typeorm mysql2

# Backend 구성 
1. Entity 생성 
- user.entity.ts 

2. Repository 생성 
- user.repository.ts