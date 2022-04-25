import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Cases } from './modules/cases/cases.entity';
import { CasesModule } from './modules/cases/cases.module';
import * as ormconfig from './ormconfig';
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    CasesModule,
    TypeOrmModule.forRootAsync({ useFactory: async () => ormconfig }),
    TypeOrmModule.forFeature([Cases]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
