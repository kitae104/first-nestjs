import { Module } from '@nestjs/common';
import { BoardsController } from './boards.controller';
import { BoardsService } from './boards.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BoardRepository } from './board.repository';
import { Board } from './board.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Board]), // TypeOrmModule을 BoardsModule에 추가합니다.
  ], // 다른 모듈을 import할 때 사용합니다.
  controllers: [BoardsController], // BoardsController를 controllers에 등록 - nest g controller boards --no-spec
  providers: [BoardsService, BoardRepository]  // BoardsService를 providers에 등록 - nest g service boards --no-spec
})
export class BoardsModule {}
