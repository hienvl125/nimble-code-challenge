import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Keyword } from "src/keywords/keyword.entity";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    email: string;

    @Column()
    hashedPassword: string;

    @OneToMany(() => Keyword, (keyword: Keyword) => keyword.user)
    keywords: Keyword[];
}
