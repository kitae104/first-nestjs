import { Injectable } from '@nestjs/common';

@Injectable() // 다른 모듈에서 이 서비스를 사용할 수 있도록 @Injectable() 데코레이터를 추가합니다.
export class BoardsService {}
