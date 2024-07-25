import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entity/user.entity';
import { FindOneOptions, Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { UserDTO } from './dto/user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>
  ) { }

  async findByFields(option: FindOneOptions<UserDTO>): Promise<User | undefined> {
    return await this.userRepository.findOne(option);
  }

  async transformPassword(user: UserDTO): Promise<void> {
    user.upw = await bcrypt.hash(user.upw, 10);
    return Promise.resolve();
  }

  async save(userDTO: UserDTO): Promise<UserDTO | undefined> {
    await this.transformPassword(userDTO);
    return await this.userRepository.save(userDTO);
  }
}