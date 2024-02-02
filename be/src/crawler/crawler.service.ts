import { Injectable } from '@nestjs/common';
import * as puppeteer from 'puppeteer';
import type { CrawlKeywordResult } from './dto/crawler.dto'

@Injectable()
export class CrawlerService {
  async scrapeWebsite(url: string): Promise<CrawlKeywordResult> {
    let puppeteerArgs = process.env.NODE_ENV == 'production' ? ['--no-sandbox', '--disable-setuid-sandbox'] : [];
    const browser = await puppeteer.launch({
      headless: true,
      args: puppeteerArgs,
    });
    const page = await browser.newPage();
    await page.goto(url);

    // Search result
    await page.waitForSelector('#result-stats');
    const resultStatsElement = await page.$('#result-stats');
    let totalSearchResults = 0;
    let searchDuration = 0;
    let resultStatsText = "";
    if (resultStatsElement) {
      resultStatsText = await page.evaluate(element => element.textContent, resultStatsElement);
      const regex = /([\d,.]+).*?([\d,.]+)/g;
      let match;
      while ((match = regex.exec(resultStatsText)) !== null) {
        totalSearchResults = Number(match[1].replace(/[,.]/g, ''));
        searchDuration = parseFloat(match[2].replace(',', '.'));
      }
    }

    const totalLinks = await page.evaluate(() => {
      const anchors = document.querySelectorAll('a');
      return anchors.length
    });


    const totalAds = await page.evaluate(() => {
      const divs = document.querySelectorAll(`div[data-text-ad]`);
      return divs.length;
    });
  
    // const htmlContent = await page.content();

    browser.close();

    return {
      totalAds: totalAds,
      totalLinks: totalLinks,
      totalSearchResults: totalSearchResults,
      searchDuration: searchDuration,
      htmlContent: "<main>sample html</main>",
    };
  }
}
