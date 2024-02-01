import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Keyword } from './keyword.entity';
import { NewKeywords, ListKeywordsReq, ListKeywordsResp, GetKeywordReq } from './dto/keyword.dto';
import { CrawlerService } from 'src/crawler/crawler.service';

@Injectable()
export class KeywordsService {
  constructor(
    @InjectRepository(Keyword)
    private keywordRepo: Repository<Keyword>,
    private crawlerService: CrawlerService,
  ) { }

  async list(req: ListKeywordsReq): Promise<ListKeywordsResp> {
    const pageSize = 10;
    const page = req.page;

    const [keywords, total] = await this.keywordRepo.findAndCount({
      where: { user: { id: req.userId } },
      take: pageSize,
      skip: (page - 1) * pageSize,
      order: { createdAt: 'DESC' },
      select: ['keyword', 'id', 'createdAt', 'totalSearchResults'],
    });

    const isLast = page * pageSize >= total;
    const previousPage = page > 1 ? page - 1 : null;
    const nextPage = isLast ? null : page + 1;

    return {
      keywords: keywords,
      isLast: isLast,
      total: total,
      nextPage: nextPage,
      previousPage: previousPage,
    }
  }

  async getById(req: GetKeywordReq): Promise<Keyword> {
    const keyword = await this.keywordRepo.findOne({
      where: {
        id: req.keywordId,
        user: { id: req.userId }
      }
    });

    if (!keyword) {
      throw new NotFoundException("keyword not found")
    }

    return keyword;
  }

  async create(newKeywords: NewKeywords): Promise<void> {
    // TODO: Call to crawlerService to crawl search result from google
    // use keywordRepo to insert collected result into database
    throw new InternalServerErrorException("Failed to upload csv");
  }
}
