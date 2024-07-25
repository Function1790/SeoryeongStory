import { Module } from '@nestjs/common';
import { StoryService } from './story.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Story } from './entity/story.entity';
import { StoryController } from './story.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Story]),
  ],
  exports: [TypeOrmModule],
  controllers: [StoryController],
  providers: [StoryService]
})
export class StoryModule {}
