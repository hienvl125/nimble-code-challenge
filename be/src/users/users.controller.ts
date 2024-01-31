import { Controller, Post, Body, Res, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import { UsersService } from './users.service';
import { NewUserDTO } from './dto/user.dto';

@Controller('api/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Post()
  async create(@Body() newUserDTO: NewUserDTO, @Res() res: Response): Promise<void> {
    const createdUser = await this.usersService.create(newUserDTO);
    res.status(HttpStatus.OK).json({
      id: createdUser.id,
      email: createdUser.email,
    });
  }
}
