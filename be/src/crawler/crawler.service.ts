import { Injectable } from '@nestjs/common';
import * as puppeteer from 'puppeteer';

@Injectable()
export class CrawlerService {
  async scrapeWebsite(url: string): Promise<string> {
    // TODO: Implement crawler
    return url;
  }
}
