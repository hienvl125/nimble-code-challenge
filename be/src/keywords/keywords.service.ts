import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Keyword } from './keyword.entity';
import { NewKeywords } from './dto/keyword.dto';
import { CrawlerService } from 'src/crawler/crawler.service';

@Injectable()
export class KeywordsService {
  constructor(
    @InjectRepository(Keyword)
    private keywordRepo: Repository<Keyword>,
    private crawlerService: CrawlerService,
  ) { }

  async create(newKeywords: NewKeywords): Promise<void> {
    // TODO: Call to crawlerService to crawl search result from google
    // use keywordRepo to insert collected result into database
    throw new InternalServerErrorException("Failed to upload csv");
  }
}
