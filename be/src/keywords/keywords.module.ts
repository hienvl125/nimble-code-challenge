import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Keyword } from './keyword.entity';
import { KeywordsController } from './keywords.controller';
import { KeywordsService } from './keywords.service';
import { CrawlerModule } from 'src/crawler/crawler.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Keyword]),
    CrawlerModule
  ],
  controllers: [KeywordsController],
  providers: [KeywordsService]
})
export class KeywordsModule {}
