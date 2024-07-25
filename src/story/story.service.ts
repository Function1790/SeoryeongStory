import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Story } from './entity/story.entity';
import { StoryDTO } from './dto/story.dto';

@Injectable()
export class StoryService {
  constructor(
    @InjectRepository(Story) private storyRepository: Repository<Story>
  ) { }

  findAll(): Promise<Story[]> {
    return this.storyRepository.find();
  }

  findOne(id: number): Promise<Story> {
    return this.storyRepository.findOneBy({ id: id })
  }

  async create(storyDTO: StoryDTO): Promise<Story> {
    return this.storyRepository.save({
      content: storyDTO.content,
      postTime: new Date(),
      postUid: 'guest',
    });
  }

  async remove(id: number) {
    await this.storyRepository.delete(id);
  }

  changeProperty(name:string, from:object, to:object) {
    return to[name] ? to[name] : from[name]
  }

  async update(id: number, property:object): Promise<Story> {
    const existStory = await this.findOne(id);
    if (!existStory) {
      throw new HttpException('존재하지 않는 스토리입니다.', HttpStatus.NOT_FOUND);
    }  

    for(var name in existStory){
      existStory[name] = this.changeProperty(name, existStory, property);
    }
    return await this.storyRepository.save(existStory);
  }
}
