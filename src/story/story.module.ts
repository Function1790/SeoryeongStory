import { Module } from '@nestjs/common';
import { StoryService } from './story.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Story } from './entity/story.entity';
import { StoryController } from './story.controller';
import { AuthService } from 'src/auth/auth.service';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Story]),
    AuthModule
  ],
  exports: [TypeOrmModule],
  controllers: [StoryController],
  providers: [StoryService]
})
export class StoryModule {}
