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

    @Column({ type: 'bigint' })
    totalAds: number;

    @Column({ type: 'bigint' })
    totalLinks: number;

    @Column({ type: 'bigint' })
    totalSearchResults: number;

    @Column({ type: 'decimal', precision: 5, scale: 2 })
    searchDuration: number;

    @Column({ type: 'text', nullable: true })
    htmlContent: string;

    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
    createdAt: Date;

    @ManyToOne(() => User, (user: User) => user.keywords)
    user: User;
}
