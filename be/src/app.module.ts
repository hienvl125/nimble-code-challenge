import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { KeywordsModule } from './keywords/keywords.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      password: process.env.DB_PASS,
      username: process.env.DB_USER,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      database: process.env.DB_NAME,
      synchronize: true,
      logging: true,
    }),
    UsersModule,
    AuthModule,
    KeywordsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
