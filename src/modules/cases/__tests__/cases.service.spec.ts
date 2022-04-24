import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  getRegistersResponseMock,
  MockType,
  registerMock,
  registerMock2,
  registerMock3,
  registerMock4,
  repositoryMockFactory,
} from '../../commom/mock';
import { Cases } from '../cases.entity';
import { CasesService } from '../cases.service';
import { GetAllRegistersByDateResponseDto } from '../dto/response/getAllRegistersByDateResponse.dto';

describe('Cases Module', () => {
  let service: CasesService;
  let repository: MockType<Repository<Cases>>;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CasesService,
        {
          provide: getRepositoryToken(Cases),
          useFactory: repositoryMockFactory,
        },
      ],
    }).compile();
    console.log(getRepositoryToken(Cases));
    repository = module.get(getRepositoryToken(Cases));
    service = module.get<CasesService>(CasesService);
  });

  it('should be defined', async () => {
    expect(service).toBeDefined();
  });

  describe('getAllRegistersByDate', () => {
    it('should return all registers in the given date agrouped by country and separated by variant', async () => {
      repository.find.mockReturnValue([
        registerMock,
        registerMock2,
        registerMock3,
        registerMock4,
      ]);

      const response = await service.getAllRegistersByDate('2022-04-20');
      expect(repository.find).toHaveBeenCalledTimes(1);
      expect(response).toBeDefined();
      expect(response.length).toEqual(2);
      expect(response).toMatchObject<GetAllRegistersByDateResponseDto[]>(
        getRegistersResponseMock,
      );
    });
  });
});
