import { Controller, Get, HttpStatus, Param } from '@nestjs/common';
import {
  ApiExtraModels,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Cases } from './cases.entity';
import { CasesService } from './cases.service';
import { GetAllRegistersByDateDto } from './dto/request/getAllRegistersByDate.dto';
import { GetAllRegistersByDateResponseDto } from './dto/response/getAllRegistersByDateResponse.dto';
import { GetRegistersByDateAndSumNumberOfCasesResponseDto } from './dto/response/getRegistersByDateAndSumNumberOfCasesResponse.dto';

@Controller('cases')
@ApiExtraModels(Cases)
@ApiTags('Cases')
export class CasesController {
  constructor(private readonly service: CasesService) {}

  @Get(':date/count')
  @ApiOperation({
    summary:
      'Lista todos os registros da base de dados no dia selecionado, agrupados por país e separados por variante',
  })
  @ApiParam({ name: 'date', description: 'Data para filtrar os registros' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Registros retornados com sucesso',
    type: GetAllRegistersByDateResponseDto,
    isArray: true,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'A data enviada está no formato inválido',
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Aconteceu algum erro inesperado!',
  })
  async getAllRegistersByDate(
    @Param() dto: GetAllRegistersByDateDto,
  ): Promise<GetAllRegistersByDateResponseDto[]> {
    return await this.service.getAllRegistersByDate(dto.date);
  }

  @Get(':date/cumulative')
  @ApiOperation({
    summary:
      'Lista todos os registros da base de dados, retornando a soma dos casos registrados desde o primeiro dia até a data enviada, agrupados por país e separados por variante',
  })
  @ApiParam({ name: 'date', description: 'Data para filtrar os registros' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Registros retornados com sucesso',
    type: GetRegistersByDateAndSumNumberOfCasesResponseDto,
    isArray: true,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'A data enviada está no formato inválido',
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Aconteceu algum erro inesperado!',
  })
  async getRegistersByDateAndSumNumberOfCases(
    @Param() dto: GetAllRegistersByDateDto,
  ): Promise<GetRegistersByDateAndSumNumberOfCasesResponseDto[]> {
    return await this.service.getRegistersByDateAndSumNumberOfCases(dto.date);
  }
}
