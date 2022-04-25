import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository, SelectQueryBuilder } from 'typeorm';
import {
  getRegistersResponseMock,
  getSumFinalResponseMock,
  getSumQueryResponseMock,
  getSumQueryResponseMock2,
  getSumQueryResponseMock3,
  getSumQueryResponseMock4,
  MockType,
  registerMock,
  registerMock2,
  registerMock3,
  registerMock4,
  repositoryMockFactory,
  selectQueryBuilderMock,
} from '../../commom/mock';
import { Cases } from '../cases.entity';
import { CasesService } from '../cases.service';
import { GetAllRegistersByDateResponseDto } from '../dto/response/getAllRegistersByDateResponse.dto';
import { GetRegistersByDateAndSumNumberOfCasesResponseDto } from '../dto/response/getRegistersByDateAndSumNumberOfCasesResponse.dto';

describe('Cases Module', () => {
  let service: CasesService;
  let repository: MockType<Repository<Cases>>;
  let selectQueryBuilder: SelectQueryBuilder<any>;

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

    repository = module.get(getRepositoryToken(Cases));
    service = module.get<CasesService>(CasesService);
    selectQueryBuilder = selectQueryBuilderMock();

    jest
      .spyOn(repository, 'createQueryBuilder')
      .mockReturnValue(selectQueryBuilder);
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

  describe('getRegistersByDateAndSumNumberOfCases', () => {
    it('should return the sum of cases until date agrouped by country and separated by variant', async () => {
      jest
        .spyOn(selectQueryBuilder, 'getRawMany')
        .mockResolvedValue([
          getSumQueryResponseMock,
          getSumQueryResponseMock2,
          getSumQueryResponseMock3,
          getSumQueryResponseMock4,
        ]);

      const response = await service.getRegistersByDateAndSumNumberOfCases(
        '2022-04-20',
      );

      expect(selectQueryBuilder.select).toHaveBeenCalledTimes(1);
      expect(selectQueryBuilder.addSelect).toHaveBeenCalledTimes(2);
      expect(selectQueryBuilder.where).toHaveBeenCalledTimes(1);
      expect(selectQueryBuilder.groupBy).toHaveBeenCalledTimes(1);
      expect(selectQueryBuilder.addGroupBy).toHaveBeenCalledTimes(1);
      expect(selectQueryBuilder.cache).toHaveBeenCalledTimes(1);
      expect(selectQueryBuilder.getRawMany).toHaveBeenCalledTimes(1);
      expect(response).toBeDefined();
      expect(response.length).toEqual(2);
      expect(response).toMatchObject<
        GetRegistersByDateAndSumNumberOfCasesResponseDto[]
      >(getSumFinalResponseMock);
    });
  });
});
