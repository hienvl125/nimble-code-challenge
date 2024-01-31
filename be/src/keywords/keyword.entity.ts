import { CreateDateColumn, Entity, PrimaryGeneratedColumn, Column,  } from "typeorm";

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

    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
    createdAt: Date;

    // TODO: how to store html page?
}
