export type KeywordOverview = {
  id: number;
  keyword: string;
  totalSearchResults: number;
  createdAt: Date;
}

export type ListKeywordsResponse = {
  keywords: KeywordOverview[];
  isLast: boolean;
  total: number;
  previousPage: number | null;
  nextPage: number | null;
  lastPage: number;
}

export type Keyword = {
  id: number;
  keyword: string;
  totalAds: number;
  totalLinks: number;
  totalSearchResults: number;
  searchDuration: number;
  htmlContent: string;
  createdAt: Date; 
}
