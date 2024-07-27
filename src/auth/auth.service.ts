import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDTO } from './dto/user.dto';
import * as bcrypt from 'bcrypt';
import { Payload } from './security/payload.interface';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService
  ) { }

  async register(userDTO: UserDTO) {
    const existUser = await this.userService.findByFields({
      where: { uid: userDTO.uid }
    });
    if (existUser) {
      return false;
      //throw new HttpException('이미있는 ID입니다', HttpStatus.BAD_REQUEST);
    }
    return await this.userService.save(userDTO);
  }

  async vaildateUser(userDTO: UserDTO): Promise<{ accessToken: string } | false> {
    const existUser = await this.userService.findByFields({
      where: { uid: userDTO.uid }
    });
    if (!existUser) { return false }
    const valudatedPassword = await bcrypt.compare(userDTO.upw, existUser.upw);
    if (!valudatedPassword) {
      return false;
      //throw new UnauthorizedException();
    }
    //Jwt 토큰 부분
    const payload: Payload = {
      id: existUser.id,
      uid: existUser.uid
    };
    return {
      accessToken: this.jwtService.sign(payload)
    };
  }

  async tokenValidateUser(payload: Payload): Promise<UserDTO | undefined> {
    return await this.userService.findById(payload.id)
  }
}
