import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { User } from './user.entity';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: 'Secret1234', // 임의로 설정
      signOptions: {
        expiresIn: 60 * 60, // 1시간
      }
    }),
    TypeOrmModule.forFeature([User]), // TypeOrmModule을 AuthModule에 추가
  ],
  controllers: [AuthController],
  providers: [AuthService, UserRepository, JwtModule],
  exports: [JwtModule, PassportModule],
})
export class AuthModule {}
