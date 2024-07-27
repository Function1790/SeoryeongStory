import { Body, Controller, Get, Headers, Post, Render, Req, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserDTO } from './dto/user.dto';
import { Request, Response } from 'express';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService
  ) { }

  @Get('login')
  @Render('login')
  loginHTML() { }

  @Get('register')
  @Render('register')
  registerHTML() { }

  @Post('login')
  async login(@Body() userDTO: UserDTO, @Res() res: Response) {
    const jwt = await this.authService.vaildateUser(userDTO)
    if (!jwt) {
      return 'wrong'
    }
    res.setHeader('Authorization', 'Bearer ' + jwt.accessToken);
    return res.json(jwt)
  }

  @Post('register')
  async register(@Body() userDTO: UserDTO) {
    return await this.authService.register(userDTO)
  }

  @Get('/authenticate')
  @UseGuards(AuthGuard)
  isAuthenticated(@Headers() headers: any, @Req() req: Request): any {
    console.log(headers)
    const user: any = req.user;
    return user;
  }
}
