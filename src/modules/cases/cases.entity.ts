import { IsDate, IsNumber, IsString } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Cases {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  @IsString()
  location: string;

  @Column()
  @IsDate()
  date: Date;

  @Column()
  @IsString()
  variant: string;

  @Column({ name: 'num_sequences' })
  @IsNumber()
  numSequences: number;

  @Column({ name: 'perc_sequences' })
  @IsNumber()
  percSequences: number;

  @Column({ name: 'num_sequences_total' })
  @IsNumber()
  numSequencesTotal: number;
}
