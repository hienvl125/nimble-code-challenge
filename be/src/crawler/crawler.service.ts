import { Injectable } from '@nestjs/common';
import * as puppeteer from 'puppeteer';
import type { CrawlKeywordResult } from './dto/crawler.dto'

@Injectable()
export class CrawlerService {
  async scrapeWebsite(url: string): Promise<CrawlKeywordResult> {
    // TODO: Implement crawler
    return {
      totalAds: 1,
      totalLinks: 2,
      totalSearchResults: 3,
      searchDuration: 4,
      htmlContent: "<h1>Hello World</h1>",
    };
  }
}
