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
  getChallengeMessage(): string {
    return this.appService.getChallengeMessage();
  }
}
