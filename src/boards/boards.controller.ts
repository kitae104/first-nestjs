import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
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
  // boardsService: BoardsService;
  // constructor( boardsService: BoardsService) {
  //   this.boardsService = boardsService;
  // }  // 아래와 같은 코드(축약 형태) 
  constructor(private boardsService: BoardsService) {} // BoardsService를 주입합니다.
  
  // GET /boards - 모든 게시물 가져오기
  @Get('/')
  getAllBoards(): Promise<Board[]> {
    return this.boardsService.getAllBoards();
  }
  
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

  // DELETE /boards/:id - 특정 id에 해당하는 게시물 삭제하기
  @Delete('/:id')
  deleteBoard(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.boardsService.deleteBoard(id);
  }

  // Patch /boards/:id/status - 게시물 상태 변경하기
  @Patch('/:id/status')
  updateBoardStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body('status', BoardStatusValidationPipe) status: BoardStatus,
  ): Promise<Board> {
    return this.boardsService.updateBoardStatus(id, status);
  }
}
