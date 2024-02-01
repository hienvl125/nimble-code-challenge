import {
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne
} from "typeorm";
import { User } from "./../users/user.entity"

@Entity()
export class Keyword {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    keyword: string;

    @Column()
    totalAds: number;

    @Column()
    totalLinks: number;

    @Column()
    totalSearchResults: number;

    @Column()
    searchDuration: number;

    @Column({ type: 'text', nullable: true })
    htmlContent: string;

    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
    createdAt: Date;

    @ManyToOne(() => User, (user: User) => user.keywords)
    user: User;
}
