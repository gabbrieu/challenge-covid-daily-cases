import { IsDate, IsNumber, IsString } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Cases {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  @IsString()
  location: string;

  @Column({ type: 'date' })
  @IsDate()
  date: string;

  @Column()
  @IsString()
  variant: string;

  @Column({ name: 'num_sequences', type: 'decimal' })
  @IsNumber()
  numSequences: number;

  @Column({ name: 'perc_sequences', type: 'decimal' })
  @IsNumber()
  percSequences: number;

  @Column({ name: 'num_sequences_total' })
  @IsNumber()
  numSequencesTotal: number;
}
