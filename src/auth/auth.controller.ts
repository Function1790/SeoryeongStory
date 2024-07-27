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
    res.cookie("token", jwt.accessToken, { maxAge: 900000, httpOnly: true });
    return res.redirect(`/story`)
  }

  @Post('register')
  async register(@Body() userDTO: UserDTO) {
    return await this.authService.register(userDTO)
  }

  @Post('/test')
  async test(@Headers() headers: any){
    console.log(headers)
    const jwtString = headers.authorization.split('Bearer ')[1];
    console.log(jwtString);
    //console.log(this.authService.verify(jwtString));
  }

  @Get('authenticate')
  @UseGuards(AuthGuard())
  isAuthenticated(@Headers() headers: any, @Req() req: Request): any {
    console.log(headers)
    const user: any = req.user;
    return user;
  }
}
