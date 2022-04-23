import { Controller, Get, HttpStatus, Param } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Cases } from './cases.entity';
import { CasesService } from './cases.service';

@Controller('cases')
@ApiTags('Cases')
export class CasesController {
  constructor(private readonly service: CasesService) {}

  @Get(':date/count')
  @ApiOperation({
    summary:
      'Lista todos os registros da base de dados no dia selecionado, agrupados por país e separados por variante.',
  })
  @ApiParam({ name: 'date', description: 'Data para filtrar os registros' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Registros retornados com sucesso',
    type: Cases,
  })
  async getAllRegistersByDate(@Param('date') date: string) {
    return await this.service.getAllRegistersByDate(date);
  }
}
