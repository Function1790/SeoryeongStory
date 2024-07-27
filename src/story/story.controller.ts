import { Body, Controller, Delete, Get, Param, Post, Put, Render } from '@nestjs/common';
import { StoryService } from './story.service';
import { StoryDTO } from './dto/story.dto';

@Controller('story')
export class StoryController {
  constructor(
    private storyService: StoryService
  ) { }

  @Get()
  @Render('index')
  async findAll() {
    const stories = await this.storyService.findAll()
    return {
      stories: stories
    };
  }

  @Get(':id')
  @Render('read')
  findOneHTML(@Param('id') id: number) {
    return this.storyService.findOne(id);
  }

  @Get('/write')
  @Render('write')
  writeHTML() {
    //return this.storyService.findOne(id);
  }

  @Post()
  create(@Body() storyDTO: StoryDTO) {
    return this.storyService.create(storyDTO);
  }

  @Get('delete/:id')
  delete(@Param('id') id: number) {
    return this.storyService.remove(id);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() property: object) {
    return this.storyService.update(id, property);
  }
}
