import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { NewUserDTO } from './dto/user.dto';
import { hashPassword } from './../utils/bcrypt.utils'

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>,
  ) { }

  async create(user: NewUserDTO): Promise<User> {
    const foundUser = await this.userRepo.findOne({ where: { email: user.email } });
    if (foundUser) {
      throw new BadRequestException("Email already be taken");
    }
    
    const hashedPassword = await hashPassword(user.password);
    if (!hashPassword) {
      throw new InternalServerErrorException("Failed to register a new account");
    }

    const userParams: Partial<User> = {
      email: user.email,
      hashedPassword: hashedPassword,
    }

    const createdUser = this.userRepo.create(userParams);
    return this.userRepo.save(createdUser);
  }
}
