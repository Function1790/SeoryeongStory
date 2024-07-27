import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StoryController } from './story/story.controller';
import { StoryModule } from './story/story.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Story } from './story/entity/story.entity';
import { AuthController } from './auth/auth.controller';
import { AuthModule } from './auth/auth.module';
import { User } from './auth/entity/user.entity';

@Module({
  imports: [
    StoryModule,
    AuthModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '1790',
      database: 'sstory',
      entities: [Story, User],
      synchronize: true,
      logging: false
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
