import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { InjectRepository } from "@nestjs/typeorm";
import { UserRepository } from "./user.repository";
import { ExtractJwt, Strategy } from "passport-jwt";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    ) {
    super({
      secretOrKey: 'Secret1234',  // 임의로 설정
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // 헤더에서 JWT를 추출합니다.
    });
  }

  async validate(payload) {
    const { username } = payload; // 토큰에 담긴 내용을 추출합니다.
    const user = await this.userRepository.findOne({ where: { username } });  // 유저를 찾습니다.

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;  // 유저를 반환합니다.
  }
}