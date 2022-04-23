import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNumber, IsString } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Cases {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({ description: 'Id da entidade' })
  id: string;

  @Column()
  @IsString()
  @ApiProperty({ description: 'País onde aconteceram as ocorrências' })
  location: string;

  @Column({ type: 'date' })
  @IsDateString()
  @ApiProperty({ description: 'Data das ocorrências' })
  date: string;

  @Column()
  @IsString()
  @ApiProperty({ description: 'Nome das variantes' })
  variant: string;

  @Column({ name: 'num_sequences', type: 'decimal' })
  @IsNumber()
  @ApiProperty({ description: 'Número das sequências' })
  numSequences: number;

  @Column({ name: 'perc_sequences', type: 'decimal' })
  @IsNumber()
  @ApiProperty({ description: 'Porcentagem das sequências' })
  percSequences: number;

  @Column({ name: 'num_sequences_total' })
  @IsNumber()
  @ApiProperty({ description: 'Numéro de sequências total' })
  numSequencesTotal: number;
}
