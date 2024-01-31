import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { User } from './../users/user.entity';
import { NewLoginCredentials, AuthorizedUser } from './dto/auth.dto';
import { validatePassword } from './../utils/bcrypt.utils'

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>,
    private jwtService: JwtService
  ) { }

  async login(credentials: NewLoginCredentials): Promise<AuthorizedUser> {
    const foundUser = await this.userRepo.findOne({ where: { email: credentials.email } });
    if (!foundUser) {
      throw new UnauthorizedException("Invalid email or password");
    }

    const isValid = await validatePassword(credentials.password, foundUser.hashedPassword);
    if (!isValid) {
      throw new UnauthorizedException("Invalid email or password");
    }

    const accessToken = await this.jwtService.signAsync({
      sub: foundUser.id,
      email: foundUser.email,
    })

    const authorizedUser: AuthorizedUser = {
      id: foundUser.id,
      email: foundUser.email,
      accessToken: accessToken, 
    }

    return authorizedUser;
  }
}
