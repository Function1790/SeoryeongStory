import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserDTO } from './dto/user.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService
  ) { }

  @Get('login')
  loginView() {
    return 'login';
  }

  @Post('login')
  login(@Body() body: UserDTO){

  }

  @Post('register')
  register(@Body() body: UserDTO){
    
  }
}
