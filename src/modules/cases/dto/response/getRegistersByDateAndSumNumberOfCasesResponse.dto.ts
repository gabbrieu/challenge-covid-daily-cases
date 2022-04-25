import { ApiProperty } from '@nestjs/swagger';

export class SumDataResponse {
  @ApiProperty({ description: 'Nome do país' })
  location: string;

  @ApiProperty({ description: 'Total de casos desde o início até a data' })
  totalCasesUntilDate: number;
}
export class GetRegistersByDateAndSumNumberOfCasesResponseDto {
  @ApiProperty({ description: 'Nome da variante' })
  variant: string;

  @ApiProperty({
    description: 'Vetor dos dados',
    isArray: true,
    type: SumDataResponse,
  })
  data: SumDataResponse[];
}
