import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Keyword } from './keyword.entity';
import { NewKeywords, ListKeywordsReq, ListKeywordsResp, GetKeywordReq } from './dto/keyword.dto';
import { CrawlerService } from 'src/crawler/crawler.service';
import type { CrawlKeywordResult } from './../crawler/dto/crawler.dto';
import { Readable } from 'stream';
import * as csv from 'fast-csv';

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
    // Build keywords array within validation
    const keywords = await new Promise<string[]>((resolve, reject) => {
      let keywords: string[] = [];
      const readableStream = Readable.from([newKeywords.file.buffer.toString()]);
      csv.parseStream(readableStream, { headers: false })
        .on('data', (line: string[]) => {
          if (keywords.length > 100) {
            reject(new Error("keywords maximum reached!!!"));
          }

          const keyword = line[0];
          keywords.push(keyword);
        })
        .on('end', () => {
          if (keywords.length == 0) {
            reject(new Error("no converted keywords from CSV"));
          }

          resolve(keywords);
        })
        .on('error', (error) => {
          reject(error);
        });
    });

    // loop and process without await
    for (let keyword of keywords) {
      this.crawlAndInsertKeyword({ keyword: keyword, userId: newKeywords.userId });
    }
  }

  async crawlAndInsertKeyword({ keyword, userId }: { keyword: string, userId: number }): Promise<void> {
    const encodedKeyword = encodeURIComponent(keyword);
    const crawlKeywordResult: CrawlKeywordResult = await this.crawlerService.scrapeWebsite(`https://google.com/search?q=${encodedKeyword}`)
    const newKeyword = await this.keywordRepo.create({
      user: { id: userId },
      keyword: keyword,
      totalAds: crawlKeywordResult.totalAds,
      totalLinks: crawlKeywordResult.totalLinks,
      totalSearchResults: crawlKeywordResult.totalSearchResults,
      searchDuration: crawlKeywordResult.searchDuration,
      htmlContent: crawlKeywordResult.htmlContent,
    })
    this.keywordRepo.save(newKeyword);
  }
}
