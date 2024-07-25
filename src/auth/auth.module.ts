import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entity/user.entity';
import { AuthController } from './auth.controller';
import { UserService } from './user.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
  ],
  exports: [TypeOrmModule],
  controllers: [AuthController],
  providers: [AuthService, UserService]
})
export class AuthModule {}
