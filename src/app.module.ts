import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { BoardsModule } from './boards/boards.module';
import { typeOrmConfig } from './configs/typeorm.config';


@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig), // TypeOrmModule을 AppModule에 추가합니다.
    BoardsModule, AuthModule
  ],
})
export class AppModule {}
