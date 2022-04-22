import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CasesController } from './cases.controller';
import { Cases } from './cases.entity';
import { CasesService } from './cases.service';

@Module({
  imports: [TypeOrmModule.forFeature([Cases])],
  controllers: [CasesController],
  providers: [CasesService],
})
export class CasesModule {}
