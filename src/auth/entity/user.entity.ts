import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  uid: string;
  
  @Column()
  upw: string;

  /*@OneToMany(type=>UserAuthority, userAuthority=> userAuthority.user, {eager: true})
  authorities?: any[];*/
}