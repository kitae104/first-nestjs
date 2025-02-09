import { IsEmail, IsString, Matches, MaxLength, MinLength } from "class-validator";

export class AuthCredentialsDto {  
  // @IsString() // 문자열 타입인지 확인합니다.
  // @MinLength(3) // 최소 길이를 3로 설정합니다.
  // @MaxLength(20) // 최대 길이를 20으로 설정합니다.
  username: string;

  @IsString() // 문자열 타입인지 확인합니다.
  @MinLength(4) // 최소 길이를 3로 설정합니다.
  @MaxLength(20) // 최대 길이를 20으로 설정합니다
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, { message: '비밀번호는 대문자, 소문자, 숫자 또는 특수 문자를 포함해야 합니다.' })
  password: string;
    
  @IsEmail() // 이메일 형식인지 확인합니다.  
  email: string;
}