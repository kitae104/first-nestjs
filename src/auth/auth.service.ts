import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { AuthCredentialsDto } from './dto/auth-credential.dto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository) // UserRepository를 주입합니다.
    private userRepository: UserRepository,
  ) {}

  // 회원 가입
  async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    return this.userRepository.createUser(authCredentialsDto);
  }

  // 로그인
  async signIn(authCredentialsDto: AuthCredentialsDto): Promise<string> {
    const { username, password, email } = authCredentialsDto;    
    const user = await this.userRepository.findOneBy({ email: email});    
    if (user && (await bcrypt.compare(password, user.password))) {
      return '로그인 성공';
    } else {
      throw new UnauthorizedException('로그인에 실패했습니다.');
    }
  }
}
