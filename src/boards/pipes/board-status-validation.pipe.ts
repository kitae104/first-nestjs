import { BadRequestException, PipeTransform } from '@nestjs/common';
import { BoardStatus } from '../board-status.enum';

export class BoardStatusValidationPipe implements PipeTransform {
  readonly StatusOptions = [BoardStatus.PRIVATE, BoardStatus.PUBLIC];

  transform(value: any) {
    value = value.toUpperCase(); // value를 대문자로 변환합니다.
    if (!this.isStatusValid(value)) {
      throw new BadRequestException(`${value}는 유효한 상태가 아닙니다.`);
    }
    return value;
  }

  private isStatusValid(status: any) {
    const index = this.StatusOptions.indexOf(status); // status가 StatusOptions에 있는지 확인합니다.
    return index !== -1;
  }
}
