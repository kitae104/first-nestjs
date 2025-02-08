import { Injectable, NotFoundException } from '@nestjs/common';
import { v1 as uuid } from 'uuid';
import { BoardStatus } from './board-status.enum';
import { CreateBoardDto } from './dto/create-board.dto';
import { BoardRepository } from './board.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Board } from './board.entity';

@Injectable() // 다른 모듈에서 이 서비스를 사용할 수 있도록 @Injectable() 데코레이터를 추가합니다.
export class BoardsService {
  constructor(
    @InjectRepository(BoardRepository)  // BoardRepository를 주입합니다.
    private boardRepository: BoardRepository, // BoardRepository를 주입합니다.
  ) {} 

  // // 모든 게시물을 가져오기
  // getAllBoards(): Board[] {
  //   return this.boards;
  // }

  // 게시물 생성하기
  createBoard(createBoardDto: CreateBoardDto): Promise<Board> {
    return this.boardRepository.createBoard(createBoardDto);
  }

  // 특정 id에 해당하는 게시물 가져오기
  async getBoardById(id: number): Promise<Board> {
    const found = await this.boardRepository.findOne({ where: { id } }); // id에 해당하는 게시물을 찾습니다.
    if (!found) {
      throw new NotFoundException(`id가 ${id}인 게시물을 찾을 수 없습니다.`); // 게시물을 찾지 못했을 때 에러를 발생시킵니다.
    }
    return found;
  }
  // // 특정 id에 해당하는 게시물 삭제하기
  // deleteBoard(id: string): void {
  //   const found = this.getBoardById(id); // id에 해당하는 게시물 확인
  //   this.boards = this.boards.filter((board) => board.id !== found.id); // id가 일치하지 않는 게시물만 남기고 필터링합니다.
  // }
  // // 게시물 상태 변경하기
  // updateBoardStatus(id: string, status: BoardStatus): Board {
  //   const board = this.getBoardById(id); // id에 해당하는 게시물을 가져옵니다.
  //   board.status = status; // 게시물의 상태를 변경합니다.
  //   return board;
  // }
}
