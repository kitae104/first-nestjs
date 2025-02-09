import * as bcrypt from 'bcryptjs';
import { ConflictException, Injectable, InternalServerErrorException } from "@nestjs/common";
import { DataSource, Repository } from "typeorm";
import { User } from "./user.entity";
import { AuthCredentialsDto } from "./dto/auth-credential.dto";

@Injectable()
export class UserRepository extends Repository<User> {

  constructor(private dataSource: DataSource) {
    super(User, dataSource.createEntityManager()); 
  }

  // 비동기로 사용자를 생성합니다.
  async createUser(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    const { username, password, email } = authCredentialsDto;  // 비구조화 할당

    const salt = await bcrypt.genSalt(); // bcrypt 라이브러리를 사용하여 salt를 생성합니다.
    const hashedPassword = await bcrypt.hash(password, salt); // bcrypt 라이브러리를 사용하여 비밀번호를 암호화합니다.

    const user = this.create({username, password: hashedPassword, email}); // User 엔티티를 생성합니다.    
    
    try {
      await this.save(user);  // User 엔티티를 저장합니다.
    } catch (error) {
      if (error.code === 'ER_DUP_ENTRY') { // 중복된 이메일이 있을 경우
        throw new ConflictException('이미 존재하는 이메일입니다.');
      } else {
        throw new InternalServerErrorException(); // 서버 오류
      }      
    }
  }
}

