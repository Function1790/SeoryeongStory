import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDTO } from './dto/user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService
  ) { }

  async register(userDTO: UserDTO) {
    const existUser = await this.userService.findByFields({
      where: { uid: userDTO.uid }
    });
    if (existUser) {
      throw new HttpException('이미있는 ID입니다', HttpStatus.BAD_REQUEST);
    }
    await this.userService.save(userDTO);
  }

  async vaildateUser(userDTO: UserDTO) {
    const existUser = await this.userService.findByFields({
      where: { uid: userDTO.uid }
    });
    const valudatedPassword = await bcrypt.compare(userDTO.upw, existUser.upw);
    if(!existUser || !valudatedPassword){
      throw new UnauthorizedException();
    }
    return existUser
  }
}
