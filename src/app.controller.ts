import { Controller, Get, HttpStatus } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AppService } from './app.service';

@Controller()
@ApiTags('Base')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiOperation({ summary: 'Retorna a mensagem inicial do desafio' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Mensagem retornada com sucesso',
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Aconteceu algum erro inesperado!',
  })
  getChallengeMessage(): string {
    return this.appService.getChallengeMessage();
  }

  @Get('dates')
  @ApiOperation({ summary: 'Lista as datas disponíveis no dataset' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Datas retornadadas com sucesso',
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Aconteceu algum erro inesperado!',
  })
  async getAllDates(): Promise<string[]> {
    return await this.appService.getAllDates();
  }
}
