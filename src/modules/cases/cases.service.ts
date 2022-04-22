import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cases } from './cases.entity';

@Injectable()
export class CasesService {
  constructor(
    @InjectRepository(Cases) private readonly repository: Repository<Cases>,
  ) {}

  async getAllRegistersByDate(date: string) {
    const result = await this.repository.find({ date });
  }
}
