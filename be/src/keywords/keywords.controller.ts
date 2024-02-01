import {
  Controller,
  Post,
  Res,
  HttpStatus,
  UseGuards,
  Request as NestReq,
  UseInterceptors,
  UploadedFile,
  Get,
  Query,
  Param
} from '@nestjs/common';
import { Response, Request } from 'express';
import { AuthGuard } from './../auth/auth.guard';
import { KeywordsService } from './keywords.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { NewKeywords, ListKeywordsReq, ListKeywordsResp, GetKeywordReq } from './dto/keyword.dto';
import { Keyword } from './keyword.entity';

@Controller('api/keywords')
export class KeywordsController {
  constructor(private readonly keywordsService: KeywordsService) { }

  @UseGuards(AuthGuard)
  @Get()
  async index(
    @NestReq() req: Request,
    @Query('page') page: string,
    @Res() res: Response,
  ): Promise<void> {
    const currentUserId = req.user.sub;
    const listKeywordsReq: ListKeywordsReq = {
      userId: currentUserId,
      page: parseInt(page),
    }
    const listKeywordsResp: ListKeywordsResp = await this.keywordsService.list(listKeywordsReq);
    res.status(HttpStatus.OK).json(listKeywordsResp);
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  async show(
    @NestReq() req: Request,
    @Param('id') keywordId: number,
    @Res() res: Response,
  ): Promise<void> {
    const currentUserId = req.user.sub;
    const getKeywordReq: GetKeywordReq = {
      userId: currentUserId,
      keywordId: keywordId,
    }
    const keyword: Keyword = await this.keywordsService.getById(getKeywordReq);
    res.status(HttpStatus.OK).json(keyword);
  }


  @UseGuards(AuthGuard)
  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async create(@NestReq() req, @Res() res: Response, @UploadedFile() file: Express.Multer.File): Promise<void> {
    const newKeywords: NewKeywords = {
      userId: req.user.sub,
      file: file,
    }
    await this.keywordsService.create(newKeywords);
    res.status(HttpStatus.OK).json({
      message: "Uploaded csv successfully",
    });
  }
}
