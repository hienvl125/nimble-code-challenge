import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { NewLoginCredentials } from './dto/auth.dto';

@Controller('api/login')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post()
  async create(@Body() credentials: NewLoginCredentials, @Res() res: Response): Promise<void> {
    const authorizedUser = await this.authService.login(credentials);
    
    res.status(HttpStatus.OK).json({
      id: authorizedUser.id,
      email: authorizedUser.email,
      accessToken: authorizedUser.accessToken  
    });
  }
}
