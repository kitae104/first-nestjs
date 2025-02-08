import { TypeOrmModuleOptions } from "@nestjs/typeorm";

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'mysql', // 데이터베이스 종류
  host: 'localhost', // 데이터베이스 호스트
  port: 3306, // 데이터베이스 포트
  username: 'root', // 데이터베이스 사용자 이름
  password: '1234', // 데이터베이스 비밀번호
  database: 'board-app', // 데이터베이스 이름
  entities: [__dirname + '/../**/*.entity.{js,ts}'], // 엔티티 경로
  synchronize: true, // 앱 실행 시 데이터베이스 스키마를 자동으로 동기화할지 여부
};