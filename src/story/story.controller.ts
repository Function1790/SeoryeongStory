import { Body, Controller, Delete, Get, Param, Post, Put, Redirect, Render, Req, Res } from '@nestjs/common';
import { StoryService } from './story.service';
import { StoryDTO } from './dto/story.dto';
import { Request, Response } from 'express';
import { AuthService } from 'src/auth/auth.service';

@Controller('story')
export class StoryController {
  constructor(
    private storyService: StoryService,
    private authService: AuthService,
  ) { }

  @Get()
  @Render('index')
  async findAll(@Req() req) {
    const loginStatus = this.authService.isCorrectJWT(req.cookies.token)
    const stories = await this.storyService.findAll()
    return {
      stories: stories
    };
  }

  @Get('read/:id')
  @Render('read')
  findOneHTML(@Param('id') id: number) {
    return this.storyService.findOne(id);
  }

  @Get('write')
  @Render('write')
  writeHTML(@Req() req) {
    const loginStatus = this.authService.isCorrectJWT(req.cookies.token)
    if (!loginStatus) {
      return
    }
    return loginStatus
    //return this.storyService.findOne(id);
  }

  @Post()
  @Redirect('/story')
  create(@Req() req, @Body() storyDTO: StoryDTO) {
    const loginStatus = this.authService.isCorrectJWT(req.cookies.token)
    if (loginStatus) {
      return this.storyService.create(storyDTO, loginStatus.uid);
    }
    return ""
  }

  @Get('delete/:id')
  @Redirect('/story')
  delete(@Param('id') id: number) {
    return this.storyService.remove(id);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() property: object) {
    return this.storyService.update(id, property);
  }

  @Get('test')
  getCookie(@Req() req: Request, @Res() res: Response) {
    console.log(req.cookies.token)
    return res.redirect("/stort")
  }
}
