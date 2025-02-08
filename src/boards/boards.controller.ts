import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { BoardStatus } from './board-status.enum';
import { BoardsService } from './boards.service';
import { CreateBoardDto } from './dto/create-board.dto';
import { BoardStatusValidationPipe } from './pipes/board-status-validation.pipe';
import { Board } from './board.entity';

@Controller('boards')
export class BoardsController {
  // // boardsService: BoardsService;
  // // constructor( boardsService: BoardsService) {
  // //   this.boardsService = boardsService;
  // // }
  constructor(private boardsService: BoardsService) {} // BoardsService를 주입합니다.
  // // GET /boards - 모든 게시물 가져오기
  // @Get('/')
  // getAllBoards(): Board[] {
  //   return this.boardsService.getAllBoards();
  // }
  
  // POST /boards - 게시물 생성하기
  @Post('/')
  @UsePipes(ValidationPipe) // ValidationPipe를 사용하여 유효성 검사를 수행합니다.(핸들러 레벨)
  createBoard(@Body() createBoardDto: CreateBoardDto): Promise<Board> {
    return this.boardsService.createBoard(createBoardDto);
  }
  
  // GET /boards/:id - 특정 id에 해당하는 게시물 가져오기
  @Get('/:id')
  getBoardById(@Param('id') id: number): Promise<Board> {
    return this.boardsService.getBoardById(id);
  }

  // // DELETE /boards/:id - 특정 id에 해당하는 게시물 삭제하기
  // @Delete('/:id')
  // deleteBoard(@Param('id') id: string): void {
  //   this.boardsService.deleteBoard(id);
  // }
  // // Patch /boards/:id/status - 게시물 상태 변경하기
  // @Patch('/:id/status')
  // updateBoardStatus(
  //   @Param('id') id: string,
  //   @Body('status', BoardStatusValidationPipe) status: BoardStatus,
  // ): Board {
  //   return this.boardsService.updateBoardStatus(id, status);
  // }
}
