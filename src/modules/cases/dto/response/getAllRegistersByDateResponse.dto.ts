import { ApiProperty } from '@nestjs/swagger';
import { Cases } from '../../cases.entity';
export class DataResponse {
  @ApiProperty({ description: 'Nome da variante' })
  location: string;

  @ApiProperty({
    description: 'Vetor dos registros',
    isArray: true,
    type: Cases,
  })
  registers: Cases[];
}

export class GetAllRegistersByDateResponseDto {
  @ApiProperty({ description: 'Nome da variante' })
  variant: string;

  @ApiProperty({
    description: 'Vetor de dados',
    isArray: true,
    type: DataResponse,
  })
  data: DataResponse[];
}
