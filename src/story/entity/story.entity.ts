import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Story {
  @PrimaryGeneratedColumn()
  id: number;
  
  @Column()
  content: string;

  @Column()
  postTime: Date;

  @Column()
  postUid: string;
}