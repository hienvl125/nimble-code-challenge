import { Controller, Post, Body, Res, HttpStatus, UseGuards, Request as NestReq, UseInterceptors, UploadedFile } from '@nestjs/common';
import {  Response } from 'express';
import { AuthGuard } from './../auth/auth.guard';
import { KeywordsService } from './keywords.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { NewKeywords } from './dto/keyword.dto';


@Controller('api/keywords')
export class KeywordsController {
  constructor(private readonly keywordsService: KeywordsService) { }
  
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
