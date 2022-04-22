import { Controller, Get, Param } from '@nestjs/common';
import { CasesService } from './cases.service';

@Controller('cases')
export class CasesController {
  constructor(private readonly service: CasesService) {}

  @Get(':date/count')
  async getAllRegistersByDate(@Param('date') date: string) {
    return await this.service.getAllRegistersByDate(date);
  }
}
