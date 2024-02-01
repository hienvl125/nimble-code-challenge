import { Keyword } from "../keyword.entity";


export class NewKeywords {
  userId: number;
  file: Express.Multer.File;
}

export class ListKeywordsReq {
  userId: number;
  page: number;
}

export class ListKeywordsResp {
  keywords: Keyword[];
  isLast: boolean;
  total: number;
  nextPage: number;
  previousPage: number;
}

export class GetKeywordReq {
  userId: number;
  keywordId: number;
}
