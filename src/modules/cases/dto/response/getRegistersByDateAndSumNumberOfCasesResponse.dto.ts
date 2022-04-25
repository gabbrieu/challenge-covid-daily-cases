export class GetRegistersByDateAndSumNumberOfCasesResponseDto {
  variant: string;
  data: SumDataResponse[];
}

export class SumDataResponse {
  location: string;
  totalCasesUntilDate: number;
}
